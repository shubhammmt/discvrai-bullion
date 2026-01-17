import React from 'react';
import { JindalSlide } from '@/data/jindalProposalSlides';
import { Bot } from 'lucide-react';

interface CoverSlideProps {
  slide: JindalSlide;
}

export const CoverSlide: React.FC<CoverSlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header with logo */}
      <div className="px-12 pt-8 flex justify-end">
        <div className="flex items-center gap-2">
          <Bot className="w-8 h-8 text-slate-800" />
          <span className="text-xl font-bold text-slate-800">DiscvrAI</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-16">
        <div className="space-y-6">
          <div className="w-20 h-1 bg-slate-800" />
          
          <h1 className="text-5xl font-light text-slate-800 tracking-tight">
            {slide.title}
          </h1>
          
          <h2 className="text-3xl font-semibold text-slate-700">
            {slide.subtitle}
          </h2>
          
          <p className="text-xl text-slate-500 mt-4">
            {content?.tagline}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-16 pb-10 flex justify-between items-end text-sm text-slate-400">
        <div className="space-y-1">
          <p>{content?.version}</p>
          <p>{content?.date}</p>
        </div>
        <div className="text-right space-y-1">
          <p>Prepared for: <span className="text-slate-600">{content?.preparedFor}</span></p>
          <p>Prepared by: <span className="text-slate-600">{content?.preparedBy}</span></p>
        </div>
      </div>
    </div>
  );
};
