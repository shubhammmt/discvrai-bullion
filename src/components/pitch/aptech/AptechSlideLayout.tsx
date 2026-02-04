import React from 'react';
import { Bot } from 'lucide-react';

interface AptechSlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
}

export const AptechSlideLayout: React.FC<AptechSlideLayoutProps> = ({
  children,
  slideNumber,
  totalSlides
}) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Top accent line - orange/gold gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500" />
      
      {/* Logo */}
      <div className="absolute top-4 right-6 z-20 flex items-center gap-2">
        <Bot className="w-5 h-5 text-orange-500" />
        <span className="text-base font-bold tracking-tight text-slate-800">
          DiscvrAI
        </span>
      </div>
      
      {/* Main content */}
      <div className="flex-1 relative z-10 px-12 pt-14 pb-10">
        {children}
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-12 pb-4 flex justify-between items-center text-xs text-slate-400">
        <span>© 2026 DiscvrAI. Confidential.</span>
        <span className="font-mono text-slate-500">
          {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300/50 to-transparent" />
    </div>
  );
};
