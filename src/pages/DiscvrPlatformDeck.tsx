import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Printer, Phone } from 'lucide-react';

const TOTAL = 8;

const DiscvrPlatformDeck: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const go = useCallback((d: number) => {
    setCurrent(p => Math.max(0, Math.min(TOTAL - 1, p + d)));
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [go]);

  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        .deck-root { font-family: 'DM Sans', sans-serif; }
        .deck-root * { box-sizing: border-box; }
        @media print {
          body * { visibility: hidden !important; }
          .deck-print, .deck-print * { visibility: visible !important; }
          .deck-print { position: absolute; left: 0; top: 0; width: 100%; }
          .deck-print .print-slide { page-break-after: always; width: 100vw; min-height: 100vh; padding: 48px 64px; background: #fff !important; color: #111 !important; }
          .deck-print .print-slide:last-child { page-break-after: avoid; }
          .no-print { display: none !important; }
          .print-slide .accent { color: #0d9488 !important; }
          .print-slide h1, .print-slide h2 { color: #0B1220 !important; }
        }
      `}</style>

      {/* Screen view */}
      <div className="deck-root screen-only" style={{ background: '#0B1220' }}>
        {/* Nav bar */}
        <div className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3" style={{ background: 'rgba(11,18,32,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-white/70 text-sm font-medium tracking-wide">DiscvrAI</span>
          <div className="flex items-center gap-4">
            {/* Dots */}
            <div className="flex gap-1.5">
              {Array.from({ length: TOTAL }).map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className="w-2 h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400" style={{ background: i === current ? '#14B8A6' : 'rgba(255,255,255,0.2)' }} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
            <button onClick={handlePrint} className="text-white/50 hover:text-white/80 transition p-1" title="Print / Export PDF"><Printer size={16} /></button>
          </div>
        </div>

        {/* Prev / Next */}
        <button onClick={() => go(-1)} disabled={current === 0} className="no-print fixed left-4 top-1/2 -translate-y-1/2 z-40 text-white/20 hover:text-white/60 disabled:opacity-0 transition" aria-label="Previous"><ChevronLeft size={32} /></button>
        <button onClick={() => go(1)} disabled={current === TOTAL - 1} className="no-print fixed right-4 top-1/2 -translate-y-1/2 z-40 text-white/20 hover:text-white/60 disabled:opacity-0 transition" aria-label="Next"><ChevronRight size={32} /></button>

        {/* Slides */}
        <div className="relative w-full h-screen overflow-hidden">
          {[Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8].map((Slide, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-500" style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}>
              <Slide />
            </div>
          ))}
        </div>
      </div>

      {/* Print view */}
      <div className="deck-print deck-root hidden print:block">
        {[Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8].map((Slide, i) => (
          <div key={i} className="print-slide"><Slide /></div>
        ))}
      </div>
    </>
  );
};

/* ─── Shared ─── */
const teal = '#14B8A6';
const SlideShell: React.FC<{ num: number; ribbon?: boolean; children: React.ReactNode }> = ({ num, ribbon, children }) => (
  <div className="relative w-full h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #0B1220 0%, #111827 100%)' }}>
    {ribbon && (
      <div className="absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-medium tracking-wide" style={{ background: 'rgba(20,184,166,0.12)', color: teal }}>
        Next session: scope, metrics, data — and commercials.
      </div>
    )}
    <div className="flex-1 flex items-center justify-center px-8 py-16">
      <div className="w-full" style={{ maxWidth: 1140 }}>{children}</div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-10 pb-4 text-xs text-white/30">
      <span>Confidential · DiscvrAI · April 2026</span>
      <span style={{ color: teal, opacity: 0.7 }}>{String(num).padStart(2, '0')} / 08</span>
    </div>
  </div>
);

const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="accent" style={{ color: teal }}>{children}</span>;

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex gap-3 items-start text-white/75 text-base leading-relaxed">
    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: teal }} />
    <span>{children}</span>
  </li>
);

/* ─── Slide 1 ─── */
function Slide1() {
  return (
    <SlideShell num={1} ribbon>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-3 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            We built a platform for <Accent>decisions</Accent>, not demos
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
            An AI-assisted digital transformation layer that <Accent>connects</Accent>, <Accent>governs knowledge</Accent>, <Accent>automates</Accent>, and <Accent>measures</Accent> — on the systems you already run.
          </p>
          <p className="text-sm text-white/40">
            Proven patterns across <strong className="text-white/60">20+ companies</strong> in <strong className="text-white/60">BFSI, manufacturing, EPC, energy</strong>, and <strong className="text-white/60">industrials</strong>
          </p>
          <p className="text-xs text-white/25 pt-2">DiscvrAI · Enterprise transformation deck · Confidential</p>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-xl p-6 space-y-4" style={{ background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: teal }}>Goal of next meeting</p>
            <ol className="space-y-3 text-sm text-white/70 list-decimal list-inside">
              <li>Prioritize first vertical slice</li>
              <li>Agree success metrics, validator pack, latency constraints</li>
              <li>Align commercials: discovery → Phase 1 → optional run-rate</li>
            </ol>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ─── Slide 2 ─── */
function Slide2() {
  return (
    <SlideShell num={2}>
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10">
        Systems of record are not systems of <Accent>speed</Accent> or <Accent>decision</Accent>
      </h2>
      <ul className="space-y-5 max-w-3xl">
        <Bullet>Data lives in ERP, CRM, files, and messages — truth is <strong className="text-white">rebuilt in spreadsheets</strong> every week</Bullet>
        <Bullet>Automation moves files, but leadership still waits on <strong className="text-white">reconciliation and narrative</strong></Bullet>
        <Bullet>Generic AI impresses in a slide deck and <strong className="text-white">fails in production</strong> without integration, entitlements, and audit</Bullet>
        <Bullet>Transformation programmes die in <strong className="text-white">pilot graveyards</strong> when nothing reusable is left behind</Bullet>
      </ul>
    </SlideShell>
  );
}

/* ─── Slide 3 ─── */
function Slide3() {
  return (
    <SlideShell num={3}>
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10">
        One <Accent>spine</Accent>, many <Accent>product suites</Accent>
      </h2>
      <ul className="space-y-5 max-w-3xl">
        <Bullet><strong className="text-white">Spine:</strong> identity, connectors, workflow, governed RAG, LLM routing, human tasks, observability, <strong className="text-white">immutable audit</strong></Bullet>
        <Bullet><strong className="text-white">Suites:</strong> document intelligence, knowledge copilot, ops control tower, finance assist, commerce/pricing lab, industrial/asset intelligence, executive MIS — each <strong className="text-white">activates</strong> on the same spine</Bullet>
        <Bullet><strong className="text-white">Engineering rule:</strong> deterministic workflows for reliability; <strong className="text-white">bounded</strong> agents where judgment beats rules</Bullet>
        <Bullet><strong className="text-white">Result:</strong> each new use case <strong className="text-white">compounds</strong> instead of inventing a new island</Bullet>
      </ul>
    </SlideShell>
  );
}

/* ─── Slide 4 ─── */
function Slide4() {
  const pillars = [
    { title: 'Connectivity', desc: 'APIs, files, events; meet data where it lives' },
    { title: 'Governed knowledge', desc: 'RAG with policy, citations, and retrieval you can audit' },
    { title: 'Orchestration', desc: 'n8n-class reliability plus LangChain-style agents inside guardrails' },
    { title: 'Decision intelligence', desc: 'Answers and narratives anchored to definitions and periods' },
  ];
  return (
    <SlideShell num={4}>
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10">
        Connect · Govern · Orchestrate · <Accent>Decide</Accent>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p, i) => (
          <div key={i} className="rounded-xl p-6 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center" style={{ background: teal, color: '#0B1220' }}>{i + 1}</span>
              <h3 className="font-semibold text-white text-sm">{p.title}</h3>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

/* ─── Slide 5 ─── */
function Slide5() {
  return (
    <SlideShell num={5}>
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10">
        Every suite has a <Accent>run path</Accent> and a <Accent>proof</Accent>
      </h2>
      <ul className="space-y-5 max-w-3xl">
        <Bullet><strong className="text-white">Fixture packs</strong> and golden scenarios per suite — not hand-wavy demos</Bullet>
        <Bullet><strong className="text-white">Certification smoke:</strong> integrations (idempotency, dead-letter replay), documents (extract + approve), RAG (ACL deny + citations), ops rules (versioned), finance (segregation of duties), commerce (guardrails), industrial (telemetry → cited SOP assist), executive MIS (metric-linked narrative)</Bullet>
        <Bullet><strong className="text-white">FinOps and audit:</strong> token/cost visibility and exportable decision trails for risk teams</Bullet>
        <Bullet>Pilots are <strong className="text-white">8–10 weeks</strong> on a real KPI; the spine stays — the organisation scales horizontally</Bullet>
      </ul>
    </SlideShell>
  );
}

/* ─── Slide 6 ─── */
function Slide6() {
  return (
    <SlideShell num={6}>
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10">
        Built for teams that already ship with <Accent>modern data and automation</Accent>
      </h2>
      <ul className="space-y-5 max-w-3xl">
        <Bullet><strong className="text-white">Orchestration & integration:</strong> n8n (and equivalent) for high-volume, deterministic paths</Bullet>
        <Bullet><strong className="text-white">Data & state:</strong> MongoDB for flexible workflow and metadata; Redis for queues, locks, rate limits</Bullet>
        <Bullet><strong className="text-white">AI layer:</strong> RAG pipelines, LangChain-style agents where needed, multi-model routing behind a gateway</Bullet>
        <Bullet><strong className="text-white">Security posture:</strong> tenant isolation, RBAC/ABAC on documents and indices, encryption, retention classes</Bullet>
        <Bullet>Swap components <strong className="text-white">only</strong> if the same governance and observability contracts hold</Bullet>
      </ul>
    </SlideShell>
  );
}

/* ─── Slide 7 ─── */
function Slide7() {
  const rows = [
    { lens: 'Ops / COO lens', value: "Fewer exception loops, SLA'd tasks, earlier signals" },
    { lens: 'CFO / Risk lens', value: 'Maker-checker, evidence bundles, audit exports' },
    { lens: 'CIO lens', value: 'No rip-and-replace; API-first edge that respects the core estate' },
    { lens: 'CEO / Promoter lens', value: 'One transformation radar — strategy, customer, ops, assets, finance, people, tech, compliance — depth over time on one platform' },
  ];
  return (
    <SlideShell num={7}>
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10">
        Outcomes we design <Accent>engagements</Accent> around
      </h2>
      <div className="space-y-4 max-w-3xl">
        {rows.map((r, i) => (
          <div key={i} className="flex gap-6 items-start rounded-lg px-5 py-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="text-sm font-semibold whitespace-nowrap min-w-[140px]" style={{ color: teal }}>{r.lens}</span>
            <span className="text-sm text-white/70 leading-relaxed">{r.value}</span>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

/* ─── Slide 8 ─── */
function Slide8() {
  return (
    <SlideShell num={8} ribbon>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Start with <Accent>one</Accent> KPI and a <Accent>Scope Lock</Accent>
          </h2>
          <ul className="space-y-4">
            <Bullet>Joint workshop: sources, risks, success metric, approval policy for anything external-facing</Bullet>
            <Bullet>Deliver a <strong className="text-white">pilot</strong> that moves the metric and <strong className="text-white">hardens</strong> the shared spine for the next suites</Bullet>
            <Bullet>Scale by <strong className="text-white">configuration</strong> — accelerators across BFSI, manufacturing, EPC, energy, industrials</Bullet>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Presenter card */}
          <div className="rounded-xl p-6 space-y-4" style={{ background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)' }}>
            <h3 className="font-bold text-white text-lg">Shubham Srivastava</h3>
            <p className="text-sm font-medium" style={{ color: teal }}>CEO, DiscvrAI</p>
            <p className="text-sm text-white/60 leading-relaxed">
              Two decades leading large-scale digital transformation and technology organisations — <strong className="text-white/80">CIO (Eureka Forbes)</strong>, <strong className="text-white/80">CTO (Hindustan Times)</strong>, <strong className="text-white/80">Head of Technology (MakeMyTrip)</strong>.
            </p>
            <a href="tel:+919873961591" className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg text-sm font-semibold transition hover:opacity-90" style={{ background: teal, color: '#0B1220' }}>
              <Phone size={14} /> +91-9873961591
            </a>
          </div>

          <a href="mailto:shubham@discvr.ai?subject=DiscvrAI%20—%20AI%20platform%20follow-on%20session" className="block text-center text-sm underline text-white/40 hover:text-white/70 transition">
            shubham@discvr.ai
          </a>
        </div>
      </div>
    </SlideShell>
  );
}

export default DiscvrPlatformDeck;
