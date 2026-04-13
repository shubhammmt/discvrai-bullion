// CMS Recon Command Center — Financial Resolution Engine — Data & Types

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
  recoveryPotential: number;
  autoResolutionRate: number;
  unrecoverablePenaltyLoss: number;
}

// ── Dispute Inbox ──
export interface BankDispute {
  id: string;
  source: string; // "HDFC Email Batch", "SBI Zip Upload", etc.
  claimRef: string;
  bankName: string;
  claimedAmount: number;
  txnDate: string;
  receivedAt: string;
  autoMapped: boolean;
  mappedTerminalId?: string;
  mappedEjRef?: string;
  mappingConfidence?: number;
  status: 'Auto-Mapped' | 'Orphan — Manual Mapping' | 'Duplicate' | 'Resolved';
  verdictReady: boolean;
  customerName: string;
  cardLast4: string;
}

// ── Vault Audit (Physical vs Digital) ──
export interface VaultAuditEntry {
  id: string;
  terminalId: string;
  bank: string;
  region: string;
  physicalVaultCount: number;
  digitalDepositSlip: number;
  custodianEntry: number;
  variance: number;
  varianceType: 'Shortage' | 'Overage' | 'Match';
  pilferageRiskScore: number; // 0-100
  custodianId: string;
  custodianName: string;
  auditDate: string;
  sealStatus: 'Sealed' | 'Broken' | 'Open';
  cllScanMatch: boolean;
  loadingSlipUploaded: boolean;
  notes: string;
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
  systemVerdict: string;
  verdictReason: string;
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
  dailyBackdatedPenalty: number;
  citAgent: string;
  status: 'Pending Declaration' | 'Declared Late' | 'Under Review' | 'Penalty Applied';
  autoRecovery: boolean;
  flmSilentClose: boolean;
  ejOverageDetected: boolean;
  physicalVaultReported: boolean;
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
  bankSide: {
    claimAmount: number;
    switchApprovalCode: string;
    disputeTableRef: string;
    bankContactEmail: string;
    claimNarrative: string;
  };
  machineSide: {
    ejLogSegment: string;
    sensorTriggers: string[];
    autoRecoveryStatus: string;
    rejectBinStatus: 'Sealed' | 'Open' | 'Tampered';
    rejectBinNotes: number;
    lastEjTimestamp: string;
  };
  humanSide: {
    loadingSlipRef: string;
    custodianId: string;
    custodianName: string;
    vaultCount: number;
    photoEvidence: string[];
    eodTimestamp: string;
    denominationBreakdown: { denom: number; count: number; total: number }[];
  };
  verdict: {
    recommendation: 'Authorize Refund' | 'Declare Overage' | 'Reject — Successful Transaction' | 'Escalate to Audit';
    confidence: number;
    reasoning: string;
    estimatedRecovery: number;
  };
}

// ═══════════════════════════════════════════════════
// ── MOCK DATA ──
// ═══════════════════════════════════════════════════

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
  recoveryPotential: 3245000,
  autoResolutionRate: 76.6,
  unrecoverablePenaltyLoss: 495000,
};

