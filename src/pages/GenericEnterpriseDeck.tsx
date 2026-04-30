import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Link2, Brain, Workflow, BarChart3, Shield, Zap, Users, ArrowRight, Target, Factory, Landmark, HardHat, ShoppingCart, TrendingUp, Bot, Mail, Phone, Truck, Warehouse, PackageSearch, Activity, Gauge, Wrench, Database, Cpu, LayoutDashboard, CheckCircle2, AlertTriangle } from 'lucide-react';

const TOTAL = 13;
const ACCENT = '#0F766E';

const slides = [
  {
    id: 1,
    type: 'title',
    headline: 'Enterprise AI that works where your data already lives — workflow automation, governed knowledge, and agentic orchestration across industries',
    subhead: 'Integration-first platform: connectors to SAP, Salesforce, ERPs, field systems; RAG over internal knowledge; multi-LLM routing; human-in-the-loop orchestration — edge intelligence, not rip-and-replace.',
    microLine: 'BFSI · Manufacturing · Industrial · EPC & Infrastructure · D2C Commerce · Energy & Utilities',
  },
  {
    id: 2,
    type: 'why-now',
    title: 'Every enterprise has the same structural problem — systems of record that can\'t become systems of decision',
    bullets: [
      { icon: Landmark, label: 'BFSI', text: 'Core banking, treasury, compliance, and customer platforms generate massive data — but insights are rebuilt manually in spreadsheets every quarter. Regulatory pressure demands audit trails; GenAI without governance is a non-starter.' },
      { icon: Factory, label: 'Manufacturing & Industrial', text: 'Shop-floor controllers, MES, ERP, and quality systems run in silos. Production visibility is shift-delayed, maintenance is reactive, and institutional knowledge lives in people\'s heads — not searchable systems.' },
      { icon: HardHat, label: 'EPC & Infrastructure', text: 'Project tracking across BOQ, vendor milestones, cost variance, and site progress relies on fragmented reports. Delays surface at reviews, not in real-time. Safety and compliance documentation is scattered across drives.' },
      { icon: ShoppingCart, label: 'D2C & Commerce', text: 'Customer data, inventory, marketing, and fulfilment run on disconnected stacks. Personalisation is rule-based, not intelligent. Cart abandonment, retention, and demand forecasting remain Excel exercises.' },
    ],
  },
  {
    id: 3,
    type: 'capabilities',
    title: 'What DiscvrAI ships — capabilities across every vertical',
    cards: [
      { icon: Link2, title: 'Connect & integrate', desc: 'Pre-built connectors for SAP, Salesforce, Tally, Oracle, SCADA, MES, Shopify, payment gateways, core banking — meet data where it lives without forced migration.' },
      { icon: Brain, title: 'Understand (RAG)', desc: 'SOPs, compliance manuals, engineering drawings, product catalogues, policy documents — grounded answers with citations, role-based access, full audit trail.' },
      { icon: Workflow, title: 'Automate & orchestrate', desc: 'Multi-step agentic workflows: approvals, escalations, exception handling, order routing, compliance checks — humans approve material actions, every time.' },
      { icon: BarChart3, title: 'Measure & decide', desc: 'Decision-ready dashboards: production KPIs, financial reconciliation, project cost tracking, customer LTV, funnel analytics — signal → decision → action.' },
      { icon: Bot, title: 'Agentic commerce', desc: 'AI agents for catalogue management, dynamic pricing, personalised recommendations, inventory rebalancing, and automated customer journeys — commerce that acts, not just reports.' },
      { icon: TrendingUp, title: 'Agentic analytics', desc: 'Self-serve insights: natural language queries over enterprise data, automated anomaly detection, predictive models for demand/churn/maintenance — answers in seconds, not weeks.' },
    ],
    closing: 'Enterprise-grade stack — connectors, model routing, workflow engine, agentic capabilities — weeks-to-pilot engineering discipline.',
  },
  {
    id: 4,
    type: 'gap',
    title: 'The gap between systems of record and systems of decision — across industries',
    diagram: ['Enterprise systems (ERP, CRM, MES, Core Banking, Shopify)', 'DiscvrAI (connect · understand · automate · measure · act)', 'Outcomes (faster decisions, lower costs, higher revenue)'],
    table: [
      { reality: 'BFSI: Core banking + treasury + compliance engines', breaks: 'Reconciliation is manual; regulatory reporting takes weeks; customer insights lag by quarters', adds: 'Automated reconciliation, real-time compliance dashboards, AI-driven customer intelligence' },
      { reality: 'Manufacturing: ERP + MES + shop-floor SCADA', breaks: 'Production visibility is shift-delayed; maintenance is reactive; quality data is siloed', adds: 'Real-time production command centre, predictive maintenance, automated quality tracking' },
      { reality: 'EPC: Project tools + BOQ + vendor systems', breaks: 'Cost overruns surface at reviews; milestone tracking is fragmented across Excel', adds: 'Live project dashboards, automated vendor milestone tracking, early exception alerts' },
      { reality: 'D2C: Shopify/WooCommerce + CRM + marketing tools', breaks: 'Personalisation is rule-based; inventory and demand planning in spreadsheets', adds: 'Agentic commerce: dynamic pricing, AI recommendations, automated inventory rebalancing' },
    ],
  },
  {
    id: 5,
    type: 'clients',
    title: 'Selected references — across industries and complexity levels',
    rows: [
      { client: 'Bajaj Finserv', domain: 'BFSI / NBFC', useCase: 'AI transformation, digital lending journeys, collections intelligence' },
      { client: 'CAMS', domain: 'BFSI / AMC Services', useCase: 'Distribution analytics, fund operations intelligence' },
      { client: 'CMS Infosystems', domain: 'BFSI / Cash Logistics', useCase: 'Margin leakage recovery, operations intelligence, route optimisation' },
      { client: 'Bajaj Electricals', domain: 'Manufacturing', useCase: 'Supply chain analytics, operations intelligence, demand planning' },
      { client: 'ADF Foods', domain: 'Manufacturing / FMCG', useCase: 'CEO sales dashboard, production analytics, MIS automation' },
      { client: 'Dalmia Tech', domain: 'Industrial / Cement', useCase: 'Digital transformation, manufacturing operations intelligence' },
      { client: 'Deep Industries', domain: 'Oil & Gas / EPC', useCase: 'Field operations analytics, asset reliability, service orchestration' },
      { client: 'Drychem', domain: 'Manufacturing', useCase: 'Operations analytics, production optimisation' },
      { client: 'Aptech', domain: 'Education / D2C', useCase: 'AI career counsellor, enrollment funnel, student engagement' },
      { client: 'Helios AMC', domain: 'BFSI / Asset Management', useCase: 'Fund analytics, distribution intelligence' },
    ],
    footnote: 'Cross-industry experience across BFSI, manufacturing, industrial, EPC, and D2C — patterns and accelerators that transfer across verticals.',
  },
  {
    id: 6,
    type: 'patterns',
    title: 'Industry patterns — prototypes and demos available on request',
    grid: [
      { pattern: 'Financial reconciliation & compliance', desc: 'Automated multi-way matching, regulatory reporting, audit trail generation — reduce manual reconciliation by 60–80% across banking, NBFC, and AMC operations.' },
      { pattern: 'Production & shop-floor intelligence', desc: 'Real-time tracking of machining, assembly, quality gates — predictive maintenance, job sequencing, machine utilisation — 15–25% downtime reduction.' },
      { pattern: 'Project command centre (EPC)', desc: 'Live cost tracking, vendor milestones, safety compliance, site progress — from delayed Excel reports to real-time project dashboards with automated escalations.' },
      { pattern: 'Agentic commerce & CX', desc: 'AI-driven catalogue management, dynamic pricing, personalised recommendations, automated customer journeys — commerce that acts autonomously within guardrails.' },
      { pattern: 'Enterprise knowledge (RAG)', desc: 'SOPs, compliance docs, product specs, engineering drawings — searchable, citable, governed access — institutional knowledge that doesn\'t walk out the door.' },
      { pattern: 'Agentic analytics & decision intelligence', desc: 'Natural language queries, automated anomaly detection, predictive models — demand forecasting, churn prediction, maintenance scheduling — answers in seconds.' },
    ],
  },
  {
    id: 7,
    type: 'lifecycle',
    title: 'One platform spine — across verticals, use cases, and complexity levels',
    bullets: [
      { label: 'Shared foundation', text: 'Identity, roles, audit logs, data residency — one governance spine across all business units and compliance requirements. Deploy on-prem, private cloud, or hybrid.' },
      { label: 'BFSI', text: 'Reconciliation automation, compliance intelligence, customer analytics, lending workflows, collections optimisation — audit-ready from day one.' },
      { label: 'Manufacturing & Industrial', text: 'Production planning, shop-floor visibility, predictive maintenance, supply chain command, quality analytics — from shift reports to real-time dashboards.' },
      { label: 'EPC & Infrastructure', text: 'Project cost tracking, vendor milestone automation, safety compliance, BOQ management — exception-first for project leaders and site managers.' },
      { label: 'D2C & Commerce', text: 'Agentic commerce: dynamic pricing, AI recommendations, inventory rebalancing, customer journey automation — plus agentic analytics for demand and churn prediction.' },
      { label: '8–10 week pilot', text: 'One business unit, one end-to-end workflow, KPIs fixed day one. Expand on the same spine once pilot delivers measurable outcomes.' },
    ],
    quote: "Built to be your enterprise's decision intelligence layer — data to dashboards to actions, fast to production, measurable, and architecture-friendly.",
  },
  {
    id: 8,
    type: 'supply-chain',
    title: 'Supply chain transformation — how we enable it',
    intro: 'A decision and execution layer on top of ERP, WMS, TMS, and planning systems — orchestrate exceptions and workflows without rip-and-replace.',
    pillars: [
      { icon: Warehouse, title: 'Warehouse utilisation', points: ['Inbound control & dock scheduling', 'Slotting by velocity, labor planning', 'Exception-driven receiving & put-away', 'KPIs: OTIF, lines/hr, accuracy, headroom'] },
      { icon: PackageSearch, title: 'Supply chain planning', points: ['Unified demand signal across channels', 'Constrained replenishment & policy by service class', 'S&OP / IBP cadence acceleration', 'Scenario & what-if planning'] },
    ],
    panel: {
      label: 'Illustrative / anonymized — command-centre pattern',
      tiles: [
        { k: 'OTIF', v: '94.2%', d: '+1.8 WoW' },
        { k: 'Inbound exceptions', v: '17', d: '6 owners assigned' },
        { k: 'DC capacity headroom', v: '12%', d: 'amber on DC-3' },
        { k: 'Lane cost variance', v: '+4.6%', d: 'vs should-cost' },
      ],
      alerts: ['Supplier S-104 ASN delayed by 9h — reroute window closing', 'DC-3 dock saturation 14:00–18:00 — auto-reslot suggested', 'Lane MUM→BLR fuel surcharge breach — quote refresh'],
    },
    footnote: 'End-to-end visibility (supplier → inbound → DC → outbound → customer), exception-based alerts, orchestrated workflows with owners & SLAs, and a financial lens (working capital, cost-to-serve).',
  },
  {
    id: 9,
    type: 'predictive',
    title: 'Predictive analytics for heavy equipment — what is possible for metals & mining',
    outcomes: [
      { icon: Wrench, title: 'Predictive maintenance', text: 'Failure-risk scoring, RUL proxies, vibration/temp/current anomaly detection — interventions planned, not reactive.' },
      { icon: Gauge, title: 'Reliability & OEE', text: 'Lower unplanned downtime, better spares planning, safer interventions, sustained throughput.' },
      { icon: Activity, title: 'Energy & process', text: 'Energy-intensity deviation alerts, drift detection on key process variables across sites.' },
    ],
    architecture: [
      { icon: Database, label: 'Sensors · SCADA · MES · EAM' },
      { icon: Cpu, label: 'Feature store & signals' },
      { icon: Brain, label: 'Models (risk · anomaly · RUL)' },
      { icon: LayoutDashboard, label: 'Recommendations' },
      { icon: Workflow, label: 'Workflows in command centre' },
    ],
    operating: 'Alert → diagnosis → work order → parts → crew scheduling → feedback loop. Governance for false positives; thresholds tuned by reliability engineering.',
    framing: 'Group-wide framing: common data platform, standard asset hierarchy & KPIs across sites, federated rollout — one spine, many sites.',
  },
  {
    id: 10,
    type: 'vedanta-built',
    title: 'Command Centre — mock demo for Vedanta Aluminium',
    subtitle: 'A working mock of the command centre is attached in the next slides. The following pages walk through the demo screen-by-screen via screenshots.',
    note: 'The slides that follow are screenshots of the mock demo — Executive Command Center, Operations Control Tower, Procurement & Inventory, Commercial Margin Center, Workflow Orchestration and AI Copilot — shown in the order an operator would use them.',
    footer: 'Screenshots to be inserted before the meeting. Outcomes will be claimed only after pilot baselines are agreed.',
  },
  {
    id: 11,
    type: 'partner-at-scale',
    title: 'How we partner at scale',
    subtitle: 'Capability + modus operandi — what you actually get when you bring us in',
    capabilities: [
      { icon: Target, title: 'Strategy & operating model', desc: 'Sharpen the problem, fix KPIs, agree the operating model — before any code is written.' },
      { icon: Brain, title: 'Data & AI engineering', desc: 'Connectors, RAG, model routing, agentic orchestration — built on your stack, with audit trails.' },
      { icon: Workflow, title: 'Product & workflow design', desc: 'Workflows that real operators will actually use — exception-first, role-aware, mobile-ready.' },
      { icon: Shield, title: 'Change & enablement', desc: 'Adoption playbooks, training, governance — so the system survives a leadership change.' },
    ],
    pillars: [
      { icon: Users, title: 'Joint teams, not vendors', desc: 'Mixed pods of your people and ours — knowledge transfers as we build, not after.' },
      { icon: CheckCircle2, title: 'Quality bar', desc: 'CIO-grade engineering discipline: security, observability, reversibility — production-ready by default.' },
      { icon: ArrowRight, title: 'Clear exit path', desc: 'You own the code, the data, the models. We design from day one for you to run it without us.' },
    ],
    flow: ['Your teams', 'DiscvrAI pod', 'Outcomes you own'],
    footer: 'For digitally mature enterprises.',
  },
  {
    id: 12,
    type: 'engagement-models',
    title: 'Engagement models — three ways we can engage',
    subtitle: 'Pick the shape that fits the problem — not the other way around',
    models: [
      {
        name: 'End-to-end transformation',
        definition: 'A multi-quarter program to rewire a business unit or function — strategy, build, change.',
        bestWhen: 'You have a board-level mandate and a real P&L to move; ambiguity is high; multiple workstreams need to land together.',
        differentiators: ['Single accountable pod across strategy + build', 'Operating model + tech delivered together', 'CIO-grade engineering, not slideware'],
        contrast: 'Not a staff-aug bench; not a 6-week pilot in disguise.',
        ttv: '2–3 quarters',
        ownership: 'Joint, then yours',
        shape: 'Outcome-linked',
      },
      {
        name: 'Targeted problem solutions',
        definition: 'A focused 8–12 week build to solve one painful, well-defined problem end-to-end.',
        bestWhen: 'The problem is sharp, the data exists, and you need a working system — not another deck.',
        differentiators: ['Fixed scope, fixed window, fixed KPIs', 'Production-ready, not a prototype', 'Repeatable accelerators (RAG, connectors, agents)'],
        contrast: 'Not a discovery sprint; not a throwaway POC.',
        ttv: '8–12 weeks',
        ownership: 'Yours from day one',
        shape: 'Fixed-fee or milestone',
      },
      {
        name: 'Talent augmentation',
        definition: 'Senior AI / data / product talent embedded into your existing teams under your leadership.',
        bestWhen: 'You already have direction and architecture — you need depth on specific roles to ship faster.',
        differentiators: ['Senior, vetted operators (not juniors)', 'Cultural fit with your engineering bar', 'Flex up or down by quarter'],
        contrast: 'Not a body shop; not commodity rate cards.',
        ttv: 'Weeks',
        ownership: 'Fully yours',
        shape: 'T&M / monthly',
      },
    ],
    howToChoose: 'Mandate is broad → Transformation. Problem is sharp → Targeted solution. Capacity is the gap → Talent augmentation.',
    footer: 'Engagement models — generic module.',
  },
  {
    id: 13,
    type: 'team',
    title: 'Operator-led engineering — pilots with CIO-grade discipline',
    person: {
      name: 'Shubham Srivastava',
      role: 'Founder & CEO, DiscvrAI',
      cred: 'Two decades leading large-scale digital transformation — CIO (Eureka Forbes), CTO (Hindustan Times), Head of Technology (MakeMyTrip). Built and scaled technology organisations across media, travel, manufacturing, and financial services.',
      email: 'shubham@discvr.ai',
      phone: '+91 9873961591',
    },
    bullets: [
      'Built for legacy stacks, fragmented data, and compliance pressure — cross-industry experience across BFSI, manufacturing, industrial, EPC, and D2C.',
      'Repeatable accelerators: connectors, RAG, model routing, orchestration, agentic commerce & analytics — production in weeks, not quarters.',
    ],
    cta: {
      primary: 'Identify one high-impact use case in your business — we build a working pilot in 8–10 weeks on your data, your workflows, your KPIs.',
      secondary: 'Architecture alignment on integration points (ERP, CRM, MES, core banking, commerce platforms) before build commitments.',
    },
  },
];

