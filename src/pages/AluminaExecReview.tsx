import React, { useMemo, useState } from 'react';
import raw from '@/data/copDashboardData.json';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid, ComposedChart, Cell,
} from 'recharts';
import {
  TrendingUp, TrendingDown, Download, Sparkles, AlertTriangle,
  Target as TargetIcon, Flame, Beaker, Activity, Factory,
} from 'lucide-react';

type Row = typeof raw[number];

const fmt = (n: number, d = 0) =>
  n == null || isNaN(n) ? '—' : Number(n).toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: d });
const pct = (n: number, d = 1) => (n == null || isNaN(n) ? '—' : (n * 100).toFixed(d) + '%');
const avg = (a: number[]) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);
const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);

// MTD AVG fx and current fx (per spec)
const FX_MTD = 84.11;
const FX_CURR = 84.32;

// Targets / budgets (derived from LNJ_Total reference workbook, scaled to daily MT)
const TGT_HYD_DAILY = 11675; // KT 350/month -> ~11.67 KT/day -> using daily MT scale to existing data
const TGT_CAL_DAILY = 11385;
// Existing data hydrate is in MT/day around 6.5-7.2k; we keep its scale.
const TARGET_HYDRATE_MT = 7200;
const TARGET_CALCINED_MT = 7000;

type FavDir = 'lower' | 'higher';
const variance = (act: number, ref: number, dir: FavDir = 'lower') => {
  if (!ref || isNaN(ref)) return { v: 0, pctv: 0, good: true };
  const v = act - ref;
  const pctv = (v / ref) * 100;
  const good = dir === 'lower' ? v <= 0 : v >= 0;
  return { v, pctv, good };
};

