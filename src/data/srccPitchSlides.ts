import { GraduationCap, Trophy, Users, TrendingUp, Brain, Star } from 'lucide-react';

export const srccPitchSlides = [
  {
    id: 1,
    type: 'title',
    title: 'SRCC × DISCVR.AI',
    subtitle: 'Elite Finance Excellence Program',
    author: 'Making SRCC India\'s AI-Finance Capital',
    icon: GraduationCap,
    tagline: 'First-Mover Advantage for India\'s #1 Commerce College'
  },
  {
    id: 2,
    type: 'srcc-value-proposition',
    title: 'The SRCC Advantage Package',
    subtitle: 'Day-1 Benefits Worth ₹5,00,000+ Per Student',
    icon: Trophy,
    valueProps: {
      immediate: [
        {
          title: '₹2,00,000 Prize Pool',
          description: 'SRCC Stock Prediction Championship + Weekly contests',
          value: '₹50K main prize + ₹5-10K weekly prizes',
          timeline: 'Launch Week 1'
        },
        {
          title: 'Professional-Grade Tools',
          description: 'AI equity research tools used by Goldman Sachs analysts',
          value: '₹5,000+ per student value',
          timeline: 'Immediate Access'
        },
        {
          title: 'Exclusive SRCC Features',
          description: 'Custom branding, priority support, faculty dashboard',
          value: '₹2,000+ per student value',
          timeline: 'Day 1 Setup'
        }
      ],
      strategic: [
        {
          benefit: 'Placement Advantage',
          description: 'AI+Finance skills that set SRCC students apart from all other colleges',
          impact: 'Unfair advantage in Goldman Sachs, JP Morgan, McKinsey interviews'
        },
        {
          benefit: 'Industry Recognition',
          description: 'SRCC becomes India\'s first AI-powered finance education leader',
          impact: 'Media coverage, industry partnerships, thought leadership'
        },
        {
          benefit: 'Alumni Network',
          description: 'Connect current students with successful SRCC alumni in finance',
          impact: 'Mentorship, internships, career acceleration'
        }
      ]
    },
    stats: {
      targetUsers: '500+ SRCC students',
      expectedAdoption: '80% within 30 days',
      costPerStudent: '₹400/semester (price of 1 textbook)',
      totalValue: '₹25,00,000+ in benefits and tools'
    }
  },
  {
    id: 3,
    type: 'srcc-implementation',
    title: 'Launch Strategy: SRCC First-Mover',
    subtitle: '30-Day Path to AI-Finance Leadership',
    icon: TrendingUp,
    timeline: {
      week1: {
        title: 'Instant Impact',
        actions: [
          'Mass student onboarding with exclusive SRCC access codes',
          'Faculty training on AI-powered finance tools',
          'Launch ₹25,000 Stock Prediction Championship',
          'Industry press announcement of SRCC innovation'
        ],
        goal: '300+ students registered'
      },
      week2: {
        title: 'Viral Adoption', 
        actions: [
          'Peer-to-peer referral campaigns',
          'Study group formation around platform projects',
          'Social media buzz with #SRCCFinanceAI',
          'Success stories from early adopters'
        ],
        goal: '80% student participation'
      },
      week3: {
        title: 'Deep Integration',
        actions: [
          'Assignment integration with finance courses',
          'Industry guest lectures via platform',
          'Placement preparation workshops',
          'Alumni mentorship program launch'
        ],
        goal: 'Faculty curriculum adoption'
      },
      week4: {
        title: 'Market Leadership',
        actions: [
          'Results showcase and media coverage',
          'Other colleges inquiring about partnership',
          'Industry recognition of SRCC innovation',
          'Foundation for long-term partnership'
        ],
        goal: 'Thought leadership established'
      }
    },
    engagement: {
      daily: ['Market briefings for SRCC students', 'Leaderboard updates', 'Peer collaboration'],
      weekly: ['Industry expert sessions', 'Career workshops', 'Contest announcements'],
      ongoing: ['Alumni mentorship', 'Recruiter interactions', 'Skill certifications']
    },
    success: {
      guarantee: 'If we don\'t achieve 80% student adoption within 30 days, pilot continues free until we do',
      metrics: ['Student engagement', 'Faculty satisfaction', 'Industry recognition', 'Placement outcomes']
    }
  }
];