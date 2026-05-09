import { Card, Kpi, SectionTitle, RiskBadge, Pill, AIInsight } from './ui';
import { execKpis, revenueTrend, productMix, stations, depots, tankers } from './data';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function PetroleumExec() {
  const exceptions = [
    { sev: 'Red', text: 'Chitungwiza LPG cover < 36h — divert tanker ZW-TK-118' },
    { sev: 'Red', text: 'Avondale diesel wet-stock variance 2.8% — investigate' },
    { sev: 'Red', text: 'Alpha Transport overdue USD 186K — hold credit' },
    { sev: 'Amber', text: 'Mutare East LPG ~30h cover — schedule replenishment' },
    { sev: 'Amber', text: 'Tanker route Harare → Mutare repeat delays (14d)' },
    { sev: 'Amber', text: 'Bulawayo lubricant cluster slow-moving — reallocate' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 border border-slate-700">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-medium">CEO Operating View · Today</div>
            <h2 className="text-2xl font-semibold mt-1">Business is tracking <span className="text-emerald-300">+6.2%</span> above 7-day average</h2>
            <p className="text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              Revenue strong, but margin under pressure from wet-stock variance and lubricant under-conversion.
              7 sites at stock-out risk; 5 tankers delayed; B2B overdue exposure crossed USD 1.2M.
            </p>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">Exceptions requiring action</div>
            <div className="text-3xl font-bold text-amber-300 tabular-nums">{execKpis.exceptions}</div>
            <div className="text-[10px] text-slate-400">across retail, LPG, logistics, B2B</div>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Revenue Today" value={`USD ${execKpis.revenueToday}M`} trend={execKpis.revenueChange} sub="vs 7-day avg" accent="emerald" />
        <Kpi label="Gross Margin" value={`${execKpis.grossMargin}%`} trend={execKpis.grossMarginChange} sub="-0.4 pp · investigate" accent="amber" />
        <Kpi label="Fuel Sold" value={`${execKpis.fuelKL.toLocaleString()} KL`} sub="petrol + diesel · today" accent="blue" />
        <Kpi label="LPG Refills" value={execKpis.lpgRefills.toLocaleString()} sub="cylinders · today" accent="violet" />
        <Kpi label="Lubricants Rev" value={`USD ${execKpis.lubricantsRev}K`} sub="cross-sell engine" />
        <Kpi label="Retail Uptime" value={`${execKpis.uptime}%`} sub={`12 stations live`} accent="emerald" />
        <Kpi label="Stock-out Risk Sites" value={`${execKpis.stockoutSites}`} sub="3 Red · 4 Amber" accent="red" />
        <Kpi label="B2B Overdue" value={`USD ${execKpis.overdueB2B}M`} sub="3 fleet accounts" accent="red" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-7 p-5">
          <SectionTitle title="Revenue & Margin · 7-day" sub="USD millions / %" />
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={revenueTrend}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 8 }} />
                <Area dataKey="rev" stroke="#10b981" strokeWidth={2} fill="url(#rev)" name="Revenue (USD M)" />
                <Line dataKey="margin" stroke="#f59e0b" strokeWidth={2} dot={false} name="Margin %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-5 p-5">
          <SectionTitle title="Product Mix · Today" sub="share of revenue" />
          <div className="flex items-center gap-4">
            <div className="h-44 w-44">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={productMix} dataKey="value" innerRadius={42} outerRadius={68} paddingAngle={2}>
                    {productMix.map(p => <Cell key={p.name} fill={p.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {productMix.map(p => (
                <div key={p.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
                    <span className="text-slate-700">{p.name}</span>
                  </div>
                  <span className="font-semibold tabular-nums">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Depots strip */}
      <Card className="p-5">
        <SectionTitle title="Depot Stock Position" sub="% of capacity · days of cover" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {depots.map(d => (
            <div key={d.id} className="border border-slate-200 rounded-lg p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-slate-900">{d.name}</div>
                <Pill color={d.daysCover < 4 ? 'red' : d.daysCover < 5 ? 'amber' : 'emerald'}>{d.daysCover}d cover</Pill>
              </div>
              <div className="space-y-1.5 text-[11px]">
                {[
                  { l: 'Petrol', v: d.petrol, c: '#10b981' },
                  { l: 'Diesel', v: d.diesel, c: '#3b82f6' },
                  { l: 'LPG', v: d.lpg, c: '#f59e0b' },
                ].map(b => (
                  <div key={b.l}>
                    <div className="flex justify-between text-slate-600 mb-0.5">
                      <span>{b.l}</span><span className="tabular-nums">{b.v}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded">
                      <div className="h-1.5 rounded" style={{ width: `${b.v}%`, background: b.c }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Briefing + exceptions */}
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-7 p-5 bg-gradient-to-br from-slate-50 to-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 text-[10px] font-bold">AI</div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">AI Executive Briefing</h3>
              <p className="text-[10px] text-slate-500">Generated from 14 systems · {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
          <div className="text-sm text-slate-700 leading-relaxed space-y-2.5">
            <p><strong>What changed today:</strong> Revenue +6.2% above 7-day average (USD 1.84M). LPG refills hit 18,400 — best day of quarter.</p>
            <p><strong>Where margin is leaking:</strong> Diesel wet-stock variance at <strong>Avondale</strong> (2.8%) and tanker <strong>ZW-TK-092</strong> receipt mismatch — combined ~USD 13K. Lubricant under-conversion at Bulawayo cluster ~USD 9K.</p>
            <p><strong>Sites needing attention:</strong> Chitungwiza & Mutare East LPG stock-out within 36 hours. Avondale variance investigation overdue.</p>
            <p><strong>Tanker delays:</strong> 5 delayed; 2 impact high-volume sites. Route Harare ↔ Mutare flagged repeat — vendor review proposed.</p>
            <p><strong>B2B follow-up:</strong> Alpha Transport (USD 186K, 47d), Min. Public Works (USD 218K, 31d), Eastern Logistics (USD 88K, 22d).</p>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-5 p-5">
          <SectionTitle title="High-risk Exceptions" sub="prioritized · click to drill down" />
          <div className="space-y-2">
            {exceptions.map((e, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${e.sev === 'Red' ? 'text-red-500' : 'text-amber-500'}`} />
                <div className="text-xs text-slate-700 flex-1">{e.text}</div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tanker quick view */}
      <Card className="p-5">
        <SectionTitle title="Tanker Movement · Live" sub="6 of 22 active · 5 delayed" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>{['Tanker', 'Driver', 'Route', 'Product', 'Status', 'ETA', 'Risk', 'Action'].map(h =>
                <th key={h} className="py-2 px-2 text-left font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {tankers.map(t => (
                <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2.5 px-2 font-mono font-semibold text-slate-900">{t.id}</td>
                  <td className="py-2.5 px-2 text-slate-600">{t.driver}</td>
                  <td className="py-2.5 px-2 text-slate-700">{t.route}</td>
                  <td className="py-2.5 px-2"><Pill color={t.product === 'LPG' ? 'amber' : t.product === 'Diesel' ? 'blue' : 'emerald'}>{t.product}</Pill></td>
                  <td className="py-2.5 px-2 text-slate-700">{t.status}</td>
                  <td className="py-2.5 px-2 tabular-nums text-slate-700">{t.eta}</td>
                  <td className="py-2.5 px-2"><RiskBadge risk={t.risk} /></td>
                  <td className="py-2.5 px-2 text-slate-600">{t.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
