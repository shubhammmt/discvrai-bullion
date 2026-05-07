import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Target, LifeBuoy, Presentation, Building2 } from 'lucide-react';

const tiles = [
  {
    to: '/pitch/sbi-card',
    icon: Presentation,
    label: 'Pitch Deck',
    title: 'CSMO Conversation Pack',
    desc: '6-slide executive narrative for Mr. Girish Budhiraja. Deployment-ready decisioning across acquisition, personalization, fraud and lifecycle.',
    accent: 'from-[#1E2761] to-[#2A3A95]',
  },
  {
    to: '/sbi-card/acquisition',
    icon: Target,
    label: 'Demo 01',
    title: 'Acquisition Quality Command Center',
    desc: 'Quality-adjusted approvals, channel intelligence, journey diagnostics, decision explainability, scenario simulator.',
    accent: 'from-[#0B3D91] to-[#1E6FD9]',
  },
  {
    to: '/sbi-card/personalization',
    icon: Sparkles,
    label: 'Demo 02',
    title: 'Real-Time Personalization Studio',
    desc: 'Propensity hub, NBO orchestration, experiment velocity, partner-safe activation, revenue impact tracker.',
    accent: 'from-[#2A3A95] to-[#5C6BC0]',
  },
  {
    to: '/sbi-card/fraud',
    icon: ShieldCheck,
    label: 'Demo 03',
    title: 'Fraud Friction Optimizer',
    desc: 'Live risk stream, false-decline intelligence, case prioritization, rule + model tuning, exec scorecard.',
    accent: 'from-[#1A237E] to-[#3949AB]',
  },
  {
    to: '/sbi-card/lifecycle',
    icon: LifeBuoy,
    label: 'Demo 04',
    title: 'Lifecycle Risk & Recovery Orchestrator',
    desc: 'Early stress detection, NBA recovery engine, contact strategy, agent assist, leadership outcome tracker.',
    accent: 'from-[#283593] to-[#3F51B5]',
  },
];

export default function SBIHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#1E2761] to-[#2A3A95] flex items-center justify-center text-white font-bold">
              SBI
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Conversation Pack</div>
              <div className="text-lg font-semibold text-slate-900">SBI Card · Decision Intelligence at Scale</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Prepared for</div>
            <div className="text-sm font-semibold text-slate-800">Mr. Girish Budhiraja · CSMO</div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-14 pb-10">
        <div className="text-xs uppercase tracking-[0.2em] text-[#1E2761] font-semibold mb-4">
          Production Deployment · Not a Pilot
        </div>
        <h1 className="text-5xl font-bold text-slate-900 leading-tight max-w-4xl">
          Scaling profitable growth at SBI Card with{' '}
          <span className="bg-gradient-to-r from-[#1E2761] to-[#2A3A95] bg-clip-text text-transparent">
            decision-grade AI + ML
          </span>
          .
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">
          Four ready-to-deploy decisioning tracks that overlay on the existing stack — measured business outcomes
          in 8–12 weeks, with explainability, consent-aware design and human-in-the-loop governance from day one.
        </p>

        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            { k: 'Acquisition', v: '+12–18%', l: 'quality-adjusted approvals' },
            { k: 'Activation', v: '+9–14%', l: 'spend per active card' },
            { k: 'Fraud', v: '−25–35%', l: 'false declines' },
            { k: 'Recovery', v: '+8–12%', l: 'cure rate uplift' },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="text-[11px] uppercase tracking-wider text-slate-500">{s.k}</div>
              <div className="text-3xl font-bold text-[#1E2761] mt-1">{s.v}</div>
              <div className="text-xs text-slate-600 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tiles */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold mb-4">
          Conversation Pack
        </div>
        <div className="grid grid-cols-2 gap-5">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="group rounded-2xl border border-slate-200 bg-white p-7 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    {t.label}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#1E2761] group-hover:gap-2.5 transition-all">
                  Open <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Confidential · For SBI Card leadership review
          </div>
          <div>Overlay on current stack · No rip-and-replace · 10–12 week production rollout</div>
        </div>
      </footer>
    </div>
  );
}
