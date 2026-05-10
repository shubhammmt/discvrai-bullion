// Synthetic Logistics Execution Intelligence demo data — illustrative only.

export const execKpis = [
  { label: 'Group logistics spend (TTM)', value: '$ 1.92B', delta: 'Pilot scope: 6% of base', tone: 'navy' as const },
  { label: 'Variance vs plan (MTD)', value: '+4.7%', delta: '₹ 142 Cr above budget', tone: 'amber' as const },
  { label: 'Leakage estimate (90d)', value: '₹ 318 Cr', delta: 'Detention · demurrage · spot premium', tone: 'red' as const },
  { label: 'Risk routes (live)', value: '11', delta: '3 Red · 5 Amber · 3 Watch', tone: 'amber' as const },
  { label: 'Pending decisions', value: '23', delta: 'SLA risk · 6 over 48h', tone: 'red' as const },
  { label: 'Rail utilisation', value: '67.3%', delta: '↑ 4.1 pts vs LY · target 75%', tone: 'green' as const },
];

export const spendByMode = [
  { mode: 'Road', plan: 412, actual: 438 },
  { mode: 'Rail', plan: 286, actual: 271 },
  { mode: 'Coastal', plan: 134, actual: 152 },
  { mode: 'Pipeline', plan: 88, actual: 85 },
  { mode: 'Multimodal', plan: 96, actual: 119 },
];

export const varianceByRoute = [
  { route: 'Mundra → NCR', variance: 8.4, mode: 'Rail+Road' },
  { route: 'Hazira → Bengaluru', variance: 6.1, mode: 'Coastal' },
  { route: 'Krishnapatnam → Hyd', variance: -2.2, mode: 'Road' },
  { route: 'Dhamra → Kolkata', variance: 11.3, mode: 'Rail' },
  { route: 'Tuticorin → Coimbatore', variance: 3.7, mode: 'Road' },
  { route: 'Vizag → Raipur', variance: -1.4, mode: 'Rail' },
];

export const exceptionTable = [
  { id: 'EX-3041', route: 'Mundra → NCR', issue: 'Detention beyond 72h · 6 rakes', impact: '₹ 84L', owner: 'Unassigned', sla: '12h', risk: 'Red' },
  { id: 'EX-3042', route: 'Dhamra → Kolkata', issue: 'Spot premium 18% above contract band', impact: '₹ 62L', owner: 'Procurement-East', sla: '36h', risk: 'Amber' },
  { id: 'EX-3043', route: 'Hazira → Bengaluru', issue: 'Vendor reliability dip · OTIF 71%', impact: '₹ 41L', owner: 'Vendor desk', sla: '72h', risk: 'Amber' },
  { id: 'EX-3044', route: 'Kedarnath ropeway · Pkg-3', issue: 'Procurement gap · cable supplier slip', impact: '14d slip', owner: 'Project PMO', sla: '5d', risk: 'Red' },
];

export const aiSummary = `Spend trending +4.7% vs plan, driven by detention (Mundra→NCR cluster) and a 18% spot premium on Dhamra rail lane after a contract carrier curtailment. Recommended: hold next 3 spot bookings, escalate Mundra demurrage with terminal ops, and shift 12% of NCR-bound volume to rail-multimodal — modelled saving ₹ 9.2 Cr over the next 30 days at SLA neutral.`;

// ───── Freight booking advisor ─────
export const freightLane = {
  name: 'Mundra → Delhi NCR',
  baselineRate: 38500,
  contractCapacity: 6800, // tonnes / week
  spotPremiumPct: 14,
  volatility: 0.22,
  slaTarget: 72,
};

export function freightOptimise(demand: number, contractCap: number, spotPrem: number, vol: number, sla: number) {
  const contractShare = Math.min(1, contractCap / Math.max(demand, 1));
  // simple heuristic: volatility & SLA pressure increase spot share
  const spotShare = Math.min(0.45, vol + (sla < 72 ? 0.05 : 0)) * (1 - contractShare);
  const railShare = Math.max(0, 1 - contractShare - spotShare);
  const baseline = 38500;
  const blendedRate =
    contractShare * baseline +
    spotShare * baseline * (1 + spotPrem / 100) +
    railShare * baseline * 0.82;
  const baselineCost = demand * baseline * (1 + spotPrem / 200);
  const optimisedCost = demand * blendedRate;
  const savingPct = ((baselineCost - optimisedCost) / baselineCost) * 100;
  return {
    contractShare: +(contractShare * 100).toFixed(1),
    spotShare: +(spotShare * 100).toFixed(1),
    railShare: +(railShare * 100).toFixed(1),
    blendedRate: Math.round(blendedRate),
    savingPct: +savingPct.toFixed(2),
    saving: Math.round(baselineCost - optimisedCost),
  };
}

export const freightDrivers = [
  { factor: 'Diesel index (W-on-W)', impact: '+1.8%', dir: 'up' },
  { factor: 'Rail rake availability (E-corridor)', impact: '−12%', dir: 'down' },
  { factor: 'Carrier contract expiry (T+18d)', impact: 'Risk', dir: 'flat' },
  { factor: 'NCR demand seasonality', impact: '+6.2%', dir: 'up' },
];

// ───── Leakage cockpit ─────
export const leakageCategories = [
  { cat: 'Detention', value: 142, color: '#DC2626' },
  { cat: 'Demurrage', value: 96, color: '#EA580C' },
  { cat: 'Spot premium', value: 48, color: '#D97706' },
  { cat: 'Underutilised contract', value: 22, color: '#0891B2' },
  { cat: 'Billing variance', value: 10, color: '#6366F1' },
];