// ── Bank Dispute Inbox ──
export const bankDisputes: BankDispute[] = [
  { id: 'BD-001', source: 'HDFC Email Batch #412', claimRef: 'HDFC-DSP-2026-04-001', bankName: 'HDFC', claimedAmount: 15000, txnDate: '2026-04-08', receivedAt: '2026-04-12 06:30', autoMapped: true, mappedTerminalId: 'ATM-MUM-0001', mappedEjRef: 'EJ-MUM-0001-20260408-0914', mappingConfidence: 96, status: 'Auto-Mapped', verdictReady: true, customerName: 'Priya Sharma', cardLast4: '4821' },
  { id: 'BD-002', source: 'SBI Zip Upload — April W2', claimRef: 'SBI-DSP-2026-04-034', bankName: 'SBI', claimedAmount: 10000, txnDate: '2026-04-10', receivedAt: '2026-04-12 07:00', autoMapped: true, mappedTerminalId: 'ATM-DEL-0034', mappedEjRef: 'EJ-DEL-0034-20260410-0802', mappingConfidence: 91, status: 'Auto-Mapped', verdictReady: true, customerName: 'Amit Verma', cardLast4: '7210' },
  { id: 'BD-003', source: 'ICICI Email Batch #118', claimRef: 'ICICI-DSP-2026-04-003', bankName: 'ICICI', claimedAmount: 20000, txnDate: '2026-04-07', receivedAt: '2026-04-12 07:15', autoMapped: true, mappedTerminalId: 'ATM-BLR-0112', mappedEjRef: 'EJ-BLR-0112-20260407-0730', mappingConfidence: 88, status: 'Auto-Mapped', verdictReady: true, customerName: 'Deepa Nair', cardLast4: '5430' },
  { id: 'BD-004', source: 'Axis Bank Manual Upload', claimRef: 'AXIS-DSP-2026-04-087', bankName: 'Axis', claimedAmount: 12000, txnDate: '2026-04-09', receivedAt: '2026-04-12 08:00', autoMapped: false, status: 'Orphan — Manual Mapping', verdictReady: false, customerName: 'Rohit Gupta', cardLast4: '3302' },
  { id: 'BD-005', source: 'PNB Zip Upload — April W2', claimRef: 'PNB-DSP-2026-04-056', bankName: 'PNB', claimedAmount: 25000, txnDate: '2026-04-06', receivedAt: '2026-04-12 06:45', autoMapped: true, mappedTerminalId: 'ATM-KOL-0056', mappedEjRef: 'EJ-KOL-0056-20260406-0615', mappingConfidence: 94, status: 'Auto-Mapped', verdictReady: true, customerName: 'Sanjay Das', cardLast4: '3218' },
  { id: 'BD-006', source: 'BOB Email Batch #77', claimRef: 'BOB-DSP-2026-04-019', bankName: 'BOB', claimedAmount: 8500, txnDate: '2026-04-10', receivedAt: '2026-04-12 09:30', autoMapped: false, status: 'Orphan — Manual Mapping', verdictReady: false, customerName: 'Kavita Mehta', cardLast4: '9104' },
  { id: 'BD-007', source: 'HDFC Email Batch #412', claimRef: 'HDFC-DSP-2026-04-006', bankName: 'HDFC', claimedAmount: 8000, txnDate: '2026-04-11', receivedAt: '2026-04-12 06:30', autoMapped: true, mappedTerminalId: 'ATM-HYD-0023', mappedEjRef: 'EJ-HYD-0023-20260411-1105', mappingConfidence: 97, status: 'Auto-Mapped', verdictReady: true, customerName: 'Arjun Reddy', cardLast4: '5672' },
  { id: 'BD-008', source: 'Kotak Email Batch #55', claimRef: 'KOTAK-DSP-2026-04-022', bankName: 'Kotak', claimedAmount: 3500, txnDate: '2026-04-11', receivedAt: '2026-04-12 10:00', autoMapped: false, status: 'Orphan — Manual Mapping', verdictReady: false, customerName: 'Neha Joshi', cardLast4: '6688' },
];

