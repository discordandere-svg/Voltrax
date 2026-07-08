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
- `#0D2B1A`, `#0D1810`, or ANY dark/black/near-black tones as backgrounds — user explicitly banned these site-wide
- No dark section backgrounds anywhere — only eco colors (green, mint, cream, white)

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
**How to apply:** Never say "batterijmodule"/"battery module" or "Nx [capacity] module" — say "HYXiPower All-in-One ESS systeem/system". Never reference "111,3 kWh maximale configuratie" — the ceiling is "uitbreidbaar tot 26,5 kWh" (or "hoogste capaciteit in het assortiment" for the Maximum tier itself). If the tier structure changes again, treat it as an explicit user decision each time — do not assume old kWh anchors are permanent, but also don't drift them without instruction.
Grepping for "batterijmodule"/old kWh numbers is not enough — the stacking-module concept can hide under other names (e.g. HyxiPowerPage.jsx had a "2PACK/3PACK/4PACK/5PACK" capacity table describing the exact same stacked-module idea with different labels). When rebranding away from a modular-stacking narrative, search every product/spec page for any per-unit capacity table, not just the banned keyword.
