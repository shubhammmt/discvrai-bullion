import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { productWise, zoneWise, brandWise, fmtNum } from '@/data/adfCeoSalesData';

const QtrCompareTable = ({ data, nameKey }: { data: any[]; nameKey: string }) => (
  <div className="overflow-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">{nameKey === 'productName' ? 'Product' : nameKey === 'region' ? 'Zone' : 'Brand'}</TableHead>
          <TableHead className="text-xs text-right">Q1 FY26</TableHead>
          <TableHead className="text-xs text-right">Q2 FY26</TableHead>
          <TableHead className="text-xs text-right">Q3 FY26</TableHead>
          <TableHead className="text-xs text-right font-bold">9M FY26</TableHead>
          <TableHead className="text-xs text-right">Q1 FY25</TableHead>
          <TableHead className="text-xs text-right">Q2 FY25</TableHead>
          <TableHead className="text-xs text-right">Q3 FY25</TableHead>
          <TableHead className="text-xs text-right">9M FY25</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((r: any) => (
          <TableRow key={r[nameKey]} className={r[nameKey] === 'Total' ? 'font-bold bg-gray-50' : ''}>
            <TableCell className="text-xs font-medium">{r[nameKey]}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q1Fy26)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q2Fy26)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q3Fy26)}</TableCell>
            <TableCell className="text-xs text-right font-bold">{fmtNum(r['9mFy26'])}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q1Fy25)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q2Fy25)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r.q3Fy25)}</TableCell>
            <TableCell className="text-xs text-right">{fmtNum(r['9mFy25'])}</TableCell>
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
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Product-wise | Q1–Q3, 9M FY26 vs FY25</h3>
        <QtrCompareTable data={productWise.products} nameKey="productName" />
      </div>
    </TabsContent>
    <TabsContent value="zone">
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Zone-wise | Q1–Q3, 9M FY26 vs FY25</h3>
        <QtrCompareTable data={zoneWise.regions} nameKey="region" />
      </div>
    </TabsContent>
    <TabsContent value="brand">
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Brand-wise | Q1–Q3, 9M FY26 vs FY25</h3>
        <QtrCompareTable data={brandWise.brands} nameKey="brand" />
      </div>
    </TabsContent>
  </Tabs>
);
