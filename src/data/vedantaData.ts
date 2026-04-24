// Vedanta Aluminium Decision Hub - sample data

export const kpiStrip = [
  { label: 'Production vs Plan', value: '5,842 t', sub: 'Plan: 6,000 t', trend: -2.6, unit: 't', tone: 'amber' },
  { label: 'Specific Energy', value: '13.42', sub: 'kWh/kg Al', trend: +1.8, unit: 'kWh', tone: 'red' },
  { label: 'Anode Effect Freq', value: '0.041', sub: 'AE/pot-day', trend: -8.2, unit: '', tone: 'green' },
  { label: 'Raw Material Cover', value: '11.4 d', sub: 'Alumina stock', trend: -18.0, unit: 'd', tone: 'red' },
  { label: 'Procurement Cycle', value: '21 d', sub: 'PR→PO median', trend: -6.0, unit: 'd', tone: 'green' },
  { label: 'Margin / ton', value: '₹38,420', sub: 'Contribution', trend: +3.4, unit: '₹', tone: 'green' },
];

export const productionTrend = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const plan = 6000;
  const actual = 5800 + Math.sin(i / 3) * 180 + (i > 22 ? -150 : 0);
  return { day: `D${day}`, plan, actual: Math.round(actual) };
});

export const energyTrend = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  kwh: +(13.2 + Math.sin(i / 4) * 0.15 + (i > 24 ? 0.18 : 0)).toFixed(2),
  target: 13.25,
}));

export const topAlerts = [
  {
    id: 'A-1042',
    severity: 'critical',
    title: 'Alumina inbound delay — Vizag berth congestion',
    detail: 'MV Stellar Pride delayed 72 hrs. Coverage drops to 6.2 days vs 14-day policy.',
    owner: 'Rakesh Menon · Procurement',
    impact: '₹14.8 Cr production-at-risk',
    sla: '4h',
    module: 'Procurement',
  },
  {
    id: 'A-1041',
    severity: 'critical',
    title: 'Potline-3 energy intensity +2.4% above baseline',
    detail: 'Cells 211–238 showing voltage drift. Likely anode setting deviation since Shift-B.',
    owner: 'A. Patnaik · Plant Head Smelter',
    impact: '₹6.2 Cr/month if sustained',
    sla: '2h',
    module: 'Operations',
  },
  {
    id: 'A-1039',
    severity: 'high',
    title: 'High-margin export order — logistics bottleneck',
    detail: 'JSW Marubeni 4,200 t order at $2,612/t. Rake unavailability JSPL-Angul.',
    owner: 'S. Iyer · Commercial',
    impact: '₹9.4 Cr margin exposure',
    sla: '8h',
    module: 'Commercial',
  },
  {
    id: 'A-1037',
    severity: 'high',
    title: 'Single-source risk — Calcined Pet Coke (Rain CII)',
    detail: 'Q3 contract concentration 78%. Rain CII force majeure clause invoked partially.',
    owner: 'Rakesh Menon · Procurement',
    impact: '₹22 Cr exposure',
    sla: '24h',
    module: 'Procurement',
  },
  {
    id: 'A-1035',
    severity: 'moderate',
    title: 'Receivables — Hindalco Group billing aging 60+',
    detail: '₹48.2 Cr crossed 60 days. Credit policy review triggered.',
    owner: 'M. Bhatia · Commercial',
    impact: '₹0.4 Cr finance cost',
    sla: '48h',
    module: 'Commercial',
  },
];

export const todaysDecisions = [
  { id: 'D-301', title: 'Approve emergency alumina spot lift — 18,000 t from Hydro', owner: 'CDO', due: '14:00 IST', impact: '₹14.8 Cr', status: 'pending' },
  { id: 'D-302', title: 'Authorize anode change reschedule — Potline-3', owner: 'Plant Head', due: '11:30 IST', impact: '₹2.1 Cr/mo', status: 'pending' },
  { id: 'D-303', title: 'Lock Marubeni quote at $2,612/t with rake premium', owner: 'Commercial Head', due: '17:00 IST', impact: '₹9.4 Cr', status: 'in-review' },
  { id: 'D-304', title: 'Release ₹6.4 Cr slow-moving spares for liquidation', owner: 'Procurement Head', due: 'EOD', impact: '₹6.4 Cr WC', status: 'pending' },
];

