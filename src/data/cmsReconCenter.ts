// CMS Recon Command Center — Mock Data & Types

export interface ReconPulse {
  totalLeakage: number;
  leakageTrend: number;
  mir: number;
  mirTrend: number;
  penaltyExposure: number;
  penaltyTrend: number;
  overageRecoveryRate: number;
  recoveryTrend: number;
  totalCases: number;
  resolvedToday: number;
  avgResolutionHrs: number;
}

export interface TransactionComparison {
  txnId: string;
  timestamp: string;
  bankSwitch: { action: string; amount: number; status: string };
  machineEJ: { action: string; amount: number; status: string; errorCode?: string };
  physicalSlip: { action: string; amount: number; note: string };
  variance: number;
  varianceReason: string;
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
  transactions: TransactionComparison[];
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
  bankSwitch: { action: string; amount: number; status: string };
  machineEJ: { action: string; amount: number; status: string; errorCode?: string };
  physicalSlip: { action: string; amount: number; note: string };
}

export interface HarmonizingPenalty {
  id: string;
  terminalId: string;
  bank: string;
  overageAmount: number;
  detectedAt: string;
  eodDeadline: string;
  eodsPassed: number;
  declarationDelay: string;
  penaltyAmount: number;
  penaltyFormula: string;
  citAgent: string;
  status: 'Pending Declaration' | 'Declared Late' | 'Under Review' | 'Penalty Applied';
  autoRecovery: boolean;
  flmSilentClose: boolean;
}