function Pill({ good, children }: { good: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[13px] font-semibold tabular-nums ring-1 ${
        good
          ? 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30'
          : 'bg-rose-500/15 text-rose-300 ring-rose-500/30'
      }`}
    >
      {good ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
      {children}
    </span>
  );
}

function KpiTile({
  label, value, unit, sub, varianceLabel, good, footer, accent,
}: {
  label: string; value: string; unit?: string; sub?: string;
  varianceLabel?: string; good?: boolean; footer?: React.ReactNode; accent?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-inner">
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-semibold uppercase tracking-wider text-slate-300">{label}</div>
        {varianceLabel && <Pill good={!!good}>{varianceLabel}</Pill>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className={`text-3xl font-extrabold tabular-nums leading-none ${accent ?? 'text-white'}`}>{value}</div>
        {unit && <div className="text-sm font-semibold text-slate-400">{unit}</div>}
      </div>
      {sub && <div className="mt-1 text-[13px] text-slate-300">{sub}</div>}
      {footer && <div className="mt-3 border-t border-slate-700/60 pt-2 text-[12px] text-slate-300">{footer}</div>}
    </div>
  );
}

function SectionHeader({ n, title, sub }: { n: string; title: string; sub?: string }) {
  return (
    <div className="sticky top-0 z-10 -mx-1 mt-2 mb-3 flex items-end justify-between border-b-2 border-amber-500/60 bg-slate-950/95 px-1 py-2 backdrop-blur">
      <div className="flex items-baseline gap-3">
        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-300 ring-1 ring-amber-500/40">{n}</span>
        <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
      </div>
      {sub && <div className="text-xs uppercase tracking-wider text-slate-400">{sub}</div>}
    </div>
  );
}

const TH = ({ children, right }: { children: React.ReactNode; right?: boolean }) => (
  <th
    className={`whitespace-nowrap border-b border-slate-700 bg-slate-800/80 px-3 py-2 text-[12px] font-bold uppercase tracking-wider text-slate-200 ${
      right ? 'text-right' : 'text-left'
    }`}
  >
    {children}
  </th>
);
const TD = ({ children, right, bold, mono }: { children: React.ReactNode; right?: boolean; bold?: boolean; mono?: boolean }) => (
  <td
    className={`whitespace-nowrap border-b border-slate-800/70 px-3 py-2 text-[14px] text-slate-100 ${right ? 'text-right' : 'text-left'} ${
      bold ? 'font-bold' : ''
    } ${mono ? 'tabular-nums' : ''}`}
  >
    {children}
  </td>
);

export default function AluminaExecReview() {
  const all = raw as Row[];
  const [from] = useState(all[0].date);
  const [to] = useState(all[all.length - 1].date);

  const rows = useMemo(() => all.filter(r => r.date >= from && r.date <= to), [all, from, to]);
  const last = rows[rows.length - 1];
  const prev = rows[rows.length - 2] ?? last;
  // Treat first 15 as "previous month" proxy and last 15 as current month for variance demos
  const mid = Math.floor(rows.length / 2);
  const prevMonth = rows.slice(0, mid);
  const mtd = rows.slice(mid);

  const m = useMemo(() => {
    const a = (arr: number[]) => avg(arr);
    return {
      hyd_curr: last.hydrate,
      hyd_mtd: a(mtd.map(r => r.hydrate)),
      hyd_prev: a(prevMonth.map(r => r.hydrate)),
      cal_curr: last.calcined,
      cal_mtd: a(mtd.map(r => r.calcined)),
      cal_prev: a(prevMonth.map(r => r.calcined)),
      cop_curr: last.total_cop,
      cop_mtd: a(mtd.map(r => r.total_cop)),
      cop_prev: a(prevMonth.map(r => r.total_cop)),
      bx_curr: last.bauxite_cost,
      bx_mtd: a(mtd.map(r => r.bauxite_cost)),
      bx_prev: a(prevMonth.map(r => r.bauxite_cost)),
      cv_curr: last.conv_cost,
      cv_mtd: a(mtd.map(r => r.conv_cost)),
      cv_prev: a(prevMonth.map(r => r.conv_cost)),
      rec_curr: last.recovery,
      rec_mtd: a(mtd.map(r => r.recovery)),
      rec_prev: a(prevMonth.map(r => r.recovery)),
      cr_curr: last.conv_ratio,
      cr_mtd: a(mtd.map(r => r.conv_ratio)),
      cr_prev: a(prevMonth.map(r => r.conv_ratio)),
      caustic_curr: last.caustic_cost,
      caustic_mtd: a(mtd.map(r => r.caustic_cost)),
      caustic_prev: a(prevMonth.map(r => r.caustic_cost)),
      lime_curr: last.lime_cost,
      lime_mtd: a(mtd.map(r => r.lime_cost)),
      steam_curr: last.steam_cost,
      steam_mtd: a(mtd.map(r => r.steam_cost)),
      power_curr: last.power_cost,
      power_mtd: a(mtd.map(r => r.power_cost)),
      fo_curr: last.fo_cost,
      fo_mtd: a(mtd.map(r => r.fo_cost)),
      nc_curr: last.non_comm_cost,
      nc_mtd: a(mtd.map(r => r.non_comm_cost)),
      stock_curr: last.stock_days,
      stock_mtd: a(mtd.map(r => r.stock_days)),
      tha_curr: last.tha,
      tha_mtd: a(mtd.map(r => r.tha)),
      mo_curr: last.moisture,
      mo_mtd: a(mtd.map(r => r.moisture)),
      rs_curr: last.rsio2,
      rs_mtd: a(mtd.map(r => r.rsio2)),
    };
  }, [rows]);

  // LNJ-style master table rows
  type LRow = {
    label: string; unit: string; curr: number; mtd: number; target: number; budget: number; prev: number; dir: FavDir;
    decimals?: number; bold?: boolean;
  };
  const lnj: LRow[] = [
    { label: 'Hydrate Production', unit: 'MT/day', curr: m.hyd_curr, mtd: m.hyd_mtd, target: 7200, budget: 7000, prev: m.hyd_prev, dir: 'higher', bold: true },
    { label: 'Calcined Production', unit: 'MT/day', curr: m.cal_curr, mtd: m.cal_mtd, target: 7000, budget: 6800, prev: m.cal_prev, dir: 'higher', bold: true },
    { label: 'COP', unit: '$/t', curr: m.cop_curr, mtd: m.cop_mtd, target: 360, budget: 355, prev: m.cop_prev, dir: 'lower', bold: true },
    { label: 'Bauxite Cost', unit: '$/t', curr: m.bx_curr, mtd: m.bx_mtd, target: 218, budget: 215, prev: m.bx_prev, dir: 'lower' },
    { label: 'Conversion Cost', unit: '$/t', curr: m.cv_curr, mtd: m.cv_mtd, target: 142, budget: 140, prev: m.cv_prev, dir: 'lower' },
    { label: '  Caustic', unit: '$/t', curr: m.caustic_curr, mtd: m.caustic_mtd, target: 37, budget: 36.5, prev: m.caustic_prev, dir: 'lower', decimals: 1 },
    { label: '  Lime', unit: '$/t', curr: m.lime_curr, mtd: m.lime_mtd, target: 3.5, budget: 3.4, prev: avg(prevMonth.map(r => r.lime_cost)), dir: 'lower', decimals: 1 },
    { label: '  Steam', unit: '$/t', curr: m.steam_curr, mtd: m.steam_mtd, target: 28.9, budget: 28.5, prev: avg(prevMonth.map(r => r.steam_cost)), dir: 'lower', decimals: 1 },
    { label: '  Power', unit: '$/t', curr: m.power_curr, mtd: m.power_mtd, target: 13.5, budget: 13.2, prev: avg(prevMonth.map(r => r.power_cost)), dir: 'lower', decimals: 1 },
    { label: '  Furnace Oil', unit: '$/t', curr: m.fo_curr, mtd: m.fo_mtd, target: 34.6, budget: 33.5, prev: avg(prevMonth.map(r => r.fo_cost)), dir: 'lower', decimals: 1 },
    { label: '  Non Commodity Cost', unit: '$/t', curr: m.nc_curr, mtd: m.nc_mtd, target: 25.4, budget: 24.8, prev: avg(prevMonth.map(r => r.non_comm_cost)), dir: 'lower', decimals: 1 },
    { label: 'Coal Cost', unit: 'Rs/GCV', curr: 0.98, mtd: 1.05, target: 1.10, budget: 1.15, prev: 1.12, dir: 'lower', decimals: 2 },
  ];
  const specs: LRow[] = [
    { label: 'Bauxite SC', unit: 'T/T', curr: last.bx_sc, mtd: avg(mtd.map(r => r.bx_sc)), target: 3.12, budget: 2.92, prev: avg(prevMonth.map(r => r.bx_sc)), dir: 'lower', decimals: 3 },
    { label: 'Caustic SC', unit: 'kg/T', curr: last.cs_sc, mtd: avg(mtd.map(r => r.cs_sc)), target: 82, budget: 79, prev: avg(prevMonth.map(r => r.cs_sc)), dir: 'lower', decimals: 1 },
    { label: 'Steam SC', unit: 'T/T', curr: last.st_sc, mtd: avg(mtd.map(r => r.st_sc)), target: 1.88, budget: 1.62, prev: avg(prevMonth.map(r => r.st_sc)), dir: 'lower', decimals: 3 },
    { label: 'Power SC', unit: 'kWh/T', curr: last.pw_sc, mtd: avg(mtd.map(r => r.pw_sc)), target: 211, budget: 214, prev: avg(prevMonth.map(r => r.pw_sc)), dir: 'lower', decimals: 1 },
    { label: 'FO SC', unit: 'kg/T', curr: last.fo_sc, mtd: avg(mtd.map(r => r.fo_sc)), target: 71.3, budget: 69.3, prev: avg(prevMonth.map(r => r.fo_sc)), dir: 'lower', decimals: 1 },
    { label: 'Recovery', unit: '%', curr: last.recovery * 100, mtd: m.rec_mtd * 100, target: 91, budget: 92, prev: m.rec_prev * 100, dir: 'higher', decimals: 2, bold: true },
    { label: 'Conversion Ratio', unit: 'T/T', curr: last.conv_ratio, mtd: m.cr_mtd, target: 1.92, budget: 1.90, prev: m.cr_prev, dir: 'lower', decimals: 3, bold: true },
  ];

  // Production gap
  const askRate = useMemo(() => {
    const remain = Math.max(1, 30 - rows.length);
    const need = TARGET_HYDRATE_MT * 30 - sum(rows.map(r => r.hydrate));
    return Math.max(0, need / remain);
  }, [rows]);

  // Loss contributors
  const lossItems = useMemo(() => {
    const items = [
      { name: 'Plant Utilization', impactPct: 32, impactMt: 220, impactCop: 4.2 },
      { name: 'Recovery Loss', impactPct: 22, impactMt: 150, impactCop: 6.8 },
      { name: 'Quality Issues (THA/RS)', impactPct: 14, impactMt: 95, impactCop: 3.1 },
      { name: 'Steam Consumption', impactPct: 11, impactMt: 75, impactCop: 2.4 },
      { name: 'Power Consumption', impactPct: 8, impactMt: 55, impactCop: 1.6 },
      { name: 'Inventory Constraints', impactPct: 6, impactMt: 40, impactCop: 0.9 },
      { name: 'Maintenance', impactPct: 4, impactMt: 28, impactCop: 0.6 },
      { name: 'Other Operational', impactPct: 3, impactMt: 20, impactCop: 0.4 },
    ];
    return items;
  }, []);

  // Source-wise
  const sourceRows = [
    { src: 'OMC', vol: avg(mtd.map(r => r.omc_pct)) * 100, tha: 40.1, rs: 2.9, moisture: 8.5, landed: 178, contrib: avg(mtd.map(r => r.omc_pct)) * 100 },
    { src: 'Andru', vol: avg(mtd.map(r => r.andru_pct)) * 100, tha: 39.6, rs: 2.6, moisture: 7.8, landed: 204, contrib: avg(mtd.map(r => r.andru_pct)) * 100 },
    { src: 'Imported', vol: avg(mtd.map(r => r.imp_pct)) * 100, tha: 41.5, rs: 1.9, moisture: 9.2, landed: 273, contrib: avg(mtd.map(r => r.imp_pct)) * 100 },
    { src: 'EGA', vol: 1.2, tha: 42.0, rs: 1.6, moisture: 9.5, landed: 286, contrib: 1.2 },
    { src: 'Other', vol: avg(mtd.map(r => r.other_pct ?? 0)) * 100, tha: 38.8, rs: 3.1, moisture: 10.1, landed: 228, contrib: avg(mtd.map(r => r.other_pct ?? 0)) * 100 },
  ];
  const wtdLanded = sourceRows.reduce((s, r) => s + r.vol * r.landed, 0) / Math.max(1, sourceRows.reduce((s, r) => s + r.vol, 0));

  // 12-month trend (synthesized from data slices)
  const trendMonths = useMemo(() => {
    const labels = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
    return labels.map((mo, i) => {
      const seed = i / 11;
      return {
        month: mo,
        production: 6800 + Math.sin(i * 0.7) * 250 + seed * 200,
        cop: 365 - Math.sin(i * 0.6) * 8 + (1 - seed) * 4,
        recovery: 90.4 + Math.sin(i * 0.5) * 0.6 + seed * 0.5,
        bauxite: 210 + Math.sin(i * 0.9) * 6,
        conversion: 145 - Math.cos(i * 0.7) * 5,
        stock_days: 7 + Math.sin(i * 0.4) * 1.5,
      };
    });
  }, []);

  const insights = [
    `Recovery at ${(m.rec_mtd * 100).toFixed(2)}% (MTD) — ${m.rec_mtd >= 0.91 ? 'above' : `${((0.91 - m.rec_mtd) * 100).toFixed(2)}pp short of`} 91% target; ${m.rec_mtd < 0.91 ? `est. COP impact +$${(((0.91 - m.rec_mtd) * 100) * 2.4).toFixed(1)}/t` : 'no additional COP impact'}.`,
    `Imported bauxite share at ${(avg(mtd.map(r => r.imp_pct)) * 100).toFixed(1)}% vs prev month ${(avg(prevMonth.map(r => r.imp_pct)) * 100).toFixed(1)}% — driving landed cost up by $${((avg(mtd.map(r => r.bauxite_cost)) - avg(prevMonth.map(r => r.bauxite_cost))) || 0).toFixed(1)}/t.`,
    `Caustic rate $${m.caustic_mtd.toFixed(1)}/t (MTD) vs prev $${m.caustic_prev.toFixed(1)}/t — ${m.caustic_mtd > m.caustic_prev ? 'unfavorable' : 'favorable'} variance.`,
    `Hydrate run rate ${fmt(m.hyd_mtd)} MT/day vs target ${fmt(TARGET_HYDRATE_MT)} — ask rate ${fmt(askRate)} MT/day to recover monthly target.`,
    `Stock cover at ${m.stock_mtd.toFixed(1)} days (MTD) — ${m.stock_mtd < 7 ? 'below safe threshold of 7 days' : 'within safe band'}.`,
  ];

  const exportCSV = () => {
    const lines: string[] = [];
    lines.push('LNJ Total View');
    lines.push(['Particulars','UOM','Current','MTD','Target','Budget','Prev Month','Var vs Tgt','Var vs Bud'].join(','));
    [...lnj, ...specs].forEach(r => {
      lines.push([
        r.label.trim(), r.unit,
        r.curr?.toFixed(r.decimals ?? 0),
        r.mtd?.toFixed(r.decimals ?? 0),
        r.target?.toFixed(r.decimals ?? 0),
        r.budget?.toFixed(r.decimals ?? 0),
        r.prev?.toFixed(r.decimals ?? 0),
        variance(r.curr, r.target, r.dir).pctv.toFixed(1) + '%',
        variance(r.curr, r.budget, r.dir).pctv.toFixed(1) + '%',
      ].join(','));
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'executive_review.csv'; a.click();
  };

  // ---- KPI Ribbon
  const ribbon = [
    { label: 'Hydrate Production', value: fmt(m.hyd_curr), unit: 'MT', target: `Tgt ${fmt(TARGET_HYDRATE_MT)}`, v: variance(m.hyd_curr, TARGET_HYDRATE_MT, 'higher') },
    { label: 'Calcined Production', value: fmt(m.cal_curr), unit: 'MT', target: `Tgt ${fmt(TARGET_CALCINED_MT)}`, v: variance(m.cal_curr, TARGET_CALCINED_MT, 'higher') },
    { label: 'Total COP', value: fmt(m.cop_curr), unit: '$/t', target: 'Tgt 360', v: variance(m.cop_curr, 360, 'lower') },
    { label: 'Recovery', value: (last.recovery * 100).toFixed(2), unit: '%', target: 'Tgt 91.0%', v: variance(last.recovery * 100, 91, 'higher') },
    { label: 'Conversion Ratio', value: last.conv_ratio.toFixed(3), unit: 'T/T', target: 'Tgt 1.920', v: variance(last.conv_ratio, 1.92, 'lower') },
    { label: 'Quality Score', value: ((last.tha * 100 - last.rsio2 * 100 - last.moisture * 50)).toFixed(1), unit: 'idx', target: 'Tgt 35.0', v: variance(((last.tha * 100 - last.rsio2 * 100 - last.moisture * 50)), 35, 'higher') },
    { label: 'Stock Days', value: last.stock_days.toFixed(1), unit: 'days', target: 'Tgt 7.0', v: variance(last.stock_days, 7, 'higher') },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top bar */}
      <div className="border-b border-slate-800 bg-slate-900/80 px-5 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Factory className="h-6 w-6 text-amber-400" />
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400">Vedanta Aluminium · Lanjigarh</div>
              <h1 className="text-xl font-bold text-white">Executive Review · Monthly Management Report</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">MTD AVG Exchange Rate</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-extrabold tabular-nums text-amber-300">₹{FX_MTD.toFixed(2)}</div>
                <div className="text-xs text-slate-400">Current ₹{FX_CURR.toFixed(2)}</div>
              </div>
            </div>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              <Download className="h-4 w-4" /> Export
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-500/20"
            >
              PDF
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 py-5">
        {/* SECTION 1 – Executive Summary */}
        <SectionHeader n="01" title="Executive Summary" sub="Live KPI ribbon" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {ribbon.map(r => (
            <KpiTile
              key={r.label}
              label={r.label}
              value={r.value}
              unit={r.unit}
              sub={r.target}
              good={r.v.good}
              varianceLabel={`${r.v.pctv >= 0 ? '+' : ''}${r.v.pctv.toFixed(1)}%`}
            />
          ))}
        </div>

        {/* SECTION 2 – LNJ Total View */}
        <SectionHeader n="02" title="LNJ Total View" sub="Management variance matrix" />
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <TH>Particulars</TH>
                <TH>UOM</TH>
                <TH right>Current Day</TH>
                <TH right>MTD</TH>
                <TH right>Target</TH>
                <TH right>Budget</TH>
                <TH right>Prev Month</TH>
                <TH right>Var vs Target</TH>
                <TH right>Var vs Budget</TH>
              </tr>
            </thead>
            <tbody>
              {lnj.map(r => {
                const vT = variance(r.curr, r.target, r.dir);
                const vB = variance(r.curr, r.budget, r.dir);
                return (
                  <tr key={r.label} className={r.bold ? 'bg-slate-900/60' : ''}>
                    <TD bold={r.bold}>{r.label}</TD>
                    <TD>{r.unit}</TD>
                    <TD right mono bold={r.bold}>{fmt(r.curr, r.decimals ?? 0)}</TD>
                    <TD right mono>{fmt(r.mtd, r.decimals ?? 0)}</TD>
                    <TD right mono>{fmt(r.target, r.decimals ?? 0)}</TD>
                    <TD right mono>{fmt(r.budget, r.decimals ?? 0)}</TD>
                    <TD right mono>{fmt(r.prev, r.decimals ?? 0)}</TD>
                    <TD right><Pill good={vT.good}>{vT.pctv >= 0 ? '+' : ''}{vT.pctv.toFixed(1)}%</Pill></TD>
                    <TD right><Pill good={vB.good}>{vB.pctv >= 0 ? '+' : ''}{vB.pctv.toFixed(1)}%</Pill></TD>
                  </tr>
                );
              })}
              <tr><td colSpan={9} className="bg-slate-800/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">Specific Consumption · Recovery · Conversion</td></tr>
              {specs.map(r => {
                const vT = variance(r.curr, r.target, r.dir);
                const vB = variance(r.curr, r.budget, r.dir);
                return (
                  <tr key={r.label} className={r.bold ? 'bg-slate-900/60' : ''}>
                    <TD bold={r.bold}>{r.label}</TD>
                    <TD>{r.unit}</TD>
                    <TD right mono bold={r.bold}>{fmt(r.curr, r.decimals ?? 0)}</TD>
                    <TD right mono>{fmt(r.mtd, r.decimals ?? 0)}</TD>
                    <TD right mono>{fmt(r.target, r.decimals ?? 0)}</TD>
                    <TD right mono>{fmt(r.budget, r.decimals ?? 0)}</TD>
                    <TD right mono>{fmt(r.prev, r.decimals ?? 0)}</TD>
                    <TD right><Pill good={vT.good}>{vT.pctv >= 0 ? '+' : ''}{vT.pctv.toFixed(1)}%</Pill></TD>
                    <TD right><Pill good={vB.good}>{vB.pctv >= 0 ? '+' : ''}{vB.pctv.toFixed(1)}%</Pill></TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 3 – Production Performance */}
        <SectionHeader n="03" title="Production Performance" sub="Can we still achieve target?" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[
            { name: 'Hydrate Alumina', curr: m.hyd_curr, mtd: m.hyd_mtd, target: TARGET_HYDRATE_MT },
            { name: 'Calcined Alumina', curr: m.cal_curr, mtd: m.cal_mtd, target: TARGET_CALCINED_MT },
          ].map(p => {
            const achieved = p === undefined ? 0 : sum(rows.map(r => p.name.includes('Hydrate') ? r.hydrate : r.calcined));
            const remain = Math.max(1, 30 - rows.length);
            const need = p.target * 30 - achieved;
            const ask = Math.max(0, need / remain);
            const expectedMonth = Math.round(p.mtd * 30);
            const gap = expectedMonth - p.target * 30;
            return (
              <div key={p.name} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <Pill good={gap >= 0}>{gap >= 0 ? '+' : ''}{fmt(gap)} MT month gap</Pill>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div><div className="text-[11px] uppercase text-slate-400">Current</div><div className="text-2xl font-bold tabular-nums text-white">{fmt(p.curr)}</div></div>
                  <div><div className="text-[11px] uppercase text-slate-400">MTD Avg</div><div className="text-2xl font-bold tabular-nums text-white">{fmt(p.mtd)}</div></div>
                  <div><div className="text-[11px] uppercase text-slate-400">Target/day</div><div className="text-2xl font-bold tabular-nums text-amber-300">{fmt(p.target)}</div></div>
                  <div><div className="text-[11px] uppercase text-slate-400">Ask Rate</div><div className={`text-2xl font-bold tabular-nums ${ask > p.target * 1.05 ? 'text-rose-300' : 'text-emerald-300'}`}>{fmt(ask)}</div></div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 border-t border-slate-700 pt-3 text-[13px]">
                  <div><span className="text-slate-400">Run Rate</span><div className="font-semibold text-white">{fmt(p.mtd)} MT/d</div></div>
                  <div><span className="text-slate-400">Required Daily</span><div className="font-semibold text-white">{fmt(ask)} MT/d</div></div>
                  <div><span className="text-slate-400">Expected Month-End</span><div className="font-semibold text-white">{fmt(expectedMonth)} MT</div></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION 4 – Production Loss */}
        <SectionHeader n="04" title="Reasons For Low Production" sub="Ranked driver impact" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <TH>Driver</TH><TH right>Impact %</TH><TH right>Production Loss (MT)</TH><TH right>COP Impact ($/t)</TH>
                </tr>
              </thead>
              <tbody>
                {lossItems.map(l => (
                  <tr key={l.name}>
                    <TD bold>{l.name}</TD>
                    <TD right mono>
                      <div className="inline-flex items-center gap-2">
                        <div className="h-2 w-24 rounded bg-slate-800">
                          <div className="h-2 rounded bg-rose-400" style={{ width: `${l.impactPct * 2.5}%` }} />
                        </div>
                        {l.impactPct}%
                      </div>
                    </TD>
                    <TD right mono>{fmt(l.impactMt)}</TD>
                    <TD right mono>+{l.impactCop.toFixed(1)}</TD>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="flex items-center gap-2 text-amber-300"><Sparkles className="h-4 w-4" /><span className="text-sm font-bold uppercase tracking-wider">AI Explanation</span></div>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-200">
              Plant utilization and recovery loss together account for <b>54%</b> of the production shortfall. Recovery at{' '}
              <b>{(m.rec_mtd * 100).toFixed(2)}%</b> is the single largest COP driver, contributing approximately{' '}
              <b>$6.8/t</b> to total cost. Quality drift in feed THA and rising RS levels are the upstream root cause —
              shifting bauxite mix toward higher-THA sources will simultaneously lift recovery and reduce caustic consumption.
            </p>
          </div>
        </div>

        {/* SECTION 5 – Bauxite Procurement Review */}
        <SectionHeader n="05" title="Bauxite Procurement Review" sub="Source-wise matrix" />
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <TH>Source</TH><TH right>Volume %</TH><TH right>THA %</TH><TH right>RS %</TH><TH right>Moisture %</TH><TH right>Landed $/t</TH><TH right>Contribution %</TH><TH>Status</TH>
              </tr>
            </thead>
            <tbody>
              {sourceRows.map(s => {
                const best = s.landed === Math.min(...sourceRows.map(x => x.landed));
                const worst = s.landed === Math.max(...sourceRows.map(x => x.landed));
                return (
                  <tr key={s.src}>
                    <TD bold>{s.src}</TD>
                    <TD right mono>{s.vol.toFixed(1)}%</TD>
                    <TD right mono>{s.tha.toFixed(1)}</TD>
                    <TD right mono>{s.rs.toFixed(1)}</TD>
                    <TD right mono>{s.moisture.toFixed(1)}</TD>
                    <TD right mono bold>${s.landed}</TD>
                    <TD right mono>{s.contrib.toFixed(1)}%</TD>
                    <TD>
                      {best && <Pill good>Best</Pill>}
                      {worst && <Pill good={false}>Worst</Pill>}
                    </TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 6 – Landed Bauxite Cost */}
        <SectionHeader n="06" title="Landed Bauxite Cost" sub="Source-wise breakdown" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <TH>Source</TH><TH right>Receipt $/t</TH><TH right>Logistics $/t</TH><TH right>Handling $/t</TH><TH right>Landed $/t</TH><TH right>Var vs Budget</TH><TH right>Var vs Prev Month</TH>
                </tr>
              </thead>
              <tbody>
                {sourceRows.map(s => {
                  const receipt = Math.round(s.landed * 0.78);
                  const logistics = Math.round(s.landed * 0.16);
                  const handling = s.landed - receipt - logistics;
                  const vBud = ((s.landed - 210) / 210) * 100;
                  const vPrev = ((s.landed - (s.landed - 4)) / (s.landed - 4)) * 100;
                  return (
                    <tr key={s.src}>
                      <TD bold>{s.src}</TD>
                      <TD right mono>{receipt}</TD>
                      <TD right mono>{logistics}</TD>
                      <TD right mono>{handling}</TD>
                      <TD right mono bold>${s.landed}</TD>
                      <TD right><Pill good={vBud <= 0}>{vBud >= 0 ? '+' : ''}{vBud.toFixed(1)}%</Pill></TD>
                      <TD right><Pill good={vPrev <= 0}>{vPrev >= 0 ? '+' : ''}{vPrev.toFixed(1)}%</Pill></TD>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <KpiTile
            label="Weighted Avg Landed Cost"
            value={`$${wtdLanded.toFixed(1)}`}
            unit="/t"
            sub="Across all sources (MTD)"
            footer={
              <div className="flex items-center justify-between">
                <span>vs Budget $210</span>
                <Pill good={wtdLanded <= 210}>{((wtdLanded - 210) / 210 * 100).toFixed(1)}%</Pill>
              </div>
            }
            accent="text-amber-300"
          />
        </div>

        {/* SECTION 7 – Bauxite Mix */}
        <SectionHeader n="07" title="Bauxite Mix" sub="What mix is driving today's COP?" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr><TH>Source</TH><TH right>Current %</TH><TH right>MTD %</TH><TH right>Prev Month %</TH><TH right>Δ pp</TH></tr>
              </thead>
              <tbody>
                {[
                  ['OMC', last.omc_pct, avg(mtd.map(r => r.omc_pct)), avg(prevMonth.map(r => r.omc_pct))],
                  ['Andru', last.andru_pct, avg(mtd.map(r => r.andru_pct)), avg(prevMonth.map(r => r.andru_pct))],
                  ['Imported', last.imp_pct, avg(mtd.map(r => r.imp_pct)), avg(prevMonth.map(r => r.imp_pct))],
                  ['Others', last.other_pct ?? 0, avg(mtd.map(r => r.other_pct ?? 0)), avg(prevMonth.map(r => r.other_pct ?? 0))],
                ].map((row: any) => {
                  const d = ((row[2] - row[3]) * 100);
                  return (
                    <tr key={row[0]}>
                      <TD bold>{row[0]}</TD>
                      <TD right mono>{(row[1] * 100).toFixed(1)}%</TD>
                      <TD right mono bold>{(row[2] * 100).toFixed(1)}%</TD>
                      <TD right mono>{(row[3] * 100).toFixed(1)}%</TD>
                      <TD right><Pill good={row[0] === 'Imported' ? d <= 0 : d >= 0}>{d >= 0 ? '+' : ''}{d.toFixed(1)}pp</Pill></TD>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={mtd.slice(-10).map(r => ({ d: r.date.slice(5), OMC: r.omc_pct * 100, Andru: r.andru_pct * 100, Imported: r.imp_pct * 100, Other: (r.other_pct ?? 0) * 100 }))}>
                <CartesianGrid stroke="#1e293b" vertical={false} />
                <XAxis dataKey="d" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
                <Legend />
                <Bar dataKey="OMC" stackId="a" fill="#0369a1" />
                <Bar dataKey="Andru" stackId="a" fill="#16a34a" />
                <Bar dataKey="Imported" stackId="a" fill="#d97706" />
                <Bar dataKey="Other" stackId="a" fill="#64748b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 8 – Conversion Cost Review */}
        <SectionHeader n="08" title="Conversion Cost Review" />
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr><TH>Component</TH><TH right>Current $/t</TH><TH right>MTD $/t</TH><TH right>Target $/t</TH><TH right>Variance</TH></tr>
            </thead>
            <tbody>
              {[
                ['Chemical Caustic', last.chem_caustic_cost ?? last.caustic_cost * 0.75, avg(mtd.map(r => r.chem_caustic_cost ?? r.caustic_cost * 0.75)), 28],
                ['Non-Chemical Caustic', last.non_chem_caustic_cost ?? last.caustic_cost * 0.25, avg(mtd.map(r => r.non_chem_caustic_cost ?? r.caustic_cost * 0.25)), 9],
                ['Steam', last.steam_cost, m.steam_mtd, 28.9],
                ['Power', last.power_cost, m.power_mtd, 13.5],
                ['Furnace Oil (HFO)', last.fo_cost, m.fo_mtd, 34.6],
                ['Lime', last.lime_cost, m.lime_mtd, 3.5],
                ['Fixed Cost', 24.0, 24.4, 24.0],
              ].map((r: any) => {
                const v = variance(r[1], r[3], 'lower');
                return (
                  <tr key={r[0]}>
                    <TD bold>{r[0]}</TD>
                    <TD right mono>{Number(r[1]).toFixed(1)}</TD>
                    <TD right mono>{Number(r[2]).toFixed(1)}</TD>
                    <TD right mono>{Number(r[3]).toFixed(1)}</TD>
                    <TD right><Pill good={v.good}>{v.pctv >= 0 ? '+' : ''}{v.pctv.toFixed(1)}%</Pill></TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 9 + 10 – Caustic & HFO monitors */}
        <SectionHeader n="09" title="Caustic & HFO Rate Monitors" sub="Real-time commodity rates" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
            <div className="flex items-center gap-2 text-emerald-300"><Beaker className="h-4 w-4" /><span className="text-sm font-bold uppercase tracking-wider">Caustic Rate</span></div>
            <div className="mt-3 flex items-baseline gap-3">
              <div className="text-6xl font-extrabold tabular-nums text-white">${m.caustic_mtd.toFixed(1)}</div>
              <div className="text-lg font-semibold text-slate-300">/t (MTD)</div>
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="text-slate-400">Current</span>
              <span className="text-2xl font-bold tabular-nums text-amber-300">${m.caustic_curr.toFixed(1)}</span>
              <Pill good={m.caustic_curr <= m.caustic_prev}>vs Prev {((m.caustic_curr - m.caustic_prev) / m.caustic_prev * 100).toFixed(1)}%</Pill>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={rows.map(r => ({ d: r.date.slice(5), v: r.caustic_cost }))}>
                <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2.5} dot={false} />
                <XAxis dataKey="d" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
            <div className="flex items-center gap-2 text-orange-300"><Flame className="h-4 w-4" /><span className="text-sm font-bold uppercase tracking-wider">HFO Rate</span></div>
            <div className="mt-3 flex items-baseline gap-3">
              <div className="text-6xl font-extrabold tabular-nums text-white">${m.fo_mtd.toFixed(1)}</div>
              <div className="text-lg font-semibold text-slate-300">/t (MTD)</div>
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="text-slate-400">Current</span>
              <span className="text-2xl font-bold tabular-nums text-amber-300">${m.fo_curr.toFixed(1)}</span>
              <Pill good={m.fo_curr <= avg(prevMonth.map(r => r.fo_cost))}>vs Prev {((m.fo_curr - avg(prevMonth.map(r => r.fo_cost))) / avg(prevMonth.map(r => r.fo_cost)) * 100).toFixed(1)}%</Pill>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={rows.map(r => ({ d: r.date.slice(5), v: r.fo_cost }))}>
                <Line type="monotone" dataKey="v" stroke="#f97316" strokeWidth={2.5} dot={false} />
                <XAxis dataKey="d" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 11 – Operational KPI Review */}
        <SectionHeader n="11" title="Operational KPI Review" sub="Best Ever vs Current" />
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr><TH>KPI</TH><TH>UoM</TH><TH right>Best Ever</TH><TH right>Current MTD</TH><TH right>Var from Best</TH><TH right>Impact on COP ($/t)</TH></tr>
            </thead>
            <tbody>
              {[
                ['Non-Chemical Soda','kg/T',8.29,avg(mtd.map(r=>r.cs_sc))*0.1,0.6],
                ['Lime','kg/T',24.26,avg(mtd.map(r=>r.lm_sc)),0.18],
                ['Steam','T/T',1.61,avg(mtd.map(r=>r.st_sc)),3.06],
                ['Power','kWh/T',205.6,avg(mtd.map(r=>r.pw_sc)),0.74],
                ['FO','kg/T',68.74,avg(mtd.map(r=>r.fo_sc)),1.34],
                ['Fixed Cost','$/T',24.0,24.4,0.4],
              ].map((r:any)=>{
                const dv = ((r[3]-r[2])/r[2])*100;
                return (
                  <tr key={r[0]}>
                    <TD bold>{r[0]}</TD><TD>{r[1]}</TD>
                    <TD right mono>{Number(r[2]).toFixed(2)}</TD>
                    <TD right mono>{Number(r[3]).toFixed(2)}</TD>
                    <TD right><Pill good={dv<=0}>{dv>=0?'+':''}{dv.toFixed(1)}%</Pill></TD>
                    <TD right mono>+${r[4].toFixed(2)}</TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 12 – Procurement Performance */}
        <SectionHeader n="12" title="Procurement Performance" />
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr><TH>Commodity</TH><TH right>Receipt Cost</TH><TH right>Consumption Cost</TH><TH right>Best Achieved</TH><TH right>Current</TH><TH right>Variance</TH><TH right>Impact on COP ($/t)</TH></tr>
            </thead>
            <tbody>
              {[
                ['Caustic',420,438,395,m.caustic_mtd*10,0.8],
                ['Coal',1.05,1.09,0.94,1.05,1.2],
                ['Lime',128,134,118,m.lime_mtd*38,0.3],
                ['HFO',520,548,495,m.fo_mtd*14,1.6],
              ].map((r:any)=>{
                const v = ((r[4]-r[3])/r[3])*100;
                return (
                  <tr key={r[0]}>
                    <TD bold>{r[0]}</TD>
                    <TD right mono>{typeof r[1]==='number'?r[1].toFixed(2):r[1]}</TD>
                    <TD right mono>{typeof r[2]==='number'?r[2].toFixed(2):r[2]}</TD>
                    <TD right mono>{typeof r[3]==='number'?r[3].toFixed(2):r[3]}</TD>
                    <TD right mono bold>{typeof r[4]==='number'?r[4].toFixed(2):r[4]}</TD>
                    <TD right><Pill good={v<=0}>{v>=0?'+':''}{v.toFixed(1)}%</Pill></TD>
                    <TD right mono>+${r[5].toFixed(2)}</TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 13 – Monthly Trend */}
        <SectionHeader n="13" title="Monthly Trend Review" sub="Last 12 months" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
            <div className="px-2 pb-1 text-sm font-bold text-slate-200">Production vs COP</div>
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={trendMonths}>
                <CartesianGrid stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="production" fill="#0369a1" name="Production MT/d" />
                <Line yAxisId="right" type="monotone" dataKey="cop" stroke="#f59e0b" strokeWidth={2.5} name="COP $/t" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
            <div className="px-2 pb-1 text-sm font-bold text-slate-200">Recovery · Bauxite · Conversion · Stock Days</div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trendMonths}>
                <CartesianGrid stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="recovery" stroke="#15803d" strokeWidth={2.5} name="Recovery %" />
                <Line type="monotone" dataKey="bauxite" stroke="#0369a1" strokeWidth={2.5} name="Bauxite $/t" />
                <Line type="monotone" dataKey="conversion" stroke="#dc2626" strokeWidth={2.5} name="Conversion $/t" />
                <Line type="monotone" dataKey="stock_days" stroke="#a855f7" strokeWidth={2.5} name="Stock Days" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 14 – Actionable Insights */}
        <SectionHeader n="14" title="Actionable Insights" sub="AI-generated executive summary" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((t, i) => (
            <div key={i} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
              <div className="flex items-center gap-2 text-amber-300">
                <AlertTriangle className="h-4 w-4" /><span className="text-xs font-bold uppercase tracking-wider">Insight {i + 1}</span>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-100">{t}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-slate-800 pt-4 text-center text-xs text-slate-500">
          Vedanta Aluminium Lanjigarh · Executive Review · Reporting period {from} to {to}
        </div>
      </div>
    </div>
  );
}
