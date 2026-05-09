import React from 'react';
import { PageHeader, Card, SevPill } from './ui';
import { complianceFrameworks, auditFindings } from './data';
import { Download, FileText } from 'lucide-react';

export default function UPMetroCompliance() {
  return (
    <div>
      <PageHeader eyebrow="Module 06" title="Compliance & Assurance Manager"
        sub="CERT-In · NCIIPC · DPDP · IEC 62443 · audit findings · board-ready summary."
        right={<button className="flex items-center gap-2 text-xs px-3 py-2 rounded bg-cyan-400 text-[#06142A] font-semibold"><Download className="w-3.5 h-3.5" /> Export board pack (PDF)</button>}
      />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {complianceFrameworks.map(f => (
            <div key={f.fw} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">{f.fw}</div>
              <div className="mt-2 flex items-baseline gap-2">
                <div className={`text-3xl font-semibold ${f.score >= 80 ? 'text-emerald-300' : f.score >= 70 ? 'text-amber-300' : 'text-red-300'}`}>{f.score}</div>
                <div className="text-xs text-slate-400">/ 100</div>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">{f.met}/{f.controls} controls met · {f.gap} gap</div>
              <div className="mt-2 h-1.5 bg-white/5 rounded">
                <div className={`h-1.5 rounded ${f.score >= 80 ? 'bg-emerald-400' : f.score >= 70 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${f.score}%` }} />
              </div>
            </div>
          ))}
        </div>

        <Card title="Audit findings · open and aging">
          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-[11px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="text-left px-3 py-2 font-medium">Finding</th>
                  <th className="text-left px-3 py-2 font-medium">Area</th>
                  <th className="text-left px-3 py-2 font-medium">Severity</th>
                  <th className="text-left px-3 py-2 font-medium">Age</th>
                  <th className="text-left px-3 py-2 font-medium">Owner</th>
                  <th className="text-left px-3 py-2 font-medium">SLA</th>
                  <th className="text-left px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {auditFindings.map(f => (
                  <tr key={f.id} className="border-t border-white/5">
                    <td className="px-3 py-2.5 text-cyan-300 font-mono text-xs">{f.id}</td>
                    <td className="px-3 py-2.5 text-slate-100">{f.area}</td>
                    <td className="px-3 py-2.5"><SevPill sev={f.sev} /></td>
                    <td className="px-3 py-2.5 text-slate-300">{f.age}</td>
                    <td className="px-3 py-2.5 text-slate-300">{f.owner}</td>
                    <td className={`px-3 py-2.5 ${f.sla.includes('Overdue') ? 'text-red-300' : 'text-slate-300'}`}>{f.sla}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${f.status === 'At Risk' ? 'bg-red-500/15 text-red-300 border-red-500/30' : f.status === 'In Progress' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'}`}>{f.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Board summary preview">
          <div className="rounded-lg bg-white text-slate-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-cyan-700 font-semibold">UPMRC · Cyber Resilience · Quarterly Board Brief</div>
                <h2 className="text-2xl mt-1">Operational resilience posture</h2>
              </div>
              <FileText className="w-8 h-8 text-cyan-700" />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[
                ['Risk index', '68 / 100', '-4 MoM'],
                ['MTTR', '4h 22m', '-18% MoM'],
                ['Recovery readiness', '72%', '3 systems below target'],
                ['Compliance score', '81%', 'CERT-In on plan'],
              ].map(([k, v, d]) => (
                <div key={k} className="rounded-lg border border-slate-200 p-3 bg-slate-50">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">{k}</div>
                  <div className="text-xl font-semibold text-slate-900 mt-1">{v}</div>
                  <div className="text-[11px] text-slate-500">{d}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="rounded border border-slate-200 p-3"><span className="font-semibold">Wins this quarter:</span> WAF + bot mgmt live on ticketing; PAM rollout phase 1 complete; OT segmentation pilot at Charbagh.</div>
              <div className="rounded border border-slate-200 p-3"><span className="font-semibold">Top asks:</span> approve SCADA backup remediation; expand drill cadence; ratify CERT-In comms protocol.</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
