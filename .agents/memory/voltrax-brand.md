---
name: VOLTRAX brand and color rules
description: Color system and button rules for VOLTRAX website
---

## Color palette
- `#22a55d` — emerald green, primary accent (logo RAX, buttons, CTA section backgrounds)
- `#EEF6F1` — light mint green, section alternating background
- `#F9F7F4` — cream/beige, section alternating background and footer
- `#131A20` — near-black body text ONLY (not for backgrounds or large surfaces)

## BANNED colors
- `#0D2B1A`, `#0D1810` specifically banned by user (original rule)
- **Exception (2026-07-10):** user requested "eco eco" feel + 3D contrast for the WHY/USP section — a deep forest-green gradient `linear-gradient(135deg, #0a3d1f 0%, #0f5029 50%, #1a6b38 100%)` is now approved for that section only. This is NOT a general license for dark backgrounds on other sections.

## WHY/USP section style (homepage)
- Background: `linear-gradient(135deg, #0a3d1f 0%, #0f5029 50%, #1a6b38 100%)` via inline style
- Cards: `bg-white` with 3D boxShadow (`0 2px 0 rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.28), 0 1px 0 rgba(255,255,255,0.9) inset`), hover lifts and deepens shadow
- Card titles: `text-[#0a3d1f]` (deep forest green), body: `text-[#131A20]/55`
- Icon container: gradient `from-[#22a55d]/15 to-[#22a55d]/5` with border `border-[#22a55d]/15`
- Grid: `sm:grid-cols-2 lg:grid-cols-3` (6 cards, 2 rows of 3)

## CTA section style (all pages)
- Background: `bg-[#22a55d]` with decorative `bg-white/8` blob circles
- Headline: `text-white`
- Body: `text-white/75`
- Primary button: `bg-white text-[#22a55d] hover:bg-green-50` (white pill with green text)
- Secondary button: `bg-white/15 text-white border border-white/30`
- Badge: `bg-white/20 text-white`

## Button rules (on light/white backgrounds)
- Primary: `bg-[#22a55d] hover:bg-[#1a9050] text-white hover:shadow-green-500/20`
- Secondary ghost: `border border-gray-200 hover:border-[#22a55d] hover:text-[#22a55d] text-[#131A20]/60`

**Why:** User explicitly requested ONLY eco colors site-wide — no dark/black accents anywhere. Premium look via emerald green CTAs with white buttons, not dark backgrounds.

## Brand facts policy (HYXiPower rebrand, 2026-07-08)
Only use the approved HYXiPower facts: All-in-One ESS, LFP/LiFePO4 cells, smart EMS, realtime app monitoring, modular expandable, residential storage. Soften "Officieel/Official HYXiPower dealer" to "HYXiPower partner" everywhere (site name is separate from product brand — SolarFast sells, HYXiPower is the product).
**Why:** Prior copy (across hero badges, footers, FAQ, comparison tables) accumulated many specific unverifiable claims — exact warranty years (10-year), cycle counts (10,000+), noise levels (<30dB), IP ratings (IP67), AFCI/C4-salt-spray/CE certifications, fake founding history, fake address, fake named testimonials, "officieel gecertificeerd dealer" — none of which are confirmed for this brand and must not be invented or reused from a prior supplier's copy.
**How to apply:** When rebranding to a new supplier/manufacturer, strip ALL specific historical/quantitative/certification claims (founded X, N countries, N installations, warranty duration, cycle count, dB, IP rating, named certs) unless explicitly confirmed by the user; replace with the approved-facts list above or vaguer "ask us for current specs" framing. Comparison tables (alpha vs. competitor claims) tend to hide the most unverifiable specifics — check them explicitly, don't assume prose cleanup covers them.

## Product tier structure (2026-07-08 restructure)
Current tiers are 4, not 6: Starter 10.6 kWh / Comfort 15.9 kWh (most-chosen/popular) / Premium 21.2 kWh / Maximum 26.5 kWh. The prior 6-tier range (9.3/18.6/27.9/37.2/46.5/111.3 kWh) is retired — the user explicitly overrode an earlier "never change these kWh values" rule because those numbers implied stacking discrete 9.3 kWh modules, which does not match the real HYXiPower All-in-One ESS product line (integrated inverter+storage combos, not stackable modules).
**Why:** Official HYXiPower All-in-One units come in fixed combo sizes; describing them as "Nx battery modules" misrepresented the actual product architecture.
**How to apply:** Never say "batterijmodule"/"battery module" or "Nx [capacity] module" — say "HYXiPower All-in-One systeem/system" (no "ESS" suffix — user explicitly removed it site-wide on 2026-07-08, product is just "All-in-One"). Never reference "111,3 kWh maximale configuratie" — the ceiling is "uitbreidbaar tot 26,5 kWh" (or "hoogste capaciteit in het assortiment" for the Maximum tier itself). If the tier structure changes again, treat it as an explicit user decision each time — do not assume old kWh anchors are permanent, but also don't drift them without instruction.
Grepping for "batterijmodule"/old kWh numbers is not enough — the stacking-module concept can hide under other names (e.g. HyxiPowerPage.jsx had a "2PACK/3PACK/4PACK/5PACK" capacity table describing the exact same stacked-module idea with different labels). When rebranding away from a modular-stacking narrative, search every product/spec page for any per-unit capacity table, not just the banned keyword.

## Verified HYXiPower facts (confirmed 2026-07-08 via live hyxipower.com + official HYX-H6-15K-HTA datasheet PDF)
400+ certifications (TÜV Rheinland, CSA, Bureau Veritas, SGS) is real, quoted verbatim on hyxipower.com homepage. For the exact All-in-One model matching the site's 10.6-26.5 kWh tiers: 160% PV overload capacity and "three-phase unbalanced output for max. PV utilization" are both directly from the official datasheet PDF.
**Why:** The brand-facts policy above bans inventing quantitative/certification claims, but these were fetched and checked against primary sources (not assumed), so they're safe to keep using.
**How to apply:** Before adding ANY new quantitative/certification claim to HYXiPower copy, fetch the live hyxipower.com page or its linked datasheet PDF yourself and quote it directly — do not trust secondhand summaries (e.g. a subagent's paraphrase) without checking the primary source, since specs vary by model (e.g. a different HYXI inverter model has "200% DC oversizing", not 160%).
