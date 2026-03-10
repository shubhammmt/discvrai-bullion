import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { profitability9M, fmtNum } from '@/data/adfCeoSalesData';
import { PieChart } from 'lucide-react';

const th = "text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50/80 border-b-2 border-gray-200";
const td = "text-[13px] py-3 px-4";

export const Profitability9MTab: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        <PieChart className="w-4 h-4 text-indigo-500" />
        9M Profitability by Product | C&F
      </h3>
    </div>
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200">
            <TableHead className={`${th} min-w-[160px]`} rowSpan={2}>Product</TableHead>
            <TableHead className={`${th} text-center !bg-indigo-50/80 !text-indigo-600`} colSpan={6}>FY26</TableHead>
            <TableHead className={`${th} text-center`} colSpan={4}>FY25</TableHead>
          </TableRow>
          <TableRow className="border-gray-200">
            <TableHead className={`${th} text-right min-w-[90px]`}>KGS</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>CIF (₹L)</TableHead>
            <TableHead className={`${th} text-right min-w-[80px]`}>₹/Kg</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>Cost (₹L)</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>Margin (₹L)</TableHead>
            <TableHead className={`${th} text-right min-w-[80px]`}>Margin%</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>KGS</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>CIF (₹L)</TableHead>
            <TableHead className={`${th} text-right min-w-[80px]`}>₹/Kg</TableHead>
            <TableHead className={`${th} text-right min-w-[80px]`}>Margin%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profitability9M.products.map((p: any, i: number) => (
            <TableRow key={p.productName} className={`border-gray-100 transition-colors hover:bg-indigo-50/40 ${p.productName === 'Total' ? 'font-bold bg-indigo-50/60' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
              <TableCell className={`${td} font-semibold text-gray-800`}>{p.productName}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(p.kgsFy26)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(p.cifFy26)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(p.perKgFy26)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(p.costFy26)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(p.marginFy26)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums font-bold ${p.marginPctFy26 >= 50 ? 'text-emerald-600' : 'text-gray-800'}`}>{p.marginPctFy26}%</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(p.kgsFy25)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(p.cifFy25)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(p.perKgFy25)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{p.marginPctFy25}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);
