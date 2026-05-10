import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Presentation, ArrowRight, Gauge, Flame, MessageSquare, Network } from 'lucide-react';
import { BRAND } from './ui';

const tiles = [
  { to: '/pitch/rak', icon: Presentation, label: '6-Slide Deck', title: 'Pre-read storyline', desc: 'Thesis · operating context · collaboration map · two first waves · delivery · ask.', accent: 'from-rose-600 to-red-700' },
  { to: '/rak/cockpit', icon: Gauge, label: 'Demo 01', title: 'Demand & Inventory Cockpit', desc: '13-week probabilistic forecast · stockout risk · scenario sliders · recommended actions.', accent: 'from-red-600 to-rose-700' },
  { to: '/rak/kiln', icon: Flame, label: 'Demo 02', title: 'Kiln Reliability + Vision QC', desc: 'Zone setpoints · asset health · defect class heatmap → process tags.', accent: 'from-orange-600 to-rose-700' },
  { to: '/rak/copilot', icon: MessageSquare, label: 'Demo 03', title: 'Spec & Product Copilot', desc: 'Document-grounded RAG · refuses out-of-corpus · cites every answer.', accent: 'from-rose-700 to-pink-700' },
  { to: '/rak/architecture', icon: Network, label: 'Reference', title: 'Sidecar Architecture', desc: 'Clean-core SAP · governed data products · APIs only · no rip-and-replace.', accent: 'from-slate-700 to-slate-900' },
];

export default function RAKHub() {
  return (
    <div className="min-h-screen text-slate-800" style={{ background: 'radial-gradient(1200px 600px at 10% -10%, rgba(166,25,46,0.10), transparent), radial-gradient(900px 500px at 100% 0%, rgba(217,119,6,0.08), transparent), #FFFFFF' }}>
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-md flex items-center justify-center" style={{ background: BRAND.red }}>
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: BRAND.red }}>Conversation Pack</div>
              <div className="text-lg font-semibold text-slate-900">RAK Ceramics × DiscvrAI · Intelligence Hub</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-500">Prepared for</div>
            <div className="text-sm font-semibold text-slate-900">Nikhil Chaturvedi · CDO Office</div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-8 pt-14 pb-10">
        <div className="text-xs uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: BRAND.red }}>Value on top of the SAP transformation</div>
        <h1 className="text-5xl font-bold leading-tight max-w-4xl text-slate-900">
          Convert your clean-core program into <span style={{ color: BRAND.red }}>board-visible outcomes</span>, one domain at a time.
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">
          Sidecar data, ML, vision, and agentic layers on ERP / IBP / MES — no rip-and-replace.
          One named KPI, one business co-sponsor, one geography slice — pilot in 8–12 weeks, scale via embedded T&M pods.
        </p>

        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            { k: 'Revenue scale', v: 'AED 3.28B', l: 'FY25 · public materials' },
            { k: 'Tiles mix', v: '~58%', l: 'plus sanitary, faucets, tableware' },
            { k: 'UAE share', v: '~39%', l: 'Europe ~22% · India ~10%' },
            { k: 'Pilot window', v: '8–12 wk', l: 'one KPI baseline · go/no-go' },
          ].map(s => (
            <div key={s.k} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-[11px] uppercase tracking-wider text-slate-500">{s.k}</div>
              <div className="text-3xl font-bold mt-1" style={{ color: BRAND.red }}>{s.v}</div>
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
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all" style={{ color: BRAND.red }}>
                  Open <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between text-xs text-slate-500">
          <div>Confidential · synthetic demo data unless flagged otherwise</div>
          <div>Pilot AED 0.9–2.5m · T&M pod AED ~95–150k / FTE-month (illustrative)</div>
        </div>
      </footer>
    </div>
  );
}
