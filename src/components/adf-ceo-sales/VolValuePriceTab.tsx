import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';
import { volValuePrice, fmtNum, fmtPct } from '@/data/adfCeoSalesData';

export const VolValuePriceTab: React.FC = () => {
  const v = volValuePrice;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Volume Growth', value: `${(v.volGrowth * 100).toFixed(1)}%` },
          { label: 'Value Growth', value: `${(v.valGrowth * 100).toFixed(1)}%` },
          { label: 'Price Realization Δ', value: `₹${v.priceRealization}/kg` },
          { label: 'Value from Volume', value: `₹${fmtNum(v.valueFromVolume)} L`, tooltip: 'Revenue increase attributable to volume growth (vs price change).' },
        ].map((k) => (
          <div key={k.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase">
              {k.label}
              {k.tooltip && <InfoTooltip text={k.tooltip} />}
            </div>
            <div className="text-xl font-bold text-gray-900 mt-1">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm overflow-auto">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Volume vs Value Decomposition</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Category</TableHead>
              <TableHead className="text-xs text-right">Vol CY (MT)</TableHead>
              <TableHead className="text-xs text-right">Vol PY</TableHead>
              <TableHead className="text-xs text-right">Vol Gr%</TableHead>
              <TableHead className="text-xs text-right">Val CY (₹L)</TableHead>
              <TableHead className="text-xs text-right">Val PY</TableHead>
              <TableHead className="text-xs text-right">Val Gr%</TableHead>
              <TableHead className="text-xs text-right">₹/kg CY</TableHead>
              <TableHead className="text-xs text-right">₹/kg PY</TableHead>
              <TableHead className="text-xs text-right">Price Δ</TableHead>
              <TableHead className="text-xs text-right">Val from Vol</TableHead>
              <TableHead className="text-xs text-right">Val from Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {v.categories.map((c: any) => (
              <TableRow key={c.category} className={c.category === 'TOTAL' ? 'font-bold bg-gray-50' : ''}>
                <TableCell className="text-xs font-medium">{c.category}</TableCell>
                <TableCell className="text-xs text-right">{fmtNum(c.volCy)}</TableCell>
                <TableCell className="text-xs text-right">{fmtNum(c.volPy)}</TableCell>
                <TableCell className={`text-xs text-right font-semibold ${c.volGrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(c.volGrPct)}</TableCell>
                <TableCell className="text-xs text-right">{fmtNum(c.valCy)}</TableCell>
                <TableCell className="text-xs text-right">{fmtNum(c.valPy)}</TableCell>
                <TableCell className={`text-xs text-right font-semibold ${c.valGrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(c.valGrPct)}</TableCell>
                <TableCell className="text-xs text-right">{fmtNum(c.pricePerKgCy)}</TableCell>
                <TableCell className="text-xs text-right">{fmtNum(c.pricePerKgPy)}</TableCell>
                <TableCell className={`text-xs text-right ${c.priceDelta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{c.priceDelta >= 0 ? '+' : ''}{fmtNum(c.priceDelta)}</TableCell>
                <TableCell className={`text-xs text-right ${c.valFromVol >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtNum(c.valFromVol)}</TableCell>
                <TableCell className={`text-xs text-right ${c.valFromPrice >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtNum(c.valFromPrice)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
