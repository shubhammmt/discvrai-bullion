import { Card, SectionTitle, Kpi, Pill, RiskBadge, AIInsight } from './ui';
import { b2bCustomers } from './data';

export default function PetroleumB2B() {
  const segments = ['Mining', 'Transport', 'Construction', 'Agriculture', 'Industrial', 'Government'];
  const alerts = [
    'Customer Alpha Transport has USD 186K overdue (47 days) and declining purchase volume. Prioritize collection before further credit — recommend hold.',
    'Mining segment margin is 1.2% below target due to pricing exceptions — review three contracts with Zim Mining Co and Granite Quarries.',
    'Three customers buying below contracted monthly commitment: Falcon Construction (-22%), Eastern Logistics (-18%), Min. of Public Works (-12%). Account director engagement required.',
    'Highveld Agro increased volume 14% MoM with full collections discipline — replicate engagement model across agriculture segment.',
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="B2B Revenue MTD" value="USD 2.7M" trend={3} sub="institutional fuel" accent="blue" />
        <Kpi label="Active Accounts" value="184" sub="across 6 segments" />
        <Kpi label="Overdue Receivables" value="USD 1.2M" sub="3 fleet accounts lead" accent="red" />
        <Kpi label="Pricing Discipline" value="92%" trend={-2} sub="exceptions trending up" accent="amber" />
      </div>

      <Card className="p-5">
        <SectionTitle title="Segment Mix · Revenue and Margin" />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {segments.map((s, i) => {
            const data = [
              { rev: '684K', m: 5.8, c: 'red' },
              { rev: '590K', m: 6.6, c: 'amber' },
              { rev: '248K', m: 7.1, c: 'amber' },
              { rev: '198K', m: 8.4, c: 'emerald' },
              { rev: '312K', m: 7.9, c: 'emerald' },
              { rev: '524K', m: 6.4, c: 'amber' },
            ][i] as any;
            return (
              <div key={s} className="border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">{s}</div>
                <div className="text-base font-bold mt-1">USD {data.rev}</div>
                <div className="mt-1"><Pill color={data.c}>Margin {data.m}%</Pill></div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle title="Customer-wise Profitability & Credit Exposure" sub="risk-ranked" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>{['Customer', 'Segment', 'Revenue MTD', 'Margin', 'Exposure', 'Overdue', 'Risk', 'Recommended Action'].map(h =>
                <th key={h} className="py-2 px-2 text-left font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {b2bCustomers.map(c => (
                <tr key={c.name} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2.5 px-2 font-semibold text-slate-900">{c.name}</td>
                  <td className="py-2.5 px-2 text-slate-600">{c.segment}</td>
                  <td className="py-2.5 px-2 tabular-nums">${(c.revenue / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-2 tabular-nums font-semibold">{c.margin}%</td>
                  <td className="py-2.5 px-2 tabular-nums">${(c.exposure / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-2 tabular-nums">
                    <span className={c.overdueDays > 30 ? 'text-red-600 font-semibold' : c.overdueDays > 15 ? 'text-amber-600' : 'text-slate-600'}>
                      {c.overdueDays}d
                    </span>
                  </td>
                  <td className="py-2.5 px-2"><RiskBadge risk={c.risk} /></td>
                  <td className="py-2.5 px-2 text-[11px] text-slate-600">{c.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-6 p-5">
          <SectionTitle title="Salesperson Performance" sub="MTD revenue · contract compliance" />
          <div className="space-y-2.5">
            {[
              { n: 'M. Chivasa (Mining)', v: 524, t: 500, c: 96 },
              { n: 'T. Ndlovu (Transport)', v: 412, t: 480, c: 84 },
              { n: 'P. Mutasa (Construction)', v: 248, t: 280, c: 88 },
              { n: 'S. Nyathi (Agri/Govt)', v: 612, t: 580, c: 92 },
            ].map(p => (
              <div key={p.n} className="flex items-center justify-between text-xs">
                <span className="text-slate-700">{p.n}</span>
                <div className="flex items-center gap-3">
                  <span className="tabular-nums"><span className={p.v >= p.t ? 'text-emerald-600 font-semibold' : 'text-amber-600'}>${p.v}K</span> <span className="text-slate-400">/ ${p.t}K</span></span>
                  <Pill color={p.c >= 90 ? 'emerald' : 'amber'}>{p.c}% compliant</Pill>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-6 p-5">
          <SectionTitle title="Demand Forecast · Next 30 days" sub="indexed view by segment" />
          <div className="space-y-2.5">
            {[
              { l: 'Mining', v: 112, dir: 'up' },
              { l: 'Transport', v: 96, dir: 'flat' },
              { l: 'Construction', v: 104, dir: 'up' },
              { l: 'Agriculture', v: 128, dir: 'up' },
              { l: 'Industrial', v: 98, dir: 'flat' },
              { l: 'Government', v: 88, dir: 'down' },
            ].map(s => (
              <div key={s.l}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700">{s.l}</span>
                  <span className="tabular-nums">{s.v} <span className="text-slate-400 text-[10px]">vs 100 baseline</span></span>
                </div>
                <div className="h-2 bg-slate-100 rounded">
                  <div className={`h-2 rounded ${s.v > 110 ? 'bg-emerald-500' : s.v > 95 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${(s.v / 140) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <AIInsight items={alerts} title="AI Risk & Growth Alerts" />
    </div>
  );
}
