---
name: VOLTRAX EMS calculator model
description: Durable design decisions for the battery ROI/savings model (energy balance + value breakdown)
---

## Two layers, two failure modes
The calculator has (1) a physical energy balance and (2) a financial value breakdown.
Both must be internally consistent or the generated PDF/report looks "sloppy" to the user.
Past breakage came from treating them carelessly:
- Deriving direct self-consumption as `opwek − teruglevering` overestimates it for low/impossible
  export inputs → grid import collapses to 0 → battery looks useless (Step 1 = €0) and an
  export-floor hack pushed export *up* with a battery. **Never derive self-consumption from a
  user export field alone.**
- The PDF "Stap 3" once displayed the grand *total* instead of its own component, so steps
  visibly didn't add up. **Every breakdown step (web AND PDF) must be a real additive component.**

## Energy balance (STAP 1 / STAP 2) — the durable rules
- **Direct self-consumption is bounded by scarcity of two things**: the production itself, and the
  consumption that occurs during daylight. Model: `sc_direct = min(PV, DAYTIME_LOAD_FRAC × V)`,
  honoring the user's export only when it implies *less* (poorer) self-consumption; correct it
  when the implied value is physically impossible (would give negative grid import).
  - `DAYTIME_LOAD_FRAC = 0.45` lands on the NL norm (~30% of *production* self-consumed) for a
    typical oversized-PV home, and correctly →100% of PV for a small system / big consumer.
  - **Why not "% of consumption" or "% of production" alone**: a flat %-of-consumption cap
    underestimates self-consumption for oversized PV (inflates import → inflates ROI); a flat
    %-of-production cap underestimates it for tiny PV. The `min(PV, frac×V)` form is robust across
    all PV/consumption ratios. (Caught by architect review.)
- **The balance must always close**: `opwek = sc_direct + export`, `verbruik = sc_direct + inkoop`,
  so `export − inkoop = opwek − verbruik`. Compute `inkoop = V − sc_direct`, `export = PV − sc_direct`.
- **Battery flow**: `battery_used = min(throughput, shiftable, surplus×eff)` where
  `throughput = bat_kWh × SOLAR_MAX × eff`, `shiftable = inkoop × (1 − RESIDUAL_FRAC)`.
  - `RESIDUAL_FRAC = 0.15` keeps a realistic winter import (grid import with battery is **never 0**).
  - Export always **decreases** with a battery; grid import always **decreases**. Assert both.
- **SC_MAX cap must floor at `sc_direct`** — `sc_total = max(sc_direct, cap)`. Capping below
  `sc_direct` (small-PV/large-consumption homes) pushes grid import *up*, which is nonsensical.
- `t_input` returned to the frontend = `export_kwh_zonder` (the modeled, consistent export), so the
  "UW SITUATIE" tile matches the rest of the report. For realistic inputs this ≈ what the user typed;
  impossible inputs are silently corrected to the consistent value.
- **Teruglevering is a MODEL OUTPUT, never an input constraint.** Final owner ruling (juni 2026,
  after first trying the opposite): *"De jaarrekening is een resultaat van het oude systeem, niet een
  input voor het nieuwe systeem."* The model is driven only by PV-opwek, totaal verbruik,
  zelfverbruik-ratio en batterijlogica; the user's entered `teruglevering` must NOT constrain
  self-consumption or battery flows. When the entered value is inconsistent with the PV/verbruik
  balance, the report shows the **recomputed** export (`t_input = export_kwh_zonder`, e.g. ~3780 for
  5400/3600/1300), NOT the typed value.
  - **Why:** anchoring the "Huidig" teruglevering display to the typed value (a brief experiment) made
    it contradict every other battery-side number (Batterij opslag 1683, Netstroom inkoop ↓1683,
    voordeel) which all derive from the ~3780 surplus → page told two stories. Owner reverted it.
  - **How to apply:** in `ResultsPage.BeforeAfter` the teruglevering row uses `r.t_input` /
    `r.export_revenue_without`; the "Resterende netinjectie" row (`baNetInjectie`, renamed from
    "Teruglevering aan net" on the battery side only) uses `r.export_kwh_with`, breakdown
    `baNetInjectieSub(export_kwh_zonder, export_kwh_zonder−export_kwh_with, export_kwh_with)`.
    Do **not** re-introduce `input.teruglevering` into these rows.
  - Minor expected gap: "Batterij opslag" (`sc_battery_kwh`, usable) is ~5% below the breakdown's
    "opgeslagen" (`export_kwh_zonder−export_kwh_with` = battery_charge, gross diverted from export) —
    that delta is round-trip efficiency (BATT_EFF 0.95), not a bug.

