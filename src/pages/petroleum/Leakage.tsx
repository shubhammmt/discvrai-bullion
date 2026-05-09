import { Card, SectionTitle, Kpi, Pill, AIInsight } from './ui';
import { reconciliation } from './data';

export default function PetroleumLeakage() {
  const insights = [
    'Diesel variance at Avondale Station exceeds normal evaporation threshold (2.8% vs 0.6% norm). Investigate physical stock and nozzle calibration immediately.',
    'Mobile money settlement at Mutare East is delayed by 2 days (USD 2.6K). Finance to follow up with mobile network operator settlement team.',
    'Depot dispatch and station receipt mismatch detected for tanker ZW-TK-092 (~1,800L diesel · USD 1.8K). Pilferage flag — initiate physical audit.',
    'Card settlement at Bulawayo North showing T+2 lag (vs T+1 contracted). Escalate to acquiring bank — USD 2.5K working capital impact.',
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Variance Detected (today)" value="USD 9.6K" sub="across 6 nodes" accent="red" />
        <Kpi label="Wet-stock Variance" value="1.4%" trend={0.3} sub="network · vs 0.6% norm" accent="amber" />
        <Kpi label="Settlement Lag" value="USD 5.1K" sub="card + mobile money" accent="amber" />
        <Kpi label="Open Investigations" value="7" sub="3 high priority" />
      </div>

      <Card className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-semibold">Three-Way Truth · Reconciliation</h2>
            <p className="text-[11px] text-slate-300 mt-0.5">Sales record vs physical fuel movement vs financial settlement — every node, every day.</p>
          </div>
          <Pill color="emerald">14 systems connected</Pill>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { l: 'POS / Station Sales', v: '$365.2K', s: 'reported' },
            { l: 'Tank gauge / Physical', v: '$362.1K', s: '–0.85%' },
            { l: 'Finance Settlement', v: '$361.4K', s: '–1.04%' },
          ].map(b => (
            <div key={b.l} className="bg-slate-950/60 border border-slate-700 rounded-lg p-3.5">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">{b.l}</div>
              <div className="text-xl font-bold tabular-nums mt-1">{b.v}</div>
              <div className="text-[11px] text-amber-300 mt-0.5">{b.s}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle title="Variance Register" sub="risk-scored · suggested action attached" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>{['Location', 'Product', 'Sales', 'Physical', 'Finance', 'Variance', 'Risk Score', 'Suggested Action'].map(h =>
                <th key={h} className="py-2 px-2 text-left font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {reconciliation.map((r, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2.5 px-2 font-semibold text-slate-900">{r.loc}</td>
                  <td className="py-2.5 px-2 text-slate-600">{r.product}</td>
                  <td className="py-2.5 px-2 tabular-nums">{r.sales > 0 ? `$${(r.sales / 1000).toFixed(1)}K` : '—'}</td>
                  <td className="py-2.5 px-2 tabular-nums">${(r.physical / 1000).toFixed(1)}K</td>
                  <td className="py-2.5 px-2 tabular-nums">${(r.finance / 1000).toFixed(1)}K</td>
                  <td className="py-2.5 px-2 tabular-nums">
                    <span className={r.variance > 1500 ? 'text-red-600 font-semibold' : r.variance > 500 ? 'text-amber-600' : 'text-slate-600'}>
                      ${r.variance.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-2.5 px-2">
                    <Pill color={r.risk > 80 ? 'red' : r.risk > 50 ? 'amber' : 'emerald'}>{r.risk}</Pill>
                  </td>
                  <td className="py-2.5 px-2 text-[11px] text-slate-600">{r.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle title="Exception Categories · MTD" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { l: 'Wet-stock variance', v: 18, c: 'red' },
            { l: 'Cash mismatch', v: 12, c: 'amber' },
            { l: 'Card settlement delay', v: 9, c: 'amber' },
            { l: 'Mobile money gap', v: 7, c: 'amber' },
            { l: 'Manual adjustment', v: 14, c: 'amber' },
            { l: 'Depot vs station mismatch', v: 5, c: 'red' },
          ].map(e => (
            <div key={e.l} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-700">{e.l}</div>
                <div className="text-xl font-bold mt-0.5 tabular-nums">{e.v}</div>
              </div>
              <Pill color={e.c as any}>{e.c === 'red' ? 'High' : 'Watch'}</Pill>
            </div>
          ))}
        </div>
      </Card>

      <AIInsight items={insights} title="AI Leakage Insights" />
    </div>
  );
}
