// CMS Infosystems Demo — Mock Data

export interface BankEntry {
  id: string;
  date: string;
  reference: string;
  amount: number;
  narration: string;
}

export interface ERPEntry {
  id: string;
  invoiceId: string;
  client: string;
  amount: number;
  date: string;
  status: string;
}

export interface CashEntry {
  id: string;
  atmId: string;
  date: string;
  dispensed: number;
  deposited: number;
}

export interface MatchGroup {
  id: string;
  type: 'exact' | 'one-to-many' | 'partial';
  bankRefs: string[];
  erpRefs: string[];
  confidence: 'High' | 'Medium' | 'Low';
  reason: string;
  status: 'auto-matched' | 'pending-review' | 'exception';
  amount: number;
}

export interface ExceptionItem {
  id: string;
  matchGroupId: string;
  type: string;
  description: string;
  agentSuggestion: string;
  amount: number;
  status: 'open' | 'resolved' | 'rejected';
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: 'Agent' | 'User';
  action: string;
  detail: string;
}

export interface OrderBookEntry {
  id: string;
  bank: string;
  environment: string;
  status: 'Pending' | 'Testing' | 'Completed' | 'Failed';
  lastActivity: string;
  testsRun: number;
  failures: number;
}

export interface FleetEntry {
  id: string;
  runId: string;
  vehicle: string;
  cluster: string;
  status: 'On Route' | 'Idle' | 'Maintenance' | 'Delayed';
  lastActivity: string;
  agentAction: string;
  savings?: string;
}

// Bank Statement Data
export const bankEntries: BankEntry[] = [
  { id: 'b1', date: '15-Jan-25', reference: 'CMS/BANK/001', amount: 1250000, narration: 'CIT collection' },
  { id: 'b2', date: '16-Jan-25', reference: 'CMS/INV/101', amount: 280000, narration: 'Part payment' },
  { id: 'b3', date: '17-Jan-25', reference: 'CMS/INV/102', amount: 120000, narration: '–' },
  { id: 'b4', date: '18-Jan-25', reference: 'CMS/MISC', amount: 45000, narration: 'Fee adjustment' },
  { id: 'b5', date: '19-Jan-25', reference: 'CMS/BANK/002', amount: 875000, narration: 'ATM replenishment' },
  { id: 'b6', date: '20-Jan-25', reference: 'CMS/ADJ/001', amount: 32000, narration: 'Adjustment entry' },
  { id: 'b7', date: '21-Jan-25', reference: 'CMS/CIT/045', amount: 560000, narration: 'CIT service fee' },
];

// ERP Ledger Data
export const erpEntries: ERPEntry[] = [
  { id: 'e1', invoiceId: 'INV-101', client: 'Bank PSU A', amount: 280000, date: '14-Jan-25', status: 'Open' },
  { id: 'e2', invoiceId: 'INV-102', client: 'Bank PSU A', amount: 120000, date: '14-Jan-25', status: 'Open' },
  { id: 'e3', invoiceId: 'INV-103', client: 'Bank PSU B', amount: 1250000, date: '15-Jan-25', status: 'Open' },
  { id: 'e4', invoiceId: 'FEE-01', client: 'Bank PSU A', amount: 45000, date: '18-Jan-25', status: 'Open' },
  { id: 'e5', invoiceId: 'INV-104', client: 'Bank PSU C', amount: 875000, date: '19-Jan-25', status: 'Open' },
  { id: 'e6', invoiceId: 'INV-105', client: 'Bank PSU B', amount: 560000, date: '21-Jan-25', status: 'Open' },
  { id: 'e7', invoiceId: 'ADJ-01', client: 'Bank PSU A', amount: 37000, date: '20-Jan-25', status: 'Open' },
];

// Cash Movement Data
export const cashEntries: CashEntry[] = [
  { id: 'c1', atmId: 'ATM-MUM-001', date: '15-Jan-25', dispensed: 850000, deposited: 400000 },
  { id: 'c2', atmId: 'ATM-MUM-002', date: '16-Jan-25', dispensed: 620000, deposited: 280000 },
  { id: 'c3', atmId: 'ATM-DEL-001', date: '17-Jan-25', dispensed: 430000, deposited: 120000 },
  { id: 'c4', atmId: 'ATM-BLR-001', date: '18-Jan-25', dispensed: 290000, deposited: 45000 },
  { id: 'c5', atmId: 'ATM-MUM-003', date: '19-Jan-25', dispensed: 750000, deposited: 125000 },
];

