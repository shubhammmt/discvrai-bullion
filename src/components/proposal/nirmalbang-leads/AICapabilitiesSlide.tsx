import React from 'react';
import { Brain, Zap, Target, Users, TrendingUp, RefreshCw, Settings, Sparkles } from 'lucide-react';

export const AICapabilitiesSlide: React.FC = () => {
  const capabilities = [
    {
      icon: Target,
      title: 'Predicts Lead Readiness',
      description: 'Identifies when a lead is ready for RM engagement'
    },
    {
      icon: TrendingUp,
      title: 'Infers Ticket Size',
      description: 'Estimates potential value and product fit'
    },
    {
      icon: Zap,
      title: 'Intent & Value Scoring',
      description: 'Scores leads on intent, value, and complexity'
    },
    {
      icon: Users,
      title: 'Smart RM Matching',
      description: 'Allocates to best-fit RM based on skill, load & performance'
    },
    {
      icon: RefreshCw,
      title: 'Continuous Learning',
      description: 'Learns from conversions and RM outcomes'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 min-h-[600px]">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
          <Brain className="w-4 h-4" />
          AI Capabilities
        </div>
        <h2 className="text-3xl font-bold text-slate-800">
          What AI Does (Beyond CRM Rules)
        </h2>
      </div>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-5 gap-4 mb-10">
        {capabilities.map((cap, idx) => (
          <div key={idx} className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-5 border border-violet-100 text-center">
            <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <cap.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-slate-800 text-sm mb-2">{cap.title}</h4>
            <p className="text-xs text-slate-600">{cap.description}</p>
          </div>
        ))}
      </div>

      {/* CRM vs AI Comparison */}
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 text-center mb-6">CRM vs Agentic AI</h3>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Traditional CRM */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-slate-500" />
              </div>
              <h4 className="font-semibold text-slate-700">Traditional CRM</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                Manual rules for lead assignment
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                Static scoring based on form fields
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                Round-robin or territory-based routing
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                No learning from outcomes
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Result</span>
              <p className="text-sm text-slate-600 mt-1">One-time setup, no adaptation</p>
            </div>
          </div>

          {/* Agentic AI */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-emerald-800">Agentic AI</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-emerald-700">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                Dynamic, context-aware assignment
              </li>
              <li className="flex items-start gap-2 text-sm text-emerald-700">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                Behavioral & intent-based scoring
              </li>
              <li className="flex items-start gap-2 text-sm text-emerald-700">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                Skill, performance & load-based routing
              </li>
              <li className="flex items-start gap-2 text-sm text-emerald-700">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                Continuous learning from conversions
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-emerald-200">
              <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Result</span>
              <p className="text-sm text-emerald-700 mt-1">Continuous decision-making & improvement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
