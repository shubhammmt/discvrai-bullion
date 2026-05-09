import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, AlertTriangle, Target, Layers, Smartphone, BarChart3, CheckCircle2, Calendar, Workflow, Sparkles } from 'lucide-react';

const TITLES = [
  '01 · Executive brief', '02 · Pain points & impact', '03 · Solution architecture',
  '04 · Demo journey', '05 · KPIs & pilot plan', '06 · Ask & next steps',
];

const Shell: React.FC<{ children: React.ReactNode; title: string; kicker: string }> = ({ children, title, kicker }) => (
  <div className="absolute inset-0 flex flex-col p-14">
    <div className="text-[11px] uppercase tracking-[0.25em] text-[#F37920] font-semibold">{kicker}</div>
    <h2 className="mt-3 text-4xl font-bold text-slate-900 leading-tight max-w-4xl">{title}</h2>
    <div className="mt-7 flex-1">{children}</div>
  </div>
);

const S1 = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A4A] via-[#1E3A8A] to-[#312E81] p-14 flex flex-col justify-between text-white">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-md bg-[#F37920] flex items-center justify-center font-bold text-xs">IL</div>
        <div className="text-sm tracking-[0.25em] uppercase text-orange-200">Conversation Pack</div>
      </div>
      <div className="text-right text-sm text-orange-200">Confidential · CSMO Office</div>
    </div>
    <div>
      <div className="text-xs uppercase tracking-[0.3em] text-orange-300 mb-5">Slide 01 · Why this conversation, why now</div>
      <h1 className="text-5xl font-bold leading-[1.1] max-w-5xl">
        Distributor Sales Enablement for{' '}
        <span className="text-[#F37920]">Retail Health Growth</span>.
      </h1>
      <p className="mt-6 text-lg text-orange-50 max-w-3xl leading-relaxed">
        ICICI Lombard already has the distribution rails. The next unlock is execution intelligence at field level —
        AI-assisted field selling for better conversion, renewal, and cross-sell.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-10 max-w-5xl">
        <div>
          <div className="text-xs uppercase tracking-widest text-orange-300 mb-3">What we are NOT proposing</div>
          {['Another static CRM', 'A generic AI tool', 'A 12-month exploratory pilot'].map(p => (
            <div key={p} className="flex items-center gap-3 py-1.5"><div className="w-1.5 h-1.5 rounded-full bg-rose-300" /><span className="text-orange-50">{p}</span></div>
          ))}
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-orange-300 mb-3">What we ARE proposing</div>
          {['Field execution layer that wins customer conversations', 'Mobile copilot for reps + control tower for managers', 'Outcomes in 90 days, scale what works'].map(p => (
            <div key={p} className="flex items-center gap-3 py-1.5"><CheckCircle2 className="w-4 h-4 text-orange-300" /><span className="text-orange-50">{p}</span></div>
          ))}
        </div>
      </div>
    </div>
    <div className="text-sm text-orange-200">Prepared for Mr. Ravi Ankola · ICICI Lombard</div>
  </div>
);

