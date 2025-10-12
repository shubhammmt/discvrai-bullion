import { TrendingUp, Target, Rocket, Users, DollarSign, Trophy, CheckCircle, Mail } from 'lucide-react';

export const familyFriendsPitchSlides = [
  // Slide 1: Cover
  {
    id: 1,
    type: 'title',
    title: 'Discvr.Fin',
    subtitle: 'AI-Powered Financial Intelligence for Everyone',
    tagline: 'Making Professional Research Accessible to 200M+ Retail Investors',
    author: 'Family & Friends Round | October 2025',
    icon: TrendingUp
  },

  // Slide 2: Problem + Opportunity
  {
    id: 2,
    type: 'problem-opportunity',
    title: 'The Financial Literacy Gap is Massive',
    subtitle: '$50B+ Market Opportunity',
    icon: Target,
    problem: {
      investors: {
        title: 'Retail Investors',
        stats: [
          '150M+ demat accounts in India',
          '58M+ brokerage accounts in US',
          '95% lack access to quality research',
          'Information overload: 1000+ articles daily'
        ]
      },
      currentSolutions: {
        title: 'Current Solutions',
        stats: [
          'Professional research: $500-5000/month',
          'Only available to institutions',
          'Generic, not personalized',
          'Difficult to find actionable insights'
        ]
      }
    },
    opportunity: {
      marketSize: '$50B+ global market',
      growth: '25% CAGR in retail participation',
      enabler: 'AI makes professional research affordable',
      model: 'Content-first engagement model'
    }
  },

  // Slide 3: Solution
  {
    id: 3,
    type: 'solution-pillars',
    title: 'AI-Native Financial Intelligence Platform',
    subtitle: 'Four Integrated Revenue Streams',
    icon: Rocket,
    pillars: [
      {
        icon: '📰',
        title: 'Daily Financial News',
        description: 'Bite-sized updates from 100+ sources',
        features: ['AI-summarized and personalized', 'Web, app, WhatsApp delivery', 'Creates daily habit'],
        impact: 'Engagement'
      },
      {
        icon: '🔬',
        title: 'AI Research Tools',
        description: 'Professional-grade analysis',
        features: ['Stock analysis & screening', 'Mutual fund comparison', 'IPO & crypto insights'],
        impact: 'Value'
      },
      {
        icon: '🎮',
        title: 'Gamification',
        description: 'Investment contests & predictions',
        features: ['Weekly competitions', 'Leaderboards & rewards', 'Community engagement'],
        impact: 'Retention'
      },
      {
        icon: '🏢',
        title: 'B2B SaaS',
        description: 'White-label platforms',
        features: ['For AMCs, brokers, fintechs', '₹50K-500K per client/month', 'High-margin revenue'],
        impact: 'Quality'
      }
    ]
  },

  // Slide 4: Business Model + Market
  {
    id: 4,
    type: 'business-market',
    title: 'Multiple Revenue Streams = Lower Risk',
    subtitle: '₹318M ARR by Month 18',
    icon: DollarSign,
    revenueStreams: [
      { name: 'Advertising', percentage: 69, amount: '₹18.2M/mo', description: 'Display ads, CPM ₹160-900' },
      { name: 'Subscriptions', percentage: 19, amount: '₹5.1M/mo', description: 'Freemium: ₹99-999/mo' },
      { name: 'Lead Generation', percentage: 6, amount: '₹1.7M/mo', description: 'Affiliate commissions' },
      { name: 'B2B SaaS', percentage: 6, amount: '₹1.5M/mo', description: 'White-label tools' }
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
    subtitle: 'Break-even in 11 Months | 81% Profit Margin',
    icon: Trophy,
    traction: {
      product: ['News platform live with AI', 'Stock research tool (beta)', 'MF comparison (beta)', 'Contest platform in dev'],
      metrics: ['50K Monthly Active Users', '30% user retention (D7/D30)', '2 min avg session time', '2 B2B pilots in progress']
    },
    financials: {
      projections: [
        { month: 'M1', maus: '100K', revenue: '₹100K', profit: '-₹1.2M' },
        { month: 'M6', maus: '209K', revenue: '₹1.3M', profit: '-₹584K' },
        { month: 'M12', maus: '798K', revenue: '₹6.3M', profit: '+₹3.1M' },
        { month: 'M18', maus: '2.86M', revenue: '₹26.5M', profit: '+₹21.5M' }
      ],
      highlights: [
        'Break-even: Month 11',
        'Profit Margin (M18): 81%',
        'LTV:CAC Ratio: 95:1',
        'Gross Margin: 85%+'
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
        { role: 'Product Manager', count: '1' }
      ],
      total: '12 people',
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
    subtitle: 'Raising ₹150-200 Lakhs for Family & Friends Round',
    icon: CheckCircle,
    investment: {
      amount: '₹150-200 Lakhs',
      security: 'CCPS / SAFE / Equity',
      minimum: '₹10 Lakhs',
      close: 'December 2025'
    },
    benefits: [
      'Equity stake in high-growth AI-fintech',
      'Quarterly board updates',
      'Pro-rata rights in future rounds',
      'Preferred returns on exit',
      'Ground floor in democratizing finance'
    ],
    returns: [
      { scenario: 'Conservative', valuation: '₹500M', investment: '₹10L', returns: '₹25L', multiple: '2.5x' },
      { scenario: 'Base', valuation: '₹2B', investment: '₹10L', returns: '₹100L', multiple: '10x' },
      { scenario: 'Stretch', valuation: '₹5B+', investment: '₹10L', returns: '₹250L+', multiple: '25x+' }
    ],
    useOfFunds: [
      { category: 'Product Development', percentage: 25, amount: '₹30L' },
      { category: 'Content & SEO', percentage: 25, amount: '₹30L' },
      { category: 'Marketing & Growth', percentage: 20, amount: '₹24L' },
      { category: 'Team Expansion', percentage: 15, amount: '₹18L' },
      { category: 'Infrastructure', percentage: 10, amount: '₹12L' },
      { category: 'Legal & Compliance', percentage: 5, amount: '₹6L' }
    ],
    milestones: [
      { month: 'M3', goal: '150K MAUs, Mobile apps live, Contest launched' },
      { month: 'M6', goal: '250K MAUs, ₹1M+ monthly revenue, 5-8 B2B clients' },
      { month: 'M11', goal: '800K MAUs, Break-even/cash flow positive, Series A ready' }
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
      amount: '₹100-120L to build India\'s first AI-native financial platform',
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
