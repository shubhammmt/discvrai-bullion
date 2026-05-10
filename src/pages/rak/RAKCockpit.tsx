import React, { useState, useMemo } from 'react';
import { PageHeader, Card, Kpi, Pill, BRAND } from './ui';
import { skuForecast, regions, stockoutRisks } from './data';
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart } from 'recharts';
import { TrendingUp, Package, AlertTriangle, Sparkles } from 'lucide-react';

export default function RAKCockpit() {
  const [surcharge, setSurcharge] = useState(0); // %
  const [horizon, setHorizon] = useState(13);

  const adjusted = useMemo(() => skuForecast.slice(0, horizon).map(r => ({
    ...r,
    forecast: r.forecast ? Math.round(r.forecast * (1 + surcharge / 100)) : null,
    lo: r.lo ? Math.round(r.lo * (1 + surcharge / 100)) : null,
    hi: r.hi ? Math.round(r.hi * (1 + surcharge / 100)) : null,
  })), [surcharge, horizon]);

  return (
    <div>
      <PageHeader
        eyebrow="Demo 01 · Planning network"
        title="Demand & Inventory Cockpit"
        sub="13-week probabilistic forecast for TIL-SLB-1200x2400-CRM · scenario sliders · stockout risk · recommended actions. Reads from ERP / warehouse; write-back is approval-only."
        right={<Pill tone="red">Synthetic data · advisory only</Pill>}
      />

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <Kpi label="Forecast error (MAPE)" value="11.2%" delta="↓ 4.6 pts vs baseline" tone="green" />
          <Kpi label="Working capital at risk" value="$3.8M" delta="across 14 SKU × region" tone="red" />
          <Kpi label="Stockouts (next 14d)" value="2" unit="SKUs" delta="High risk flagged" tone="amber" />
          <Kpi label="OTIF projected" value="94.1%" delta="+1.8 pts after actions" tone="green" />
        </div>

        <Card title="13-week probabilistic forecast · TIL-SLB-1200x2400-CRM" right={<Pill>Confidence bands P10–P90</Pill>}>
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div className="col-span-3 h-64">
              <ResponsiveContainer>
                <ComposedChart data={adjusted}>
                  <XAxis dataKey="wk" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="hi" stroke="none" fill={BRAND.red} fillOpacity={0.08} />
                  <Area type="monotone" dataKey="lo" stroke="none" fill="#fff" fillOpacity={1} />
                  <Line type="monotone" dataKey="actual" stroke="#0F172A" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="forecast" stroke={BRAND.red} strokeWidth={2} strokeDasharray="4 3" dot={{ r: 2 }} />
                  <ReferenceLine x="W4" stroke="#94a3b8" strokeDasharray="2 2" label={{ value: 'Today', fontSize: 10, fill: '#64748b' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Logistics surcharge</div>
                <input type="range" min={-10} max={25} value={surcharge} onChange={e => setSurcharge(+e.target.value)} className="w-full accent-rose-700" />
                <div className="text-xs text-slate-700 mt-1">{surcharge > 0 ? '+' : ''}{surcharge}% · projected impact applied</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Horizon</div>
                <input type="range" min={4} max={13} value={horizon} onChange={e => setHorizon(+e.target.value)} className="w-full accent-rose-700" />
                <div className="text-xs text-slate-700 mt-1">{horizon} weeks</div>
              </div>
              <div className="rounded-lg p-3 text-xs" style={{ background: '#FEF2F2', borderColor: '#FECACA', border: '1px solid', color: '#7B0E1F' }}>
                <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                Top driver: <span className="font-semibold">UAE project pipeline (+18% wk-on-wk)</span>. Recommend pulling Plant 2 production by 3 days.
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card title="Region mix · current trajectory">
            <div className="space-y-2.5">
              {regions.map(r => (
                <div key={r.name} className="flex items-center gap-3">
                  <div className="w-16 text-sm font-semibold text-slate-800">{r.name}</div>
                  <div className="flex-1 h-6 bg-slate-100 rounded relative overflow-hidden">
                    <div className="h-full" style={{ width: `${r.share * 2}%`, background: r.tone === 'green' ? '#059669' : r.tone === 'amber' ? '#D97706' : '#94A3B8' }} />
                    <div className="absolute inset-0 flex items-center px-2 text-[11px] text-white font-semibold">{r.share}%</div>
                  </div>
                  <Pill tone={r.tone}>{r.growth}</Pill>
                  <div className="w-48 text-[11px] text-slate-600">{r.note}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Stockout risk · next 14 days" right={<Pill tone="red">2 high-risk SKUs</Pill>}>
            <div className="space-y-2">
              {stockoutRisks.map(s => (
                <div key={s.sku} className="border border-slate-200 rounded-lg p-3 flex items-center gap-3">
                  <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${s.risk === 'High' ? 'text-rose-600' : s.risk === 'Medium' ? 'text-amber-600' : 'text-emerald-600'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-slate-800 truncate">{s.sku}</div>
                    <div className="text-[11px] text-slate-500">{s.region} · {s.cover}d cover · {s.action}</div>
                  </div>
                  <Pill tone={s.risk === 'High' ? 'red' : s.risk === 'Medium' ? 'amber' : 'green'}>{s.risk}</Pill>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Recommended actions" right={<Pill tone="green">Human-in-the-loop · approval required</Pill>}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { t: 'Expedite TIL-60x60-MARBLE-LUX to KSA', d: 'Stockout in 7 days. Air-freight 2,400 m² ex-Plant 2. Estimated margin protection: $186K.', cta: 'Create change order' },
              { t: 'Pull production for UAE projects', d: 'Pipeline +18% wk-on-wk. Advance Plant 2 batch by 3 days. Net: working-capital impact $410K.', cta: 'Send to planner' },
              { t: 'Re-route India DC via UAE', d: 'SAN-WCB-OASIS-WHT cover 12d. Surface route avoids stockout for 9-day lead time.', cta: 'Draft dealer comms' },
            ].map((a, i) => (
              <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="text-sm font-semibold text-slate-900">{a.t}</div>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">{a.d}</div>
                <button className="mt-3 text-xs px-3 py-1.5 rounded text-white font-medium" style={{ background: BRAND.red }}>{a.cta}</button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
