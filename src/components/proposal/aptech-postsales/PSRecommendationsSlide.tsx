import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';
import { Sparkles } from 'lucide-react';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSRecommendationsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Recommendations</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-4 max-w-3xl">{slide.headline}</h2>
    <p className="text-base text-slate-600 mb-6 max-w-3xl leading-relaxed">{slide.description}</p>

    {/* Scenarios table */}
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-3 mb-2 px-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">When</p>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">What Student Sees</p>
      </div>
      {slide.scenarios?.map((s: any, i: number) => (
        <div key={i} className="grid grid-cols-2 gap-3 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3 mb-2">
          <p className="text-sm font-semibold text-slate-700">{s.when}</p>
          <div className="bg-white rounded-lg border border-emerald-200 px-3 py-2">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600">AI Message</span>
            </div>
            <p className="text-sm text-slate-700 italic">{s.what}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Why it matters */}
    <div className="bg-slate-900 rounded-xl p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Why It Matters</p>
      <p className="text-base text-slate-200 leading-relaxed">{slide.whyItMatters}</p>
    </div>
  </PSSlideLayout>
);