const SlideWrapper: React.FC<{ children: React.ReactNode; num: number }> = ({ children, num }) => (
  <div className="w-full h-screen flex flex-col relative overflow-hidden bg-white">
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}88, ${ACCENT})` }} />
    <div className="absolute top-5 left-8 z-20 flex items-center gap-2">
      <Zap className="w-5 h-5" style={{ color: ACCENT }} />
      <span className="text-base font-bold tracking-tight text-slate-800">DiscvrAI</span>
    </div>
    <div className="flex-1 relative z-10 px-12 pt-16 pb-16 flex flex-col overflow-hidden" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      {children}
    </div>
    <div className="absolute bottom-0 left-0 right-0 px-12 pb-3 flex justify-between items-center text-xs text-slate-400">
      <span>Confidential | DiscvrAI | April 2026</span>
      <span className="font-mono">{String(num).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}40, transparent)` }} />
  </div>
);

const TitleSlideContent: React.FC = () => {
  const s = slides[0] as any;
  return (
    <SlideWrapper num={1}>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">{s.headline}</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mb-8">{s.subhead}</p>
        <p className="text-sm text-slate-400">{s.microLine}</p>
      </div>
    </SlideWrapper>
  );
};

const WhyNowSlide: React.FC = () => {
  const s = slides[1] as any;
  return (
    <SlideWrapper num={2}>
      <h2 className="text-3xl font-bold text-slate-900 mb-8">{s.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
        {s.bullets.map((b: any, i: number) => {
          const Icon = b.icon;
          return (
            <div key={i} className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}18` }}>
                  <Icon className="w-5 h-5" style={{ color: ACCENT }} />
                </div>
                <span className="font-bold text-slate-900 text-lg">{b.label}</span>
              </div>
              <p className="text-slate-600 text-base leading-relaxed">{b.text}</p>
            </div>
          );
        })}
      </div>
    </SlideWrapper>
  );
};

const CapabilitiesSlide: React.FC = () => {
  const s = slides[2] as any;
  return (
    <SlideWrapper num={3}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {s.cards.map((c: any, i: number) => {
          const Icon = c.icon;
          return (
            <div key={i} className="border border-slate-200 rounded-xl p-5 bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${ACCENT}15` }}>
                <Icon className="w-5 h-5" style={{ color: ACCENT }} />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{c.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
            </div>
          );
        })}
      </div>
      <p className="text-slate-500 text-sm italic border-t border-slate-100 pt-4">{s.closing}</p>
    </SlideWrapper>
  );
};

