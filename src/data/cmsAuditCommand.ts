// CMS Audit Command Center — Data Layer

export interface AuditPulseMetrics {
  auditHitRate: number;
  totalShortageDiscovered: number;
  riskCoverage: number;
  auditorComplianceScore: number;
  auditHitRateTrend: number;
  shortageTrend: number;
  riskCoverageTrend: number;
  complianceTrend: number;
}

export interface AuditTarget {
  id: string;
  type: 'atm' | 'vault' | 'route';
  name: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  lastAuditDate: string;
  daysSinceAudit: number;
  riskScore: number;
  balanceDriftCount: number;
  sitePersona: string;
  totalShortage: number;
  auditCycleTarget: number;
  overdue: boolean;
}

export interface LiveAuditEntry {
  id: string;
  auditorId: string;
  auditorName: string;
  atmId: string;
  location: string;
  timestamp: string;
  status: 'in-progress' | 'completed' | 'flagged';
  switchCounter: number;
  machineCounter: number;
  physicalCount: number;
  diffAmount: number;
  geoTagged: boolean;
  geoDistance: number;
  otcStatus: 'active' | 'inactive';
  vaultLockChecked: boolean;
  photoEvidence: { type: string; url: string; verified: boolean }[];
  sopCompliance: { item: string; status: boolean }[];
}

export interface DiscrepancyEntry {
  id: string;
  atmId: string;
  auditId: string;
  category: 'technical' | 'physical' | 'human';
  subCategory: string;
  description: string;
  amount: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  rootCause: string;
  photoMismatch: boolean;
  resolution: string;
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
}

export interface VaultEntry {
  id: string;
  name: string;
  location: string;
  region: string;
  totalATMs: number;
  lastAuditDate: string;
  totalShortage: number;
  shortageTrend: number[];
  custodianCount: number;
  riskLevel: 'high' | 'medium' | 'low';
  complianceScore: number;
}

export interface RouteEntry {
  id: string;
  routeCode: string;
  region: string;
  atmCount: number;
  custodianId: string;
  custodianName: string;
  theftRiskScore: number;
  totalDiscrepancies: number;
  lastAuditDate: string;
  averageShortage: number;
  surpriseAuditCount: number;
}

export interface AuditAlert {
  id: string;
  type: 'shortage' | 'compliance' | 'surprise' | 'escalation';
  message: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'info';
  auditorId: string;
  atmId?: string;
  amount?: number;
  requiresSignoff: boolean;
}

// Mock Data
export const auditPulse: AuditPulseMetrics = {
  auditHitRate: 34.2,
  totalShortageDiscovered: 1847500,
  riskCoverage: 78.5,
  auditorComplianceScore: 87.3,
  auditHitRateTrend: 2.1,
  shortageTrend: -12.4,
  riskCoverageTrend: 5.3,
  complianceTrend: 1.8,
};

