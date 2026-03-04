import React from 'react';
import { KpiCard } from './KpiCard';
import { companyKpis, quarterTrajectory, formatCurrency } from '@/data/adfMisData';
import { Target, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { Progress } from '@/components/ui/progress';

export const ExecutiveSummary: React.FC = () => {
  const dispatchPlusOpen = companyKpis.total_dispatch + companyKpis.total_open_order;
  const progressPct = Math.round((dispatchPlusOpen / companyKpis.fy26_projection) * 100);

  const chartData = quarterTrajectory.map(q => ({
    name: q.quarter,
    Target: q.target,
    Actual: q.actual,
  }));

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="YTD Achievement"
          value={`${companyKpis.ytd_pct}%`}
          trend={companyKpis.growth_vs_fy25}
          trendLabel="vs FY25"
          icon={<Target className="w-4 h-4" />}
        />
        <KpiCard
          title="Balance to Achieve"
          value={formatCurrency(companyKpis.total_balance, true)}
          subtitle="Remaining target"
          icon={<AlertTriangle className="w-4 h-4" />}
        />
        <KpiCard
          title="Total Dispatch"
          value={formatCurrency(companyKpis.total_dispatch, true)}
          subtitle="YTD shipped"
          icon={<DollarSign className="w-4 h-4" />}
        />
        <KpiCard
          title="Growth vs FY25"
          value={`${companyKpis.growth_vs_fy25}%`}
          trend={companyKpis.growth_vs_fy25}
          trendLabel="Year-on-year"
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      {/* Company Progress */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">FY26 Target Progress</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Dispatch + Open Order vs Projection: {formatCurrency(dispatchPlusOpen)} / {formatCurrency(companyKpis.fy26_projection)}
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

      {/* Quarter Trajectory Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Quarter Trajectory — Target vs Actual</h3>
        <p className="text-xs text-gray-500 mb-4">Plan split: Q1 20% | Q2 30% | Q3 30% | Q4 20%</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Target" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Actual" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.Actual >= entry.Target ? '#059669' : '#dc2626'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-right text-xs text-gray-400">
        Last updated: {companyKpis.last_updated}
      </div>
    </div>
  );
};
