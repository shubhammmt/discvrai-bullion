import React from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { priceRealization, totalValueLeakage, customerConcentration, sharperMetrics, fmtUsd, fmtPct, fmtNum } from '@/data/adfStrategicData';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';

export const CfoTab: React.FC = () => {
  const sorted = [...priceRealization].sort((a, b) => b.valueLeak - a.valueLeak);
  const dc = sharperMetrics.decliningCustomers;

  return (
    <div className="space-y-6">
      {/* Total Value Leakage */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span className="text-sm font-semibold text-red-800">Total Value Leakage</span>
          <InfoTooltip text="Margin erosion when CY $/KG < PY $/KG. (PY $/KG − CY $/KG) × CY KGs." />
        </div>
        <div className="text-3xl font-bold text-red-700 mt-2">{fmtUsd(totalValueLeakage)}</div>
        <div className="text-xs text-red-500 mt-1">Sum of margin erosion across all categories where CY $/KG &lt; PY $/KG</div>
      </div>

      {/* Price Realization Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Price Realization & Value Leakage</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">Category</TableHead>
              <TableHead className="text-[10px]">Fin Group</TableHead>
              <TableHead className="text-[10px] text-right">PY Rev</TableHead>
              <TableHead className="text-[10px] text-right">CY Rev</TableHead>
              <TableHead className="text-[10px] text-right">Rev Δ%</TableHead>
              <TableHead className="text-[10px] text-right">PY KGs</TableHead>
              <TableHead className="text-[10px] text-right">CY KGs</TableHead>
              <TableHead className="text-[10px] text-right">Vol Δ%</TableHead>
              <TableHead className="text-[10px] text-right">PY $/KG</TableHead>
              <TableHead className="text-[10px] text-right">CY $/KG</TableHead>
              <TableHead className="text-[10px] text-right">Price Δ%</TableHead>
              <TableHead className="text-[10px] text-right">Value Leak <InfoTooltip text="Margin erosion when CY $/KG < PY $/KG. (PY $/KG − CY $/KG) × CY KGs." /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((r, i) => (
              <TableRow key={i} className={r.valueLeak > 0 ? 'bg-red-50/50' : ''}>
                <TableCell className="text-[10px] font-medium">{r.category}</TableCell>
                <TableCell className="text-[10px]">{r.finGroup}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(r.pyRev)}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(r.cyRev)}</TableCell>
                <TableCell className={`text-[10px] text-right font-semibold ${r.revDeltaPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.revDeltaPct)}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtNum(r.pyKgs)}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtNum(r.cyKgs)}</TableCell>
                <TableCell className={`text-[10px] text-right ${r.volDeltaPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.volDeltaPct)}</TableCell>
                <TableCell className="text-[10px] text-right">${r.pyPerKg.toFixed(2)}</TableCell>
                <TableCell className="text-[10px] text-right">${r.cyPerKg.toFixed(2)}</TableCell>
                <TableCell className={`text-[10px] text-right font-semibold ${r.priceDeltaPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.priceDeltaPct)}</TableCell>
                <TableCell className={`text-[10px] text-right font-bold ${r.valueLeak > 0 ? 'text-red-700' : 'text-gray-400'}`}>{r.valueLeak > 0 ? fmtUsd(r.valueLeak) : '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Customer Concentration */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Customer Concentration — Top 20</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">Top 5 = {customerConcentration.find(c => c.rank === 5)?.cumShare}% | Top 10 = {customerConcentration.find(c => c.rank === 10)?.cumShare}% of revenue</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">#</TableHead>
              <TableHead className="text-[10px]">Customer</TableHead>
              <TableHead className="text-[10px]">Zone</TableHead>
              <TableHead className="text-[10px] text-right">PY Rev</TableHead>
              <TableHead className="text-[10px] text-right">CY Rev</TableHead>
              <TableHead className="text-[10px] text-right">Growth %</TableHead>
              <TableHead className="text-[10px] text-right">CY Share</TableHead>
              <TableHead className="text-[10px] text-right">Cum Share</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerConcentration.map((c) => (
              <TableRow key={c.rank}>
                <TableCell className="text-[10px] font-medium">{c.rank}</TableCell>
                <TableCell className="text-[10px] font-medium">{c.customer}</TableCell>
                <TableCell className="text-[10px]">{c.zone}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(c.pyRev)}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(c.cyRev)}</TableCell>
                <TableCell className={`text-[10px] text-right font-semibold ${c.growthPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(c.growthPct)}</TableCell>
                <TableCell className="text-[10px] text-right">{c.cyShare}%</TableCell>
                <TableCell className="text-[10px] text-right font-medium">{c.cumShare}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Declining Customers */}
      {dc.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                Declining Customers
                <InfoTooltip text="Churn risk; cross-reference with receivables aging" />
              </h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Customers with negative YoY growth</p>
            </div>
            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">{sharperMetrics.decliningCustomerCount}</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Customer</TableHead>
                <TableHead className="text-[10px]">Zone</TableHead>
                <TableHead className="text-[10px] text-right">CY Rev</TableHead>
                <TableHead className="text-[10px] text-right">Growth %</TableHead>
                <TableHead className="text-[10px] text-right">CY Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dc.map((c, i) => (
                <TableRow key={i}>
                  <TableCell className="text-[10px] font-medium">{c.customer}</TableCell>
                  <TableCell className="text-[10px]">{c.zone}</TableCell>
                  <TableCell className="text-[10px] text-right">{fmtUsd(c.cyRev)}</TableCell>
                  <TableCell className="text-[10px] text-right font-semibold text-red-600">{fmtPct(c.growthPct)}</TableCell>
                  <TableCell className="text-[10px] text-right">{c.cyShare}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
