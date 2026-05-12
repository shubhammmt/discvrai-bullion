import { ConversionContext, ShortlistFund } from './types';
import { MOCK_FUNDS, MutualFund } from '@/data/sipMockData';
import { Goal, goalHorizonYears } from '@/lib/goalsStore';

// =============================================================================
// Pillar 1 — Smart Shortlist generators
// =============================================================================
//
// Three entry points:
//   • buildNoGoalShortlist(limit)        — anonymous / new visitor (no goals)
//   • buildShortlistForGoal(goal, limit) — per-goal personalised list
//   • buildSmartShortlist(ctx, limit)    — legacy context-based (kept for back-compat)
//
// All functions return ShortlistFund[] with a `reason` + `reasonTags` so the
// Wealth Copilot can explain *why* each fund is in the list.
// =============================================================================

const SAFE_NO_GOAL_AUM_MIN = 10000;       // ₹10,000 Cr+
const SAFE_NO_GOAL_EXPENSE_MAX = 0.5;     // direct, low-cost
const NOISE_CATEGORIES = ['Sectoral', 'Thematic']; // need an opinion → not for no-goal default

function fundToShortlist(f: MutualFund, reasonOverride?: { tags: string[]; reason: string }): ShortlistFund {
  const tags = reasonOverride?.tags ?? defaultTags(f);
  const reason = reasonOverride?.reason ?? defaultReason(f, tags);
  return {
    code: f.code,
    name: f.name,
    category: f.category,
    reason,
    reasonTags: tags.slice(0, 3),
    returns1Y: f.returns1Y,
    returns3Y: f.returns3Y,
    returns5Y: f.returns5Y,
    expenseRatio: f.expenseRatio,
    riskLevel: f.riskLevel,
    amc: f.amc,
    rating: f.rating,
    aum: f.aum,
  };
}

function defaultTags(f: MutualFund): string[] {
  const t: string[] = [];
  if (f.expenseRatio < 0.7) t.push('Low expense');
  if (f.returns3Y > 18) t.push('Top quartile 3Y');
  if (f.aum > 20000) t.push('Large AUM');
  if (f.rating >= 4) t.push(`${f.rating}★ rated`);
  return t;
}

function defaultReason(f: MutualFund, tags: string[]): string {
  return `${tags[0] || 'Strong fundamentals'} • 3Y ${f.returns3Y}% with ${f.expenseRatio}% expense.`;
}

// -----------------------------------------------------------------------------
// 1. NO-GOAL DEFAULT (anonymous / new visitor)
// -----------------------------------------------------------------------------
// Logic (transparent, surfaced in tooltip):
//   filter → AUM > ₹10,000 Cr  AND  expense ratio < 0.5%  AND  not Sectoral/Thematic
//   sort   → returns3Y desc
//   take   → top 40
// Rationale: institutional-quality, low-cost, broad — defensible for a stranger.
export function buildNoGoalShortlist(limit = 40): ShortlistFund[] {
  return MOCK_FUNDS
    .filter(f =>
      f.aum > SAFE_NO_GOAL_AUM_MIN &&
      f.expenseRatio < SAFE_NO_GOAL_EXPENSE_MAX &&
      !NOISE_CATEGORIES.includes(f.category),
    )
    .sort((a, b) => b.returns3Y - a.returns3Y)
    .slice(0, limit)
    .map(f => fundToShortlist(f, {
      tags: ['Top 3Y returns', 'Large AUM', 'Low expense'],
      reason: `Top 3Y returns at ${f.returns3Y}% with AUM ₹${(f.aum / 1000).toFixed(1)}K Cr and ${f.expenseRatio}% expense — passes our default safety filter.`,
    }));
}