export const leakageItems = [
  { id: 'L-1041', route: 'Mundra → NCR', vendor: 'CarrierOne', type: 'Detention', impact: '₹ 84L', root: '6 rakes idle 72h+ · placement gap', action: 'Escalate terminal · invoke contract clause 7.3' },
  { id: 'L-1042', route: 'Dhamra → Kolkata', vendor: 'EastRail Pvt', type: 'Spot premium', impact: '₹ 62L', root: 'Carrier curtailed 2 weeks · spot gap', action: 'Activate fallback carrier · shift 30% to coastal' },
  { id: 'L-1043', route: 'Hazira → Pune', vendor: 'WestLog', type: 'Underutilised contract', impact: '₹ 22L', root: 'Booked 60% of MGT · seasonal dip', action: 'Renegotiate take-or-pay floor' },
  { id: 'L-1044', route: 'Krishnapatnam → Chennai', vendor: 'SouthMove', type: 'Billing variance', impact: '₹ 10L', root: 'Detention double-billed across 14 invoices', action: 'Recover via debit note · audit pattern' },
];

// ───── Vendor risk ─────
export const vendors = [
  { name: 'CarrierOne', otif: 71, cost: 92, concentration: 28, repeatFails: 9, score: 64, tone: 'amber' as const },
  { name: 'EastRail Pvt', otif: 68, cost: 88, concentration: 22, repeatFails: 12, score: 58, tone: 'red' as const },
  { name: 'WestLog', otif: 84, cost: 96, concentration: 14, repeatFails: 3, score: 81, tone: 'green' as const },
  { name: 'SouthMove', otif: 79, cost: 94, concentration: 11, repeatFails: 5, score: 74, tone: 'amber' as const },
  { name: 'CoastalPrime', otif: 88, cost: 91, concentration: 9, repeatFails: 2, score: 86, tone: 'green' as const },
  { name: 'NorthBulk', otif: 76, cost: 89, concentration: 8, repeatFails: 6, score: 70, tone: 'amber' as const },
];

// ───── Ropeway / project assurance ─────
export const ropewayPackages = [
  { pkg: 'Pkg-1 · Civil', progress: 82, owner: 'Site PMO', status: 'On track', risk: 'Green' },
  { pkg: 'Pkg-2 · Stations', progress: 64, owner: 'Site PMO', status: 'Watch', risk: 'Amber' },
  { pkg: 'Pkg-3 · Ropeway system (3S)', progress: 41, owner: 'OEM joint', status: 'Slipping', risk: 'Red' },
  { pkg: 'Pkg-4 · E&M', progress: 33, owner: 'EPC partner', status: 'Watch', risk: 'Amber' },
  { pkg: 'Pkg-5 · O&M readiness', progress: 12, owner: 'Ops org', status: 'Early', risk: 'Green' },
];

export const ropewayMilestones = [
  { ms: 'Cable order release', plan: 'W12', forecast: 'W14', delta: '+2w' },
  { ms: 'Tower foundation 80%', plan: 'W18', forecast: 'W19', delta: '+1w' },
  { ms: 'Station shell handover', plan: 'W26', forecast: 'W30', delta: '+4w' },
  { ms: 'System integration start', plan: 'W34', forecast: 'W38', delta: '+4w' },
  { ms: 'Trial run', plan: 'W48', forecast: 'W54', delta: '+6w' },
];

// ───── Assurance copilot ─────
export const assuranceTopIssues = [
  { rank: 1, title: 'Mundra→NCR detention cluster', impact: '₹ 84L · 12h SLA', owner: 'Procurement-North', status: 'Open · 36h' },
  { rank: 2, title: 'Kedarnath Pkg-3 cable supplier slip', impact: '14d schedule risk', owner: 'Project PMO', status: 'Escalated' },
  { rank: 3, title: 'EastRail OTIF dip · Dhamra corridor', impact: '₹ 62L spot · vendor risk Red', owner: 'Vendor desk', status: 'Action drafted' },
  { rank: 4, title: 'Spot premium breach · Hazira→Pune', impact: '₹ 22L · contract clause 4.1', owner: 'Procurement-West', status: 'Owner pending' },
  { rank: 5, title: 'Billing variance pattern · SouthMove', impact: '₹ 10L recoverable · audit', owner: 'Finance ctrl', status: 'Recovery raised' },
];

export const assuranceQA = [
  {
    q: 'Top 5 issues this week?',
    a: 'See ranked list below — three are cost-driven (detention, spot premium, billing variance) and two are project-driven (Kedarnath Pkg-3 cable slip, EastRail OTIF dip). Combined directional impact: ₹ 1.78 Cr on cost lanes plus 14-day project slip — without compensating action.',
    sources: ['Logistics MIS · W42', 'Project PMO weekly · Pkg-3', 'Vendor scorecard · Sep'],
  },
  {
    q: 'Where is the largest cost recovery action?',
    a: 'Mundra→NCR detention cluster — 6 rakes beyond 72h. Contract clause 7.3 supports recovery, modelled ₹ 84L. Recommended: escalate to terminal ops + carrier joint call within 12h SLA. RACI draft generated.',
    sources: ['Contract repo · CarrierOne v3', 'Terminal logs · Mundra · Sep'],
  },
];
