import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle, AlertTriangle, Users, Clock, Shield, Target, BarChart3, FileText, Database, Layers } from 'lucide-react';

const TOTAL_SLIDES = 4;

const DamCapitalDeck: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= TOTAL_SLIDES) return;
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  const slides = [Slide1, Slide2, Slide3, Slide4];
  const SlideComponent = slides[current];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Dam Capital — Execution Framework</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/40">
            {current + 1} / {TOTAL_SLIDES}
          </span>
          <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">
            For Discussion Only
          </span>
        </div>
      </header>

      {/* Slide Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-y-auto"
          >
            <div className="min-h-full flex items-start justify-center p-8">
              <div className="w-full max-w-5xl">
                <SlideComponent />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="h-16 flex items-center justify-between px-6 border-t border-white/10 shrink-0">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex gap-2">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-amber-400 scale-125' : 'bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === TOTAL_SLIDES - 1}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ─── Slide 1: Decision Frame ─── */
const Slide1 = () => (
  <div>
    <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">Slide 1 of 4</p>
    <h1 className="text-3xl md:text-4xl font-light mb-2">
      Decision Frame: <span className="text-amber-400 font-medium">Risk, Timeline & Commercials</span>
    </h1>
    <p className="text-white/50 text-sm mb-8 max-w-3xl">
      How we proceed is a trade-off across risk, timeline, and commercials — we do not commit a fixed end date until scope is locked with your teams and data paths are clear.
    </p>

    <div className="space-y-4 mb-8">
      {[
        {
          icon: AlertTriangle,
          pillar: 'Risk',
          color: 'text-red-400',
          bg: 'bg-red-500/10',
          detail: 'Data quality, access to subject-matter owners, integration surfaces (exports, CRM, event app, accounting/broking stacks where relevant), and — for heavy document automation — RAG/LLM accuracy and run-rate cost (needs scoped POCs where applicable).'
        },
        {
          icon: Clock,
          pillar: 'Timeline',
          color: 'text-amber-400',
          bg: 'bg-amber-500/10',
          detail: 'Scope lock for a vertical typically needs ~1–2 weeks of product + engineering time with business owners (on top of discovery already done). Build + UAT follow. For MIS, many programmes often land in roughly 4–8 weeks end-to-end after that lock — indicative only; we do not commit until source files, refresh rules, and integrations are validated. Change management sits on top of engineering time.'
        },
        {
          icon: Target,
          pillar: 'Commercials',
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          detail: 'Driven by how many workstreams run in parallel and by seniority / squad shape agreed after scope lock. One clear next step: detailing sprint → written scope + phased plan → then commercial proposal.'
        },
      ].map((item) => (
        <div key={item.pillar} className={`${item.bg} border border-white/5 rounded-xl p-5`}>
          <div className="flex items-center gap-3 mb-2">
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <h3 className={`font-semibold ${item.color}`}>{item.pillar}</h3>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">{item.detail}</p>
        </div>
      ))}
    </div>

    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-4 h-4 text-amber-400" />
        <h4 className="text-sm font-semibold text-white/80">Change Management</h4>
      </div>
      <p className="text-sm text-white/50">
        New dashboards and exports change daily habits. Budget training, hypercare, and iteration after go-live; 
        teams often request UX and logic tweaks once they use the system — that work is normal and should be planned, not treated as scope failure.
      </p>
    </div>

    <p className="text-xs text-white/30 mt-6 italic">
      Prove one vertical end-to-end, adopt it, then scale or parallelise — rather than promising everything at once on day one.
    </p>
  </div>
);

/* ─── Slide 2: Open Points & Dependencies ─── */
const Slide2 = () => (
  <div>
    <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">Slide 2 of 4</p>
    <h1 className="text-3xl md:text-4xl font-light mb-2">
      Open Points, <span className="text-amber-400 font-medium">Dependencies & Why Incremental Works</span>
    </h1>
    <p className="text-white/50 text-sm mb-8 max-w-3xl">
      Execution needs your team's time and clear data; document-heavy flows need targeted POCs.
    </p>

    <div className="space-y-6">
      {[
        {
          title: 'Depth of Detailing',
          desc: 'End-to-end execution for any vertical (MIS, Compliance, HR, Ops, Research, IB) requires 1–2 weeks of focused product + engineering work with business owners — to lock scope, integrations, acceptance criteria, and reporting cut-outs. What we have now is directional scope from past connects; we have not replaced that detailing sprint.',
        },
        {
          title: 'Organisational Dependency',
          desc: 'Speed and quality depend on direct availability of functional SMEs, IT/data access (exports, APIs, sandbox agreements), and clarity on golden source files (e.g. MF monthly file, ECM master, HR working templates). Poor access or moving definitions inflate timeline and risk.',
        },
        {
          title: 'Document / AI-Heavy Outcomes',
          desc: 'Where output is mostly extracted or generated from documents (DRHP checks, policy packs, invoice narration mapping, long research PDFs), we need short POCs on real samples to judge extraction quality, human review load, and recurring inference + storage cost — so ROI is credible before scale-up.',
        },
      ].map((item) => (
        <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="font-semibold text-white mb-2">{item.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
      <p className="text-sm text-amber-300">
        <strong>Bottom line:</strong> An incremental path (one thing at a time, validated) reduces simultaneous unknowns 
        and avoids locking large spend before behaviour is proven.
      </p>
    </div>
  </div>
);

/* ─── Slide 3: Plans A / B / C ─── */
const Slide3 = () => (
  <div>
    <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">Slide 3 of 4</p>
    <h1 className="text-3xl md:text-4xl font-light mb-2">
      Three Execution Options — <span className="text-amber-400 font-medium">Plans A / B / C</span>
    </h1>
    <p className="text-white/50 text-sm mb-8 max-w-3xl">
      More parallel tracks → more coordination load and higher commercial exposure. Commercials discussed only after scope lock.
    </p>

    <div className="space-y-4">
      {[
        {
          plan: 'A',
          label: 'Recommended',
          badge: 'bg-emerald-500/20 text-emerald-300',
          scope: 'One vertical end-to-end (e.g. MIS): scope lock → build → UAT → adoption support',
          squad: '1 PM + 1 Engineer; add Engineer + QA when build/UAT load warrants',
          commercials: 'Lower total exposure than parallel programmes; quote after detailing',
          tradeoff: 'Lowest delivery and change-risk; establishes pattern for the rest',
        },
        {
          plan: 'B',
          label: 'Two Tracks',
          badge: 'bg-amber-500/20 text-amber-300',
          scope: 'Two tracks in parallel (e.g. MIS + one other), only if SMEs and data are ready',
          squad: 'Two squads or a scaled squad — structure agreed in planning',
          commercials: 'Higher than A — exact delta from scope, not from this deck',
          tradeoff: 'Faster wall-clock progress only if both streams are truly unblocked',
        },
        {
          plan: 'C',
          label: 'All Parallel',
          badge: 'bg-red-500/20 text-red-300',
          scope: 'All tracks in parallel',
          squad: 'Multiple squads + programme oversight',
          commercials: 'Highest exposure and integration risk',
          tradeoff: 'Only with explicit acceptance of risk and strong internal PMO',
        },
      ].map((p) => (
        <div key={p.plan} className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-bold text-white/20">Plan {p.plan}</span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${p.badge}`}>{p.label}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/40 text-xs uppercase mb-1">Scope</p>
              <p className="text-white/70">{p.scope}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase mb-1">Starting Squad</p>
              <p className="text-white/70">{p.squad}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase mb-1">Commercials</p>
              <p className="text-white/70">{p.commercials}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase mb-1">Trade-off</p>
              <p className="text-white/70">{p.tradeoff}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <p className="text-xs text-white/30 mt-6 italic">
      This slide does not state rates or monthly burn. Proposal follows the detailing sprint and chosen plan.
    </p>
  </div>
);

/* ─── Slide 4: MIS First Vertical + Ask ─── */
const Slide4 = () => (
  <div>
    <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">Slide 4 of 4</p>
    <h1 className="text-3xl md:text-4xl font-light mb-2">
      MIS as the First Vertical — <span className="text-amber-400 font-medium">Before → After</span>
    </h1>
    <p className="text-white/50 text-sm mb-8 max-w-3xl">
      MIS is a strong first vertical — visible ROI, touches Research + Sales + ECM, and still fits the shared platform layers P1–P8.
    </p>

    {/* Before */}
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Before</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { area: 'MF Holdings', pain: 'Excel-centric; hard to slice fund / manager / scheme consistently; MoM positioning and narratives are manual.' },
          { area: 'Sales & Events', pain: 'Data in portals + CRM + DAM Connect but no unified analysis; post-event insight is thin.' },
          { area: 'ECM Master', pain: 'Master MIS file feeds everything but custom cuts are manual — slow, inconsistent.' },
        ].map((b) => (
          <div key={b.area} className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-sm font-semibold text-red-300 mb-1">{b.area}</p>
            <p className="text-xs text-white/60">{b.pain}</p>
          </div>
        ))}
      </div>
    </div>

    {/* After */}
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">After</h3>
      <div className="space-y-3">
        {[
          'One governed data path: refresh rules, dashboards + exports, role-aware views.',
          'Fewer manual regenerations from the ECM master; automated or semi-automated custom views with approval where needed.',
          'Explicit gaps: where we must rely on uploads vs API — documented so risk is visible, not hidden.',
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-sm text-white/70">{item}</p>
          </div>
        ))}
      </div>
    </div>

    {/* The Ask */}
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-amber-400 mb-4">The Ask</h3>
      <div className="space-y-3">
        {[
          'Confirm Plan A with MIS as the first end-to-end vertical — or name an alternative first vertical.',
          'Schedule the 1–2 week detailing window with named business owners.',
          'Acknowledge separate time for adoption and post-go-live tweaks.',
        ].map((ask, i) => (
          <div key={i} className="flex items-start gap-3">
            <ArrowRight className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-sm text-white/70">{ask}</p>
          </div>
        ))}
      </div>
    </div>

    <p className="text-xs text-white/30 mt-6 text-center">
      Prototype for discussion — not production and not legal/financial advice.
    </p>
  </div>
);

export default DamCapitalDeck;
