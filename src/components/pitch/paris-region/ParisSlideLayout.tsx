import React from 'react';
import { Bot } from 'lucide-react';

interface ParisSlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
}

export const ParisSlideLayout: React.FC<ParisSlideLayoutProps> = ({
  children,
  slideNumber,
  totalSlides,
}) => {
  return (
    <div className="w-full h-screen flex flex-col relative overflow-hidden bg-white">
      {/* Top accent — French tricolore-inspired gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#002395] via-white to-[#ED2939]" />

      {/* Logo */}
      <div className="absolute top-5 right-8 z-20 flex items-center gap-2">
        <Bot className="w-6 h-6 text-[#002395]" />
        <span className="text-lg font-bold tracking-tight text-slate-800">
          DiscvrAI
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-10 px-12 pt-10 pb-16 flex flex-col min-h-0 overflow-hidden">
        {children}
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 left-12 right-12 z-20 flex justify-between items-center text-xs text-slate-400">
        <span>© 2026 DiscvrAI · Confidential</span>
        <span className="font-mono font-medium">
          {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#002395]/30 via-slate-200 to-[#ED2939]/30" />
    </div>
  );
};
