import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Link2, Brain, Workflow, BarChart3, Shield, Zap, Users, ArrowRight, Target, Globe, Factory, Cpu, Database } from 'lucide-react';

const TOTAL = 8;
const ACCENT = '#0D9488';

const slides = [
  {
    id: 1,
    type: 'title',
    headline: 'Complementary AI orchestration for the world\'s most digitally mature oilfield services company',
    subhead: 'DiscvrAI delivers integration-first workflow automation, governed knowledge (RAG), and multi-LLM routing as a lightweight orchestration layer that amplifies — not replaces — Schlumberger\'s existing digital platforms, AI models, and subsurface software.',
    kicker: '',
    microLine: 'Schlumberger · Reservoir Modeling · Drilling · Production Optimization · Digital Platforms',
  },
  {
    id: 2,
    type: 'why-now',
    title: 'Digital maturity creates a different problem — orchestration across best-in-class silos',
    bullets: [
      { label: 'Reservoir & subsurface intelligence', text: 'World-class AI platforms and digital twins for reservoir modeling — but cross-domain insights (reservoir × drilling × production × commercial) still require manual synthesis across proprietary tools and specialist teams.' },
      { label: 'Drilling performance & automation', text: 'Advanced drilling optimization and automation systems — yet operational knowledge (lessons learned, offset well data, field SOPs) remains locked in PDFs, emails, and individual expertise rather than being instantly queryable.' },
      { label: 'Production & asset performance', text: 'Sophisticated production monitoring and optimization tools — but exception workflows, escalation paths, and cross-functional decision loops still travel through email/Teams/manual handoffs across global operations.' },
      { label: 'Digital platform ecosystem', text: 'Multiple best-in-class digital products (Delfi, OSDU contributions, cloud platforms) — the challenge isn\'t capability per platform but orchestrating workflows and knowledge that span across them.' },
    ],
  },
  {
    id: 3,
    type: 'capabilities',
    title: 'What DiscvrAI adds — a thin orchestration layer, not another platform',
    cards: [
      { icon: Link2, title: 'Connect across platforms', desc: 'REST/SOAP/files/OPC-UA/OSDU; bridge data across Delfi, Petrel, SCADA, SAP, and field systems — no forced migration, no rip-and-replace.' },
      { icon: Brain, title: 'Unified knowledge (RAG)', desc: 'Well files, drilling reports, completion records, HSE manuals, geological studies: one governed, citable knowledge layer across all proprietary systems and document stores.' },
      { icon: Workflow, title: 'Workflow orchestration', desc: 'Cross-platform approval flows, SLA tracking, exception escalations, human-in-the-loop AI actions — connecting what your platforms decide to what your teams execute.' },
      { icon: BarChart3, title: 'Decision intelligence', desc: 'Cross-domain KPIs that span reservoir, drilling, production, and commercial — the "last mile" dashboard that no single platform owns today.' },
    ],
    closing: 'Designed for digitally mature organisations — we amplify your existing AI and digital investments, not compete with them.',
  },
  {
    id: 4,
    type: 'gap',
    title: 'Best-in-class platforms still leave orchestration gaps between them',
    diagram: ['Schlumberger platforms (Delfi, Petrel, SCADA, field tools)', 'DiscvrAI orchestration layer (connect · unify · automate · measure)', 'Enterprise systems (SAP, ERP, BI, compliance)'],
    table: [
      { reality: 'Multiple AI platforms + digital twins per domain', breaks: 'Cross-domain insights require manual synthesis; institutional knowledge fragmented across tools', adds: 'Unified knowledge layer (RAG) — queryable, citable, governed across all platforms' },
      { reality: 'Advanced drilling & reservoir optimization', breaks: 'Operational lessons, offset data, field SOPs locked in documents; not instantly accessible to field teams', adds: 'Instant field knowledge access — "ask anything" with full audit trail and citations' },
      { reality: 'Global operations across 100+ countries', breaks: 'Exception workflows, escalations, and cross-functional decisions still travel through email/manual loops', adds: 'Automated workflow orchestration with human-in-the-loop for material decisions' },
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
      { client: 'Asian Energy Services', domain: 'Upstream energy', useCase: 'Exploration intelligence, production optimization, field O&M' },
      { client: 'Aptech', domain: 'Education', useCase: 'AI career counsellor, enrollment' },
    ],
    footnote: 'Oil & gas operations (Deep Industries, Asian Energy), manufacturing, and enterprise patterns directly inform our approach to complementing digitally mature oilfield service organisations.',
  },
  {
    id: 6,
    type: 'patterns',
    title: 'Orchestration patterns for digitally mature upstream operations',
    grid: [
      { pattern: 'Cross-platform knowledge unification', demo: 'RAG across Petrel outputs, well files, drilling reports, geological studies, HSE manuals — one queryable, citable knowledge layer regardless of source system' },
      { pattern: 'Operational workflow orchestration', demo: 'Exception-first routing: cross-domain escalations, approval chains, SLA tracking across drilling, production, and field ops — reducing manual coordination overhead' },
      { pattern: 'Field knowledge assistant', demo: 'Instant access to offset well data, completion records, lessons learned, SOPs — governed, auditable, accessible to field engineers on any device' },
      { pattern: 'Cross-domain decision layer', demo: 'Reservoir × drilling × production × commercial KPIs in one view — the "last mile" intelligence that spans platform boundaries' },
      { pattern: 'Compliance & HSE orchestration', demo: 'Automated compliance tracking, permit workflows, incident correlation across global operations — audit-ready, role-based, multi-jurisdiction' },
      { pattern: 'Global ops command centre', demo: 'One-screen: asset performance, exception age, escalation status, workforce deployment across regions — drill-down from portfolio to individual well' },
    ],
  },
  {
    id: 7,
    type: 'lifecycle',
    title: 'Complementary layer — amplifying digital investments across the value chain',
    bullets: [
      { label: 'Not a replacement', text: 'DiscvrAI sits alongside your existing platforms (Delfi, Petrel, OSDU, cloud infrastructure) — we orchestrate across them, not compete with them. Your AI models, your data, your platforms remain the core.' },
      { label: 'Reservoir & subsurface', text: 'Unified knowledge access across geological studies, well files, and reservoir models — making institutional expertise searchable and citable for faster cross-domain decision-making.' },
      { label: 'Drilling & field operations', text: 'Workflow orchestration for exception handling, lessons-learned capture, and cross-functional coordination — reducing the manual overhead that persists between automated systems.' },
      { label: 'Production & asset management', text: 'Cross-platform exception routing, SLA-driven escalations, and decision audit trails — connecting what your optimization tools recommend to what your teams execute.' },
      { label: 'Global scale', text: 'Multi-tenant, role-based, multi-jurisdiction governance — designed for 100+ country operations with data residency, compliance tracking, and audit requirements.' },
      { label: '8–10 week pilot', text: 'One operational domain, one cross-platform workflow, KPIs fixed day one — demonstrating orchestration value without disrupting existing platform investments.' },
    ],
    quote: "Built to complement the world's most advanced oilfield digital ecosystem — orchestrating the spaces between platforms where decisions still travel through email.",
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
      'Built for enterprises with existing digital maturity — we complement, not compete with, your platform investments.',
      'Oil & gas field operations experience via Deep Industries and Asian Energy Services; enterprise patterns across manufacturing, BFSI, and logistics.',
      'Repeatable accelerators: connectors, RAG, model routing, orchestration — production in weeks, not quarters.',
    ],
    cta: {
      primary: 'Identify one cross-platform orchestration gap — knowledge unification, workflow coordination, or cross-domain decision intelligence — we build a working pilot in 8–10 weeks alongside your existing systems.',
      secondary: 'Architecture alignment on integration points (Delfi, OSDU, Petrel, SAP, field systems) before build commitments — respecting your existing digital architecture.',
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
          const icons = [Globe, Factory, Database, Cpu];
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

const SchlumbergerDeck: React.FC = () => {
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

export default SchlumbergerDeck;
