import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';
import { Zap, ArrowRight } from 'lucide-react';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSTriggersSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Trigger Framework</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6">{slide.headline}</h2>

    <div className="space-y-3 mb-6">
      {slide.triggers?.map((t: any, i: number) => (
        <div key={i} className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3 w-1/3">
            <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <p className="text-sm font-bold text-slate-800">{t.event}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
          <p className="text-sm text-slate-600 flex-1">{t.action}</p>
        </div>
      ))}
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">What We Build</p>
      <p className="text-sm text-slate-700 leading-relaxed">{slide.buildNote}</p>
    </div>
  </PSSlideLayout>
);
