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
    headline: 'Dalmia Cement — Commercial Intelligence Transformation',
    subtitle: 'From Transactional Tools to AI-Powered Revenue Engine',
    speakerNotes: 'Cement industry entering AI-led commercial era. Digital intelligence will define margin leadership.'
  },
  // Slide 2: Why Now
  {
    id: 2,
    type: 'dalmia-why-now',
    headline: 'Industry Inflection Point',
    speakerNotes: 'Create urgency. CEO must feel timing is critical.'
  },
  // Slide 3: Transformation
  {
    id: 3,
    type: 'dalmia-transformation',
    headline: 'Commercial Model Transformation',
    speakerNotes: 'Show clear before/after contrast in commercial operations.'
  },
  // Slide 4: Global Examples
  {
    id: 4,
    type: 'dalmia-global-examples',
    headline: 'What Global Leaders Are Doing',
    speakerNotes: 'Shift from product companies to intelligence platforms.'
  },
  // Slide 5: Today
  {
    id: 5,
    type: 'dalmia-today',
    headline: 'Strong Foundations — Missing Intelligence Layer',
    speakerNotes: 'Acknowledge strong foundation while highlighting the intelligence gap.'
  },
  // Slide 6: Vision & Architecture
  {
    id: 6,
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
  // Slide 7: Value Streams
  {
    id: 7,
    type: 'dalmia-value-streams',
    headline: 'Value Delivery Streams',
    speakerNotes: 'Six pillars of commercial transformation.'
  },
  // Slide 8: AI Pricing Engine
  {
    id: 8,
    type: 'dalmia-pricing-engine',
    headline: 'AI Pricing Engine',
    speakerNotes: 'Pricing is the highest-impact lever for margin improvement.'
  },
  // Slide 9: Sales Copilot
  {
    id: 9,
    type: 'dalmia-sales-copilot',
    headline: 'Sales Copilot',
    speakerNotes: 'Transform existing sales app into intelligent copilot.'
  },
  // Slide 10: Dealer 360
  {
    id: 10,
    type: 'dalmia-dealer360',
    headline: 'Dealer 360 Platform',
    speakerNotes: 'Unified dealer view enables intelligent decision-making.'
  },
  // Slide 11: Marketing Engine
  {
    id: 11,
    type: 'dalmia-marketing-engine',
    headline: 'AI Marketing Engine',
    speakerNotes: 'AI enables hyperlocal, personalized marketing at scale.'
  },
  // Slide 12: Demand Sensing
  {
    id: 12,
    type: 'dalmia-demand-sensing',
    headline: 'Demand Sensing',
    speakerNotes: 'AI demand sensing reduces bullwhip effect.'
  },
  // Slide 13: O2C
  {
    id: 13,
    type: 'dalmia-o2c',
    headline: 'Order to Cash Transformation',
    speakerNotes: 'End-to-end O2C automation drives working capital efficiency.'
  },
  // Slide 14: SUVIDHA 2.0
  {
    id: 14,
    type: 'dalmia-suvidha',
    headline: 'SUVIDHA 2.0 Platform',
    speakerNotes: 'Transform into industry equivalent of CEMEX GO.'
  },
  // Slide 15: Sales & Dealer Intelligence
  {
    id: 15,
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
  // Slide 16: Marketing & Engagement
  {
    id: 16,
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
  // Slide 17: Supply Chain AI
  {
    id: 17,
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
  // Slide 18: Value Map
  {
    id: 18,
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
  // Slide 19: Roadmap & Ask
  {
    id: 19,
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
  },
  // Strategic Theme Slides (20-24)
  {
    id: 20,
    type: 'dalmia-theme-data-platform',
    headline: 'Unified Commercial Intelligence Platform',
    speakerNotes: 'Data foundation is the prerequisite for all AI capabilities.'
  },
  {
    id: 21,
    type: 'dalmia-theme-sales-channel',
    headline: 'AI Sales & Channel Execution',
    speakerNotes: 'Transform field force from order-takers to strategic advisors.'
  },
  {
    id: 22,
    type: 'dalmia-theme-supply-chain',
    headline: 'Predictive Supply Chain & Demand Network',
    speakerNotes: 'Move from monthly planning to continuous sensing.'
  },
  {
    id: 23,
    type: 'dalmia-theme-digital-trust',
    headline: 'Digital Trust & Channel Governance',
    speakerNotes: 'Protect brand and ensure channel integrity.'
  },
  {
    id: 24,
    type: 'dalmia-theme-margin-intel',
    headline: 'AI Margin Intelligence & Financial Automation',
    speakerNotes: 'Real-time margin visibility and automated reconciliation.'
  },
  // Case Study Slides (25-33)
  {
    id: 25,
    type: 'dalmia-case-data-lake',
    headline: 'Enterprise Data Lake',
    speakerNotes: 'Centralized data lake as foundation for all analytics.'
  },
  {
    id: 26,
    type: 'dalmia-case-customer-mdp',
    headline: 'Customer Master Data Platform',
    speakerNotes: 'Single customer identity across all systems.'
  },
  {
    id: 27,
    type: 'dalmia-case-field-force',
    headline: 'Field Force Enablement',
    speakerNotes: 'AI-powered sales copilot for daily execution.'
  },
  {
    id: 28,
    type: 'dalmia-case-customer-lifecycle',
    headline: 'Customer Lifecycle Intelligence',
    speakerNotes: 'Predictive churn and retention automation.'
  },
  {
    id: 29,
    type: 'dalmia-case-supply-visibility',
    headline: 'Supply Chain Visibility',
    speakerNotes: 'Real-time visibility from plant to dealer.'
  },
  {
    id: 30,
    type: 'dalmia-case-dynamic-capacity',
    headline: 'Dynamic Capacity & Demand Sensing',
    speakerNotes: 'AI-powered demand forecasting with external signals.'
  },
  {
    id: 31,
    type: 'dalmia-case-qr-auth',
    headline: 'QR Product Authentication',
    speakerNotes: 'Blockchain-backed product traceability.'
  },
  {
    id: 32,
    type: 'dalmia-case-commodity-costing',
    headline: 'Commodity Costing AI',
    speakerNotes: 'Real-time margin simulation with commodity prices.'
  },
  {
    id: 33,
    type: 'dalmia-case-financial-recon',
    headline: 'Financial Reconciliation Automation',
    speakerNotes: 'AI-powered 4-way reconciliation.'
  }
];

export const totalDalmiaCementSlides = dalmiaCementSlides.length;
