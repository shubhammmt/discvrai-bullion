import { Card, SectionTitle, Kpi, Pill, AIInsight } from './ui';
import { lubricantSkus } from './data';

export default function PetroleumLubricants() {
  const opportunities = [
    'Harare CBD and Avondale stations have high diesel traffic but low lubricant conversion (11%). Potential uplift: USD 18K/month.',
    'Fleet customers buying diesel but not lubricants represent USD 48K monthly cross-sell potential — offer bundled fleet program.',
    'Three lubricant SKUs (Gear Oil 90, Grease MP-3, Brake Fluid DOT-4) are slow-moving in Bulawayo; recommend reallocation to Harare cluster — recover ~USD 14K margin.',
    'Engine Oil 20W-50 has 22% margin and high velocity in Harare — push as default counter offer at all owned sites.',
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Lubricants Revenue" value="USD 92K" trend={4} sub="today" accent="violet" />
        <Kpi label="Blended Margin" value="21.4%" trend={0.6} sub="vs 18% target" accent="emerald" />
        <Kpi label="Attach Rate" value="16%" trend={-1} sub="lub : fuel transactions" accent="amber" />
        <Kpi label="B2B Lub Accounts" value="38" sub="USD 412K MTD" />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-7 p-5">
          <SectionTitle title="Lubricants SKU Velocity & Margin" sub="reallocate slow movers · push winners" />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>{['SKU', 'Velocity', 'Region', 'Margin', 'Recommended Action'].map(h =>
                  <th key={h} className="py-2 px-2 text-left font-medium">{h}</th>)}</tr>
              </thead>
              <tbody>
                {lubricantSkus.map(s => (
                  <tr key={s.sku} className="border-b border-slate-100">
                    <td className="py-2.5 px-2 font-medium text-slate-900">{s.sku}</td>
                    <td className="py-2.5 px-2">
                      <Pill color={s.velocity === 'High' ? 'emerald' : s.velocity === 'Medium' ? 'amber' : 'red'}>{s.velocity}</Pill>
                    </td>
                    <td className="py-2.5 px-2 text-slate-700">{s.region}</td>
                    <td className="py-2.5 px-2 tabular-nums font-semibold">{s.margin}%</td>
                    <td className="py-2.5 px-2 text-slate-600 text-[11px]">{s.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-5 p-5">
          <SectionTitle title="Station-wise Conversion" sub="lub attach rate %" />
          <div className="space-y-2">
            {[
              { l: 'Borrowdale', v: 24, t: 22 },
              { l: 'Vic Falls', v: 28, t: 22 },
              { l: 'Avondale', v: 12, t: 22 },
              { l: 'Bulawayo North', v: 11, t: 22 },
              { l: 'Mutare East', v: 14, t: 20 },
              { l: 'Gweru Central', v: 18, t: 20 },
            ].map(c => (
              <div key={c.l}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700">{c.l}</span>
                  <span className="tabular-nums"><span className={c.v >= c.t ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'}>{c.v}%</span></span>
                </div>
                <div className="h-2 bg-slate-100 rounded">
                  <div className={`h-2 rounded ${c.v >= c.t ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${(c.v / 35) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <AIInsight items={opportunities} title="Margin Growth Opportunities" />
    </div>
  );
}
