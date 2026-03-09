import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { salesDashboard, fmtNum, fmtPct } from '@/data/adfCeoSalesData';

const QtrTable = ({ title, data, nameKey }: { title: string; data: any[]; nameKey: string }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm overflow-auto">
    <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">{nameKey === 'category' ? 'Category' : 'Brand'}</TableHead>
          <TableHead className="text-xs text-right">Q1 FY26</TableHead>
          <TableHead className="text-xs text-right">Q2 FY26</TableHead>
          <TableHead className="text-xs text-right">Q3 FY26</TableHead>
          <TableHead className="text-xs text-right font-bold">9M FY26</TableHead>
          <TableHead className="text-xs text-right">Q1 FY25</TableHead>
          <TableHead className="text-xs text-right">Q2 FY25</TableHead>
          <TableHead className="text-xs text-right">Q3 FY25</TableHead>
          <TableHead className="text-xs text-right">9M FY25</TableHead>
          <TableHead className="text-xs text-right">Q3 Gr%</TableHead>
          <TableHead className="text-xs text-right">9M Gr%</TableHead>
          <TableHead className="text-xs text-right">Mix%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.filter((r: any) => r[nameKey] !== '🌍 ZONE-WISE PERFORMANCE').map((r: any) => (
          <TableRow key={r[nameKey]} className={r[nameKey] === 'TOTAL' ? 'font-bold bg-gray-50' : ''}>
            <TableCell className="text-xs font-medium">{r[nameKey]}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q1Fy26)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q2Fy26)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q3Fy26)}</TableCell>
            <TableCell className="text-xs text-right font-bold">{fmtNum(r['9mFy26'])}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q1Fy25)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q2Fy25)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q3Fy25)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r['9mFy25'])}</TableCell>
            <TableCell className={`text-xs text-right font-semibold ${r.q3GrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.q3GrPct)}</TableCell>
            <TableCell className={`text-xs text-right font-semibold ${r['9mGrPct'] >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r['9mGrPct'])}</TableCell>
            <TableCell className="text-xs text-right">{r.mixPct}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const SalesDashboardTab: React.FC = () => (
  <div className="space-y-6">
    <QtrTable title="Category-wise Performance | Q1–Q3, 9M FY26 vs FY25" data={salesDashboard.byCategory} nameKey="category" />
    <QtrTable title="Brand-wise Performance | Q1–Q3, 9M FY26 vs FY25" data={salesDashboard.byBrand} nameKey="brand" />
  </div>
);
