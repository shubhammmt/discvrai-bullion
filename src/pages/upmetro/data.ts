export const cities = ['Lucknow', 'Kanpur', 'Agra'] as const;
export type City = typeof cities[number];

export const execKpis = {
  riskIndex: { value: 68, target: 45, trend: -4, label: 'Cyber Risk Index', unit: '/100', tone: 'amber' as const },
  openCritical: { value: 7, trend: -2, label: 'Open Critical Incidents', tone: 'red' as const },
  mttd: { value: '38m', trend: -12, label: 'Mean Time to Detect', tone: 'green' as const },
  mttr: { value: '4h 22m', trend: -18, label: 'Mean Time to Respond', tone: 'green' as const },
  recovery: { value: 72, label: 'Recovery Readiness', unit: '%', tone: 'amber' as const },
  compliance: { value: 81, label: 'Compliance Readiness', unit: '%', tone: 'green' as const },
};

export const cityPosture: Record<City, { risk: number; incidents: number; assets: number; otAssets: number }> = {
  Lucknow: { risk: 64, incidents: 3, assets: 142, otAssets: 78 },
  Kanpur:  { risk: 71, incidents: 2, assets: 96,  otAssets: 44 },
  Agra:    { risk: 69, incidents: 2, assets: 84,  otAssets: 38 },
};

export const riskTrend90d = Array.from({ length: 13 }, (_, i) => ({
  week: `W${i + 1}`,
  risk: 78 - i * 0.7 + Math.sin(i) * 3,
  incidents: Math.max(0, 9 - Math.floor(i / 2) + (i % 3)),
}));

export const topRisks = [
  { id: 'R-01', title: 'Flat L2 between AFC and station LAN at 4 stations', impact: ['Safety', 'Service Disruption'], severity: 'Critical', owner: 'OT Sec Lead', city: 'Lucknow' },
  { id: 'R-02', title: 'Vendor jump host without PAM session recording', impact: ['Regulatory'], severity: 'High', owner: 'IAM Lead', city: 'All' },
  { id: 'R-03', title: 'Bot-driven ticket booking surge bypassing rate limits', impact: ['Revenue Leakage'], severity: 'High', owner: 'AppSec', city: 'Lucknow' },
  { id: 'R-04', title: 'Immutable backup not validated for SCADA historian', impact: ['Service Disruption', 'Safety'], severity: 'High', owner: 'IR Lead', city: 'Kanpur' },
  { id: 'R-05', title: 'Privileged accounts without phishing-resistant MFA', impact: ['Regulatory'], severity: 'High', owner: 'IAM Lead', city: 'All' },
  { id: 'R-06', title: 'CCTV VLAN reachable from corporate WAN', impact: ['Safety'], severity: 'High', owner: 'Network', city: 'Agra' },
  { id: 'R-07', title: 'API tokens with overly broad scopes (ticketing)', impact: ['Revenue Leakage'], severity: 'Medium', owner: 'AppSec', city: 'All' },
  { id: 'R-08', title: 'OEM remote support over plain RDP', impact: ['Safety', 'Regulatory'], severity: 'High', owner: 'OT Sec Lead', city: 'Kanpur' },
  { id: 'R-09', title: 'No tabletop drill in last 9 months for OT ransomware', impact: ['Service Disruption'], severity: 'Medium', owner: 'CISO', city: 'All' },
  { id: 'R-10', title: 'DPDP data flow mapping incomplete for app users', impact: ['Regulatory'], severity: 'Medium', owner: 'DPO', city: 'All' },
];

// Asset zones for Module 2
export const zones = [
  { id: 'enterprise',  name: 'Enterprise IT',         assets: 132, criticality: 'High',     trust: 'Corporate', color: '#3b82f6' },
  { id: 'public-edge', name: 'Public Edge (Ticket/App/API)', assets: 38,  criticality: 'Critical', trust: 'Untrusted', color: '#ef4444' },
  { id: 'ot-dmz',      name: 'OT DMZ',                assets: 22,  criticality: 'Critical', trust: 'Boundary',  color: '#f59e0b' },
  { id: 'afc',         name: 'AFC Operations',        assets: 64,  criticality: 'Critical', trust: 'Restricted', color: '#a855f7' },
  { id: 'cctv',        name: 'CCTV / PIDS / PA / ACS',assets: 88,  criticality: 'High',     trust: 'Restricted', color: '#06b6d4' },
  { id: 'rail-ops',    name: 'Rail Ops (Signaling / SCADA / OCC)', assets: 46, criticality: 'Critical', trust: 'Safety', color: '#10b981' },
];

