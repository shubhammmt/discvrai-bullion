import React from 'react';

export const ExecCoverSlide: React.FC = () => (
  <div className="w-full min-h-screen bg-slate-900 flex flex-col relative overflow-hidden font-sans">
    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500" />
    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

    <div className="absolute top-6 right-8 flex items-center gap-3 z-20">
      <span className="text-sm font-bold text-blue-400 tracking-tight">DiscvrAI</span>
      <span className="text-slate-600 text-sm">×</span>
      <span className="text-sm font-bold text-slate-400 tracking-tight">Aptech</span>
    </div>

    <div className="flex-1 flex flex-col justify-center px-16 relative z-10">
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 border border-blue-800 rounded-full px-3 py-1">
          Proposal · March 2026
        </span>
      </div>

      <h1 className="text-5xl font-bold text-white leading-tight mb-3 max-w-4xl">
        Aptech Digital Transformation
      </h1>
      <div className="w-20 h-1 bg-blue-500 mb-5" />
      <p className="text-2xl text-blue-300 font-medium mb-2">Agentic AI Proposal</p>
      <p className="text-lg text-slate-400 max-w-3xl">
        Pre-Sales &amp; Post-Sales Tracks · Scope, Cost &amp; Commercials
      </p>

      <div className="mt-12 flex items-start gap-16">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Prepared for</p>
          <p className="text-white font-semibold">Sandip Weling</p>
          <p className="text-slate-400 text-sm">Chief Business Officer, Aptech</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Presented by</p>
          <p className="text-white font-semibold">Shubham Srivastava</p>
          <p className="text-slate-400 text-sm">CEO, DiscvrAI</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Date</p>
          <p className="text-white font-semibold">March 2026</p>
        </div>
      </div>
    </div>

    <div className="px-16 pb-6 text-xs text-slate-600 z-10">
      Confidential — For Internal Discussion Only
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
  </div>
);
