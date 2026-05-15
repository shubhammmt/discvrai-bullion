import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Presentation, ArrowRight, Gauge, Target, RefreshCw, Layers, FlaskConical, Plug, Repeat, MessageSquare } from 'lucide-react';
import { BRAND } from './ui';

const tiles = [
  { to: '/pitch/awnic', icon: Presentation, label: '6-Slide Deck', title: 'Executive pitch', desc: 'Vision · gap · modules · guardrails · 10-week proof · ask.', accent: 'from-blue-900 to-teal-700' },
  { to: '/awnic/cockpit', icon: Gauge, label: 'Demo 01', title: 'Executive Cockpit', desc: 'CLTV · churn · CAC · ROAS · suppression compliance.', accent: 'from-teal-700 to-blue-800' },
  { to: '/awnic/acquisition', icon: Target, label: 'Demo 02', title: 'Acquisition Command', desc: 'Propensity-ranked quotes · CAC simulator · suppression.', accent: 'from-blue-800 to-teal-700' },
  { to: '/awnic/recovery', icon: Repeat, label: 'Demo 03', title: 'Abandon Recovery', desc: 'Per-quote journey · two-touch sequence · recovered bind.', accent: 'from-teal-600 to-emerald-700' },
  { to: '/awnic/retention', icon: RefreshCw, label: 'Demo 04', title: 'Retention & Renewal', desc: 'Churn risk · early renewal nudge · holdout uplift.', accent: 'from-blue-900 to-blue-700' },
  { to: '/awnic/crosssell', icon: Layers, label: 'Demo 05', title: 'Cross-Sell Studio', desc: 'Suppressed vs eligible · explainability · frequency caps.', accent: 'from-rose-700 to-blue-900' },
  { to: '/awnic/agent', icon: MessageSquare, label: 'Demo 06', title: 'Agent Assist', desc: 'Unified timeline · talk track · feedback loop.', accent: 'from-slate-700 to-blue-800' },
  { to: '/awnic/experiment', icon: FlaskConical, label: 'Demo 07', title: 'Experimentation', desc: 'Holdout uplift · decision audit log · weekly readout.', accent: 'from-teal-700 to-slate-800' },
  { to: '/awnic/integration', icon: Plug, label: 'Reference', title: 'Integration Status', desc: 'Mock connectors · sources · channels · ads.', accent: 'from-slate-700 to-slate-900' },
];

export default function AWNICHub() {
  return (
    <div className="min-h-screen text-slate-800" style={{ background: 'radial-gradient(1200px 600px at 10% -10%, rgba(11,45,74,0.10), transparent), radial-gradient(900px 500px at 100% 0%, rgba(13,148,136,0.10), transparent), #FFFFFF' }}>
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-md flex items-center justify-center" style={{ background: BRAND.navy }}>
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: BRAND.teal }}>Conversation Pack</div>
              <div className="text-lg font-semibold text-slate-900">AWNIC × DiscvrAI · Motor Acquisition & Growth Intelligence</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-500">Prepared for</div>
            <div className="text-sm font-semibold text-slate-900">CMO · Chief Digital · Head of Motor</div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-8 pt-14 pb-10">
        <div className="text-xs uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: BRAND.teal }}>One decisioning layer over your existing digital estate</div>
        <h1 className="text-5xl font-bold leading-tight max-w-4xl text-slate-900">
          Acquire smarter. Retain longer. <span style={{ color: BRAND.teal }}>Grow wallet share</span> — without breaking service trust.
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">
          AWNIC already has app, web, chatbot, claims automation, and loyalty. We add the orchestration layer:
          propensity, churn, NBA, and guardrails that suppress sell during open claims or complaints — operationalised in 10–16 weeks.
        </p>

        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            { k: 'CLTV', v: '↑', l: 'Renewal save · cross-sell · upsell' },
            { k: 'Churn', v: '↓', l: '30 / 60 / 90-day risk cohorts' },
            { k: 'CAC', v: '↓', l: 'Propensity-ranked spend' },
            { k: 'ROAS', v: '↑', l: 'In-force suppression in audiences' },
          ].map(t => (
            <div key={t.k} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="text-[11px] uppercase tracking-widest font-semibold text-slate-500">{t.k}</div>
              <div className="text-3xl font-semibold mt-1" style={{ color: BRAND.navy }}>{t.v}</div>
              <div className="text-xs text-slate-500 mt-1">{t.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-3 gap-5">
          {tiles.map(t => {
            const Icon = t.icon;
            return (
              <Link key={t.to} to={t.to} className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${t.accent}`} />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-slate-500">{t.label}</div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition" />
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="text-base font-semibold text-slate-900">{t.title}</div>
                  </div>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">{t.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-6 text-xs text-slate-500 flex items-center justify-between">
          <div>© DiscvrAI · Confidential — for AWNIC executive review</div>
          <div>Synthetic demo data · no PII · UAE motor cohort</div>
        </div>
      </footer>
    </div>
  );
}
