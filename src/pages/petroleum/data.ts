// Sample Zimbabwe petroleum business data
export const execKpis = {
  revenueToday: 1.84, // M USD
  revenueChange: 6.2,
  grossMargin: 8.7,
  grossMarginChange: -0.4,
  fuelKL: 2850,
  lpgRefills: 18400,
  lubricantsRev: 92, // K USD
  uptime: 96.8,
  depotStockDays: 4.6,
  stockoutSites: 7,
  tankerUtil: 78,
  tankersDelayed: 5,
  overdueB2B: 1.2, // M USD
  exceptions: 23,
};

export const revenueTrend = [
  { d: 'Mon', rev: 1.62, margin: 9.0 },
  { d: 'Tue', rev: 1.71, margin: 9.1 },
  { d: 'Wed', rev: 1.55, margin: 8.9 },
  { d: 'Thu', rev: 1.78, margin: 8.8 },
  { d: 'Fri', rev: 1.69, margin: 9.2 },
  { d: 'Sat', rev: 1.58, margin: 8.6 },
  { d: 'Sun', rev: 1.84, margin: 8.7 },
];

export const productMix = [
  { name: 'Petrol', value: 42, color: '#10b981' },
  { name: 'Diesel', value: 38, color: '#3b82f6' },
  { name: 'LPG', value: 14, color: '#f59e0b' },
  { name: 'Lubricants', value: 6, color: '#8b5cf6' },
];

export type Risk = 'Green' | 'Amber' | 'Red';

export const stations = [
  { id: 'ST-01', name: 'Avondale', city: 'Harare', region: 'Harare', revenue: 142000, fuel: 218, lpg: 1240, lub: 6800, margin: 8.4, stock: 62, variance: 2.8, risk: 'Red' as Risk, action: 'Investigate diesel wet-stock variance' },
  { id: 'ST-02', name: 'Borrowdale', city: 'Harare', region: 'Harare', revenue: 168000, fuel: 252, lpg: 1620, lub: 9200, margin: 9.1, stock: 71, variance: 0.9, risk: 'Green' as Risk, action: 'Maintain — strong cross-sell' },
  { id: 'ST-03', name: 'Bulawayo North', city: 'Bulawayo', region: 'Bulawayo', revenue: 134000, fuel: 248, lpg: 980, lub: 3400, margin: 7.8, stock: 58, variance: 1.4, risk: 'Amber' as Risk, action: 'Push lubricant counter-prompt' },
  { id: 'ST-04', name: 'Bulawayo CBD', city: 'Bulawayo', region: 'Bulawayo', revenue: 121000, fuel: 198, lpg: 1100, lub: 4100, margin: 8.6, stock: 54, variance: 1.1, risk: 'Green' as Risk, action: '—' },
  { id: 'ST-05', name: 'Mutare East', city: 'Mutare', region: 'Manicaland', revenue: 98000, fuel: 162, lpg: 720, lub: 2900, margin: 8.0, stock: 28, variance: 1.7, risk: 'Red' as Risk, action: 'Urgent LPG replenishment <36h' },
  { id: 'ST-06', name: 'Mutare West', city: 'Mutare', region: 'Manicaland', revenue: 88000, fuel: 148, lpg: 640, lub: 2600, margin: 8.3, stock: 47, variance: 0.8, risk: 'Green' as Risk, action: '—' },
  { id: 'ST-07', name: 'Gweru Central', city: 'Gweru', region: 'Midlands', revenue: 112000, fuel: 192, lpg: 880, lub: 3600, margin: 8.9, stock: 39, variance: 1.2, risk: 'Amber' as Risk, action: 'Diesel demand 18% above forecast' },
  { id: 'ST-08', name: 'Gweru South', city: 'Gweru', region: 'Midlands', revenue: 81000, fuel: 132, lpg: 540, lub: 2100, margin: 8.2, stock: 51, variance: 0.6, risk: 'Green' as Risk, action: '—' },
  { id: 'ST-09', name: 'Masvingo', city: 'Masvingo', region: 'Masvingo', revenue: 92000, fuel: 158, lpg: 690, lub: 2700, margin: 7.9, stock: 44, variance: 1.0, risk: 'Amber' as Risk, action: 'Trigger LPG refill reminders' },
  { id: 'ST-10', name: 'Chitungwiza', city: 'Chitungwiza', region: 'Harare', revenue: 124000, fuel: 208, lpg: 1480, lub: 3800, margin: 8.5, stock: 22, variance: 1.5, risk: 'Red' as Risk, action: 'LPG stock-out risk — divert tanker' },
  { id: 'ST-11', name: 'Kwekwe', city: 'Kwekwe', region: 'Midlands', revenue: 76000, fuel: 124, lpg: 510, lub: 1900, margin: 8.1, stock: 49, variance: 0.7, risk: 'Green' as Risk, action: '—' },
  { id: 'ST-12', name: 'Victoria Falls', city: 'Vic Falls', region: 'Matabeleland N', revenue: 104000, fuel: 168, lpg: 580, lub: 4400, margin: 9.4, stock: 56, variance: 0.5, risk: 'Green' as Risk, action: 'Tourism cross-sell winning' },
];

