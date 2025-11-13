import { Users, TrendingUp, Target, Zap, BarChart3, CheckCircle2 } from 'lucide-react';

export const partnerDistributionSlides = [
  {
    id: 1,
    type: 'platform-overview',
    title: 'Distribute Your Financial Products to 1M+ Engaged Users',
    subtitle: 'Content-led discovery meets high-intent distribution',
    icon: Users,
    metrics: [
      {
        value: '1M+',
        label: 'Monthly Active Users',
        subtext: 'Growing 40% MoM'
      },
      {
        value: '3+ min',
        label: 'Avg. Session Duration',
        subtext: 'High engagement & intent'
      },
      {
        value: '500+',
        label: 'Daily Content Pieces',
        subtext: 'Building trust at scale'
      },
      {
        value: '10%',
        label: 'Content → Commerce',
        subtext: 'Conversion rate'
      }
    ],
    audienceProfile: {
      title: 'Your Target Audience',
      segments: [
        {
          segment: 'Young Professionals (23-35 yrs)',
          size: '40%',
          traits: ['UPI-native', 'Digital-first', 'Micro-savers']
        },
        {
          segment: 'Established Investors (30-50 yrs)',
          size: '35%',
          traits: ['₹10L+ portfolio', 'SIP-focused', 'Seeking liquidity']
        },
        {
          segment: 'Value Seekers (25-40 yrs)',
          size: '25%',
          traits: ['Inflation hedge', 'Alternative assets', 'Festival gifting']
        }
      ]
    },
    ecosystem: {
      title: 'Content-to-Commerce Ecosystem',
      points: [
        'Daily financial news, insights & market updates',
        'AI-powered research on 14K+ stocks & mutual funds',
        'Interactive tools: calculators, portfolio analyzer, screeners',
        'Quizzes, polls & engagement features driving daily habits',
        'Personalized recommendations based on user behavior'
      ]
    },
    bottomLine: "We've built the trust layer. Now distribute your products to users who are already seeking them."
  },
  {
    id: 2,
    type: 'distribution-value',
    title: 'Why Partners Choose Our Platform',
    subtitle: 'Performance-driven distribution with zero wastage',
    icon: TrendingUp,
    currentProducts: {
      title: 'Products We Currently Distribute',
      categories: [
        {
          name: 'Personal Loans',
          market: 'Sub-₹25K instant loans',
          audience: '1M users seeking quick credit'
        },
        {
          name: 'Digital Gold',
          market: 'Micro-savings & gifting',
          audience: '3M UPI-native young savers'
        },
        {
          name: 'Digital Silver',
          market: 'Affordable inflation hedge',
          audience: '1M value-conscious investors'
        }
      ]
    },
    partnerBenefits: {
      title: 'What You Get',
      benefits: [
        {
          benefit: 'High-Intent User Base',
          description: 'Users discover products through trusted content, not ads',
          icon: Target
        },
        {
          benefit: 'Superior Conversion Rates',
          description: '10% content-to-commerce conversion vs. 1-2% industry average',
          icon: TrendingUp
        },
        {
          benefit: 'Plug-and-Play Integration',
          description: 'Seamless API integration, white-label widgets, co-branded journeys',
          icon: Zap
        },
        {
          benefit: 'Real-Time Analytics',
          description: 'Track impressions, clicks, conversions, and user demographics',
          icon: BarChart3
        },
        {
          benefit: 'Performance-Based Model',
          description: 'Pay only for conversions, not impressions or clicks',
          icon: CheckCircle2
        },
        {
          benefit: 'Co-Marketing Opportunities',
          description: 'Feature your products in content, quizzes, newsletters & social',
          icon: Users
        }
      ]
    },
    howItWorks: {
      title: 'Distribution in Action',
      steps: [
        'User discovers content (article, tool, quiz) relevant to their financial goal',
        'AI personalizes product recommendations based on behavior & profile',
        'User explores your product through embedded widget or dedicated page',
        'Seamless onboarding & conversion with your branding',
        'You track performance, we optimize distribution'
      ]
    },
    cta: {
      title: 'Ready to Scale Your Distribution?',
      subtitle: "Let's build a partnership that grows your business while serving 1M+ users.",
      contact: {
        name: 'Shubham Srivastava',
        role: 'Founder & CEO',
        email: 'shubham@discvr.ai',
        phone: '+91 98739 61591',
        linkedin: 'https://www.linkedin.com/in/shubhamsrivastava1/'
      }
    }
  }
];