// ── Vault Audit Entries ──
export const vaultAuditEntries: VaultAuditEntry[] = [
  { id: 'VA-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', region: 'West', physicalVaultCount: 2012000, digitalDepositSlip: 2017000, custodianEntry: 2015000, variance: -5000, varianceType: 'Shortage', pilferageRiskScore: 72, custodianId: 'CIT-W-4401', custodianName: 'Rajesh Sharma', auditDate: '2026-04-12', sealStatus: 'Sealed', cllScanMatch: true, loadingSlipUploaded: true, notes: 'Reject bin sealed with 3 notes. AR event at 09:14. FLM ticket silent-closed.' },
  { id: 'VA-002', terminalId: 'ATM-DEL-0034', bank: 'SBI', region: 'North', physicalVaultCount: 3007500, digitalDepositSlip: 3000000, custodianEntry: 3000000, variance: 7500, varianceType: 'Overage', pilferageRiskScore: 15, custodianId: 'CIT-N-2201', custodianName: 'Manish Kumar', auditDate: '2026-04-12', sealStatus: 'Sealed', cllScanMatch: true, loadingSlipUploaded: true, notes: 'Overage from Switch reversal — machine dispensed successfully.' },
  { id: 'VA-003', terminalId: 'ATM-BLR-0112', bank: 'ICICI', region: 'South', physicalVaultCount: 1475000, digitalDepositSlip: 1485000, custodianEntry: 1480000, variance: -10000, varianceType: 'Shortage', pilferageRiskScore: 45, custodianId: 'CIT-S-3301', custodianName: 'Deepak R.', auditDate: '2026-04-12', sealStatus: 'Open', cllScanMatch: false, loadingSlipUploaded: true, notes: 'Reject bin unsealed. CLL scan mismatch — ₹5K discrepancy in ₹500 slot.' },
  { id: 'VA-004', terminalId: 'ATM-JAI-0044', bank: 'SBI', region: 'North', physicalVaultCount: 1185000, digitalDepositSlip: 1200000, custodianEntry: 1195000, variance: -15000, varianceType: 'Shortage', pilferageRiskScore: 88, custodianId: 'CIT-N-4460', custodianName: 'Vikram Meena', auditDate: '2026-04-12', sealStatus: 'Broken', cllScanMatch: false, loadingSlipUploaded: false, notes: 'Seal broken. Loading slip missing. ₹15K short across multiple jams. HIGH RISK.' },
  { id: 'VA-005', terminalId: 'ATM-KOL-0056', bank: 'PNB', region: 'East', physicalVaultCount: 1494500, digitalDepositSlip: 1500000, custodianEntry: 1497000, variance: -5500, varianceType: 'Shortage', pilferageRiskScore: 68, custodianId: 'CIT-E-4455', custodianName: 'Sunil Das', auditDate: '2026-04-12', sealStatus: 'Sealed', cllScanMatch: true, loadingSlipUploaded: true, notes: 'Card retained mid-dispense. ₹5,500 stuck. AR silent-closed.' },
  { id: 'VA-006', terminalId: 'ATM-CHN-0087', bank: 'Axis', region: 'South', physicalVaultCount: 2200000, digitalDepositSlip: 2200000, custodianEntry: 2200000, variance: 0, varianceType: 'Match', pilferageRiskScore: 5, custodianId: 'CIT-S-5501', custodianName: 'Karthik P.', auditDate: '2026-04-12', sealStatus: 'Sealed', cllScanMatch: true, loadingSlipUploaded: true, notes: 'Clean match. Denomination drift detected but totals align.' },
];

