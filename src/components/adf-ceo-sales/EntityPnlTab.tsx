import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { entityPnl, fmtNum } from '@/data/adfCeoSalesData';

export const EntityPnlTab: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm overflow-auto">
    <h3 className="text-sm font-semibold text-gray-700 mb-3">Entity P&L | Q3 FY26 vs Q3 FY25</h3>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs" rowSpan={2}>Entity</TableHead>
          <TableHead className="text-xs text-center border-b" colSpan={4}>Q3 FY26</TableHead>
          <TableHead className="text-xs text-center border-b" colSpan={4}>Q3 FY25</TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="text-xs text-right">Revenue</TableHead>
          <TableHead className="text-xs text-right">EBITDA</TableHead>
          <TableHead className="text-xs text-right">PBT</TableHead>
          <TableHead className="text-xs text-right">PAT</TableHead>
          <TableHead className="text-xs text-right">Revenue</TableHead>
          <TableHead className="text-xs text-right">EBITDA</TableHead>
          <TableHead className="text-xs text-right">PBT</TableHead>
          <TableHead className="text-xs text-right">PAT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entityPnl.entities.map((e: any) => (
          <TableRow key={e.entity} className={e.entity === 'SUBSIDIARY TOTAL' ? 'font-bold bg-gray-50' : ''}>
            <TableCell className="text-xs font-medium">{e.entity}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(e.q3Fy26Revenue)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(e.q3Fy26Ebitda)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(e.q3Fy26Pbt)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(e.q3Fy26Pat)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(e.q3Fy25Revenue)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(e.q3Fy25Ebitda)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(e.q3Fy25Pbt)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(e.q3Fy25Pat)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