export const depots = [
  { id: 'DP-HRE', name: 'Harare Depot', petrol: 72, diesel: 58, lpg: 41, daysCover: 5.2 },
  { id: 'DP-BYO', name: 'Bulawayo Depot', petrol: 64, diesel: 70, lpg: 38, daysCover: 4.8 },
  { id: 'DP-MUT', name: 'Mutare Depot', petrol: 48, diesel: 52, lpg: 22, daysCover: 3.1 },
  { id: 'DP-GWE', name: 'Gweru Depot', petrol: 56, diesel: 61, lpg: 35, daysCover: 4.4 },
];

export const tankers = [
  { id: 'ZW-TK-118', driver: 'T. Moyo', route: 'Harare → Chitungwiza', product: 'LPG', status: 'Delayed', eta: '+72 min', risk: 'Red' as Risk, action: 'Re-route via alt corridor' },
  { id: 'ZW-TK-092', driver: 'P. Ncube', route: 'Bulawayo → Gweru', product: 'Diesel', status: 'On route', eta: 'On time', risk: 'Amber' as Risk, action: 'Receipt mismatch flagged' },
  { id: 'ZW-TK-145', driver: 'R. Sibanda', route: 'Harare → Mutare', product: 'Petrol', status: 'Delayed', eta: '+48 min', risk: 'Amber' as Risk, action: 'Repeated route delays — review' },
  { id: 'ZW-TK-203', driver: 'L. Chigumba', route: 'Mutare → Mutare East', product: 'LPG', status: 'Dispatched', eta: '35 min', risk: 'Green' as Risk, action: '—' },
  { id: 'ZW-TK-077', driver: 'K. Dube', route: 'Bulawayo → Vic Falls', product: 'Diesel', status: 'On route', eta: 'On time', risk: 'Green' as Risk, action: '—' },
  { id: 'ZW-TK-160', driver: 'S. Mhuri', route: 'Gweru → Kwekwe', product: 'Petrol', status: 'Loading', eta: '90 min', risk: 'Green' as Risk, action: '—' },
];

export const lpgOutlets = [
  { name: 'Chitungwiza', refills: 1480, repeat: 62, stockHrs: 28, safety: 'OK' },
  { name: 'Avondale', refills: 1240, repeat: 71, stockHrs: 92, safety: 'OK' },
  { name: 'Borrowdale', refills: 1620, repeat: 78, stockHrs: 110, safety: 'OK' },
  { name: 'Mutare East', refills: 720, repeat: 48, stockHrs: 30, safety: 'Overdue 6d' },
  { name: 'Bulawayo North', refills: 980, repeat: 55, stockHrs: 84, safety: 'OK' },
  { name: 'Masvingo', refills: 690, repeat: 39, stockHrs: 76, safety: 'Overdue 5d' },
];

export const lpgTrend = [
  { m: 'May', refills: 14200 },
  { m: 'Jun', refills: 15100 },
  { m: 'Jul', refills: 15800 },
  { m: 'Aug', refills: 16400 },
  { m: 'Sep', refills: 17200 },
  { m: 'Oct', refills: 18400 },
];

export const lubricantSkus = [
  { sku: 'Engine Oil 20W-50 4L', velocity: 'High', region: 'Harare', margin: 22, action: 'Push at fleet sites' },
  { sku: 'Engine Oil 15W-40 5L', velocity: 'High', region: 'Bulawayo', margin: 24, action: 'Maintain' },
  { sku: 'Gear Oil 90 1L', velocity: 'Slow', region: 'Bulawayo', margin: 18, action: 'Reallocate to Harare' },
  { sku: 'Brake Fluid DOT-4', velocity: 'Slow', region: 'Mutare', margin: 27, action: 'Bundle with diesel' },
  { sku: 'Hydraulic Oil 68', velocity: 'Medium', region: 'Gweru', margin: 19, action: 'Mining segment push' },
  { sku: 'Grease MP-3 Cartridge', velocity: 'Slow', region: 'Bulawayo', margin: 21, action: 'Reallocate to Harare' },
];