export const lines = [
  { id: 'POT-1', name: 'Potline-1', status: 'green', output: 1620, target: 1600, energy: 13.18, ae: 0.032 },
  { id: 'POT-2', name: 'Potline-2', status: 'green', output: 1585, target: 1600, energy: 13.22, ae: 0.038 },
  { id: 'POT-3', name: 'Potline-3', status: 'red', output: 1432, target: 1600, energy: 13.78, ae: 0.061 },
  { id: 'POT-4', name: 'Potline-4', status: 'amber', output: 1205, target: 1200, energy: 13.41, ae: 0.044 },
  { id: 'CAST-1', name: 'Casthouse-1', status: 'green', output: 2840, target: 2800, energy: 0.42, ae: 0 },
  { id: 'CAST-2', name: 'Casthouse-2', status: 'amber', output: 2610, target: 2700, energy: 0.46, ae: 0 },
];

export const downtimeLog = [
  { time: '02:14', line: 'POT-3', cause: 'Anode stub burn-off — Cell 224', duration: 38, severity: 'high' },
  { time: '06:42', line: 'CAST-2', cause: 'DC caster mould temp excursion', duration: 22, severity: 'moderate' },
  { time: '09:08', line: 'POT-4', cause: 'Crust breaker hydraulic fault', duration: 15, severity: 'low' },
  { time: '11:55', line: 'POT-3', cause: 'Voltage spike — bus-bar Zone-C', duration: 27, severity: 'high' },
];

export const opsRecommendations = [
  { id: 'R-1', text: 'Reduce Potline-3 cell temp variance by 4°C → expected gain 28 t/day, ₹1.1 Cr/mo', confidence: 0.87, source: 'PI Historian + ML model v3.2' },
  { id: 'R-2', text: 'Optimize anode change schedule (shift +2h) → energy saving 0.18 kWh/kg, ₹4.4 Cr/yr', confidence: 0.82, source: 'Anode lifecycle model' },
  { id: 'R-3', text: 'Rebalance metal pad height on Cells 211–238 → AE freq -22%', confidence: 0.79, source: 'Cell control loop' },
];

export const prToPoFunnel = [
  { stage: 'PR Created', count: 412, value: 184 },
  { stage: 'Approved', count: 368, value: 162 },
  { stage: 'RFQ Floated', count: 312, value: 148 },
  { stage: 'Bids Evaluated', count: 274, value: 138 },
  { stage: 'PO Released', count: 248, value: 124 },
];

export const suppliers = [
  { name: 'Rain CII Carbon', cat: 'CP Coke', delivery: 72, quality: 88, price: -4.2, risk: 'high', spend: 412 },
  { name: 'Hydro Alumina', cat: 'Alumina', delivery: 94, quality: 96, price: +1.1, risk: 'low', spend: 1840 },
  { name: 'Vedanta Lanjigarh', cat: 'Alumina (capt.)', delivery: 98, quality: 95, price: 0, risk: 'low', spend: 2210 },
  { name: 'GFL Ferro', cat: 'AlF3', delivery: 81, quality: 91, price: +6.4, risk: 'moderate', spend: 188 },
  { name: 'BALCO Cathode', cat: 'Cathode blocks', delivery: 88, quality: 93, price: -1.8, risk: 'low', spend: 142 },
  { name: 'L&T MHE', cat: 'Capex spares', delivery: 78, quality: 89, price: +3.2, risk: 'moderate', spend: 96 },
];

export const slowMoving = [
  { sku: 'BUSB-Cu-160', desc: 'Copper bus-bar 160mm', qty: 84, value: 124, age: 412, action: 'Liquidate (sister plant)' },
  { sku: 'REFR-AL2O3', desc: 'Refractory bricks Al2O3', qty: 1240, value: 89, age: 286, action: 'Internal redeploy' },
  { sku: 'PUMP-CHM-22', desc: 'Centrifugal pump 22kW', qty: 6, value: 48, age: 198, action: 'Resale' },
  { sku: 'ANODE-RD', desc: 'Anode rod assembly', qty: 312, value: 76, age: 144, action: 'Use in PL-2' },
];

