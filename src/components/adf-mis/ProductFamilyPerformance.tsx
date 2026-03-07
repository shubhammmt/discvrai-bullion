import React from 'react';
import { atRiskProductFamilies, pfMix, formatCurrency, getStatusBg, getStatusLabel } from '@/data/adfMisData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Package } from 'lucide-react';
import { InfoTooltip, TOOLTIPS } from './InfoTooltip';

const COLORS = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626', '#6366f1', '#0891b2', '#ea580c', '#84cc16', '#f43f5e'];

export const ProductFamilyPerformance: React.FC = () => {
  const chartData = atRiskProductFamilies.slice(0, 10).map(pf => ({
    name: pf.productFamily.length > 25 ? pf.productFamily.slice(0, 25) + '…' : pf.productFamily,
    balance: pf.balance,
    ytd: pf.ytdPct,
  }));

  const pieData = pfMix.slice(0, 10).map(pf => ({
    name: pf.productFamily,
    value: pf.projected,
    pct: pf.pctOfTotal,
  }));

  return (
    <div className="space-y-6">
      {/* At-Risk Product Families */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">At-Risk Product Families — Top {atRiskProductFamilies.length} by Balance<InfoTooltip text={TOOLTIPS.balance} /></h3>
            <p className="text-xs text-gray-500">Product families with highest remaining balance</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Product Family<InfoTooltip text={TOOLTIPS.productFamily} /></TableHead>
                <TableHead className="text-right">Projected</TableHead>
                <TableHead className="text-right">Balance<InfoTooltip text={TOOLTIPS.balance} /></TableHead>
                <TableHead className="text-right">YTD %<InfoTooltip text={TOOLTIPS.ytdPct} /></TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atRiskProductFamilies.map(pf => (
                <TableRow key={pf.productFamily}>
                  <TableCell className="font-medium text-gray-900 text-xs max-w-[300px] truncate" title={pf.productFamily}>{pf.productFamily}</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(pf.projected, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${pf.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatCurrency(pf.balance, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${pf.ytdPct >= 90 ? 'text-emerald-600' : pf.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{pf.ytdPct}%</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(Math.max(0, pf.ytdPct))}`}>
                      {getStatusLabel(Math.max(0, pf.ytdPct))}
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
        {/* Balance Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Top 10 Product Families — Balance to Achieve</h3>
          <p className="text-xs text-gray-500 mb-4">Sorted by highest balance remaining</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 140 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: '#374151' }} width={140} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="balance" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.ytd < 0 ? '#dc2626' : entry.ytd < 70 ? '#d97706' : '#059669'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PF Mix Pie */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-900">Product Family Mix</h3>
          </div>
          <p className="text-xs text-gray-500 mb-4">Share of projected (top 10)</p>
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
                {d.name.length > 18 ? d.name.slice(0, 18) + '…' : d.name} ({d.pct}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full PF Mix Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Product Family Mix — All {pfMix.length} Families</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Product Family<InfoTooltip text={TOOLTIPS.productFamily} /></TableHead>
                <TableHead className="text-right">Projected</TableHead>
                <TableHead className="text-right">% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pfMix.map(pf => (
                <TableRow key={pf.productFamily}>
                  <TableCell className="font-medium text-gray-900 text-xs max-w-[300px] truncate" title={pf.productFamily}>{pf.productFamily}</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(pf.projected, true)}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-gray-900">{pf.pctOfTotal}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
