import React, { useState } from 'react';
import { PageHeader, Card, Kpi, Pill, BRAND } from './ui';
import { kilnZones, assetHealth, defects } from './data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Flame, AlertTriangle, Wrench, Sparkles } from 'lucide-react';

export default function RAKKiln() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <PageHeader
        eyebrow="Demo 02 · Plant excellence"
        title="Kiln Reliability + Vision QC"
        sub="Zone setpoints with AI advisory · 72-hour risk windows · defect class heatmap linked to process parameters. Advisory deployment first; production after gate."
        right={<Pill tone="amber">Advisory mode</Pill>}
      />

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <Kpi label="Unplanned downtime (MTD)" value="4.2%" delta="↓ 1.8 pts vs target" tone="green" />
          <Kpi label="Scrap rate" value="2.7%" delta="-0.4 pts after vision QC" tone="green" />
          <Kpi label="High-risk assets" value="1" unit="of 14" delta="K-04 · 72h window" tone="red" />
          <Kpi label="Energy intensity" value="1.94" unit="kWh/m²" delta="↓ 5.3% YoY" tone="green" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card title="Kiln K-04 · zone setpoints" right={<Pill tone="amber">2 zones drifting</Pill>} className="col-span-2">
            <div className="space-y-2">
              {kilnZones.map(z => {
                const dev = z.temp - z.target;
                const color = z.status === 'Green' ? '#059669' : z.status === 'Amber' ? '#D97706' : '#DC2626';
                return (
                  <div key={z.zone} className="flex items-center gap-3 p-2 rounded hover:bg-slate-50">
                    <div className="w-24 text-sm font-semibold text-slate-800">{z.zone}</div>
                    <div className="flex-1 h-7 bg-slate-100 rounded relative overflow-hidden">
                      <div className="h-full" style={{ width: `${Math.min(100, (z.temp / 1300) * 100)}%`, background: color, opacity: 0.85 }} />
                      <div className="absolute inset-0 flex items-center px-2 text-[11px] text-white font-semibold">{z.temp}°C · target {z.target}°C</div>
                    </div>
                    <div className={`text-xs font-semibold w-16 text-right ${dev === 0 ? 'text-slate-500' : dev > 0 ? 'text-rose-700' : 'text-blue-700'}`}>
                      {dev > 0 ? '+' : ''}{dev}°C
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-lg p-3 text-xs" style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#7B0E1F' }}>
              <Sparkles className="w-3.5 h-3.5 inline mr-1" />
              <span className="font-semibold">AI advisory:</span> Firing-2 trending +22°C above target for 38 minutes. Suspected burner #6 lambda drift. Recommend setpoint clamp at 1195°C and inspection within 6h. Linked to recent <span className="underline">Shade variance</span> defect spike.
            </div>
          </Card>

          <Card title="Asset health · 72-hour outlook">
            <div className="space-y-2">
              {assetHealth.map((a, i) => (
                <button key={i} onClick={() => setSelected(i)}
                  className={`w-full text-left rounded-lg border p-3 transition ${selected === i ? 'border-rose-300 bg-rose-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-slate-800">{a.asset}</div>
                    <Pill tone={a.risk > 60 ? 'red' : a.risk > 40 ? 'amber' : 'green'}>{a.risk}</Pill>
                  </div>
                  <div className="mt-1 h-1.5 bg-slate-200 rounded overflow-hidden">
                    <div className="h-full" style={{ width: `${a.risk}%`, background: a.risk > 60 ? '#DC2626' : a.risk > 40 ? '#D97706' : '#059669' }} />
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1.5">{a.advisory}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Window: {a.window} · MTTR if fix: {a.mttr}</div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card title="Defect class · last 7 days" right={<Pill>Vision QC · 14,820 inspections</Pill>}>
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={defects} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" stroke="#64748b" fontSize={11} />
                  <YAxis type="category" dataKey="cls" stroke="#64748b" fontSize={11} width={100} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                    {defects.map((_, i) => <Cell key={i} fill={i === 0 ? BRAND.red : i === 1 ? '#C2410C' : i === 2 ? '#D97706' : '#94A3B8'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title="Defect → process parameter linkage" right={<Pill tone="red">Root-cause confidence 78%</Pill>}>
            <div className="space-y-2">
              {defects.filter(d => d.link !== '—').map(d => (
                <div key={d.cls} className="border border-slate-200 rounded-lg p-3 flex items-center gap-3">
                  <Wrench className="w-4 h-4" style={{ color: BRAND.red }} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">{d.cls}</div>
                    <div className="text-[11px] text-slate-600">Likely driver: <span className="font-semibold">{d.link}</span></div>
                  </div>
                  <button className="text-[11px] px-2.5 py-1 rounded text-white" style={{ background: BRAND.red }}>Open</button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