// ── Mismatched Ledgers ──
export const mismatchedLedgers: MismatchedLedger[] = [
  { id: 'ML-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', region: 'West', state: 'Maharashtra', bankSwitchAmount: 2500000, ejLogAmount: 2498000, physicalCount: 2495000, variance: -5000, varianceType: 'Shortage', severity: 'High', detectedAt: '2026-04-12 09:30', status: 'Open', autoRecoveryFlag: true, silentClose: true, predictedRecovery: 4200, denominationDrift: '₹500 notes found in ₹100 cassette', transactions: [
    { txnId: 'TXN-88421', timestamp: '09:14:22', bankSwitch: { action: 'Dispense', amount: 2000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 0, status: 'Jam at Exit', errorCode: 'E-4012' }, physicalSlip: { action: 'EOD Count', amount: 2495000, note: 'Reject bin: 1 note stuck' }, variance: 2000, varianceReason: 'Bank says dispensed; Machine jammed.' },
    { txnId: 'TXN-88450', timestamp: '14:08:33', bankSwitch: { action: 'Dispense', amount: 10000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 7000, status: 'Partial — Auto-Recovery', errorCode: 'E-3008' }, physicalSlip: { action: 'EOD Count', amount: 2495000, note: '₹3,000 retracted' }, variance: 3000, varianceReason: 'Auto-Recovery retracted ₹3K but Switch marked full success.' },
  ]},
  { id: 'ML-003', terminalId: 'ATM-BLR-0112', bank: 'ICICI', region: 'South', state: 'Karnataka', bankSwitchAmount: 1800000, ejLogAmount: 1795000, physicalCount: 1790000, variance: -10000, varianceType: 'Shortage', severity: 'Critical', detectedAt: '2026-04-12 07:45', status: 'Escalated', autoRecoveryFlag: false, silentClose: false, predictedRecovery: 8500, transactions: [
    { txnId: 'TXN-65430', timestamp: '07:30:01', bankSwitch: { action: 'Dispense', amount: 20000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 15000, status: 'Host Timeout', errorCode: 'E-5001' }, physicalSlip: { action: 'EOD Count', amount: 1790000, note: '₹10K short' }, variance: 5000, varianceReason: 'Host timeout — EJ logged ₹15K, Switch shows ₹20K.' },
    { txnId: 'TXN-65445', timestamp: '10:15:44', bankSwitch: { action: 'Dispense', amount: 5000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 0, status: 'Offline — Blind Window', errorCode: 'E-6010' }, physicalSlip: { action: 'N/A', amount: 0, note: 'Machine offline' }, variance: 5000, varianceReason: 'Blind Window — ₹5K unverifiable.' },
  ]},
  { id: 'ML-007', terminalId: 'ATM-JAI-0044', bank: 'SBI', region: 'North', state: 'Rajasthan', bankSwitchAmount: 1200000, ejLogAmount: 1188000, physicalCount: 1185000, variance: -15000, varianceType: 'Shortage', severity: 'Critical', detectedAt: '2026-04-12 05:45', status: 'Escalated', autoRecoveryFlag: true, silentClose: false, predictedRecovery: 12000, transactions: [
    { txnId: 'TXN-30112', timestamp: '05:30:00', bankSwitch: { action: 'Dispense', amount: 40000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 25000, status: 'Multiple Jams', errorCode: 'E-4012, E-4015' }, physicalSlip: { action: 'EOD Count', amount: 1185000, note: '₹15K short — reject bin 4 notes' }, variance: 15000, varianceReason: 'Multiple jams: ₹8K reject bin, ₹7K unaccounted.' },
  ]},
  { id: 'ML-005', terminalId: 'ATM-KOL-0056', bank: 'PNB', region: 'East', state: 'West Bengal', bankSwitchAmount: 1500000, ejLogAmount: 1497000, physicalCount: 1494500, variance: -5500, varianceType: 'Shortage', severity: 'High', detectedAt: '2026-04-12 06:30', status: 'Open', autoRecoveryFlag: true, silentClose: true, predictedRecovery: 4800, transactions: [
    { txnId: 'TXN-43218', timestamp: '06:15:08', bankSwitch: { action: 'Dispense', amount: 25000, status: 'Success' }, machineEJ: { action: 'Dispense', amount: 19500, status: 'Card Retained', errorCode: 'E-7003' }, physicalSlip: { action: 'EOD Count', amount: 1494500, note: 'Card in reader tray' }, variance: 5500, varianceReason: 'Card retained — ₹5,500 stuck between shutter and presenter.' },
  ]},
];

