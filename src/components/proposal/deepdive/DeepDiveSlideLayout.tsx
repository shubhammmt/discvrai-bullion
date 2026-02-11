import React from 'react';
import { Bot } from 'lucide-react';

interface DeepDiveSlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
  sectionLabel?: string;
  sectionColor?: string;
}

export const DeepDiveSlideLayout: React.FC<DeepDiveSlideLayoutProps> = ({
  children,
  slideNumber,
  totalSlides,
  sectionLabel,
  sectionColor = 'bg-slate-800',
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-white relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-800 via-blue-600 to-slate-800" />

      {/* Header bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1">
        <div className="flex items-center gap-3">
          <Bot className="w-5 h-5 text-slate-700" />
          <span className="text-sm font-bold tracking-tight text-slate-700">DiscvrAI</span>
          {sectionLabel && (
            <>
              <span className="text-slate-300">|</span>
              <span className={`text-[11px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full text-white ${sectionColor}`}>
                {sectionLabel}
              </span>
            </>
          )}
        </div>
        <span className="text-xs font-mono text-slate-400">
          {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-4 overflow-hidden">
        {children}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-1.5 flex justify-between items-center text-[10px] text-slate-400">
        <span>© 2026 DiscvrAI. Confidential.</span>
        <span>Shubham Srivastava — Founder & CEO</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
    </div>
  );
};
