import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { top10Tail, fmtNum, fmtPct, growthColor, growthBg, getSignalColor, isDataRow } from '@/data/adfCeoSales12MData';
import { Trophy, Globe, Award, AlertTriangle } from 'lucide-react';

const th = "text-[11px] font-bold uppercase tracking-wider border-b-2 border-gray-200 px-4 py-3";
const td = "text-[13px] py-3 px-4";

const TopTable = ({ title, data, nameKey, icon, headerColor }: {
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
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[75px]`}>Q4 Gr%</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[65px]`}>Share%</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[65px]`}>Cum%</TableHead>
              <TableHead className={`${th} bg-gray-50 text-gray-500 min-w-[110px]`}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r: any, i: number) => {
              const sc = r.status ? getSignalColor(r.status) : null;
              const gr12 = r['12mGrPct'] ?? 0;
              const grQ4 = r.q4GrPct ?? 0;
              return (
                <TableRow key={r[nameKey]} className={`border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <TableCell className={`${td} font-semibold text-gray-800`}>{r[nameKey]}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r['12mFy26'])}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r['12mFy25'])}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums font-semibold ${r.absDelta >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>{r.absDelta >= 0 ? '+' : ''}{fmtNum(r.absDelta)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums font-semibold ${growthColor(gr12)} ${growthBg(gr12)}`}>{fmtPct(gr12)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums font-semibold ${growthColor(grQ4)} ${growthBg(grQ4)}`}>{fmtPct(grQ4)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-600`}>{r.sharePct}%</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-600`}>{r.cumPct}%</TableCell>
                  <TableCell className={td}>
                    {sc && r.status && <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${sc.bg} ${sc.text} border ${sc.border}`}>{r.status}</span>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const Top10TailTab: React.FC = () => {
  // Extract zones from brands array (they are mixed in)
  const zoneNames = ['NORTH AMERICA', 'UNITED KINGDOM', 'WESTERN EUROPE', 'GULF COUNTRIES', 'ASIA PACIFIC', 'INDIA'];
  const zones = top10Tail.brands.filter((r: any) => zoneNames.includes(r.brand));
  const actualBrands = top10Tail.brands.filter((r: any) => isDataRow(r.brand) && !zoneNames.includes(r.brand));

  // At Risk items
  const atRiskCategories = top10Tail.categories.filter((r: any) => isDataRow(r.category) && (r['12mGrPct'] < 0 || r.q4GrPct < 0));

  return (
    <div className="space-y-6">
      {/* At Risk Alert */}
      {atRiskCategories.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h4 className="text-sm font-bold text-red-800 flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" /> At-Risk Items (Negative 12M or Q4 Growth)
          </h4>
          <div className="flex flex-wrap gap-2">
            {atRiskCategories.map((r: any) => (
              <span key={r.category} className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                {r.category}: 12M {fmtPct(r['12mGrPct'])} | Q4 {fmtPct(r.q4GrPct)}
              </span>
            ))}
          </div>
        </div>
      )}

      <TopTable title="Top Categories" data={top10Tail.categories} nameKey="category" icon={<Trophy className="w-4 h-4" />} headerColor="bg-green-800" />
      <TopTable title="Top Brands" data={actualBrands} nameKey="brand" icon={<Award className="w-4 h-4" />} headerColor="bg-teal-800" />
      <TopTable title="Top Zones" data={zones} nameKey="brand" icon={<Globe className="w-4 h-4" />} headerColor="bg-purple-800" />
    </div>
  );
};
