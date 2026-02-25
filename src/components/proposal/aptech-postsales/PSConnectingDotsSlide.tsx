import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';
import { ArrowRight } from 'lucide-react';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSConnectingDotsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Connecting the Dots</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">{slide.headline}</h2>

    {/* Journey flow */}
    <div className="space-y-4 mb-6">
      {/* Pre-sales flow */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-2">Pre-Sales</p>
        <div className="flex items-center gap-2 flex-wrap">
          {slide.preSalesFlow?.map((step: string, i: number) => (
            <React.Fragment key={i}>
              <span className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-semibold text-blue-800">{step}</span>
              {i < slide.preSalesFlow.length - 1 && <ArrowRight className="w-4 h-4 text-blue-300 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Post-sales flow */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">Post-Sales</p>
        <div className="flex items-center gap-2 flex-wrap">
          {slide.postSalesFlow?.map((step: string, i: number) => (
            <React.Fragment key={i}>
              <span className="px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm font-semibold text-emerald-800">{step}</span>
              {i < slide.postSalesFlow.length - 1 && <ArrowRight className="w-4 h-4 text-emerald-300 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>

    {/* Key message */}
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">✦</span>
        <p className="text-sm font-bold text-slate-800">One Platform, One Identity</p>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed pl-11">{slide.keyMessage}</p>
    </div>
  </PSSlideLayout>
);
