import React, { useMemo, useState } from 'react';
import raw from '@/data/copDashboardData.json';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid, ReferenceLine, ComposedChart, PieChart, Pie, Cell
} from 'recharts';
import {
  Factory, TrendingUp, TrendingDown, DollarSign, Gauge, Package, Calendar,
  Download, Moon, Sun, Sparkles, AlertTriangle, ArrowUpRight, ArrowDownRight,
  Activity, Layers, Droplets, Flame, Zap, IndianRupee, LineChart as LineIcon,
  Target, Beaker, BarChart3, GitBranch, ShieldCheck
} from 'lucide-react';

type Row = typeof raw[number];

const fmt = (n: number, d = 0) =>
  n == null || isNaN(n) ? '—' : Number(n).toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: d });
const pct = (n: number, d = 1) => (n == null ? '—' : (n * 100).toFixed(d) + '%');

function avg(a: number[]) { return a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0; }
function ma(arr: number[], w = 7) {
  return arr.map((_, i) => avg(arr.slice(Math.max(0, i - w + 1), i + 1)));
}
function pctChange(a: number, b: number) { return b ? ((a - b) / b) * 100 : 0; }
function corr(x: number[], y: number[]) {
  const n = Math.min(x.length, y.length);
  if (n < 2) return 0;
  const mx = avg(x), my = avg(y);
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) { num += (x[i]-mx)*(y[i]-my); dx += (x[i]-mx)**2; dy += (y[i]-my)**2; }
  return dx && dy ? num/Math.sqrt(dx*dy) : 0;
}
function corrLabel(c: number) {
  const a = Math.abs(c);
  if (a > 0.7) return c > 0 ? 'Strong +' : 'Strong −';
  if (a > 0.4) return c > 0 ? 'Positive' : 'Negative';
  if (a > 0.15) return c > 0 ? 'Weak +' : 'Weak −';
  return 'Neutral';
}

const COMPARE_MODES = ['Daily','MTD','QTD','YTD','PoP','QoQ','YoY'] as const;
type Compare = typeof COMPARE_MODES[number];

