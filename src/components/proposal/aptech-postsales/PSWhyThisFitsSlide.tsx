import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSWhyThisFitsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Why This Fits</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-8">{slide.headline}</h2>

    <div className="grid grid-cols-4 gap-4 mb-6">
      {slide.pillars?.map((p: any, i: number) => {
        const colors = [
          { bg: 'bg-blue-50', border: 'border-blue-200', title: 'text-blue-800', bar: 'bg-blue-600' },
          { bg: 'bg-emerald-50', border: 'border-emerald-200', title: 'text-emerald-800', bar: 'bg-emerald-600' },
          { bg: 'bg-indigo-50', border: 'border-indigo-200', title: 'text-indigo-800', bar: 'bg-indigo-600' },
          { bg: 'bg-violet-50', border: 'border-violet-200', title: 'text-violet-800', bar: 'bg-violet-600' },
        ];
        const c = colors[i % 4];
        return (
          <div key={i} className={`${c.bg} border ${c.border} rounded-xl p-5 relative overflow-hidden`}>
            <div className={`absolute top-0 left-0 right-0 h-1 ${c.bar}`} />
            <p className={`text-lg font-bold ${c.title} mb-2 mt-1`}>{p.title}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
          </div>
        );
      })}
    </div>

    <div className="bg-slate-900 rounded-xl p-5">
      <p className="text-base text-slate-200 leading-relaxed">{slide.closingNote}</p>
    </div>
  </PSSlideLayout>
);
