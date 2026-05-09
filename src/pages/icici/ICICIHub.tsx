import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Presentation, Smartphone, Sparkles, BarChart3, Settings2, Building2 } from 'lucide-react';

const tiles = [
  { to: '/pitch/icici-lombard', icon: Presentation, label: '6-Page Deck', title: 'CSMO Conversation Pack', desc: 'Distributor sales enablement narrative for Mr. Ravi Ankola — execution intelligence at field level for retail health growth.', accent: 'from-[#0A1A4A] to-[#1E3A8A]' },
  { to: '/icici-lombard/copilot', icon: Smartphone, label: 'Module 01', title: 'Distributor Next-Best-Pitch Copilot', desc: 'Mobile-first rep workflow · prioritized leads, next-best-action, objection handling, follow-up composer.', accent: 'from-[#F37920] to-[#FB923C]' },
  { to: '/icici-lombard/pitch-assistant', icon: Sparkles, label: 'Module 02', title: 'Health Pitch Assistant', desc: 'Personalized 2-minute pitch, plan + rider recommendation, premium band, objections & follow-up — bilingual.', accent: 'from-[#1E3A8A] to-[#3B82F6]' },
  { to: '/icici-lombard/manager', icon: BarChart3, label: 'Module 03', title: 'Renewal & Cross-sell Control Tower', desc: 'Manager view · funnel by region/rep, lapse heatmap, intervention queue, coaching center.', accent: 'from-[#0F172A] to-[#334155]' },
  { to: '/icici-lombard/admin', icon: Settings2, label: 'Module 04', title: 'Admin & Trainer Console', desc: 'Manage product pitch scripts, objection library, daily nudges, content effectiveness tracking.', accent: 'from-[#7C2D12] to-[#C2410C]' },
];

export default function ICICIHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-md bg-[#F37920] flex items-center justify-center text-white font-bold text-xs">IL</div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Conversation Pack</div>
              <div className="text-lg font-semibold text-slate-900">ICICI Lombard · Distributor Sales Enablement</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-500">Prepared for</div>
            <div className="text-sm font-semibold text-slate-800">Mr. Ravi Ankola</div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-8 pt-14 pb-10">
        <div className="text-xs uppercase tracking-[0.2em] text-[#F37920] font-semibold mb-4">Field execution layer · Not another CRM</div>
        <h1 className="text-5xl font-bold text-slate-900 leading-tight max-w-4xl">
          Help ICICI Lombard distributors{' '}
          <span className="bg-gradient-to-r from-[#F37920] to-[#FB923C] bg-clip-text text-transparent">win in real customer conversations</span>.
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">
          AI-assisted field selling for retail health — better lead prioritization, sharper pitch quality, consistent objection
          handling, and stronger renewal & cross-sell discipline. Mobile-first for reps, control tower for managers.
        </p>

        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            { k: 'Conversion', v: '+18–25%', l: 'meeting → quote → bind' },
            { k: 'Renewals', v: '+6–10%', l: 'renewal rate uplift' },
            { k: 'Cross-sell', v: '+12–18%', l: 'attach rate per active customer' },
            { k: 'SLA', v: '≤30 min', l: 'first response on hot leads' },
          ].map(s => (
            <div key={s.k} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="text-[11px] uppercase tracking-wider text-slate-500">{s.k}</div>
              <div className="text-3xl font-bold text-[#F37920] mt-1">{s.v}</div>
              <div className="text-xs text-slate-600 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold mb-4">Conversation Pack</div>
        <div className="grid grid-cols-2 gap-5">
          {tiles.map(t => {
            const I = t.icon;
            return (
              <Link key={t.to} to={t.to}
                className="group rounded-2xl border border-slate-200 bg-white p-7 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center text-white shadow-md`}>
                    <I className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t.label}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#F37920] group-hover:gap-2.5 transition-all">
                  Open <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2"><Building2 className="w-4 h-4" /> Confidential · For ICICI Lombard leadership review</div>
          <div>Pilot: 2–3 regions · Health retail + renewal · Test vs control · Weekly review</div>
        </div>
      </footer>
    </div>
  );
}