export const b2bCustomers = [
  { name: 'Alpha Transport', segment: 'Transport', revenue: 412000, margin: 6.2, exposure: 186000, overdueDays: 47, risk: 'Red' as Risk, action: 'Hold credit, prioritize collection' },
  { name: 'Zim Mining Co', segment: 'Mining', revenue: 684000, margin: 5.8, exposure: 92000, overdueDays: 12, risk: 'Amber' as Risk, action: 'Pricing exception review' },
  { name: 'Falcon Construction', segment: 'Construction', revenue: 248000, margin: 7.1, exposure: 64000, overdueDays: 18, risk: 'Amber' as Risk, action: 'Volume below contract' },
  { name: 'Highveld Agro', segment: 'Agriculture', revenue: 198000, margin: 8.4, exposure: 22000, overdueDays: 4, risk: 'Green' as Risk, action: '—' },
  { name: 'Harare Industrial', segment: 'Industrial', revenue: 312000, margin: 7.9, exposure: 41000, overdueDays: 9, risk: 'Green' as Risk, action: '—' },
  { name: 'Min. of Public Works', segment: 'Government', revenue: 524000, margin: 6.4, exposure: 218000, overdueDays: 31, risk: 'Amber' as Risk, action: 'Escalate via account director' },
  { name: 'Eastern Logistics', segment: 'Transport', revenue: 178000, margin: 6.9, exposure: 88000, overdueDays: 22, risk: 'Amber' as Risk, action: 'Below contracted volume' },
  { name: 'Granite Quarries', segment: 'Mining', revenue: 142000, margin: 7.3, exposure: 36000, overdueDays: 7, risk: 'Green' as Risk, action: '—' },
];

export const reconciliation = [
  { loc: 'Avondale', product: 'Diesel', sales: 84200, physical: 81950, finance: 84050, variance: 2250, risk: 92, action: 'Investigate nozzle calibration' },
  { loc: 'Mutare East', product: 'Mobile Money', sales: 22400, physical: 22400, finance: 19800, variance: 2600, risk: 78, action: 'Finance to chase MNO settlement' },
  { loc: 'Borrowdale', product: 'Petrol', sales: 96800, physical: 96420, finance: 96800, variance: 380, risk: 12, action: 'Within evaporation threshold' },
  { loc: 'Chitungwiza', product: 'LPG', sales: 41200, physical: 41100, finance: 41200, variance: 100, risk: 8, action: '—' },
  { loc: 'Tanker ZW-TK-092', product: 'Diesel dispatch', sales: 0, physical: 28000, finance: 26200, variance: 1800, risk: 84, action: 'Depot-station receipt mismatch' },
  { loc: 'Bulawayo North', product: 'Card settlement', sales: 38600, physical: 38600, finance: 36100, variance: 2500, risk: 62, action: 'Card processor delay (T+2)' },
];

export const ceoActions = [
  { title: 'Replenish LPG stock at Chitungwiza', owner: 'Logistics — T. Banda', priority: 'P1', due: 'Today 18:00', impact: 'Prevent USD 28K stock-out loss', status: 'In progress', next: 'Confirm tanker ZW-TK-118 ETA' },
  { title: 'Investigate wet-stock variance at Avondale', owner: 'Retail Ops — N. Madziva', priority: 'P1', due: 'Today EOD', impact: '2.8% diesel variance — USD 11K exposure', status: 'Open', next: 'Reconcile tank gauge vs POS' },
  { title: 'Follow up overdue customer Alpha Transport', owner: 'Credit — R. Mpofu', priority: 'P1', due: 'Tomorrow 12:00', impact: 'USD 186K overdue, growing exposure', status: 'Open', next: 'Hold further credit; CFO approval' },
  { title: 'Reallocate lubricant stock Bulawayo → Harare', owner: 'Supply — J. Sibanda', priority: 'P2', due: 'This week', impact: 'USD 14K monthly margin uplift', status: 'Open', next: 'Generate transfer order' },
  { title: 'Review delayed tanker route Harare → Mutare', owner: 'Logistics — T. Banda', priority: 'P2', due: 'Friday', impact: 'Repeat SLA breach risk', status: 'Open', next: 'Vendor performance review' },
];

