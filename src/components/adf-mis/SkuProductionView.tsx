import React from 'react';
import { atRiskSkus, q4PullHeadsUp, zeroQ4DispatchSkus, formatCurrency, formatQty, getStatusBg, getStatusLabel } from '@/data/adfMisData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Factory, AlertCircle, Package } from 'lucide-react';
import { InfoTooltip, TOOLTIPS } from './InfoTooltip';

export const SkuProductionView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* At-Risk SKUs */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">At-Risk SKUs — Top {atRiskSkus.length} by Balance</h3>
            <p className="text-xs text-gray-500">SKUs with highest remaining balance to achieve</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Code</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Balance (Amt)<InfoTooltip text={TOOLTIPS.balance} /></TableHead>
                <TableHead className="text-right">Balance (Qty)<InfoTooltip text={TOOLTIPS.qty} /></TableHead>
                <TableHead className="text-right">YTD %<InfoTooltip text={TOOLTIPS.ytdPct} /></TableHead>
                <TableHead className="text-right">Growth vs FY25<InfoTooltip text={TOOLTIPS.growthVsFy25} /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atRiskSkus.map(s => (
                <TableRow key={s.itemCode}>
                  <TableCell className="font-mono text-[10px] text-gray-500">{s.itemCode}</TableCell>
                  <TableCell className="font-medium text-gray-900 text-xs max-w-[250px] truncate" title={s.itemName}>{s.itemName}</TableCell>
                  <TableCell className="text-xs text-gray-600">{s.category}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-gray-900">{formatCurrency(s.balance, true)}</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatQty(s.balanceQty)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${s.ytdPct >= 90 ? 'text-emerald-600' : s.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{s.ytdPct}%</TableCell>
                  <TableCell className={`text-right tabular-nums font-medium ${s.growthVsFy25Pct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {s.growthVsFy25Pct > 0 ? '+' : ''}{s.growthVsFy25Pct}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Q4 Production Heads-Up */}
      <div className="bg-white border-2 border-amber-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-amber-100 flex items-center gap-2 bg-amber-50">
          <Factory className="w-4 h-4 text-amber-600" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Q4 Production Heads-Up<InfoTooltip text={TOOLTIPS.q4ProductionHeadsUp} /></h3>
            <p className="text-xs text-gray-500">{q4PullHeadsUp.note}</p>
          </div>
        </div>

        {/* Top Categories by Q4 Balance */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h4 className="text-xs font-semibold text-gray-700 mb-3">Top Categories by Q4 Balance</h4>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {q4PullHeadsUp.topCategoriesByQ4Balance.slice(0, 5).map(c => (
              <div key={c.category} className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <div className="text-[10px] text-amber-700 font-medium">{c.category}</div>
                <div className="text-sm font-bold text-gray-900 mt-1">{formatCurrency(c.q4Balance, true)}</div>
                <div className="text-[10px] text-gray-500">{formatQty(c.q4BalanceQty)} cases</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top SKUs by Q4 Balance */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-amber-50/50">
                <TableHead>Code</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Q4 Balance</TableHead>
                <TableHead className="text-right">Q4 Balance Qty</TableHead>
                <TableHead className="text-right">Q4 Open Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {q4PullHeadsUp.topSkusByQ4Balance.map(s => (
                <TableRow key={s.itemCode}>
                  <TableCell className="font-mono text-[10px] text-gray-500">{s.itemCode}</TableCell>
                  <TableCell className="font-medium text-gray-900 text-xs max-w-[250px] truncate" title={s.itemName}>{s.itemName}</TableCell>
                  <TableCell className="text-xs text-gray-600">{s.category}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-amber-700">{formatCurrency(s.q4Balance, true)}</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatQty(s.q4BalanceQty)}</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(s.q4OpenOrder, true)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Zero Q4 Dispatch SKUs */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Zero Q4 Dispatch SKUs<InfoTooltip text={TOOLTIPS.zeroQ4Dispatch} /></h3>
            <p className="text-xs text-gray-500">{zeroQ4DispatchSkus.length} SKUs with no Q4 pipeline — verify with sales</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Code</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zeroQ4DispatchSkus.map(s => (
                <TableRow key={s.itemCode}>
                  <TableCell className="font-mono text-[10px] text-gray-500">{s.itemCode}</TableCell>
                  <TableCell className="font-medium text-gray-900 text-xs max-w-[300px] truncate" title={s.itemName}>{s.itemName}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-gray-900">{formatCurrency(s.balance, true)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
