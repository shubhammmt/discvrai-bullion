import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { top10Tail, fmtNum, fmtPct } from '@/data/adfCeoSalesData';

const signalColor = (s: string) => {
  if (s.includes('Strong') || s.includes('🚀')) return 'bg-emerald-100 text-emerald-800';
  if (s.includes('Growing') || s.includes('✅')) return 'bg-blue-100 text-blue-800';
  if (s.includes('Degrow') || s.includes('🔻')) return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-700';
};

const TopTable = ({ title, data, nameKey }: { title: string; data: any[]; nameKey: string }) => (
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
          <TableHead className="text-xs text-right">Q3 Gr%</TableHead>
          <TableHead className="text-xs text-right">Share%</TableHead>
          <TableHead className="text-xs text-right">Cum%</TableHead>
          <TableHead className="text-xs">Status</TableHead>
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
            <TableCell className={`text-xs text-right ${r.q3GrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.q3GrPct)}</TableCell>
            <TableCell className="text-xs text-right">{r.sharePct}%</TableCell>
            <TableCell className="text-xs text-right">{r.cumPct}%</TableCell>
            <TableCell><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${signalColor(r.status)}`}>{r.status}</span></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const Top10TailTab: React.FC = () => (
  <div className="space-y-6">
    <TopTable title="Top Value Contributors — Categories" data={top10Tail.categories} nameKey="category" />
    <TopTable title="Top Value Contributors — Brands" data={top10Tail.brands} nameKey="brand" />
  </div>
);
