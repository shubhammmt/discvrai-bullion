import React from 'react';
import { JindalSlide } from '@/data/jindalProposalSlides';
import { AlertCircle } from 'lucide-react';

interface ProblemSlideProps {
  slide: JindalSlide;
}

export const ProblemSlide: React.FC<ProblemSlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-white p-12">
      {/* Header */}
      <div className="mb-8">
        <div className="w-12 h-1 bg-slate-800 mb-4" />
        <h1 className="text-4xl font-light text-slate-800">{slide.title}</h1>
        <p className="text-lg text-slate-500 mt-2">{slide.subtitle}</p>
      </div>

      {/* Table */}
      <div className="flex-1">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
            <div className="px-6 py-3 text-sm font-semibold text-slate-600">Use Case</div>
            <div className="px-6 py-3 text-sm font-semibold text-slate-600">Current Pain</div>
            <div className="px-6 py-3 text-sm font-semibold text-slate-600">Required Capability</div>
          </div>

          {/* Table Body */}
          {content?.useCases?.map((useCase: any, index: number) => (
            <div
              key={index}
              className={`grid grid-cols-3 ${index !== content.useCases.length - 1 ? 'border-b border-slate-100' : ''}`}
            >
              <div className="px-6 py-4 font-medium text-slate-800">{useCase.name}</div>
              <div className="px-6 py-4 text-slate-600 text-sm">{useCase.pain}</div>
              <div className="px-6 py-4 text-slate-600 text-sm">{useCase.capability}</div>
            </div>
          ))}
        </div>

        {/* Challenge callout */}
        <div className="mt-8 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Challenge:</span> {content?.challenge}
          </p>
        </div>
      </div>
    </div>
  );
};
