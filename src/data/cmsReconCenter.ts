// CMS Recon Command Center — Mock Data & Types

export interface ReconPulse {
  totalLeakage: number;
  leakageTrend: number; // % change
  mir: number; // Manual Intervention Rate %
  mirTrend: number;
  penaltyExposure: number;
  penaltyTrend: number;
  overageRecoveryRate: number;
  recoveryTrend: number;
  totalCases: number;
  resolvedToday: number;
  avgResolutionHrs: number;
}

export interface MismatchedLedger {
  id: string;
  terminalId: string;
  bank: string;
  region: string;
  state: string;
  bankSwitchAmount: number;
  ejLogAmount: number;
  physicalCount: number;
  variance: number;
  varianceType: 'Shortage' | 'Overage' | 'Denomination Mismatch';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  detectedAt: string;
  status: 'Open' | 'Under Investigation' | 'Escalated' | 'Resolved';
  autoRecoveryFlag: boolean;
  silentClose: boolean;
  predictedRecovery: number;
  denominationDrift?: string;
}

export interface PendingClaim {
  id: string;
  terminalId: string;
  bank: string;
  claimId: string;
  customerRef: string;
  claimedAmount: number;
  txnDate: string;
  claimFiledAt: string;
  errorDesc: string;
  daysElapsed: number;
  penaltyPerDay: number;
  accruedPenalty: number;
  status: 'Pending Verification' | 'EJ Matched' | 'EJ Mismatch' | 'Awaiting Physical' | 'Resolved';
  ejMatch: boolean;
  resolution?: string;
}

export interface HarmonizingPenalty {
  id: string;
  terminalId: string;
  bank: string;
  overageAmount: number;
  detectedAt: string;
  eodDeadline: string;
  declarationDelay: string;
  penaltyAmount: number;
  citAgent: string;
  status: 'Pending Declaration' | 'Declared Late' | 'Under Review' | 'Penalty Applied';
  autoRecovery: boolean;
  flmSilentClose: boolean;
}

export interface ThreeWayRecon {
  terminalId: string;
  date: string;
  systemLedger: {
    openingBalance: number;
    depositsReceived: number;
    withdrawalsProcessed: number;
    expectedClosing: number;
    switchTransactions: number;
    lastSwitchSync: string;
  };
  machineTruth: {
    ejOpeningBalance: number;
    ejWithdrawals: number;
    ejDeposits: number;
    ejClosingBalance: number;
    sensorHits: number;
    autoRecoveries: number;
    jams: number;
    lastEjTimestamp: string;
  };
  physicalTruth: {
    custodianCount: number;
    cllVerified: boolean;
    rejectBinCount: number;
    rejectBinSealed: boolean;
    counterFileUploaded: boolean;
    eodAgentName: string;
    eodTimestamp: string;
    denominationBreakdown: { denom: number; count: number; total: number }[];
  };
  verdict: {
    recommendation: 'Accept Shortage' | 'Flag for Audit' | 'Auto-Resolve Claim' | 'Denomination Audit Required';
    confidence: number;
    reasoning: string;
    estimatedRecovery: number;
  };
}

// ── Pulse Data ──
export const reconPulse: ReconPulse = {
  totalLeakage: 4237500,
  leakageTrend: -12.3,
  mir: 23.4,
  mirTrend: -2.1,
  penaltyExposure: 1856000,
  penaltyTrend: 8.7,
  overageRecoveryRate: 67.2,
  recoveryTrend: 4.5,
  totalCases: 1847,
  resolvedToday: 312,
  avgResolutionHrs: 18.4,
};

