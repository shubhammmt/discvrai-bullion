import { Card, SectionTitle, Kpi, Pill, AIInsight } from './ui';
import { lpgOutlets, lpgTrend } from './data';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function PetroleumLPG() {
  const insights = [
    'LPG demand in Chitungwiza is 24% above monthly average. Add two weekly replenishment slots — projected stock-out avoidance USD 28K.',
    'Masvingo outlet has low repeat refill rate (39%) despite strong first-time sales. Trigger SMS / WhatsApp customer refill reminder campaign.',
    'Three outlets have incomplete safety checklist updates for more than 5 days — Mutare East, Masvingo, Bulawayo South. Field audit recommended.',
    'Borrowdale repeat refill 78% — replicate dealer engagement model at Avondale and Bulawayo CBD.',
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="LPG Refills Today" value="18,400" trend={7.0} sub="cylinders" accent="violet" />
        <Kpi label="MoM Growth" value="+13%" trend={13} sub="strategic priority" accent="emerald" />
        <Kpi label="Outlets Live" value="42" sub="LPG-enabled sites" />
        <Kpi label="Stock-out Risk Outlets" value="3" sub="next 36h" accent="red" />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-7 p-5">
          <SectionTitle title="LPG Sales Trend · 6 months" sub="monthly cylinder refills" />
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={lpgTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="m" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 8 }} />
                <Bar dataKey="refills" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-5 p-5">
          <SectionTitle title="LPG Demand Heatmap · Region" sub="indexed to 100 = network average" />
          <div className="grid grid-cols-3 gap-2">
            {[
              { r: 'Harare', v: 142, c: 'red' },
              { r: 'Chitungwiza', v: 168, c: 'red' },
              { r: 'Bulawayo', v: 96, c: 'amber' },
              { r: 'Mutare', v: 82, c: 'amber' },
              { r: 'Gweru', v: 78, c: 'amber' },
              { r: 'Masvingo', v: 64, c: 'emerald' },
              { r: 'Vic Falls', v: 58, c: 'emerald' },
              { r: 'Kwekwe', v: 71, c: 'emerald' },
              { r: 'Other', v: 49, c: 'emerald' },
            ].map(t => {
              const bg = t.v > 130 ? 'bg-red-500/80' : t.v > 90 ? 'bg-amber-500/80' : 'bg-emerald-500/70';
              return (
                <div key={t.r} className={`${bg} text-white rounded-md p-3 text-center`}>
                  <div className="text-[10px] uppercase tracking-wider opacity-90">{t.r}</div>
                  <div className="text-lg font-bold mt-0.5 tabular-nums">{t.v}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <SectionTitle title="Outlet-wise LPG Performance" sub="refills · repeat % · stock cover · safety" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>{['Outlet', 'Refills (today)', 'Repeat %', 'Stock cover (h)', 'Safety checklist', 'Status'].map(h =>
                <th key={h} className="py-2 px-2 text-left font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {lpgOutlets.map(o => (
                <tr key={o.name} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2.5 px-2 font-semibold text-slate-900">{o.name}</td>
                  <td className="py-2.5 px-2 tabular-nums">{o.refills.toLocaleString()}</td>
                  <td className="py-2.5 px-2 tabular-nums">
                    <span className={o.repeat > 70 ? 'text-emerald-600 font-semibold' : o.repeat > 55 ? 'text-amber-600' : 'text-red-600 font-semibold'}>
                      {o.repeat}%
                    </span>
                  </td>
                  <td className="py-2.5 px-2 tabular-nums">
                    <span className={o.stockHrs < 36 ? 'text-red-600 font-semibold' : o.stockHrs < 72 ? 'text-amber-600' : 'text-slate-700'}>
                      {o.stockHrs}h
                    </span>
                  </td>
                  <td className="py-2.5 px-2"><Pill color={o.safety === 'OK' ? 'emerald' : 'red'}>{o.safety}</Pill></td>
                  <td className="py-2.5 px-2 text-[11px] text-slate-600">
                    {o.stockHrs < 36 ? 'Replenish today' : o.repeat < 50 ? 'Trigger refill reminder' : 'Healthy'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AIInsight items={insights} title="AI LPG Growth Recommendations" />
    </div>
  );
}
