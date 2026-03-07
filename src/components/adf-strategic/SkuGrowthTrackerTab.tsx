import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { skuGrowthItems, topGrowingSkus, topDecliningSkus, skusFor80PctRevenue, fmtUsd, fmtPct } from '@/data/adfStrategicData';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

export const SkuGrowthTrackerTab: React.FC = () => {
  const [catFilter, setCatFilter] = useState('');

  const categories = useMemo(() => [...new Set(skuGrowthItems.map(s => s.category))].sort(), []);
  const filtered = useMemo(() => {
    if (!catFilter) return skuGrowthItems.slice(0, 100);
    return skuGrowthItems.filter(s => s.category === catFilter).slice(0, 100);
  }, [catFilter]);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-semibold text-gray-700">SKUs for 80% Revenue</span>
            <InfoTooltip text="Pareto count: how many SKUs account for 80% of total revenue. Lower = more efficient portfolio." />
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-2">{skusFor80PctRevenue || 'N/A'}</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-800">Top Growing SKUs</span>
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-2">{topGrowingSkus.length}</div>
          <div className="text-[10px] text-emerald-600">Growth &gt;30%, CY Rev &gt;$10K</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-600" />
            <span className="text-xs font-semibold text-red-800">Top Declining SKUs</span>
          </div>
          <div className="text-2xl font-bold text-red-700 mt-2">{topDecliningSkus.length}</div>
          <div className="text-[10px] text-red-600">Decline &gt;20%, CY Rev &gt;$10K</div>
        </div>
      </div>

      {/* Top Growing */}
      {topGrowingSkus.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">Top Growing SKUs</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Item Code</TableHead>
                <TableHead className="text-[10px]">Item Name</TableHead>
                <TableHead className="text-[10px]">Category</TableHead>
                <TableHead className="text-[10px]">Product Family</TableHead>
                <TableHead className="text-[10px] text-right">PY Rev</TableHead>
                <TableHead className="text-[10px] text-right">CY Rev</TableHead>
                <TableHead className="text-[10px] text-right">Growth %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topGrowingSkus.map((s, i) => (
                <TableRow key={i}>
                  <TableCell className="text-[10px] font-medium">{s.itemCode}</TableCell>
                  <TableCell className="text-[10px]">{s.itemName}</TableCell>
                  <TableCell className="text-[10px]">{s.category}</TableCell>
                  <TableCell className="text-[10px]">{s.productFamily}</TableCell>
                  <TableCell className="text-[10px] text-right">{fmtUsd(s.pyRev)}</TableCell>
                  <TableCell className="text-[10px] text-right">{fmtUsd(s.cyRev)}</TableCell>
                  <TableCell className="text-[10px] text-right font-semibold text-emerald-600">{fmtPct(s.growthPct)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Top Declining */}
      {topDecliningSkus.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">Top Declining SKUs</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Item Code</TableHead>
                <TableHead className="text-[10px]">Item Name</TableHead>
                <TableHead className="text-[10px]">Category</TableHead>
                <TableHead className="text-[10px]">Product Family</TableHead>
                <TableHead className="text-[10px] text-right">PY Rev</TableHead>
                <TableHead className="text-[10px] text-right">CY Rev</TableHead>
                <TableHead className="text-[10px] text-right">Growth %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDecliningSkus.map((s, i) => (
                <TableRow key={i}>
                  <TableCell className="text-[10px] font-medium">{s.itemCode}</TableCell>
                  <TableCell className="text-[10px]">{s.itemName}</TableCell>
                  <TableCell className="text-[10px]">{s.category}</TableCell>
                  <TableCell className="text-[10px]">{s.productFamily}</TableCell>
                  <TableCell className="text-[10px] text-right">{fmtUsd(s.pyRev)}</TableCell>
                  <TableCell className="text-[10px] text-right">{fmtUsd(s.cyRev)}</TableCell>
                  <TableCell className="text-[10px] text-right font-semibold text-red-600">{fmtPct(s.growthPct)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Full SKU Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-sm font-semibold text-gray-700">All SKUs <InfoTooltip text="SKU-level growth; rationalization candidates = low Rev/SKU + declining" /></h3>
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
            className="text-[10px] border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">Item Code</TableHead>
              <TableHead className="text-[10px]">Item Name</TableHead>
              <TableHead className="text-[10px]">Category</TableHead>
              <TableHead className="text-[10px]">Product Family</TableHead>
              <TableHead className="text-[10px] text-right">PY Rev</TableHead>
              <TableHead className="text-[10px] text-right">CY Rev</TableHead>
              <TableHead className="text-[10px] text-right">Growth %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((s, i) => (
              <TableRow key={i}>
                <TableCell className="text-[10px] font-medium">{s.itemCode}</TableCell>
                <TableCell className="text-[10px]">{s.itemName}</TableCell>
                <TableCell className="text-[10px]">{s.category}</TableCell>
                <TableCell className="text-[10px]">{s.productFamily}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(s.pyRev)}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(s.cyRev)}</TableCell>
                <TableCell className={`text-[10px] text-right font-semibold ${s.growthPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(s.growthPct)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length >= 100 && <div className="p-3 text-[10px] text-gray-400 text-center">Showing first 100 results. Use filter to narrow down.</div>}
      </div>
    </div>
  );
};
