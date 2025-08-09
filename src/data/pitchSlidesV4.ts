import { Brain, TrendingUp, Target, Users, Rocket, DollarSign, BarChart3, AlertTriangle, Zap, Link, Trophy, Wallet, Building2, Shield, Eye, GitBranch } from 'lucide-react';

export const pitchSlidesV4 = [
  {
    id: 1,
    type: 'title',
    title: 'DISCVR.AI',
    subtitle: "India's AI-Powered Money Platform",
    author: 'Transforming Financial Management for 200M Indians',
    icon: Brain
  },
  {
    id: 2,
    type: 'market-opportunity',
    title: 'India\'s Financial Mass Market Revolution',
    subtitle: 'Digital Explosion Creating the World\'s Largest Financial User Base',
    icon: BarChart3,
    marketStory: {
      headline: 'From 70M to 300M Users: India\'s Financial Digital Transformation',
      massMarketExplosion: [
        {
          category: 'Stock Market Users',
          current: '70M-90M users',
          projected2030: '150M users',
          growth: '67% growth in 5 years',
          catalyst: 'Mobile-first trading, social investing trends'
        },
        {
          category: 'Mutual Fund Investors', 
          current: '55M SIP accounts',
          projected2030: '100M+ accounts',
          growth: '82% growth, ₹22% AUM CAGR',
          catalyst: 'Financial literacy boom, automated investing'
        },
        {
          category: 'Account Aggregator Users',
          current: '10 Crore consents',
          projected2030: '20 Crore+ consents', 
          growth: '1000% YoY current growth',
          catalyst: 'Government push, proven data sharing comfort'
        },
        {
          category: 'Credit Card Holders',
          current: '110M cards active',
          projected2030: '200M+ cards',
          growth: '81% expansion in spending power',
          catalyst: 'Digital payments adoption, rising incomes'
        }
      ],
      massMarketValidation: [
        'Digital-First Generation: 65% of users under 35, naturally multi-platform',
        'Proven Willingness to Pay: ₹74,500 Cr disbursed via AA in H1 FY25 alone',
        'Complexity Crisis: Average user manages 2+ financial accounts, needs unified view',
        'Government Enabler: RBI-backed Account Aggregator creating data sharing comfort'
      ]
    },
    productGrowthAcrossCategories: {
      investmentProducts: {
        currentUsers: '125M combined (stocks + MF)',
        projected2030: '250M+ users',
        painPoint: 'Fragmented tracking across 5+ apps',
        opportunitySize: '₹474 Lakh Crore+ AUM'
      },
      creditProducts: {
        currentUsers: '110M credit card users',
        projected2030: '200M+ users', 
        painPoint: 'No unified spending analytics',
        opportunitySize: '₹15+ Lakh Crore annual spends'
      },
      protectionProducts: {
        currentGap: '70% lack adequate coverage',
        projected2030: '150M+ insured digitally',
        painPoint: 'No integrated risk assessment',
        opportunitySize: '₹8+ Lakh Crore premiums'
      }
    },
    keyInsight: 'India is creating the world\'s largest digitally-native financial user base, but they\'re drowning in fragmentation'
  },
  {
    id: 3,
    type: 'market-growth',
    title: 'TAM/SAM/SOM: User-Centric Market Opportunity',
    subtitle: 'Rs 1,200 ARPU × Strategic User Acquisition = $4B+ Market',
    icon: Target,
    marketSizing: {
      tam: {
        size: '**200M-300M users**',
        users: '$2.9B - $4.3B revenue opportunity',
        description: 'Total addressable users across all financial products',
        calculation: '250M users × ₹1,200 ARPU = ₹30,000 Cr ($3.6B)',
        breakdown: [
          '**Investment Products: 250M users** → ₹30,000 Cr potential',
          '**Credit Products: 200M users** → ₹24,000 Cr potential', 
          '**Protection Products: 150M users** → ₹18,000 Cr potential',
          '**Planning Services: 100M users** → ₹12,000 Cr potential'
        ]
      },
      sam: {
        size: '**150M-250M users**', 
        users: '$2.2B - $3.6B revenue opportunity',
        description: 'Serviceable addressable market - digitally active users',
        calculation: '200M digital users × ₹1,200 ARPU = ₹24,000 Cr ($2.9B)',
        criteria: [
          '**Multi-account holders: 150M users** → ₹18,000 Cr potential',
          '**Active digital users (>1 login/month): 200M users**',
          '**Income >₹3L annually: 180M users**',
          '**Age 25-45 (prime financial years): 220M users**'
        ]
      },
      som: {
        size: '**25M target users**',
        users: '₹3,000 Cr ($360M) revenue target',
        description: 'Our serviceable obtainable market - 12.5% of SAM',
        calculation: '25M users × ₹1,200 ARPU = ₹3,000 Cr ($360M)', 
        strategy: [
          '**Phase 1: Multi-app jugglers → 5M users** (₹600 Cr)',
          '**Phase 2: Wealth builders → 15M users** (₹1,800 Cr)',
          '**Phase 3: Family managers → 20M users** (₹2,400 Cr)',
          '**Phase 4: Mass market → 25M users** (₹3,000 Cr)'
        ]
      }
    },
    marketProgression: {
      title: 'From Mass Market Explosion to DISCVR Opportunity',
      flow: [
        {
          stage: 'Mass Market Growth',
          size: '**300M total users** by 2030',
          driver: 'Digital adoption + income growth → ₹36,000 Cr potential'
        },
        {
          stage: 'Digital-Active Subset', 
          size: '**200M serviceable users**',
          filter: 'Multi-account + smartphone + income → ₹24,000 Cr addressable'
        },
        {
          stage: 'DISCVR Target Market',
          size: '**25M users (12.5% share)**',
          focus: 'Complexity-overwhelmed power users → ₹3,000 Cr target'
        }
      ]
    },
    revenueValidation: {
      title: 'Proven Revenue Models from Leading Fintech Players',
      examples: [
        '**Cred: 13M MAU** → ₹2,473 Cr revenue (₹1,966 ARPU)',
        '**Groww: 13.1M MAU** → ₹4,056 Cr revenue (₹3,224 ARPU)',
        '**Zerodha: 7.6M MAU** → ₹9,300 Cr revenue (₹12,000 ARPU)',
        '**Upstox: 2.6M MAU** → ₹1,311 Cr revenue (₹5,101 ARPU)'
      ]
    },
    keyInsight: 'India\'s fintech leaders prove massive user monetization. Our conservative ₹1,200 ARPU × 25M users = ₹3,000 Cr ($360M) opportunity with multiple revenue streams.'
  },
  {
    id: 4,
    type: 'problem-statement',
    title: 'The Portfolio Management Crisis',
    subtitle: '100M+ Users Drowning in Financial Complexity',
    icon: AlertTriangle,
    problemData: {
      coreIssue: '100M+ investors managing 2 accounts each across fragmented platforms',
      quantifiedPain: {
        timeWaste: '2-3 hours weekly on manual portfolio tracking',
        errors: '40% make suboptimal decisions due to information fragmentation',
        costs: 'Average ₹50,000+ annual opportunity cost from poor coordination'
      },
      painPoints: [
        {
          category: 'Insurance & Protection Gaps',
          severity: 'Critical',
          stats: [
            '70% lack adequate health coverage',
            '85% have insufficient life insurance',
            '3.9% insurance penetration vs 7.4% global average'
          ]
        },
        {
          category: 'Emergency Fund Crisis',
          severity: 'High',
          stats: [
            '70% lack 6-month emergency funds',
            '68% middle-class families financially vulnerable',
            'Post-COVID: Emergency fund awareness but no execution'
          ]
        },
        {
          category: 'Asset Allocation Chaos',
          severity: 'High',
          stats: [
            '85% have poor asset allocation',
            '70% over-concentrated in single assets',
            'Home bias: 95% invest only domestically'
          ]
        },
        {
          category: 'Digital Fragmentation',
          severity: 'Critical',
          stats: [
            'Average user: 2 financial accounts',
            '5+ apps needed for complete portfolio view',
            '2-3 hours weekly spent on manual tracking'
          ]
        }
      ],
      currentSolutionGaps: [
        '70%+ Unmet Need: No unified real-time aggregation',
        'AI Gap: Generic advice, not personalized for mass market',
        'Action Gap: Tracking tools without execution capability',
        'Family Gap: No multi-member portfolio management',
        'Intelligence Gap: Data without actionable insights'
      ]
    }
  },
  {
    id: 5,
    type: 'solution',
    title: 'DISCVR.AI: Universal Financial Intelligence Platform',
    subtitle: '4 Core Solutions for India\'s Financial Complexity Crisis',
    icon: Zap,
    features: [
      {
        title: 'Universal Aggregation Engine',
        description: 'Connect every financial account in India seamlessly',
        capabilities: [
          'Account Aggregator (AA) framework integration',
          'Real-time sync across 200+ financial institutions', 
          'Intelligent deduplication and data normalization',
          'Email parsing for offline account integration'
        ],
        icon: Link,
        benefit: 'Replace 5+ apps with one unified dashboard'
      },
      {
        title: 'AI-Powered Intelligence Layer', 
        description: 'Transform fragmented data into personalized insights',
        capabilities: [
          'Personalized financial health scoring (0-100)',
          'Insurance gap analysis with specific recommendations',
          'Asset allocation optimization based on goals & risk',
          'Tax optimization and retirement planning guidance'
        ],
        icon: Brain,
        benefit: 'Personal financial advisory available for masses free of cost'
      },
      {
        title: 'Intelligent Execution Platform',
        description: 'Execute financial improvements with one click',
        capabilities: [
          'One-click portfolio rebalancing across platforms',
          'Automated investment execution via partner APIs',
          'Insurance purchase integration',
          'Goal-based SIP automation and optimization'
        ],
        icon: Zap,
        benefit: 'Act on insights instantly vs weeks of manual work'
      },
      {
        title: 'Family Financial Command Center',
        description: 'Manage entire family\'s financial life from one place',
        capabilities: [
          'Multi-member portfolio coordination',
          'Shared financial goals and tracking',
          'Family insurance and emergency fund planning',
          'Generational wealth transfer planning'
        ],
        icon: Users,
        benefit: 'First-ever family-centric financial management in India'
      }
    ],
    solutionDifferentiators: {
      title: 'Why DISCVR vs Competition',
      comparisons: [
        'Comprehensive vs Investment-Only: All financial products, not just stocks/MF',
        'AI-First vs Dashboard: Personalized intelligence, not just data visualization', 
        'Mass Market vs Premium: ₹300/month vs ₹25,000+ traditional wealth management',
        'Action-Oriented vs Tracking: Execute improvements, not just monitor portfolios'
      ]
    },
    platformMetrics: {
      integrations: '200+ financial institutions',
      coverage: '95% of Indian financial products',
      speed: 'Real-time sync vs 24-hour delays',
      accuracy: '99.9% data reconciliation rate'
    }
  },
  {
    id: 6,
    type: 'platform-architecture',
    title: 'Complete Financial Platform Stack',
    subtitle: 'AI-Driven Architecture for 200M+ Users',
    icon: Building2,
    platformLayers: {
      distribution: {
        title: '1. Distribution',
        channels: ['Product Led Growth Loop', 'Social Media', 'Google']
      },
      channels: {
        title: '2. Channels', 
        items: ['App', 'Web', 'WhatsApp', 'Telegram']
      },
      monetization: {
        title: '3. Monetization',
        streams: ['ADs', 'Commissions', 'Subscription', 'Transaction']
      },
      hooks: {
        title: '4. Hooks',
        items: ['Gamification', 'Timely Nudge/Communication']
      },
      useCases: {
        title: '5. Use Cases',
        cases: [
          'Protection Planning',
          'Portfolio Analysis', 
          'Spend Analytics',
          'Debt Management',
          'Goal Oriented Planning'
        ]
      },
      insights: {
        title: '6. Insights',
        description: 'AI powered intelligence layer'
      },
      dynamicParams: {
        title: '7. Dynamic Params',
        parameters: ['Market Data', 'News', 'Taxation', 'Govt Policies', 'Regulations']
      },
      products: {
        title: '8. Products',
        categories: [
          'Stocks', 'Mutual Funds', 'IPOs', 'Bonds/FDs', 'Gold',
          'EPF/PPF/NPS', 'Crypto', 'Loans', 'Insurance', 'Real Estate'
        ]
      },
      userdata: {
        title: '9. UserData',
        description: 'Universal Aggregation Engine – User Financial Data'
      }
    }
  },
  {
    id: 8,
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
    id: 9,
    type: 'competitive-landscape',
    title: 'Competitive Landscape & Our Moats',
    subtitle: 'Clear Differentiation in Crowded Market',
    icon: Shield,
    competitorAnalysis: {
      directCompetitors: [
        {
          name: 'Groww',
          strengths: ['Market leader: 13.1M users', '₹4,056 Cr revenue (FY25)', '$7B valuation'],
          weaknesses: ['Investment-focused only', 'No comprehensive financial planning', 'Limited AI insights'],
          marketShare: '13.1M users',
          arpu: '₹3,224/year'
        },
        {
          name: 'Zerodha',
          strengths: ['High ARPU: ₹12,000', '₹9,300 Cr revenue (FY24)', 'Advanced trading platform'],
          weaknesses: ['Trader-focused, not mass market', 'No family portfolio management', 'Limited aggregation'],
          marketShare: '7.6M users', 
          arpu: '₹12,000/year'
        },
        {
          name: 'Upstox',
          strengths: ['Growing user base: 2.6M users', '₹1,311 Cr revenue', 'Active trader focus'],
          weaknesses: ['Smaller scale', 'Investment-only platform', 'No comprehensive insights'],
          marketShare: '2.6M users',
          arpu: '₹5,101/year'
        },
        {
          name: 'CRED',
          strengths: ['13M MAU', '₹2,473 Cr revenue (FY24)', 'Strong brand recognition'],
          weaknesses: ['Credit-focused only', 'No wealth management', 'Limited financial planning'],
          marketShare: '13M users',
          arpu: '₹1,966/year'
        }
      ],
      indirectCompetitors: [
        {
          name: 'INDmoney',
          threat: 'Portfolio tracking capabilities',
          weakness: 'Limited AI insights, complex UI, investment-focused'
        },
        {
          name: 'ET Money',
          threat: 'Mutual fund platform with insurance',
          weakness: 'No real-time aggregation, limited analytics'
        },
        {
          name: 'PhonePe/Google Pay',
          threat: 'Big tech expansion into financial services',
          weakness: 'Generalist approach vs specialized domain expertise'
        }
      ],
      bigTechThreats: [
        {
          name: 'PhonePe',
          threat: 'Entering wealth management via acquisition',
          timeline: '12-18 months',
          mitigation: 'Specialized focus vs generalist approach'
        },
        {
          name: 'Google Pay',
          threat: 'Financial services expansion',
          timeline: '18-24 months',
          mitigation: 'Domain expertise and AI-first approach'
        }
      ]
    },
    ourMoats: {
      shortTerm: [
        'AI-First Architecture: Personalized insights from day one',
        'Comprehensive Coverage: All financial products vs investment-only',
        'Mass Market Focus: Affordable AI-powered financial intelligence for everyone',
        'Family Portfolio Management: Unique capability in market'
      ],
      mediumTerm: [
        'Data Network Effects: Better insights with more users',
        'Account Aggregator Leadership: First-mover in AA-powered solutions',
        'B2B Partnership Ecosystem: Execution capability across platforms',
        'AI Model Superiority: Continuously improving recommendations'
      ],
      longTerm: [
        'Behavioral Data Moat: Understanding of financial decision patterns',
        'Platform Ecosystem: All financial services in one place',
        'Brand Trust: Financial intelligence authority for mass market',
        'Regulatory Relationships: Deep integration with compliance framework'
      ]
    },
    competitiveAdvantages: [
      'Only AI-powered comprehensive platform for mass market',
      'First-mover advantage in AA framework + AI combination',
      'Domain expertise vs generalist big tech players',
      'Execution focus vs feature-heavy complex solutions'
    ]
  },
  {
    id: 10,
    type: 'risk-analysis',
    title: 'Risk Analysis & Mitigation',
    subtitle: 'Proactive Risk Management Strategy',
    icon: AlertTriangle,
    risks: [
      {
        risk: 'Regulatory Changes',
        severity: 'Medium',
        probability: 'Low',
        impact: 'Could affect data aggregation permissions',
        mitigation: [
          'Built on government-backed AA framework',
          'Proactive compliance team and legal advisory',
          'Multiple data sources beyond AA framework',
          'Strong relationships with regulatory bodies'
        ],
        timeline: 'Ongoing monitoring'
      },
      {
        risk: 'Data Security Breach',
        severity: 'High',
        probability: 'Low',
        impact: 'Loss of user trust and potential legal issues',
        mitigation: [
          'Bank-grade security infrastructure',
          'Regular security audits and penetration testing',
          'Compliance with RBI data protection guidelines',
          'Cyber insurance and incident response plan'
        ],
        timeline: 'Continuous investment'
      },
      {
        risk: 'Big Tech Entry',
        severity: 'High',
        probability: 'Medium',
        impact: 'Competitive pressure and CAC inflation',
        mitigation: [
          'Specialized domain expertise vs generalist approach',
          'First-mover advantage in AI + AA combination',
          'Strong user acquisition before big tech entry',
          'Focus on mass market vs premium segments'
        ],
        timeline: '12-24 months window'
      },
      {
        risk: 'CAC Inflation',
        severity: 'Medium',
        probability: 'Medium',
        impact: 'Reduced unit economics and growth challenges',
        mitigation: [
          'Diversified acquisition channels',
          'Strong referral program and network effects',
          'Product-led growth and organic acquisition',
          'Efficient targeting using AI and data analytics'
        ],
        timeline: 'Ongoing optimization'
      },
      {
        risk: 'Market Downturn',
        severity: 'Medium',
        probability: 'Medium',
        impact: 'Reduced user engagement and subscription rates',
        mitigation: [
          'Focus on financial planning during uncertainty',
          'Freemium model to maintain user base',
          'Diversified revenue streams beyond subscriptions',
          'Counter-cyclical value proposition (portfolio protection)'
        ],
        timeline: 'Economic cycle management'
      }
    ],
    overallRiskProfile: 'Moderate risk with strong mitigation strategies and first-mover advantages',
    keyStrengths: [
      'Government-backed infrastructure reduces regulatory risk',
      'Specialized focus provides competitive protection',
      'Multiple revenue streams reduce single-point-of-failure',
      'Strong team experience in scaling platforms'
    ]
  },
  {
    id: 11,
    type: 'team',
    title: 'Execution-Ready Leadership Team',
    subtitle: 'Proven Track Record in Scale & AI/ML',
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
      },
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
    ]
  },
  {
    id: 12,
    type: 'b2b-partnerships',
    title: 'Strategic B2B Partnerships',
    subtitle: 'Core Enablers for Marketplace Execution',
    icon: Building2,
    partnerships: [
      {
        partner: 'Smallcase',
        enablers: ['Holdings Import', 'MF Buy Sell', 'Stocks Buy Sell', 'Smallcase Sell'],
        description: 'Comprehensive investment platform integration for portfolio management and execution'
      },
      {
        partner: 'FMP',
        enablers: ['US Stocks + Crypto'],
        description: 'International market access and cryptocurrency trading capabilities'
      },
      {
        partner: 'CMOTS',
        enablers: ['Indian Equity(Stock,MF,IPO)'],
        description: 'Full-spectrum Indian equity market access including IPO participation'
      },
      {
        partner: 'Tarakki',
        enablers: ['MF, FD Distribution'],
        description: 'Mutual fund and fixed deposit distribution network integration'
      },
      {
        partner: 'Decentro',
        enablers: ['KYC Automation', 'Payment Workflows', 'Banking APIs'],
        description: 'Complete KYC verification and payment automation infrastructure for seamless onboarding'
      },
      {
        partner: 'GoldenPi',
        enablers: ['Corporate Bonds', 'Government Bonds', 'Bond Analytics'],
        description: 'Fully-fledged bond trading and analytics platform for fixed income investments'
      },
      {
        partner: 'BSE/NSE Data Feeds',
        enablers: ['Real-time Equity Data', 'Bond Market Data', 'Historical Analytics'],
        description: 'Official exchange data feeds for comprehensive market coverage and real-time insights'
      }
    ],
    coreCapabilities: {
      title: 'Core Enablers for Marketplace',
      description: 'Strategic partnerships provide comprehensive financial product access across asset classes, enabling our AI platform to execute recommendations seamlessly with full regulatory compliance.'
    },
    strategicValue: [
      'Complete asset class coverage: Equity, MF, FD, IPO, US markets, Crypto, and Bonds',
      'Full KYC & compliance automation through Decentro integration',
      'Real-time market data directly from exchanges (BSE/NSE)',
      'Reduced time-to-market: Ready infrastructure vs building from scratch',
      'Regulatory advantage: Partner expertise in compliance requirements',
      'Scale efficiency: Leverage existing distribution networks',
      'User experience: Single platform for all financial actions',
      'Revenue diversification: Multiple monetization streams through partnerships'
    ]
  },
  {
    id: 13,
    type: 'funding',
    title: '$1.5M Seed Round',
    subtitle: 'Optimized for Efficient Growth & Market Leadership',
    icon: Wallet,
    allocation: [
      {
        percentage: '40%',
        category: 'Team',
        amount: '₹4.8 Cr',
        description: 'Core engineering, product, AI/ML specialists, growth team'
      },
      {
        percentage: '35%',
        category: 'Marketing',
        amount: '₹4.2 Cr',
        description: 'Segmented user acquisition across personas, content marketing'
      },
      {
        percentage: '15%',
        category: 'Compliance & Security',
        amount: '₹1.8 Cr',
        description: 'SEBI IA registration, security audits, legal framework'
      },
      {
        percentage: '10%',
        category: 'Operations',
        amount: '₹1.2 Cr',
        description: 'Infrastructure, partnerships, administrative expenses'
      }
    ],
    fundDetails: {
      raiseAmount: '$1.5M (₹12 Cr)',
      timeline: '18-month runway to Series A',
      valuation: 'Pre-money: $8-10M'
    },
    keyMilestones: [
      'Month 6: 100K users, Multi-App Jugglers PMF',
      'Month 12: 300K users, Wealth Builders expansion',
      'Month 18: 1M users, Series A readiness ($5-8M raise)'
    ],
    useOfFunds: {
      teamBuilding: '40% - Scale engineering (8-10), product (3-4), AI/ML (2-3), growth (2-3)',
      userAcquisition: '35% - Phase 1: ₹1.8Cr, Phase 2: ₹1.8Cr, Phase 3: ₹0.6Cr contingency',
      compliance: '15% - SEBI registration, security infrastructure, legal setup',
      operations: '10% - Cloud infrastructure, partnerships, office setup'
    },
    competitiveContext: {
      title: 'Validated Market with Proven Unit Economics',
      examples: [
        'INDmoney: $86M raised, 2.5M users, $48 ARPU',
        'CRED: $800M raised, 9M users, credit-focused',
        'Our Advantage: AI-first, comprehensive, mass-market pricing'
      ]
    },
    exitStrategy: {
      timeline: '3-5 years',
      pathways: [
        'Strategic Acquisition: Financial institutions seeking digital transformation',
        'Target Acquirers: HDFC, ICICI, Axis Bank, Bajaj Finserv, Tata Digital',
        'IPO Path: Follow Paytm, PolicyBazaar model post-scale achievement',
        'Valuation Target: $500M-1B based on user base and revenue multiples'
      ]
    },
    investmentHighlights: [
      'First-mover in AI + Account Aggregator combination',
      'Clear path to scale with proven unit economics',
      'Massive TAM ($9.2B) with regulatory tailwinds',
      'Experienced team with track record of scaling 100M+ user platforms'
    ]
  }
];
