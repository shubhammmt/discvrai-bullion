import React from 'react';
import { byRegion, atRiskByRegion, formatCurrency, getStatusBg, getStatusLabel } from '@/data/adfMisData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Globe, AlertTriangle } from 'lucide-react';
import { InfoTooltip, TOOLTIPS } from './InfoTooltip';

export const RegionPerformance: React.FC = () => {
  const chartData = byRegion.map(r => ({
    name: r.region,
    Projected: r.projected,
    'Dispatch+Open': r.dispatchPlusOpen,
    Balance: r.balance,
  }));

  // Group at-risk by region
  const regions = [...new Set(atRiskByRegion.map(r => r.region))];

  return (
    <div className="space-y-6">
      {/* Region Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Globe className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Region Performance — Projected vs Dispatch+Open</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">By region with balance remaining</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Projected" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Dispatch+Open" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Region Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">By Region — {byRegion.length} Regions</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Region<InfoTooltip text={TOOLTIPS.region} /></TableHead>
                <TableHead className="text-right">Projected</TableHead>
                <TableHead className="text-right">Dispatch+Open<InfoTooltip text={TOOLTIPS.dispatchPlusOpen} /></TableHead>
                <TableHead className="text-right">Balance<InfoTooltip text={TOOLTIPS.balance} /></TableHead>
                <TableHead className="text-right">YTD %<InfoTooltip text={TOOLTIPS.ytdPct} /></TableHead>
                <TableHead className="text-right">Growth vs FY25<InfoTooltip text={TOOLTIPS.growthVsFy25} /></TableHead>
                <TableHead className="text-right">Customers</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {byRegion.map(r => (
                <TableRow key={r.region}>
                  <TableCell className="font-medium text-gray-900 text-xs">{r.region}</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(r.projected, true)}</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(r.dispatchPlusOpen, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${r.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatCurrency(r.balance, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${r.ytdPct >= 90 ? 'text-emerald-600' : r.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{r.ytdPct}%</TableCell>
                  <TableCell className={`text-right tabular-nums font-medium ${r.growthVsFy25Pct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {r.growthVsFy25Pct > 0 ? '+' : ''}{r.growthVsFy25Pct}%
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{r.customerCount}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(r.ytdPct)}`}>
                      {getStatusLabel(r.ytdPct)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* At-Risk by Region */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">At-Risk Customers by Region</h3>
            <p className="text-xs text-gray-500">Top customers with highest balance per region</p>
          </div>
        </div>
        {regions.map(region => (
          <div key={region} className="border-b border-gray-100 last:border-b-0">
            <div className="px-6 py-2 bg-gray-50">
              <span className="text-xs font-semibold text-gray-700">{region}</span>
            </div>
            <Table>
              <TableBody>
                {atRiskByRegion.filter(r => r.region === region).map(r => (
                  <TableRow key={r.customer}>
                    <TableCell className="font-medium text-gray-900 text-xs">{r.customer}</TableCell>
                    <TableCell className="text-gray-600 text-xs">{r.salesman}</TableCell>
                    <TableCell className="text-right tabular-nums font-semibold text-gray-900">{formatCurrency(r.balance, true)}</TableCell>
                    <TableCell className={`text-right tabular-nums font-semibold ${r.ytdPct >= 90 ? 'text-emerald-600' : r.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{r.ytdPct}%</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(r.ytdPct)}`}>
                        {getStatusLabel(r.ytdPct)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};
