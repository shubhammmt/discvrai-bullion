import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Link2, Brain, Workflow, BarChart3, Shield, Zap, Users, ArrowRight, Target, Globe, Factory, Droplets } from 'lucide-react';

const TOTAL = 8;
const ACCENT = '#0D9488';

const slides = [
  {
    id: 1,
    type: 'title',
    headline: 'AI-first operations intelligence for Exploration & Production — on your existing data and engineering landscape',
    subhead: 'Integration-first workflow automation, governed knowledge (RAG), and agentic orchestration across subsurface, drilling, production, and HSE — built as an edge layer, not a rip-and-replace.',
    kicker: '',
    microLine: 'Reliance Industries · E&P operations · Subsurface to surface · AI at production pace',
  },
  {
    id: 2,
    type: 'why-now',
    title: 'Core systems hold data; competitive advantage is speed of decision at the wellsite and beyond',
    bullets: [
      { label: 'Subsurface complexity', text: 'Seismic interpretation, reservoir modelling, well planning — decisions depend on synthesising geological, petrophysical, and production data scattered across specialised tools and legacy historians.' },
      { label: 'Drilling & completions', text: 'Real-time drilling parameters, mud logs, directional surveys, BHA configurations — exception-first visibility can prevent NPT and reduce well delivery costs measurably.' },
      { label: 'Production operations', text: 'Artificial lift optimisation, flow assurance, facility uptime, water/gas injection — daily decisions still rely on manual data pulls and spreadsheet reconciliation across multiple SCADA/DCS systems.' },
      { label: 'HSE & regulatory', text: 'OISD compliance, DGH reporting, environmental monitoring, PTW workflows — governed knowledge and automated audit trails reduce risk and manual effort simultaneously.' },
    ],
  },
  {
    id: 3,
    type: 'capabilities',
    title: 'What DiscvrAI ships today — capabilities, not slides',
    cards: [
      { icon: Link2, title: 'Connect & integrate', desc: 'REST/SOAP/files/OPC-UA/historians; meet data where it lives — SCADA, PI, OSIsoft, SAP PM, drilling systems — bounded pilots without forced migration.' },
      { icon: Brain, title: 'Understand (RAG)', desc: 'Well files, SOPs, safety manuals, regulatory guidelines, engineering standards: grounded answers with citations and full audit trail.' },
      { icon: Workflow, title: 'Automate & orchestrate', desc: 'Approvals, SLAs, escalations, PTW workflows; multi-step agents where appropriate; humans approve material actions — every time.' },
      { icon: BarChart3, title: 'Measure', desc: 'Operational KPIs, production dashboards, drill-downs from signal → decision → action for asset teams and leadership.' },
    ],
    closing: 'Production-minded stack — connectors, model routing, workflow engine — weeks-to-pilot engineering discipline.',
  },
  {
    id: 4,
    type: 'gap',
    title: 'Systems of record are not systems of decision — or of field-level speed',
    diagram: ['Edge (wellsites, platforms, SCADA, historians, field data)', 'DiscvrAI (connect · understand · automate · measure)', 'SAP / PI / data lake / engineering tools'],
    table: [
      { reality: 'Drilling systems, SCADA, historians, SAP PM', breaks: 'Silos; truth rebuilt in email/Excel daily', adds: 'One operational picture + early exceptions per well / facility' },
      { reality: 'Engineering tools & reservoir models', breaks: 'Insights locked in specialist desktops', adds: 'Governed RAG: searchable, citable knowledge across disciplines' },
      { reality: 'HSE, PTW, compliance workflows', breaks: 'Manual tracking; audit gaps', adds: 'Versioned workflows with citations and automated compliance narratives' },
    ],
  },
  {
    id: 5,
    type: 'clients',
    title: 'Selected references — complex operations & regulated environments',
    intro: '',
    rows: [
      { client: 'Deep Industries', domain: 'Oil & Gas (field services)', useCase: 'Operations analytics, asset reliability, field service orchestration, ESG visibility' },
      { client: 'Bajaj Electricals', domain: 'Manufacturing', useCase: 'Supply chain analytics, operations intelligence' },
      { client: 'CAMS', domain: 'BFSI / AMC', useCase: 'Distribution, investor analytics' },
      { client: 'ADF Foods', domain: 'Manufacturing', useCase: 'CEO sales dashboard, analytics' },
      { client: 'Bajaj Finserv', domain: 'NBFC', useCase: 'AI transformation, digital journeys' },
      { client: 'Dalmia Tech', domain: 'Cement / Industrial', useCase: 'Digital transformation, operations intelligence' },
      { client: 'CMS Infosystems', domain: 'Cash logistics', useCase: 'Operations intelligence, network optimisation' },
      { client: 'Drychem', domain: 'Manufacturing', useCase: 'Operations, analytics' },
      { client: 'Aptech', domain: 'Education', useCase: 'AI career counsellor, enrollment' },
    ],
    footnote: 'Oil & gas field operations (Deep Industries), manufacturing, and industrial patterns directly inform how we adapter-map to upstream E&P estates — subsurface, drilling, production, and HSE workflows.',
  },
  {
    id: 6,
    type: 'patterns',
    title: 'Representative E&P patterns — prototypes and demos on request',
    grid: [
      { pattern: 'Production control tower', demo: 'Exception-first ops: well performance, facility uptime, injection rates, artificial lift health — drill-downs, fewer status meetings' },
      { pattern: 'Drilling performance intelligence', demo: 'Real-time KPIs: ROP, NPT tracking, BHA analytics, offset well comparison — one screen per active well' },
      { pattern: 'Subsurface knowledge (RAG)', demo: 'Well files, geological reports, completion records, reservoir studies — searchable, citable, governed access' },
      { pattern: 'HSE & compliance workflows', demo: 'PTW automation, incident tracking, OISD/DGH compliance narratives, environmental monitoring dashboards' },
      { pattern: 'Asset integrity & maintenance', demo: 'Equipment health, corrosion monitoring, inspection scheduling, SAP PM integration with predictive signals' },
      { pattern: 'Leadership MIS', demo: 'One-screen story: production vs target, cost per barrel, facility availability, HSE scorecard' },
    ],
  },
  {
    id: 7,
    type: 'ep-extension',
    title: 'One spine across the E&P value chain — subsurface to export',
    bullets: [
      { label: 'Shared foundation', text: 'Identity, roles, audit logs, data residency and deployment choices agreed before scope expansion — one governance spine across all E&P assets and functions.' },
      { label: 'Subsurface & reservoir', text: 'Geological knowledge management (RAG over well files, seismic reports), reservoir performance tracking, offset well analytics — making institutional knowledge searchable and citable.' },
      { label: 'Drilling & completions', text: 'Real-time drilling dashboards, NPT reduction workflows, BHA performance tracking, well delivery cost analytics — exception-first visibility for drilling engineers and management.' },
      { label: 'Production & facilities', text: 'Artificial lift optimisation, flow assurance, water/gas injection monitoring, facility uptime — daily production meeting intelligence automated.' },
      { label: 'HSE & regulatory', text: 'PTW digitisation, OISD compliance tracking, DGH reporting automation, environmental monitoring — governed workflows with complete audit trails.' },
      { label: '8–10 week pilot', text: 'One asset, one end-to-end workflow, KPIs fixed day one (cycle time, manual hours, exception age, decision quality, compliance coverage).' },
    ],
    quote: "Built to be E&P's execution intelligence layer — wellsite to boardroom, fast to production, measurable, and architecture-friendly.",
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
      'Built for legacy stacks, fragmented data, and compliance pressure — oil & gas field operations experience via Deep Industries.',
      'Repeatable accelerators: connectors, RAG, model routing, orchestration — production in weeks, not quarters.',
    ],
    cta: {
      primary: 'Identify one high-impact E&P use case — production intelligence, drilling performance, or subsurface knowledge management — we build a working pilot in 8–10 weeks on your data and workflows.',
      secondary: 'Architecture alignment on integration points (SAP, SCADA/PI, historians, engineering tools) before build commitments.',
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
          const icons = [Globe, Factory, Droplets, Shield];
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
            <p className="text-slate-600 text-sm leading-relaxed">{g.demo}</p>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};

const EPExtensionSlide: React.FC = () => {
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
  ClientsSlide, PatternsSlide, EPExtensionSlide, TeamSlideContent,
];

const RelianceEPDeck: React.FC = () => {
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

export default RelianceEPDeck;