// -----------------------------------------------------------------------------
// 2. PER-GOAL SHORTLIST
// -----------------------------------------------------------------------------
// Goal-driven asset tilt + risk filter + horizon-appropriate categories.
// Each goal type has its own filter signature; risk acts as a guardrail; score
// rewards 3Y returns net of expense and stability (AUM bonus).
export function buildShortlistForGoal(goal: Goal, limit = 20): ShortlistFund[] {
  const yrs = goalHorizonYears(goal.targetDate);
  const cat = (goal.category || '').toLowerCase();
  let pool = [...MOCK_FUNDS];
  let goalNarrative = '';

  // ---- Asset-class tilt by goal type ----
  if (cat.includes('emergency') || cat.includes('liquid')) {
    pool = pool.filter(f =>
      f.assetClass === 'Debt' ||
      ['Liquid', 'Overnight Fund', 'Ultra Short Duration'].includes(f.category),
    );
    pool = pool.filter(f => f.aum > 5000);
    goalNarrative = 'Capital safety + instant liquidity for emergencies';
  } else if (cat.includes('tax')) {
    pool = pool.filter(f => f.category === 'ELSS');
    goalNarrative = '80C tax savings with 3Y lock-in';
  } else if (yrs <= 3) {
    // Short horizon — equity volatility unsafe
    pool = pool.filter(f =>
      f.assetClass === 'Hybrid' ||
      ['Short Duration', 'Corporate Bond', 'Conservative Hybrid', 'Balanced Advantage', 'Ultra Short Duration'].includes(f.category),
    );
    pool = pool.filter(f => f.aum > 5000);
    goalNarrative = `Short horizon (${yrs}y) — debt-tilted, lower drawdowns`;
  } else if (yrs <= 7) {
    // Medium — balanced equity + hybrid
    pool = pool.filter(f =>
      ['Aggressive Hybrid', 'Balanced Advantage', 'Large Cap', 'Large & Mid Cap', 'Flexi Cap', 'Multi Cap'].includes(f.category),
    );
    pool = pool.filter(f => f.aum > 10000);
    goalNarrative = `Medium horizon (${yrs}y) — equity-led, hybrid cushion`;
  } else {
    // Long — equity-led wealth creation
    pool = pool.filter(f =>
      f.assetClass === 'Equity' && !NOISE_CATEGORIES.includes(f.category),
    );
    pool = pool.filter(f => f.aum > 10000 && f.expenseRatio < 0.7);
    goalNarrative = `Long horizon (${yrs}y) — equity compounding`;
  }

  // ---- Risk guardrails ----
  if (goal.riskLevel === 'Conservative') {
    pool = pool.filter(f => f.riskLevel === 'Low' || f.riskLevel === 'Moderate' || f.riskLevel === 'High');
  } else if (goal.riskLevel === 'Moderate') {
    pool = pool.filter(f => f.riskLevel !== 'Very High');
  }
  // Aggressive / Very Aggressive — no further restriction

  // ---- Score & rank ----
  const scored = pool
    .map(f => ({ f, score: f.returns3Y - f.expenseRatio * 2 + Math.min(f.aum / 10000, 3) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ f }) => fundToShortlist(f, {
    tags: defaultTags(f),
    reason: `${goalNarrative}. ${defaultTags(f)[0] || 'Strong fundamentals'} — 3Y ${f.returns3Y}%, expense ${f.expenseRatio}%.`,
  }));
}

// -----------------------------------------------------------------------------
// 3. LEGACY: context-based shortlist (kept so existing callers don't break)
// -----------------------------------------------------------------------------
export function buildSmartShortlist(ctx: ConversionContext, limit = 12): ShortlistFund[] {
  // If no risk + no goal, treat as anonymous visitor.
  if (!ctx.goal && !ctx.risk) return buildNoGoalShortlist(limit);

  let pool = [...MOCK_FUNDS];
  if (ctx.risk === 'Low') pool = pool.filter(f => f.riskLevel === 'Low' || f.riskLevel === 'Moderate');
  if (ctx.risk === 'High' || ctx.risk === 'Very High') pool = pool.filter(f => f.riskLevel === 'High' || f.riskLevel === 'Very High');
  if (ctx.goal?.toLowerCase().includes('retire')) pool = pool.filter(f => f.assetClass !== 'Other');
  if (ctx.goal?.toLowerCase().includes('emergency')) pool = pool.filter(f => f.assetClass === 'Debt' || f.category === 'Liquid');

  const scored = pool
    .map(f => ({ f, score: f.returns3Y - f.expenseRatio * 2 + Math.min(f.aum / 10000, 3) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ f }) => fundToShortlist(f));
}