// ── Pending Claims with System Verdicts ──
export const pendingClaims: PendingClaim[] = [
  { id: 'PC-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', claimId: 'CLM-2026-04-001', customerRef: 'CUST-88421', claimedAmount: 15000, txnDate: '2026-04-08', claimFiledAt: '2026-04-08 14:30', errorDesc: 'Customer claims ₹15,000 not dispensed — BNA jam', daysElapsed: 4, penaltyPerDay: 100, accruedPenalty: 200, status: 'EJ Mismatch', ejMatch: false, bankSwitch: { action: 'Dispense ₹15,000', amount: 15000, status: 'Success' }, machineEJ: { action: 'Dispense ₹15,000', amount: 0, status: 'Jam at Exit', errorCode: 'E-4012' }, physicalSlip: { action: 'EOD Count', amount: 2495000, note: 'Reject bin: 3 notes' }, systemVerdict: 'Refund Customer', verdictReason: 'Machine Truth (EJ) confirms jam — overrides Switch "Success." Customer did not receive cash.' },
  { id: 'PC-002', terminalId: 'ATM-DEL-0034', bank: 'SBI', claimId: 'CLM-2026-04-002', customerRef: 'CUST-77210', claimedAmount: 10000, txnDate: '2026-04-10', claimFiledAt: '2026-04-10 09:15', errorDesc: 'Partial dispense — ₹5,000 of ₹10,000', daysElapsed: 2, penaltyPerDay: 100, accruedPenalty: 0, status: 'Pending Verification', ejMatch: true, bankSwitch: { action: 'Dispense ₹10,000', amount: 10000, status: 'Success' }, machineEJ: { action: 'Dispense ₹10,000', amount: 5000, status: 'Partial — Retracted ₹5K' }, physicalSlip: { action: 'EOD Count', amount: 3007500, note: 'Extra ₹5K in cassette' }, systemVerdict: 'Refund ₹5,000', verdictReason: 'EJ confirms partial dispense. ₹5K retracted to cassette — matches physical overage.' },
  { id: 'PC-003', terminalId: 'ATM-BLR-0112', bank: 'ICICI', claimId: 'CLM-2026-04-003', customerRef: 'CUST-65430', claimedAmount: 20000, txnDate: '2026-04-07', claimFiledAt: '2026-04-07 18:00', errorDesc: 'Account debited, no cash — host timeout', daysElapsed: 5, penaltyPerDay: 100, accruedPenalty: 500, status: 'Awaiting Physical', ejMatch: false, bankSwitch: { action: 'Dispense ₹20,000', amount: 20000, status: 'Timeout — Marked Success' }, machineEJ: { action: 'Dispense ₹20,000', amount: 0, status: 'Host Timeout — No Dispense', errorCode: 'E-5001' }, physicalSlip: { action: 'EOD Count', amount: 1790000, note: 'Custodian confirms no dispense' }, systemVerdict: 'Refund Customer', verdictReason: 'EJ: No dispense. Physical: Cash intact. Switch timeout created false "Success." Full refund recommended.' },
  { id: 'PC-004', terminalId: 'ATM-CHN-0087', bank: 'Axis', claimId: 'CLM-2026-04-004', customerRef: 'CUST-91023', claimedAmount: 5000, txnDate: '2026-04-11', claimFiledAt: '2026-04-11 11:00', errorDesc: 'Wrong denomination dispensed', daysElapsed: 1, penaltyPerDay: 100, accruedPenalty: 0, status: 'EJ Matched', ejMatch: true, resolution: 'Denomination mismatch confirmed', bankSwitch: { action: 'Dispense ₹5,000', amount: 5000, status: 'Success' }, machineEJ: { action: 'Dispense ₹5,000', amount: 5000, status: 'Success — Wrong Denom' }, physicalSlip: { action: 'Customer Report', amount: 5000, note: '₹200 notes instead of ₹500' }, systemVerdict: 'Reject — Successful Transaction', verdictReason: 'Cash dispensed in full. Denomination mismatch is not a shortage — service issue, not financial.' },
  { id: 'PC-005', terminalId: 'ATM-KOL-0056', bank: 'PNB', claimId: 'CLM-2026-04-005', customerRef: 'CUST-43218', claimedAmount: 25000, txnDate: '2026-04-06', claimFiledAt: '2026-04-06 16:45', errorDesc: 'Card retained, no dispense', daysElapsed: 6, penaltyPerDay: 100, accruedPenalty: 100, status: 'EJ Mismatch', ejMatch: false, bankSwitch: { action: 'Dispense ₹25,000', amount: 25000, status: 'Success' }, machineEJ: { action: 'Dispense ₹25,000', amount: 0, status: 'Card Retained — Abort', errorCode: 'E-7003' }, physicalSlip: { action: 'EOD Count', amount: 1494500, note: 'Card in reader. No dispense.' }, systemVerdict: 'Refund Customer', verdictReason: 'EJ: Card retained, dispense aborted. Cash intact in machine. Full refund required.' },
  { id: 'PC-006', terminalId: 'ATM-HYD-0023', bank: 'HDFC', claimId: 'CLM-2026-04-006', customerRef: 'CUST-55672', claimedAmount: 8000, txnDate: '2026-04-11', claimFiledAt: '2026-04-12 08:00', errorDesc: 'Short dispense — ₹6K of ₹8K', daysElapsed: 1, penaltyPerDay: 100, accruedPenalty: 0, status: 'Pending Verification', ejMatch: true, bankSwitch: { action: 'Dispense ₹8,000', amount: 8000, status: 'Success' }, machineEJ: { action: 'Dispense ₹8,000', amount: 6000, status: 'Partial — ₹2K Retracted' }, physicalSlip: { action: 'EOD Count', amount: 2803000, note: '₹2K in reject tray' }, systemVerdict: 'Refund ₹2,000', verdictReason: 'EJ confirms partial. ₹2K retracted — matches reject tray. Refund partial amount only.' },
];

