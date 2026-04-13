// Schlumberger Operational Control Tower - Data Layer

export interface GlobalMetric {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  status: 'normal' | 'warning' | 'critical';
  icon: string;
}

export interface RegionOps {
  id: string;
  name: string;
  rigs: number;
  wells: number;
  productionVsPlan: number;
  incidents: number;
  alerts: number;
  lat: number;
  lng: number;
  status: 'optimal' | 'warning' | 'critical';
}

export interface OperationalAlert {
  id: string;
  severity: 'critical' | 'high' | 'medium';
  type: string;
  title: string;
  location: string;
  region: string;
  timestamp: string;
  description: string;
  impact: string;
  aiRecommendation: string;
  alternativeAction?: string;
  useCaseId?: number;
}

export interface WorkflowStep {
  id: number;
  label: string;
  status: 'completed' | 'active' | 'pending';
  timestamp?: string;
  detail?: string;
}

export interface UseCase {
  id: number;
  title: string;
  subtitle: string;
  alertId: string;
  scenario: string;
  systemChecks: string[];
  aiAnalysis: string[];
  aiRecommendations: string[];
  decisionOptions: string[];
  workflowSteps: WorkflowStep[];
  roiMetrics: { label: string; value: string }[];
  outcome: string;
}

export interface ExceptionItem {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium';
  title: string;
  rootCause: string;
  impact: string;
  recommendedAction: string;
  timeToSLA: string;
}

export interface MaterialShortage {
  id: string;
  material: string;
  region: string;
  required: number;
  available: number;
  deficit: number;
  surplusRegion?: string;
  surplusQty?: number;
  status: 'critical' | 'low' | 'transit';
}

export interface DecisionLogEntry {
  id: string;
  timestamp: string;
  decision: string;
  madeBy: string;
  type: string;
  status: 'approved' | 'pending' | 'escalated';
  savingsUSD?: number;
}

// ── Global Metrics ──
export const globalMetrics: GlobalMetric[] = [
  { label: 'Active Rigs', value: 42, status: 'normal', icon: 'Drill', trend: 'up' },
  { label: 'Wells Drilling', value: 128, status: 'normal', icon: 'Factory', trend: 'neutral' },
  { label: 'Production vs Plan', value: '94%', status: 'warning', icon: 'TrendingUp', trend: 'down' },
  { label: 'Field Incidents', value: 6, status: 'warning', icon: 'AlertTriangle', trend: 'up' },
  { label: 'Material Shortages', value: 4, status: 'critical', icon: 'Package', trend: 'up' },
  { label: 'SLA Breach Risk', value: 3, status: 'critical', icon: 'Clock', trend: 'up' },
];

// ── Regions ──
export const regions: RegionOps[] = [
  { id: 'ME', name: 'Middle East', rigs: 14, wells: 42, productionVsPlan: 96, incidents: 2, alerts: 2, lat: 25.2, lng: 55.3, status: 'warning' },
  { id: 'NS', name: 'North Sea', rigs: 8, wells: 28, productionVsPlan: 91, incidents: 1, alerts: 1, lat: 57.5, lng: 1.8, status: 'optimal' },
  { id: 'IN', name: 'India', rigs: 6, wells: 18, productionVsPlan: 97, incidents: 0, alerts: 0, lat: 19.1, lng: 72.9, status: 'optimal' },
  { id: 'PM', name: 'US Permian', rigs: 14, wells: 40, productionVsPlan: 89, incidents: 3, alerts: 1, lat: 31.9, lng: -102.1, status: 'critical' },
];

