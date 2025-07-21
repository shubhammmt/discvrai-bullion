import { Brain, TrendingUp, Target, Users, Rocket, DollarSign, BarChart3 } from 'lucide-react';

export const pitchSlidesV3 = [
  {
    id: 1,
    type: 'title',
    title: 'DISCVR.AI',
    subtitle: "India's Simple Portfolio Holder",
    author: 'Intelligent Financial Aggregation for Modern India',
    icon: Brain
  },
  {
    id: 2,
    type: 'market-opportunity',
    title: 'India\'s Financial Explosion',
    subtitle: 'Massive Market with Automatic Demand Validation',
    icon: BarChart3,
    marketData: {
      totalMarket: '₹4,00,00,000+ Cr',
      description: 'Total Financial Assets Under Management',
      breakdown: [
        { asset: 'Bonds', value: '₹2,30,00,000 Cr', growth: '6.5% growth' },
        { asset: 'Equity Market', value: '₹45,94,586 Cr', growth: '5th globally' },
        { asset: 'Mutual Funds', value: '₹74,41,000 Cr', growth: '6x in 10 years' },
        { asset: 'Fixed Deposits', value: '₹41,11,000 Cr', growth: '95% families invest' }
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
    type: 'target-persona',
    title: 'Target Cohorts - The Multi-Account Problem',
    subtitle: 'Clear User Segments, Validated Revenue Potential',
    icon: Users,
    personas: [
      {
        title: 'Basic Investors',
        size: '3-5 Crore Users',
        profile: '1-2 accounts, new to investing',
        problems: ['Need simple portfolio tracking', 'Basic insights required'],
        revenue: '₹500-2,000 annually',
        marketSize: '₹3,000-5,000 Cr'
      },
      {
        title: 'Multi-Platform Users',
        size: '2-3 Crore Users', 
        profile: '2-5 accounts across platforms',
        problems: ['Management complexity', 'No unified view', 'Manual reconciliation'],
        revenue: '₹2,000-8,000 annually',
        marketSize: '₹10,000-15,000 Cr'
      },
      {
        title: 'Power Investors',
        size: '50-80 Lakh Users',
        profile: '>5 accounts, advanced needs',
        problems: ['Advanced analytics required', 'Tax optimization needs', 'Performance tracking'],
        revenue: '₹10,000-50,000 annually',
        marketSize: '₹15,000-24,000 Cr'
      },
      {
        title: 'Clear Portfolio Seekers',
        size: '1-2 Crore Users',
        profile: 'Want unified dashboard with AI',
        problems: ['Consolidated view needed', 'Performance analytics', 'Goal tracking'],
        revenue: '₹5,000-25,000 annually',
        marketSize: '₹15,000-30,000 Cr'
      }
    ],
    totalTAM: '₹76,750 Cr',
    keyInsight: '6-7 Cr unique investors managing 43+ Cr accounts = Massive aggregation opportunity'
  },
  {
    id: 4,
    type: 'solution',
    title: 'Universal Financial Aggregation + AI Intelligence',
    subtitle: 'Cohort-Specific Solutions for Every Investor Type',
    icon: Target,
    features: [
      {
        title: 'Universal Aggregation Engine',
        description: 'Connect all financial accounts seamlessly',
        capabilities: [
          'Basic Users: Simple sync across 2-3 platforms',
          'Multi-Platform Users: Advanced sync across 50+ integrations', 
          'Account Aggregator (AA) framework + API integrations',
          'Real-time portfolio synchronization'
        ]
      },
      {
        title: 'Intelligent Insights Layer', 
        description: 'AI-powered personalized recommendations',
        capabilities: [
          'Power Users: Advanced analytics, tax optimization, risk assessment',
          'Portfolio Seekers: AI-powered goal tracking, performance analysis',
          'GenAI + ML platform for personalized insights',
          'Predictive analytics and rebalancing alerts'
        ]
      },
      {
        title: 'Seamless Action Platform',
        description: 'Execute investments across all platforms',
        capabilities: [
          'Cross-platform trading and execution',
          'Automated rebalancing based on goals',
          'Goal-based SIP management and optimization',
          'Tax-efficient investment strategies'
        ]
      }
    ],
    differentiators: [
      'Breadth: 50+ integrations vs competitors\' 10-15',
      'Intelligence: AI-driven insights, not just aggregation',
      'Mass Market: ₹3,800/year vs ₹25,000+ premium solutions',
      'Democratizing Wealth Management for 6-7 Cr investors'
    ]
  },
  {
    id: 5,
    type: 'team',
    title: 'Proven Market, Strong Team, Strategic Funding',
    subtitle: '₹2.2M to capture ₹76,750 Cr TAM opportunity',
    icon: Rocket,
    marketValidation: {
      tam: '₹76,750 Cr',
      successStories: [
        'Nuvama: ₹2.1T AUM, 55% revenue growth',
        '360 One: 13% AUM CAGR target',
        'Market Gap: Only 5% of affluent households use formal wealth management'
      ],
      traction: [
        { metric: '4,000 Waitlist Users', detail: 'Pre-launch validation' },
        { metric: '200+ Beta Users', detail: '78% retention rate' },
        { metric: '1.5M Social Views', detail: 'Strong organic reach' }
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
    keyHires: [
      '4 Senior Engineers',
      '2 Equity Research Analysts', 
      '1 Marketing Head'
    ],
    funding: {
      amount: '₹2.2M',
      runway: '18 months',
      useOfFunds: [
        { category: 'Technology & Product', percentage: '40%' },
        { category: 'Customer Acquisition', percentage: '30%' },
        { category: 'Team Expansion', percentage: '20%' },
        { category: 'Operations & Compliance', percentage: '10%' }
      ]
    },
    executionMilestones: [
      '50K paying subscribers in 18 months',
      '₹15 Cr ARR target',
      '100+ financial platform integrations',
      'Series A readiness'
    ]
  }
];