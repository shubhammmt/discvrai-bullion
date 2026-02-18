export interface AptechCBOSlide {
  id: number;
  type: string;
  title: string;
  [key: string]: any;
}

export const aptechCBOSlides: AptechCBOSlide[] = [
  {
    id: 1,
    type: 'cbo-cover',
    title: 'Cover',
    headline: 'Aptech Digital Transformation',
    subheadline: 'From Lead Chaos to Revenue Control',
    tagline: 'An AI-Powered Revenue Integrity Platform',
    presenter: 'Shubham Srivastava',
    audience: 'Sandip Weling, Chief Business Officer',
    date: 'February 19, 2026',
    confidential: 'Confidential — For Internal Discussion Only',
  },
  {
    id: 2,
    type: 'cbo-exec-summary',
    title: 'Executive Summary',
    headline: '₹3.84–9.43 Cr Annual Revenue Opportunity Through Digital Transformation',
    problems: [
      { label: 'Conversion Gap', value: '1–1.5%', note: 'vs. ideal 3%+', sub: '80 lost enrollments/month' },
      { label: 'Revenue Gap', value: '₹40–60L', note: '/month', sub: 'Lost from conversion inefficiency' },
      { label: 'Attribution Blindness', value: '₹40–50L', note: '/month', sub: 'Spend with unmeasurable returns' },
      { label: 'CPC Inflation', value: '10×', note: 'increase', sub: '₹1–1.8 Cr annual waste' },
    ],
    solution: {
      title: 'The Solution',
      points: [
        'Centralized Agentic Commerce Platform',
        'End-to-end transaction control from qualification to lifecycle',
        'Investment: ₹43–57L (Phases 1–2)',
        'Payback Period: 2–3 months',
      ],
    },
  },
  {
    id: 3,
    type: 'cbo-problems',
    title: 'Nine Critical Funnel Failures',
    headline: 'Structural Issues Across the Entire Customer Journey',
    funnelSections: [
      {
        label: 'Top of Funnel — Acquisition',
        color: 'red',
        items: [
          'Conflicting websites/keywords = ₹80–100 CPC (10× inflation)',
          'Lead attribution broken = 80% enrollments untraceable',
        ],
      },
      {
        label: 'Middle of Funnel — Conversion',
        color: 'orange',
        items: [
          'Centers not calling = 7–8 hour delay = 40–50% lead decay',
          'No centralized communication = Haphazard messaging',
          'Counselors cannot provide details = Inconsistent information',
        ],
      },
      {
        label: 'Bottom of Funnel — Control',
        color: 'amber',
        items: [
          '90–95% business from centers = No HQ visibility',
          'No centralized conversion control = Cannot optimize ROI',
          'No student lifecycle management = Poor post-purchase experience',
          'No counselor enablement tools = Knowledge gaps',
        ],
      },
    ],
  },
  {
    id: 4,
    type: 'cbo-cost-of-inaction',
    title: 'Quantified Impact: Cost of Inaction',
    headline: 'Current System Costs ₹10.84–15.23 Cr Annually in Lost Revenue',
    financialRows: [
      { area: 'Conversion Gap', monthly: '₹40–60L', annual: '₹4.8–7.2 Cr', severity: 'critical' },
      { area: 'Attribution Blindness', monthly: '₹40–50L', annual: '₹4.8–6 Cr', severity: 'critical' },
      { area: 'CPC Inflation', monthly: '₹8–15L', annual: '₹1–1.8 Cr', severity: 'high' },
      { area: 'SEO Waste', monthly: '₹2–3.6L', annual: '₹24–43L', severity: 'medium' },
      { area: 'Total', monthly: '₹90–128L', annual: '₹10.84–15.23 Cr', severity: 'total' },
    ],
    operationalStats: [
      { metric: '4,000–5,000', label: 'Leads/month', sub: 'Only 40–75 enrollments (1–1.5%)' },
      { metric: '7–8 hours', label: 'Response time', sub: '40–50% lead decay before contact' },
      { metric: '60–70%', label: 'Duplicate leads', sub: 'Attribution impossible' },
    ],
  },
  {
    id: 5,
    type: 'cbo-solution',
    title: 'The Solution: Agentic Commerce Platform',
    headline: 'Centralized Agentic System Driving End-to-End Transactions',
    quote: 'We don\'t help you generate more leads. We help you finally know which leads make you money — and why.',
    layers: [
      {
        number: '01',
        label: 'Pre-Conversion',
        title: 'Qualification & Enrichment',
        color: 'blue',
        items: [
          'AI Career Counsellor: Conversational qualification & intent scoring',
          'Automated enrichment: Voice calls (15–30 min) + WhatsApp warming',
          'Lead ID system: Immutable attribution foundation',
        ],
      },
      {
        number: '02',
        label: 'Conversion',
        title: 'Transaction & Payment',
        color: 'indigo',
        items: [
          'End-to-end transaction control',
          'Payment processing (optional Phase 1B)',
          'Enrollment completion and confirmation',
        ],
      },
      {
        number: '03',
        label: 'Post-Conversion',
        title: 'Lifecycle Management',
        color: 'violet',
        items: [
          'Student portal: Course access, payments, support',
          'Engagement and retention tools',
          'Complete customer lifecycle visibility',
        ],
      },
    ],
  },
  {
    id: 6,
    type: 'cbo-problem-solution',
    title: 'Problem–Solution Mapping',
    headline: 'Every Problem Has a Direct Solution',
    rows: [
      { problem: 'Conflicting keywords', solution: 'Demand Orchestration Engine', timeline: 'Phase 3 (6–12m)', investment: '₹8–10L' },
      { problem: 'Lead attribution broken', solution: 'Lead ID System', timeline: 'Phase 1 (0–90d)', investment: '₹5–8L' },
      { problem: 'Centers not calling', solution: 'Auto-enrichment (15–30 min)', timeline: 'Phase 1 (0–90d)', investment: 'Included' },
      { problem: 'No centralized comms', solution: 'Unified messaging layer', timeline: 'Phase 1 (0–90d)', investment: 'Included' },
      { problem: 'Counselors lack info', solution: 'Center Enablement Tools', timeline: 'Phase 2 (3–6m)', investment: '₹12–15L' },
      { problem: 'No HQ control', solution: 'Attribution Dashboard', timeline: 'Phase 1–2 (0–6m)', investment: 'Included' },
      { problem: 'No conversion control', solution: 'Agentic Commerce Platform', timeline: 'Phase 1–2 (0–6m)', investment: '₹45L' },
      { problem: 'No student portal', solution: 'Student Lifecycle Platform', timeline: 'Phase 2 (3–6m)', investment: '₹20–25L' },
      { problem: 'No counselor tools', solution: 'Mobile/Web App', timeline: 'Phase 2 (3–6m)', investment: '₹12–15L' },
    ],
  },
  {
    id: 7,
    type: 'cbo-phase1',
    title: 'Phase 1 Deployment',
    headline: 'Start Non-Payment Enabled, Add Payment Capability Later',
    phase1a: {
      label: 'Phase 1A — Non-Payment Enabled',
      timeline: '0–90 days',
      investment: '₹45L',
      ongoingCost: '₹2L/month',
      ongoingCostNote: 'Cloud infrastructure + LLM API costs',
      deliverables: [
        'AI Career Counsellor (Web + WhatsApp + Voice)',
        'Automated voice enrichment calls (15–30 min response)',
        'WhatsApp warming sequences',
        'Lead ID system for attribution',
        'Center routing and enablement dashboard',
      ],
      impact: [
        { metric: '1% → 1.5–1.8%', label: 'Conversion rate', sub: '+50–80% improvement' },
        { metric: '+20–30', label: 'Enrollments/month', sub: '₹10–22.5L monthly revenue' },
        { metric: '1–2 months', label: 'Payback period', sub: 'Rapid ROI' },
      ],
    },
    phase1b: {
      label: 'Phase 1B — Payment-Enabled',
      timeline: '90–180 days',
      investment: '₹8–12L (additional)',
      ongoingCost: '₹2L/month',
      ongoingCostNote: 'Cloud infrastructure + LLM API costs (combined with 1A)',
      deliverables: [
        'Payment gateway integration',
        'Online enrollment workflow',
        'Full transaction completion',
      ],
      impact: 'Additional 0.5–0.7% conversion improvement',
    },
  },
  {
    id: 8,
    type: 'cbo-outcomes',
    title: 'Expected Business Outcomes',
    headline: 'Transformation Delivers 100–150% Conversion Improvement',
    progressionRows: [
      { phase: 'Current', timeline: 'Baseline', conversion: '1–1.5%', enrollments: '40–75', revenue: 'Baseline', highlight: false },
      { phase: 'Phase 1', timeline: '0–90 days', conversion: '1.5–1.8%', enrollments: '60–90', revenue: '+₹10–22.5L/month', highlight: true },
      { phase: 'Phase 2', timeline: '3–6 months', conversion: '2–2.5%', enrollments: '80–125', revenue: '+₹20–37.5L/month', highlight: false },
      { phase: 'Phase 3', timeline: '6–12 months', conversion: '2.5–3%+', enrollments: '100–150', revenue: '+₹30–56L/month', highlight: false },
    ],
    cumulative: [
      { label: 'Year 1 Revenue Increase', value: '₹3.6–9 Cr' },
      { label: 'Cost Savings (SEO + CPC)', value: '₹24–43L+' },
      { label: 'Total Annual Impact', value: '₹3.84–9.43 Cr' },
    ],
  },
  {
    id: 9,
    type: 'cbo-investment',
    title: 'Investment & ROI Summary',
    headline: '₹43–57L Investment Delivers ₹3.84–9.43 Cr Annual Impact',
    investmentRows: [
      { phase: 'Phase 1A', timeline: '0–90 days', investment: '₹45L', deliverables: 'Agentic Platform (Non-Payment) + Lead ID' },
      { phase: 'Phase 1B', timeline: '90–180 days', investment: '₹8–12L', deliverables: 'Payment Integration' },
      { phase: 'Phase 2', timeline: '3–6 months', investment: '₹65–82L', deliverables: 'Center Tools + Student Portal + Intelligence + SEO' },
      { phase: 'Phase 3', timeline: '6–12 months', investment: '₹8–10L', deliverables: 'Demand Orchestration' },
      { phase: 'Total', timeline: '12 months', investment: '₹116–149L', deliverables: 'Complete Platform' },
    ],
    roi: [
      { label: 'Phase 1 Investment', value: '₹57L' },
      { label: 'Phase 1 Annual Revenue', value: '₹1.2–2.7 Cr' },
      { label: 'Payback Period', value: '2–3 months' },
      { label: 'Year 1 ROI', value: '400–800%' },
    ],
  },
  {
    id: 10,
    type: 'cbo-roadmap',
    title: 'Implementation Roadmap',
    headline: 'Phased Approach Minimises Risk, Maximises Value',
    phases: [
      {
        label: 'Phase 1',
        title: 'Foundation',
        timeline: '0–90 days',
        color: 'blue',
        items: [
          'Deploy Agentic Commerce Platform (non-payment)',
          'Establish Lead ID system',
          'Pilot with 10–15 centers, 1–2 brands',
          'Prove conversion improvement (1% → 1.2–1.3%)',
        ],
      },
      {
        label: 'Phase 2',
        title: 'Scale & Enablement',
        timeline: '3–6 months',
        color: 'indigo',
        items: [
          'Add payment capability',
          'Deploy center enablement tools',
          'Launch student portal',
          'Scale to all brands and centers',
        ],
      },
      {
        label: 'Phase 3',
        title: 'Optimization',
        timeline: '6–12 months',
        color: 'violet',
        items: [
          'Demand orchestration (reduce CPC)',
          'Campaign intelligence automation',
          'Predictive optimization',
          'Full revenue integrity platform',
        ],
      },
    ],
    metrics: [
      'Conversion rate improvement',
      'Attribution accuracy (90%+)',
      'Revenue impact (₹10–22.5L/month Phase 1)',
    ],
  },
  {
    id: 11,
    type: 'cbo-risks',
    title: 'Risk Mitigation & Success Factors',
    headline: 'Structured Approach Minimises Risk, Ensures Success',
    risks: [
      {
        title: 'Center Adoption',
        mitigation: 'Pilot with willing centers, demonstrate ROI, incentive alignment',
        successFactor: 'Show conversion improvement (1% → 1.5–2%)',
      },
      {
        title: 'Technical Integration',
        mitigation: 'Non-breaking design, phased integration, fallback mechanisms',
        successFactor: 'API-first architecture, AptTrack compatibility',
      },
      {
        title: 'Payment Processing',
        mitigation: 'Start non-payment, add payment capability after validation',
        successFactor: 'Flexible deployment options',
      },
      {
        title: 'Attribution Accuracy',
        mitigation: 'Lead ID enforcement, dashboard flagging, incentive alignment',
        successFactor: 'Mobile/email binding prevents manipulation',
      },
    ],
    governance: [
      'Pilot-first approach (10–15 centers)',
      'Data-driven decision making',
      'Continuous improvement based on feedback',
    ],
  },
  {
    id: 12,
    type: 'cbo-next-steps',
    title: 'Immediate Next Steps',
    headline: 'Decision Points for CBO Approval',
    timeline: [
      {
        period: 'This Week',
        color: 'blue',
        items: [
          'Approve Phase 1A: ₹45L investment',
          'Confirm Pilot Scope: 10–15 centers, 1–2 brands (Arena, MAAC)',
          'Finalise Timeline: 60–90 days for Phase 1A deployment',
        ],
      },
      {
        period: 'Next 2 Weeks',
        color: 'indigo',
        items: [
          'Contract finalisation',
          'Technical architecture review (AptTrack integration)',
          'Pilot center selection and onboarding',
        ],
      },
      {
        period: 'Next 30 Days',
        color: 'violet',
        items: [
          'Development kickoff',
          'AI agent training and testing',
          'Integration development',
        ],
      },
      {
        period: '60–90 Days',
        color: 'purple',
        items: [
          'Pilot launch',
          'Performance monitoring',
          'Phase 1B planning (payment-enabled)',
        ],
      },
    ],
    options: [
      { label: 'A', title: 'Non-Payment Enabled', note: '(Recommended)', desc: 'Start lean, prove ROI, then add payments' },
      { label: 'B', title: 'Payment-Enabled from Day 1', note: '', desc: 'Higher control, faster conversion from launch' },
    ],
  },
  {
    id: 13,
    type: 'cbo-benchmarks',
    title: 'Why This Works: Industry Benchmarks',
    headline: 'Solutions Based on What 3%+ Conversion Companies Actually Do',
    benchmarks: [
      {
        number: '01',
        title: 'Immediate Response (15–30 min)',
        current: '7–8 hour delay = 40–50% lead decay',
        solution: 'Automated enrichment calls',
        impact: '3%+ converters respond within 30 min',
      },
      {
        number: '02',
        title: 'Lead Qualification Before Assignment',
        current: 'Raw leads go directly to centers',
        solution: 'AI Career Counsellor with intent scoring',
        impact: 'High performers qualify before center assignment',
      },
      {
        number: '03',
        title: 'Complete Attribution Visibility',
        current: '80% enrollments untraceable',
        solution: 'Lead ID system with immutable binding',
        impact: 'Top performers track every enrollment to source',
      },
      {
        number: '04',
        title: 'Center Enablement Tools',
        current: 'No tools, knowledge gaps',
        solution: 'Mobile/web app with lead context & scripts',
        impact: 'Best-in-class provide counselors full context',
      },
      {
        number: '05',
        title: 'Post-Purchase Engagement',
        current: 'No student portal',
        solution: 'Complete lifecycle platform',
        impact: 'Leaders maintain student lifecycle management',
      },
    ],
  },
  {
    id: 14,
    type: 'cbo-ask',
    title: 'The Ask: Investment Decision',
    headline: '₹45L Investment to Unlock ₹1.2–2.7 Cr Annual Revenue',
    ask: {
      investment: '₹45L',
      timeline: '60–90 days',
      scope: '10–15 pilot centers',
    },
    deliverables: [
      'Agentic Commerce Platform (non-payment enabled)',
      'Lead ID system for attribution',
      'Automated enrichment (15–30 min response)',
      'Conversion improvement: 1% → 1.5–1.8%',
      'Revenue impact: ₹10–22.5L/month',
    ],
    successCriteria: [
      { metric: '1% → 1.2–1.3%', label: 'Conversion rate (pilot centers)' },
      { metric: '7–8h → 15–30m', label: 'Lead response time' },
      { metric: '20–30% → 90%+', label: 'Attribution accuracy' },
    ],
    nextDecision: [
      'Phase 1B (payment-enabled): Approve after Phase 1A validation',
      'Phase 2 (full platform): Approve after Phase 1 success',
    ],
    contact: {
      name: 'Shubham Srivastava',
      role: 'Founder & CEO, DiscvrAI',
      email: 'shubham@discvr.ai',
      phone: '+91-9873961591',
    },
  },
  {
    id: 15,
    type: 'cbo-architecture',
    title: 'Appendix: Technical Architecture',
    headline: 'Scalable, API-First Architecture',
    components: [
      {
        number: '01',
        title: 'AI Agent Engine',
        items: ['LLM-powered conversational agent (GPT-4/Claude)', 'Multi-channel: Web, WhatsApp, Voice', 'Intent scoring and qualification logic'],
      },
      {
        number: '02',
        title: 'Enrichment System',
        items: ['Voice AI (ElevenLabs/Deepgram) for outbound calls', 'WhatsApp Business API for messaging', 'Automated sequencing and timing'],
      },
      {
        number: '03',
        title: 'Transaction Engine',
        items: ['Payment gateway integration (Razorpay/Stripe/PayU)', 'Enrollment workflow management', 'Receipt and confirmation generation'],
      },
      {
        number: '04',
        title: 'Student Portal',
        items: ['Web application + mobile app (iOS/Android)', 'LMS integration', 'Payment management system'],
      },
      {
        number: '05',
        title: 'Integration Layer',
        items: ['AptTrack API integration', 'CRM integration (if applicable)', 'Payment gateway & LMS APIs'],
      },
    ],
    dataFlow: 'User → AI Agent → Lead ID → Enrichment → Center Routing OR Direct Enrollment → Payment → Student Portal',
  },
  {
    id: 16,
    type: 'cbo-financial-model',
    title: 'Appendix: Detailed Financial Model',
    headline: 'Conservative Revenue Projections',
    assumptions: [
      '4,000–5,000 leads/month at 1–1.5% conversion = 40–75 enrollments',
      'Average enrollment value: ₹50k–75k',
      'Phase 1 conversion: 1.5–1.8% = 60–90 enrollments',
      'Phase 2 conversion: 2–2.5% = 80–125 enrollments',
      'Phase 3 conversion: 2.5–3%+ = 100–150 enrollments',
    ],
    revenueRows: [
      { phase: 'Current', enrollments: '40–75', monthly: '₹20–56L', annual: '₹2.4–6.72 Cr', incremental: 'Baseline' },
      { phase: 'Phase 1', enrollments: '60–90', monthly: '₹30–67.5L', annual: '₹3.6–8.1 Cr', incremental: '+₹1.2–2.7 Cr' },
      { phase: 'Phase 2', enrollments: '80–125', monthly: '₹40–93.75L', annual: '₹4.8–11.25 Cr', incremental: '+₹2.4–5.4 Cr' },
      { phase: 'Phase 3', enrollments: '100–150', monthly: '₹50–112.5L', annual: '₹6–13.5 Cr', incremental: '+₹3.6–8.28 Cr' },
    ],
    savings: [
      { label: 'SEO Savings', value: '₹24–43L annually' },
      { label: 'CPC Reduction', value: 'Significant (Phase 3)' },
    ],
  },
  {
    id: 17,
    type: 'cbo-revenue-calc',
    title: 'Appendix: Revenue Calculation Breakdown',
    headline: '₹3.84–9.43 Cr Annual Impact: Full Calculation',
    baseAssumptions: [
      '4,000–5,000 leads/month at 1–1.5% conversion = 40–75 enrollments/month',
      'Full Platform (Phase 3): 2.5–3%+ conversion = 100–150 enrollments/month',
      'Average enrollment value: ₹50k–75k per enrollment',
    ],
    scenarios: [
      {
        label: 'Low End',
        color: 'blue',
        steps: [
          { description: 'Current enrollments/month', value: '40', note: '1% × 4,000 leads' },
          { description: 'With full platform', value: '100', note: '2.5% conversion' },
          { description: 'Incremental enrollments', value: '+60/month', note: '' },
          { description: 'Monthly revenue gain', value: '₹30L', note: '60 × ₹50k' },
          { description: 'Annual revenue gain', value: '₹3.6 Cr', note: '₹30L × 12', highlight: true },
        ],
      },
      {
        label: 'High End',
        color: 'emerald',
        steps: [
          { description: 'Current enrollments/month', value: '75', note: '1.5% × 5,000 leads' },
          { description: 'With full platform', value: '150', note: '3% conversion' },
          { description: 'Incremental enrollments', value: '+75–100/month', note: '' },
          { description: 'Monthly revenue gain', value: '₹75L', note: '100 × ₹75k' },
          { description: 'Annual revenue gain', value: '₹9 Cr', note: '₹75L × 12', highlight: true },
        ],
      },
    ],
    costSavings: [
      { label: 'SEO Spend Reduction', monthly: '₹2–3.6L/month', annual: '₹24–43L', note: '40–60% reduction on ₹5–6L/month spend' },
      { label: 'CPC Optimization', monthly: 'Significant', annual: 'TBD', note: 'Phase 3 demand orchestration; ₹80–100 → ₹40–50 CPC' },
    ],
    totals: [
      { label: 'Revenue Impact', low: '₹3.6 Cr', high: '₹9.0 Cr' },
      { label: 'Cost Savings', low: '₹0.24 Cr', high: '₹0.43 Cr' },
      { label: 'Total Annual Impact', low: '₹3.84 Cr', high: '₹9.43 Cr', bold: true },
    ],
    phaseValidation: [
      { phase: 'Phase 1', incremental: '+20 enrollments/month', monthly: '₹10–15L', annual: '₹1.2–1.8 Cr' },
      { phase: 'Phase 2', incremental: '+40–50 enrollments/month', monthly: '₹20–37.5L', annual: '₹2.4–4.5 Cr' },
      { phase: 'Phase 3', incremental: '+60–75 enrollments/month', monthly: '₹30–56L', annual: '₹3.6–6.72 Cr' },
    ],
  },
];
