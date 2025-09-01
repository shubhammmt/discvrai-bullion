import { Brain, TrendingUp, Target, Users, Rocket, DollarSign, BarChart3, AlertTriangle, Zap, Link, Trophy, Wallet, Building2, Shield, Eye, GitBranch, GraduationCap, Network, Database, Calculator, Play } from 'lucide-react';

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
    subtitle: 'Strategic User Acquisition Across India\'s Digital Financial Ecosystem',
    icon: Target,
    marketSizing: {
      tam: {
        size: '**300M users**',
        users: 'Total addressable user base',
        description: 'Total addressable users across all financial products',
        calculation: '300M users across financial product categories',
        breakdown: [
          '**Investment Products: 250M users** (stocks, mutual funds, bonds)',
          '**Credit Products: 200M users** (credit cards, loans, BNPL)', 
          '**Protection Products: 150M users** (insurance, health plans)',
          '**Planning Services: 100M users** (wealth management, tax planning)'
        ]
      },
      sam: {
        size: '**240M users**', 
        users: 'Serviceable addressable market',
        description: 'Serviceable addressable market - digitally active users',
        calculation: '240M digitally active financial service users',
        criteria: [
          '**Multi-account holders: 150M users** managing 2+ financial accounts',
          '**Active digital users: 200M users** (>1 login/month)',
          '**Target income segment: 180M users** (>₹3L annually)',
          '**Prime age group: 220M users** (Age 25-45, peak financial years)'
        ]
      },
      som: {
        size: '**24M users**',
        users: 'Our serviceable obtainable market',
        description: 'Our serviceable obtainable market - 10% of SAM',
        calculation: '24M premium users seeking unified financial platform',
        growthTrajectory: [
          { year: 'Year 1', users: '3M', strategy: 'Social + SEO + Performance Marketing' },
          { year: 'Year 2', users: '7M', strategy: 'Scaled marketing channels + word-of-mouth' },
          { year: 'Year 3', users: '12M', strategy: 'Marketing optimization + early PLG signals' },
          { year: 'Year 4', users: '18M', strategy: 'Product-led growth + user referrals' },
          { year: 'Year 5', users: '24M', strategy: 'Viral PLG + repeat user expansion' }
        ],
        strategyPhases: [
          {
            phase: 'Foundation (Years 1-3)',
            focus: 'Traditional Growth Channels',
            description: 'Social media, SEO, and performance marketing to build initial user base of ~10M'
          },
          {
            phase: 'Acceleration (Years 4-5)', 
            focus: 'Product-Led Growth',
            description: 'Leverage product virality, user referrals, and repeat engagement to reach 24M'
          }
        ]
      }
    },
    marketProgression: {
      title: 'From Mass Market Explosion to DISCVR Opportunity',
      flow: [
        {
          stage: 'Mass Market Growth',
          size: '**300M total users** by 2030',
          driver: 'Digital adoption + income growth driving massive user expansion'
        },
        {
          stage: 'Digital-Active Subset', 
          size: '**240M serviceable users**',
          filter: 'Multi-account + smartphone + target income segment'
        },
        {
          stage: 'DISCVR Target Market',
          size: '**24M users (10% market share)**',
          focus: 'Complexity-overwhelmed power users seeking unified solutions'
        }
      ]
    },
    revenueValidation: {
      title: 'Proven User Engagement from Leading Fintech Players',
      examples: [
        '**Cred: 13M MAU** - High-engagement credit card users',
        '**Groww: 13.1M MAU** - Active investment platform users',
        '**Zerodha: 7.6M MAU** - Highly engaged trading community',
        '**Upstox: 2.6M MAU** - Active retail traders and investors'
      ]
    },
    keyInsight: 'India\'s leading fintech platforms demonstrate massive user engagement across financial services. Our 25M target users represent a validated, digitally-active segment ready for AI-powered financial intelligence.'
  },
  {
    id: 3,
    type: 'credible-information-crisis-v2',
    title: 'The ₹1.8 Lakh Crore Problem: When Financial Information Fails Indians',
    subtitle: 'The Credible Information Crisis in Financial Decision Making',
    icon: AlertTriangle,
    marketData: {
      hook: '93% of retail traders lost money in F&O trading (SEBI 2024)',
      scale: '1.1 crore traders lost ₹1.8 lakh crore in 3 years (2022-2024)',
      coreProblem: 'Information overload without credibility validation',
      painPoints: [
        'Finfluencer misinformation crisis (SEBI crackdowns on unregistered advisors)',
        '40-60% decline in brand deals due to regulatory scrutiny',
        'Social media tips leading to "guaranteed profits" scams',
        'No way to verify quality of financial advice before acting'
      ],
      marketEvidence: 'Average loss of ₹2 lakh per retail trader',
      emotionalImpact: 'Indians trust blindly because they have no choice'
    }
  },
  {
    id: 4,
    type: 'human-ai-solution',
    title: 'Verified Community Intelligence: Starting Simple, Building Smart',
    subtitle: 'Human + AI Intelligence: The First Credible Financial Platform',
    icon: Brain,
    solutionData: {
      coreConcept: 'Begin with verified users, evolve them into experts through data contribution',
      keyDifferentiator: 'Not AI replacing humans, but AI amplifying validated human intelligence',
      simpleStart: 'Every expert was once a beginner who shared good insights',
      threeLayers: [
        {
          layer: 'User Verification Layer',
          description: 'Identity verification, track record building',
          components: ['Identity verification systems', 'Basic track record establishment', 'Profile credibility scoring']
        },
        {
          layer: 'Community Validation Layer', 
          description: 'Peer review, voting, quality scoring',
          components: ['Peer validation mechanisms', 'Community voting systems', 'Quality scoring algorithms']
        },
        {
          layer: 'AI Enhancement Layer',
          description: 'Pattern recognition, personalization, insights amplification',
          components: ['Pattern recognition from validated data', 'Personalized recommendation engine', 'Insight amplification algorithms']
        }
      ],
      flowDiagram: {
        userJourney: 'New User → Verification → Contributions → Community Validation → Expert Recognition',
        dataFlow: 'User Data + Community Insights → AI Processing → Personalized Intelligence'
      },
      valueProposition: [
        'Professional communities provide domain expertise',
        'AI learns from and enhances human insights', 
        'Community validation ensures information quality',
        'Personalized recommendations backed by expert consensus'
      ]
    }
  },
  {
    id: 5,
    type: 'community-strategy',
    title: 'Building India\'s First Verified Financial Community',
    subtitle: 'Professional Communities: Our Core Competitive Moat',
    icon: Users,
    communityData: {
      startingPoint: 'Verified users contributing real experiences and insights',
      currentTraction: '200+ verified analyst contributors already onboarded',
      communityEvolution: [
        {
          tier: 'Tier 1: Verified Contributors',
          description: 'Identity + basic track record',
          requirements: ['Identity verification', 'Basic financial profile', 'Initial contribution quality check']
        },
        {
          tier: 'Tier 2: Experienced Contributors',
          description: 'Consistent quality insights',
          requirements: ['Track record of quality contributions', 'Community engagement metrics', 'Peer validation scores']
        },
        {
          tier: 'Tier 3: Expert Contributors', 
          description: 'High community rating + proven expertise',
          requirements: ['High community ratings', 'Proven expertise validation', 'Leadership in community discussions']
        }
      ],
      qualityMechanics: [
        'Peer validation and voting systems',
        'Track record transparency',
        'Community-driven quality scoring',
        'Reputation-based content weighting'
      ],
      valueExchange: {
        contributors: ['Recognition and professional reputation building', 'Networking with industry professionals', 'Access to advanced analytics tools'],
        users: ['Credible insights from verified experts', 'Quality information with community validation', 'Personalized recommendations from trusted sources']
      },
      networkEffects: 'More verified users → Better insights → More users → Higher quality community',
      targetCommunities: [
        'Equity analysts (200+ already onboarded)',
        'AI engineers and quants',
        'Financial advisors and planners',
        'Investment researchers'
      ]
    }
  },
  {
    id: 6,
    type: 'review-ecosystem',
    title: 'Amazon for Financial Products: Where Real Users Share Real Experiences',
    subtitle: 'User Review Intelligence Platform',
    icon: Eye,
    reviewEcosystem: {
      vision: 'Every financial product reviewed by verified users',
      marketGap: 'No verified review system exists for Indian financial products',
      reviewCategories: [
        {
          category: 'Mutual Funds',
          aspects: ['Performance tracking', 'Service quality', 'Ease of use', 'Exit experience']
        },
        {
          category: 'Stocks',
          aspects: ['Research quality', 'Risk assessment', 'Community sentiment', 'Long-term viability']
        },
        {
          category: 'Insurance',
          aspects: ['Claim experience', 'Customer service', 'Value for money', 'Policy clarity']
        },
        {
          category: 'Credit Cards',
          aspects: ['Benefits utilization', 'Service experience', 'Hidden costs', 'Reward redemption']
        }
      ],
      verificationSystem: [
        'Portfolio linking for authentic reviews',
        'Transaction verification where possible',
        'Community validation of review quality',
        'AI-powered fake review detection'
      ],
      aiPoweredInsights: [
        'Sentiment analysis of reviews',
        'Pattern recognition in user experiences',
        'Personalized product recommendations based on verified user profiles',
        'Trend analysis across product categories'
      ],
      trustMechanism: 'Reviews by people like you, verified by community, enhanced by AI'
    }
  },
  {
    id: 7,
    type: 'network-effects-data-moats',
    title: 'Flywheel: More Experts → Better Insights → More Users',
    subtitle: 'Self-Reinforcing Data Advantages Create Defensible Moats',
    icon: Network,
    dataMoats: {
      userBehaviorLoop: 'User views content → makes decisions → tracks outcomes → creates feedback loop for propensity learning',
      selfImprovingAI: 'Each user interaction (portfolio additions, watchlists, alerts) teaches propensity models and improves recommendations',
      humanAIHybrid: 'AI research engine competing with ChatGPT/Perplexity for financial research, enhanced by human insights',
      emotionalExperienceData: 'Human experts provide context AI cannot - emotional insights and personal investment experiences',
      defensibleMoats: 'Proprietary AI research + integrated human-led data validation creates unique competitive advantage'
    },
    networkLoop: [
      {
        phase: 'Expert Contributions',
        description: 'Verified experts share research, insights, and experiences based on real market participation',
        outcome: 'Higher quality content attracts more users'
      },
      {
        phase: 'User Engagement & Decisions',
        description: 'Users consume expert content, make investment decisions, and track outcomes over time',
        outcome: 'More user data improves AI personalization'
      },
      {
        phase: 'AI Learning & Enhancement',
        description: 'Platform learns from user behavior patterns and expert validation to improve recommendations',
        outcome: 'Better insights attract more experts'
      }
    ]
  },
  {
    id: 8,
    type: 'platform-differentiation-v2',
    title: 'Why DISCVR ≠ Reddit/X/Perplexity Spaces',
    subtitle: 'Building Financial Decision Intelligence, Not Another Social Platform',
    icon: Shield,
    differentiation: {
      challenge: "Why isn't this just another Reddit/X/Perplexity Spaces?",
      redditXIssues: [
        'No expertise validation - anyone can post financial advice',
        'No accountability - anonymous users with no track record',
        'Information quality chaos - good insights buried in noise',
        'No decision integration - just discussion, not actionable intelligence'
      ],
      perplexityIssues: [
        'Generic AI - no financial domain specialization',
        'No human validation - pure AI responses without expert oversight',
        'No community feedback loops - one-way AI interaction',
        'No portfolio integration - research disconnected from actual investing'
      ],
      discvrMoats: [
        'Verified Financial Expertise - CFA/NISM certified contributors, not social media opinions',
        'Portfolio-Integrated Intelligence - Research directly connects to investment decisions',
        'Financial Domain AI - Specialized models + human expert validation',
        'Accountability Loop - Track expert recommendations vs outcomes over time',
        'Decision-Driven Platform - Actionable investment intelligence, not just discussion'
      ],
      keyInsight: "DISCVR isn't competing with social platforms - it's building a financial decision intelligence system with community validation.",
      indiaStrategy: {
        title: 'India-First Strategy (Despite US Product Launch)',
        reasons: [
          'Regulatory Complexity: Each market has unique compliance requirements',
          'Community Building: Easier to build trusted expert networks in single market',
          'Cultural Financial Behavior: Investment patterns vary significantly by region',
          'Language & Context: Indian financial products need India-specific insights',
          'Focused Execution: Better to dominate one market than be mediocre globally',
          'Network Effects: Stronger when concentrated in single geography initially'
        ],
        usProductNote: 'Launching US stocks/funds for Indian investors (expanding product breadth), not targeting US users or building US expert communities yet. Keeping community and validation systems India-focused for now.'
      }
    }
  },
  {
    id: 9,
    type: 'target-persona',
    title: 'Target Persona: India\'s Emerging Wealth Builders',
    subtitle: 'Young Professionals Ready for Smart Financial Management',
    icon: Target,
    personas: [
      {
        title: 'Digital-Native Investors',
        size: '25M potential users',
        profile: 'Tech-savvy professionals seeking financial growth',
        demographics: {
          age: '25-40 years',
          income: '6+ LPA',
          investableAssets: '₹50K+ (Equity/Fixed)',
          monthlyInvestable: '₹10K+',
          location: 'Tier 1 & 2 cities'
        },
        keyBehaviors: [
          'Active on multiple financial apps (5-7 on average)',
          'Monthly SIP investments but lacks portfolio view',
          'Credit card heavy users seeking payment optimization',
          'Research-oriented but overwhelmed by information',
          'Mobile-first approach to financial management'
        ],
        painPoints: [
          'Finding the right investment instruments among 1000s of options',
          'Getting meaningful analysis of existing portfolio performance',
          'No simple way to ask direct questions about investments',
          'Difficulty assessing if properly covered across asset classes',
          'Manual tracking of CC payments and SIP schedules',
          'Fragmented experience across 5+ financial apps'
        ],
        productNeed: 'AI-powered unified platform that consolidates, analyzes, and provides actionable insights with conversational interface',
        revenue: '₹2,400 annual revenue potential per user',
        gtmApproach: 'Social media financial education → App download → Portfolio aggregation → AI insights → Product recommendations',
        howDiscvrSolves: [
          '🎯 AI-Powered Instrument Discovery: Our recommendation engine analyzes your profile, goals, and market data to suggest optimal investment instruments from our comprehensive universe',
          '📊 Real-time Portfolio Intelligence: Aggregate all investments via Account Aggregator APIs and get AI-driven performance analysis, risk assessment, and rebalancing suggestions',
          '💬 Conversational Financial AI: Ask direct questions like "Should I buy HDFC Bank?" or "Is my portfolio diversified?" and get personalized, data-backed answers',
          '🛡️ Coverage Analysis Dashboard: Visual representation of your financial protection gaps across life insurance, health, investments with automated recommendations',
          '💳 Smart Payment Automation: Integrated bill payments, SIP scheduling, and CC payment optimization with spending insights and alerts',
          '🔄 Unified Financial Hub: Single platform replacing 5-7 apps with seamless execution capabilities across stocks, mutual funds, insurance, and payments'
        ]
      }
    ],
    totalTAM: '₹60,000 Cr addressable market from 25M target users',
    keyInsight: 'These users are not beginners - they\'re actively investing but frustrated with fragmented experiences. They want intelligence, not just tracking. DISCVR.AI transforms their existing financial chaos into organized, actionable wealth-building system.'
  },
  {
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
        background: ['19+ years experience', 'Founded and scaled a ₹100Cr+ business in 3 years | Led P&L ownership of ₹1000Cr+', 'MBA from SPJAIN', 'B2C consumer tech growth expertise'],
        experience: 'Growth Strategy & P&L Leadership'
      },
      {
        name: 'Chief Product Officer',
        role: 'Product & AI Strategy',
        background: ['19+ years strategic product & AI leader', 'Scaled products to 200M+ MAU', 'GenAI/ML: 80%+ churn prediction accuracy', 'IIT Kanpur (AIR 22) + ISB MBA', 'Author of 2 AI books'],
        experience: 'Ex-Microsoft, Ex-BigTech VP'
      }
    ],
    executionStrategy: {
      title: 'Key Execution Initiatives - Q1 2025',
      initiatives: [
        {
          category: 'SEO & Content Strategy',
          lead: 'Hired SEO Head',
          description: 'Drive organic traffic through content pipeline',
          details: [
            'Custom in-house CMS/deep research content generator',
            'AI-enabled deep research articles per SEO guidelines',
            'Topic-focused content automation for financial education'
          ]
        },
        {
          category: 'Brand Ambassadors Program',
          lead: 'Community Strategy',
          description: 'Equity research analysts community network',
          details: [
            '10 ambassadors onboarding starting this month',
            'Platform usage for their own research workflows',
            'Analysis sharing across social channels for visibility',
            'Mass reach through authentic expert endorsements'
          ]
        }
      ]
    }
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
    type: 'unit_economics',
    title: 'Key Financial Milestones & Unit Economics',
    subtitle: '🎯 Million Users by 15 Months | 🚀 Breakeven by Year 3 | 💰 1000cr+ by Year 5',
    icon: TrendingUp,
    projections: [
      {
        timeline: 'Year 1 (Launch)',
        users: '0.9M users',
        arr: '₹325L Revenue',
        milestone: 'Product-Market Fit Foundation'
      },
      {
        timeline: 'Year 2 (15 Months)',
        users: '6.4M users',
        arr: '₹3,390L Revenue',
        milestone: '🎯 MILLION USERS MILESTONE'
      },
      {
        timeline: 'Year 3 (Breakeven)',
        users: '20.2M users', 
        arr: '₹24,620L Revenue',
        milestone: '🚀 PROFITABILITY + UNICORN VALUATION'
      },
      {
        timeline: 'Year 4 (Scale)',
        users: '36.2M users',
        arr: '₹56,095L Revenue', 
        milestone: 'Market Leadership (30% EBIT)'
      },
      {
        timeline: 'Year 5 (Domination)',
        users: '65M users',
        arr: '₹104,431L Revenue',
        milestone: '💰 1000CR+ TOPLINE (40% EBIT)'
      }
    ]
  },
  {
    id: 14,
    type: 'revenue_model',
    title: 'Diversified Revenue Streams',
    subtitle: 'Multiple Monetization Channels | ₹1,606 ARPU by Year 5',
    icon: DollarSign,
    revenueStreams: [
      {
        name: 'Platform Subscriptions',
        timeline: 'Year 1-5',
        structure: '₹5,000/year premium plan',
        details: [
          'Premium insights and analytics',
          'Advanced portfolio tools',  
          'Priority customer support',
          'Enhanced security features'
        ],
        color: 'blue'
      },
      {
        name: 'Marketplace Commissions',
        timeline: 'Year 2-5',
        structure: '0.25-0.75% transaction fee',
        details: [
          'Mutual fund transactions',
          'Stock trading commissions',
          'Insurance policy sales',
          'FD/Bond placements'
        ],
        color: 'green'
      },
      {
        name: 'PMS & Wealth Management',
        timeline: 'Year 3-5',
        structure: '1.5% AUM fee',
        details: [
          'AI-powered portfolio management',
          'High net worth services',
          'Customized investment strategies',
          'Tax optimization services'
        ],
        color: 'purple'
      },
      {
        name: 'Advertising Revenue',
        timeline: 'Year 1-5',
        structure: 'CPM/CPC model',
        details: [
          'Targeted financial product ads',
          'Educational content sponsorships',
          'Premium placement fees',
          'Data-driven ad optimization'
        ],
        color: 'orange'
      }
    ],
    totalArpu: '₹361/user (Y1) rising to ₹1,606/user by Year 5'
  },
  {
    id: 15,
    type: 'financial_assumptions',
    title: 'Path to Unicorn: Key Financial Drivers',
    subtitle: 'Conservative assumptions driving exceptional milestone achievement',
    icon: Calculator,
    assumptions: [
      {
        category: '🎯 Million Users by 15 Months',
        items: [
          '6.4M users by Year 2 (15-month mark)',
          'Aggressive but proven growth in Indian fintech',
          '15% monthly growth rate in first 18 months',
          'Network effects + viral acquisition strategies'
        ]
      },
      {
        category: '🚀 Breakeven by Year 3',
        items: [
          'Positive EBIT of ₹1,599L in Year 3 (6.5% margin)',
          'Revenue scale beats expense growth curve',
          'Operational leverage from platform business model',
          '₹246cr revenue run rate enables unicorn valuation'
        ]
      },
      {
        category: '💰 1000cr+ Topline by Year 5',
        items: [
          '₹104,431L revenue = ₹1,044cr topline by Year 5',
          'Multiple revenue streams: Subs + Marketplace + PMS',
          '40% EBIT margins at maturity (₹41,422L profit)',
          'Diversified monetization reducing single-point failure'
        ]
      },
      {
        category: '🦄 Unicorn Trajectory',
        items: [
          '$1B+ valuation by end of Year 3',
          '12x revenue multiple on ₹246cr run rate',
          'Comparable to Groww ($7B), CRED ($4B) valuations',
          'First-mover advantage in AI + Account Aggregator space'
        ]
      }
    ]
  },
  {
    id: 16,
    type: 'funding',
    title: '$1.5M Seed Round',
    subtitle: 'Optimized for Efficient Growth & Market Leadership',
    icon: Wallet,
    allocation: [
      {
        percentage: '50%',
        category: 'User Acquisition',
        amount: '₹6.0 Cr',
        description: 'Marketing campaigns, influencer partnerships, content creation, user onboarding'
      },
      {
        percentage: '30%',
        category: 'Team',
        amount: '₹3.6 Cr',
        description: 'Core engineering, product, AI/ML specialists, growth team expansion'
      },
      {
        percentage: '5%',
        category: 'Infrastructure',
        amount: '₹0.6 Cr',
        description: 'Cloud infrastructure, security systems, data storage, platform scaling'
      },
      {
        percentage: '5%',
        category: 'Compliance',
        amount: '₹0.6 Cr',
        description: 'SEBI RIA registration, legal setup, regulatory compliance, audit costs'
      },
      {
        percentage: '10%',
        category: 'Operations',
        amount: '₹1.2 Cr',
        description: 'Administrative expenses, partnerships, office setup, working capital'
      }
    ],
    fundDetails: {
      raiseAmount: '$1.5M (₹12 Cr)',
      timeline: '18-month runway to Series A',
      valuation: 'Pre-money: $8-10M'
    },
    keyMilestones: [
      'Month 6: 400K users, Multi-App Jugglers PMF',
      'Month 12: 900K users, Wealth Builders expansion',
      'Month 18: 1M users, Series A readiness ($5-8M raise)'
    ],
    useOfFunds: {
      userAcquisition: '50% - Digital marketing, influencer partnerships, content strategy, user onboarding optimization',
      teamBuilding: '30% - Scale engineering (6-8), product (3-4), AI/ML (2-3), growth (2-3)',
      infrastructure: '5% - Cloud infrastructure, security systems, data storage, platform scaling',
      compliance: '5% - SEBI RIA registration, legal setup, regulatory compliance, audit costs',
      operations: '10% - Partnerships, office setup, administrative costs, working capital'
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
  },
  {
    id: 17,
    type: 'community-gtm',
    title: 'Community-Driven GTM Strategy',
    subtitle: 'Viral Growth Through Authentic Financial Contests & Content',
    icon: Play,
    contentStrategy: {
      channels: [
        {
          platform: 'YouTube Shorts/Reels',
          contentType: 'Quick financial tips, portfolio reviews, market reactions',
          audience: '18-35 year olds seeking quick insights'
        },
        {
          platform: 'YouTube Long-form',
          contentType: 'Deep-dive portfolio analysis, market education',
          audience: 'Serious investors wanting comprehensive learning'
        },
        {
          platform: 'Meta (Instagram/Facebook)',
          contentType: 'Contest announcements, winner spotlights, tips',
          audience: 'Broad financial interest community'
        },
        {
          platform: 'SEO Content Pipeline',
          contentType: 'AI-enabled deep research articles per SEO guidelines',
          audience: 'Organic search traffic + serious researchers'
        },
        {
          platform: 'Brand Ambassador Network',
          contentType: 'Equity research analysts sharing authentic analysis',
          audience: 'Professional network + social media followers'
        }
      ]
    },
    communityContests: [
      {
        contest: 'Founding Analyst Program',
        description: '200+ equity research analysts onboarded as founding members with early access to features and exclusive contests.',
        engagement: 'Active community of validated experts',
        dataValue: 'Professional-grade research quality, credibility boost',
        growthLoop: 'Expert validation → Retail user trust → Social sharing → Viral growth'
      },
      {
        contest: 'Pick Your Best Mutual Fund',
        description: 'Founding analysts submit top MF picks with detailed research. Retail users vote + AI analysis determines winners.',
        engagement: '10K+ monthly submissions from analysts + users',
        dataValue: 'Expert-validated preferences, professional analysis patterns',
        growthLoop: 'Analysts share on social → Votes from followers → New user acquisition'
      },
      {
        contest: 'Build Your Dream Portfolio',
        description: 'Create and justify a portfolio allocation. Real performance tracking over 3-6 months.',
        engagement: '25K+ portfolio submissions',
        dataValue: 'Asset allocation preferences, risk appetite mapping',
        growthLoop: 'Portfolio performance shared → Social proof → New user acquisition'
      },
      {
        contest: 'Stock Pick Challenge',
        description: 'Monthly stock picking contest with real money simulation and leaderboards.',
        engagement: '15K+ active participants',
        dataValue: 'Stock sentiment, picking patterns, market timing',
        growthLoop: 'Leaderboard competition → Social sharing → Viral acquisition'
      },
      {
        contest: 'AI Query Championship',
        description: 'Best financial questions asked to AI, community votes on most insightful queries.',
        engagement: '8K+ monthly queries',
        dataValue: 'User pain points, question patterns, knowledge gaps',
        growthLoop: 'Featured queries → Educational content → Platform stickiness'
      }
    ],
    growthLoop: {
      phases: [
        {
          phase: 'Expert Validation',
          description: '200+ founding analysts create authenticated research content',
          outcome: 'Credible, professional-grade insights'
        },
        {
          phase: 'Retail Discovery',
          description: 'Users discover expert research through platform and social channels',
          outcome: 'Trust-based user acquisition'
        },
        {
          phase: 'Contest Participation',
          description: 'Users + analysts engage in contests, submit real preferences',
          outcome: 'Community engagement + data collection'
        },
        {
          phase: 'AI Enhancement',
          description: 'AI summarizes expert + user research for sharper insights',
          outcome: 'Unique AI+Human hybrid intelligence'
        },
        {
          phase: 'Social Amplification',
          description: 'Analysts share results on social platforms to gain votes',
          outcome: 'Viral growth through professional networks'
        },
        {
          phase: 'Performance Tracking',
          description: 'Real-time tracking of contest performance vs market',
          outcome: 'Product stickiness'
        },
        {
          phase: 'Social Amplification',
          description: 'Share wins, portfolio performance, learnings',
          outcome: 'Viral referrals'
        }
      ]
    }
  }
];