// ── Harmonizing Penalties ──
export const harmonizingPenalties: HarmonizingPenalty[] = [
  { id: 'HP-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', overageAmount: 2000, detectedAt: '2026-04-12 09:14', eodDeadline: '2026-04-12 18:00', eodsPassed: 0, declarationDelay: '8h 46m', penaltyAmount: 0, penaltyFormula: '0 EODs × ₹500/EOD = ₹0 (Grace window)', dailyBackdatedPenalty: 500, citAgent: 'Rajesh Sharma', status: 'Pending Declaration', autoRecovery: true, flmSilentClose: true, ejOverageDetected: true, physicalVaultReported: false },
  { id: 'HP-002', terminalId: 'ATM-KOL-0056', bank: 'PNB', overageAmount: 5500, detectedAt: '2026-04-11 14:00', eodDeadline: '2026-04-11 18:00', eodsPassed: 2, declarationDelay: '28h+', penaltyAmount: 2500, penaltyFormula: '2 EODs × ₹1,250/EOD = ₹2,500', dailyBackdatedPenalty: 1250, citAgent: 'Sunil Das', status: 'Penalty Applied', autoRecovery: true, flmSilentClose: true, ejOverageDetected: true, physicalVaultReported: false },
  { id: 'HP-003', terminalId: 'ATM-JAI-0044', bank: 'SBI', overageAmount: 3000, detectedAt: '2026-04-12 05:45', eodDeadline: '2026-04-12 18:00', eodsPassed: 1, declarationDelay: '12h 15m', penaltyAmount: 750, penaltyFormula: '1 EOD × ₹750/EOD = ₹750', dailyBackdatedPenalty: 750, citAgent: 'Vikram Meena', status: 'Declared Late', autoRecovery: true, flmSilentClose: false, ejOverageDetected: true, physicalVaultReported: true },
  { id: 'HP-004', terminalId: 'ATM-BLR-0112', bank: 'ICICI', overageAmount: 4000, detectedAt: '2026-04-11 22:00', eodDeadline: '2026-04-12 18:00', eodsPassed: 1, declarationDelay: '20h+', penaltyAmount: 1200, penaltyFormula: '1 EOD × ₹1,200/EOD = ₹1,200', dailyBackdatedPenalty: 1200, citAgent: 'Karthik Nair', status: 'Under Review', autoRecovery: false, flmSilentClose: false, ejOverageDetected: true, physicalVaultReported: false },
];

// ── Auto-Recovery Silent Match Cases ──
export const autoRecoverySilentMatches: AutoRecoverySilentMatch[] = [
  { id: 'AR-001', terminalId: 'ATM-MUM-0001', bank: 'HDFC', region: 'West', arTimestamp: '2026-04-12 09:14', suspectedOverage: 3000, declaredOverage: 0, delta: 3000, flmTicketStatus: 'Silent Closed', pilferageFlag: true, auditROI: 3000, ejSnippet: '[09:14:22] E-4012 JAM_EXIT_SHUTTER\n[09:14:23] AUTO_RECOVERY INITIATED\n[09:14:25] NOTES_RETRACTED: 6x₹500\n[09:14:26] RECOVERY_COMPLETE\n[09:14:30] FLM_TICKET: T-4401 OPENED\n[09:15:01] FLM_TICKET: T-4401 CLOSED (No Action)' },
  { id: 'AR-002', terminalId: 'ATM-KOL-0056', bank: 'PNB', region: 'East', arTimestamp: '2026-04-12 06:15', suspectedOverage: 5500, declaredOverage: 2000, delta: 3500, flmTicketStatus: 'Silent Closed', pilferageFlag: true, auditROI: 3500, ejSnippet: '[06:15:08] E-7003 CARD_RETAINED\n[06:15:10] AUTO_RECOVERY INITIATED\n[06:15:12] NOTES_RETRACTED: 11x₹500\n[06:15:14] RECOVERY_COMPLETE\n[06:15:20] FLM_TICKET: T-4455 OPENED\n[06:16:05] FLM_TICKET: T-4455 CLOSED (Declared ₹2,000 only)' },
  { id: 'AR-003', terminalId: 'ATM-JAI-0044', bank: 'SBI', region: 'North', arTimestamp: '2026-04-12 05:30', suspectedOverage: 8000, declaredOverage: 8000, delta: 0, flmTicketStatus: 'Resolved', pilferageFlag: false, auditROI: 0, ejSnippet: '[05:30:00] E-4012 TRANSPORT_JAM\n[05:30:02] AUTO_RECOVERY INITIATED\n[05:30:05] NOTES_RETRACTED: 16x₹500\n[05:30:07] RECOVERY_COMPLETE\n[05:30:15] FLM_TICKET: T-4460 OPENED\n[05:32:00] FLM_TICKET: T-4460 RESOLVED (Declared ₹8,000)' },
  { id: 'AR-004', terminalId: 'ATM-AMD-0019', bank: 'Kotak', region: 'West', arTimestamp: '2026-04-12 08:45', suspectedOverage: 1500, declaredOverage: 0, delta: 1500, flmTicketStatus: 'Pending', pilferageFlag: true, auditROI: 1500, ejSnippet: '[08:45:12] E-3008 PARTIAL_DISPENSE\n[08:45:14] AUTO_RECOVERY INITIATED\n[08:45:16] NOTES_RETRACTED: 3x₹500\n[08:45:18] RECOVERY_COMPLETE\n[08:45:25] FLM_TICKET: T-4470 OPENED\n[STATUS: PENDING — No update in 12h]' },
];

