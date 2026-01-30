import React from 'react';
import { Bot } from 'lucide-react';

interface YatharthSlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
}

export const YatharthSlideLayout: React.FC<YatharthSlideLayoutProps> = ({
  children,
}) => {
  return (
    <div 
      className="w-full h-screen flex flex-col relative overflow-hidden bg-white"
      style={{ aspectRatio: '16/9' }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600" />
      
      {/* Logo */}
      <div className="absolute top-4 right-6 z-20 flex items-center gap-2">
        <Bot className="w-5 h-5 text-emerald-600" />
        <span className="text-base font-bold tracking-tight text-gray-900">
          DiscvrAI
        </span>
      </div>
      
      {/* Main content - centered in middle */}
      <div className="flex-1 relative z-10 px-10 py-8 flex items-center">
        <div className="w-full">
          {children}
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
    </div>
  );
};
