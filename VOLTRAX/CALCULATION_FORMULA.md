# VOLTRAX batterijbesparingscalculator — volledige formule

Dit document beschrijft de huidige backend-berekening stap voor stap. De
formules hieronder zijn bedoeld om het model buiten de website opnieuw te
gebruiken.

## 0. Invoer

| Variabele | Betekenis | Eenheid |
|---|---|---:|
| `zonneproductie` | jaarlijkse zonne-opwek | kWh/jaar |
| `jaarverbruik` | jaarlijks totaal elektriciteitsverbruik | kWh/jaar |
| `teruglevering` | door de gebruiker gemeten jaarlijkse teruglevering | kWh/jaar |
| `pE` | prijs voor inkoop van het net | €/kWh |
| `pT` | waarde/prijs van teruggeleverde elektriciteit | €/kWh |
| `battery_kWh` | nominale batterijcapaciteit | kWh |
| `battery_price` | totale investering inclusief installatie en btw | € |
| `terugleververgoeding_value` | vergoeding voor teruglevering, per kWh of per jaar | € |
| `terugleververgoeding_unit` | `"kWh"` of `"jaar"` | — |
| `terugleverkosten_value` | terugleverkosten, per kWh of per jaar | € |
| `terugleverkosten_unit` | `"kWh"` of `"jaar"` | — |
| `dynamic_contract` | of een dynamisch contract actief is | boolean |

### Normalisatie van invoer

```text
PV = max(zonneproductie, 1.0)
V  = max(jaarverbruik, 1.0)
T  = clamp(teruglevering, 0.0, PV × 0.97)
```

De functie `clamp(x, minimum, maximum)` is:

```text
clamp(x, minimum, maximum) = max(minimum, min(maximum, x))
```

De gebruikte vaste parameters zijn:

```text
BATT_EFF          = 0.95     # roundtrip-rendement
SOLAR_MAX         = 200      # maximale batterij-doorzet in laadkWh per jaar
DAYTIME_LOAD_FRAC = 0.45     # aandeel van verbruik dat met zon overlapt
RESIDUAL_FRAC     = 0.15     # minimaal aandeel oorspronkelijke netinkoop dat blijft
SALD_AVG_FACTOR   = 0.75     # gemiddelde factor voor salderingsbescherming
ESCALATION_RATE   = 0.05     # informatieve jaarlijkse prijsstijging
HORIZON           = 10       # informatieve prognosehorizon in jaren
```

> `pE` en `pT` worden door de calculator uit de invoer gehaald. Als de
> frontend geen inkoopprijs meestuurt, is de frontend-default `pE = 0.28`.
> Als de frontend geen terugleverprijs meestuurt, is de default `pT = 0.07`.

---

## Stap 1 — huidige situatie zonder batterij

### 1.1 Direct zelfverbruik

Eerst wordt bepaald hoeveel zonne-energie direct op het moment van opwek in
de woning wordt gebruikt.

```text
sc_overlap_cap      = min(PV, V)
sc_direct_realistic = min(PV, DAYTIME_LOAD_FRAC × V)
```

De gemeten teruglevering `T` is leidend als de gebruiker een waarde groter dan
nul heeft ingevuld:

```text
als T > 0:
    sc_direct_kwh = clamp(PV − T, 0, sc_overlap_cap)
anders:
    sc_direct_kwh = clamp(sc_direct_realistic, 0, sc_overlap_cap)
```

Daaruit volgt de sluitende energiebalans:

```text
grid_import_without = max(0, V − sc_direct_kwh)
export_kwh_zonder    = max(0, PV − sc_direct_kwh)
sc_pct_zonder        = 100 × sc_direct_kwh / PV
```

De balans sluit altijd:

```text
PV = sc_direct_kwh + export_kwh_zonder
V  = sc_direct_kwh + grid_import_without
```

Daarom geldt ook:

```text
export_kwh_zonder − grid_import_without = PV − V
```

### 1.2 Terugleverkosten en terugleververgoeding

```text
als dynamic_contract = waar
en terugleverkosten_unit = "kWh":
    effective_tk_value = 0
anders:
    effective_tk_value = terugleverkosten_value
```

De jaarlijkse bedragen zijn:

```text
als terugleverkosten_unit = "kWh":
    tk_jaar = effective_tk_value × export_kwh_zonder
anders:
    tk_jaar = terugleverkosten_value
```