const GapSlide: React.FC = () => {
  const s = slides[3] as any;
  return (
    <SlideWrapper num={4}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
        {s.diagram.map((node: string, i: number) => (
          <React.Fragment key={i}>
            <div className={`px-5 py-3 rounded-xl text-sm font-semibold text-center max-w-[280px] ${i === 1 ? 'text-white' : 'bg-slate-100 text-slate-800 border border-slate-200'}`}
              style={i === 1 ? { background: ACCENT } : {}}>
              {node}
            </div>
            {i < 2 && <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />}
          </React.Fragment>
        ))}
      </div>
      <div className="overflow-auto rounded-xl border border-slate-200 flex-1">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 font-bold text-slate-900">Their reality</th>
              <th className="px-4 py-3 font-bold text-slate-900">What breaks</th>
              <th className="px-4 py-3 font-bold text-slate-900">What we add</th>
            </tr>
          </thead>
          <tbody>
            {s.table.map((r: any, i: number) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-4 py-3 text-slate-700 text-xs">{r.reality}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{r.breaks}</td>
                <td className="px-4 py-3 font-medium text-xs" style={{ color: ACCENT }}>{r.adds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SlideWrapper>
  );
};

const ClientsSlide: React.FC = () => {
  const s = slides[4] as any;
  return (
    <SlideWrapper num={5}>
      <h2 className="text-3xl font-bold text-slate-900 mb-5">{s.title}</h2>
      <div className="overflow-auto rounded-xl border border-slate-200 mb-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-5 py-3 font-bold text-slate-900">Client</th>
              <th className="px-5 py-3 font-bold text-slate-900">Domain</th>
              <th className="px-5 py-3 font-bold text-slate-900">Use Case</th>
            </tr>
          </thead>
          <tbody>
            {s.rows.map((r: any, i: number) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-5 py-3 font-semibold text-slate-800">{r.client}</td>
                <td className="px-5 py-3 text-slate-600">{r.domain}</td>
                <td className="px-5 py-3 text-slate-600">{r.useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400 italic">{s.footnote}</p>
    </SlideWrapper>
  );
};

const PatternsSlide: React.FC = () => {
  const s = slides[5] as any;
  return (
    <SlideWrapper num={6}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {s.grid.map((g: any, i: number) => (
          <div key={i} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-base mb-2">{g.pattern}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{g.desc}</p>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};

const LifecycleSlide: React.FC = () => {
  const s = slides[6] as any;
  return (
    <SlideWrapper num={7}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="space-y-4 mb-8">
        {s.bullets.map((b: any, i: number) => (
          <div key={i} className="flex gap-4">
            <div className="w-2 h-2 rounded-full mt-2.5 shrink-0" style={{ background: ACCENT }} />
            <div>
              <span className="font-bold text-slate-900">{b.label}: </span>
              <span className="text-slate-600">{b.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-l-4 rounded-r-xl bg-slate-50 px-6 py-5" style={{ borderColor: ACCENT }}>
        <p className="text-lg font-medium text-slate-800 italic">"{s.quote}"</p>
      </div>
    </SlideWrapper>
  );
};

const SupplyChainSlide: React.FC = () => {
  const s = slides[7] as any;
  return (
    <SlideWrapper num={8}>
      <h2 className="text-3xl font-bold text-slate-900 mb-3">{s.title}</h2>
      <p className="text-slate-600 text-base mb-5 max-w-4xl">{s.intro}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {s.pillars.map((p: any, i: number) => {
          const Icon = p.icon;
          return (
            <div key={i} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}18` }}>
                  <Icon className="w-5 h-5" style={{ color: ACCENT }} />
                </div>
                <span className="font-bold text-slate-900 text-base">{p.title}</span>
              </div>
              <ul className="space-y-1.5">
                {p.points.map((pt: string, j: number) => (
                  <li key={j} className="flex gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: ACCENT }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="border border-slate-200 rounded-xl p-4 bg-white flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" style={{ color: ACCENT }} />
            <span className="text-sm font-bold text-slate-900">Command-centre view</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-slate-400">{s.panel.label}</span>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-3">
          {s.panel.tiles.map((t: any, i: number) => (
            <div key={i} className="border border-slate-100 rounded-lg p-3 bg-slate-50/60">
              <div className="text-[11px] uppercase tracking-wide text-slate-500">{t.k}</div>
              <div className="text-xl font-bold text-slate-900">{t.v}</div>
              <div className="text-[11px]" style={{ color: ACCENT }}>{t.d}</div>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {s.panel.alerts.map((a: string, i: number) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <span>{a}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-400 italic mt-3">{s.footnote}</p>
    </SlideWrapper>
  );
};

const PredictiveSlide: React.FC = () => {
  const s = slides[8] as any;
  return (
    <SlideWrapper num={9}>
      <h2 className="text-3xl font-bold text-slate-900 mb-5">{s.title}</h2>
      <div className="grid grid-cols-3 gap-4 mb-5">
        {s.outcomes.map((o: any, i: number) => {
          const Icon = o.icon;
          return (
            <div key={i} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${ACCENT}18` }}>
                <Icon className="w-5 h-5" style={{ color: ACCENT }} />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{o.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{o.text}</p>
            </div>
          );
        })}
      </div>
      <div className="border border-slate-200 rounded-xl p-4 bg-white mb-4">
        <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-3">Reference architecture</div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {s.architecture.map((node: any, i: number) => {
            const Icon = node.icon;
            return (
              <React.Fragment key={i}>
                <div className="flex-1 min-w-[140px] flex flex-col items-center text-center px-3 py-3 rounded-lg border border-slate-200 bg-slate-50/60">
                  <Icon className="w-5 h-5 mb-1.5" style={{ color: ACCENT }} />
                  <span className="text-xs font-semibold text-slate-700">{node.label}</span>
                </div>
                {i < s.architecture.length - 1 && <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border-l-4 rounded-r-lg bg-slate-50 px-4 py-3" style={{ borderColor: ACCENT }}>
          <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Operating model</div>
          <p className="text-sm text-slate-700">{s.operating}</p>
        </div>
        <div className="border-l-4 rounded-r-lg bg-slate-50 px-4 py-3" style={{ borderColor: ACCENT }}>
          <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Group framing</div>
          <p className="text-sm text-slate-700">{s.framing}</p>
        </div>
      </div>
    </SlideWrapper>
  );
};

const VedantaBuiltSlide: React.FC = () => {
  const s = slides[9] as any;
  return (
    <SlideWrapper num={10}>
      <h2 className="text-3xl font-bold text-slate-900 mb-3">{s.title}</h2>
      <p className="text-slate-700 text-base mb-6 max-w-3xl">{s.subtitle}</p>
      <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/60 mb-6 max-w-3xl">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ACCENT }} />
          <p className="text-sm text-slate-700 leading-relaxed">{s.note}</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 italic border-t border-slate-100 pt-4">{s.footer}</p>
    </SlideWrapper>
  );
};

const PartnerAtScaleSlide: React.FC = () => {
  const s = slides[10] as any;
  return (
    <SlideWrapper num={11}>
      <h2 className="text-3xl font-bold text-slate-900 mb-1">{s.title}</h2>
      <p className="text-base mb-6" style={{ color: ACCENT }}>{s.subtitle}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {s.capabilities.map((c: any, i: number) => {
          const Icon = c.icon;
          return (
            <div key={i} className="border border-slate-200 rounded-xl p-4 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}15` }}>
                  <Icon className="w-4 h-4" style={{ color: ACCENT }} />
                </div>
                <div className="text-sm font-bold text-slate-900 leading-tight">{c.title}</div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5 flex-1">
        {s.pillars.map((p: any, i: number) => {
          const Icon = p.icon;
          return (
            <div key={i} className="rounded-xl p-5 border" style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}08` }}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" style={{ color: ACCENT }} />
                <div className="text-sm font-bold text-slate-900">{p.title}</div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>
      <div className="border border-slate-200 rounded-xl py-3 px-5 flex items-center justify-center gap-3 bg-slate-50/60 flex-wrap">
        {s.flow.map((step: string, i: number) => (
          <React.Fragment key={i}>
            <div className={`text-xs font-medium px-3 py-1.5 rounded-full ${i === 1 ? 'text-white' : 'bg-white border border-slate-200 text-slate-700'}`}
              style={i === 1 ? { background: ACCENT } : undefined}>
              {step}
            </div>
            {i < s.flow.length - 1 && <ArrowRight className="w-4 h-4" style={{ color: `${ACCENT}99` }} />}
          </React.Fragment>
        ))}
        <span className="text-xs text-slate-400 ml-3 italic">{s.footer}</span>
      </div>
    </SlideWrapper>
  );
};

const EngagementModelsSlide: React.FC = () => {
  const s = slides[11] as any;
  const icons = [Workflow, Target, Users];
  return (
    <SlideWrapper num={12}>
      <h2 className="text-3xl font-bold text-slate-900 mb-1">{s.title}</h2>
      <p className="text-base mb-5" style={{ color: ACCENT }}>{s.subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
        {s.models.map((m: any, i: number) => {
          const Icon = icons[i] || Workflow;
          return (
            <div key={i} className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col">
              <div className="flex items-start gap-2 mb-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${ACCENT}15` }}>
                  <Icon className="w-4 h-4" style={{ color: ACCENT }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-medium" style={{ color: ACCENT }}>Model {i + 1}</div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">{m.name}</div>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-snug mb-3">{m.definition}</p>
              <div className="mb-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Best when</div>
                <p className="text-xs text-slate-600 leading-snug">{m.bestWhen}</p>
              </div>
              <div className="mb-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Differentiators</div>
                <ul className="space-y-1">
                  {m.differentiators.map((d: string, j: number) => (
                    <li key={j} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                      <span className="text-[11px] text-slate-700 leading-snug">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-3 bg-slate-50 border border-slate-200 rounded-md p-2">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Contrast</div>
                <p className="text-[11px] text-slate-500 leading-snug italic">{m.contrast}</p>
              </div>
              <div className="mt-auto grid grid-cols-3 gap-1 pt-2 border-t border-slate-100">
                <div>
                  <div className="text-[9px] uppercase text-slate-400">Time to value</div>
                  <div className="text-[11px] text-slate-900 font-semibold">{m.ttv}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase text-slate-400">Ownership</div>
                  <div className="text-[11px] text-slate-900 font-semibold leading-tight">{m.ownership}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase text-slate-400">Shape</div>
                  <div className="text-[11px] font-semibold" style={{ color: ACCENT }}>{m.shape}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center rounded-xl py-2 px-4 border" style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}10` }}>
        <p className="text-xs font-medium" style={{ color: ACCENT }}>
          <span className="text-slate-500 mr-2">How to choose →</span>
          {s.howToChoose}
        </p>
      </div>
    </SlideWrapper>
  );
};

const TeamSlideContent: React.FC = () => {
  const s = slides[12] as any;
  return (
    <SlideWrapper num={13}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div>
          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 mb-5">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: `${ACCENT}18` }}>
              <Users className="w-7 h-7" style={{ color: ACCENT }} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{s.person.name}</h3>
            <p className="font-medium mb-3" style={{ color: ACCENT }}>{s.person.role}</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{s.person.cred}</p>
            <div className="space-y-2 border-t border-slate-200 pt-3">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Mail className="w-4 h-4" style={{ color: ACCENT }} />
                <span>{s.person.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Phone className="w-4 h-4" style={{ color: ACCENT }} />
                <span>{s.person.phone}</span>
              </div>
            </div>
          </div>
          <ul className="space-y-2">
            {s.bullets.map((b: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: ACCENT }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl p-6 text-white flex-1" style={{ background: ACCENT }}>
            <Target className="w-6 h-6 mb-3 text-white/80" />
            <h4 className="font-bold text-lg mb-2">Next step</h4>
            <p className="text-white/90 text-sm leading-relaxed">{s.cta.primary}</p>
          </div>
          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
            <Shield className="w-5 h-5 mb-2 text-slate-400" />
            <h4 className="font-bold text-slate-900 mb-2">Architecture alignment</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{s.cta.secondary}</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};

const slideRenderers = [
  TitleSlideContent, WhyNowSlide, CapabilitiesSlide, GapSlide,
  ClientsSlide, PatternsSlide, LifecycleSlide,
  SupplyChainSlide, PredictiveSlide, VedantaBuiltSlide,
  TeamSlideContent,
];

const GenericEnterpriseDeck: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => { setEntered(true); }, []);

  const go = useCallback((dir: number) => {
    setCurrent(c => Math.max(0, Math.min(TOTAL - 1, c + dir)));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  const Slide = slideRenderers[current];

  return (
    <div className="w-full h-screen overflow-hidden relative bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="flex-1 h-1 transition-colors duration-300"
            style={{ background: i <= current ? ACCENT : '#e2e8f0' }} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={entered ? { opacity: 0, x: 30 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <Slide />
        </motion.div>
      </AnimatePresence>
      <div className="fixed bottom-6 right-8 z-50 flex gap-2">
        <button onClick={() => go(-1)} disabled={current === 0}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => go(1)} disabled={current === TOTAL - 1}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GenericEnterpriseDeck;
