export interface REASlide {
  id: number;
  type: 'cover' | 'track-record' | 'platform-capabilities' | 'analytics' | 'approach' | 'rea-usecases' | 'rea-verticals' | 'next-steps' | 'discussion';
  title: string;
  subtitle?: string;
  content?: any;
}

export const reaSlides: REASlide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Enabling the Next Phase of Digital & AI-Led Scale at REA India',
    subtitle: 'Context & Intent',
    content: {
      recipient: 'Vikas Wadhawan',
      recipientTitle: 'CFO, REA India',
      points: [
        'REA India is at a scale inflection point',
        'Strong consumer traffic + monetisation engine',
        'Next value unlock is AI-led efficiency, conversion & speed',
      ],
      objective: 'Explore where proven platforms & accelerators can move core KPIs',
      speakerNote: "This isn't a generic AI pitch. I've built large-scale transformations before. Let me show you what we've done, what platforms we've built, and how we can apply that to REA.",
    },
  },
  {
    id: 2,
    type: 'track-record',
    title: 'Proven Track Record — Large-Scale Digital Transformations',
    subtitle: 'Manufacturing Enterprise · ₹2,000+ Cr Revenue',
    content: {
      scope: '7 major use cases · Pan-India · Millions of transactions · Multi-system integration',
      pillars: [
        {
          label: 'Customer & Service',
          items: [
            { metric: '2.08 Cr+', detail: 'Customer records unified with Universal ID' },
            { metric: '10,000+', detail: 'Service technicians tracked in real-time' },
            { metric: '20%+', detail: 'Duplicate records eliminated' },
          ],
        },
        {
          label: 'Core Systems & Growth',
          items: [
            { metric: '₹1 Cr', detail: 'Annual recurring savings from ERP optimization' },
            { metric: 'Zero', detail: 'Unscheduled downtime post-optimization' },
            { metric: 'D2C', detail: 'End-to-end subscription & lifecycle platform' },
          ],
        },
        {
          label: 'Supply Chain Control',
          items: [
            { metric: 'E2E', detail: 'Factory → Warehouse → Distributor visibility' },
            { metric: 'Real-time', detail: 'Exception alerts & dashboards' },
            { metric: 'QR Auth', detail: 'Product authenticity at point of sale' },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    type: 'platform-capabilities',
    title: 'Platform Capabilities — AI Agents & Conversion',
    subtitle: 'Where ROI is clearest — tailored to your workflows',
    content: {
      capabilities: [
        {
          icon: 'target',
          title: 'AI Lead Qualification & Routing',
          description: 'Conversational qualification via WhatsApp & web. Intent-based routing. Automated follow-ups.',
          metrics: ['20-30% conversion lift', '40% less manual follow-up'],
          color: 'blue',
        },
        {
          icon: 'headset',
          title: 'Customer Support Automation',
          description: '24/7 conversational support. Multi-channel (WhatsApp, web, voice). System integration.',
          metrics: ['60%+ query deflection', '15%+ conversion rates'],
          color: 'emerald',
        },
        {
          icon: 'settings',
          title: 'Internal Ops Automation',
          description: 'Finance: Invoice processing, reconciliation. HR: CV screening, scheduling. GPT analytics.',
          metrics: ['30-50% manual work reduction', '50% faster processing'],
          color: 'violet',
        },
        {
          icon: 'users',
          title: 'Sales Enablement (RM Copilot)',
          description: 'AI assistant for sales teams. Auto proposals. Real-time market insights. Performance coaching.',
          metrics: ['10x coverage per agent', '15-20% conversion uplift'],
          color: 'amber',
        },
      ],
    },
  },
  {
    id: 4,
    type: 'analytics',
    title: 'Analytics Platform — Business Intelligence',
    subtitle: 'GPT-powered conversational analytics for distribution & operations',
    content: {
      features: [
        { title: 'Natural Language Queries', example: '"Show top 10 distributors by AUM in Q4 2024"' },
        { title: 'Dynamic Filtering', example: 'Multi-dimensional filters, range queries, complex logic' },
        { title: 'Predictive Analytics', example: 'Churn prediction, AUM growth forecasting' },
        { title: 'Anomaly Detection', example: 'Unusual rates, data quality flags' },
        { title: 'What-If Analysis', example: 'Scenario modeling & impact analysis' },
      ],
      results: [
        'Days of analysis → Seconds of queries',
        'Real-time business intelligence',
        'Automated insights generation',
        '100% audit trail',
      ],
    },
  },
  {
    id: 5,
    type: 'approach',
    title: 'Our Approach — Business-Centric Transformations',
    subtitle: 'Proven methodology anchored to business outcomes',
    content: {
      principles: [
        {
          title: 'Business Outcomes First',
          detail: 'Every solution measured on conversion, CAC, ops cost, revenue',
          icon: 'trending-up',
        },
        {
          title: 'Platform + Accelerators',
          detail: 'Reusable platforms. 6-12 weeks vs 3-4 months time-to-value',
          icon: 'zap',
        },
        {
          title: 'Enterprise Integration',
          detail: 'Works with SAP, CRM, HRIS. No forced rip-and-replace',
          icon: 'puzzle',
        },
      ],
      proven: [
        '30-50% manual work reduction',
        '15%+ conversion lift',
        '40-50% CAC reduction',
        '60%+ support deflection',
        'Days → Seconds analytics',
      ],
    },
  },
  {
    id: 6,
    type: 'rea-usecases',
    title: 'What We Can Do for REA India',
    subtitle: 'Applying proven platforms & accelerators to your workflows',
    content: {
      useCases: [
        {
          title: 'Lead Qualification & Conversion',
          platform: 'AI Agent Platform',
          forREA: 'Buyer intent, automated routing, CRM integration',
          impact: ['20-30% conversion lift', '40% faster sales cycle'],
          color: 'blue',
        },
        {
          title: 'Customer Support Automation',
          platform: 'AI Agent Platform',
          forREA: 'Buyer queries, developer support, property inquiries',
          impact: ['60%+ deflection', '24/7 availability'],
          color: 'emerald',
        },
        {
          title: 'Sales Enablement',
          platform: 'RM Copilot',
          forREA: 'Agent enablement, proposal generation, market insights',
          impact: ['10x agent coverage', '↑ ARPU via data-led upsell'],
          color: 'amber',
        },
        {
          title: 'Operations Analytics',
          platform: 'Analytics Platform',
          forREA: 'Developer performance, listing analytics, revenue trends',
          impact: ['Days → Seconds', 'Automated insights'],
          color: 'violet',
        },
        {
          title: 'Internal Ops Automation',
          platform: 'Custom Solution',
          forREA: 'Invoice processing, payment reconciliation, HR workflows',
          impact: ['30-50% cost reduction', '50% faster processing'],
          color: 'slate',
        },
      ],
    },
  },
  {
    id: 7,
    type: 'rea-verticals',
    title: 'Areas Where We Can Help REA',
    subtitle: 'Specific verticals & use cases — based on proven platforms',
    content: {
      verticals: [
        {
          title: 'Customer Acquisition & Conversion',
          items: ['Lead qualification & routing', 'Conversational onboarding', 'Intent-based matching'],
          impact: '15%+ conversion lift · 40-50% CAC reduction',
        },
        {
          title: 'Customer Support & Operations',
          items: ['24/7 support automation', 'Multi-channel (WhatsApp, web, voice)', 'Knowledge base integration'],
          impact: '60%+ deflection · Reduced ops cost',
        },
        {
          title: 'Sales Enablement & Productivity',
          items: ['Agent/developer enablement', 'Auto proposals & market insights', 'Performance analytics'],
          impact: '10x coverage per agent · 15-20% conversion uplift',
        },
        {
          title: 'BI & Analytics',
          items: ['GPT-powered conversational analytics', 'Real-time insights from operational data', 'Natural language queries'],
          impact: 'Days → Seconds · Automated insights',
        },
        {
          title: 'Internal Ops Automation',
          items: ['Finance: Invoicing, reconciliation', 'HR: Screening, scheduling', 'Multi-system connectivity'],
          impact: '30-50% manual work reduction · 50% faster',
        },
      ],
      focus: 'Business transformation metrics first — conversion, CAC, ops cost, speed.',
    },
  },
  {
    id: 8,
    type: 'next-steps',
    title: 'Next Steps — Let\'s Identify Specific Use Cases',
    subtitle: 'Results in weeks, continuous optimization',
    content: {
      phases: [
        { step: 1, title: 'Discovery Session', timeline: '1-2 weeks', detail: 'Pain points, 2-3 high-ROI use cases, success metrics' },
        { step: 2, title: 'Quick Start', timeline: '2-4 weeks', detail: 'POC for selected use case, baseline measurement' },
        { step: 3, title: 'Production Rollout', timeline: '4-8 weeks', detail: 'Scale to production, GCC team enablement' },
        { step: 4, title: 'Expansion', timeline: 'Ongoing', detail: 'Adjacent workflows, multi-use case platform' },
      ],
      contact: {
        name: 'Shubham Srivastava',
        title: 'Founder & CEO, DiscvrAI',
        email: 'shubham@discvr.ai',
        phone: '+91-9873961591',
      },
    },
  },
  {
    id: 9,
    type: 'discussion',
    title: 'Open Discussion',
    subtitle: 'Let\'s align on specific use cases',
    content: {
      questions: [
        'Which vertical has the biggest impact on business metrics right now?',
        'What specific use case would you like us to start with?',
        'What business metrics matter most — conversion, CAC, ops cost, speed?',
      ],
      timeline: [
        { week: 'This Week', action: 'Share specific use case(s) and business metrics' },
        { week: 'Next Week', action: 'Discovery session to map use case to platform' },
        { week: 'Week 3-4', action: 'Proof-of-concept deployment' },
        { week: 'Week 5-6', action: 'Results review and production rollout plan' },
      ],
      contact: {
        name: 'Shubham Srivastava',
        phone: '+91-9873961591',
        email: 'shubham@discvr.ai',
      },
    },
  },
];

export const totalREASlides = reaSlides.length;
