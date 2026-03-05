import React from 'react';
import { atRiskCategories, categoryMix, formatCurrency, getStatusBg, getStatusLabel } from '@/data/adfMisData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle } from 'lucide-react';

const COLORS = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626', '#6366f1', '#0891b2', '#ea580c', '#84cc16', '#f43f5e'];

export const CategoryPerformance: React.FC = () => {
  // Top 10 categories by projected for chart
  const top10 = [...categoryMix].sort((a, b) => b.fy26Projected - a.fy26Projected).slice(0, 10);
  const chartData = top10.map(c => ({
    name: c.category.length > 18 ? c.category.slice(0, 18) + '…' : c.category,
    Projected: c.fy26Projected,
    'Dispatch+Open': c.dispatchPlusOpen,
  }));

  const pieData = top10.map(c => ({
    name: c.category,
    value: c.dispatchPlusOpen,
  }));

  return (
    <div className="space-y-6">
      {/* At-Risk Categories */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">At-Risk Categories (Below Company YTD)</h3>
            <p className="text-xs text-gray-500">{atRiskCategories.length} categories below 85.1% company average</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-amber-50">
                <TableHead>Category</TableHead>
                <TableHead className="text-right">YTD %</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-right">Growth vs FY25</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atRiskCategories.map((c) => (
                <TableRow key={c.category}>
                  <TableCell className="font-medium text-gray-900 text-xs">{c.category}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${c.ytdPct >= 90 ? 'text-emerald-600' : c.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{c.ytdPct}%</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-gray-900">{formatCurrency(c.balance, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-medium ${c.growthVsFy25Pct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {c.growthVsFy25Pct > 0 ? '+' : ''}{c.growthVsFy25Pct}%
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(c.ytdPct)}`}>
                      {getStatusLabel(c.ytdPct)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Top 10 Categories — Projected vs Dispatch+Open</h3>
          <p className="text-xs text-gray-500 mb-4">By FY26 projection value</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#6b7280' }} angle={-25} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Projected" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Dispatch+Open" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Category Mix</h3>
          <p className="text-xs text-gray-500 mb-4">Share of dispatch+open (top 10)</p>
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
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1 text-[10px] text-gray-600">
                <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                {d.name.length > 15 ? d.name.slice(0, 15) + '…' : d.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Category Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Full Category Mix — {categoryMix.length} Categories</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Category</TableHead>
                <TableHead className="text-right">FY25 Actual</TableHead>
                <TableHead className="text-right">FY26 Projected</TableHead>
                <TableHead className="text-right">Dispatch+Open</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryMix.map((c) => {
                const ytd = c.fy26Projected > 0 ? Math.round((c.dispatchPlusOpen / c.fy26Projected) * 100) : 0;
                return (
                  <TableRow key={c.category}>
                    <TableCell className="font-medium text-gray-900 text-xs">{c.category}</TableCell>
                    <TableCell className="text-right tabular-nums text-gray-600">{formatCurrency(c.fy25Actual, true)}</TableCell>
                    <TableCell className="text-right tabular-nums text-gray-900 font-medium">{formatCurrency(c.fy26Projected, true)}</TableCell>
                    <TableCell className="text-right tabular-nums text-gray-600">{formatCurrency(c.dispatchPlusOpen, true)}</TableCell>
                    <TableCell className={`text-right tabular-nums font-semibold ${c.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatCurrency(c.balance, true)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(ytd)}`}>
                        {getStatusLabel(ytd)}
                      </span>
                    </TableCell>
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
