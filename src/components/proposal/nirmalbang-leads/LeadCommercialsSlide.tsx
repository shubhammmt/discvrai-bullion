import React from 'react';
import { IndianRupee, Calendar, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

export const LeadCommercialsSlide: React.FC = () => {
  const timeline = [
    { weeks: '1–2', phase: 'Discovery', description: 'Sales workflow design & scope finalization' },
    { weeks: '3–5', phase: 'AI Setup', description: 'AI setup & CRM integration' },
    { weeks: '6–8', phase: 'Pilot', description: 'North region pilot go-live' },
    { weeks: '9–12', phase: 'Scale', description: 'Optimization & scale-readiness' },
  ];

  const implementationItems = [
    'Workflow design & lead lifecycle mapping',
    'AI nourishment & enrichment engine',
    'RM allocation logic & rules',
    'Sales head dashboards',
    'North region pilot rollout'
  ];

  const monthlyItems = [
    'AI & LLM runtime costs',
    'Infrastructure & monitoring',
    'Learning loop & optimization',
    'Reporting & analytics'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 min-h-[600px]">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
          <IndianRupee className="w-4 h-4" />
          Investment & Timeline
        </div>
        <h2 className="text-3xl font-bold text-slate-800">
          Simple Commercials, Fast Impact
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Commercials */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Commercials</h3>
          
          {/* One-time */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-blue-800">One-Time Implementation</h4>
              <span className="text-2xl font-bold text-blue-700">₹20–25L</span>
            </div>
            <ul className="space-y-2">
              {implementationItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-blue-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Monthly */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-emerald-800">Monthly Platform & Support</h4>
              <span className="text-2xl font-bold text-emerald-700">₹1–2L</span>
            </div>
            <ul className="space-y-2">
              {monthlyItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Timeline (12 Weeks)</h3>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md ${
                      idx === 0 ? 'bg-slate-500' :
                      idx === 1 ? 'bg-blue-500' :
                      idx === 2 ? 'bg-emerald-500' : 'bg-violet-500'
                    }`}>
                      {item.weeks}
                    </div>
                    {idx < timeline.length - 1 && (
                      <div className="w-0.5 h-8 bg-slate-300 mt-2" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-semibold text-slate-800">{item.phase}</h4>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Timeline Bar */}
          <div className="mt-6 bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Week 1</span>
              <span>Week 12</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="w-[16%] bg-slate-400" />
              <div className="w-[25%] bg-blue-400" />
              <div className="w-[25%] bg-emerald-400" />
              <div className="w-[34%] bg-violet-400" />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-slate-500">Discovery</span>
              <span className="text-xs text-slate-500">AI Setup</span>
              <span className="text-xs text-slate-500">Pilot</span>
              <span className="text-xs text-slate-500">Scale</span>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Line */}
      <div className="bg-slate-800 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <Rocket className="w-6 h-6 text-emerald-400" />
          <span className="text-xl font-semibold text-white">
            "One additional conversion per RM per month pays for the system."
          </span>
        </div>
      </div>
    </div>
  );
};
