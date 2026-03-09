import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { growthAnalysis, fmtNum, fmtPct } from '@/data/adfCeoSalesData';

const GrowthTable = ({ title, data, nameKey }: { title: string; data: any[]; nameKey: string }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm overflow-auto">
    <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">{nameKey === 'category' ? 'Category' : 'Brand'}</TableHead>
          <TableHead className="text-xs text-right">9M FY26</TableHead>
          <TableHead className="text-xs text-right">9M FY25</TableHead>
          <TableHead className="text-xs text-right">Abs Δ</TableHead>
          <TableHead className="text-xs text-right">9M Gr%</TableHead>
          <TableHead className="text-xs text-right">Q1 Gr%</TableHead>
          <TableHead className="text-xs text-right">Q2 Gr%</TableHead>
          <TableHead className="text-xs text-right">Q3 Gr%</TableHead>
          <TableHead className="text-xs">Trend</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.filter((r: any) => r[nameKey] && !r[nameKey].startsWith('🌍')).map((r: any) => (
          <TableRow key={r[nameKey]}>
            <TableCell className="text-xs font-medium">{r[nameKey]}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r['9mFy26'])}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r['9mFy25'])}</TableCell>
            <TableCell className={`text-xs text-right ${r.absDelta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtNum(r.absDelta)}</TableCell>
            <TableCell className={`text-xs text-right font-semibold ${r['9mGrPct'] >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r['9mGrPct'])}</TableCell>
            <TableCell className={`text-xs text-right ${r.q1GrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.q1GrPct)}</TableCell>
            <TableCell className={`text-xs text-right ${r.q2GrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.q2GrPct)}</TableCell>
            <TableCell className={`text-xs text-right ${r.q3GrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.q3GrPct)}</TableCell>
            <TableCell className="text-sm">{r.trend}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const GrowthAnalysisTab: React.FC = () => (
  <div className="space-y-6">
    <GrowthTable title="Category Growth & Degrowth Analysis" data={growthAnalysis.categories} nameKey="category" />
    <GrowthTable title="Brand Growth & Degrowth Analysis" data={growthAnalysis.brands} nameKey="brand" />
  </div>
);
