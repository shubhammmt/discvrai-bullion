// Phase-1 rebalance config — single source of truth for triggers + thresholds.
// All values tuneable from this one file. Drift stays OFF until targets persisted.

export interface RebalanceConfig {
  sector:    { enabled: boolean; warn: number; critical: number };
  singleFund:{ enabled: boolean; warn: number; critical: number };
  benchmark: {
    enabled: boolean;
    index: string;
    lookbackSessions: number;
    warnDrawdownPct: number;
    criticalDrawdownPct: number;
    // Mock current drawdown (negative number); replace with real series.
    mockDrawdownPct: number;
  };
  drift:     { enabled: false }; // explicitly off in Phase-1 MVP
  maxAlertCards: number;
  nextReviewDays: number;
  minOrderINR: number;
  roundToINR: number;
}

export const REBALANCE_CONFIG: RebalanceConfig = {
  sector:     { enabled: true, warn: 30, critical: 40 },
  singleFund: { enabled: true, warn: 20, critical: 30 },
  benchmark:  {
    enabled: true,
    index: 'NIFTY 50',
    lookbackSessions: 20,
    warnDrawdownPct: 5,
    criticalDrawdownPct: 8,
    mockDrawdownPct: -6.2,
  },
  drift:         { enabled: false },
  maxAlertCards: 3,
  nextReviewDays: 30,
  minOrderINR: 500,
  roundToINR: 500,
};
