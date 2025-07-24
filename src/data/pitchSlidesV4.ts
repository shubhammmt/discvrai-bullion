import { Brain, TrendingUp, Target, Users, Rocket, DollarSign, BarChart3, AlertTriangle, Zap, Link } from 'lucide-react';

export const pitchSlidesV4 = [
  {
    id: 1,
    type: 'title',
    title: 'DISCVR.AI',
    subtitle: "India's Universal Financial Intelligence Platform",
    author: 'Solving Portfolio Management Chaos for 6-7 Cr Investors',
    icon: Brain
  },
  {
    id: 2,
    type: 'market-opportunity',
    title: 'India\'s Financial Explosion',
    subtitle: 'Massive Market with Automatic Demand Validation',
    icon: BarChart3,
    marketData: {
      totalMarket: '₹4,10,00,000+ Cr',
      description: 'Total Financial Assets Under Management (≈ US$5.3 trillion)',
      breakdown: [
        { asset: 'Equity Market Cap', value: '₹4,10,40,000 Cr', growth: '+21% since Mar 2025' },
        { asset: 'Bond Market', value: '₹2,26,00,000 Cr', growth: '3x growth vs 2014' },
        { asset: 'Mutual Funds AUM', value: '₹74,40,000 Cr', growth: '+23% YoY growth' },
        { asset: 'Corporate Bonds', value: '₹51,60,000 Cr', growth: '+28% YoY issuance' }
      ]
    },
    userExplosion: [
      { metric: '19.2 Cr Demat Accounts', detail: '27% YoY growth, record 4.1 Cr additions' },
      { metric: '24.13 Cr MF Accounts', detail: '25% CAGR, 26% women participation' },
      { metric: '8.38 Cr Active SIPs', detail: '₹26,632 Cr monthly inflows' }
    ],
    keyInsight: {
      title: 'Multi-Account Chaos Proven',
      stats: [
        '~5 Cr active stock investors across 19.2 Cr accounts = 3.8x redundancy',
        '~5.4 Cr unique MF users across 24.13 Cr accounts = 4.5x redundancy',
        'Real addressable base: 6-7 Cr investors managing 43+ Cr accounts'
      ]
    }
  },
  {
    id: 3,
    type: 'problem-statement',
    title: 'The Portfolio Management Crisis',
    subtitle: 'Quantified Pain Points Across Financial Health',
    icon: AlertTriangle,
    problemData: {
      coreIssue: '6-7 Cr investors managing 43+ Cr accounts across fragmented platforms',
      painPoints: [
        {
          category: 'Insurance & Protection Gaps',
          severity: 'Critical',
          stats: [
            '81% Indians are underinsured (Swiss Re)',
            '76% families lack adequate health coverage',
            '90% don\'t have term life insurance',
            'Only 3.9% insurance penetration vs 7.4% global average'
          ]
        },
        {
          category: 'Emergency Fund Crisis',
          severity: 'High',
          stats: [
            '40% Indians lack 3-month emergency funds',
            '68% middle-class families financially vulnerable',
            'Emergency fund inadequacy across income segments'
          ]
        },
        {
          category: 'Asset Allocation Chaos',
          severity: 'High',
          stats: [
            '70% over-concentrated in single assets',
            '85% lack structured asset allocation',
            'Poor diversification across asset classes',
            'Home bias: 95% investments in domestic assets only'
          ]
        },
        {
          category: 'Retirement Planning Gap',
          severity: 'Critical',
          stats: [
            '₹35 Lakh Cr pension market by 2030',
            '85% Indians inadequately prepared for retirement',
            'Average retirement corpus 40% below required'
          ]
        }
      ],
      currentSolutionGaps: [
        'No unified view across all financial products',
        'Limited AI-driven insights for mass market',
        'Complex interfaces, not user-friendly',
        'Missing family portfolio management',
        'No automated rebalancing or alerts'
      ]
    }
  },
  {
    id: 4,
    type: 'solution',
    title: 'Universal Financial Intelligence Platform',
    subtitle: 'AI-Powered Comprehensive Portfolio Management',
    icon: Zap,
    features: [
      {
        title: 'Universal Aggregation Engine',
        description: 'Connect all financial accounts seamlessly',
        capabilities: [
          '50+ platform integrations (vs competitors\' 10-15)',
          'Account Aggregator (AA) framework integration',
          'Real-time portfolio synchronization',
          'Intelligent deduplication across platforms'
        ]
      },
      {
        title: 'AI-Powered Insights Layer',
        description: 'Comprehensive financial health analysis',
        capabilities: [
          'Insurance gap analysis & recommendations',
          'Emergency fund adequacy assessment',
          'Asset allocation optimization',
          'Retirement planning with projections',
          'Tax optimization strategies'
        ]
      },
      {
        title: 'Intelligent Action Platform',
        description: 'Execute improvements across all platforms',
        capabilities: [
          'Automated rebalancing alerts',
          'Goal-based investment recommendations',
          'Insurance purchase integration',
          'Emergency fund setup guidance',
          'Family portfolio management'
        ]
      }
    ],
    differentiators: [
      'Comprehensive: Beyond investments - insurance, emergency funds, retirement',
      'AI-Driven: Machine learning for personalized insights',
      'Mass Market: ₹3,800/year vs ₹25,000+ premium solutions',
      'Family-First: Multi-member portfolio management',
      'Action-Oriented: Not just tracking, but improvement recommendations'
    ]
  },
  {
    id: 5,
    type: 'target-persona',
    title: 'Target Market Segmentation',
    subtitle: 'Clear User Segments with Validated Revenue Potential',
    icon: Users,
    personas: [
      {
        title: 'Basic Portfolio Seekers',
        size: '3-5 Crore Users',
        profile: '1-2 accounts, seeking financial clarity',
        problems: ['Need simple portfolio view', 'Basic financial health insights'],
        revenue: '$60-240 annually',
        marketSize: '$900M-1.2B'
      },
      {
        title: 'Multi-Platform Managers',
        size: '2-3 Crore Users',
        profile: '2-5 accounts across platforms',
        problems: ['Account management complexity', 'No unified financial health view'],
        revenue: '$240-960 annually',
        marketSize: '$1.4B-2.1B'
      },
      {
        title: 'Comprehensive Planners',
        size: '1-2 Crore Users',
        profile: 'Want full financial life management',
        problems: ['Holistic planning needs', 'Family portfolio coordination'],
        revenue: '$600-3000 annually',
        marketSize: '$1.8B-3.6B'
      },
      {
        title: 'Power Optimizers',
        size: '50-80 Lakh Users',
        profile: '>5 accounts, advanced analytics needs',
        problems: ['Advanced optimization', 'Tax & retirement planning'],
        revenue: '$1200-6000 annually',
        marketSize: '$1.8B-2.9B'
      }
    ],
    totalTAM: '$9.2B',
    keyInsight: 'Expanding TAM: From investment tracking to comprehensive financial health management'
  },
  {
    id: 6,
    type: 'aa-validation',
    title: 'Account Aggregator: Explosive Growth Validates Market Need',
    subtitle: 'India\'s Fastest Growing Open Finance Network Proves Portfolio Consolidation Demand',
    icon: Link,
    validationData: {
      headline: 'World\'s Fastest Growing Open Finance Network - 1059% Growth in FY24',
      keyMetrics: [
        {
          metric: 'Total Consents',
          value: '120M+',
          growth: '17% MoM Growth',
          icon: Users
        },
        {
          metric: 'Unique Users',
          value: '80-90M',
          growth: 'Given Consent',
          icon: Target
        },
        {
          metric: 'Disbursals H1 FY25',
          value: '₹74,500 Cr',
          growth: '12% Monthly Growth',
          icon: DollarSign
        },
        {
          metric: 'Growth Rate FY24',
          value: '1059%',
          growth: 'Fastest Globally',
          icon: TrendingUp
        }
      ],
      marketValidation: [
        {
          point: 'Regulatory Infrastructure Ready',
          impact: 'RBI-backed framework with 8 live Account Aggregators providing secure data sharing'
        },
        {
          point: 'Mass Adoption Proven', 
          impact: '80-90M users have willingly shared financial data - proving trust and demand for consolidation'
        },
        {
          point: 'Financial Institution Buy-in',
          impact: 'Banks, NBFCs, and digital lenders collectively disbursed ₹74,500 Cr via AA in just 6 months'
        },
        {
          point: 'Explosive Growth Trajectory',
          impact: '17% month-on-month growth indicates strong consumer pull for unified financial experiences'
        },
        {
          point: 'Global Leadership Position',
          impact: 'India leads the world in Open Finance adoption, creating first-mover advantage for comprehensive solutions'
        },
        {
          point: 'Untapped Intelligence Layer',
          impact: 'While infrastructure exists, no player offers AI-powered insights + action platform on top of AA data'
        }
      ],
      businessCase: {
        title: 'Perfect Storm: Infrastructure + Demand + Unmet Intelligence Need',
        points: [
          'AA infrastructure solves data aggregation - we add the intelligence layer',
          '80M+ users already comfortable sharing financial data = reduced user acquisition friction',
          'Proven willingness to pay: ₹74,500 Cr disbursals show users act on financial recommendations',
          'Market gap: No comprehensive AI-powered portfolio intelligence platform exists on AA framework',
          'First-mover advantage in AI layer while competition focuses on basic aggregation',
          'Government backing + regulatory clarity reduces platform risk significantly'
        ]
      }
    }
  },
  {
    id: 7,
    type: 'team-funding',
    title: 'Proven Team, Market Validation, Strategic Funding',
    subtitle: '$2.2M to capture $9.2B TAM opportunity',
    icon: Rocket,
    marketValidation: {
      tam: '$9.2B (₹76,750 Cr)',
      successStories: [
        'Nuvama: ₹2.1T AUM, 55% revenue growth',
        '360 One: 13% AUM CAGR target',
        'Market Gap: Only 5% of affluent households use formal wealth management'
      ],
      traction: [
        { metric: '4K MAUs', detail: 'Monthly active users' },
        { metric: '200+ Beta Users', detail: 'Strong early adoption' },
        { metric: '2.5M+ Social Views', detail: 'Strong organic reach' },
        { metric: '2K LinkedIn Followers', detail: 'Professional network growth' }
      ]
    },
    team: [
      {
        name: 'Chief Growth Officer',
        role: 'Growth & Strategy',
        background: ['20+ years experience', 'Built ₹100Cr+ business in 3 years', 'B2C consumer tech growth expertise'],
        experience: 'Ex-TataSky'
      },
      {
        name: 'Chief Product Officer',
        role: 'Product & AI Strategy',
        background: ['19+ years strategic product & AI leader', 'Scaled products to 200M+ MAU', 'GenAI/ML: 80%+ churn prediction accuracy', 'IIT Kanpur (AIR 22) + ISB MBA', 'Author of 2 AI books'],
        experience: 'Ex-Microsoft, Ex-BigTech VP'
      }
    ],
    funding: {
      amount: '$2.2M USD',
      runway: '18 months',
      useOfFunds: [
        { category: 'Technology & Product', percentage: '40%' },
        { category: 'Customer Acquisition', percentage: '30%' },
        { category: 'Team Expansion', percentage: '20%' },
        { category: 'Operations & Compliance', percentage: '10%' }
      ]
    },
    executionMilestones: [
      '1 Million users milestone',
      '50K paying subscribers in 18 months',
      '₹15 Cr ARR target',
      '100+ financial platform integrations',
      'Series A readiness'
    ]
  }
];