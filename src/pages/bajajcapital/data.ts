// Synthetic Bajaj Capital demo data — illustrative only, no real client info

export const rmClients = [
  {
    id: 'BCD-1042', name: 'Aarav Mehta', segment: 'HNI · La Premier', aumBand: '$ 2.5–5M',
    lastContact: '12d', churnRisk: 71, uplift: 0.58,
    note: 'Two redemption queries in 30 days. Goal review overdue.',
    nextBest: 'Call · introduce SWP optimisation', products: ['MF', 'PMS', 'Insurance'],
  },
  {
    id: 'BCD-2189', name: 'Priya Nair', segment: 'Retail · Goal-based', aumBand: '$ 75–120K',
    lastContact: '4d', churnRisk: 22, uplift: 0.71,
    note: 'High propensity for top-up SIP after recent salary credit pattern.',
    nextBest: 'WhatsApp · SIP top-up suggestion', products: ['MF', 'NPS'],
  },
  {
    id: 'BCD-3041', name: 'Rohan Iyer', segment: 'Retail · Tax-saver', aumBand: '$ 30–60K',
    lastContact: '38d', churnRisk: 64, uplift: 0.18,
    note: 'Engagement falling. Persuadable score low — avoid hard cross-sell.',
    nextBest: 'Email · educational nudge only', products: ['MF', 'Term'],
  },
  {
    id: 'BCD-4502', name: 'Kavita Rao', segment: 'HNI · Ready to Retire', aumBand: '$ 800K–1.2M',
    lastContact: '7d', churnRisk: 41, uplift: 0.66,
    note: 'Within 18 months of retirement. Drawdown plan never modelled.',
    nextBest: 'Visit · RTR scenario walkthrough', products: ['MF', 'NPS', 'Annuity'],
  },
  {
    id: 'BCD-5078', name: 'Vikram Sethi', segment: 'Mass Affluent', aumBand: '$ 150–300K',
    lastContact: '21d', churnRisk: 33, uplift: 0.49,
    note: 'Recently added FD via competitor. Wallet-share alert.',
    nextBest: 'Call · debt allocation review', products: ['MF', 'FD', 'Health'],
  },
];

export const houseViewSources = [
  'House View — Demo · Oct 2025',
  'Equity Outlook — Demo · Q3 FY26',
  'Retirement Playbook — Demo v3.1',
  'Tax-Saver Comparison — Demo · Apr 2025',
  'Compliance Note — Suitability Pack',
];

export const rmBriefingTemplate = (clientName: string, segment: string) => ({
  bullets: [
    `**Context** — ${clientName} (${segment}) sits in the top quartile of persuadable accounts this fortnight per the uplift model.`,
    `**Talking point** — Anchor on goal progression and risk band; do not lead with product. House View flags small-cap caution and accumulation in large-cap quality.`,
    `**Suggested action** — Frame an SWP / debt-rebalance illustration first, then introduce one product nudge if engagement positive. Log outcome in CRM.`,
  ],
  citations: [
    'House View — Demo · Oct 2025',
    'Retirement Playbook — Demo v3.1',
    'Compliance Note — Suitability Pack',
  ],
});

export const opsFunnel = [
  { stage: 'Application started', count: 1280 },
  { stage: 'KYC submitted', count: 1140 },
  { stage: 'Docs verified', count: 980 },
  { stage: 'e-Mandate signed', count: 812 },
  { stage: 'First debit success', count: 744 },
];

export const opsThroughput = [
  { day: 'Mon', completed: 132, exceptions: 14 },
  { day: 'Tue', completed: 148, exceptions: 11 },
  { day: 'Wed', completed: 162, exceptions: 18 },
  { day: 'Thu', completed: 154, exceptions: 9 },
  { day: 'Fri', completed: 178, exceptions: 12 },
  { day: 'Sat', completed: 96, exceptions: 6 },
];

export const exceptionQueue = [
  { id: 'EX-7821', queue: 'KYC · address mismatch', age: '36h', reason: 'PAN address ≠ Aadhaar address', risk: 'Amber', owner: 'Unassigned' },
  { id: 'EX-7833', queue: 'Mandate · bank IFSC stale', age: '12h', reason: 'IFSC not in active list — bank merger', risk: 'Green', owner: 'Ops Pod 2' },
  { id: 'EX-7841', queue: 'Surveillance · payout anomaly', age: '4h', reason: 'Redemption $48K · 6 sigma vs cohort', risk: 'Red', owner: 'Surveillance' },
];

export const opsKpis = [
  { label: 'Applications in progress', value: '1,280', delta: '↑ 8% WoW', tone: 'blue' as const },
  { label: 'Avg onboarding TAT', value: '38h', delta: '↓ 6h vs target', tone: 'green' as const },
  { label: 'e-Mandate success rate', value: '71.3%', delta: '+2.1 pts after retry agent', tone: 'green' as const },
  { label: 'Exception backlog', value: '47', delta: '3 red · 14 amber · 30 green', tone: 'amber' as const },
];

export const swpAssumptions = {
  corpus: 1500000,
  withdrawal: 9000,
  growth: 7.0,
  inflation: 5.5,
  years: 25,
};

export function projectSWP(corpus: number, monthlyWd: number, growthPct: number, inflationPct: number, years: number) {
  const out: { yr: number; balance: number; withdrawal: number }[] = [];
  let bal = corpus;
  let wd = monthlyWd;
  const g = growthPct / 100;
  const inf = inflationPct / 100;
  for (let y = 1; y <= years; y++) {
    const annualWd = wd * 12;
    bal = Math.max(0, bal * (1 + g) - annualWd);
    out.push({ yr: y, balance: Math.round(bal), withdrawal: Math.round(annualWd) });
    wd = wd * (1 + inf);
    if (bal === 0) break;
  }
  return out;
}
