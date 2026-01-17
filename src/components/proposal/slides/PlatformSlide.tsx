import React from 'react';
import { JindalSlide } from '@/data/jindalProposalSlides';
import { Server, Wrench, Lightbulb } from 'lucide-react';

interface PlatformSlideProps {
  slide: JindalSlide;
}

export const PlatformSlide: React.FC<PlatformSlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-white p-12">
      {/* Header */}
      <div className="mb-6">
        <div className="w-12 h-1 bg-slate-800 mb-4" />
        <h1 className="text-4xl font-light text-slate-800">{slide.title}</h1>
        <p className="text-lg text-slate-500 mt-2">{slide.subtitle}</p>
      </div>

      {/* Content */}
      <div className="flex-1 grid grid-cols-2 gap-8">
        {/* Platform */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{content?.platform?.title}</h3>
              <p className="text-sm text-slate-500">{content?.platform?.subtitle}</p>
            </div>
          </div>
          <ul className="space-y-3">
            {content?.platform?.items?.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2" />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Customization */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{content?.customization?.title}</h3>
              <p className="text-sm text-slate-500">{content?.customization?.subtitle}</p>
            </div>
          </div>
          <ul className="space-y-3">
            {content?.customization?.items?.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Analogy */}
      <div className="mt-6 flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Analogy:</span> {content?.analogy}
        </p>
      </div>
    </div>
  );
};
