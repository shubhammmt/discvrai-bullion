export interface CaseStudyData {
  title: string;
  customerProfile: {
    industry: string;
    scale: string;
    complexity: string[];
    systems: string[];
  };
  problem: string[];
  transformation: string[];
  impact: string[];
  wireframe: {
    nodes: string[];
  };
  screenshotPath?: string;
}

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
  caseStudy?: CaseStudyData;
  screenshotPath?: string;
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
  // Slide 14: Total Opportunity (was 15)
  {
    id: 14,
    type: 'dalmia-total-opportunity',
    headline: 'Total Opportunity Breakdown',
    speakerNotes: 'Value breakdown across all seven streams. Revenue uplift plus operational savings equals total opportunity of ₹870–1,720 Cr with 50× ROI.'
  },
  // Slide 15: Section Break - Case Studies
  {
    id: 15,
    type: 'dalmia-section-break',
    headline: 'Case Studies',
    subtitle: 'Real-world transformations delivering measurable impact',
    speakerNotes: 'Transition to case studies showcasing proven enterprise implementations.'
  },
  // Slide 16: Case Study 1 - Commercial Data Platform
  {
    id: 16,
    type: 'dalmia-case-study',
    headline: 'Case Study',
    speakerNotes: 'Enterprise commercial data platform delivering unified customer intelligence.',
    caseStudy: {
      title: 'Enterprise Commercial Data Platform & Customer Intelligence',
      customerProfile: {
        industry: 'Consumer Durables Manufacturing',
        scale: '₹2,000+ Cr Enterprise',
        complexity: ['10,000+ Technicians', 'Millions of Transactions', 'Multi-channel Sales'],
        systems: ['SAP S/4HANA', 'Dynamics 365', 'CRM', 'Service Platforms']
      },
      problem: [
        'Fragmented customer lifecycle visibility',
        'No unified commercial data foundation',
        'Siloed decision-making across functions'
      ],
      transformation: [
        'Enterprise-grade data lake implementation',
        'Customer master identity resolution',
        'Decision intelligence dashboards'
      ],
      impact: [
        'Single source of truth for all commercial data',
        'Faster operational decisions',
        'AI-ready commercial platform'
      ],
      wireframe: {
        nodes: ['ERP + CRM + Apps', 'Data Lake', 'AI Intelligence', 'Dashboards']
      }
    }
  },
  // Slide 17: Screenshot - Data Platform
  {
    id: 17,
    type: 'dalmia-screenshot',
    headline: 'Customer 360 Dashboard',
    subtitle: 'Unified commercial intelligence platform with real-time analytics',
    speakerNotes: 'Live demonstration of the Customer 360 dashboard.',
    screenshotPath: 'case-study-data-platform'
  },
  // Slide 18: Case Study 2 - Field Force Platform
  {
    id: 18,
    type: 'dalmia-case-study',
    headline: 'Case Study',
    speakerNotes: 'AI-powered field force and sales execution transformation.',
    caseStudy: {
      title: 'AI Field Force & Sales Execution Platform',
      customerProfile: {
        industry: 'Large Enterprise',
        scale: '10,000+ Field Agents',
        complexity: ['Nationwide Operations', 'High Transaction Volume'],
        systems: ['SAP ERP', 'CRM', 'Mobile Apps']
      },
      problem: [
        'Manual order workflows causing delays',
        'No real-time sales visibility',
        'Disconnected field operations'
      ],
      transformation: [
        'Mobile-first sales platform',
        'AI performance insights engine',
        'Real-time order capture & sync'
      ],
      impact: [
        'Order processing: days → minutes',
        'Real-time execution visibility',
        'Improved field productivity'
      ],
      wireframe: {
        nodes: ['Field App', 'AI Engine', 'CRM / SAP', 'Analytics Dashboard']
      }
    }
  },
  // Slide 19: Screenshot - Field Force Mobile App
  {
    id: 19,
    type: 'dalmia-screenshot',
    headline: 'Field Force Mobile App',
    subtitle: 'AI-powered sales execution platform for 10,000+ field agents',
    speakerNotes: 'Mobile-first interface for daily visit planning and order capture.',
    screenshotPath: 'case-study-field-force'
  },
  // Slide 20: Case Study 3 - Supply Chain Intelligence
  {
    id: 20,
    type: 'dalmia-case-study',
    headline: 'Case Study',
    speakerNotes: 'End-to-end supply chain visibility and intelligence.',
    caseStudy: {
      title: 'End-to-End Supply Chain Intelligence',
      customerProfile: {
        industry: 'Multi-Factory Manufacturing',
        scale: 'Nationwide Distribution',
        complexity: ['High SKU Volume', 'Complex Logistics'],
        systems: ['WMS', 'TMS', 'ERP']
      },
      problem: [
        'No real-time inventory visibility',
        'Unknown transit status',
        'Manual reconciliation processes'
      ],
      transformation: [
        'Integrated supply chain data layer',
        'Real-time visibility dashboards',
        'Automated exception alerts'
      ],
      impact: [
        'Eliminated visibility blind spots',
        'Faster issue detection & resolution',
        'Reduced manual reconciliation'
      ],
      wireframe: {
        nodes: ['Factory', 'Warehouse', 'Transport', 'Distributor', 'Customer']
      }
    }
  },
  // Slide 21: Case Study 4 - Product Authentication
  {
    id: 21,
    type: 'dalmia-case-study',
    headline: 'Case Study',
    speakerNotes: 'Digital product authentication and channel governance.',
    caseStudy: {
      title: 'Digital Product Authentication & Channel Governance',
      customerProfile: {
        industry: 'High-Volume Distribution',
        scale: 'Nationwide Dealer Network',
        complexity: ['Multi-tier Distribution', 'Brand Protection'],
        systems: ['Channel Management', 'Dealer Portal']
      },
      problem: [
        'Counterfeit product risk',
        'Proxy sales and revenue leakage',
        'No channel visibility or control'
      ],
      transformation: [
        'QR-based product identity system',
        'Real-time verification platform',
        'Channel monitoring analytics'
      ],
      impact: [
        '100% product authentication',
        'Revenue protection achieved',
        'Full channel transparency'
      ],
      wireframe: {
        nodes: ['QR Generation', 'Scan Events', 'Tracking Platform', 'Risk Alerts']
      }
    }
  },
  // Slide 22: Case Study 5 - Demand Intelligence
  {
    id: 22,
    type: 'dalmia-case-study',
    headline: 'Case Study',
    speakerNotes: 'Predictive demand sensing and dynamic capacity planning.',
    caseStudy: {
      title: 'Predictive Demand & Dynamic Capacity Intelligence',
      customerProfile: {
        industry: 'Large Manufacturing',
        scale: 'Seasonal Demand Patterns',
        complexity: ['Multi-region Planning', 'Weather Sensitivity'],
        systems: ['SAP S/4HANA', 'Planning Tools', 'WMS/TMS']
      },
      problem: [
        'Late demand signal detection',
        'Stockouts or excess inventory',
        'Reactive planning cycles'
      ],
      transformation: [
        'Real-time demand monitoring',
        'Weather-driven AI forecasting',
        'Automated inventory rebalancing'
      ],
      impact: [
        'Improved forecast accuracy',
        'Balanced inventory levels',
        'Proactive planning capability'
      ],
      wireframe: {
        nodes: ['External Data + ERP', 'AI Forecast Engine', 'Planning Recommendations']
      }
    }
  },
  // Slide 23: Case Study 6 - Margin Intelligence
  {
    id: 23,
    type: 'dalmia-case-study',
    headline: 'Case Study',
    speakerNotes: 'AI-powered margin intelligence and financial automation.',
    caseStudy: {
      title: 'AI Margin Intelligence & Financial Automation',
      customerProfile: {
        industry: '₹2,000+ Cr Enterprise',
        scale: 'Large Vendor Ecosystem',
        complexity: ['High Transaction Volume', 'Commodity Exposure'],
        systems: ['ERP Finance', 'Procurement', 'Treasury']
      },
      problem: [
        'Manual reconciliation burden',
        'Commodity price impact unclear',
        'Margin leakage across transactions'
      ],
      transformation: [
        'Automated 4-way reconciliation',
        'Real-time commodity tracking',
        'AI margin analytics engine'
      ],
      impact: [
        'Faster financial decisions',
        'Leakage reduction achieved',
        'Margin visibility at transaction level'
      ],
      wireframe: {
        nodes: ['Commodity APIs + ERP', 'AI Model', 'Margin Dashboard']
      }
    }
  },
  // Slide 24: Roadmap
  {
    id: 24,
    type: 'dalmia-transformation-roadmap',
    headline: 'Transformation Roadmap',
    speakerNotes: 'Three phases: Foundation, AI Intelligence Layer, Autonomous Enterprise.'
  }
];

export const totalDalmiaCementSlides = dalmiaCementSlides.length;
