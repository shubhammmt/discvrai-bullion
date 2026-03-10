import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { top10Tail, fmtNum, fmtPct } from '@/data/adfCeoSalesData';
import { Trophy } from 'lucide-react';

const th = "text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50/80 border-b-2 border-gray-200";
const td = "text-[13px] py-3 px-4";

const signalColor = (s: string) => {
  if (s.includes('Strong') || s.includes('🚀')) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (s.includes('Growing') || s.includes('✅')) return 'bg-blue-50 text-blue-700 border border-blue-200';
  if (s.includes('Degrow') || s.includes('🔻')) return 'bg-red-50 text-red-700 border border-red-200';
  return 'bg-gray-50 text-gray-600 border border-gray-200';
};

const TopTable = ({ title, data, nameKey, icon }: { title: string; data: any[]; nameKey: string; icon?: React.ReactNode }) => (
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
            <TableHead className={`${th} text-right min-w-[80px]`}>Q3 Gr%</TableHead>
            <TableHead className={`${th} text-right min-w-[70px]`}>Share%</TableHead>
            <TableHead className={`${th} text-right min-w-[70px]`}>Cum%</TableHead>
            <TableHead className={`${th} min-w-[130px]`}>Status</TableHead>
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
              <TableCell className={`${td} text-right tabular-nums ${r.q3GrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.q3GrPct)}</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-600`}>{r.sharePct}%</TableCell>
              <TableCell className={`${td} text-right tabular-nums text-gray-600`}>{r.cumPct}%</TableCell>
              <TableCell className={td}><span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${signalColor(r.status)}`}>{r.status}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export const Top10TailTab: React.FC = () => (
  <div className="space-y-6">
    <TopTable title="Top Value Contributors — Categories" data={top10Tail.categories} nameKey="category" icon={<Trophy className="w-4 h-4 text-amber-500" />} />
    <TopTable title="Top Value Contributors — Brands" data={top10Tail.brands} nameKey="brand" icon={<Trophy className="w-4 h-4 text-purple-500" />} />
  </div>
);
