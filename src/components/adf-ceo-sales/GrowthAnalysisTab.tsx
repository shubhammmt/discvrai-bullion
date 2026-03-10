import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { growthAnalysis, fmtNum, fmtPct } from '@/data/adfCeoSalesData';
import { TrendingUp } from 'lucide-react';

const th = "text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50/80 border-b-2 border-gray-200";
const td = "text-[13px] py-3 px-4";

const GrowthTable = ({ title, data, nameKey, icon }: { title: string; data: any[]; nameKey: string; icon?: React.ReactNode }) => (
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
            <TableHead className={`${th} min-w-[160px]`}>{nameKey === 'category' ? 'Category' : 'Brand'}</TableHead>
            <TableHead className={`${th} text-right min-w-[100px]`}>9M FY26</TableHead>
            <TableHead className={`${th} text-right min-w-[100px]`}>9M FY25</TableHead>
            <TableHead className={`${th} text-right min-w-[90px]`}>Abs Δ</TableHead>
            <TableHead className={`${th} text-right min-w-[80px]`}>9M Gr%</TableHead>
            <TableHead className={`${th} text-right min-w-[80px]`}>Q1 Gr%</TableHead>
            <TableHead className={`${th} text-right min-w-[80px]`}>Q2 Gr%</TableHead>
            <TableHead className={`${th} text-right min-w-[80px]`}>Q3 Gr%</TableHead>
            <TableHead className={`${th} min-w-[80px]`}>Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.filter((r: any) => r[nameKey] && !r[nameKey].startsWith('🌍')).map((r: any, i: number) => (
            <TableRow key={r[nameKey]} className={`border-gray-100 transition-colors hover:bg-indigo-50/40 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
              <TableCell className={`${td} font-semibold text-gray-800`}>{r[nameKey]}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r['9mFy26'])}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r['9mFy25'])}</TableCell>
              <TableCell className={`${td} text-right tabular-nums font-semibold ${r.absDelta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtNum(r.absDelta)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums font-semibold ${r['9mGrPct'] >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r['9mGrPct'])}</TableCell>
              <TableCell className={`${td} text-right tabular-nums ${r.q1GrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.q1GrPct)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums ${r.q2GrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.q2GrPct)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums ${r.q3GrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.q3GrPct)}</TableCell>
              <TableCell className={`${td} text-base`}>{r.trend}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export const GrowthAnalysisTab: React.FC = () => (
  <div className="space-y-6">
    <GrowthTable title="Category Growth & Degrowth Analysis" data={growthAnalysis.categories} nameKey="category" icon={<TrendingUp className="w-4 h-4 text-emerald-500" />} />
    <GrowthTable title="Brand Growth & Degrowth Analysis" data={growthAnalysis.brands} nameKey="brand" icon={<TrendingUp className="w-4 h-4 text-purple-500" />} />
  </div>
);
