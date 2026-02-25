import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSNextStepsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Next Steps</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6">{slide.headline}</h2>

    <div className="space-y-3">
      {slide.steps?.map((step: string, i: number) => {
        const isHighlight = step.toLowerCase().includes('scope sign-off') || step.toLowerCase().includes('proposal');
        return (
          <div key={i} className={`flex items-start gap-4 rounded-xl px-5 py-4 border ${
            isHighlight ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'
          }`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
              isHighlight ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>{i + 1}</span>
            <p className={`text-base leading-relaxed pt-1 ${isHighlight ? 'text-blue-800 font-semibold' : 'text-slate-700'}`}>{step}</p>
          </div>
        );
      })}
    </div>
  </PSSlideLayout>
);
