export interface DalmiaCementSlide {
  id: number;
  type: string;
  headline: string;
  speakerNotes: string;
  subtitle?: string;
  bullets?: string[];
  gap?: string;
  content?: string[];
  problem?: string;
  solution?: string[];
  impact?: string;
  capabilities?: string[];
  outcome?: string;
  evolution?: string;
  features?: string[];
  target?: string;
  components?: string[];
  dataSources?: string[];
  outputs?: string[];
  phases?: {
    name: string;
    timeline: string;
    items: string[];
  }[];
  valuePools?: {
    title: string;
    items: string[];
  }[];
  valueTable?: {
    initiative: string;
    value: string;
  }[];
  totalValue?: string;
  investment?: string;
  roi?: string;
  kpis?: string[];
  decision?: string;
}

export const dalmiaCementSlides: DalmiaCementSlide[] = [
  {
    id: 1,
    type: 'dalmia-cover',
    headline: 'Dalmia Cement — AI Commercial Transformation Blueprint',
    subtitle: 'From Transactional Tools to an AI-Powered Commercial Intelligence Platform',
    speakerNotes: 'Cement industry entering AI-led commercial era. Digital intelligence will define margin leadership.'
  },
  {
    id: 2,
    type: 'dalmia-imperative',
    headline: 'Cement industry shifting from production advantage to commercial intelligence advantage.',
    bullets: [
      'Capacity expansion no longer enough.',
      'Pricing, demand sensing and digital engagement becoming competitive differentiators.',
      'Global leaders building digital customer platforms.',
      'AI transforming B2B sales workflows.'
    ],
    speakerNotes: 'Frame urgency. Industry moving toward AI-native commercial operations.'
  },
  {
    id: 3,
    type: 'dalmia-value-pools',
    headline: 'Three Value Pools',
    valuePools: [
      {
        title: 'Revenue Growth',
        items: ['Dynamic pricing', 'Precision selling', 'Digital ecosystem monetization']
      },
      {
        title: 'Cost Reduction',
        items: ['Sales efficiency', 'Marketing optimization', 'Touchless O2C']
      },
      {
        title: 'Retention',
        items: ['Dealer intelligence', 'Loyalty personalization', 'Predictive engagement']
      }
    ],
    speakerNotes: 'Three distinct value pools representing commercial transformation opportunity.'
  },
  {
    id: 4,
    type: 'dalmia-today',
    headline: 'Strong Digital Foundations — But Transactional',
    bullets: [
      '49,300 channel partners.',
      'SUVIDHA handles ~35% digital orders.',
      'SM@RT-D sales app.',
      'Dalmia Delight loyalty.',
      'DriverSathi logistics.'
    ],
    gap: 'Tools exist but no integrated AI intelligence layer.',
    speakerNotes: 'Acknowledge strong foundation while highlighting the intelligence gap.'
  },
  {
    id: 5,
    type: 'dalmia-benchmark',
    headline: 'Digital Penetration Opportunity',
    content: [
      'Dalmia digital order penetration: ~35%',
      'Global benchmark (CEMEX GO): ~93%',
      'Gap represents ₹200–500 Cr annual commercial value.'
    ],
    speakerNotes: 'Position gap as opportunity, not weakness.'
  },
  {
    id: 6,
    type: 'dalmia-northstar',
    headline: 'AI-Powered Commercial Intelligence Platform',
    content: [
      'Data',
      'AI Intelligence',
      'Agentic Workflows',
      'Digital Platform',
      'Revenue Growth'
    ],
    speakerNotes: 'Dalmia evolves from manufacturer to commercial platform.'
  },
  {
    id: 7,
    type: 'dalmia-capability-stack',
    headline: 'Four-Layer Capability Stack',
    speakerNotes: 'Build from data foundation up to customer-facing ecosystem.'
  },
  {
    id: 8,
    type: 'dalmia-pricing',
    headline: 'AI Dynamic Pricing',
    problem: 'Pricing decisions manual and inconsistent.',
    solution: [
      'Real-time price corridor recommendations.',
      'Competitive monitoring.',
      'Quote automation.',
      'Margin leakage alerts.'
    ],
    impact: '1–2% realization uplift = ₹140–280 Cr annually',
    speakerNotes: 'Pricing is the highest-impact lever for margin improvement.'
  },
  {
    id: 9,
    type: 'dalmia-sales',
    headline: 'SM@RT-D Evolves into AI Sales Copilot',
    capabilities: [
      'Daily visit prioritization.',
      'Next best product recommendations.',
      'Churn alerts.',
      'Territory optimization.'
    ],
    impact: '8–15% sales productivity uplift',
    speakerNotes: 'Transform existing sales app into intelligent copilot.'
  },
  {
    id: 10,
    type: 'dalmia-dealer360',
    headline: 'Dealer 360 Platform',
    dataSources: [
      'SAP transactions',
      'SUVIDHA behaviour',
      'Loyalty engagement',
      'Field notes',
      'External market data'
    ],
    outputs: [
      'Dealer segmentation.',
      'Dynamic credit scoring.',
      'Growth potential scoring.'
    ],
    speakerNotes: 'Unified dealer view enables intelligent decision-making.'
  },
  {
    id: 11,
    type: 'dalmia-marketing',
    headline: 'AI Marketing Demand Engine',
    capabilities: [
      'Hyperlocal construction hotspot detection.',
      'Contractor influencer intelligence.',
      'Regional language content automation.',
      'WhatsApp campaign automation.'
    ],
    outcome: '20–30% marketing ROI improvement',
    speakerNotes: 'AI enables hyperlocal, personalized marketing at scale.'
  },
  {
    id: 12,
    type: 'dalmia-loyalty',
    headline: 'Loyalty 2.0',
    evolution: 'Points program → Engagement ecosystem',
    features: [
      'AI tier upgrades.',
      'Personalized rewards.',
      'Gamification.',
      'Contractor influence tracking.'
    ],
    speakerNotes: 'Transform loyalty from cost center to engagement driver.'
  },
  {
    id: 13,
    type: 'dalmia-demand',
    headline: 'Demand Sensing & S&OP',
    subtitle: 'Move from monthly Excel planning to AI-driven forecasting.',
    capabilities: [
      'Weekly rolling forecasts.',
      'Weather + infra data integration.',
      'Scenario simulation.'
    ],
    impact: 'Forecast accuracy ~65% → ~85%. Working capital improvement ₹100–200 Cr.',
    speakerNotes: 'AI demand sensing reduces bullwhip effect and improves inventory.'
  },
  {
    id: 14,
    type: 'dalmia-o2c',
    headline: 'Order to Cash AI',
    components: [
      'Smart order recommendations.',
      'Real-time ATP availability.',
      'AI credit scoring.',
      'Auto invoicing.',
      'AI cash application.'
    ],
    impact: 'DSO reduction frees ₹150–300 Cr',
    speakerNotes: 'End-to-end O2C automation drives working capital efficiency.'
  },
  {
    id: 15,
    type: 'dalmia-suvidha',
    headline: 'SUVIDHA 2.0',
    subtitle: 'Transform SUVIDHA into digital ecosystem.',
    features: [
      'Smart ordering.',
      'Live delivery tracking.',
      'Digital payments.',
      'Loyalty integration.',
      'Market intelligence dashboard.'
    ],
    target: '80%+ digital sales in 24 months',
    speakerNotes: 'SUVIDHA becomes the commercial platform, not just ordering tool.'
  },
  {
    id: 16,
    type: 'dalmia-valuemap',
    headline: 'Value Map',
    valueTable: [
      { initiative: 'AI Pricing', value: '₹140–280 Cr' },
      { initiative: 'Sales Intelligence', value: '₹50–100 Cr' },
      { initiative: 'Dealer 360', value: '₹30–60 Cr' },
      { initiative: 'AI Marketing', value: '₹80–150 Cr' },
      { initiative: 'Loyalty', value: '₹40–80 Cr' },
      { initiative: 'Demand Planning', value: '₹140–280 Cr' },
      { initiative: 'O2C Automation', value: '₹190–370 Cr' }
    ],
    totalValue: '₹870–1,720 Cr',
    investment: '₹106–202 Cr',
    roi: '8–10×',
    speakerNotes: 'Clear ROI case for board approval.'
  },
  {
    id: 17,
    type: 'dalmia-roadmap',
    headline: '24 Month Roadmap',
    phases: [
      {
        name: 'Phase 1',
        timeline: '0–6 months',
        items: ['Fix SUVIDHA', 'Build data lake', 'Pilot pricing AI']
      },
      {
        name: 'Phase 2',
        timeline: '6–15 months',
        items: ['Rollout pricing', 'Demand sensing', 'Dealer 360']
      },
      {
        name: 'Phase 3',
        timeline: '15–24 months',
        items: ['Scale adoption to 80% digital']
      }
    ],
    speakerNotes: 'Phased approach balances quick wins with platform build.'
  },
  {
    id: 18,
    type: 'dalmia-operating-model',
    headline: 'Operating Model & Ask',
    subtitle: 'Commercial Digital Hub',
    kpis: [
      'Digital adoption',
      'Margin uplift',
      'DSO reduction',
      'Dealer retention'
    ],
    decision: 'Approve AI commercial transformation program.',
    speakerNotes: 'Clear ask for board decision. Define success metrics upfront.'
  }
];

export const totalDalmiaCementSlides = dalmiaCementSlides.length;