export const copilotQA = [
  {
    q: 'Which stations are at stock-out risk today?',
    a: '7 sites flagged. Highest urgency: **Chitungwiza** (LPG, <36h cover), **Mutare East** (LPG, ~30h), **Avondale** (diesel variance compounding cover loss). Recommended: divert ZW-TK-118 to Chitungwiza, dispatch ZW-TK-203 to Mutare East.',
    sources: ['Depot stock feed', 'Site sales velocity', 'Tanker positions'],
  },
  {
    q: 'Where are we losing margin?',
    a: 'Gross margin down **0.4 pp** to 8.7%. Drivers: (1) diesel wet-stock variance at Avondale & ZW-TK-092 receipt mismatch (~USD 13K), (2) lubricant under-conversion at Bulawayo North (USD 9K opportunity), (3) pricing exceptions in Mining segment (1.2 pp below target).',
    sources: ['Reconciliation engine', 'Site margin model', 'Pricing audit'],
  },
  {
    q: 'Show me LPG growth opportunities.',
    a: 'LPG MoM up **7.0%**. Top growth pockets: **Chitungwiza** (+24% above monthly avg), **Borrowdale** (78% repeat), **Bulawayo CBD**. Add 2 weekly replenishment slots Chitungwiza; trigger refill reminders at Masvingo (low repeat 39%).',
    sources: ['LPG demand model', 'Refill cycle data', 'Outlet stock feed'],
  },
  {
    q: 'Which B2B customers need collection follow-up?',
    a: 'Top 3: **Alpha Transport** (USD 186K, 47 days overdue, declining volume — hold credit), **Min. of Public Works** (USD 218K, 31 days — escalate to account director), **Eastern Logistics** (USD 88K, 22 days — below contracted volume).',
    sources: ['AR ledger', 'Contract compliance', 'Sales pipeline'],
  },
  {
    q: 'Which tanker routes are delayed?',
    a: '5 tankers delayed today. Critical: **ZW-TK-118** (Harare → Chitungwiza, +72m, LPG stock-out impact), **ZW-TK-145** (Harare → Mutare, +48m, recurring). Route Harare ↔ Mutare shows pattern over 14 days — recommend vendor & corridor review.',
    sources: ['GPS telemetry', 'Planned dispatch', 'SLA log'],
  },
  {
    q: 'Why did gross margin drop today?',
    a: 'Net -0.4 pp. Decomposition: wet-stock variance -0.18 pp, lubricant mix -0.11 pp, B2B pricing exceptions -0.09 pp, fuel cost pass-through lag -0.02 pp.',
    sources: ['Margin bridge', 'Reconciliation', 'Pricing engine'],
  },
  {
    q: 'Which sites should receive LPG replenishment first?',
    a: 'Priority sequence: **1. Chitungwiza** (28h cover, 1,480 refills/day), **2. Mutare East** (30h cover), **3. Masvingo** (refill cycle gap). Combined avoided loss ~USD 64K.',
    sources: ['Stock cover model', 'Refill velocity', 'Tanker availability'],
  },
  {
    q: 'What should the CEO focus on tomorrow morning?',
    a: '3 priorities: (1) Confirm Chitungwiza LPG replenishment landed, (2) Review Avondale wet-stock investigation outcome, (3) Sign off credit hold on Alpha Transport. Margin recovery target: +0.3 pp by EOW.',
    sources: ['Action tracker', 'Exception queue', 'CEO briefing'],
  },
];

export const walkthrough = [
  { step: 1, title: 'Single CEO View', body: 'Retail, LPG, logistics, B2B and finance — one operating picture. No more chasing 6 spreadsheets across 4 systems.' },
  { step: 2, title: 'Exceptions Surfaced Early', body: 'DiscvrAI detects margin leakage, stock-out risk, dispatch delay and credit exposure before they become losses.' },
  { step: 3, title: 'AI Explains the Why', body: 'Every exception comes with reasoning, business impact and the recommended action — backed by source data.' },
  { step: 4, title: 'Owners and Tracking', body: 'Actions are assigned with owner, priority, due date. Operating rhythm replaces ad-hoc firefighting.' },
  { step: 5, title: 'Reactive → Proactive', body: 'Leadership shifts from reading MIS to running the business. Decisions in minutes, not days.' },
];
