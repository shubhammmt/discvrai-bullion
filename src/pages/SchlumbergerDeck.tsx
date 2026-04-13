import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Link2, Brain, Workflow, BarChart3, Shield, Zap, Users, ArrowRight, Target, Globe, Factory, Cpu, Database, CheckCircle2, Clock, Layers } from 'lucide-react';

const TOTAL = 9;
const ACCENT = '#0D9488';

const slides = [
  {
    id: 1,
    type: 'title',
    headline: 'Operational Control Tower across Schlumberger\'s digital platforms',
    subhead: 'DiscvrAI orchestrates decisions across existing platforms — not another AI platform.',
    kicker: 'Decision orchestration across drilling, reservoir, production, and field operations',
    microLine: 'Schlumberger · Reduce manual cross-domain decisioning · Complement existing digital investments',
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
    type: 'entry-wedge',
    title: 'Where DiscvrAI starts delivering value at Schlumberger',
    items: [
      { label: 'Field materials availability intelligence', desc: 'Real-time visibility into materials status across field operations — reducing delays caused by information gaps between procurement, logistics, and field teams.' },
      { label: 'Cross-domain operational decision routing', desc: 'Route operational decisions that span multiple platforms and teams — drilling × production × supply chain — through structured workflows instead of email chains.' },
      { label: 'Knowledge locked in reports → actionable workflows', desc: 'Transform institutional knowledge trapped in geological studies, well reports, and field SOPs into queryable, citable, workflow-ready intelligence.' },
      { label: 'Exception-driven operational control tower', desc: 'Surface only what needs attention — exceptions, SLA breaches, cross-domain conflicts — instead of requiring teams to monitor multiple dashboards.' },
    ],
    footer: 'Start with one region, one workflow, measurable ROI.',
  },
  {
    id: 4,
    type: 'capabilities',
    title: 'What DiscvrAI adds — operational decision orchestration',
    cards: [
      { icon: Workflow, title: 'Decision orchestration', desc: 'Route cross-platform operational decisions through structured workflows — connecting what your platforms recommend to what your teams execute, with full audit trails.' },
      { icon: Layers, title: 'Operational control tower', desc: 'Exception-first visibility across drilling, production, and field ops. Surface what needs attention — escalations, SLA breaches, cross-domain conflicts — not dashboards.' },
      { icon: Shield, title: 'Human-in-the-loop decisions', desc: 'Material decisions require human judgment. DiscvrAI routes, recommends, and documents — but humans approve. Full governance and compliance audit trails.' },
      { icon: Link2, title: 'Cross-platform workflow execution', desc: 'REST/SOAP/OPC-UA/OSDU — bridge workflows across Delfi, Petrel, SCADA, SAP, and field systems. No forced migration, no rip-and-replace.' },
    ],
    closing: 'We orchestrate decisions between platforms — not replace the platforms themselves.',
  },
  {
    id: 5,
    type: 'architecture',
    title: 'DiscvrAI sits between platforms and decisions',
    layers: [
      { label: 'Schlumberger platforms', items: ['Delfi', 'Petrel', 'SCADA', 'Field tools', 'OSDU'] },
      { label: 'DiscvrAI orchestration layer', items: ['Decision routing', 'Exception handling', 'Knowledge unification', 'Workflow execution'] },
      { label: 'Operational workflows & decisions', items: ['Cross-domain decisions', 'Escalations', 'Approvals', 'Field actions'] },
      { label: 'Enterprise systems', items: ['SAP', 'ERP', 'Compliance', 'BI / Reporting'] },
    ],
    footnote: 'We orchestrate decisions — not replace platforms.',
  },
  {
    id: 6,
    type: 'outcomes',
    title: 'Operational outcomes enabled by DiscvrAI',
    outcomes: [
      { label: 'Reduce field operation delays', desc: 'Faster cross-domain decision routing eliminates manual coordination overhead between drilling, production, and supply chain teams.' },
      { label: 'Improve materials availability', desc: 'Real-time visibility into field materials status across regions — reducing emergency procurement and unplanned downtime.' },
      { label: 'Reduce expedite logistics cost', desc: 'Better demand visibility and exception routing reduces reliance on expensive last-minute logistics and expedited shipping.' },
      { label: 'Faster cross-domain decisions', desc: 'Structured decision workflows replace email chains — reservoir × drilling × production decisions resolved in hours, not days.' },
      { label: 'Unlock working capital from excess inventory', desc: 'Cross-regional materials intelligence identifies surplus inventory that can be redeployed instead of reordered.' },
      { label: 'Improve operational visibility across regions', desc: 'One operational view across global operations — exceptions, escalations, and decision status without switching between multiple platforms.' },
    ],
  },
  {
    id: 7,
    type: 'clients',
    title: 'Selected references — complex operations & regulated environments',
    rows: [
      { client: 'Deep Industries', domain: 'Oil & Gas (field services)', useCase: 'Operations analytics, asset reliability, field service orchestration, ESG visibility' },
      { client: 'Asian Energy Services', domain: 'Upstream energy', useCase: 'Exploration intelligence, production optimization, field O&M' },
      { client: 'Bajaj Electricals', domain: 'Manufacturing', useCase: 'Supply chain analytics, operations intelligence' },
      { client: 'CAMS', domain: 'BFSI / AMC', useCase: 'Distribution, investor analytics' },
      { client: 'ADF Foods', domain: 'Manufacturing', useCase: 'CEO sales dashboard, analytics' },
      { client: 'CMS Infosystems', domain: 'Cash logistics', useCase: 'Operations intelligence, network optimisation' },
      { client: 'Bajaj Finserv', domain: 'NBFC', useCase: 'AI transformation, digital journeys' },
      { client: 'Dalmia Tech', domain: 'Cement / Industrial', useCase: 'Digital transformation, operations intelligence' },
    ],
    footnote: 'Oil & gas operations (Deep Industries, Asian Energy), manufacturing, and enterprise patterns directly inform our approach to complementing digitally mature oilfield service organisations.',
  },
  {
    id: 8,
    type: 'pilot',
    title: 'Low-risk pilot for digitally mature operations',
    steps: [
      { step: '1', label: 'One operational workflow', desc: 'Identify a single cross-platform decision gap — materials availability, exception routing, or cross-domain coordination.' },
      { step: '2', label: 'One region or business unit', desc: 'Deploy in a contained operational environment — one geography, one team, one measurable workflow.' },
      { step: '3', label: 'Connect existing platforms', desc: 'Integrate with Delfi, SCADA, SAP, and field systems already in place — no migration, no disruption to current operations.' },
      { step: '4', label: 'Deploy orchestration layer', desc: 'DiscvrAI sits alongside existing systems — routing decisions, surfacing exceptions, and documenting outcomes.' },
      { step: '5', label: 'Measure decision cycle time', desc: 'Quantify improvement in decision speed, exception resolution time, and cross-domain coordination overhead.' },
      { step: '6', label: 'Expand after validation', desc: 'Proven workflow patterns replicate across regions and operational domains with minimal incremental effort.' },
    ],
    callout: '8–10 week pilot alongside existing systems.',
  },
  {
    id: 9,
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
    ],
    cta: {
      steps: [
        'Identify one cross-platform operational decision gap',
        'Deploy DiscvrAI orchestration layer',
        'Run pilot in 8–10 weeks',
        'Measure operational impact',
        'Scale across domains',
      ],
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

/* Slide 1 — Title */
const TitleSlideContent: React.FC = () => {
  const s = slides[0] as any;
  return (
    <SlideWrapper num={1}>
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-sm font-medium mb-4 tracking-wide uppercase" style={{ color: ACCENT }}>{s.kicker}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">{s.headline}</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mb-8">{s.subhead}</p>
        <p className="text-sm text-slate-400">{s.microLine}</p>
      </div>
    </SlideWrapper>
  );
};

/* Slide 2 — Why Now */
const WhyNowSlide: React.FC = () => {
  const s = slides[1] as any;
  const icons = [Globe, Factory, Database, Cpu];
  return (
    <SlideWrapper num={2}>
      <h2 className="text-3xl font-bold text-slate-900 mb-8">{s.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
        {s.bullets.map((b: any, i: number) => {
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

/* Slide 3 — Entry Wedge (NEW) */
const EntryWedgeSlide: React.FC = () => {
  const s = slides[2] as any;
  return (
    <SlideWrapper num={3}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
        {s.items.map((item: any, i: number) => (
          <div key={i} className="border border-slate-200 rounded-xl p-5 bg-white">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${ACCENT}15` }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: ACCENT }} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{item.label}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-sm font-medium" style={{ color: ACCENT }}>{s.footer}</p>
      </div>
    </SlideWrapper>
  );
};

/* Slide 4 — Capabilities (refined) */
const CapabilitiesSlide: React.FC = () => {
  const s = slides[3] as any;
  return (
    <SlideWrapper num={4}>
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

/* Slide 5 — Architecture (NEW) */
const ArchitectureSlide: React.FC = () => {
  const s = slides[4] as any;
  return (
    <SlideWrapper num={5}>
      <h2 className="text-3xl font-bold text-slate-900 mb-8">{s.title}</h2>
      <div className="flex-1 flex flex-col gap-3">
        {s.layers.map((layer: any, i: number) => (
          <React.Fragment key={i}>
            <div className={`rounded-xl px-6 py-4 ${i === 1 ? 'text-white' : 'bg-slate-50 border border-slate-200'}`}
              style={i === 1 ? { background: ACCENT } : {}}>
              <p className={`font-bold text-base mb-2 ${i === 1 ? 'text-white' : 'text-slate-900'}`}>{layer.label}</p>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item: string, j: number) => (
                  <span key={j} className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    i === 1 ? 'bg-white/20 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}>{item}</span>
                ))}
              </div>
            </div>
            {i < s.layers.length - 1 && (
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="text-sm font-medium mt-4 border-t border-slate-100 pt-4" style={{ color: ACCENT }}>{s.footnote}</p>
    </SlideWrapper>
  );
};

/* Slide 6 — Outcomes (NEW) */
const OutcomesSlide: React.FC = () => {
  const s = slides[5] as any;
  return (
    <SlideWrapper num={6}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {s.outcomes.map((o: any, i: number) => (
          <div key={i} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-base mb-2">{o.label}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{o.desc}</p>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};

/* Slide 7 — Clients */
const ClientsSlide: React.FC = () => {
  const s = slides[6] as any;
  return (
    <SlideWrapper num={7}>
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

/* Slide 8 — Pilot (NEW) */
const PilotSlide: React.FC = () => {
  const s = slides[7] as any;
  return (
    <SlideWrapper num={8}>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        {s.steps.map((step: any, i: number) => (
          <div key={i} className="border border-slate-200 rounded-xl p-5 bg-white">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-3 font-bold text-sm text-white" style={{ background: ACCENT }}>
              {step.step}
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">{step.label}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl px-6 py-4 border-2" style={{ borderColor: ACCENT, background: `${ACCENT}08` }}>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
          <p className="font-bold text-slate-900 text-lg">{s.callout}</p>
        </div>
      </div>
    </SlideWrapper>
  );
};

/* Slide 9 — Team & CTA (updated) */
const TeamSlideContent: React.FC = () => {
  const s = slides[8] as any;
  return (
    <SlideWrapper num={9}>
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
            <h4 className="font-bold text-lg mb-3">Next steps</h4>
            <ol className="space-y-2">
              {s.cta.steps.map((step: string, i: number) => (
                <li key={i} className="flex gap-3 text-white/90 text-sm">
                  <span className="font-bold text-white shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
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
  TitleSlideContent, WhyNowSlide, EntryWedgeSlide, CapabilitiesSlide,
  ArchitectureSlide, OutcomesSlide, ClientsSlide, PilotSlide, TeamSlideContent,
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
