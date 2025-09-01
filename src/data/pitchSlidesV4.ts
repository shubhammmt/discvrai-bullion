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
    type: 'risks',
    title: 'Key Risks & Mitigation',
    subtitle: 'Proactive Risk Management',
    icon: AlertTriangle,
    risks: [
      {
        risk: 'Big Tech Entry',
        severity: 'High',
        description: 'Large tech companies (PhonePe, Google Pay) entering wealth management space',
        mitigation: [
          'Specialized domain expertise vs generalist approach',
          'First-mover advantage in AI + AA combination',
          'Focus on mass market vs premium segments'
        ]
      },
      {
        risk: 'Regulatory Changes',
        severity: 'Medium',
        description: 'Potential changes in Account Aggregator framework or data regulations',
        mitigation: [
          'Built on government-backed AA framework',
          'Proactive compliance team and legal advisory',
          'Multiple data sources beyond AA framework'
        ]
      },
      {
        risk: 'CAC Inflation',
        severity: 'Medium',
        description: 'Rising customer acquisition costs in competitive fintech market',
        mitigation: [
          'Community-driven organic growth + referral network',
          'Product-led growth strategy',
          'Diversified acquisition channels'
        ]
      }
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
        background: [
          '19+ years experience',
          'Founded and scaled a ₹100Cr+ business in 3 years',
          'MBA from SPJAIN, B2C consumer tech growth expertise'
        ],
        experience: 'Growth Strategy & P&L Leadership of ₹1000Cr+'
      },
      {
        name: 'Chief Product Officer',
        role: 'Product & AI Strategy',
        background: [
          '19+ years strategic product & AI leader',
          'Scaled products to 200M+ MAU',
          'IIT Kanpur (AIR 22) + ISB MBA, Author of 2 AI books'
        ],
        experience: 'Ex-Microsoft, Ex-BigTech VP'
      }
    ]
  },
  {
    id: 12,
    type: 'funding',
    title: 'Seed Funding Ask: ₹15 Crores',
    subtitle: '18-Month Runway to Product-Market Fit & 1M Users',
    icon: DollarSign,
    allocation: [
      {
        percentage: '40%',
        category: 'Product Development',
        description: 'AI engine, mobile app, platform integrations'
      },
      {
        percentage: '30%',
        category: 'Team Building',
        description: 'Engineering, AI/ML, growth, and community teams'
      },
      {
        percentage: '20%',
        category: 'User Acquisition',
        description: 'College partnerships, expert community, marketing'
      },
      {
        percentage: '10%',
        category: 'Operations & Legal',
        description: 'Compliance, infrastructure, working capital'
      }
    ],
    fundDetails: {
      raiseAmount: '₹15 Crores (1.5M USD)',
      timeline: '18 months',
      valuation: 'Pre-money valuation discussion'
    },
    keyMilestones: [
      '1M+ registered users by Month 15',
      '200+ validated financial experts in community',
      'Product-market fit with 40%+ retention',
      'Series A readiness with clear unit economics'
    ]
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
  },
  {
    id: 'A6',
    type: 'platform-architecture',
    title: 'Complete Financial Platform Stack',
    subtitle: 'AI-Driven Architecture for 200M+ Users',
    icon: Building2,
    platformLayers: {
      distribution: {
        title: '1. Distribution',
        description: 'Multi-Channel User Acquisition & Engagement'
      },
      frontend: {
        title: '2. Frontend',
        description: 'React Native Cross-Platform Application'
      },
      userexperience: {
        title: '3. User Experience',
        description: 'Intuitive Financial Intelligence Interface'
      },
      aiengine: {
        title: '4. AI Engine',
        description: 'Personalized Financial Recommendations & Insights'
      },
      apis: {
        title: '5. APIs',
        description: 'Integration Layer for External Financial Services'
      },
      backend: {
        title: '6. Backend',
        description: 'Scalable Microservices Architecture'
      },
      database: {
        title: '7. Database',
        description: 'Secure Financial Data Storage & Management'
      },
      infrastructure: {
        title: '8. Infrastructure',
        description: 'Cloud-Native Scalable Computing Platform'
      },
      userdata: {
        title: '9. UserData',
        description: 'Universal Aggregation Engine – User Financial Data'
      }
    }
  },
  {
    id: 'A7',
    type: 'aa-validation',
    title: 'Account Aggregator: Explosive Growth Validates Market Need',
    subtitle: 'India\'s Fastest Growing Open Finance Network Proves Portfolio Consolidation Demand',
    icon: Link,
    validationData: {
      headline: 'World\'s Fastest Growing Open Finance Network - 1059% Growth in FY24',
      keyMetrics: [
        {
          metric: 'Data Sharing Growth',
          value: '1059% YoY',
          context: 'FY24 vs FY23 data sharing volume'
        },
        {
          metric: 'Total Consents',
          value: '10+ Crore',
          context: 'Active user consents for data sharing'
        },
        {
          metric: 'Transaction Volume',
          value: '₹74,500 Cr',
          context: 'Disbursed via AA in H1 FY25 alone'
        },
        {
          metric: 'Active FIPs',
          value: '2,000+',
          context: 'Financial Information Providers connected'
        }
      ],
      marketValidation: {
        userComfort: [
          'Massive adoption proves Indian users are comfortable sharing financial data',
          'Government-backed framework provides trust and security assurance',
          'Exponential growth indicates strong market need for unified financial view'
        ],
        platformReadiness: [
          'Infrastructure already exists and is proven at scale',
          'Regulatory framework supports innovation in financial aggregation',
          'Banks and financial institutions are already integrated and compliant'
        ],
        competitiveAdvantage: [
          'First-mover advantage in AI layer while competition focuses on basic aggregation',
          'Government backing + regulatory clarity reduces platform risk significantly'
        ]
      }
    }
  },
  {
    id: 'A8',
    type: 'competitive-landscape',
    title: 'Competitive Landscape & Our Moats',
    subtitle: 'Clear Differentiation in Crowded Market',
    icon: Shield,
    competitorAnalysis: {
      directCompetitors: [
        {
          name: 'Cred',
          threat: 'Credit card management + expanding financial services',
          weakness: 'Premium-focused, limited portfolio aggregation'
        },
        {
          name: 'Groww',
          threat: 'Investment platform with high user engagement',
          weakness: 'Investment-only, no comprehensive financial view'
        },
        {
          name: 'Payday',
          threat: 'Financial management and tracking',
          weakness: 'Manual tracking, limited AI capabilities'
        },
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
    id: 'A9',
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
    id: 'A10',
    type: 'revenue_model',
    title: 'Diversified Revenue Streams',
    subtitle: 'Multiple Monetization Channels | ₹1,606 ARPU by Year 5',
    icon: DollarSign,
    revenueStreams: [
      {
        name: 'Platform Subscriptions',
        description: 'Tiered subscription model for premium features',
        pricing: '₹199-999/month across 3 tiers',
        targetShare: '35%',
        launchTimeline: 'Month 6'
      },
      {
        name: 'Transaction-Based Revenue',
        description: 'Revenue sharing on executed transactions',
        pricing: '0.25-0.5% per transaction',
        targetShare: '30%',
        launchTimeline: 'Month 9'
      },
      {
        name: 'Financial Product Distribution',
        description: 'Partner revenue from product recommendations',
        pricing: '0.5-2% commission per product',
        targetShare: '25%',
        launchTimeline: 'Month 12'
      },
      {
        name: 'Premium Analytics & Insights',
        description: 'Advanced portfolio analytics and AI insights',
        pricing: '₹499-1499/month enterprise',
        targetShare: '10%',
        launchTimeline: 'Month 18'
      }
    ]
  }
];
