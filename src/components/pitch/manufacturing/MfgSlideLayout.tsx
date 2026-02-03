import React from 'react';
import { Bot } from 'lucide-react';

interface MfgSlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
}

export const MfgSlideLayout: React.FC<MfgSlideLayoutProps> = ({
  children,
  slideNumber,
  totalSlides
}) => {
  return (
    <div 
      className="w-full h-screen flex flex-col relative overflow-hidden bg-white"
    >
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />
      
      {/* Logo */}
      <div className="absolute top-4 right-6 z-20 flex items-center gap-2">
        <Bot className="w-5 h-5 text-amber-600" />
        <span className="text-base font-bold tracking-tight text-slate-800">
          DiscvrAI
        </span>
      </div>
      
      {/* Main content - reduced padding, fills available height */}
      <div className="flex-1 relative z-10 px-8 pt-8 pb-10 flex flex-col">
        {children}
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-3 flex justify-between items-center text-xs text-slate-400">
        <span>© 2026 DiscvrAI. Confidential.</span>
        <span className="font-mono text-slate-500">
          {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
    </div>
  );
};
