
import { 
  Building2, 
  AlertTriangle, 
  Zap, 
  Target, 
  Users, 
  TrendingUp, 
  Shield, 
  Cpu, 
  MapPin, 
  Trophy, 
  Wallet 
} from 'lucide-react';

export const pitchSlidesV2 = [
  // Slide 1: Company Introduction
  {
    type: 'title',
    title: 'DISCVR.AI',
    subtitle: "India's Intelligent Financial Aggregator",
    tagline: 'All Accounts. Smart Insights. Direct Actions.',
    presenter: 'by Shubham Srivastava',
    icon: Building2
  },

  // Slide 2: Problem Statement - Scattered Financial Life
  {
    type: 'problem',
    title: 'Indians Manage Money Across Multiple Disconnected Platforms',
    subtitle: 'The Financial Fragmentation Crisis',
    icon: AlertTriangle,
    keyStats: [
      {
        number: '5-8 Apps',
        label: 'Average Financial Apps',
        description: 'Used by each Indian across banking, investments, insurance'
      },
      {
        number: '15%',
        label: 'Complete View',
        description: 'Only 15% of Indians know their total financial picture'
      },
      {
        number: '2+ Hours',
        label: 'Daily App Switching',
        description: 'Time spent switching between apps to check balances'
      },
      {
        number: '60%',
        label: 'Missed Opportunities',
        description: 'Miss optimization due to fragmented view'
      }
    ],
    painPoints: [
      'Scattered accounts with no unified dashboard',
      'No intelligent insights across complete portfolio',
      'Manual tracking and decision-making',
      'Difficult to find and execute right investment opportunities'
    ]
  },

  // Slide 3: Solution - Intelligent Financial Aggregator
  {
    type: 'solution',
    title: 'Complete Portfolio + Smart Insights + Direct Actions',
    subtitle: 'Intelligent Financial Aggregator Platform',
    icon: Zap,
    features: [
      {
        title: 'Universal Aggregation',
        description: 'AA API integration, email parsing, manual uploads - all accounts in one view',
        capabilities: [
          'Real-time account data via AA APIs',
          'Email statement parsing and categorization',
          'Manual upload with smart template recognition',
          'All financial accounts unified'
        ]
      },
      {
        title: 'Intelligent Insights',
        description: 'AI-powered analysis and recommendations across complete portfolio',
        capabilities: [
          'Portfolio analysis and recommendations',
          'Spending pattern recognition',
          'Investment opportunity identification',
          'Risk assessment across entire portfolio'
        ]
      },
      {
        title: 'Seamless Action',
        description: 'Direct investment execution and portfolio management',
        capabilities: [
          'One-click investment execution',
          'Insurance and credit comparison',
          'Portfolio rebalancing recommendations',
          'Automated savings suggestions'
        ]
      },
      {
        title: 'Unified Dashboard',
        description: 'Complete financial picture with goal-based planning',
        capabilities: [
          'Real-time net worth tracking',
          'Goal-based financial planning',
          'Cash flow analysis',
          'Personalized financial health score'
        ]
      }
    ]
  },

  // Slide 4: Market Opportunity
  {
    type: 'market-opportunity',
    title: '50M+ Indians Managing Multiple Financial Accounts',
    subtitle: 'Multi-Account Digital Indians',
    icon: Target,
    marketData: {
      tam: {
        number: '80M+',
        label: 'TAM',
        description: 'Indians with 3+ financial accounts'
      },
      sam: {
        number: '50M+',
        label: 'SAM',
        description: 'Urban users actively managing investments'
      },
      som: {
        number: '10M+',
        label: 'SOM',
        description: 'Digitally active users seeking unified management'
      }
    },
    validation: [
      '35% annual growth in digital financial product adoption',
      'Account Aggregator framework enabling legal data access',
      'Rising complexity requiring unified management',
      'Growing demand for intelligent financial guidance'
    ],
    marketContext: 'Account Aggregator framework creates legal pathway for comprehensive financial data aggregation'
  },

  // Slide 5: Target User
  {
    type: 'target-persona',
    title: 'Multi-Account Urban Indians',
    subtitle: 'Urban Professionals & Small Business Owners',
    icon: Users,
    persona: {
      demographics: {
        age: '25-40 years',
        income: '₹5-20 LPA',
        location: 'Urban India',
        profile: '3-8 financial accounts across categories'
      },
      behavior: [
        'Spends 1-2 hours daily managing finances across apps',
        'Uses 5-8 different financial applications',
        'Struggles with incomplete financial picture',
        'Wants intelligent recommendations and easy execution'
      ],
      needs: [
        'Single platform for complete financial view',
        'Intelligent recommendations based on complete profile',
        'Easy investment and insurance execution',
        'Automated optimization and rebalancing'
      ],
      painPoints: [
        'Time-consuming app switching',
        'Missed investment opportunities',
        'Difficulty in portfolio optimization',
        'Lack of comprehensive financial insights'
      ]
    }
  },

  // Slide 6: Go-to-Market Strategy
  {
    type: 'go-to-market',
    title: 'Urban Professionals First',
    subtitle: 'Phased Market Entry Strategy',
    icon: MapPin,
    phases: [
      {
        phase: 'Phase 1: Mumbai/Bangalore Launch',
        timeline: 'Months 1-6',
        target: '50K users',
        strategy: [
          'LinkedIn and Google ads targeting multi-account users',
          'Content marketing around financial aggregation',
          'Referral programs and early adopter community',
          'Fintech partnership integrations'
        ],
        metrics: '50K users, Product-Market Fit validation'
      },
      {
        phase: 'Phase 2: Tier-1 City Expansion',
        timeline: 'Months 6-12',
        target: '200K users',
        strategy: [
          'Delhi, Chennai, Hyderabad, Pune expansion',
          'Influencer partnerships and corporate tie-ups',
          'App store optimization and organic growth',
          'B2B partnership channel development'
        ],
        metrics: '200K users, Tier-1 cities coverage'
      },
      {
        phase: 'Phase 3: Scale and Optimize',
        timeline: 'Months 12-18',
        target: '1M users',
        strategy: [
          'National expansion and market penetration',
          'Word-of-mouth and platform virality',
          'Enterprise partnerships and white-labeling',
          'Advanced AI features and premium services'
        ],
        metrics: '1M users, Market leadership position'
      }
    ]
  },

  // Slide 7: Competitive Differentiation
  {
    type: 'competition',
    title: 'Clear Competitive Differentiation',
    subtitle: 'Unique Position in Market',
    icon: Shield,
    competitors: [
      {
        category: 'Portfolio Trackers',
        examples: 'INDmoney, ET Money',
        limitations: [
          'Tracking-only, no intelligence',
          'View-only, limited action capability',
          'Basic aggregation, no AI insights'
        ],
        ourAdvantage: 'Intelligence-first with direct action capability'
      },
      {
        category: 'Investment Platforms',
        examples: 'Groww, Zerodha',
        limitations: [
          'Investment-only focus',
          'Single-platform analysis',
          'Product-specific tools only'
        ],
        ourAdvantage: 'Complete portfolio view with cross-account insights'
      },
      {
        category: 'Financial Marketplaces',
        examples: 'PolicyBazaar, BankBazaar',
        limitations: [
          'New product selling focus',
          'Generic comparisons',
          'Fragmented product journeys'
        ],
        ourAdvantage: 'Existing portfolio optimization with unified experience'
      }
    ],
    uniquePosition: 'Only platform combining complete aggregation + intelligent insights + seamless execution'
  },

  // Slide 8: Technology Foundation
  {
    type: 'tech-foundation',
    title: 'AA-Powered Technology Stack',
    subtitle: 'Multi-Source Aggregation with AI Intelligence',
    icon: Cpu,
    techStack: [
      {
        layer: 'Data Aggregation',
        components: [
          'Account Aggregator APIs - 150+ financial institutions',
          'Email Intelligence - Statement parsing and categorization',
          'Document Processing - OCR and template recognition',
          'Real-time APIs - Live market data integration'
        ]
      },
      {
        layer: 'AI/ML Engine',
        components: [
          'Portfolio Analysis - Risk assessment and optimization',
          'Pattern Recognition - Spending and investment behavior',
          'Recommendation System - Personalized financial guidance',
          'Predictive Analytics - Future planning and goal tracking'
        ]
      },
      {
        layer: 'Execution Platform',
        components: [
          'Investment APIs - Direct trading and mutual fund execution',
          'Insurance Integration - Comparison and purchase workflows',
          'Credit Platform - Application and approval systems',
          'Portfolio Management - Rebalancing and optimization tools'
        ]
      }
    ],
    dataAdvantage: 'Legal access to comprehensive financial data through AA framework'
  },

  // Slide 9: User Growth & Milestones
  {
    type: 'unit-economics',
    title: 'Path to 1M Users in 18 Months',
    subtitle: 'User-Focused Growth Strategy',
    icon: TrendingUp,
    metrics: {
      cac: '₹1,500',
      ltv: '₹11,400 (3-year)',
      ltvCacRatio: '7.6x',
      paybackPeriod: '7 months',
      grossMargin: '85%'
    },
    projections: [
      {
        timeline: 'Month 6',
        users: '50K',
        arr: 'Product-Market Fit',
        milestone: 'Basic aggregation + insights'
      },
      {
        timeline: 'Month 12',
        users: '200K',
        arr: 'Tier-1 Cities Coverage',
        milestone: 'Full transaction capabilities'
      },
      {
        timeline: 'Month 18',
        users: '1M',
        arr: 'National Scale',
        milestone: 'Market leadership position'
      },
      {
        timeline: 'Month 24',
        users: '2M+',
        arr: 'Series A Success',
        milestone: 'Platform dominance'
      }
    ]
  },

  // Slide 10: Team & Execution
  {
    type: 'team',
    title: 'Execution-Ready Leadership',
    subtitle: 'Scale Expert with AI/ML Experience',
    icon: Trophy,
    team: [
      {
        name: 'Shubham Srivastava',
        role: 'CEO & Co-Founder',
        background: [
          'Scale Expert: Built platforms serving 100M+ users',
          'AI/ML Pioneer: Implemented ML at MakeMyTrip and HT',
          'Leadership: IIT Dhanbad, scaled multiple divisions'
        ],
        experience: '150+ team member management, 20% cost optimization'
      }
    ],
    keyHires: [
      'CTO with fintech + AA experience',
      'Head of Product - AI/ML focus',
      'Head of Growth - User acquisition and retention focus'
    ],
    executionMilestones: [
      'Q1: Core aggregation, AA integration, basic insights',
      'Q2: AI intelligence engine, premium features, investment APIs',
      'Q3: Advanced insights, insurance/credit integration, scale',
      'Q4: Platform optimization, partnerships, Series A prep'
    ]
  },

  // Slide 11: Funding Requirements
  {
    type: 'funding',
    title: '$1.5M Seed Round',
    subtitle: 'Building India\'s Financial Operating System',
    icon: Wallet,
    allocation: [
      {
        percentage: '45%',
        category: 'Product Development',
        description: 'AA integration, AI/ML engine, mobile app, investment APIs'
      },
      {
        percentage: '30%',
        category: 'Team Building',
        description: 'Engineering, product, AI/ML specialists'
      },
      {
        percentage: '20%',
        category: 'User Acquisition',
        description: 'Digital marketing, partnerships, referral programs'
      },
      {
        percentage: '5%',
        category: 'Compliance & Operations',
        description: 'Security, regulatory compliance, infrastructure'
      }
    ],
    milestones: [
      'Month 6: 50K users with complete portfolio aggregation',
      'Month 12: 200K users with proven product-market fit',
      'Month 18: 1M users and Series A readiness'
    ],
    competitiveContext: {
      title: 'Market Validation & Funding Landscape',
      examples: [
        'INDmoney: $86M raised for portfolio tracking',
        'CRED: $800M+ for credit-focused platform',
        'Groww: $251M for investment-only platform'
      ]
    },
    exitStrategy: [
      '3-5 year exit via acquisition by major financial institution',
      'Target valuation: $500M-1B based on user base and revenue',
      'Strategic acquirers: Banks, insurance companies, fintech giants',
      'IPO pathway available given Indian fintech market maturation'
    ]
  }
];