export const riskTargets: AuditTarget[] = [
  { id: 'ATM-MUM-0001', type: 'atm', name: 'ATM-MUM-0001', location: 'Andheri West, Mumbai', priority: 'high', lastAuditDate: '2026-03-28', daysSinceAudit: 16, riskScore: 92, balanceDriftCount: 7, sitePersona: 'High-Traffic Salary Site', totalShortage: 45000, auditCycleTarget: 30, overdue: false },
  { id: 'ATM-DEL-0102', type: 'atm', name: 'ATM-DEL-0102', location: 'Connaught Place, Delhi', priority: 'high', lastAuditDate: '2026-03-15', daysSinceAudit: 29, riskScore: 88, balanceDriftCount: 5, sitePersona: 'High-Traffic Commercial', totalShortage: 62000, auditCycleTarget: 30, overdue: false },
  { id: 'ATM-BLR-0055', type: 'atm', name: 'ATM-BLR-0055', location: 'MG Road, Bangalore', priority: 'high', lastAuditDate: '2026-03-01', daysSinceAudit: 43, riskScore: 95, balanceDriftCount: 9, sitePersona: 'High-Risk Pilferage Zone', totalShortage: 125000, auditCycleTarget: 30, overdue: true },
  { id: 'ATM-CHN-0033', type: 'atm', name: 'ATM-CHN-0033', location: 'T. Nagar, Chennai', priority: 'medium', lastAuditDate: '2026-02-20', daysSinceAudit: 52, riskScore: 65, balanceDriftCount: 2, sitePersona: 'Standard Recycler', totalShortage: 8000, auditCycleTarget: 60, overdue: false },
  { id: 'ATM-KOL-0078', type: 'atm', name: 'ATM-KOL-0078', location: 'Park Street, Kolkata', priority: 'medium', lastAuditDate: '2026-03-10', daysSinceAudit: 34, riskScore: 58, balanceDriftCount: 1, sitePersona: 'Remote Area ATM', totalShortage: 3500, auditCycleTarget: 60, overdue: false },
  { id: 'ATM-HYD-0044', type: 'atm', name: 'ATM-HYD-0044', location: 'Hitec City, Hyderabad', priority: 'high', lastAuditDate: '2026-02-28', daysSinceAudit: 44, riskScore: 85, balanceDriftCount: 6, sitePersona: 'High-Traffic IT Corridor', totalShortage: 78000, auditCycleTarget: 30, overdue: true },
  { id: 'ATM-PUN-0019', type: 'atm', name: 'ATM-PUN-0019', location: 'FC Road, Pune', priority: 'low', lastAuditDate: '2026-03-25', daysSinceAudit: 19, riskScore: 22, balanceDriftCount: 0, sitePersona: 'Low-Traffic Residential', totalShortage: 0, auditCycleTarget: 90, overdue: false },
  { id: 'ATM-JAI-0066', type: 'atm', name: 'ATM-JAI-0066', location: 'MI Road, Jaipur', priority: 'high', lastAuditDate: '2026-03-05', daysSinceAudit: 39, riskScore: 91, balanceDriftCount: 8, sitePersona: 'High-Risk Pilferage Zone', totalShortage: 155000, auditCycleTarget: 30, overdue: true },
];

