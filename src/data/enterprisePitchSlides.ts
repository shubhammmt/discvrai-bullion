import { 
  Building2, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Puzzle, 
  Network, 
  BarChart3, 
  Award, 
  Rocket,
  Brain,
  Globe,
  Zap,
  Shield,
  Layers,
  MessageSquare,
  FileText,
  LineChart,
  Gamepad2,
  Clock,
  Cpu,
  GitBranch,
  Lock,
  Grid3X3,
  Smartphone,
  Code
} from 'lucide-react';

export const enterprisePitchSlides = [
  {
    id: 1,
    type: 'enterprise-cover',
    title: 'DISCVR.AI',
    subtitle: 'Enterprise AI Solutions',
    tagline: 'Transform Your Business with AI-First Infrastructure',
    icon: Brain,
    keyStats: [
      { value: '10x', label: 'Faster Time-to-Market' },
      { value: '80%', label: 'Cost Reduction' },
      { value: '11', label: 'Languages Supported' }
    ]
  },
  {
    id: 2,
    type: 'company-intro',
    title: 'Who We Are',
    subtitle: 'AI-Powered Enterprise Solutions',
    icon: Building2,
    founder: {
      name: 'Shubham Srivastava',
      title: 'Founder & CEO',
      background: [
        'Ex-CTO, Hindustan Times Digital (scaled to 100M+ MAUs)',
        'Ex-CTO, Eureka Forbes (1M+ MAUs)',
        'Ex-MakeMyTrip Hotels (NoSQL pioneer, 1M QPS global systems)',
        'IIT(ISM) Dhanbad, 2nd-time founder',
        '20+ years building large-scale digital platforms'
      ]
    },
    company: {
      description: 'We build AI infrastructure that enterprises can deploy in days, not years.',
      credentials: [
        'Bootstrapped with significant founder investment',
        'Battle-tested at 100M+ user scale',
        'Full-stack AI/ML engineering team',
        'Content production at scale (500+ articles/day capability)'
      ]
    }
  },
  {
    id: 3,
    type: 'enterprise-problem',
    title: 'The Enterprise AI Challenge',
    subtitle: 'Why Digital Transformation Stalls',
    icon: Target,
    challenges: [
      {
        title: 'Time & Cost',
        problem: 'Building AI solutions in-house takes 18-24 months and $1.5-2M+',
        impact: 'Delayed market entry, competitive disadvantage'
      },
      {
        title: 'Talent Gap',
        problem: 'AI/ML talent is scarce and expensive to retain',
        impact: 'Key-person dependency, inconsistent execution'
      },
      {
        title: 'Integration Complexity',
        problem: 'Siloed AI tools don\'t work together or with legacy systems',
        impact: 'Fragmented customer experience, data silos'
      },
      {
        title: 'Scale & Reliability',
        problem: 'POCs succeed but production deployments fail',
        impact: 'Wasted investment, stakeholder skepticism'
      }
    ],
    bottomLine: 'Enterprises need proven, scalable AI infrastructure—not science experiments.'
  },
  {
    id: 4,
    type: 'solution-overview',
    title: 'The DISCVR Solution',
    subtitle: 'AI Infrastructure That Deploys in Days',
    icon: Zap,
    proposition: 'Pre-built, battle-tested AI engines that integrate with your existing systems and go live in days to weeks—not months or years.',
    pillars: [
      {
        title: 'AI Agents',
        description: 'Voice + Text conversational AI in 11 languages',
        icon: MessageSquare
      },
      {
        title: 'Content Engine',
        description: 'Automated content production at scale',
        icon: FileText
      },
      {
        title: 'Analytics & Insights',
        description: 'Rule-based scoring, behavioral analytics',
        icon: LineChart
      },
      {
        title: 'Engagement Platform',
        description: 'Gamification, contests, viral mechanics',
        icon: Gamepad2
      }
    ],
    differentiator: 'Not a toolkit. A complete AI infrastructure layer.'
  },
  {
    id: 5,
    type: 'ai-agents',
    title: 'AI Agents',
    subtitle: 'Intelligent Conversations at Scale',
    icon: MessageSquare,
    capabilities: [
      {
        feature: 'Multi-Modal Interaction',
        details: ['Voice-first AI agents', 'Text-based assistants', 'Seamless handoff between modes']
      },
      {
        feature: 'Multilingual Intelligence',
        details: ['11 Indian languages supported', 'Regional dialect understanding', 'Code-switching capability']
      },
      {
        feature: 'Domain Expertise',
        details: ['Pre-trained on industry verticals', 'Custom knowledge base integration', 'Real-time data access']
      },
      {
        feature: 'Enterprise-Grade',
        details: ['99.9% uptime SLA', 'PII handling & compliance', 'Audit trails & logging']
      }
    ],
    useCases: [
      'Customer Support Automation',
      'Sales & Lead Qualification',
      'Employee Helpdesk',
      'Product Discovery & Recommendations'
    ]
  },
  {
    id: 6,
    type: 'content-engine',
    title: 'Content Engine',
    subtitle: 'Scale Your Content 100x',
    icon: FileText,
    production: {
      text: {
        volume: '180-500 articles/day',
        types: ['News & updates', 'Product deep-dives', 'Educational content', 'SEO-optimized pages']
      },
      video: {
        volume: '50+ reels/shorts monthly',
        platforms: ['Instagram', 'YouTube', 'WhatsApp', 'LinkedIn']
      },
      vernacular: {
        languages: 11,
        capability: 'Full content localization, not just translation'
      }
    },
    distribution: [
      'Organic SEO engine',
      'AI search optimization (ChatGPT, Perplexity, Google AI)',
      'Social media automation',
      'Community engagement (Telegram, WhatsApp groups)'
    ],
    outcomes: [
      { metric: 'Multi-Million MAUs', timeline: '4-6 quarters' },
      { metric: 'Low-CAC Acquisition', description: 'Content-driven organic growth' },
      { metric: 'Brand Authority', description: 'Every article is a permanent asset' }
    ]
  },
  {
    id: 7,
    type: 'analytics-insights',
    title: 'Analytics & Insights',
    subtitle: 'Intelligence Layer for Decision-Making',
    icon: LineChart,
    capabilities: [
      {
        name: 'Rule-Based Scoring',
        description: 'Score entities (products, users, leads) on 15+ parameters',
        example: 'Rank 8,000+ mutual funds on risk-adjusted returns, expense ratios, manager tenure'
      },
      {
        name: 'Behavioral Analytics',
        description: 'Track user intent signals in real-time',
        example: 'Scroll depth, dwell time, calculator usage → personalized recommendations'
      },
      {
        name: 'Predictive Insights',
        description: 'ML-powered forecasting and recommendations',
        example: 'Churn prediction, next-best-action, portfolio optimization'
      },
      {
        name: 'Custom Dashboards',
        description: 'Real-time visibility into business metrics',
        example: 'Conversion funnels, cohort analysis, campaign performance'
      }
    ],
    integrations: ['Data warehouses', 'CRMs', 'Marketing platforms', 'Custom APIs']
  },
  {
    id: 8,
    type: 'engagement-platform',
    title: 'Engagement Platform',
    subtitle: 'Turn Users into Advocates',
    icon: Gamepad2,
    mechanics: [
      {
        type: 'Contests & Challenges',
        examples: ['Virtual portfolio competitions', 'Prediction challenges', 'Referral contests']
      },
      {
        type: 'Gamification',
        examples: ['Points & badges', 'Leaderboards', 'Achievement unlocks']
      },
      {
        type: 'Interactive Content',
        examples: ['Quizzes & polls', 'Calculators & simulators', 'Educational drip campaigns']
      }
    ],
    outcomes: [
      '3x daily active users during campaigns',
      '10K+ participants per contest',
      'Viral sharing mechanics',
      'First-party data collection'
    ],
    useCases: [
      'Product launches (NFOs, new features)',
      'Brand awareness campaigns',
      'Customer education',
      'Community building'
    ]
  },
  {
    id: 9,
    type: 'integration-paths',
    title: 'Deployment Options',
    subtitle: 'Flexible Integration, Rapid Deployment',
    icon: Puzzle,
    paths: [
      {
        type: 'Widget',
        description: 'Embed individual components on your site',
        examples: ['Calculators', 'AI chat widget', 'Content feeds'],
        timeline: 'Days',
        effort: 'Minimal'
      },
      {
        type: 'API',
        description: 'Backend integration with your platform',
        examples: ['Scoring APIs', 'Content APIs', 'Analytics webhooks'],
        timeline: '1-2 Weeks',
        effort: 'Medium'
      },
      {
        type: 'White-Label Platform',
        description: 'Complete branded solution',
        examples: ['Full D2C platform', 'Partner ecosystem', 'Admin dashboards'],
        timeline: '2-4 Weeks',
        effort: 'Turnkey'
      }
    ],
    guarantee: 'Dedicated team works exclusively on your implementation.'
  },
  {
    id: 10,
    type: 'case-study',
    title: 'Proven at Scale',
    subtitle: 'Real Results, Real Impact',
    icon: TrendingUp,
    highlights: [
      {
        metric: '100M+',
        description: 'Monthly Active Users',
        context: 'Scaled digital platforms at Hindustan Times'
      },
      {
        metric: '8,000+',
        description: 'Funds Scored & Ranked',
        context: 'Rule-based intelligence on 15+ parameters'
      },
      {
        metric: '500+',
        description: 'Articles/Day Capability',
        context: 'Automated content production engine'
      },
      {
        metric: '11',
        description: 'Languages Supported',
        context: 'Voice + text AI in regional languages'
      }
    ],
    industries: ['Financial Services', 'Media & Publishing', 'E-commerce', 'Healthcare']
  },
  {
    id: 11,
    type: 'roi-enterprise',
    title: 'The Business Case',
    subtitle: 'ROI That Speaks for Itself',
    icon: BarChart3,
    comparison: {
      buildInHouse: {
        cost: '$1.5-2M+',
        timeline: '18-24 months',
        team: '50+ engineers, designers, PMs',
        risk: 'High—talent churn, scope creep, technical debt'
      },
      withDiscvr: {
        cost: 'Fraction of in-house cost',
        timeline: 'Days to weeks',
        team: 'Zero hiring required',
        risk: 'Low—proven platform, dedicated support'
      }
    },
    savings: [
      'Save $1-1.5M in Year 1',
      'Go to market 12-18 months faster',
      'Zero hiring & retention overhead',
      'Continuous updates included'
    ],
    valueDrivers: [
      { driver: 'Speed', impact: 'First-mover advantage in your market' },
      { driver: 'Cost', impact: 'Redirect budget to growth, not infrastructure' },
      { driver: 'Focus', impact: 'Your team focuses on core business, not AI ops' }
    ]
  },
  {
    id: 12,
    type: 'why-us',
    title: 'Why DISCVR',
    subtitle: 'Our Competitive Edge',
    icon: Lightbulb,
    differentiators: [
      {
        category: 'Experience',
        points: [
          '20+ years building large-scale digital platforms',
          'Scaled to 100M+ MAUs at Hindustan Times Digital',
          'Built 1M QPS systems at MakeMyTrip'
        ]
      },
      {
        category: 'Technology',
        points: [
          'Production-ready AI, not POC-ware',
          'Multi-language AI agents (voice + text)',
          'Real-time analytics & personalization'
        ]
      },
      {
        category: 'Execution',
        points: [
          'Days-to-weeks deployment, not years',
          'Dedicated team per client',
          'Continuous feature releases'
        ]
      }
    ],
    vsAlternatives: [
      { alternative: 'Big Consulting', edge: 'We build, not just advise. 10x faster, 5x cheaper.' },
      { alternative: 'AI Startups', edge: 'Battle-tested at 100M+ scale, not experimental.' },
      { alternative: 'In-House', edge: 'No hiring risk, immediate deployment.' }
    ]
  },
  {
    id: 13,
    type: 'enterprise-cta',
    title: 'Let\'s Build Together',
    subtitle: 'Your AI Journey Starts Here',
    icon: Rocket,
    options: [
      {
        title: 'Discovery Workshop',
        description: 'Free 2-hour session to map your AI requirements and identify quick wins',
        timeline: 'This week',
        icon: Target
      },
      {
        title: 'Pilot Program',
        description: 'Limited-scope deployment to prove value with minimal risk',
        timeline: '2-4 weeks',
        icon: Zap
      },
      {
        title: 'Full Implementation',
        description: 'End-to-end AI infrastructure deployment with dedicated team',
        timeline: 'Custom roadmap',
        icon: Layers
      }
    ],
    contact: {
      name: 'Shubham Srivastava',
      title: 'Founder & CEO',
      email: 'shubham@discvr.ai',
      phone: '+91 98739 61591',
      linkedin: 'https://www.linkedin.com/in/shubhamsrivastava1/'
    },
    closingMessage: 'We don\'t just sell AI. We become your AI infrastructure partner.'
  },
  // Technical Deep Dive Slides
  {
    id: 14,
    type: 'platform-architecture',
    title: 'Platform Architecture',
    subtitle: 'Runtime-Capsule Architecture for Enterprise Scale',
    icon: Cpu,
    readinessScore: 75,
    capsules: ['LAMF Vertical', 'E-commerce', 'Healthcare', 'Media & Publishing'],
    differentiators: [
      'Reasoning engine decoupled from business logic',
      'Modular capsule pattern for rapid vertical expansion',
      'Config-driven agent provisioning via API',
      'Seamless knowledge base integration per capsule'
    ],
    bottomNote: 'The engine is built. New verticals plug in—not rebuild from scratch.'
  },
  {
    id: 15,
    type: 'technical-pillars',
    title: 'Technical Capability Audit',
    subtitle: 'Enterprise-Grade Infrastructure Status',
    icon: GitBranch,
    pillars: [
      {
        name: 'Orchestration',
        subtitle: 'LangGraph Framework',
        icon: Network,
        gradient: 'bg-gradient-to-r from-purple-600 to-indigo-600',
        features: [
          { name: 'LangGraph Core', status: 'ready', detail: 'Custom state-graph loop with agent, tools, classifier nodes' },
          { name: 'State Persistence', status: 'ready', detail: 'MongoDB integration, resumes context effortlessly' },
          { name: 'Conditional Flows', status: 'ready', detail: 'Handles infinite tool-loops until resolution' },
          { name: 'Structural Classifier', status: 'ready', detail: 'Intent classification beyond text patterns' },
          { name: 'Guardrail Node', status: 'ready', detail: 'Safety/Policy node intercepts responses' }
        ]
      },
      {
        name: 'Agent Anatomy',
        subtitle: 'Modular Architecture',
        icon: Layers,
        gradient: 'bg-gradient-to-r from-cyan-600 to-blue-600',
        features: [
          { name: 'Modular Capsules', status: 'ready', detail: 'Separates verticals cleanly' },
          { name: 'LLM Factory', status: 'ready', detail: 'Swappable: OpenAI, Bedrock, Nova' },
          { name: 'Tool Registry', status: 'ready', detail: 'Centralized ToolPool for cross-agent reuse' },
          { name: 'API Provisioning', status: 'ready', detail: 'Live-inject new agents via /provision endpoint' },
          { name: 'RAG/Knowledge Base', status: 'ready', detail: 'Per-capsule markdown loader' }
        ]
      },
      {
        name: 'Security & Compliance',
        subtitle: 'Enterprise-Grade',
        icon: Shield,
        gradient: 'bg-gradient-to-r from-emerald-600 to-teal-600',
        features: [
          { name: 'Session Isolation', status: 'ready', detail: 'X-Session-ID ensures per-user isolation' },
          { name: 'Execution Logging', status: 'ready', detail: 'CloudWatch-ready with tool-call traces' },
          { name: 'Multi-Tenancy', status: 'ready', detail: 'Tenant Fence context is first-class' },
          { name: 'PII Redaction', status: 'ready', detail: 'Enabled per client requirements' },
          { name: 'Data Isolation', status: 'partial', detail: 'Tenant-filtered DB access available' }
        ]
      }
    ]
  },
  {
    id: 16,
    type: 'use-case-matrix',
    title: 'Text & Voice Use Cases',
    subtitle: 'Multi-Modal AI Deployment Options',
    icon: Grid3X3,
    voiceCapabilities: [
      '11 Languages',
      'Regional Dialects',
      'Real-time STT/TTS',
      'Emotion Detection',
      'Call Recording',
      'Live Handoff',
      'IVR Integration',
      'Outbound Campaigns'
    ],
    textCapabilities: [
      'Web Chat Widget',
      'WhatsApp Bot',
      'Telegram Integration',
      'SMS Automation',
      'Email Assistant',
      'In-App Chat',
      'Slack/Teams Bot',
      'API-First Design'
    ],
    deploymentOptions: [
      {
        type: 'Widget Embed',
        icon: Code,
        gradient: 'bg-gradient-to-br from-purple-500 to-indigo-600',
        description: 'Drop-in components for your existing site',
        timeline: '2-3 Days',
        features: ['Chat Widget', 'Voice Button', 'Calculator Tools', 'Content Feed']
      },
      {
        type: 'API Integration',
        icon: GitBranch,
        gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
        description: 'Backend integration with your platform',
        timeline: '1-2 Weeks',
        features: ['REST APIs', 'Webhooks', 'SDKs', 'Custom Flows']
      },
      {
        type: 'Full Platform',
        icon: Smartphone,
        gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
        description: 'Complete white-label solution',
        timeline: '2-4 Weeks',
        features: ['Admin Dashboard', 'Analytics', 'User Management', 'Custom Branding']
      }
    ]
  }
];
