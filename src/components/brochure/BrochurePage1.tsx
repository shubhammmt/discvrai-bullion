import React from 'react';
import { Bot, Zap, Shield, TrendingUp, Database, BarChart3 } from 'lucide-react';

export const BrochurePage1: React.FC = () => {
  const priorities = [
    { priority: 'High-impact use cases', detail: '80%+ of AI investment goes to reshaping key business functions — not small productivity tools' },
    { priority: 'Workflow redesign', detail: 'Strongest correlation with EBIT impact; only 21% of organizations have substantially redesigned workflows' },
    { priority: 'AI agents', detail: 'Two-thirds of companies plan to deploy AI agents in 2025 — autonomous systems for complex, multi-step workflows' },
    { priority: 'Data foundation first', detail: 'AI cannot enable what isn\'t digital. Clean data, integrated systems, digitized workflows are non-negotiable' },
    { priority: 'ROI & trust', detail: 'Leaders expect 3x+ ROI; transparent governance and measurable operational returns drive adoption' },
  ];

  return (
    <div className="brochure-page bg-white relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-slate-900 via-orange-500 to-slate-900" />
      
      {/* Header */}
      <div className="px-10 pt-6 flex justify-between items-start">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">DiscvrAI</span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Enterprise Transformation</span>
      </div>

      {/* Hero section */}
      <div className="px-10 pt-8">
        <div className="relative">
          <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-orange-300 rounded-full" />
          <div className="pl-5">
            <h1 className="text-[28px] font-bold text-slate-900 leading-tight tracking-tight">
              Large-Scale Business-Led<br />Enterprise Transformation
            </h1>
            <p className="text-lg font-semibold text-orange-600 mt-1.5">Digital & AI-Enabled</p>
            <p className="text-sm text-slate-500 mt-2 italic">
              Day-0 Digitalization First. AI Enablement Second.<br />
              Turning Systems of Record into Systems of Action.
            </p>
          </div>
        </div>
      </div>

      {/* Research section */}
      <div className="px-10 pt-7">
        <div className="bg-slate-50 rounded-xl border border-slate-100 p-5">
          <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-orange-500" />
            What Enterprises Want Most from AI Transformation (2025 Research)
          </h2>
          <p className="text-[10.5px] text-slate-500 mb-3">Leading enterprises are shifting from pilots to production. What they prioritize:</p>
          
          <div className="space-y-0">
            {priorities.map((item, i) => (
              <div key={i} className={`flex gap-3 py-2 ${i < priorities.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="flex-shrink-0 w-[120px]">
                  <span className="text-[10.5px] font-semibold text-slate-800">{item.priority}</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-relaxed flex-1">{item.detail}</p>
              </div>
            ))}
          </div>
          
          <p className="text-[8.5px] text-slate-400 mt-2.5 italic">
            Source: McKinsey State of AI 2025, BCG Closing the AI Impact Gap, Infosys AI Imperatives 2025
          </p>
        </div>
      </div>

      {/* Our Promise */}
      <div className="px-10 pt-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 relative overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
          
          <div className="relative z-10">
            <h2 className="text-[15px] font-bold text-white mb-1.5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400" />
              Our Promise
            </h2>
            <p className="text-orange-400 text-[13px] font-semibold mb-4">
              Transformation That Scales Without Scaling Headcount
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto bg-orange-500/20 rounded-lg flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-white text-[18px] font-bold">30–50%</p>
                <p className="text-slate-400 text-[9px] mt-0.5">Operational Efficiency Gains</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto bg-orange-500/20 rounded-lg flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-white text-[18px] font-bold">10–20x</p>
                <p className="text-slate-400 text-[9px] mt-0.5">Scale Without Proportional Headcount</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto bg-orange-500/20 rounded-lg flex items-center justify-center mb-2">
                  <Database className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-white text-[18px] font-bold">Function-wide</p>
                <p className="text-slate-400 text-[9px] mt-0.5">Not Tasks, Not Pilots. Enterprise Scale.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="px-10 py-2.5 flex justify-between items-center">
          <span className="text-[8px] text-slate-400">© 2025 DiscvrAI. Confidential.</span>
          <span className="text-[8px] text-slate-400 font-mono">01 / 04</span>
        </div>
      </div>
    </div>
  );
};
