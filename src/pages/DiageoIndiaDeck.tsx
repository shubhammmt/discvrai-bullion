import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Info } from 'lucide-react';

// ── Slide data ──────────────────────────────────────────────────────────
const slides = [
  {
    id: 1,
    title: 'Workflow automation & AI that fits your estate — not another island',
    type: 'cover' as const,
  },
  {
    id: 2,
    title: 'Global programmes move the core; India needs speed at the edge',
    type: 'why-now' as const,
  },
  {
    id: 3,
    title: 'Systems of record are not systems of decision — or of speed',
    type: 'gap' as const,
  },
  {
    id: 4,
    title: 'One platform pattern: connect → understand → automate → measure',
    type: 'platform' as const,
  },
  {
    id: 5,
    title: 'Representative patterns — demos available on request',
    type: 'proof' as const,
  },
  {
    id: 6,
    title: 'Complement SAP (and global programmes) — accelerate India-specific outcomes',
    type: 'architecture' as const,
  },
  {
    id: 7,
    title: 'Three high-leverage starter lanes — pick one',
    type: 'pilots' as const,
  },
  {
    id: 8,
    title: 'Operator-led engineering — ship pilots, not slideware',
    type: 'team' as const,
  },
];

// ── Shared components ───────────────────────────────────────────────────
const ACCENT = '#C9A227';
const NAVY = '#0B1220';
const NAVY_MID = '#111827';

const Footer = ({ num }: { num: number }) => (
  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-12 py-5 text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.35)' }}>
    <span>Confidential &nbsp;|&nbsp; DiscvrAI &nbsp;|&nbsp; April 2026</span>
    <span style={{ color: ACCENT }}>{String(num).padStart(2, '0')} / 08</span>
  </div>
);

const Wordmark = () => (
  <div className="absolute top-6 left-12 z-20 flex items-center gap-2">
    <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, #e6c84a)` }}>
      <span className="text-xs font-bold" style={{ color: NAVY }}>D</span>
    </div>
    <span className="text-sm font-semibold tracking-tight text-white/80">DiscvrAI</span>
  </div>
);

