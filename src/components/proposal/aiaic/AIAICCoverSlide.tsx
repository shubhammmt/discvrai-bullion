import React from 'react';
import { Leaf, Cpu, Sprout } from 'lucide-react';

export const AIAICCoverSlide: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col relative overflow-hidden bg-[#f8faf6]">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-500 to-blue-600" />

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #166534 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Logo top-right */}
      <div className="absolute top-6 right-10 z-20 flex items-center gap-2">
        <Leaf className="w-5 h-5 text-emerald-700" />
        <span className="text-base font-bold tracking-tight text-slate-800">DiscvrAI</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-16 relative z-10">
        <div className="space-y-8 max-w-4xl">
          {/* Icon cluster */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <Sprout className="w-9 h-9 text-white" />
            </div>
            <div className="text-4xl text-slate-300 font-light">×</div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Cpu className="w-9 h-9 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="w-20 h-1 bg-emerald-700 rounded-full" />
          <h1 className="text-[56px] leading-tight font-light text-slate-800 tracking-tight">
            DiscvrAI <span className="text-emerald-700 font-semibold">×</span> MahaAgri-AI
          </h1>

          <h2 className="text-2xl font-medium text-slate-600 leading-relaxed max-w-3xl">
            Agentic Workflows + Precision Ag — Document Intelligence,
            <br />FPO Orchestration, Soil-to-Plant AI
          </h2>

          {/* Tags */}
          <div className="flex gap-3 pt-2">
            {['Document Intelligence', 'Agentic Orchestration', 'Precision Agriculture'].map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-white border border-emerald-200 text-emerald-800 text-sm font-medium rounded-full shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-16 pb-6 flex justify-between items-end text-[11px] text-slate-400 relative z-10">
        <span>AI & AgriTech Innovation Center (AIAIC) · Government of Maharashtra · Confidential</span>
        <span>Prepared by DiscvrAI · March 2026</span>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
    </div>
  );
};
