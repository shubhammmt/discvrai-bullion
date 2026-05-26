import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Zap, Brain, Workflow, BarChart3, Shield, Users,
  ArrowRight, Target, Factory, Landmark, HardHat, ShoppingCart, Building2,
  Database, Cpu, LayoutDashboard, CheckCircle2, Link2, Mail, Phone, HeartPulse,
  TrendingUp, Wallet, Wrench, FileText, Briefcase
} from 'lucide-react';

const ACCENT = '#0F766E';
const SECTORS_FOOTER = 'BFSI · Manufacturing · Industrial · Energy & EPC · D2C Commerce · Healthcare · Real Estate';

// ---------- SLIDE DATA ----------
const slides: any[] = [
  // 1. Landing — business-led
  {
    type: 'title',
    headline: 'Enterprise transformation fails when data, decisions and execution stay disconnected.',
    subhead: 'DiscvrAI helps mature enterprises convert fragmented systems, manual decisioning and operational blind spots into measurable business outcomes — without replacing SAP, Oracle, Salesforce, MES, SCADA, CRM or data platforms.',
    valueProps: [
      { icon: TrendingUp, text: 'Improve revenue, margin, cost, risk and customer experience outcomes' },
      { icon: Link2,      text: 'Build decision and execution layers on top of existing enterprise systems' },
      { icon: Workflow,   text: 'Convert unstructured data, workflows and operational signals into automated actions' },
      { icon: LayoutDashboard, text: 'Deploy command centres, agentic workflows and analytics business teams use daily' },
      { icon: Target,     text: 'Start with focused 8–12 week outcome pilots, then scale across functions' },
    ],
    micro: SECTORS_FOOTER,
  },

  // 2. Sector slide
  {
    type: 'sectors',
    title: 'Where DiscvrAI creates business impact across sectors',
    bullets: [
      { icon: Landmark,  label: 'BFSI', text: 'Risk, fraud, collections, RM productivity and governed GenAI — built on top of core banking, CRM and data platforms. Outcomes: lower leakage, higher collection rate, faster decisioning.' },
      { icon: Factory,   label: 'Manufacturing & Industrial', text: 'Demand sensing, predictive maintenance, dispatch and quality intelligence on ERP + MES + historian. Outcomes: lower downtime, better OTIF, lower inventory leakage.' },
      { icon: HardHat,   label: 'Energy & EPC', text: 'Project control towers, asset reliability and document intelligence across subsurface, drilling, BOQ and vendor systems. Outcomes: lower project delays, cost overrun alerts, better asset uptime.' },
      { icon: ShoppingCart, label: 'D2C & Commerce', text: 'Conversion, retention, demand planning and CX automation built on the existing data warehouse. Outcomes: higher conversion, lower churn, better demand accuracy.' },
      { icon: Building2, label: 'Real Estate & Infrastructure', text: 'Project delays, sales leakage, collections inefficiency, broker dependency, inventory visibility and customer lifecycle gaps create margin impact. We build sales intelligence, project command centres, document intelligence and payment follow-up automation on top of existing CRM, ERP and project systems.' },
      { icon: HeartPulse, label: 'Healthcare', text: 'Patient ops, RCM, supply chain and field-force intelligence on existing HIS / pharma stacks. Outcomes: faster verification, fewer denials, better channel visibility.' },
    ],
  },

  // 3. Capability stack — business framing
  {
    type: 'capabilities',
    title: 'What we bring together to solve enterprise outcomes',
    cards: [
      { icon: Database,    title: 'Data foundation',        desc: 'Lakehouse, data pipelines, feature stores, semantic layer, data quality and governance.' },
      { icon: Cpu,         title: 'AI and machine learning', desc: 'Forecasting, anomaly detection, predictive models, recommendations, risk scoring and optimisation.' },
      { icon: Brain,       title: 'Generative and agentic AI', desc: 'RAG, copilots, workflow agents, document intelligence, conversational BI and action automation.' },
      { icon: Link2,       title: 'Enterprise integration', desc: 'Connectors into SAP, Oracle, Salesforce, CRM, MES, SCADA, core banking and data warehouses.' },
      { icon: LayoutDashboard, title: 'Command centres and BI', desc: 'Dashboards, alerts, next-best-action intelligence and exception-first operating views.' },
      { icon: Shield,      title: 'Governance and adoption', desc: 'Role-based access, audit trails, explainability, human-in-the-loop controls and change enablement.' },
    ],
    closing: 'Not "deep tech for the sake of tech". We combine data, AI, workflow and enterprise engineering to deliver measurable operating outcomes.',
  },

  // 4. Outcomes table
  {
    type: 'outcomes',
    title: 'How we convert existing systems into measurable business outcomes',
    rows: [
      { reality: 'BFSI: Mature core banking, CRM and risk platforms', limit: 'Linear risk models, rules-heavy surveillance, generic collections, ungoverned LLM use', enable: 'Risk scoring, AML/fraud intelligence, uplift-based collections, governed RAG with audit', outcome: 'Lower fraud leakage, faster collections, better risk decisions, higher RM productivity' },
      { reality: 'Manufacturing: ERP + MES + historian + quality', limit: 'Calendar-based maintenance, heuristic scheduling, post-hoc quality, tribal knowledge', enable: 'Failure prediction, anomaly detection, scheduling optimisation, vision quality, SOP RAG', outcome: 'Lower downtime, better OTIF, lower inventory leakage, faster dispatch decisions' },
      { reality: 'Energy & EPC: Subsurface, drilling, project and vendor systems', limit: 'Deterministic forecasts, spreadsheet optimisation, manual document review', enable: 'Probabilistic forecasts, constrained optimisation, document AI on drawings and contracts', outcome: 'Lower project delays, better asset reliability, cost overrun alerts' },
      { reality: 'D2C / Commerce: Shopify, CRM, marketing automation', limit: 'Rules-based personalisation, static pricing, spreadsheet demand planning', enable: 'Recsys, uplift modelling, hierarchical demand sensing, agentic CX', outcome: 'Higher conversion, lower churn, better demand planning' },
      { reality: 'Real Estate: CRM, ERP, project, broker and collections systems', limit: 'Sales leakage, weak broker analytics, manual collections, low project visibility', enable: 'Lead scoring, broker productivity, inventory visibility, payment follow-up automation, project control tower', outcome: 'Faster sales velocity, reduced collection delays, better project visibility, higher channel productivity' },
    ],
  },

  // 5. References
  {
    type: 'clients',
    title: 'Selected references — outcomes delivered across sectors',
    rows: [
      { client: 'Bajaj Finserv',     domain: 'BFSI / NBFC',                useCase: 'Lending, collections intelligence, governed GenAI for ops and sales', impact: 'Collections productivity · Risk intelligence' },
      { client: 'CAMS',              domain: 'BFSI / AMC Services',         useCase: 'Distribution analytics, fund flow ML, operations intelligence at scale', impact: 'Operations productivity · MIS speed' },
      { client: 'CMS Infosystems',   domain: 'BFSI / Cash Logistics',       useCase: 'Route and cassette optimisation, anomaly detection on 70k+ ATMs', impact: 'Margin leakage recovery · ATM ops efficiency' },
      { client: 'Bajaj Electricals', domain: 'Manufacturing / Consumer',    useCase: 'Demand sensing, supply-chain analytics, ops command centre', impact: 'Inventory and service-level improvement' },
      { client: 'ADF Foods',         domain: 'Manufacturing / FMCG',        useCase: 'CEO sales intelligence, production analytics, MIS automation', impact: 'Faster MIS · Better decision visibility' },
      { client: 'Dalmia Tech',       domain: 'Industrial / Cement',         useCase: 'Manufacturing operations intelligence, asset and process analytics', impact: 'Asset utilisation · Process efficiency' },
      { client: 'Deep Industries',   domain: 'Oil & Gas / EPC',             useCase: 'Field operations analytics, asset reliability, service orchestration', impact: 'Equipment utilisation · Downtime reduction' },
      { client: 'Aptech',            domain: 'Education / D2C',             useCase: 'AI career counsellor, funnel scoring, enrollment intelligence', impact: 'Higher conversion · Lower CAC' },
      { client: 'Helios AMC',        domain: 'BFSI / Asset Management',     useCase: 'Fund analytics, distribution and flow intelligence', impact: 'Sales intelligence · Channel productivity' },
    ],
    note: 'Real Estate engagements covered separately on the use-case financials slide.',
  },

  // 6. Patterns
  {
    type: 'patterns',
    title: 'Repeatable transformation patterns that create measurable value',
    grid: [
      { pattern: 'Forecasting & demand sensing',      desc: 'Hierarchical demand and price models across SKU / region / channel.', outcome: 'Inventory reduction, higher service levels, better planning accuracy.' },
      { pattern: 'Predictive maintenance',            desc: 'Failure prediction, anomaly detection and RUL on sensor and SCADA streams.', outcome: 'Lower downtime, fewer failures, lower maintenance cost.' },
      { pattern: 'Constraint optimisation',           desc: 'Routing, scheduling, manpower, dispatch and asset planning under real constraints.', outcome: 'Better utilisation, lower cost-to-serve, faster turnaround.' },
      { pattern: 'Risk, fraud & graph intelligence',  desc: 'Entity resolution, network analytics and uplift models for collections and retention.', outcome: 'Leakage reduction, higher collections, better fraud detection.' },
      { pattern: 'Document & vision AI',              desc: 'OCR, multimodal RAG and CV on SOPs, contracts, drawings and inspection imagery.', outcome: 'Faster processing, lower manual effort, higher auditability.' },
      { pattern: 'Agentic decision intelligence',     desc: 'NL-to-SQL on governed data and agent workflows that propose and execute actions.', outcome: 'Faster decisions, automated follow-ups, next-best actions.' },
    ],
  },

  // 7. One operating model
  {
    type: 'lifecycle',
    title: 'One operating model: data → decision → action',
    flow: ['Existing systems', 'Unified data layer', 'AI / analytics layer', 'Command centre & workflow agents', 'Measurable business outcomes'],
    bullets: [
      { label: 'Shared foundation', text: 'Lakehouse + feature store + vector DB + model registry + agent runtime on your AWS / Azure / GCP — identity, RBAC, audit, lineage and data residency baked in.' },
      { label: 'BFSI',              text: 'Risk, collections, RM productivity and governed GenAI unified into a decisioning and exception layer.' },
      { label: 'Manufacturing & Industrial', text: 'Demand, dispatch, maintenance, quality and SOP intelligence unified into a plant and supply chain command centre.' },
      { label: 'Energy & EPC',      text: 'Project, vendor, asset and document intelligence unified into a project control tower with cost and delay alerts.' },
      { label: 'D2C & Commerce',    text: 'Conversion, retention, pricing and demand intelligence unified into a growth and CX cockpit.' },
      { label: 'Real Estate',       text: 'CRM, sales, site progress, collections, broker activity and customer service data unified into sales velocity, project visibility, collections and CX command centres.' },
    ],
    note: '8–12 week outcome pilot in one business unit, then federate the same operating spine across the group.',
  },

  // 8. How we partner
  {
    type: 'partner',
    title: 'How we partner: from business problem to production outcome',
    steps: [
      { title: 'Outcome discovery',          desc: 'Define the business KPI, value case, users and operating model.' },
      { title: 'Data and architecture readiness', desc: 'Map systems, data sources, workflows, controls and integration points.' },
      { title: 'Build and deploy',           desc: 'Create the dashboard, agent, workflow, model or command centre.' },
      { title: 'Run, improve and scale',     desc: 'Monitor adoption, business impact and model quality. Scale to adjacent use cases.' },
    ],
    pod: {
      title: 'Specialist capability pod',
      desc: 'AI/ML architects, data engineers, product leads, workflow engineers and enterprise delivery leads, working with your business and IT teams.',
    },
    pillars: [
      { icon: Users,         title: 'Joint teams, not vendors',    desc: 'Mixed pods of your people and ours — knowledge transfers as we build, not after.' },
      { icon: CheckCircle2,  title: 'Enterprise-grade quality',    desc: 'Security, observability, reproducibility, reversibility and model risk controls — production-ready by default.' },
      { icon: ArrowRight,    title: 'Clear exit path',             desc: 'You own the code, data, features, model weights and pipelines. We design for you to run it.' },
    ],
  },

  // 9. Engagement models
  {
    type: 'engagement',
    title: 'Engagement models — three ways we can engage',
    subtitle: 'Pick the shape that fits the problem — not the other way around',
    models: [
      { name: 'End-to-end transformation', def: 'Multi-quarter program to rewire a business unit or function — strategy, build, change.', best: 'Board-level mandate, real P&L to move, multiple workstreams that must land together.', ttv: '2–3 quarters', shape: 'Outcome-linked' },
      { name: 'Targeted problem solution', def: 'Focused 8–12 week build to solve one painful, well-defined business problem end-to-end.', best: 'Sharp problem, data exists, you need a working system — not another deck.', ttv: '8–12 weeks', shape: 'Fixed-fee / milestone' },
      { name: 'Talent augmentation',       def: 'Senior AI, data, product and engineering talent embedded into your teams under your leadership.', best: 'Direction and architecture exist; you need depth on specific roles to ship faster.', ttv: 'Weeks', shape: 'T&M / monthly' },
    ],
    recommend: 'Recommended starting point: one targeted business outcome with clear baseline, KPI and financial value estimate.',
  },

  // 10. Use case financials 1
  {
    type: 'financials',
    title: 'Illustrative use case financials: customer service and operations automation',
    rows: [
      { use: 'Customer service workflow automation', problem: 'High manual ticket handling across email, call notes, images, PDFs and videos', build: 'AI triage, document & video analysis, workflow automation, next-best-action', lever: 'Seat reduction, faster resolution, better SLA', value: '₹3–12 Cr annual cost productivity for 75–250 seats' },
      { use: 'Claims / complaint automation',        problem: 'Manual review of text, images, videos and documents', build: 'Multimodal claim intelligence and assisted decisioning', lever: 'Lower TAT, reduced leakage, better settlement accuracy', value: '₹2–10 Cr leakage and productivity impact' },
      { use: 'Collections intelligence',             problem: 'Generic calling queues and low prioritisation accuracy', build: 'Risk scoring, uplift modelling, agent recommendations', lever: 'Higher collection rate, lower cost to collect', value: '5–15% productivity lift on collection effort' },
      { use: 'Conversational BI for business teams', problem: 'CXOs depend on manual MIS and analyst bandwidth', build: 'Governed NL-to-SQL, dashboards, alerts and next-best-action', lever: 'Faster decisions, lower analyst dependency', value: '30–50% reduction in recurring MIS effort' },
    ],
    note: 'Financials are illustrative. Final value is baselined during discovery using client volumes, manpower cost, leakage and conversion data.',
  },

  // 11. Use case financials 2
  {
    type: 'financials',
    title: 'Illustrative use case financials: manufacturing, EPC and real estate',
    rows: [
      { use: 'Dispatch and OTIF command centre',         problem: 'Limited visibility across demand, production, inventory and dispatch', build: 'Unified dispatch tower with exception alerts and planner workflows', lever: 'Better OTIF, lower penalties, lower expediting', value: '₹2–8 Cr working capital and service impact' },
      { use: 'Predictive maintenance',                   problem: 'Reactive maintenance and unplanned downtime on critical assets', build: 'Failure prediction, RUL, maintenance alerts, spares planning', lever: 'Lower downtime, lower maintenance cost', value: '₹3–15 Cr depending on asset base' },
      { use: 'Project control tower (EPC / Infra / RE)', problem: 'BOQ, vendor, progress and cost data fragmented across systems', build: 'Unified project intelligence with delay and cost overrun alerts', lever: 'Lower project slippage, earlier intervention', value: '1–3% impact on project cost exposure' },
      { use: 'Real estate sales & collections intelligence', problem: 'Sales leakage, broker dependency, weak inventory and collections visibility', build: 'Lead scoring, broker productivity, inventory visibility, payment follow-up automation', lever: 'Faster sales velocity, lower overdue collections', value: '₹5–25 Cr impact on sales conversion and cashflow for large developers' },
    ],
    note: 'Indicative ranges based on enterprise benchmarks. Baselined during the 8–12 week discovery.',
  },

  // 12. Team
  {
    type: 'team',
    eyebrow: 'Operator-led transformation team',
    title: 'Senior AI, product and enterprise execution depth',
    subhead: 'DiscvrAI combines operator experience, AI depth, product thinking and enterprise delivery discipline — so transformation moves from boardroom intent to production outcomes.',
    people: [
      {
        name: 'Shubham Srivastava',
        role: 'Founder & CEO, DiscvrAI',
        bio: 'Former CIO / CTO / CPTO across large enterprises including Eureka Forbes, Hindustan Times and MakeMyTrip. 20+ years leading technology, product, data and business transformation across consumer, media, travel, manufacturing and BFSI. Owns enterprise transformation strategy, CXO engagement and business outcome alignment.',
      },
      {
        name: 'Dr Mandar Kulkarni',
        role: 'AI & Technology Leader',
        bio: 'AI / GenAI leader with 16+ years of global IT experience across consulting, delivery, solution architecture and enterprise AI transformation. Built and led large AI teams delivering measurable impact via Predictive AI, GenAI, Agentic AI, RAG / NLQ, forecasting, personalisation and decision-support platforms across Manufacturing, BFSI, Media, Real Estate, Healthcare, Telecom, Education and BPO. Strengths in CXO advisory, AI CoE setup, responsible AI governance, value engineering and delivery governance.',
      },
      {
        name: 'Nitin Kapoor',
        role: 'Product & Growth Leader',
        bio: '20+ years in product leadership, 0-to-1 category building, operations, partnerships and business growth. Co-founded MeetUniversity, with experience across conversations platforms, ed-tech, customer relations, digital marketing and real estate. Brings productisation, GTM, adoption and customer success depth.',
      },
    ],
    contact: { email: 'shubham@discvr.ai', phone: '+91 9873961591' },
    closing: 'Operator experience + AI depth + product thinking + enterprise delivery discipline — under one accountable team.',
  },
];

