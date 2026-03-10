import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { entityPnl, fmtNum } from '@/data/adfCeoSalesData';
import { Building2 } from 'lucide-react';

const th = "text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50/80 border-b-2 border-gray-200";
const td = "text-[13px] py-3 px-4";

export const EntityPnlTab: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        <Building2 className="w-4 h-4 text-indigo-500" />
        Entity P&L | Q3 FY26 vs Q3 FY25
      </h3>
    </div>
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200">
            <TableHead className={`${th} min-w-[160px]`} rowSpan={2}>Entity</TableHead>
            <TableHead className={`${th} text-center !bg-indigo-50/80 !text-indigo-600`} colSpan={4}>Q3 FY26</TableHead>
            <TableHead className={`${th} text-center`} colSpan={4}>Q3 FY25</TableHead>
          </TableRow>
          <TableRow className="border-gray-200">
            <TableHead className={`${th} text-right min-w-[100px]`}>Revenue</TableHead>
            <TableHead className={`${th} text-right min-w-[100px]`}>EBITDA</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>PBT</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>PAT</TableHead>
            <TableHead className={`${th} text-right min-w-[100px]`}>Revenue</TableHead>
            <TableHead className={`${th} text-right min-w-[100px]`}>EBITDA</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>PBT</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>PAT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entityPnl.entities.map((e: any, i: number) => (
            <TableRow key={e.entity} className={`border-gray-100 transition-colors hover:bg-indigo-50/40 ${e.entity === 'SUBSIDIARY TOTAL' ? 'font-bold bg-indigo-50/60' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
              <TableCell className={`${td} font-semibold text-gray-800`}>{e.entity}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(e.q3Fy26Revenue)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(e.q3Fy26Ebitda)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(e.q3Fy26Pbt)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(e.q3Fy26Pat)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(e.q3Fy25Revenue)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(e.q3Fy25Ebitda)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(e.q3Fy25Pbt)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(e.q3Fy25Pat)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);
