import React from 'react';
import { JindalSlide } from '@/data/jindalProposalSlides';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface NextStepsSlideProps {
  slide: JindalSlide;
}

export const NextStepsSlide: React.FC<NextStepsSlideProps> = ({ slide }) => {
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
        {/* Action Items */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Action Items</h3>
          <div className="space-y-4">
            {content?.steps?.map((step: any, index: number) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <p className="font-semibold text-slate-800">{step.title}</p>
                </div>
                <ul className="space-y-1 ml-6">
                  {step.items?.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-slate-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Go/No-Go Criteria */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Go/No-Go Criteria</h3>
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
            <div className="space-y-3">
              {content?.criteria?.map((criterion: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">{criterion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mt-6 p-5 bg-slate-800 rounded-lg">
            <p className="text-white font-medium mb-3">Ready to proceed?</p>
            <div className="space-y-1">
              <p className="text-white font-semibold">Shubham Srivastava</p>
              <p className="text-slate-300 text-sm">Founder - DiscvrAI</p>
              <p className="text-slate-400 text-sm">shubham@discvr.ai</p>
              <p className="text-slate-400 text-sm">+91-9873961591</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
