import React from 'react';
import { Link } from 'react-router-dom';
import { Train, ShieldCheck, Network, AlertTriangle, KeyRound, ClipboardCheck, LayoutDashboard, Presentation, ArrowRight } from 'lucide-react';

const tiles = [
  { to: '/pitch/upmetro', icon: Presentation, label: '6-Slide Deck', title: 'Cyber Resilience Storyline', desc: 'Executive narrative · IT-OT risk · proposed stack · engagement modes · 90-day pilot.', accent: 'from-cyan-500 to-blue-600' },
  { to: '/upmetro/command', icon: LayoutDashboard, label: 'Module 01', title: 'Executive Cyber Command', desc: 'Multi-city posture · risk index · MTTD/MTTR · top 10 risks · trend.', accent: 'from-blue-600 to-indigo-700' },
  { to: '/upmetro/assets', icon: Network, label: 'Module 02', title: 'IT-OT Segmentation Map', desc: 'Zone-and-conduit map · trust boundaries · lateral movement risk markers.', accent: 'from-indigo-600 to-purple-700' },
  { to: '/upmetro/incidents', icon: AlertTriangle, label: 'Module 03', title: 'SOC & Incident Workbench', desc: 'Triage queue · drill-down timeline · CERT-In 6-hour timer · response playbooks.', accent: 'from-rose-600 to-orange-600' },
  { to: '/upmetro/access', icon: KeyRound, label: 'Module 04', title: 'Identity, Access & Vendor', desc: 'MFA + PAM coverage · vendor session compliance · access request audit trail.', accent: 'from-amber-500 to-orange-600' },
  { to: '/upmetro/recovery', icon: ShieldCheck, label: 'Module 05', title: 'Recovery & Drill Readiness', desc: 'Immutable backup · RTO/RPO posture · drill planner · after-action tracker.', accent: 'from-emerald-500 to-teal-600' },
  { to: '/upmetro/compliance', icon: ClipboardCheck, label: 'Module 06', title: 'Compliance & Assurance', desc: 'CERT-In · NCIIPC · DPDP · IEC 62443 · audit findings · board-ready export.', accent: 'from-cyan-500 to-emerald-600' },
];

export default function UPMetroHub() {
  return (
    <div className="min-h-screen text-slate-800" style={{ background: 'radial-gradient(1200px 600px at 10% -10%, rgba(34,211,238,0.10), transparent), radial-gradient(900px 500px at 100% 0%, rgba(59,130,246,0.10), transparent), #FFFFFF' }}>
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-md bg-cyan-600 flex items-center justify-center">
              <Train className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-700">Conversation Pack</div>
              <div className="text-lg font-semibold text-slate-900">UP Metro · Cyber Resilience Command Suite</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-500">Prepared for</div>
            <div className="text-sm font-semibold text-slate-900">UPMRC Leadership · CISO Office</div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-8 pt-14 pb-10">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan-700 font-semibold mb-4">Critical urban infrastructure · IT + OT</div>
        <h1 className="text-5xl font-bold leading-tight max-w-4xl text-slate-900">
          Securing UP Metro as <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">critical urban infrastructure</span>.
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">
          Safety, service continuity, and passenger trust through cyber resilience across Lucknow, Kanpur, and Agra —
          ticketing, payments, HRMS, vendor pathways, CCTV, signaling, SCADA, and OCC, unified into one decision layer.
        </p>

        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            { k: 'Risk index', v: '-23%', l: 'in 12 months' },
            { k: 'MTTR', v: '<4h', l: 'critical incidents' },
            { k: 'CERT-In', v: '≤6h', l: 'reporting readiness' },
            { k: 'Recovery', v: '95%', l: 'tested coverage' },
          ].map(s => (
            <div key={s.k} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-[11px] uppercase tracking-wider text-slate-500">{s.k}</div>
              <div className="text-3xl font-bold text-cyan-700 mt-1">{s.v}</div>
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
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 group-hover:gap-2.5 transition-all">
                  Open <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between text-xs text-slate-500">
          <div>Confidential · For UPMRC leadership review</div>
          <div>90-day pilot · 1 corridor + shared enterprise controls · scale metro-wide</div>
        </div>
      </footer>
    </div>
  );
}
