import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { profitability9M, fmtNum } from '@/data/adfCeoSalesData';

export const Profitability9MTab: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm overflow-auto">
    <h3 className="text-sm font-semibold text-gray-700 mb-3">9M Profitability by Product | C&F</h3>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs" rowSpan={2}>Product</TableHead>
          <TableHead className="text-xs text-center border-b" colSpan={6}>FY26</TableHead>
          <TableHead className="text-xs text-center border-b" colSpan={4}>FY25</TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="text-xs text-right">KGS</TableHead>
          <TableHead className="text-xs text-right">CIF (₹L)</TableHead>
          <TableHead className="text-xs text-right">₹/Kg</TableHead>
          <TableHead className="text-xs text-right">Cost (₹L)</TableHead>
          <TableHead className="text-xs text-right">Margin (₹L)</TableHead>
          <TableHead className="text-xs text-right">Margin%</TableHead>
          <TableHead className="text-xs text-right">KGS</TableHead>
          <TableHead className="text-xs text-right">CIF (₹L)</TableHead>
          <TableHead className="text-xs text-right">₹/Kg</TableHead>
          <TableHead className="text-xs text-right">Margin%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {profitability9M.products.map((p: any) => (
          <TableRow key={p.productName} className={p.productName === 'Total' ? 'font-bold bg-gray-50' : ''}>
            <TableCell className="text-xs font-medium">{p.productName}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(p.kgsFy26)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(p.cifFy26)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(p.perKgFy26)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(p.costFy26)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(p.marginFy26)}</TableCell>
            <TableCell className="text-xs text-right font-semibold">{p.marginPctFy26}%</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(p.kgsFy25)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(p.cifFy25)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(p.perKgFy25)}</TableCell>
            <TableCell className="text-xs text-right">{p.marginPctFy25}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
