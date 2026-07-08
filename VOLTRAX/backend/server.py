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
    terugleverkosten_jaar: Optional[float] = None
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


# ================================================================
# DAGELIJKSE HANDEL OP DE ENERGIEMARKT — dagvoordeel (€/dag) per
# batterijcapaciteit (AlphaESS-moduletrappen). Jaarvoordeel = €/dag × 365.
# Tussenliggende capaciteiten worden lineair geïnterpoleerd; daarbuiten
# proportioneel (onder 9,3 kWh) of geëxtrapoleerd (boven 55,6 kWh).
# ================================================================
EMS_DAY_TABLE = [
    (9.3,  2.30,  2.70),
    (18.6, 3.10,  3.90),
    (27.9, 4.40,  5.60),
    (37.2, 5.70,  7.00),
    (46.5, 6.90,  8.50),
    (55.6, 8.10, 10.40),
]


def ems_daily_trade(bat_kWh: float) -> tuple:
    """Dagvoordeel (laag, hoog) in €/dag voor de gegeven batterijcapaciteit."""
    tbl = EMS_DAY_TABLE
    b = max(bat_kWh, 0.0)
    if b <= tbl[0][0]:
        f = b / tbl[0][0]
        return tbl[0][1] * f, tbl[0][2] * f
    if b >= tbl[-1][0]:
        (x0, l0, h0), (x1, l1, h1) = tbl[-2], tbl[-1]
        sl = (l1 - l0) / (x1 - x0)
        sh = (h1 - h0) / (x1 - x0)
        return l1 + sl * (b - x1), h1 + sh * (b - x1)
    for (x0, l0, h0), (x1, l1, h1) in zip(tbl, tbl[1:]):
        if x0 <= b <= x1:
            f = (b - x0) / (x1 - x0)
            return l0 + (l1 - l0) * f, h0 + (h1 - h0) * f
    return tbl[-1][1], tbl[-1][2]


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
    SolarFast v9 — Max-ROI energiemodel met systeem-interactie.

    Component 1: Vermeden netimport   (battery_used × pE − battery_charge × pT)
    Component 2: Dagelijkse markthandel (dagvoordeel per capaciteit uit EMS_DAY_TABLE × 365)
    Component 3: Escalatie            (CBS 5%/jr, 10-jaar horizon, factor 1.3207) — informatief
    Component 4: Salderings-bescherming (export-shift × prijsverschil × 0.75) — informatief

    Stap 2 schaalt met de batterijcapaciteit volgens EMS_DAY_TABLE (AlphaESS-moduletrappen
    9,3 → 55,6 kWh); jaarvoordeel = dagvoordeel × 365. De velden spread_low/high, ems_cycli
    en de INTERACTION/EMS_CYC-constanten zijn LEGACY: ze worden nog teruggegeven voor
    achtergrond maar sturen het stap-2-bedrag niet meer aan.
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
    # STAP 1 — SITUATIE ZONDER BATTERIJ  (sluitende energiebalans)
    #
    # Direct zelfverbruik = zon die op het opwek-moment wordt gebruikt (tijds-overlap).
    # Fysiek begrensd door de SCHAARSTE van twee zaken: (a) de opwek zelf, en (b) het
    # verbruik dat overdag plaatsvindt (DAYTIME_LOAD_FRAC × verbruik). Voor een normaal
    # NL-huis (opwek ≈ 1,5× verbruik) levert dit ~30% van de opwek direct verbruik op —
    # de gangbare NL-norm — en voor een klein PV-systeem ~100% (alles wordt direct benut).
    # De teruglevering-invoer wordt gehonoreerd zolang die fysiek kan; een te lage/
    # onmogelijke waarde (zou negatieve netinkoop opleveren) wordt gecorrigeerd. Daardoor
    # klopt de balans ALTIJD:
    #     opwek    = direct zelfverbruik + export
    #     verbruik = direct zelfverbruik + netinkoop
    #     export   − netinkoop = opwek − verbruik
    # ================================================================
    DAYTIME_LOAD_FRAC = 0.45    # fractie van het verbruik dat samenvalt met zon-opwek

    sc_overlap_cap      = min(PV, V)
    sc_direct_realistic = min(PV, DAYTIME_LOAD_FRAC * V)            # fysieke schatting als invoer ontbreekt

    # De door de klant ingevoerde teruglevering is GEMETEN grondwaarheid (jaarrekening) en is
    # LEIDEND: export_kwh_zonder = T, dus direct zelfverbruik = PV − T. Alleen wanneer er geen
    # teruglevering is opgegeven (T = 0) valt het model terug op de fysieke schatting (≈45% overlap).
    # Een fysiek onmogelijke export (< PV − verbruik) wordt door de cap naar die ondergrens gebracht.
    if T > 0.0:
        sc_direct_kwh = clamp(PV - T, 0.0, sc_overlap_cap)
    else:
        sc_direct_kwh = clamp(sc_direct_realistic, 0.0, sc_overlap_cap)

    grid_import_without = max(0.0, V - sc_direct_kwh)
    export_kwh_zonder   = max(0.0, PV - sc_direct_kwh)
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
    # Batterij laadt overdag het surplus (export) en ontlaadt 's avonds/'s nachts om
    # netinkoop te vermijden. Begrensd door: (1) beschikbaar surplus, (2) vermijdbare
    # inkoop, (3) fysieke jaardoorzet (capaciteit × cycli × rendement). Er blijft een
    # realistische restinkoop over (winter: zon < vraag), dus inkoop wordt nooit 0.
    # ================================================================
    RESIDUAL_FRAC = 0.15    # min. 15% van de oorspronkelijke inkoop blijft (winterimport)

    # Zelfverbruik-doorzet begrensd op SOLAR_MAX cycli/jaar (consistent v9-budget).
    battery_throughput = bat_kWh * float(SOLAR_MAX) * BATT_EFF      # max kWh die batterij levert
    max_shiftable      = grid_import_without * (1.0 - RESIDUAL_FRAC)
    battery_used       = max(0.0, min(battery_throughput, max_shiftable, export_kwh_zonder * BATT_EFF))

    battery_charge     = min(battery_used / BATT_EFF, export_kwh_zonder)
    battery_used       = battery_charge * BATT_EFF
    solar_cycli        = clamp(battery_charge / max(bat_kWh, 1.0), 0.0, float(SOLAR_MAX))

    grid_import_with = max(0.0, grid_import_without - battery_used)
    export_kwh_with  = max(0.0, export_kwh_zonder - battery_charge)
    sc_battery_kwh   = battery_used
    sc_total_kwh     = sc_direct_kwh + sc_battery_kwh

    SC_MAX = clamp(92.0 + (bat_kWh / 9.3) * 0.5, 92.0, 96.0)
    sc_cap_kwh = min(PV * SC_MAX / 100.0, V)
    if sc_total_kwh > sc_cap_kwh:
        # Begrens alleen de batterijbijdrage; nooit onder het directe zelfverbruik zakken.
        sc_total_kwh     = max(sc_direct_kwh, sc_cap_kwh)
        sc_battery_kwh   = max(0.0, sc_total_kwh - sc_direct_kwh)
        battery_used     = sc_battery_kwh
        battery_charge   = min(export_kwh_zonder, battery_used / BATT_EFF)
        grid_import_with = max(0.0, grid_import_without - battery_used)
        export_kwh_with  = max(0.0, export_kwh_zonder - battery_charge)
    sc_pct_met = clamp(sc_total_kwh / PV * 100.0, 0.0, 100.0)

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
    # STAP 4 — DAGELIJKSE HANDEL OP DE ENERGIEMARKT
    #
    # Het EMS handelt dagelijks op de spotmarkt: laden bij lage uurprijzen,
    # inzetten/terugleveren bij hoge marktprijzen. Het dagvoordeel schaalt met
    # de batterijcapaciteit (AlphaESS-moduletrappen 9,3 → 55,6 kWh, zie
    # EMS_DAY_TABLE). Jaarvoordeel = dagvoordeel × 365.
    # ================================================================
    ems_day_low, ems_day_high = ems_daily_trade(bat_kWh)
    ems_lo = ems_day_low  * 365.0
    ems_hi = ems_day_high * 365.0

    # ================================================================
    # STAP 5 — BASISLIJN: zelfconsumptie (stap 1) + EPEX-arbitrage (stap 2)
    # raw = sc (exacte fysica) + EMS (incl. interactie-uplift).
    # Escalatie (stap 3) en saldering (stap 4) worden hieronder apart berekend
    # als INFORMATIEVE prognoses en tellen NIET mee in het jaartotaal.
    # ================================================================
    raw_low  = net_sc_saving + ems_lo
    raw_high = net_sc_saving + ems_hi

    _export_shift      = max(0.0, export_kwh_zonder - export_kwh_with)
    _sald_spread       = max(0.0, pE - pT)
    sald_protection_eur = round(_export_shift * _sald_spread * SALD_AVG_FACTOR)

    # Realistische bovengrens voor kleine systemen (≤20 kWh): basislijn (stap 1 + stap 2)
    # gecapt op €10.000. We schalen raw (en dus ems) terug, zodat de breakdown blijft kloppen.
    if bat_kWh <= 20.0:
        # Totaal = stap 1 + stap 2 (escalatie/saldering tellen NIET mee), dus cap raw direct op €10.000.
        max_raw = 10000.0
        if raw_high > max_raw:
            raw_high = max(net_sc_saving, max_raw)
            ems_hi   = max(0.0, raw_high - net_sc_saving)
        if raw_low > raw_high:
            raw_low = raw_high
            ems_lo  = max(0.0, raw_low - net_sc_saving)

    escalation_eur_low  = round(raw_low  * (escalation_factor - 1))
    escalation_eur_high = round(raw_high * (escalation_factor - 1))

    # Defensieve normalisatie van de volgorde (laag ≤ hoog).
    if raw_low > raw_high:
        raw_low, raw_high = raw_high, raw_low
        ems_lo, ems_hi = ems_hi, ems_lo
        escalation_eur_low, escalation_eur_high = escalation_eur_high, escalation_eur_low

    ems_display_low  = round(ems_lo, 0)
    ems_display_high = round(ems_hi, 0)

    bill_savings_annual  = net_energy_saving
    bill_savings_monthly = bill_savings_annual / 12.0

    # ================================================================
    # BASISLIJN-TOTAAL = STAP 1 (zelfconsumptie) + STAP 2 (EPEX-arbitrage).
    # Stap 3 (energieprijsstijging) en stap 4 (salderingsbescherming) zijn
    # INFORMATIEVE prognoses: ze worden apart teruggegeven maar NIET opgeteld
    # in total_annual, de terugverdientijd of het netto-resultaat na 10 jaar.
    # ================================================================
    total_annual_low  = round(bill_savings_annual) + ems_display_low
    total_annual_high = round(bill_savings_annual) + ems_display_high

    total_daily_low  = total_annual_low  / 365.0
    total_daily_high = total_annual_high / 365.0

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
        "terugleverkosten_jaar":       round(tk_jaar,                     0),
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
        "t_input":                     round(export_kwh_zonder,           0),
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
    return {"message": "SolarFast API - HYXiPower Calculator"}


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
