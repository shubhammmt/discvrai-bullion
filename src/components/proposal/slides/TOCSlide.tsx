import React from 'react';
import { JindalSlide } from '@/data/jindalProposalSlides';

interface TOCSlideProps {
  slide: JindalSlide;
}

export const TOCSlide: React.FC<TOCSlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-white p-12">
      {/* Header */}
      <div className="mb-12">
        <div className="w-12 h-1 bg-slate-800 mb-4" />
        <h1 className="text-4xl font-light text-slate-800">{slide.title}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-2xl space-y-6">
          {content?.sections?.map((section: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b border-slate-100 group"
            >
              <div className="flex items-center gap-6">
                <span className="text-2xl font-light text-slate-300">{section.number}</span>
                <span className="text-xl text-slate-700">{section.title}</span>
              </div>
              {section.pages && (
                <span className="text-sm text-slate-400">{section.pages}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
