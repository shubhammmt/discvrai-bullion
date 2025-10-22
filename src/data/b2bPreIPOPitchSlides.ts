import { 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  DollarSign,
  Rocket,
  Network,
  Building2,
  Handshake,
  LineChart,
  BrainCircuit,
  Shield,
  Wallet
} from 'lucide-react';

export const b2bPreIPOPitchSlides = [
  {
    type: 'title',
    title: 'Discvr.ai',
    subtitle: 'Building India\'s Financial Intelligence Platform',
    tagline: 'Strategic Partnership & Investment Opportunity',
    icon: BrainCircuit,
  },
  {
    type: 'about',
    title: 'About Discvr',
    subtitle: 'AI-Powered Financial Research + Human Expertise',
    icon: Target,
    description: 'Discvr is building India\'s most credible financial decision platform by combining AI-powered research with community-driven validation from finance professionals.',
    positioning: 'We\'re the "Amazon for financial products" - comprehensive reviews, AI recommendations, and community insights for every investment decision.',
    features: [
      'AI-powered stock screening and research across 5,000+ listed companies',
      'Community validation from 10,000+ finance professionals (CFAs, analysts, advisors)',
      'Comprehensive coverage: Stocks, Mutual Funds, IPOs, Credit Cards, Insurance',
      'Portfolio aggregation technology (connects to 50+ financial institutions)',
      'Real-time sentiment analysis and social proof for financial products'
    ]
  },
  {
    type: 'business-model',
    title: 'What We Do vs. Don\'t Do',
    subtitle: 'Clear Positioning in the Financial Ecosystem',
    icon: Building2,
    whatWeDo: [
      {
        title: 'Research & Insights Platform',
        description: 'AI-powered screening, analysis, and recommendations across all financial products'
      },
      {
        title: 'Community Validation',
        description: 'Professional reviews, ratings, and credibility scoring from finance experts'
      },
      {
        title: 'Portfolio Intelligence',
        description: 'Aggregation, health scoring, and rebalancing recommendations across assets'
      },
      {
        title: 'B2B Data & API Services',
        description: 'Alternative data licensing, white-label solutions, and portfolio technology for enterprises'
      }
    ],
    whatWeDont: [
      {
        title: 'Brokerage or Execution',
        description: 'We don\'t execute trades, buy/sell securities, or handle transactions'
      },
      {
        title: 'Asset Management',
        description: 'We don\'t manage money, create funds, or act as registered investment advisors'
      },
      {
        title: 'Pre-IPO Trading/Liquidity',
        description: 'We don\'t facilitate pre-IPO transactions or provide liquidity solutions'
      },
      {
        title: 'Banking or Lending',
        description: 'We don\'t provide loans, credit facilities, or banking services'
      }
    ]
  },
  {
    type: 'compounding-growth',
    title: 'The Compounding Machine',
    subtitle: 'How We Achieve Non-Linear Growth in 12 Months',
    icon: Rocket,
    flywheel: {
      title: 'Network Effects Flywheel',
      stages: [
        { stage: 'Month 0-3', focus: 'Foundation', description: 'Launch with 100 power users (finance professionals) → Generate initial reviews and ratings' },
        { stage: 'Month 3-6', focus: 'Acceleration', description: '10,000 active users → SEO content scales → Organic traffic compounds → Community reviews attract more experts' },
        { stage: 'Month 6-9', focus: 'Monetization', description: 'Premium subscriptions launch → B2B pilots convert → Data licensing begins → Revenue compounds' },
        { stage: 'Month 9-12', focus: 'Profitability', description: 'Cashflow positive → 50,000 users → Multiple B2B contracts → Self-sustaining growth machine' }
      ]
    },
    compoundingFactors: [
      {
        factor: 'Content Compounding',
        description: 'Every review, rating, and AI insight adds to our SEO moat → Organic traffic grows exponentially',
        impact: '20% month-over-month organic growth once flywheel kicks in'
      },
      {
        factor: 'Data Compounding',
        description: 'More users → Better data → Better AI → Attracts more users → Premium data product for B2B',
        impact: 'B2B data licensing scales to ₹50L+ ARR without additional cost'
      },
      {
        factor: 'Community Compounding',
        description: 'Top contributors build reputation → Attract more experts → Platform credibility increases → Network effects',
        impact: 'Every 100 experts brings 1,000+ users organically'
      },
      {
        factor: 'Revenue Compounding',
        description: 'Subscription revenue → Reinvest in AI → Better product → Higher retention → Lifetime value grows',
        impact: 'LTV:CAC ratio improves from 3:1 to 8:1 in 12 months'
      }
    ],
    metrics: {
      month3: { users: '10K', revenue: '₹2L MRR', status: 'Building' },
      month6: { users: '30K', revenue: '₹8L MRR', status: 'Scaling' },
      month9: { users: '50K', revenue: '₹18L MRR', status: 'Monetizing' },
      month12: { users: '75K', revenue: '₹30L MRR', status: 'Profitable' }
    }
  },
  {
    type: 'path-to-profitability',
    title: 'Path to Profitability',
    subtitle: '12-Month Journey to Cashflow Positive',
    icon: TrendingUp,
    timeline: [
      {
        phase: 'Q1 2025 - Foundation',
        revenue: '₹2L MRR',
        costs: '₹8L/month',
        burn: '-₹6L/month',
        keyMetrics: '10K users, 100 paying subscribers, 5 B2B pilots',
        milestones: [
          'Launch premium subscription (₹199/month)',
          'Sign 5 B2B pilot contracts (₹50K each)',
          'Achieve 100 paying subscribers',
          'Content SEO engine operational'
        ]
      },
      {
        phase: 'Q2 2025 - Acceleration',
        revenue: '₹8L MRR',
        costs: '₹10L/month',
        burn: '-₹2L/month',
        keyMetrics: '30K users, 500 paying subscribers, 10 B2B clients',
        milestones: [
          'Scale to 500 premium subscribers',
          'Convert 5 pilots to annual contracts (₹3L each)',
          'Launch data licensing product (₹2L/client)',
          'Organic traffic at 50K visits/month'
        ]
      },
      {
        phase: 'Q3 2025 - Monetization',
        revenue: '₹18L MRR',
        costs: '₹12L/month',
        burn: '+₹6L/month',
        keyMetrics: '50K users, 1,500 subscribers, 15 B2B clients',
        milestones: [
          'First profitable month (Month 9)',
          '1,500 paying subscribers (₹30L ARR)',
          '3 white-label deals signed (₹10L each)',
          'Data licensing revenue at ₹6L/month'
        ]
      },
      {
        phase: 'Q4 2025 - Profitability',
        revenue: '₹30L MRR',
        costs: '₹15L/month',
        profit: '+₹15L/month',
        keyMetrics: '75K users, 3,000 subscribers, 25 B2B clients',
        milestones: [
          'Consistently profitable (₹15L/month profit)',
          '3,000 premium subscribers (₹72L ARR)',
          '₹2Cr+ annual revenue run rate',
          'Self-sustaining growth machine'
        ]
      }
    ],
    revenueBreakdown: {
      subscriptions: { percentage: 40, amount: '₹12L MRR', description: '3,000 users at ₹399/month' },
      b2bContracts: { percentage: 35, amount: '₹10.5L MRR', description: '25 clients at average ₹42K/month' },
      dataLicensing: { percentage: 15, amount: '₹4.5L MRR', description: '5 hedge funds/institutions' },
      affiliateRevenue: { percentage: 10, amount: '₹3L MRR', description: 'Broker, MF, insurance referrals' }
    }
  },
  {
    type: 'b2b-partnerships',
    title: 'Partnership Opportunities with Pre-IPO Business',
    subtitle: 'Strategic Collaboration Framework',
    icon: Handshake,
    partnerships: [
      {
        partner: 'Pre-IPO Deal Flow Intelligence',
        description: 'Provide sentiment analysis, retail investor interest data, and AI-powered research on upcoming IPO companies',
        enablers: ['Real-time sentiment tracking', 'Community polling on IPO interest', 'AI-powered IPO analysis reports', 'Early demand signals from our user base']
      },
      {
        partner: 'Investor Acquisition Channel',
        description: 'Direct access to 75K+ qualified investors actively researching pre-IPO opportunities',
        enablers: ['Co-branded pre-IPO content', 'Exclusive deal access for premium users', 'Educational webinars on pre-IPO investing', 'Lead generation for accredited investors']
      },
      {
        partner: 'Portfolio Management for Clients',
        description: 'White-label portfolio aggregation technology to help your clients track pre-IPO holdings alongside public assets',
        enablers: ['Custom dashboard for pre-IPO + public holdings', 'Performance tracking across asset classes', 'Exit planning and liquidity analysis', 'Tax optimization insights']
      },
      {
        partner: 'Co-Branded Pre-IPO Platform',
        description: 'Create separate brand for pre-IPO/bonds marketplace powered by Discvr technology',
        enablers: ['Research & due diligence infrastructure', 'Community validation layer', 'Portfolio tracking integration', 'Compliance and credibility framework']
      }
    ],
    coreCapabilities: [
      'AI-powered research engine (5,000+ company coverage)',
      'Portfolio aggregation technology (50+ institutions)',
      'Community of 10,000+ finance professionals',
      'SEO content engine (100K+ monthly visitors potential)',
      'Real-time sentiment and social proof infrastructure'
    ],
    strategicValue: [
      'Reduce customer acquisition cost by 60% through organic channels',
      'Increase deal flow visibility with retail investor sentiment data',
      'Enhance client retention with portfolio management tools',
      'Build credibility through community-validated research',
      'Scale distribution without linear cost increase'
    ]
  },
  {
    type: 'b2b-business-model',
    title: 'B2B Revenue Model',
    subtitle: 'Enterprise Solutions & Pricing',
    icon: DollarSign,
    marketSize: {
      global: '$15B B2B Fintech Market (2024)',
      india: '$2B India Opportunity',
      growth: '28% CAGR (2024-2030)'
    },
    revenueStreams: [
      {
        segment: 'API & Data Services',
        description: 'Real-time alternative data feeds for hedge funds, asset managers, and institutional investors',
        pricing: '₹2-5L per month per client',
        marketSize: '200+ potential clients in India',
        timeline: 'Revenue starting Q2 2025'
      },
      {
        segment: 'White-Label Solutions',
        description: 'Portfolio aggregation and research platform for banks, wealth managers, and fintechs',
        pricing: '₹5-15L per year per client',
        marketSize: '50+ banks and wealth platforms',
        timeline: 'First contracts in Q3 2025'
      },
      {
        segment: 'Pre-IPO Research Partnership',
        description: 'Dedicated research, sentiment analysis, and investor intelligence for pre-IPO firms',
        pricing: '₹3-8L per year + revenue share',
        marketSize: '10+ pre-IPO platforms/dealers',
        timeline: 'Pilot starting Q2 2025'
      },
      {
        segment: 'Co-Branded Platform',
        description: 'Separate brand for pre-IPO/bonds marketplace with technology licensing + revenue share',
        pricing: '₹20L setup + 15% revenue share',
        marketSize: '2-3 strategic partnerships',
        timeline: 'Launch in Q4 2025'
      }
    ],
    competitiveAdvantages: [
      'Comprehensive asset coverage (stocks, MF, IPO, pre-IPO, insurance, credit)',
      'AI + Human validation (unique hybrid intelligence)',
      'Real-time sentiment and social proof data',
      'Portfolio aggregation across 50+ institutions',
      'Network effects from growing community'
    ],
    financialProjections: {
      year1: { clients: '25 B2B clients', arr: '₹1.2Cr', margin: '70%' },
      year2: { clients: '60 B2B clients', arr: '₹4Cr', margin: '75%' },
      year3: { clients: '120 B2B clients', arr: '₹10Cr', margin: '80%' }
    }
  },
  {
    type: 'ask',
    title: 'Investment & Partnership Proposal',
    subtitle: 'Strategic Opportunity',
    icon: Wallet,
    investment: {
      amount: '₹50L - ₹1Cr',
      structure: 'Convertible Note or Direct Equity',
      valuation: '₹8Cr pre-money valuation',
      equity: '6-12% equity stake'
    },
    convertibleNoteExplanation: 'A convertible note allows investment now with conversion to equity at the next funding round (typically Series A), offering investors a discount (15-20%) and valuation cap (₹15Cr) as early-stage benefits.',
    benefits: [
      'Strategic investor status with board observer seat',
      'Preferred partnership terms for pre-IPO collaboration',
      'First access to B2B data products and white-label solutions',
      'Co-branding opportunities for pre-IPO platform',
      'Revenue sharing on referred B2B clients'
    ],
    returns: {
      conservative: { multiple: '5x', timeline: '3 years', exit: '₹40Cr valuation' },
      moderate: { multiple: '10x', timeline: '4 years', exit: '₹80Cr valuation' },
      optimistic: { multiple: '20x', timeline: '5 years', exit: '₹160Cr+ valuation' }
    },
    exitScenarios: [
      { scenario: 'Acquisition by banking tech provider', valuation: '₹50-100Cr', timeline: '3-4 years', probability: '60%' },
      { scenario: 'Series B funding round', valuation: '₹80-150Cr', timeline: '4-5 years', probability: '30%' },
      { scenario: 'Strategic merger with fintech platform', valuation: '₹100Cr+', timeline: '4-5 years', probability: '10%' }
    ],
    useOfFunds: [
      { category: 'Product Development', percentage: 35, amount: '₹35L', description: 'AI infrastructure, portfolio tech, mobile apps' },
      { category: 'Team Expansion', percentage: 25, amount: '₹25L', description: '5 key hires: AI engineers, product, sales' },
      { category: 'Community Growth', percentage: 20, amount: '₹20L', description: 'Creator program, contests, expert incentives' },
      { category: 'B2B Sales & Partnerships', percentage: 15, amount: '₹15L', description: 'Enterprise sales team, pilot programs' },
      { category: 'Contingency & Operations', percentage: 5, amount: '₹5L', description: 'Legal, compliance, working capital' }
    ],
    milestones: [
      { timeline: 'Month 3', milestone: '10K users, 5 B2B pilots signed' },
      { timeline: 'Month 6', milestone: '30K users, ₹8L MRR, 10 B2B clients' },
      { timeline: 'Month 9', milestone: 'First profitable month, 50K users' },
      { timeline: 'Month 12', milestone: '₹30L MRR, ₹2Cr+ ARR, cashflow positive' }
    ]
  },
  {
    type: 'cta',
    title: 'Next Steps',
    subtitle: 'Let\'s Build Together',
    icon: Rocket,
    contact: {
      name: 'Founder, Discvr.ai',
      email: 'founder@discvr.ai',
      phone: '+91 XXXXX XXXXX'
    },
    nextSteps: [
      {
        step: 'Partnership Pilot',
        timeline: 'Week 1-2',
        description: 'Design 90-day pilot for pre-IPO deal flow intelligence and investor access',
        deliverables: ['Sentiment analysis on 5 upcoming IPOs', 'Lead generation from qualified investors', 'Community polling on deal interest']
      },
      {
        step: 'Investment Terms Discussion',
        timeline: 'Week 2-3',
        description: 'Finalize investment structure, valuation, and strategic benefits',
        deliverables: ['Term sheet preparation', 'Due diligence materials', 'Board observer rights discussion']
      },
      {
        step: 'Legal & Documentation',
        timeline: 'Week 3-4',
        description: 'Execute investment agreement and partnership contracts',
        deliverables: ['Investment agreement', 'Partnership MOU', 'IP and data licensing terms']
      },
      {
        step: 'Partnership Launch',
        timeline: 'Month 2',
        description: 'Begin pilot collaboration and strategic initiatives',
        deliverables: ['Co-branded content series', 'Investor webinar', 'First data delivery']
      }
    ],
    callToAction: 'Let\'s discuss how we can build India\'s most credible pre-IPO intelligence platform together.'
  }
];
