import React from 'react';
import { LayoutDashboard, Calendar, TrendingUp, Users, AlertTriangle, Award, BarChart3, Target } from 'lucide-react';

export const SalesHeadVisibilitySlide: React.FC = () => {
  const dailyMetrics = [
    { icon: Target, label: 'Sales-ready leads', value: '47', sublabel: 'Priority: 12 high' },
    { icon: Users, label: 'RM-wise allocation', value: '8 RMs', sublabel: 'Avg 6 leads each' },
    { icon: AlertTriangle, label: 'Pending nourishment', value: '23', sublabel: 'Awaiting engagement' },
  ];

  const weeklyMetrics = [
    { label: 'Conversion by Source', items: ['Digital: 12%', 'Referral: 28%', 'Campaign: 8%'] },
    { label: 'RM Productivity Index', items: ['Top: Rahul (4.2)', 'Avg: 2.8 deals/week', 'Bottom: Needs coaching'] },
    { label: 'Revenue at Risk', items: ['₹12L in stale leads', '18 leads > 7 days', 'Action required'] },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 min-h-[600px]">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
          <LayoutDashboard className="w-4 h-4" />
          Sales Head Dashboard
        </div>
        <h2 className="text-3xl font-bold text-slate-800">
          Sales Head Visibility & Control
        </h2>
      </div>

      {/* Dashboard Preview */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8">
        {/* Daily View */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-slate-800">Daily View</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {dailyMetrics.map((metric, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <metric.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-slate-600">{metric.label}</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{metric.value}</div>
                <div className="text-xs text-slate-500 mt-1">{metric.sublabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly/Monthly View */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <h3 className="font-semibold text-slate-800">Weekly / Monthly Analytics</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {weeklyMetrics.map((metric, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-3 text-sm">{metric.label}</h4>
                <ul className="space-y-2">
                  {metric.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outcomes */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-emerald-800">Predictable Sales Performance</h4>
          </div>
          <p className="text-sm text-emerald-700">
            Clear visibility into pipeline health, conversion trends, and revenue forecasts
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-semibold text-blue-800">Higher RM Productivity</h4>
          </div>
          <p className="text-sm text-blue-700">
            Fewer but better leads per RM, with clear performance benchmarks
          </p>
        </div>
      </div>
    </div>
  );
};
