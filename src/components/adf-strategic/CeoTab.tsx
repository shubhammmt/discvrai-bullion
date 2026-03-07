import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Shield, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { revenuePerformance, portfolioHealth, regionalPerformance, strategicBrief, sharperMetrics, fmtUsd, fmtPct } from '@/data/adfStrategicData';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const CeoTab: React.FC = () => {
  const gq = sharperMetrics.growthQuality;

  return (
    <div className="space-y-6">
      {/* Diversification Score + Growth Quality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`border rounded-xl p-5 shadow-sm ${sharperMetrics.diversificationScore >= 65 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-semibold text-gray-700">Geographic Diversification</span>
            <InfoTooltip text={`Diversification Score: 100 − max(region share). Target ≥65 = no region >35%. Higher = better diversified.`} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{sharperMetrics.diversificationScore.toFixed(1)}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-semibold ${sharperMetrics.diversificationScore >= 65 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {sharperMetrics.diversificationStatus} Target: ≥{sharperMetrics.diversificationTarget}
            </span>
          </div>
          <div className="text-[10px] text-gray-500 mt-1">
            Max region: {sharperMetrics.maxRegionName} at {sharperMetrics.maxRegionShare}%
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-semibold text-gray-700">Growth Quality</span>
            <InfoTooltip text="% of revenue from categories with improving $/KG. Price-led = healthy; volume-led = margin dilution." />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <div className="text-lg font-bold text-emerald-700">{gq.revenueFromImprovingPricePct}%</div>
              <div className="text-[10px] text-gray-500">Price-led (improving $/KG)</div>
              <div className="text-[9px] text-gray-400 mt-1">{gq.priceLedCategories.slice(0, 3).join(', ')}{gq.priceLedCategories.length > 3 ? ` +${gq.priceLedCategories.length - 3}` : ''}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">{gq.revenueFromDecliningPricePct}%</div>
              <div className="text-[10px] text-gray-500">Volume-led (declining $/KG)</div>
              <div className="text-[9px] text-gray-400 mt-1">{gq.volumeLedCategories.slice(0, 3).join(', ')}{gq.volumeLedCategories.length > 3 ? ` +${gq.volumeLedCategories.length - 3}` : ''}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Performance KPIs */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Revenue Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {revenuePerformance.map((r) => (
            <div key={r.metric} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{r.metric}</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{fmtUsd(r.cy)}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${r.growthPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {r.growthPct >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {fmtPct(r.growthPct)}
                </span>
                <span className="text-xs text-gray-500">vs PY {fmtUsd(r.py)}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Δ {fmtUsd(r.growthUsd)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Health */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Portfolio Health</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {portfolioHealth.map((p) => (
            <div key={p.metric} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 uppercase">{p.metric}</span>
                {p.status === '⚠️' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
              </div>
              <div className="text-xl font-bold text-gray-900 mt-1">{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</div>
              <div className="text-[10px] text-gray-400 mt-1">Benchmark: {p.benchmark}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Regional Revenue (CY)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={regionalPerformance} layout="vertical" margin={{ left: 80 }}>
              <XAxis type="number" tickFormatter={(v) => `$${(v / 1e6).toFixed(1)}M`} fontSize={10} />
              <YAxis type="category" dataKey="region" fontSize={10} width={80} />
              <Tooltip formatter={(v: number) => fmtUsd(v)} />
              <Bar dataKey="cyRev" radius={[0, 4, 4, 0]}>
                {regionalPerformance.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm overflow-auto">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Regional Breakdown</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Region</TableHead>
                <TableHead className="text-xs text-right">PY Rev</TableHead>
                <TableHead className="text-xs text-right">CY Rev</TableHead>
                <TableHead className="text-xs text-right">Growth %</TableHead>
                <TableHead className="text-xs text-right">CY Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regionalPerformance.map((r) => (
                <TableRow key={r.region}>
                  <TableCell className="text-xs font-medium">{r.region}</TableCell>
                  <TableCell className="text-xs text-right">{fmtUsd(r.pyRev)}</TableCell>
                  <TableCell className="text-xs text-right">{fmtUsd(r.cyRev)}</TableCell>
                  <TableCell className={`text-xs text-right font-semibold ${r.growthPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(r.growthPct)}</TableCell>
                  <TableCell className="text-xs text-right">{r.cyShare}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Strategic Brief */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Strategic Brief
        </h3>
        <div className="space-y-3">
          {strategicBrief.map((b, i) => (
            <div key={i} className="flex gap-3 text-xs text-gray-700 leading-relaxed">
              <span className="text-sm flex-shrink-0">{b.num}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
