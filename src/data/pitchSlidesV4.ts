import { Brain, TrendingUp, Target, Users, Rocket, DollarSign, BarChart3, AlertTriangle, Zap, Link, Trophy, Wallet, Building2, Shield, Eye, GitBranch, GraduationCap, Network, Database, Calculator, Play } from 'lucide-react';

export const pitchSlidesV4 = [
  {
    id: 1,
    type: 'title',
    title: 'DISCVR.AI',
    subtitle: 'Human layer which AI cant replace',
    author: 'Shubham Srivastava, Founder & CEO',
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
          { year: 'Year 1', users: '1M', strategy: 'Social + SEO + Performance Marketing' },
          { year: 'Year 2', users: '4M', strategy: 'Scaled marketing channels + word-of-mouth' },
          { year: 'Year 3', users: '10M', strategy: 'Marketing optimization + early PLG signals' },
          { year: 'Year 4', users: '16M', strategy: 'Product-led growth + user referrals' },
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
      hook: 'Multiple data points validate the massive need for credible financial guidance',
      scale: '1.1 crore traders lost ₹1.8 lakh crore in 3 years (2022-2024)',
      coreProblem: 'Massive demand for financial guidance but severe supply shortage',
      validationPoints: [
        {
          category: 'F&O Trading Losses',
          data: '93% of retail traders lost money (SEBI 2024)',
          insight: 'Massive appetite for trading, but lacking proper guidance'
        },
        {
          category: 'Advisor Supply Crisis', 
          data: 'Only <1,000 SEBI-registered RIAs for 300M+ potential users',
          insight: 'Extreme shortage of qualified financial advisors'
        },
        {
          category: 'Finfluencer Crisis',
          data: '40-60% decline in brand deals due to SEBI regulatory scrutiny',
          insight: 'Current influencer model is unsustainable and unreliable'
        },
        {
          category: 'DIY Investment Growth',
          data: '70M+ users on direct investment platforms (Groww, Zerodha)',
          insight: 'Users want to self-invest but need guidance and validation'
        }
      ],
      marketEvidence: 'High demand + extreme supply shortage = massive market opportunity',
      emotionalImpact: 'Indians are financially ambitious but guidance-starved'
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
      currentTraction: '10k+ MAUs in September (current run rate) + 200+ verified analyst contributors',
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
    type: 'risks',
    title: 'Risks & Mitigation',
    subtitle: 'Proactive Risk Management Strategy',
    icon: AlertTriangle,
    risks: [
      {
        risk: 'Market Risk',
        severity: 'High' as const,
        description: 'Regulatory changes in fintech space',
        mitigation: ['Strong compliance team and proactive regulatory engagement', 'Regular engagement with regulatory bodies', 'Flexible platform architecture for compliance changes']
      },
      {
        risk: 'Competition Risk', 
        severity: 'High' as const,
        description: 'Big tech companies entering the space',
        mitigation: ['Focus on specialized AI + community moat', 'Faster execution and product iteration', 'Deep India-specific market knowledge']
      },
      {
        risk: 'Technology Risk',
        severity: 'Medium' as const,
        description: 'AI model accuracy and data quality',
        mitigation: ['Human validation layer for all AI outputs', 'Continuous model improvement and retraining', 'Multi-source data validation']
      },
      {
        risk: 'User Acquisition Risk',
        severity: 'Medium' as const,
        description: 'High customer acquisition costs',
        mitigation: ['Product-led growth strategy', 'Viral community features and referrals', 'Strategic partnerships for user acquisition']
      }
    ]
  },
  {
    id: 10,
    type: 'team',
    title: 'Team',
    subtitle: 'Experienced Founder + Strategic Advisors',
    icon: Users,
    team: [
      {
        name: 'Shubham Srivastava',
        role: 'Founder & CEO',
        background: [
          '2 decades in tech leadership',
          'Last corporate role as CPTO for a listed unicorn company',
          'Previous roles with MakeMyTrip and Hindustan Times',
          'Led large scale mass market products'
        ],
        experience: '20+ years in technology leadership and product development'
      }
    ],
    advisors: [
      {
        name: 'Advisory Team',
        role: 'Strategic Advisors',
        background: [
          'CPO - Former product leader at major fintech',
          'Growth Officer - Marketing and user acquisition expert',
          'Financial Industry Expert - Regulatory and compliance guidance'
        ],
        experience: 'Combined 25+ years in fintech, product, and growth'
      }
    ]
  },
  {
    id: 11,
    type: 'funding',
    title: 'Seed Ask: $1.5M USD (~₹13 Crores)',
    subtitle: '18-Month Runway to Series A Readiness',
    icon: DollarSign,
    fundDetails: {
      raiseAmount: '$1.5M USD (~₹13 Cr)',
      timeline: '18 months runway',
      valuation: 'Pre-money valuation discussion'
    },
    allocation: [
      {
        percentage: '50%',
        category: 'User Acquisition',
        description: 'Marketing campaigns, partnerships, and growth initiatives'
      },
      {
        percentage: '30%',
        category: 'Tech + Product',
        description: 'AI development, platform enhancement, and new features'
      },
      {
        percentage: '10%',
        category: 'Infrastructure',
        description: 'Scaling cloud infrastructure and technical operations'
      },
      {
        percentage: '5%',
        category: 'Compliance',
        description: 'Regulatory compliance and legal requirements'
      },
      {
        percentage: '5%',
        category: 'Admin + Office + Buffer',
        description: 'Operations, office setup, and contingency buffer'
      }
    ],
    keyMilestones: [
      '1 million users by 12th month'
    ],
    competitiveContext: {
      title: 'Market Validation',
      examples: [
        'Cred raised $200M+ with strong user engagement model',
        'Groww achieved unicorn status with investment platform',
        'Zerodha built profitable fintech with community focus'
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
  },
  {
    id: 'A6',
    type: 'platform-architecture',
    title: 'Platform Architecture',
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
