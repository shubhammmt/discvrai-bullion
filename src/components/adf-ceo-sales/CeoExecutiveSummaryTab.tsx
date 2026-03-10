import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, Scale, Percent, Globe, Crown, Zap } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';
import { ceoExecutiveSummary, fmtInr, fmtPct, fmtNum } from '@/data/adfCeoSalesData';

const signalColor = (signal: string) => {
  if (signal.includes('Strong') || signal.includes('🚀')) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (signal.includes('Growing') || signal.includes('✅')) return 'bg-blue-50 text-blue-700 border border-blue-200';
  if (signal.includes('Degrow') || signal.includes('🔻')) return 'bg-red-50 text-red-700 border border-red-200';
  if (signal.includes('Slow') || signal.includes('⚠️')) return 'bg-amber-50 text-amber-700 border border-amber-200';
  return 'bg-gray-50 text-gray-600 border border-gray-200';
};

const GrowthBadge = ({ v, align }: { v: number; align?: 'right' | 'left' }) => (
  <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${align === 'right' ? 'justify-end' : ''} ${v >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
    {v >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
    {fmtPct(v)}
  </span>
);

export const CeoExecutiveSummaryTab: React.FC = () => {
  const s = ceoExecutiveSummary;
  return (
    <div className="space-y-6">
      {/* KPI Row 1 — Hero metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Revenue */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 text-white shadow-lg shadow-indigo-200/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-100">
            <BarChart3 className="w-4 h-4" /> Revenue 9M
            <InfoTooltip text="Nine months (Apr–Dec) of FY26. All values in ₹ Lakhs." />
          </div>
          <div className="text-3xl font-extrabold mt-2 tracking-tight">{fmtInr(s.revenue9M.fy26)}</div>
          <div className="flex items-center gap-2 mt-3">
            <span className={`inline-flex items-center gap-1 text-sm font-bold px-2.5 py-0.5 rounded-full ${s.revenue9M.growthPct >= 0 ? 'bg-white/20 text-white' : 'bg-red-400/30 text-red-100'}`}>
              {s.revenue9M.growthPct >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {fmtPct(s.revenue9M.growthPct)}
            </span>
            <span className="text-xs text-indigo-200">{s.revenue9M.label}</span>
          </div>
        </div>

        {/* Volume Growth */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-100">
            <Scale className="w-4 h-4" /> Volume Growth
          </div>
          <div className="text-3xl font-extrabold mt-2 tracking-tight">{(s.volumeGrowth.value * 100).toFixed(1)}%</div>
          <div className="text-xs text-emerald-100 mt-3">{s.volumeGrowth.label}</div>
        </div>

        {/* Realization Growth */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-lg shadow-sky-200/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-100">
            <Percent className="w-4 h-4" /> Realization Growth
          </div>
          <div className="text-3xl font-extrabold mt-2 tracking-tight">{(s.realizationGrowth.value * 100).toFixed(1)}%</div>
          <div className="text-xs text-sky-100 mt-3">{s.realizationGrowth.label}</div>
        </div>
      </div>

      {/* KPI Row 2 — Supporting metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Gross Margin
            <InfoTooltip text="(Revenue − Cost) ÷ Revenue. Δ pp = change in percentage points." />
          </div>
          <div className="text-2xl font-extrabold text-gray-900 mt-2">{s.grossMargin9M.fy26}%</div>
          <div className="text-xs text-gray-500 mt-1.5">{s.grossMargin9M.label}</div>
        </div>

        <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> Q3 Growth
            <InfoTooltip text="Q3 FY26 vs Q3 FY25 growth." />
          </div>
          <div className="text-2xl font-extrabold text-gray-900 mt-2">{fmtInr(s.q3Growth.fy26)}</div>
          <div className="flex items-center gap-2 mt-1.5">
            <GrowthBadge v={s.q3Growth.growthPct} />
            <span className="text-xs text-gray-500">{s.q3Growth.label}</span>
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" /> #1 Category
          </div>
          <div className="text-xl font-extrabold text-gray-900 mt-2">{s.topCategory.name}</div>
          <div className="text-xs text-gray-500 mt-1.5">{s.topCategory.label}</div>
        </div>

        <div className="rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            <Globe className="w-4 h-4" /> #1 Zone
          </div>
          <div className="text-xl font-extrabold text-gray-900 mt-2">{s.topZone.name}</div>
          <div className="text-xs text-gray-500 mt-1.5">{s.topZone.label}</div>
        </div>
      </div>

      {/* Category Signals */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm overflow-auto">
        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          Category Signals
          <InfoTooltip text="🚀 Strong Grow, ✅ Growing, 🔻 Degrow, ⚠️ Slow — based on 9M and Q3 growth." />
        </h3>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100">
              <TableHead className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[220px]">Category</TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right w-[150px]">9M FY26 (₹L)</TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right w-[130px]">9M Gr%</TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right w-[130px]">Q3 Gr%</TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[150px]">Signal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {s.categorySignals.map((c: any, i: number) => (
              <TableRow key={c.name} className={`border-gray-50 transition-colors hover:bg-gray-50/80 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                <TableCell className="text-xs font-semibold text-gray-800">{c.name}</TableCell>
                <TableCell className="text-xs text-right font-medium text-gray-700">{fmtNum(c.value9M)}</TableCell>
                <TableCell className="text-xs text-right"><GrowthBadge v={c.growth9MPct} align="right" /></TableCell>
                <TableCell className="text-xs text-right"><GrowthBadge v={c.growthQ3Pct} align="right" /></TableCell>
                <TableCell><span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${signalColor(c.signal)}`}>{c.signal}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Brand Signals */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm overflow-auto">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Brand Signals</h3>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100">
              <TableHead className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[220px]">Brand</TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right w-[150px]">9M FY26 (₹L)</TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right w-[130px]">9M Gr%</TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right w-[130px]">Q3 Gr%</TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-[150px]">Signal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {s.brandSignals.map((b: any, i: number) => (
              <TableRow key={b.name} className={`border-gray-50 transition-colors hover:bg-gray-50/80 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                <TableCell className="text-xs font-semibold text-gray-800">{b.name}</TableCell>
                <TableCell className="text-xs text-right font-medium text-gray-700">{fmtNum(b.value9M)}</TableCell>
                <TableCell className="text-xs text-right"><GrowthBadge v={b.growth9MPct} align="right" /></TableCell>
                <TableCell className="text-xs text-right"><GrowthBadge v={b.growthQ3Pct} align="right" /></TableCell>
                <TableCell><span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${signalColor(b.signal)}`}>{b.signal}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