// ── Alerts ──
export const operationalAlerts: OperationalAlert[] = [
  {
    id: 'ALT-001', severity: 'critical', type: 'Rig Idle Risk',
    title: 'Rig A17 — Idle risk in 6 hours', location: 'Rig A17', region: 'Middle East',
    timestamp: '10 min ago',
    description: 'Missing mud pump component. Current inventory depleted. Next scheduled delivery in 18 hours.',
    impact: 'Potential 10-hour downtime. Cost exposure: $150,000',
    aiRecommendation: 'Component available in Dubai warehouse. Can be shipped in 4 hours.',
    alternativeAction: 'Reallocate from Rig B12 (idle for 48hrs)',
    useCaseId: 1,
  },
  {
    id: 'ALT-002', severity: 'high', type: 'Production Drop',
    title: 'Well P92 — Production drop 18%', location: 'Well P92', region: 'US Permian',
    timestamp: '25 min ago',
    description: 'SCADA detected pressure anomaly. Flow rate decreased from 1,200 bbl/d to 984 bbl/d.',
    impact: 'Revenue loss ~$32,000/day at current oil prices',
    aiRecommendation: 'Schedule field inspection. Reduce flow rate temporarily. Dispatch maintenance crew.',
    useCaseId: 2,
  },
  {
    id: 'ALT-003', severity: 'high', type: 'Schedule Conflict',
    title: 'Drilling schedule impacted by logistics delay', location: 'Rig C05', region: 'North Sea',
    timestamp: '1 hr ago',
    description: 'Material delay from supplier. Rig schedule conflict with crew rotation. Casing pipe delivery delayed 3 days.',
    impact: 'Drilling program delay: 2-3 days. Cost: $220,000',
    aiRecommendation: 'Reschedule drilling window. Reallocate crew from Rig D08. Use alternate supplier (verified).',
    useCaseId: 3,
  },
  {
    id: 'ALT-004', severity: 'medium', type: 'Crew Mismatch',
    title: 'Field ME4 — Crew allocation mismatch', location: 'Field ME4', region: 'Middle East',
    timestamp: '2 hrs ago',
    description: 'Shift overlap detected. 3 field engineers assigned to conflicting sites.',
    impact: 'Delayed well completion by 6 hours',
    aiRecommendation: 'Reassign Engineer #E-204 to Field ME4. Auto-resolve shift conflict.',
  },
  {
    id: 'ALT-005', severity: 'critical', type: 'Inventory Shortage',
    title: 'Mud pump shortage — Middle East region', location: 'Regional Warehouse', region: 'Middle East',
    timestamp: '3 hrs ago',
    description: 'Critical stock level reached. 2 units remaining, 6 required across active rigs.',
    impact: 'Multiple rig idle risk within 72 hours',
    aiRecommendation: 'Surplus detected in India region (4 units). Initiate cross-region transfer.',
    useCaseId: 4,
  },
];

