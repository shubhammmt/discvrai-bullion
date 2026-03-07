import React, { useState } from 'react';
import { byCountry, byRegion, formatCurrency, getStatusBg, getStatusLabel } from '@/data/adfMisData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Flag } from 'lucide-react';
import { InfoTooltip, TOOLTIPS } from './InfoTooltip';

export const CountryPerformance: React.FC = () => {
  const [regionFilter, setRegionFilter] = useState<string>('ALL');
  const regions = ['ALL', ...byRegion.map(r => r.region)];
  const filtered = regionFilter === 'ALL' ? byCountry : byCountry.filter(c => c.region === regionFilter);

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <Flag className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filter by Region:</span>
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          {regions.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Country Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">By Country — {filtered.length} Countries</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Country<InfoTooltip text={TOOLTIPS.country} /></TableHead>
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
              {filtered.map(c => (
                <TableRow key={c.country}>
                  <TableCell className="font-medium text-gray-900 text-xs">{c.country}</TableCell>
                  <TableCell className="text-gray-600 text-xs">{c.region}</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(c.projected, true)}</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(c.dispatchPlusOpen, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${c.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatCurrency(c.balance, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${c.ytdPct >= 90 ? 'text-emerald-600' : c.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{c.ytdPct}%</TableCell>
                  <TableCell className={`text-right tabular-nums font-medium ${c.growthVsFy25Pct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {c.growthVsFy25Pct > 0 ? '+' : ''}{c.growthVsFy25Pct}%
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{c.customerCount}</TableCell>
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
    </div>
  );
};
