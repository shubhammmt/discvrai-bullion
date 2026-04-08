import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { salesDashboard, fmtNum, fmtPct, growthColor, growthBg, isDataRow } from '@/data/adfCeoSales12MData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { Layers, Award, Globe } from 'lucide-react';

const th = "text-[11px] font-bold uppercase tracking-wider border-b-2 border-gray-200 px-4 py-3";
const td = "text-[13px] py-3 px-4";

const COLORS_FY26 = ['#1e3a5f', '#234b7a', '#2d5f99', '#3a74b0'];
const COLORS_FY25 = ['#93c5fd', '#a5d0fb', '#b8dcfa', '#cce7f9'];

const SalesTable = ({ data, nameKey, headerColor }: { data: any[]; nameKey: string; headerColor: string }) => {
  const filtered = data.filter((r: any) => isDataRow(r[nameKey]));

  const chartData = filtered
    .filter(r => r[nameKey] !== 'TOTAL')
    .map(r => ({
      name: r[nameKey]?.length > 12 ? r[nameKey].substring(0, 12) + '…' : r[nameKey],
      fullName: r[nameKey],
      q1: r.q1Fy26,
      q2: r.q2Fy26,
      q3: r.q3Fy26,
      q4: r.q4Fy26,
    }));

  return (
    <div className="space-y-6">
      {/* Quarter Trend Chart */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h4 className="text-sm font-bold text-gray-700 mb-4">Quarterly Revenue Trend — FY26 (₹ Lakhs)</h4>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="20%">
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => `₹${fmtNum(v)} L`} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="q1" name="Q1 FY26" fill="#1e3a5f" radius={[2, 2, 0, 0]} />
              <Bar dataKey="q2" name="Q2 FY26" fill="#3a74b0" radius={[2, 2, 0, 0]} />
              <Bar dataKey="q3" name="Q3 FY26" fill="#5a9bd5" radius={[2, 2, 0, 0]} />
              <Bar dataKey="q4" name="Q4 FY26" fill="#93c5fd" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className={`px-4 py-3 ${headerColor}`}>
          <h4 className="text-sm font-bold text-white">
            {nameKey === 'category' ? 'Category' : nameKey === 'brand' ? 'Brand' : 'Zone'}-Wise Performance | 12M FY26 vs FY25
          </h4>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={`${th} bg-gray-50 text-gray-500 min-w-[130px]`}>{nameKey === 'region' ? 'Zone' : nameKey === 'category' ? 'Category' : 'Brand'}</TableHead>
                <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[80px]`}>Q1 FY26</TableHead>
                <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[80px]`}>Q2 FY26</TableHead>
                <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[80px]`}>Q3 FY26</TableHead>
                <TableHead className={`${th} bg-blue-50 text-blue-700 text-right min-w-[80px]`}>Q4 FY26</TableHead>
                <TableHead className={`${th} bg-indigo-50 text-indigo-700 text-right min-w-[90px] font-black`}>12M FY26</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-400 text-right min-w-[80px]`}>Q1 FY25</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-400 text-right min-w-[80px]`}>Q2 FY25</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-400 text-right min-w-[80px]`}>Q3 FY25</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-400 text-right min-w-[80px]`}>Q4 FY25</TableHead>
                <TableHead className={`${th} bg-gray-100 text-gray-500 text-right min-w-[90px]`}>12M FY25</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[75px]`}>Q3 Gr%</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[75px]`}>12M Gr%</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[60px]`}>Mix%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r: any, i: number) => {
                const name = r[nameKey];
                const isTotal = name === 'TOTAL' || name === 'Total';
                const gr12 = r['12mGrPct'] ?? 0;
                const grQ4 = r.q4GrPct ?? 0;
                return (
                  <TableRow key={name} className={`border-gray-100 hover:bg-blue-50/30 ${isTotal ? 'font-bold bg-purple-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <TableCell className={`${td} font-semibold text-gray-800`}>{name}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r.q1Fy26)}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r.q2Fy26)}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r.q3Fy26)}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r.q4Fy26)}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums font-bold text-indigo-800`}>{fmtNum(r['12mFy26'])}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums text-gray-400`}>{fmtNum(r.q1Fy25)}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums text-gray-400`}>{fmtNum(r.q2Fy25)}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums text-gray-400`}>{fmtNum(r.q3Fy25)}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums text-gray-400`}>{fmtNum(r.q4Fy25)}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r['12mFy25'])}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums font-semibold ${growthColor(grQ4)} ${growthBg(grQ4)}`}>{fmtPct(grQ4)}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums font-semibold ${growthColor(gr12)} ${growthBg(gr12)}`}>{fmtPct(gr12)}</TableCell>
                    <TableCell className={`${td} text-right tabular-nums text-gray-600`}>{r.mixPct}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export const SalesDashboardTab: React.FC = () => {
  // Clean byBrand: separate actual brands from zone data embedded in brands array
  const actualBrands = salesDashboard.byBrand.filter((r: any) =>
    isDataRow(r.brand) && !['NORTH AMERICA', 'UNITED KINGDOM', 'WESTERN EUROPE', 'GULF COUNTRIES', 'ASIA PACIFIC', 'INDIA'].includes(r.brand)
  );

  return (
    <Tabs defaultValue="category" className="space-y-4">
      <TabsList className="bg-white border border-gray-200 shadow-sm p-1 rounded-lg">
        <TabsTrigger value="category" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md text-xs px-3 py-1.5">
          <Layers className="w-3 h-3" /> Category
        </TabsTrigger>
        <TabsTrigger value="brand" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md text-xs px-3 py-1.5">
          <Award className="w-3 h-3" /> Brand
        </TabsTrigger>
        <TabsTrigger value="zone" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md text-xs px-3 py-1.5">
          <Globe className="w-3 h-3" /> Zone
        </TabsTrigger>
      </TabsList>
      <TabsContent value="category">
        <SalesTable data={salesDashboard.byCategory} nameKey="category" headerColor="bg-green-800" />
      </TabsContent>
      <TabsContent value="brand">
        <SalesTable data={actualBrands} nameKey="brand" headerColor="bg-teal-800" />
      </TabsContent>
      <TabsContent value="zone">
        <SalesTable data={salesDashboard.byZone} nameKey="region" headerColor="bg-purple-800" />
      </TabsContent>
    </Tabs>
  );
};
