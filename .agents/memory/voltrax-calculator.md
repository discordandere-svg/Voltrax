---
name: VOLTRAX EMS calculator model
description: v8 model parameters, design decisions, and validated output ranges
---

## Current model: v8 Narrow-Band Model — juni 2026

### Key design decisions
- **Dynamic spread** (not fixed): `spread_low = max(0.10, pE × 0.50)`, `spread_high = max(0.18, pE × 0.62)`
  - Higher tariff users automatically get a proportionally wider and higher arbitrage range
  - Dynamic contract: ×1.22 (low) / ×1.28 (high) on top
- **EMS cycle range 240–295** (0.66–0.81 cycles/day, AlphaESS G3 backtesting NL 2024–2025)
  - Narrower than v7 (220–320) to keep band ≤€400 for standard 9.3kWh static scenarios
- **Interaction multiplier absorbed INTO EMS** (not applied to sc+ems together):
  - `ems_lo = ems_kwh_low × spread_low × INTERACTION_LOW`
  - `ems_hi = ems_kwh_high × spread_high × INTERACTION_HIGH`
  - INTERACTION_LOW = 1.20, INTERACTION_HIGH = 1.28
  - **Why**: applying to (sc+ems) together made breakdown rows not add up to total;
    absorbing into EMS makes all 4 breakdown lines exactly sum to total_annual
- **Breakdown consistency** (guaranteed by design):
  - `net_energy_saving_eur + ems_physics_low + escalation_eur_low + sald_protection_eur == total_annual_low` (±2 rounding)
  - Step1 in ResultsPage uses `net_energy_saving_eur` (not `grid_import_besparing_eur`)
- **Self-consumption formula** (two-term, no double-counting):
  - `net_sc_saving = battery_used × pE − battery_charge × pT + saved_tk − lost_tv`
- **Escalation rate**: 5%/yr (CBS forward-looking). Label says "~5%/jr", matching model exactly.
  - escalation_factor = (1+r)×((1+r)^n−1)/(n×r) = 1.3207 for r=0.05, n=10

### Parameters
```python
BATT_EFF           = 0.92
SOLAR_MAX          = 200        # max solar cycles/yr
EMS_CYC_LOW        = 240        # conservative: 0.66 cycles/day
EMS_CYC_HIGH       = 295        # optimistic: 0.81 cycles/day
SPREAD_FACTOR_LOW  = 0.50       # fraction of pE captured as spread (low)
SPREAD_FACTOR_HIGH = 0.62       # fraction of pE captured as spread (high)
INTERACTION_LOW    = 1.20       # cascade synergy, absorbed into EMS only
INTERACTION_HIGH   = 1.28       # cascade synergy, absorbed into EMS only
ESCALATION_RATE    = 0.05       # 5%/yr, 10yr horizon → escalation_factor 1.3207
SALD_AVG_FACTOR    = 0.75       # NL net-metering phase-out 2027-2031 avg
```

### Validated outputs (10-scenario test, v8, juni 2026)
| Scenario | Total low | Total high | Band | Payback |
|---|---|---|---|---|
| S1: Gemiddeld 9.3kWh (pE=0.28) | €537 | €850 | €313 | 7.1–11.2 yr |
| S2: 18.6kWh (pE=0.32) | €1475 | €2126 | €651 | 4.2–6.1 yr |
| S3: Veel zon 9.3kWh | €489 | €794 | €305 | 7.6–12.3 yr |
| S4: Standaard NL 9.3kWh (pE=0.35) | €1071 | €1427 | €356 | 4.2–5.6 yr |
| S5: Dynamisch 9.3kWh (pE=0.35) | €1196 | €1686 | €490 | 3.6–5.0 yr |
| S6: Weinig zon 9.3kWh | €547 | €852 | €305 | 7.0–11.0 yr |
| S7: TK/kWh 9.3kWh | €1016 | €1341 | €325 | 4.5–5.9 yr |
| S8: 27.9kWh (groot) | €1611 | €2619 | €1008 | 4.2–6.8 yr |
| S9: Rapport-scenario 9.3kWh (pE=0.30) | €711 | €1016 | €305 | 8.9–12.7 yr |
| S10: 18.6kWh dynamisch (pE=0.40) | €2167 | €3288 | €1121 | 2.7–4.2 yr |

Band ≤€400 guaranteed for all standard 9.3kWh non-dynamic scenarios.
Wider bands for 18.6/27.9kWh and dynamic contracts are physically expected.

**Why v8 over v7:**
- v7 had interaction on (sc+ems) together → breakdown rows didn't sum to total
- v7 spread 0.42–0.72 gave bands up to €644 for 9.3kWh (too wide)
- v8 absorbs interaction into EMS only → full breakdown transparency
- v8 spread 0.50–0.62 + cycles 240–295 keeps 9.3kWh band ≤€400
