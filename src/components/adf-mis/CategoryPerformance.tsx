import React from 'react';
import { categories, formatCurrency, getStatusBg, getStatusLabel } from '@/data/adfMisData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#2563eb', '#7c3aed', '#059669', '#d97706'];

export const CategoryPerformance: React.FC = () => {
  const chartData = categories.map(c => ({
    name: c.category,
    Target: c.fy26_projection,
    Dispatched: c.total_dispatch,
  }));

  const pieData = categories.map(c => ({
    name: c.category,
    value: c.total_dispatch,
  }));

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Category — Target vs Dispatched</h3>
          <p className="text-xs text-gray-500 mb-4">Grouped bar: FY26 projection vs YTD dispatch by category</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Target" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Dispatched" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Category Mix</h3>
          <p className="text-xs text-gray-500 mb-4">Share of YTD dispatch</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} strokeWidth={2}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Category-wise Summary</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Category</TableHead>
              <TableHead className="text-right">FY25 Actual</TableHead>
              <TableHead className="text-right">FY26 Target</TableHead>
              <TableHead className="text-right">Dispatched</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">YTD %</TableHead>
              <TableHead className="text-right">Growth</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((c) => (
              <TableRow key={c.category}>
                <TableCell className="font-medium text-gray-900">{c.category}</TableCell>
                <TableCell className="text-right tabular-nums text-gray-600">{formatCurrency(c.fy25_actual, true)}</TableCell>
                <TableCell className="text-right tabular-nums text-gray-900 font-medium">{formatCurrency(c.fy26_projection, true)}</TableCell>
                <TableCell className="text-right tabular-nums text-gray-600">{formatCurrency(c.total_dispatch, true)}</TableCell>
                <TableCell className="text-right tabular-nums font-semibold text-gray-900">{formatCurrency(c.balance, true)}</TableCell>
                <TableCell className={`text-right tabular-nums font-semibold ${c.ytd_pct >= 90 ? 'text-emerald-600' : c.ytd_pct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{c.ytd_pct}%</TableCell>
                <TableCell className={`text-right tabular-nums font-medium ${c.growth_vs_fy25 >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {c.growth_vs_fy25 > 0 ? '+' : ''}{c.growth_vs_fy25}%
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(c.ytd_pct)}`}>
                    {getStatusLabel(c.ytd_pct)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
