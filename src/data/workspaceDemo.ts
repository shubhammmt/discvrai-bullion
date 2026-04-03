// WorkspaceOne Demo — All mock data

export const morningMailSections = [
  {
    title: 'Market Pulse',
    content: 'Nifty 50 closed at 22,147 (+0.8%), led by banking and IT. FIIs were net buyers at ₹1,240 Cr. Global cues remain mixed with US 10Y at 4.32%.',
    source: 'BSE/NSE EOD Data, 14 Mar 2025',
    confidence: 'high' as const,
  },
  {
    title: 'Results Today',
    content: 'HDFC Bank Q3 PAT at ₹16,372 Cr (+33% YoY), NIM steady at 3.6%. Infosys guides 4–5% CC growth for FY25, below consensus.',
    source: 'Company Filings, BSE',
    confidence: 'high' as const,
  },
  {
    title: 'House Notes',
    content: 'Initiating coverage on Zomato with BUY, TP ₹280. Quick commerce segment likely EBITDA positive by Q2 FY26. Maintain SELL on Paytm — regulatory overhang persists.',
    source: 'Dam Capital Internal Research, 13 Mar',
    confidence: 'medium' as const,
  },
  {
    title: 'IPO / Block Activity',
    content: 'Ola Electric IPO opens 2 Aug — grey market premium at ~15%. Block deal: Kotak MF sold 1.2% stake in SBI Life at ₹1,410/share.',
    source: 'Market Intelligence Desk',
    confidence: 'high' as const,
  },
];

export const beforeChecklist = [
  { step: 'Gather data from 5+ sources', time: '15 min' },
  { step: 'Curate relevant items', time: '10 min' },
  { step: 'Assemble into document', time: '15 min' },
  { step: 'Compose commentary', time: '20 min' },
  { step: 'Format & proofread', time: '10 min' },
];

export const resultsExtractedData = [
  { metric: 'Revenue', current: '₹28,470 Cr', prior: '₹24,120 Cr', change: '+18.0%', confidence: 'high' as const },
  { metric: 'EBITDA', current: '₹8,240 Cr', prior: '₹6,890 Cr', change: '+19.6%', confidence: 'high' as const },
  { metric: 'PAT', current: '₹5,120 Cr', prior: '₹4,310 Cr', change: '+18.8%', confidence: 'high' as const },
  { metric: 'EPS (₹)', current: '34.2', prior: '28.7', change: '+19.2%', confidence: 'high' as const },
  { metric: 'NIM (%)', current: '3.62', prior: '3.58', change: '+4 bps', confidence: 'medium' as const },
  { metric: 'GNPA (%)', current: '1.24', prior: '1.32', change: '-8 bps', confidence: 'high' as const },
  { metric: 'NNPA (%)', current: '0.31', prior: '0.36', change: '-5 bps', confidence: 'high' as const },
  { metric: 'CASA Ratio', current: '42.8%', prior: '44.1%', change: '-130 bps', confidence: 'medium' as const },
  { metric: 'Cost-to-Income', current: '40.2%', prior: '42.5%', change: '-230 bps', confidence: 'high' as const },
  { metric: 'RoA (%)', current: '1.92', prior: '1.84', change: '+8 bps', confidence: 'high' as const },
  { metric: 'RoE (%)', current: '16.8', prior: '15.4', change: '+140 bps', confidence: 'medium' as const },
  { metric: 'Book Value/Share', current: '₹412', prior: '₹378', change: '+9.0%', confidence: 'high' as const },
];

export const anchorInvestors = [
  { investor: 'SBI Mutual Fund', category: 'DII', amount: 450, bucket: 'Anchor', mapped: true },
  { investor: 'Goldman Sachs FII', category: 'FII', amount: 380, bucket: 'Anchor', mapped: true },
  { investor: 'HDFC Life Insurance', category: 'DII', amount: 320, bucket: 'Anchor', mapped: true },
  { investor: 'Morgan Stanley Asia', category: 'FII', amount: 290, bucket: 'Anchor', mapped: true },
  { investor: 'Kotak AMC', category: 'DII', amount: 275, bucket: 'Anchor', mapped: true },
  { investor: 'Abu Dhabi Investment', category: 'FII', amount: 250, bucket: 'Anchor', mapped: true },
  { investor: 'ICICI Prudential MF', category: 'DII', amount: 220, bucket: 'Anchor', mapped: true },
  { investor: 'Fidelity Intl', category: 'FII', amount: 200, bucket: 'Anchor', mapped: true },
  { investor: 'Nippon India MF', category: 'DII', amount: 180, bucket: 'Non-Anchor', mapped: true },
  { investor: 'BlackRock', category: 'FII', amount: 160, bucket: 'Non-Anchor', mapped: true },
];