```text
als terugleververgoeding_unit = "kWh":
    tv_jaar = terugleververgoeding_value × export_kwh_zonder
anders:
    tv_jaar = terugleververgoeding_value
```

De jaarlijkse kosten zonder batterij zijn:

```text
grid_cost_without       = grid_import_without × pE
export_revenue_without  = export_kwh_zonder × pT
net_annual_cost_without =
    grid_cost_without
    − export_revenue_without
    + tk_jaar
    − tv_jaar
```

---

## Stap 2 — energieflow met batterij

De batterij gebruikt eerst het beschikbare zonnestroomoverschot en levert die
energie later terug om netinkoop te vermijden.

### 2.1 Maximale batterij-doorzet

```text
battery_throughput = battery_kWh × SOLAR_MAX × BATT_EFF
max_shiftable      = grid_import_without × (1 − RESIDUAL_FRAC)
```

De werkelijk door de batterij geleverde energie is de kleinste van drie
grenzen:

```text
battery_used = max(
    0,
    min(
        battery_throughput,
        max_shiftable,
        export_kwh_zonder × BATT_EFF
    )
)
```

`battery_used` is de energie die daadwerkelijk uit de batterij komt en in de
woning wordt gebruikt. De benodigde laadenergie is:

```text
battery_charge = min(
    battery_used / BATT_EFF,
    export_kwh_zonder
)
```

Daarna wordt `battery_used` opnieuw op rendement gebaseerd:

```text
battery_used = battery_charge × BATT_EFF
```

Het aantal zonne-laadcycli voor weergave is:

```text
solar_cycli = clamp(
    battery_charge / max(battery_kWh, 1.0),
    0,
    SOLAR_MAX
)
```

### 2.2 Situatie met batterij

```text
grid_import_with = max(
    0,
    grid_import_without − battery_used
)

export_kwh_with = max(
    0,
    export_kwh_zonder − battery_charge
)

sc_battery_kwh = battery_used
sc_total_kwh   = sc_direct_kwh + sc_battery_kwh
```

### 2.3 Maximale zelfconsumptie-cap

De maximale zelfconsumptie wordt afhankelijk van de batterijgrootte begrensd:

```text
SC_MAX = clamp(
    92 + (battery_kWh / 9.3) × 0.5,
    92,
    96
)

sc_cap_kwh = min(
    PV × SC_MAX / 100,
    V
)
```

Als de voorlopige totale zelfconsumptie boven deze cap uitkomt:

```text
als sc_total_kwh > sc_cap_kwh:
    sc_total_kwh   = max(sc_direct_kwh, sc_cap_kwh)
    sc_battery_kwh = max(0, sc_total_kwh − sc_direct_kwh)
    battery_used   = sc_battery_kwh
    battery_charge = min(
        export_kwh_zonder,
        battery_used / BATT_EFF
    )
    grid_import_with = max(
        0,
        grid_import_without − battery_used
    )
    export_kwh_with = max(
        0,
        export_kwh_zonder − battery_charge
    )
```

De zelfconsumptie na plaatsing van de batterij:

```text
sc_pct_met = clamp(
    100 × sc_total_kwh / PV,
    0,
    100
)
```

---

## Stap 3 — financiële waarde van extra zelfconsumptie

De batterij verlaagt de netinkoop, maar veroorzaakt ook minder exportopbrengst.
Die twee effecten horen bij hetzelfde verschoven kWh-blok en mogen niet
dubbel worden opgeteld.

### 3.1 Verschoven energie

```text
grid_besparing_kwh = max(
    0,
    grid_import_without − grid_import_with
)

export_shift_kwh = max(
    0,
    export_kwh_zonder − export_kwh_with
)
```

Het aandeel van de oorspronkelijke export dat wordt verschoven:

```text
shift_ratio = clamp(
    battery_charge / max(export_kwh_zonder, 1.0),
    0,
    1
)
```

### 3.2 Vermeden terugleverkosten en gemiste vergoeding

```text
saved_tk = tk_jaar × shift_ratio
lost_tv  = tv_jaar × shift_ratio
```

### 3.3 Netto jaarlijkse energiebesparing

```text
export_loss_eur = battery_charge × pT

net_sc_saving = max(
    0,
    battery_used × pE
    − battery_charge × pT
    + saved_tk
    − lost_tv
)
```

Dit is de kernformule voor de besparing op de energiestroom:

```text
net_energy_saving = net_sc_saving
```

Ter vergelijking: de bruto waarde van alleen vermeden netimport is:

```text
grid_besparing_eur = grid_besparing_kwh × pE
```