// ── Use Cases ──
export const useCases: UseCase[] = [
  {
    id: 1, title: 'Rig Idle Prevention', subtitle: 'Automated supply chain orchestration',
    alertId: 'ALT-001',
    scenario: 'Rig A17 faces idle risk in 6 hours due to missing mud pump component.',
    systemChecks: ['SAP Inventory: 0 units at site', 'Dubai Warehouse: 2 units available', 'Rig B12: 1 unit (idle rig)', 'Logistics: 4-hour express available'],
    aiAnalysis: ['Component critical for continued drilling', 'Dubai warehouse has verified stock', 'Express logistics route confirmed', 'Rig B12 idle for 48hrs — reallocation viable'],
    aiRecommendations: ['Ship from Dubai warehouse (4hr ETA)', 'Reallocate from Rig B12 as backup', 'Pre-position 2 additional units for buffer'],
    decisionOptions: ['Approve Dubai shipment', 'Approve Rig B12 reallocation', 'Escalate to Regional Ops'],
    workflowSteps: [
      { id: 1, label: 'Alert Generated', status: 'completed', timestamp: '09:42 AM', detail: 'System detected inventory depletion' },
      { id: 2, label: 'AI Analysis Complete', status: 'completed', timestamp: '09:43 AM', detail: 'Cross-checked 4 data sources' },
      { id: 3, label: 'Decision Routed', status: 'completed', timestamp: '09:44 AM', detail: 'Sent to Supply Chain Manager' },
      { id: 4, label: 'Warehouse Notified', status: 'active', timestamp: '09:45 AM', detail: 'Dubai warehouse preparing shipment' },
      { id: 5, label: 'Logistics Booked', status: 'pending', detail: 'Express courier on standby' },
      { id: 6, label: 'Component Delivered', status: 'pending', detail: 'ETA: 4 hours' },
    ],
    roiMetrics: [
      { label: 'Downtime Avoided', value: '10 hours' },
      { label: 'Cost Saved', value: '$150,000' },
      { label: 'Decision Time', value: '3 minutes' },
      { label: 'Manual Process Time', value: '4+ hours' },
    ],
    outcome: 'Rig A17 continues drilling without interruption. Component arrives 2 hours before depletion.',
  },
  {
    id: 2, title: 'Production Drop Investigation', subtitle: 'Cross-domain diagnostic intelligence',
    alertId: 'ALT-002',
    scenario: 'Well P92 shows 18% production drop detected by SCADA sensors.',
    systemChecks: ['SCADA: Pressure drop from 2,400 to 1,960 psi', 'Delfi Reservoir Model: No formation change', 'Production Target: 1,200 bbl/d → 984 bbl/d', 'Field Reports: Valve maintenance overdue 12 days'],
    aiAnalysis: ['Pressure drop correlates with valve degradation pattern', 'Reservoir pressure stable — surface issue confirmed', 'Similar pattern seen in Well P78 (resolved with valve replacement)', 'No formation damage indicators'],
    aiRecommendations: ['Schedule immediate field inspection', 'Reduce flow rate to 800 bbl/d temporarily', 'Dispatch maintenance crew with valve replacement kit', 'Update predictive maintenance schedule'],
    decisionOptions: ['Approve field inspection', 'Approve flow rate reduction', 'Dispatch maintenance crew', 'Escalate to Production Manager'],
    workflowSteps: [
      { id: 1, label: 'SCADA Alert Triggered', status: 'completed', timestamp: '08:15 AM' },
      { id: 2, label: 'Cross-Domain Analysis', status: 'completed', timestamp: '08:17 AM', detail: 'Pulled Delfi + SCADA + Field data' },
      { id: 3, label: 'Root Cause Identified', status: 'completed', timestamp: '08:18 AM', detail: 'Valve degradation confirmed' },
      { id: 4, label: 'Field Engineer Assigned', status: 'active', timestamp: '08:20 AM' },
      { id: 5, label: 'Maintenance Executed', status: 'pending' },
      { id: 6, label: 'Production Restored', status: 'pending' },
    ],
    roiMetrics: [
      { label: 'Revenue Protected', value: '$32,000/day' },
      { label: 'Diagnosis Time', value: '3 minutes' },
      { label: 'Traditional Diagnosis', value: '6-8 hours' },
      { label: 'Production Restored', value: 'Same day' },
    ],
    outcome: 'Valve replaced within 6 hours. Production restored to 1,180 bbl/d.',
  },
  {
    id: 3, title: 'Cross-Domain Decision Routing', subtitle: 'Multi-team coordination orchestration',
    alertId: 'ALT-003',
    scenario: 'Drilling schedule for Rig C05 impacted by cascading logistics and crew conflicts.',
    systemChecks: ['Supplier: Casing pipe delivery delayed 3 days', 'Rig Schedule: Conflict with planned maintenance', 'Crew: Rotation overlap with Rig D08', 'Finance: Budget approval needed for alternate supplier'],
    aiAnalysis: ['Alternate supplier can deliver in 24 hours (+8% cost)', 'Crew from Rig D08 available after shift swap', 'Maintenance can be deferred 5 days safely', 'Total delay reducible from 3 days to 6 hours'],
    aiRecommendations: ['Use alternate supplier (verified quality)', 'Swap crew rotation with Rig D08', 'Defer maintenance to next window', 'Route finance approval in parallel'],
    decisionOptions: ['Approve alternate supplier', 'Approve crew swap', 'Defer maintenance', 'Escalate to VP Operations'],
    workflowSteps: [
      { id: 1, label: 'Delay Detected', status: 'completed', timestamp: '07:30 AM' },
      { id: 2, label: 'Impact Analysis', status: 'completed', timestamp: '07:32 AM' },
      { id: 3, label: 'Drilling Team Approval', status: 'completed', timestamp: '07:45 AM' },
      { id: 4, label: 'Supply Chain Approval', status: 'active', timestamp: '07:50 AM' },
      { id: 5, label: 'Finance Approval', status: 'pending' },
      { id: 6, label: 'Execution', status: 'pending' },
    ],
    roiMetrics: [
      { label: 'Delay Reduced', value: '3 days → 6 hrs' },
      { label: 'Cost Avoided', value: '$220,000' },
      { label: 'Teams Coordinated', value: '4 departments' },
      { label: 'Decision Cycle', value: '20 minutes' },
    ],
    outcome: 'Drilling continues with 6-hour delay instead of 3-day stoppage. All teams aligned.',
  },
  {
    id: 4, title: 'Field Materials Intelligence', subtitle: 'Cross-region inventory orchestration',
    alertId: 'ALT-005',
    scenario: 'Critical mud pump shortage across Middle East region threatening multiple rigs.',
    systemChecks: ['ME Warehouse: 2 units (need 6)', 'India Region: 4 surplus units', 'North Sea: 1 surplus unit', 'In Transit: 0 units'],
    aiAnalysis: ['India surplus covers ME deficit exactly', 'Cross-region transfer: 48-hour logistics', 'Emergency procurement: 5-day lead time', 'Transfer 60% cheaper than emergency buy'],
    aiRecommendations: ['Initiate India → ME transfer (4 units)', 'Pre-position buffer stock from North Sea', 'Cancel emergency procurement order', 'Update regional min-stock thresholds'],
    decisionOptions: ['Approve cross-region transfer', 'Approve buffer repositioning', 'Cancel emergency order', 'Escalate to Global Supply Chain'],
    workflowSteps: [
      { id: 1, label: 'Shortage Detected', status: 'completed', timestamp: '06:00 AM' },
      { id: 2, label: 'Global Inventory Scan', status: 'completed', timestamp: '06:02 AM' },
      { id: 3, label: 'Transfer Request Created', status: 'completed', timestamp: '06:05 AM' },
      { id: 4, label: 'India Warehouse Approved', status: 'active', timestamp: '06:15 AM' },
      { id: 5, label: 'Logistics Arranged', status: 'pending' },
      { id: 6, label: 'Delivered to ME', status: 'pending' },
    ],
    roiMetrics: [
      { label: 'Expedite Cost Avoided', value: '$85,000' },
      { label: 'Rig Downtime Prevented', value: '72 hours' },
      { label: 'Working Capital Freed', value: '$120,000' },
      { label: 'Lead Time Reduction', value: '5 days → 48 hrs' },
    ],
    outcome: 'Surplus inventory rebalanced. Zero emergency procurement. All rigs operational.',
  },
];

