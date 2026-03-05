import React, { useState } from 'react';
import { atRiskCustomers, behindTarget, concentration, atRiskCustomerCategories, formatCurrency, formatQty, getStatusBg, getStatusLabel } from '@/data/adfMisData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, Users, ChevronDown, ChevronRight } from 'lucide-react';

export const AtRiskCustomers: React.FC = () => {
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  const chartData = atRiskCustomers.map(c => ({
    name: c.customer.length > 20 ? c.customer.slice(0, 20) + '…' : c.customer,
    balance: c.balance,
    ytd: c.ytdPct,
  }));

  const getCategoryDrilldown = (customerName: string) => {
    return atRiskCustomerCategories.find(c => c.customer === customerName);
  };

  return (
    <div className="space-y-6">
      {/* Concentration Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Customers</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{concentration.totalCustomers}</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-5 shadow-sm bg-amber-50">
          <div className="text-xs font-medium text-amber-700 uppercase tracking-wider mb-2">Top 3 Concentration</div>
          <div className="text-2xl font-bold text-amber-800">{concentration.top3BalancePct}%</div>
          <div className="text-xs text-amber-600 mt-1">of total balance to achieve</div>
        </div>
        <div className="bg-white border border-red-200 rounded-xl p-5 shadow-sm bg-red-50">
          <div className="text-xs font-medium text-red-700 uppercase tracking-wider mb-2">Top 5 Concentration</div>
          <div className="text-2xl font-bold text-red-800">{concentration.top5BalancePct}%</div>
          <div className="text-xs text-red-600 mt-1">of total balance to achieve</div>
        </div>
      </div>

      {/* Top 10 Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Top 10 Customers — Balance to Achieve</h3>
        <p className="text-xs text-gray-500 mb-4">Sorted by highest balance remaining against FY26 target</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 120 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#374151' }} width={120} />
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

      {/* At-Risk Table with Category Drill-down */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">At-Risk Customers — Top 10 by Balance</h3>
          <p className="text-xs text-gray-500">Click a row to see category breakdown. Shows both Amt (FC) and QTY.</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-6"></TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Salesman</TableHead>
                <TableHead className="text-right">Balance (Amt)</TableHead>
                <TableHead className="text-right">Balance (Qty)</TableHead>
                <TableHead className="text-right">YTD %</TableHead>
                <TableHead className="text-right">Growth vs FY25</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atRiskCustomers.map((c) => {
                const drilldown = getCategoryDrilldown(c.customer);
                const isExpanded = expandedCustomer === c.customer;
                return (
                  <React.Fragment key={c.customer}>
                    <TableRow
                      className="hover:bg-gray-50/50 cursor-pointer"
                      onClick={() => setExpandedCustomer(isExpanded ? null : c.customer)}
                    >
                      <TableCell className="w-6 px-2">
                        {drilldown ? (
                          isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        ) : null}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900 whitespace-nowrap text-xs">{c.customer}</TableCell>
                      <TableCell className="text-gray-600 whitespace-nowrap text-xs">{c.salesman}</TableCell>
                      <TableCell className="text-right tabular-nums font-semibold text-gray-900">{formatCurrency(c.balance, true)}</TableCell>
                      <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatQty(c.balanceQty)}</TableCell>
                      <TableCell className={`text-right tabular-nums font-semibold ${c.ytdPct >= 90 ? 'text-emerald-600' : c.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{c.ytdPct}%</TableCell>
                      <TableCell className={`text-right tabular-nums font-medium ${c.growthVsFy25 >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {c.growthVsFy25 > 0 ? '+' : ''}{c.growthVsFy25}%
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(c.ytdPct)}`}>
                          {getStatusLabel(c.ytdPct)}
                        </span>
                      </TableCell>
                    </TableRow>
                    {isExpanded && drilldown && (
                      <TableRow className="bg-blue-50/50">
                        <TableCell colSpan={8} className="p-0">
                          <div className="px-8 py-3">
                            <div className="text-xs font-semibold text-gray-700 mb-2">Category Breakdown — {c.customer}</div>
                            <div className="grid gap-1">
                              {drilldown.categories.map(cat => (
                                <div key={cat.category} className="flex items-center justify-between py-1 px-3 rounded bg-white border border-gray-100">
                                  <span className="text-xs text-gray-700 font-medium">{cat.category}</span>
                                  <div className="flex items-center gap-4">
                                    <span className="text-xs tabular-nums text-gray-900 font-semibold">{formatCurrency(cat.balance, true)}</span>
                                    <span className={`text-xs tabular-nums font-semibold ${cat.ytdPct >= 90 ? 'text-emerald-600' : cat.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                                      {cat.ytdPct}%
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Behind Target */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Behind Target (YTD &lt; 70%)</h3>
            <p className="text-xs text-gray-500">{behindTarget.length} customers significantly behind</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-red-50">
                <TableHead>Customer</TableHead>
                <TableHead>Salesman</TableHead>
                <TableHead className="text-right">YTD %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {behindTarget.map((c) => (
                <TableRow key={c.customer}>
                  <TableCell className="font-medium text-gray-900 text-xs">{c.customer}</TableCell>
                  <TableCell className="text-gray-600 text-xs">{c.salesman}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-red-600">{c.ytdPct}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};