export const customerMargin = [
  { customer: 'Marubeni JV', volume: 4200, gross: 38400, logistics: -2100, fx: +180, net: 36480 },
  { customer: 'Hindalco Group', volume: 2800, gross: 36200, logistics: -1850, fx: 0, net: 34350 },
  { customer: 'Sumitomo Trading', volume: 3600, gross: 39100, logistics: -2240, fx: +220, net: 37080 },
  { customer: 'Trafigura SEA', volume: 5100, gross: 37800, logistics: -2620, fx: +140, net: 35320 },
  { customer: 'Domestic OEM Pool', volume: 6400, gross: 34200, logistics: -980, fx: 0, net: 33220 },
];

export const receivables = [
  { customer: 'Hindalco Group', amount: 482, age: '60-90', risk: 'amber' },
  { customer: 'Marubeni JV', amount: 1240, age: '0-30', risk: 'green' },
  { customer: 'Trafigura SEA', amount: 386, age: '30-60', risk: 'green' },
  { customer: 'Domestic OEM Pool', amount: 218, age: '90+', risk: 'red' },
  { customer: 'Sumitomo Trading', amount: 644, age: '0-30', risk: 'green' },
];

export const auditLog = [
  { ts: '24-Apr 09:14', user: 'A. Patnaik', role: 'Plant Head', action: 'Approved', target: 'Anode change reschedule POT-3', why: 'Energy gain ₹2.1 Cr/mo > risk', impact: '₹2.1 Cr/mo' },
  { ts: '24-Apr 08:42', user: 'R. Menon', role: 'Procurement', action: 'Escalated', target: 'Rain CII force majeure', why: 'Single-source >70%', impact: '₹22 Cr exposure' },
  { ts: '24-Apr 08:10', user: 'S. Iyer', role: 'Commercial', action: 'Locked Quote', target: 'Marubeni 4,200t @ $2,612', why: 'LME +1.8%, capacity firm', impact: '₹9.4 Cr' },
  { ts: '23-Apr 18:32', user: 'CDO', role: 'CDO', action: 'Approved', target: 'Spot alumina 18,000 t Hydro', why: 'Coverage <8 days policy breach', impact: '₹14.8 Cr saved' },
  { ts: '23-Apr 16:05', user: 'M. Bhatia', role: 'Commercial', action: 'Flagged', target: 'Hindalco AR 60+', why: 'Aging policy trigger', impact: '₹0.4 Cr finance' },
];

export const pilot90Day = [
  { kpi: 'Specific Energy (kWh/kg)', baseline: 13.62, target: 13.20, current: 13.42, value: 86 },
  { kpi: 'Anode Effect Freq', baseline: 0.058, target: 0.035, current: 0.041, value: 32 },
  { kpi: 'Procurement Cycle (d)', baseline: 28, target: 18, current: 21, value: 18 },
  { kpi: 'Working Capital Released (₹ Cr)', baseline: 0, target: 84, current: 38, value: 38 },
  { kpi: 'Margin / ton (₹)', baseline: 36400, current: 38420, target: 39600, value: 124 },
];

export const copilotQA = [
  {
    q: 'Why is energy intensity up this week?',
    a: 'Specific energy is 13.42 kWh/kg, +1.8% vs 30-day baseline. Root cause analysis: 78% of variance traced to Potline-3 (Cells 211–238) showing voltage drift since Shift-B on 22-Apr. Anode setting deviation correlates with stub burn-off event at 02:14 IST.',
    sources: ['PI Historian (PL-3 voltage)', 'MES Cell-control logs', 'Shift handover notes 22-Apr B'],
    confidence: 0.91,
    actions: ['Reschedule anode change Cells 211–238', 'Validate metal pad height', 'Brief Shift-C supervisor'],
  },
  {
    q: 'Which pending decisions can release working capital fastest?',
    a: 'Three pending decisions can release ₹47.2 Cr working capital within 14 days: (1) D-304 slow-moving spares liquidation — ₹6.4 Cr, 7 days; (2) AR escalation Hindalco 60+ — ₹38.6 Cr, 14 days; (3) Reduce safety-stock buffer on AlF3 post-Hydro contract — ₹2.2 Cr, 10 days.',
    sources: ['SAP Inventory module', 'AR aging report', 'Procurement contracts'],
    confidence: 0.86,
    actions: ['Approve D-304', 'Trigger AR collection workflow', 'Update AlF3 reorder policy'],
  },
];
