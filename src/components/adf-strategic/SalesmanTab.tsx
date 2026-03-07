import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { salesmanPerformance, fmtUsd, fmtPct } from '@/data/adfStrategicData';

const ratingColor = (r: string) => {
  if (r.includes('BELOW')) return 'bg-red-100 text-red-800';
  if (r.includes('ON TRACK')) return 'bg-amber-100 text-amber-800';
  return 'bg-emerald-100 text-emerald-800';
};

export const SalesmanTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Salesman Performance (USD)</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">#</TableHead>
              <TableHead className="text-[10px]">Salesman</TableHead>
              <TableHead className="text-[10px] text-right">PY Rev</TableHead>
              <TableHead className="text-[10px] text-right">CY Rev</TableHead>
              <TableHead className="text-[10px] text-right">Growth %</TableHead>
              <TableHead className="text-[10px] text-right">CY Share</TableHead>
              <TableHead className="text-[10px] text-right">Custs</TableHead>
              <TableHead className="text-[10px] text-right">SKUs</TableHead>
              <TableHead className="text-[10px] text-right">PFs</TableHead>
              <TableHead className="text-[10px] text-right">Rev/Cust</TableHead>
              <TableHead className="text-[10px] text-right">Rev/SKU</TableHead>
              <TableHead className="text-[10px] text-center">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesmanPerformance.map((s) => (
              <TableRow key={s.rank}>
                <TableCell className="text-[10px]">{s.rank}</TableCell>
                <TableCell className="text-[10px] font-medium">{s.salesman}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(s.pyRev)}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(s.cyRev)}</TableCell>
                <TableCell className={`text-[10px] text-right font-semibold ${s.growthPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(s.growthPct)}</TableCell>
                <TableCell className="text-[10px] text-right">{s.cyShare}%</TableCell>
                <TableCell className="text-[10px] text-right">{s.custs}</TableCell>
                <TableCell className="text-[10px] text-right">{s.skus}</TableCell>
                <TableCell className="text-[10px] text-right">{s.pfs}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(s.revPerCust)}</TableCell>
                <TableCell className="text-[10px] text-right">{fmtUsd(s.revPerSku)}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold ${ratingColor(s.rating)}`}>{s.rating}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
