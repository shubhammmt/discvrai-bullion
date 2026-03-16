import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { salesDashboard, fmtNum, fmtPct } from '@/data/adfCeoSalesData';
import { ShoppingCart, Globe } from 'lucide-react';

const th = "text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50/80 border-b-2 border-gray-200";
const td = "text-[13px] py-3 px-4";

const QtrTable = ({ title, data, nameKey, icon }: { title: string; data: any[]; nameKey: string; icon?: React.ReactNode }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        {icon}
        {title}
      </h3>
    </div>
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200">
            <TableHead className={`${th} min-w-[150px]`}>{nameKey === 'category' ? 'Category' : nameKey === 'brand' ? 'Brand' : 'Region'}</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>Q1 FY26</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>Q2 FY26</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>Q3 FY26</TableHead>
            <TableHead className={`${th} text-right min-w-[100px] !bg-indigo-50/80 !text-indigo-700`}>9M FY26</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>Q1 FY25</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>Q2 FY25</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>Q3 FY25</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>9M FY25</TableHead>
            <TableHead className={`${th} text-right min-w-[80px]`}>Q3 Gr%</TableHead>
            <TableHead className={`${th} text-right min-w-[80px]`}>9M Gr%</TableHead>
            <TableHead className={`${th} text-right min-w-[70px]`}>Mix%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((r: any, i: number) => (
            <TableRow key={r[nameKey]} className={`border-gray-100 transition-colors hover:bg-indigo-50/40 ${r[nameKey] === 'TOTAL' ? 'font-bold bg-indigo-50/60' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
              <TableCell className={`${td} font-semibold text-gray-800`}>{r[nameKey]}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r.q1Fy26)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r.q2Fy26)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r.q3Fy26)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums font-bold text-indigo-700 bg-indigo-50/30`}>{fmtNum(r['9mFy26'])}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r.q1Fy25)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r.q2Fy25)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r.q3Fy25)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r['9mFy25'])}</TableCell>
              <TableCell className={`${td} text-right font-semibold tabular-nums ${r.q3GrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.q3GrPct)}</TableCell>
              <TableCell className={`${td} text-right font-semibold tabular-nums ${r['9mGrPct'] >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r['9mGrPct'])}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-600`}>{r.mixPct}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export const SalesDashboardTab: React.FC = () => (
  <div className="space-y-6">
    <QtrTable title="Category-wise Performance | Q1–Q3, 9M FY26 vs FY25" data={salesDashboard.byCategory} nameKey="category" icon={<ShoppingCart className="w-4 h-4 text-indigo-500" />} />
    <QtrTable title="Brand-wise Performance | Q1–Q3, 9M FY26 vs FY25" data={salesDashboard.byBrand} nameKey="brand" icon={<ShoppingCart className="w-4 h-4 text-purple-500" />} />
    <QtrTable title="Zone-wise Performance | Q1–Q3, 9M FY26 vs FY25" data={salesDashboard.byZone} nameKey="region" icon={<Globe className="w-4 h-4 text-sky-500" />} />
  </div>
);
