// CMS Unified ATM Data Lake — Mock Data & Types

export interface ATMProfile {
  terminalId: string;
  bank: string;
  region: string;
  state: string;
  hub: string;
  atmType: 'Recycler' | 'Standard';
  status: 'Online' | 'Offline' | 'Maintenance';
  lastSync: string;
  dataCompleteness: number; // 0-100
}

export interface EJLogEntry {
  id: string;
  terminalId: string;
  ticketId: string;
  timestamp: string;
  type: 'Transaction' | 'Error' | 'AutoRecovery' | 'Maintenance';
  errorCode?: string;
  errorDesc?: string;
  amount?: number;
  status: 'Success' | 'Failed' | 'Reversed' | 'Disputed';
}

export interface CashOperation {
  id: string;
  terminalId: string;
  indentNumber: string;
  indentAmount: number;
  revisionType: 'Fresh' | 'Top-Up' | 'Swap';
  citAgent: string;
  indentStatus: 'Completed' | 'LoadingNotDone' | 'NO ACTIVITY' | 'Pending';
  cllUpload: 'Uploaded' | 'Pending' | 'Failed';
  timestamp: string;
}

export interface TimelineEvent {
  id: string;
  terminalId: string;
  timestamp: string;
  type: 'indent_created' | 'cash_loaded' | 'ej_log' | 'auto_recovery' | 'physical_eod' | 'overage_flag' | 'reject_bin';
  title: string;
  detail: string;
  severity: 'info' | 'warning' | 'critical';
  linkedEntities?: string[];
}

export interface OverageEvent {
  id: string;
  terminalId: string;
  detectedAt: string;
  declaredAt?: string;
  amount: number;
  withinEOD: boolean;
  penaltyApplicable: boolean;
  status: 'Reported' | 'Unreported' | 'Under Review';
}

export interface RejectBinStatus {
  terminalId: string;
  binType: 'Sealed' | 'Open';
  lastChecked: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  cassetteSeal?: string;
}

export interface DigitalEvidence {
  id: string;
  terminalId: string;
  type: 'MSP Log' | 'EJ File' | 'Counter JPEG' | 'EOD Report';
  filename: string;
  uploadedAt: string;
  size: string;
}

export interface DataHealthMetric {
  label: string;
  value: number;
  total: number;
  pct: number;
}

// ── Mock ATM Profiles ──
export const atmProfiles: ATMProfile[] = [
  { terminalId: 'ATM-MUM-0001', bank: 'HDFC', region: 'West', state: 'Maharashtra', hub: 'Mumbai Central', atmType: 'Recycler', status: 'Online', lastSync: '2026-04-12 09:45', dataCompleteness: 98 },
  { terminalId: 'ATM-MUM-0002', bank: 'HDFC', region: 'West', state: 'Maharashtra', hub: 'Andheri', atmType: 'Standard', status: 'Online', lastSync: '2026-04-12 09:42', dataCompleteness: 95 },
  { terminalId: 'ATM-DEL-0101', bank: 'SBI', region: 'North', state: 'Delhi', hub: 'Connaught Place', atmType: 'Recycler', status: 'Online', lastSync: '2026-04-12 09:40', dataCompleteness: 92 },
  { terminalId: 'ATM-DEL-0102', bank: 'SBI', region: 'North', state: 'Delhi', hub: 'Dwarka', atmType: 'Standard', status: 'Maintenance', lastSync: '2026-04-12 08:15', dataCompleteness: 78 },
  { terminalId: 'ATM-BLR-0201', bank: 'ICICI', region: 'South', state: 'Karnataka', hub: 'MG Road', atmType: 'Recycler', status: 'Online', lastSync: '2026-04-12 09:44', dataCompleteness: 97 },
  { terminalId: 'ATM-BLR-0202', bank: 'ICICI', region: 'South', state: 'Karnataka', hub: 'Whitefield', atmType: 'Standard', status: 'Offline', lastSync: '2026-04-11 23:30', dataCompleteness: 64 },
  { terminalId: 'ATM-CHN-0301', bank: 'Axis', region: 'South', state: 'Tamil Nadu', hub: 'T. Nagar', atmType: 'Standard', status: 'Online', lastSync: '2026-04-12 09:38', dataCompleteness: 91 },
  { terminalId: 'ATM-KOL-0401', bank: 'PNB', region: 'East', state: 'West Bengal', hub: 'Park Street', atmType: 'Standard', status: 'Online', lastSync: '2026-04-12 09:35', dataCompleteness: 88 },
  { terminalId: 'ATM-HYD-0501', bank: 'HDFC', region: 'South', state: 'Telangana', hub: 'Banjara Hills', atmType: 'Recycler', status: 'Online', lastSync: '2026-04-12 09:43', dataCompleteness: 96 },
  { terminalId: 'ATM-JAI-0601', bank: 'SBI', region: 'North', state: 'Rajasthan', hub: 'MI Road', atmType: 'Standard', status: 'Online', lastSync: '2026-04-12 09:30', dataCompleteness: 85 },
];

