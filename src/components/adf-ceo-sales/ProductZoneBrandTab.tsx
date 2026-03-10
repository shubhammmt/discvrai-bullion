import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { productWise, zoneWise, brandWise, fmtNum } from '@/data/adfCeoSalesData';
import { Layers, Globe, Tag } from 'lucide-react';

const th = "text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50/80 border-b-2 border-gray-200";
const td = "text-[13px] py-3 px-4";

const QtrCompareTable = ({ data, nameKey }: { data: any[]; nameKey: string }) => (
  <div className="overflow-auto">
    <Table>
      <TableHeader>
        <TableRow className="border-gray-200">
          <TableHead className={`${th} min-w-[160px]`}>{nameKey === 'productName' ? 'Product' : nameKey === 'region' ? 'Zone' : 'Brand'}</TableHead>
          <TableHead className={`${th} text-right min-w-[90px]`}>Q1 FY26</TableHead>
          <TableHead className={`${th} text-right min-w-[90px]`}>Q2 FY26</TableHead>
          <TableHead className={`${th} text-right min-w-[90px]`}>Q3 FY26</TableHead>
          <TableHead className={`${th} text-right min-w-[100px] !bg-indigo-50/80 !text-indigo-600`}>9M FY26</TableHead>
          <TableHead className={`${th} text-right min-w-[90px]`}>Q1 FY25</TableHead>
          <TableHead className={`${th} text-right min-w-[90px]`}>Q2 FY25</TableHead>
          <TableHead className={`${th} text-right min-w-[90px]`}>Q3 FY25</TableHead>
          <TableHead className={`${th} text-right min-w-[100px]`}>9M FY25</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((r: any, i: number) => (
          <TableRow key={r[nameKey]} className={`border-gray-100 transition-colors hover:bg-indigo-50/40 ${r[nameKey] === 'Total' ? 'font-bold bg-indigo-50/60' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
            <TableCell className={`${td} font-semibold text-gray-800`}>{r[nameKey]}</TableCell>
            <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r.q1Fy26)}</TableCell>
            <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r.q2Fy26)}</TableCell>
            <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r.q3Fy26)}</TableCell>
            <TableCell className={`${td} text-right tabular-nums font-bold text-indigo-700 bg-indigo-50/30`}>{fmtNum(r['9mFy26'])}</TableCell>
            <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r.q1Fy25)}</TableCell>
            <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r.q2Fy25)}</TableCell>
            <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r.q3Fy25)}</TableCell>
            <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(r['9mFy25'])}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const ProductZoneBrandTab: React.FC = () => (
  <Tabs defaultValue="product" className="space-y-4">
    <TabsList className="bg-white border border-gray-200 shadow-sm p-1 rounded-lg">
      <TabsTrigger value="product" className="text-[10px] data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md px-3 py-1">Product Wise</TabsTrigger>
      <TabsTrigger value="zone" className="text-[10px] data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md px-3 py-1">Zone Wise</TabsTrigger>
      <TabsTrigger value="brand" className="text-[10px] data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-md px-3 py-1">Brand Wise</TabsTrigger>
    </TabsList>
    <TabsContent value="product">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            Product-wise | Q1–Q3, 9M FY26 vs FY25
          </h3>
        </div>
        <QtrCompareTable data={productWise.products} nameKey="productName" />
      </div>
    </TabsContent>
    <TabsContent value="zone">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-500" />
            Zone-wise | Q1–Q3, 9M FY26 vs FY25
          </h3>
        </div>
        <QtrCompareTable data={zoneWise.regions} nameKey="region" />
      </div>
    </TabsContent>
    <TabsContent value="brand">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-500" />
            Brand-wise | Q1–Q3, 9M FY26 vs FY25
          </h3>
        </div>
        <QtrCompareTable data={brandWise.brands} nameKey="brand" />
      </div>
    </TabsContent>
  </Tabs>
);