export const lateralPaths = [
  { from: 'enterprise',  to: 'ot-dmz',   risk: 'High',   issue: 'Vendor jump host shared credentials', compliant: false },
  { from: 'public-edge', to: 'enterprise', risk: 'Medium', issue: 'WAF bypass via stale API gateway', compliant: false },
  { from: 'ot-dmz',      to: 'afc',      risk: 'Medium', issue: 'Firewall rule too permissive (any/any on tcp/443)', compliant: false },
  { from: 'cctv',        to: 'rail-ops', risk: 'High',   issue: 'CCTV VLAN trunked to ops switch', compliant: false },
  { from: 'enterprise',  to: 'cctv',     risk: 'Low',    issue: 'Reviewed control', compliant: true },
  { from: 'ot-dmz',      to: 'rail-ops', risk: 'Low',    issue: 'IEC 62443 conduit enforced', compliant: true },
];

// Incidents
export const incidents = [
  { id: 'INC-2041', sev: 'Critical', title: 'Ticketing API bot-fraud surge — 12x baseline', source: 'public-edge', station: 'Hazratganj', owner: 'SOC L2 · Priya', status: 'Triage', cert: { reportBy: '5h 12m', reported: false }, age: '00:48' },
  { id: 'INC-2039', sev: 'High',     title: 'Suspicious lateral SMB scan in enterprise IT', source: 'enterprise', station: 'HQ Lucknow', owner: 'SOC L3 · Anand', status: 'Containment', cert: { reportBy: '2h 04m', reported: true }, age: '03:55' },
  { id: 'INC-2037', sev: 'High',     title: 'Vendor credential reuse alert — OEM (Signaling)', source: 'ot-dmz', station: 'Charbagh', owner: 'OT Sec · Rohit', status: 'Investigation', cert: { reportBy: 'N/A', reported: false }, age: '06:21' },
  { id: 'INC-2034', sev: 'Medium',   title: 'CCTV NVR firmware out of date — exploit advisory', source: 'cctv', station: 'Kanpur Central', owner: 'NetOps · Shalini', status: 'Open', cert: { reportBy: 'N/A', reported: false }, age: '1d 02h' },
  { id: 'INC-2030', sev: 'High',     title: 'Phishing wave targeting Finance HRMS', source: 'enterprise', station: 'HQ Kanpur', owner: 'SOC L1 · Naveen', status: 'Eradication', cert: { reportBy: 'Filed', reported: true }, age: '1d 18h' },
  { id: 'INC-2028', sev: 'Critical', title: 'Anomalous OT controller polling from unknown host', source: 'rail-ops', station: 'Sikandra', owner: 'OT Sec · Rohit', status: 'Triage', cert: { reportBy: '3h 40m', reported: false }, age: '02:18' },
];

export const incidentTimeline = [
  { t: 'T+00:00', ev: 'Detection', detail: 'API gateway anomaly: 12x request rate from 230 ASNs' },
  { t: 'T+00:04', ev: 'Auto-enrich', detail: 'Bot signature match · ATO score 0.91 · linked to 2 prior fraud rings' },
  { t: 'T+00:08', ev: 'Notify', detail: 'SOC L2 paged · Commercial Ops alerted · WAF in shadow→block mode' },
  { t: 'T+00:14', ev: 'Containment', detail: 'Rate-limit policy v3 deployed · device fingerprint challenge enabled' },
  { t: 'T+00:21', ev: 'Validation', detail: 'Booking success rate normalized · genuine PNR completion 97.4%' },
  { t: 'T+00:34', ev: 'Compliance', detail: 'CERT-In incident draft auto-prepared · awaiting CISO sign-off' },
];

// Identity / vendor
export const identityKpis = {
  privAccounts: 412,
  mfaCoverage: 87,
  pamSessions: 94,
  dormantPriv: 11,
  vendors: 40,
  vendorViolations: 6,
};