export default function AluminaCopDashboard() {
  const all = raw as Row[];
  const [dark, setDark] = useState(true);
  const [from, setFrom] = useState(all[0].date);
  const [to, setTo] = useState(all[all.length - 1].date);
  const [compare, setCompare] = useState<Compare>('Daily');
  const [productView, setProductView] = useState<'Combined'|'Hydrate'|'Calcined'>('Combined');
  const [causticView, setCausticView] = useState<'Combined'|'Chemical'|'Non-Chemical'>('Combined');

  const rows = useMemo(() => all.filter(r => r.date >= from && r.date <= to), [all, from, to]);
  // Previous comparable window (same length immediately before `from`)
  const prevRows = useMemo(() => {
    const idxFrom = all.findIndex(r => r.date >= from);
    const len = rows.length;
    const start = Math.max(0, idxFrom - len);
    return all.slice(start, idxFrom);
  }, [all, from, rows.length]);

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

  // Variance vs previous comparable window
  const variance = useMemo(() => {
    if (!prevRows.length) return null;
    const a = (k:keyof Row)=>avg(rows.map(r=>Number(r[k])));
    const p = (k:keyof Row)=>avg(prevRows.map(r=>Number(r[k])));
    return {
      hydrate: pctChange(a('hydrate'), p('hydrate')),
      calcined: pctChange(a('calcined'), p('calcined')),
      recovery: pctChange(a('recovery'), p('recovery')),
      cop: pctChange(a('total_cop'), p('total_cop')),
      stock: pctChange(a('closing_stock'), p('closing_stock')),
      alumina_index: pctChange(a('alumina_index' as any), p('alumina_index' as any)),
      fx: pctChange(a('fx_rate' as any), p('fx_rate' as any)),
      bauxite: pctChange(a('bauxite_cost'), p('bauxite_cost')),
      conv: pctChange(a('conv_cost'), p('conv_cost')),
    };
  }, [rows, prevRows, k]);

  // Series
  const hydMa = useMemo(() => ma(rows.map(r => r.hydrate)), [rows]);
  const calMa = useMemo(() => ma(rows.map(r => r.calcined)), [rows]);
  const idxMa = useMemo(() => ma(rows.map(r => (r as any).alumina_index ?? 0)), [rows]);
  const fxMa  = useMemo(() => ma(rows.map(r => (r as any).fx_rate ?? 0)), [rows]);

  const prod = rows.map((r, i) => ({
    date: r.date.slice(5), hydrate: r.hydrate, calcined: r.calcined,
    hyd_ma: Math.round(hydMa[i]), cal_ma: Math.round(calMa[i]),
  }));

  const market = rows.map((r, i) => ({
    date: r.date.slice(5),
    Index: (r as any).alumina_index,
    Index_MA: +idxMa[i].toFixed(1),
    FX: (r as any).fx_rate,
    FX_MA: +fxMa[i].toFixed(2),
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
    Bauxite: r.bauxite_cost, Conversion: (r as any).conv_cost, Steam: r.steam_cost, Power: r.power_cost, COP: r.total_cop,
  }));

  const inv = rows.map(r => ({
    date: r.date.slice(5),
    Domestic: (r as any).domestic_stock,
    Imported: r.imported_stock,
    dom_days: (r as any).dom_stock_days,
    imp_days: (r as any).imp_stock_days,
    days: r.stock_days,
  }));

  const qual = rows.map(r => ({
    date: r.date.slice(5),
    THA: +(r.tha * 100).toFixed(2),
    Moisture: +(r.moisture * 100).toFixed(2),
    RS: +((r as any).rs * 100).toFixed(2),
    Recovery: +(r.recovery * 100).toFixed(2),
  }));

  const caustic = rows.map(r => ({
    date: r.date.slice(5),
    Chemical: (r as any).chem_caustic_cost,
    'Non-Chemical': (r as any).non_chem_caustic_cost,
    Combined: r.caustic_cost,
  }));

  const convRatio = rows.map(r => ({ date: r.date.slice(5), Actual: (r as any).conv_ratio, Target: 3.33 }));

  // Cost contribution (avg)
  const contrib = useMemo(() => {
    const sum = (kk: keyof Row) => avg(rows.map(r => Number((r as any)[kk])));
    const parts = [
      { name: 'Bauxite', value: sum('bauxite_cost'), color: '#06b6d4' },
      { name: 'Conversion', value: sum('conv_cost' as any), color: '#a855f7' },
      { name: 'Power', value: sum('power_cost'), color: '#f59e0b' },
      { name: 'Steam', value: sum('steam_cost'), color: '#ef4444' },
      { name: 'Furnace Oil', value: sum('fo_cost'), color: '#f97316' },
      { name: 'Non-Commodity', value: sum('non_comm_cost'), color: '#64748b' },
      { name: 'Lime', value: sum('lime_cost'), color: '#10b981' },
    ];
    return parts.map(p => ({ ...p, value: +p.value.toFixed(1) }));
  }, [rows]);

  // Recovery driver correlations & contribution
  const drivers = useMemo(() => {
    const tha = rows.map(r => r.tha);
    const moi = rows.map(r => r.moisture);
    const rs  = rows.map(r => (r as any).rs);
    const rec = rows.map(r => r.recovery);
    const cop = rows.map(r => r.total_cop);
    const cTHA = corr(tha, rec);
    const cMoi = corr(moi, rec);
    const cRS  = corr(rs, rec);
    const cRecCop = corr(rec, cop);
    // contribution to recovery delta: weight by |corr * delta|
    if (rows.length < 2) return { cTHA, cMoi, cRS, cRecCop, parts: [], recDelta: 0 };
    const first = rows[0], last = rows[rows.length-1];
    const dTHA = (last.tha - first.tha);
    const dMoi = (last.moisture - first.moisture);
    const dRS  = ((last as any).rs - (first as any).rs);
    const recDelta = (last.recovery - first.recovery) * 100;
    const raw = [
      { name: 'THA', val: Math.abs(cTHA * dTHA), dir: cTHA*dTHA, color: '#06b6d4' },
      { name: 'Moisture', val: Math.abs(cMoi * dMoi), dir: cMoi*dMoi, color: '#f59e0b' },
      { name: 'RS', val: Math.abs(cRS * dRS), dir: cRS*dRS, color: '#ef4444' },
    ];
    const tot = raw.reduce((s,x)=>s+x.val,0) || 1;
    const parts = raw.map(x => ({ ...x, share: +(x.val/tot*100).toFixed(0) }));
    return { cTHA, cMoi, cRS, cRecCop, parts, recDelta };
  }, [rows]);

  // Recovery driver score (0-100). THA helps, Moisture/RS hurt.
  const driverScore = useMemo(() => {
    if (!rows.length) return { score: 0, prev: 0, status: 'Watch' };
    const sc = (arr: Row[]) => {
      const tha = avg(arr.map(r=>r.tha));         // ~0.40-0.42 good
      const moi = avg(arr.map(r=>r.moisture));    // lower better
      const rs  = avg(arr.map(r=>(r as any).rs)); // lower better
      const rec = avg(arr.map(r=>r.recovery));
      const sTHA = Math.max(0, Math.min(1, (tha-0.38)/0.06));
      const sMoi = Math.max(0, Math.min(1, 1 - (moi-0.08)/0.06));
      const sRS  = Math.max(0, Math.min(1, 1 - (rs-0.018)/0.018));
      const sRec = Math.max(0, Math.min(1, (rec-0.88)/0.05));
      return Math.round((sTHA*0.25 + sMoi*0.25 + sRS*0.25 + sRec*0.25)*100);
    };
    const score = sc(rows);
    const prev = prevRows.length ? sc(prevRows) : score;
    const status = score>=80?'Excellent':score>=65?'Good':score>=50?'Watch':'Critical';
    return { score, prev, status };
  }, [rows, prevRows]);

  // Quality score (0-100) for KPI
  const qualityScore = useMemo(() => {
    if (!rows.length) return 0;
    const tha = avg(rows.map(r=>r.tha));
    const moi = avg(rows.map(r=>r.moisture));
    const rs  = avg(rows.map(r=>(r as any).rs));
    const sTHA = Math.max(0, Math.min(1, (tha-0.38)/0.06));
    const sMoi = Math.max(0, Math.min(1, 1 - (moi-0.08)/0.06));
    const sRS  = Math.max(0, Math.min(1, 1 - (rs-0.018)/0.018));
    return Math.round((sTHA + sMoi + sRS)/3 * 100);
  }, [rows]);

  // Conversion ratio summary
  const convSummary = useMemo(() => {
    const a = avg(rows.map(r => (r as any).conv_ratio));
    return { actual: +a.toFixed(2), target: 3.33, variance: +(((a-3.33)/3.33)*100).toFixed(1) };
  }, [rows]);

  // Inventory health
  const invHealth = (days: number) => days >= 8 ? { color:'emerald', label:'Healthy'} : days >= 5 ? { color:'amber', label:'Monitor'} : { color:'rose', label:'Critical'};

  // AI insights
  const insights = useMemo(() => {
    const list: { tone: 'pos' | 'neg' | 'warn' | 'info'; title: string; body: string }[] = [];
    if (rows.length < 2) return list;
    const first = rows[0], last = rows[rows.length - 1];
    const hyDelta = pctChange(last.hydrate, first.hydrate);
    list.push({
      tone: hyDelta >= 0 ? 'pos' : 'neg',
      title: `Hydrate output ${hyDelta >= 0 ? 'up' : 'down'} ${Math.abs(hyDelta).toFixed(1)}% over period`,
      body: `Moved ${fmt(first.hydrate)}→${fmt(last.hydrate)} MT. 7d MA ${fmt(hydMa[hydMa.length - 1])} MT.`
    });
    const calDelta = pctChange(last.calcined, first.calcined);
    list.push({
      tone: calDelta >= 0 ? 'pos' : 'info',
      title: `Calcined alumina ${calDelta>=0?'grew':'eased'} ${Math.abs(calDelta).toFixed(1)}% QoQ-equivalent`,
      body: `End-of-period output ${fmt(last.calcined)} MT vs start ${fmt(first.calcined)} MT.`
    });
    const fxDelta = pctChange((last as any).fx_rate, (first as any).fx_rate);
    list.push({
      tone: fxDelta > 1 ? 'warn' : 'info',
      title: `Exchange rate ${fxDelta>=0?'+':''}${fxDelta.toFixed(2)}% MTD`,
      body: `INR/USD moved ${(first as any).fx_rate}→${(last as any).fx_rate}, lifting landed bauxite cost on imports.`
    });
    const idxDelta = pctChange((last as any).alumina_index, (first as any).alumina_index);
    list.push({
      tone: idxDelta > 0 ? 'pos' : 'info',
      title: `Alumina index ${idxDelta>=0?'+':''}${idxDelta.toFixed(1)}% while conversion ${pctChange(last.conv_cost as any, first.conv_cost as any).toFixed(1)}%`,
      body: `Index ${(first as any).alumina_index}→${(last as any).alumina_index} $/MT. Conversion cost relatively contained.`
    });
    const copDelta = pctChange(last.total_cop, first.total_cop);
    list.push({
      tone: copDelta > 2 ? 'warn' : copDelta < -2 ? 'pos' : 'info',
      title: `Total COP ${copDelta >= 0 ? '+' : ''}${copDelta.toFixed(1)}% vs start`,
      body: `Largest driver: ${contrib[0].name} at $${contrib[0].value}/MT avg.`
    });
    const impDays = (last as any).imp_stock_days;
    if (impDays <= 7) list.push({ tone:'warn', title:`Imported bauxite to reach threshold in ${impDays} days`, body:`Initiate replenishment PO; FX exposure elevated.` });
    list.push({
      tone: drivers.recDelta >= 0 ? 'pos' : 'warn',
      title: `Recovery ${drivers.recDelta>=0?'improved':'declined'} ${Math.abs(drivers.recDelta).toFixed(2)} pp`,
      body: `Top contributors — ${drivers.parts.map(p=>`${p.name} ${p.share}%`).join(' · ')}.`
    });
    return list;
  }, [rows, hydMa, contrib, drivers]);

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

  const lastRow: any = rows[rows.length-1] || {};
  const impHealth = invHealth((lastRow.imp_stock_days || 0));
  const domHealth = invHealth((lastRow.dom_stock_days || 0));

  return (
    <div className={`min-h-screen ${T.bg} ${T.text} transition-colors`}>
      {/* Header */}
      <header className={`sticky top-0 z-30 backdrop-blur ${dark ? 'bg-slate-950/85 border-slate-800' : 'bg-white/85 border-slate-200'} border-b`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-3 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 mr-auto">
            <div className={`h-10 px-2 rounded-lg flex items-center justify-center ${dark ? 'bg-white' : 'bg-white border border-slate-200'}`}>
              <img
                src="https://d1rbiogke1jwo5.cloudfront.net/wp-content/themes/VedantaAluminiumAndPower/images/Vedanta-Aluminium-Metal-Limited-Logo.png"
                alt="Vedanta Aluminium & Power"
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <div className="text-base md:text-lg font-semibold leading-tight">Alumina COP Intelligence</div>
              <div className={`text-[13px] ${T.sub}`}>Production · cost · recovery · market · AI insights</div>
            </div>
          </div>
          <div className={`flex items-center gap-0.5 text-[13px] rounded-md border p-0.5 ${dark ? 'border-slate-800' : 'border-slate-200'}`}>
            {COMPARE_MODES.map(m => (
              <button key={m} onClick={()=>setCompare(m)}
                className={`px-2 py-1 rounded ${compare===m ? (dark?'bg-cyan-600 text-white':'bg-cyan-600 text-white') : T.sub}`}>{m}</button>
            ))}
          </div>
          <div className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border ${dark ? 'border-slate-800' : 'border-slate-200'}`}>
            <Calendar className="w-3.5 h-3.5" />
            <input type="date" value={from} min={all[0].date} max={to} onChange={e => setFrom(e.target.value)} className={`bg-transparent outline-none ${T.text}`} />
            <span className={T.sub}>→</span>
            <input type="date" value={to} min={from} max={all[all.length - 1].date} onChange={e => setTo(e.target.value)} className={`bg-transparent outline-none ${T.text}`} />
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

        {/* Executive Summary KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <Kpi T={T} icon={Factory} label="Hydrate (avg/day)" value={`${fmt(k.hyd.avg)} MT`} delta={k.hyd.dod} hint={`Best ${fmt(k.hyd.best)}`} />
          <Kpi T={T} icon={Layers} label="Calcined (avg/day)" value={`${fmt(k.cal.avg)} MT`} delta={k.cal.dod} hint={`Best ${fmt(k.cal.best)}`} />
          <Kpi T={T} icon={DollarSign} label="Total COP" value={`$${fmt(k.cop.avg)}/MT`} delta={k.cop.dod} invert hint="V2 sector cost" />
          <Kpi T={T} icon={Gauge} label="Recovery %" value={pct(k.rec.avg, 2)} hint="Target ≥ 91%" />
          <Kpi T={T} icon={Target} label="Conv. Ratio" value={`${convSummary.actual}`} delta={convSummary.variance} invert hint={`Target ${convSummary.target}`} />
          <Kpi T={T} icon={ShieldCheck} label="Quality Score" value={`${qualityScore}/100`} hint="THA · Moisture · RS" />
          <Kpi T={T} icon={GitBranch} label="Recovery Driver Score" value={`${driverScore.score}/100`} delta={driverScore.score - driverScore.prev} hint={driverScore.status} />
          <Kpi T={T} icon={Activity} label="Usable Stock Days" value={`${k.stockDays} d`} alert={k.stockDays <= 5} hint="Floor 6 days" />
        </section>

        {/* Variance ribbon (when compare mode != Daily) */}
        {compare !== 'Daily' && variance && (
          <section className={`rounded-xl border ${T.panel} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <div className="text-sm font-semibold">{compare} comparison · {rows.length}d window vs prior {prevRows.length}d</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
              {([
                ['Hydrate', variance.hydrate], ['Calcined', variance.calcined],
                ['Recovery', variance.recovery, true], ['COP', variance.cop, false, true],
                ['Stock', variance.stock], ['Alumina Idx', variance.alumina_index],
                ['FX', variance.fx, false, true], ['Bauxite Cost', variance.bauxite, false, true],
              ] as [string, number, boolean?, boolean?][]).map(([n, v, _gp, inv]) => {
                const good = inv ? v < 0 : v > 0;
                return (
                  <div key={n} className={`rounded-lg border p-2 ${dark?'border-slate-800':'border-slate-200'}`}>
                    <div className={`text-[12px] uppercase tracking-wider ${T.sub}`}>{n}</div>
                    <div className={`text-sm font-bold ${good?'text-emerald-400':'text-rose-400'}`}>{v>=0?'+':''}{v.toFixed(1)}%</div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Market & Financial Intelligence */}
        <section className="space-y-3">
          <SectionHeader icon={LineIcon} title="Market & Financial Intelligence" sub="Alumina index · FX · landed bauxite & conversion" T={T} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Kpi T={T} icon={DollarSign} label="Alumina Index (latest)" value={`$${fmt((lastRow.alumina_index)||0,1)}`} delta={pctChange(lastRow.alumina_index, rows[0]?.alumina_index)} hint={`MTD avg $${fmt(avg(rows.map(r=>(r as any).alumina_index)),1)}`} />
            <Kpi T={T} icon={IndianRupee} label="Exchange Rate (INR/USD)" value={`${fmt(lastRow.fx_rate,2)}`} delta={pctChange(lastRow.fx_rate, rows[0]?.fx_rate)} invert hint={`MTD avg ${fmt(avg(rows.map(r=>(r as any).fx_rate)),2)}`} />
            <Kpi T={T} icon={Droplets} label="Bauxite Cost (avg)" value={`$${fmt(avg(rows.map(r=>r.bauxite_cost)))}/MT`} delta={variance?.bauxite} invert hint={`${((avg(rows.map(r=>r.bauxite_cost))/avg(rows.map(r=>r.total_cop)))*100).toFixed(0)}% of COP`} />
            <Kpi T={T} icon={Flame} label="Other Cost (avg)" value={`$${fmt(avg(rows.map(r=>(r as any).conv_cost)))}/MT`} delta={variance?.conv} invert hint={`${((avg(rows.map(r=>(r as any).conv_cost))/avg(rows.map(r=>r.total_cop)))*100).toFixed(0)}% of COP · ex-bauxite`} />
          </div>
          {/* Other Cost breakdown */}
          <div className={`rounded-xl border ${T.panel} p-3`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-[13px] uppercase tracking-wider ${T.sub}`}>Other Cost breakdown · avg $/MT</div>
              <div className="text-[13px] font-semibold">Total ${fmt(['power_cost','steam_cost','fo_cost','non_comm_cost','lime_cost','caustic_cost'].reduce((s,k)=>s+avg(rows.map(r=>Number((r as any)[k])||0)),0))}/MT</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {[
                { name: 'Power', k: 'power_cost', color: '#f59e0b' },
                { name: 'Steam', k: 'steam_cost', color: '#ef4444' },
                { name: 'Caustic', k: 'caustic_cost', color: '#8b5cf6' },
                { name: 'Furnace Oil', k: 'fo_cost', color: '#f97316' },
                { name: 'Lime', k: 'lime_cost', color: '#10b981' },
                { name: 'Non-Commodity', k: 'non_comm_cost', color: '#64748b' },
              ].map(c => {
                const v = avg(rows.map(r => Number((r as any)[c.k]) || 0));
                const total = ['power_cost','steam_cost','fo_cost','non_comm_cost','lime_cost','caustic_cost'].reduce((s,k)=>s+avg(rows.map(r=>Number((r as any)[k])||0)),0);
                const share = total ? (v/total)*100 : 0;
                return (
                  <div key={c.name} className={`rounded-lg border p-2 ${dark?'border-slate-800':'border-slate-200'}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                      <span className={`text-[12px] uppercase tracking-wider ${T.sub}`}>{c.name}</span>
                    </div>
                    <div className="text-sm font-bold">${fmt(v)}</div>
                    <div className={`text-[12px] ${T.sub}`}>{share.toFixed(0)}% of other</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Panel T={T} title="Alumina Price Index · daily + 7d MA" icon={LineIcon}>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={market}>
                  <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke={T.axis} fontSize={13} />
                  <YAxis stroke={T.axis} fontSize={13} domain={['dataMin-10','dataMax+10']} />
                  <Tooltip contentStyle={T.tt as any} />
                  <Legend wrapperStyle={{ fontSize: 13 }} />
                  <Area dataKey="Index" name="Index $/MT" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.18} />
                  <Line dataKey="Index_MA" name="7d MA" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </Panel>
            <Panel T={T} title="Exchange Rate · INR/USD" icon={IndianRupee}>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={market}>
                  <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke={T.axis} fontSize={13} />
                  <YAxis stroke={T.axis} fontSize={13} domain={['dataMin-0.3','dataMax+0.3']} />
                  <Tooltip contentStyle={T.tt as any} />
                  <Legend wrapperStyle={{ fontSize: 13 }} />
                  <Area dataKey="FX" name="INR/USD" stroke="#a855f7" fill="#a855f7" fillOpacity={0.18} />
                  <Line dataKey="FX_MA" name="MTD MA" stroke="#10b981" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </Panel>
          </div>
        </section>

        {/* AI Insight Center */}
        <section className={`rounded-xl border ${T.panel} p-5`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold">AI Insight Center</div>
              <div className={`text-xs ${T.sub}`}>Production · quality · recovery · inventory · FX · index · conversion · COP drivers</div>
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

        {/* Product Category Analytics */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <SectionHeader icon={Factory} title="Product Category Analytics" sub="Hydrate vs Calcined alumina" T={T} />
            <div className={`flex text-[13px] rounded-md border p-0.5 ${dark?'border-slate-800':'border-slate-200'}`}>
              {(['Combined','Hydrate','Calcined'] as const).map(v => (
                <button key={v} onClick={()=>setProductView(v)} className={`px-2 py-1 rounded ${productView===v?'bg-cyan-600 text-white':T.sub}`}>{v}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(productView==='Combined'||productView==='Hydrate') && (
              <Panel T={T} title="Hydrate Alumina · daily + 7d MA" icon={Factory}>
                <ResponsiveContainer width="100%" height={240}>
                  <ComposedChart data={prod}>
                    <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke={T.axis} fontSize={13} />
                    <YAxis stroke={T.axis} fontSize={13} />
                    <Tooltip contentStyle={T.tt as any} />
                    <Legend wrapperStyle={{ fontSize: 13 }} />
                    <Bar dataKey="hydrate" name="Hydrate MT" fill="#06b6d4" radius={[3, 3, 0, 0]} />
                    <Line dataKey="hyd_ma" name="7d MA" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </Panel>
            )}
            {(productView==='Combined'||productView==='Calcined') && (
              <Panel T={T} title="Calcined Alumina · daily + 7d MA" icon={Layers}>
                <ResponsiveContainer width="100%" height={240}>
                  <ComposedChart data={prod}>
                    <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke={T.axis} fontSize={13} />
                    <YAxis stroke={T.axis} fontSize={13} />
                    <Tooltip contentStyle={T.tt as any} />
                    <Legend wrapperStyle={{ fontSize: 13 }} />
                    <Bar dataKey="calcined" name="Calcined MT" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                    <Line dataKey="cal_ma" name="7d MA" stroke="#10b981" strokeWidth={2} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </Panel>
            )}
          </div>
        </section>

        {/* Bauxite source + Cost contribution */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Panel T={T} title="Bauxite source mix · stacked %" icon={Droplets} className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={bauxiteMix} stackOffset="expand">
                <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke={T.axis} fontSize={13} />
                <YAxis stroke={T.axis} fontSize={13} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
                <Tooltip contentStyle={T.tt as any} formatter={(v: any) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 13 }} />
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
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </Panel>
        </section>

        {/* Cost trends */}
        <Panel T={T} title="Cost analytics · Bauxite · Conversion · Steam · Power · Total COP ($/MT)" icon={Flame}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cost}>
              <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke={T.axis} fontSize={13} />
              <YAxis yAxisId="l" stroke={T.axis} fontSize={13} />
              <YAxis yAxisId="r" orientation="right" stroke={T.axis} fontSize={13} />
              <Tooltip contentStyle={T.tt as any} />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Line yAxisId="l" dataKey="Bauxite" stroke="#0369a1" strokeWidth={2.25} dot={false} />
              <Line yAxisId="l" dataKey="Conversion" stroke="#16a34a" strokeWidth={2.25} strokeDasharray="6 3" dot={false} />
              <Line yAxisId="l" dataKey="Steam" stroke="#dc2626" strokeWidth={2.25} dot={false} />
              <Line yAxisId="l" dataKey="Power" stroke="#d97706" strokeWidth={2.25} strokeDasharray="2 3" dot={false} />
              <Line yAxisId="r" dataKey="COP" stroke="#7c1d6f" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        {/* Caustic split */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <SectionHeader icon={Beaker} title="Caustic Consumption Breakdown" sub="Chemical vs Non-Chemical" T={T} />
            <div className={`flex text-[13px] rounded-md border p-0.5 ${dark?'border-slate-800':'border-slate-200'}`}>
              {(['Combined','Chemical','Non-Chemical'] as const).map(v => (
                <button key={v} onClick={()=>setCausticView(v)} className={`px-2 py-1 rounded ${causticView===v?'bg-cyan-600 text-white':T.sub}`}>{v}</button>
              ))}
            </div>
          </div>
          <Panel T={T} title={`Caustic cost ($/MT) · ${causticView}`} icon={Beaker}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={caustic}>
                <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke={T.axis} fontSize={13} />
                <YAxis stroke={T.axis} fontSize={13} />
                <Tooltip contentStyle={T.tt as any} />
                <Legend wrapperStyle={{ fontSize: 13 }} />
                {causticView !== 'Non-Chemical' && causticView !== 'Combined' && (
                  <Bar dataKey="Chemical" fill="#06b6d4" />
                )}
                {causticView !== 'Chemical' && causticView !== 'Combined' && (
                  <Bar dataKey="Non-Chemical" fill="#f59e0b" />
                )}
                {causticView === 'Combined' && <>
                  <Bar dataKey="Chemical" stackId="c" fill="#06b6d4" />
                  <Bar dataKey="Non-Chemical" stackId="c" fill="#f59e0b" />
                </>}
              </BarChart>
            </ResponsiveContainer>
          </Panel>
        </section>

        {/* Conversion Matrix */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className={`rounded-xl border ${T.panel} p-4 lg:col-span-1`}>
            <div className="flex items-center gap-2 mb-3"><Target className="w-4 h-4 text-cyan-400" /><div className="font-semibold text-base">Bauxite Conversion Ratio</div></div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Stat label="Actual" value={convSummary.actual.toFixed(2)} T={T} />
              <Stat label="Target" value={convSummary.target.toFixed(2)} T={T} />
              <Stat label="Variance" value={`${convSummary.variance>=0?'+':''}${convSummary.variance}%`} T={T} tone={convSummary.variance<=0?'pos':'warn'} />
            </div>
            <div className={`text-xs ${T.sub}`}>Status: <span className={convSummary.variance<=0?'text-emerald-400':'text-amber-400'}>{convSummary.variance<=0?'At/Below target':'Above target'}</span></div>
            <div className={`text-xs mt-2 ${T.sub}`}>Conversion efficiency {variance && variance.conv<0?'improved':'softened'} {Math.abs(variance?.conv||0).toFixed(1)}% vs prior window.</div>
          </div>
          <Panel T={T} title="Conversion ratio trend (MT bauxite / MT alumina)" icon={Target} className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={convRatio}>
                <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke={T.axis} fontSize={13} />
                <YAxis stroke={T.axis} fontSize={13} domain={[3.0, 3.6]} />
                <Tooltip contentStyle={T.tt as any} />
                <Legend wrapperStyle={{ fontSize: 13 }} />
                <Line dataKey="Actual" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
                <ReferenceLine y={3.33} stroke="#10b981" strokeDasharray="4 4" label={{ value:'Target 3.33', fill:'#10b981', fontSize: 12 }} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>
        </section>

        {/* Inventory enhanced */}
        <section className="space-y-3">
          <SectionHeader icon={Package} title="Inventory Health" sub="Domestic (OMC + Andru) vs Imported (Raw Import)" T={T} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InvCard T={T} title="Domestic Bauxite (OMC + Andru)" stock={lastRow.domestic_stock||0} days={lastRow.dom_stock_days||0} health={domHealth} />
            <InvCard T={T} title="Imported Bauxite (Raw Import)" stock={lastRow.imported_stock||0} days={lastRow.imp_stock_days||0} health={impHealth} />
          </div>
          <Panel T={T} title="Stock & usable days trend" icon={Package}>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={inv}>
                <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke={T.axis} fontSize={13} />
                <YAxis yAxisId="l" stroke={T.axis} fontSize={13} label={{ value: 'KT', angle: -90, position: 'insideLeft', fill: T.axis, fontSize: 12 }} />
                <YAxis yAxisId="r" orientation="right" stroke={T.axis} fontSize={13} label={{ value: 'Days', angle: 90, position: 'insideRight', fill: T.axis, fontSize: 12 }} />
                <Tooltip contentStyle={T.tt as any} />
                <Legend wrapperStyle={{ fontSize: 13 }} />
                <Bar yAxisId="l" dataKey="Domestic" stackId="s" fill="#06b6d4" />
                <Bar yAxisId="l" dataKey="Imported" stackId="s" fill="#f59e0b" />
                <Line yAxisId="r" dataKey="days" name="Stock Days" stroke="#ef4444" strokeWidth={2.5} />
                <ReferenceLine yAxisId="r" y={6} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Floor 6d', fill: '#ef4444', fontSize: 12 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Panel>
        </section>

        {/* Quality & Recovery Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Panel T={T} title="Quality vs Recovery · THA · Moisture · RS · Recovery %" icon={Gauge} className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={qual}>
                <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke={T.axis} fontSize={13} />
                <YAxis yAxisId="l" stroke={T.axis} fontSize={13} />
                <YAxis yAxisId="r" orientation="right" stroke={T.axis} fontSize={13} domain={[88, 93]} />
                <Tooltip contentStyle={T.tt as any} formatter={(v: any) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 13 }} />
                <Line yAxisId="l" dataKey="THA" stroke="#1e3a8a" strokeWidth={2.25} dot={false} />
                <Line yAxisId="l" dataKey="Moisture" stroke="#d97706" strokeWidth={2.25} strokeDasharray="6 3" dot={false} />
                <Line yAxisId="l" dataKey="RS" stroke="#dc2626" strokeWidth={2.25} strokeDasharray="2 3" dot={false} />
                <Line yAxisId="r" dataKey="Recovery" stroke="#15803d" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>
          <div className={`rounded-xl border ${T.panel} p-4`}>
            <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-4 h-4 text-cyan-400" /><div className="font-semibold text-base">Quality Logic</div></div>
            <ul className={`text-xs space-y-2 ${T.sub}`}>
              <li><span className="text-emerald-400 font-semibold">↑ THA</span> → ↑ Recovery</li>
              <li><span className="text-rose-400 font-semibold">↑ Moisture</span> → ↓ Recovery</li>
              <li><span className="text-rose-400 font-semibold">↑ RS</span> → ↓ Recovery</li>
            </ul>
            <div className={`mt-3 pt-3 border-t ${dark?'border-slate-800':'border-slate-200'} text-xs`}>
              <div className={`uppercase tracking-wider text-[12px] ${T.sub}`}>Composite Quality Score</div>
              <div className="text-2xl font-bold mt-1">{qualityScore}<span className={`text-sm ${T.sub}`}>/100</span></div>
              <div className={`text-[13px] mt-1 ${T.sub}`}>THA {pct(avg(rows.map(r=>r.tha)),2)} · Moisture {pct(avg(rows.map(r=>r.moisture)),2)} · RS {pct(avg(rows.map(r=>(r as any).rs)),2)}</div>
            </div>
          </div>
        </section>

        {/* Recovery Driver Analysis */}
        <section className="space-y-3">
          <SectionHeader icon={GitBranch} title="Recovery Driver Analysis" sub="Bauxite Quality → Recovery → Conversion Cost → COP" T={T} />

          {/* Flow */}
          <div className={`rounded-xl border ${T.panel} p-5`}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
              <div className="space-y-2">
                <FlowChip label="THA" sign="+" color="emerald" />
                <FlowChip label="Moisture" sign="−" color="rose" />
                <FlowChip label="RS" sign="−" color="rose" />
              </div>
              <div className="text-center text-2xl text-cyan-400 hidden md:block">→</div>
              <div className={`rounded-lg border ${dark?'border-slate-700':'border-slate-200'} p-3 text-center`}>
                <div className={`text-[12px] uppercase ${T.sub}`}>Recovery</div>
                <div className="text-2xl font-bold text-emerald-400">{pct(k.rec.avg,2)}</div>
                <div className={`text-[12px] ${T.sub}`}>target ≥ 91%</div>
              </div>
              <div className="text-center text-2xl text-cyan-400 hidden md:block">→</div>
              <div className={`rounded-lg border ${dark?'border-slate-700':'border-slate-200'} p-3 text-center`}>
                <div className={`text-[12px] uppercase ${T.sub}`}>Total COP</div>
                <div className="text-2xl font-bold">${fmt(k.cop.avg)}</div>
                <div className={`text-[12px] ${T.sub}`}>via conversion cost</div>
              </div>
            </div>
          </div>

          {/* Scorecard + Contribution + Correlations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Panel T={T} title="Recovery Driver Scorecard" icon={ShieldCheck}>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Stat T={T} label="Current THA" value={pct(avg(rows.map(r=>r.tha)),2)} />
                <Stat T={T} label="Current Moisture" value={pct(avg(rows.map(r=>r.moisture)),2)} />
                <Stat T={T} label="Current RS" value={pct(avg(rows.map(r=>(r as any).rs)),2)} />
                <Stat T={T} label="Current Recovery" value={pct(k.rec.avg,2)} />
                <Stat T={T} label="Target Recovery" value="91.00%" />
                <Stat T={T} label="Recovery Variance" value={`${(k.rec.avg*100-91).toFixed(2)} pp`} tone={k.rec.avg*100>=91?'pos':'warn'} />
              </div>
              <div className={`mt-3 pt-3 border-t ${dark?'border-slate-800':'border-slate-200'} text-xs`}>
                <div className="flex justify-between"><span className={T.sub}>Driver Score</span><span className="font-bold">{driverScore.score}/100</span></div>
                <div className="flex justify-between"><span className={T.sub}>Previous</span><span>{driverScore.prev}/100</span></div>
                <div className="flex justify-between"><span className={T.sub}>Status</span><span className={driverScore.score>=80?'text-emerald-400':driverScore.score>=65?'text-cyan-400':driverScore.score>=50?'text-amber-400':'text-rose-400'}>{driverScore.status}</span></div>
              </div>
            </Panel>
            <Panel T={T} title="Driver contribution to recovery delta" icon={BarChart3}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={drivers.parts} layout="vertical">
                  <CartesianGrid stroke={T.grid} strokeDasharray="3 3" />
                  <XAxis type="number" stroke={T.axis} fontSize={13} tickFormatter={(v)=>`${v}%`} />
                  <YAxis type="category" dataKey="name" stroke={T.axis} fontSize={13} width={70} />
                  <Tooltip contentStyle={T.tt as any} formatter={(v:any)=>`${v}%`} />
                  <Bar dataKey="share" radius={[0,4,4,0]}>
                    {drivers.parts.map((p:any,i:number)=><Cell key={i} fill={p.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className={`text-[13px] ${T.sub} mt-1`}>Recovery moved {drivers.recDelta>=0?'+':''}{drivers.recDelta.toFixed(2)} pp over period.</div>
            </Panel>
            <Panel T={T} title="Correlation analytics" icon={Activity}>
              <div className="space-y-2 text-xs">
                <CorrRow T={T} label="THA vs Recovery" c={drivers.cTHA} />
                <CorrRow T={T} label="Moisture vs Recovery" c={drivers.cMoi} />
                <CorrRow T={T} label="RS vs Recovery" c={drivers.cRS} />
                <CorrRow T={T} label="Recovery vs COP" c={drivers.cRecCop} />
              </div>
              <div className={`mt-3 pt-3 border-t ${dark?'border-slate-800':'border-slate-200'} text-[13px] ${T.sub}`}>
                Higher recovery → lower bauxite consumption → lower conversion cost → lower COP.
              </div>
            </Panel>
          </div>
        </section>

        {/* Specific consumption table */}
        <Panel T={T} title="Specific consumption · daily detail" icon={Zap}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className={dark ? 'text-slate-400' : 'text-slate-500'}>
                <tr className={`border-b ${dark ? 'border-slate-800' : 'border-slate-200'}`}>
                  {['Date', 'Bauxite SC', 'Caustic SC', 'Lime SC', 'Steam SC', 'Power SC', 'FO SC', 'COP $/MT', 'Recovery %'].map(h =>
                    <th key={h} className="text-left py-2 px-2 font-medium uppercase tracking-wider text-[12px]">{h}</th>)}
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
                    <td className="py-1.5 px-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[13px] font-semibold ${r.recovery < 0.91 ? 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30' : 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30'}`}>{(r.recovery * 100).toFixed(2)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <footer className={`text-center text-[13px] ${T.sub} py-4`}>
          Alumina COP Intelligence · {rows.length} days · {from} → {to} · mode {compare}
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
          <span className={`inline-flex items-center gap-0.5 text-[13px] font-semibold px-1.5 py-0.5 rounded ${good ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
            {delta > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>
      <div className={`text-[13px] uppercase tracking-wider ${T.sub}`}>{label}</div>
      <div className="text-2xl md:text-3xl font-bold mt-0.5">{value}</div>
      {hint && <div className={`text-[12px] ${T.sub} mt-0.5`}>{hint}</div>}
    </div>
  );
}

function Panel({ T, title, icon: Icon, children, className = '' }: any) {
  return (
    <div className={`rounded-xl border ${T.panel} p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
        <div className="font-semibold text-base">{title}</div>
      </div>
      {children}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, sub, T }: any) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-cyan-400" />
      <div>
        <div className="font-semibold text-base">{title}</div>
        {sub && <div className={`text-[13px] ${T.sub}`}>{sub}</div>}
      </div>
    </div>
  );
}

function Stat({ T, label, value, tone }: any) {
  const c = tone==='pos'?'text-emerald-400':tone==='warn'?'text-amber-400':'';
  return (
    <div className={`rounded-md border ${T?.panel||''} p-2`}>
      <div className={`text-[12px] uppercase ${T?.sub||''}`}>{label}</div>
      <div className={`text-sm font-bold ${c}`}>{value}</div>
    </div>
  );
}

function InvCard({ T, title, stock, days, health }: any) {
  const colorMap: any = {
    emerald: 'border-emerald-500/40 bg-emerald-500/5 text-emerald-400',
    amber: 'border-amber-500/40 bg-amber-500/5 text-amber-400',
    rose: 'border-rose-500/40 bg-rose-500/5 text-rose-400',
  };
  return (
    <div className={`rounded-xl border ${T.panel} p-4`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold">{title}</div>
        <span className={`text-[13px] px-2 py-0.5 rounded border ${colorMap[health.color]}`}>{health.label}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className={`text-[12px] uppercase ${T.sub}`}>Current Stock</div>
          <div className="text-xl font-bold">{fmt(stock)} KT</div>
        </div>
        <div>
          <div className={`text-[12px] uppercase ${T.sub}`}>Stock Days Remaining</div>
          <div className="text-xl font-bold">{days} d</div>
        </div>
      </div>
    </div>
  );
}

function FlowChip({ label, sign, color }: any) {
  const c = color==='emerald'?'text-emerald-400 border-emerald-500/40 bg-emerald-500/5':'text-rose-400 border-rose-500/40 bg-rose-500/5';
  return (
    <div className={`flex items-center justify-between rounded-md border px-3 py-1.5 ${c}`}>
      <span className="text-sm font-semibold">{label}</span>
      <span className="text-lg font-bold">{sign}</span>
    </div>
  );
}

function CorrRow({ T, label, c }: any) {
  const tone = c>0.4?'text-emerald-400':c<-0.4?'text-rose-400':T.sub;
  return (
    <div className="flex items-center justify-between">
      <span className={T.sub}>{label}</span>
      <span className={`font-semibold ${tone}`}>{c.toFixed(2)} · {corrLabel(c)}</span>
    </div>
  );
}