export const liveAuditFeed: LiveAuditEntry[] = [
  {
    id: 'AUD-20260413-001', auditorId: 'AUD-1042', auditorName: 'Rajesh Sharma', atmId: 'ATM-MUM-0001', location: 'Andheri West, Mumbai', timestamp: '2026-04-13T09:45:00',
    status: 'flagged', switchCounter: 145832, machineCounter: 145830, physicalCount: 145828, diffAmount: 4000,
    geoTagged: true, geoDistance: 45, otcStatus: 'active', vaultLockChecked: true,
    photoEvidence: [
      { type: 'Switch Counter', url: '/switch-photo.jpg', verified: true },
      { type: 'Machine Counter', url: '/machine-photo.jpg', verified: true },
      { type: 'Cassette Layout', url: '/cassette-photo.jpg', verified: false },
    ],
    sopCompliance: [
      { item: 'Vault Lock Status (Control #8)', status: true },
      { item: 'OTC Status Validated', status: true },
      { item: 'Geo-Tagged within 200m', status: true },
      { item: 'Photo Evidence Uploaded', status: true },
      { item: 'Cassette Seal Verified', status: false },
    ],
  },
  {
    id: 'AUD-20260413-002', auditorId: 'AUD-1078', auditorName: 'Priya Mehta', atmId: 'ATM-DEL-0102', location: 'Connaught Place, Delhi', timestamp: '2026-04-13T10:15:00',
    status: 'flagged', switchCounter: 98421, machineCounter: 98421, physicalCount: 98419, diffAmount: 2000,
    geoTagged: true, geoDistance: 120, otcStatus: 'active', vaultLockChecked: true,
    photoEvidence: [
      { type: 'Switch Counter', url: '/switch-photo-2.jpg', verified: true },
      { type: 'Machine Counter', url: '/machine-photo-2.jpg', verified: true },
    ],
    sopCompliance: [
      { item: 'Vault Lock Status (Control #8)', status: true },
      { item: 'OTC Status Validated', status: true },
      { item: 'Geo-Tagged within 200m', status: true },
      { item: 'Photo Evidence Uploaded', status: true },
      { item: 'Cassette Seal Verified', status: true },
    ],
  },
  {
    id: 'AUD-20260413-003', auditorId: 'AUD-1015', auditorName: 'Amit Patel', atmId: 'ATM-BLR-0055', location: 'MG Road, Bangalore', timestamp: '2026-04-13T08:30:00',
    status: 'flagged', switchCounter: 203456, machineCounter: 203450, physicalCount: 203438, diffAmount: 25000,
    geoTagged: false, geoDistance: 350, otcStatus: 'inactive', vaultLockChecked: false,
    photoEvidence: [
      { type: 'Switch Counter', url: '/switch-photo-3.jpg', verified: false },
      { type: 'Machine Counter', url: '/machine-photo-3.jpg', verified: false },
    ],
    sopCompliance: [
      { item: 'Vault Lock Status (Control #8)', status: false },
      { item: 'OTC Status Validated', status: false },
      { item: 'Geo-Tagged within 200m', status: false },
      { item: 'Photo Evidence Uploaded', status: true },
      { item: 'Cassette Seal Verified', status: false },
    ],
  },
  {
    id: 'AUD-20260413-004', auditorId: 'AUD-1091', auditorName: 'Kavita Joshi', atmId: 'ATM-CHN-0033', location: 'T. Nagar, Chennai', timestamp: '2026-04-13T11:00:00',
    status: 'completed', switchCounter: 67890, machineCounter: 67890, physicalCount: 67890, diffAmount: 0,
    geoTagged: true, geoDistance: 30, otcStatus: 'active', vaultLockChecked: true,
    photoEvidence: [
      { type: 'Switch Counter', url: '/switch-photo-4.jpg', verified: true },
      { type: 'Machine Counter', url: '/machine-photo-4.jpg', verified: true },
    ],
    sopCompliance: [
      { item: 'Vault Lock Status (Control #8)', status: true },
      { item: 'OTC Status Validated', status: true },
      { item: 'Geo-Tagged within 200m', status: true },
      { item: 'Photo Evidence Uploaded', status: true },
      { item: 'Cassette Seal Verified', status: true },
    ],
  },
];

export const discrepancies: DiscrepancyEntry[] = [
  { id: 'DIS-001', atmId: 'ATM-BLR-0055', auditId: 'AUD-20260413-003', category: 'human', subCategory: 'Manual Input Manipulation', description: 'Photo digits do not match typed counter value. Switch photo shows 203,456 but auditor typed 203,450.', amount: 25000, severity: 'critical', rootCause: 'Suspected manual manipulation of counter input to mask shortage', photoMismatch: true, resolution: '', status: 'escalated' },
  { id: 'DIS-002', atmId: 'ATM-MUM-0001', auditId: 'AUD-20260413-001', category: 'physical', subCategory: 'Cassette Shortage', description: 'Physical count of Cassette 3 (₹100 notes) shows 200 notes less than machine counter.', amount: 4000, severity: 'high', rootCause: 'Shortage in Cassette 3 — ₹100 denomination. Seal was broken.', photoMismatch: false, resolution: '', status: 'investigating' },
  { id: 'DIS-003', atmId: 'ATM-DEL-0102', auditId: 'AUD-20260413-002', category: 'technical', subCategory: 'Counter Not Updated', description: 'Machine counter not updated after last replenishment cycle. EJ shows 2 additional dispenses post-sync.', amount: 2000, severity: 'medium', rootCause: 'Counter sync delay — link was down for 4 hours during replenishment window', photoMismatch: false, resolution: 'Pending counter resync from FLM', status: 'open' },
  { id: 'DIS-004', atmId: 'ATM-JAI-0066', auditId: 'AUD-20260412-008', category: 'physical', subCategory: 'Purge Bin Overage', description: 'Purge bin contained 15 notes (₹500) not accounted for in machine counter.', amount: 7500, severity: 'high', rootCause: 'Notes rejected during dispense but not cleared during last CIT visit', photoMismatch: false, resolution: '', status: 'open' },
  { id: 'DIS-005', atmId: 'ATM-HYD-0044', auditId: 'AUD-20260412-005', category: 'human', subCategory: 'Outside Cassette Cash', description: 'Cash found outside cassette area — ₹35,000 in ₹500 notes placed behind reject bin.', amount: 35000, severity: 'critical', rootCause: 'Unauthorized cash placement. No matching CIT log entry.', photoMismatch: true, resolution: '', status: 'escalated' },
];

