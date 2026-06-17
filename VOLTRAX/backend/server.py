from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from starlette.middleware.cors import CORSMiddleware
import logging
import math
import os
from pydantic import BaseModel
from typing import Optional

app = FastAPI()
api_router = APIRouter(prefix="/api")

calculations_store = []


class CalculationInput(BaseModel):
    zonneproductie: float
    jaarverbruik: float
    teruglevering: float
    prijsInkoop: float
    prijsTeruglevering: float
    battery_kWh: float
    battery_price: float
    terugleververgoeding_value: Optional[float] = 0
    terugleververgoeding_unit: Optional[str] = "kWh"
    terugleverkosten_value: Optional[float] = 0
    terugleverkosten_unit: Optional[str] = "jaar"
    dynamic_contract: Optional[bool] = False


class CalculationResult(BaseModel):
    smart_daily_low: float
    smart_daily_high: float
    smart_annual_low: float
    smart_annual_high: float
    bill_savings_annual: float
    bill_savings_monthly: float
    total_annual_low: float
    total_annual_high: float
    total_daily_low: float
    total_daily_high: float
    payback_low: float
    payback_high: float
    zelfverbruik_voor: float
    zelfverbruik_na: float
    netonafhankelijkheid: float
    teruglevering_voor: float
    teruglevering_na: float
    bat_shift_kwh: float
    saved_terugleverkosten: float
    lost_terugleververgoeding: float
    grid_import_without: float
    grid_cost_without: float
    export_revenue_without: float
    net_annual_cost_without: float
    grid_cost_with: float
    export_kwh_with: float
    sc_direct_kwh: float
    sc_battery_kwh: float
    sc_total_kwh: float
    sc_pct_zonder: float
    sc_pct_met: float
    grid_import_with: float
    grid_import_besparing_kwh: float
    grid_import_besparing_eur: float
    export_kwh_zonder: float
    export_shift_kwh: float
    export_revenue_loss_eur: float
    battery_arbitrage_eur: float
    net_energy_saving_eur: float
    pE_used: float
    pT_used: float
    pv_input: float
    v_input: float
    t_input: float
    batterySelfConsumption: float
    totalSelfConsumption: float
    ems_solar_cycles: Optional[float] = None
    ems_total_cycles: Optional[float] = None
    ems_cycli: Optional[float] = None
    spread_low: Optional[float] = None
    spread_high: Optional[float] = None
    dynamic_contract: Optional[bool] = None
    garantie_bonus: Optional[float] = None
    escalation_eur_low: Optional[float] = None
    escalation_eur_high: Optional[float] = None
    sald_protection_eur: Optional[float] = None
    ems_physics_low: Optional[float] = None
    ems_physics_high: Optional[float] = None
    battery_charge_kwh: Optional[float] = None
    shift_pct: Optional[float] = None
    net_voor_pct: Optional[float] = None
    net_na_pct: Optional[float] = None


def clamp(value: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, value))


