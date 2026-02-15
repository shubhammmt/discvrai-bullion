import { Globe, AlertTriangle, ShieldAlert, Layers, TrendingUp, Building2, Handshake, HelpCircle, User, ArrowRight } from 'lucide-react';

export interface ParisRegionSlide {
  id: number;
  type: 'cover' | 'context' | 'problem' | 'barriers' | 'approach' | 'outcomes' | 'value' | 'pathways' | 'discussion' | 'about' | 'next-steps';
  title: string;
  subtitle?: string;
  icon: any;
  bullets?: string[];
  framingLanguage?: string;
  metrics?: { label: string; value: string }[];
  questions?: string[];
  founderInfo?: {
    name: string;
    role: string;
    experience: string[];
    contact: { phone: string; email: string };
  };
  nextSteps?: { phase: string; action: string }[];
}

export const parisRegionSlides: ParisRegionSlide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'India-France AI Corridor',
    subtitle: 'Enabling Enterprise Transformation',
    icon: Globe,
    framingLanguage: 'Strategic Context Brief for Axel Guyon, Choose Paris Region',
  },
  {
    id: 2,
    type: 'context',
    title: 'India-France AI Corridor: Enabling Enterprise Transformation',
    icon: Globe,
    bullets: [
      'Paris Region is positioning itself as a global AI innovation hub',
      'Indian enterprises are scaling globally and need transformation capabilities',
      'The gap: Moving from AI experimentation to production-grade deployment',
      'DiscvrAI bridges this gap through enterprise AI operationalization',
    ],
    framingLanguage: 'This conversation explores how DiscvrAI can contribute to Paris Region\'s enterprise AI ecosystem—not as a vendor, but as a transformation partner that strengthens the region\'s industrial modernization agenda.',
  },
  {
    id: 3,
    type: 'problem',
    title: 'The Implementation Gap',
    subtitle: 'Why 95% of AI Pilots Never Reach Production',
    icon: AlertTriangle,
    bullets: [
      'Pilot Purgatory: Most AI projects remain in proof-of-concept stage',
      'Legacy Integration Friction: Advanced AI models struggle with existing enterprise systems',
      'Governance Gaps: EU enterprises need compliance-first AI (GDPR, AI Act alignment)',
      'ROI Attribution Challenges: CFOs need measurable impact, not statistical promises',
      'Execution Leakage: Manual processes persist despite AI investments',
    ],
    framingLanguage: 'Paris Region enterprises face the same challenge: world-class AI research exists, but operationalizing it within existing industrial and financial systems requires a different capability.',
  },
  {
    id: 4,
    type: 'barriers',
    title: 'The Three Barriers to AI Operationalization',
    icon: ShieldAlert,
    bullets: [
      'Digitization Gaps: Core workflows remain manual, creating data silos',
      'Governance Risk: EU regulations (GDPR, AI Act) require audit-ready AI systems',
      'Execution Leakage: Periodic reviews become bottlenecks; real-time decision systems are missing',
      'Integration Complexity: Legacy ERP/CRM systems resist modern AI integration',
      'Scale Constraints: Manual processes limit growth even as demand increases',
    ],
    framingLanguage: 'These aren\'t technology problems—they\'re operational transformation challenges. Paris Region enterprises need solutions that respect existing infrastructure while enabling AI-driven modernization.',
  },
  {
    id: 5,
    type: 'approach',
    title: 'From Day-0 Digitization to Decision-Grade Systems',
    icon: Layers,
    bullets: [
      'Day-0 Digitization: Convert manual workflows into structured, AI-ready processes',
      'Agentic Workflow Embedding: Deploy intelligent agents that execute multi-step operations autonomously',
      'Decision-Grade Systems: Transform periodic reviews into real-time decision engines',
      'Governance-First Architecture: Built-in compliance, audit trails, EU-aligned guardrails',
      'Non-Invasive Integration: Works with existing SAP, CRM, ERP—no rip-and-replace',
    ],
    framingLanguage: 'We don\'t replace your systems. We enable them with AI intelligence, ensuring governance and compliance from day one—critical for EU market requirements.',
  },
  {
    id: 6,
    type: 'outcomes',
    title: 'Measurable Impact: Operational Predictability & Governance',
    icon: TrendingUp,
    metrics: [
      { label: 'Reduction in Manual Ops', value: '30–50%' },
      { label: 'Logistics Cost Reduction', value: '30%' },
      { label: 'Faster Processing', value: '50%' },
      { label: 'Conversion Improvement', value: '15–20%' },
      { label: 'Audit Trail Compliance', value: '100%' },
      { label: 'Growth Capacity', value: '10–20×' },
    ],
    framingLanguage: 'These aren\'t pilot results—these are production deployments at ₹2,000+ Cr enterprises. The same capability can serve Paris Region\'s industrial and financial services enterprises.',
  },
  {
    id: 7,
    type: 'value',
    title: 'Strengthening Paris Region\'s Enterprise AI Credibility',
    icon: Building2,
    bullets: [
      'Industrial Modernization: Enable legacy enterprises to modernize without disruption',
      'Global Positioning: Demonstrate Paris Region enterprises can operationalize AI at scale',
      'India-France Corridor: Bridge Indian transformation expertise with French enterprise needs',
      'Compliance Leadership: Showcase governance-first AI aligned with EU regulations',
      'Ecosystem Enablement: Support Paris Region\'s enterprise transformation programs',
    ],
    framingLanguage: 'Paris Region has world-class AI research. DiscvrAI adds the operationalization layer that transforms research into enterprise capability—strengthening the region\'s competitive positioning.',
  },
  {
    id: 8,
    type: 'pathways',
    title: 'Partnership Opportunities: Soft Landing & Enterprise Enablement',
    icon: Handshake,
    bullets: [
      'Soft Landing Support: Leverage Choose Paris Region\'s network for market entry & enterprise introductions',
      'Enterprise Partnerships: Direct collaboration with Paris Region enterprises on transformation initiatives',
      'Ecosystem Programs: Participate in innovation programs, co-innovation initiatives',
      'Co-Innovation: Joint development of EU-compliant AI solutions for regulated industries',
      'Knowledge Exchange: Share transformation frameworks and best practices',
    ],
    framingLanguage: 'We\'re exploring how Choose Paris Region can facilitate connections with enterprises ready for AI operationalization, and how we can contribute to the region\'s transformation agenda.',
  },
  {
    id: 9,
    type: 'discussion',
    title: 'Questions for Choose Paris Region',
    icon: HelpCircle,
    questions: [
      'How is the Paris Region positioning itself in enterprise AI transformation?',
      'Which industries/sectors are priority for modernization initiatives?',
      'What support mechanisms exist for international companies entering the French market?',
      'Are there specific enterprise transformation programs where DiscvrAI could contribute?',
      'How can we align with France\'s AI strategy and EU regulatory framework?',
    ],
    framingLanguage: 'We\'re here to listen and learn. Understanding your priorities will help us identify where DiscvrAI can add value to Paris Region\'s ecosystem agenda.',
  },
  {
    id: 10,
    type: 'about',
    title: 'Enterprise AI Transformation Partner',
    icon: User,
    founderInfo: {
      name: 'Shubham Srivastava',
      role: 'Founder & CEO',
      experience: [
        'CIO at Eureka Forbes (Listed, $1B+ Valuation, $250M+ Revenue)',
        'CTO at Hindustan Times (India\'s biggest digital media company)',
        'Head of Technology at MakeMyTrip (Nasdaq-listed OTA, $5B+ Valuation)',
      ],
      contact: { phone: '+91-9873961541', email: 'shubham@discvr.ai' },
    },
    bullets: [
      'Focus: Operational intelligence, execution control, governed AI',
      'Clients: Industrial enterprises, infrastructure operators, financial services (₹500+ Cr revenue)',
      'Approach: Platform-led, outcome-based, governance-first',
      'Global Reach: India-based, expanding to European markets',
    ],
    framingLanguage: 'We\'re operators who understand enterprise transformation. Our focus is on measurable business outcomes, not technology for its own sake.',
  },
  {
    id: 11,
    type: 'next-steps',
    title: 'Exploring Alignment & Partnership Opportunities',
    icon: ArrowRight,
    nextSteps: [
      { phase: 'Immediate', action: 'Understand Paris Region\'s priorities and enterprise needs' },
      { phase: 'Short-term', action: 'Identify specific partnership pathways and entry vectors' },
      { phase: 'Medium-term', action: 'Explore soft landing support and enterprise introductions' },
      { phase: 'Long-term', action: 'Build sustainable partnerships that strengthen Paris Region\'s AI positioning' },
    ],
    framingLanguage: 'We\'re committed to a long-term partnership approach. This meeting helps us understand how to align our capabilities with Paris Region\'s strategic objectives.',
  },
];
