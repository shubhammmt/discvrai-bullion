import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSPresalesRecapSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Pre-Sales Recap</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">{slide.headline}</h2>

    {/* Recap table */}
    <div className="mb-6">
      <div className="grid grid-cols-3 gap-3 mb-2 px-4">
        {['Stage', 'What We Proposed', 'Outcome'].map((h) => (
          <p key={h} className="text-xs font-bold uppercase tracking-wider text-slate-400">{h}</p>
        ))}
      </div>
      {slide.recapRows?.map((row: any, i: number) => (
        <div key={i} className="grid grid-cols-3 gap-3 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3 mb-2">
          <p className="text-sm font-bold text-emerald-700">{row.stage}</p>
          <p className="text-sm text-slate-700">{row.proposed}</p>
          <p className="text-sm text-slate-600">{row.outcome}</p>
        </div>
      ))}
    </div>

    {/* Gap callout */}
    <div className="bg-slate-900 rounded-xl p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">The Gap We're Closing Today</p>
      <p className="text-base text-slate-200 leading-relaxed">{slide.gap}</p>
    </div>
  </PSSlideLayout>
);
