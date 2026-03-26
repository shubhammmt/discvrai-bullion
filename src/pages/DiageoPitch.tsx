import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Maximize, Minimize, ChevronRight } from 'lucide-react';

const TOTAL_SLIDES = 9;
const CLIENT = 'Diageo';

// ─── Shared layout ──────────────────────────────────────────────────
const SlideShell: React.FC<{ children: React.ReactNode; num: number }> = ({ children, num }) => (
  <div className="w-full h-full flex flex-col bg-[hsl(220,42%,11%)] text-white relative overflow-hidden">
    {/* top accent */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />
    {/* subtle grid */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)`,
      backgroundSize: '72px 72px'
    }} />
    <div className="flex-1 relative z-10 px-16 pt-14 pb-10 flex flex-col">{children}</div>
    {/* footer */}
    <div className="absolute bottom-0 left-0 right-0 px-16 pb-4 flex justify-between items-center text-[11px] tracking-wide text-white/30 z-20">
      <span>Confidential &nbsp;|&nbsp; Discvr &nbsp;|&nbsp; 2026</span>
      <span className="font-mono">{String(num).padStart(2, '0')} / {String(TOTAL_SLIDES).padStart(2, '0')}</span>
    </div>
  </div>
);

const Pill: React.FC<{ text: string }> = ({ text }) => (
  <span className="px-5 py-2.5 rounded-full border border-amber-500/30 text-amber-200 text-sm font-medium bg-amber-500/5">{text}</span>
);

const SectionTag: React.FC<{ text: string }> = ({ text }) => (
  <span className="text-[11px] uppercase tracking-[0.2em] text-amber-400 font-semibold">{text}</span>
);

// ─── Slide 1: Cover ─────────────────────────────────────────────────
const CoverSlide = () => (
  <SlideShell num={1}>
    <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto gap-8">
      <div className="w-20 h-1 bg-amber-500 rounded-full" />
      <h1 className="text-[2.8rem] leading-tight font-bold tracking-tight">
        Intelligence, workflows, and governed journeys<br />on the stack you already run
      </h1>
      <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
        From operational visibility to end-to-end automation — including agentic commerce — without replacing your core systems.
      </p>
      <p className="text-sm text-white/30 mt-8">Prepared for {CLIENT} — discussion draft</p>
    </div>
  </SlideShell>
);

// ─── Slide 2: Where we work ─────────────────────────────────────────
const WhereWeWorkSlide = () => (
  <SlideShell num={2}>
    <SectionTag text="Where we work" />
    <h2 className="text-4xl font-bold mt-4">Built for complex operations</h2>
    <p className="text-lg text-white/50 mt-3 max-w-3xl">
      We ship analytics, orchestrated workflows, and customer-facing agentic journeys — for enterprises with serious integration and compliance needs.
    </p>
    <div className="flex flex-wrap gap-3 mt-12">
      {['Supply chain & logistics', 'Infrastructure & energy', 'Rail & mobility', 'Capital markets & research', 'Consumer & regulated routes-to-market'].map(t => (
        <Pill key={t} text={t} />
      ))}
    </div>
    <p className="text-sm text-white/25 mt-auto">Interactive prototypes available under NDA.</p>
  </SlideShell>
);

// ─── Slide 3: The gap ───────────────────────────────────────────────
const GapSlide = () => {
  const cards = [
    { title: 'Siloed truth', text: 'ERP, planning, WMS/TMS, and field tools each hold a piece of the picture. Teams reconcile manually.' },
    { title: 'Slow last mile', text: 'Exceptions surface late. Fixing them still runs on chat, calls, and spreadsheets.' },
    { title: 'India-specific entropy', text: 'Routes, regulation, and partners change fast. Global templates rarely keep pace.' },
  ];
  return (
    <SlideShell num={3}>
      <SectionTag text="The gap" />
      <h2 className="text-4xl font-bold mt-4">Systems of record are not systems of decision</h2>
      <div className="grid grid-cols-3 gap-6 mt-12">
        {cards.map(c => (
          <div key={c.title} className="bg-white/[0.04] border border-white/10 rounded-xl p-8 flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-amber-400">{c.title}</h3>
            <p className="text-white/50 text-[15px] leading-relaxed">{c.text}</p>
          </div>
        ))}
      </div>
      <p className="text-[15px] text-white/40 mt-10 border-l-2 border-amber-500/40 pl-5">
        Analytics alone doesn't close the loop — <span className="text-white/70 font-semibold">work needs to run as a governed workflow</span>.
      </p>
    </SlideShell>
  );
};

// ─── Slide 4: What we deliver ────────────────────────────────────────
const OfferingsSlide = () => {
  const cols = [
    { title: 'Operational intelligence', text: 'Control towers and leadership cockpits: KPIs, alerts, drill-downs across supply, sales, finance, sustainability.' },
    { title: 'Workflow automation & orchestration', text: 'Multi-step business processes: triggers, routing, SLAs, human-in-the-loop approvals, audit logs — across Ops, marketing ops, and partner networks.' },
    { title: 'Agentic commerce', text: 'Conversational journeys from intent → qualification → transaction-ready handoff or completion — with attribution so revenue and spend reconcile to the journey.' },
    { title: 'Document & knowledge workflows', text: 'Ingestion, templates, RAG-aware drafting, reviewer gates, lineage — for research, IB-style, compliance-heavy knowledge work.' },
  ];
  return (
    <SlideShell num={4}>
      <SectionTag text="What we deliver" />
      <h2 className="text-4xl font-bold mt-4">Four offerings — one engineering backbone</h2>
      <p className="text-lg text-white/50 mt-2">Same platform DNA: configurable building blocks, not a pile of disconnected SaaS.</p>
      <div className="grid grid-cols-4 gap-5 mt-10 flex-1">
        {cols.map((c, i) => (
          <div key={i} className="bg-white/[0.04] border border-white/10 rounded-xl p-7 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-lg">{i + 1}</div>
            <h3 className="text-lg font-semibold text-amber-300">{c.title}</h3>
            <p className="text-white/45 text-[14px] leading-relaxed">{c.text}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
};

// ─── Slide 5: Platform (end-to-end) ─────────────────────────────────
const PlatformSlide = () => {
  const steps = ['Signals & data', 'Understand & decide', 'Orchestrate (agents + rules + automations)', 'Human approval / compliance gates', 'Execute & attribute'];
  const bullets = [
    <>
      <span className="font-semibold text-amber-300">Agentic commerce</span> isn't only chat support — it's <span className="font-semibold">conversion infrastructure</span>: attributed outcomes, not vanity engagement.
    </>,
    <>
      <span className="font-semibold text-amber-300">Operations</span> aren't only dashboards — the same layer can <span className="font-semibold">dispatch</span> work: replenishment, callbacks, escalations, exception resolution.
    </>,
    <>
      <span className="font-semibold text-amber-300">One platform ethic:</span> config-driven vertical rules; integrate with existing CRM, payments, ERP, and data lake — we don't ask you to rip your stack.
    </>,
  ];
  return (
    <SlideShell num={5}>
      <SectionTag text="Platform" />
      <h2 className="text-4xl font-bold mt-4">End-to-end flows — not just prettier charts</h2>
      <p className="text-[15px] text-white/50 mt-2 max-w-4xl">
        We assemble <span className="font-semibold text-white/70">accelerators</span> (KYC-style onboarding, product discovery, transaction hooks, widgets, event pipelines) into <span className="font-semibold text-white/70">orchestrated workflows</span> with clear APIs — deploy standalone modules or the full path.
      </p>
      {/* flow diagram */}
      <div className="flex items-center gap-1 mt-10 overflow-x-auto">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className="flex-shrink-0 bg-white/[0.06] border border-white/10 rounded-lg px-5 py-4 text-[13px] font-medium text-white/80 text-center min-w-[160px]">{s}</div>
            {i < steps.length - 1 && <ChevronRight className="w-5 h-5 text-amber-500/60 flex-shrink-0" />}
          </React.Fragment>
        ))}
        <ChevronRight className="w-5 h-5 text-amber-500/30 flex-shrink-0" />
        <div className="flex-shrink-0 bg-amber-500/10 border border-amber-500/30 rounded-lg px-5 py-4 text-[13px] font-semibold text-amber-300 text-center min-w-[160px]">Measure in control tower</div>
      </div>
      {/* bullets */}
      <ul className="mt-8 space-y-3">
        {bullets.map((b, i) => (
          <li key={i} className="text-[14px] text-white/50 leading-relaxed flex items-start gap-3">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </SlideShell>
  );
};

// ─── Slide 6: Why Discvr ─────────────────────────────────────────────
const MoatSlide = () => {
  const rows = [
    ['BI / analytics product or SI dashboard project', 'We run the loop: insight → workflow → action → measurement — not charts that stop at insight.'],
    ['Generic chatbot / support AI', 'Journeys tied to outcomes: identity, compliance steps, catalog, payment/order hooks, attribution — not FAQ deflection.'],
    ['Global SI or offshore dev shop (generic)', 'India enterprise entropy is default: fragmented routes, regulation, partner ecosystems — pre-built patterns for edge → core integration.'],
    ['Many single-purpose SaaS tools', 'Accelerator model: mix-and-match (e.g. onboarding, discovery, orchestration, widget) with shared governance — fewer vendors, clearer audit.'],
  ];
  return (
    <SlideShell num={6}>
      <SectionTag text="Why Discvr" />
      <h2 className="text-4xl font-bold mt-4">How we're different — plainly</h2>
      <p className="text-lg text-white/50 mt-2">We compete on <span className="font-semibold text-white/70">depth of integration + speed + governed automation</span>, not on slides.</p>
      <div className="mt-10 border border-white/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="px-6 py-3 bg-white/[0.04] text-xs uppercase tracking-widest text-white/40 font-semibold">Typical alternative</div>
          <div className="px-6 py-3 bg-amber-500/5 text-xs uppercase tracking-widest text-amber-400 font-semibold">Discvr</div>
        </div>
        {rows.map(([alt, us], i) => (
          <div key={i} className={`grid grid-cols-2 ${i < rows.length - 1 ? 'border-b border-white/[0.06]' : ''}`}>
            <div className="px-6 py-5 text-[14px] text-white/40 leading-relaxed">{alt}</div>
            <div className="px-6 py-5 text-[14px] text-white/70 leading-relaxed bg-amber-500/[0.02]">{us}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-white/25 mt-6">Exact scope depends on industry; we prove value in a bounded pilot.</p>
    </SlideShell>
  );
};

// ─── Slide 7: Architecture fit ──────────────────────────────────────
const ArchSlide = () => (
  <SlideShell num={7}>
    <SectionTag text="Architecture" />
    <h2 className="text-4xl font-bold mt-4">We complement SAP and the global core — we don't rip and replace</h2>
    {/* diagram */}
    <div className="flex items-center justify-center gap-4 mt-14">
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-8 text-center w-64">
        <p className="text-xs uppercase tracking-widest text-white/30 mb-2">Edge data</p>
        <p className="text-sm text-white/50">Mobile, portals, files, chat, WhatsApp</p>
      </div>
      <ChevronRight className="w-8 h-8 text-amber-500/50" />
      <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-xl p-8 text-center w-80">
        <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">Discvr layer</p>
        <p className="text-sm text-white/60">Normalize, enrich, <span className="font-semibold text-amber-300">workflows</span>, apps, agent surfaces</p>
      </div>
      <ChevronRight className="w-8 h-8 text-amber-500/50" />
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-8 text-center w-64">
        <p className="text-xs uppercase tracking-widest text-white/30 mb-2">Core</p>
        <p className="text-sm text-white/50">SAP / planning / data lake / BI / payments</p>
      </div>
    </div>
    <ul className="mt-12 space-y-3">
      {['API-first or file-based ingestion — start pragmatically.', '90-day bounded pilot: one sponsor, one use case, agreed KPIs.', 'Security, access control, and audit expectations defined up front.'].map((b, i) => (
        <li key={i} className="text-[15px] text-white/50 flex items-start gap-3">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
          {b}
        </li>
      ))}
    </ul>
  </SlideShell>
);

// ─── Slide 8: Proof of delivery ──────────────────────────────────────
const ProofSlide = () => (
  <SlideShell num={8}>
    <SectionTag text="Proof of delivery" />
    <h2 className="text-4xl font-bold mt-4">Representative work — see it live</h2>
    <p className="text-lg text-white/50 mt-3 max-w-4xl">
      Clickable demos include supply <span className="font-semibold text-white/70">control towers</span> (with optional agentic recommendations), CEO-grade commercial views, <span className="font-semibold text-white/70">governed knowledge workspaces</span>, and <span className="font-semibold text-white/70">agentic commerce</span>-style journeys — scoped to what {CLIENT} cares about.
    </p>
    <div className="grid grid-cols-3 gap-6 mt-12 flex-1">
      {[
        { label: 'ADF Foods', caption: 'CEO Sales Analytics — control tower with category, brand & zone drill-downs', url: 'https://discvrai-bullion.lovable.app/dashboard/adf-ceo-sales' },
        { label: 'Bajaj Electricals', caption: 'Operational intelligence dashboard — KPIs, alerts & performance tracking', url: 'https://discvrai-bullion.lovable.app/dashboard/bajaj-electricals' },
        { label: 'Helios MF', caption: 'Agentic commerce — conversational conversion + attribution journey', url: 'https://heliosmf.discvr.ai/' },
      ].map(d => (
        <a key={d.label} href={d.url} target="_blank" rel="noopener noreferrer" className="bg-white/[0.03] border border-white/15 rounded-xl flex flex-col items-center justify-center gap-4 min-h-[280px] hover:bg-amber-500/10 hover:border-amber-500/30 transition-all cursor-pointer group">
          <div className="text-xl font-bold text-white/60 group-hover:text-amber-400 transition-colors">{d.label}</div>
          <p className="text-sm text-white/30 max-w-xs text-center group-hover:text-white/50 transition-colors">{d.caption}</p>
          <span className="text-xs text-amber-500/60 group-hover:text-amber-400 transition-colors mt-2">View live demo →</span>
        </a>
      ))}
    </div>
  </SlideShell>
);

// ─── Slide 9: Next step ──────────────────────────────────────────────
const NextStepSlide = () => (
  <SlideShell num={9}>
    <SectionTag text="Next step" />
    <h2 className="text-4xl font-bold mt-4">How we start</h2>
    <div className="mt-12 space-y-6 max-w-3xl">
      {[
        'Name one business sponsor (e.g. Supply, Commercial, Digital, Transformation).',
        'Pick one bounded pilot and 2–3 success metrics — analytics, e2e workflow, or agentic commerce.',
        'Optional: half-day workshop with enterprise architecture to map integrations.',
      ].map((b, i) => (
        <div key={i} className="flex items-start gap-5">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold flex-shrink-0">{i + 1}</div>
          <p className="text-lg text-white/60 leading-relaxed pt-1.5">{b}</p>
        </div>
      ))}
    </div>
    <div className="mt-14">
      <button className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-[hsl(220,42%,11%)] font-semibold rounded-lg transition-colors text-lg">
        Schedule working session
      </button>
    </div>
  </SlideShell>
);

// ─── Slide array ─────────────────────────────────────────────────────
const SLIDES = [CoverSlide, WhereWeWorkSlide, GapSlide, OfferingsSlide, PlatformSlide, MoatSlide, ArchSlide, ProofSlide, NextStepSlide];

// ─── Main page ───────────────────────────────────────────────────────
const DiageoPitch: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [fs, setFs] = useState(false);

  const next = useCallback(() => setIdx(i => Math.min(i + 1, TOTAL_SLIDES - 1)), []);
  const prev = useCallback(() => setIdx(i => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === 'Escape' && fs) { e.preventDefault(); document.exitFullscreen?.(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, fs]);

  useEffect(() => {
    const onChange = () => setFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  };

  const Slide = SLIDES[idx];

  return (
    <div className="w-screen h-screen bg-[hsl(220,42%,11%)] relative overflow-hidden select-none">
      {/* scaled slide container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh', aspectRatio: '16/9' }}>
          <div className="absolute inset-0 transition-opacity duration-200">
            <Slide />
          </div>
        </div>
      </div>

      {/* Navigation overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        <button onClick={prev} disabled={idx === 0} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 flex items-center justify-center transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        {/* dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-amber-400 w-6' : 'bg-white/20 hover:bg-white/40'}`} />
          ))}
        </div>
        <button onClick={next} disabled={idx === TOTAL_SLIDES - 1} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 flex items-center justify-center transition-colors">
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* slide counter + fullscreen */}
      <div className="absolute top-5 right-6 flex items-center gap-3 z-30">
        <span className="text-xs font-mono text-white/30">{idx + 1} / {TOTAL_SLIDES}</span>
        <button onClick={toggleFs} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          {fs ? <Minimize className="w-4 h-4 text-white/60" /> : <Maximize className="w-4 h-4 text-white/60" />}
        </button>
      </div>
    </div>
  );
};

export default DiageoPitch;