// ── Mock EJ Logs ──
export const ejLogs: EJLogEntry[] = [
  { id: 'EJ-001', terminalId: 'ATM-MUM-0001', ticketId: 'CMS-02435507', timestamp: '2026-04-12 09:12:34', type: 'Error', errorCode: 'BNA-TJ01', errorDesc: 'BNA ERROR - TRANSPORT JAM', status: 'Failed' },
  { id: 'EJ-002', terminalId: 'ATM-MUM-0001', ticketId: 'CMS-02435508', timestamp: '2026-04-12 09:14:01', type: 'AutoRecovery', errorDesc: 'Auto-recovery after BNA jam — FLM auto-close', status: 'Reversed' },
  { id: 'EJ-003', terminalId: 'ATM-MUM-0001', ticketId: 'CMS-02435510', timestamp: '2026-04-12 09:22:15', type: 'Transaction', amount: 10000, status: 'Success' },
  { id: 'EJ-004', terminalId: 'ATM-DEL-0101', ticketId: 'CMS-02435520', timestamp: '2026-04-12 08:45:22', type: 'Error', errorCode: 'HTX-TO01', errorDesc: 'HOST TX TIMEOUT', status: 'Failed' },
  { id: 'EJ-005', terminalId: 'ATM-DEL-0101', ticketId: 'CMS-02435521', timestamp: '2026-04-12 08:50:10', type: 'Transaction', amount: 20000, status: 'Success' },
  { id: 'EJ-006', terminalId: 'ATM-BLR-0201', ticketId: 'CMS-02435530', timestamp: '2026-04-12 09:05:00', type: 'Transaction', amount: 5000, status: 'Success' },
  { id: 'EJ-007', terminalId: 'ATM-BLR-0202', ticketId: 'CMS-02435531', timestamp: '2026-04-11 22:30:00', type: 'Error', errorCode: 'CDM-CS01', errorDesc: 'CASSETTE SENSOR FAILURE', status: 'Failed' },
  { id: 'EJ-008', terminalId: 'ATM-MUM-0002', ticketId: 'CMS-02435540', timestamp: '2026-04-12 09:30:45', type: 'Transaction', amount: 15000, status: 'Disputed', errorDesc: 'Customer claims ₹15,000 not dispensed' },
  { id: 'EJ-009', terminalId: 'ATM-CHN-0301', ticketId: 'CMS-02435550', timestamp: '2026-04-12 08:15:20', type: 'Maintenance', errorDesc: 'Scheduled software update', status: 'Success' },
  { id: 'EJ-010', terminalId: 'ATM-HYD-0501', ticketId: 'CMS-02435560', timestamp: '2026-04-12 09:00:00', type: 'Transaction', amount: 40000, status: 'Success' },
];

