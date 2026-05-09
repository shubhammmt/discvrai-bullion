import React from 'react';
import { PageHeader, Card, StatusDot, Kpi } from './ui';
import { recoverySystems, drills } from './data';
import { Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function UPMetroRecovery() {
  const greenCount = recoverySystems.filter(s => s.status === 'Green').length;
  const total = recoverySystems.length;
  return (
    <div>
      <PageHeader eyebrow="Module 05" title="Cyber Recovery & Drill Readiness"
        sub="Immutable backup coverage · last restore test · RTO/RPO posture · drill planner with after-action closure." />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <Kpi label="Recovery coverage" value={`${greenCount}/${total}`} delta="systems meeting target" tone="green" />
          <Kpi label="Immutable backup" value={recoverySystems.filter(s => s.immutable).length} delta={`of ${total} systems`} tone="cyan" />
          <Kpi label="Untested > 90d" value={recoverySystems.filter(s => s.lastTest.includes('120d') || s.lastTest === 'Never').length} tone="red" />
          <Kpi label="Drills · next 60d" value={drills.filter(d => d.status === 'Scheduled').length} tone="cyan" />
        </div>

        <Card title="Backup & recovery posture">
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="text-left px-3 py-2 font-medium">System</th>
                  <th className="text-left px-3 py-2 font-medium">Immutable backup</th>
                  <th className="text-left px-3 py-2 font-medium">Last restore test</th>
                  <th className="text-left px-3 py-2 font-medium">RTO actual</th>
                  <th className="text-left px-3 py-2 font-medium">RTO target</th>
                  <th className="text-left px-3 py-2 font-medium">RPO</th>
                  <th className="text-left px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recoverySystems.map(s => (
                  <tr key={s.sys} className="border-t border-slate-100">
                    <td className="px-3 py-2.5 text-slate-900">{s.sys}</td>
                    <td className="px-3 py-2.5">{s.immutable ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}</td>
                    <td className="px-3 py-2.5 text-slate-600">{s.lastTest}</td>
                    <td className="px-3 py-2.5 text-slate-600">{s.rto}</td>
                    <td className="px-3 py-2.5 text-slate-500">{s.rtoTarget}</td>
                    <td className="px-3 py-2.5 text-slate-600">{s.rpo}</td>
                    <td className="px-3 py-2.5"><div className="flex items-center gap-2"><StatusDot status={s.status} /><span className="text-xs">{s.status}</span></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card title="Drill planner" right={<button className="text-xs px-2 py-1 rounded bg-cyan-400 text-[#06142A] font-semibold">+ Schedule drill</button>}>
            <div className="space-y-2">
              {drills.map(d => (
                <div key={d.name} className="rounded bg-slate-50 border border-slate-200 p-3 flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-cyan-700" />
                  <div className="flex-1">
                    <div className="text-sm">{d.name}</div>
                    <div className="text-[11px] text-slate-500">{d.date} · {d.city} · {d.participants} participants</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${d.status === 'Scheduled' ? 'bg-cyan-500/15 text-cyan-700 border-cyan-500/30' : 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30'}`}>{d.status}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="After-action findings · closure tracker">
            <div className="space-y-2">
              {drills.filter(d => d.status === 'Closed').map(d => (
                <div key={d.name} className="rounded bg-slate-50 border border-slate-200 p-3">
                  <div className="text-sm">{d.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{d.date} · {d.findings} findings · {d.openFindings} open</div>
                  <div className="mt-2 h-1.5 bg-slate-50 rounded">
                    <div className="h-1.5 rounded bg-emerald-400" style={{ width: `${((d.findings! - d.openFindings!) / d.findings!) * 100}%` }} />
                  </div>
                </div>
              ))}
              <div className="rounded border border-dashed border-slate-200 p-3 text-xs text-slate-500">
                Tip: keep one OT-specific drill per quarter for sustained safety-critical readiness.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