`grid_besparing_eur` is een informatieve bruto-waarde. Voor de echte
financiële basislijn moet `net_energy_saving` worden gebruikt, omdat die ook
de gemiste exportopbrengst en de wijziging in terugleverkosten/vergoeding
verwerkt.

---

## Stap 4 — dagelijkse handel op de energiemarkt (EMS/EPEX)

Het EMS-bedrag wordt niet meer berekend met cycli × spread. Het wordt bepaald
door een stukgewijs lineaire lookup op basis van batterijcapaciteit.

### 4.1 EMS-tabel

Elke rij bevat:

```text
batterijcapaciteit_kWh → laag dagvoordeel, hoog dagvoordeel
```

| Capaciteit | Laag €/dag | Hoog €/dag |
|---:|---:|---:|
| 9,3 kWh | 2,30 | 2,70 |
| 18,6 kWh | 3,10 | 3,90 |
| 27,9 kWh | 4,40 | 5,60 |
| 37,2 kWh | 5,70 | 7,00 |
| 46,5 kWh | 6,90 | 8,50 |
| 55,6 kWh | 8,10 | 10,40 |

Noem een tabelpunt `(x, low, high)`.

### 4.2 Onderste punt: proportionele schaal

Voor `battery_kWh <= 9,3`:

```text
f = battery_kWh / 9.3

ems_day_low  = 2.30 × f
ems_day_high = 2.70 × f
```

### 4.3 Tussen twee tabelpunten: lineaire interpolatie

Voor een batterijcapaciteit `b` tussen twee punten:

```text
(x0, low0, high0)
(x1, low1, high1)
```

bereken:

```text
f = (b − x0) / (x1 − x0)

ems_day_low  = low0  + (low1  − low0)  × f
ems_day_high = high0 + (high1 − high0) × f
```

### 4.4 Bovenste punt: extrapolatie met laatste helling

Voor `battery_kWh >= 55,6`:

```text
low_slope  = (8.10 − 6.90) / (55.6 − 46.5)
high_slope = (10.40 − 8.50) / (55.6 − 46.5)

ems_day_low  = 8.10 + low_slope  × (battery_kWh − 55.6)
ems_day_high = 10.40 + high_slope × (battery_kWh − 55.6)
```

### 4.5 Van dag naar jaar

```text
ems_annual_low  = ems_day_low  × 365
ems_annual_high = ems_day_high × 365
```

De frontend toont deze bedragen afgerond op hele euro's:

```text
ems_display_low  = round(ems_annual_low)
ems_display_high = round(ems_annual_high)
```

De oudere velden `spread_low`, `spread_high`, `ems_cycli` en de
interactie-constanten zijn uitsluitend achtergrond-/displayvelden. Ze sturen
het huidige EMS-bedrag niet meer aan.

---

## Stap 5 — basislijn en informatieve prognoses

### 5.1 Basislijn totaal

Alleen stap 3 (netto zelfconsumptie) en stap 4 (EMS) tellen mee in het
headline-jaartotaal:

```text
raw_low  = net_sc_saving + ems_annual_low
raw_high = net_sc_saving + ems_annual_high
```

Voor systemen van maximaal 20 kWh geldt een bovengrens van €10.000 op het
hoge basisscenario:

```text
als battery_kWh <= 20 en raw_high > 10000:
    raw_high = max(net_sc_saving, 10000)
    ems_annual_high = max(0, raw_high − net_sc_saving)

als raw_low > raw_high:
    raw_low = raw_high
    ems_annual_low = max(0, raw_low − net_sc_saving)
```

Vervolgens:

```text
ems_display_low  = round(ems_annual_low)
ems_display_high = round(ems_annual_high)

total_annual_low  = round(net_energy_saving) + ems_display_low
total_annual_high = round(net_energy_saving) + ems_display_high
```

De dagelijkse waarden:

```text
total_daily_low  = total_annual_low  / 365
total_daily_high = total_annual_high / 365
```

### 5.2 Informatieve prijsstijging — niet in de basislijn

De 10-jaarsfactor voor een gelijkmatig jaarlijks stijgingspercentage is:

```text
escalation_factor =
    (1 + r) × ((1 + r)^n − 1) / (n × r)
```

Met:

```text
r = 0.05
n = 10
```

geeft dit ongeveer:

```text
escalation_factor ≈ 1.3207
```

De informatieve bedragen zijn:

