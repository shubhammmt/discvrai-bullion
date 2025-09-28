import { 
  Gamepad2, 
  Target, 
  TrendingUp, 
  Zap, 
  Star, 
  Trophy,
  Mail,
  Building,
  Users,
  Gift
} from 'lucide-react';

export const contestSponsorshipPitchSlides = [
  {
    type: 'title',
    title: 'Gamified Finance Contests',
    subtitle: 'Powered by Discvr.ai',
    tagline: 'Engage. Acquire. Retain.',
    author: 'Discvr.ai',
    icon: Gamepad2
  },
  {
    type: 'about',
    title: 'About Discvr.ai',
    subtitle: 'India\'s Leading Finance Engagement Platform',
    icon: Zap,
    description: 'AI-powered research platform combining contests, stock analysis, and byte-sized finance news to create an engaged community of investors.',
    positioning: 'We\'ve built India\'s most active finance community with 100K+ MAUs and growing fast.',
    features: [
      'AI-Powered Research Engine',
      'Gamified Investment Contests',
      'Active Community of 100K+ Users',
      'Byte-sized Financial News & Insights'
    ]
  },
  {
    type: 'opportunity',
    title: 'The Opportunity',
    subtitle: 'Retail Investors Want Active Engagement',
    icon: Target,
    description: 'Traditional financial marketing relies on passive content consumption. Today\'s retail investors want to learn by doing.',
    insights: [
      {
        title: 'Active Learning',
        description: 'Retail investors prefer hands-on experience over theoretical knowledge',
        icon: '🎯'
      },
      {
        title: 'Safe Gamification',
        description: 'Contests provide risk-free environment to test investment strategies',
        icon: '🛡️'
      },
      {
        title: 'Community Driven',
        description: 'Users seek peer validation and competitive engagement',
        icon: '👥'
      },
      {
        title: 'Perfect Acquisition Channel',
        description: 'Engaged contest participants convert 3x better than passive users',
        icon: '📈'
      }
    ]
  },
  {
    type: 'contest-formats',
    title: 'Contest Formats',
    subtitle: 'Diverse Engagement Options',
    icon: Trophy,
    formats: [
      {
        category: 'Stock Prediction Contests',
        description: 'Users predict stock price movements over specific timeframes',
        features: ['Daily/Weekly/Monthly contests', 'Sector-specific challenges', 'Real-time leaderboards', 'Educational insights']
      },
      {
        category: 'Portfolio Building',
        description: 'Create and manage virtual portfolios with real market data',
        features: ['Mutual fund allocation contests', 'Risk-adjusted returns scoring', 'Diversification challenges', 'Long-term tracking']
      },
      {
        category: 'Themed Challenges',
        description: 'Special contests around market events and trends',
        features: ['IPO prediction contests', 'Budget impact analysis', 'Sector rotation challenges', 'ESG investment contests']
      },
      {
        category: 'Social Features',
        description: 'Community-driven engagement and recognition',
        features: ['Public leaderboards', 'Achievement badges', 'Sharing mechanisms', 'Expert commentary']
      }
    ]
  },
  {
    type: 'value',
    title: 'Sponsorship Benefits',
    subtitle: 'Drive Engagement, Acquisition & Brand Recognition',
    icon: Gift,
    description: 'Transform passive prospects into active, engaged customers through gamified experiences that build trust and drive conversions.',
    benefits: [
      {
        title: 'Brand Visibility',
        description: 'Logo placement on contest pages, leaderboards, and social media promotion',
        icon: '👁️'
      },
      {
        title: 'Lead Generation',
        description: 'Direct access to contest participants with verified contact information',
        icon: '🎯'
      },
      {
        title: 'Thought Leadership',
        description: 'Co-branded insights, tips, and educational content within contests',
        icon: '🧠'
      },
      {
        title: 'User Acquisition',
        description: 'Convert engaged contest participants into your platform users',
        icon: '📈'
      }
    ]
  },
  {
    type: 'pricing',
    title: 'Partnership Packages',
    subtitle: 'Flexible Solutions for Every Budget',
    icon: Star,
    packages: [
      {
        tier: 'Basic',
        price: '₹50,000 - ₹1,00,000',
        duration: 'per contest',
        features: [
          'Single branded contest',
          'Logo on contest page',
          'Basic participant data',
          'Social media promotion',
          'Performance analytics'
        ],
        highlight: false
      },
      {
        tier: 'Premium',
        price: '₹2,00,000 - ₹5,00,000',
        duration: 'per campaign',
        features: [
          'Exclusive branded contest series',
          'Lead sharing with contact details',
          'Co-branded educational content',
          'Custom contest themes',
          'Detailed user insights'
        ],
        highlight: true
      },
      {
        tier: 'Annual Retainer',
        price: '₹8,00,000 - ₹15,00,000',
        duration: 'per year',
        features: [
          'Recurring monthly contests',
          'Full co-branding rights',
          'Advanced data analytics',
          'Priority placement',
          'Custom integrations'
        ],
        highlight: false
      }
    ]
  },
  {
    type: 'cta',
    title: 'Partner with India\'s Most Engaging Finance Contests',
    subtitle: 'Ready to Transform Your User Acquisition?',
    icon: Mail,
    description: 'Join leading financial brands who trust Discvr.ai to deliver engaged, qualified prospects through gamified experiences.',
    contact: {
      email: 'shubham@discvr.ai',
      phone: '+91 98739 61591',
      linkedin: 'https://www.linkedin.com/company/discvrai/'
    },
    cta: 'Start Your Contest Campaign Today'
  }
];