const S2 = () => {
  const pains = [
    { t: 'Reps don\'t know which lead to chase first', i: AlertTriangle },
    { t: 'Pitch quality varies by rep capability', i: AlertTriangle },
    { t: 'Objection handling is inconsistent', i: AlertTriangle },
    { t: 'Follow-ups are manual and delayed', i: AlertTriangle },
    { t: 'Managers lack real-time visibility', i: AlertTriangle },
  ];
  const impacts = [
    ['Lower meeting → quote conversion', '−'],
    ['Lower quote → bind conversion', '−'],
    ['Renewal leakage', '↓'],
    ['Missed cross-sell opportunities', '×'],
    ['Uneven productivity across regions', '⇅'],
  ];
  return (
    <Shell kicker="Slide 02 · Current pain points" title="What is broken in field motion today">
      <div className="grid grid-cols-2 gap-6 h-full">
        <div>
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">Field pain points</div>
          <div className="space-y-2">
            {pains.map(p => (
              <div key={p.t} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-white">
                <p.i className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-800">{p.t}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">Business impact</div>
          <div className="space-y-2">
            {impacts.map(([t, v]) => (
              <div key={t} className="flex items-center justify-between p-3 rounded-lg bg-rose-50 border border-rose-100">
                <div className="text-sm text-slate-800">{t}</div>
                <div className="text-lg font-bold text-rose-600">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-[#0A1A4A] text-white text-xs leading-relaxed">
            <span className="font-semibold text-[#F37920]">Net effect:</span> Distribution capacity exists, but conversion and retention discipline leaves measurable revenue on the table.
          </div>
        </div>
      </div>
    </Shell>
  );
};

const S3 = () => {
  const mods = [
    { i: Smartphone, t: 'Distributor Next-Best-Pitch Copilot', d: ['Daily prioritized lead queue', 'Recommended product + pitch opener', 'Objection response cards', 'Next action: call · visit · WhatsApp'] },
    { i: Sparkles, t: 'Health Pitch Assistant', d: ['Personalized 2-min sales script', 'Plan + premium band suggestion', 'Bilingual follow-up templates', 'Reusable customer sessions'] },
    { i: BarChart3, t: 'Renewal & Cross-sell Control Tower', d: ['Lapse risk heatmap', 'Rep-level SLA & conversion', 'Daily intervention queue', 'Coaching center'] },
  ];
  return (
    <Shell kicker="Slide 03 · Proposed solution" title="Distributor Enablement Stack — three demo-ready modules">
      <div className="grid grid-cols-3 gap-5">
        {mods.map((m, i) => (
          <div key={m.t} className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F37920] to-[#FB923C] flex items-center justify-center text-white"><m.i className="w-5 h-5" /></div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">Module {String.fromCharCode(65 + i)}</div>
            </div>
            <div className="text-base font-semibold text-slate-900 mb-2">{m.t}</div>
            <ul className="space-y-1.5 mt-1">
              {m.d.map(x => <li key={x} className="flex gap-2 text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-[#F37920] mt-0.5 shrink-0" />{x}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
        <span className="font-semibold text-[#F37920]">Foundation:</span> sits on top of existing ICICI Lombard sales stack — no rip-and-replace.
        Assistive recommendations with suitability checks, audit trail, and human-in-the-loop on all key actions.
      </div>
    </Shell>
  );
};

const S4 = () => {
  const steps = [
    { n: 1, t: 'Rep logs in', d: 'Mobile-first My Day view — top 20 prioritized leads' },
    { n: 2, t: 'Opens customer card', d: 'Sees next-best pitch with reason codes' },
    { n: 3, t: 'Handles objection', d: 'Pulls up scripted response card · context-aware' },
    { n: 4, t: 'Logs outcome', d: 'Marks meeting result · sets follow-up date' },
    { n: 5, t: 'Manager sees movement', d: 'Pipeline & SLA reflected in tower view' },
    { n: 6, t: 'Intervention triggers', d: 'Renewal/cross-sell alerts go to manager queue' },
  ];
  return (
    <Shell kicker="Slide 04 · Demo journey" title="End-to-end flow Mr. Ankola will see in 6 clicks">
      <div className="grid grid-cols-3 gap-4">
        {steps.map(s => (
          <div key={s.n} className="rounded-xl border border-slate-200 bg-white p-5 relative">
            <div className="absolute -top-3 left-5 w-7 h-7 rounded-full bg-[#F37920] text-white text-sm font-bold flex items-center justify-center shadow">{s.n}</div>
            <div className="text-base font-semibold text-slate-900 mt-2">{s.t}</div>
            <div className="text-sm text-slate-600 mt-1.5 leading-relaxed">{s.d}</div>
          </div>
        ))}
      </div>
      <div className="mt-7 grid grid-cols-3 gap-4">
        {[
          { t: 'Realistic insurance language', d: 'Plans · riders · waiting periods · cashless' },
          { t: 'Mobile-first rep workflow', d: 'Built for in-meeting and post-call use' },
          { t: 'Management visibility & coaching', d: 'Live pipeline · daily intervention list' },
        ].map(p => (
          <div key={p.t} className="rounded-lg bg-orange-50 border border-orange-100 p-4">
            <div className="text-sm font-semibold text-[#F37920]">{p.t}</div>
            <div className="text-xs text-slate-700 mt-1">{p.d}</div>
          </div>
        ))}
      </div>
    </Shell>
  );
};

const S5 = () => {
  const kpis = [
    ['Lead response SLA', '≤30 min · 90%+'],
    ['Meeting → quote conversion', '+15–22%'],
    ['Quote → bind conversion', '+10–18%'],
    ['Renewal rate', '+6–10%'],
    ['Cross-sell attach rate', '+12–18%'],
    ['Active distributor productivity', '+20–25%'],
  ];
  const phases = [
    { w: 'Weeks 0–2', t: 'Align', d: 'Region & cohort selection · KPI baseline · data mapping' },
    { w: 'Weeks 3–6', t: 'Build', d: 'Pitch library · objection content · prototype refinement' },
    { w: 'Weeks 7–10', t: 'Pilot', d: '2–3 regions · test vs control · weekly operating review' },
    { w: 'Weeks 11–12', t: 'Read-out', d: 'Value confirmation · scale plan · operating handover' },
  ];
  return (
    <Shell kicker="Slide 05 · KPI uplift hypothesis & 90-day pilot" title="Pilot outcomes expected in 90 days">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">KPIs to track</div>
          <div className="space-y-1.5">
            {kpis.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white">
                <div className="text-sm text-slate-800">{k}</div>
                <div className="text-sm font-bold text-[#F37920]">{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">Pilot structure</div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 mb-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><div className="text-slate-500">Regions</div><div className="font-semibold text-slate-800">2–3 (mix of T1 + T2)</div></div>
              <div><div className="text-slate-500">Use cases</div><div className="font-semibold text-slate-800">Health retail + renewal</div></div>
              <div><div className="text-slate-500">Cohort design</div><div className="font-semibold text-slate-800">Test vs control</div></div>
              <div><div className="text-slate-500">Operating cadence</div><div className="font-semibold text-slate-800">Weekly with Sales + Strategy</div></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {phases.map(p => (
              <div key={p.w} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">{p.w}</div>
                <div className="text-sm font-bold text-[#F37920]">{p.t}</div>
                <div className="text-xs text-slate-600 mt-0.5 leading-snug">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
};

const S6 = () => {
  const asks = [
    'Approve pilot scope (regions, distributor types, product subset)',
    'Align on success KPIs and baseline data',
    'Approve Lovable prototype build for stakeholder walkthrough',
  ];
  const plan = [
    { w: 'Week 1', t: 'Build clickable demo in Lovable', i: Workflow },
    { w: 'Week 2', t: 'Internal review · refine · Mr. Ankola presentation', i: Calendar },
  ];
  return (
    <Shell kicker="Slide 06 · Ask & next steps" title="What we need to move fast">
      <div className="grid grid-cols-2 gap-6 h-full">
        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-orange-50 p-5">
          <div className="text-xs uppercase tracking-widest text-[#F37920] font-semibold mb-3">Immediate asks</div>
          <ul className="space-y-2.5">
            {asks.map(a => <li key={a} className="flex gap-2 text-sm text-slate-800"><CheckCircle2 className="w-4 h-4 text-[#F37920] mt-0.5 shrink-0" />{a}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">Next 2 weeks</div>
          <div className="space-y-3">
            {plan.map(p => (
              <div key={p.w} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p.i className="w-5 h-5 text-[#F37920] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 font-semibold">{p.w}</div>
                  <div className="text-sm text-slate-800">{p.t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 rounded-xl bg-gradient-to-br from-[#0A1A4A] to-[#1E3A8A] text-white p-5">
        <div className="text-xs uppercase tracking-widest text-orange-200 mb-1.5 font-semibold">Close line</div>
        <div className="text-base font-semibold leading-relaxed">
          Start with a focused distributor copilot pilot, prove impact quickly, then scale across retail health and adjacent lines.
        </div>
      </div>
    </Shell>
  );
};

const RENDERERS = [S1, S2, S3, S4, S5, S6];

export default function ICICIDeck() {
  const [i, setI] = useState(0);
  const go = useCallback((n: number) => { if (n >= 0 && n < TITLES.length) setI(n); }, []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(i + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [i, go]);
  const Current = RENDERERS[i];
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <Link to="/icici-lombard" className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#F37920]">
          <ArrowLeft className="w-4 h-4" /> Back to hub
        </Link>
        <div className="flex items-center gap-1">
          {TITLES.map((s, idx) => (
            <button key={s} onClick={() => go(idx)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${idx === i ? 'bg-[#F37920] text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-500">{i + 1} / {TITLES.length}</div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="relative bg-white shadow-2xl rounded-lg overflow-hidden" style={{ width: '1280px', height: '720px', maxWidth: '100%', maxHeight: 'calc(100vh - 140px)', aspectRatio: '16 / 9' }}>
          <Current />
        </div>
      </div>
      <button onClick={() => go(i - 1)} disabled={i === 0}
        className="fixed left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:bg-slate-50">
        <ChevronLeft className="w-5 h-5 text-slate-700" />
      </button>
      <button onClick={() => go(i + 1)} disabled={i === TITLES.length - 1}
        className="fixed right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:bg-slate-50">
        <ChevronRight className="w-5 h-5 text-slate-700" />
      </button>
      <div className="bg-white border-t border-slate-200 px-6 py-2 text-[11px] text-slate-500 text-center">
        Confidential · Prepared for Mr. Ravi Ankola · ICICI Lombard
      </div>
    </div>
  );
}
