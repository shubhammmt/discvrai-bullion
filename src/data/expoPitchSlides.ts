import { 
  Brain, 
  Target, 
  Zap, 
  Layers, 
  Users, 
  BarChart3, 
  Briefcase, 
  Shield, 
  Clock, 
  TrendingUp,
  Building2,
  Cog,
  Heart,
  Phone,
  Mail,
  Linkedin,
  Globe,
  CheckCircle2,
  XCircle,
  Factory,
  Stethoscope,
  FileText,
  MessageSquare,
  Wallet,
  UserCheck,
  LineChart,
  PieChart,
  Network,
  Lock,
  Server,
  ArrowRight
} from 'lucide-react';

export interface ExpoSlide {
  id: number;
  type: string;
  section: 'core' | 'amc' | 'manufacturing' | 'healthcare' | 'closing';
  title: string;
  subtitle?: string;
  tagline?: string;
  icon?: any;
  content?: any;
  timing?: number; // seconds for auto-advance
}

export const expoPitchSlides: ExpoSlide[] = [
  // ==================== CORE SLIDES (1-10) ====================
  {
    id: 1,
    type: 'cover',
    section: 'core',
    title: 'DISCVR.AI',
    subtitle: 'AI Agents That Actually Work',
    tagline: 'Enterprise AI Infrastructure for Production Deployments',
    icon: Brain,
    timing: 20,
    content: {
      presenter: {
        name: 'Shubham Srivastava',
        title: 'Founder & CEO'
      },
      contact: {
        email: 'shubham@discvr.ai',
        website: 'discvr.ai'
      }
    }
  },
  {
    id: 2,
    type: 'problem',
    section: 'core',
    title: 'The Enterprise Challenge',
    icon: Target,
    timing: 18,
    content: {
      headline: 'Operational Bottlenecks Cost Enterprises Millions',
      stats: [
        { value: '30-50%', label: 'Employee time on repetitive tasks' },
        { value: '70%', label: 'Struggle with operational efficiency' },
        { value: '18-24mo', label: 'To build AI solutions in-house' }
      ],
      painPoints: [
        { icon: Clock, label: 'Manual Work' },
        { icon: Layers, label: 'System Silos' },
        { icon: Users, label: "Can't Scale" },
        { icon: Shield, label: 'Compliance Burden' }
      ]
    }
  },
  {
    id: 3,
    type: 'solution',
    section: 'core',
    title: 'Our Solution',
    icon: Zap,
    timing: 18,
    content: {
      headline: 'AI Agents That Automate Complex Workflows',
      keyMessage: "We're not building chatbots — we're building intelligent agents that understand your business and execute workflows.",
      pillars: [
        { icon: Brain, label: 'Intelligent Automation', desc: 'Agents that reason, plan & execute' },
        { icon: Network, label: 'System Integration', desc: 'SAP, HRIS, CRM, Payment Gateways' },
        { icon: MessageSquare, label: 'Multi-Modal', desc: 'Voice, Chat, Avatar interfaces' },
        { icon: TrendingUp, label: 'Business Outcomes', desc: 'Measurable ROI' }
      ]
    }
  },
  {
    id: 4,
    type: 'platform',
    section: 'core',
    title: 'Agentic AI Studio',
    subtitle: 'Build Production-Ready Agents in Weeks',
    icon: Layers,
    timing: 18,
    content: {
      metrics: [
        { value: '6 wks', label: 'Development Time', comparison: 'vs 3-4 months' },
        { value: '99.9%', label: 'Platform Uptime' },
        { value: '99.9%', label: 'Integration Success' }
      ],
      components: [
        { icon: Cog, label: 'Orchestration Engine' },
        { icon: Network, label: 'Integration Hub' },
        { icon: MessageSquare, label: 'Multi-Modal Interface' },
        { icon: Shield, label: 'Governance Tools' }
      ]
    }
  },
  {
    id: 5,
    type: 'engagement-models',
    section: 'core',
    title: 'How We Engage',
    icon: Briefcase,
    timing: 20,
    content: {
      models: [
        { 
          title: 'Vertical SaaS', 
          timeline: '4-6 weeks', 
          desc: 'Ready-made solutions, compliance built-in',
          icon: Zap
        },
        { 
          title: 'Platform + Customize', 
          timeline: '6-12 weeks', 
          desc: 'Your business logic, our infrastructure',
          icon: Layers
        },
        { 
          title: 'Custom Solutions', 
          timeline: '12-24 weeks', 
          desc: 'End-to-end execution, deep integrations',
          icon: Cog
        }
      ]
    }
  },
  {
    id: 6,
    type: 'results',
    section: 'core',
    title: 'Proven Results',
    subtitle: 'Measurable Business Outcomes',
    icon: BarChart3,
    timing: 20,
    content: {
      columns: [
        {
          title: 'Financial Services',
          icon: Building2,
          metrics: [
            { value: '15%+', label: 'Conversion Rate' },
            { value: '40-50%', label: 'CAC Reduction' },
            { value: '₹10-50Cr', label: 'AUM in 6 months' }
          ]
        },
        {
          title: 'Manufacturing',
          icon: Factory,
          metrics: [
            { value: '30%', label: 'Leakage Reduction' },
            { value: '50%', label: 'Faster Processing' },
            { value: '50%', label: 'Faster Hiring' }
          ]
        }
      ]
    }
  },
  {
    id: 7,
    type: 'use-cases',
    section: 'core',
    title: 'AI Agents for Every Workflow',
    icon: Briefcase,
    timing: 20,
    content: {
      quadrants: [
        { 
          icon: Wallet, 
          title: 'Finance & Ops', 
          outcome: '30% leakage reduction',
          examples: ['Invoice validation', 'Payment processing']
        },
        { 
          icon: UserCheck, 
          title: 'HR & Talent', 
          outcome: '50% faster hiring',
          examples: ['CV screening', 'Voice interviews']
        },
        { 
          icon: TrendingUp, 
          title: 'Sales & Distribution', 
          outcome: '20% lead conversion',
          examples: ['Dealer engagement', 'Lead qualification']
        },
        { 
          icon: MessageSquare, 
          title: 'Customer Service', 
          outcome: '60%+ support deflection',
          examples: ['Onboarding', '24/7 availability']
        }
      ]
    }
  },
  {
    id: 8,
    type: 'technology',
    section: 'core',
    title: 'Enterprise-Grade Technology',
    icon: Server,
    timing: 18,
    content: {
      stacks: [
        { 
          title: 'AI & ML', 
          items: ['GPT-4 Turbo', 'Claude', 'RAG/Vector DBs']
        },
        { 
          title: 'Infrastructure', 
          items: ['AWS/Azure/GCP', 'LangGraph', 'PostgreSQL']
        },
        { 
          title: 'Integrations', 
          items: ['SAP', 'HRIS/CRM', 'WhatsApp/Voice']
        },
        { 
          title: 'Compliance', 
          items: ['Audit Trails', 'Encryption', 'Data Residency']
        }
      ],
      keyMessage: 'Enterprise-ready from day one: security, compliance, scalability.'
    }
  },
  {
    id: 9,
    type: 'competitive',
    section: 'core',
    title: 'Why DiscvrAI?',
    icon: CheckCircle2,
    timing: 18,
    content: {
      comparisons: [
        { 
          vs: 'Generic AI Platforms',
          advantages: ['Enterprise infrastructure', 'Domain expertise', 'System integrations']
        },
        { 
          vs: 'Marketing Automation',
          advantages: ['Domain-specific AI', 'Transaction execution', 'Business metrics']
        },
        { 
          vs: 'Custom Development',
          advantages: ['6 weeks vs 3-4 months', 'Reusable infrastructure', 'Self-service config']
        }
      ],
      tagline: 'Platform + Solutions + Domain Expertise = Faster Time-to-Value'
    }
  },
  {
    id: 10,
    type: 'traction',
    section: 'core',
    title: 'Proven in Production',
    icon: TrendingUp,
    timing: 20,
    content: {
      deployments: [
        { name: 'AMC SaaS', detail: 'Multiple AMCs live' },
        { name: 'Enterprise Manufacturing Client', detail: '5 agents operational' },
        { name: 'AMC Distribution Analytics Platform', detail: 'Live deployment' }
      ],
      metrics: [
        { value: '99.9%', label: 'Uptime' },
        { value: '6 wks', label: 'Agent Dev Time' },
        { value: '30-50%', label: 'Efficiency Gains' }
      ],
      keyMessage: 'Not a pilot — production deployments with measurable outcomes.'
    }
  },

  // ==================== AMC SLIDES (11-15) ====================
  {
    id: 11,
    type: 'amc-value',
    section: 'amc',
    title: 'Complete MF Distribution Platform',
    subtitle: 'For Asset Management Companies',
    icon: Building2,
    timing: 20,
    content: {
      capabilities: [
        { icon: Users, label: 'Investor Acquisition', metric: '15%+ conversion' },
        { icon: FileText, label: 'Transaction Execution', metric: 'End-to-end KYC → Investment' },
        { icon: LineChart, label: 'Distribution Analytics', metric: '20-30% cost savings' },
        { icon: Shield, label: 'Regulatory Compliance', metric: 'SEBI, DPDP built-in' }
      ],
      keyMessage: 'Not a chatbot — complete distribution platform with measurable AUM growth.'
    }
  },
  {
    id: 12,
    type: 'amc-analytics',
    section: 'amc',
    title: 'AI-Enabled Distribution Analytics',
    subtitle: 'Reduce Expenses, Grow AUM',
    icon: PieChart,
    timing: 20,
    content: {
      features: [
        { title: 'Distributor Intelligence', desc: 'Top distributors by scheme, commission analysis' },
        { title: 'Cost Optimization', desc: 'Benchmarking, leakage detection, ROI analysis' },
        { title: 'AUM Growth', desc: 'Identify high-value distributors, forecast growth' },
        { title: 'Automated Reporting', desc: 'Excel, PDF, PowerPoint exports' }
      ],
      outcome: 'Reduce distribution expenses by 20-30% through data-driven insights.'
    }
  },
  {
    id: 13,
    type: 'amc-comparison',
    section: 'amc',
    title: 'Domain-Specific AI',
    subtitle: 'vs Generic Marketing Automation',
    icon: CheckCircle2,
    timing: 18,
    content: {
      comparison: [
        { feature: 'Financial Advisory', them: false, us: true },
        { feature: 'MF Recommendations', them: false, us: true },
        { feature: 'Transaction Execution', them: false, us: true },
        { feature: 'Distribution Analytics', them: false, us: true },
        { feature: 'Regulatory Compliance', them: false, us: true },
        { feature: 'AUM, Conversions, ROI', them: false, us: true }
      ],
      keyMessage: 'Built for mutual fund distribution, not generic marketing automation.'
    }
  },
  {
    id: 14,
    type: 'amc-dashboards',
    section: 'amc',
    title: 'Track What Matters',
    subtitle: 'AUM, Conversions, Distribution Efficiency',
    icon: BarChart3,
    timing: 18,
    content: {
      dashboards: [
        { role: 'CEO', focus: 'AUM growth, investor acquisition, distribution performance' },
        { role: 'CFO', focus: 'ROI, CAC, cost savings, commission optimization' },
        { role: 'Product', focus: 'Conversion funnel, attribution, distributor performance' },
        { role: 'Compliance', focus: 'Suitability, disclosures, regulatory reports' }
      ],
      keyMessage: 'Dashboards aligned to stakeholder roles — track outcomes, not just engagement.'
    }
  },
  {
    id: 15,
    type: 'amc-metrics',
    section: 'amc',
    title: 'AMC Success Metrics',
    icon: TrendingUp,
    timing: 20,
    content: {
      metrics: [
        { value: '15%+', label: 'Conversion Rate', sublabel: 'Visitor → Investor' },
        { value: '40-50%', label: 'CAC Reduction', sublabel: 'vs traditional channels' },
        { value: '₹10-50Cr', label: 'AUM Growth', sublabel: 'First 6 months' },
        { value: '60%+', label: 'Support Deflection', sublabel: 'Without human' },
        { value: '20-30%', label: 'Distribution Savings', sublabel: 'Through analytics' }
      ],
      keyMessage: 'Measurable business outcomes from day one.'
    }
  },

  // ==================== MANUFACTURING SLIDES (16-20) ====================
  {
    id: 16,
    type: 'mfg-value',
    section: 'manufacturing',
    title: 'AI Agents for Manufacturing',
    subtitle: 'Operations at Scale',
    icon: Factory,
    timing: 20,
    content: {
      capabilities: [
        { icon: Wallet, label: 'Finance & Operations', desc: 'Invoice validation, SAP integration' },
        { icon: UserCheck, label: 'HR & Talent', desc: 'CV screening, voice interviews' },
        { icon: TrendingUp, label: 'Sales & Distribution', desc: 'Dealer engagement, lead qualification' },
        { icon: MessageSquare, label: 'Collaboration', desc: 'WhatsApp group management' },
        { icon: Users, label: 'Skilling', desc: 'Avatar-based multilingual assessments' }
      ],
      keyMessage: 'AI agents automate critical manufacturing workflows.'
    }
  },
  {
    id: 17,
    type: 'mfg-case-study',
    section: 'manufacturing',
    title: 'Enterprise Client Case Study',
    subtitle: '5 AI Agents in Production',
    icon: Factory,
    timing: 25,
    content: {
      agents: [
        { name: 'Finance Agent', outcome: '30% leakage reduction, 50% faster processing' },
        { name: 'HR Agent', outcome: '50% faster hiring, 80% CVs pre-screened' },
        { name: 'Sales Agent', outcome: '20% lead conversion, 40% less manual follow-ups' },
        { name: 'Collaboration Agent', outcome: '90% action items extracted' },
        { name: 'Skilling Agent', outcome: '60% admin time reduction' }
      ],
      keyMessage: '5 agents operational, delivering 30-50% efficiency gains.'
    }
  },
  {
    id: 18,
    type: 'mfg-integration',
    section: 'manufacturing',
    title: 'Deep Enterprise Integration',
    subtitle: 'SAP, HRIS, CRM',
    icon: Network,
    timing: 18,
    content: {
      integrations: [
        { system: 'SAP', capabilities: ['Read/write operations', 'Invoice validation', 'Payment processing'] },
        { system: 'HRIS/ATS', capabilities: ['CV parsing', 'Candidate management', 'Interview scheduling'] },
        { system: 'CRM', capabilities: ['Dealer management', 'Lead tracking', 'Sales pipeline'] },
        { system: 'Communication', capabilities: ['WhatsApp Business', 'Voice STT/TTS', 'Email/SMS'] }
      ],
      keyMessage: 'Seamless integration with your existing systems — no rip-and-replace.'
    }
  },
  {
    id: 19,
    type: 'mfg-timeline',
    section: 'manufacturing',
    title: 'Discovery to Production',
    subtitle: '12 Weeks',
    icon: Clock,
    timing: 18,
    content: {
      phases: [
        { weeks: '1-2', phase: 'Discovery', detail: 'SAP integration, workflow analysis' },
        { weeks: '3-4', phase: 'POC', detail: 'First agent — Sales or Collaboration' },
        { weeks: '5-8', phase: 'Pilot', detail: 'Finance, HR agents' },
        { weeks: '9-10', phase: 'Testing', detail: 'SAP integration, multilingual support' },
        { weeks: '11-12', phase: 'Production', detail: 'All 5 agents operational' }
      ],
      keyMessage: 'Fast time-to-value — first agents in 6 weeks.'
    }
  },
  {
    id: 20,
    type: 'mfg-metrics',
    section: 'manufacturing',
    title: 'Manufacturing Results',
    subtitle: '30-50% Operational Efficiency',
    icon: TrendingUp,
    timing: 20,
    content: {
      metrics: [
        { area: 'Finance', result: '30% leakage reduction, 50% faster invoice processing' },
        { area: 'HR', result: '50% faster hiring, 80% CVs pre-screened' },
        { area: 'Sales', result: '20% lead conversion, 40% reduction in manual follow-ups' },
        { area: 'Collaboration', result: '90% action items extracted, zero missed follow-ups' },
        { area: 'Skilling', result: '60% reduction in admin time, scalable deployment' }
      ],
      keyMessage: 'Proven in production with enterprise manufacturing clients.'
    }
  },

  // ==================== HEALTHCARE SLIDES (21-25) ====================
  {
    id: 21,
    type: 'healthcare-value',
    section: 'healthcare',
    title: 'AI Agents for Healthcare',
    subtitle: 'Operations at Scale',
    icon: Stethoscope,
    timing: 20,
    content: {
      capabilities: [
        { icon: Users, label: 'Patient Engagement', desc: 'Onboarding, scheduling, follow-up' },
        { icon: Heart, label: 'Clinical Support', desc: 'Record analysis, recommendations' },
        { icon: FileText, label: 'Administration', desc: 'Insurance, claims, billing' },
        { icon: UserCheck, label: 'Staff Management', desc: 'Scheduling, allocation, training' },
        { icon: Shield, label: 'Compliance', desc: 'HIPAA, NABH, audit trails' }
      ],
      keyMessage: 'AI agents automate healthcare workflows — patient care to compliance.'
    }
  },
  {
    id: 22,
    type: 'healthcare-use-cases',
    section: 'healthcare',
    title: 'Healthcare Use Cases',
    icon: Heart,
    timing: 25,
    content: {
      agents: [
        { name: 'Patient Engagement', outcome: '40% reduction in no-shows, 30% faster onboarding' },
        { name: 'Clinical Support', outcome: '50% faster record review, improved accuracy' },
        { name: 'Administrative', outcome: '60% faster claims, 25% fewer billing errors' },
        { name: 'Staff Management', outcome: '30% fewer scheduling conflicts' },
        { name: 'Compliance', outcome: '100% compliance coverage, 70% faster audit prep' }
      ],
      keyMessage: 'AI agents for every healthcare workflow.'
    }
  },
  {
    id: 23,
    type: 'healthcare-integration',
    section: 'healthcare',
    title: 'Healthcare System Integration',
    icon: Network,
    timing: 18,
    content: {
      systems: [
        { type: 'EHR/EMR', examples: ['Epic', 'Cerner', 'Practo', 'eClinicalWorks'] },
        { type: 'HMS', examples: ['Hospital Management', 'Billing', 'Appointments'] },
        { type: 'Insurance', examples: ['TPA Integration', 'Claims', 'Verification'] },
        { type: 'Communication', examples: ['WhatsApp', 'SMS', 'Voice', 'Email'] }
      ],
      capabilities: ['HL7/FHIR integration', 'HIPAA/NABH compliance', 'Secure data handling'],
      keyMessage: 'Integrate with your existing systems — secure, compliant, seamless.'
    }
  },
  {
    id: 24,
    type: 'healthcare-timeline',
    section: 'healthcare',
    title: 'Discovery to Production',
    subtitle: '12-16 Weeks',
    icon: Clock,
    timing: 18,
    content: {
      phases: [
        { weeks: '1-2', phase: 'Discovery', detail: 'EHR integration, compliance requirements' },
        { weeks: '3-4', phase: 'POC', detail: 'Patient Engagement or Admin Agent' },
        { weeks: '5-10', phase: 'Pilot', detail: 'Clinical Support, Staff Management' },
        { weeks: '11-14', phase: 'Testing', detail: 'EHR integration, compliance validation' },
        { weeks: '15-16', phase: 'Production', detail: 'All agents operational, certified' }
      ],
      keyMessage: 'Compliance-first approach — secure, validated, production-ready.'
    }
  },
  {
    id: 25,
    type: 'healthcare-metrics',
    section: 'healthcare',
    title: 'Healthcare Results',
    subtitle: 'Better Patient Care + Operational Efficiency',
    icon: TrendingUp,
    timing: 20,
    content: {
      metrics: [
        { area: 'Patient Engagement', result: '40% reduction in no-shows, 30% faster onboarding' },
        { area: 'Clinical Support', result: '50% faster record review, improved treatment accuracy' },
        { area: 'Administrative', result: '60% faster claims processing, 25% reduction in billing errors' },
        { area: 'Staff Management', result: '30% reduction in scheduling conflicts' },
        { area: 'Compliance', result: '100% compliance coverage, 70% reduction in audit prep time' }
      ],
      keyMessage: 'Measurable outcomes — better patient care + operational efficiency.'
    }
  },

  // ==================== CLOSING SLIDES (26-30) ====================
  {
    id: 26,
    type: 'why-now',
    section: 'closing',
    title: 'Why Now?',
    subtitle: 'The Perfect Storm for Enterprise AI',
    icon: Zap,
    timing: 18,
    content: {
      drivers: [
        { icon: Brain, title: 'AI Maturity', desc: 'LLMs are production-ready' },
        { icon: Shield, title: 'Enterprise Ready', desc: 'Security, compliance, governance' },
        { icon: TrendingUp, title: 'Business Pressure', desc: 'Efficiency, cost reduction, transformation' },
        { icon: Clock, title: 'Market Timing', desc: 'Early movers gain advantage' }
      ],
      keyMessage: 'The time is now — AI agents are ready for enterprise deployment.'
    }
  },
  {
    id: 27,
    type: 'next-steps',
    section: 'closing',
    title: 'Start Your AI Journey',
    icon: ArrowRight,
    timing: 20,
    content: {
      steps: [
        { step: 1, title: 'Discovery Session', desc: 'Understand your use case', timeline: 'This week' },
        { step: 2, title: 'Proof of Concept', desc: 'Validate with minimal risk', timeline: '4-6 weeks' },
        { step: 3, title: 'Pilot Deployment', desc: 'Measurable outcomes', timeline: '8-12 weeks' },
        { step: 4, title: 'Scale to Production', desc: 'Full deployment', timeline: 'Custom' }
      ],
      keyMessage: 'Fast time-to-value with low risk — start focused.'
    }
  },
  {
    id: 28,
    type: 'contact',
    section: 'closing',
    title: "Let's Connect",
    icon: Phone,
    timing: 25,
    content: {
      contact: {
        name: 'Shubham Srivastava',
        title: 'Founder & CEO',
        email: 'shubham@discvr.ai',
        phone: '9873961591',
        linkedin: 'linkedin.com/company/discvrai',
        website: 'discvr.ai'
      },
      keyMessage: "Let's explore how AI agents can solve your operational challenges."
    }
  },
  {
    id: 29,
    type: 'thank-you',
    section: 'closing',
    title: 'Thank You',
    subtitle: 'AI Agents That Actually Work',
    icon: Brain,
    timing: 15,
    content: {
      contact: {
        email: 'shubham@discvr.ai',
        website: 'discvr.ai'
      }
    }
  },
  {
    id: 30,
    type: 'industries',
    section: 'closing',
    title: 'Serving Multiple Industries',
    icon: Globe,
    timing: 20,
    content: {
      industries: [
        { icon: Building2, name: 'Financial Services', highlight: 'AMC SaaS, Distribution Analytics' },
        { icon: Factory, name: 'Manufacturing', highlight: 'Finance, HR, Sales, Collaboration' },
        { icon: Stethoscope, name: 'Healthcare', highlight: 'Patient Engagement, Clinical Support' },
        { icon: Briefcase, name: 'And More', highlight: 'Custom solutions for any industry' }
      ],
      keyMessage: 'Proven across industries — platform enables rapid deployment.'
    }
  }
];
