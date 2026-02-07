import React from 'react';
import { Bot } from 'lucide-react';

interface MfgNewSlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
}

export const MfgNewSlideLayout: React.FC<MfgNewSlideLayoutProps> = ({
  children,
  slideNumber,
  totalSlides
}) => {
  return (
    <div 
      className="w-full h-screen flex flex-col relative overflow-hidden bg-white"
    >
      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />
      
      {/* Logo */}
      <div className="absolute top-5 right-8 z-20 flex items-center gap-2">
        <Bot className="w-6 h-6 text-amber-600" />
        <span className="text-lg font-bold tracking-tight text-slate-800">
          DiscvrAI
        </span>
      </div>
      
      {/* Main content - larger padding, fills available height, strictly contained */}
      <div className="flex-1 relative z-10 px-10 pt-10 pb-20 flex flex-col min-h-0 overflow-hidden">
        {children}
      </div>
      
      {/* Minimal footer - slide number only, no copyright for clean PDF export */}
      <div className="absolute bottom-3 right-10 z-20">
        <span className="font-mono text-sm text-slate-400 font-medium">
          {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
    </div>
  );
};