export const vendors = [
  { name: 'Alstom (Signaling OEM)', sessions: 12, last: '2h ago', mfa: true, pam: true, status: 'OK', expires: '14d' },
  { name: 'Siemens (SCADA)', sessions: 4, last: '1d ago', mfa: true, pam: true, status: 'OK', expires: '38d' },
  { name: 'CMS-Edge (AFC support)', sessions: 28, last: '12m ago', mfa: true, pam: false, status: 'Violation', expires: '6d' },
  { name: 'Bharat Telecom (WAN)', sessions: 9, last: '4h ago', mfa: false, pam: true, status: 'Violation', expires: '21d' },
  { name: 'Honeywell (BMS)', sessions: 3, last: '3d ago', mfa: true, pam: true, status: 'OK', expires: '60d' },
  { name: 'Hikvision Partner (CCTV)', sessions: 17, last: '40m ago', mfa: false, pam: false, status: 'Violation', expires: 'Expired' },
];

export const recoverySystems = [
  { sys: 'AFC Core', immutable: true,  lastTest: '14d ago', rto: '4h',  rtoTarget: '4h',  rpo: '15m', status: 'Green' },
  { sys: 'Ticketing App',          immutable: true,  lastTest: '7d ago',  rto: '2h',  rtoTarget: '2h',  rpo: '5m',  status: 'Green' },
  { sys: 'HRMS / Finance ERP',     immutable: true,  lastTest: '46d ago', rto: '6h',  rtoTarget: '4h',  rpo: '1h',  status: 'Amber' },
  { sys: 'SCADA Historian',        immutable: false, lastTest: 'Never',   rto: '—',   rtoTarget: '8h',  rpo: '—',   status: 'Red'   },
  { sys: 'CCTV / PIDS Recordings', immutable: true,  lastTest: '120d ago',rto: '24h', rtoTarget: '12h', rpo: '4h',  status: 'Amber' },
  { sys: 'Identity / AD',          immutable: true,  lastTest: '21d ago', rto: '3h',  rtoTarget: '2h',  rpo: '15m', status: 'Amber' },
];

export const drills = [
  { name: 'Ticketing DDoS tabletop', date: '2026-05-22', city: 'Lucknow', participants: 14, status: 'Scheduled' },
  { name: 'OT ransomware technical drill', date: '2026-06-09', city: 'Kanpur', participants: 22, status: 'Scheduled' },
  { name: 'Vendor compromise tabletop', date: '2026-04-18', city: 'All', participants: 18, status: 'Closed', findings: 4, openFindings: 1 },
  { name: 'CERT-In reporting drill', date: '2026-03-30', city: 'All', participants: 9, status: 'Closed', findings: 3, openFindings: 0 },
];

export const complianceFrameworks = [
  { fw: 'CERT-In · Incident Reporting & Logging', controls: 24, met: 21, gap: 3, score: 88 },
  { fw: 'NCIIPC · Critical Infrastructure Practices', controls: 36, met: 27, gap: 9, score: 75 },
  { fw: 'DPDP · Data Protection (high-level)', controls: 18, met: 13, gap: 5, score: 72 },
  { fw: 'IEC 62443 · OT Zones & Conduits', controls: 28, met: 19, gap: 9, score: 68 },
];

export const auditFindings = [
  { id: 'F-118', area: 'OT Segmentation', sev: 'High',     age: '42d', owner: 'OT Sec', sla: '15d left', status: 'In Progress' },
  { id: 'F-117', area: 'PAM Coverage',    sev: 'High',     age: '28d', owner: 'IAM',     sla: '32d left', status: 'In Progress' },
  { id: 'F-115', area: 'Backup Validation', sev: 'Critical', age: '61d', owner: 'IR',     sla: 'Overdue 4d', status: 'At Risk' },
  { id: 'F-113', area: 'Logging Retention', sev: 'Medium',  age: '20d', owner: 'SOC',    sla: '40d left', status: 'On Track' },
  { id: 'F-112', area: 'Vendor MFA',        sev: 'High',     age: '17d', owner: 'IAM',     sla: '13d left', status: 'On Track' },
  { id: 'F-110', area: 'DPDP Data Mapping', sev: 'Medium',  age: '34d', owner: 'DPO',    sla: '26d left', status: 'On Track' },
];