// ── Mismatched Ledgers ──
export const mismatchedLedgers: MismatchedLedger[] = [
  { id: 'ML-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', region: 'West', state: 'Maharashtra', bankSwitchAmount: 2500000, ejLogAmount: 2498000, physicalCount: 2495000, variance: -5000, varianceType: 'Shortage', severity: 'High', detectedAt: '2026-04-12 09:30', status: 'Open', autoRecoveryFlag: true, silentClose: true, predictedRecovery: 4200, denominationDrift: '₹500 notes found in ₹100 cassette' },
  { id: 'ML-002', terminalId: 'ATM-DEL-0034', bank: 'SBI', region: 'North', state: 'Delhi', bankSwitchAmount: 3000000, ejLogAmount: 3000000, physicalCount: 3007500, variance: 7500, varianceType: 'Overage', severity: 'Medium', detectedAt: '2026-04-12 08:15', status: 'Under Investigation', autoRecoveryFlag: false, silentClose: false, predictedRecovery: 7500 },
  { id: 'ML-003', terminalId: 'ATM-BLR-0112', bank: 'ICICI', region: 'South', state: 'Karnataka', bankSwitchAmount: 1800000, ejLogAmount: 1795000, physicalCount: 1790000, variance: -10000, varianceType: 'Shortage', severity: 'Critical', detectedAt: '2026-04-12 07:45', status: 'Escalated', autoRecoveryFlag: false, silentClose: false, predictedRecovery: 8500 },
  { id: 'ML-004', terminalId: 'ATM-CHN-0087', bank: 'Axis', region: 'South', state: 'Tamil Nadu', bankSwitchAmount: 2200000, ejLogAmount: 2200000, physicalCount: 2200000, variance: 0, varianceType: 'Denomination Mismatch', severity: 'Medium', detectedAt: '2026-04-12 10:00', status: 'Open', autoRecoveryFlag: false, silentClose: false, predictedRecovery: 0, denominationDrift: '12x₹200 found where 24x₹100 expected' },
  { id: 'ML-005', terminalId: 'ATM-KOL-0056', bank: 'PNB', region: 'East', state: 'West Bengal', bankSwitchAmount: 1500000, ejLogAmount: 1497000, physicalCount: 1494500, variance: -5500, varianceType: 'Shortage', severity: 'High', detectedAt: '2026-04-12 06:30', status: 'Open', autoRecoveryFlag: true, silentClose: true, predictedRecovery: 4800 },
  { id: 'ML-006', terminalId: 'ATM-HYD-0023', bank: 'HDFC', region: 'South', state: 'Telangana', bankSwitchAmount: 2800000, ejLogAmount: 2800000, physicalCount: 2803000, variance: 3000, varianceType: 'Overage', severity: 'Low', detectedAt: '2026-04-12 11:20', status: 'Open', autoRecoveryFlag: false, silentClose: false, predictedRecovery: 3000 },
  { id: 'ML-007', terminalId: 'ATM-JAI-0044', bank: 'SBI', region: 'North', state: 'Rajasthan', bankSwitchAmount: 1200000, ejLogAmount: 1188000, physicalCount: 1185000, variance: -15000, varianceType: 'Shortage', severity: 'Critical', detectedAt: '2026-04-12 05:45', status: 'Escalated', autoRecoveryFlag: true, silentClose: false, predictedRecovery: 12000 },
  { id: 'ML-008', terminalId: 'ATM-AMD-0019', bank: 'Kotak', region: 'West', state: 'Gujarat', bankSwitchAmount: 1600000, ejLogAmount: 1598500, physicalCount: 1597000, variance: -3000, varianceType: 'Shortage', severity: 'Medium', detectedAt: '2026-04-12 09:00', status: 'Under Investigation', autoRecoveryFlag: false, silentClose: false, predictedRecovery: 2500 },
];

