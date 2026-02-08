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
  // Slide 2: Global Examples
  {
    id: 2,
    type: 'dalmia-global-examples',
    headline: 'What Global Leaders Are Doing',
    speakerNotes: 'Shift from product companies to intelligence platforms.'
  },
  // Slide 3: Today
  {
    id: 3,
    type: 'dalmia-today',
    headline: 'Strong Foundations — Missing Intelligence Layer',
    speakerNotes: 'Acknowledge strong foundation while highlighting the intelligence gap.'
  },
  // Slide 4: Vision & Architecture
  {
    id: 4,
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
  // Slide 5: Value Streams
  {
    id: 5,
    type: 'dalmia-value-streams',
    headline: 'Value Delivery Streams',
    speakerNotes: 'Six pillars of commercial transformation.'
  },
  // Slide 6: AI Pricing Engine
  {
    id: 6,
    type: 'dalmia-pricing-engine',
    headline: 'AI Pricing Engine',
    speakerNotes: 'Pricing is the highest-impact lever for margin improvement.'
  },
  // Slide 7: Sales Copilot
  {
    id: 7,
    type: 'dalmia-sales-copilot',
    headline: 'Sales Copilot',
    speakerNotes: 'Transform existing sales app into intelligent copilot.'
  },
  // Slide 8: Dealer 360
  {
    id: 8,
    type: 'dalmia-dealer360',
    headline: 'Dealer 360 Platform',
    speakerNotes: 'Unified dealer view enables intelligent decision-making.'
  },
  // Slide 9: Marketing Engine
  {
    id: 9,
    type: 'dalmia-marketing-engine',
    headline: 'AI Marketing Engine',
    speakerNotes: 'AI enables hyperlocal, personalized marketing at scale.'
  },
  // Slide 10: Demand Sensing
  {
    id: 10,
    type: 'dalmia-demand-sensing',
    headline: 'Demand Sensing',
    speakerNotes: 'AI demand sensing reduces bullwhip effect.'
  },
  // Slide 11: O2C
  {
    id: 11,
    type: 'dalmia-o2c',
    headline: 'Order to Cash Transformation',
    speakerNotes: 'End-to-end O2C automation drives working capital efficiency.'
  },
  // Slide 12: SUVIDHA 2.0
  {
    id: 12,
    type: 'dalmia-suvidha',
    headline: 'SUVIDHA 2.0 Platform',
    speakerNotes: 'Transform into industry equivalent of CEMEX GO.'
  },
  // Slide 13: Value Map
  {
    id: 13,
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
  // Section 1 - Industry Shift
  {
    id: 14,
    type: 'dalmia-industry-shift',
    headline: 'Heavy Industry Digital Transformation',
    speakerNotes: 'Industry shifting from operational digitization to AI-driven commercial intelligence.'
  },
  // Section 2 - Transformation Themes
  {
    id: 15,
    type: 'dalmia-case-theme-data',
    headline: 'Unified Commercial Data Platform',
    speakerNotes: 'Enterprise data lake as foundation for all AI capabilities.'
  },
  {
    id: 16,
    type: 'dalmia-case-theme-sales',
    headline: 'AI Sales Execution & Field Intelligence',
    speakerNotes: 'Transform field force from order-takers to strategic advisors.'
  },
  {
    id: 17,
    type: 'dalmia-case-theme-supply',
    headline: 'Predictive Supply Chain Intelligence',
    speakerNotes: 'Real-time visibility and demand prediction across network.'
  },
  {
    id: 18,
    type: 'dalmia-case-theme-trust',
    headline: 'Digital Trust & Channel Governance',
    speakerNotes: 'Protect brand and ensure channel integrity with QR authentication.'
  },
  {
    id: 19,
    type: 'dalmia-case-theme-margin',
    headline: 'AI Margin Intelligence & Finance Automation',
    speakerNotes: 'Real-time margin visibility and automated reconciliation.'
  },
  // Section 3 - Roadmap
  {
    id: 20,
    type: 'dalmia-transformation-roadmap',
    headline: 'Transformation Roadmap',
    speakerNotes: 'Three phases: Foundation, AI Intelligence Layer, Autonomous Enterprise.'
  }
];

export const totalDalmiaCementSlides = dalmiaCementSlides.length;