const SlideWrapper = ({ children, num }: { children: React.ReactNode; num: number }) => (
  <div className="relative w-full h-screen flex flex-col overflow-hidden" style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY_MID} 50%, ${NAVY} 100%)` }}>
    {/* subtle grid */}
    <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
    <Wordmark />
    <div className="flex-1 relative z-10 flex items-center justify-center px-12 py-20">
      <div className="w-full max-w-[1160px]">{children}</div>
    </div>
    <Footer num={num} />
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>{children}</div>
);

const SlideTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-[2.6rem] leading-[1.15] font-bold text-white mb-8 max-w-4xl">{children}</h1>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-3 text-white/75 text-[0.95rem] leading-relaxed">
    <span className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
    <span>{children}</span>
  </li>
);

// ── Individual slides ───────────────────────────────────────────────────
const CoverSlide = () => (
  <SlideWrapper num={1}>
    <div className="flex flex-col justify-center h-full">
      <SectionLabel>DiscvrAI × Diageo India</SectionLabel>
      <h1 className="text-[3.2rem] leading-[1.1] font-bold text-white mb-6 max-w-4xl">
        Workflow automation & AI that fits your estate — <span style={{ color: ACCENT }}>not another island</span>
      </h1>
      <p className="text-lg text-white/60 max-w-3xl mb-8 leading-relaxed">
        An integration-first platform for connectors, RAG, LLMs, and human-in-the-loop orchestration across ops, commercial, and compliance.
      </p>
      <div className="flex flex-col gap-2 mt-2">
        <p className="text-sm text-white/40 italic">India complexity — routes, regulation, fragmented data — is our default context.</p>
        <p className="text-xs text-white/30 mt-4">Conversation deck for Diageo India digital leadership · Operational excellence & productivity aligned to global transformation themes</p>
      </div>
    </div>
  </SlideWrapper>
);

const WhyNowSlide = () => (
  <SlideWrapper num={2}>
    <SectionLabel>Context</SectionLabel>
    <SlideTitle>Global programmes move the core; India needs speed at the edge</SlideTitle>
    <ul className="space-y-5 max-w-3xl">
      <Bullet><strong className="text-white">Accelerate & productivity:</strong> replace manual rework in planning, trade, and compliance response with closed-loop tasks — not slide decks, operational throughput.</Bullet>
      <Bullet><strong className="text-white">Route-to-market reality:</strong> modern trade, traditional trade, and quick commerce multiply execution gaps before data reaches the centre.</Bullet>
      <Bullet><strong className="text-white">Regulatory velocity:</strong> state-by-state variation rewards configurable rules and secure deployment — not multi-month hard-coded fire drills.</Bullet>
      <Bullet><strong className="text-white">SAP & data estate:</strong> you're not buying a replacement ERP; you need an API-first layer that enriches decisions and feeds the core.</Bullet>
    </ul>
  </SlideWrapper>
);

const GapSlide = () => {
  const rows = [
    { reality: 'ERP, WMS, TMS, CRM, portals', breaks: 'Silos; teams reconstruct truth in Excel, chat, email', adds: 'One operational picture + early exceptions' },
    { reality: 'Campaigns, pricing, promos', breaks: 'Shocks and state changes become emergency projects', adds: 'Versioned logic + workflows: change becomes a deployment' },
    { reality: 'Documents & knowledge everywhere', breaks: 'Slow search; trapped playbooks', adds: 'RAG with governance + citations + audit-friendly usage' },
  ];
  return (
    <SlideWrapper num={3}>
      <SectionLabel>The gap</SectionLabel>
      <SlideTitle>Systems of record are not systems of decision — or of speed</SlideTitle>
      {/* Diagram */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {[
          { label: 'Edge', sub: 'mobile, portals, files' },
          null,
          { label: 'DiscvrAI', sub: 'connect · understand · automate · measure' },
          null,
          { label: 'SAP / Data Lake / BI', sub: 'systems of record' },
        ].map((item, i) =>
          item ? (
            <div key={i} className="rounded-lg px-6 py-4 text-center border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: i === 2 ? ACCENT : 'rgba(255,255,255,0.1)' }}>
              <div className="text-white font-semibold text-sm">{item.label}</div>
              <div className="text-white/40 text-xs mt-1">{item.sub}</div>
            </div>
          ) : (
            <ArrowRight key={i} className="w-5 h-5 flex-shrink-0" style={{ color: ACCENT }} />
          )
        )}
      </div>
      {/* Table */}
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="grid grid-cols-3 text-xs font-semibold uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="px-5 py-3 text-white/50">Their reality</div>
          <div className="px-5 py-3 text-white/50">What breaks</div>
          <div className="px-5 py-3" style={{ color: ACCENT }}>What we add</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-3 border-t text-sm" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="px-5 py-3.5 text-white/70">{r.reality}</div>
            <div className="px-5 py-3.5 text-white/50">{r.breaks}</div>
            <div className="px-5 py-3.5 text-white/80">{r.adds}</div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};

const PlatformSlide = () => {
  const cards = [
    { n: '01', title: 'Connectors & integration', body: 'REST/SOAP/files/events first; meet data where it lives; virtual integration before forced migration.' },
    { n: '02', title: 'Knowledge layer (RAG)', body: 'Policies, SOPs, contracts, research packs: grounded answers with citations.' },
    { n: '03', title: 'LLM & model routing', body: 'Multi-provider abstraction, fallbacks, latency/cost-aware routing for production.' },
    { n: '04', title: 'Workflow & orchestration', body: 'Approvals, SLAs, retries, escalations; multi-step agents where appropriate; humans stay in control.' },
  ];
  return (
    <SlideWrapper num={4}>
      <SectionLabel>Platform</SectionLabel>
      <SlideTitle>One platform pattern: connect → understand → automate → measure</SlideTitle>
      <div className="grid grid-cols-2 gap-5 mb-8">
        {cards.map(c => (
          <div key={c.n} className="rounded-lg p-6 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-xs font-bold mb-2" style={{ color: ACCENT }}>{c.n}</div>
            <div className="text-white font-semibold mb-2">{c.title}</div>
            <div className="text-white/55 text-sm leading-relaxed">{c.body}</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-white/35 italic">Same engineering spine we use for control towers, leadership MIS, document-heavy workflows, and agentic ops.</p>
    </SlideWrapper>
  );
};

const ProofSlide = () => {
  const patterns = [
    { pattern: 'Ops / supply "control tower"', demo: 'Exception-first operations: drill-downs, fewer manual status loops' },
    { pattern: 'Leadership MIS', demo: 'One-screen narrative for growth, margin, and regional drivers' },
    { pattern: 'Knowledge + document workflows', demo: 'Extraction, summarisation, packaging, lineage for regulated knowledge work' },
    { pattern: 'Agent-assisted channel / service ops', demo: 'Triage, routing, next-best-action with human handoff' },
    { pattern: 'Commerce & funnel analytics', demo: 'Channel economics, intent signals, conversion diagnostics' },
    { pattern: 'Industry narrative collateral', demo: 'Board-ready outcome framing without jargon walls' },
  ];
  return (
    <SlideWrapper num={5}>
      <SectionLabel>Proof patterns</SectionLabel>
      <SlideTitle>Representative patterns — demos available on request</SlideTitle>
      <p className="text-sm text-white/45 mb-6">Examples from complex enterprises; anonymised or client-aligned prototypes — not implied endorsements.</p>
      <div className="grid grid-cols-2 gap-4">
        {patterns.map((p, i) => (
          <div key={i} className="flex gap-4 rounded-lg p-5 border" style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${ACCENT}18`, color: ACCENT }}>{i + 1}</div>
            <div>
              <div className="text-white font-semibold text-sm mb-1">{p.pattern}</div>
              <div className="text-white/50 text-xs leading-relaxed">{p.demo}</div>
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};

