export interface AptechPostSalesSlide {
  id: number;
  type: string;
  title: string;
  [key: string]: any;
}

export const aptechPostSalesSlides: AptechPostSalesSlide[] = [
  {
    id: 1,
    type: 'ps-cover',
    title: 'Cover',
    headline: 'Aptech Post-Sales Enablement',
    subheadline: 'From Enrollment to Completion — One Platform, One Interface',
    tagline: '',
    presenter: 'Shubham Srivastava & Ramji Tripathi',
    audience: 'Sandip Weling, Chief Business Officer',
    date: 'February 2026',
    confidential: 'Confidential — For Internal Discussion Only',
  },
  {
    id: 2,
    type: 'ps-problem-statement',
    title: 'Problem Statement',
    headline: 'In a Franchise Ecosystem, Counselling-to-Onboarding Relevance Is Low — Or a Miss Altogether',
    context: 'Multi-brand vocational education (Arena, MAAC, LAPA, Lakmé Academy) through a large franchise centre network. Business outcomes — enrolment quality, early attendance, accrual leakage, course completion — are strongly influenced by the counselling-to-onboarding process.',
    coreIssue: '"In a franchise ecosystem with diverse perspectives and quality of manpower, relevance of this process is low, if not a miss altogether."',
    impact: 'Dropout cost ₹25–30 Cr across brands; no standardised experience post-enrolment; fees and retention not systematically managed; no structured Lost Customer or predictive view.',
    whatAptechWants: 'One agentic solution from enquiry through enrolment, onboarding, early stabilisation (0–90 days), fees collection, retention, and query handling — augmenting counsellors, not replacing them (first 2 phases).',
  },
  {
    id: 3,
    type: 'ps-presales-recap',
    title: 'Where We Left Off — Pre-Sales',
    headline: 'Pre-Sales (Already Proposed): Discovery → Engagement → Transaction',
    recapRows: [
      { stage: 'Discovery', proposed: 'AI Career Counsellor, Lead ID, intent scoring', outcome: 'Qualified leads, attribution' },
      { stage: 'Engagement', proposed: 'Voice enrichment (15–30 min), WhatsApp, Center Enablement', outcome: 'Faster response, counselor context' },
      { stage: 'Transaction', proposed: 'Payment-enabled enrollment', outcome: 'Conversion 1% → 2–2.5%, funnel visibility' },
    ],
    gap: 'Enrollment is only the start. Post-sales closes the loop: Day 0 to completion (onboarding, retention, fees, query, predictive, recommendation) on the same platform and same Lead ID.',
  },
  {
    id: 4,
    type: 'ps-solution',
    title: 'Solution — One Platform, Full Lifecycle',
    headline: 'Same Student, Same Thread: One Conversational Interface (WhatsApp or Embedded Chat)',
    preSalesSteps: ['Enquiry', 'Counselling', 'Course Selection', 'Fee Payment', 'Enrolment'],
    postSalesSteps: ['Induction (Day 0–7)', 'Session Touchpoints & Triggers (Day 8–90)', 'Retention Score', 'Fees Reminders', 'Query Resolution', 'Post-Course Recommendation'],
    futureSteps: ['At-Risk List', 'Lost Customer Survey'],
    interfaceNote: 'Student sees one WhatsApp thread (or one chat on site/ProConnect). Multiple agents (onboarding, fees, query, recommendation) respond by context; we plug into existing applications.',
  },
  {
    id: 5,
    type: 'ps-agents-dashboards',
    title: 'What We Build — Agents + Dashboards',
    headline: 'What We Deliver — No Duplication of Touchpoints',
    agents: [
      { code: 'A5', name: 'Induction + Touchpoints + Triggers', desc: 'Day 0–7 messages, session check-ins, trigger-driven "We missed you" / faculty change' },
      { code: 'A6', name: 'Fees', desc: 'Reminders, payment link, overdue escalation' },
      { code: 'A7', name: 'Query', desc: 'FAQ, escalation, ticket log' },
      { code: 'A9', name: 'Post-Course Recommendation', desc: '"Recommended for you" — next course, workshop, upskill in same thread' },
    ],
    dashboards: [
      { code: 'I4', name: 'Onboarding / Retention', desc: 'Queue by session, retention score, "who to call first"' },
      { code: 'I5', name: 'Fees', desc: 'Due/overdue list, collection rate' },
      { code: 'I6', name: 'Predictive', desc: 'At-risk list, upgrade-ready, Lost Customer reasons' },
    ],
  },
  {
    id: 6,
    type: 'ps-triggers',
    title: 'Triggers — When We Act',
    headline: 'Org-Level Triggers; We Run the Sub-Routines',
    triggers: [
      { event: '2 consecutive absences', action: '"We missed you" message (+ optional voice); student in counsellor attention queue' },
      { event: 'Every 4th session (or 2 absences)', action: 'Short satisfaction survey (e.g. 1–5 + "Any block?")' },
      { event: 'Faculty / module change', action: 'Continuity message + optional sentiment check' },
      { event: 'Fee overdue (e.g. 7 days)', action: 'Escalation message; optional assign to counsellor' },
    ],
    buildNote: 'Configurable from events (Aptrack 2.0, ProConnect). Aptech defines rules; we execute message / survey / escalate.',
  },
  {
    id: 7,
    type: 'ps-who-sees-what',
    title: 'Who Sees What',
    headline: 'Right Information for Each Role',
    personas: [
      { who: 'Student', icon: 'user', sees: ['One WhatsApp/chat: induction, triggers, fees, query reply, recommendations'] },
      { who: 'Counsellor', icon: 'headset', sees: ['Center Enablement (Lead Card)', 'Onboarding queue (I4)', 'Fees (I5)', 'Query tickets', 'At-risk list (I6)'] },
      { who: 'Internal Heads', icon: 'building', sees: ['Attribution', 'Onboarding/retention metrics', 'Collection rate', 'At-risk + Lost Customer', 'Recommendation uptake'] },
    ],
    message: '',
  },
  {
    id: 8,
    type: 'ps-timeline-investment',
    title: 'Timeline & Investment',
    headline: 'First Value in 4–8 Weeks; Full 2A+2B in 20–24 Weeks',
    milestones: [
      { milestone: 'Scope & design', timeline: '2 weeks' },
      { milestone: 'First pilot (induction + 2–3 triggers)', timeline: '4–8 weeks' },
      { milestone: 'Full 2A (triggers, survey, reconnect, I4)', timeline: '10–12 weeks' },
      { milestone: 'Full 2A + 2B (retention, fees, query, I5)', timeline: '16–20 weeks' },
      { milestone: 'Stage 3 (predictive, Lost Customer, recommendation)', timeline: 'Later; after ~9 months data' },
    ],
    investmentRows: [
      { stage: 'Post-Sales Platform (One-Time)', oneTime: '₹65L', isTotal: true },
    ],
    recurring: '₹2L/month + cloud infrastructure charges.',
    note: 'Final numbers after scope sign-off. Cloud charges based on usage (WhatsApp, voice, hosting).',
  },
  {
    id: 9,
    type: 'ps-demo',
    title: 'Demo — One Thread, Full Journey',
    headline: 'What You\'ll See: One Conversational Thread, Every Capability',
    message: 'We\'ll show one WhatsApp (or chat) thread covering: qualification → enrichment → induction → session touch → "2 absences" trigger → satisfaction survey → fee reminder → student query → post-course recommendation. Same interface; multiple agents behind the scenes.',
    capabilities: ['Qualification', 'Enrichment', 'Induction', 'Trigger', 'Survey', 'Fees', 'Query', 'Recommendation'],
  },
  {
    id: 10,
    type: 'ps-next-steps',
    title: 'Next Steps',
    headline: 'Align Scope, Then Proposal',
    steps: [
      'Review requirements doc (Easo\'s) — map to our agents/dashboards; in/out of scope',
      'Aptrack 2.0 & ProConnect session — APIs/events, stability',
      'Trigger workshop — org-level triggers and sub-routines',
      'Scope sign-off — one-page summary',
      'We send SOW with final cost and timeline',
      'Kick-off after PO/contract',
    ],
  },
];
