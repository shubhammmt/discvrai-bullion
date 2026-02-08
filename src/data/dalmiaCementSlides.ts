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
    totalValue: '₹870–1,720 Cr',
    investment: '₹106–202 Cr',
    roi: '8–10×',
    content: [
      'Data',
      'AI Intelligence',
      'Agentic Workflows',
      'Digital Platform',
      'Revenue Growth'
    ],
    speakerNotes: 'Dalmia evolves from manufacturer to commercial platform. Build from data foundation up to customer-facing ecosystem. Total opportunity: ₹870–1,720 Cr with 8–10× ROI.'
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
  // Slide 15: Value Map
  {
    id: 15,
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
  // Slide 16: Roadmap & Ask
  {
    id: 16,
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
  // Strategic Theme Slides (17-21)
  {
    id: 17,
    type: 'dalmia-theme-data-platform',
    headline: 'Unified Commercial Intelligence Platform',
    speakerNotes: 'Data foundation is the prerequisite for all AI capabilities.'
  },
  {
    id: 18,
    type: 'dalmia-theme-sales-channel',
    headline: 'AI Sales & Channel Execution',
    speakerNotes: 'Transform field force from order-takers to strategic advisors.'
  },
  {
    id: 19,
    type: 'dalmia-theme-supply-chain',
    headline: 'Predictive Supply Chain & Demand Network',
    speakerNotes: 'Move from monthly planning to continuous sensing.'
  },
  {
    id: 20,
    type: 'dalmia-theme-digital-trust',
    headline: 'Digital Trust & Channel Governance',
    speakerNotes: 'Protect brand and ensure channel integrity.'
  },
  {
    id: 21,
    type: 'dalmia-theme-margin-intel',
    headline: 'AI Margin Intelligence & Financial Automation',
    speakerNotes: 'Real-time margin visibility and automated reconciliation.'
  },
  // Case Study Slides (22-30)
  {
    id: 22,
    type: 'dalmia-case-data-lake',
    headline: 'Enterprise Data Lake',
    speakerNotes: 'Centralized data lake as foundation for all analytics.'
  },
  {
    id: 23,
    type: 'dalmia-case-customer-mdp',
    headline: 'Customer Master Data Platform',
    speakerNotes: 'Single customer identity across all systems.'
  },
  {
    id: 24,
    type: 'dalmia-case-field-force',
    headline: 'Field Force Enablement',
    speakerNotes: 'AI-powered sales copilot for daily execution.'
  },
  {
    id: 25,
    type: 'dalmia-case-customer-lifecycle',
    headline: 'Customer Lifecycle Intelligence',
    speakerNotes: 'Predictive churn and retention automation.'
  },
  {
    id: 26,
    type: 'dalmia-case-supply-visibility',
    headline: 'Supply Chain Visibility',
    speakerNotes: 'Real-time visibility from plant to dealer.'
  },
  {
    id: 27,
    type: 'dalmia-case-dynamic-capacity',
    headline: 'Dynamic Capacity & Demand Sensing',
    speakerNotes: 'AI-powered demand forecasting with external signals.'
  },
  {
    id: 28,
    type: 'dalmia-case-qr-auth',
    headline: 'QR Product Authentication',
    speakerNotes: 'Blockchain-backed product traceability.'
  },
  {
    id: 29,
    type: 'dalmia-case-commodity-costing',
    headline: 'Commodity Costing AI',
    speakerNotes: 'Real-time margin simulation with commodity prices.'
  },
  {
    id: 30,
    type: 'dalmia-case-financial-recon',
    headline: 'Financial Reconciliation Automation',
    speakerNotes: 'AI-powered 4-way reconciliation.'
  }
];

export const totalDalmiaCementSlides = dalmiaCementSlides.length;
