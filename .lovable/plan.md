# Phase-1 Rebalancing — folded into /sip-management

Goal: own the entire rebalance funnel inside `/sip-management` (deprecate the standalone `/rebalancing` page as the primary surface — keep route as a thin redirect for now). Strict MVP per directive: only **sector concentration**, **single-fund concentration**, and a **benchmark/market nudge**. **Drift is OFF** — no fake targets, no target-vs-current bars. Light, calm UI. One CTA path. One mock `submitRebalancePlan` boundary.

## Scope (only this)

- Config-driven rule pack with 3 triggers
- New `Rebalance` tab inside `/sip-management` (replaces ad-hoc rebalance entry points)
- 3-step inline flow: Context → Plan → Done
- Top-3 alert strip on the existing Portfolio tab linking into the Rebalance tab with `?focus=`
- Mock `submitRebalancePlan` behind a single function
- SIP-missed continuity stays where it already lives (`SipHealthModule` on SIPs tab) — not blocking

Explicitly **out of scope**: drift, goal-gap, return-underperf, overlap, news/events, tax math, real OMS, Apply-all bundling, Home banner changes, /alerts changes, analytics dashboard.

## UX (kept deliberately quiet)

**Portfolio tab — `RebalanceAlertsStrip`**
- Single section "Portfolio actions" with subline "Based on your holdings and limits."
- Up to 3 cards (critical first, then warn). Each card: severity dot + one-line *what* + one-line *why* + one CTA "Review".
- Empty state: "No actions suggested right now." (no charts, no targets copy)
- No legs, no before/after here.

**New `Rebalance` tab (`/sip-management` → tab id `rebalance`)**
- Stepper across the top: 1 Context · 2 Plan · 3 Done.
- **Step 1 Context**: current fund list (value, weight) + sector weight bars (read-only). Trigger chips at top; focused chip highlighted. If only benchmark fired, a one-line market context banner. No target bars.
- **Step 2 Plan**: leg list table — Action (Reduce / Switch / Buy) · Fund · Amount ₹ · One-line "why" tying back to trigger id. Before/after on fund weight + sector weight only for dimensions that changed. Destination picker for Buy/Switch-in (curated shortlist from `shortlistEngine` filtered by category; user can override). Benchmark-only case shows guidance copy + "Back to portfolio" — no auto legs.
- **Step 3 Done**: success card from mock `submitRebalancePlan`, optional next review date (config), CTA back to Portfolio.
- Loading + error + no-trigger states each one calm panel.

**Restraint rules (so it doesn't feel overwhelming)**
- Max 3 cards on Portfolio strip.
- One primary CTA per card; no secondary buttons in MVP.
- No tax/cost copy in MVP (directive: lead with concentration; tax is Phase 2).
- No "Apply all".
- No charts beyond simple sector weight bars in Step 1/2.

## Technical plan

### New files
- `src/components/conversion/rebalanceConfig.ts` — single source of config:
  ```ts
  export const REBALANCE_CONFIG = {
    sector:    { enabled: true, warn: 30, critical: 40 },
    singleFund:{ enabled: true, warn: 20, critical: 30 },
    benchmark: { enabled: true, index: 'NIFTY 50', lookbackSessions: 20, warnDrawdownPct: 5, criticalDrawdownPct: 8 },
    drift:     { enabled: false }, // OFF until targets are persisted
    maxAlertCards: 3,
    nextReviewDays: 30,
  };
  ```
- `src/components/conversion/rebalanceEngine.ts` — pure functions:
  - `evaluateTriggers(holdings, benchmark, config) → PortfolioTrigger[]` (only the 3 enabled)
  - `buildPlanLegs(triggers, holdings, destinations) → PlanLeg[]` with deterministic weight→₹ rules, merge dup legs, respect platform mins (constants for MVP)
  - `submitRebalancePlan(legs) → Promise<{ ok: true, planId, submittedAt }>` mock
- `src/components/sip/RebalanceTab.tsx` — the 3-step inline workspace
- `src/components/conversion/RebalanceAlertsStrip.tsx` — Portfolio-tab top-3 strip (replaces current ad-hoc usage of `ActionQueue` for rebalance context)

### Edits
- `src/pages/SIPManagement.tsx` — register `rebalance` tab in sidebar/nav; route `?focus=` query into `RebalanceTab` initial state; mount `RebalanceAlertsStrip` on Portfolio tab.
- `src/components/sip/PortfolioTab.tsx` — add the strip at top.
- `src/App.tsx` — make `/rebalancing` redirect to `/sip-management?tab=rebalance` (preserve old links).
- `src/components/conversion/triggerEngine.ts` — leave as-is (used elsewhere); new engine is additive to avoid regressions.

### Data contracts (MVP — local mocks)
- `Holding { fundId, name, amc, category, sector, valueINR }`
- `PlanLeg { id, type: 'reduce'|'switch'|'buy', sourceFundId?, destFundId?, amountINR, triggerId, why }`
- Destinations from existing `buildSmartShortlist` in `shortlistEngine.ts`, filtered by category.

### Engine logic (matches directive verbatim)
1. Aggregate weights per fund + per sector from holdings.
2. Evaluate each enabled rule independently → severity (critical/warn) from config bands.
3. Sort: critical first, then warn; tie-break order: singleFund → sector → benchmark.
4. Take top `maxAlertCards` for strip; pass full list to Step 1 chips.
5. Build legs:
   - **Single-fund critical**: reduce overweight to `warn − 1pp` buffer; convert pp gap × portfolioValue → ₹; round to ₹500.
   - **Sector critical**: trim largest contributors in that sector in order until sector ≤ `warn`.
   - **Benchmark only**: no legs; copy guidance; if combined with concentration, attach legs to those triggers and treat benchmark as Step 1 chip.
   - Merge if two triggers point at same fund.
6. Buy/Switch-in destination = first eligible fund from curated shortlist (same category, different ISIN); user can override via picker.
7. `submitRebalancePlan(legs)` mock returns success after 600 ms.

### Acceptance (Phase-1 checklist)
- Config toggles tune all three rules.
- Drift stays off; no UI implies targets exist.
- Every leg traceable to a triggerId + rule.
- Every Buy/Switch-in row has destination (shortlist or user pick).
- Benchmark-only never auto-sells.
- Portfolio shows ≤3 cards; Rebalance tab shows full context.
- One mock submit → success screen.

## Diagram

```text
/sip-management
├── Portfolio tab
│   └── RebalanceAlertsStrip (≤3 cards) ──Review──▶ Rebalance tab (?focus=…)
├── Rebalance tab  [NEW]
│   ├── Step 1 Context  (chips, fund list, sector bars)
│   ├── Step 2 Plan     (legs, destination picker, before/after)
│   └── Step 3 Done     (mock submit success)
└── SIPs tab
    └── SipHealthModule (missed-SIP — unchanged, parallel track)

/rebalancing  ──redirect──▶  /sip-management?tab=rebalance
```

## What I won't do unless you say so
- Touch goal-gap / overlap / news triggers
- Add tax/LTCG copy
- Build Apply-all
- Change Home page banners
- Wire real OMS

Approve and I'll implement exactly this.
