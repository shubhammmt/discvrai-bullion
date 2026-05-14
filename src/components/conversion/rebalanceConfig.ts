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
    mockDrawdownPct: number;
  };
  drift:     { enabled: false }; // explicitly off in Phase-1 MVP
  maxAlertCards: number;
  nextReviewDays: number;
  minOrderINR: number;
  roundToINR: number;
  // Settlement + execution mock rules (indicative copy only — not OMS truth)
  settlement: {
    redeemWorkingDays: number;       // T+N for proceeds to clear
    label: string;                   // e.g. "T+3 working days"
  };
  // Static, indicative exit-load rule (Phase-1 mock)
  exitLoad: {
    holdingDaysCutoff: number;       // e.g. 365 — beyond which exit load is 0
    chargePctIfWithin: number;       // e.g. 1 — % of redeemed amount if held < cutoff
  };
  // Default Buy mode for switch destinations
  buyDefaults: {
    mode: 'sip' | 'lumpsum';
    sipMonthsMin: number;
    sipMonthsMax: number;
    sipInstallmentRoundINR: number;  // round each SIP installment to this
  };
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
  settlement: {
    redeemWorkingDays: 3,
    label: 'T+3 working days',
  },
  exitLoad: {
    holdingDaysCutoff: 365,
    chargePctIfWithin: 1,
  },
  buyDefaults: {
    mode: 'sip',
    sipMonthsMin: 4,
    sipMonthsMax: 12,
    sipInstallmentRoundINR: 500,
  },
};