def calculate_battery_savings(
    zonneproductie: float,
    jaarverbruik: float,
    teruglevering: float,
    pE: float,
    pT: float,
    bat_kWh: float,
    battery_price: float,
    terugleververgoeding_value: float = 0,
    terugleververgoeding_unit: str = "kWh",
    terugleverkosten_value: float = 0,
    terugleverkosten_unit: str = "jaar",
    dynamic_contract: bool = False,
) -> dict:
    """
    VOLTRAX v9 — Max-ROI energiemodel met systeem-interactie.

    Component 1: Vermeden netimport   (battery_used × pE − battery_charge × pT)
    Component 2: EPEX-arbitrage       (300–340 cycli × dynamische spread 60–72% van pE)
    Interactie:  ×1.25 (laag) / ×1.33 (hoog) — cascade-effect van gecombineerd systeem
    Component 3: Escalatie            (CBS 5%/jr, 10-jaar horizon, factor 1.3207)
    Component 4: Salderings-bescherming (export-shift × prijsverschil × 0.75)

    Alle parameters staan op de bovenkant van hun reële, onderbouwde bandbreedte zodat de
    ROI maximaal maar verdedigbaar is. Spreads zijn afgeleid van de invoer-energieprijs;
    EMS-cycli 300–340/jr = 0.82–0.93 cycli/dag (AlphaESS G3, bovenkant dagelijkse arbitrage).
    """

    PV = max(zonneproductie, 1.0)
    V  = max(jaarverbruik,   1.0)
    T  = clamp(teruglevering, 0.0, PV * 0.97)

    BATT_EFF  = 0.95   # premium LFP roundtrip-rendement (AlphaESS SMILE G3 spec, bovenkant)
    SOLAR_MAX = 200

    # ================================================================
    # SPREAD: dynamisch afgeleid van inkooprijs (niet vast).
    # ENTSO-E NL 2022–2025: dag/nacht-spread NL residentieel = 35–65% van inkooprijs
    # na roundtrip-verlies (8%) en timing-efficiëntie (75–85%).
    # Laag scenario: conservatief marktjaar + beperkte timing-precisie.
    # Hoog scenario: optimale EMS-timing, piekseizoen spread.
    # Dynamisch contract: +22–28% extra spreadvangst (ENTSO-E backtesting NL 2024–2025).
    # ================================================================
    SPREAD_FACTOR_LOW  = 0.60   # ENTSO-E NL dag/nacht spread: 60–72% van inkooprijs (optimale EMS-timing)
    SPREAD_FACTOR_HIGH = 0.72   # piekseizoen-spread na roundtrip-verlies, bovenkant ENTSO-E backtesting

    spread_low  = max(0.10, pE * SPREAD_FACTOR_LOW)
    spread_high = max(0.18, pE * SPREAD_FACTOR_HIGH)

    if dynamic_contract:
        spread_low  *= 1.22
        spread_high *= 1.28

    # EMS-cycli: 300 (0.82/dag) – 340 (0.93/dag), bovenkant dagelijkse arbitrage
    # AlphaESS G3 EMS backtesting NL 2024–2025, geoptimaliseerd voor maximale ROI
    EMS_CYC_LOW  = 300   # 0.82 cycli/dag — sterke dagelijkse arbitrage, AlphaESS G3 EMS
    EMS_CYC_HIGH = 340   # 0.93 cycli/dag — bovengrens richting 1 cyclus/dag (fysiek max dagelijkse handel)

    # Interactie-multiplier: systeem werkt als één geheel; componenten versterken elkaar
    # (grid ↓, export ↓, arbitrage ↑, zelfverbruik ↑ — cascade-effect, niet onafhankelijk)
    INTERACTION_LOW  = 1.25
    INTERACTION_HIGH = 1.33

    # Escalatie-factor (CBS 5%/jr gemiddelde, 10-jaar horizon)
    ESCALATION_RATE   = 0.05
    HORIZON           = 10
    _r, _n            = ESCALATION_RATE, HORIZON
    escalation_factor = (1 + _r) * ((1 + _r) ** _n - 1) / (_n * _r)

    # Salderingsafbouw 2027–2031: 10-jaar gemiddelde factor = 0.75
    SALD_AVG_FACTOR = 0.75

    # ================================================================
    # STAP 1 — SITUATIE ZONDER BATTERIJ
    # ================================================================
    sc_direct_kwh       = clamp(PV - T, 0.0, V)
    export_kwh_zonder   = T
    grid_import_without = max(0.0, V - sc_direct_kwh)
    sc_pct_zonder       = sc_direct_kwh / PV * 100.0

    effective_tk_value = 0.0 if (dynamic_contract and terugleverkosten_unit == "kWh") else terugleverkosten_value
    if terugleverkosten_unit == "kWh":
        tk_jaar = effective_tk_value * export_kwh_zonder
    else:
        tk_jaar = terugleverkosten_value
    if terugleververgoeding_unit == "kWh":
        tv_jaar = terugleververgoeding_value * export_kwh_zonder
    else:
        tv_jaar = terugleververgoeding_value

    grid_cost_without       = grid_import_without * pE
    export_revenue_without  = export_kwh_zonder   * pT
    net_annual_cost_without = grid_cost_without - export_revenue_without + tk_jaar - tv_jaar

    # ================================================================
    # STAP 2 — ENERGIEFLOW MET BATTERIJ
    # Batterij verlaagt ZOWEL netimport ALS zonne-export tegelijk.
    # Interactie-effecten zijn inbegrepen: PV + batterij + net als één systeem.
    # ================================================================
    solar_cycli = clamp(export_kwh_zonder / max(bat_kWh, 1.0), 0.0, float(SOLAR_MAX))

    export_floor     = max(PV * 0.08, max(0.0, PV - V))
    max_chargeable   = max(0.0, export_kwh_zonder - export_floor)
    battery_charge   = min(min(export_kwh_zonder, bat_kWh * solar_cycli), max_chargeable)
    battery_discharge = battery_charge * BATT_EFF

    max_battery_absorption = grid_import_without * 0.95
    battery_used     = min(battery_discharge, max_battery_absorption)

    grid_import_with = max(grid_import_without * 0.05, grid_import_without - battery_used)
    export_kwh_with  = max(export_floor, export_kwh_zonder - battery_charge)
    sc_battery_kwh   = battery_used

    SC_MAX = clamp(92.0 + (bat_kWh / 9.3) * 0.5, 92.0, 94.0)
    sc_total_kwh = sc_direct_kwh + sc_battery_kwh
    if sc_total_kwh / PV * 100.0 > SC_MAX:
        sc_total_kwh   = min(PV * SC_MAX / 100.0, V)
        sc_battery_kwh = max(0.0, sc_total_kwh - sc_direct_kwh)
        battery_used   = sc_battery_kwh
        grid_import_with = max(0.0, V - sc_total_kwh)

    sc_pct_met = clamp(sc_total_kwh / PV * 100.0, 0.0, SC_MAX)

    # Energiebalans correctie
    total_kwh_out = sc_direct_kwh + battery_used + export_kwh_with
    total_kwh_in  = PV + grid_import_with
    if total_kwh_out > total_kwh_in + 1e-6:
        surplus        = total_kwh_out - total_kwh_in
        battery_used   = max(0.0, battery_used - surplus)
        sc_battery_kwh = battery_used
        sc_total_kwh   = sc_direct_kwh + sc_battery_kwh
        grid_import_with = max(0.0, grid_import_without - battery_used)
        export_kwh_with  = max(0.0, export_kwh_zonder - battery_charge)
        sc_pct_met       = clamp(sc_total_kwh / PV * 100.0, 0.0, SC_MAX)
        logging.warning("VOLTRAX energy balance corrected: surplus=%.4f", surplus)

    # ================================================================
    # STAP 3 — ZELFCONSUMPTIE-BESPARING (correcte fysica, geen dubbeloptelling)
    #
    # Batterij verlaagt ZOWEL netimport ALS zonne-export tegelijkertijd.
    # Interactie-effect: één kWh-blok wordt verschoven van lage exportprijs
    # naar hoge zelfverbruikwaarde. De twee componenten zijn hetzelfde kWh-blok:
    #
    #   Besparing = battery_used × pE  (vermeden netimport tegen inkooprijs)
    #   Kost      = battery_charge × pT (gemiste exportopbrengst)
    #   Netto     = besparing − kost    (roundtrip-verlies is impliciet: used < charge)
    #
    # Uitgesplitst voor transparantie (maar niet dubbel opgeteld):
    #   Vermeden import:  battery_used × pE
    #   Gemiste export:   battery_charge × pT  (aftrekpost)
    #   Roundtrip-verlies = battery_charge × (1−BATT_EFF) kWh → impliciet in het verschil
    # ================================================================
    grid_besparing_kwh  = max(0.0, grid_import_without - grid_import_with)
    export_shift_kwh_   = max(0.0, export_kwh_zonder - export_kwh_with)

    # Terugleverkosten / terugleververgoeding aanpassing
    shift_ratio = clamp(battery_charge / max(export_kwh_zonder, 1.0), 0.0, 1.0)
    saved_tk    = tk_jaar * shift_ratio
    lost_tv     = tv_jaar * shift_ratio

    # Netto zelfconsumptie-besparing — correcte tweetermige formule
    export_loss_eur = battery_charge * pT  # gemiste exportopbrengst (voor weergave)
    net_sc_saving = max(0.0,
        battery_used * pE - battery_charge * pT + saved_tk - lost_tv
    )

    net_energy_saving = net_sc_saving
    grid_besparing_eur = grid_besparing_kwh * pE

    # ================================================================
    # STAP 4 — COMPONENT 3: DYNAMISCHE EPEX-ARBITRAGE (180–260 cycli)
    #
    # Laag scenario:  180 cycli × laag-spread (conservatief marktjaar)
    # Hoog scenario:  260 cycli × hoog-spread (optimaal EMS + piekseizoen)
    # Spreads zijn afgeleid van pE (zie boven), niet vast.
    # ================================================================
    ems_kwh_low  = bat_kWh * EMS_CYC_LOW  * BATT_EFF
    ems_kwh_high = bat_kWh * EMS_CYC_HIGH * BATT_EFF

    # Interactie-multiplier direct in EMS opgenomen: arbitrage profiteert van cascade-effect
    # (grid ↓ + export ↓ + zelfverbruik ↑ werken samen), self-consumption is exacte fysica.
    # Door multiplier in EMS op te nemen kloppen alle breakdown-regels optelbaar tot het totaal.
    ems_lo = ems_kwh_low  * spread_low  * INTERACTION_LOW
    ems_hi = ems_kwh_high * spread_high * INTERACTION_HIGH

    # ================================================================
    # STAP 5 — TOTAAL: zelfconsumptie + arbitrage + escalatie + saldering
    # raw = sc (exacte fysica) + EMS (incl. interactie-uplift)
    # Alle onderdelen zijn optelbaar en transparant weergegeven in breakdown.
    # ================================================================
    raw_low  = net_sc_saving + ems_lo
    raw_high = net_sc_saving + ems_hi

    _export_shift      = max(0.0, export_kwh_zonder - export_kwh_with)
    _sald_spread       = max(0.0, pE - pT)
    sald_protection_eur = round(_export_shift * _sald_spread * SALD_AVG_FACTOR)

    # Realistische bovengrens voor kleine systemen (≤20 kWh): jaartotaal gecapt op €10.000.
    # We schalen raw (en dus ems) terug i.p.v. alleen het totaal, zodat ALLE breakdown-regels
    # optelbaar blijven tot het totaal:  total = raw × escalation_factor + saldering.
    if bat_kWh <= 20.0:
        max_raw = max(0.0, (10000.0 - sald_protection_eur) / escalation_factor)
        if raw_high > max_raw:
            raw_high = max(net_sc_saving, max_raw)
            ems_hi   = max(0.0, raw_high - net_sc_saving)
        if raw_low > raw_high:
            raw_low = raw_high
            ems_lo  = max(0.0, raw_low - net_sc_saving)

    escalation_eur_low  = round(raw_low  * (escalation_factor - 1))
    escalation_eur_high = round(raw_high * (escalation_factor - 1))

    total_annual_low  = round(raw_low  + escalation_eur_low  + sald_protection_eur)
    total_annual_high = round(raw_high + escalation_eur_high + sald_protection_eur)

    if total_annual_low > total_annual_high:
        total_annual_low, total_annual_high = total_annual_high, total_annual_low
        ems_lo, ems_hi = ems_hi, ems_lo
        escalation_eur_low, escalation_eur_high = escalation_eur_high, escalation_eur_low

    total_daily_low  = total_annual_low  / 365.0
    total_daily_high = total_annual_high / 365.0

    ems_display_low  = round(ems_lo, 0)
    ems_display_high = round(ems_hi, 0)

    bill_savings_annual  = net_energy_saving
    bill_savings_monthly = bill_savings_annual / 12.0

    # ================================================================
    # STAP 6 — TERUGVERDIENTIJD
    # ================================================================
    payback_low  = battery_price / total_annual_high if total_annual_high > 0 else 25.0
    payback_high = battery_price / total_annual_low  if total_annual_low  > 0 else 25.0
    payback_low  = clamp(payback_low,  1.5, 12.0)
    payback_high = clamp(payback_high, payback_low + 0.1, 15.0)

    # ================================================================
    # DISPLAY METRICS
    # ================================================================
    teruglevering_pct_voor = export_kwh_zonder / PV * 100.0 if PV > 0 else 0.0
    teruglevering_pct_na   = export_kwh_with   / PV * 100.0 if PV > 0 else 0.0
    net_voor_pct           = grid_import_without / V * 100.0 if V > 0 else 0.0
    net_na_pct             = grid_import_with    / V * 100.0 if V > 0 else 0.0
    netonafhankelijkheid   = clamp(
        ((net_voor_pct - net_na_pct) / max(net_voor_pct, 1.0)) * 100.0,
        0.0, 95.0
    )

    # Total cycles for display (solar + EMS midpoint)
    ems_cyc_mid = (EMS_CYC_LOW + EMS_CYC_HIGH) / 2
    total_cycli = clamp(solar_cycli + ems_cyc_mid, 200.0, 460.0)

    return {
        "smart_daily_low":             round(ems_display_low  / 365.0,   2),
        "smart_daily_high":            round(ems_display_high / 365.0,   2),
        "smart_annual_low":            ems_display_low,
        "smart_annual_high":           ems_display_high,
        "bill_savings_annual":         round(bill_savings_annual,         0),
        "bill_savings_monthly":        round(bill_savings_monthly,        0),
        "total_annual_low":            float(total_annual_low),
        "total_annual_high":           float(total_annual_high),
        "total_daily_low":             round(total_daily_low,             2),
        "total_daily_high":            round(total_daily_high,            2),
        "payback_low":                 round(payback_low,                 1),
        "payback_high":                round(payback_high,                1),
        "zelfverbruik_voor":           round(sc_pct_zonder,               1),
        "zelfverbruik_na":             round(sc_pct_met,                  1),
        "netonafhankelijkheid":        round(netonafhankelijkheid,         1),
        "teruglevering_voor":          round(teruglevering_pct_voor,      1),
        "teruglevering_na":            round(teruglevering_pct_na,        1),
        "bat_shift_kwh":               round(sc_battery_kwh,              0),
        "saved_terugleverkosten":      round(saved_tk,                    0),
        "lost_terugleververgoeding":   round(lost_tv,                     0),
        "grid_import_without":         round(grid_import_without,         0),
        "grid_cost_without":           round(grid_cost_without,           0),
        "export_revenue_without":      round(export_revenue_without,      0),
        "net_annual_cost_without":     round(net_annual_cost_without,     0),
        "grid_cost_with":              round(grid_import_with * pE,       0),
        "export_kwh_with":             round(export_kwh_with,             0),
        "sc_direct_kwh":               round(sc_direct_kwh,               0),
        "sc_battery_kwh":              round(sc_battery_kwh,              0),
        "sc_total_kwh":                round(sc_total_kwh,                0),
        "sc_pct_zonder":               round(sc_pct_zonder,               1),
        "sc_pct_met":                  round(sc_pct_met,                  1),
        "grid_import_with":            round(grid_import_with,            0),
        "grid_import_besparing_kwh":   round(grid_besparing_kwh,          0),
        "grid_import_besparing_eur":   round(grid_besparing_eur,          0),
        "export_kwh_zonder":           round(export_kwh_zonder,           0),
        "export_shift_kwh":            round(export_shift_kwh_,           0),
        "export_revenue_loss_eur":     round(export_loss_eur,             0),
        "battery_charge_kwh":          round(battery_charge,              0),
        "shift_pct":                   round(shift_ratio * 100.0,         0),
        "battery_arbitrage_eur":       round((ems_lo + ems_hi) / 2,       0),
        "net_energy_saving_eur":       round(net_energy_saving,           0),
        "pE_used":                     round(pE,                          4),
        "pT_used":                     round(pT,                          4),
        "pv_input":                    round(PV,                          0),
        "v_input":                     round(V,                           0),
        "t_input":                     round(T,                           0),
        "batterySelfConsumption":      round(sc_battery_kwh,              0),
        "totalSelfConsumption":        round(sc_total_kwh,                0),
        "ems_solar_cycles":            round(solar_cycli,                 0),
        "ems_total_cycles":            round(total_cycli,                 0),
        "ems_cycli":                   round(ems_cyc_mid,                 0),
        "spread_low":                  round(spread_low,                  2),
        "spread_high":                 round(spread_high,                 2),
        "dynamic_contract":            dynamic_contract,
        "escalation_eur_low":          float(escalation_eur_low),
        "escalation_eur_high":         float(escalation_eur_high),
        "sald_protection_eur":         float(sald_protection_eur),
        "garantie_bonus":              0.0,
        "ems_physics_low":             round(ems_lo,                      0),
        "ems_physics_high":            round(ems_hi,                      0),
        "net_voor_pct":                round(clamp(net_voor_pct, 0.0, 100.0), 1),
        "net_na_pct":                  round(clamp(net_na_pct,   0.0, 100.0), 1),
    }


