import { TrendingUp, Target, Rocket, Users, DollarSign, Trophy, CheckCircle, Mail } from 'lucide-react';

export const familyFriendsPitchSlides = [
  // Slide 1: Cover
  {
    id: 1,
    type: 'title',
    title: 'Discvr.ai',
    subtitle: 'AI-Powered Financial Product Distribution Platform',
    tagline: 'Making Professional Research Accessible to 200M+ Retail Investors',
    author: 'Family & Friends Round | October 2025',
    icon: TrendingUp
  },

  // Slide 2: Problem + Opportunity
  {
    id: 2,
    type: 'problem-opportunity',
    title: 'The Financial Product Distribution Problem',
    subtitle: 'Fragmented Silos & Expensive User Acquisition',
    icon: Target,
    problem: {
      investors: {
        title: 'For Users: Broken Experience',
        stats: [
          'Discovery platforms (research/news) ≠ Execution platforms (brokers)',
          'Fragmented journey: research on one app, execute on another',
          'User data & context lost in transition',
          'No single platform for discovery → research → execution'
        ]
      },
      currentSolutions: {
        title: 'For Providers: Expensive CAC',
        stats: [
          'Financial service providers spend ₹2000-5000/user to convert',
          'Heavy marketing spend on cold leads',
          'No quality research tools for their own platforms',
          'Depend on expensive third-party APIs'
        ]
      }
    },
    opportunity: {
      marketSize: '$50B+ financial distribution market',
      growth: '200M+ investors (India + US) seeking unified platforms',
      enabler: 'AI enables seamless discovery-to-execution with intact user context',
      model: 'Dual revenue: Distribution platform + B2B SaaS'
    }
  },

  // Slide 3: Solution
  {
    id: 3,
    type: 'solution-pillars',
    title: 'We Solve Both Sides: Distribution Platform + B2B SaaS',
    subtitle: 'The Middleman Connecting Users & Financial Service Providers',
    icon: Rocket,
    pillars: [
      {
        icon: '📰',
        title: 'Engagement Layer',
        description: 'Daily financial news & insights',
        features: ['AI-summarized from 100+ sources', 'Personalized to user profile', 'Creates daily habit & trust'],
        impact: 'Sticky Users'
      },
      {
        icon: '🔬',
        title: 'B2C Distribution Platform',
        description: 'Seamless discovery → research → execution',
        features: ['AI-powered product recommendations (LAMF, FDs, Loans, MF)', 'User data & context intact throughout', 'Full-stack execution OR lead-gen to providers'],
        impact: 'Commission Revenue'
      },
      {
        icon: '🏢',
        title: 'B2B SaaS Platform',
        description: 'White-label research tools for providers',
        features: ['APIs for AMCs, brokers, fintechs to use our AI research', 'Plug into their digital platforms', '₹50K-500K per client/month'],
        impact: 'Recurring SaaS Revenue'
      },
      {
        icon: '🎮',
        title: 'Gamification & Retention',
        description: 'Investment contests & predictions',
        features: ['Weekly competitions', 'Leaderboards & rewards', 'Viral community engagement'],
        impact: 'Retention & Virality'
      }
    ]
  },

  // Slide 4: Business Model + Market
  {
    id: 4,
    type: 'business-market',
    title: 'Multiple Revenue Streams = Lower Risk',
    subtitle: 'FY27-28: ₹23 Cr Revenue | ₹8 Cr Profit',
    icon: DollarSign,
    revenueStreams: [
      { name: 'Advertising', percentage: 47, amount: '₹9.0M/mo', description: 'Display ads, CPM ₹160-900' },
      { name: 'Distribution', percentage: 33, amount: '₹6.3M/mo', description: 'Partner commissions (LAMF, FDs, Loans, MF) - ₹500-2000/conversion' },
      { name: 'Subscriptions', percentage: 12, amount: '₹2.3M/mo', description: 'Freemium: ₹99-999/mo' },
      { name: 'B2B SaaS', percentage: 8, amount: '₹1.5M/mo', description: 'White-label research tools' }
    ],
    market: {
      tam: '$50B global financial data & analytics',
      sam: '208M investors (India + US)',
      target: '5M users by Year 3',
      revenue: '₹500M-1B annual potential'
    }
  },

  // Slide 5: Traction + Financials
  {
    id: 5,
    type: 'traction-financials',
    title: 'Building Momentum',
    subtitle: 'Break-even in 14 Months | 30%+ Gross Margin',
    icon: Trophy,
    traction: {
      product: ['News platform live with AI', 'Stock research tool (beta) (launch in Oct25)', 'MF comparison (beta) (Live for India, US end Nov25)', 'Contest platform (Live)'],
      partnerships: ['2 Partnerships closed: MF-LAF & FD', 'Personal Loans (onboarding)'],
      metrics: ['100K users for Nov (40K Oct, 11K Sept)', 'Organic user engagement: 2 min avg session', '2 B2B discussions for SaaS ongoing']
    },
    financials: {
      projections: [
        { month: 'M1', maus: '100K', revenue: '₹100K', profit: '-₹1.2M' },
        { month: 'M6', maus: '260K', revenue: '₹9.23L', profit: '-₹18L' },
        { month: 'M12', maus: '1.2M', revenue: '₹30L', profit: '-₹7.36L' },
        { month: 'M24', maus: '3.5M', revenue: '₹71.35L', profit: '+₹14L' }
      ],
      highlights: [
        'Break-even: Month 14',
        'Gross Margin: 30%+',
        'Strong organic growth trajectory',
        'Multiple revenue streams de-risk'
      ]
    },
    unitEconomics: {
      india: { cac: '₹3-4', arpu: '₹6-8/mo', ltv: '₹1,800-2,500', ratio: '60-80x' },
      us: { cac: '₹0 (organic)', arpu: '₹15-20/mo', ltv: '₹5,400-7,200', ratio: '∞' },
      blended: { cac: '₹0.94', arpu: '₹9.28/mo', margin: '85%+' }
    }
  },

  // Slide 6: Team + GTM Strategy
  {
    id: 6,
    type: 'team-gtm',
    title: 'Committed Team & Organic-First Growth',
    subtitle: '77% Organic Traffic by M18',
    icon: Users,
    team: {
      current: [
        { role: 'Tech Team', count: '3 developers + 2 interns' },
        { role: 'Content Team', count: '3 writers + 1 video' },
        { role: 'SEO Expert', count: '1' },
        { role: 'Equity Research', count: '1 analyst' },
        { role: 'Product Manager', count: '1' },
        { role: 'Sales (BD Lead)', count: '1' }
      ],
      total: '13 people',
      hiring: ['Product Manager (M2)', '2 Sales/BDRs (M3-4)', '2 Developers (M4-6)', 'Content Lead + 2 writers (M5-8)']
    },
    gtm: {
      contentEngine: {
        title: 'SEO & Content Engine',
        stats: ['180→410 articles per day', 'AI-assisted production', 'Long-tail keyword strategy'],
        result: '77% organic traffic by M18'
      },
      gamification: {
        title: 'Viral Gamification',
        stats: ['Weekly investment contests', 'College partnerships', 'Social sharing incentives'],
        result: '15-20% viral coefficient'
      },
      partnerships: {
        title: 'Strategic Partnerships',
        stats: ['AMC distribution partnerships', 'Broker integrations', 'Financial influencers'],
        result: '5-10K users per partnership'
      },
      cac: { india: '₹3-4', us: '₹0 (organic)', blended: '₹0.94 at scale' }
    }
  },

  // Slide 7: The Ask
  {
    id: 7,
    type: 'ask',
    title: 'Join Us in Building the Future of Financial Intelligence',
    subtitle: 'Raising ₹2 Cr via Convertible Notes',
    icon: CheckCircle,
    investment: {
      amount: '₹2 Cr',
      structure: 'Convertible Notes (converts at Series A)',
      discount: '25% discount to Series A valuation',
      interest: '0% (standard for F&F rounds)',
      maturity: '24 months or upon Series A',
      minimum: '₹10 Lakhs',
      maximum: '₹50 Lakhs',
      close: 'October 2025',
      qualifiedFinancing: 'Converts at any "Qualified Financing" (raise of ₹2 Cr+ from institutional investors) with 25% discount. If we raise a seed round, your note converts then.'
    },
    convertibleNoteExplanation: {
      title: 'What is a Convertible Note?',
      description: 'Your investment converts to equity at our next "Qualified Financing" (any raise of ₹2 Cr+ from institutional investors) at a 25% discount. This rewards you for investing early without needing to set a valuation now.',
      example: [
        'If we raise ₹5 Cr seed round at ₹40 Cr valuation → you convert at ₹30 Cr (25% discount)',
        'If we raise Series A at ₹100 Cr valuation → you convert at ₹75 Cr (25% discount)',
        'You get 33% more shares than the new investors in that round'
      ]
    },
    benefits: [
      '25% discount to Series A valuation (bonus for early investment)',
      'Quarterly investor updates',
      'Pro-rata rights in Series A (optional participation)',
      'Priority conversion rights',
      'Ground floor in democratizing finance'
    ],
    returns: [
      { 
        scenario: 'Conservative', 
        seriesAValuation: '₹50 Cr', 
        effectiveValuation: '₹37.5 Cr (25% disc)', 
        exitValuation: '₹500 Cr',
        investment: '₹10L',
        returns: '₹1.33 Cr', 
        multiple: '13x' 
      },
      { 
        scenario: 'Base', 
        seriesAValuation: '₹100 Cr', 
        effectiveValuation: '₹75 Cr (25% disc)', 
        exitValuation: '₹2000 Cr',
        investment: '₹10L',
        returns: '₹2.67 Cr', 
        multiple: '27x' 
      },
      { 
        scenario: 'Stretch', 
        seriesAValuation: '₹150 Cr', 
        effectiveValuation: '₹112.5 Cr (25% disc)', 
        exitValuation: '₹5000 Cr',
        investment: '₹10L',
        returns: '₹4.44 Cr', 
        multiple: '44x' 
      }
    ],
    exitScenarios: {
      title: 'When & How Can You Exit?',
      scenarios: [
        {
          title: 'Standard Exit (5-7 years)',
          description: 'IPO or acquisition',
          timeline: '5-7 years',
          method: 'Full liquidity event',
          likelihood: 'Target path'
        },
        {
          title: 'Early Exit (1-3 years)',
          description: 'Secondary sale to new investors',
          timeline: '1-3 years (post Series A)',
          method: 'Partial or full sale of your shares',
          likelihood: 'Available if desired'
        },
        {
          title: 'No Series A Scenario',
          description: 'If profitable without raising Series A',
          timeline: '24 months (note maturity)',
          method: 'Company buyback at 2x-3x fair valuation OR conversion at ₹25-50 Cr valuation',
          likelihood: 'Backup option'
        }
      ],
      note: 'Break-even by M11 means we\'re not dependent on Series A. If we grow profitably, we can offer buyback or dividend options.'
    },
    useOfFunds: [
      { category: 'Product Development', percentage: 25, amount: '₹50L' },
      { category: 'Content & SEO', percentage: 25, amount: '₹50L' },
      { category: 'Marketing & Growth', percentage: 20, amount: '₹40L' },
      { category: 'Team Expansion', percentage: 15, amount: '₹30L' },
      { category: 'Infrastructure', percentage: 10, amount: '₹20L' },
      { category: 'Legal & Compliance', percentage: 5, amount: '₹10L' }
    ],
    milestones: [
      { month: 'M3', goal: '150K MAUs, Mobile apps live' },
      { month: 'M6', goal: '260K MAUs, ₹9L+ monthly revenue, 2+ B2B clients' },
      { month: 'M14', goal: 'Break-even/cash flow positive, Series A ready' }
    ]
  },

  // Slide 8: Closing
  {
    id: 8,
    type: 'closing',
    title: 'Let\'s Democratize Financial Intelligence Together',
    subtitle: 'Help 100M+ people make better financial decisions',
    icon: Mail,
    mission: 'Help 100M+ people make better financial decisions through AI-powered research',
    whyNow: [
      { icon: '📈', title: 'Retail Investment Boom', description: '50M new demat accounts in India (last 3 years), 25% CAGR' },
      { icon: '🤖', title: 'AI Breakthrough', description: 'GPT-4/Claude enable human-quality content at scale, 90% cost reduction' },
      { icon: '💰', title: 'Content-to-Commerce', description: 'Proven by CRED, Jupiter - Gen Z prefers education before investing' },
      { icon: '🏛️', title: 'Regulatory Support', description: 'SEBI pushing investor education, fintech-friendly policies' }
    ],
    ask: {
      amount: '₹2 Cr to build India\'s first AI-native financial platform',
      timeline: 'Break-even in 11 months, Series A ready in 18 months',
      opportunity: '$50B market at perfect inflection point'
    },
    contact: {
      name: 'Shubham',
      email: 'shubham@discvr.ai',
      phone: '9873961591',
      website: 'https://www.discvr.ai',
      linkedin: 'https://www.linkedin.com/in/shubhamsrivastava1/'
    }
  }
];
