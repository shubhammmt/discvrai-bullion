import { 
  Building2, 
  Lock, 
  TrendingUp, 
  XCircle, 
  Cpu, 
  BarChart3, 
  Target, 
  Shield, 
  Globe, 
  Layers, 
  Rocket, 
  Phone 
} from 'lucide-react';

export interface AMCEnterpriseSlide {
  id: number;
  type: string;
  title: string;
  subtitle?: string;
  icon?: any;
  content?: any;
}

export const amcEnterprisePitchSlides: AMCEnterpriseSlide[] = [
  {
    id: 1,
    type: 'amc-cover',
    title: 'Agentic D2C Platform for AMCs',
    subtitle: 'Make Direct-to-Consumer Economically Viable',
    icon: Building2,
    content: {
      tagline: 'Replace fragmented, human-heavy journeys with autonomous, outcome-driven investor engagement',
      companyName: 'DiscvrAI'
    }
  },
  {
    id: 2,
    type: 'amc-problem',
    title: 'The Ownership Paradox',
    subtitle: 'AMCs manufacture the product but don\'t own the customer',
    icon: Lock,
    content: {
      mainProblem: 'Asset Management Companies are structurally locked out of owning their end customer',
      painPoints: [
        {
          title: 'Platform Dependency',
          description: 'Groww, Zerodha, Coin own the customer relationship'
        },
        {
          title: 'Symbolic D2C',
          description: 'High-cost, low-conversion channels that don\'t scale'
        },
        {
          title: 'Fragmented Stack',
          description: 'No intelligence layer across marketing, onboarding, CRM, support'
        },
        {
          title: 'Rising CAC',
          description: 'Performance marketing costs rising, conversion rates flat'
        }
      ],
      bottomLine: 'AMCs are forced to choose between scale without ownership or ownership without scale'
    }
  },
  {
    id: 3,
    type: 'amc-why-now',
    title: 'The Inflection Point',
    subtitle: 'Why this problem is both unavoidable and solvable now',
    icon: TrendingUp,
    content: {
      marketShift: '10-25% of AMC AUM expected to shift toward D2C-led journeys',
      drivers: [
        {
          title: 'Rising CAC, Flattening ROI',
          description: 'Performance marketing costs rising with structurally low conversion',
          icon: 'trending-up'
        },
        {
          title: 'Platform Concentration Risk',
          description: 'Third-party platforms aggregate customers, data, and trust',
          icon: 'alert'
        },
        {
          title: 'Behavioral Shift',
          description: 'SIP-first, goal-driven users expect guidance—not static pages',
          icon: 'users'
        },
        {
          title: 'AI Feasibility Boundary',
          description: 'What required large RM teams can now be automated at scale',
          icon: 'cpu'
        }
      ],
      insight: 'This problem existed earlier, but only now is it both unavoidable and solvable'
    }
  },
  {
    id: 4,
    type: 'amc-failed-solutions',
    title: 'Why Existing Solutions Fail',
    subtitle: 'Current approaches don\'t solve the core problem',
    icon: XCircle,
    content: {
      solutions: [
        {
          name: 'In-House AMC Tech',
          issues: ['Built for compliance, not velocity', 'High maintenance, slow iteration', 'No compounding learning'],
          verdict: 'Control without intelligence'
        },
        {
          name: 'Marketing/CRM Tools',
          issues: ['Campaign-centric, not journey-centric', 'No financial intent understanding', 'Heavy manual orchestration'],
          verdict: 'Tools without context'
        },
        {
          name: 'Generic AI Chatbots',
          issues: ['Surface-level Q&A only', 'Not integrated with operations', 'No outcome accountability'],
          verdict: 'Conversations without conversion'
        },
        {
          name: 'Brokerage Platforms',
          issues: ['Optimized for their economics', 'AMCs become suppliers', 'No customer ownership'],
          verdict: 'Scale without ownership'
        }
      ],
      missingLayer: 'An owned intelligence and engagement system that makes D2C economically viable'
    }
  },
  {
    id: 5,
    type: 'amc-solution',
    title: 'The Agentic D2C Platform',
    subtitle: 'Enabling the economic viability of D2C for AMCs',
    icon: Cpu,
    content: {
      notSelling: 'We are NOT selling "AI" or "chatbots"',
      actuallyEnabling: 'We are enabling the economic viability of D2C for AMCs',
      capabilities: [
        {
          before: 'Fragmented, human-heavy journeys',
          after: 'Autonomous, outcome-driven journeys'
        },
        {
          before: 'Manual RM dependency',
          after: 'Intent → Transaction at scale'
        },
        {
          before: 'High CAC, low growth',
          after: 'Reduced CAC without reducing growth'
        },
        {
          before: 'Traffic without value',
          after: 'Compounding value from owned data'
        }
      ],
      channels: ['Web Widget', 'WhatsApp Bot', 'Traditional Web']
    }
  },
  {
    id: 6,
    type: 'amc-capabilities',
    title: 'Platform Capabilities',
    subtitle: 'Three core outputs that drive business results',
    icon: BarChart3,
    content: {
      outputs: [
        {
          title: 'New Investor Acquisition & AUM Growth',
          metrics: [
            'Conversational onboarding: Anonymous → Verified Investor',
            'End-to-end execution: KYC → Investment → Settlement',
            'Attributed AUM: Every rupee tracked to agent actions',
            'Multi-channel: Web + WhatsApp + Traditional'
          ],
          color: 'orange'
        },
        {
          title: 'Business Intelligence & Optimization',
          metrics: [
            'Real-time dashboards: AUM, conversions, retention',
            'Attribution reports: Which flows drive conversions',
            'Funnel analytics: Drop-off points, optimal paths',
            'Cohort analysis: Performance by segment'
          ],
          color: 'blue'
        },
        {
          title: 'Operational Efficiency & Cost Reduction',
          metrics: [
            'Automated support: 60%+ queries without humans',
            'Reduced CAC: 40-50% vs traditional channels',
            '24/7 availability: No human agents needed',
            'Compliance automation: Audit trails built-in'
          ],
          color: 'green'
        }
      ]
    }
  },
  {
    id: 7,
    type: 'amc-conversion',
    title: 'Conversion Impact',
    subtitle: 'Measurable lift over industry benchmarks',
    icon: Target,
    content: {
      benchmarks: [
        { channel: 'AMC D2C Websites', rate: '2-5%', note: 'Low due to friction' },
        { channel: 'Brokerage Platforms', rate: '8-15%', note: 'Better UX and trust' },
        { channel: 'Traditional Distributors', rate: '10-20%', note: 'Human-assisted' },
        { channel: 'Agentic Platform (Target)', rate: '10-15%', note: '2-3× baseline', highlight: true }
      ],
      secondaryMetrics: [
        { metric: 'Intent → Transaction', baseline: '30-40%', target: '60-70%' },
        { metric: 'Time to First Investment', baseline: 'Weeks', target: 'Hours/Days' },
        { metric: 'KYC Completion Rate', baseline: '40-50%', target: '80%+' }
      ],
      whyItWorks: [
        'Conversational guidance reduces decision paralysis',
        'Real-time answers eliminate research elsewhere',
        'Progressive disclosure reduces form abandonment',
        'Contextual recommendations increase product fit'
      ]
    }
  },
  {
    id: 8,
    type: 'amc-differentiators',
    title: 'Why We Win',
    subtitle: 'Key differentiators vs alternatives',
    icon: Shield,
    content: {
      differentiators: [
        {
          title: 'Journey-Centric, Not Campaign-Centric',
          description: 'Understands investor intent, context, and lifecycle. Autonomous guidance across discovery → decision → execution → engagement.',
          icon: 'route'
        },
        {
          title: 'Deep Integration with Operations',
          description: 'Not just chat—integrated with KYC, payments, CRM, transaction systems. End-to-end execution without manual intervention.',
          icon: 'link'
        },
        {
          title: 'Outcome Ownership',
          description: 'Measured on CAC reduction, conversion lift, AUM per user. Accountability for business outcomes, not just engagement.',
          icon: 'target'
        },
        {
          title: 'Compliance-by-Design',
          description: 'Deterministic workflows + explainable AI. Human-in-the-loop where required. SEBI-compliant audit trails.',
          icon: 'shield'
        },
        {
          title: 'Hybrid Architecture',
          description: 'Rules + AI agents (not pure LLM dependency). High-value conversations only. Cost-efficient at scale.',
          icon: 'cpu'
        }
      ]
    }
  },
  {
    id: 9,
    type: 'amc-market',
    title: 'Market Opportunity',
    subtitle: 'The D2C shift in asset management',
    icon: Globe,
    content: {
      headline: '₹50+ Lakh Crore AUM',
      subheadline: '10-25% shifting to D2C-led journeys',
      stats: [
        { value: '45+', label: 'AMCs in India' },
        { value: '1.2L+', label: 'Distributors' },
        { value: '80%', label: 'AUM in Top 25 AMCs' }
      ],
      multiplier: 'One AMC sale = access to 5,000-10,000 distributors + their clients',
      expansion: [
        { vertical: 'AMCs', status: 'Now' },
        { vertical: 'Insurance', status: 'Next' },
        { vertical: 'Lending', status: 'Future' },
        { vertical: 'Wealth Mgmt', status: 'Future' }
      ],
      insight: 'Same agentic OS, different vertical logic'
    }
  },
  {
    id: 10,
    type: 'amc-business-model',
    title: 'Business Model',
    subtitle: 'Three-layer revenue architecture',
    icon: Layers,
    content: {
      layers: [
        {
          name: 'Layer 1: Core SaaS License',
          description: 'Platform access, agent orchestration, journey engine, integrations',
          pricing: 'Annual subscription',
          color: 'navy'
        },
        {
          name: 'Layer 2: Usage-Linked Revenue',
          description: 'Number of completed journeys (not events or page views)',
          pricing: '₹40 per completed journey',
          color: 'orange'
        },
        {
          name: 'Layer 3: Expansion Modules',
          description: 'Advanced optimization, cross-sell intelligence, enterprise analytics',
          pricing: 'Premium add-ons',
          color: 'gold'
        }
      ],
      principles: [
        'Predictable base cost',
        'Variable upside-linked pricing',
        'No revenue-share dependency'
      ],
      tagline: 'We price like infrastructure, not like distribution'
    }
  },
  {
    id: 11,
    type: 'amc-ask',
    title: 'The Ask',
    subtitle: 'Investment opportunity',
    icon: Rocket,
    content: {
      raise: '₹12-14 Cr',
      raiseUSD: '~$1.5M USD',
      valuation: '₹70-75 Cr pre-money',
      runway: '1.5 years with buffer',
      useOfFunds: [
        { category: 'Product Development', percentage: 45 },
        { category: 'Customer Acquisition', percentage: 30 },
        { category: 'Team Expansion', percentage: 20 },
        { category: 'Operations', percentage: 5 }
      ],
      milestones: [
        '5 AMC customers (Year 1)',
        '15 AMC customers (Year 2)',
        'Category expansion to Insurance'
      ]
    }
  },
  {
    id: 12,
    type: 'amc-cta',
    title: 'Let\'s Build Together',
    subtitle: 'The operating system for complex purchase journeys',
    icon: Phone,
    content: {
      founder: {
        name: 'Shubham Srivastava',
        title: 'Founder & CEO',
        email: 'shubham@discvr.ai',
        phone: '+91-9873961591'
      },
      vision: 'Building the operating system that autonomously guides customers through complex, regulated purchase journeys—starting with AMCs, expanding to insurance, lending, and wealth management.',
      nextSteps: [
        'Deep-dive on your D2C strategy',
        'Platform demo & capability walkthrough',
        'Pilot scoping & timeline'
      ]
    }
  }
];