// ── 3-Way Reconciliation (3-Pane) ──
export const threeWayRecons: Record<string, ThreeWayRecon> = {
  'ATM-MUM-0001': {
    terminalId: 'ATM-MUM-0001', date: '2026-04-12',
    bankSide: { claimAmount: 15000, switchApprovalCode: 'APR-884210412', disputeTableRef: 'HDFC-DSP-2026-04-001', bankContactEmail: 'disputes@hdfc.co.in', claimNarrative: 'Customer Priya Sharma (Card ****4821) claims ₹15,000 not received during withdrawal at 09:14. Account debited. Bank Switch shows "Dispense Success."' },
    machineSide: { ejLogSegment: '[09:14:22] TXN_START: WDL ₹15,000 | Card ****4821\n[09:14:23] CASSETTE_SELECT: Slot-1 (₹500)\n[09:14:24] NOTES_COUNTED: 30x₹500 = ₹15,000\n[09:14:25] TRANSPORT_TO_EXIT: INITIATED\n[09:14:26] E-4012 JAM_EXIT_SHUTTER — Notes stuck\n[09:14:27] DISPENSE_FAIL: 0 notes delivered\n[09:14:28] AUTO_RECOVERY INITIATED\n[09:14:30] NOTES_RETRACTED: 28x₹500 = ₹14,000\n[09:14:31] NOTES_IN_REJECT: 2x₹500 = ₹1,000\n[09:14:32] RECOVERY_COMPLETE\n[09:14:35] FLM_TICKET: T-4401 OPENED\n[09:15:01] FLM_TICKET: T-4401 CLOSED (No Action)', sensorTriggers: ['Exit Shutter Jam Sensor', 'Transport Belt Slip', 'Reject Bin Counter +2'], autoRecoveryStatus: 'Complete — 28 notes retracted, 2 in reject bin', rejectBinStatus: 'Sealed', rejectBinNotes: 2, lastEjTimestamp: '2026-04-12 09:15:01' },
    humanSide: { loadingSlipRef: 'LS-MUM-0001-20260412', custodianId: 'CIT-W-4401', custodianName: 'Rajesh Sharma', vaultCount: 2012000, photoEvidence: ['loading-slip-front.jpg', 'reject-bin-sealed.jpg', 'counter-camera-0914.jpg'], eodTimestamp: '2026-04-12 18:05:00', denominationBreakdown: [{ denom: 2000, count: 400, total: 800000 }, { denom: 500, count: 1624, total: 812000 }, { denom: 200, count: 1000, total: 200000 }, { denom: 100, count: 2000, total: 200000 }] },
    verdict: { recommendation: 'Authorize Refund', confidence: 94, reasoning: 'EJ confirms complete dispense failure — jam at exit shutter. 30 notes counted but 0 delivered. Auto-recovery retracted 28, 2 in sealed reject bin. Physical vault count is ₹15,000 above expected post-dispense. Customer did not receive cash. Full refund of ₹15,000 authorized.', estimatedRecovery: 15000 },
  },
  'ATM-BLR-0112': {
    terminalId: 'ATM-BLR-0112', date: '2026-04-12',
    bankSide: { claimAmount: 20000, switchApprovalCode: 'APR-654300407', disputeTableRef: 'ICICI-DSP-2026-04-003', bankContactEmail: 'disputes@icici.co.in', claimNarrative: 'Customer Deepa Nair (Card ****5430) claims ₹20,000 not received. Host timeout during processing. Account debited ₹20,000.' },
    machineSide: { ejLogSegment: '[07:30:01] TXN_START: WDL ₹20,000 | Card ****5430\n[07:30:02] CASSETTE_SELECT: Slot-1 (₹500)\n[07:30:03] HOST_COMM: TIMEOUT at 30s\n[07:30:04] E-5001 HOST_TIMEOUT\n[07:30:05] DISPENSE_ABORT: No notes moved\n[07:30:06] TXN_ROLLBACK: Balance unchanged\n[07:30:10] SWITCH_STATUS: "Success" (stale ack)', sensorTriggers: ['Host Communication Timeout', 'No Transport Activity', 'No Exit Sensor Trigger'], autoRecoveryStatus: 'N/A — No notes moved', rejectBinStatus: 'Sealed', rejectBinNotes: 0, lastEjTimestamp: '2026-04-12 07:30:10' },
    humanSide: { loadingSlipRef: 'LS-BLR-0112-20260412', custodianId: 'CIT-S-3301', custodianName: 'Deepak R.', vaultCount: 1475000, photoEvidence: ['loading-slip-front.jpg', 'counter-camera-0730.jpg'], eodTimestamp: '2026-04-12 18:10:00', denominationBreakdown: [{ denom: 2000, count: 300, total: 600000 }, { denom: 500, count: 1350, total: 675000 }, { denom: 200, count: 500, total: 100000 }, { denom: 100, count: 1000, total: 100000 }] },
    verdict: { recommendation: 'Authorize Refund', confidence: 97, reasoning: 'EJ: Host timeout at 30s, dispense aborted. Zero notes moved — no transport or exit sensor activity. Switch "Success" is a stale acknowledgment from pre-timeout. Physical vault confirms cash intact. Full refund of ₹20,000 authorized with high confidence.', estimatedRecovery: 20000 },
  },
  'ATM-KOL-0056': {
    terminalId: 'ATM-KOL-0056', date: '2026-04-12',
    bankSide: { claimAmount: 25000, switchApprovalCode: 'APR-432180406', disputeTableRef: 'PNB-DSP-2026-04-056', bankContactEmail: 'disputes@pnb.co.in', claimNarrative: 'Customer Sanjay Das (Card ****3218) claims ₹25,000 not received. Card retained by machine. No cash dispensed.' },
    machineSide: { ejLogSegment: '[06:15:08] TXN_START: WDL ₹25,000 | Card ****3218\n[06:15:09] CARD_READ: OK\n[06:15:10] E-7003 CARD_RETAINED — Magnetic stripe read failure\n[06:15:11] DISPENSE_ABORT: Card in reader tray\n[06:15:12] AUTO_RECOVERY INITIATED\n[06:15:14] NOTES_RETRACTED: 11x₹500 (pre-staged)\n[06:15:16] RECOVERY_COMPLETE\n[06:15:20] FLM_TICKET: T-4455 OPENED', sensorTriggers: ['Card Reader Jam', 'Magnetic Stripe Failure', 'Pre-staged Notes Retracted'], autoRecoveryStatus: 'Complete — 11 pre-staged notes retracted', rejectBinStatus: 'Sealed', rejectBinNotes: 0, lastEjTimestamp: '2026-04-12 06:16:05' },
    humanSide: { loadingSlipRef: 'LS-KOL-0056-20260412', custodianId: 'CIT-E-4455', custodianName: 'Sunil Das', vaultCount: 1494500, photoEvidence: ['loading-slip-front.jpg', 'card-in-reader.jpg'], eodTimestamp: '2026-04-12 18:15:00', denominationBreakdown: [{ denom: 500, count: 2989, total: 1494500 }] },
    verdict: { recommendation: 'Authorize Refund', confidence: 92, reasoning: 'Card retained due to magnetic stripe failure. EJ confirms dispense aborted — pre-staged notes retracted via auto-recovery. However, FLM ticket declared only ₹2,000 vs ₹5,500 suspected. Delta of ₹3,500 flagged for pilferage investigation. Refund customer but escalate custodian audit.', estimatedRecovery: 25000 },
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
