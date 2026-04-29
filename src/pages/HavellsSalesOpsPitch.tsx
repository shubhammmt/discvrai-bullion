import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Rocket, Target, AlertTriangle, CheckCircle2,
  Users, MapPin, Calendar, ShieldCheck, Gauge, ListChecks, Layers
} from 'lucide-react';

const ACCENT = '#F59E0B';
const NAVY = '#0F2A4A';
const INK = '#0B1220';

const Shell: React.FC<{ n: number; total: number; eyebrow?: string; title: string; children: React.ReactNode }> = ({
  n, total, eyebrow, title, children
}) => (
  <div className="w-full min-h-screen bg-white text-slate-900 flex flex-col">
    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${NAVY}, ${ACCENT})` }} />
    <header className="px-10 pt-6 pb-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md grid place-items-center text-white font-bold" style={{ background: NAVY }}>D</div>
        <div className="text-sm font-semibold tracking-wide text-slate-700">DiscvrAI · For Sales Operations</div>
      </div>
      <div className="text-xs font-mono text-slate-400">{String(n).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
    </header>
    <main className="flex-1 px-10 pt-6 pb-16 max-w-[1400px] mx-auto w-full">
      {eyebrow && <div className="text-xs uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: ACCENT }}>{eyebrow}</div>}
      <h1 className="text-[42px] leading-[1.1] font-bold tracking-tight mb-8" style={{ color: INK }}>{title}</h1>
      {children}
    </main>
    <footer className="px-10 py-3 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
      <span>Confidential · Illustrative workflow · Not a Havells deliverable</span>
      <span>Use ← → to navigate</span>
    </footer>
  </div>
);

const slides = [
  // 1 Title
  ({ n, total }: any) => (
    <div className="w-full min-h-screen flex flex-col" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0a1d36 100%)` }}>
      <div className="h-1 w-full" style={{ background: ACCENT }} />
      <div className="flex-1 grid place-items-center px-10">
        <div className="max-w-4xl">
          <div className="text-xs uppercase tracking-[0.3em] font-semibold mb-6" style={{ color: ACCENT }}>Sales Operations · Discussion Document</div>
          <h1 className="text-[68px] leading-[1.05] font-bold text-white tracking-tight">Built for Sales Operations</h1>
          <p className="mt-6 text-2xl text-slate-300 leading-relaxed max-w-3xl">
            Channel execution, exceptions, and closure — without another static MIS deck.
          </p>
          <div className="mt-12 flex items-center gap-3 text-slate-400 text-sm">
            <div className="w-8 h-8 rounded grid place-items-center font-bold text-white" style={{ background: ACCENT }}>D</div>
            DiscvrAI · Confidential
          </div>
        </div>
      </div>
      <div className="px-10 py-4 text-xs text-slate-500 flex justify-between">
        <span>Confidential</span>
        <span className="font-mono">{String(n).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
      </div>
    </div>
  ),

  // 2 Operating reality
  ({ n, total }: any) => (
    <Shell n={n} total={total} eyebrow="Slide 02 · Context" title="You run the market-facing control tower">
      <div className="grid grid-cols-2 gap-6">
        {[
          { i: MapPin, t: 'Beat & coverage plans', s: 'Branch-led execution across regions' },
          { i: Gauge, t: 'Distributor fill & OTIF', s: 'Daily pulse on service to trade' },
          { i: Calendar, t: 'Scheme windows & guardrails', s: 'Lift vs leakage, calendar discipline' },
          { i: AlertTriangle, t: 'Regional skew & escalation', s: 'When to step in, who to call' },
        ].map(({ i: Icon, t, s }) => (
          <div key={t} className="rounded-xl border border-slate-200 p-6 hover:shadow-md transition">
            <Icon className="w-6 h-6 mb-3" style={{ color: NAVY }} />
            <div className="font-semibold text-lg" style={{ color: INK }}>{t}</div>
            <div className="text-sm text-slate-500 mt-1">{s}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-5 rounded-lg border-l-4" style={{ borderColor: ACCENT, background: '#FFFBEB' }}>
        <div className="text-sm text-slate-700">
          <span className="font-semibold">Your week =</span> triage + follow-ups across people and tools — not one pane of glass.
        </div>
      </div>
      <div className="mt-6 text-[11px] text-slate-400 italic">
        Note: Other functions may run parallel digital tracks. This experience is built for Sales Ops outcomes.
      </div>
    </Shell>
  ),

  // 3 Gap
  ({ n, total }: any) => (
    <Shell n={n} total={total} eyebrow="Slide 03 · The gap" title="Signals exist — coordinated action still fragments">
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 p-6">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4">What you already have</div>
          <ul className="space-y-3 text-slate-700">
            {['ERP — sell-in, master data, credit', 'Sell-through reports (T+1 / T+2)', 'CRM / DMS fragments per region', 'Scheme calendars in spreadsheets'].map(x => (
              <li key={x} className="flex gap-3"><CheckCircle2 className="w-5 h-5 mt-0.5 text-slate-400 shrink-0" />{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border-2 p-6" style={{ borderColor: ACCENT, background: '#FFFBEB' }}>
          <div className="text-xs uppercase tracking-wider font-semibold mb-4" style={{ color: ACCENT }}>What still hurts</div>
          <ul className="space-y-3" style={{ color: INK }}>
            {['Sell-through picture lags real action', 'Exception sprawl across mail and chats', 'Unclear owner for the next 24–48h', 'Repeat firefights, no closure trail'].map(x => (
              <li key={x} className="flex gap-3"><AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ACCENT }} />{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </Shell>
  ),

  // 4 What we are showing + CTA
  ({ n, total, navigate }: any) => (
    <Shell n={n} total={total} eyebrow="Slide 04 · The product" title="A Sales Ops command layer — not a generic dashboard">
      <p className="text-xl text-slate-600 max-w-3xl mb-10">
        <span className="font-semibold" style={{ color: INK }}>Detect → Explain → Act → Track closure</span> on channel and revenue-at-risk exceptions.
      </p>
      <div className="rounded-2xl p-10 border-2" style={{ borderColor: NAVY, background: `linear-gradient(135deg, #F8FAFC 0%, #EFF4FA 100%)` }}>
        <div className="flex items-center justify-between gap-8 flex-wrap">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: ACCENT }}>Live walkthrough</div>
            <div className="text-3xl font-bold" style={{ color: INK }}>Channel Execution Studio</div>
            <div className="text-slate-500 mt-2 max-w-md">8-step day-in-the-life — from national pulse to a closed exception, with realistic Indian electricals data.</div>
          </div>
          <button
            onClick={() => navigate('/havells-channel-studio')}
            className="px-8 py-5 rounded-xl text-white font-bold text-lg flex items-center gap-3 shadow-xl hover:scale-[1.02] transition"
            style={{ background: NAVY }}
          >
            <Rocket className="w-5 h-5" />
            Launch Channel Execution Studio
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mt-6 text-xs text-slate-400">Illustrative workflow. Your definitions, owners, and feeds in a pilot.</div>
    </Shell>
  ),

  // 5 Outcomes
  ({ n, total }: any) => (
    <Shell n={n} total={total} eyebrow="Slide 05 · Outcomes" title="What improves for Sales Ops">
      <div className="grid grid-cols-4 gap-5">
        {[
          { t: 'Faster triage', s: 'Top-of-queue exceptions surfaced by revenue × age' },
          { t: 'Clearer ownership', s: 'RM / Branch / HO assignment with SLA' },
          { t: 'Fewer stockouts', s: 'At the right distributors, on the right SKUs' },
          { t: 'Scheme discipline', s: 'Lift vs leakage made visible, weekly' },
        ].map((x, i) => (
          <div key={x.t} className="rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
            <div className="text-3xl font-bold mb-3" style={{ color: ACCENT }}>0{i+1}</div>
            <div className="font-semibold text-lg" style={{ color: INK }}>{x.t}</div>
            <div className="text-sm text-slate-500 mt-2 leading-relaxed">{x.s}</div>
          </div>
        ))}
      </div>
    </Shell>
  ),

  // 6 Pilot
  ({ n, total }: any) => (
    <Shell n={n} total={total} eyebrow="Slide 06 · Pilot" title="Prove it on your turf">
      <div className="grid grid-cols-3 gap-5">
        {[
          { i: Target, t: 'Scope', s: '2–3 regions + 1 priority category' },
          { i: Calendar, t: 'Cadence', s: 'Daily exception queue + weekly review' },
          { i: ShieldCheck, t: 'Start', s: 'Read-only on trusted feeds you already use' },
        ].map(({ i: Icon, t, s }) => (
          <div key={t} className="rounded-xl border-2 p-7" style={{ borderColor: '#E2E8F0' }}>
            <Icon className="w-7 h-7 mb-4" style={{ color: NAVY }} />
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">{t}</div>
            <div className="text-lg font-semibold leading-snug" style={{ color: INK }}>{s}</div>
          </div>
        ))}
      </div>
    </Shell>
  ),

  // 7 Metrics
  ({ n, total }: any) => (
    <Shell n={n} total={total} eyebrow="Slide 07 · Metrics" title="How we'd measure with you">
      <div className="flex flex-wrap gap-3 max-w-4xl">
        {[
          'Fill rate / line fill', 'Revenue-at-risk from stockouts',
          'Time-to-first-action on top exceptions', 'Time-to-close',
          'Distributor OTIF (proxy if needed)', 'Scheme lift vs leakage'
        ].map((m, i) => (
          <div key={m} className="px-5 py-3 rounded-full border-2 font-medium"
               style={{ borderColor: i < 3 ? NAVY : '#CBD5E1', color: i < 3 ? NAVY : '#475569', background: i < 3 ? '#EFF6FF' : 'white' }}>
            {m}
          </div>
        ))}
      </div>
      <div className="mt-10 p-5 rounded-lg bg-slate-50 border border-slate-200 max-w-3xl">
        <div className="text-sm text-slate-600">
          We'll lock baselines in week 0 and report deltas weekly — Sales Ops definitions, not vendor metrics.
        </div>
      </div>
    </Shell>
  ),

  // 8 Inputs
  ({ n, total }: any) => (
    <Shell n={n} total={total} eyebrow="Slide 08 · Inputs" title="Your inputs make it real">
      <div className="space-y-3 max-w-3xl">
        {[
          { t: 'Owner map', s: 'Who acts in the first 24–48h on each exception type' },
          { t: 'Trusted sell-through', s: 'Best available source — or a working proxy' },
          { t: 'Scheme calendar + ROE', s: 'Windows, guardrails, exception escalation rules' },
          { t: 'Top 10 exception types', s: 'The fights you have every week' },
        ].map((x, i) => (
          <div key={x.t} className="flex gap-5 p-5 rounded-xl border border-slate-200 hover:border-slate-400 transition">
            <div className="w-10 h-10 rounded-full grid place-items-center text-white font-bold shrink-0" style={{ background: NAVY }}>{i+1}</div>
            <div>
              <div className="font-semibold text-lg" style={{ color: INK }}>{x.t}</div>
              <div className="text-sm text-slate-500 mt-0.5">{x.s}</div>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  ),

  // 9 Trust
  ({ n, total }: any) => (
    <Shell n={n} total={total} eyebrow="Slide 09 · Trust" title="Governance that fits HO">
      <div className="grid grid-cols-4 gap-5">
        {[
          { t: 'Metric definitions', s: 'Locked with Sales Ops; versioned' },
          { t: 'RBAC', s: 'Region / role / data-scope based access' },
          { t: 'Audit on every recommendation', s: 'Sources, drivers, who did what' },
          { t: 'No surprise writebacks', s: 'Read-only on core systems in early phase' },
        ].map(x => (
          <div key={x.t} className="rounded-xl p-6 border" style={{ borderColor: NAVY, background: '#F8FAFC' }}>
            <ShieldCheck className="w-6 h-6 mb-3" style={{ color: NAVY }} />
            <div className="font-semibold" style={{ color: INK }}>{x.t}</div>
            <div className="text-sm text-slate-500 mt-2">{x.s}</div>
          </div>
        ))}
      </div>
    </Shell>
  ),

  // 10 Next steps
  ({ n, total, navigate }: any) => (
    <Shell n={n} total={total} eyebrow="Slide 10 · Next" title="Proposed next steps">
      <div className="max-w-3xl space-y-3">
        {[
          'Working session on metric definitions (90 min)',
          'Half-day deep dive on two live exception types',
          'Narrow pilot design — 2–3 regions, 1 category',
          'Date placeholder: follow-up review in 2 weeks',
        ].map((s, i) => (
          <div key={s} className="flex items-center gap-4 p-4 rounded-lg border border-slate-200">
            <div className="w-6 h-6 rounded border-2 grid place-items-center" style={{ borderColor: NAVY }}>
              <CheckCircle2 className="w-4 h-4" style={{ color: i === 0 ? NAVY : '#CBD5E1' }} />
            </div>
            <div className="text-lg" style={{ color: INK }}>{s}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex gap-3">
        <button onClick={() => navigate('/havells-channel-studio')} className="px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2" style={{ background: NAVY }}>
          <Rocket className="w-4 h-4" /> Re-launch Channel Execution Studio
        </button>
      </div>
      <div className="mt-8 text-[11px] text-slate-400 italic max-w-2xl">
        Other Havells digital tracks can stay aligned separately — today is about your Sales Ops outcomes.
      </div>
    </Shell>
  ),
];

const HavellsSalesOpsPitch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [i, setI] = useState(() => {
    const s = new URLSearchParams(location.search).get('s');
    return s ? Math.max(0, Math.min(slides.length - 1, parseInt(s, 10) - 1)) : 0;
  });

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setI(v => Math.min(slides.length - 1, v + 1));
      if (e.key === 'ArrowLeft') setI(v => Math.max(0, v - 1));
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const Slide = slides[i];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          <Slide n={i + 1} total={slides.length} navigate={navigate} />
        </motion.div>
      </AnimatePresence>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-slate-200">
        <button onClick={() => setI(v => Math.max(0, v - 1))} disabled={i === 0} className="p-1 disabled:opacity-30"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex gap-1.5">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className="w-2 h-2 rounded-full transition" style={{ background: idx === i ? NAVY : '#CBD5E1' }} />
          ))}
        </div>
        <button onClick={() => setI(v => Math.min(slides.length - 1, v + 1))} disabled={i === slides.length - 1} className="p-1 disabled:opacity-30"><ArrowRight className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

export default HavellsSalesOpsPitch;
