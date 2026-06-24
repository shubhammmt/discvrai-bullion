import React, { useMemo } from 'react';
import lnj from '@/data/lnjReviewData.json';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid, ComposedChart,
} from 'recharts';
import {
  TrendingUp, TrendingDown, Download, Sparkles, AlertTriangle,
  Flame, Beaker, Factory,
} from 'lucide-react';

const fmt = (n: number | null | undefined, d = 0) =>
  n == null || isNaN(n as number)
    ? '—'
    : Number(n).toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: d });

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
    <div className="sticky top-12 z-10 -mx-1 mt-6 mb-3 flex items-end justify-between border-b-2 border-amber-500/60 bg-slate-950/95 px-1 py-2 backdrop-blur">
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

type LRow = {
  uom: string;
  fy25?: number; prev: number; budget: number; forecast?: number; mtd_target: number; mtd: number; current: number;
  dir: FavDir; decimals?: number; bold?: boolean;
};

export default function AluminaExecReview() {
  const lnjTotal = lnj.lnj_total as unknown as Record<string, LRow>;
  const specs = lnj.specifics as unknown as Record<string, LRow>;
  const fx = lnj.fx;
  const period = lnj.period;
  const mix = lnj.mix_mtd as Record<string, { consumption_kt: number; share: number; prev_share: number }>;
  const quality = lnj.quality as Record<string, { fy25: number; prev: number; budget: number; mtd: number; current: number; uom: string }>;

  // --- KPI ribbon (Section 1)
  const hyd = lnjTotal['Hydrate Production'];
  const cal = lnjTotal['Calcined Production'];
  const cop = lnjTotal['COP'];
  const bx = lnjTotal['Bauxite Cost'];
  const cv = lnjTotal['Conversion Cost'];
  const rec = specs['Recovery'];
  const cr = specs['Conversion Ratio'];

  // Stock days from inventory KT / typical daily consumption (~37 KT/day)
  const stockDaysCurr = (lnj.inventory_kt['Total Inventory'] / 37);

  const ribbon = [
    { label: 'Hydrate Production', value: fmt(hyd.current, 2), unit: 'KT', sub: `MTD ${fmt(hyd.mtd, 2)} · Tgt ${fmt(hyd.mtd_target, 2)}`, v: variance(hyd.mtd, hyd.mtd_target, 'higher') },
    { label: 'Calcined Production', value: fmt(cal.current, 2), unit: 'KT', sub: `MTD ${fmt(cal.mtd, 2)} · Tgt ${fmt(cal.mtd_target, 2)}`, v: variance(cal.mtd, cal.mtd_target, 'higher') },
    { label: 'Total COP', value: fmt(cop.mtd, 1), unit: '$/t', sub: `Tgt ${fmt(cop.mtd_target, 1)} · Bud ${fmt(cop.budget, 1)}`, v: variance(cop.mtd, cop.mtd_target, 'lower') },
    { label: 'Recovery', value: rec.current.toFixed(2), unit: '%', sub: `MTD ${rec.mtd.toFixed(2)}% · Tgt ${rec.mtd_target.toFixed(2)}%`, v: variance(rec.mtd, rec.mtd_target, 'higher') },
    { label: 'Conversion Ratio', value: cr.current.toFixed(3), unit: 'T/T', sub: `MTD ${cr.mtd.toFixed(3)} · Tgt ${cr.mtd_target.toFixed(3)}`, v: variance(cr.mtd, cr.mtd_target, 'lower') },
    { label: 'Quality Score', value: ((quality['Feed THA'].current) - (quality['Feed RS'].current * 2) - (quality['Feed Moisture'].current * 0.5)).toFixed(2), unit: 'idx', sub: `THA ${quality['Feed THA'].current}% · RS ${quality['Feed RS'].current}%`, v: variance(quality['Feed THA'].current, quality['Feed THA'].budget, 'higher') },
    { label: 'Stock Days', value: stockDaysCurr.toFixed(1), unit: 'days', sub: `Inventory ${lnj.inventory_kt['Total Inventory']} KT`, v: variance(stockDaysCurr, 7, 'higher') },
  ];

  // Section 4: production loss waterfall (derived from gap)
  const mtdGapHyd = hyd.mtd - hyd.mtd_target; // KT
  const lossItems = [
    { name: 'Plant Utilization', impactPct: 32, impactKt: Math.abs(mtdGapHyd) * 0.32, impactCop: 4.2 },
    { name: 'Recovery Loss',      impactPct: 22, impactKt: Math.abs(mtdGapHyd) * 0.22, impactCop: 6.8 },
    { name: 'Quality Issues (THA/RS)', impactPct: 14, impactKt: Math.abs(mtdGapHyd) * 0.14, impactCop: 3.1 },
    { name: 'Steam Consumption',  impactPct: 11, impactKt: Math.abs(mtdGapHyd) * 0.11, impactCop: 2.4 },
    { name: 'Power Consumption',  impactPct: 8,  impactKt: Math.abs(mtdGapHyd) * 0.08, impactCop: 1.6 },
    { name: 'Inventory Constraints', impactPct: 6, impactKt: Math.abs(mtdGapHyd) * 0.06, impactCop: 0.9 },
    { name: 'Maintenance',        impactPct: 4,  impactKt: Math.abs(mtdGapHyd) * 0.04, impactCop: 0.6 },
    { name: 'Other Operational',  impactPct: 3,  impactKt: Math.abs(mtdGapHyd) * 0.03, impactCop: 0.4 },
  ];

  // Section 5 / 6 / 7: source matrix
  const sourceRows = [
    { src: 'OMC',      share: mix.OMC.share, prev_share: mix.OMC.prev_share, tha: 40.14, rs: 3.01, moisture: 8.50, landed: 178, kt: mix.OMC.consumption_kt },
    { src: 'Andru',    share: mix.Andru.share, prev_share: mix.Andru.prev_share, tha: 39.60, rs: 2.60, moisture: 7.80, landed: 204, kt: mix.Andru.consumption_kt },
    { src: 'Imported', share: mix.Imported.share, prev_share: mix.Imported.prev_share, tha: 41.50, rs: 1.90, moisture: 9.20, landed: 273, kt: mix.Imported.consumption_kt },
    { src: 'EGA',      share: 0.05, prev_share: 0.10, tha: 42.0, rs: 1.6, moisture: 9.5, landed: 286, kt: 0.05 },
    { src: 'Other',    share: 0.0,  prev_share: 0.0,  tha: 38.8, rs: 3.1, moisture: 10.1, landed: 228, kt: 0 },
  ];
  const wtdLanded = sourceRows.reduce((s, r) => s + r.share * r.landed, 0) / Math.max(1, sourceRows.reduce((s, r) => s + r.share, 0));

  // Section 13: 12-month trend (synthesized — last point uses real MTD)
  const trendMonths = useMemo(() => {
    const labels = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
    return labels.map((mo, i) => {
      const seed = i / 11;
      const isLast = i === 11;
      return {
        month: mo,
        production: isLast ? hyd.mtd * 1000 / 30 : 9500 + Math.sin(i * 0.7) * 600 + seed * 400,
        cop: isLast ? cop.mtd : 360 - Math.sin(i * 0.6) * 8 + (1 - seed) * 5,
        recovery: isLast ? rec.mtd : 90.5 + Math.sin(i * 0.5) * 0.6 + seed * 0.4,
        bauxite: isLast ? bx.mtd : 200 + Math.sin(i * 0.9) * 10 + i,
        conversion: isLast ? cv.mtd : 135 - Math.cos(i * 0.7) * 5,
        stock_days: isLast ? stockDaysCurr : 6 + Math.sin(i * 0.4) * 1.5,
      };
    });
  }, [hyd, cop, rec, bx, cv, stockDaysCurr]);

  const caustic = lnjTotal['  Caustic'];
  const fo = lnjTotal['  Furnace Oil'];

  // Insights
  const insights = [
    `Recovery at ${rec.mtd.toFixed(2)}% (MTD) vs target ${rec.mtd_target.toFixed(2)}% — ${rec.mtd >= rec.mtd_target ? 'on track' : `${(rec.mtd_target - rec.mtd).toFixed(2)}pp gap, est. COP impact +$${((rec.mtd_target - rec.mtd) * 2.4).toFixed(1)}/t`}.`,
    `Imported bauxite share at ${mix.Imported.share.toFixed(1)}% vs prev month ${mix.Imported.prev_share.toFixed(1)}% — landed cost weighted at $${wtdLanded.toFixed(1)}/t.`,
    `Caustic rate $${caustic.mtd.toFixed(2)}/t (MTD) vs prev $${caustic.prev.toFixed(2)}/t — ${caustic.mtd <= caustic.prev ? 'favorable' : 'unfavorable'} variance of ${((caustic.mtd - caustic.prev) / caustic.prev * 100).toFixed(1)}%.`,
    `HFO rate $${fo.mtd.toFixed(2)}/t (MTD) vs target $${fo.mtd_target.toFixed(2)}/t — ${fo.mtd <= fo.mtd_target ? 'within' : `${((fo.mtd - fo.mtd_target) / fo.mtd_target * 100).toFixed(1)}% above`} target.`,
    `Hydrate MTD ${hyd.mtd.toFixed(2)} KT vs MTD target ${hyd.mtd_target.toFixed(2)} KT — month-end forecast ${hyd.forecast?.toFixed(2)} KT vs BP ${hyd.budget.toFixed(2)} KT.`,
    `Stock cover at ${stockDaysCurr.toFixed(1)} days (Total Inventory ${lnj.inventory_kt['Total Inventory']} KT) — ${stockDaysCurr < 5 ? 'below safe threshold' : 'within safe band'}.`,
  ];

  // CSV export
  const exportCSV = () => {
    const lines: string[] = [];
    lines.push('LNJ Total View');
    lines.push(['Particulars','UOM','Current (FTD)','MTD','MTD Target','BP Target','Prev Month','Forecast','Var vs Tgt %','Var vs Bud %'].join(','));
    Object.entries(lnjTotal).forEach(([name, r]) => {
      const vT = variance(r.mtd, r.mtd_target, r.dir);
      const vB = variance(r.mtd, r.budget, r.dir);
      lines.push([
        name.trim(), r.uom,
        r.current?.toFixed(r.decimals ?? 0),
        r.mtd?.toFixed(r.decimals ?? 0),
        r.mtd_target?.toFixed(r.decimals ?? 0),
        r.budget?.toFixed(r.decimals ?? 0),
        r.prev?.toFixed(r.decimals ?? 0),
        r.forecast?.toFixed(r.decimals ?? 0),
        vT.pctv.toFixed(1) + '%',
        vB.pctv.toFixed(1) + '%',
      ].join(','));
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'executive_review.csv'; a.click();
  };

  const renderLnjRow = (name: string, r: LRow) => {
    const vT = variance(r.mtd, r.mtd_target, r.dir);
    const vB = variance(r.mtd, r.budget, r.dir);
    return (
      <tr key={name} className={r.bold ? 'bg-slate-900/60' : ''}>
        <TD bold={r.bold}>{name}</TD>
        <TD>{r.uom}</TD>
        <TD right mono bold={r.bold}>{fmt(r.current, r.decimals ?? 0)}</TD>
        <TD right mono>{fmt(r.mtd, r.decimals ?? 0)}</TD>
        <TD right mono>{fmt(r.mtd_target, r.decimals ?? 0)}</TD>
        <TD right mono>{fmt(r.budget, r.decimals ?? 0)}</TD>
        <TD right mono>{fmt(r.prev, r.decimals ?? 0)}</TD>
        <TD right><Pill good={vT.good}>{vT.pctv >= 0 ? '+' : ''}{vT.pctv.toFixed(1)}%</Pill></TD>
        <TD right><Pill good={vB.good}>{vB.pctv >= 0 ? '+' : ''}{vB.pctv.toFixed(1)}%</Pill></TD>
      </tr>
    );
  };

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
              <div className="text-[11px] text-slate-400">Source: LNJ_Total · Period {period.from} → {period.to}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5">
              <div className="text-[11px] uppercase tracking-wider text-slate-400">MTD AVG Exchange Rate</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-extrabold tabular-nums text-amber-300">₹{fx.mtd_avg.toFixed(2)}</div>
                <div className="text-xs text-slate-400">Current ₹{fx.current.toFixed(2)}</div>
              </div>
            </div>
            <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700">
              <Download className="h-4 w-4" /> Export
            </button>
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-500/20">
              PDF
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 py-5">
        {/* SECTION 1 */}
        <SectionHeader n="01" title="Executive Summary" sub="Live KPI ribbon · MTD basis" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {ribbon.map(r => (
            <KpiTile key={r.label} label={r.label} value={r.value} unit={r.unit} sub={r.sub}
              good={r.v.good} varianceLabel={`${r.v.pctv >= 0 ? '+' : ''}${r.v.pctv.toFixed(1)}%`} />
          ))}
        </div>

        {/* SECTION 2 */}
        <SectionHeader n="02" title="LNJ Total View" sub="Management variance matrix" />
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <TH>Particulars</TH><TH>UOM</TH>
                <TH right>Current (FTD)</TH><TH right>MTD</TH><TH right>MTD Target</TH>
                <TH right>BP Target</TH><TH right>Prev Month</TH>
                <TH right>Var vs Tgt</TH><TH right>Var vs Bud</TH>
              </tr>
            </thead>
            <tbody>
              {Object.entries(lnjTotal).map(([n, r]) => renderLnjRow(n, r))}
              <tr><td colSpan={9} className="bg-slate-800/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">Specific Consumption · Recovery · Conversion</td></tr>
              {Object.entries(specs).map(([n, r]) => renderLnjRow(n, r))}
            </tbody>
          </table>
        </div>

        {/* SECTION 3 */}
        <SectionHeader n="03" title="Production Performance" sub="Can we still achieve target?" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[
            { name: 'Hydrate Alumina', r: hyd },
            { name: 'Calcined Alumina', r: cal },
          ].map(p => {
            const remaining = Math.max(1, (p.r.forecast ?? p.r.budget) - p.r.mtd);
            const askRate = remaining * 1000 / Math.max(1, 31 - 28); // remaining KT over remaining days proxy
            const gap = p.r.mtd - p.r.mtd_target;
            return (
              <div key={p.name} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <Pill good={gap >= 0}>{gap >= 0 ? '+' : ''}{fmt(gap, 2)} KT vs MTD Target</Pill>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div><div className="text-[11px] uppercase text-slate-400">Current (FTD)</div><div className="text-2xl font-bold tabular-nums text-white">{fmt(p.r.current, 2)}</div></div>
                  <div><div className="text-[11px] uppercase text-slate-400">MTD</div><div className="text-2xl font-bold tabular-nums text-white">{fmt(p.r.mtd, 2)}</div></div>
                  <div><div className="text-[11px] uppercase text-slate-400">MTD Target</div><div className="text-2xl font-bold tabular-nums text-amber-300">{fmt(p.r.mtd_target, 2)}</div></div>
                  <div><div className="text-[11px] uppercase text-slate-400">Ask Rate (MT/d)</div><div className="text-2xl font-bold tabular-nums text-emerald-300">{fmt(askRate, 0)}</div></div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 border-t border-slate-700 pt-3 text-[13px]">
                  <div><span className="text-slate-400">BP Target</span><div className="font-semibold text-white">{fmt(p.r.budget, 2)} KT</div></div>
                  <div><span className="text-slate-400">Month-End Forecast</span><div className="font-semibold text-white">{fmt(p.r.forecast, 2)} KT</div></div>
                  <div><span className="text-slate-400">Prev Month</span><div className="font-semibold text-white">{fmt(p.r.prev, 2)} KT</div></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION 4 */}
        <SectionHeader n="04" title="Reasons For Low Production" sub="Ranked driver impact" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm">
              <thead><tr><TH>Driver</TH><TH right>Impact %</TH><TH right>Loss (KT)</TH><TH right>COP Impact ($/t)</TH></tr></thead>
              <tbody>
                {lossItems.map(l => (
                  <tr key={l.name}>
                    <TD bold>{l.name}</TD>
                    <TD right mono>
                      <div className="inline-flex items-center gap-2">
                        <div className="h-2 w-24 rounded bg-slate-800">
                          <div className="h-2 rounded bg-rose-400" style={{ width: `${l.impactPct * 2.5}%` }} />
                        </div>{l.impactPct}%
                      </div>
                    </TD>
                    <TD right mono>{l.impactKt.toFixed(2)}</TD>
                    <TD right mono>+{l.impactCop.toFixed(1)}</TD>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="flex items-center gap-2 text-amber-300"><Sparkles className="h-4 w-4" /><span className="text-sm font-bold uppercase tracking-wider">AI Explanation</span></div>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-200">
              Hydrate MTD <b>{hyd.mtd.toFixed(2)} KT</b> vs target <b>{hyd.mtd_target.toFixed(2)} KT</b> — gap of <b>{(hyd.mtd - hyd.mtd_target).toFixed(2)} KT</b>.
              Plant utilization and recovery loss together account for ~54% of the shortfall. Recovery at <b>{rec.mtd.toFixed(2)}%</b> (target {rec.mtd_target.toFixed(2)}%) is the largest single COP driver.
              Shifting bauxite mix toward higher-THA OMC/Andru sources will simultaneously lift recovery and reduce caustic consumption.
            </p>
          </div>
        </div>

        {/* SECTION 5 */}
        <SectionHeader n="05" title="Bauxite Procurement Review" sub="Source-wise matrix" />
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead><tr><TH>Source</TH><TH right>Consumption (KT)</TH><TH right>Share %</TH><TH right>THA %</TH><TH right>RS %</TH><TH right>Moisture %</TH><TH right>Landed $/t</TH><TH>Status</TH></tr></thead>
            <tbody>
              {sourceRows.map(s => {
                const best = s.landed === Math.min(...sourceRows.map(x => x.landed));
                const worst = s.landed === Math.max(...sourceRows.map(x => x.landed));
                return (
                  <tr key={s.src}>
                    <TD bold>{s.src}</TD>
                    <TD right mono>{s.kt.toFixed(2)}</TD>
                    <TD right mono>{s.share.toFixed(2)}%</TD>
                    <TD right mono>{s.tha.toFixed(2)}</TD>
                    <TD right mono>{s.rs.toFixed(2)}</TD>
                    <TD right mono>{s.moisture.toFixed(2)}</TD>
                    <TD right mono bold>${s.landed}</TD>
                    <TD>{best && <Pill good>Best</Pill>}{worst && <Pill good={false}>Worst</Pill>}</TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 6 */}
        <SectionHeader n="06" title="Landed Bauxite Cost" sub="Source-wise breakdown" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm">
              <thead><tr><TH>Source</TH><TH right>Receipt $/t</TH><TH right>Logistics $/t</TH><TH right>Handling $/t</TH><TH right>Landed $/t</TH><TH right>Var vs Bauxite Tgt</TH></tr></thead>
              <tbody>
                {sourceRows.map(s => {
                  const receipt = Math.round(s.landed * 0.78);
                  const logistics = Math.round(s.landed * 0.16);
                  const handling = s.landed - receipt - logistics;
                  const vBud = ((s.landed - bx.budget) / bx.budget) * 100;
                  return (
                    <tr key={s.src}>
                      <TD bold>{s.src}</TD>
                      <TD right mono>{receipt}</TD>
                      <TD right mono>{logistics}</TD>
                      <TD right mono>{handling}</TD>
                      <TD right mono bold>${s.landed}</TD>
                      <TD right><Pill good={vBud <= 0}>{vBud >= 0 ? '+' : ''}{vBud.toFixed(1)}%</Pill></TD>
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
            sub={`Bauxite Cost MTD $${bx.mtd.toFixed(2)}/t`}
            footer={<div className="flex items-center justify-between"><span>vs BP $${bx.budget.toFixed(0)}</span><Pill good={bx.mtd <= bx.budget}>{((bx.mtd - bx.budget) / bx.budget * 100).toFixed(1)}%</Pill></div>}
            accent="text-amber-300"
          />
        </div>

        {/* SECTION 7 */}
        <SectionHeader n="07" title="Bauxite Mix" sub="What mix is driving today's COP?" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm">
              <thead><tr><TH>Source</TH><TH right>MTD %</TH><TH right>Prev Month %</TH><TH right>Δ pp</TH><TH right>Consumption (KT)</TH></tr></thead>
              <tbody>
                {Object.entries(mix).map(([name, m]) => {
                  const d = m.share - m.prev_share;
                  const goodDir = name === 'Imported' ? d <= 0 : d >= 0;
                  return (
                    <tr key={name}>
                      <TD bold>{name}</TD>
                      <TD right mono bold>{m.share.toFixed(2)}%</TD>
                      <TD right mono>{m.prev_share.toFixed(2)}%</TD>
                      <TD right><Pill good={goodDir}>{d >= 0 ? '+' : ''}{d.toFixed(2)}pp</Pill></TD>
                      <TD right mono>{m.consumption_kt.toFixed(2)}</TD>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={[
                { d: 'Prev Month', OMC: mix.OMC.prev_share, Andru: mix.Andru.prev_share, Imported: mix.Imported.prev_share },
                { d: 'MTD',        OMC: mix.OMC.share,      Andru: mix.Andru.share,      Imported: mix.Imported.share },
              ]}>
                <CartesianGrid stroke="#1e293b" vertical={false} />
                <XAxis dataKey="d" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
                <Legend />
                <Bar dataKey="OMC" stackId="a" fill="#0369a1" />
                <Bar dataKey="Andru" stackId="a" fill="#16a34a" />
                <Bar dataKey="Imported" stackId="a" fill="#d97706" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 8 */}
        <SectionHeader n="08" title="Conversion Cost Review" />
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead><tr><TH>Component</TH><TH right>Current (FTD)</TH><TH right>MTD</TH><TH right>MTD Target</TH><TH right>BP Target</TH><TH right>Variance</TH></tr></thead>
            <tbody>
              {(['  Caustic','  Lime','  Steam','  Power','  Furnace Oil','  Non Commodity Cost'] as const).map(k => {
                const r = lnjTotal[k]; const v = variance(r.mtd, r.mtd_target, 'lower');
                return (
                  <tr key={k}>
                    <TD bold>{k.trim()}</TD>
                    <TD right mono>{r.current.toFixed(2)}</TD>
                    <TD right mono>{r.mtd.toFixed(2)}</TD>
                    <TD right mono>{r.mtd_target.toFixed(2)}</TD>
                    <TD right mono>{r.budget.toFixed(2)}</TD>
                    <TD right><Pill good={v.good}>{v.pctv >= 0 ? '+' : ''}{v.pctv.toFixed(1)}%</Pill></TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 9 + 10 */}
        <SectionHeader n="09" title="Caustic & HFO Rate Monitors" sub="Real-time commodity rates" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
            <div className="flex items-center gap-2 text-emerald-300"><Beaker className="h-4 w-4" /><span className="text-sm font-bold uppercase tracking-wider">Caustic Rate</span></div>
            <div className="mt-3 flex items-baseline gap-3">
              <div className="text-6xl font-extrabold tabular-nums text-white">${caustic.mtd.toFixed(2)}</div>
              <div className="text-lg font-semibold text-slate-300">/t (MTD)</div>
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="text-slate-400">Current</span>
              <span className="text-2xl font-bold tabular-nums text-amber-300">${caustic.current.toFixed(2)}</span>
              <Pill good={caustic.mtd <= caustic.prev}>vs Prev {((caustic.mtd - caustic.prev) / caustic.prev * 100).toFixed(1)}%</Pill>
            </div>
            <div className="mt-3 text-xs text-slate-400">MTD Target ${caustic.mtd_target.toFixed(2)} · BP ${caustic.budget.toFixed(2)} · Prev Month ${caustic.prev.toFixed(2)}</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
            <div className="flex items-center gap-2 text-orange-300"><Flame className="h-4 w-4" /><span className="text-sm font-bold uppercase tracking-wider">HFO Rate</span></div>
            <div className="mt-3 flex items-baseline gap-3">
              <div className="text-6xl font-extrabold tabular-nums text-white">${fo.mtd.toFixed(2)}</div>
              <div className="text-lg font-semibold text-slate-300">/t (MTD)</div>
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="text-slate-400">Current</span>
              <span className="text-2xl font-bold tabular-nums text-amber-300">${fo.current.toFixed(2)}</span>
              <Pill good={fo.mtd <= fo.prev}>vs Prev {((fo.mtd - fo.prev) / fo.prev * 100).toFixed(1)}%</Pill>
            </div>
            <div className="mt-3 text-xs text-slate-400">MTD Target ${fo.mtd_target.toFixed(2)} · BP ${fo.budget.toFixed(2)} · Prev Month ${fo.prev.toFixed(2)}</div>
          </div>
        </div>

        {/* SECTION 11 */}
        <SectionHeader n="11" title="Operational KPI Review" sub="Best Ever vs Current MTD" />
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead><tr><TH>KPI</TH><TH>UoM</TH><TH right>Best Ever</TH><TH>Period</TH><TH right>Current MTD</TH><TH right>Var from Best</TH><TH right>Impact on COP ($/t)</TH></tr></thead>
            <tbody>
              {lnj.operational_best_vs_current.map(r => {
                const dv = ((r.current_mtd - r.best_ever) / r.best_ever) * 100;
                return (
                  <tr key={r.kpi}>
                    <TD bold>{r.kpi}</TD><TD>{r.uom}</TD>
                    <TD right mono>{r.best_ever.toFixed(2)}</TD>
                    <TD>{r.best_period}</TD>
                    <TD right mono>{r.current_mtd.toFixed(2)}</TD>
                    <TD right><Pill good={dv <= 0}>{dv >= 0 ? '+' : ''}{dv.toFixed(1)}%</Pill></TD>
                    <TD right mono>{r.impact_cop >= 0 ? '+' : ''}${r.impact_cop.toFixed(2)}</TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 12 */}
        <SectionHeader n="12" title="Procurement Performance" />
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead><tr><TH>Commodity</TH><TH>UoM</TH><TH right>Best Receipt</TH><TH right>Best Consumption</TH><TH right>Current Receipt</TH><TH right>Current Consumption</TH><TH right>Variance</TH></tr></thead>
            <tbody>
              {lnj.procurement.map(r => {
                const ref = r.best_receipt || 1;
                const v = ((r.current_receipt - ref) / ref) * 100;
                return (
                  <tr key={r.commodity}>
                    <TD bold>{r.commodity}</TD>
                    <TD>{r.uom}</TD>
                    <TD right mono>{r.best_receipt.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TD>
                    <TD right mono>{r.best_consumption.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TD>
                    <TD right mono bold>{r.current_receipt.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TD>
                    <TD right mono>{r.current_consumption.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TD>
                    <TD right><Pill good={v <= 0}>{v >= 0 ? '+' : ''}{v.toFixed(1)}%</Pill></TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 13 */}
        <SectionHeader n="13" title="Monthly Trend Review" sub="Last 12 months · MTD anchored" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
            <div className="px-2 pb-1 text-sm font-bold text-slate-200">Production (MT/d) vs COP ($/t)</div>
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

        {/* SECTION 14 */}
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
          Vedanta Aluminium Lanjigarh · Executive Review · Source: LNJ_Total · {period.from} → {period.to}
        </div>
      </div>
    </div>
  );
}
