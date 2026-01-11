import React from 'react';
import { AlertTriangle, TrendingDown, Battery, Eye, ArrowDown, X } from 'lucide-react';

export const LeadProblemSlide: React.FC = () => {
  const problems = [
    {
      icon: AlertTriangle,
      color: 'text-red-500',
      bg: 'bg-red-50',
      title: 'Raw & Unqualified Leads',
      description: 'Leads enter the system without proper qualification or intent assessment'
    },
    {
      icon: Battery,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      title: 'Equal Effort, Unequal Value',
      description: 'Same RM effort spent on low- and high-intent leads'
    },
    {
      icon: TrendingDown,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      title: 'Premature Allocation',
      description: 'Early allocation without understanding intent or value'
    },
    {
      icon: Eye,
      color: 'text-slate-500',
      bg: 'bg-slate-100',
      title: 'Limited Visibility',
      description: 'Sales heads lack visibility into true lead readiness'
    }
  ];

  const impacts = [
    { label: 'Lower Conversions', value: 'Revenue loss from missed opportunities' },
    { label: 'RM Fatigue', value: 'Burnout from chasing unqualified leads' },
    { label: 'Revenue Leakage', value: 'Despite sufficient leads in the pipeline' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 min-h-[600px]">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
          <AlertTriangle className="w-4 h-4" />
          The Challenge
        </div>
        <h2 className="text-3xl font-bold text-slate-800">
          Where Sales Efficiency Breaks
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-10">
        {/* Problems */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-6">Key Problems</h3>
          <div className="space-y-4">
            {problems.map((problem, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className={`w-10 h-10 ${problem.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <problem.icon className={`w-5 h-5 ${problem.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{problem.title}</h4>
                  <p className="text-sm text-slate-600">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact & Broken Funnel */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-6">Business Impact</h3>
          
          {/* Broken Funnel Visual */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-48 h-10 bg-blue-400 rounded-t-lg flex items-center justify-center text-white text-sm font-medium">
                100 Leads
              </div>
              <div className="relative w-40 h-8 flex items-center justify-center">
                <ArrowDown className="w-5 h-5 text-slate-300" />
                <div className="absolute right-0 flex items-center gap-1">
                  <X className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-red-500 font-medium">Leakage</span>
                </div>
              </div>
              <div className="w-36 h-10 bg-amber-400 flex items-center justify-center text-white text-sm font-medium border-2 border-dashed border-red-300">
                40 to RMs
              </div>
              <div className="relative w-28 h-8 flex items-center justify-center">
                <ArrowDown className="w-5 h-5 text-slate-300" />
                <div className="absolute right-0 flex items-center gap-1">
                  <X className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-red-500 font-medium">Drop-off</span>
                </div>
              </div>
              <div className="w-24 h-10 bg-red-400 rounded-b-lg flex items-center justify-center text-white text-sm font-medium">
                8 Convert
              </div>
              <p className="text-xs text-slate-500 mt-3 font-medium">Inefficient funnel with high leakage</p>
            </div>
          </div>

          {/* Impact List */}
          <div className="space-y-3">
            {impacts.map((impact, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0" />
                <div>
                  <span className="font-semibold text-red-700">{impact.label}:</span>
                  <span className="text-red-600 ml-1 text-sm">{impact.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
