import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';
import { ArrowRight } from 'lucide-react';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSLifecycleSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">End-to-End Lifecycle</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-8">{slide.headline}</h2>

    <div className="space-y-6">
      {/* Pre-sales */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-3">Pre-Sales (Already Proposed)</p>
        <div className="flex items-center gap-2 flex-wrap">
          {slide.preSalesSteps?.map((step: string, i: number) => (
            <React.Fragment key={i}>
              <span className="px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-sm font-semibold text-blue-800">{step}</span>
              {i < slide.preSalesSteps.length - 1 && <ArrowRight className="w-4 h-4 text-blue-300 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Post-sales */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-3">Post-Sales (This Pitch)</p>
        <div className="flex items-center gap-2 flex-wrap">
          {slide.postSalesSteps?.map((step: string, i: number) => (
            <React.Fragment key={i}>
              <span className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-sm font-semibold text-emerald-800">{step}</span>
              {i < slide.postSalesSteps.length - 1 && <ArrowRight className="w-4 h-4 text-emerald-300 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Future */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-violet-500 mb-3">Future Phase</p>
        <div className="flex items-center gap-2 flex-wrap">
          {slide.futureSteps?.map((step: string, i: number) => (
            <React.Fragment key={i}>
              <span className="px-4 py-2.5 bg-violet-50 border border-violet-200 rounded-lg text-sm font-semibold text-violet-800">{step}</span>
              {i < slide.futureSteps.length - 1 && <ArrowRight className="w-4 h-4 text-violet-300 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  </PSSlideLayout>
);
