import React from 'react';
import { PageHeader, Card, Kpi, Pill, BRAND } from './ui';
import { ropewayPackages, ropewayMilestones } from './data';
import { AlertTriangle, FileText, Sparkles } from 'lucide-react';

export default function JaiKhuranaRopeway() {
  return (
    <div>
      <PageHeader
        eyebrow="Demo 05 · Project assurance"
        title="Ropeway / infra execution assurance"
        sub="Indicative model based on a long-span 3S ropeway pattern (e.g. ~12.9 km Kedarnath public materials). Synthetic numbers — not project data."
        right={<Pill tone="red">2 Red packages · 6w trial-run slip forecast</Pill>}
      />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-3">
          <Kpi label="Overall progress" value="46%" delta="Plan: 53%" tone="amber" />
          <Kpi label="Critical-path slip" value="+6w" delta="trial-run forecast" tone="red" />
          <Kpi label="Procurement gaps" value="3" delta="Pkg-3 cable supplier" tone="red" />
          <Kpi label="Open approvals" value="11" delta="3 with leadership" tone="amber" />
        </div>

        <Card title="Packages · status & risk">
          <div className="space-y-2">
            {ropewayPackages.map(p => (
              <div key={p.pkg} className="grid grid-cols-12 items-center gap-3 p-3 rounded border" style={{ background: BRAND.navy, borderColor: '#1E2A55' }}>
                <div className="col-span-3 text-sm text-slate-100 font-medium">{p.pkg}</div>
                <div className="col-span-5">
                  <div className="h-3 rounded bg-slate-800 overflow-hidden">
                    <div className="h-full" style={{ width: `${p.progress}%`, background: p.risk === 'Red' ? BRAND.red : p.risk === 'Amber' ? BRAND.amber : BRAND.green }} />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{p.progress}% complete</div>
                </div>
                <div className="col-span-2 text-xs text-slate-400">{p.owner}</div>
                <div className="col-span-1 text-xs text-slate-300">{p.status}</div>
                <div className="col-span-1 text-right"><Pill tone={p.risk === 'Red' ? 'red' : p.risk === 'Amber' ? 'amber' : 'green'}>{p.risk}</Pill></div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card title="Critical-path milestones · forecast vs plan" className="col-span-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-slate-400 border-b" style={{ borderColor: '#1E2A55' }}>
                  <th className="py-2 pr-3">Milestone</th><th className="py-2 pr-3">Plan</th><th className="py-2 pr-3">Forecast</th><th className="py-2 pr-3">Δ</th>
                </tr>
              </thead>
              <tbody>
                {ropewayMilestones.map(m => (
                  <tr key={m.ms} className="border-b" style={{ borderColor: '#1E2A55' }}>
                    <td className="py-2.5 pr-3 text-slate-100">{m.ms}</td>
                    <td className="py-2.5 pr-3 font-mono text-xs text-slate-400">{m.plan}</td>
                    <td className="py-2.5 pr-3 font-mono text-xs text-slate-200">{m.forecast}</td>
                    <td className="py-2.5 pr-3"><Pill tone={m.delta.startsWith('+') && parseInt(m.delta) >= 4 ? 'red' : 'amber'}>{m.delta}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card title="Generated escalation draft" right={<Pill tone="red">Pkg-3 cable</Pill>}>
            <div className="rounded-lg p-3 text-xs leading-relaxed" style={{ background: BRAND.navy, border: '1px solid #1E2A55', color: '#CBD5E1' }}>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Subject · Pkg-3 cable supplier slip</div>
              <p>Pkg-3 (3S system) is forecast to slip the trial-run by 6 weeks driven by a cable-supplier curtailment. Recommend (a) joint-call with OEM and supplier on T+3 days; (b) explore expedited freight on lot-2 to recover 2 weeks; (c) parallel-track Pkg-4 E&M readiness so trial-run dependency is not compounded.</p>
              <div className="mt-2 flex items-center gap-2 text-emerald-300 text-[11px]"><Sparkles className="w-3 h-3" /> Owner: Project PMO · SLA 5d</div>
            </div>
            <button className="mt-3 w-full text-[11px] px-3 py-2 rounded text-white font-medium flex items-center justify-center gap-1.5" style={{ background: BRAND.accentDeep }}>
              <FileText className="w-3.5 h-3.5" /> Send to leadership pack
            </button>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-amber-300"><AlertTriangle className="w-3 h-3" /> Draft only — RM / PMO must approve before send.</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
