import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSTimelineSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Timeline</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6">{slide.headline}</h2>

    {/* Milestones */}
    <div className="space-y-3 mb-6">
      {slide.milestones?.map((m: any, i: number) => (
        <div key={i} className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
          <div className="w-24 flex-shrink-0">
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${
              i === 0 ? 'bg-blue-100 text-blue-700' :
              i === 1 ? 'bg-emerald-100 text-emerald-700' :
              i === 2 ? 'bg-indigo-100 text-indigo-700' :
              'bg-violet-100 text-violet-700'
            }`}>{m.timeline}</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">{m.milestone}</p>
        </div>
      ))}
    </div>

    {/* Stage 3 note */}
    <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-4">
      <p className="text-sm text-violet-800">{slide.stage3Note}</p>
    </div>

    {/* Message */}
    <div className="bg-slate-900 rounded-xl p-5">
      <p className="text-base text-slate-200 leading-relaxed">{slide.message}</p>
    </div>
  </PSSlideLayout>
);
