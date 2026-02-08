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
  // Slide 2: Overview
  {
    id: 2,
    type: 'dalmia-overview',
    headline: 'Agenda Overview',
    speakerNotes: 'Four key sections: Context, Architecture, Value Streams, and Roadmap.'
  },
  // Slide 3: Global Examples
  {
    id: 3,
    type: 'dalmia-global-examples',
    headline: 'What Global Leaders Are Doing',
    speakerNotes: 'Shift from product companies to intelligence platforms.'
  },
  // Slide 4: Today
  {
    id: 4,
    type: 'dalmia-today',
    headline: 'Strong Foundations — Missing Intelligence Layer',
    speakerNotes: 'Acknowledge strong foundation while highlighting the intelligence gap.'
  },
  // Slide 5: Vision & Architecture
  {
    id: 5,
    type: 'dalmia-vision-architecture',
    headline: 'AI-Powered Commercial Intelligence Platform',
    totalValue: '₹870–1,720 Cr',
    investment: '₹106–202 Cr',
    roi: '50×',
    content: [
      'Data',
      'AI Intelligence',
      'Agentic Workflows',
      'Digital Platform',
      'Revenue Growth'
    ],
    speakerNotes: 'Dalmia evolves from manufacturer to commercial platform. Build from data foundation up to customer-facing ecosystem. Total opportunity: ₹870–1,720 Cr with 8–10× ROI.'
  },
  // Slide 6: Value Streams
  {
    id: 6,
    type: 'dalmia-value-streams',
    headline: 'Value Delivery Streams',
    speakerNotes: 'Seven pillars of commercial transformation.'
  },
  // Slide 7: AI Pricing Engine
  {
    id: 7,
    type: 'dalmia-pricing-engine',
    headline: 'AI Pricing Engine',
    speakerNotes: 'Pricing is the highest-impact lever for margin improvement.'
  },
  // Slide 8: Sales Copilot
  {
    id: 8,
    type: 'dalmia-sales-copilot',
    headline: 'Sales Copilot',
    speakerNotes: 'Transform existing sales app into intelligent copilot.'
  },
  // Slide 9: Dealer 360
  {
    id: 9,
    type: 'dalmia-dealer360',
    headline: 'Dealer 360 Platform',
    speakerNotes: 'Unified dealer view enables intelligent decision-making.'
  },
  // Slide 10: Marketing Engine
  {
    id: 10,
    type: 'dalmia-marketing-engine',
    headline: 'AI Marketing Engine',
    speakerNotes: 'AI enables hyperlocal, personalized marketing at scale.'
  },
  // Slide 11: Demand Sensing
  {
    id: 11,
    type: 'dalmia-demand-sensing',
    headline: 'Demand Sensing',
    speakerNotes: 'AI demand sensing reduces bullwhip effect.'
  },
  // Slide 12: O2C
  {
    id: 12,
    type: 'dalmia-o2c',
    headline: 'Order to Cash Transformation',
    speakerNotes: 'End-to-end O2C automation drives working capital efficiency.'
  },
  // Slide 13: Dashboarding & Insights
  {
    id: 13,
    type: 'dalmia-dashboarding',
    headline: 'Dashboarding & Insights',
    speakerNotes: 'End-to-end analytics and business intelligence for data-driven decisions.'
  },
  // Slide 14: Roadmap
  {
    id: 14,
    type: 'dalmia-transformation-roadmap',
    headline: 'Transformation Roadmap',
    speakerNotes: 'Three phases: Foundation, AI Intelligence Layer, Autonomous Enterprise.'
  }
];

export const totalDalmiaCementSlides = dalmiaCementSlides.length;