// ── Pending Claims ──
export const pendingClaims: PendingClaim[] = [
  { id: 'PC-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', claimId: 'CLM-2026-04-001', customerRef: 'CUST-88421', claimedAmount: 15000, txnDate: '2026-04-08', claimFiledAt: '2026-04-08 14:30', errorDesc: 'Customer claims ₹15,000 not dispensed — BNA jam during withdrawal', daysElapsed: 4, penaltyPerDay: 100, accruedPenalty: 200, status: 'EJ Mismatch', ejMatch: false },
  { id: 'PC-002', terminalId: 'ATM-DEL-0034', bank: 'SBI', claimId: 'CLM-2026-04-002', customerRef: 'CUST-77210', claimedAmount: 10000, txnDate: '2026-04-10', claimFiledAt: '2026-04-10 09:15', errorDesc: 'Partial dispense — only ₹5,000 of ₹10,000 received', daysElapsed: 2, penaltyPerDay: 100, accruedPenalty: 0, status: 'Pending Verification', ejMatch: true },
  { id: 'PC-003', terminalId: 'ATM-BLR-0112', bank: 'ICICI', claimId: 'CLM-2026-04-003', customerRef: 'CUST-65430', claimedAmount: 20000, txnDate: '2026-04-07', claimFiledAt: '2026-04-07 18:00', errorDesc: 'Account debited but no cash received — host timeout', daysElapsed: 5, penaltyPerDay: 100, accruedPenalty: 500, status: 'Awaiting Physical', ejMatch: false },
  { id: 'PC-004', terminalId: 'ATM-CHN-0087', bank: 'Axis', claimId: 'CLM-2026-04-004', customerRef: 'CUST-91023', claimedAmount: 5000, txnDate: '2026-04-11', claimFiledAt: '2026-04-11 11:00', errorDesc: 'Cash dispensed but wrong denomination notes', daysElapsed: 1, penaltyPerDay: 100, accruedPenalty: 0, status: 'EJ Matched', ejMatch: true, resolution: 'Denomination mismatch confirmed — refund approved' },
  { id: 'PC-005', terminalId: 'ATM-KOL-0056', bank: 'PNB', claimId: 'CLM-2026-04-005', customerRef: 'CUST-43218', claimedAmount: 25000, txnDate: '2026-04-06', claimFiledAt: '2026-04-06 16:45', errorDesc: 'Complete failure — card retained and no dispense', daysElapsed: 6, penaltyPerDay: 100, accruedPenalty: 100, status: 'EJ Mismatch', ejMatch: false },
  { id: 'PC-006', terminalId: 'ATM-HYD-0023', bank: 'HDFC', claimId: 'CLM-2026-04-006', customerRef: 'CUST-55672', claimedAmount: 8000, txnDate: '2026-04-11', claimFiledAt: '2026-04-12 08:00', errorDesc: 'Short dispense — received ₹6,000 of ₹8,000', daysElapsed: 1, penaltyPerDay: 100, accruedPenalty: 0, status: 'Pending Verification', ejMatch: true },
];

// ── Harmonizing Penalties ──
export const harmonizingPenalties: HarmonizingPenalty[] = [
  { id: 'HP-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', overageAmount: 2000, detectedAt: '2026-04-12 09:14', eodDeadline: '2026-04-12 18:00', declarationDelay: '8h 46m', penaltyAmount: 500, citAgent: 'Rajesh Sharma', status: 'Pending Declaration', autoRecovery: true, flmSilentClose: true },
  { id: 'HP-002', terminalId: 'ATM-KOL-0056', bank: 'PNB', overageAmount: 5500, detectedAt: '2026-04-11 14:00', eodDeadline: '2026-04-11 18:00', declarationDelay: '28h+', penaltyAmount: 1500, citAgent: 'Sunil Das', status: 'Penalty Applied', autoRecovery: true, flmSilentClose: true },
  { id: 'HP-003', terminalId: 'ATM-JAI-0044', bank: 'SBI', overageAmount: 3000, detectedAt: '2026-04-12 05:45', eodDeadline: '2026-04-12 18:00', declarationDelay: '12h 15m', penaltyAmount: 750, citAgent: 'Vikram Meena', status: 'Declared Late', autoRecovery: true, flmSilentClose: false },
  { id: 'HP-004', terminalId: 'ATM-BLR-0112', bank: 'ICICI', overageAmount: 4000, detectedAt: '2026-04-11 22:00', eodDeadline: '2026-04-12 18:00', declarationDelay: '20h+', penaltyAmount: 1200, citAgent: 'Karthik Nair', status: 'Under Review', autoRecovery: false, flmSilentClose: false },
];

