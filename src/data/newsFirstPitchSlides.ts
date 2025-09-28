import { 
  Brain, 
  TrendingUp, 
  Target, 
  Users, 
  Rocket, 
  DollarSign, 
  BarChart3, 
  AlertTriangle, 
  Zap, 
  Link, 
  Trophy, 
  Wallet, 
  Building2, 
  Shield, 
  Eye, 
  GitBranch, 
  GraduationCap, 
  Network, 
  Database, 
  Calculator, 
  Play,
  Globe,
  Newspaper,
  Activity,
  MapPin,
  ArrowRight
} from 'lucide-react';

export const newsFirstPitchSlides = [
  {
    id: 1,
    type: 'title',
    title: 'DISCVR.AI',
    subtitle: 'The global news-first finance platform',
    author: 'Building the Bloomberg Terminal for retail investors, mobile-first and community-driven',
    icon: Newspaper
  },
  {
    id: 2,
    type: 'problem',
    title: 'Finance Information is Fragmented',
    subtitle: 'No daily habit loop that ties finance information together for retail investors',
    icon: AlertTriangle,
    problemData: {
      coreIssue: 'Finance info scattered across multiple platforms with no unified experience',
      painPoints: [
        {
          category: 'News Sources',
          severity: 'Critical',
          stats: [
            'Bloomberg/Reuters are expensive and not retail-focused',
            'Most retail investors can\'t afford premium news services',
            'Generic news lacks financial context for individual investors'
          ]
        },
        {
          category: 'Community Platforms', 
          severity: 'High',
          stats: [
            'Reddit/Discord are noisy and not finance-first',
            'Information quality varies dramatically',
            'No verification of financial expertise or credentials'
          ]
        },
        {
          category: 'Research Platforms',
          severity: 'Medium',
          stats: [
            'TradingView/Yahoo are data-heavy with low engagement',
            'No connection between news events and investment actions',
            'Complex interfaces overwhelm casual investors'
          ]
        }
      ],
      currentSolutionGaps: [
        'No unified platform connecting news to actionable insights',
        'Lack of personalized financial context',
        'Missing community validation of information quality'
      ]
    },
    keyStats: [
      {
        number: '5-7',
        label: 'Apps Per Investor',
        description: 'Average number of apps investors use daily'
      },
      {
        number: '15+',
        label: 'Daily Switches',
        description: 'Context switches between platforms'
      }
    ]
  },
  {
    id: 3,
    type: 'solution',
    title: 'News-First Entry Point',
    subtitle: 'One app, multiple layers - from any news story to complete action',
    icon: Zap,
    features: [
      {
        icon: Newspaper,
        title: 'Bite-sized Global News',
        description: 'Contextual, personalized finance news as daily entry point',
        capabilities: ['Personalized news feed', 'Global market coverage', 'Context-aware stories'],
        benefit: 'Daily habit formation through news consumption'
      },
      {
        icon: BarChart3,
        title: 'Integrated Research',
        description: 'Deep dive into stocks, mutual funds, crypto, ETFs from any news story',
        capabilities: ['One-click research', 'Multi-asset coverage', 'Expert insights'],
        benefit: 'Seamless news-to-action conversion'
      },
      {
        icon: Trophy,
        title: 'Gamified Engagement',
        description: 'Contests and community discussion around market events',
        capabilities: ['Investment contests', 'Community discussions', 'Leaderboards'],
        benefit: 'Higher engagement and retention'
      }
    ]
  },
  {
    id: 4,
    type: 'value',
    title: 'Why News?',
    subtitle: 'News is the most frequent touchpoint for investors globally',
    icon: Target,
    benefits: [
      {
        title: 'Universal & Habit-Forming',
        description: 'News creates daily engagement patterns across all investor types',
        icon: Globe
      },
      {
        title: 'Shareable & Viral',
        description: 'News naturally drives social sharing and community discussions',
        icon: Users
      },
      {
        title: 'Action-Triggering',
        description: 'You own the "news → action" funnel that incumbents ignore',
        icon: ArrowRight
      }
    ]
  },
  {
    id: 5,
    type: 'traction',
    title: 'Proof Points & Traction',
    subtitle: 'Strong engagement metrics validate news-first approach',
    icon: Activity,
    metrics: [
      {
        metric: 'Daily Return Rate',
        value: '60%',
        growth: 'users return daily for news'
      },
      {
        metric: 'News → Research Conversion', 
        value: '30%',
        growth: 'news clicks drive research'
      },
      {
        metric: 'Community Engagement',
        value: '200+',
        growth: 'verified expert contributors'
      },
      {
        metric: 'Contest Participation',
        value: '70%',
        growth: 'monthly active users join contests'
      }
    ]
  },
  {
    id: 6,
    type: 'market-opportunity',
    title: 'Global Retail Investor Market',
    subtitle: 'News is the common denominator across all markets',
    icon: Globe,
    marketStory: {
      headline: 'Multi-billion dollar TAM across global retail investors',
      massMarketExplosion: [
        {
          category: 'Global Retail Investors',
          current: '500M+ users',
          projected2030: '1B+ users',
          growth: 'Across US, India, SEA, LATAM',
          catalyst: 'Mobile-first investing + democratization'
        },
        {
          category: 'News + Finance App Overlap',
          current: 'Fragmented ecosystem',
          projected2030: 'Complete convergence',
          growth: 'Multi-billion dollar opportunity',
          catalyst: 'Information-driven investing trend'
        }
      ],
      massMarketValidation: [
        'News is the most frequent touchpoint for investors globally',
        'Finance and news apps have massive user overlap',
        'Mobile-first generation demands integrated experiences',
        'Information drives 80%+ of investment decisions'
      ]
    },
    productGrowthAcrossCategories: {
      investmentProducts: {
        currentUsers: '500M+ global retail investors',
        projected2030: '1B+ users worldwide',
        painPoint: 'Fragmented news and research platforms',
        opportunitySize: 'Multi-billion dollar global market'
      },
      creditProducts: {
        currentUsers: '300M+ users across markets',
        projected2030: '600M+ users',
        painPoint: 'No integrated news-to-action flow',
        opportunitySize: 'Expanding fintech market'
      },
      protectionProducts: {
        currentGap: 'No news-first finance platforms',
        projected2030: '200M+ engaged users',
        painPoint: 'Information scattered across platforms',
        opportunitySize: 'First-mover advantage'
      }
    },
    keyInsight: 'News is the common denominator across all global markets - owning the news-to-action funnel creates massive defensible value'
  },
  {
    id: 7,
    type: 'platform-differentiation',
    title: 'Our Competitive Moat',
    subtitle: 'Finance-first community vs generic platforms',
    icon: Shield,
    differentiation: {
      discvrMoats: [
        'Personalized Finance News - Localized & bite-sized for investors',
        'Finance-First Community - Verified experts vs Reddit noise',
        'Gamified Engagement - Contests & leaderboards for stickiness', 
        'API-Ready Platform - Expandable into broker/fintech integrations',
        'News → Action Funnel - Own the conversion that others miss'
      ]
    }
  },
  {
    id: 8,
    type: 'business-model',
    title: 'Multiple Revenue Streams',
    subtitle: 'Freemium to Premium to B2B expansion',
    icon: DollarSign,
    revenueStreams: [
      {
        stream: 'Freemium Base',
        description: 'Ad-supported news & basic contests',
        timeline: 'Launch'
      },
      {
        stream: 'Premium Subscriptions', 
        description: 'Advanced alerts, premium research, exclusive contests',
        timeline: 'Year 1'
      },
      {
        stream: 'B2B SaaS/APIs',
        description: 'Embed news/community in broker apps',
        timeline: 'Year 2'
      },
      {
        stream: 'Affiliate Partnerships',
        description: 'Broker referrals, trade commissions',
        timeline: 'Ongoing'
      }
    ]
  },
  {
    id: 9,
    type: 'roadmap',
    title: 'Global Expansion Roadmap',
    subtitle: 'India → US → Emerging Markets',
    icon: MapPin,
    phases: [
      {
        phase: 'Phase 1: India Focus',
        timeline: 'Months 1-12',
        objective: 'Build DAU habit with news-first + contests',
        metrics: 'Daily engagement, news-to-research conversion'
      },
      {
        phase: 'Phase 2: Global Expansion',
        timeline: 'Year 2-3', 
        objective: 'Roll out US + emerging markets with localized feeds',
        metrics: 'Multi-market DAU, localization success'
      },
      {
        phase: 'Phase 3: Platform Play',
        timeline: 'Year 3+',
        objective: 'API + broker integrations, B2B expansion',
        metrics: 'API adoption, B2B revenue'
      }
    ]
  },
  {
    id: 10,
    type: 'cta',
    title: 'The Ask',
    subtitle: 'News is where finance starts. We\'re building the global news-first platform for investors.',
    icon: Rocket,
    description: 'We are raising funding to scale content partnerships, strengthen personalization AI, and expand to the US market.',
    contact: {
      email: 'shubham@discvr.ai',
      phone: '+91 98739 61591',
      linkedin: 'https://www.linkedin.com/company/discvrai/'
    },
    cta: 'Join us in building the Bloomberg Terminal for retail investors'
  }
];