// ── Mock Cash Operations ──
export const cashOperations: CashOperation[] = [
  { id: 'CO-001', terminalId: 'ATM-MUM-0001', indentNumber: 'IND-2026-04-001', indentAmount: 2500000, revisionType: 'Fresh', citAgent: 'Rajesh Sharma', indentStatus: 'Completed', cllUpload: 'Uploaded', timestamp: '2026-04-12 06:30:00' },
  { id: 'CO-002', terminalId: 'ATM-DEL-0101', indentNumber: 'IND-2026-04-002', indentAmount: 3000000, revisionType: 'Top-Up', citAgent: 'Amit Verma', indentStatus: 'Completed', cllUpload: 'Uploaded', timestamp: '2026-04-12 07:00:00' },
  { id: 'CO-003', terminalId: 'ATM-DEL-0102', indentNumber: 'IND-2026-04-003', indentAmount: 1500000, revisionType: 'Fresh', citAgent: 'Priya Singh', indentStatus: 'LoadingNotDone', cllUpload: 'Pending', timestamp: '2026-04-12 07:30:00' },
  { id: 'CO-004', terminalId: 'ATM-BLR-0201', indentNumber: 'IND-2026-04-004', indentAmount: 2000000, revisionType: 'Swap', citAgent: 'Karthik Nair', indentStatus: 'Completed', cllUpload: 'Uploaded', timestamp: '2026-04-12 06:45:00' },
  { id: 'CO-005', terminalId: 'ATM-BLR-0202', indentNumber: 'IND-2026-04-005', indentAmount: 1800000, revisionType: 'Fresh', citAgent: 'Deepak Joshi', indentStatus: 'NO ACTIVITY', cllUpload: 'Failed', timestamp: '2026-04-11 14:00:00' },
  { id: 'CO-006', terminalId: 'ATM-KOL-0401', indentNumber: 'IND-2026-04-006', indentAmount: 2200000, revisionType: 'Top-Up', citAgent: 'Sunil Das', indentStatus: 'Pending', cllUpload: 'Pending', timestamp: '2026-04-12 08:00:00' },
];

// ── Mock Timeline Events ──
export const timelineEvents: TimelineEvent[] = [
  { id: 'TL-001', terminalId: 'ATM-MUM-0001', timestamp: '2026-04-12 06:30:00', type: 'indent_created', title: 'Indent Created', detail: 'IND-2026-04-001 — ₹25,00,000 Fresh Load', severity: 'info' },
  { id: 'TL-002', terminalId: 'ATM-MUM-0001', timestamp: '2026-04-12 07:15:00', type: 'cash_loaded', title: 'Cash Loaded', detail: 'CIT Agent Rajesh Sharma loaded 4 cassettes. CLL uploaded.', severity: 'info' },
  { id: 'TL-003', terminalId: 'ATM-MUM-0001', timestamp: '2026-04-12 09:12:34', type: 'ej_log', title: 'EJ Error — BNA Transport Jam', detail: 'Ticket CMS-02435507 — BNA ERROR - TRANSPORT JAM. ₹2,000 note stuck.', severity: 'critical', linkedEntities: ['EJ-001'] },
  { id: 'TL-004', terminalId: 'ATM-MUM-0001', timestamp: '2026-04-12 09:14:01', type: 'auto_recovery', title: 'Auto-Recovery Detected', detail: 'Machine auto-cleared jam. FLM auto-close triggered. Suspected Overage Event flagged.', severity: 'warning', linkedEntities: ['EJ-002'] },
  { id: 'TL-005', terminalId: 'ATM-MUM-0001', timestamp: '2026-04-12 09:22:15', type: 'ej_log', title: 'Successful Withdrawal', detail: 'CMS-02435510 — ₹10,000 dispensed successfully.', severity: 'info', linkedEntities: ['EJ-003'] },
  { id: 'TL-006', terminalId: 'ATM-MUM-0001', timestamp: '2026-04-12 18:00:00', type: 'physical_eod', title: 'Physical EOD Completed', detail: 'EOD visit by Ramesh K. Cash tallied. Reject bin sealed.', severity: 'info' },
  { id: 'TL-007', terminalId: 'ATM-MUM-0001', timestamp: '2026-04-12 18:05:00', type: 'overage_flag', title: 'Overage Flag — Auto-Recovery', detail: 'Overage from auto-recovery at 09:14 not declared within EOD window. Harmonizing Penalty flagged.', severity: 'critical' },
  { id: 'TL-008', terminalId: 'ATM-MUM-0001', timestamp: '2026-04-12 18:10:00', type: 'reject_bin', title: 'Reject Bin — Sealed (Swap)', detail: 'Cassette swap performed. Reject bin sealed with tag #RB-04122026-001.', severity: 'info' },
];