// Match Groups
export const matchGroups: MatchGroup[] = [
  {
    id: 'mg1',
    type: 'exact',
    bankRefs: ['CMS/BANK/001'],
    erpRefs: ['INV-103'],
    confidence: 'High',
    reason: 'Reference + amount exact match (₹12,50,000)',
    status: 'auto-matched',
    amount: 1250000,
  },
  {
    id: 'mg2',
    type: 'one-to-many',
    bankRefs: ['CMS/INV/101', 'CMS/INV/102'],
    erpRefs: ['INV-101', 'INV-102'],
    confidence: 'High',
    reason: 'One-to-many: 2 bank credits → 2 invoices (₹2,80,000 + ₹1,20,000)',
    status: 'auto-matched',
    amount: 400000,
  },
  {
    id: 'mg3',
    type: 'exact',
    bankRefs: ['CMS/MISC'],
    erpRefs: ['FEE-01'],
    confidence: 'High',
    reason: 'Amount + date match (₹45,000)',
    status: 'auto-matched',
    amount: 45000,
  },
  {
    id: 'mg4',
    type: 'exact',
    bankRefs: ['CMS/BANK/002'],
    erpRefs: ['INV-104'],
    confidence: 'High',
    reason: 'Amount match – ATM replenishment (₹8,75,000)',
    status: 'auto-matched',
    amount: 875000,
  },
  {
    id: 'mg5',
    type: 'exact',
    bankRefs: ['CMS/CIT/045'],
    erpRefs: ['INV-105'],
    confidence: 'Medium',
    reason: 'Amount match (₹5,60,000); reference partial – CIT narration vs invoice',
    status: 'pending-review',
    amount: 560000,
  },
  {
    id: 'mg6',
    type: 'partial',
    bankRefs: ['CMS/ADJ/001'],
    erpRefs: ['ADJ-01'],
    confidence: 'Low',
    reason: 'Amount mismatch: Bank ₹32,000 vs ERP ₹37,000 — variance ₹5,000',
    status: 'exception',
    amount: 32000,
  },
];

// Exceptions
export const initialExceptions: ExceptionItem[] = [
  {
    id: 'ex1',
    matchGroupId: 'mg5',
    type: 'Partial reference match',
    description: 'CIT/045 narration matches INV-105 by amount but reference differs.',
    agentSuggestion: 'Approve match – CIT service fee to INV-105. Narration aligns with CIT collection scope.',
    amount: 560000,
    status: 'open',
  },
  {
    id: 'ex2',
    matchGroupId: 'mg6',
    type: 'Amount discrepancy',
    description: 'Bank entry ₹32,000 vs ERP ADJ-01 ₹37,000. Variance: ₹5,000.',
    agentSuggestion: 'Code variance as rounding/fee adjustment. Match ₹32,000 to ADJ-01; flag ₹5,000 for investigation.',
    amount: 5000,
    status: 'open',
  },
  {
    id: 'ex3',
    matchGroupId: '',
    type: 'Unmatched cash movement',
    description: 'ATM-BLR-001 deposit ₹45,000 on 18-Jan matches FEE-01 amount but already matched to bank.',
    agentSuggestion: 'No action needed – cash deposit corresponds to fee already reconciled via bank statement.',
    amount: 45000,
    status: 'open',
  },
];

