import React from 'react';
import { Leaf } from 'lucide-react';

interface AIAICSlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
}

export const AIAICSlideLayout: React.FC<AIAICSlideLayoutProps> = ({
  children,
  slideNumber,
  totalSlides,
}) => {
  return (
    <div className="w-screen h-screen flex flex-col relative overflow-hidden bg-[#f8faf6]">
      {/* Top accent — green to blue */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-500 to-blue-600" />

      {/* Logo */}
      <div className="absolute top-5 right-8 z-20 flex items-center gap-2">
        <Leaf className="w-5 h-5 text-emerald-700" />
        <span className="text-base font-bold tracking-tight text-slate-800">DiscvrAI</span>
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10 px-14 pt-10 pb-14 flex flex-col min-h-0 overflow-hidden">
        {children}
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 left-14 right-14 flex justify-between items-center text-[11px] text-slate-400">
        <span>AI & AgriTech Innovation Center (AIAIC) · Government of Maharashtra · Confidential</span>
        <span className="font-mono text-slate-500 font-medium">
          {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
    </div>
  );
};