## Known modeling limitation (intentional, not a bug)
Self-consumption shift cycles (≤ SOLAR_MAX) and EMS arbitrage cycles (EMS_CYC) are **separate value
streams**, so combined annual equivalent cycles can exceed ~1/day. A fully unified shared cycle
budget would be more rigorous but was deliberately *not* built — it risks the breakdown-sum
invariant and was out of scope for the "make the numbers consistent" task. If asked to make ROI
more conservative, unify the cycle budget first.

## Financial breakdown — the durable invariant
Breakdown shows 4 steps on web (ResultsPage Block 2) AND PDF (page 2 list), but only the first
two are the BASELINE; steps 3 & 4 are informative-only:
1. `net_energy_saving_eur` (NOT `grid_import_besparing_eur` — that's gross, doesn't net export loss)
2. `ems_physics_low/high` (EPEX arbitrage)
3. `escalation_eur_low/high` (price escalation) — **INFORMATIVE, not summed**
4. `sald_protection_eur` (net-metering phase-out protection) — **INFORMATIVE, not summed**
- **Baseline rule (owner ruling, juni 2026 — overrode the old "all 4 sum to total" invariant):**
  `total_annual_{low,high} = round(bill_savings_annual) + ems_display_{low,high}` = STAP 1 + STAP 2
  ONLY. Escalation (stap 3) and saldering (stap 4) are still returned as `escalation_eur_*` /
  `sald_protection_eur` but **must NOT be added** into `total_annual`, `payback`, or net-after-10-years.
  - **Why:** owner wants a defensible baseline driven purely by current-market physics; price-rise
    and net-metering phase-out are projections, so they're shown ("Informatieve prognose — niet in
    basislijn") but never inflate the headline total / ROI.
  - **How to apply:** payback & winst10 derive from `total_annual`, so they auto-follow — don't add
    stap3/4 anywhere downstream. PDF (`PDFReport.jsx`) + web (`ResultsPage` DetailRow `info` prop,
    bilingual key `infoNotBaseline`) render stap3/4 neutral, no `+` prefix.
- The interaction/cascade multiplier is absorbed **into EMS only**
  (`ems = ems_kwh × spread × INTERACTION`).
- `net_sc_saving = battery_used×pE − battery_charge×pT + saved_tk − lost_tv` (two-term, no double count).
- €10k cap for ≤20 kWh systems caps `raw_high`/`ems_hi` at `max_raw=10000` (no longer back-solved
  through escalation_factor, since total = raw now).
- **teruglevertarief=0 must be respected**: frontend payload uses `parseNum(...) ?? 0.07` (NOT `|| 0.07`)
  so an explicit 0 isn't treated as falsy and overwritten by the 0.07 default.

## Validated behaviour (juni 2026)
3000 random runs, 0 issues: balance closes (±2 kWh), import & export never increase with a battery,
no negatives, ordering holds, breakdown sums (worst Δ €1), t_input consistent. Typical payback
~3.5–4.2 yr (std 9.3 kWh), down to ~2 yr (large/dynamic), up to ~8 yr (small PV).

## Other constants worth keeping
`BATT_EFF=0.95`, `SOLAR_MAX=200`, `EMS_CYC 300–340`, dynamic spread `pE×0.60 … pE×0.72`
(dynamic contract ×1.22/1.28), `ESCALATION_RATE 0.05` (factor 1.3207, 10yr), `SALD_AVG_FACTOR 0.75`,
`SC_MAX 92–96`.
