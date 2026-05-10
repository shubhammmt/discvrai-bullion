import React from 'react';
import { PageHeader, Card, Kpi, Pill, BRAND } from './ui';
import { leakageCategories, leakageItems } from './data';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle, Sparkles } from 'lucide-react';

const tooltipStyle = { background: '#0F1A3D', border: '1px solid #1E2A55', fontSize: 12, color: '#E2E8F0' };

export default function JaiKhuranaLeakage() {
  const total = leakageCategories.reduce((s, c) => s + c.value, 0);
  return (
    <div>
      <PageHeader
        eyebrow="Demo 03 · Cost leakage cockpit"
        title="Leakage detection · root cause · recovery narrative"
        sub="Detention · demurrage · spot premium · billing variance · underutilised contract. Each line shows root cause and recommended action — humans approve."
        right={<Pill tone="red">90-day window · ₹ {total} Cr modelled</Pill>}
      />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-3">
          <Kpi label="Total leakage estimate" value={`₹ ${total} Cr`} delta="90-day window" tone="red" />
          <Kpi label="Recoverable (modelled)" value="₹ 96 Cr" delta="contract clause + audit" tone="green" />
          <Kpi label="Open recovery actions" value="14" delta="3 Red · 7 Amber · 4 Green" tone="amber" />
          <Kpi label="Recurrence pattern alerts" value="5" delta="incl. SouthMove billing" tone="amber" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card title="By category · ₹ Cr">
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={leakageCategories} dataKey="value" nameKey="cat" outerRadius={90} innerRadius={50}>
                    {leakageCategories.map((c, i) => <Cell key={i} fill={c.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 11, color: '#94A3B8' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Leakage items · live" className="col-span-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-slate-400 border-b" style={{ borderColor: '#1E2A55' }}>
                  <th className="py-2 pr-3">ID</th><th className="py-2 pr-3">Route</th><th className="py-2 pr-3">Vendor</th><th className="py-2 pr-3">Type</th><th className="py-2 pr-3">Impact</th>
                </tr>
              </thead>
              <tbody>
                {leakageItems.map(x => (
                  <tr key={x.id} className="border-b" style={{ borderColor: '#1E2A55' }}>
                    <td className="py-2.5 pr-3 font-mono text-xs text-slate-400">{x.id}</td>
                    <td className="py-2.5 pr-3 text-slate-100">{x.route}</td>
                    <td className="py-2.5 pr-3 text-slate-300 text-xs">{x.vendor}</td>
                    <td className="py-2.5 pr-3"><Pill tone="amber">{x.type}</Pill></td>
                    <td className="py-2.5 pr-3 text-slate-200 font-semibold">{x.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {leakageItems.slice(0, 2).map((x) => (
          <Card key={x.id} title={`Drill-down · ${x.id} · ${x.route}`} right={<Pill tone="red">{x.type}</Pill>}>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3" style={{ background: 'rgba(244,63,94,0.08)', borderColor: 'rgba(244,63,94,0.3)' }}>
                <div className="flex items-center gap-2 text-rose-300 font-semibold text-sm"><AlertTriangle className="w-4 h-4" /> Root cause</div>
                <div className="mt-2 text-xs text-slate-200">{x.root}</div>
              </div>
              <div className="rounded-lg border p-3" style={{ background: BRAND.navy, borderColor: '#1E2A55' }}>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Recommended action</div>
                <div className="text-sm text-slate-200">{x.action}</div>
                <button className="mt-3 text-[11px] px-3 py-1.5 rounded text-white font-medium" style={{ background: BRAND.accentDeep }}>Open recovery workflow</button>
              </div>
              <div className="rounded-lg border p-3" style={{ background: BRAND.navy, borderColor: '#1E2A55' }}>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Pattern insight</div>
                <div className="text-xs text-slate-300">Similar pattern observed on 3 other lanes in last 60 days. Suggested cohort review with procurement and finance control.</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
