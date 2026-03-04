import React from 'react';
import { financeData, lastUpdated, formatCurrency } from '@/data/adfMisData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Database, RefreshCw, BarChart3, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const FinanceView: React.FC = () => {
  const { dataQuality, growthDistribution, categoryMixShift } = financeData;

  const sortedShift = [...categoryMixShift].sort((a, b) => b.growthVsFy25Pct - a.growthVsFy25Pct);
  const chartData = sortedShift.slice(0, 15).map(c => ({
    name: c.category.length > 16 ? c.category.slice(0, 16) + '…' : c.category,
    growth: c.growthVsFy25Pct,
  }));

  return (
    <div className="space-y-6">
      {/* Data Quality + Last Refresh */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Refresh</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {new Date(lastUpdated).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
          <div className="text-xs text-gray-500 mt-1">{new Date(lastUpdated).toLocaleTimeString()}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Data Quality</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <div className="text-xs text-gray-500">Customers</div>
              <div className="text-lg font-bold text-gray-900">{dataQuality.totalCustomers}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Rows Processed</div>
              <div className="text-lg font-bold text-gray-900">{dataQuality.totalRowsProcessed}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Growth Distribution (YoY)</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <div className="text-xs text-gray-500">Mean</div>
              <div className="text-lg font-bold text-gray-900">{growthDistribution.mean}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Min</div>
              <div className="text-lg font-bold text-red-600">{growthDistribution.min}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Max</div>
              <div className="text-lg font-bold text-emerald-600">{growthDistribution.max}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Mix Shift Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Category Mix Shift — Growth vs FY25 (Top 15)</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">YoY growth percentage by category</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#374151' }} width={100} />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Bar dataKey="growth" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.growth >= 30 ? '#059669' : entry.growth >= 15 ? '#2563eb' : '#6b7280'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Category Mix Shift — All {categoryMixShift.length} Categories</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Growth vs FY25 (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedShift.map((c) => (
                <TableRow key={c.category}>
                  <TableCell className="font-medium text-gray-900 text-xs">{c.category}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${c.growthVsFy25Pct >= 30 ? 'text-emerald-600' : c.growthVsFy25Pct >= 15 ? 'text-blue-600' : 'text-gray-600'}`}>
                    {c.growthVsFy25Pct > 0 ? '+' : ''}{c.growthVsFy25Pct}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
