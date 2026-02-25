import React from 'react';

interface PSSlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
}

export const PSSlideLayout: React.FC<PSSlideLayoutProps> = ({ children, slideNumber, totalSlides }) => (
  <div className="w-full min-h-screen bg-white flex flex-col relative overflow-hidden font-sans">
    {/* Top accent bar */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600" />

    {/* Co-brand */}
    <div className="absolute top-4 right-6 z-20 flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 border border-emerald-200 rounded px-2 py-0.5">
        Post-Sales
      </span>
      <span className="text-sm font-semibold text-blue-700 tracking-tight">DiscvrAI</span>
      <span className="text-slate-300 text-sm">×</span>
      <span className="text-sm font-semibold text-slate-600 tracking-tight">Aptech</span>
    </div>

    {/* Main content */}
    <div className="flex-1 relative z-10 px-14 pt-12 pb-10">
      {children}
    </div>

    {/* Footer */}
    <div className="absolute bottom-0 left-0 right-0 px-14 pb-3 flex justify-between items-center text-xs text-slate-400 border-t border-slate-100">
      <span>Confidential — For Internal Discussion Only | February 2026</span>
      <span className="font-mono text-slate-500">
        {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
      </span>
    </div>

    {/* Bottom accent */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
  </div>
);
