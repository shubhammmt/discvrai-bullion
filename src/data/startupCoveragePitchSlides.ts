import { 
  Users, 
  Target, 
  TrendingUp, 
  Zap, 
  Star, 
  Package,
  Mail,
  Building
} from 'lucide-react';

export const startupCoveragePitchSlides = [
  {
    type: 'title',
    title: 'Partner with Discvr.ai',
    subtitle: 'Reach India\'s Next Generation of Investors',
    tagline: 'Sponsored Coverage • Startup Spotlight • Contests • Events',
    author: 'Discvr.ai',
    icon: Building
  },
  {
    type: 'about',
    title: 'About Discvr.ai',
    subtitle: 'India\'s Only Finance-First Engagement Platform',
    icon: Zap,
    description: 'AI-powered mutual fund & stock research, gamified contests, and byte-sized financial news.',
    positioning: 'We blend research, news, and gamification to create an engaged community of finance-savvy users.',
    features: [
      'AI-Powered Research Engine',
      'Gamified Investment Contests',
      'Byte-sized Financial News',
      'Community-driven Platform'
    ]
  },
  {
    type: 'audience',
    title: 'Our Audience',
    subtitle: 'Finance-Savvy & Highly Engaged',
    icon: Users,
    profile: 'Retail investors, fintech enthusiasts, young professionals, and wealth builders actively seeking new financial products and insights.',
    stats: [
      { metric: 'Contest Players', value: '1,000+', growth: 'Growing rapidly' },
      { metric: 'Platform Users', value: '100K+', growth: 'Expanding daily' },
      { metric: 'Engagement Rate', value: '85%+', growth: 'Highly active' },
      { metric: 'Monthly Growth', value: '25%+', growth: 'Consistent' }
    ]
  },
  {
    type: 'value',
    title: 'Why Choose Visibility with Us?',
    subtitle: 'Your Target Audience is Already Here',
    icon: Target,
    description: 'Connect with finance-savvy, engaged users who are actively looking for new products and investment opportunities.',
    benefits: [
      {
        title: 'Brand Visibility',
        description: 'Get in front of engaged retail investors and fintech enthusiasts',
        icon: '👁️'
      },
      {
        title: 'Trust Building',
        description: 'Leverage our credible platform to build user confidence',
        icon: '🤝'
      },
      {
        title: 'Retail Adoption',
        description: 'Drive product adoption among our active user base',
        icon: '📈'
      },
      {
        title: 'User Acquisition',
        description: 'Convert our engaged audience into your customers',
        icon: '🎯'
      }
    ]
  },
  {
    type: 'offerings',
    title: 'Our Partnership Offerings',
    subtitle: 'Comprehensive Coverage Solutions',
    icon: Package,
    offerings: [
      {
        category: 'Startup Coverage',
        items: ['Byte-sized news features', 'Startup Spotlight articles', 'Founder Interviews', 'Product launches']
      },
      {
        category: 'Thought Leadership',
        items: ['Expert columns', 'Co-created content', 'Industry insights', 'Market analysis']
      },
      {
        category: 'Contests & Gamification',
        items: ['Stock prediction contests', 'Mutual fund challenges', 'Branded leaderboards', 'Prize sponsorships']
      },
      {
        category: 'Event Coverage',
        items: ['IPO coverage', 'NFO launches', 'Fintech events', 'Full brand integration']
      }
    ]
  },
  {
    type: 'pricing',
    title: 'Partnership Packages',
    subtitle: 'Flexible Plans for Every Budget',
    icon: Star,
    packages: [
      {
        tier: 'Bronze',
        price: '₹50,000',
        duration: 'per campaign',
        features: [
          'Byte-sized sponsored news feature',
          'Social media promotion',
          'Basic analytics report',
          'One-week visibility'
        ],
        highlight: false
      },
      {
        tier: 'Silver',
        price: '₹1,00,000',
        duration: 'per campaign',
        features: [
          'Startup Spotlight feature',
          'Founder Interview (Instagram/YouTube)',
          'Contest integration',
          'Two-week visibility',
          'Detailed analytics'
        ],
        highlight: true
      },
      {
        tier: 'Gold',
        price: '₹2,00,000+',
        duration: 'per campaign',
        features: [
          'Sponsored contest/IPO package',
          'Full brand integration',
          'Multi-platform coverage',
          'Custom content creation',
          'Premium analytics & insights'
        ],
        highlight: false
      }
    ]
  },
  {
    type: 'cta',
    title: 'Let\'s Grow Together',
    subtitle: 'Ready to Partner with India\'s Finance Community?',
    icon: Mail,
    description: 'Join leading fintech companies who trust Discvr.ai to reach engaged retail investors.',
    contact: {
      email: 'shubham@discvr.ai',
      phone: '+91 98739 61591',
      linkedin: 'https://www.linkedin.com/company/discvrai/'
    },
    cta: 'Book Your Sponsored Coverage Slot Today'
  }
];