// Audit Trail
export const initialAuditTrail: AuditEntry[] = [
  { id: 'a1', timestamp: '26-Feb-26 10:00', actor: 'Agent', action: 'Matched', detail: 'INV-103 ↔ Bank ref CMS/BANK/001 — ₹12,50,000. Exact reference + amount match.' },
  { id: 'a2', timestamp: '26-Feb-26 10:00', actor: 'Agent', action: 'Matched', detail: 'INV-101 + INV-102 ↔ Bank refs CMS/INV/101 + CMS/INV/102 — ₹4,00,000. One-to-many split.' },
  { id: 'a3', timestamp: '26-Feb-26 10:00', actor: 'Agent', action: 'Matched', detail: 'FEE-01 ↔ Bank ref CMS/MISC — ₹45,000. Amount + date match.' },
  { id: 'a4', timestamp: '26-Feb-26 10:01', actor: 'Agent', action: 'Matched', detail: 'INV-104 ↔ Bank ref CMS/BANK/002 — ₹8,75,000. Amount match.' },
  { id: 'a5', timestamp: '26-Feb-26 10:01', actor: 'Agent', action: 'Flagged', detail: 'Exception #1 – CIT/045 partial reference match to INV-105. Suggested: approve match.' },
  { id: 'a6', timestamp: '26-Feb-26 10:01', actor: 'Agent', action: 'Flagged', detail: 'Exception #2 – Amount discrepancy ₹5,000 on ADJ-01. Suggested: code as rounding adjustment.' },
  { id: 'a7', timestamp: '26-Feb-26 10:02', actor: 'Agent', action: 'Flagged', detail: 'Exception #3 – Unmatched ATM-BLR-001 cash deposit. Suggested: no action (already reconciled).' },
];

// Metrics
export const metricsData = {
  before: { matchRate: 62, exceptions: 127, timeToClose: '6 days', manualTouchPoints: 380 },
  after: { matchRate: 94, exceptions: 8, timeToClose: '4 hours', manualTouchPoints: 12 },
};

// Order Book Data
export const orderBookEntries: OrderBookEntry[] = [
  { id: 'ob1', bank: 'PSU Bank A (SBI)', environment: 'UAT', status: 'Testing', lastActivity: 'Agent ran 47 tests – 2 failures', testsRun: 47, failures: 2 },
  { id: 'ob2', bank: 'PSU Bank B (PNB)', environment: 'Production', status: 'Completed', lastActivity: 'All 63 tests passed – deployed', testsRun: 63, failures: 0 },
  { id: 'ob3', bank: 'PSU Bank C (BOB)', environment: 'Staging', status: 'Pending', lastActivity: 'Agent mapping API endpoints – 40% complete', testsRun: 0, failures: 0 },
  { id: 'ob4', bank: 'Private Bank D (ICICI)', environment: 'UAT', status: 'Testing', lastActivity: 'Agent ran 112 tests – 5 failures', testsRun: 112, failures: 5 },
  { id: 'ob5', bank: 'PSU Bank E (Canara)', environment: 'Staging', status: 'Pending', lastActivity: 'Awaiting API documentation from bank', testsRun: 0, failures: 0 },
];

// Fleet / Route & Dispatch Data
export const fleetEntries: FleetEntry[] = [
  { id: 'f1', runId: 'R-104', vehicle: 'Van 12', cluster: 'Mumbai North – ATM Cluster 7', status: 'On Route', lastActivity: 'Agent re-routed – traffic alert on Western Express Highway', agentAction: 'Re-route approved', savings: '18 min saved' },
  { id: 'f2', runId: 'R-108', vehicle: 'Van 45', cluster: 'Delhi South – Vault Run', status: 'Maintenance', lastActivity: 'Agent flagged for maintenance – brake wear in 3 days', agentAction: 'Schedule maintenance' },
  { id: 'f3', runId: 'R-112', vehicle: 'Van 07', cluster: 'Bangalore East – ATM Cluster 3', status: 'On Route', lastActivity: 'Agent optimized route – 12% fuel saved (4 stops reordered)', agentAction: 'Route optimized', savings: '12% fuel saved' },
  { id: 'f4', runId: 'R-115', vehicle: 'Van 23', cluster: 'Mumbai South – CIT Run', status: 'Delayed', lastActivity: 'SLA at risk for Cluster 12 – Van delayed 25 min', agentAction: 'Re-dispatch nearby asset' },
  { id: 'f5', runId: 'R-119', vehicle: 'Van 31', cluster: 'Chennai Central – ATM Cluster 5', status: 'On Route', lastActivity: 'Agent balanced workload – 2 stops reassigned from Van 32', agentAction: 'Workload balanced', savings: 'OT reduced 1.5 hrs' },
  { id: 'f6', runId: 'R-122', vehicle: 'Van 08', cluster: 'Pune West – ATM Cluster 9', status: 'Idle', lastActivity: 'Awaiting next dispatch – available for re-assignment', agentAction: 'Available' },
];

// Format currency
export const formatINR = (amount: number): string => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};
