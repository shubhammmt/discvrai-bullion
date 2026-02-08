import React from 'react';
import { Bot } from 'lucide-react';

interface REASlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
}

export const REASlideLayout: React.FC<REASlideLayoutProps> = ({
  children,
  slideNumber,
  totalSlides,
}) => {
  return (
    <div
      className="w-full h-screen flex flex-col relative overflow-hidden bg-white"
      style={{ aspectRatio: '16/9' }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700" />

      {/* Logo */}
      <div className="absolute top-4 right-6 z-20 flex items-center gap-2">
        <Bot className="w-5 h-5 text-blue-700" />
        <span className="text-base font-bold tracking-tight text-gray-900">
          DiscvrAI
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10 px-10 pt-8 pb-10 flex flex-col min-h-0 overflow-hidden">
        {children}
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 right-10 z-20">
        <span className="font-mono text-sm text-gray-400 font-medium">
          {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
    </div>
  );
};