// ── Exceptions ──
export const exceptions: ExceptionItem[] = [
  { id: 'EX-01', type: 'SLA Breach Risk', severity: 'critical', title: 'Rig A17 maintenance SLA expires in 4 hrs', rootCause: 'Delayed component delivery', impact: '$50,000 penalty + idle cost', recommendedAction: 'Expedite Dubai shipment', timeToSLA: '4h 12m' },
  { id: 'EX-02', type: 'Rig Idle Risk', severity: 'critical', title: 'Rig C05 drilling window closing', rootCause: 'Casing pipe delay from supplier', impact: '3-day drilling delay', recommendedAction: 'Switch to alternate supplier', timeToSLA: '6h 30m' },
  { id: 'EX-03', type: 'Production Drop', severity: 'high', title: 'Well P92 producing below target', rootCause: 'Valve degradation', impact: '$32,000/day revenue loss', recommendedAction: 'Dispatch maintenance crew', timeToSLA: '12h 00m' },
  { id: 'EX-04', type: 'Crew Shortage', severity: 'high', title: 'Field ME4 understaffed for completion', rootCause: 'Shift rotation conflict', impact: '6-hour delay', recommendedAction: 'Reassign Engineer E-204', timeToSLA: '2h 45m' },
  { id: 'EX-05', type: 'Equipment Failure', severity: 'medium', title: 'BOP test overdue on Rig D08', rootCause: 'Deferred maintenance', impact: 'Compliance risk', recommendedAction: 'Schedule immediate test', timeToSLA: '24h 00m' },
  { id: 'EX-06', type: 'Inventory Critical', severity: 'critical', title: 'Mud pump stock at critical level — ME', rootCause: 'Demand spike + supplier delay', impact: 'Multi-rig idle risk', recommendedAction: 'Cross-region transfer from India', timeToSLA: '48h 00m' },
];

