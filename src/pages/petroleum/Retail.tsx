import { useState, useMemo } from 'react';
import { Card, SectionTitle, RiskBadge, Pill, AIInsight, Kpi } from './ui';
import { stations } from './data';

export default function PetroleumRetail() {
  const [region, setRegion] = useState('All');
  const [risk, setRisk] = useState('All');
  const regions = ['All', ...Array.from(new Set(stations.map(s => s.region)))];
  const risks = ['All', 'Green', 'Amber', 'Red'];

  const filtered = useMemo(() => stations.filter(s =>
    (region === 'All' || s.region === region) && (risk === 'All' || s.risk === risk)
  ), [region, risk]);

  const totals = useMemo(() => filtered.reduce((a, s) => ({
    rev: a.rev + s.revenue, fuel: a.fuel + s.fuel, lpg: a.lpg + s.lpg, lub: a.lub + s.lub,
  }), { rev: 0, fuel: 0, lpg: 0, lub: 0 }), [filtered]);

  const insights = [
    'Avondale Station shows 2.8% wet-stock variance on diesel. Recommend reconciliation with tank gauge and POS records.',
    'Bulawayo North has high fuel traffic but low lubricant conversion. Recommend counter-prompt and dealer incentive program.',
    'Mutare East likely to stock out of LPG within 36 hours. Recommend urgent replenishment via depot Mutare.',
    'Victoria Falls maintaining 9.4% margin via tourism cross-sell — replicate playbook across Borrowdale.',
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Stations (filtered)" value={`${filtered.length}`} sub="of 12 total" />
        <Kpi label="Combined Revenue" value={`USD ${(totals.rev / 1000).toFixed(0)}K`} accent="emerald" />
        <Kpi label="Fuel Volume" value={`${totals.fuel.toLocaleString()} KL`} accent="blue" />
        <Kpi label="LPG Cylinders" value={totals.lpg.toLocaleString()} accent="violet" />
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-end gap-3">
          {[
            { l: 'Region', v: region, set: setRegion, opts: regions },
            { l: 'Risk Level', v: risk, set: setRisk, opts: risks },
          ].map(f => (
            <div key={f.l}>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">{f.l}</div>
              <select value={f.v} onChange={e => f.set(e.target.value)}
                className="border border-slate-300 rounded-md px-3 py-1.5 text-xs bg-white">
                {f.opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          {[
            { l: 'Product', opts: ['All', 'Petrol', 'Diesel', 'LPG', 'Lubricants'] },
            { l: 'Station Type', opts: ['All', 'Owned', 'Dealer'] },
            { l: 'Time Period', opts: ['Today', 'Last 7 Days', 'MTD', 'QTD'] },
          ].map(f => (
            <div key={f.l}>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">{f.l}</div>
              <select className="border border-slate-300 rounded-md px-3 py-1.5 text-xs bg-white">
                {f.opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </Card>

      {/* Stations table */}
      <Card className="p-5">
        <SectionTitle title="Station Performance Scorecard" sub="dealer / site manager view" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>{['Station', 'City', 'Revenue', 'Fuel KL', 'LPG', 'Lub USD', 'Margin', 'Stock %', 'Variance', 'Risk', 'Recommended Action'].map(h =>
                <th key={h} className="py-2 px-2 text-left font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2.5 px-2 font-semibold text-slate-900">{s.name}</td>
                  <td className="py-2.5 px-2 text-slate-600">{s.city}</td>
                  <td className="py-2.5 px-2 tabular-nums">${(s.revenue / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-2 tabular-nums">{s.fuel}</td>
                  <td className="py-2.5 px-2 tabular-nums">{s.lpg}</td>
                  <td className="py-2.5 px-2 tabular-nums">{s.lub.toLocaleString()}</td>
                  <td className="py-2.5 px-2 tabular-nums font-semibold">{s.margin}%</td>
                  <td className="py-2.5 px-2 tabular-nums">{s.stock}%</td>
                  <td className="py-2.5 px-2 tabular-nums">
                    <span className={s.variance > 2 ? 'text-red-600 font-semibold' : s.variance > 1.2 ? 'text-amber-600' : 'text-slate-600'}>
                      {s.variance}%
                    </span>
                  </td>
                  <td className="py-2.5 px-2"><RiskBadge risk={s.risk} /></td>
                  <td className="py-2.5 px-2 text-slate-600 text-[11px]">{s.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Reconciliation + non-fuel */}
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-6 p-5">
          <SectionTitle title="Cash · Card · Mobile Money Reconciliation" sub="today · network-wide" />
          <div className="grid grid-cols-3 gap-3">
            {[
              { l: 'Cash', v: 'USD 612K', s: '0.2% short', c: 'amber' as const },
              { l: 'Card', v: 'USD 884K', s: 'reconciled', c: 'emerald' as const },
              { l: 'Mobile Money', v: 'USD 344K', s: 'T+2 lag', c: 'amber' as const },
            ].map(b => (
              <div key={b.l} className="border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">{b.l}</div>
                <div className="text-lg font-bold mt-1">{b.v}</div>
                <Pill color={b.c}>{b.s}</Pill>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-slate-500">3-way truth: POS sales · physical stock · finance settlement.</div>
        </Card>

        <Card className="col-span-12 lg:col-span-6 p-5">
          <SectionTitle title="Non-fuel Cross-sell Performance" sub="lubricants attach rate by site cluster" />
          <div className="space-y-2">
            {[
              { l: 'Harare cluster', v: 18, target: 22 },
              { l: 'Bulawayo cluster', v: 11, target: 22 },
              { l: 'Mutare cluster', v: 14, target: 20 },
              { l: 'Gweru cluster', v: 16, target: 20 },
              { l: 'Vic Falls (tourism)', v: 28, target: 22 },
            ].map(c => (
              <div key={c.l}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700">{c.l}</span>
                  <span className="tabular-nums"><span className={c.v >= c.target ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'}>{c.v}%</span> <span className="text-slate-400">/ {c.target}% target</span></span>
                </div>
                <div className="h-2 bg-slate-100 rounded">
                  <div className={`h-2 rounded ${c.v >= c.target ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${(c.v / 35) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <AIInsight items={insights} />
    </div>
  );
}
