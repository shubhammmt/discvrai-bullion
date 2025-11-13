import { 
  Building2, 
  Target, 
  Lightbulb, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Puzzle, 
  Network, 
  BarChart3, 
  Award, 
  Rocket,
  Brain,
  Globe
} from 'lucide-react';

export const amcPitchSlides = [
  {
    id: 1,
    type: 'company-intro',
    title: 'Who We Are: DISCVR.AI',
    subtitle: 'AI-Powered Financial Research Infrastructure',
    icon: Building2,
    founder: {
      name: 'Shubham Srivastava',
      title: 'Founder & CEO',
      background: [
        'Ex-CTO, Hindustan Times Digital (scaled to 100M+ MAUs)',
        'Ex-CTO, Eureka Forbes (1M+ MAUs)',
        'Ex-MakeMyTrip Hotels (NoSQL pioneer, 1M QPS global systems)',
        'IIT(ISM) Dhanbad, 2nd-time founder',
        '20+ years building large-scale digital platforms'
      ]
    },
    company: {
      age: '1.5 years old',
      funding: 'Bootstrapped with significant founder investment',
      location: 'Gurgaon',
      team: [
        { role: 'Engineers', focus: 'AI/ML, platform scalability' },
        { role: 'Research team', focus: 'Equity/MF analysis' },
        { role: 'Content team', focus: '500 articles/day capability' }
      ]
    },
    whatWeDo: [
      'AI-powered financial research infrastructure',
      'Content-to-commerce platform enabling low-CAC distribution'
    ]
  },
  {
    id: 2,
    type: 'cover',
    title: 'Transform Into a Tech-First AMC',
    subtitle: 'Go to Market in Days to Weeks, Not Years',
    icon: Rocket,
    keyMessage: 'Most AMCs spend ₹15-20 Cr ($1.5-2M USD) + 1.5-2 years building digital platforms. We enable you to launch a full D2C + distributor ecosystem in days to weeks depending on scope.'
  },
  {
    id: 3,
    type: 'challenge',
    title: 'The Digital Challenge',
    subtitle: 'AMCs Face Two Key Scenarios',
    icon: Target,
    scenarios: [
      {
        title: 'No Platform',
        problem: 'Building in-house requires ₹15-20 Cr + 1.5-2 years',
        pain: 'Delayed go-to-market, high burn rate, competitive disadvantage'
      },
      {
        title: 'Have Platform, Need Intelligence',
        problem: 'Basic calculators, no AI, poor UX, zero engagement',
        pain: 'Low conversion, high CAC, poor retention, no viral growth'
      }
    ]
  },
  {
    id: 4,
    type: 'd2c-funnel',
    title: 'Tech-First AMC Solution: D2C Buy Funnel',
    subtitle: 'End-to-End Consumer Journey',
    icon: ShoppingCart,
    forConsumers: {
      discovery: [
        'AI-powered fund discovery (natural language: "best tax-saving funds")',
        'Theme-based discovery ("ESG funds", "Small-cap growth")',
        'Conventional filters (category, AMC, performance, risk)'
      ],
      intelligence: [
        'Portfolio analysis (existing holdings + diversification check)',
        'Rule-based fund scoring (8,000+ funds ranked on 15+ parameters)',
        'Calculator suite: SIP, Lump-sum, Step-up SIP, Tax-saving optimizer'
      ],
      conversion: [
        'AI agents - Voice + Text',
        'Multi-language support (11 Indian languages)',
        'Conversational buying: "I want to invest ₹5000/month for retirement"'
      ]
    },
    forDistributors: [
      'Same flow with custom configurations',
      'White-label branding',
      'Client CRM integration',
      'Works with BSE StAR/MFCentral (no transaction conflicts)'
    ],
    timeline: 'Days to weeks depending on scope once aligned',
    bottomLine: 'Your brand. Your distributors. Our AI brain. Live in days to weeks once aligned.'
  },
  {
    id: 5,
    type: 'content-distribution',
    title: 'Distribution at Scale: Multi-Million MAU Engine',
    subtitle: 'The Content Flywheel',
    icon: TrendingUp,
    contentProduction: [
      'Text: 180-500 articles/day (market updates, fund analysis, stock deep-dives)',
      'Video: 50+ reels/shorts monthly (Instagram, YouTube, WhatsApp)',
      'Vernacular content (11 languages)',
      'Auto-generated fund reports (8K+ MF pages)'
    ],
    seoDiscovery: [
      'Organic traffic engine (web + app)',
      'AI search surfaces (Google, ChatGPT, Perplexity)',
      'Social distribution (Instagram, LinkedIn, Telegram, WhatsApp communities)'
    ],
    conversionPath: [
      'Behavioral signals (scroll depth, dwell time, calculator usage)',
      'Personalized content recommendations',
      'Commerce CTAs at moment of intent',
      'Example: "Best mutual funds 2026" article → Fund screener → SIP calculator → Buy CTA'
    ],
    timeline: [
      { period: '2 quarters', result: '500K-1M MAUs (SEO foundation + content scaling)' },
      { period: '4 quarters', result: '2-3M MAUs (viral loops + influencer pods)' },
      { period: '6 quarters', result: '5-10M MAUs (vernacular expansion + regional penetration)' }
    ],
    benefits: [
      'Low-CAC user acquisition',
      'High-intent traffic (research → buy funnel)',
      'Brand authority through content',
      'Reusable growth assets (every article is permanent)'
    ],
    bottomLine: "We don't just give you a platform. We give you distribution at scale."
  },
  {
    id: 6,
    type: 'engagement',
    title: 'Engagement & Brand Awareness',
    subtitle: 'Contest Platform for Product Launches',
    icon: Award,
    campaigns: [
      {
        type: 'Product Launch Campaigns',
        examples: [
          'New fund launches: "Beat the NFO" contest',
          'Quiz: "Why this fund fits your portfolio?"',
          'Reward: Top participants get ₹10K in fund investments'
        ]
      },
      {
        type: 'Ongoing Brand Engagement',
        examples: [
          'Monthly stock-picking contests',
          'Fund selection challenges',
          'Financial literacy quizzes',
          'Leaderboards (retail + distributor tracks)'
        ]
      },
      {
        type: 'NFO-Specific Activations',
        examples: [
          'Virtual portfolio challenges (build best portfolio with new NFO)',
          'Referral contests (invite friends, top referrers win)',
          'Educational drip campaigns (daily quiz unlocking NFO insights)'
        ]
      }
    ],
    outcomes: [
      '3x daily active users during campaigns',
      '10K+ participants per contest',
      '50K+ app opens',
      'Viral sharing (contests drive organic referrals)',
      'First-party data on engaged investors'
    ],
    integration: [
      'Plug-and-play contest engine',
      'Your branding, your rewards',
      'Real-time leaderboards',
      'Analytics dashboard (engaged users and preferences)'
    ],
    bottomLine: 'Turn every product launch into a viral engagement event.'
  },
  {
    id: 7,
    type: 'engines',
    title: '3 Core Engines',
    subtitle: 'AI-Powered Research Infrastructure',
    icon: Brain,
    engines: [
      {
        name: 'MF Intelligence Engine',
        features: [
          '8,000+ funds with rule-based scoring on 15+ parameters',
          'AI-powered discovery (natural language + themes)',
          'Portfolio analysis & diversification checks',
          'Voice + Text AI agents (11 Indian languages)'
        ]
      },
      {
        name: 'Stock Research Engine',
        features: [
          '14K+ equity research pages',
          'AI-generated summaries & insights',
          'Real-time market data integration',
          'Behavioral personalization layer'
        ]
      },
      {
        name: 'Engagement Engine',
        features: [
          'Quizzes, polls, contests platform',
          'Virtual portfolio analysis',
          'Calculator suite (SIP, lump-sum, step-up)',
          'Multi-language support (11 languages)'
        ]
      }
    ]
  },
  {
    id: 8,
    type: 'flywheel',
    title: 'The Engagement Flywheel',
    subtitle: 'How Habit Formation Drives Conversions',
    icon: Network,
    retail: [
      'Daily content (180-500 articles/day)',
      'Quizzes & polls (gamification)',
      'Watchlists & alerts (personalization)',
      'AI assistants (voice/text)',
      'Virtual portfolio (analysis)',
      'Calculators (planning tools)'
    ],
    distributors: [
      'White-label platform',
      'Client CRM integration',
      'Custom branding',
      'Contest leaderboards',
      'Referral tracking',
      'Analytics dashboard'
    ],
    outcome: 'Habit formation → Daily engagement → High-intent conversions → Viral growth'
  },
  {
    id: 9,
    type: 'integration',
    title: 'Integration Paths',
    subtitle: '3 Ways to Go Live',
    icon: Puzzle,
    paths: [
      {
        type: 'Widget',
        description: 'Embed calculators, fund screeners on your site',
        timeline: 'Days to weeks depending on scope',
        effort: 'Minimal'
      },
      {
        type: 'API',
        description: 'Full backend integration with your platform',
        timeline: 'Days to weeks depending on scope',
        effort: 'Medium'
      },
      {
        type: 'Turnkey Platform',
        description: 'Complete white-label D2C + distributor platform',
        timeline: 'Days to weeks depending on scope',
        effort: 'Plug & Play'
      }
    ],
    note: "Timeline depends on alignment. Dedicated team works exclusively on your implementation."
  },
  {
    id: 10,
    type: 'distributor',
    title: 'Distributor Platform',
    subtitle: 'White-Label Solution for 5K+ Distributors',
    icon: Users,
    features: [
      'Custom branding per distributor',
      'Client portfolio management',
      'Transaction tracking & reporting',
      'Contest participation & leaderboards',
      'Commission tracking',
      'BSE StAR/MFCentral integration',
      'Mobile + web responsive',
      'Multi-language support'
    ],
    benefits: [
      'Empower distributors with tech-first tools',
      'No conflict with existing workflows',
      'Increase distributor productivity 3x',
      'Viral growth through distributor networks'
    ]
  },
  {
    id: 11,
    type: 'roi',
    title: 'ROI Calculator',
    subtitle: 'Cost Savings vs Building In-House',
    icon: BarChart3,
    buildInHouse: {
      cost: '₹15-20 Cr ($1.5-2M USD)',
      timeline: '1.5-2 years',
      team: '50+ engineers, designers, content ops',
      risk: 'High burn, delayed GTM, execution risk'
    },
    withDiscvr: {
      cost: 'Fraction of in-house cost',
      timeline: 'Days to weeks depending on scope',
      team: 'Zero hiring, dedicated DISCVR team',
      risk: 'Proven platform, immediate ROI'
    },
    savings: [
      'Save ₹10-15 Cr in Year 1',
      'Go to market 12-18 months faster',
      'Zero team hiring & management overhead',
      'Ongoing updates & feature releases included'
    ]
  },
  {
    id: 12,
    type: 'competitive',
    title: 'Why DISCVR Wins',
    subtitle: 'Competitive Differentiation',
    icon: Lightbulb,
    vsCompetitors: [
      {
        competitor: 'ValueResearch / Morningstar',
        ourEdge: [
          'Voice + Text AI agents (11 languages)',
          'Content distribution engine (multi-million MAU capability)',
          'Contest/engagement platform (viral mechanics)',
          'White-label platform for AMCs',
          'Distributor ecosystem integration'
        ]
      },
      {
        competitor: 'In-House Development',
        ourEdge: [
          '10-15x faster time to market',
          '50-80% cost savings',
          'Proven platform with existing scale',
          'Continuous innovation & updates',
          'Zero hiring & retention risk'
        ]
      }
    ]
  },
  {
    id: 13,
    type: 'cta',
    title: 'Get Started',
    subtitle: 'Three Ways to Begin',
    icon: Rocket,
    options: [
      {
        title: 'Discovery Workshop',
        description: 'Free 2-hour session to map your requirements',
        timeline: 'This week'
      },
      {
        title: 'Pilot Program',
        description: 'Limited scope pilot with one distributor or D2C flow',
        timeline: 'Days to weeks depending on scope'
      },
      {
        title: 'Full Platform Launch',
        description: 'End-to-end D2C + distributor ecosystem',
        timeline: 'Days to weeks depending on scope'
      }
    ],
    contact: {
      name: 'Shubham Srivastava',
      email: 'shubham@discvr.ai',
      phone: '+91 98739 61591',
      linkedin: 'https://www.linkedin.com/in/shubhamsrivastava1/'
    }
  }
];