export const vaults: VaultEntry[] = [
  { id: 'VLT-MUM-01', name: 'Mumbai Central Vault', location: 'Worli, Mumbai', region: 'West', totalATMs: 850, lastAuditDate: '2026-04-10', totalShortage: 245000, shortageTrend: [180000, 210000, 195000, 245000], custodianCount: 42, riskLevel: 'high', complianceScore: 82 },
  { id: 'VLT-DEL-01', name: 'Delhi NCR Vault', location: 'Dwarka, Delhi', region: 'North', totalATMs: 1200, lastAuditDate: '2026-04-08', totalShortage: 189000, shortageTrend: [220000, 195000, 210000, 189000], custodianCount: 58, riskLevel: 'medium', complianceScore: 89 },
  { id: 'VLT-BLR-01', name: 'Bangalore Hub Vault', location: 'Electronic City, Bangalore', region: 'South', totalATMs: 680, lastAuditDate: '2026-04-05', totalShortage: 312000, shortageTrend: [150000, 220000, 280000, 312000], custodianCount: 35, riskLevel: 'high', complianceScore: 74 },
  { id: 'VLT-CHN-01', name: 'Chennai Central Vault', location: 'Guindy, Chennai', region: 'South', totalATMs: 520, lastAuditDate: '2026-04-12', totalShortage: 67000, shortageTrend: [85000, 72000, 60000, 67000], custodianCount: 28, riskLevel: 'low', complianceScore: 93 },
  { id: 'VLT-KOL-01', name: 'Kolkata Main Vault', location: 'Salt Lake, Kolkata', region: 'East', totalATMs: 410, lastAuditDate: '2026-04-09', totalShortage: 142000, shortageTrend: [98000, 120000, 135000, 142000], custodianCount: 22, riskLevel: 'medium', complianceScore: 86 },
  { id: 'VLT-HYD-01', name: 'Hyderabad Tech Vault', location: 'Gachibowli, Hyderabad', region: 'South', totalATMs: 590, lastAuditDate: '2026-04-03', totalShortage: 278000, shortageTrend: [190000, 240000, 255000, 278000], custodianCount: 31, riskLevel: 'high', complianceScore: 78 },
  { id: 'VLT-PUN-01', name: 'Pune West Vault', location: 'Hinjewadi, Pune', region: 'West', totalATMs: 380, lastAuditDate: '2026-04-11', totalShortage: 45000, shortageTrend: [55000, 48000, 42000, 45000], custodianCount: 20, riskLevel: 'low', complianceScore: 91 },
  { id: 'VLT-JAI-01', name: 'Jaipur Regional Vault', location: 'Malviya Nagar, Jaipur', region: 'North', totalATMs: 290, lastAuditDate: '2026-03-28', totalShortage: 198000, shortageTrend: [110000, 145000, 172000, 198000], custodianCount: 16, riskLevel: 'high', complianceScore: 71 },
];

