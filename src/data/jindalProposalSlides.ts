export interface JindalSlide {
  id: number;
  type: 'cover' | 'toc' | 'executive' | 'problem' | 'solution' | 'impact' | 'platform' | 'timeline' | 'ip-commercial' | 'next-steps' | 'architecture' | 'appendix';
  title: string;
  subtitle?: string;
  content?: any;
}

export const jindalProposalSlides: JindalSlide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Jindal Stainless Steel',
    subtitle: 'Virtual Employees Platform',
    content: {
      tagline: 'Executive Summary & Implementation Plan',
      version: 'Document Version: 2.0',
      date: 'January 2026',
      preparedFor: 'Jindal Stainless Steel',
      preparedBy: 'DiscvrAI'
    }
  },
  {
    id: 2,
    type: 'toc',
    title: 'Contents',
    content: {
      sections: [
        { number: '01', title: 'Executive Summary', pages: '2 Pages' },
        { number: '02', title: 'Solution Architecture', pages: '' },
        { number: '03', title: 'Implementation Plan', pages: '' },
        { number: '04', title: 'Commercial Structure', pages: '' },
        { number: '05', title: 'Next Steps', pages: '' },
        { number: '06', title: 'Technical Specifications', pages: 'Appendix' }
      ]
    }
  },
  {
    id: 3,
    type: 'problem',
    title: 'The Problem',
    subtitle: '5 Critical Operational Bottlenecks Requiring Intelligent AI Agents',
    content: {
      useCases: [
        { 
          name: 'Sales', 
          pain: 'Manual dealer follow-ups, missed leads', 
          capability: 'Always-on dealer engagement, lead qualification' 
        },
        { 
          name: 'HR', 
          pain: 'Time-consuming CV screening, inconsistent evaluation', 
          capability: 'Automated CV parsing, voice interviews' 
        },
        { 
          name: 'Finance', 
          pain: 'Manual invoice validation, payment leakage', 
          capability: 'SAP-integrated invoice matching, validation logic' 
        },
        { 
          name: 'Dakshita', 
          pain: 'Manual assessments, scalability limits', 
          capability: 'Avatar-based multilingual assessments' 
        },
        { 
          name: 'Collaboration', 
          pain: 'Lost context in WhatsApp groups', 
          capability: 'Conversation summarization, action tracking' 
        }
      ],
      challenge: 'These require agents that can reason, integrate with SAP/HRIS, and handle Jindal-specific business rules.'
    }
  },
  {
    id: 4,
    type: 'solution',
    title: 'The Solution',
    subtitle: 'Platform + Customization',
    content: {
      building: [
        { label: 'Agentic AI Platform', desc: 'Reusable infrastructure (orchestration, integrations, governance)' },
        { label: '5 Customized Agents', desc: 'Tailored to Jindal\'s business rules, SAP configuration, workflows' },
        { label: 'Capability Transfer', desc: 'Jindal teams learn to manage and extend the platform' }
      ],
      whyThis: [
        { icon: 'Zap', text: 'Platform enables speed: 6 weeks for first agents vs. 3-4 months without' },
        { icon: 'Settings', text: 'Customization ensures fit: Agents understand Jindal\'s SAP, pricing, workflows' },
        { icon: 'Shield', text: 'Jindal owns: Platform deployment and all agent logic/configurations' },
        { icon: 'TrendingUp', text: 'Self-sufficiency: Future expansion without proportional cost increase' }
      ]
    }
  },
  {
    id: 5,
    type: 'impact',
    title: 'Expected Impact',
    content: {
      impacts: [
        { useCase: 'Sales', impact: '+20% lead conversion, 40% reduction in manual follow-ups', timeline: 'Month 3' },
        { useCase: 'HR', impact: '50% faster hiring, 80% CVs pre-screened', timeline: 'Month 6' },
        { useCase: 'Finance', impact: '30% leakage reduction, 50% faster processing', timeline: 'Month 6' },
        { useCase: 'Dakshita', impact: '60% reduction in admin time, scalable deployment', timeline: 'Month 9' },
        { useCase: 'Collaboration', impact: '90% action items extracted, zero missed follow-ups', timeline: 'Month 3' }
      ],
      summary: '30-50% reduction in manual work, significant cost optimization'
    }
  },
  {
    id: 6,
    type: 'platform',
    title: 'Platform vs. Customization',
    subtitle: 'Critical Understanding',
    content: {
      platform: {
        title: 'Platform Provides',
        subtitle: 'Reusable Infrastructure',
        items: [
          'Agent orchestration engine',
          'Multi-modal interfaces (voice, chat, avatar)',
          'Integration connectors (SAP, HRIS, WhatsApp)',
          'Knowledge base framework (RAG, parsing)',
          'Governance tools (monitoring, guardrails)'
        ]
      },
      customization: {
        title: 'Customization Required',
        subtitle: 'Jindal-Specific',
        items: [
          'Business logic (invoice rules, pricing)',
          'Workflow definitions (approvals, escalation)',
          'Integration mappings (SAP tables, APIs)',
          'Knowledge content (policies, catalogs)',
          'Guardrails (discount limits, thresholds)'
        ]
      },
      analogy: 'Platform = construction framework. Customization = interior design for Jindal\'s needs.'
    }
  },
  {
    id: 7,
    type: 'timeline',
    title: 'Implementation Timeline',
    content: {
      phases: [
        { 
          phase: 'Phase 1', 
          name: 'Foundation', 
          timeline: 'Months 1-3', 
          deliverables: 'Platform core + Sales Agent + Collaboration Agent',
          criteria: '2 agents operational, >80% query resolution'
        },
        { 
          phase: 'Phase 2', 
          name: 'Deep Integrations', 
          timeline: 'Months 4-6', 
          deliverables: 'SAP/HRIS connectors + Finance Agent + HR Agent',
          criteria: '95% invoice parsing, 50% faster processing'
        },
        { 
          phase: 'Phase 3', 
          name: 'Advanced', 
          timeline: 'Months 7-9', 
          deliverables: 'Avatar + multilingual + Dakshita Agent',
          criteria: 'All 5 use cases operational'
        },
        { 
          phase: 'Phase 4', 
          name: 'Maturity', 
          timeline: 'Months 10-12', 
          deliverables: 'Self-service UI + documentation + training',
          criteria: 'Jindal self-sufficient'
        }
      ],
      milestones: [
        { week: 'Week 6', text: 'First agents (Sales, Collaboration) operational' },
        { week: 'Month 3', text: 'Platform validated, architecture proven' },
        { week: 'Month 6', text: 'High-value agents delivering cost savings' },
        { week: 'Month 12', text: 'Platform mature, Jindal self-sufficient' }
      ]
    }
  },
  {
    id: 8,
    type: 'ip-commercial',
    title: 'IP Ownership & Commercial Model',
    content: {
      ownership: [
        { owner: 'Jindal Owns', items: 'All agent logic, workflows, configurations, and business rules' },
        { owner: 'DiscvrAI Owns', items: 'Platform infrastructure code (reusable across clients)' },
        { owner: 'Shared', items: 'Platform deployment in Jindal\'s environment (Jindal controls data)' }
      ],
      commercial: {
        phase1: {
          title: 'Phase 1 (Months 1-12)',
          type: 'Time & Materials (T&M)',
          items: ['Platform development and 5 agent implementations', 'Capability transfer and training']
        },
        phase2: {
          title: 'Phase 2 (Month 13+)',
          type: 'AMC + T&M',
          items: ['AMC: Platform maintenance, updates, bug fixes, support', 'T&M: New agent development, complex customizations']
        }
      },
      benefits: 'Predictable annual costs, Jindal teams manage most agents independently'
    }
  },
  {
    id: 9,
    type: 'architecture',
    title: 'Solution Architecture',
    subtitle: 'Platform Components',
    content: {
      layers: [
        { name: 'AgentOps & Governance', desc: 'Monitoring, Audit Trails' },
        { name: 'Agent Orchestration Engine', desc: 'Planner, Router, Context Manager' },
        { name: 'Core Services', components: [
          { name: 'Integration Hub', items: ['SAP', 'HRIS', 'WhatsApp'] },
          { name: 'Multi-Modal Interface', items: ['Voice', 'Chat', 'Avatar'] },
          { name: 'Knowledge Engine', items: ['RAG', 'Document Parsing'] }
        ]},
        { name: 'Infrastructure', desc: 'Multi-Tenant, Security, Scalability' }
      ]
    }
  },
  {
    id: 10,
    type: 'next-steps',
    title: 'Next Steps',
    subtitle: 'Next 2 Weeks',
    content: {
      steps: [
        {
          title: 'Stakeholder Alignment Meeting',
          items: ['Validate use case priorities and objectives', 'Answer critical questions (SAP, infrastructure, security)']
        },
        {
          title: 'Technical Discovery',
          items: ['SAP integration assessment', 'System identification (HRIS/ATS, CRM)', 'Infrastructure requirements']
        },
        {
          title: 'Commercial Discussion',
          items: ['Finalize T&M rates and AMC structure', 'Agree on success metrics and KPIs', 'Define governance approach']
        }
      ],
      criteria: [
        'Business objectives validated and prioritized',
        'Critical questions answered (SAP, infrastructure, security)',
        'Commercial structure agreed upon',
        'Executive sponsorship confirmed',
        'Integration access confirmed'
      ]
    }
  }
];