export interface AutoRecoverySilentMatch {
  id: string;
  terminalId: string;
  bank: string;
  region: string;
  arTimestamp: string;
  suspectedOverage: number;
  declaredOverage: number;
  delta: number;
  flmTicketStatus: 'Open' | 'Silent Closed' | 'Resolved' | 'Pending';
  pilferageFlag: boolean;
  auditROI: number;
  ejSnippet: string;
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

// ── Mismatched Ledgers with Transaction Comparisons ──
export const mismatchedLedgers: MismatchedLedger[] = [
  {
    id: 'ML-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', region: 'West', state: 'Maharashtra',
    bankSwitchAmount: 2500000, ejLogAmount: 2498000, physicalCount: 2495000,
    variance: -5000, varianceType: 'Shortage', severity: 'High',
    detectedAt: '2026-04-12 09:30', status: 'Open',
    autoRecoveryFlag: true, silentClose: true, predictedRecovery: 4200,
    denominationDrift: '₹500 notes found in ₹100 cassette',
    transactions: [
      { txnId: 'TXN-88421', timestamp: '09:14:22', bankSwitch: { action: 'Dispense', amount: 2000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 0, status: 'Jam at Exit', errorCode: 'E-4012' }, physicalSlip: { action: 'EOD Count', amount: 2495000, note: 'Reject bin: 1 note stuck' }, variance: 2000, varianceReason: 'Bank says dispensed; Machine jammed. Cash stuck in exit shutter.' },
      { txnId: 'TXN-88435', timestamp: '11:22:05', bankSwitch: { action: 'Dispense', amount: 5000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 5000, status: 'Success' }, physicalSlip: { action: 'N/A', amount: 0, note: 'No discrepancy' }, variance: 0, varianceReason: 'Clean match across all sources.' },
      { txnId: 'TXN-88450', timestamp: '14:08:33', bankSwitch: { action: 'Dispense', amount: 10000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 7000, status: 'Partial — Auto-Recovery', errorCode: 'E-3008' }, physicalSlip: { action: 'EOD Count', amount: 2495000, note: '₹3,000 retracted to cassette' }, variance: 3000, varianceReason: 'Auto-Recovery: ₹3,000 retracted but Switch marked full ₹10,000 success.' },
    ],
  },
  {
    id: 'ML-002', terminalId: 'ATM-DEL-0034', bank: 'SBI', region: 'North', state: 'Delhi',
    bankSwitchAmount: 3000000, ejLogAmount: 3000000, physicalCount: 3007500,
    variance: 7500, varianceType: 'Overage', severity: 'Medium',
    detectedAt: '2026-04-12 08:15', status: 'Under Investigation',
    autoRecoveryFlag: false, silentClose: false, predictedRecovery: 7500,
    transactions: [
      { txnId: 'TXN-77210', timestamp: '08:02:11', bankSwitch: { action: 'Dispense', amount: 10000, status: 'Timeout — Reversal' }, machineEJ: { action: 'Dispense', amount: 10000, status: 'Success' }, physicalSlip: { action: 'EOD Count', amount: 3007500, note: 'Extra ₹7,500 in cassette 2' }, variance: -7500, varianceReason: 'Switch reversed but machine dispensed. Overage in machine.' },
    ],
  },
  {
    id: 'ML-003', terminalId: 'ATM-BLR-0112', bank: 'ICICI', region: 'South', state: 'Karnataka',
    bankSwitchAmount: 1800000, ejLogAmount: 1795000, physicalCount: 1790000,
    variance: -10000, varianceType: 'Shortage', severity: 'Critical',
    detectedAt: '2026-04-12 07:45', status: 'Escalated',
    autoRecoveryFlag: false, silentClose: false, predictedRecovery: 8500,
    transactions: [
      { txnId: 'TXN-65430', timestamp: '07:30:01', bankSwitch: { action: 'Dispense', amount: 20000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 15000, status: 'Host Timeout — Partial', errorCode: 'E-5001' }, physicalSlip: { action: 'EOD Count', amount: 1790000, note: 'Custodian reports ₹10K short' }, variance: 5000, varianceReason: 'Host timeout: EJ logged ₹15K dispense, Switch shows ₹20K. ₹5K unaccounted.' },
      { txnId: 'TXN-65445', timestamp: '10:15:44', bankSwitch: { action: 'Dispense', amount: 5000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 0, status: 'Communication Error', errorCode: 'E-6010' }, physicalSlip: { action: 'N/A', amount: 0, note: 'Machine offline window' }, variance: 5000, varianceReason: 'Machine offline during dispense — Blind Window. ₹5K unverifiable.' },
    ],
  },
  {
    id: 'ML-004', terminalId: 'ATM-CHN-0087', bank: 'Axis', region: 'South', state: 'Tamil Nadu',
    bankSwitchAmount: 2200000, ejLogAmount: 2200000, physicalCount: 2200000,
    variance: 0, varianceType: 'Denomination Mismatch', severity: 'Medium',
    detectedAt: '2026-04-12 10:00', status: 'Open',
    autoRecoveryFlag: false, silentClose: false, predictedRecovery: 0,
    denominationDrift: '12x₹200 found where 24x₹100 expected',
    transactions: [
      { txnId: 'TXN-91023', timestamp: '09:50:12', bankSwitch: { action: 'Dispense', amount: 5000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 5000, status: 'Success — Wrong Denom' }, physicalSlip: { action: 'EOD Count', amount: 2200000, note: '₹200 notes in ₹100 slot' }, variance: 0, varianceReason: 'Total matches but denomination slots are misloaded.' },
    ],
  },
  {
    id: 'ML-005', terminalId: 'ATM-KOL-0056', bank: 'PNB', region: 'East', state: 'West Bengal',
    bankSwitchAmount: 1500000, ejLogAmount: 1497000, physicalCount: 1494500,
    variance: -5500, varianceType: 'Shortage', severity: 'High',
    detectedAt: '2026-04-12 06:30', status: 'Open',
    autoRecoveryFlag: true, silentClose: true, predictedRecovery: 4800,
    transactions: [
      { txnId: 'TXN-43218', timestamp: '06:15:08', bankSwitch: { action: 'Dispense', amount: 25000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 19500, status: 'Card Retained — Partial', errorCode: 'E-7003' }, physicalSlip: { action: 'EOD Count', amount: 1494500, note: 'Card in reader tray' }, variance: 5500, varianceReason: 'Card retained mid-dispense. ₹5,500 stuck between shutter and presenter.' },
    ],
  },
  {
    id: 'ML-006', terminalId: 'ATM-HYD-0023', bank: 'HDFC', region: 'South', state: 'Telangana',
    bankSwitchAmount: 2800000, ejLogAmount: 2800000, physicalCount: 2803000,
    variance: 3000, varianceType: 'Overage', severity: 'Low',
    detectedAt: '2026-04-12 11:20', status: 'Open',
    autoRecoveryFlag: false, silentClose: false, predictedRecovery: 3000,
    transactions: [
      { txnId: 'TXN-55672', timestamp: '11:05:30', bankSwitch: { action: 'Dispense', amount: 8000, status: 'Reversal' }, machineEJ: { action: 'Dispense', amount: 5000, status: 'Partial' }, physicalSlip: { action: 'EOD Count', amount: 2803000, note: '₹3K extra counted' }, variance: -3000, varianceReason: 'Switch reversed full ₹8K but only ₹5K was dispensed. ₹3K overage.' },
    ],
  },
  {
    id: 'ML-007', terminalId: 'ATM-JAI-0044', bank: 'SBI', region: 'North', state: 'Rajasthan',
    bankSwitchAmount: 1200000, ejLogAmount: 1188000, physicalCount: 1185000,
    variance: -15000, varianceType: 'Shortage', severity: 'Critical',
    detectedAt: '2026-04-12 05:45', status: 'Escalated',
    autoRecoveryFlag: true, silentClose: false, predictedRecovery: 12000,
    transactions: [
      { txnId: 'TXN-30112', timestamp: '05:30:00', bankSwitch: { action: 'Dispense', amount: 40000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 25000, status: 'Multiple Jams', errorCode: 'E-4012, E-4015' }, physicalSlip: { action: 'EOD Count', amount: 1185000, note: '₹15K short — reject bin has 4 notes' }, variance: 15000, varianceReason: 'Multiple transport jams. ₹15K discrepancy: ₹8K in reject bin, ₹7K unaccounted.' },
    ],
  },
  {
    id: 'ML-008', terminalId: 'ATM-AMD-0019', bank: 'Kotak', region: 'West', state: 'Gujarat',
    bankSwitchAmount: 1600000, ejLogAmount: 1598500, physicalCount: 1597000,
    variance: -3000, varianceType: 'Shortage', severity: 'Medium',
    detectedAt: '2026-04-12 09:00', status: 'Under Investigation',
    autoRecoveryFlag: false, silentClose: false, predictedRecovery: 2500,
    transactions: [
      { txnId: 'TXN-40501', timestamp: '08:45:12', bankSwitch: { action: 'Dispense', amount: 10000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 8500, status: 'Partial', errorCode: 'E-3008' }, physicalSlip: { action: 'EOD Count', amount: 1597000, note: '₹1,500 in reject tray' }, variance: 1500, varianceReason: 'Partial dispense. ₹1,500 retracted to reject. Remaining ₹1,500 unaccounted.' },
    ],
  },
];

// ── Pending Claims with 3-Way Data ──
export const pendingClaims: PendingClaim[] = [
  { id: 'PC-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', claimId: 'CLM-2026-04-001', customerRef: 'CUST-88421', claimedAmount: 15000, txnDate: '2026-04-08', claimFiledAt: '2026-04-08 14:30', errorDesc: 'Customer claims ₹15,000 not dispensed — BNA jam', daysElapsed: 4, penaltyPerDay: 100, accruedPenalty: 200, status: 'EJ Mismatch', ejMatch: false, bankSwitch: { action: 'Dispense ₹15,000', amount: 15000, status: 'Success' }, machineEJ: { action: 'Dispense ₹15,000', amount: 0, status: 'Jam at Exit', errorCode: 'E-4012' }, physicalSlip: { action: 'EOD Count', amount: 2495000, note: 'Reject bin: 3 notes (₹2,000 x1 + ₹500 x2)' } },
  { id: 'PC-002', terminalId: 'ATM-DEL-0034', bank: 'SBI', claimId: 'CLM-2026-04-002', customerRef: 'CUST-77210', claimedAmount: 10000, txnDate: '2026-04-10', claimFiledAt: '2026-04-10 09:15', errorDesc: 'Partial dispense — only ₹5,000 of ₹10,000', daysElapsed: 2, penaltyPerDay: 100, accruedPenalty: 0, status: 'Pending Verification', ejMatch: true, bankSwitch: { action: 'Dispense ₹10,000', amount: 10000, status: 'Success' }, machineEJ: { action: 'Dispense ₹10,000', amount: 5000, status: 'Partial — Retracted ₹5K' }, physicalSlip: { action: 'EOD Count', amount: 3007500, note: 'Extra ₹5K found in cassette — matches retraction' } },
  { id: 'PC-003', terminalId: 'ATM-BLR-0112', bank: 'ICICI', claimId: 'CLM-2026-04-003', customerRef: 'CUST-65430', claimedAmount: 20000, txnDate: '2026-04-07', claimFiledAt: '2026-04-07 18:00', errorDesc: 'Account debited but no cash — host timeout', daysElapsed: 5, penaltyPerDay: 100, accruedPenalty: 500, status: 'Awaiting Physical', ejMatch: false, bankSwitch: { action: 'Dispense ₹20,000', amount: 20000, status: 'Timeout — Marked Success' }, machineEJ: { action: 'Dispense ₹20,000', amount: 0, status: 'Host Timeout — No Dispense', errorCode: 'E-5001' }, physicalSlip: { action: 'EOD Count', amount: 1790000, note: 'Custodian confirms no dispense occurred' } },
  { id: 'PC-004', terminalId: 'ATM-CHN-0087', bank: 'Axis', claimId: 'CLM-2026-04-004', customerRef: 'CUST-91023', claimedAmount: 5000, txnDate: '2026-04-11', claimFiledAt: '2026-04-11 11:00', errorDesc: 'Wrong denomination notes dispensed', daysElapsed: 1, penaltyPerDay: 100, accruedPenalty: 0, status: 'EJ Matched', ejMatch: true, resolution: 'Denomination mismatch confirmed — refund approved', bankSwitch: { action: 'Dispense ₹5,000', amount: 5000, status: 'Success' }, machineEJ: { action: 'Dispense ₹5,000', amount: 5000, status: 'Success — Wrong Denom' }, physicalSlip: { action: 'Customer Report', amount: 5000, note: '₹200 notes dispensed instead of ₹500' } },
  { id: 'PC-005', terminalId: 'ATM-KOL-0056', bank: 'PNB', claimId: 'CLM-2026-04-005', customerRef: 'CUST-43218', claimedAmount: 25000, txnDate: '2026-04-06', claimFiledAt: '2026-04-06 16:45', errorDesc: 'Card retained and no dispense', daysElapsed: 6, penaltyPerDay: 100, accruedPenalty: 100, status: 'EJ Mismatch', ejMatch: false, bankSwitch: { action: 'Dispense ₹25,000', amount: 25000, status: 'Success' }, machineEJ: { action: 'Dispense ₹25,000', amount: 0, status: 'Card Retained — Abort', errorCode: 'E-7003' }, physicalSlip: { action: 'EOD Count', amount: 1494500, note: 'Card found in reader. No dispense evidence.' } },
  { id: 'PC-006', terminalId: 'ATM-HYD-0023', bank: 'HDFC', claimId: 'CLM-2026-04-006', customerRef: 'CUST-55672', claimedAmount: 8000, txnDate: '2026-04-11', claimFiledAt: '2026-04-12 08:00', errorDesc: 'Short dispense — received ₹6,000 of ₹8,000', daysElapsed: 1, penaltyPerDay: 100, accruedPenalty: 0, status: 'Pending Verification', ejMatch: true, bankSwitch: { action: 'Dispense ₹8,000', amount: 8000, status: 'Success' }, machineEJ: { action: 'Dispense ₹8,000', amount: 6000, status: 'Partial — ₹2K Retracted' }, physicalSlip: { action: 'EOD Count', amount: 2803000, note: '₹2K found in reject tray' } },
];

// ── Harmonizing Penalties with EOD Math ──
export const harmonizingPenalties: HarmonizingPenalty[] = [
  { id: 'HP-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', overageAmount: 2000, detectedAt: '2026-04-12 09:14', eodDeadline: '2026-04-12 18:00', eodsPassed: 0, declarationDelay: '8h 46m', penaltyAmount: 500, penaltyFormula: '0 EODs × ₹500/EOD = ₹0 (Grace window active)', citAgent: 'Rajesh Sharma', status: 'Pending Declaration', autoRecovery: true, flmSilentClose: true },
  { id: 'HP-002', terminalId: 'ATM-KOL-0056', bank: 'PNB', overageAmount: 5500, detectedAt: '2026-04-11 14:00', eodDeadline: '2026-04-11 18:00', eodsPassed: 2, declarationDelay: '28h+', penaltyAmount: 2500, penaltyFormula: '2 EODs × ₹1,250/EOD = ₹2,500 (Non-recoverable)', citAgent: 'Sunil Das', status: 'Penalty Applied', autoRecovery: true, flmSilentClose: true },
  { id: 'HP-003', terminalId: 'ATM-JAI-0044', bank: 'SBI', overageAmount: 3000, detectedAt: '2026-04-12 05:45', eodDeadline: '2026-04-12 18:00', eodsPassed: 1, declarationDelay: '12h 15m', penaltyAmount: 750, penaltyFormula: '1 EOD × ₹750/EOD = ₹750 (Declared Late)', citAgent: 'Vikram Meena', status: 'Declared Late', autoRecovery: true, flmSilentClose: false },
  { id: 'HP-004', terminalId: 'ATM-BLR-0112', bank: 'ICICI', overageAmount: 4000, detectedAt: '2026-04-11 22:00', eodDeadline: '2026-04-12 18:00', eodsPassed: 1, declarationDelay: '20h+', penaltyAmount: 1200, penaltyFormula: '1 EOD × ₹1,200/EOD = ₹1,200 (Under Review)', citAgent: 'Karthik Nair', status: 'Under Review', autoRecovery: false, flmSilentClose: false },
];

// ── Auto-Recovery Silent Match Cases ──
export const autoRecoverySilentMatches: AutoRecoverySilentMatch[] = [
  { id: 'AR-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', region: 'West', arTimestamp: '2026-04-12 09:14', suspectedOverage: 3000, declaredOverage: 0, delta: 3000, flmTicketStatus: 'Silent Closed', pilferageFlag: true, auditROI: 3000, ejSnippet: '[09:14:22] E-4012 JAM_EXIT_SHUTTER\n[09:14:23] AUTO_RECOVERY INITIATED\n[09:14:25] NOTES_RETRACTED: 6x₹500\n[09:14:26] RECOVERY_COMPLETE\n[09:14:30] FLM_TICKET: T-4401 OPENED\n[09:15:01] FLM_TICKET: T-4401 CLOSED (No Action)' },
  { id: 'AR-002', terminalId: 'ATM-KOL-0056', bank: 'PNB', region: 'East', arTimestamp: '2026-04-12 06:15', suspectedOverage: 5500, declaredOverage: 2000, delta: 3500, flmTicketStatus: 'Silent Closed', pilferageFlag: true, auditROI: 3500, ejSnippet: '[06:15:08] E-7003 CARD_RETAINED\n[06:15:10] AUTO_RECOVERY INITIATED\n[06:15:12] NOTES_RETRACTED: 11x₹500\n[06:15:14] RECOVERY_COMPLETE\n[06:15:20] FLM_TICKET: T-4455 OPENED\n[06:16:05] FLM_TICKET: T-4455 CLOSED (Declared ₹2,000 only)' },
  { id: 'AR-003', terminalId: 'ATM-JAI-0044', bank: 'SBI', region: 'North', arTimestamp: '2026-04-12 05:30', suspectedOverage: 8000, declaredOverage: 8000, delta: 0, flmTicketStatus: 'Resolved', pilferageFlag: false, auditROI: 0, ejSnippet: '[05:30:00] E-4012 TRANSPORT_JAM\n[05:30:02] AUTO_RECOVERY INITIATED\n[05:30:05] NOTES_RETRACTED: 16x₹500\n[05:30:07] RECOVERY_COMPLETE\n[05:30:15] FLM_TICKET: T-4460 OPENED\n[05:32:00] FLM_TICKET: T-4460 RESOLVED (Declared ₹8,000)' },
  { id: 'AR-004', terminalId: 'ATM-AMD-0019', bank: 'Kotak', region: 'West', arTimestamp: '2026-04-12 08:45', suspectedOverage: 1500, declaredOverage: 0, delta: 1500, flmTicketStatus: 'Pending', pilferageFlag: true, auditROI: 1500, ejSnippet: '[08:45:12] E-3008 PARTIAL_DISPENSE\n[08:45:14] AUTO_RECOVERY INITIATED\n[08:45:16] NOTES_RETRACTED: 3x₹500\n[08:45:18] RECOVERY_COMPLETE\n[08:45:25] FLM_TICKET: T-4470 OPENED\n[STATUS: PENDING — No update in 12h]' },
];

// ── 3-Way Reconciliation ──
export const threeWayRecons: Record<string, ThreeWayRecon> = {
  'ATM-MUM-0001': {
    terminalId: 'ATM-MUM-0001', date: '2026-04-12',
    systemLedger: { openingBalance: 2500000, depositsReceived: 0, withdrawalsProcessed: 485000, expectedClosing: 2015000, switchTransactions: 48, lastSwitchSync: '2026-04-12 18:00:00' },
    machineTruth: { ejOpeningBalance: 2500000, ejWithdrawals: 483000, ejDeposits: 0, ejClosingBalance: 2017000, sensorHits: 52, autoRecoveries: 1, jams: 1, lastEjTimestamp: '2026-04-12 17:58:22' },
    physicalTruth: { custodianCount: 2012000, cllVerified: true, rejectBinCount: 3000, rejectBinSealed: true, counterFileUploaded: true, eodAgentName: 'Ramesh K.', eodTimestamp: '2026-04-12 18:05:00', denominationBreakdown: [{ denom: 2000, count: 400, total: 800000 }, { denom: 500, count: 1624, total: 812000 }, { denom: 200, count: 1000, total: 200000 }, { denom: 100, count: 2000, total: 200000 }] },
    verdict: { recommendation: 'Flag for Audit', confidence: 82, reasoning: 'Physical count ₹2,012,000 is ₹5,000 less than EJ closing ₹2,017,000. Auto-recovery event at 09:14 with FLM silent close suggests potential ₹2,000 stuck note. Reject bin sealed with 3 notes. Recommend physical audit of reject bin contents.', estimatedRecovery: 4200 },
  },
  'ATM-BLR-0112': {
    terminalId: 'ATM-BLR-0112', date: '2026-04-12',
    systemLedger: { openingBalance: 1800000, depositsReceived: 0, withdrawalsProcessed: 320000, expectedClosing: 1480000, switchTransactions: 32, lastSwitchSync: '2026-04-12 17:55:00' },
    machineTruth: { ejOpeningBalance: 1800000, ejWithdrawals: 315000, ejDeposits: 0, ejClosingBalance: 1485000, sensorHits: 35, autoRecoveries: 0, jams: 0, lastEjTimestamp: '2026-04-12 17:52:10' },
    physicalTruth: { custodianCount: 1475000, cllVerified: true, rejectBinCount: 0, rejectBinSealed: false, counterFileUploaded: true, eodAgentName: 'Deepak R.', eodTimestamp: '2026-04-12 18:10:00', denominationBreakdown: [{ denom: 2000, count: 300, total: 600000 }, { denom: 500, count: 1350, total: 675000 }, { denom: 200, count: 500, total: 100000 }, { denom: 100, count: 1000, total: 100000 }] },
    verdict: { recommendation: 'Accept Shortage', confidence: 91, reasoning: 'Consistent ₹10,000 shortage across all three data sources. EJ shows 5 additional unlogged dispensations — likely connectivity drops. No auto-recovery events. Shortage pattern consistent with network timeout dispensations.', estimatedRecovery: 8500 },
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
    case 'Critical': return 'bg-red-500/20 text-red-400';
    case 'High': return 'bg-amber-500/20 text-amber-400';
    case 'Medium': return 'bg-blue-500/20 text-blue-400';
    case 'Low': return 'bg-emerald-500/20 text-emerald-400';
    default: return 'bg-slate-500/20 text-slate-400';
  }
};

export const getClaimTimerColor = (days: number) => {
  if (days >= 5) return 'bg-red-600 text-white';
  if (days >= 4) return 'bg-red-500/30 text-red-400';
  if (days >= 3) return 'bg-amber-500/30 text-amber-400';
  return 'bg-emerald-500/20 text-emerald-400';
};