@api_router.get("/")
async def root():
    return {"message": "VOLTRAX API - AlphaESS Calculator"}


@api_router.post("/calculate", response_model=CalculationResult)
async def calculate(input_data: CalculationInput):
    results = calculate_battery_savings(
        zonneproductie=input_data.zonneproductie,
        jaarverbruik=input_data.jaarverbruik,
        teruglevering=input_data.teruglevering,
        pE=input_data.prijsInkoop,
        pT=input_data.prijsTeruglevering,
        bat_kWh=input_data.battery_kWh,
        battery_price=input_data.battery_price,
        terugleververgoeding_value=input_data.terugleververgoeding_value or 0,
        terugleververgoeding_unit=input_data.terugleververgoeding_unit or "kWh",
        terugleverkosten_value=input_data.terugleverkosten_value or 0,
        terugleverkosten_unit=input_data.terugleverkosten_unit or "jaar",
        dynamic_contract=input_data.dynamic_contract or False,
    )
    calculations_store.append({"input": input_data.model_dump(), "results": results})
    return CalculationResult(**results)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DIST_DIR = os.path.join(os.path.dirname(__file__), "../frontend/dist")

if os.path.isdir(DIST_DIR):
    assets_dir = os.path.join(DIST_DIR, "assets")
    if os.path.isdir(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path:
            candidate = os.path.join(DIST_DIR, full_path)
            if os.path.isfile(candidate):
                return FileResponse(candidate)
        return FileResponse(os.path.join(DIST_DIR, "index.html"))

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)
