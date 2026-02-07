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
  // New merged slide fields
  benchmarkData?: {
    dalmia: number;
    benchmark: number;
    gapValue: string;
  };
  loyaltyFeatures?: {
    icon: string;
    label: string;
    description: string;
  }[];
  salesCapabilities?: string[];
  salesImpact?: string;
  dealerDataSources?: string[];
  dealerOutputs?: string[];
  dealerImpact?: string;
  marketingCapabilities?: {
    icon: string;
    title: string;
    description: string;
  }[];
  marketingImpact?: string;
  loyaltyEvolution?: string;
  loyaltyImpact?: string;
  demandCapabilities?: string[];
  demandImpact?: string;
  o2cComponents?: string[];
  o2cImpact?: string;
}

export const dalmiaCementSlides: DalmiaCementSlide[] = [
  // Slide 1: Cover
  {
    id: 1,
    type: 'dalmia-cover',
    headline: 'Dalmia Cement — AI Commercial Transformation Blueprint',
    subtitle: 'From Transactional Tools to an AI-Powered Commercial Intelligence Platform',
    speakerNotes: 'Cement industry entering AI-led commercial era. Digital intelligence will define margin leadership.'
  },
  // Slide 2: CEO Imperative (unchanged)
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
  // Slide 3: Value Pools (unchanged)
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
  // Slide 4: Current State & Gap (MERGED from slides 4+5)
  {
    id: 4,
    type: 'dalmia-current-state',
    headline: 'Strong Digital Foundations — But Transactional',
    bullets: [
      '49,300 channel partners.',
      'SUVIDHA handles ~35% digital orders.',
      'SM@RT-D sales app.',
      'Dalmia Delight loyalty.',
      'DriverSathi logistics.'
    ],
    gap: 'Tools exist but no integrated AI intelligence layer.',
    benchmarkData: {
      dalmia: 35,
      benchmark: 93,
      gapValue: '₹200–500 Cr annual commercial value'
    },
    speakerNotes: 'Acknowledge strong foundation while highlighting the intelligence gap. Gap represents significant opportunity.'
  },
  // Slide 5: Vision & Architecture (MERGED from slides 6+7)
  {
    id: 5,
    type: 'dalmia-vision-architecture',
    headline: 'AI-Powered Commercial Intelligence Platform',
    content: [
      'Data',
      'AI Intelligence',
      'Agentic Workflows',
      'Digital Platform',
      'Revenue Growth'
    ],
    speakerNotes: 'Dalmia evolves from manufacturer to commercial platform. Build from data foundation up to customer-facing ecosystem.'
  },
  // Slide 6: AI Dynamic Pricing (unchanged)
  {
    id: 6,
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
  // Slide 7: Sales & Dealer Intelligence (MERGED from slides 9+10)
  {
    id: 7,
    type: 'dalmia-sales-dealer360',
    headline: 'Sales & Dealer Intelligence',
    salesCapabilities: [
      'Daily visit prioritization',
      'Next best product recommendations',
      'Churn alerts',
      'Territory optimization'
    ],
    salesImpact: '8–15% sales productivity uplift',
    dealerDataSources: [
      'SAP transactions',
      'SUVIDHA behaviour',
      'Loyalty engagement',
      'Field notes',
      'External market data'
    ],
    dealerOutputs: [
      'Dealer segmentation',
      'Dynamic credit scoring',
      'Growth potential scoring'
    ],
    dealerImpact: '₹50–100 Cr (Sales) + ₹30–60 Cr (Dealer 360)',
    speakerNotes: 'Transform existing sales app into intelligent copilot. Unified dealer view enables intelligent decision-making.'
  },
  // Slide 8: Marketing & Engagement (MERGED from slides 11+12)
  {
    id: 8,
    type: 'dalmia-marketing-engagement',
    headline: 'Marketing & Engagement',
    marketingCapabilities: [
      { icon: 'MapPin', title: 'Hyperlocal Detection', description: 'Construction hotspot identification' },
      { icon: 'Users', title: 'Contractor Intelligence', description: 'Influencer network tracking' },
      { icon: 'Languages', title: 'Regional Content', description: 'Auto-generated local language' },
      { icon: 'MessageSquare', title: 'WhatsApp Campaigns', description: 'Automated delivery' }
    ],
    marketingImpact: '20–30% marketing ROI improvement',
    loyaltyEvolution: 'Points Program → Engagement Ecosystem',
    loyaltyFeatures: [
      { icon: 'Sparkles', label: 'AI tier upgrades', description: 'Smart promotion based on behavior' },
      { icon: 'Gift', label: 'Personalized rewards', description: 'Tailored incentives per dealer' },
      { icon: 'Gamepad2', label: 'Gamification', description: 'Engaging mechanics' },
      { icon: 'Users', label: 'Contractor tracking', description: 'Influencer impact' }
    ],
    loyaltyImpact: '₹80–150 Cr + ₹40–80 Cr',
    speakerNotes: 'AI enables hyperlocal, personalized marketing at scale. Transform loyalty from cost center to engagement driver.'
  },
  // Slide 9: Supply Chain AI (MERGED from slides 13+14)
  {
    id: 9,
    type: 'dalmia-supply-chain',
    headline: 'Supply Chain AI',
    subtitle: 'Move from monthly Excel planning to AI-driven forecasting.',
    demandCapabilities: [
      'Weekly rolling forecasts',
      'Weather + infra data integration',
      'Scenario simulation'
    ],
    demandImpact: 'Forecast accuracy 65% → 85%. Working capital improvement ₹100–200 Cr.',
    o2cComponents: [
      'Smart order recommendations',
      'Real-time ATP availability',
      'AI credit scoring',
      'Auto invoicing',
      'AI cash application'
    ],
    o2cImpact: 'DSO reduction frees ₹150–300 Cr',
    speakerNotes: 'AI demand sensing reduces bullwhip effect. End-to-end O2C automation drives working capital efficiency.'
  },
  // Slide 10: Value Map
  {
    id: 10,
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
  // Slide 11: Roadmap & Ask
  {
    id: 11,
    type: 'dalmia-roadmap-ask',
    headline: 'Roadmap & Ask',
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
    kpis: [
      'Digital adoption',
      'Margin uplift',
      'DSO reduction',
      'Dealer retention'
    ],
    decision: 'Approve AI Commercial Transformation Program.',
    investment: '₹106–202 Cr',
    totalValue: '₹870–1,720 Cr',
    roi: '8–10×',
    speakerNotes: 'Phased approach balances quick wins with platform build. Clear ask for board decision.'
  }
];

export const totalDalmiaCementSlides = dalmiaCementSlides.length;