export const routes: RouteEntry[] = [
  { id: 'RT-001', routeCode: 'MUM-W-01', region: 'Mumbai West', atmCount: 24, custodianId: 'CUS-1001', custodianName: 'Suresh Kumar', theftRiskScore: 87, totalDiscrepancies: 14, lastAuditDate: '2026-04-10', averageShortage: 18500, surpriseAuditCount: 2 },
  { id: 'RT-002', routeCode: 'DEL-S-03', region: 'Delhi South', atmCount: 18, custodianId: 'CUS-1045', custodianName: 'Ravi Verma', theftRiskScore: 92, totalDiscrepancies: 19, lastAuditDate: '2026-04-08', averageShortage: 24000, surpriseAuditCount: 1 },
  { id: 'RT-003', routeCode: 'BLR-E-02', region: 'Bangalore East', atmCount: 22, custodianId: 'CUS-1078', custodianName: 'Manoj Reddy', theftRiskScore: 95, totalDiscrepancies: 22, lastAuditDate: '2026-04-05', averageShortage: 31500, surpriseAuditCount: 3 },
  { id: 'RT-004', routeCode: 'CHN-C-01', region: 'Chennai Central', atmCount: 20, custodianId: 'CUS-1092', custodianName: 'Anand Raj', theftRiskScore: 35, totalDiscrepancies: 3, lastAuditDate: '2026-04-12', averageShortage: 2200, surpriseAuditCount: 1 },
  { id: 'RT-005', routeCode: 'HYD-W-04', region: 'Hyderabad West', atmCount: 26, custodianId: 'CUS-1110', custodianName: 'Vijay Singh', theftRiskScore: 78, totalDiscrepancies: 11, lastAuditDate: '2026-04-07', averageShortage: 15800, surpriseAuditCount: 2 },
  { id: 'RT-006', routeCode: 'KOL-N-02', region: 'Kolkata North', atmCount: 16, custodianId: 'CUS-1055', custodianName: 'Debashish Ghosh', theftRiskScore: 62, totalDiscrepancies: 8, lastAuditDate: '2026-04-09', averageShortage: 9400, surpriseAuditCount: 0 },
  { id: 'RT-007', routeCode: 'JAI-C-01', region: 'Jaipur Central', atmCount: 14, custodianId: 'CUS-1130', custodianName: 'Dinesh Meena', theftRiskScore: 89, totalDiscrepancies: 16, lastAuditDate: '2026-03-28', averageShortage: 22000, surpriseAuditCount: 1 },
  { id: 'RT-008', routeCode: 'PUN-E-01', region: 'Pune East', atmCount: 19, custodianId: 'CUS-1088', custodianName: 'Anil Deshmukh', theftRiskScore: 28, totalDiscrepancies: 2, lastAuditDate: '2026-04-11', averageShortage: 1500, surpriseAuditCount: 1 },
];

export const auditAlerts: AuditAlert[] = [
  { id: 'ALR-001', type: 'shortage', message: 'Auditor AUD-1015 found ₹25,000 shortage at ATM-BLR-0055. Requires immediate Supervisor Sign-off.', timestamp: '2026-04-13T08:45:00', severity: 'critical', auditorId: 'AUD-1015', atmId: 'ATM-BLR-0055', amount: 25000, requiresSignoff: true },
  { id: 'ALR-002', type: 'compliance', message: 'Auditor AUD-1015 failed Geo-Tag verification at ATM-BLR-0055. Distance: 350m (Limit: 200m).', timestamp: '2026-04-13T08:42:00', severity: 'high', auditorId: 'AUD-1015', requiresSignoff: false },
  { id: 'ALR-003', type: 'shortage', message: 'Auditor AUD-1042 found ₹4,000 shortage at ATM-MUM-0001. Cassette seal broken.', timestamp: '2026-04-13T09:50:00', severity: 'high', auditorId: 'AUD-1042', atmId: 'ATM-MUM-0001', amount: 4000, requiresSignoff: true },
  { id: 'ALR-004', type: 'escalation', message: 'ATM-HYD-0044: ₹35,000 cash found outside cassette area. Escalated to Regional Head.', timestamp: '2026-04-13T07:30:00', severity: 'critical', auditorId: 'AUD-1067', atmId: 'ATM-HYD-0044', amount: 35000, requiresSignoff: true },
  { id: 'ALR-005', type: 'surprise', message: 'Surprise Audit triggered for Route MUM-W-01 (Custodian: Suresh Kumar). 3 ATMs selected.', timestamp: '2026-04-13T06:00:00', severity: 'info', auditorId: 'SYSTEM', requiresSignoff: false },
  { id: 'ALR-006', type: 'compliance', message: 'Vault VLT-JAI-01 overdue for audit by 16 days. Last audit: March 28.', timestamp: '2026-04-13T05:00:00', severity: 'high', auditorId: 'SYSTEM', requiresSignoff: false },
];
