import React, { useMemo, useState, useEffect } from 'react';
import raw from '@/data/copDashboardData.json';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid, ReferenceLine, ComposedChart, PieChart, Pie, Cell
} from 'recharts';
import {
  Factory, TrendingUp, TrendingDown, DollarSign, Gauge, Package, Calendar,
  Download, Moon, Sun, Sparkles, AlertTriangle, ArrowUpRight, ArrowDownRight,
  Activity, Layers, Droplets, Flame, Zap
} from 'lucide-react';

type Row = typeof raw[number];

const fmt = (n: number, d = 0) =>
  n == null || isNaN(n) ? '—' : Number(n).toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: d });
const pct = (n: number, d = 1) => (n == null ? '—' : (n * 100).toFixed(d) + '%');

function avg(a: number[]) { return a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0; }
function ma(arr: number[], w = 7) {
  return arr.map((_, i) => {
    const s = Math.max(0, i - w + 1);
    return avg(arr.slice(s, i + 1));
  });
}

export default function AluminaCopDashboard() {
  const all = raw as Row[];
  const [dark, setDark] = useState(true);
  const [from, setFrom] = useState(all[0].date);
  const [to, setTo] = useState(all[all.length - 1].date);

  const rows = useMemo(() => all.filter(r => r.date >= from && r.date <= to), [all, from, to]);

  // KPIs
  const k = useMemo(() => {
    const hyd = rows.map(r => r.hydrate);
    const cal = rows.map(r => r.calcined);
    const cop = rows.map(r => r.total_cop);
    const rec = rows.map(r => r.recovery);
    const last = rows[rows.length - 1] || ({} as Row);
    const prev = rows[rows.length - 2] || last;
    const dod = (a: number, b: number) => (b ? ((a - b) / b) * 100 : 0);
    return {
      hyd: { avg: avg(hyd), dod: dod(last.hydrate, prev.hydrate), best: Math.max(...hyd), worst: Math.min(...hyd) },
      cal: { avg: avg(cal), dod: dod(last.calcined, prev.calcined), best: Math.max(...cal), worst: Math.min(...cal) },
      cop: { avg: avg(cop), dod: dod(last.total_cop, prev.total_cop) },
      rec: { avg: avg(rec) },
      stock: last.closing_stock || 0,
      stockDays: last.stock_days || 0,
    };
  }, [rows]);

  // Series
  const hydMa = useMemo(() => ma(rows.map(r => r.hydrate)), [rows]);
  const calMa = useMemo(() => ma(rows.map(r => r.calcined)), [rows]);

  const prod = rows.map((r, i) => ({
    date: r.date.slice(5), hydrate: r.hydrate, calcined: r.calcined,
    hyd_ma: Math.round(hydMa[i]), cal_ma: Math.round(calMa[i]),
  }));

  const bauxiteMix = rows.map(r => ({
    date: r.date.slice(5),
    OMC: +(r.omc_pct * 100).toFixed(1),
    Andru: +(r.andru_pct * 100).toFixed(1),
    Imported: +(r.imp_pct * 100).toFixed(1),
    Other: +(r.other_pct * 100).toFixed(1),
  }));

  const cost = rows.map(r => ({
    date: r.date.slice(5),
    Bauxite: r.bauxite_cost, Steam: r.steam_cost, Power: r.power_cost, COP: r.total_cop,
  }));

  const inv = rows.map(r => ({
    date: r.date.slice(5), stock: r.closing_stock, days: r.stock_days,
    OMC: r.omc_stock, Andru: r.andru_stock, Imported: r.imported_stock, RTA: r.rta_stock,
  }));

  const qual = rows.map(r => ({
    date: r.date.slice(5),
    THA: +(r.tha * 100).toFixed(2),
    Moisture: +(r.moisture * 100).toFixed(2),
    Recovery: +(r.recovery * 100).toFixed(2),
  }));

  // Cost contribution (avg)
  const contrib = useMemo(() => {
    const sum = (k: keyof Row) => avg(rows.map(r => Number(r[k])));
    const parts = [
      { name: 'Bauxite', value: sum('bauxite_cost'), color: '#06b6d4' },
      { name: 'Caustic', value: sum('caustic_cost'), color: '#8b5cf6' },
      { name: 'Power', value: sum('power_cost'), color: '#f59e0b' },
      { name: 'Steam', value: sum('steam_cost'), color: '#ef4444' },
      { name: 'Lime', value: sum('lime_cost'), color: '#10b981' },
      { name: 'Furnace Oil', value: sum('fo_cost'), color: '#f97316' },
      { name: 'Non-Commodity', value: sum('non_comm_cost'), color: '#64748b' },
    ];
    return parts.map(p => ({ ...p, value: +p.value.toFixed(1) }));
  }, [rows]);

  // AI insights
  const insights = useMemo(() => {
    const list: { tone: 'pos' | 'neg' | 'warn' | 'info'; title: string; body: string }[] = [];
    if (rows.length < 2) return list;
    const first = rows[0], last = rows[rows.length - 1];
    const hyDelta = ((last.hydrate - first.hydrate) / first.hydrate) * 100;
    list.push({
      tone: hyDelta >= 0 ? 'pos' : 'neg',
      title: `Hydrate output ${hyDelta >= 0 ? 'up' : 'down'} ${Math.abs(hyDelta).toFixed(1)}% over period`,
      body: `Moved from ${fmt(first.hydrate)} MT to ${fmt(last.hydrate)} MT. 7-day MA now ${fmt(hydMa[hydMa.length - 1])} MT.`
    });
    const copDelta = ((last.total_cop - first.total_cop) / first.total_cop) * 100;
    list.push({
      tone: copDelta > 2 ? 'warn' : copDelta < -2 ? 'pos' : 'info',
      title: `Total COP ${copDelta >= 0 ? '+' : ''}${copDelta.toFixed(1)}% vs start`,
      body: `Largest cost driver: ${contrib[0].name} at $${contrib[0].value}/MT avg. Power averaged $${avg(rows.map(r => r.power_cost)).toFixed(0)}/MT.`
    });
    const minDays = Math.min(...rows.map(r => r.stock_days));
    list.push({
      tone: minDays <= 5 ? 'warn' : 'info',
      title: `Usable bauxite stock low: ${minDays} days minimum`,
      body: `Threshold is 6 days. ${rows.filter(r => r.stock_days <= 5).length} days breached safety floor — recommend expediting OMC/Andru lifts.`
    });
    const impAvg = avg(rows.map(r => r.imp_pct)) * 100;
    list.push({
      tone: impAvg > 55 ? 'warn' : 'info',
      title: `Imported bauxite mix at ${impAvg.toFixed(0)}% avg`,
      body: `Domestic (OMC+Andru) at ${(avg(rows.map(r => r.omc_pct + r.andru_pct)) * 100).toFixed(0)}%. FX & freight exposure remains material.`
    });
    const recAvg = avg(rows.map(r => r.recovery)) * 100;
    list.push({
      tone: recAvg >= 91 ? 'pos' : 'warn',
      title: `Overall recovery ${recAvg.toFixed(2)}%`,
      body: `THA averaged ${(avg(rows.map(r => r.tha)) * 100).toFixed(2)}%, moisture ${(avg(rows.map(r => r.moisture)) * 100).toFixed(2)}%. Recovery correlates inversely with moisture spikes.`
    });
    return list;
  }, [rows, hydMa, contrib]);

  // Export CSV
  const exportCsv = () => {
    const headers = Object.keys(rows[0] || {});
    const csv = [headers.join(','), ...rows.map(r => headers.map(h => (r as any)[h]).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `cop_${from}_${to}.csv`; a.click();
  };

  const T = dark ? {
    bg: 'bg-slate-950', panel: 'bg-slate-900/60 border-slate-800', text: 'text-slate-100',
    sub: 'text-slate-400', grid: '#1e293b', axis: '#64748b', tt: { background: '#0f172a', border: '1px solid #334155', color: '#e2e8f0' }
  } : {
    bg: 'bg-slate-50', panel: 'bg-white border-slate-200', text: 'text-slate-900',
    sub: 'text-slate-500', grid: '#e2e8f0', axis: '#64748b', tt: { background: '#fff', border: '1px solid #cbd5e1', color: '#0f172a' }
  };

  return (
    <div className={`min-h-screen ${T.bg} ${T.text} transition-colors`}>
      {/* Header */}
      <header className={`sticky top-0 z-30 backdrop-blur ${dark ? 'bg-slate-950/85 border-slate-800' : 'bg-white/85 border-slate-200'} border-b`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 mr-auto">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center">
              <Factory className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base md:text-lg font-semibold leading-tight">Alumina COP Intelligence</div>
              <div className={`text-[11px] ${T.sub}`}>Daily production · cost · recovery · inventory · AI insights</div>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border ${dark ? 'border-slate-800' : 'border-slate-200'}`}>
            <Calendar className="w-3.5 h-3.5" />
            <input type="date" value={from} min={all[0].date} max={to} onChange={e => setFrom(e.target.value)}
              className={`bg-transparent outline-none ${T.text}`} />
            <span className={T.sub}>→</span>
            <input type="date" value={to} min={from} max={all[all.length - 1].date} onChange={e => setTo(e.target.value)}
              className={`bg-transparent outline-none ${T.text}`} />
          </div>
          <button onClick={exportCsv} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border ${dark ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'}`}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button onClick={() => setDark(!dark)} className={`p-2 rounded-md border ${dark ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'}`}>
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Kpi T={T} icon={Factory} label="Hydrate Alumina (avg/day)" value={`${fmt(k.hyd.avg)} MT`} delta={k.hyd.dod} hint={`Best ${fmt(k.hyd.best)} · Worst ${fmt(k.hyd.worst)}`} />
          <Kpi T={T} icon={Layers} label="Calcined Alumina (avg/day)" value={`${fmt(k.cal.avg)} MT`} delta={k.cal.dod} hint={`Best ${fmt(k.cal.best)} · Worst ${fmt(k.cal.worst)}`} />
          <Kpi T={T} icon={DollarSign} label="Total COP (avg)" value={`$${fmt(k.cop.avg)}/MT`} delta={k.cop.dod} invert hint="V2 sector cost" />
          <Kpi T={T} icon={Gauge} label="Recovery %" value={pct(k.rec.avg, 2)} hint="Target ≥ 91%" />
          <Kpi T={T} icon={Package} label="Closing Bauxite Stock" value={`${fmt(k.stock)} KT`} hint="Latest day" />
          <Kpi T={T} icon={Activity} label="Usable Stock Days" value={`${k.stockDays} d`} alert={k.stockDays <= 5} hint="Floor 6 days" />
        </section>

        {/* AI Insights */}
        <section className={`rounded-xl border ${T.panel} p-5`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold">AI Insight Center</div>
              <div className={`text-xs ${T.sub}`}>Auto-generated for plant head · CFO · COO</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {insights.map((ins, i) => {
              const tone = ins.tone === 'pos' ? 'border-emerald-500/40 bg-emerald-500/5'
                : ins.tone === 'neg' ? 'border-rose-500/40 bg-rose-500/5'
                : ins.tone === 'warn' ? 'border-amber-500/40 bg-amber-500/5'
                : dark ? 'border-slate-700 bg-slate-800/40' : 'border-slate-200 bg-slate-50';
              const IconC = ins.tone === 'warn' ? AlertTriangle : ins.tone === 'pos' ? TrendingUp : ins.tone === 'neg' ? TrendingDown : Sparkles;
              return (
                <div key={i} className={`rounded-lg border p-3 ${tone}`}>
                  <div className="flex items-start gap-2">
                    <IconC className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold leading-snug">{ins.title}</div>
                      <div className={`text-xs mt-1 ${T.sub}`}>{ins.body}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Production Trends */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Panel T={T} title="Hydrate Alumina · daily + 7d MA" icon={Factory}>
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={prod}>
                <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke={T.axis} fontSize={11} />
                <YAxis stroke={T.axis} fontSize={11} />
                <Tooltip contentStyle={T.tt as any} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="hydrate" name="Hydrate MT" fill="#06b6d4" radius={[3, 3, 0, 0]} />
                <Line dataKey="hyd_ma" name="7d MA" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </Panel>
          <Panel T={T} title="Calcined Alumina · daily + 7d MA" icon={Layers}>
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={prod}>
                <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke={T.axis} fontSize={11} />
                <YAxis stroke={T.axis} fontSize={11} />
                <Tooltip contentStyle={T.tt as any} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="calcined" name="Calcined MT" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                <Line dataKey="cal_ma" name="7d MA" stroke="#10b981" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </Panel>
        </section>

        {/* Bauxite source + Cost contribution */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Panel T={T} title="Bauxite source mix · stacked %" icon={Droplets} className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={bauxiteMix} stackOffset="expand">
                <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke={T.axis} fontSize={11} />
                <YAxis stroke={T.axis} fontSize={11} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
                <Tooltip contentStyle={T.tt as any} formatter={(v: any) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area dataKey="OMC" stackId="1" stroke="#06b6d4" fill="#06b6d4" />
                <Area dataKey="Andru" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                <Area dataKey="Imported" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                <Area dataKey="Other" stackId="1" stroke="#64748b" fill="#64748b" />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>
          <Panel T={T} title="Avg cost contribution · $/MT" icon={DollarSign}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={contrib} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2}>
                  {contrib.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={T.tt as any} formatter={(v: any) => `$${v}/MT`} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </Panel>
        </section>

        {/* Cost trends */}
        <Panel T={T} title="Cost analytics · Bauxite · Steam · Power · Total COP ($/MT)" icon={Flame}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cost}>
              <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke={T.axis} fontSize={11} />
              <YAxis yAxisId="l" stroke={T.axis} fontSize={11} />
              <YAxis yAxisId="r" orientation="right" stroke={T.axis} fontSize={11} />
              <Tooltip contentStyle={T.tt as any} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line yAxisId="l" dataKey="Bauxite" stroke="#06b6d4" strokeWidth={2} dot={false} />
              <Line yAxisId="l" dataKey="Steam" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line yAxisId="l" dataKey="Power" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line yAxisId="r" dataKey="COP" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        {/* Inventory + Quality */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Panel T={T} title="Inventory · closing stock & usable days" icon={Package}>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={inv}>
                <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke={T.axis} fontSize={11} />
                <YAxis yAxisId="l" stroke={T.axis} fontSize={11} label={{ value: 'KT', angle: -90, position: 'insideLeft', fill: T.axis, fontSize: 10 }} />
                <YAxis yAxisId="r" orientation="right" stroke={T.axis} fontSize={11} label={{ value: 'Days', angle: 90, position: 'insideRight', fill: T.axis, fontSize: 10 }} />
                <Tooltip contentStyle={T.tt as any} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="l" dataKey="OMC" stackId="s" fill="#06b6d4" />
                <Bar yAxisId="l" dataKey="Andru" stackId="s" fill="#8b5cf6" />
                <Bar yAxisId="l" dataKey="Imported" stackId="s" fill="#f59e0b" />
                <Bar yAxisId="l" dataKey="RTA" stackId="s" fill="#64748b" />
                <Line yAxisId="r" dataKey="days" name="Stock Days" stroke="#ef4444" strokeWidth={2.5} />
                <ReferenceLine yAxisId="r" y={6} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Floor 6d', fill: '#ef4444', fontSize: 10 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Panel>

          <Panel T={T} title="Quality vs Recovery · THA · Moisture · Recovery %" icon={Gauge}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={qual}>
                <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke={T.axis} fontSize={11} />
                <YAxis yAxisId="l" stroke={T.axis} fontSize={11} />
                <YAxis yAxisId="r" orientation="right" stroke={T.axis} fontSize={11} domain={[88, 93]} />
                <Tooltip contentStyle={T.tt as any} formatter={(v: any) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line yAxisId="l" dataKey="THA" stroke="#06b6d4" strokeWidth={2} dot={false} />
                <Line yAxisId="l" dataKey="Moisture" stroke="#f59e0b" strokeWidth={2} dot={false} />
                <Line yAxisId="r" dataKey="Recovery" stroke="#10b981" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>
        </section>

        {/* Specific consumption heatmap-style table */}
        <Panel T={T} title="Specific consumption · daily detail" icon={Zap}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className={dark ? 'text-slate-400' : 'text-slate-500'}>
                <tr className={`border-b ${dark ? 'border-slate-800' : 'border-slate-200'}`}>
                  {['Date', 'Bauxite SC', 'Caustic SC', 'Lime SC', 'Steam SC', 'Power SC', 'FO SC', 'COP $/MT', 'Recovery %'].map(h =>
                    <th key={h} className="text-left py-2 px-2 font-medium uppercase tracking-wider text-[10px]">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.slice().reverse().map(r => (
                  <tr key={r.date} className={`border-b ${dark ? 'border-slate-800/60' : 'border-slate-100'}`}>
                    <td className="py-1.5 px-2 font-mono">{r.date}</td>
                    <td className="py-1.5 px-2">{r.bx_sc}</td>
                    <td className="py-1.5 px-2">{r.cs_sc}</td>
                    <td className="py-1.5 px-2">{r.lm_sc}</td>
                    <td className="py-1.5 px-2">{r.st_sc}</td>
                    <td className="py-1.5 px-2">{r.pw_sc}</td>
                    <td className="py-1.5 px-2">{r.fo_sc}</td>
                    <td className={`py-1.5 px-2 font-semibold ${r.total_cop > 400 ? 'text-amber-400' : ''}`}>${r.total_cop}</td>
                    <td className={`py-1.5 px-2 font-semibold ${r.recovery < 0.91 ? 'text-rose-400' : 'text-emerald-400'}`}>{(r.recovery * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <footer className={`text-center text-[11px] ${T.sub} py-4`}>
          Alumina COP Intelligence · {rows.length} days · {from} → {to}
        </footer>
      </main>
    </div>
  );
}

function Kpi({ T, icon: Icon, label, value, delta, hint, invert, alert }: any) {
  const showDelta = typeof delta === 'number' && isFinite(delta);
  const good = invert ? delta < 0 : delta > 0;
  return (
    <div className={`rounded-xl border ${T.panel} p-4 ${alert ? 'ring-2 ring-amber-500/50' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${alert ? 'bg-amber-500/15 text-amber-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
          <Icon className="w-4 h-4" />
        </div>
        {showDelta && (
          <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded ${good ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
            {delta > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>
      <div className={`text-[11px] uppercase tracking-wider ${T.sub}`}>{label}</div>
      <div className="text-lg md:text-xl font-bold mt-0.5">{value}</div>
      {hint && <div className={`text-[10px] ${T.sub} mt-0.5`}>{hint}</div>}
    </div>
  );
}

function Panel({ T, title, icon: Icon, children, className = '' }: any) {
  return (
    <div className={`rounded-xl border ${T.panel} p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
        <div className="font-semibold text-sm">{title}</div>
      </div>
      {children}
    </div>
  );
}