// ── Mock Overage Events ──
export const overageEvents: OverageEvent[] = [
  { id: 'OV-001', terminalId: 'ATM-MUM-0001', detectedAt: '2026-04-12 09:14:01', amount: 2000, withinEOD: false, penaltyApplicable: true, status: 'Unreported' },
  { id: 'OV-002', terminalId: 'ATM-DEL-0101', detectedAt: '2026-04-11 14:22:00', declaredAt: '2026-04-11 16:00:00', amount: 5000, withinEOD: true, penaltyApplicable: false, status: 'Reported' },
  { id: 'OV-003', terminalId: 'ATM-BLR-0202', detectedAt: '2026-04-10 21:00:00', amount: 3500, withinEOD: false, penaltyApplicable: true, status: 'Under Review' },
];

// ── Mock Reject Bin Statuses ──
export const rejectBinStatuses: RejectBinStatus[] = [
  { terminalId: 'ATM-MUM-0001', binType: 'Sealed', lastChecked: '2026-04-12 18:10:00', riskLevel: 'Low', cassetteSeal: 'RB-04122026-001' },
  { terminalId: 'ATM-DEL-0101', binType: 'Open', lastChecked: '2026-04-12 07:00:00', riskLevel: 'Medium' },
  { terminalId: 'ATM-BLR-0202', binType: 'Open', lastChecked: '2026-04-11 23:30:00', riskLevel: 'High' },
  { terminalId: 'ATM-CHN-0301', binType: 'Sealed', lastChecked: '2026-04-12 08:00:00', riskLevel: 'Low', cassetteSeal: 'RB-04122026-002' },
];

// ── Mock Digital Evidence ──
export const digitalEvidence: DigitalEvidence[] = [
  { id: 'DE-001', terminalId: 'ATM-MUM-0001', type: 'EJ File', filename: 'EJ_MUM0001_20260412.txt', uploadedAt: '2026-04-12 09:45:00', size: '2.3 MB' },
  { id: 'DE-002', terminalId: 'ATM-MUM-0001', type: 'MSP Log', filename: 'MSP_MUM0001_20260412.html', uploadedAt: '2026-04-12 09:46:00', size: '1.1 MB' },
  { id: 'DE-003', terminalId: 'ATM-MUM-0001', type: 'Counter JPEG', filename: 'COUNTER_MUM0001_20260412.jpg', uploadedAt: '2026-04-12 18:15:00', size: '845 KB' },
  { id: 'DE-004', terminalId: 'ATM-MUM-0001', type: 'EOD Report', filename: 'EOD_MUM0001_20260412.pdf', uploadedAt: '2026-04-12 18:20:00', size: '512 KB' },
  { id: 'DE-005', terminalId: 'ATM-DEL-0101', type: 'EJ File', filename: 'EJ_DEL0101_20260412.txt', uploadedAt: '2026-04-12 09:40:00', size: '1.8 MB' },
  { id: 'DE-006', terminalId: 'ATM-BLR-0202', type: 'MSP Log', filename: 'MSP_BLR0202_20260411.html', uploadedAt: '2026-04-11 23:45:00', size: '980 KB' },
];

// ── Data Health ──
export const dataHealthMetrics: DataHealthMetric[] = [
  { label: 'EJ Logs Synced', value: 66500, total: 70000, pct: 95.0 },
  { label: 'CLL Uploaded', value: 64400, total: 70000, pct: 92.0 },
  { label: 'EOD Reports Filed', value: 63000, total: 70000, pct: 90.0 },
  { label: 'MSP Logs Available', value: 61600, total: 70000, pct: 88.0 },
  { label: 'Identity Data Complete', value: 68600, total: 70000, pct: 98.0 },
];

// ── Helpers ──
export const formatINR = (n: number) =>
  '₹' + n.toLocaleString('en-IN');

export const getStatusColor = (s: string) => {
  switch (s) {
    case 'Online': return 'text-emerald-600 bg-emerald-50';
    case 'Offline': return 'text-red-600 bg-red-50';
    case 'Maintenance': return 'text-amber-600 bg-amber-50';
    default: return 'text-slate-600 bg-slate-50';
  }
};

export const getSeverityColor = (s: string) => {
  switch (s) {
    case 'critical': return 'border-red-400 bg-red-50';
    case 'warning': return 'border-amber-400 bg-amber-50';
    default: return 'border-slate-200 bg-white';
  }
};

export const getRiskColor = (r: string) => {
  switch (r) {
    case 'High': return 'text-red-700 bg-red-100';
    case 'Medium': return 'text-amber-700 bg-amber-100';
    default: return 'text-emerald-700 bg-emerald-100';
  }
};
