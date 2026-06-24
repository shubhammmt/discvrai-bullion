import React, { useMemo } from 'react';
import lnj from '@/data/lnjReviewData.json';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid, ComposedChart,
} from 'recharts';
import {
  TrendingUp, TrendingDown, Download, Sparkles, AlertTriangle,
  Factory, Beaker,
} from 'lucide-react';

const FX_RATE = 94.71;

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

type Theme = ReturnType<typeof buildTheme>;
function buildTheme(dark: boolean) {
  return dark
    ? {
        dark: true,
        page: 'bg-slate-950 text-slate-100',
        panel: 'border-slate-700 bg-slate-900/70',
        panelSoft: 'border-slate-700/70 bg-slate-900/80',
        sub: 'text-slate-300',
        muted: 'text-slate-400',
        title: 'text-white',
        thBg: 'bg-slate-800/80 text-slate-200',
        rowBorder: 'border-slate-800/70',
        zebra: 'bg-slate-900/60',
        sectionBg: 'bg-slate-950/95',
        sectionBorder: 'border-amber-500/60',
        chip: 'bg-amber-500/20 text-amber-300 ring-amber-500/40',
        accentTxt: 'text-amber-300',
        grid: '#1e293b',
        axis: '#cbd5e1',
        ttBg: '#0f172a',
        ttBorder: '#334155',
        ttTxt: '#fff',
      }
    : {
        dark: false,
        page: 'bg-slate-50 text-slate-900',
        panel: 'border-slate-200 bg-white',
        panelSoft: 'border-slate-200 bg-white',
        sub: 'text-slate-600',
        muted: 'text-slate-500',
        title: 'text-slate-900',
        thBg: 'bg-slate-100 text-slate-700',
        rowBorder: 'border-slate-200',
        zebra: 'bg-slate-50',
        sectionBg: 'bg-slate-50/95',
        sectionBorder: 'border-amber-500/70',
        chip: 'bg-amber-100 text-amber-800 ring-amber-300',
        accentTxt: 'text-amber-700',
        grid: '#e2e8f0',
        axis: '#475569',
        ttBg: '#fff',
        ttBorder: '#cbd5e1',
        ttTxt: '#0f172a',
      };
}

