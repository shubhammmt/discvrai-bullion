import React, { useState, useMemo } from 'react';
import { customers, formatCurrency, getStatusBg, getStatusLabel, AdfCustomer } from '@/data/adfMisData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';

type SortKey = keyof AdfCustomer;

export const AtRiskCustomers: React.FC = () => {
  const [sortKey, setSortKey] = useState<SortKey>('balance');
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = useMemo(() => {
    return [...customers].sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortAsc ? av - bv : bv - av;
    });
  }, [sortKey, sortAsc]);

  const top10 = sorted.slice(0, 10);
  const chartData = top10.map(c => ({
    name: c.customer,
    balance: c.balance,
    ytd: c.ytd_pct,
  }));

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 inline ml-1 opacity-40" />;
    return sortAsc ? <ArrowUp className="w-3 h-3 inline ml-1" /> : <ArrowDown className="w-3 h-3 inline ml-1" />;
  };

  return (
    <div className="space-y-6">
      {/* Top 10 Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Top 10 Customers — Balance to Achieve</h3>
        <p className="text-xs text-gray-500 mb-4">Sorted by highest balance remaining against FY26 target</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 80 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#374151' }} width={80} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="balance" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.ytd < 70 ? '#dc2626' : entry.ytd < 90 ? '#d97706' : '#059669'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Customer-wise Performance</h3>
          <p className="text-xs text-gray-500">Click column headers to sort. Default: Balance (desc).</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="cursor-pointer select-none whitespace-nowrap" onClick={() => toggleSort('customer')}>Customer <SortIcon col="customer" /></TableHead>
                <TableHead className="cursor-pointer select-none whitespace-nowrap" onClick={() => toggleSort('salesman')}>Salesman <SortIcon col="salesman" /></TableHead>
                <TableHead className="cursor-pointer select-none whitespace-nowrap text-right" onClick={() => toggleSort('fy25_actual')}>FY25 <SortIcon col="fy25_actual" /></TableHead>
                <TableHead className="cursor-pointer select-none whitespace-nowrap text-right" onClick={() => toggleSort('fy26_projection')}>FY26 Target <SortIcon col="fy26_projection" /></TableHead>
                <TableHead className="cursor-pointer select-none whitespace-nowrap text-right" onClick={() => toggleSort('q4_dispatch')}>Dispatch+Open <SortIcon col="q4_dispatch" /></TableHead>
                <TableHead className="cursor-pointer select-none whitespace-nowrap text-right" onClick={() => toggleSort('balance')}>Balance <SortIcon col="balance" /></TableHead>
                <TableHead className="cursor-pointer select-none whitespace-nowrap text-right" onClick={() => toggleSort('ytd_pct')}>YTD % <SortIcon col="ytd_pct" /></TableHead>
                <TableHead className="cursor-pointer select-none whitespace-nowrap text-right" onClick={() => toggleSort('growth_vs_fy25')}>Growth <SortIcon col="growth_vs_fy25" /></TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((c) => {
                const totalDispatch = c.q1_dispatch + c.q2_dispatch + c.q3_dispatch + c.q4_dispatch + c.q4_open_order;
                return (
                  <TableRow key={c.customer} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium text-gray-900 whitespace-nowrap">{c.customer}</TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">{c.salesman}</TableCell>
                    <TableCell className="text-right tabular-nums text-gray-600">{formatCurrency(c.fy25_actual, true)}</TableCell>
                    <TableCell className="text-right tabular-nums text-gray-900 font-medium">{formatCurrency(c.fy26_projection, true)}</TableCell>
                    <TableCell className="text-right tabular-nums text-gray-600">{formatCurrency(totalDispatch, true)}</TableCell>
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
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
