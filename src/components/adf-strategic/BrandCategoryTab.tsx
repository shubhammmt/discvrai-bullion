import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { brandCategoryMatrix, fmtUsd } from '@/data/adfStrategicData';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';

export const BrandCategoryTab: React.FC = () => {
  // Pivot: get unique brands and categories
  const brands = [...new Set(brandCategoryMatrix.map(b => b.brand))];
  const categories = [...new Set(brandCategoryMatrix.map(b => b.category))].filter(c => c !== 'Col16'); // Col16 appears to be total
  const lookup = new Map<string, number>();
  brandCategoryMatrix.forEach(b => lookup.set(`${b.brand}|${b.category}`, b.cyRevenue));

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Brand × Category Performance (USD)
            <InfoTooltip text="Brand performance by category. Use for portfolio diversification." />
          </h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">Brand</TableHead>
              {categories.map(c => (
                <TableHead key={c} className="text-[10px] text-right">{c}</TableHead>
              ))}
              <TableHead className="text-[10px] text-right font-bold">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map(brand => {
              const total = lookup.get(`${brand}|Col16`) || categories.reduce((sum, cat) => sum + (lookup.get(`${brand}|${cat}`) || 0), 0);
              return (
                <TableRow key={brand}>
                  <TableCell className="text-[10px] font-medium">{brand}</TableCell>
                  {categories.map(cat => {
                    const val = lookup.get(`${brand}|${cat}`);
                    return (
                      <TableCell key={cat} className="text-[10px] text-right">
                        {val ? fmtUsd(val) : '—'}
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-[10px] text-right font-bold">{fmtUsd(total)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
