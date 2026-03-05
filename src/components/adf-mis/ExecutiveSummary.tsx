import React from 'react';
import { KpiCard } from './KpiCard';
import { executiveSummary, fullYearGap, quarterTrajectory, q4Gap, salesmanVariance, formatCurrency, formatQty, lastUpdated } from '@/data/adfMisData';
import { Target, TrendingUp, AlertTriangle, DollarSign, BarChart3, Activity, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { Progress } from '@/components/ui/progress';

export const ExecutiveSummary: React.FC = () => {
  const progressPct = Math.round((executiveSummary.totalDispatchPlusOpen / executiveSummary.totalProjected) * 100);

  const chartData = quarterTrajectory.map(q => ({
    name: q.quarter,
    Projected: q.projected,
    Dispatch: q.dispatch,
    ...(q.openOrder ? { 'Open Order': q.openOrder } : {}),
  }));

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="YTD Achievement"
          value={`${executiveSummary.ytdAchievementPct}%`}
          trend={executiveSummary.growthVsFy25Pct}
          trendLabel="vs FY25"
          icon={<Target className="w-4 h-4" />}
        />
        <KpiCard
          title="Balance to Achieve"
          value={formatCurrency(executiveSummary.balanceToAchieve, true)}
          subtitle="Remaining target"
          icon={<AlertTriangle className="w-4 h-4" />}
        />
        <KpiCard
          title="Dispatch + Open Order"
          value={formatCurrency(executiveSummary.totalDispatchPlusOpen, true)}
          subtitle={`of ${formatCurrency(executiveSummary.totalProjected, true)} projected`}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <KpiCard
          title="Growth vs FY25"
          value={`${executiveSummary.growthVsFy25Pct > 0 ? '+' : ''}${executiveSummary.growthVsFy25Pct}%`}
          trend={executiveSummary.growthVsFy25Pct}
          trendLabel="Year-on-year"
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      {/* Full Year Gap — PRIMARY */}
      <div className="bg-white border-2 border-red-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="text-sm font-bold text-gray-900">Full Year Gap — Primary Deficit</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
          <Info className="w-3 h-3" />
          {fullYearGap.note}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-gray-500 mb-1">Projected (Amt)</div>
            <div className="text-lg font-bold text-gray-900">{formatCurrency(fullYearGap.projectedAmt, true)}</div>
            <div className="text-xs text-gray-400 mt-0.5">Qty: {formatQty(fullYearGap.projectedQty)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Dispatch + Open (Amt)</div>
            <div className="text-lg font-bold text-gray-900">{formatCurrency(fullYearGap.dispatchPlusOpenAmt, true)}</div>
            <div className="text-xs text-gray-400 mt-0.5">Qty: {formatQty(fullYearGap.dispatchPlusOpenQty)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Balance (Deficit)</div>
            <div className="text-xl font-bold text-red-600">{formatCurrency(fullYearGap.balanceAmt, true)}</div>
            <div className="text-xs text-red-500 mt-0.5">Qty: {formatQty(fullYearGap.balanceQty)} cases</div>
          </div>
        </div>
      </div>

      {/* Company Progress */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">FY26 Target Progress</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Dispatch + Open Order vs Projection: {formatCurrency(executiveSummary.totalDispatchPlusOpen, true)} / {formatCurrency(executiveSummary.totalProjected, true)}
            </p>
          </div>
          <span className="text-lg font-bold text-gray-900">{progressPct}%</span>
        </div>
        <Progress value={progressPct} className="h-3 bg-gray-100" />
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Q4 Gap + Salesman Variance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-900">Q4 Gap Analysis</h3>
          </div>
          <p className="text-[10px] text-gray-400 mb-3">{q4Gap.note}</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Q4 Projected</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrency(q4Gap.q4Projected, true)}</div>
              <div className="text-xs text-gray-400">Qty: {formatQty(q4Gap.q4ProjectedQty)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Q4 Dispatch+Open</div>
              <div className="text-lg font-bold text-gray-900">{formatCurrency(q4Gap.q4DispatchPlusOpen, true)}</div>
              <div className="text-xs text-gray-400">Qty: {formatQty(q4Gap.q4DispatchPlusOpenQty)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Gap</div>
              <div className={`text-lg font-bold ${q4Gap.gap <= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {q4Gap.gap <= 0 ? '▲' : '▼'} {formatCurrency(Math.abs(q4Gap.gap), true)}
              </div>
              <div className="text-xs text-gray-500">{q4Gap.gap <= 0 ? 'Ahead of plan' : 'Behind plan'}</div>
              <div className="text-xs text-gray-400">Qty gap: {formatQty(q4Gap.gapQty)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-900">Salesman YTD Variance</h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Mean</div>
              <div className="text-lg font-bold text-gray-900">{salesmanVariance.meanYtdPct}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Min</div>
              <div className="text-lg font-bold text-red-600">{salesmanVariance.minYtdPct}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Max</div>
              <div className="text-lg font-bold text-emerald-600">{salesmanVariance.maxYtdPct}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Std Dev</div>
              <div className="text-lg font-bold text-gray-900">{salesmanVariance.stdYtdPct}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quarter Trajectory Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Quarter Trajectory — Projected vs Actual</h3>
        <p className="text-xs text-gray-500 mb-4">Plan split: Q1 20% | Q2 30% | Q3 30% | Q4 20%. Q4 includes open orders.</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Projected" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Dispatch" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.Dispatch >= entry.Projected ? '#059669' : '#dc2626'} />
                ))}
              </Bar>
              <Bar dataKey="Open Order" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Quarter balance table */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {quarterTrajectory.map(q => (
            <div key={q.quarter} className="text-center p-2 rounded-lg bg-gray-50">
              <div className="text-xs font-semibold text-gray-700">{q.quarter}</div>
              <div className={`text-sm font-bold ${q.balance <= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {q.balance <= 0 ? '▲' : '▼'} {formatCurrency(Math.abs(q.balance), true)}
              </div>
              <div className="text-[10px] text-gray-400">Dispatch: {formatQty(q.dispatchQty)} qty</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right text-xs text-gray-400">
        Last updated: {new Date(lastUpdated).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
      </div>
    </div>
  );
};