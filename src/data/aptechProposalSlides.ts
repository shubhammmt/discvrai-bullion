import { Bot, AlertTriangle, Layers, LayoutGrid, RefreshCw, Target, Presentation, TrendingUp, MessageSquare, Phone } from 'lucide-react';

export interface AptechSlide {
  id: number;
  type: string;
  title: string;
  [key: string]: any;
}

export const aptechProposalSlides: AptechSlide[] = [
  {
    id: 1,
    type: 'aptech-cover',
    title: 'Digital Transformation Capabilities',
    headline: 'Digital Transformation Capabilities for Aptech',
    subheadline: 'Exploring How We Can Enable Your Growth',
    presenter: 'Shubham Srivastava',
    role: 'Founder & CEO, DiscvrAI',
    date: '04th Feb 2026',
    objective: 'Agentic AI pilots for sales enablement & SEO/AEO/GEO optimization'
  },
  {
    id: 2,
    type: 'aptech-challenges',
    title: 'Common Challenges We Address',
    subtitle: 'Let\'s explore what resonates with Aptech\'s situation',
    challenges: [
      {
        title: 'Lead Generation & Quality',
        description: 'Manual lead handling, low conversion rates',
        icon: 'target'
      },
      {
        title: 'Counsellor Efficiency',
        description: 'High workload on repetitive queries',
        icon: 'users'
      },
      {
        title: 'Digital Discoverability',
        description: 'Limited visibility in search + AI platforms',
        icon: 'search'
      },
      {
        title: 'Sales Enablement',
        description: 'Need to enable better selling through digital channels',
        icon: 'trending'
      }
    ]
  },
  {
    id: 3,
    type: 'aptech-capabilities',
    title: 'Our Core Capabilities',
    subtitle: 'What We Can Do',
    tagline: 'We can combine these or use individually based on your needs',
    capabilities: [
      {
        title: 'Agentic AI Solutions',
        icon: 'bot',
        features: [
          'AI agents for query handling & lead qualification',
          '24/7 automated responses',
          'Multi-channel: Website, WhatsApp, Phone',
          'Customizable for your specific needs'
        ]
      },
      {
        title: 'Content & SEO/AEO/GEO',
        icon: 'layers',
        features: [
          'SEO-optimized content generation',
          'Answer Engine Optimization (ChatGPT, Perplexity)',
          'Generative Engine Optimization (multi-platform)',
          'Every interaction becomes searchable content'
        ]
      },
      {
        title: 'Sales Enablement Platform',
        icon: 'trending',
        features: [
          'Intelligent lead routing & pre-qualification',
          'Counsellor productivity tools',
          'Analytics and insights dashboard',
          'Integration with existing systems'
        ]
      }
    ]
  },
  {
    id: 4,
    type: 'aptech-options',
    title: 'Solution Options',
    subtitle: 'What You Can Choose From',
    tagline: 'Select any combination, or explore custom solutions for your specific needs',
    options: [
      {
        label: 'A',
        title: 'Agentic AI Agents',
        description: 'Handle repetitive queries, 24/7 availability, pre-qualify leads',
        features: ['Course discovery assistant', 'Career guidance explainer', 'Center-level enquiry handler', 'Counsellor pre-qualification']
      },
      {
        label: 'B',
        title: 'Content & SEO/AEO/GEO Engine',
        description: 'Extended reach, better discoverability, organic traffic growth',
        features: ['SEO-optimized content creation', 'AI search optimization', 'Content from queries', 'Multi-platform discoverability']
      },
      {
        label: 'C',
        title: 'Integrated Solution',
        description: 'Complete digital transformation, compounding value',
        features: ['Agents + Content combined', 'The flywheel effect', 'Triple-layer optimization', 'Maximum ROI potential'],
        recommended: true
      },
      {
        label: 'D',
        title: 'Custom Solutions',
        description: 'Address specific challenges you identify',
        features: ['Tailored to your workflows', 'Specific use cases', 'Flexible scope', 'Your requirements first']
      }
    ]
  },
  {
    id: 5,
    type: 'aptech-flywheel',
    title: 'The Flywheel',
    subtitle: 'How Integrated Solution Works',
    tagline: 'Every interaction extends your reach',
    steps: [
      { step: 1, title: 'Student Asks', description: 'Question via website, WhatsApp, or phone' },
      { step: 2, title: 'AI Agent Responds', description: 'Instant, accurate, personalized answer' },
      { step: 3, title: 'Content Created', description: 'Query + Response = SEO-optimized article' },
      { step: 4, title: 'Content Indexed', description: 'Google, ChatGPT, Perplexity discover it' },
      { step: 5, title: 'More Discovery', description: 'New students find you through search' }
    ],
    outcome: 'Compounding discoverability and sales enablement'
  },
  {
    id: 6,
    type: 'aptech-triple-layer',
    title: 'Triple-Layer Optimization',
    subtitle: 'SEO + AEO + GEO',
    tagline: 'If you\'re only optimizing for Google, you\'re missing 40%+ of discovery',
    layers: [
      {
        acronym: 'SEO',
        name: 'Search Engine Optimization',
        description: 'Traditional Google rankings',
        details: ['Keyword-optimized content', 'Technical SEO foundation', 'Organic search traffic'],
        result: 'Discoverable on Google'
      },
      {
        acronym: 'AEO',
        name: 'Answer Engine Optimization',
        description: 'Optimized for AI assistants',
        details: ['ChatGPT, Perplexity, Claude', 'Structured data for AI', 'Conversational queries'],
        result: 'Discoverable via AI search'
      },
      {
        acronym: 'GEO',
        name: 'Generative Engine Optimization',
        description: 'AI-first content structure',
        details: ['Semantic understanding', 'Multi-platform reach', 'Future-proof discoverability'],
        result: 'Extended AI platform reach'
      }
    ]
  },
  {
    id: 7,
    type: 'aptech-demo',
    title: 'Capability Demo',
    subtitle: 'What We Can Show You',
    tagline: 'This shows what\'s possible. We customize based on your needs.',
    demos: [
      { title: 'Live AI Agent', description: 'Interactive query handling demonstration', icon: 'bot' },
      { title: 'Content Generation', description: 'Query → SEO-optimized content piece', icon: 'file' },
      { title: 'SEO/AEO/GEO Analytics', description: 'Discoverability across platforms', icon: 'chart' },
      { title: 'Dashboard Preview', description: 'Real-time analytics and insights', icon: 'dashboard' }
    ],
    outcomes: [
      { metric: '24/7', label: 'Query Handling', description: 'Automated responses' },
      { metric: 'Auto', label: 'Content Generation', description: 'From interactions' },
      { metric: '3x', label: 'Discoverability', description: 'Extended reach' },
      { metric: 'Pre-qualified', label: 'Lead Quality', description: 'Better prospects' }
    ]
  },
  {
    id: 8,
    type: 'aptech-impact',
    title: 'Business Impact',
    subtitle: 'Before vs After Transformation',
    comparison: [
      { area: 'Reach', current: 'Limited (paid/organic)', transformed: 'Extended (AI search platforms)' },
      { area: 'Query Handling', current: 'Manual, limited hours', transformed: '24/7, instant, automated' },
      { area: 'Content Volume', current: 'Manual, slow', transformed: 'Auto-generated from queries' },
      { area: 'Lead Quality', current: 'Mixed quality', transformed: 'Pre-qualified, informed' },
      { area: 'Counsellor Efficiency', current: 'High repetitive load', transformed: 'Focus on closing' },
      { area: 'Cost per Enrolment', current: 'High (paid ads)', transformed: 'Lower (organic + AI)' },
      { area: 'Discoverability', current: 'Google only', transformed: 'Google + ChatGPT + Perplexity' }
    ]
  },
  {
    id: 9,
    type: 'aptech-exploration',
    title: 'Let\'s Explore Your Needs',
    subtitle: 'We\'ve shown what we can do. Now let\'s explore what you need.',
    questions: [
      'What are your biggest challenges in lead generation and student discovery?',
      'What use cases do you see for AI agents in your operations?',
      'What content or SEO needs do you have?',
      'Are there specific workflows or processes you\'d like to improve?',
      'What would success look like for Aptech in 90 days?'
    ],
    approach: [
      { step: 'Discovery', description: 'Understand your specific use cases' },
      { step: 'Customization', description: 'Tailor solutions to your needs' },
      { step: 'Flexible', description: 'You choose what makes sense' },
      { step: 'Iterative', description: 'Start small, scale on results' }
    ]
  },
  {
    id: 10,
    type: 'aptech-next-steps',
    title: 'Next Steps',
    subtitle: 'No fixed structure. We adapt to what you need.',
    steps: [
      { step: 1, actor: 'We\'ll Send', action: 'Summary of capabilities discussed' },
      { step: 2, actor: 'You\'ll Share', action: 'Your use cases and priorities' },
      { step: 3, actor: 'We\'ll Propose', action: 'Customized solution options' },
      { step: 4, actor: 'Together', action: 'Define what makes sense to start' }
    ],
    cta: 'Let\'s spend the next 30 minutes exploring your use cases',
    contact: {
      name: 'Shubham Srivastava',
      role: 'Founder & CEO',
      email: 'shubham@discvr.ai',
      phone: '+91-9873961591'
    }
  }
];
