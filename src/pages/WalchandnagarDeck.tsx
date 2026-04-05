import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Link2, Brain, Workflow, BarChart3, Shield, Zap, Users, ArrowRight, Target, Factory, Cog, Rocket, Atom } from 'lucide-react';

const TOTAL = 8;
const ACCENT = '#0F766E';

const slides = [
  {
    id: 1,
    type: 'title',
    headline: 'From project-heavy engineering to real-time execution intelligence — production planning, shop-floor visibility, and supply chain command',
    subhead: 'Integration-first workflow automation, governed knowledge (RAG), and agentic orchestration across defense, nuclear, aerospace, and industrial manufacturing — built as an edge layer on your existing shop-floor and ERP data.',
    kicker: '',
    microLine: 'Walchandnagar Industries · Defense & Aerospace · Nuclear Engineering · Precision Manufacturing · Industrial Products',
  },
  {
    id: 2,
    type: 'why-now',
    title: 'You run highly complex, high-value engineering programs — but execution visibility and planning are still fragmented',
    bullets: [
      { label: 'Defense & aerospace', text: 'Missile systems components, ISRO supply chain, precision assemblies — production cycles are long, tolerances are tight, and project tracking relies on manual updates across shop-floor supervisors, quality teams, and program managers.' },
      { label: 'Nuclear & heavy engineering', text: 'Reactor components, large industrial equipment, custom fabrication — each project is unique, supply chains are complex, and delays cascade because visibility into WIP status comes too late.' },
      { label: 'Industrial products', text: 'Gearboxes, castings, precision machining — machine utilisation, job sequencing, and quality tracking are managed through spreadsheets and fragmented MES/ERP data; institutional knowledge stays in people\'s heads.' },
      { label: 'Cross-program operations', text: 'Shop-floor data, manual planning, Excel-based tracking across all divisions — no unified view of machine health, project milestones, material availability, or workforce deployment across programs.' },
    ],
  },
  {
    id: 3,
    type: 'capabilities',
    title: 'What DiscvrAI ships today — capabilities, not slides',
    cards: [
      { icon: Link2, title: 'Connect & integrate', desc: 'REST/OPC-UA/MES/SCADA/SAP; meet data where it lives — shop-floor controllers, ERP, quality systems, project management tools — bounded pilots without forced migration.' },
      { icon: Brain, title: 'Understand (RAG)', desc: 'Engineering drawings, SOPs, quality manuals, process sheets, inspection reports, ISRO/DRDO compliance docs: grounded answers with citations and full audit trail.' },
      { icon: Workflow, title: 'Automate & orchestrate', desc: 'Approvals, NCR workflows, inspection gates, material requisitions, project milestone escalations; multi-step agents where appropriate; humans approve material actions — every time.' },
      { icon: BarChart3, title: 'Measure', desc: 'Production KPIs, machine utilisation, project cost tracking, quality yield, delivery schedule adherence — drill-downs from signal → decision → action for shop-floor and leadership.' },
    ],
    closing: 'Manufacturing-grade stack — connectors, model routing, workflow engine — weeks-to-pilot engineering discipline.',
  },
  {
    id: 4,
    type: 'gap',
    title: 'Systems of record are not systems of decision — or of shop-floor speed',
    diagram: ['Shop floor (CNC, assembly, quality, SCADA, field data)', 'DiscvrAI (connect · understand · automate · measure)', 'SAP / MES / project tools / BI'],
    table: [
      { reality: 'Shop-floor controllers, MES, quality logs, SAP', breaks: 'Silos; production status rebuilt manually every shift; delays caught late', adds: 'Real-time production visibility + early exception alerts per machine / job / program' },
      { reality: 'Project-based manufacturing tracking', breaks: 'Milestone visibility fragmented across Excel; cost overruns surface at reviews', adds: 'Live project command centre with automated escalations and cost variance tracking' },
      { reality: 'Maintenance logs, machine run-hours, breakdown records', breaks: 'Reactive maintenance; unplanned downtime on critical CNC and heavy equipment', adds: 'Predictive maintenance models — 15–25% downtime reduction on high-value machines' },
    ],
  },
  {
    id: 5,
    type: 'clients',
    title: 'Selected references — complex manufacturing & regulated environments',
    intro: '',
    rows: [
      { client: 'Deep Industries', domain: 'Oil & Gas (field services)', useCase: 'Operations analytics, asset reliability, field service orchestration' },
      { client: 'Bajaj Electricals', domain: 'Manufacturing', useCase: 'Supply chain analytics, operations intelligence' },
      { client: 'Dalmia Tech', domain: 'Cement / Industrial', useCase: 'Digital transformation, manufacturing operations intelligence' },
      { client: 'CMS Infosystems', domain: 'Cash logistics', useCase: 'Operations intelligence, network optimisation' },
      { client: 'ADF Foods', domain: 'Manufacturing', useCase: 'CEO sales dashboard, production analytics' },
      { client: 'Bajaj Finserv', domain: 'NBFC', useCase: 'AI transformation, digital journeys' },
      { client: 'CAMS', domain: 'BFSI / AMC', useCase: 'Distribution, analytics' },
      { client: 'Drychem', domain: 'Manufacturing', useCase: 'Operations, analytics' },
      { client: 'Aptech', domain: 'Education', useCase: 'AI career counsellor, enrollment' },
    ],
    footnote: 'Manufacturing operations (Dalmia, Bajaj Electricals, ADF Foods), asset reliability (Deep Industries), and complex project patterns directly inform how we adapter-map to high-precision, project-based heavy engineering workflows.',
  },
  {
    id: 6,
    type: 'patterns',
    title: 'Representative heavy engineering patterns — prototypes and demos on request',
    grid: [
      { pattern: 'Production planning intelligence', desc: 'AI-driven machine utilisation optimisation, job sequencing, bottleneck prediction, WIP tracking — faster project delivery, working capital improvement' },
      { pattern: 'Shop-floor visibility layer', desc: 'Real-time tracking of machining, assembly, quality gates — move from delayed shift reports to live production dashboards with exception alerts' },
      { pattern: 'Predictive maintenance', desc: 'CNC machines, heavy presses, furnaces — vibration, temperature, run-hour models; 15–25% downtime reduction on high-value equipment' },
      { pattern: 'Supply chain command', desc: 'Vendor performance tracking, raw material planning, lead-time prediction — fewer production stoppages from material shortages on long-cycle projects' },
      { pattern: 'Engineering knowledge (RAG)', desc: 'Process sheets, quality manuals, ISRO/DRDO compliance docs, inspection records — searchable, citable, governed access across all engineering teams' },
      { pattern: 'Program leadership MIS', desc: 'One-screen story: project delivery vs schedule, machine utilisation, quality yield, cost variance, material availability, workforce deployment across all divisions' },
    ],
  },
  {
    id: 7,
    type: 'lifecycle',
    title: 'One spine across all divisions — defense to nuclear to industrial products',
    bullets: [
      { label: 'Shared foundation', text: 'Identity, roles, audit logs, data residency and deployment choices agreed before scope expansion — one governance spine across all manufacturing divisions and security classifications.' },
      { label: 'Defense & aerospace', text: 'Production milestone tracking, quality gate automation, compliance documentation (RAG over DRDO/ISRO specs), traceability for every component — institutional knowledge made searchable and citable.' },
      { label: 'Nuclear & heavy engineering', text: 'Project command centre for reactor component manufacturing — cost tracking, WIP visibility, vendor milestone automation, inspection scheduling — exception-first for program managers.' },
      { label: 'Industrial products', text: 'Machine utilisation optimisation, job sequencing, predictive maintenance for CNC and heavy equipment, quality yield analytics — shop-floor to boardroom visibility.' },
      { label: 'Cross-program operations', text: 'Unified supply chain intelligence, workforce deployment tracking, material planning across all divisions — replace Excel-based planning with a real-time execution platform.' },
      { label: '8–10 week pilot', text: 'One division, one end-to-end workflow, KPIs fixed day one (cycle time, machine utilisation, on-time delivery, quality yield, exception age).' },
    ],
    quote: "Built to be Walchandnagar's execution intelligence layer — shop-floor to boardroom, fast to production, measurable, and architecture-friendly.",
  },
  {
    id: 8,
    type: 'team',
    title: 'Operator-led engineering — pilots with CIO-grade discipline',
    person: {
      name: 'Shubham Srivastava',
      role: 'CEO, DiscvrAI',
      cred: 'Two decades leading large-scale digital transformation and technology organisations — CIO (Eureka Forbes), CTO (Hindustan Times), Head of Technology (MakeMyTrip).',
    },
    bullets: [
      'Built for legacy stacks, fragmented data, and compliance pressure — manufacturing and industrial operations experience across multiple sectors.',
      'Repeatable accelerators: connectors, RAG, model routing, orchestration — production in weeks, not quarters.',
    ],
    cta: {
      primary: 'Identify one high-impact use case — production planning intelligence, shop-floor visibility, or predictive maintenance — we build a working pilot in 8–10 weeks on your data and workflows.',
      secondary: 'Architecture alignment on integration points (MES, SCADA, SAP, shop-floor controllers, project management tools) before build commitments.',
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
        {s.kicker && <p className="text-sm font-medium mb-4" style={{ color: ACCENT }}>{s.kicker}</p>}
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
          const icons = [Rocket, Atom, Cog, Factory];
          const Icon = icons[i];
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
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
      <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
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
      <div className="overflow-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-5 py-3 font-bold text-slate-900">Their reality</th>
              <th className="px-5 py-3 font-bold text-slate-900">What breaks</th>
              <th className="px-5 py-3 font-bold text-slate-900">What we add</th>
            </tr>
          </thead>
          <tbody>
            {s.table.map((r: any, i: number) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-5 py-3 text-slate-700">{r.reality}</td>
                <td className="px-5 py-3 text-slate-500">{r.breaks}</td>
                <td className="px-5 py-3 font-medium" style={{ color: ACCENT }}>{r.adds}</td>
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

const TeamSlideContent: React.FC = () => {
  const s = slides[7] as any;
  return (
    <SlideWrapper num={8}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div>
          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 mb-5">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: `${ACCENT}18` }}>
              <Users className="w-7 h-7" style={{ color: ACCENT }} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{s.person.name}</h3>
            <p className="font-medium mb-3" style={{ color: ACCENT }}>{s.person.role}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{s.person.cred}</p>
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
  ClientsSlide, PatternsSlide, LifecycleSlide, TeamSlideContent,
];

const WalchandnagarDeck: React.FC = () => {
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

export default WalchandnagarDeck;
