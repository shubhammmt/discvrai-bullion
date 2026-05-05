// Trigger Engine — sharp, configurable thresholds for portfolio rebalancing
// Used across /rebalancing, /sip-management Home, Portfolio page, /alerts.
// Goal: deterministic mapping  (signal → severity → recommended action → CTA target).

export type TriggerSeverity = 'critical' | 'warn' | 'info';
export type TriggerActionType = 'topup' | 'reduce' | 'switch' | 'rebalance' | 'monitor' | 'fix-sip';
export type TriggerCategory =
  | 'concentration-sector'
  | 'concentration-fund'
  | 'concentration-category'
  | 'overlap'
  | 'goal-gap'
  | 'return-underperf'
  | 'risk-mismatch'
  | 'sip-missed'
  | 'sip-topup-due'
  | 'inactivity'
  | 'event-news'
  | 'mandate-drift';

export interface TriggerThresholds {
  sectorWarn: number; sectorCritical: number;
  fundWarn: number; fundCritical: number;
  categoryWarn: number; categoryCritical: number;
  overlapWarn: number; overlapCritical: number;
  goalGapWarn: number; goalGapCritical: number; // projected/required ratio
  returnGapWarn: number; returnGapCritical: number; // expected − rolling12M
  inactivityDays: number;
  topupCadenceMonths: number;
  defaultTopupPct: number;
}

export const DEFAULT_THRESHOLDS: TriggerThresholds = {
  sectorWarn: 30, sectorCritical: 40,
  fundWarn: 20, fundCritical: 30,
  categoryWarn: 50, categoryCritical: 65,
  overlapWarn: 35, overlapCritical: 50,
  goalGapWarn: 0.9, goalGapCritical: 0.8,
  returnGapWarn: 2, returnGapCritical: 4,
  inactivityDays: 45,
  topupCadenceMonths: 6,
  defaultTopupPct: 10,
};

export interface PortfolioTrigger {
  id: string;
  category: TriggerCategory;
  severity: TriggerSeverity;
  confidence: number; // 0–1
  title: string;
  detail: string;
  metric?: { label: string; value: string };
  impactedGoals: string[];
  recommendedAction: TriggerActionType;
  ctaLabel: string;
  ctaTarget: string;
  estImpact?: string; // e.g. "Concentration −14%, Goal probability +8%"
}

const ACTION_LABEL: Record<TriggerActionType, string> = {
  topup: 'Top-up',
  reduce: 'Reduce',
  switch: 'Switch fund',
  rebalance: 'Rebalance now',
  monitor: 'Monitor',
  'fix-sip': 'Fix SIP',
};

export const triggerActionLabel = (a: TriggerActionType) => ACTION_LABEL[a];

// Sample / demo triggers — production engine would derive these from holdings.
export const SAMPLE_TRIGGERS: PortfolioTrigger[] = [
  {
    id: 'tg-1',
    category: 'concentration-sector',
    severity: 'critical',
    confidence: 0.92,
    title: 'Tech sector concentration: 32%',
    detail: 'Technology exposure exceeds 30% warn / 40% critical band. Recommended cap: 20%.',
    metric: { label: 'Sector weight', value: '32%' },
    impactedGoals: ['Retirement', 'Wedding 2027'],
    recommendedAction: 'switch',
    ctaLabel: 'Rebalance now',
    ctaTarget: '/rebalancing',
    estImpact: 'Concentration −14% · Drawdown risk: High → Moderate',
  },
  {
    id: 'tg-2',
    category: 'goal-gap',
    severity: 'warn',
    confidence: 0.85,
    title: 'Retirement goal: 12% behind',
    detail: 'Projected corpus is 88% of required corpus. Step-up SIP by 10% to close the gap.',
    metric: { label: 'Projected / Required', value: '88%' },
    impactedGoals: ['Retirement'],
    recommendedAction: 'topup',
    ctaLabel: 'Increase SIP +10%',
    ctaTarget: '/sip-management',
    estImpact: 'Goal probability +8% over 15Y',
  },
  {
    id: 'tg-3',
    category: 'sip-missed',
    severity: 'critical',
    confidence: 0.99,
    title: 'SIP failed: Axis Bluechip',
    detail: '₹5,000 SIP debit failed today (insufficient balance). Next attempt: 02 May.',
    metric: { label: 'Status', value: 'Failed once' },
    impactedGoals: ['Wedding 2027'],
    recommendedAction: 'fix-sip',
    ctaLabel: 'Fix SIP now',
    ctaTarget: '/sip-management',
    estImpact: 'Restores monthly compounding stream',
  },
  {
    id: 'tg-4',
    category: 'overlap',
    severity: 'warn',
    confidence: 0.78,
    title: 'Holdings overlap: 38% across 3 large-caps',
    detail: 'HDFC, Axis & Mirae Bluechip share 38% of top holdings — true diversification is lower than it looks.',
    metric: { label: 'Overlap', value: '38%' },
    impactedGoals: ['All long-term goals'],
    recommendedAction: 'switch',
    ctaLabel: 'Compare & switch',
    ctaTarget: '/rebalancing',
    estImpact: 'Effective diversification +22%',
  },
  {
    id: 'tg-5',
    category: 'sip-topup-due',
    severity: 'info',
    confidence: 0.7,
    title: '6-month top-up window open',
    detail: 'Inflation-adjusted goal gap detected. Default suggestion: +10% on existing SIPs.',
    impactedGoals: ['Retirement', "Aanya's Studies"],
    recommendedAction: 'topup',
    ctaLabel: 'Apply +10% top-up',
    ctaTarget: '/sip-management',
    estImpact: 'Compounds an extra ₹3.4L over 10Y',
  },
];

export const sortTriggers = (xs: PortfolioTrigger[]) => {
  const order: Record<TriggerSeverity, number> = { critical: 0, warn: 1, info: 2 };
  return [...xs].sort((a, b) => order[a.severity] - order[b.severity] || b.confidence - a.confidence);
};

export const topTrigger = (xs: PortfolioTrigger[]) => sortTriggers(xs)[0] ?? null;
export const topRebalanceTrigger = (xs: PortfolioTrigger[]) =>
  sortTriggers(xs.filter(t => t.recommendedAction !== 'fix-sip'))[0] ?? null;
export const topSipTrigger = (xs: PortfolioTrigger[]) =>
  sortTriggers(xs.filter(t => ['fix-sip', 'topup'].includes(t.recommendedAction)))[0] ?? null;

export const isApplyAllEligible = (xs: PortfolioTrigger[]) =>
  xs.length > 0 && xs.length <= 3 && xs.every(t => t.confidence >= 0.8);