// ── 3-Way Reconciliation ──
export const threeWayRecons: Record<string, ThreeWayRecon> = {
  'ATM-MUM-0001': {
    terminalId: 'ATM-MUM-0001',
    date: '2026-04-12',
    systemLedger: { openingBalance: 2500000, depositsReceived: 0, withdrawalsProcessed: 485000, expectedClosing: 2015000, switchTransactions: 48, lastSwitchSync: '2026-04-12 18:00:00' },
    machineTruth: { ejOpeningBalance: 2500000, ejWithdrawals: 483000, ejDeposits: 0, ejClosingBalance: 2017000, sensorHits: 52, autoRecoveries: 1, jams: 1, lastEjTimestamp: '2026-04-12 17:58:22' },
    physicalTruth: { custodianCount: 2012000, cllVerified: true, rejectBinCount: 3000, rejectBinSealed: true, counterFileUploaded: true, eodAgentName: 'Ramesh K.', eodTimestamp: '2026-04-12 18:05:00', denominationBreakdown: [{ denom: 2000, count: 400, total: 800000 }, { denom: 500, count: 1624, total: 812000 }, { denom: 200, count: 1000, total: 200000 }, { denom: 100, count: 2000, total: 200000 }] },
    verdict: { recommendation: 'Flag for Audit', confidence: 82, reasoning: 'Physical count ₹2,012,000 is ₹5,000 less than EJ closing ₹2,017,000. Auto-recovery event at 09:14 with FLM silent close suggests potential ₹2,000 stuck note. Reject bin sealed with 3 notes. Recommend physical audit of reject bin contents.', estimatedRecovery: 4200 },
  },
  'ATM-BLR-0112': {
    terminalId: 'ATM-BLR-0112',
    date: '2026-04-12',
    systemLedger: { openingBalance: 1800000, depositsReceived: 0, withdrawalsProcessed: 320000, expectedClosing: 1480000, switchTransactions: 32, lastSwitchSync: '2026-04-12 17:55:00' },
    machineTruth: { ejOpeningBalance: 1800000, ejWithdrawals: 315000, ejDeposits: 0, ejClosingBalance: 1485000, sensorHits: 35, autoRecoveries: 0, jams: 0, lastEjTimestamp: '2026-04-12 17:52:10' },
    physicalTruth: { custodianCount: 1475000, cllVerified: true, rejectBinCount: 0, rejectBinSealed: false, counterFileUploaded: true, eodAgentName: 'Deepak R.', eodTimestamp: '2026-04-12 18:10:00', denominationBreakdown: [{ denom: 2000, count: 300, total: 600000 }, { denom: 500, count: 1350, total: 675000 }, { denom: 200, count: 500, total: 100000 }, { denom: 100, count: 1000, total: 100000 }] },
    verdict: { recommendation: 'Accept Shortage', confidence: 91, reasoning: 'Consistent ₹10,000 shortage across all three data sources (Switch: ₹1,480,000 vs Physical: ₹1,475,000 vs EJ: ₹1,485,000). EJ shows 5 additional unlogged dispensations — likely connectivity drops. No auto-recovery events. Shortage pattern consistent with network timeout dispensations.', estimatedRecovery: 8500 },
  },
};

// ── Filter options ──
export const reconBanks = ['All', 'HDFC', 'SBI', 'ICICI', 'Axis', 'PNB', 'Kotak', 'BOB', 'IndusInd'];
export const reconRegions = ['All', 'West', 'North', 'South', 'East'];
export const riskLevels = ['All', 'Critical', 'High', 'Medium', 'Low'];

// ── Helpers ──
export const formatINR = (n: number) => '₹' + Math.abs(n).toLocaleString('en-IN');

export const getSeverityBadge = (s: string) => {
  switch (s) {
    case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
    case 'High': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Medium': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    default: return 'bg-slate-100 text-slate-700';
  }
};

export const getClaimTimerColor = (days: number) => {
  if (days >= 5) return 'bg-red-600 text-white';
  if (days >= 4) return 'bg-red-100 text-red-700';
  if (days >= 3) return 'bg-amber-100 text-amber-700';
  return 'bg-emerald-100 text-emerald-700';
};
