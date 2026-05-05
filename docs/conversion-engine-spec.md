# Conversion Engine — Triggers, Pillars & Delivery Plan

Last updated: May 2026 · Owner: Wealth Copilot platform

## 1. Information Architecture

| Route | Role | New widgets added |
|-------|------|-------------------|
| `/sip-management` (Home) | Default landing | `PortfolioAttentionBanner` (top trigger + SIP trigger), `ConversionStrip`, `CuratedShelves` |
| `/sip-management` (Portfolio tab) | Holdings & allocation | `ActionQueue` (Rebalance Alerts on top) |
| `/sip-management` (SIPs tab) | SIP roster | `SipHealthModule` (Active / Failed / Upcoming / Top-up) |
| `/sip-management` (Screener tab) | Discovery | `ContextChips`, `CuratedShelves`, `SmartShortlistSection` (post-goal only) |
| `/rebalancing` | Execution workspace | `ActionQueue` (dashboard), `ActionCard` impact previews, plan execution flow |
| `/alerts` | Tracking & digests | `AddInstrumentDialog` (CTA in Tracked view), digest scheduler |
| `/admin/conversion-metrics` | Internal | Funnel KPIs |

## 2. Trigger Schema

Defined in `src/components/conversion/triggerEngine.ts`. Defaults:

| Category | Warn | Critical |
|----------|------|----------|
| Sector concentration | > 30% | > 40% |
| Single fund concentration | > 20% | > 30% |
| Category concentration | > 50% | > 65% |
| Holdings overlap | > 35% | > 50% |
| Goal gap (projected/required) | < 90% | < 80% |
| Return under expectation | exp − 2pp | exp − 4pp |
| SIP missed | 1 failed | 2 consecutive |
| Top-up cadence | 6 months | — |
| Inactivity | 45 days | — |

Every `PortfolioTrigger` carries `severity`, `confidence`, `impactedGoals`,
`recommendedAction` (`topup | reduce | switch | rebalance | monitor | fix-sip`),
and a `ctaLabel + ctaTarget`. `ActionQueue` enables **"Apply all recommended"** only when
≤3 triggers and **all** confidences ≥ 0.8.

## 3. CTA Copy Deck

| Surface | Primary CTA | Secondary CTA |
|---------|-------------|---------------|
| Home banner | "Review Rebalance" | "Fix SIP Now" |
| Portfolio top | "Rebalance Now" | "Apply all recommended" (gated) |
| SIP Health | "Resume SIP" | "Increase SIP by 10%", "Change SIP date", "Switch to better-fit fund" |
| Tracked view | "Add Instrument" | "Add via Copilot" |
| Action card | `<action verb>` (e.g. "Rebalance now") | "Preview impact" |

## 4. 3-Step Rebalancing Wireflow

```
[Trigger card]  -->  [Plan review w/ Before/After]  -->  [Execution + confirmation]
   click          ▼ Accept All / Edit / Compare / Why?     ▼ batched orders, T+1 NAV
   trigger_action_clicked   plan_accepted (or plan_edited)   order_completed
```

Plan review covers: sector & category allocation, concentration, goal adequacy,
costs/tax caution. Execution screen confirms what changed, next review date,
and the residual alerts status.

## 5. Event Instrumentation

`trackConversionEvent(name, payload)` (see `src/components/conversion/events.ts`):

```
trigger_generated, trigger_viewed, trigger_action_clicked,
rebalance_plan_opened, plan_accepted, plan_edited,
order_initiated, order_completed,
sip_resumed, sip_topup_accepted, sip_date_changed,
apply_all_clicked, instrument_added, alert_created
```

Currently logs to `console.info` and emits a `conv:event` window event for
the demo. Wire to your analytics destination in production.

## 6. Primary KPIs & Targets

| KPI | Definition | Target |
|-----|------------|--------|
| Trigger → action rate (High) | `trigger_action_clicked / trigger_viewed` for severity=critical | ≥ 20% |
| Plan-to-order rate | `order_completed / plan_accepted` | ≥ 60% |
| Time-to-completion | median ts(`trigger_viewed → order_completed`) | < 10 min |
| Concentration reduction | drop in critical concentration cases over 60 days | ≥ 15% |
| Goal-gap improvement | drop in goal-gap critical triggers | ≥ 10% |
| SIP continuity uplift (30/60/90) | reactivation rate vs control cohort | ≥ 10% |

## 7. Delivery Plan

**Phase 1 (shipped now)** — Foundations
- Trigger engine + schema, default thresholds
- `TriggerCard`, `ActionQueue`, `SipHealthModule`, `AddInstrumentDialog`
- Home `PortfolioAttentionBanner`, Portfolio `Rebalance Alerts`, Rebalancing dashboard `Action Queue`
- Event instrumentation (client logger)

**Phase 2** — Intelligence
- Real holdings → trigger generator
- "Why this plan?" panel with risk-fit / horizon-fit / portfolio-fit reasoning
- Compare drawer wired into rebalance "Switch" actions
- Bundled `Apply all recommended` execution path
- Wealth Copilot orchestrators: `track`, `alert`, `digest` deterministic forms

**Phase 3** — Optimization
- Cohort A/B for trigger copy
- Tax-aware switching (LTCG / STCG flagging in plan review)
- Mandate/payment dependency handling in execution
- Funnel dashboard wired to live events
