import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';
import { profitability, fmtNum } from '@/data/adfCeoSalesData';

const healthColor = (h: string) => {
  if (h.includes('🟢')) return 'text-emerald-600';
  if (h.includes('🟡')) return 'text-amber-600';
  return 'text-gray-500';
};

export const ProfitabilityTab: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm overflow-auto">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        Entity-wise P&L Snapshot | Q3 & YTD FY26
        <InfoTooltip text="Subsidiary-wise Revenue, EBITDA, PBT, PAT. Health = 🟢 Healthy, 🟡 Moderate." />
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Entity</TableHead>
            <TableHead className="text-xs text-right">Q3 Revenue</TableHead>
            <TableHead className="text-xs text-right">Q3 EBITDA</TableHead>
            <TableHead className="text-xs text-right">Q3 EBITDA%</TableHead>
            <TableHead className="text-xs text-right">Q3 PBT</TableHead>
            <TableHead className="text-xs text-right">Q3 PAT</TableHead>
            <TableHead className="text-xs text-right">YTD Revenue</TableHead>
            <TableHead className="text-xs text-right">YTD EBITDA</TableHead>
            <TableHead className="text-xs text-right">YTD PBT</TableHead>
            <TableHead className="text-xs">Health</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profitability.entities.map((e: any) => (
            <TableRow key={e.entity} className={e.entity === 'SUBSIDIARY TOTAL' ? 'font-bold bg-gray-50' : ''}>
              <TableCell className="text-xs font-medium">{e.entity}</TableCell>
              <TableCell className="text-xs text-right">{fmtNum(e.q3Revenue)}</TableCell>
              <TableCell className="text-xs text-right">{fmtNum(e.q3Ebitda)}</TableCell>
              <TableCell className="text-xs text-right">{e.q3EbitdaPct}%</TableCell>
              <TableCell className="text-xs text-right">{fmtNum(e.q3Pbt)}</TableCell>
              <TableCell className="text-xs text-right">{fmtNum(e.q3Pat)}</TableCell>
              <TableCell className="text-xs text-right">{fmtNum(e.ytdRevenue)}</TableCell>
              <TableCell className="text-xs text-right">{fmtNum(e.ytdEbitda)}</TableCell>
              <TableCell className="text-xs text-right">{fmtNum(e.ytdPbt)}</TableCell>
              <TableCell className={`text-xs ${healthColor(e.health)}`}>{e.health}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm overflow-auto">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Category-wise Gross Margin</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Category</TableHead>
            <TableHead className="text-xs text-right">KGS 9M FY26</TableHead>
            <TableHead className="text-xs text-right">CIF (₹L)</TableHead>
            <TableHead className="text-xs text-right">Price/kg</TableHead>
            <TableHead className="text-xs text-right">Margin% FY26</TableHead>
            <TableHead className="text-xs text-right">Margin% PY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profitability.categoryMargin.map((c: any) => (
            <TableRow key={c.category}>
              <TableCell className="text-xs font-medium">{c.category}</TableCell>
              <TableCell className="text-xs text-right">{fmtNum(c.kgs9MFy26)}</TableCell>
              <TableCell className="text-xs text-right">{fmtNum(c.cif9MFy26)}</TableCell>
              <TableCell className="text-xs text-right">₹{fmtNum(c.pricePerKg)}</TableCell>
              <TableCell className="text-xs text-right font-semibold">{c.marginPct}%</TableCell>
              <TableCell className="text-xs text-right">{c.marginPctPy}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);
