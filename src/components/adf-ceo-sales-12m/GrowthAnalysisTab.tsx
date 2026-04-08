import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { growthAnalysis, fmtNum, fmtPct, growthColor, growthBg, isDataRow } from '@/data/adfCeoSales12MData';
import { TrendingUp, Globe } from 'lucide-react';

const th = "text-[11px] font-bold uppercase tracking-wider border-b-2 border-gray-200 px-4 py-3";
const td = "text-[13px] py-3 px-4";

const GrowthTable = ({ title, data, nameKey, icon, headerColor }: {
  title: string; data: any[]; nameKey: string; icon: React.ReactNode; headerColor: string;
}) => {
  const filtered = data.filter((r: any) => isDataRow(r[nameKey]));
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className={`px-4 py-3 ${headerColor}`}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">{icon}{title}</h3>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={`${th} bg-gray-50 text-gray-500 min-w-[140px]`}>{nameKey === 'category' ? 'Category' : nameKey === 'brand' ? 'Brand' : 'Zone'}</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[95px]`}>12M FY26</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[95px]`}>12M FY25</TableHead>
              <TableHead className={`${th} bg-teal-50 text-teal-700 text-right min-w-[85px]`}>Abs Δ</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[75px]`}>12M Gr%</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[70px]`}>Q1 Gr%</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[70px]`}>Q2 Gr%</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[70px]`}>Q3 Gr%</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[70px]`}>Q4 Gr%</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 min-w-[60px]`}>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r: any, i: number) => (
              <TableRow key={r[nameKey]} className={`border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <TableCell className={`${td} font-semibold text-gray-800`}>{r[nameKey]}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r['12mFy26'])}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r['12mFy25'])}</TableCell>
                <TableCell className={`${td} text-right tabular-nums font-semibold ${r.absDelta >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>{r.absDelta >= 0 ? '+' : ''}{fmtNum(r.absDelta)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums font-semibold ${growthColor(r['12mGrPct'])} ${growthBg(r['12mGrPct'])}`}>{fmtPct(r['12mGrPct'])}</TableCell>
                <TableCell className={`${td} text-right tabular-nums ${growthColor(r.q1GrPct)} ${growthBg(r.q1GrPct)}`}>{fmtPct(r.q1GrPct)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums ${growthColor(r.q2GrPct)} ${growthBg(r.q2GrPct)}`}>{fmtPct(r.q2GrPct)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums ${growthColor(r.q3GrPct)} ${growthBg(r.q3GrPct)}`}>{fmtPct(r.q3GrPct)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums ${growthColor(r.q4GrPct)} ${growthBg(r.q4GrPct)}`}>{fmtPct(r.q4GrPct)}</TableCell>
                <TableCell className={`${td} text-xl`}>{r.trend || '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const GrowthAnalysisTab: React.FC = () => {
  // Extract zones from brands array
  const zoneNames = ['NORTH AMERICA', 'UNITED KINGDOM', 'WESTERN EUROPE', 'GULF COUNTRIES', 'ASIA PACIFIC', 'INDIA'];
  const zones = growthAnalysis.brands.filter((r: any) => zoneNames.includes(r.brand));
  const actualBrands = growthAnalysis.brands.filter((r: any) => isDataRow(r.brand) && !zoneNames.includes(r.brand));

  return (
    <div className="space-y-6">
      <GrowthTable title="Category Growth" data={growthAnalysis.categories} nameKey="category" icon={<TrendingUp className="w-4 h-4" />} headerColor="bg-green-800" />
      <GrowthTable title="Brand Growth" data={actualBrands} nameKey="brand" icon={<TrendingUp className="w-4 h-4" />} headerColor="bg-teal-800" />
      <GrowthTable title="Zone Growth" data={zones} nameKey="brand" icon={<Globe className="w-4 h-4" />} headerColor="bg-purple-800" />
    </div>
  );
};