const ArchitectureSlide = () => (
  <SlideWrapper num={6}>
    <SectionLabel>Architecture fit</SectionLabel>
    <SlideTitle>Complement SAP (and global programmes) — accelerate India-specific outcomes</SlideTitle>
    <ul className="space-y-5 max-w-3xl mb-10">
      <Bullet><strong className="text-white">API-first / file-first ingestion;</strong> bounded pilots without boiling the ocean.</Bullet>
      <Bullet><strong className="text-white">Security posture:</strong> access control, audit logs, data residency — agreed before scope creep.</Bullet>
      <Bullet><strong className="text-white">90-day pilot pattern:</strong> one sponsor, one workflow, KPIs defined upfront (e.g. cycle time, manual hours, compliance turnaround, execution quality proxies).</Bullet>
    </ul>
    <div className="rounded-lg p-6 border-l-[3px] max-w-3xl" style={{ background: 'rgba(201,162,39,0.06)', borderColor: ACCENT }}>
      <p className="text-white/80 text-[0.95rem] leading-relaxed italic">
        "We're the India edge layer: execution workflows, predictive signals, and regulatory-speed automation that feed clean intelligence into the core."
      </p>
    </div>
  </SlideWrapper>
);

const PilotsSlide = () => {
  const options = [
    { n: '1', title: 'Trade & execution workflow', body: 'Structured field and channel signals → scored compliance / tasks → closed-loop follow-up (extend rigour to harder routes without replacing global platforms globally).' },
    { n: '2', title: 'Regulatory & pricing agility', body: 'Configurable rules and workflows when states, slabs, or bands change; approver gates and immutable audit trails.' },
    { n: '3', title: 'Internal operations copilot', body: 'RAG over governed corpus; cited answers for training, commercial guardrails, and SOP adherence.' },
  ];
  return (
    <SlideWrapper num={7}>
      <SectionLabel>Pilot menu</SectionLabel>
      <SlideTitle>Three high-leverage starter lanes — pick one</SlideTitle>
      <div className="space-y-5 mb-8">
        {options.map(o => (
          <div key={o.n} className="flex gap-5 rounded-lg p-6 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg font-bold" style={{ background: `${ACCENT}20`, color: ACCENT }}>{o.n}</div>
            <div>
              <div className="text-white font-semibold mb-1">{o.title}</div>
              <div className="text-white/55 text-sm leading-relaxed">{o.body}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-white/30 italic max-w-3xl">Each pilot maps to productivity, margin defence, and risk reduction — aligned to how global efficiency programmes are measured, without over-claiming unattributed ROI.</p>
    </SlideWrapper>
  );
};

const TeamSlide = () => (
  <SlideWrapper num={8}>
    <SectionLabel>Team & next step</SectionLabel>
    <SlideTitle>Operator-led engineering — ship pilots, not slideware</SlideTitle>
    <div className="flex gap-10 items-start">
      {/* Person card */}
      <div className="rounded-xl p-7 border flex-shrink-0 w-[360px]" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold" style={{ background: `linear-gradient(135deg, ${ACCENT}, #e6c84a)`, color: NAVY }}>SS</div>
          <div>
            <div className="text-white font-bold text-lg">Shubham Srivastava</div>
            <div className="text-sm" style={{ color: ACCENT }}>CEO, DiscvrAI</div>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          Two decades leading large-scale digital transformation and technology organisations — including CIO (Eureka Forbes), CTO (Hindustan Times), and Head of Technology (MakeMyTrip).
        </p>
        <div className="mt-4 pt-4 border-t space-y-1 text-xs text-white/40" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div>shubham@discvr.ai</div>
          <div>+91-9873961591</div>
        </div>
      </div>

      {/* Right column */}
      <div className="flex-1">
        <ul className="space-y-4 mb-8">
          <Bullet><strong className="text-white">Built for enterprise reality:</strong> legacy stacks, fragmented data, compliance pressure.</Bullet>
          <Bullet><strong className="text-white">Repeatable accelerators:</strong> connectors, RAG, model routing, orchestration — designed to reach production in weeks, not quarters.</Bullet>
        </ul>
        <div className="space-y-4">
          <div className="rounded-lg p-5 border" style={{ background: `${ACCENT}0a`, borderColor: `${ACCENT}40` }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>Primary</div>
            <p className="text-white/80 text-sm">Book a 60-minute working session — top workflow pain points + clickable pilot specification.</p>
          </div>
          <div className="rounded-lg p-5 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/40">Secondary</div>
            <p className="text-white/50 text-sm">Optional architecture touchpoint with EA to map APIs and SAP touchpoints early.</p>
          </div>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

// ── Slide map ───────────────────────────────────────────────────────────
const SLIDE_COMPONENTS = [CoverSlide, WhyNowSlide, GapSlide, PlatformSlide, ProofSlide, ArchitectureSlide, PilotsSlide, TeamSlide];

// ── Main deck ───────────────────────────────────────────────────────────
const DiageoIndiaDeck: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((n: number) => {
    if (n < 0 || n >= slides.length || n === current) return;
    setDir(n > current ? 1 : -1);
    setCurrent(n);
  }, [current]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, go]);

  const Comp = SLIDE_COMPONENTS[current];

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: NAVY }}>
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          initial={{ opacity: 0, x: dir * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -dir * 60 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Comp />
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="w-2 h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: i === current ? ACCENT : 'rgba(255,255,255,0.2)',
              transform: i === current ? 'scale(1.4)' : 'scale(1)',
              ringOffsetColor: NAVY,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Nav buttons */}
      <button
        onClick={() => go(current - 1)}
        disabled={current === 0}
        className="fixed left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-opacity disabled:opacity-0 focus:outline-none focus-visible:ring-2"
        style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(current + 1)}
        disabled={current === slides.length - 1}
        className="fixed right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-opacity disabled:opacity-0 focus:outline-none focus-visible:ring-2"
        style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default DiageoIndiaDeck;
