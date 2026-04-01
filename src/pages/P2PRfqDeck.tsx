
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowDown, AlertTriangle, Users, Zap, CheckCircle2, HelpCircle, Target } from 'lucide-react';

const TOTAL_SLIDES = 9;

const SlideWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full flex flex-col justify-center px-16 py-12">
    {children}
  </div>
);

const Tag = ({ children, color = 'bg-amber-500/20 text-amber-400' }: { children: React.ReactNode; color?: string }) => (
  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${color}`}>{children}</span>
);

const FlowArrow = () => <ArrowRight className="w-5 h-5 text-slate-500 shrink-0 mx-1" />;
const FlowDown = () => <ArrowDown className="w-4 h-4 text-slate-500 shrink-0 my-1" />;

const FlowBox = ({ children, accent = false, warn = false }: { children: React.ReactNode; accent?: boolean; warn?: boolean }) => (
  <div className={`px-3 py-2 rounded-lg text-xs font-semibold text-center border whitespace-nowrap ${accent ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : warn ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10 text-slate-300'}`}>
    {children}
  </div>
);

// ─── Slides ──────────────────────────────────────────────

const Slide1 = () => (
  <SlideWrapper>
    <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
      <Tag color="bg-emerald-500/20 text-emerald-400">Deep Industries — Gas Compression Unit</Tag>
      <h1 className="text-5xl md:text-6xl font-black text-white leading-tight max-w-4xl">
        P2P + RFQ-to-Quote<br />Optimization
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl">
        Structured vendor intake · Exception-driven approvals · Three-way match
      </p>
      <div className="pt-8 flex items-center gap-3 text-slate-500 text-sm">
        <span>Discvr AI</span>
        <span>·</span>
        <span>Working Draft</span>
      </div>
    </div>
  </SlideWrapper>
);

const Slide2 = () => (
  <SlideWrapper>
    <Tag color="bg-red-500/20 text-red-400">The Problem</Tag>
    <h2 className="text-4xl font-black text-white mt-4 mb-10">Why This Hurts Today</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
      {[
        { title: 'Sequential vendor chase', desc: 'PC contacts vendors one-by-one; no parallel outreach.' },
        { title: 'Unstructured quotes', desc: 'Attachments in varied formats — PDFs, images, free-text e-mails — require manual re-keying into ERP.' },
        { title: '"Needful" scattered across inboxes', desc: 'Vendor clarifications (specs, drawings, delivery points) land in personal mailboxes — hard to trace back to the right RFQ.' },
        { title: 'Invoice correction loops', desc: 'Mismatches surface late; back-and-forth with vendors and accounts delays payment.' },
      ].map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 p-6" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </SlideWrapper>
);

const Slide3 = () => (
  <SlideWrapper>
    <Tag>Before</Tag>
    <h2 className="text-4xl font-black text-white mt-4 mb-10">Current Flow — Sequential & Manual</h2>
    <div className="flex flex-wrap items-center gap-2 justify-center">
      {[
        'MR (Excel)', '→ ERP', '→ Indent', '→ PC one-by-one outreach', '→ Messy e-mail quotes', '→ Manual ERP entry', '→ PO', '→ QC', '→ GRN', '→ Invoice', '→ Accounts', '→ Payment'
      ].map((step, i) => {
        if (step === '→ PC one-by-one outreach' || step === '→ Messy e-mail quotes' || step === '→ Manual ERP entry') {
          return <FlowBox key={i} warn>{step.replace('→ ', '')}</FlowBox>;
        }
        if (step.startsWith('→')) {
          return <React.Fragment key={i}><FlowArrow /><FlowBox>{step.replace('→ ', '')}</FlowBox></React.Fragment>;
        }
        return <FlowBox key={i}>{step}</FlowBox>;
      })}
    </div>
    <p className="text-center text-slate-500 text-sm mt-8 max-w-xl mx-auto">
      Every red box is a manual bottleneck. Clarifications live in personal inboxes — not linked to the indent.
    </p>
  </SlideWrapper>
);

const Slide4 = () => (
  <SlideWrapper>
    <Tag color="bg-emerald-500/20 text-emerald-400">After</Tag>
    <h2 className="text-4xl font-black text-white mt-4 mb-8">Proposed Flow — Parallel & Structured</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Left: happy path */}
      <div className="space-y-3">
        <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2">Happy Path (Pass)</p>
        <div className="flex flex-col items-start gap-2">
          <FlowBox>Indent</FlowBox><FlowDown />
          <FlowBox accent>API RFQ blast (parallel vendors)</FlowBox><FlowDown />
          <FlowBox accent>Magic link / form → structured line-level submission</FlowBox><FlowDown />
          <FlowBox accent>Optional: e-mail + attachment parse</FlowBox><FlowDown />
          <FlowBox accent>Align response → RFQ lines (qty, UoM, price, delivery)</FlowBox><FlowDown />
          <FlowBox accent>✓ Pass → System draft / quick-approve</FlowBox><FlowDown />
          <FlowBox>PO → GRN → Three-way match → Partial bank (H2H/API)</FlowBox>
        </div>
      </div>
      {/* Right: exception path */}
      <div className="space-y-3">
        <p className="text-xs text-red-400 font-bold uppercase tracking-wider mb-2">Exception Path (Fail / Low Confidence)</p>
        <div className="flex flex-col items-start gap-2 mt-8">
          <FlowBox warn>✗ Fail or low confidence</FlowBox><FlowDown />
          <FlowBox warn>PIC exception queue with diff view</FlowBox><FlowDown />
          <FlowBox>PIC reviews & resolves</FlowBox><FlowDown />
          <FlowBox>PO → GRN → Three-way match</FlowBox>
        </div>
        <div className="rounded-lg border border-white/10 p-4 mt-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <p className="text-slate-400 text-xs leading-relaxed">
            <span className="text-white font-semibold">PIC</span> = Person In Charge. Gets a diff view comparing parsed vendor response against original RFQ lines.
          </p>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

const Slide5 = () => (
  <SlideWrapper>
    <Tag color="bg-cyan-500/20 text-cyan-400">Deep Dive</Tag>
    <h2 className="text-4xl font-black text-white mt-4 mb-8">Vendor "Needful" &amp; Clarifications</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
      <div>
        <h3 className="text-lg font-bold text-white mb-4">After (Systematic)</h3>
        <div className="space-y-3">
          {[
            'Inbound tagged to RFQ ID (subject line RFQ-#####, link param, or intake rules)',
            'One thread per RFQ on procurement side — nothing lives only in a personal inbox',
            'PIC gets notified immediately',
            'Team can update RFQ / add annex — all invited vendors see the same clarification (where policy allows)',
            'Optional templated auto-reply pointing to documents — no promise of award or binding terms',
            'Unclassified inbound lands in a triage queue for manual RFQ linking',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Before (Same Traffic, No System)</h3>
        <div className="rounded-xl border border-red-500/20 p-6" style={{ background: 'rgba(239,68,68,0.04)' }}>
          <p className="text-slate-400 text-sm leading-relaxed">
            Same "needful" volume — but <span className="text-red-400 font-semibold">not systematically tied to the indent</span>. Clarifications scatter across personal inboxes. No single thread. No audit trail. PIC may never see it.
          </p>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

const Slide6 = () => (
  <SlideWrapper>
    <Tag color="bg-emerald-500/20 text-emerald-400">Solution</Tag>
    <h2 className="text-4xl font-black text-white mt-4 mb-10">Three Pillars</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
      {[
        { letter: 'A', title: 'Multi-vendor RFQ + Structured Intake', desc: 'Parallel blast to vendors via API. Form-first submission (magic link) for line-level qty, UoM, price, delivery. Fallback e-mail parse.', icon: <Zap className="w-6 h-6" /> },
        { letter: 'B', title: 'Parse + Align + Exceptions to PIC', desc: 'Align parsed vendor response to original RFQ lines. Pass → auto-draft. Fail or low confidence → PIC exception queue with diff view.', icon: <HelpCircle className="w-6 h-6" /> },
        { letter: 'C', title: 'PO–GRN–Invoice Match + Partial Payment', desc: 'Three-way match engine. Partial bank integration (H2H or API). Reduces invoice correction loops.', icon: <CheckCircle2 className="w-6 h-6" /> },
      ].map((pillar, i) => (
        <div key={i} className="rounded-xl border border-white/10 p-8 flex flex-col" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
            {pillar.icon}
          </div>
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">Pillar {pillar.letter}</span>
          <h3 className="text-white font-bold text-lg mb-3">{pillar.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
        </div>
      ))}
    </div>
  </SlideWrapper>
);

const Slide7 = () => (
  <SlideWrapper>
    <Tag color="bg-cyan-500/20 text-cyan-400">People &amp; Scale</Tag>
    <h2 className="text-4xl font-black text-white mt-4 mb-10">Directional Impact</h2>
    <div className="max-w-4xl mx-auto">
      <div className="rounded-xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-slate-400 font-semibold p-4 uppercase tracking-wider text-xs">Dimension</th>
              <th className="text-left text-slate-400 font-semibold p-4 uppercase tracking-wider text-xs">Today</th>
              <th className="text-left text-emerald-400 font-semibold p-4 uppercase tracking-wider text-xs">Target</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Headcount (directional)', '~18 FTE', '~14–15 FTE'],
              ['Vendor outreach', 'Manual, sequential', 'Automated blast'],
              ['Payment processing', 'Manual', 'Partial automation'],
              ['Throughput', 'Baseline', '~1.5×–2× (qualitative)'],
            ].map(([dim, today, target], i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="p-4 text-white font-medium">{dim}</td>
                <td className="p-4 text-slate-400">{today}</td>
                <td className="p-4 text-emerald-300 font-semibold">{target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-slate-500 text-xs mt-4 text-center">
        Figures are directional — to be validated with Deep Industries teams.
      </p>
    </div>
  </SlideWrapper>
);

const Slide8 = () => (
  <SlideWrapper>
    <Tag color="bg-amber-500/20 text-amber-400">Dependencies &amp; Risks</Tag>
    <h2 className="text-4xl font-black text-white mt-4 mb-8">What Needs to Be True</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
      {[
        'Clean vendor master (name, e-mail, category)',
        'Inbound e-mail routing (dedicated mailbox or rules)',
        'Form hosting (magic link infrastructure)',
        'RFQ ID in ERP or middleware layer',
        'PIC ownership + SLA per category/plant',
        'Confidence thresholds: auto-post vs PIC review',
        'Bank channel availability (H2H or API)',
        'Legal one-liner on form Ts&Cs',
      ].map((item, i) => (
        <div key={i} className="flex items-start gap-3 rounded-lg border border-white/10 p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <p className="text-slate-300 text-sm">{item}</p>
        </div>
      ))}
    </div>
  </SlideWrapper>
);

const Slide9 = () => (
  <SlideWrapper>
    <Tag color="bg-emerald-500/20 text-emerald-400">The Ask</Tag>
    <h2 className="text-4xl font-black text-white mt-4 mb-10">Decisions We Need</h2>
    <div className="space-y-4 max-w-4xl">
      {[
        { q: 'Confirm PIC by category / plant', detail: 'Who owns exception resolution for each commodity group?' },
        { q: 'Auto-post vs always-approve parsed quotes', detail: 'Should high-confidence matches flow straight to draft PO, or always route via PIC?' },
        { q: 'Confidence cut-off', detail: 'At what threshold does a parsed response skip PIC review?' },
        { q: 'Pilot category + plant', detail: 'Which commodity and site do we start with to validate the flow?' },
        { q: 'Baseline KPIs', detail: 'e.g. % form submissions vs e-mail, PIC exception rate, cycle-time indent→PO.' },
      ].map((item, i) => (
        <div key={i} className="flex items-start gap-4 rounded-xl border border-white/10 p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm">
            {i + 1}
          </div>
          <div>
            <h3 className="text-white font-bold mb-1">{item.q}</h3>
            <p className="text-slate-400 text-sm">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  </SlideWrapper>
);

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9];

// ─── Main Deck Component ─────────────────────────────────

const P2PRfqDeck = () => {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => setCurrent(c => Math.min(c + 1, TOTAL_SLIDES - 1)), []);
  const goPrev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const CurrentSlide = slides[current];

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col" style={{ background: '#0B0F19' }}>
      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <CurrentSlide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation bar */}
      <div className="border-t border-white/10 px-6 py-3 flex items-center justify-between" style={{ background: 'rgba(11,15,25,0.95)' }}>
        <button onClick={goPrev} disabled={current === 0} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-emerald-400 w-6' : 'bg-white/20 hover:bg-white/40'}`} />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-mono">{current + 1} / {TOTAL_SLIDES}</span>
        </div>

        <button onClick={goNext} disabled={current === TOTAL_SLIDES - 1} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-white/5">
        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }} />
      </div>
    </div>
  );
};

export default P2PRfqDeck;
