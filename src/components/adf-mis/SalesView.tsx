import React, { useState, useMemo } from 'react';
import { customers, salesmen, formatCurrency, getStatusBg, getStatusLabel } from '@/data/adfMisData';
import { KpiCard } from './KpiCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Target, DollarSign, TrendingUp } from 'lucide-react';

export const SalesView: React.FC = () => {
  const [selectedSalesman, setSelectedSalesman] = useState<string>(salesmen[0]);

  const myCustomers = useMemo(() => {
    return customers.filter(c => c.salesman === selectedSalesman).sort((a, b) => b.balance - a.balance);
  }, [selectedSalesman]);

  const myProjection = myCustomers.reduce((s, c) => s + c.fy26_projection, 0);
  const myDispatch = myCustomers.reduce((s, c) => s + c.q1_dispatch + c.q2_dispatch + c.q3_dispatch + c.q4_dispatch, 0);
  const myBalance = myCustomers.reduce((s, c) => s + c.balance, 0);
  const myOpenOrder = myCustomers.reduce((s, c) => s + c.q4_open_order, 0);
  const myYtd = myProjection > 0 ? Math.round((myDispatch / myProjection) * 100) : 0;
  const myFy25 = myCustomers.reduce((s, c) => s + c.fy25_actual, 0);
  const myGrowth = myFy25 > 0 ? Math.round(((myDispatch - myFy25) / myFy25) * 1000) / 10 : 0;

  // Category breakdown
  const catMap: Record<string, { dispatch: number; projection: number }> = {};
  myCustomers.forEach(c => {
    if (!catMap[c.category]) catMap[c.category] = { dispatch: 0, projection: 0 };
    catMap[c.category].dispatch += c.q1_dispatch + c.q2_dispatch + c.q3_dispatch + c.q4_dispatch;
    catMap[c.category].projection += c.fy26_projection;
  });

  return (
    <div className="space-y-6">
      {/* Salesman Picker */}
      <div className="flex items-center gap-3">
        <User className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Salesman:</span>
        <div className="flex gap-2">
          {salesmen.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSalesman(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                selectedSalesman === s
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="My YTD %" value={`${myYtd}%`} trend={myGrowth} trendLabel="vs FY25" icon={<Target className="w-4 h-4" />} />
        <KpiCard title="My Balance" value={formatCurrency(myBalance, true)} subtitle="Remaining target" icon={<DollarSign className="w-4 h-4" />} />
        <KpiCard title="My Growth" value={`${myGrowth > 0 ? '+' : ''}${myGrowth}%`} trend={myGrowth} trendLabel="vs FY25" icon={<TrendingUp className="w-4 h-4" />} />
        <KpiCard title="Q4 Pipeline" value={formatCurrency(myOpenOrder, true)} subtitle="Open orders" />
      </div>

      {/* My Customers Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">My Customers — {selectedSalesman}</h3>
          <p className="text-xs text-gray-500">Sorted by balance (highest first)</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Customer</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Projection</TableHead>
              <TableHead className="text-right">Dispatch+Open</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">YTD %</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myCustomers.map(c => {
              const total = c.q1_dispatch + c.q2_dispatch + c.q3_dispatch + c.q4_dispatch + c.q4_open_order;
              return (
                <TableRow key={c.customer}>
                  <TableCell className="font-medium text-gray-900">{c.customer}</TableCell>
                  <TableCell className="text-gray-600">{c.category}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatCurrency(c.fy26_projection, true)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatCurrency(total, true)}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold">{formatCurrency(c.balance, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${c.ytd_pct >= 90 ? 'text-emerald-600' : c.ytd_pct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{c.ytd_pct}%</TableCell>
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

      {/* My Categories */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">My Categories</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Projection</TableHead>
              <TableHead className="text-right">Dispatch</TableHead>
              <TableHead className="text-right">YTD %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(catMap).map(([cat, vals]) => (
              <TableRow key={cat}>
                <TableCell className="font-medium text-gray-900">{cat}</TableCell>
                <TableCell className="text-right tabular-nums">{formatCurrency(vals.projection, true)}</TableCell>
                <TableCell className="text-right tabular-nums">{formatCurrency(vals.dispatch, true)}</TableCell>
                <TableCell className={`text-right tabular-nums font-semibold ${
                  vals.projection > 0 && Math.round((vals.dispatch / vals.projection) * 100) >= 90 ? 'text-emerald-600' : 'text-amber-600'
                }`}>{vals.projection > 0 ? Math.round((vals.dispatch / vals.projection) * 100) : 0}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
