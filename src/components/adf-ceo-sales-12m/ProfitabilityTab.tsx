import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { profitability, fmtNum, getSignalColor } from '@/data/adfCeoSales12MData';
import { Building2 } from 'lucide-react';

const th = "text-[11px] font-bold uppercase tracking-wider border-b-2 border-gray-200 px-4 py-3";
const td = "text-[13px] py-3 px-4";

export const ProfitabilityTab: React.FC = () => (
  <div className="space-y-6">
    {/* Entity P&L Snapshot */}
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-purple-800">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Building2 className="w-4 h-4" /> Entity-Wise P&L Snapshot (Quarterly & YTD)
        </h3>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={`${th} bg-gray-50 text-gray-500 min-w-[140px]`}>Entity</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[90px]`}>Q4 Revenue</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[90px]`}>Q4 EBITDA</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[80px]`}>Q4 EBITDA%</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[80px]`}>Q4 PBT</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[80px]`}>Q4 PBT%</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[80px]`}>Q4 PAT</TableHead>
              <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[100px]`}>YTD Revenue</TableHead>
              <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[90px]`}>YTD EBITDA</TableHead>
              <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[90px]`}>YTD PBT</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 min-w-[100px]`}>Health</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profitability.entities.map((e: any, i: number) => {
              const isTotal = e.entity === 'SUBSIDIARY TOTAL';
              const sc = e.health ? getSignalColor(e.health) : null;
              return (
                <TableRow key={e.entity} className={`border-gray-100 hover:bg-gray-50 ${isTotal ? 'font-bold bg-purple-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <TableCell className={`${td} font-semibold text-gray-800`}>{e.entity}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(e.q4Revenue)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(e.q4Ebitda)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{e.q4EbitdaPct ? `${e.q4EbitdaPct}%` : '—'}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(e.q4Pbt)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{e.q4PbtPct ? `${e.q4PbtPct}%` : '—'}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(e.q4Pat)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums font-semibold text-gray-800`}>{fmtNum(e.ytdRevenue)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums ${e.ytdEbitda >= 0 ? 'text-gray-700' : 'text-red-600'}`}>{fmtNum(e.ytdEbitda)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums ${e.ytdPbt >= 0 ? 'text-gray-700' : 'text-red-600'}`}>{fmtNum(e.ytdPbt)}</TableCell>
                  <TableCell className={td}>
                    {sc && <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${sc.bg} ${sc.text} border ${sc.border}`}>{e.health}</span>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);
