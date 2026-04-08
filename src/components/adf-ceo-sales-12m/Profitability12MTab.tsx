import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { profitability12M, fmtNum } from '@/data/adfCeoSales12MData';
import { PieChart } from 'lucide-react';

const th = "text-[11px] font-bold uppercase tracking-wider border-b-2 border-gray-200 px-4 py-3";
const td = "text-[13px] py-3 px-4";

export const Profitability12MTab: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
    <div className="px-4 py-3 bg-purple-800">
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <PieChart className="w-4 h-4" /> Category-Wise Gross Margin Analysis | 12M FY26 vs 12M FY25 (Best available data)
      </h3>
    </div>
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={`${th} bg-gray-50 text-gray-500 min-w-[130px]`} rowSpan={2}>Category</TableHead>
            <TableHead className={`${th} text-center bg-blue-50 text-blue-700`} colSpan={7}>12M FY26</TableHead>
            <TableHead className={`${th} text-center bg-gray-100 text-gray-500`} colSpan={4}>12M FY25</TableHead>
            <TableHead className={`${th} bg-yellow-50 text-yellow-700 text-right min-w-[80px]`} rowSpan={2}>Margin Δ pp</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[85px]`}>KGS</TableHead>
            <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[90px]`}>CIF (₹L)</TableHead>
            <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[70px]`}>Price/kg</TableHead>
            <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[70px]`}>COGS/kg</TableHead>
            <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[90px]`}>Margin (₹L)</TableHead>
            <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[70px]`}>Margin%</TableHead>
            <TableHead className={`${th} bg-gray-100 text-gray-500 text-right min-w-[85px]`}>KGS</TableHead>
            <TableHead className={`${th} bg-gray-100 text-gray-500 text-right min-w-[90px]`}>CIF PY</TableHead>
            <TableHead className={`${th} bg-gray-100 text-gray-500 text-right min-w-[70px]`}>Price/kg PY</TableHead>
            <TableHead className={`${th} bg-gray-100 text-gray-500 text-right min-w-[70px]`}>Margin% PY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profitability12M.products.map((p: any, i: number) => {
            const isTotal = p.productName === 'Total';
            const cogsPerKg = p.kgsFy26 > 0 ? p.costFy26 / p.kgsFy26 : 0;
            const marginDelta = p.marginPctFy26 - p.marginPctFy25;
            return (
              <TableRow key={p.productName} className={`border-gray-100 hover:bg-gray-50 ${isTotal ? 'font-bold bg-purple-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <TableCell className={`${td} font-semibold text-gray-800`}>{p.productName}</TableCell>
                <TableCell className={`${td} text-right tabular-nums`}>{fmtNum(p.kgsFy26)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums`}>{fmtNum(p.cifFy26)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums`}>{fmtNum(p.perKgFy26)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums`}>{cogsPerKg > 0 ? cogsPerKg.toFixed(1) : '—'}</TableCell>
                <TableCell className={`${td} text-right tabular-nums`}>{fmtNum(p.marginFy26)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums font-bold ${p.marginPctFy26 >= 50 ? 'text-emerald-600' : 'text-gray-800'}`}>{p.marginPctFy26}%</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(p.kgsFy25)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(p.cifFy25)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(p.perKgFy25)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{p.marginPctFy25}%</TableCell>
                <TableCell className={`${td} text-right tabular-nums font-semibold ${marginDelta >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                  {marginDelta >= 0 ? '+' : ''}{marginDelta.toFixed(1)}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  </div>
);
