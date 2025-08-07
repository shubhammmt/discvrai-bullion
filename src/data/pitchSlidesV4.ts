import { Brain, TrendingUp, Target, Users, Rocket, DollarSign, BarChart3, AlertTriangle, Zap, Link, Trophy, Wallet, Building2, Shield, Eye, GitBranch } from 'lucide-react';

export const pitchSlidesV4 = [
  {
    id: 1,
    type: 'title',
    title: 'DISCVR.AI',
    subtitle: "India's Universal Financial Intelligence Platform",
    author: 'AI-Powered Financial Intelligence for the Mass Market',
    icon: Brain
  },
  {
    id: 2,
    type: 'market-opportunity',
    title: 'India\'s Financial Explosion',
    subtitle: '$6.7T Market Creating Unprecedented Opportunity',
    icon: BarChart3,
    marketSize: {
      tam: {
        number: '$9.2B',
        label: 'Total Addressable Market by 2030',
        description: 'Comprehensive financial management for 400M+ users'
      },
      sam: {
        number: '$4.1B', 
        label: 'Serviceable Addressable Market',
        description: '200M+ multi-account holders needing intelligent aggregation'
      },
      som: {
        number: '$760M',
        label: 'Serviceable Obtainable Market',
        description: '25M users by 2030 at $3,800 annual ARPU (2.5% market penetration)'
      }
    },
    marketData: {
      totalAssets: '$6.7T',
      description: 'Total Financial Assets Under Management',
      breakdown: [
        { asset: 'Equity Market Cap', value: '$4.5T', growth: '150M+ Demat accounts, 25% YoY growth' },
        { asset: 'Mutual Funds AUM', value: '$850B', growth: '180M+ accounts, 30% YoY growth' },
        { asset: 'Fixed Deposits', value: '$1.2T', growth: 'Stable base, digital transformation' },
        { asset: 'Bonds & Others', value: '$150B', growth: 'Emerging retail participation' }
      ]
    },
    userExplosion: [
      { metric: '150M+ Demat Accounts', detail: '25% YoY growth, digitally native investors' },
      { metric: '180M+ MF Accounts', detail: '30% YoY growth, SIP culture adoption' },
      { metric: 'Account Aggregator: 1059% Growth', detail: '120M+ consents, proving data sharing comfort' }
    ],
    validation: [
      'Government Infrastructure: RBI-backed Account Aggregator framework',
      'User Behavior: 120M+ users sharing financial data voluntarily',
      'Market Validation: INDmoney ($86M), CRED ($800M+) prove willingness to pay',
      'Growth Momentum: 25-30% YoY growth across all financial products'
    ],
    marketContext: 'Perfect Storm: Infrastructure + User Base + Regulatory Support + Proven Demand'
  },
  {
    id: 3,
    type: 'market-growth',
    title: 'Market Growth Projections',
    subtitle: '400M+ Users by 2030 with 35-40% CAGR',
    icon: TrendingUp,
    growthData: {
      currentState: {
        year: '2025',
        totalUsers: '200M+',
        multiAccountUsers: '100M+',
        totalAssets: '$6.7T'
      },
      projectedState: {
        year: '2030',
        totalUsers: '400M+',
        multiAccountUsers: '200M+',
        totalAssets: '$12T+'
      },
      cagr: '35-40%'
    },
    segmentGrowth: [
      {
        segment: 'Demat Accounts',
        current: '150M',
        projected: '300M+',
        cagr: '25%',
        driver: 'Digital adoption, equity culture'
      },
      {
        segment: 'MF Accounts',
        current: '180M',
        projected: '350M+',
        cagr: '30%',
        driver: 'SIP penetration, financial literacy'
      },
      {
        segment: 'Multi-Account Holders',
        current: '100M',
        projected: '200M+',
        cagr: '35%',
        driver: 'Product diversification'
      },
      {
        segment: 'Portfolio Aggregators',
        current: '5M',
        projected: '50M+',
        cagr: '60%',
        driver: 'Complexity management need'
      }
    ],
    ourTarget: {
      users: '25M by 2030',
      marketShare: '12.5% of multi-account holders',
      revenue: '$760M annual run rate',
      cagr: '35-40%'
    },
    growthDrivers: [
      'Digital-first Generation: 65% of users under 35',
      'Wealth Creation: Middle class growing at 15% annually',
      'Product Innovation: New financial products driving complexity',
      'Regulatory Support: Government promoting financial inclusion'
    ]
  },
  {
    id: 4,
    type: 'problem-statement',
    title: 'The Portfolio Management Crisis',
    subtitle: '200M+ Users Drowning in Financial Complexity',
    icon: AlertTriangle,
    problemData: {
      coreIssue: '200M+ investors managing 3.2 accounts each across fragmented platforms',
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
            'Average user: 3.2 financial accounts',
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
    type: 'ai-advantages',
    title: 'Why AI is Critical for This Problem',
    subtitle: 'Only AI Can Solve Financial Complexity at Scale',
    icon: Brain,
    withoutAI: {
      title: 'Without AI: Manual & Generic Solutions',
      limitations: [
        'Manual Data Entry: Users spend hours updating portfolios',
        'Generic Advice: One-size-fits-all recommendations',
        'Static Dashboards: No real-time insights or alerts',
        'Information Overload: Raw data without actionable intelligence',
        'Reactive Approach: Problems identified after losses occur'
      ]
    },
    withAI: {
      title: 'With AI: Intelligent & Personalized Platform',
      advantages: [
        {
          capability: 'Data Normalization at Scale',
          impact: 'Process 100+ data formats in real-time vs manual integration',
          example: 'Automatically reconcile Zerodha, Groww, SBI data formats'
        },
        {
          capability: 'Hyper-Personalization',
          impact: 'Individual risk profiling vs generic recommendations',
          example: 'Custom asset allocation based on age, income, goals, behavior'
        },
        {
          capability: 'Predictive Intelligence',
          impact: 'Proactive alerts vs reactive problem-solving',
          example: 'Predict rebalancing needs before market volatility hits'
        },
        {
          capability: 'Conversational Interface',
          impact: 'Natural language queries vs complex financial jargon',
          example: '"Should I invest more in equity?" gets personalized answer'
        },
        {
          capability: 'Pattern Recognition',
          impact: 'Identify trends across millions of users vs individual analysis',
          example: 'Spot market opportunities based on successful user patterns'
        }
      ]
    },
    aiInfrastructure: {
      title: 'Our AI Infrastructure Advantage',
      components: [
        'Real-time Processing: Handle 1M+ transactions simultaneously',
        'Machine Learning Models: Personalized recommendations engine',
        'NLP Engine: Convert complex financial data into simple insights',
        'Predictive Analytics: Risk assessment and opportunity identification',
        'Scalable Architecture: AI capabilities improve with user base growth'
      ]
    },
    competitiveAdvantage: 'First-mover in AI-powered financial intelligence for mass market vs basic aggregation tools'
  },
  {
    id: 6,
    type: 'solution',
    title: 'Universal Financial Intelligence Platform',
    subtitle: 'AI-Powered Financial Operating System',
    icon: Zap,
    features: [
      {
        title: 'Universal Aggregation Engine',
        description: 'Connect 200+ financial institutions seamlessly',
        capabilities: [
          'Account Aggregator (AA) framework integration',
          'Real-time portfolio synchronization across all platforms',
          'Intelligent deduplication and data normalization',
          'Email parsing for offline account data'
        ]
      },
      {
        title: 'AI-Powered Insights Layer',
        description: 'Transform data into actionable intelligence',
        capabilities: [
          'Personalized financial health scoring',
          'Insurance gap analysis with specific recommendations',
          'Emergency fund adequacy assessment',
          'Asset allocation optimization based on goals',
          'Tax optimization and retirement planning'
        ]
      },
      {
        title: 'Intelligent Action Platform',
        description: 'Execute financial improvements seamlessly',
        capabilities: [
          'One-click rebalancing across platforms',
          'Automated investment execution via partner APIs',
          'Insurance purchase integration',
          'Goal-based SIP recommendations',
          'Family portfolio coordination'
        ]
      }
    ],
    differentiators: [
      'Comprehensive Coverage: All financial products vs investment-only platforms',
      'AI-First Approach: Personalized intelligence vs generic dashboards',
      'Mass Market Focus: ₹3,800/year vs ₹25,000+ premium solutions',
      'Family Portfolio Management: Multi-member coordination capability',
      'Action-Oriented: Execute improvements, not just track data'
    ],
    keyMetrics: {
      integrations: '200+ financial institutions',
      coverage: '95% of Indian financial products',
      speed: 'Real-time data sync vs 24-hour delays',
      accuracy: '99.9% data reconciliation rate'
    }
  },
  {
    id: 7,
    type: 'target-persona',
    title: 'Refined User Segments',
    subtitle: 'Clear Personas with Distinct Needs & Revenue Paths',
    icon: Users,
    personas: [
      {
        title: 'Financial Starters',
        size: '8-10 Crore Users',
        profile: '22-30 years, ₹3-8L income, 1-2 accounts',
        demographics: 'Urban professionals, new to investing',
        keyBehaviors: ['Just opened first Demat/MF account', 'Uses 1-2 apps', 'Relies on social media advice'],
        corePainPoint: '"I don\'t know if I\'m doing this right"',
        productNeed: 'Financial education + basic portfolio tracking',
        revenue: '₹1,500-2,400/year',
        gtmApproach: 'Educational content, social media, referrals'
      },
      {
        title: 'Multi-App Jugglers',
        size: '4-5 Crore Users',
        profile: '28-40 years, ₹8-25L income, 3-5 accounts',
        demographics: 'Established professionals, frustrated with app switching',
        keyBehaviors: ['Uses 3-4 financial apps', 'Manual Excel tracking', '2-3 hours weekly management'],
        corePainPoint: '"I waste too much time switching between apps"',
        productNeed: 'Unified dashboard + automated tracking',
        revenue: '₹3,600-6,000/year',
        gtmApproach: 'Productivity positioning, app integration marketing'
      },
      {
        title: 'Wealth Builders',
        size: '1.5-2 Crore Users',
        profile: '32-50 years, ₹25L+ income, 5+ accounts',
        demographics: 'Senior professionals/entrepreneurs, serious wealth creation',
        keyBehaviors: ['Active across asset classes', 'Seeks advanced analytics', 'Values efficiency'],
        corePainPoint: '"I need smarter insights, not just data"',
        productNeed: 'AI recommendations + advanced analytics',
        revenue: '₹8,400-15,000/year',
        gtmApproach: 'Wealth management positioning, advisor partnerships'
      },
      {
        title: 'Family Financial Managers',
        size: '2-3 Crore Users',
        profile: '35-55 years, ₹15L+ household income, 6+ accounts',
        demographics: 'Heads of household, comprehensive planning needs',
        keyBehaviors: ['Manages family finances', 'Insurance/tax coordination', 'Comprehensive planning'],
        corePainPoint: '"I need to manage everyone\'s financial life"',
        productNeed: 'Family portfolio management + planning tools',
        revenue: '₹12,000-25,000/year',
        gtmApproach: 'Family financial planning, insurance partnerships'
      }
    ],
    totalTAM: '$9.2B by 2030',
    gtmSequence: {
      phase1: 'Multi-App Jugglers (Highest pain + willingness to pay)',
      phase2: 'Wealth Builders (Higher revenue potential)',
      phase3: 'Family Managers (Highest LTV)',
      phase4: 'Financial Starters (Scale play)'
    },
    keyInsight: 'Clear progression path from starter to family manager with distinct pain points and solutions'
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
          name: 'INDmoney',
          strengths: ['Portfolio tracking', '$86M funding', 'US market access'],
          weaknesses: ['Limited AI insights', 'Investment-focused only', 'Complex UI'],
          marketShare: '2.5M users',
          arpu: '$48/year'
        },
        {
          name: 'ET Money',
          strengths: ['MF platform', 'Insurance integration', 'Brand recognition'],
          weaknesses: ['No real-time aggregation', 'Limited analytics', 'No family management'],
          marketShare: '5M users',
          arpu: '$24/year'
        },
        {
          name: 'MProfit',
          strengths: ['Comprehensive tracking', 'Desktop application'],
          weaknesses: ['High price ₹25,000/year', 'Complex interface', 'No mobile-first'],
          marketShare: '100K users',
          arpu: '$300/year'
        }
      ],
      indirectCompetitors: [
        {
          name: 'Groww',
          threat: 'Could add aggregation features',
          weakness: 'Investment-only focus, no comprehensive planning'
        },
        {
          name: 'Zerodha',
          threat: 'Large user base for expansion',
          weakness: 'Brokerage model, limited product scope'
        },
        {
          name: 'CRED',
          threat: 'Credit-focused platform expansion',
          weakness: 'Credit-centric, not comprehensive wealth management'
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
        'Mass Market Focus: ₹3,800 vs ₹25,000+ pricing',
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
    ],
    executionMilestones: [
      'Q1: Core aggregation, AA integration, basic insights',
      'Q2: AI intelligence engine, premium features, investment APIs',
      'Q3: Advanced insights, insurance/credit integration, scale',
      'Q4: Platform optimization, partnerships, Series A prep'
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
      }
    ],
    coreCapabilities: {
      title: 'Core Enablers for Marketplace',
      description: 'Strategic partnerships provide comprehensive financial product access across asset classes, enabling our AI platform to execute recommendations seamlessly.'
    },
    strategicValue: [
      'Complete asset class coverage: Equity, MF, FD, IPO, US markets, and Crypto',
      'Reduced time-to-market: Ready infrastructure vs building from scratch',
      'Compliance advantage: Partner expertise in regulatory requirements',
      'Scale efficiency: Leverage existing distribution networks',
      'User experience: Single platform for all financial actions',
      'Revenue diversification: Multiple monetization streams through partnerships'
    ]
  },
  {
    id: 13,
    type: 'gtm-detailed',
    title: 'Go-to-Market & 1M User Growth Path',
    subtitle: 'Validated Growth Strategy with Optimized CAC',
    icon: Rocket,
    phases: [
      {
        phase: 'Phase 1: Multi-App Jugglers (0-6 months)',
        timeline: '0-6 months',
        target: '100K users',
        targetSegment: 'Multi-App Jugglers',
        strategy: 'Productivity positioning: "Stop juggling 5 financial apps"',
        channels: [
          { name: 'LinkedIn + Productivity Content', allocation: '30%', cac: '₹2,500', volume: '30K users' },
          { name: 'App Integration Reviews', allocation: '25%', cac: '₹2,000', volume: '25K users' },
          { name: 'Referral Program', allocation: '20%', cac: '₹800', volume: '20K users' },
          { name: 'Fintech Communities', allocation: '15%', cac: '₹3,000', volume: '15K users' },
          { name: 'Partnership Marketing', allocation: '10%', cac: '₹2,200', volume: '10K users' }
        ],
        metrics: [
          'Target CAC: ₹2,500',
          'ARPU: ₹3,600-6,000/year',
          '15% paid conversion rate',
          '25% D30 retention'
        ]
      },
      {
        phase: 'Phase 2: Wealth Builders (6-12 months)', 
        timeline: '6-12 months',
        target: '300K users',
        targetSegment: 'Wealth Builders',
        strategy: 'AI-powered wealth intelligence positioning',
        channels: [
          { name: 'Wealth Management Content', allocation: '35%', cac: '₹4,000', volume: '105K users' },
          { name: 'Advisor Partnerships', allocation: '25%', cac: '₹3,500', volume: '75K users' },
          { name: 'Investment Communities', allocation: '20%', cac: '₹4,500', volume: '60K users' },
          { name: 'Referral Program', allocation: '15%', cac: '₹1,000', volume: '45K users' },
          { name: 'Premium Events', allocation: '5%', cac: '₹6,000', volume: '15K users' }
        ],
        metrics: [
          'Target CAC: ₹4,000',
          'ARPU: ₹8,400-15,000/year',
          '20% paid conversion rate',
          '35% D30 retention'
        ]
      },
      {
        phase: 'Phase 3: Family + Scale (12-18 months)',
        timeline: '12-18 months',
        target: '1M users',
        targetSegment: 'Family Managers + Scale',
        strategy: 'Complete family financial command center',
        channels: [
          { name: 'Family Financial Content', allocation: '25%', cac: '₹6,000', volume: '175K users' },
          { name: 'Insurance Partnerships', allocation: '20%', cac: '₹5,000', volume: '140K users' },
          { name: 'Referral + Viral', allocation: '30%', cac: '₹800', volume: '210K users' },
          { name: 'Financial Starters (Scale)', allocation: '20%', cac: '₹800', volume: '140K users' },
          { name: 'Mass Market Channels', allocation: '5%', cac: '₹1,200', volume: '35K users' }
        ],
        metrics: [
          'Blended CAC: ₹3,500',
          'Family ARPU: ₹12,000-25,000/year',
          'Scale ARPU: ₹1,500-2,400/year',
          '40% D30 retention overall'
        ]
      }
    ],
    totalBudget: '₹8.75 Cr ($1.05M)',
    averageCAC: '₹3,500',
    revenueProjection: '₹30 Cr ARR by month 18'
  },
  {
    id: 14,
    type: 'unit-economics',
    title: 'Unit Economics & Revenue Model',
    subtitle: 'Clear Path to Profitability with Strong LTV/CAC',
    icon: DollarSign,
    revenueModel: {
      streams: [
        {
          name: 'Subscription Revenue',
          percentage: '70%',
          tiers: [
            { tier: 'Essential', price: '₹0/month', features: 'Basic aggregation, 3 accounts' },
            { tier: 'Pro', price: '₹299/month', features: 'Unlimited accounts, advanced analytics' },
            { tier: 'Wealth', price: '₹699/month', features: 'AI insights, tax optimization' },
            { tier: 'Family', price: '₹1,199/month', features: 'Family management, comprehensive planning' }
          ]
        },
        {
          name: 'Transaction Commissions',
          percentage: '25%',
          details: 'Commission from investment executions via partner platforms (0.25-0.5%)'
        },
        {
          name: 'Intelligence Services',
          percentage: '5%',
          details: 'Premium AI insights, research reports, market intelligence'
        }
      ]
    },
    unitEconomics: {
      cac: {
        multiAppJugglers: '₹2,500',
        wealthBuilders: '₹4,000',
        familyManagers: '₹6,000',
        blendedAverage: '₹3,500'
      },
      arpu: {
        multiAppJugglers: '₹4,800/year',
        wealthBuilders: '₹11,200/year',
        familyManagers: '₹18,500/year',
        blendedAverage: '₹8,800/year'
      },
      ltv: {
        multiAppJugglers: '₹14,400 (3 years)',
        wealthBuilders: '₹44,800 (4 years)',
        familyManagers: '₹92,500 (5 years)',
        blendedAverage: '₹35,200'
      },
      ltvCacRatio: {
        multiAppJugglers: '5.8x',
        wealthBuilders: '11.2x',
        familyManagers: '15.4x',
        blendedAverage: '10.1x'
      },
      paybackPeriod: {
        multiAppJugglers: '6 months',
        wealthBuilders: '4 months',
        familyManagers: '4 months',
        average: '5 months'
      }
    },
    growthProjections: {
      month6: { users: '100K', revenue: '₹4 Cr ARR', paidUsers: '15K' },
      month12: { users: '300K', revenue: '₹12 Cr ARR', paidUsers: '50K' },
      month18: { users: '1M', revenue: '₹30 Cr ARR', paidUsers: '150K' },
      month24: { users: '2.5M', revenue: '₹75 Cr ARR', paidUsers: '350K' }
    },
    pathToProfitability: 'Profitable by month 15 with 15% net margins'
  },
  {
    id: 15,
    type: 'funding',
    title: '$1.25M Seed Round',
    subtitle: 'Optimized for Efficient Growth & Market Leadership',
    icon: Wallet,
    allocation: [
      {
        percentage: '40%',
        category: 'Team',
        amount: '₹4.0 Cr',
        description: 'Core engineering, product, AI/ML specialists, growth team'
      },
      {
        percentage: '35%',
        category: 'Marketing',
        amount: '₹3.5 Cr',
        description: 'Segmented user acquisition across personas, content marketing'
      },
      {
        percentage: '15%',
        category: 'Compliance & Security',
        amount: '₹1.5 Cr',
        description: 'SEBI IA registration, security audits, legal framework'
      },
      {
        percentage: '10%',
        category: 'Operations',
        amount: '₹1.0 Cr',
        description: 'Infrastructure, partnerships, administrative expenses'
      }
    ],
    fundDetails: {
      raiseAmount: '$1.25M (₹10 Cr)',
      timeline: '18-month runway to Series A',
      valuation: 'Pre-money: $8-10M'
    },
    keyMilestones: [
      'Month 6: 100K users, ₹4 Cr ARR, Multi-App Jugglers PMF',
      'Month 12: 300K users, ₹12 Cr ARR, Wealth Builders expansion',
      'Month 18: 1M users, ₹30 Cr ARR, Series A readiness ($5-8M raise)'
    ],
    useOfFunds: {
      teamBuilding: '40% - Scale engineering (8-10), product (3-4), AI/ML (2-3), growth (2-3)',
      userAcquisition: '35% - Phase 1: ₹1.5Cr, Phase 2: ₹1.5Cr, Phase 3: ₹0.5Cr contingency',
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
      'Clear path to ₹100 Cr+ ARR with proven unit economics',
      'Massive TAM ($9.2B) with regulatory tailwinds',
      'Experienced team with track record of scaling 100M+ user platforms'
    ]
  }
];