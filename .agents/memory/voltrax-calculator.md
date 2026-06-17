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
- `t_input` returned to the frontend = `export_kwh_zonder`, which now equals the user's typed
  teruglevering (see ruling below), so the "Huidig" tile shows exactly what the user entered.
- **Teruglevering input is LEADING — it drives `export_kwh_zonder` directly.** Owner ruling (juni 2026,
  this REVERSES the earlier "teruglevering = model output" ruling — it flip-flopped and caused real
  user frustration; this is the current, final direction). The user's entered teruglevering is a
  MEASURED fact from their energy bill and must be honored:
  `if T>0: sc_direct_kwh = clamp(PV−T, 0, min(PV,V))` so `export_kwh_zonder = T`. Only when `T=0`
  (not provided) does the model fall back to the physical estimate `sc_direct = min(PV, 0.45×V)`.
  - **Why:** the user kept entering a teruglevering and seeing a completely different (higher) number,
    because the old code did `min(sc_direct_user, sc_direct_realistic)` — the 0.45×V "realistic" cap
    overrode their input. They were emphatic ("Je begrijpt het nog steeds niet"). Honor the input.
  - **Physical floor (the ONE case input still shifts):** export can never be below `max(0, PV−V)`
    (you can't self-consume more than total consumption). So e.g. 5400/3600 forces export ≥ 1800;
    a typed 1300 is clamped UP to 1800. Explain this to the user — it's physics, not a bug. Side
    effect: very low teruglevering → grid import ≈ 0 → battery self-consumption benefit collapses
    (this is the honest consequence of honoring the input; do NOT re-add the 0.45 cap to hide it).
  - **How to apply:** `ResultsPage.BeforeAfter` — the teruglevering row must pair, on ONE grid row,
    left `baTeruglevering` "Teruglevering aan net" (`r.t_input` kWh, = user input) ↔ right `baBatStorage`
    **"Zelf gebruikt i.p.v. teruggeleverd"** (`storedKwh = export_kwh_zonder − export_kwh_with` kWh, ↑).
    The user explicitly wants this exact before→after pairing and a kWh-only value (no €/jr) on this row.
    Keep self-used framing, not "Resterende netinjectie/teruggeleverd". The `baSelfDirect` "Direct
    zelfverbruik" row is mirrored unchanged on both sides. `baNetInjectie*` keys are now unused.

## STAP 2 is now a daily-trade lookup table (juni 2026 — REPLACED the cycles×spread model)
Owner ruling: stap 2 ("dagelijkse handel op de energiemarkt") is no longer computed from
cycles×spread×interaction. It is a per-day €/day benefit looked up by battery capacity from
`EMS_DAY_TABLE` in `server.py`, then `annual = daily × 365`. Helper `ems_daily_trade(bat_kWh)`:
piecewise-linear interpolation between table points; below 9.3 kWh scales proportionally from the
origin; above 55.6 kWh extrapolates with the last segment's slope.
- Table (€/day low–high): 9.3→1.50–2.80 (owner bumped up from 1.20–2.20), 18.6→2.20–4.50,
  27.9→3.50–7.00, 37.2→4.80–9.00, 46.5→6.00–11.50, 55.6→7.00–14.00.
- **`spread_low/high`, `ems_cycli`, `EMS_CYC_*`, `INTERACTION_*` are now LEGACY**: still computed
  and returned for background, but do NOT drive the stap-2 amount. `dynamic_contract` currently only
  changes the (now-unused) spread outputs — it does NOT change stap-2 benefit. PDF stap-2 breakdown
  shows "365 dagen × €{smart_daily_low}–{smart_daily_high}/dag"; web reads `smart_annual_low/high`.
- **Why:** the external critique flagged the old cycles×spread arbitrage as opaque and self-
  contradictory (EPEX arbitrage shown under "vast tarief"); owner chose explicit per-day numbers.
- **Still OPEN (unresolved business fork):** whether EPEX/daily arbitrage should require a dynamic
  contract (and be €0 / relabeled for fixed-tariff customers). Asked the user; pivoted before answering.

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

## Terugleverkosten display (juni 2026 bug fix)
User-entered terugleverkosten were invisible in the "Huidige situatie" column (the `feedinCosts` row
was hardcoded to "—"). Backend now returns `terugleverkosten_jaar` (= `tk_jaar`, must also be a field
on the `CalculationResult` model or FastAPI filters it out). `ResultsPage.BeforeAfter`: left shows
`€ tkJaar/jr` (active sub `baFeedinActiveSubL`), right shows `€ max(0, tkJaar − saved_terugleverkosten)/jr`
with a `↓ € saved/jr` delta (active sub `baFeedinActiveSubR`); falls back to "—" when tkJaar=0.

## Other constants worth keeping
`BATT_EFF=0.95`, `SOLAR_MAX=200`, `ESCALATION_RATE 0.05` (factor 1.3207, 10yr), `SALD_AVG_FACTOR 0.75`,
`SC_MAX 92–96`. (LEGACY/unused for stap 2: `EMS_CYC 300–340`, spread `pE×0.60…0.72`, dynamic ×1.22/1.28.)