export const transformRules = [
  'Normalised column headers',
  'Mapped investor category (DII/FII)',
  'Converted amounts to ₹ Cr',
  'Classified allocation bucket',
  'De-duplicated investor entries',
  'Applied SEBI naming conventions',
];

export const drhpSections = [
  { id: 'risk', title: 'Risk Factors', pages: '42–89', summary: 'Key risks include regulatory changes in digital payments, concentration in top-5 clients (38% revenue), and forex exposure on international operations.' },
  { id: 'business', title: 'Business Overview', pages: '90–156', summary: 'Leading fintech platform with 45M+ users. Three segments: Payments (62%), Lending (24%), Insurance (14%). Present in 650+ cities.' },
  { id: 'financials', title: 'Financial Statements', pages: '157–234', summary: 'Revenue CAGR 34% (FY22–24). First full-year EBITDA positive in FY24. Cash position: ₹4,200 Cr.' },
  { id: 'legal', title: 'Legal & Regulatory', pages: '235–278', summary: 'RBI-licensed NBFC. No material litigation pending. Compliance with DPDI Act in progress.' },
  { id: 'objects', title: 'Objects of the Issue', pages: '279–295', summary: '₹2,500 Cr fresh issue for technology infrastructure, ₹1,800 Cr for inorganic growth, balance for general corporate purposes.' },
];

export const generatedInvite = {
  headline: 'Investment Opportunity: TechFin India Ltd — IPO',
  strengths: [
    'Market leader in digital payments with 45M+ active users and 34% revenue CAGR',
    'Successfully achieved EBITDA breakeven in FY24 with clear path to PAT profitability',
    'Diversified revenue across payments, lending and insurance — reducing single-segment risk',
  ],
  financials: [
    { label: 'Revenue FY24', value: '₹8,420 Cr' },
    { label: 'EBITDA FY24', value: '₹340 Cr' },
    { label: 'Issue Size', value: '₹4,300 Cr' },
    { label: 'Price Band', value: '₹440–460' },
  ],
  citation: 'Sourced from DRHP Sections: Business Overview (pp. 90–156), Financial Statements (pp. 157–234), Objects of Issue (pp. 279–295)',
};

export const redlineChanges = [
  {
    original: 'The company has achieved breakeven at the operating level in the current fiscal year.',
    revised: 'The company has achieved EBITDA breakeven at the operating level in FY24, with a clear trajectory toward PAT profitability by H2 FY26.',
    changeType: 'Strengthened with specifics',
  },
  {
    original: 'Risk factors include regulatory and competitive pressures.',
    revised: 'Key risk factors include evolving RBI regulations on digital lending and intensifying competition from UPI-native players.',
    changeType: 'Added specificity from Risk Factors section',
  },
];