```text
escalation_eur_low  = round(raw_low  × (escalation_factor − 1))
escalation_eur_high = round(raw_high × (escalation_factor − 1))
```

Deze bedragen worden getoond als prognose, maar worden **niet** toegevoegd aan
`total_annual`, `payback` of het nettoresultaat na 10 jaar.

### 5.3 Informatieve salderingsbescherming — niet in de basislijn

```text
export_shift      = max(0, export_kwh_zonder − export_kwh_with)
sald_spread       = max(0, pE − pT)
sald_protection_eur =
    round(export_shift × sald_spread × SALD_AVG_FACTOR)
```

Ook dit bedrag is informatief en wordt **niet** toegevoegd aan het
headline-jaartotaal of de terugverdientijd.

---

## Stap 6 — terugverdientijd

De lage terugverdientijd gebruikt het hoge jaarlijkse voordeel. De hoge
terugverdientijd gebruikt het lage jaarlijkse voordeel:

```text
als total_annual_high > 0:
    payback_low = battery_price / total_annual_high
anders:
    payback_low = 25
```

```text
als total_annual_low > 0:
    payback_high = battery_price / total_annual_low
anders:
    payback_high = 25
```

Daarna worden de waarden begrensd voor de presentatie:

```text
payback_low  = clamp(payback_low, 1.5, 12.0)
payback_high = clamp(payback_high, payback_low + 0.1, 15.0)
```

De maandelijkse besparing:

```text
bill_savings_annual  = net_energy_saving
bill_savings_monthly = bill_savings_annual / 12
```

---

## Aanvullende weergavemetrics

Deze metrics zijn geen extra financiële waarde; ze beschrijven het energie-
effect van de batterij.

```text
teruglevering_pct_voor = 100 × export_kwh_zonder / PV
teruglevering_pct_na   = 100 × export_kwh_with   / PV

net_voor_pct = 100 × grid_import_without / V
net_na_pct   = 100 × grid_import_with    / V
```

Netonafhankelijkheid:

```text
netonafhankelijkheid = clamp(
    100 × (net_voor_pct − net_na_pct) / max(net_voor_pct, 1.0),
    0,
    95
)
```

---

## Compacte herbruikbare pseudocode

