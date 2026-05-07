import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, ArrowLeft, Database, Brain, Bot, GitBranch,
  Activity, BarChart3, Target, Sparkles, ShieldCheck, LifeBuoy, CheckCircle2,
  Layers, TrendingUp, Users, Workflow,
} from 'lucide-react';

const SLIDES = [
  '01 · Why now',
  '02 · Capability stack',
  '03 · Opportunity map',
  '04 · Growth engine',
  '05 · Risk & lifecycle',
  '06 · Deployment model',
];

const Shell: React.FC<{ children: React.ReactNode; title: string; kicker: string }> = ({ children, title, kicker }) => (
  <div className="absolute inset-0 flex flex-col p-16">
    <div className="text-[11px] uppercase tracking-[0.25em] text-[#1E2761] font-semibold">{kicker}</div>
    <h2 className="mt-3 text-4xl font-bold text-slate-900 leading-tight max-w-4xl">{title}</h2>
    <div className="mt-8 flex-1">{children}</div>
  </div>
);

const Slide1 = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-[#0B1740] via-[#1E2761] to-[#2A3A95] p-16 flex flex-col justify-between text-white">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center font-bold">SBI</div>
        <div className="text-sm tracking-[0.25em] uppercase text-blue-200">Conversation Pack</div>
      </div>
      <div className="text-right text-sm text-blue-200">Confidential · CSMO Office</div>
    </div>
    <div>
      <div className="text-xs uppercase tracking-[0.3em] text-blue-300 mb-5">Slide 01 · Why this conversation, why now</div>
      <h1 className="text-6xl font-bold leading-[1.05] max-w-5xl">
        Scaling profitable growth at SBI Card:{' '}
        <span className="text-blue-300">AI + ML for decision advantage</span>.
      </h1>
      <p className="mt-7 text-xl text-blue-100 max-w-3xl leading-relaxed">
        The next value unlock is not generic AI adoption. It is higher-quality, faster, and safer decisions
        across acquisition, personalization, fraud and lifecycle management.
      </p>
      <div className="mt-12 grid grid-cols-2 gap-10 max-w-5xl">
        <div>
          <div className="text-xs uppercase tracking-widest text-blue-300 mb-4">Three business pressures</div>
          {['Quality-led growth, not volume', 'Customer relevance at scale', 'Risk control without friction'].map((p) => (
            <div key={p} className="flex items-center gap-3 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-300" /> <span className="text-blue-50">{p}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-blue-300 mb-4">Three value outcomes</div>
          {['Revenue uplift', 'Cost efficiency', 'Portfolio quality'].map((p) => (
            <div key={p} className="flex items-center gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-blue-300" /> <span className="text-blue-50">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="text-sm text-blue-200">Prepared for Mr. Girish Budhiraja · Chief Sales & Marketing Officer · SBI Card</div>
  </div>
);

const Slide2 = () => {
  const layers = [
    { icon: Database, t: 'Data + Feature Foundation', d: 'Consent-aware pipelines · feature store · governance · lineage', c: 'bg-[#0B3D91]' },
    { icon: Brain, t: 'Machine Learning Implementation', d: 'Propensity · risk scoring · churn prediction · anomaly/fraud models', c: 'bg-[#1565C0]' },
    { icon: Bot, t: 'AI / Agentic Orchestration', d: 'Decision copilots · workflow automation · recommendation orchestration', c: 'bg-[#1976D2]' },
    { icon: GitBranch, t: 'Decisioning & Experimentation', d: 'Real-time decision APIs · champion–challenger · A/B velocity', c: 'bg-[#2A3A95]' },
    { icon: Activity, t: 'MLOps + AI Ops', d: 'Monitoring · drift · retraining · explainability · auditability', c: 'bg-[#283593]' },
    { icon: Workflow, t: 'Business Adoption Layer', d: 'Dashboards · action queues · operating cadence · KPI governance', c: 'bg-[#1E2761]' },
  ];
  return (
    <Shell kicker="Slide 02 · Capability stack" title="End-to-end: data → ML → AI → business outcomes">
      <div className="grid grid-cols-3 gap-5">
        {layers.map((l) => {
          const I = l.icon;
          return (
            <div key={l.t} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className={`w-11 h-11 rounded-lg ${l.c} flex items-center justify-center text-white mb-4`}>
                <I className="w-5 h-5" />
              </div>
              <div className="text-base font-semibold text-slate-900">{l.t}</div>
              <div className="text-sm text-slate-600 mt-2 leading-relaxed">{l.d}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
        <span className="font-semibold text-[#1E2761]">Beyond just AI:</span> we deliver ML systems and AI applications,
        integrated into business workflows and measured on KPI outcomes — not POCs.
      </div>
    </Shell>
  );
};

const Slide3 = () => {
  const tracks = [
    { icon: Target, t: 'Acquisition Quality Command Center', d: 'Quality-adjusted approvals, channel intelligence, drop-off reduction', q: 'Front-book · Growth' },
    { icon: Sparkles, t: 'Real-Time Personalization & Offer Decisioning', d: 'NBO orchestration, activation, spend uplift, partner-safe outputs', q: 'Front-book · Growth' },
    { icon: ShieldCheck, t: 'Fraud Friction Optimizer', d: 'False-decline reduction with fraud loss control', q: 'Front-book · Risk' },
    { icon: LifeBuoy, t: 'Collections & Retention NBA', d: 'Early stress detection, recovery orchestration, retention of high-value', q: 'Back-book · Risk' },
  ];
  return (
    <Shell kicker="Slide 03 · Opportunity map" title="Where we create value for SBI Card">
      <div className="grid grid-cols-2 gap-5">
        {tracks.map((t) => {
          const I = t.icon;
          return (
            <div key={t.t} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#1E2761] to-[#2A3A95] flex items-center justify-center text-white">
                  <I className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{t.q}</span>
              </div>
              <div className="text-lg font-semibold text-slate-900 mt-4">{t.t}</div>
              <div className="text-sm text-slate-600 mt-2 leading-relaxed">{t.d}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-7 grid grid-cols-4 gap-4">
        {[
          ['Quality-adjusted approval rate', '↑'],
          ['Activation & spend per active card', '↑'],
          ['False declines & fraud leakage', '↓'],
          ['Cure rates · roll-forward risk', '↑ / ↓'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs">
            <div className="text-[#1E2761] font-bold text-base">{v}</div>
            <div className="text-slate-700 mt-1">{k}</div>
          </div>
        ))}
      </div>
    </Shell>
  );
};

const Slide4 = () => (
  <Shell kicker="Slide 04 · Growth engine" title="Acquisition intelligence + personalization at scale">
    <div className="grid grid-cols-2 gap-6 h-full">
      <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-[#1E2761]" />
          <div className="text-lg font-semibold text-slate-900">Acquisition Intelligence</div>
        </div>
        <div className="space-y-3 text-sm text-slate-700">
          {[
            'ML lead/source quality scoring',
            'Application completion prediction',
            'AI-assisted onboarding nudges & next-best-action',
            'Explainable approve / decline / review recommendations',
          ].map((x) => (
            <div key={x} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#2A3A95] mt-0.5 shrink-0" />{x}</div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-blue-100 text-xs text-slate-600">
          <span className="font-semibold text-[#1E2761]">Outcome:</span> better acquisition economics, higher quality-adjusted approval rate.
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-indigo-50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-[#2A3A95]" />
          <div className="text-lg font-semibold text-slate-900">Personalization Decisioning</div>
        </div>
        <div className="space-y-3 text-sm text-slate-700">
          {[
            'Next-best-offer & next-best-product ranking',
            'Channel-wise orchestration (app · web · CRM · partner-safe)',
            'Continuous testing with automatic winner rollout',
            'Incremental lift measurement, not vanity metrics',
          ].map((x) => (
            <div key={x} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#2A3A95] mt-0.5 shrink-0" />{x}</div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-indigo-100 text-xs text-slate-600">
          <span className="font-semibold text-[#1E2761]">Outcome:</span> higher activation, faster engagement velocity, measurable revenue uplift.
        </div>
      </div>
    </div>
  </Shell>
);

const Slide5 = () => (
  <Shell kicker="Slide 05 · Risk & lifecycle engine" title="Fraud intelligence + recovery optimization">
    <div className="grid grid-cols-2 gap-6 h-full">
      <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-6 h-6 text-[#1E2761]" />
          <div className="text-lg font-semibold text-slate-900">Fraud Friction Optimizer</div>
        </div>
        <div className="space-y-3 text-sm text-slate-700">
          {[
            'Real-time anomaly scoring across channels',
            'False-decline detection with lost-spend quantification',
            'Alert prioritization for analyst queues',
            'Rule + model tuning with controlled rollout',
          ].map((x) => (
            <div key={x} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#2A3A95] mt-0.5 shrink-0" />{x}</div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-blue-100 text-xs text-slate-600">
          <span className="font-semibold text-[#1E2761]">Outcome:</span> lower loss with fewer false declines and shorter decision latency.
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-indigo-50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <LifeBuoy className="w-6 h-6 text-[#2A3A95]" />
          <div className="text-lg font-semibold text-slate-900">Collections & Retention NBA</div>
        </div>
        <div className="space-y-3 text-sm text-slate-700">
          {[
            'Early stress prediction before hard delinquency',
            'Best channel · time · message sequencing',
            'Recovery action optimization with human-in-the-loop',
            'Retention interventions for high-value customers',
          ].map((x) => (
            <div key={x} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#2A3A95] mt-0.5 shrink-0" />{x}</div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-indigo-100 text-xs text-slate-600">
          <span className="font-semibold text-[#1E2761]">Outcome:</span> better cure rates, lower roll-forward risk, retained lifetime value.
        </div>
      </div>
    </div>
  </Shell>
);

const Slide6 = () => {
  const phases = [
    { w: 'Weeks 0–2', t: 'Align', d: 'Business alignment, KPI baseline, data mapping, governance setup' },
    { w: 'Weeks 3–6', t: 'Build', d: 'Model & config build, workflow design, integration prep' },
    { w: 'Weeks 7–10', t: 'Release', d: 'Controlled release, champion–challenger, monitoring' },
    { w: 'Weeks 11–12', t: 'Scale', d: 'Value readout, scale plan, operating handover' },
  ];
  const govs = [
    'Explainability and reason codes',
    'Human override for high-impact decisions',
    'Consent and purpose-aware controls',
    'Full audit trail and model monitoring',
  ];
  return (
    <Shell kicker="Slide 06 · Deployment model" title="Production deployment in 10–12 weeks per track — no rip-and-replace">
      <div className="grid grid-cols-4 gap-4">
        {phases.map((p, i) => (
          <div key={p.w} className="rounded-xl border border-slate-200 bg-white p-5 relative">
            <div className="absolute -top-3 left-5 px-2.5 py-0.5 bg-[#1E2761] text-white text-[10px] uppercase tracking-widest rounded-full font-semibold">
              Phase {i + 1}
            </div>
            <div className="text-xs text-slate-500 mt-1">{p.w}</div>
            <div className="text-xl font-bold text-[#1E2761] mt-1">{p.t}</div>
            <div className="text-sm text-slate-600 mt-2 leading-relaxed">{p.d}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl bg-gradient-to-br from-[#1E2761] to-[#2A3A95] text-white p-6">
        <div className="text-xs uppercase tracking-widest text-blue-200 font-semibold mb-3">Governance commitments</div>
        <div className="grid grid-cols-2 gap-3">
          {govs.map((g) => (
            <div key={g} className="flex gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-300 mt-0.5 shrink-0" />{g}</div>
          ))}
        </div>
      </div>
      <div className="mt-6 text-xs text-slate-500">
        Operate with governance from day one · scale only what proves value · 4 tracks deployable in parallel
      </div>
    </Shell>
  );
};

const renderers = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];

export default function SBIDeck() {
  const [i, setI] = useState(0);
  const go = useCallback((n: number) => {
    if (n >= 0 && n < SLIDES.length) setI(n);
  }, []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(i + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [i, go]);

  const Current = renderers[i];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <Link to="/sbi-card" className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#1E2761]">
          <ArrowLeft className="w-4 h-4" /> Back to hub
        </Link>
        <div className="flex items-center gap-1">
          {SLIDES.map((s, idx) => (
            <button
              key={s}
              onClick={() => go(idx)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                idx === i ? 'bg-[#1E2761] text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-500">{i + 1} / {SLIDES.length}</div>
      </div>

      {/* Slide stage */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="relative bg-white shadow-2xl rounded-lg overflow-hidden" style={{ width: '1280px', height: '720px', maxWidth: '100%', maxHeight: 'calc(100vh - 140px)', aspectRatio: '16 / 9' }}>
          <Current />
        </div>
      </div>

      {/* Nav arrows */}
      <button onClick={() => go(i - 1)} disabled={i === 0}
        className="fixed left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:bg-slate-50">
        <ChevronLeft className="w-5 h-5 text-slate-700" />
      </button>
      <button onClick={() => go(i + 1)} disabled={i === SLIDES.length - 1}
        className="fixed right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:bg-slate-50">
        <ChevronRight className="w-5 h-5 text-slate-700" />
      </button>

      <div className="bg-white border-t border-slate-200 px-6 py-2 text-[11px] text-slate-500 text-center">
        Confidential · Prepared for Mr. Girish Budhiraja · CSMO · SBI Card
      </div>
    </div>
  );
}
