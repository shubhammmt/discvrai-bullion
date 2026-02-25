import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';
import { ArrowRight } from 'lucide-react';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSSolutionSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">Solution</p>
    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-6 max-w-4xl">{slide.headline}</h2>

    {/* Pre-sales flow */}
    <div className="mb-4">
      <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Pre-Sales (Already Proposed)</p>
      <div className="flex items-center gap-1 flex-wrap">
        {slide.preSalesSteps?.map((step: string, i: number) => (
          <React.Fragment key={i}>
            <span className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-sm font-semibold text-blue-800">{step}</span>
            {i < slide.preSalesSteps.length - 1 && <ArrowRight className="w-4 h-4 text-blue-300 flex-shrink-0" />}
          </React.Fragment>
        ))}
      </div>
    </div>

    {/* Post-sales flow */}
    <div className="mb-4">
      <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">Post-Sales (This Pitch)</p>
      <div className="flex items-center gap-1 flex-wrap">
        {slide.postSalesSteps?.map((step: string, i: number) => (
          <React.Fragment key={i}>
            <span className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-800">{step}</span>
            {i < slide.postSalesSteps.length - 1 && <ArrowRight className="w-4 h-4 text-emerald-300 flex-shrink-0" />}
          </React.Fragment>
        ))}
      </div>
    </div>

    {/* Future */}
    <div className="mb-5">
      <p className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-2">Later Phase</p>
      <div className="flex items-center gap-1 flex-wrap">
        {slide.futureSteps?.map((step: string, i: number) => (
          <React.Fragment key={i}>
            <span className="bg-violet-50 border border-violet-200 rounded-lg px-3 py-2 text-sm font-semibold text-violet-800">{step}</span>
            {i < slide.futureSteps.length - 1 && <ArrowRight className="w-4 h-4 text-violet-300 flex-shrink-0" />}
          </React.Fragment>
        ))}
      </div>
    </div>

    {/* Interface note */}
    <div className="bg-slate-900 rounded-xl p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">One Interface</p>
      <p className="text-base text-slate-200 leading-relaxed">{slide.interfaceNote}</p>
    </div>
  </PSSlideLayout>
);
