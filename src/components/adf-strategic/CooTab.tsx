import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { categoryManufacturing, topPfsSkuRedundancy, fmtUsd, fmtPct, fmtNum } from '@/data/adfStrategicData';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';

const actionColor = (action: string) => {
  if (action.includes('RATIONALIZE')) return 'bg-red-100 text-red-800';
  if (action.includes('MONITOR')) return 'bg-amber-100 text-amber-800';
  return 'bg-emerald-100 text-emerald-800';
};

export const CooTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Category Manufacturing Complexity */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Category Manufacturing Complexity</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">
            SKU/PF &gt; 2.5 = rationalization candidate
            <InfoTooltip text="SKUs per Product Family. >2.5 = rationalization candidate." />
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">Category</TableHead>
              <TableHead className="text-[10px]">Fin Group</TableHead>
              <TableHead className="text-[10px]">Group</TableHead>
              <TableHead className="text-[10px] text-right">CY SKUs</TableHead>
              <TableHead className="text-[10px] text-right">PY SKUs</TableHead>
              <TableHead className="text-[10px] text-right">Δ SKU</TableHead>
              <TableHead className="text-[10px] text-right">CY Revenue</TableHead>
              <TableHead className="text-[10px] text-right">Rev/SKU</TableHead>
              <TableHead className="text-[10px] text-right">Rev/SKU Δ%</TableHead>
              <TableHead className="text-[10px] text-right">PFs</TableHead>
              <TableHead className="text-[10px] text-right">SKU/PF</TableHead>
              <TableHead className="text-[10px] text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryManufacturing.map((c, i) => (
              <TableRow key={i}>
                <TableCell className="text-[10px] font-medium">{c.category}</TableCell>
                <TableCell className="text-[10px]">{c.finGroup}</TableCell>
                <TableCell className="text-[10px]">{c.group}</TableCell>
                <TableCell className="text-[10px] text-right">{c.cySkus}</TableCell>
                <TableCell className="text-[10px] text-right">{c.pySkus}</TableCell>
                <TableCell className={`text-[10px] text-right ${c.skuDelta > 0 ? 'text-red-600' : c.skuDelta < 0 ? 'text-emerald-600' : ''}`}>{c.skuDelta > 0 ? '+' : ''}{c.skuDelta}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(c.cyRevenue)}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(c.revPerSku)}</TableCell>
                <TableCell className={`text-[10px] text-right ${c.revPerSkuDeltaPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(c.revPerSkuDeltaPct)}</TableCell>
                <TableCell className="text-[10px] text-right">{c.cyPfs}</TableCell>
                <TableCell className={`text-[10px] text-right font-semibold ${c.skuPerPf > 2.5 ? 'text-red-700' : ''}`}>{c.skuPerPf.toFixed(1)}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold ${actionColor(c.action)}`}>
                    {c.action}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Top PFs SKU Redundancy */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Top Product Families — SKU Redundancy</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">
            PFs with 5+ SKUs = rationalization candidates. Saveable = SKUs to eliminate.
            <InfoTooltip text="PFs with 5+ SKUs = rationalization candidates. Saveable = SKUs to eliminate." />
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">Product Family</TableHead>
              <TableHead className="text-[10px]">Category</TableHead>
              <TableHead className="text-[10px] text-right">SKUs</TableHead>
              <TableHead className="text-[10px] text-right">Brands</TableHead>
              <TableHead className="text-[10px] text-right">Revenue</TableHead>
              <TableHead className="text-[10px] text-right">Rev/SKU</TableHead>
              <TableHead className="text-[10px] text-right">Target</TableHead>
              <TableHead className="text-[10px] text-right">Saveable</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topPfsSkuRedundancy.map((p, i) => (
              <TableRow key={i}>
                <TableCell className="text-[10px] font-medium">{p.productFamily}</TableCell>
                <TableCell className="text-[10px]">{p.category}</TableCell>
                <TableCell className="text-[10px] text-right font-semibold">{p.skus}</TableCell>
                <TableCell className="text-[10px] text-right">{p.brands}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(p.revenue)}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(p.revPerSku)}</TableCell>
                <TableCell className="text-[10px] text-right">{p.target}</TableCell>
                <TableCell className="text-[10px] text-right font-bold text-red-700">{p.saveable}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
