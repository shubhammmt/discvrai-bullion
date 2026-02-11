import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { Bot, Sparkles, Users, BarChart3, Zap } from 'lucide-react';

interface CoverSlideProps {
  slide: DeepDiveSlide;
}

export const CoverSlide: React.FC<CoverSlideProps> = ({ slide }) => {
  const icons = [Sparkles, BarChart3, Users, Zap];
  
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />

      {/* Logo */}
      <div className="absolute top-6 right-8 flex items-center gap-2 z-10">
        <Bot className="w-6 h-6 text-amber-400" />
        <span className="text-lg font-bold text-white tracking-tight">{slide.content.brand}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-14 relative z-10">
        <div className="w-16 h-1 bg-amber-400 mb-6" />
        <h1 className="text-5xl font-light text-white mb-3 tracking-tight">{slide.title}</h1>
        <p className="text-xl text-amber-300 font-medium mb-10">{slide.subtitle}</p>

        {/* Sections */}
        <div className="grid grid-cols-4 gap-4 max-w-3xl">
          {slide.content.sections.map((section: any, i: number) => {
            const Icon = icons[i] || Sparkles;
            return (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-mono text-amber-400">{section.number}</span>
                </div>
                <p className="text-sm font-semibold text-white leading-tight">{section.title}</p>
                <p className="text-[10px] text-slate-400 mt-1">{section.slides}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-14 pb-6 flex justify-between items-center relative z-10">
        <div>
          <p className="text-sm font-semibold text-white">{slide.content.founder}</p>
          <p className="text-xs text-slate-400">{slide.content.founderTitle}</p>
        </div>
        <p className="text-[10px] text-slate-500">© 2025 DiscvrAI. Confidential.</p>
      </div>
    </div>
  );
};
