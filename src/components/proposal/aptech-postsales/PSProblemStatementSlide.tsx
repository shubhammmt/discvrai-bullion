import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';
import { AlertTriangle } from 'lucide-react';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSProblemStatementSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-red-600 mb-2">Problem Statement</p>
    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-6 max-w-4xl">{slide.headline}</h2>

    {/* Context */}
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-5 mb-4">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Context</p>
      <p className="text-base text-slate-700 leading-relaxed">{slide.context}</p>
    </div>

    {/* Core Issue callout */}
    <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-5 mb-4 flex items-start gap-4">
      <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2">Core Issue</p>
        <p className="text-lg font-semibold text-red-800 leading-relaxed italic">{slide.coreIssue}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {/* Impact */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-5">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">Impact</p>
        <p className="text-base text-slate-700 leading-relaxed">{slide.impact}</p>
      </div>

      {/* What Aptech Wants */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-5">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">What Aptech Wants</p>
        <p className="text-base text-slate-700 leading-relaxed">{slide.whatAptechWants}</p>
      </div>
    </div>
  </PSSlideLayout>
);