export const auditTrail = [
  { id: 1, timestamp: '09:00:12', event: 'Ingest', detail: 'Morning mail data sources ingested (BSE, NSE, Reuters)', user: 'System', module: 'Research' },
  { id: 2, timestamp: '09:00:45', event: 'Extract', detail: 'Extracted 24 data points from 5 source documents', user: 'System', module: 'Research' },
  { id: 3, timestamp: '09:01:22', event: 'Draft', detail: 'AI draft generated for morning mail — 4 sections, 312 words', user: 'AI Engine v2.1', module: 'Research' },
  { id: 4, timestamp: '09:15:00', event: 'Review', detail: 'Analyst reviewed draft, edited 2 paragraphs', user: 'Priya Sharma', module: 'Research' },
  { id: 5, timestamp: '09:22:30', event: 'Approve', detail: 'Morning mail approved for distribution', user: 'Rajesh Iyer (Head of Research)', module: 'Research' },
  { id: 6, timestamp: '09:23:01', event: 'Export', detail: 'Mail queued to 2,400 recipients via SendGrid', user: 'System', module: 'Research' },
  { id: 7, timestamp: '14:30:00', event: 'Ingest', detail: 'DRHP uploaded — TechFin India Ltd (PDF, 312 pages)', user: 'Amit Desai', module: 'IB' },
  { id: 8, timestamp: '14:30:42', event: 'Extract', detail: 'Document parsed: 5 sections identified, 89 tables extracted', user: 'AI Engine v2.1', module: 'IB' },
  { id: 9, timestamp: '14:32:15', event: 'Draft', detail: 'Investor invite generated — 1 page, 3 strengths, financials table', user: 'AI Engine v2.1', module: 'IB' },
  { id: 10, timestamp: '15:10:00', event: 'Review', detail: 'IB analyst reviewed invite, approved citations', user: 'Kiran Patel', module: 'IB' },
  { id: 11, timestamp: '15:15:30', event: 'Approve', detail: 'Invite approved for client distribution', user: 'Sanjay Gupta (MD, IB)', module: 'IB' },
  { id: 12, timestamp: '16:00:00', event: 'Ingest', detail: 'Anchor book — Exchange notice + Sheet1 CSV uploaded', user: 'Meera Joshi', module: 'IB' },
  { id: 13, timestamp: '16:00:28', event: 'Extract', detail: 'CSV parsed: 10 investors, 6 transform rules applied', user: 'System', module: 'IB' },
  { id: 14, timestamp: '16:01:05', event: 'Draft', detail: 'Sheet2 internal format generated with DII/FII classification', user: 'System', module: 'IB' },
  { id: 15, timestamp: '17:00:00', event: 'Ingest', detail: 'MF monthly holdings file uploaded — 1,240 rows, 45 funds', user: 'Research Ops', module: 'MIS' },
  { id: 16, timestamp: '17:01:12', event: 'Extract', detail: 'Validated against schema; 3 rows flagged for review', user: 'System', module: 'MIS' },
  { id: 17, timestamp: '17:05:30', event: 'Draft', detail: 'Dashboard version v14.2 published — MoM deltas computed', user: 'System', module: 'MIS' },
  { id: 18, timestamp: '17:10:00', event: 'Approve', detail: 'ECM weekly banker cut approved for distribution', user: 'Sanjay Gupta (MD, IB)', module: 'MIS' },
];

export const platformLayers = [
  {
    id: 'P1',
    name: 'Secure Store',
    description: 'All documents live in one encrypted, access-controlled vault — no more scattered folders or email attachments.',
    usedBy: ['research', 'ib'] as const,
    icon: 'database' as const,
  },
  {
    id: 'P2',
    name: 'Document Extraction',
    description: 'PDFs, Excel files and notices are automatically read and structured — no more copy-pasting from 500-page documents.',
    usedBy: ['research', 'ib'] as const,
    icon: 'file-scan' as const,
  },
  {
    id: 'P3',
    name: 'Templates & Schemas',
    description: 'Every output follows your house format — morning mails, investor invites, anchor books all use consistent templates.',
    usedBy: ['research', 'ib'] as const,
    icon: 'layout-template' as const,
  },
  {
    id: 'P4',
    name: 'AI / RAG Engine',
    description: 'AI drafts content with citations to source documents — never fabricates. Every claim links back to a real source.',
    usedBy: ['research', 'ib'] as const,
    icon: 'brain' as const,
  },
  {
    id: 'P5',
    name: 'Audio → Transcript',
    description: 'Earnings calls and meetings are transcribed automatically — searchable, quotable, time-stamped.',
    usedBy: ['research'] as const,
    icon: 'mic' as const,
  },
  {
    id: 'P6',
    name: 'Workflow & Approvals',
    description: 'Nothing goes out without human sign-off. Every draft moves through review → approve → send.',
    usedBy: ['research', 'ib'] as const,
    icon: 'git-branch' as const,
  },
  {
    id: 'P7',
    name: 'Connectors',
    description: 'Upload files today; connect to Bloomberg, Reuters, BSE feeds tomorrow — same platform, more automation over time.',
    usedBy: ['research', 'ib'] as const,
    icon: 'plug' as const,
  },
  {
    id: 'P8',
    name: 'Audit & Access Control',
    description: 'Every action is logged — who accessed what, when, and why. RBI and SEBI audit-ready from day one.',
    usedBy: ['research', 'ib'] as const,
    icon: 'shield-check' as const,
  },
];
