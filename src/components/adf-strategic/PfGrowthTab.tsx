import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { pfClassification, pfFastGrowth, pfGrowth, pfStable, pfDeclining, pfFastDecline, pfNew, pfDisc, topPfs, fmtUsd, fmtPct } from '@/data/adfStrategicData';
import type { PfGrowthItem } from '@/data/adfStrategicData';

const classDataMap: Record<string, PfGrowthItem[]> = {
  '🚀 FAST GROWTH': pfFastGrowth,
  '📈 GROWTH': pfGrowth,
  '➡️ STABLE': pfStable,
  '📉 DECLINING': pfDeclining,
  '🔴 FAST DECLINE': pfFastDecline,
  '🆕 NEW': pfNew,
  '💀 DISC': pfDisc,
};

const classBg: Record<string, string> = {
  '🚀 FAST GROWTH': 'bg-emerald-100 text-emerald-800',
  '📈 GROWTH': 'bg-blue-100 text-blue-800',
  '➡️ STABLE': 'bg-gray-100 text-gray-800',
  '📉 DECLINING': 'bg-amber-100 text-amber-800',
  '🔴 FAST DECLINE': 'bg-red-100 text-red-800',
  '🆕 NEW': 'bg-purple-100 text-purple-800',
  '💀 DISC': 'bg-gray-200 text-gray-600',
};

export const PfGrowthTab: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedItems = selected ? classDataMap[selected] || [] : [];

  return (
    <div className="space-y-6">
      {/* Classification Summary */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Product Family Classification</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {pfClassification.map((c) => (
            <button
              key={c.class}
              onClick={() => setSelected(selected === c.class ? null : c.class)}
              className={`rounded-xl p-3 text-left border transition-all ${selected === c.class ? 'ring-2 ring-blue-500 border-blue-300' : 'border-gray-200 hover:border-gray-300'} bg-white shadow-sm`}
            >
              <div className="text-sm mb-1">{c.class}</div>
              <div className="text-lg font-bold text-gray-900">{c.count}</div>
              <div className="text-[10px] text-gray-500">{fmtUsd(c.cyRevenue)}</div>
              <div className="text-[10px] text-gray-400">{c.pctRev}% of rev</div>
              <div className={`inline-flex rounded-full px-1.5 py-0.5 text-[9px] font-semibold mt-1 ${classBg[c.class] || 'bg-gray-100'}`}>{c.strategy}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Class Drill-down */}
      {selected && selectedItems.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">{selected} — {selectedItems.length} Product Families</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Product Family</TableHead>
                <TableHead className="text-[10px]">Category</TableHead>
                <TableHead className="text-[10px]">Fin Group</TableHead>
                <TableHead className="text-[10px] text-right">PY Rev</TableHead>
                <TableHead className="text-[10px] text-right">CY Rev</TableHead>
                <TableHead className="text-[10px] text-right">Growth %</TableHead>
                <TableHead className="text-[10px] text-right">Share</TableHead>
                <TableHead className="text-[10px] text-right">SKUs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedItems.map((p, i) => (
                <TableRow key={i}>
                  <TableCell className="text-[10px] font-medium">{p.productFamily}</TableCell>
                  <TableCell className="text-[10px]">{p.category}</TableCell>
                  <TableCell className="text-[10px]">{p.finGroup}</TableCell>
                  <TableCell className="text-[10px] text-right">{fmtUsd(p.pyRev)}</TableCell>
                  <TableCell className="text-[10px] text-right">{fmtUsd(p.cyRev)}</TableCell>
                  <TableCell className={`text-[10px] text-right font-semibold ${p.growthPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(p.growthPct)}</TableCell>
                  <TableCell className="text-[10px] text-right">{p.share}%</TableCell>
                  <TableCell className="text-[10px] text-right">{p.skus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Top 50 PFs */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Top 50 Product Families</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">#</TableHead>
              <TableHead className="text-[10px]">Product Family</TableHead>
              <TableHead className="text-[10px]">Category</TableHead>
              <TableHead className="text-[10px]">Class</TableHead>
              <TableHead className="text-[10px] text-right">PY Rev</TableHead>
              <TableHead className="text-[10px] text-right">CY Rev</TableHead>
              <TableHead className="text-[10px] text-right">Growth $</TableHead>
              <TableHead className="text-[10px] text-right">Growth %</TableHead>
              <TableHead className="text-[10px] text-right">Share</TableHead>
              <TableHead className="text-[10px] text-right">SKUs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topPfs.slice(0, 50).map((p) => (
              <TableRow key={p.rank}>
                <TableCell className="text-[10px]">{p.rank}</TableCell>
                <TableCell className="text-[10px] font-medium">{p.productFamily}</TableCell>
                <TableCell className="text-[10px]">{p.category}</TableCell>
                <TableCell>
                  <span className={`inline-flex rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${classBg[p.class] || 'bg-gray-100'}`}>{p.class}</span>
                </TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(p.pyRev)}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(p.cyRev)}</TableCell>
                <TableCell className={`text-[10px] text-right ${p.growthUsd >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtUsd(p.growthUsd)}</TableCell>
                <TableCell className={`text-[10px] text-right font-semibold ${p.growthPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(p.growthPct)}</TableCell>
                <TableCell className="text-[10px] text-right">{p.share}%</TableCell>
                <TableCell className="text-[10px] text-right">{p.skus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