```python
def clamp(x, lo, hi):
    return max(lo, min(hi, x))


def ems_daily_trade(b):
    table = [
        (9.3,  2.30,  2.70),
        (18.6, 3.10,  3.90),
        (27.9, 4.40,  5.60),
        (37.2, 5.70,  7.00),
        (46.5, 6.90,  8.50),
        (55.6, 8.10, 10.40),
    ]
    b = max(b, 0.0)

    if b <= table[0][0]:
        factor = b / table[0][0]
        return table[0][1] * factor, table[0][2] * factor

    if b >= table[-1][0]:
        x0, low0, high0 = table[-2]
        x1, low1, high1 = table[-1]
        low_slope = (low1 - low0) / (x1 - x0)
        high_slope = (high1 - high0) / (x1 - x0)
        return (
            low1 + low_slope * (b - x1),
            high1 + high_slope * (b - x1),
        )

    for (x0, low0, high0), (x1, low1, high1) in zip(table, table[1:]):
        if x0 <= b <= x1:
            factor = (b - x0) / (x1 - x0)
            return (
                low0 + (low1 - low0) * factor,
                high0 + (high1 - high0) * factor,
            )


def calculate(
    pv_input,
    annual_consumption,
    export_input,
    import_price,
    export_price,
    battery_kwh,
    battery_price,
    export_compensation=0.0,
    export_compensation_unit="kWh",
    feedin_cost=0.0,
    feedin_cost_unit="jaar",
    dynamic_contract=False,
):
    # Constants
    EFF = 0.95
    SOLAR_MAX = 200
    DAYTIME_LOAD_FRAC = 0.45
    RESIDUAL_FRAC = 0.15

    # Input normalization
    PV = max(pv_input, 1.0)
    V = max(annual_consumption, 1.0)
    T = clamp(export_input, 0.0, PV * 0.97)

    # Step 1: no battery
    overlap_cap = min(PV, V)
    realistic_direct = min(PV, DAYTIME_LOAD_FRAC * V)
    if T > 0.0:
        direct_sc = clamp(PV - T, 0.0, overlap_cap)
    else:
        direct_sc = clamp(realistic_direct, 0.0, overlap_cap)

    grid_without = max(0.0, V - direct_sc)
    export_without = max(0.0, PV - direct_sc)

    effective_feed_in_cost = (
        0.0
        if dynamic_contract and feedin_cost_unit == "kWh"
        else feedin_cost
    )
    if feedin_cost_unit == "kWh":
        feedin_cost_year = effective_feed_in_cost * export_without
    else:
        feedin_cost_year = feedin_cost

    if export_compensation_unit == "kWh":
        export_compensation_year = (
            export_compensation * export_without
        )
    else:
        export_compensation_year = export_compensation

    # Step 2: battery flow
    throughput = battery_kwh * SOLAR_MAX * EFF
    shiftable = grid_without * (1.0 - RESIDUAL_FRAC)
    battery_used = max(
        0.0,
        min(throughput, shiftable, export_without * EFF),
    )
    battery_charge = min(battery_used / EFF, export_without)
    battery_used = battery_charge * EFF

    grid_with = max(0.0, grid_without - battery_used)
    export_with = max(0.0, export_without - battery_charge)

    direct_plus_battery = direct_sc + battery_used
    sc_max = clamp(92.0 + (battery_kwh / 9.3) * 0.5, 92.0, 96.0)
    sc_cap = min(PV * sc_max / 100.0, V)

    if direct_plus_battery > sc_cap:
        total_sc = max(direct_sc, sc_cap)
        battery_used = max(0.0, total_sc - direct_sc)
        battery_charge = min(export_without, battery_used / EFF)
        grid_with = max(0.0, grid_without - battery_used)
        export_with = max(0.0, export_without - battery_charge)
    else:
        total_sc = direct_plus_battery

    # Step 3: net self-consumption value
    shift_ratio = clamp(
        battery_charge / max(export_without, 1.0),
        0.0,
        1.0,
    )
    saved_feed_in_cost = feedin_cost_year * shift_ratio
    lost_export_compensation = export_compensation_year * shift_ratio

    net_sc_saving = max(
        0.0,
        battery_used * import_price
        - battery_charge * export_price
        + saved_feed_in_cost
        - lost_export_compensation,
    )

    # Step 4: EMS
    ems_day_low, ems_day_high = ems_daily_trade(battery_kwh)
    ems_low = ems_day_low * 365.0
    ems_high = ems_day_high * 365.0

    # Step 5: baseline
    raw_low = net_sc_saving + ems_low
    raw_high = net_sc_saving + ems_high

    if battery_kwh <= 20.0 and raw_high > 10000.0:
        raw_high = max(net_sc_saving, 10000.0)
        ems_high = max(0.0, raw_high - net_sc_saving)
        if raw_low > raw_high:
            raw_low = raw_high
            ems_low = max(0.0, raw_low - net_sc_saving)

    ems_display_low = round(ems_low)
    ems_display_high = round(ems_high)
    total_low = round(net_sc_saving) + ems_display_low
    total_high = round(net_sc_saving) + ems_display_high

    # Step 6: payback
    payback_low = battery_price / total_high if total_high > 0 else 25.0
    payback_high = battery_price / total_low if total_low > 0 else 25.0
    payback_low = clamp(payback_low, 1.5, 12.0)
    payback_high = clamp(payback_high, payback_low + 0.1, 15.0)

    return {
        "annual_energy_saving": round(net_sc_saving),
        "ems_annual_low": ems_display_low,
        "ems_annual_high": ems_display_high,
        "total_annual_low": total_low,
        "total_annual_high": total_high,
        "monthly_energy_saving": round(net_sc_saving / 12.0),
        "payback_low": round(payback_low, 1),
        "payback_high": round(payback_high, 1),
        "grid_import_without": round(grid_without),
        "grid_import_with": round(grid_with),
        "export_without": round(export_without),
        "export_with": round(export_with),
        "self_consumption_without": round(direct_sc),
        "self_consumption_with": round(total_sc),
    }
```

## Belangrijke implementatieregels

1. Gebruik `net_sc_saving`, niet alleen `grid_besparing_eur`, voor de
   financiële basislijn.
2. Tel `escalation_eur_*` en `sald_protection_eur` niet op bij het
   headline-jaartotaal; dit zijn informatieve prognoses.
3. Rond pas af voor de presentatie, niet tijdens de tussenberekeningen.
4. Houd de energiebalans gesloten:
   `PV = direct zelfverbruik + export` en
   `V = direct zelfverbruik + netinkoop`.
5. De teruglevering die de gebruiker invult is leidend zolang deze fysiek
   mogelijk is. Een exportwaarde wordt begrensd op maximaal `PV × 0.97`.