const TOTAL = slides.length;

// ---------- LAYOUT ----------
const SlideWrapper: React.FC<{ children: React.ReactNode; num: number }> = ({ children, num }) => (
  <div className="w-full h-screen flex flex-col relative overflow-hidden bg-white">
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}88, ${ACCENT})` }} />
    <div className="absolute top-5 left-8 z-20 flex items-center gap-2">
      <Zap className="w-5 h-5" style={{ color: ACCENT }} />
      <span className="text-base font-bold tracking-tight text-slate-800">DiscvrAI</span>
    </div>
    <div className="flex-1 relative z-10 px-12 pt-16 pb-16 flex flex-col overflow-hidden" style={{ maxWidth: 1240, margin: '0 auto', width: '100%' }}>
      {children}
    </div>
    <div className="absolute bottom-0 left-0 right-0 px-12 pb-3 flex justify-between items-center text-[11px] text-slate-400">
      <span>{SECTORS_FOOTER}</span>
      <span className="font-mono">{String(num).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}40, transparent)` }} />
  </div>
);

// ---------- SLIDE RENDERERS ----------
const TitleSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <div className="flex-1 flex flex-col justify-center max-w-5xl">
      <div className="text-[11px] font-semibold tracking-widest uppercase mb-4" style={{ color: ACCENT }}>
        Enterprise transformation · Outcomes first
      </div>
      <h1 className="text-[34px] md:text-[42px] font-bold text-slate-900 leading-tight mb-5">{s.headline}</h1>
      <p className="text-lg text-slate-600 leading-relaxed mb-7">{s.subhead}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {s.valueProps.map((v: any, i: number) => {
          const Icon = v.icon;
          return (
            <div key={i} className="flex items-start gap-2.5 border border-slate-200 rounded-lg px-3.5 py-2.5 bg-slate-50/60">
              <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: `${ACCENT}18` }}>
                <Icon className="w-3.5 h-3.5" style={{ color: ACCENT }} />
              </div>
              <span className="text-[13px] text-slate-700 leading-snug">{v.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  </SlideWrapper>
);

const SectorsSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1">
      {s.bullets.map((b: any, i: number) => {
        const Icon = b.icon;
        return (
          <div key={i} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${ACCENT}18` }}>
                <Icon className="w-4 h-4" style={{ color: ACCENT }} />
              </div>
              <span className="font-bold text-slate-900 text-[13px]">{b.label}</span>
            </div>
            <p className="text-slate-600 text-[11.5px] leading-snug">{b.text}</p>
          </div>
        );
      })}
    </div>
  </SlideWrapper>
);

const CapabilitiesSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
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
    <div className="border-l-4 rounded-r-lg px-4 py-3 bg-slate-50" style={{ borderColor: ACCENT }}>
      <p className="text-sm text-slate-700 italic">{s.closing}</p>
    </div>
  </SlideWrapper>
);

const OutcomesSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <h2 className="text-3xl font-bold text-slate-900 mb-5">{s.title}</h2>
    <div className="overflow-auto rounded-xl border border-slate-200 flex-1">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-3 py-2.5 font-bold text-slate-900 text-xs">Their reality</th>
            <th className="px-3 py-2.5 font-bold text-slate-900 text-xs">What is limiting value</th>
            <th className="px-3 py-2.5 font-bold text-slate-900 text-xs">What DiscvrAI enables</th>
            <th className="px-3 py-2.5 font-bold text-xs" style={{ color: ACCENT }}>Business outcome</th>
          </tr>
        </thead>
        <tbody>
          {s.rows.map((r: any, i: number) => (
            <tr key={i} className="border-t border-slate-100 align-top">
              <td className="px-3 py-2.5 text-slate-700 text-[11.5px]">{r.reality}</td>
              <td className="px-3 py-2.5 text-slate-500 text-[11.5px]">{r.limit}</td>
              <td className="px-3 py-2.5 text-slate-700 text-[11.5px]">{r.enable}</td>
              <td className="px-3 py-2.5 font-medium text-[11.5px]" style={{ color: ACCENT }}>{r.outcome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </SlideWrapper>
);

const ClientsSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <h2 className="text-3xl font-bold text-slate-900 mb-5">{s.title}</h2>
    <div className="overflow-auto rounded-xl border border-slate-200 mb-3 flex-1">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-4 py-2.5 font-bold text-slate-900 text-xs">Client</th>
            <th className="px-4 py-2.5 font-bold text-slate-900 text-xs">Domain</th>
            <th className="px-4 py-2.5 font-bold text-slate-900 text-xs">Use case</th>
            <th className="px-4 py-2.5 font-bold text-xs" style={{ color: ACCENT }}>Business impact area</th>
          </tr>
        </thead>
        <tbody>
          {s.rows.map((r: any, i: number) => (
            <tr key={i} className="border-t border-slate-100">
              <td className="px-4 py-2.5 font-semibold text-slate-800 text-[12px]">{r.client}</td>
              <td className="px-4 py-2.5 text-slate-600 text-[12px]">{r.domain}</td>
              <td className="px-4 py-2.5 text-slate-600 text-[12px]">{r.useCase}</td>
              <td className="px-4 py-2.5 text-[12px] font-medium" style={{ color: ACCENT }}>{r.impact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-xs text-slate-400 italic">{s.note}</p>
  </SlideWrapper>
);

const PatternsSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
      {s.grid.map((g: any, i: number) => (
        <div key={i} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col">
          <h3 className="font-bold text-slate-900 text-sm mb-2">{g.pattern}</h3>
          <p className="text-slate-600 text-[12px] leading-snug mb-3">{g.desc}</p>
          <div className="mt-auto border-t border-slate-200 pt-2">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Business outcome</div>
            <p className="text-[11.5px] font-medium" style={{ color: ACCENT }}>{g.outcome}</p>
          </div>
        </div>
      ))}
    </div>
  </SlideWrapper>
);

const LifecycleSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <h2 className="text-3xl font-bold text-slate-900 mb-5">{s.title}</h2>
    <div className="flex items-center justify-between gap-2 mb-5 flex-wrap">
      {s.flow.map((step: string, i: number) => (
        <React.Fragment key={i}>
          <div className={`flex-1 min-w-[150px] text-center px-3 py-3 rounded-xl text-[12px] font-semibold ${i === s.flow.length - 1 ? 'text-white' : 'bg-slate-100 text-slate-800 border border-slate-200'}`}
            style={i === s.flow.length - 1 ? { background: ACCENT } : {}}>
            {step}
          </div>
          {i < s.flow.length - 1 && <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />}
        </React.Fragment>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-4 flex-1 overflow-auto">
      {s.bullets.map((b: any, i: number) => (
        <div key={i} className="flex gap-2.5">
          <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: ACCENT }} />
          <div>
            <span className="font-bold text-slate-900 text-[12.5px]">{b.label}: </span>
            <span className="text-slate-600 text-[12px] leading-snug">{b.text}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="border-l-4 rounded-r-lg px-4 py-2.5 bg-slate-50" style={{ borderColor: ACCENT }}>
      <p className="text-sm text-slate-700 italic">{s.note}</p>
    </div>
  </SlideWrapper>
);

const PartnerSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
    <div className="grid grid-cols-4 gap-3 mb-5">
      {s.steps.map((st: any, i: number) => (
        <div key={i} className="rounded-xl p-4 border" style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}08` }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: ACCENT }}>{i + 1}</div>
            <div className="text-sm font-bold text-slate-900">{st.title}</div>
          </div>
          <p className="text-[12px] text-slate-600 leading-snug">{st.desc}</p>
        </div>
      ))}
    </div>
    <div className="border border-slate-200 rounded-xl p-4 bg-white mb-4">
      <div className="flex items-center gap-2 mb-1.5">
        <Briefcase className="w-4 h-4" style={{ color: ACCENT }} />
        <h3 className="text-sm font-bold text-slate-900">{s.pod.title}</h3>
      </div>
      <p className="text-[12.5px] text-slate-600 leading-snug">{s.pod.desc}</p>
    </div>
    <div className="grid grid-cols-3 gap-3">
      {s.pillars.map((p: any, i: number) => {
        const Icon = p.icon;
        return (
          <div key={i} className="rounded-lg p-3 border border-slate-200 bg-slate-50/60">
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-4 h-4" style={{ color: ACCENT }} />
              <div className="text-[13px] font-bold text-slate-900">{p.title}</div>
            </div>
            <p className="text-[11.5px] text-slate-600 leading-snug">{p.desc}</p>
          </div>
        );
      })}
    </div>
  </SlideWrapper>
);

const EngagementSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => {
  const icons = [Workflow, Target, Users];
  return (
    <SlideWrapper num={num}>
      <h2 className="text-3xl font-bold text-slate-900 mb-1">{s.title}</h2>
      <p className="text-base mb-5" style={{ color: ACCENT }}>{s.subtitle}</p>
      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
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
              <p className="text-[12px] text-slate-700 leading-snug mb-3">{m.def}</p>
              <div className="mb-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Best when</div>
                <p className="text-[12px] text-slate-600 leading-snug">{m.best}</p>
              </div>
              <div className="mt-auto grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <div className="text-[9px] uppercase text-slate-400">Time to value</div>
                  <div className="text-[12px] text-slate-900 font-semibold">{m.ttv}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase text-slate-400">Commercial shape</div>
                  <div className="text-[12px] font-semibold" style={{ color: ACCENT }}>{m.shape}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-xl py-2.5 px-4 border text-center" style={{ borderColor: `${ACCENT}30`, background: `${ACCENT}10` }}>
        <p className="text-xs font-medium" style={{ color: ACCENT }}>{s.recommend}</p>
      </div>
    </SlideWrapper>
  );
};

const FinancialsSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <div className="flex items-center gap-2 mb-1">
      <Wallet className="w-5 h-5" style={{ color: ACCENT }} />
      <div className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: ACCENT }}>Use cases with financials</div>
    </div>
    <h2 className="text-[26px] font-bold text-slate-900 mb-4 leading-tight">{s.title}</h2>
    <div className="overflow-auto rounded-xl border border-slate-200 flex-1">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-3 py-2.5 font-bold text-slate-900 text-[11px]">Use case</th>
            <th className="px-3 py-2.5 font-bold text-slate-900 text-[11px]">Typical enterprise problem</th>
            <th className="px-3 py-2.5 font-bold text-slate-900 text-[11px]">What we build</th>
            <th className="px-3 py-2.5 font-bold text-slate-900 text-[11px]">Financial lever</th>
            <th className="px-3 py-2.5 font-bold text-[11px]" style={{ color: ACCENT }}>Indicative annual value</th>
          </tr>
        </thead>
        <tbody>
          {s.rows.map((r: any, i: number) => (
            <tr key={i} className="border-t border-slate-100 align-top">
              <td className="px-3 py-2.5 font-semibold text-slate-900 text-[11.5px]">{r.use}</td>
              <td className="px-3 py-2.5 text-slate-600 text-[11px]">{r.problem}</td>
              <td className="px-3 py-2.5 text-slate-700 text-[11px]">{r.build}</td>
              <td className="px-3 py-2.5 text-slate-600 text-[11px]">{r.lever}</td>
              <td className="px-3 py-2.5 font-semibold text-[11.5px]" style={{ color: ACCENT }}>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-[11px] text-slate-400 italic mt-3">{s.note}</p>
  </SlideWrapper>
);

const TeamSlide: React.FC<{ s: any; num: number }> = ({ s, num }) => (
  <SlideWrapper num={num}>
    <div className="mb-4">
      <div className="text-[11px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: ACCENT }}>{s.eyebrow}</div>
      <h2 className="text-[26px] font-bold text-slate-900 leading-tight mb-1.5">{s.title}</h2>
      <p className="text-[13px] text-slate-600 leading-snug max-w-4xl">{s.subhead}</p>
    </div>
    <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
      {s.people.map((p: any, i: number) => (
        <div key={i} className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 flex flex-col">
          <div className="flex items-start gap-3 mb-3 pb-3 border-b border-slate-200">
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: `${ACCENT}18` }}>
              <Users className="w-5 h-5" style={{ color: ACCENT }} />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-slate-900 leading-tight">{p.name}</h3>
              <p className="text-[12px] font-medium" style={{ color: ACCENT }}>{p.role}</p>
            </div>
          </div>
          <p className="text-[11.5px] text-slate-600 leading-snug">{p.bio}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 grid grid-cols-3 gap-3">
      <div className="col-span-2 rounded-xl p-3 text-white flex items-center gap-3" style={{ background: ACCENT }}>
        <Target className="w-4 h-4 text-white/80 shrink-0" />
        <p className="text-[12px] leading-snug">{s.closing}</p>
      </div>
      <div className="border border-slate-200 rounded-xl p-3 bg-white flex flex-col justify-center">
        <div className="flex items-center gap-2 text-[11.5px] text-slate-700"><Mail className="w-3.5 h-3.5" style={{ color: ACCENT }} /> {s.contact.email}</div>
        <div className="flex items-center gap-2 text-[11.5px] text-slate-700 mt-1"><Phone className="w-3.5 h-3.5" style={{ color: ACCENT }} /> {s.contact.phone}</div>
      </div>
    </div>
  </SlideWrapper>
);

// ---------- ROUTER ----------
const renderSlide = (s: any, num: number) => {
  switch (s.type) {
    case 'title':       return <TitleSlide s={s} num={num} />;
    case 'sectors':     return <SectorsSlide s={s} num={num} />;
    case 'capabilities':return <CapabilitiesSlide s={s} num={num} />;
    case 'outcomes':    return <OutcomesSlide s={s} num={num} />;
    case 'clients':     return <ClientsSlide s={s} num={num} />;
    case 'patterns':    return <PatternsSlide s={s} num={num} />;
    case 'lifecycle':   return <LifecycleSlide s={s} num={num} />;
    case 'partner':     return <PartnerSlide s={s} num={num} />;
    case 'engagement':  return <EngagementSlide s={s} num={num} />;
    case 'financials':  return <FinancialsSlide s={s} num={num} />;
    case 'team':        return <TeamSlide s={s} num={num} />;
    default: return <SlideWrapper num={num}><p>Unknown slide</p></SlideWrapper>;
  }
};

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
          {renderSlide(slides[current], current + 1)}
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