// ── Materials ──
export const materialShortages: MaterialShortage[] = [
  { id: 'MAT-01', material: 'Drilling Fluid (42-lb)', region: 'Middle East', required: 120, available: 45, deficit: 75, surplusRegion: 'India', surplusQty: 80, status: 'critical' },
  { id: 'MAT-02', material: 'Casing Pipes (9⅝")', region: 'North Sea', required: 200, available: 140, deficit: 60, surplusRegion: 'US Permian', surplusQty: 90, status: 'low' },
  { id: 'MAT-03', material: 'Mud Pump Components', region: 'Middle East', required: 6, available: 2, deficit: 4, surplusRegion: 'India', surplusQty: 4, status: 'critical' },
  { id: 'MAT-04', material: 'BOP Seals & Gaskets', region: 'US Permian', required: 50, available: 32, deficit: 18, status: 'transit' },
  { id: 'MAT-05', material: 'Drill Bits (PDC 12¼")', region: 'India', required: 8, available: 5, deficit: 3, surplusRegion: 'North Sea', surplusQty: 5, status: 'low' },
];

// ── Decision Log ──
export const decisionLog: DecisionLogEntry[] = [
  { id: 'DEC-018', timestamp: '10:42 AM', decision: 'Approved Dubai warehouse shipment for Rig A17', madeBy: 'AI + Supply Chain Mgr', type: 'Supply Chain', status: 'approved', savingsUSD: 150000 },
  { id: 'DEC-017', timestamp: '10:15 AM', decision: 'Flow rate reduction for Well P92 approved', madeBy: 'Production Manager', type: 'Production', status: 'approved', savingsUSD: 32000 },
  { id: 'DEC-016', timestamp: '09:58 AM', decision: 'Alternate supplier activated for Rig C05 casing', madeBy: 'AI + Drilling Lead', type: 'Procurement', status: 'approved', savingsUSD: 220000 },
  { id: 'DEC-015', timestamp: '09:30 AM', decision: 'Crew swap authorized: Rig D08 → C05', madeBy: 'HR Operations', type: 'Workforce', status: 'approved' },
  { id: 'DEC-014', timestamp: '09:12 AM', decision: 'Cross-region transfer: India → ME (mud pumps)', madeBy: 'AI Recommendation', type: 'Supply Chain', status: 'pending', savingsUSD: 85000 },
  { id: 'DEC-013', timestamp: '08:45 AM', decision: 'BOP test escalated for Rig D08', madeBy: 'Safety Officer', type: 'Compliance', status: 'escalated' },
  { id: 'DEC-012', timestamp: '08:20 AM', decision: 'Field engineer dispatched to Well P92', madeBy: 'AI + Field Ops', type: 'Maintenance', status: 'approved' },
  { id: 'DEC-011', timestamp: '07:55 AM', decision: 'Emergency procurement cancelled — surplus found', madeBy: 'AI Auto-Decision', type: 'Supply Chain', status: 'approved', savingsUSD: 85000 },
];

// ── Executive KPIs ──
export const executiveKPIs = {
  operationalEfficiency: 94.2,
  rigUtilization: 91.8,
  productionVariance: -6.0,
  decisionCycleTime: '8 min avg',
  downtimeAvoided: '32 hrs',
  costSavings: '$420,000',
  decisionsToday: 18,
  autoResolved: 12,
  humanApproved: 6,
};
