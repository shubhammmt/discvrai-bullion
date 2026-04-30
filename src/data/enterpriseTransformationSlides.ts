// Enterprise Transformation Pitch Deck Data
// Day-0 Digitalization First. AI Enablement Second.

export interface EnterpriseTransformationSlide {
  id: number;
  type: string;
  title: string;
  subtitle?: string;
  content?: any;
}

export const enterpriseTransformationSlides: EnterpriseTransformationSlide[] = [
  // Slide 1: Title Slide
  {
    id: 1,
    type: 'title',
    title: 'Large-Scale Business-Led Enterprise Transformation',
    subtitle: 'Digital & AI-Enabled',
    content: {
      headline: 'Day-0 Digitalization First. AI Enablement Second.',
      tagline: 'Turning Systems of Record into Systems of Action',
      subTagline: 'Transformation That Scales Without Scaling Headcount',
      bottomNote: "We don't sell software. We architect your next evolution."
    }
  },

  // Slide 2: Founder's Lens
  {
    id: 2,
    type: 'founder',
    title: "I've Sat in Your Chair",
    subtitle: "I Know Why Transformation Fails",
    content: {
      credentials: [
        { value: '20', label: 'Years Technology Leadership' },
        { value: '10', label: 'Years as CXO of Listed Companies' }
      ],
      experience: [
        'Deep understanding of capital allocation & P&L pressure',
        'Managed tension between innovation and operational stability',
        'Led digital transformation at enterprise scale'
      ],
      promise: 'Not a vendor relationship — Strategic partnership built on shared experience',
      founder: {
        name: 'Shubham Srivastava',
        title: 'Founder & CEO',
        email: 'shubham@discvr.ai',
        phone: '+91-9873961591'
      }
    }
  },

  // Slide 3: What is Large-Scale Transformation
  {
    id: 3,
    type: 'definition',
    title: 'What Is Large-Scale Transformation?',
    subtitle: 'Function-Wide, Not Task-Level',
    content: {
      scale: [
        { value: '10,000+', label: 'Field Force' },
        { value: '20M+', label: 'Customers' },
        { value: '₹2,000+ Cr', label: 'Revenue' }
      ],
      transformations: [
        {
          title: 'Field Force Enablement',
          description: '10,000+ field force with end-to-end D2C automation',
          impact: 'Zero manual paperwork, 100% digital customer journey'
        },
        {
          title: 'Product Authentication',
          description: 'QR-based verification, eliminate gray market',
          impact: '100% product authentication, complete channel visibility'
        },
        {
          title: 'Customer Data Consolidation',
          description: '20M+ customer records unified into single source',
          impact: 'Single customer view, data-driven decisions'
        },
        {
          title: 'Supply Chain Visibility',
          description: 'Shipment → Warehouse → Distributor → End Customer',
          impact: 'Zero blind spots, predictive inventory'
        }
      ],
      keyMessage: 'Not tasks. Functions. Not pilots. Enterprise-wide.'
    }
  },

  // Slide 4: Day-0 Digitalization (The Solution)
  {
    id: 4,
    type: 'solution',
    title: 'Day-0 Digitalization First',
    subtitle: 'AI Enablement Second (The Non-Negotiable Sequence)',
    content: {
      principle: 'AI cannot enable what isn\'t digital',
      tier1: {
        title: 'Tier 1: Digital Bedrock',
        subtitle: 'The Foundation — Must Come First',
        capabilities: [
          {
            name: 'Data Consolidation & MDM',
            scale: '20M+ Customer Scale',
            impact: 'Single customer view, unified analytics'
          },
          {
            name: 'End-to-End Integration',
            scale: '10+ Systems Connected',
            impact: 'Zero data silos, scalable foundation'
          },
          {
            name: 'Field Force Enablement',
            scale: '10,000+ Users',
            impact: 'Zero manual processes, instant fulfillment'
          },
          {
            name: 'Supply Chain Platform',
            scale: 'Multi-Tier Tracking',
            impact: 'Zero blind spots, optimized distribution'
          }
        ]
      },
      tier2: {
        title: 'Tier 2: Intelligence Layer',
        subtitle: 'AI-Enabled Action — Only After Day-0',
        pods: ['Finance Pod', 'HR Pod', 'RM/Sales Pod', 'Compliance Pod']
      }
    }
  },

  // Slide 5: Consulting Phase
  {
    id: 5,
    type: 'consulting',
    title: "We Don't Pitch. We Discover.",
    subtitle: '4-8 Week Strategic Diagnostic',
    content: {
      phases: [
        { week: '1-2', title: 'Business Logic Mapping', deliverable: 'Business Process Blueprint' },
        { week: '3-4', title: 'Technical Assessment', deliverable: 'Technical Readiness Report' },
        { week: '5-6', title: 'Value Quantification', deliverable: 'Value Mapping Document' },
        { week: '7-8', title: 'Roadmap & Execution', deliverable: 'Transformation Roadmap' }
      ],
      benefits: [
        'No commitment required — Consulting is standalone',
        'Actionable insights — Strategic clarity even if you don\'t proceed',
        'Risk mitigation — Understand challenges before committing',
        'Board-ready documentation — CFO, CEO, DTO can evaluate independently'
      ]
    }
  },

  // Slide 6: GPT-Powered Analytics
  {
    id: 6,
    type: 'analytics',
    title: 'GPT-Powered Business Intelligence',
    subtitle: 'From Excel Files to Conversational Insights',
    content: {
      before: {
        title: 'Before',
        points: ['2-3 days/month analyzing Excel files', 'Manual trend detection', 'Delayed insights']
      },
      after: {
        title: 'After',
        points: ['Seconds to answer complex queries', 'Automated anomaly alerts', 'Real-time dashboards']
      },
      examples: [
        '"Show me top 10 distributors by AUM in equity funds for Q4"',
        '"Which distributors had the highest commission rate increase?"',
        '"What\'s the concentration risk if top distributor drops 20%?"'
      ],
      metrics: [
        { value: '39+', label: 'Active Distributors' },
        { value: '₹8.67L', label: 'Monthly Commission' },
        { value: 'Days→Seconds', label: 'Analysis Time' }
      ]
    }
  },

  // Slide 7: Finance Transformation
  {
    id: 7,
    type: 'finance',
    title: 'Finance Transformation',
    subtitle: 'Large-Scale Reconciliation & Expense Optimization',
    content: {
      scale: [
        { value: '10,000+', label: 'Invoices/Month' },
        { value: '500+', label: 'Vendors' },
        { value: '₹2,000+ Cr', label: 'Revenue' }
      ],
      capabilities: [
        { 
          title: 'Automated 4-Way Matching',
          description: 'PO + Invoice + GRN + Contract validation in real-time'
        },
        { 
          title: 'Distributor Expense Analytics',
          description: 'GPT-powered analysis, anomaly detection, optimization'
        },
        { 
          title: 'D2C Conversion Platforms',
          description: 'AI-powered onboarding, automated KYC, 15%+ conversion'
        }
      ],
      impact: [
        { metric: '30%', label: 'Leakage Reduction' },
        { metric: '80%', label: 'Faster Processing' },
        { metric: '100%', label: 'Audit Trail' }
      ]
    }
  },

  // Slide 8: Healthcare Transformation
  {
    id: 8,
    type: 'healthcare',
    title: 'Healthcare Transformation',
    subtitle: 'Hospital & Pharmaceutical Operations at Scale',
    content: {
      scale: [
        { value: '10+', label: 'Hospitals' },
        { value: '5M+', label: 'Patients' },
        { value: '5,000+', label: 'Field Force' }
      ],
      useCases: [
        {
          title: 'Hospital Operations',
          metrics: '30% wait time reduction, 25% bed utilization improvement'
        },
        {
          title: 'Pharma Supply Chain',
          metrics: '20% stockout reduction, 100% channel visibility'
        },
        {
          title: 'Patient Data Consolidation',
          metrics: '50% duplicate test reduction, unified analytics'
        },
        {
          title: 'Revenue Cycle Management',
          metrics: '40% faster verification, 30% denial reduction'
        }
      ]
    }
  },

  // Slide 9: Sales & RM Transformation
  {
    id: 9,
    type: 'sales',
    title: 'RM Pod: The Scale Multiplier',
    subtitle: '10-20x Investor Coverage Without Adding Headcount',
    content: {
      before: [
        { value: '50-100', label: 'Investors per RM' },
        { value: '60%', label: 'Time on Routine Tasks' },
        { value: '₹10 Cr', label: 'AUM per RM' }
      ],
      after: [
        { value: '500-1,000', label: 'Investors per RM' },
        { value: '20%', label: 'Conversion Rate' },
        { value: '₹100+ Cr', label: 'AUM per RM' }
      ],
      capabilities: [
        'RM Copilot — AI drafts emails, prepares call briefs',
        'Investor Concierge — 24/7 automated routine queries',
        'Intent Scoring — AI prioritizes high-intent outreach',
        'CRM Integration — Automatic Salesforce updates'
      ]
    }
  },

  // Slide 10: HR Transformation
  {
    id: 10,
    type: 'hr',
    title: 'HR Pod: Talent Acquisition Accelerator',
    subtitle: '50% Faster Hiring Cycles Through Intelligent Automation',
    content: {
      metrics: [
        { before: '6 weeks', after: '3 weeks', label: 'Hiring Cycle' },
        { before: '50%', after: '20%', label: 'Drop-off Rate' },
        { before: '80%', after: '60%', label: 'Manual Screening' }
      ],
      capabilities: [
        'Intelligent CV Screening — AI ranks candidates',
        'Multilingual Voice Interviews — 10+ languages',
        'Candidate Scoring — Objective evaluation',
        'ATS Integration — Seamless HRIS connection'
      ],
      scale: '5,000+ employees, 200+ monthly hires'
    }
  },

  // Slide 11: Compliance Automation
  {
    id: 11,
    type: 'compliance',
    title: 'Compliance Pod: Zero Violations',
    subtitle: 'One-Click Audit Readiness',
    content: {
      before: {
        auditPrep: '2 weeks',
        violations: '5-10%',
        eligibility: 'Manual'
      },
      after: {
        auditPrep: '1 hour',
        violations: 'Zero',
        eligibility: 'Automated'
      },
      capabilities: [
        'Automated Eligibility Checks — Real-time regulatory enforcement',
        'Continuous Compliance Monitoring — Transaction validation',
        'Audit Trail Generation — Complete interaction logs',
        'One-Click Reports — SEBI, DFSA, RBI formats'
      ],
      frameworks: ['SEBI', 'DFSA', 'RBI', 'GDPR']
    }
  },

  // Slide 12: Vertical Wealth Flywheel (Case Study)
  {
    id: 12,
    type: 'flywheel',
    title: 'The Vertical Wealth Flywheel',
    subtitle: 'From ₹500 Cr to ₹5,000 Cr AUM',
    content: {
      phases: [
        {
          phase: 'Phase 1',
          title: 'Brokerage Velocity',
          timeline: 'Months 1-6',
          impact: '15-20% trading frequency increase'
        },
        {
          phase: 'Phase 2',
          title: 'MF Distribution',
          timeline: 'Months 1-12',
          impact: '₹950+ Cr AUM in Year 1'
        },
        {
          phase: 'Phase 3',
          title: 'Own Schemes Launch',
          timeline: 'Months 6-12',
          impact: '₹7+ Cr ARR'
        },
        {
          phase: 'Phase 4',
          title: 'Scale',
          timeline: 'Year 2-5',
          impact: '₹5,000-10,000 Cr AUM'
        }
      ],
      flywheel: [
        'Engagement → Daily trading habits',
        'Cross-Sell → MF investors',
        'Own Schemes → 2x margin',
        'Organic Growth → Lower CAC'
      ]
    }
  },

  // Slide 13: Enterprise Readiness
  {
    id: 13,
    type: 'enterprise-ready',
    title: 'Enterprise Readiness',
    subtitle: 'Security, Compliance, Scale',
    content: {
      security: [
        'India-first architecture — AWS Mumbai, Azure India',
        'Multi-tenant isolation — Complete data segregation',
        'PII masking — Encrypted at rest and in transit',
        'Role-based access control — Granular permissions'
      ],
      compliance: ['SEBI', 'DFSA', 'RBI', 'GDPR'],
      infrastructure: [
        '99.9% uptime SLA',
        'Multi-cloud architecture — No vendor lock-in',
        'Horizontal scaling — 10x traffic spikes',
        'Disaster recovery — Multi-region redundancy'
      ],
      integrations: ['SAP S/4HANA', 'Salesforce', 'Workday', 'Custom APIs']
    }
  },

  // Slide 14: 16-Week Roadmap
  {
    id: 14,
    type: 'roadmap',
    title: '16 Weeks to Production',
    subtitle: 'From Discovery to Production',
    content: {
      phases: [
        {
          name: 'Phase 1: Discovery & Foundation',
          weeks: '1-4',
          activities: ['Strategic Consulting', 'Day-0 Digitalization Foundation'],
          deliverable: 'Integrated infrastructure, digital foundation ready'
        },
        {
          name: 'Phase 2: Intelligence Layer',
          weeks: '5-12',
          activities: ['First Pod Deployment', 'Additional Pods'],
          deliverable: 'Full Intelligence Layer operational',
          note: 'Optional — Only after Day-0 complete'
        },
        {
          name: 'Phase 3: Scale & Optimize',
          weeks: '13-16',
          activities: ['Performance Tuning', 'Production Handoff'],
          deliverable: 'Self-sufficient client team'
        }
      ],
      outcomes: [
        { value: '20-30%', label: 'Day-0 Efficiency Gains' },
        { value: '30-50%', label: 'AI Layer Efficiency Gains' },
        { value: '10-20x', label: 'Scale Without Headcount' }
      ]
    }
  },

  // Slide 15: Why DiscvrAI
  {
    id: 15,
    type: 'differentiators',
    title: 'Why DiscvrAI',
    subtitle: 'Not Another AI Vendor. Your Transformation Partner.',
    content: {
      vs: [
        {
          category: 'vs. Generic AI Platforms',
          edge: 'Enterprise infrastructure, not just APIs. Domain expertise. Native integrations.'
        },
        {
          category: 'vs. Marketing Automation',
          edge: 'Business transformation, not campaigns. Transaction execution. CFO-ready outcomes.'
        },
        {
          category: 'vs. Custom Development',
          edge: '16 weeks vs 18 months. Pre-built components. No vendor dependency.'
        }
      ],
      advantages: [
        { title: 'Experience', point: '20+ years, 100M+ MAUs scaled' },
        { title: 'Technology', point: 'Production-ready AI, 11 languages' },
        { title: 'Execution', point: 'Days-to-weeks deployment' }
      ]
    }
  },

  // Slide 16: Next Steps / CTA
  {
    id: 16,
    type: 'cta',
    title: "Let's Begin the Journey",
    subtitle: 'Ready to Transform?',
    content: {
      steps: [
        { step: 1, title: 'Discovery Call', description: '30-minute exploration', timeline: 'Week 1' },
        { step: 2, title: 'Strategic Consulting', description: '4-8 week diagnostic', timeline: 'Weeks 2-8' },
        { step: 3, title: 'Decision Point', description: 'Board-ready presentation', timeline: 'Week 9' },
        { step: 4, title: 'Execution', description: '16-week transformation', timeline: 'Weeks 9-24' }
      ],
      outcomes: [
        '30-50% operational efficiency gains',
        '10-20x scale without headcount increase',
        'Self-sufficient team ownership'
      ],
      contact: {
        name: 'Shubham Srivastava',
        title: 'Founder & CEO',
        email: 'shubham@discvr.ai',
        phone: '+91-9873961591'
      }
    }
  },

  // Slide 17: Technical Architecture (Appendix)
  {
    id: 17,
    type: 'architecture',
    title: 'Technical Architecture',
    subtitle: 'Enterprise-Grade. Scalable. Secure. Compliant.',
    content: {
      layers: [
        {
          name: 'AI/ML Layer',
          tech: ['GPT-4 Turbo', 'Claude 3.5', 'Gemini Pro'],
          features: ['RAG/Vector DBs', 'Multi-Modal (Voice, Chat, Avatar)']
        },
        {
          name: 'Infrastructure',
          tech: ['AWS', 'Azure', 'GCP'],
          features: ['PostgreSQL', 'Redis', 'MongoDB']
        },
        {
          name: 'Integration',
          tech: ['SAP S/4HANA', 'Salesforce', 'Workday'],
          features: ['REST APIs', 'Webhooks', 'Custom Connectors']
        },
        {
          name: 'Governance',
          tech: ['PII Masking', 'Multi-Tenant Isolation'],
          features: ['SEBI/DFSA/RBI Compliance', 'Audit Trails']
        }
      ]
    }
  },

  // Slide 18: Supply Chain Transformation
  {
    id: 18,
    type: 'supply-chain',
    title: 'Supply Chain Transformation',
    subtitle: 'How We Enable It — Execution Layer, Not Rip-and-Replace',
    content: {
      capabilities: [
        {
          name: 'Warehouse Utilization',
          items: [
            'Inbound control & dock scheduling',
            'Slotting & velocity optimization',
            'Labor planning, exception-driven receiving / putaway'
          ],
          kpis: ['OTIF', 'Lines / hr', 'Inventory accuracy', 'Capacity headroom']
        },
        {
          name: 'Supply Chain Planning',
          items: [
            'Unified demand signal across channels',
            'Constrained replenishment & inventory policy by service class',
            'S&OP / IBP cadence acceleration with scenario planning'
          ],
          kpis: ['Forecast accuracy', 'Service level', 'Working capital', 'Stockouts']
        }
      ]
    }
  },

  // Slide 19: Predictive Analytics for Heavy Equipment
  {
    id: 19,
    type: 'predictive-analytics',
    title: 'Predictive Analytics for Heavy Equipment',
    subtitle: "What's Possible for Vedanta — Metals & Mining Context",
    content: {
      capabilities: [
        'Predictive maintenance & failure risk scoring',
        'Remaining useful life (RUL) proxies',
        'Anomaly detection — vibration, temperature, current',
        'Energy intensity deviation alerts'
      ],
      outcomes: [
        'Reduced unplanned downtime',
        'Better spares planning & lower carrying cost',
        'Safer, planned interventions',
        'Higher OEE across critical assets'
      ]
    }
  },

  // Slide 20: Command Center — Already Built for Vedanta Aluminium
  {
    id: 20,
    type: 'vedanta-built',
    title: 'Command Center — Already Built for Vedanta Aluminium',
    subtitle: 'What We Have Delivered · Designed For / Pilot Scope / In Progress',
    content: {
      modules: [
        { name: 'Executive Command Center', detail: 'KPI strip, 30-day trends, top-5 alerts, today\'s decisions' },
        { name: 'Operations Control Tower', detail: 'Smelter / refinery cards, line heatmap, downtime timeline' },
        { name: 'Procurement & Inventory', detail: 'PR-to-PO funnel, supplier risk, exception approvals' },
        { name: 'Commercial Margin Center', detail: 'LME pricing sim, margin waterfall, deal desk' },
        { name: 'Workflow Orchestration', detail: 'Unified inbox, SLA timers, decision audit trail' },
        { name: 'AI Copilot', detail: 'NL Q&A with confidence score & source citations' }
      ],
      meta: [
        { label: 'Pilot Site / Scope', value: '[PILOT SITE / SCOPE — e.g., Jharsuguda Smelter, Potline 1–4]' },
        { label: 'Integrations', value: '[SAP S/4HANA · MES · SCADA / PI Historian · Data Lake]' },
        { label: 'Workflows Live', value: '[Alert → Approve → Assign → Closure → Impact captured]' },
        { label: 'Users / Roles', value: '[CDO/CXO · Plant Head · Procurement · Commercial · Shift Sup.]' },
        { label: 'Metrics Tracked', value: '[Prod vs plan · kWh/kg · Anode eff. · PR cycle · Margin/ton]' },
        { label: '90-Day Pilot Frame', value: 'Baseline → Target → Current progress → Annualized value' }
      ]
    }
  },

  // Slide 21: Thank You / Contact
  {
    id: 21,
    type: 'contact',
    title: 'Thank You',
    subtitle: "Let's start with understanding. Then we'll build the future together.",
    content: {
      contact: {
        name: 'Shubham Srivastava',
        title: 'Founder & CEO',
        email: 'shubham@discvr.ai',
        phone: '+91-9873961591'
      },
      tagline: "We don't just sell AI. We become your AI infrastructure partner."
    }
  },

  // ============ GREENKO INSERT (Slides 22–25) ============
  {
    id: 22,
    type: 'company-reality',
    title: 'A Reality Most Energy Majors Recognise',
    subtitle: 'Patterns we see across organisations of similar scale and complexity',
    content: {
      company: 'Greenko',
      accent: '#1f7a3a',
      exists: [
        'Modern ERP and workforce platforms in place',
        'Plant-level data capture across the asset base',
        'Established MIS and reporting cadence',
        'Investments in digital and analytics already underway'
      ],
      breaks: [
        'Insight-to-action loops typically remain manual',
        'Cross-plant signals get consolidated, not orchestrated',
        'Decision context tends to live in inboxes and Excel',
        'Operating responses skew reactive rather than preventive'
      ],
      footer: 'Across organisations of this scale, the gap is rarely data — it is the orchestration layer that turns signals into owner-led action.'
    }
  },
  {
    id: 23,
    type: 'company-value-leak',
    title: 'Current Decision Gaps and Their Business Impact',
    subtitle: 'Where unstitched signals quietly erode value',
    content: {
      company: 'Greenko',
      accent: '#1f7a3a',
      rows: [
        { fn: 'Expense Management', breaks: 'Delayed tracking & approval cycles', impact: 'Cost overruns' },
        { fn: 'MIS Consolidation', breaks: 'Manual Excel stitching across teams', impact: 'Lagging decisions' },
        { fn: 'Plant Operations', breaks: 'No unified cross-plant view', impact: 'Throughput & efficiency loss' },
        { fn: 'Vendor Governance', breaks: 'Fragmented monitoring', impact: 'Leakage & weak controls' }
      ]
    }
  },
  {
    id: 24,
    type: 'company-command-center',
    title: 'From Plant Data to Real-Time Action',
    subtitle: 'Command Center for Energy Operations',
    content: {
      company: 'Greenko',
      accent: '#1f7a3a',
      demoUrl: '/greenko-command-center',
      kpis: [
        { label: 'Gen vs Plan', val: '96.8%' },
        { label: 'PLF', val: '34.2%' },
        { label: 'Cost Var', val: '+2.1%' },
        { label: 'Downtime', val: '4.6h' }
      ],
      alerts: [
        { sev: 'High', msg: 'AP-Solar-2 underperforming plan by 4.8%', owner: 'Plant Head' },
        { sev: 'High', msg: 'Karnataka wind farm — predictive maint. risk', owner: 'O&M Lead' },
        { sev: 'Med', msg: 'Cost variance breach · O&M ledger', owner: 'Finance' }
      ],
      bullets: [
        'Unified view across plants',
        'Variance detection in near real time',
        'Auto-escalation to responsible owners'
      ]
    }
  },
  {
    id: 25,
    type: 'company-pilot',
    title: 'Pilot Fast: From MIS Friction to Measurable Control',
    subtitle: '2–3 Week Pilot Proposal',
    content: {
      company: 'Greenko',
      accent: '#1f7a3a',
      blocks: [
        { label: 'Scope', value: 'One plant OR an expense control use case' },
        { label: 'Integrations', value: 'ERP + 1–2 operational data sources' },
        { label: 'Outputs', value: 'Live dashboard + alerts + action workflow' },
        { label: 'KPIs', value: 'MIS cycle time · cost variance visibility · action closure time' },
        { label: 'Timeline', value: 'Wk 1 setup · Wk 2 intelligence · Wk 3 actions' }
      ],
      cta: 'Start with one plant, prove impact, then scale across the network.'
    }
  },

  // ============ HAVELLS INSERT (Slides 26–29) ============
  {
    id: 26,
    type: 'company-reality',
    title: 'Good Data, Slow Decisions Across Channel and Supply',
    subtitle: 'Execution reality in fast-moving electricals',
    content: {
      company: 'Havells',
      accent: '#0b3d91',
      exists: [
        'ERP & sales reporting in place',
        'Distributor & secondary-sales data',
        'Established planning cadence',
        'Regional sales infrastructure'
      ],
      breaks: [
        'Demand volatility — slow correction',
        'Stock imbalance across SKU × region',
        'Delayed correction cycles',
        'Regional blind spots in execution'
      ],
      footer: 'Core challenge: fragmented signals across planning, sales, and dispatch.'
    }
  },
  {
    id: 27,
    type: 'company-value-leak',
    title: 'Decision Gaps Driving Revenue and Working Capital Loss',
    subtitle: 'Where execution friction compounds at scale',
    content: {
      company: 'Havells',
      accent: '#0b3d91',
      rows: [
        { fn: 'Demand Planning', breaks: 'Lagging forecast corrections', impact: 'Stockouts & missed sales' },
        { fn: 'Inventory Deployment', breaks: 'Suboptimal stock positioning', impact: 'Excess working capital' },
        { fn: 'Dispatch Prioritization', breaks: 'Manual exception handling', impact: 'Fill-rate & service risk' },
        { fn: 'Channel Performance', breaks: 'Delayed sell-through visibility', impact: 'Weak regional response' }
      ]
    }
  },
  {
    id: 28,
    type: 'company-command-center',
    title: 'From Demand Signals to Region-Wise Action',
    subtitle: 'Havells Decision Command Center',
    content: {
      company: 'Havells',
      accent: '#0b3d91',
      demoUrl: '/havells-decision-studio',
      kpis: [
        { label: 'Fill Rate', val: '92.4%' },
        { label: 'Forecast Acc.', val: '78%' },
        { label: 'Inv Turns', val: '6.2x' },
        { label: 'Stockouts', val: '47 SKU' }
      ],
      alerts: [
        { sev: 'High', msg: 'Fans · North — stockout risk in 72h', owner: 'Regional SCM' },
        { sev: 'High', msg: 'Switchgear · South — overstock 38 days', owner: 'Planning' },
        { sev: 'Med', msg: 'Top distributor fill-rate dip in West', owner: 'Sales Head' }
      ],
      bullets: [
        'Daily decision cadence',
        'Actionable alerts, not static reports',
        'Traceable closure and impact tracking'
      ]
    }
  },
  {
    id: 29,
    type: 'company-pilot',
    title: 'Pilot One Category, Prove Speed and Control',
    subtitle: '2–3 Week Pilot · Measurable Impact',
    content: {
      company: 'Havells',
      accent: '#0b3d91',
      blocks: [
        { label: 'Scope', value: '1 category × 3–5 regions' },
        { label: 'Data Inputs', value: 'ERP + secondary sales + inventory snapshots' },
        { label: 'Outputs', value: 'Live control dashboard + risk alerts + action workflow' },
        { label: 'KPI Targets', value: 'Forecast correction speed · stockout reduction · fill-rate uplift · turns' },
        { label: 'Scale Plan', value: 'Expand by category and region after pilot validation' }
      ],
      cta: 'Start narrow, improve decision velocity, scale to a national control model.'
    }
  },

  // ============ DP WORLD INSERT (Slides 30–33) ============
  {
    id: 30,
    type: 'company-reality',
    title: 'High System Maturity, Low Operational Orchestration',
    subtitle: 'Mature systems, fragmented execution',
    content: {
      company: 'DP World',
      accent: '#1f4e79',
      exists: [
        'TMS, WMS, ERP deployed globally',
        'Strong data availability across stack',
        'Mature digital infrastructure',
        'Established regional ops teams'
      ],
      breaks: [
        'Manual exception handling',
        'Low cross-region visibility',
        'Reactive decision posture',
        'Disconnected approval workflows'
      ],
      footer: 'Problem is no longer digitization — it is synchronized decision execution.'
    }
  },
  {
    id: 31,
    type: 'company-value-leak',
    title: 'Top Decision Breakpoints Across Global Logistics',
    subtitle: 'Where multi-system signals fail to converge',
    content: {
      company: 'DP World',
      accent: '#1f4e79',
      rows: [
        { fn: 'Lane Planning', breaks: 'Static routing · weak dynamic optimization', impact: 'Higher cost per move' },
        { fn: 'Exception Handling', breaks: 'Manual triage & approvals', impact: 'Delays & SLA misses' },
        { fn: 'Warehouse Utilization', breaks: 'Disconnected capacity signals', impact: 'Underutilization & congestion' },
        { fn: 'Vendor Decisions', breaks: 'Fragmented performance view', impact: 'Cost leakage & compliance risk' }
      ]
    }
  },
  {
    id: 32,
    type: 'company-command-center',
    title: 'Unified Control View Across Lanes, DCs, and Exceptions',
    subtitle: 'Supply Chain Command Layer',
    content: {
      company: 'DP World',
      accent: '#1f4e79',
      demoUrl: '/dpworld-orchestration',
      kpis: [
        { label: 'On-Time %', val: '91.7%' },
        { label: 'Cost / Move', val: '$284' },
        { label: 'DC Util.', val: '76%' },
        { label: 'Open Exc.', val: '143' }
      ],
      alerts: [
        { sev: 'High', msg: 'Jebel Ali → Mundra · SLA breach risk', owner: 'Lane Ops' },
        { sev: 'High', msg: 'DC-Sohar congestion · capacity 94%', owner: 'WH Manager' },
        { sev: 'Med', msg: 'Carrier underperformance · APAC corridor', owner: 'Vendor Mgmt' }
      ],
      bullets: [
        'One decision surface across systems',
        'Owner-assigned action queues',
        'Clear SLA & closure tracking'
      ]
    }
  },
  {
    id: 33,
    type: 'company-pilot',
    title: '2–3 Week Pilot: Detect, Decide, Execute',
    subtitle: 'Exception to Action · Pilot Frame',
    content: {
      company: 'DP World',
      accent: '#1f4e79',
      blocks: [
        { label: 'Scope', value: 'One lane cluster OR one regional warehouse network' },
        { label: 'Integrations', value: 'TMS + WMS + ERP event feed' },
        { label: 'Intelligence', value: 'Exception detection + reroute / reallocation suggestions' },
        { label: 'Workflow', value: 'Human-in-loop approvals & action logging' },
        { label: 'KPIs', value: 'Exception TAT · SLA breaches · cost per move' }
      ],
      cta: 'Start with one high-friction flow, prove faster closure and cost control, then scale globally.'
    }
  },

  // ============ ENGAGEMENT MODELS — GENERIC MODULE (Slides 34–35) ============
  {
    id: 34,
    type: 'partner-at-scale',
    title: 'How We Partner at Scale',
    subtitle: 'For digitally mature enterprises',
    content: {
      capabilities: [
        { title: 'Strategy → Execution', desc: 'Roadmaps anchored in measurable outcomes, not slideware.' },
        { title: 'Data, AI & Platforms', desc: 'Modern stacks, MLOps patterns, governance where it matters.' },
        { title: 'Product & Experience', desc: 'Operator-grade UX and adoption — not lab demos.' },
        { title: 'Change & Capability', desc: 'Playbooks, standards, and knowledge transfer built in.' }
      ],
      pillars: [
        { title: 'Joint Teams', desc: 'We embed with your leads. Decisions stay yours.' },
        { title: 'Quality Bar', desc: 'Reviews, patterns, and repeatable ways of working — not heroics.' },
        { title: 'Exit / Insource Path', desc: 'Designed for your people to own the runway: docs, hiring profile, handover milestones.' }
      ],
      flow: ['You (Client)', 'Us (Firm)', 'Outcomes'],
      footer: 'Co-build, not black-box outsource.'
    }
  },
  {
    id: 35,
    type: 'engagement-models',
    title: 'Three Ways We Can Engage',
    subtitle: 'Engagement models — generic module',
    content: {
      models: [
        {
          name: 'Large-Scale Digital Transformation',
          definition: 'End-to-end program across data, platforms, AI and ways of working with executive alignment and staged value.',
          bestWhen: 'Portfolio of initiatives, shared foundations, or enterprise-wide rhythm is needed.',
          differentiators: [
            'Breadth + sequencing — interdependencies managed',
            'Governance cadence across tracks',
            'Standardization across teams'
          ],
          contrast: 'Slower to first narrow win than a point solution. Not the default for a single isolated KPI.',
          shape: 'Program fee',
          ttv: '6–12 months',
          ownership: 'Gradual, governed handover'
        },
        {
          name: 'Specific Problem Solutions',
          definition: 'Time-boxed problem → design → pilot → scale plan on a bounded use case.',
          bestWhen: 'Proof before scale; sponsor and data are localized; need speed and clarity.',
          differentiators: [
            'Fastest time-to-evidence',
            'Tighter scope and cost control',
            'Crisp success metrics'
          ],
          contrast: 'Will not alone reset platform debt or org design. Often feeds the transformation track as a beachhead.',
          shape: 'Fixed outcome',
          ttv: '4–12 weeks',
          ownership: 'Hand back at pilot close'
        },
        {
          name: 'Manpower / Talent with Our Setup',
          definition: 'We stand up or augment squads (DS/ML, analytics engineering, product analytics) using our hiring bar, playbooks, and leadership — operating inside your tools and security boundary.',
          bestWhen: 'You want to insource or scale talent without losing velocity; quality > volume hiring is the bottleneck.',
          differentiators: [
            'Speed to a competent bench',
            'Mentorship + code/model review culture',
            'Clear handover: JD, leveling, KT milestones'
          ],
          contrast: 'Ongoing cost; integrates with your HR & title structures. Less suited if you only need a one-off model.',
          shape: 'Squad-based',
          ttv: '2–6 weeks to bench',
          ownership: 'Build → Operate → Transfer'
        }
      ],
      howToChoose: 'Transformation for portfolio change · Problem solutions for proof and focus · Manpower / pods when capacity and quality must land inside your org.'
    }
  }
];
