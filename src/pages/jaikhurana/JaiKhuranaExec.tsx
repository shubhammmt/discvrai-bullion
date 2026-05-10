import React from 'react';
import { PageHeader, Card, Kpi, Pill, BRAND } from './ui';
import { execKpis, spendByMode, varianceByRoute, exceptionTable, aiSummary } from './data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { Sparkles, ArrowRight } from 'lucide-react';

const tooltipStyle = { background: '#0F1A3D', border: '1px solid #1E2A55', fontSize: 12, color: '#E2E8F0' };

export default function JaiKhuranaExec() {
  return (
    <div>
      <PageHeader
        eyebrow="Demo 01 · Executive command"
        title="Group Logistics Execution Intelligence"
        sub="Spend vs plan · variance · leakage estimate · risk routes · pending decisions · rail utilisation. AI summary with named drivers — every output shows top factors, never black-box scores."
        right={<Pill tone="navy">Reads ERP/TMS/WMS · advisory only</Pill>}
      />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-6 gap-3">
          {execKpis.map(k => <Kpi key={k.label} label={k.label} value={k.value} delta={k.delta} tone={k.tone} />)}
        </div>

        <Card>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,211,238,0.15)' }}>
              <Sparkles className="w-4 h-4" style={{ color: BRAND.accent }} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">AI summary · with drivers</div>
              <div className="text-sm text-slate-200 leading-relaxed">{aiSummary}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Pill tone="amber">Driver: detention cluster</Pill>
                <Pill tone="amber">Driver: spot premium</Pill>
                <Pill tone="navy">Lever: rail-multimodal shift</Pill>
                <Pill tone="green">Modelled: ₹ 9.2 Cr · 30d</Pill>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card title="Spend by mode · ₹ Cr · MTD">
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={spendByMode}>
                  <XAxis dataKey="mode" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="plan" fill="#475569" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" fill={BRAND.accent} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Grey: plan · Cyan: actual</div>
          </Card>

          <Card title="Variance by route · % vs plan">
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={varianceByRoute} layout="vertical" margin={{ left: 30 }}>
                  <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                  <YAxis type="category" dataKey="route" stroke="#94A3B8" fontSize={10} width={150} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <ReferenceLine x={0} stroke="#475569" />
                  <Bar dataKey="variance" radius={[0, 4, 4, 0]}>
                    {varianceByRoute.map((d, i) => (
                      <Cell key={i} fill={d.variance > 5 ? BRAND.red : d.variance > 0 ? BRAND.amber : BRAND.green} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card title="Ranked exception table · pending leadership decisions" right={<Pill tone="red">2 Red · 2 Amber</Pill>}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-slate-400 border-b" style={{ borderColor: '#1E2A55' }}>
                <th className="py-2 pr-3">ID</th>
                <th className="py-2 pr-3">Route / Project</th>
                <th className="py-2 pr-3">Issue</th>
                <th className="py-2 pr-3">Impact</th>
                <th className="py-2 pr-3">Owner</th>
                <th className="py-2 pr-3">SLA</th>
                <th className="py-2 pr-3">Risk</th>
                <th className="py-2 pr-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {exceptionTable.map(x => (
                <tr key={x.id} className="border-b" style={{ borderColor: '#1E2A55' }}>
                  <td className="py-3 pr-3 font-mono text-xs text-slate-400">{x.id}</td>
                  <td className="py-3 pr-3 text-slate-100">{x.route}</td>
                  <td className="py-3 pr-3 text-slate-300 text-xs">{x.issue}</td>
                  <td className="py-3 pr-3 text-slate-200 font-semibold">{x.impact}</td>
                  <td className="py-3 pr-3 text-slate-400 text-xs">{x.owner}</td>
                  <td className="py-3 pr-3 text-slate-400 text-xs">{x.sla}</td>
                  <td className="py-3 pr-3"><Pill tone={x.risk === 'Red' ? 'red' : 'amber'}>{x.risk}</Pill></td>
                  <td className="py-3 pr-3 text-right">
                    <button className="text-[11px] px-3 py-1.5 rounded text-white font-medium inline-flex items-center gap-1" style={{ background: BRAND.accentDeep }}>
                      Assign <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