// Appendix Slides - Supporting Details
export const appendixSlides = [
  {
    id: 'A1',
    type: 'portfolio-aggregation-technical',
    title: 'Portfolio Aggregation Technical Details',
    subtitle: 'Account Aggregator Integration & Data Architecture',
    icon: Database,
    technicalDetails: {
      accountAggregatorIntegration: [
        'Real-time data sync via RBI-approved AA framework',
        'Support for 8+ Account Aggregators including OneMoney, Finvu',
        'Consent-based secure data sharing protocols',
        'Multi-bank, multi-product portfolio consolidation'
      ],
      dataArchitecture: [
        'Encrypted data storage with user consent management',
        'Real-time portfolio valuation and performance tracking',
        'Historical data analysis and trend identification',
        'Cross-platform reconciliation and duplicate detection'
      ],
      supportedProducts: [
        'Stocks, Mutual Funds, Fixed Deposits, PPF/EPF',
        'Credit Cards, Loans, Insurance policies',
        'Digital Gold, Cryptocurrency holdings',
        'Real Estate and alternative investments'
      ]
    }
  },
  {
    id: 'A2', 
    type: 'portfolio-management-pain',
    title: 'Traditional Portfolio Management Pain Points',
    subtitle: 'Current Market Gaps and User Frustrations',
    icon: AlertTriangle,
    traditionalPainPoints: {
      fragmentationIssues: [
        'Average user manages 2+ financial accounts across platforms',
        '5+ apps needed for complete portfolio visibility',
        '2-3 hours weekly spent on manual tracking and reconciliation'
      ],
      decisionMakingGaps: [
        '40% make suboptimal decisions due to information fragmentation',
        'No unified view leads to asset allocation imbalances',
        'Difficulty in tax planning and optimization across accounts'
      ],
      costImplications: [
        'Average ₹50,000+ annual opportunity cost from poor coordination',
        'Missed rebalancing opportunities due to fragmented tracking',
        'Suboptimal asset allocation leading to reduced returns'
      ]
    }
  },
  {
    id: 'A3',
    type: 'detailed-platform-architecture',
    title: 'Detailed Platform Architecture',
    subtitle: 'Complete Technical Stack for Scale',
    icon: Building2,
    detailedArchitecture: {
      microservicesArchitecture: [
        'User Management & Authentication Service',
        'Account Aggregation & Data Sync Service', 
        'AI/ML Recommendation Engine',
        'Portfolio Analysis & Insights Service',
        'Transaction Execution & Broker Integration'
      ],
      scalabilityFeatures: [
        'Horizontal scaling for 200M+ users',
        'Real-time data processing capabilities',
        'Multi-region deployment for latency optimization',
        'Event-driven architecture for real-time updates'
      ],
      securityMeasures: [
        'End-to-end encryption for all financial data',
        'Zero-knowledge architecture for sensitive information',
        'Compliance with RBI and SEBI regulations',
        'Multi-factor authentication and biometric security'
      ]
    }
  },
  {
    id: 'A4',
    type: 'additional-market-research',
    title: 'Extended Market Research & Validation',
    subtitle: 'Comprehensive Market Analysis',
    icon: BarChart3,
    extendedResearch: {
      competitorBenchmarking: [
        'Feature gap analysis across 15+ fintech platforms',
        'ARPU and user engagement metrics comparison',
        'Technology stack and scalability assessment',
        'Geographic expansion patterns and success factors'
      ],
      userResearchInsights: [
        '500+ user interviews across Tier 1 & 2 cities',
        'Behavioral analysis of financial app usage patterns',
        'Pain point prioritization and solution validation',
        'Willingness to pay research across user segments'
      ],
      marketSizingValidation: [
        'Third-party market research validation',
        'Government data analysis and projections',
        'Industry expert interviews and consensus',
        'International market comparison and benchmarking'
      ]
    }
  },
  {
    id: 'A5',
    type: 'extended-competitive-analysis', 
    title: 'Extended Competitive Analysis',
    subtitle: 'Deep Dive into Competitive Landscape',
    icon: Shield,
    extendedCompetitive: {
      internationalBenchmarks: [
        'Personal Capital (US) - Portfolio aggregation leader',
        'Mint (US) - Comprehensive financial management',
        'Tink (Europe) - Open banking and aggregation',
        'Emma (UK) - AI-powered financial insights'
      ],
      emergingThreats: [
        'Big Tech entry: Google Pay, PhonePe expansion',
        'Banking consolidation: HDFC Bank, ICICI direct offerings',
        'Neo-banking growth: Jupiter, Fi money comprehensive solutions',
        'Crypto platforms: WazirX, CoinDCX diversification'
      ],
      competitiveAdvantages: [
        'First-mover in AI-powered community validation',
        'Deep integration with Account Aggregator ecosystem',
        'Human + AI hybrid intelligence approach',
        'Comprehensive review and rating system'
      ]
    }
  }
];