function Pill({ good, children }: { good: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[13px] font-semibold tabular-nums ring-1 ${
        good
          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30'
          : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 ring-rose-500/30'
      }`}
    >
      {good ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
      {children}
    </span>
  );
}

function KpiTile({
  T, label, value, unit, sub, varianceLabel, good, footer, status,
}: {
  T: Theme;
  label: string; value: string; unit?: string; sub?: string;
  varianceLabel?: string; good?: boolean; footer?: React.ReactNode;
  status?: 'pos' | 'neg' | 'neutral';
}) {
  // Color-coded accent border
  const accent =
    status === 'pos' ? 'border-l-4 border-l-emerald-500 ring-1 ring-emerald-500/20'
    : status === 'neg' ? 'border-l-4 border-l-rose-500 ring-1 ring-rose-500/20'
    : 'border-l-4 border-l-amber-500 ring-1 ring-amber-500/20';
  const valueColor =
    status === 'pos' ? 'text-emerald-600 dark:text-emerald-300'
    : status === 'neg' ? 'text-rose-600 dark:text-rose-300'
    : T.title;
  return (
    <div className={`rounded-xl border ${T.panelSoft} ${accent} p-4 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div className={`text-[12px] font-semibold uppercase tracking-wider ${T.sub}`}>{label}</div>
        {varianceLabel && <Pill good={!!good}>{varianceLabel}</Pill>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className={`text-[34px] font-extrabold tabular-nums leading-none ${valueColor}`}>{value}</div>
        {unit && <div className={`text-sm font-semibold ${T.muted}`}>{unit}</div>}
      </div>
      {sub && <div className={`mt-1 text-[13px] ${T.sub}`}>{sub}</div>}
      {footer && <div className={`mt-3 border-t ${T.rowBorder} pt-2 text-[12px] ${T.sub}`}>{footer}</div>}
    </div>
  );
}

function SectionHeader({ T, n, title, sub }: { T: Theme; n: string; title: string; sub?: string }) {
  return (
    <div className={`-mx-1 mt-6 mb-3 flex items-end justify-between border-b-2 ${T.sectionBorder} px-1 py-2`}>
      <div className="flex items-baseline gap-3">
        <span className={`rounded px-2 py-0.5 text-xs font-bold ring-1 ${T.chip}`}>{n}</span>
        <h2 className={`text-xl font-bold tracking-tight ${T.title}`}>{title}</h2>
      </div>
      {sub && <div className={`text-xs uppercase tracking-wider ${T.muted}`}>{sub}</div>}
    </div>
  );
}

const TH = ({ T, children, right }: { T: Theme; children: React.ReactNode; right?: boolean }) => (
  <th
    className={`whitespace-nowrap border-b ${T.rowBorder} ${T.thBg} px-3 py-2 text-[12px] font-bold uppercase tracking-wider ${
      right ? 'text-right' : 'text-left'
    }`}
  >
    {children}
  </th>
);
const TD = ({ T, children, right, bold, mono }: { T: Theme; children: React.ReactNode; right?: boolean; bold?: boolean; mono?: boolean }) => (
  <td
    className={`whitespace-nowrap border-b ${T.rowBorder} px-3 py-2 text-[14px] ${T.title} ${right ? 'text-right' : 'text-left'} ${
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

type Props = { dark?: boolean };

export default function AluminaExecReview({ dark = true }: Props) {
  const T = buildTheme(dark);
  const lnjTotal = lnj.lnj_total as unknown as Record<string, LRow>;
  const specs = lnj.specifics as unknown as Record<string, LRow>;
  const period = lnj.period;
  const mix = lnj.mix_mtd as Record<string, { consumption_kt: number; share: number; prev_share: number }>;
  // Quality data kept for the Quality Impact card context but no composite score is computed.

  // --- KPI ribbon (simplified to production + cost only)
  const hyd = lnjTotal['Hydrate Production'];
  const cal = lnjTotal['Calcined Production'];
  const cop = lnjTotal['COP'];
  const bx = lnjTotal['Bauxite Cost'];
  const cv = lnjTotal['Conversion Cost'];
  const rec = specs['Recovery'];

  const ribbon = [
    {
      label: 'Hydrate Production', value: fmt(hyd.current, 2), unit: 'Tonnes',
      sub: `MTD ${fmt(hyd.mtd, 2)} · Tgt ${fmt(hyd.mtd_target, 2)}`,
      v: variance(hyd.mtd, hyd.mtd_target, 'higher'),
    },
    {
      label: 'Calcined Production', value: fmt(cal.current, 2), unit: 'Tonnes',
      sub: `MTD ${fmt(cal.mtd, 2)} · Tgt ${fmt(cal.mtd_target, 2)}`,
      v: variance(cal.mtd, cal.mtd_target, 'higher'),
    },
    {
      label: 'Total COP', value: fmt(cop.mtd, 1), unit: '$/Tonne',
      sub: `Tgt ${fmt(cop.mtd_target, 1)} · Bud ${fmt(cop.budget, 1)}`,
      v: variance(cop.mtd, cop.mtd_target, 'lower'),
    },
    {
      label: 'Recovery', value: rec.current.toFixed(2), unit: '%',
      sub: `MTD ${rec.mtd.toFixed(2)}% · Tgt ${rec.mtd_target.toFixed(2)}%`,
      v: variance(rec.mtd, rec.mtd_target, 'higher'),
    },
    {
      label: 'Bauxite Cost', value: fmt(bx.mtd, 1), unit: '$/Tonne',
      sub: `Tgt ${fmt(bx.mtd_target, 1)} · Bud ${fmt(bx.budget, 1)}`,
      v: variance(bx.mtd, bx.mtd_target, 'lower'),
    },
    {
      label: 'Conversion Cost', value: fmt(cv.mtd, 1), unit: '$/Tonne',
      sub: `Tgt ${fmt(cv.mtd_target, 1)} · Bud ${fmt(cv.budget, 1)}`,
      v: variance(cv.mtd, cv.mtd_target, 'lower'),
    },
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

  // Section 12: 12-month trend (synthesized — last point uses real MTD)
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
      };
    });
  }, [hyd, cop, rec, bx, cv]);

  // Insights (caustic/HFO mentions removed — now in COP Intelligence)
  const insights = [
    `Recovery at ${rec.mtd.toFixed(2)}% (MTD) vs target ${rec.mtd_target.toFixed(2)}% — ${rec.mtd >= rec.mtd_target ? 'on track' : `${(rec.mtd_target - rec.mtd).toFixed(2)}pp gap, est. COP impact +$${((rec.mtd_target - rec.mtd) * 2.4).toFixed(1)}/Tonne`}.`,
    `Imported bauxite share at ${mix.Imported.share.toFixed(1)}% vs prev month ${mix.Imported.prev_share.toFixed(1)}% — landed cost weighted at $${wtdLanded.toFixed(1)}/Tonne.`,
    `Hydrate MTD ${hyd.mtd.toFixed(2)} KT vs MTD target ${hyd.mtd_target.toFixed(2)} KT — month-end forecast ${hyd.forecast?.toFixed(2)} KT vs BP ${hyd.budget.toFixed(2)} KT.`,
    `Conversion Cost MTD $${cv.mtd.toFixed(2)}/Tonne vs MTD target $${cv.mtd_target.toFixed(2)}/Tonne — variance ${((cv.mtd - cv.mtd_target) / cv.mtd_target * 100).toFixed(1)}%.`,
    `Bauxite Cost MTD $${bx.mtd.toFixed(2)}/Tonne vs BP $${bx.budget.toFixed(2)}/Tonne — ${(bx.mtd <= bx.budget ? 'within' : 'above')} budget.`,
    `Total COP at $${cop.mtd.toFixed(1)}/Tonne vs MTD target $${cop.mtd_target.toFixed(1)}/Tonne — biggest drivers: bauxite mix, recovery, conversion stack.`,
  ];

  // CSV export
  const exportCSV = () => {
    const lines: string[] = [];
    lines.push('LNJ Total View');
    lines.push(['Particulars','UOM','Current (FTD)','MTD','MTD Target','BP Target','Prev Month','Forecast','Var vs Tgt %','Var vs Bud %'].join(','));
    Object.entries(lnjTotal).filter(([name]) => !name.startsWith('_')).forEach(([name, r]) => {
      const vT = variance(r.mtd, r.mtd_target, r.dir);
      const vB = variance(r.mtd, r.budget, r.dir);
      const renamed = name.trim() === 'Other Cost' ? 'Conversion Cost' : name.trim();
      lines.push([
        renamed, r.uom,
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
    const display = name.trim() === 'Other Cost' ? 'Conversion Cost' : name;
    return (
      <tr key={name} className={r.bold ? T.zebra : ''}>
        <TD T={T} bold={r.bold}>{display}</TD>
        <TD T={T}>{r.uom}</TD>
        <TD T={T} right mono bold={r.bold}>{fmt(r.current, r.decimals ?? 0)}</TD>
        <TD T={T} right mono>{fmt(r.mtd, r.decimals ?? 0)}</TD>
        <TD T={T} right mono>{fmt(r.mtd_target, r.decimals ?? 0)}</TD>
        <TD T={T} right mono>{fmt(r.budget, r.decimals ?? 0)}</TD>
        <TD T={T} right mono>{fmt(r.prev, r.decimals ?? 0)}</TD>
        <TD T={T} right><Pill good={vT.good}>{vT.pctv >= 0 ? '+' : ''}{vT.pctv.toFixed(1)}%</Pill></TD>
        <TD T={T} right><Pill good={vB.good}>{vB.pctv >= 0 ? '+' : ''}{vB.pctv.toFixed(1)}%</Pill></TD>
      </tr>
    );
  };

  return (
    <div className={`min-h-screen transition-colors ${T.page}`}>
      {/* Page sub-header (FX, export) */}
      <div className={`border-b ${T.rowBorder} ${dark ? 'bg-slate-900/60' : 'bg-white'} px-5 py-3`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Factory className={`h-6 w-6 ${T.accentTxt}`} />
            <div>
              <div className={`text-xs uppercase tracking-widest ${T.accentTxt}`}>Executive Review</div>
              <h1 className={`text-xl font-bold ${T.title}`}>Monthly Management Report</h1>
              <div className={`text-[11px] ${T.muted}`}>Source: LNJ_Total · Period {period.from} → {period.to}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`rounded-lg border ${T.panel} px-3 py-1.5`}>
              <div className={`text-[11px] uppercase tracking-wider ${T.muted}`}>Exchange Rate (Today)</div>
              <div className="flex items-baseline gap-2">
                <div className={`text-2xl font-extrabold tabular-nums ${T.accentTxt}`}>₹{FX_RATE.toFixed(2)}</div>
                <div className={`text-xs ${T.muted}`}>INR / USD</div>
              </div>
            </div>
            <button onClick={exportCSV} className={`inline-flex items-center gap-2 rounded-lg border ${T.panel} px-3 py-2 text-sm font-semibold ${T.title} hover:opacity-90`}>
              <Download className="h-4 w-4" /> Export
            </button>
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-600 dark:text-amber-200 hover:bg-amber-500/20">
              PDF
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 py-5">
        {/* SECTION 1 — KPI Ribbon */}
        <SectionHeader T={T} n="01" title="Executive Summary" sub="Production &amp; cost · MTD basis" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {ribbon.map(r => (
            <KpiTile
              key={r.label}
              T={T}
              label={r.label}
              value={r.value}
              unit={r.unit}
              sub={r.sub}
              good={r.v.good}
              status={r.v.good ? 'pos' : 'neg'}
              varianceLabel={`${r.v.pctv >= 0 ? '+' : ''}${r.v.pctv.toFixed(1)}%`}
            />
          ))}
        </div>

        {/* SECTION 2 */}
        <SectionHeader T={T} n="02" title="LNJ Total View" sub="Management variance matrix" />
        <div className={`overflow-x-auto rounded-xl border ${T.panel}`}>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <TH T={T}>Particulars</TH><TH T={T}>UOM</TH>
                <TH T={T} right>Current (FTD)</TH><TH T={T} right>MTD</TH><TH T={T} right>MTD Target</TH>
                <TH T={T} right>BP Target</TH><TH T={T} right>Prev Month</TH>
                <TH T={T} right>Var vs Tgt</TH><TH T={T} right>Var vs Bud</TH>
              </tr>
            </thead>
            <tbody>
              {Object.entries(lnjTotal).filter(([n]) => !n.startsWith('_')).map(([n, r]) => renderLnjRow(n, r))}
              <tr><td colSpan={9} className={`${T.thBg} px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${T.accentTxt}`}>Specific Consumption · Recovery · Conversion</td></tr>
              {Object.entries(specs).map(([n, r]) => renderLnjRow(n, r))}
            </tbody>
          </table>
        </div>

        {/* SECTION 3 */}
        <SectionHeader T={T} n="03" title="Production Performance" sub="Can we still achieve target?" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[
            { name: 'Hydrate Alumina', r: hyd },
            { name: 'Calcined Alumina', r: cal },
          ].map(p => {
            const remaining = Math.max(1, (p.r.forecast ?? p.r.budget) - p.r.mtd);
            const askRate = remaining * 1000 / Math.max(1, 31 - 28);
            const gap = p.r.mtd - p.r.mtd_target;
            return (
              <div key={p.name} className={`rounded-xl border ${T.panel} p-4`}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className={`text-lg font-bold ${T.title}`}>{p.name}</h3>
                  <Pill good={gap >= 0}>{gap >= 0 ? '+' : ''}{fmt(gap, 2)} KT vs MTD Target</Pill>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div><div className={`text-[11px] uppercase ${T.muted}`}>Current (FTD)</div><div className={`text-2xl font-bold tabular-nums ${T.title}`}>{fmt(p.r.current, 2)}</div></div>
                  <div><div className={`text-[11px] uppercase ${T.muted}`}>MTD</div><div className={`text-2xl font-bold tabular-nums ${T.title}`}>{fmt(p.r.mtd, 2)}</div></div>
                  <div><div className={`text-[11px] uppercase ${T.muted}`}>MTD Target</div><div className={`text-2xl font-bold tabular-nums ${T.accentTxt}`}>{fmt(p.r.mtd_target, 2)}</div></div>
                  <div><div className={`text-[11px] uppercase ${T.muted}`}>Ask Rate (Tonnes/Day)</div><div className="text-2xl font-bold tabular-nums text-emerald-500 dark:text-emerald-300">{fmt(askRate, 0)}</div></div>
                </div>
                <div className={`mt-3 grid grid-cols-3 gap-3 border-t ${T.rowBorder} pt-3 text-[13px]`}>
                  <div><span className={T.muted}>BP Target</span><div className={`font-semibold ${T.title}`}>{fmt(p.r.budget, 2)} KT</div></div>
                  <div><span className={T.muted}>Month-End Forecast</span><div className={`font-semibold ${T.title}`}>{fmt(p.r.forecast, 2)} KT</div></div>
                  <div><span className={T.muted}>Prev Month</span><div className={`font-semibold ${T.title}`}>{fmt(p.r.prev, 2)} KT</div></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION 4 */}
        <SectionHeader T={T} n="04" title="Reasons For Low Production" sub="Ranked driver impact" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className={`lg:col-span-2 overflow-x-auto rounded-xl border ${T.panel}`}>
            <table className="w-full text-sm">
              <thead><tr><TH T={T}>Driver</TH><TH T={T} right>Impact %</TH><TH T={T} right>Loss (Tonnes)</TH><TH T={T} right>COP Impact ($/Tonne)</TH></tr></thead>
              <tbody>
                {lossItems.map(l => (
                  <tr key={l.name}>
                    <TD T={T} bold>{l.name}</TD>
                    <TD T={T} right mono>
                      <div className="inline-flex items-center gap-2">
                        <div className={`h-2 w-24 rounded ${dark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                          <div className="h-2 rounded bg-rose-500" style={{ width: `${l.impactPct * 2.5}%` }} />
                        </div>{l.impactPct}%
                      </div>
                    </TD>
                    <TD T={T} right mono>{(l.impactKt * 1000).toFixed(0)}</TD>
                    <TD T={T} right mono>+{l.impactCop.toFixed(1)}</TD>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300"><Sparkles className="h-4 w-4" /><span className="text-sm font-bold uppercase tracking-wider">AI Explanation</span></div>
            <p className={`mt-2 text-[14px] leading-relaxed ${T.title}`}>
              Hydrate MTD <b>{hyd.mtd.toFixed(2)} KT</b> vs target <b>{hyd.mtd_target.toFixed(2)} KT</b> — gap of <b>{(hyd.mtd - hyd.mtd_target).toFixed(2)} KT</b>.
              Plant utilization and recovery loss together account for ~54% of the shortfall. Recovery at <b>{rec.mtd.toFixed(2)}%</b> (target {rec.mtd_target.toFixed(2)}%) is the largest single COP driver.
              Shifting bauxite mix toward higher-THA OMC/Andru sources will simultaneously lift recovery and reduce caustic consumption.
            </p>
          </div>
        </div>

        {/* SECTION 5 — Quality Impact Intelligence (replaces Composite Quality Score) */}
        <SectionHeader T={T} n="05" title="Quality Impact Intelligence" sub="How bauxite quality moves COP" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: 'THA Impact', accent: 'rose', direction: '↓ 1%', cop: '+$4–5/Tonne', body: 'Every 1% decrease in Total Hydrate Alumina (THA) raises COP by approximately $4–5 per Tonne via lower recovery and higher caustic load.' },
            { label: 'RSA Impact', accent: 'rose', direction: '↑ 1%', cop: '+$15/Tonne', body: 'Every 1% increase in Reactive Silica (RSA) raises COP by approximately $15 per Tonne — the single most damaging quality lever.' },
            { label: 'Moisture Impact', accent: 'amber', direction: '↑ 1%', cop: '+$3/Tonne', body: 'Every 1% increase in feed moisture raises COP by approximately $3 per Tonne via additional steam and energy load.' },
          ].map(q => {
            const bd =
              q.accent === 'rose' ? 'border-l-4 border-l-rose-500 ring-1 ring-rose-500/20'
              : 'border-l-4 border-l-amber-500 ring-1 ring-amber-500/20';
            return (
              <div key={q.label} className={`rounded-xl border ${T.panel} ${bd} p-4`}>
                <div className="flex items-center gap-2">
                  <Beaker className={`h-4 w-4 ${T.accentTxt}`} />
                  <div className={`text-[12px] font-bold uppercase tracking-wider ${T.sub}`}>{q.label}</div>
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <div className={`text-3xl font-extrabold tabular-nums ${T.title}`}>{q.direction}</div>
                  <div className="text-lg font-bold text-rose-500 dark:text-rose-300">→ COP {q.cop}</div>
                </div>
                <p className={`mt-3 text-[13px] leading-relaxed ${T.sub}`}>{q.body}</p>
              </div>
            );
          })}
        </div>

        {/* SECTION 6 — Bauxite procurement */}
        <SectionHeader T={T} n="06" title="Bauxite Procurement Review" sub="Source-wise matrix" />
        <div className={`overflow-x-auto rounded-xl border ${T.panel}`}>
          <table className="w-full text-sm">
            <thead><tr><TH T={T}>Source</TH><TH T={T} right>Consumption (Tonnes)</TH><TH T={T} right>Share %</TH><TH T={T} right>THA %</TH><TH T={T} right>RS %</TH><TH T={T} right>Moisture %</TH><TH T={T} right>Landed $/Tonne</TH><TH T={T}>Status</TH></tr></thead>
            <tbody>
              {sourceRows.map(s => {
                const best = s.landed === Math.min(...sourceRows.map(x => x.landed));
                const worst = s.landed === Math.max(...sourceRows.map(x => x.landed));
                return (
                  <tr key={s.src}>
                    <TD T={T} bold>{s.src}</TD>
                    <TD T={T} right mono>{(s.kt * 1000).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</TD>
                    <TD T={T} right mono>{s.share.toFixed(2)}%</TD>
                    <TD T={T} right mono>{s.tha.toFixed(2)}</TD>
                    <TD T={T} right mono>{s.rs.toFixed(2)}</TD>
                    <TD T={T} right mono>{s.moisture.toFixed(2)}</TD>
                    <TD T={T} right mono bold>${s.landed}</TD>
                    <TD T={T}>{best && <Pill good>Best</Pill>}{worst && <Pill good={false}>Worst</Pill>}</TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 7 */}
        <SectionHeader T={T} n="07" title="Landed Bauxite Cost" sub="Source-wise breakdown" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className={`lg:col-span-2 overflow-x-auto rounded-xl border ${T.panel}`}>
            <table className="w-full text-sm">
              <thead><tr><TH T={T}>Source</TH><TH T={T} right>Receipt $/Tonne</TH><TH T={T} right>Logistics $/Tonne</TH><TH T={T} right>Handling $/Tonne</TH><TH T={T} right>Landed $/Tonne</TH><TH T={T} right>Var vs BP</TH></tr></thead>
              <tbody>
                {sourceRows.map(s => {
                  const receipt = Math.round(s.landed * 0.78);
                  const logistics = Math.round(s.landed * 0.16);
                  const handling = s.landed - receipt - logistics;
                  const vBud = ((s.landed - bx.budget) / bx.budget) * 100;
                  return (
                    <tr key={s.src}>
                      <TD T={T} bold>{s.src}</TD>
                      <TD T={T} right mono>{receipt}</TD>
                      <TD T={T} right mono>{logistics}</TD>
                      <TD T={T} right mono>{handling}</TD>
                      <TD T={T} right mono bold>${s.landed}</TD>
                      <TD T={T} right><Pill good={vBud <= 0}>{vBud >= 0 ? '+' : ''}{vBud.toFixed(1)}%</Pill></TD>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <KpiTile
            T={T}
            label="Weighted Avg Landed Cost"
            value={`$${wtdLanded.toFixed(1)}`}
            unit="/Tonne"
            sub={`Bauxite Cost MTD $${bx.mtd.toFixed(2)}/Tonne`}
            status={bx.mtd <= bx.budget ? 'pos' : 'neg'}
            footer={<div className="flex items-center justify-between"><span>vs BP ${bx.budget.toFixed(0)}</span><Pill good={bx.mtd <= bx.budget}>{((bx.mtd - bx.budget) / bx.budget * 100).toFixed(1)}%</Pill></div>}
          />
        </div>

        {/* SECTION 8 */}
        <SectionHeader T={T} n="08" title="Bauxite Mix" sub="What mix is driving today's COP?" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className={`overflow-x-auto rounded-xl border ${T.panel}`}>
            <table className="w-full text-sm">
              <thead><tr><TH T={T}>Source</TH><TH T={T} right>MTD %</TH><TH T={T} right>Prev Month %</TH><TH T={T} right>Δ pp</TH><TH T={T} right>Consumption (Tonnes)</TH></tr></thead>
              <tbody>
                {Object.entries(mix).map(([name, m]) => {
                  const d = m.share - m.prev_share;
                  const goodDir = name === 'Imported' ? d <= 0 : d >= 0;
                  return (
                    <tr key={name}>
                      <TD T={T} bold>{name}</TD>
                      <TD T={T} right mono bold>{m.share.toFixed(2)}%</TD>
                      <TD T={T} right mono>{m.prev_share.toFixed(2)}%</TD>
                      <TD T={T} right><Pill good={goodDir}>{d >= 0 ? '+' : ''}{d.toFixed(2)}pp</Pill></TD>
                      <TD T={T} right mono>{(m.consumption_kt * 1000).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</TD>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={`rounded-xl border ${T.panel} p-3`}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={[
                { d: 'Prev Month', OMC: mix.OMC.prev_share, Andru: mix.Andru.prev_share, Imported: mix.Imported.prev_share },
                { d: 'MTD',        OMC: mix.OMC.share,      Andru: mix.Andru.share,      Imported: mix.Imported.share },
              ]}>
                <CartesianGrid stroke={T.grid} vertical={false} />
                <XAxis dataKey="d" tick={{ fill: T.axis, fontSize: 12 }} />
                <YAxis tick={{ fill: T.axis, fontSize: 12 }} />
                <Tooltip contentStyle={{ background: T.ttBg, border: `1px solid ${T.ttBorder}`, color: T.ttTxt }} />
                <Legend />
                <Bar dataKey="OMC" stackId="a" fill="#0369a1" />
                <Bar dataKey="Andru" stackId="a" fill="#16a34a" />
                <Bar dataKey="Imported" stackId="a" fill="#d97706" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 9 — Conversion Cost */}
        <SectionHeader T={T} n="09" title="Conversion Cost Review" />
        <div className={`overflow-x-auto rounded-xl border ${T.panel}`}>
          <table className="w-full text-sm">
            <thead><tr><TH T={T}>Component</TH><TH T={T} right>Current (FTD)</TH><TH T={T} right>MTD</TH><TH T={T} right>MTD Target</TH><TH T={T} right>BP Target</TH><TH T={T} right>Variance</TH></tr></thead>
            <tbody>
              {(['  Caustic','  Lime','  Steam','  Power','  Furnace Oil','  Non Commodity Cost'] as const).map(k => {
                const r = lnjTotal[k]; const v = variance(r.mtd, r.mtd_target, 'lower');
                return (
                  <tr key={k}>
                    <TD T={T} bold>{k.trim()}</TD>
                    <TD T={T} right mono>{r.current.toFixed(2)}</TD>
                    <TD T={T} right mono>{r.mtd.toFixed(2)}</TD>
                    <TD T={T} right mono>{r.mtd_target.toFixed(2)}</TD>
                    <TD T={T} right mono>{r.budget.toFixed(2)}</TD>
                    <TD T={T} right><Pill good={v.good}>{v.pctv >= 0 ? '+' : ''}{v.pctv.toFixed(1)}%</Pill></TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 10 — Operational KPIs */}
        <SectionHeader T={T} n="10" title="Operational KPI Review" sub="Best Ever vs Current MTD" />
        <div className={`overflow-x-auto rounded-xl border ${T.panel}`}>
          <table className="w-full text-sm">
            <thead><tr><TH T={T}>KPI</TH><TH T={T}>UoM</TH><TH T={T} right>Best Ever</TH><TH T={T}>Period</TH><TH T={T} right>Current MTD</TH><TH T={T} right>Var from Best</TH><TH T={T} right>Impact on COP ($/Tonne)</TH></tr></thead>
            <tbody>
              {lnj.operational_best_vs_current.map(r => {
                const dv = ((r.current_mtd - r.best_ever) / r.best_ever) * 100;
                return (
                  <tr key={r.kpi}>
                    <TD T={T} bold>{r.kpi}</TD><TD T={T}>{r.uom}</TD>
                    <TD T={T} right mono>{r.best_ever.toFixed(2)}</TD>
                    <TD T={T}>{r.best_period}</TD>
                    <TD T={T} right mono>{r.current_mtd.toFixed(2)}</TD>
                    <TD T={T} right><Pill good={dv <= 0}>{dv >= 0 ? '+' : ''}{dv.toFixed(1)}%</Pill></TD>
                    <TD T={T} right mono>{r.impact_cop >= 0 ? '+' : ''}${r.impact_cop.toFixed(2)}</TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 11 — Procurement */}
        <SectionHeader T={T} n="11" title="Procurement Performance" />
        <div className={`overflow-x-auto rounded-xl border ${T.panel}`}>
          <table className="w-full text-sm">
            <thead><tr><TH T={T}>Commodity</TH><TH T={T}>UoM</TH><TH T={T} right>Best Receipt</TH><TH T={T} right>Best Consumption</TH><TH T={T} right>Current Receipt</TH><TH T={T} right>Current Consumption</TH><TH T={T} right>Variance</TH></tr></thead>
            <tbody>
              {lnj.procurement.map(r => {
                const ref = r.best_receipt || 1;
                const v = ((r.current_receipt - ref) / ref) * 100;
                return (
                  <tr key={r.commodity}>
                    <TD T={T} bold>{r.commodity}</TD>
                    <TD T={T}>{r.uom}</TD>
                    <TD T={T} right mono>{r.best_receipt.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TD>
                    <TD T={T} right mono>{r.best_consumption.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TD>
                    <TD T={T} right mono bold>{r.current_receipt.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TD>
                    <TD T={T} right mono>{r.current_consumption.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TD>
                    <TD T={T} right><Pill good={v <= 0}>{v >= 0 ? '+' : ''}{v.toFixed(1)}%</Pill></TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 12 — Trend */}
        <SectionHeader T={T} n="12" title="Monthly Trend Review" sub="Last 12 months · MTD anchored" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className={`rounded-xl border ${T.panel} p-3`}>
            <div className={`px-2 pb-1 text-sm font-bold ${T.title}`}>Production (Tonnes/Day) vs COP ($/Tonne)</div>
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={trendMonths}>
                <CartesianGrid stroke={T.grid} />
                <XAxis dataKey="month" tick={{ fill: T.axis, fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: T.axis, fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: T.axis, fontSize: 12 }} />
                <Tooltip contentStyle={{ background: T.ttBg, border: `1px solid ${T.ttBorder}`, color: T.ttTxt }} />
                <Legend />
                <Bar yAxisId="left" dataKey="production" fill="#0369a1" name="Production Tonnes/Day" />
                <Line yAxisId="right" type="monotone" dataKey="cop" stroke="#f59e0b" strokeWidth={2.5} name="COP $/Tonne" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className={`rounded-xl border ${T.panel} p-3`}>
            <div className={`px-2 pb-1 text-sm font-bold ${T.title}`}>Recovery · Bauxite · Conversion</div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trendMonths}>
                <CartesianGrid stroke={T.grid} />
                <XAxis dataKey="month" tick={{ fill: T.axis, fontSize: 12 }} />
                <YAxis tick={{ fill: T.axis, fontSize: 12 }} />
                <Tooltip contentStyle={{ background: T.ttBg, border: `1px solid ${T.ttBorder}`, color: T.ttTxt }} />
                <Legend />
                <Line type="monotone" dataKey="recovery" stroke="#15803d" strokeWidth={2.5} name="Recovery %" />
                <Line type="monotone" dataKey="bauxite" stroke="#0369a1" strokeWidth={2.5} name="Bauxite $/Tonne" />
                <Line type="monotone" dataKey="conversion" stroke="#dc2626" strokeWidth={2.5} name="Conversion $/Tonne" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 13 — Insights */}
        <SectionHeader T={T} n="13" title="Actionable Insights" sub="AI-generated executive summary" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((t, i) => (
            <div key={i} className={`rounded-xl border ${T.panel} p-4`}>
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300">
                <AlertTriangle className="h-4 w-4" /><span className="text-xs font-bold uppercase tracking-wider">Insight {i + 1}</span>
              </div>
              <p className={`mt-2 text-[14px] leading-relaxed ${T.title}`}>{t}</p>
            </div>
          ))}
        </div>

        <div className={`mt-8 border-t ${T.rowBorder} pt-4 text-center text-xs ${T.muted}`}>
          Vedanta Aluminium Lanjigarh · Executive Review · Source: LNJ_Total · {period.from} → {period.to}
        </div>
      </div>
    </div>
  );
}
