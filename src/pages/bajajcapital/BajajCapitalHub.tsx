import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Presentation, ArrowRight, Users, Activity, PiggyBank, Layers } from 'lucide-react';
import { BRAND } from './ui';

const tiles = [
  { to: '/pitch/bajajcapital', icon: Presentation, label: '6-Slide Deck', title: 'Pre-read storyline', desc: 'Thesis · operating reality · collaboration map · two first waves · delivery · ask.', accent: 'from-blue-700 to-indigo-800' },
  { to: '/bajajcapital/cockpit', icon: Users, label: 'Demo 01', title: 'RM Intelligence Cockpit', desc: 'Uplift-style scoring · cited briefings · WhatsApp draft · approve / edit · CRM stub.', accent: 'from-blue-600 to-cyan-700' },
  { to: '/bajajcapital/ops', icon: Activity, label: 'Demo 02', title: 'Ops / COO Command Center', desc: 'Onboarding funnel · TAT · e-mandate % · exception queue · weekly throughput.', accent: 'from-indigo-600 to-blue-800' },
  { to: '/bajajcapital/retirement', icon: PiggyBank, label: 'Demo 03', title: 'Retirement Education (RTR)', desc: 'SWP illustration sliders · "not investment advice" banner · educational only.', accent: 'from-cyan-600 to-blue-700' },
  { to: '/bajajcapital/architecture', icon: Layers, label: 'Reference', title: 'Sidecar Architecture', desc: 'No core CRM/ERP rip-and-replace · governed data products · APIs only · audit by design.', accent: 'from-slate-700 to-slate-900' },
];

export default function BajajCapitalHub() {
  return (
    <div className="min-h-screen text-slate-800" style={{ background: 'radial-gradient(1200px 600px at 10% -10%, rgba(30,58,138,0.10), transparent), radial-gradient(900px 500px at 100% 0%, rgba(37,99,235,0.08), transparent), #FFFFFF' }}>
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-md flex items-center justify-center" style={{ background: BRAND.blue }}>
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: BRAND.blue }}>Conversation Pack</div>
              <div className="text-lg font-semibold text-slate-900">Bajaj Capital × DiscvrAI · Intelligence Suite</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-500">Prepared for</div>
            <div className="text-sm font-semibold text-slate-900">Angad Wadia · Chief Operating Officer</div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-8 pt-14 pb-10">
        <div className="text-xs uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: BRAND.blue }}>Operating leverage on the stack you already have</div>
        <h1 className="text-5xl font-bold leading-tight max-w-4xl text-slate-900">
          Same RM capacity, <span style={{ color: BRAND.blue }}>higher quality touches</span> — measurable in one corridor.
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">
          Sidecar intelligence on top of CRM, SuperRM, and core systems. Uplift-based prioritisation, agentic pre-call briefings,
          ops control tower, document intelligence — all human-in-the-loop with audit trails. No rip-and-replace.
        </p>

        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            { k: 'Pilot window', v: '8–12 wk', l: 'one KPI baseline · go/no-go' },
            { k: 'First waves', v: 'RM + Ops', l: 'productivity & throughput' },
            { k: 'Approach', v: 'Sidecar', l: 'no CRM / core change in pilot' },
            { k: 'Governance', v: 'HITL', l: 'humans approve · audit logs' },
          ].map(s => (
            <div key={s.k} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-[11px] uppercase tracking-wider text-slate-500">{s.k}</div>
              <div className="text-3xl font-bold mt-1" style={{ color: BRAND.blue }}>{s.v}</div>
              <div className="text-xs text-slate-500 mt-1">{s.l}</div>
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
                className="group rounded-2xl border border-slate-200 bg-white p-7 hover:bg-slate-50 hover:-translate-y-0.5 transition-all shadow-sm">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center text-white shadow-lg`}>
                    <I className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{t.label}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all" style={{ color: BRAND.blue }}>
                  Open <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between text-xs text-slate-500">
          <div>Confidential · synthetic demo data · no Bajaj Capital logos or live systems</div>
          <div>Pilot ₹70L–2Cr · T&M pod ₹8–14L / FTE-month (illustrative)</div>
        </div>
      </footer>
    </div>
  );
}
