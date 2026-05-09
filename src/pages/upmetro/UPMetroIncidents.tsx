import React, { useState } from 'react';
import { PageHeader, Card, SevPill } from './ui';
import { incidents, incidentTimeline } from './data';
import { Clock, ShieldAlert, FileText, UserCheck, Send, CheckCircle2 } from 'lucide-react';

export default function UPMetroIncidents() {
  const [selId, setSelId] = useState(incidents[0].id);
  const sel = incidents.find(i => i.id === selId)!;

  return (
    <div>
      <PageHeader eyebrow="Module 03" title="Threat Detection & Incident Workbench"
        sub="SOC queue · timeline drill-down · CERT-In 6h reporting timer · response playbook." />
      <div className="p-8 grid grid-cols-12 gap-4">
        <Card title={`SOC queue · ${incidents.length} active`} className="col-span-5">
          <div className="space-y-2 max-h-[640px] overflow-auto pr-1">
            {incidents.map(inc => (
              <button key={inc.id} onClick={() => setSelId(inc.id)}
                className={`w-full text-left rounded-lg border p-3 transition ${selId === inc.id ? 'border-cyan-400 bg-cyan-400/5' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cyan-300 font-mono">{inc.id}</span>
                  <SevPill sev={inc.sev} />
                </div>
                <div className="text-sm text-slate-100 mt-1">{inc.title}</div>
                <div className="text-[11px] text-slate-400 mt-1.5 flex flex-wrap gap-x-3">
                  <span>📍 {inc.station}</span>
                  <span>👤 {inc.owner}</span>
                  <span>⏱ {inc.age}</span>
                  <span className="text-cyan-300">{inc.status}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="col-span-7 space-y-4">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-cyan-300 font-mono">{sel.id}</span>
                  <SevPill sev={sel.sev} />
                  <span className="text-[11px] text-slate-400">Source zone: {sel.source}</span>
                </div>
                <h2 className="text-xl text-white mt-2">{sel.title}</h2>
                <div className="text-[11px] text-slate-400 mt-1">Affected: {sel.station} · Owner: {sel.owner} · Status: {sel.status}</div>
              </div>
              <div className={`rounded-xl border p-3 text-right ${sel.cert.reported ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-orange-500/30 bg-orange-500/10'}`}>
                <div className="text-[10px] uppercase tracking-wider text-slate-300 flex items-center justify-end gap-1"><Clock className="w-3 h-3" /> CERT-In · 6h reporting</div>
                <div className={`text-2xl font-semibold mt-1 ${sel.cert.reported ? 'text-emerald-300' : 'text-orange-300'}`}>{sel.cert.reported ? 'Filed' : sel.cert.reportBy}</div>
                <div className="text-[11px] text-slate-400">{sel.cert.reported ? 'On record' : 'Time remaining'}</div>
              </div>
            </div>
          </Card>

          <Card title="Event timeline">
            <ol className="relative border-l border-white/10 ml-2 space-y-4">
              {incidentTimeline.map((e, i) => (
                <li key={i} className="ml-4">
                  <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-cyan-400" />
                  <div className="text-[11px] text-cyan-300 font-mono">{e.t} · {e.ev}</div>
                  <div className="text-sm text-slate-200">{e.detail}</div>
                </li>
              ))}
            </ol>
          </Card>

          <Card title="Response playbook · recommended actions">
            <div className="grid grid-cols-2 gap-2">
              {[
                { i: UserCheck, t: 'Assign owner', d: 'Route to SOC L2 · Commercial Ops co-owner' },
                { i: ShieldAlert, t: 'Isolate', d: 'Block ASNs · enable bot-challenge · throttle' },
                { i: Send, t: 'Escalate', d: 'CISO · Head of Operations · Legal' },
                { i: FileText, t: 'Notify compliance', d: 'CERT-In draft · DPDP review · audit log' },
                { i: CheckCircle2, t: 'Validate', d: 'Booking success ≥ 97% · fraud rate < 0.4%' },
                { i: CheckCircle2, t: 'Close with RCA', d: 'Root cause · controls update · drill plan' },
              ].map(({ i: Icon, t, d }) => (
                <button key={t} className="text-left rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 p-3 flex items-start gap-3">
                  <Icon className="w-4 h-4 text-cyan-300 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold">{t}</div>
                    <div className="text-[11px] text-slate-400">{d}</div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
