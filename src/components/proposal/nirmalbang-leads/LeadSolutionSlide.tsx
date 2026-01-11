import React from 'react';
import { Sparkles, ArrowRight, Brain, Users, Target, TrendingUp, RefreshCw } from 'lucide-react';

export const LeadSolutionSlide: React.FC = () => {
  const flowSteps = [
    { icon: Target, label: 'Lead In', color: 'bg-slate-500' },
    { icon: Sparkles, label: 'AI Nourishment', color: 'bg-blue-500' },
    { icon: Brain, label: 'AI Enrichment', color: 'bg-indigo-500' },
    { icon: TrendingUp, label: 'Readiness Scoring', color: 'bg-violet-500' },
    { icon: Users, label: 'Intelligent RM Allocation', color: 'bg-emerald-500' },
    { icon: Target, label: 'Sales Outcome', color: 'bg-green-600' },
    { icon: RefreshCw, label: 'Learning Loop', color: 'bg-amber-500' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 min-h-[600px]">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          The Solution
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Agentic Lead Nourishment & Intelligent Allocation
        </h2>
        <p className="text-lg text-slate-600">
          End-to-end AI system that thinks before assigning leads to RMs
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200 mb-8">
        <div className="flex items-center justify-between gap-2">
          {flowSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center shadow-md mb-3`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-700 text-center max-w-[80px] leading-tight">
                  {step.label}
                </span>
              </div>
              {idx < flowSteps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0 -mt-6" />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Learning Loop Arrow */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">Continuous learning from outcomes</span>
          </div>
        </div>
      </div>

      {/* Step Descriptions */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <h4 className="font-semibold text-blue-800 mb-2">AI Nourishment</h4>
          <p className="text-sm text-blue-700">
            Engages leads with relevant content, tracks responses, builds engagement history
          </p>
        </div>
        <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
          <h4 className="font-semibold text-indigo-800 mb-2">AI Enrichment & Scoring</h4>
          <p className="text-sm text-indigo-700">
            Enriches profiles, predicts intent, scores readiness, estimates ticket size
          </p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
          <h4 className="font-semibold text-emerald-800 mb-2">Intelligent Allocation</h4>
          <p className="text-sm text-emerald-700">
            Matches leads to best-fit RM based on skill, load, and performance history
          </p>
        </div>
      </div>

      {/* Key Message */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-3 bg-slate-800 text-white px-6 py-3 rounded-xl">
          <Brain className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold">"The system thinks before assigning leads to RMs."</span>
        </div>
      </div>
    </div>
  );
};
