// Yatharth Hospitals Healthcare Transformation Pitch Deck
// Customized Enterprise Healthcare Pitch - Light Theme

export interface YatharthSlide {
  id: number;
  type: string;
  title: string;
  subtitle?: string;
  content?: any;
}

export const yatharthSlides: YatharthSlide[] = [
  // Slide 1: Title Slide
  {
    id: 1,
    type: 'title',
    title: 'Transforming Yatharth Hospitals',
    subtitle: 'From 7 Facilities to a Unified Digital Healthcare Network',
    content: {
      tagline: 'Day-0 Digitalization First. AI Enablement Second.',
      scale: [
        { value: '7', label: 'Hospital Facilities' },
        { value: '2,305+', label: 'Beds' },
        { value: '6', label: 'Cities' }
      ],
      locations: ['Greater Noida', 'Noida', 'Noida Extension', 'Jhansi', 'Faridabad', 'New Delhi'],
      specialties: ['Cardiology', 'Neurosciences', 'Orthopaedics', 'Transplant Services', 'Oncology', 'IVF & Fertility'],
      keyMessage: "We don't sell software. We architect your next evolution."
    }
  },

  // Slide 2: Founder's Profile
  {
    id: 2,
    type: 'founder',
    title: "I've Led Large-Scale Transformations",
    subtitle: "I Know What Works at Enterprise Scale",
    content: {
      credentials: [
        { value: '20', label: 'Years Tech Leadership' },
        { value: '10', label: 'Years as CXO' }
      ],
      transformations: [
        {
          domain: 'Manufacturing & Distribution',
          scale: '₹2,000+ Cr Revenue',
          highlights: [
            '10,000+ field force D2C enablement',
            '20M+ customer data consolidation',
            'End-to-end supply chain visibility',
            'Product authentication (QR-based)',
            'Finance transformation (10K+ invoices/month)'
          ]
        },
        {
          domain: 'Financial Services',
          scale: '₹5,000+ Cr AUM',
          highlights: [
            'Wealth platform: ₹500 Cr → ₹5,000+ Cr AUM',
            'GPT-powered distribution analytics',
            'RM automation: 10x investor coverage'
          ]
        }
      ],
      promise: "I've sat in your chair. I've led transformations at the scale you operate — 7 facilities, 2,305+ beds. I know the headcount trap. DiscvrAI bridges that gap.",
      founder: {
        name: 'Shubham Srivastava',
        title: 'Founder & CEO',
        email: 'shubham@discvr.ai',
        phone: '+91-9873961591',
        linkedin: 'https://www.linkedin.com/in/shubhamsrivastava1/'
      }
    }
  },

  // Slide 3: Capabilities Overview
  {
    id: 3,
    type: 'capabilities',
    title: 'Our Capabilities',
    subtitle: 'Day-0 Digitalization & AI-Enabled Transformation',
    content: {
      principle: 'AI cannot enable what isn\'t digital. Day-0 digitalization creates the foundation.',
      capabilities: [
        {
          icon: 'database',
          title: 'Master Patient Index (MPI)',
          description: 'Unified patient records across all 7 facilities',
          scale: '20M+ records proven'
        },
        {
          icon: 'hospital',
          title: 'Multi-Hospital Operations',
          description: 'Real-time patient flow, bed allocation, resource optimization',
          scale: '2,305+ beds'
        },
        {
          icon: 'banknote',
          title: 'Revenue Cycle Management',
          description: 'Automated insurance verification, claims processing, billing',
          scale: '10K+ invoices/month'
        },
        {
          icon: 'network',
          title: 'End-to-End Integration',
          description: 'Connect EMR, billing, lab, pharmacy systems seamlessly',
          scale: '10+ systems'
        },
        {
          icon: 'brain',
          title: 'Clinical Analytics (GPT)',
          description: 'Conversational insights, treatment recommendations',
          scale: 'After Day-0'
        }
      ]
    }
  },

  // Slide 4: Multi-Hospital Operations Platform
  {
    id: 4,
    type: 'operations',
    title: 'Multi-Hospital Operations Platform',
    subtitle: 'Real-Time Patient Flow Management',
    content: {
      features: [
        {
          title: 'Real-Time Patient Flow',
          items: ['Automated bed allocation', 'Unified scheduling', 'Resource optimization'],
          tag: 'Day-0'
        },
        {
          title: 'Unified EMR Integration',
          items: ['Single patient view', 'Real-time sync', 'HL7/FHIR integration'],
          tag: 'Day-0'
        },
        {
          title: 'Clinical Decision Support',
          items: ['Treatment recommendations', 'Population health analytics', 'Conversational queries'],
          tag: 'AI-Enabled'
        }
      ],
      impact: [
        { value: '30%', label: 'Wait Time Reduction' },
        { value: '25%', label: 'Bed Utilization Improvement' },
        { value: '100%', label: 'Record Accuracy' }
      ]
    }
  },

  // Slide 5: Patient Data Consolidation (MPI)
  {
    id: 5,
    type: 'mpi',
    title: 'Patient Data Consolidation',
    subtitle: 'Master Patient Index (MPI)',
    content: {
      features: [
        {
          title: 'Data Consolidation',
          items: ['Unify records across 7 facilities', 'Deduplication engine', 'Data lake architecture'],
          tag: 'Day-0'
        },
        {
          title: 'HL7/FHIR Integration',
          items: ['Seamless data exchange', 'Real-time synchronization', 'Standard protocols'],
          tag: 'Day-0'
        },
        {
          title: 'GPT Clinical Analytics',
          items: ['Population health analytics', 'Treatment optimization', 'Natural language queries'],
          tag: 'AI-Enabled'
        }
      ],
      sampleQueries: [
        'Show diabetes + hypertension patients across all 7 facilities',
        'Drug interactions for this medication combination?',
        'Readmission rate for cardiac patients across network?'
      ],
      impact: [
        { value: '100%', label: 'Record Accuracy' },
        { value: '50%', label: 'Duplicate Test Reduction' }
      ]
    }
  },

  // Slide 6: Revenue Cycle Management
  {
    id: 6,
    type: 'rcm',
    title: 'Revenue Cycle Management',
    subtitle: 'Enterprise-Scale Healthcare Finance',
    content: {
      features: [
        {
          title: 'Insurance Verification',
          items: ['Real-time eligibility checks', 'Multi-payer integration', 'International patient billing'],
          tag: 'Day-0'
        },
        {
          title: 'Claims Processing',
          items: ['Automated submission', 'Denial management', 'Complete audit trail'],
          tag: 'Day-0'
        },
        {
          title: 'Billing Reconciliation',
          items: ['Automated charge capture', 'Multi-facility reconciliation', 'AR management'],
          tag: 'Day-0'
        },
        {
          title: 'Revenue Analytics',
          items: ['Conversational queries', 'Denial analysis', 'Revenue forecasting'],
          tag: 'AI-Enabled'
        }
      ],
      impact: [
        { value: '40%', label: 'Faster Verification' },
        { value: '30%', label: 'Denial Reduction' },
        { value: '25%', label: 'AR Days Improvement' }
      ]
    }
  },

  // Slide 7: Day-0 vs AI Capabilities
  {
    id: 7,
    type: 'comparison',
    title: 'What We Can Enable',
    subtitle: 'Day-0 Digitalization (Standalone) + AI (Optional)',
    content: {
      day0: {
        title: 'Day-0 Digitalization',
        subtitle: 'Standalone — No AI Required',
        items: [
          { capability: 'Data Consolidation & MDM', scale: '20M+ records' },
          { capability: 'End-to-End Integration', scale: '10+ systems' },
          { capability: 'Multi-Hospital Operations', scale: '2,305+ beds' },
          { capability: 'Revenue Cycle Management', scale: '10K+ invoices/month' }
        ]
      },
      ai: {
        title: 'AI Enablement',
        subtitle: 'Optional — After Day-0',
        items: [
          { capability: 'GPT Clinical Analytics', requires: 'Day-0 foundation' },
          { capability: 'GPT Revenue Analytics', requires: 'Day-0 foundation' },
          { capability: 'Clinical Decision Support', requires: 'Day-0 foundation' }
        ]
      },
      keyMessage: 'Day-0 delivers value independently. AI is optional and follows when ready.'
    }
  },

  // Slide 8: Why DiscvrAI
  {
    id: 8,
    type: 'differentiators',
    title: 'Why DiscvrAI',
    subtitle: 'Not Another Healthcare IT Vendor',
    content: {
      comparisons: [
        {
          vs: 'Generic Healthcare IT',
          advantages: ['Multi-hospital infrastructure', 'Healthcare domain expertise', 'Native system integrations', 'Day-0 digitalization first']
        },
        {
          vs: 'EMR Vendors',
          advantages: ['Business transformation focus', 'Multi-facility operations', 'CFO-ready business metrics']
        },
        {
          vs: 'Custom Development',
          advantages: ['Platform accelerates delivery', 'Reusable components', 'No vendor dependency']
        }
      ],
      cxoAdvantage: [
        { title: 'Founder-led', point: 'Built by someone who understands your challenges' },
        { title: 'Consulting-first', point: 'We discover before we execute' },
        { title: 'Risk-aware', point: 'Phased approach, measurable milestones' },
        { title: 'Business-outcome focused', point: 'Tied to operational transformation' }
      ]
    }
  },

  // Slide 9: Next Steps
  {
    id: 9,
    type: 'nextsteps',
    title: 'Next Steps',
    subtitle: "Let's Begin the Journey",
    content: {
      steps: [
        { step: 1, title: 'Discovery Call', description: '30-minute exploration', timeline: 'Week 1' },
        { step: 2, title: 'Strategic Consulting', description: '4-8 week deep-dive', timeline: 'Weeks 2-8' },
        { step: 3, title: 'Decision Point', description: 'Board-ready presentation', timeline: 'Week 9' },
        { step: 4, title: 'Execution', description: '16-week transformation', timeline: 'Weeks 9-24' }
      ],
      outcomes: [
        '30-50% operational efficiency gains',
        'Unified patient view across 7 facilities',
        'Real-time operations & bed management',
        'Self-sufficient team ownership'
      ],
      contact: {
        name: 'Shubham Srivastava',
        title: 'Founder & CEO',
        email: 'shubham@discvr.ai',
        phone: '+91-9873961591',
        linkedin: 'https://www.linkedin.com/in/shubhamsrivastava1/',
        website: 'www.discvr.ai'
      }
    }
  }
];
