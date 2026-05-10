import React from 'react';
import { Link } from 'react-router-dom';
import { Ship, Presentation, ArrowRight, Activity, Truck, TrendingDown, ShieldAlert, MountainSnow, Bot } from 'lucide-react';
import { BRAND } from './ui';

const tiles = [
  { to: '/pitch/jaikhurana', icon: Presentation, label: '7-Slide Deck', title: 'Pre-read storyline', desc: 'Mandate fit · execution intelligence · capability stack · group/CDO precursor · use cases · delivery · ask.', accent: 'from-slate-700 to-slate-900' },
  { to: '/jaikhurana/exec', icon: Activity, label: 'Demo 01', title: 'Executive Command Center', desc: 'KPI strip · spend by mode · variance by route · AI summary · ranked exception table.', accent: 'from-cyan-700 to-blue-800' },
  { to: '/jaikhurana/freight', icon: Truck, label: 'Demo 02', title: 'Freight Booking Advisor', desc: 'One-lane scenario · contract / spot / rail split · driver factors · saving vs baseline.', accent: 'from-blue-700 to-indigo-800' },
  { to: '/jaikhurana/leakage', icon: TrendingDown, label: 'Demo 03', title: 'Cost Leakage Cockpit', desc: 'Detention · demurrage · spot premium · billing variance · root cause + recovery actions.', accent: 'from-rose-700 to-red-900' },
  { to: '/jaikhurana/vendor', icon: ShieldAlert, label: 'Demo 04', title: 'Vendor Risk', desc: 'OTIF · landed cost · concentration · repeat failure pattern · scorecards.', accent: 'from-amber-700 to-orange-900' },
  { to: '/jaikhurana/ropeway', icon: MountainSnow, label: 'Demo 05', title: 'Ropeway / Project Assurance', desc: 'Package status · milestone slippage forecast · critical path · escalation generator.', accent: 'from-indigo-700 to-violet-900' },
  { to: '/jaikhurana/assurance', icon: Bot, label: 'Demo 06', title: 'Assurance Copilot', desc: 'Top 5 issues · review note · escalation draft · action tracker export.', accent: 'from-emerald-700 to-teal-900' },
];

export default function JaiKhuranaHub() {
  return (
    <div className="min-h-screen text-slate-200" style={{ background: 'radial-gradient(1200px 600px at 10% -10%, rgba(34,211,238,0.08), transparent), radial-gradient(900px 500px at 100% 0%, rgba(8,145,178,0.10), transparent), #070C24' }}>
      <header className="border-b backdrop-blur" style={{ borderColor: '#1E2A55', background: 'rgba(11,20,55,0.7)' }}>
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-md flex items-center justify-center" style={{ background: BRAND.accentDeep }}>
              <Ship className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: BRAND.accent }}>Conversation Pack</div>
              <div className="text-lg font-semibold text-white">Group Logistics × DiscvrAI · Execution Intelligence Suite</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-500">Prepared for</div>
            <div className="text-sm font-semibold text-white">Jai Khurana · Joint President & Group Head Logistics</div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-8 pt-14 pb-10">
        <div className="text-xs uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: BRAND.accent }}>Predict → recommend → assign owner → track closure</div>
        <h1 className="text-5xl font-bold leading-tight max-w-4xl text-white">
          The constraint is decision velocity, <span style={{ color: BRAND.accent }}>not lack of systems.</span>
        </h1>
        <p className="mt-5 text-lg text-slate-400 max-w-3xl leading-relaxed">
          Execution intelligence layer on top of your ERP / TMS / WMS / port and project systems. Predictive freight, leakage and vendor truth,
          ropeway / project assurance, and a leadership copilot — designed so a logistics win doubles as group-ready capability.
        </p>

        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            { k: 'Pilot window', v: '8–12 wk', l: '1 corridor / 1 KPI · go-no-go' },
            { k: 'First waves', v: 'Freight + Leakage', l: 'measurable, data-feasible' },
            { k: 'Approach', v: 'Sidecar', l: 'no rip-and-replace of ERP/TMS' },
            { k: 'Scale path', v: 'T&M pod', l: '4–8 FTE · MLOps · integrations' },
          ].map(s => (
            <div key={s.k} className="rounded-xl border p-5" style={{ background: BRAND.paper, borderColor: '#1E2A55' }}>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">{s.k}</div>
              <div className="text-3xl font-bold mt-1" style={{ color: BRAND.accent }}>{s.v}</div>
              <div className="text-xs text-slate-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-4">Conversation Pack</div>
        <div className="grid grid-cols-2 gap-5">
          {tiles.map(t => {
            const I = t.icon;
            return (
              <Link key={t.to} to={t.to}
                className="group rounded-2xl border p-7 hover:-translate-y-0.5 transition-all"
                style={{ background: BRAND.paper, borderColor: '#1E2A55' }}>
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center text-white shadow-lg`}>
                    <I className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{t.label}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{t.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all" style={{ color: BRAND.accent }}>
                  Open <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="border-t" style={{ borderColor: '#1E2A55', background: BRAND.navy }}>
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between text-xs text-slate-500">
          <div>Confidential · synthetic demo data · no Adani / group branding implied · not operational data</div>
          <div>Pilot 8–12 wk · T&M pod 3–6 month minimum (illustrative)</div>
        </div>
      </footer>
    </div>
  );
}
