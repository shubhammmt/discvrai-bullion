import { Brain, TrendingUp, Target, Users, Rocket } from 'lucide-react';

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
    type: 'problem',
    title: 'The Scattered Financial Life Problem',
    subtitle: 'Multi-Account Chaos in India\'s Growing Market',
    icon: TrendingUp,
    keyStats: [
      {
        number: '14 Crore',
        label: 'Demat Accounts',
        description: 'Growing 28% YoY'
      },
      {
        number: '13 Crore',
        label: 'MF Investors',
        description: '₹61L Cr AUM'
      },
      {
        number: '3-5',
        label: 'Accounts per User',
        description: 'Average juggling'
      },
      {
        number: '75%',
        label: 'Goal Confusion',
        description: 'Can\'t track progress'
      }
    ],
    painPoints: [
      'Portfolio scattered across multiple platforms',
      'No unified performance tracking or goal planning', 
      'Manual reconciliation leads to poor decisions',
      'Tax complexity during filing season'
    ]
  },
  {
    id: 3,
    type: 'solution',
    title: 'Universal Financial Aggregation + AI Intelligence',
    subtitle: 'Your entire financial life, unified in one intelligent platform',
    icon: Target,
    features: [
      {
        title: 'Universal Aggregation',
        description: 'Connect all accounts: Stocks, MF, Insurance, Bank, Crypto',
        capabilities: ['Real-time sync across 50+ platforms', 'Account Aggregator framework + APIs', 'Unified portfolio view']
      },
      {
        title: 'Intelligent Insights', 
        description: 'AI-powered portfolio analysis and recommendations',
        capabilities: ['Goal-based planning', 'Tax optimization', 'Risk assessment', 'Rebalancing alerts']
      },
      {
        title: 'Seamless Action',
        description: 'Execute trades and manage investments across platforms',
        capabilities: ['Automated rebalancing', 'Goal-based SIP management', 'Cross-platform trading']
      },
      {
        title: 'Mass Market Focus',
        description: 'Affordable intelligence for every Indian investor',
        capabilities: ['₹3,800/year vs ₹25,000+ competitors', '50+ integrations vs 10-15', 'AI-driven insights, not just aggregation']
      }
    ]
  },
  {
    id: 4,
    type: 'market',
    title: 'Massive Market, Proven Traction',
    subtitle: 'Validated demand in India\'s fastest-growing fintech sector',
    icon: TrendingUp,
    marketSize: {
      tam: '₹2,880 Cr',
      tamDetails: '24M multi-account Indians × ₹12K annual value',
      sam: '₹720 Cr', 
      samDetails: '6M urban professionals × ₹12K',
      som: '₹72 Cr',
      somDetails: '600K early adopters × ₹12K (3 year target)'
    },
    traction: [
      {
        metric: 'Waitlist Users',
        value: '4,000',
        growth: 'Pre-launch validation'
      },
      {
        metric: 'Active Beta Users', 
        value: '200+',
        growth: '78% report "cannot go back"'
      },
      {
        metric: 'Social Reach',
        value: '1.5M',
        growth: 'Views across platforms'
      }
    ],
    competitors: [
      'Nuvama Wealth: ₹4,500 Cr revenue (HNI only)',
      '360 One WAM: ₹2,100 Cr AUM growth',
      'Market gap: No intelligent mass-market solution'
    ]
  },
  {
    id: 5,
    type: 'team',
    title: 'Experienced Team, Strategic Funding',
    subtitle: '₹2.2M to capture India\'s portfolio aggregation opportunity',
    icon: Users,
    team: [
      {
        name: 'Chief Growth Officer',
        role: 'Growth & Strategy',
        background: ['20+ years experience', 'Built ₹100Cr+ business in 3 years', 'B2C consumer tech expertise'],
        experience: 'Ex-TataSky'
      },
      {
        name: 'Chief Product Officer',
        role: 'Product & Technology', 
        background: ['VP at India\'s biggest tech company', 'Consumer products for millions', 'IIT-K CSE'],
        experience: 'Ex-Microsoft'
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