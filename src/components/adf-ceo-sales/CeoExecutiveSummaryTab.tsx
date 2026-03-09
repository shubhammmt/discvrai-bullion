import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, Scale, Percent, Globe } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';
import { ceoExecutiveSummary, fmtInr, fmtPct, fmtNum } from '@/data/adfCeoSalesData';

const signalColor = (signal: string) => {
  if (signal.includes('Strong') || signal.includes('🚀')) return 'bg-emerald-100 text-emerald-800';
  if (signal.includes('Growing') || signal.includes('✅')) return 'bg-blue-100 text-blue-800';
  if (signal.includes('Degrow') || signal.includes('🔻')) return 'bg-red-100 text-red-800';
  if (signal.includes('Slow') || signal.includes('⚠️')) return 'bg-amber-100 text-amber-800';
  return 'bg-gray-100 text-gray-700';
};

const GrowthBadge = ({ v }: { v: number }) => (
  <span className={`flex items-center gap-0.5 text-xs font-semibold ${v >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
    {v >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
    {fmtPct(v)}
  </span>
);

export const CeoExecutiveSummaryTab: React.FC = () => {
  const s = ceoExecutiveSummary;
  return (
    <div className="space-y-6">
      {/* KPI Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase">
            <BarChart3 className="w-4 h-4" /> Revenue 9M
            <InfoTooltip text="Nine months (Apr–Dec) of FY26. All values in ₹ Lakhs." />
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{fmtInr(s.revenue9M.fy26)}</div>
          <div className="flex items-center gap-2 mt-2">
            <GrowthBadge v={s.revenue9M.growthPct} />
            <span className="text-xs text-gray-500">{s.revenue9M.label}</span>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase">
            <Scale className="w-4 h-4" /> Volume Growth
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{(s.volumeGrowth.value * 100).toFixed(1)}%</div>
          <div className="text-xs text-gray-500 mt-2">{s.volumeGrowth.label}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase">
            <Percent className="w-4 h-4" /> Realization Growth
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{(s.realizationGrowth.value * 100).toFixed(1)}%</div>
          <div className="text-xs text-gray-500 mt-2">{s.realizationGrowth.label}</div>
        </div>
      </div>

      {/* KPI Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase">
            Gross Margin
            <InfoTooltip text="(Revenue − Cost) ÷ Revenue. Δ pp = change in percentage points." />
          </div>
          <div className="text-xl font-bold text-gray-900 mt-1">{s.grossMargin9M.fy26}%</div>
          <div className="text-xs text-gray-500 mt-1">{s.grossMargin9M.label}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase">
            Q3 Growth
            <InfoTooltip text="Q3 FY26 vs Q3 FY25 growth." />
          </div>
          <div className="text-xl font-bold text-gray-900 mt-1">{fmtInr(s.q3Growth.fy26)}</div>
          <div className="flex items-center gap-2 mt-1">
            <GrowthBadge v={s.q3Growth.growthPct} />
            <span className="text-xs text-gray-500">{s.q3Growth.label}</span>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-medium text-gray-500 uppercase">#1 Category</div>
          <div className="text-xl font-bold text-gray-900 mt-1">{s.topCategory.name}</div>
          <div className="text-xs text-gray-500 mt-1">{s.topCategory.label}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase">
            <Globe className="w-4 h-4" /> #1 Zone
          </div>
          <div className="text-xl font-bold text-gray-900 mt-1">{s.topZone.name}</div>
          <div className="text-xs text-gray-500 mt-1">{s.topZone.label}</div>
        </div>
      </div>

      {/* Category Signals */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm overflow-auto">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          Category Signals
          <InfoTooltip text="🚀 Strong Grow, ✅ Growing, 🔻 Degrow, ⚠️ Slow — based on 9M and Q3 growth." />
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs w-[200px]">Category</TableHead>
              <TableHead className="text-xs text-right w-[140px]">9M FY26 (₹L)</TableHead>
              <TableHead className="text-xs text-right w-[120px]">9M Gr%</TableHead>
              <TableHead className="text-xs text-right w-[120px]">Q3 Gr%</TableHead>
              <TableHead className="text-xs w-[140px]">Signal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {s.categorySignals.map((c: any) => (
              <TableRow key={c.name}>
                <TableCell className="text-xs font-medium">{c.name}</TableCell>
                <TableCell className="text-xs text-right">{fmtNum(c.value9M)}</TableCell>
                <TableCell className="text-xs text-right"><GrowthBadge v={c.growth9MPct} /></TableCell>
                <TableCell className="text-xs text-right"><GrowthBadge v={c.growthQ3Pct} /></TableCell>
                <TableCell><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${signalColor(c.signal)}`}>{c.signal}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Brand Signals */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm overflow-auto">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Brand Signals</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Brand</TableHead>
              <TableHead className="text-xs text-right">9M FY26 (₹L)</TableHead>
              <TableHead className="text-xs text-right">9M Gr%</TableHead>
              <TableHead className="text-xs text-right">Q3 Gr%</TableHead>
              <TableHead className="text-xs">Signal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {s.brandSignals.map((b: any) => (
              <TableRow key={b.name}>
                <TableCell className="text-xs font-medium">{b.name}</TableCell>
                <TableCell className="text-xs text-right">{fmtNum(b.value9M)}</TableCell>
                <TableCell className="text-xs text-right"><GrowthBadge v={b.growth9MPct} /></TableCell>
                <TableCell className="text-xs text-right"><GrowthBadge v={b.growthQ3Pct} /></TableCell>
                <TableCell><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${signalColor(b.signal)}`}>{b.signal}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
