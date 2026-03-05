import React, { useState } from 'react';
import { salespersonData, salesmenNames, formatCurrency, getStatusBg, getStatusLabel } from '@/data/adfMisData';
import { KpiCard } from './KpiCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Target, DollarSign, TrendingUp, AlertTriangle, AlertCircle, Activity, BarChart3 } from 'lucide-react';

export const SalesView: React.FC = () => {
  const [selected, setSelected] = useState<string>(salesmenNames[0]);
  const data = salespersonData[selected];

  return (
    <div className="space-y-6">
      {/* Salesman Picker */}
      <div className="flex items-center gap-3 flex-wrap">
        <User className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Salesman:</span>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          {salesmenNames.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="My YTD %" value={`${data.ytdPct}%`} trend={data.growthVsFy25Pct} trendLabel="vs FY25" icon={<Target className="w-4 h-4" />} />
        <KpiCard title="Balance to Achieve" value={formatCurrency(data.balanceToAchieve, true)} subtitle={data.balanceToAchieve < 0 ? 'Ahead of target' : 'Remaining'} icon={<DollarSign className="w-4 h-4" />} />
        <KpiCard title="Growth vs FY25" value={`${data.growthVsFy25Pct > 0 ? '+' : ''}${data.growthVsFy25Pct}%`} trend={data.growthVsFy25Pct} trendLabel="Year-on-year" icon={<TrendingUp className="w-4 h-4" />} />
        <KpiCard
          title="Q4 Pipeline Coverage"
          value={`${data.q4PipelineCoverage}x`}
          subtitle={data.q4PipelineCoverage >= 1 ? 'Sufficient' : 'Insufficient'}
          icon={<Activity className="w-4 h-4" />}
        />
      </div>

      {/* Summary row */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-6 text-sm">
        <span className="text-gray-500">Customers: <span className="font-semibold text-gray-900">{data.customerCount}</span></span>
        <span className="text-gray-500">At-Risk: <span className="font-semibold text-red-600">{data.atRiskCustomers.length}</span></span>
        <span className="text-gray-500">Zero Q4 Dispatch: <span className="font-semibold text-amber-600">{data.zeroQ4Dispatch.length}</span></span>
      </div>

      {/* Top 5 to Chase */}
      {data.top5ToChase.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Top 5 to Chase — {selected}</h3>
            <p className="text-xs text-gray-500">Highest balance to achieve</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-right">YTD %</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.top5ToChase.map(c => (
                <TableRow key={c.customer}>
                  <TableCell className="font-medium text-gray-900 text-xs">{c.customer}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-gray-900">{formatCurrency(c.balance, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${c.ytdPct >= 90 ? 'text-emerald-600' : c.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{c.ytdPct}%</TableCell>
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
      )}

      {/* My Categories */}
      {data.myCategories && data.myCategories.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">My Categories — {selected}</h3>
              <p className="text-xs text-gray-500">Performance by product category (sorted by balance)</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">FY26 Projected</TableHead>
                  <TableHead className="text-right">Dispatch+Open</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">YTD %</TableHead>
                  <TableHead className="text-right">Growth vs FY25</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.myCategories.map(cat => (
                  <TableRow key={cat.category}>
                    <TableCell className="font-medium text-gray-900 text-xs">{cat.category}</TableCell>
                    <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(cat.fy26Projected, true)}</TableCell>
                    <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(cat.dispatchPlusOpen, true)}</TableCell>
                    <TableCell className={`text-right tabular-nums font-semibold ${cat.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {formatCurrency(cat.balance, true)}
                    </TableCell>
                    <TableCell className={`text-right tabular-nums font-semibold ${cat.ytdPct >= 90 ? 'text-emerald-600' : cat.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                      {cat.ytdPct}%
                    </TableCell>
                    <TableCell className={`text-right tabular-nums font-medium ${cat.growthVsFy25Pct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {cat.growthVsFy25Pct > 0 ? '+' : ''}{cat.growthVsFy25Pct}%
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(cat.ytdPct)}`}>
                        {getStatusLabel(cat.ytdPct)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* At-Risk Customers */}
      {data.atRiskCustomers.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">At-Risk Customers (YTD &lt; 70%)</h3>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-red-50">
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">YTD %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.atRiskCustomers.map(c => (
                <TableRow key={c.customer}>
                  <TableCell className="font-medium text-gray-900 text-xs">{c.customer}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-red-600">{c.ytdPct}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Zero Q4 Dispatch */}
      {data.zeroQ4Dispatch.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Zero Q4 Dispatch</h3>
              <p className="text-xs text-gray-500">No dispatch or open order in Q4</p>
            </div>
          </div>
          <div className="px-6 py-3">
            <div className="flex flex-wrap gap-2">
              {data.zeroQ4Dispatch.map(c => (
                <span key={c.customer} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  {c.customer}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};