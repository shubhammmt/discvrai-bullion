import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

export const CBOProblemSolutionSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Problem–Solution Mapping</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-5">{slide.headline}</h2>

    {/* Table header */}
    <div className="grid grid-cols-12 gap-2 mb-2 px-3">
      {['Problem', 'Solution', 'Timeline', 'Investment'].map((h, i) => (
        <div key={i} className={`text-xs font-semibold uppercase tracking-wider text-slate-500 ${i === 0 ? 'col-span-4' : i === 1 ? 'col-span-4' : 'col-span-2'}`}>{h}</div>
      ))}
    </div>

    <div className="space-y-1.5">
      {slide.rows?.map((row: any, i: number) => (
        <div key={i} className="grid grid-cols-12 gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5 items-center hover:bg-blue-50 hover:border-blue-100 transition-colors">
          <div className="col-span-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
            <span className="text-sm text-slate-700">{row.problem}</span>
          </div>
          <div className="col-span-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
            <span className="text-sm font-medium text-blue-700">{row.solution}</span>
          </div>
          <div className="col-span-2 text-xs text-slate-500">{row.timeline}</div>
          <div className={`col-span-2 text-xs font-semibold ${row.investment === 'Included' ? 'text-emerald-600' : 'text-slate-700'}`}>
            {row.investment}
          </div>
        </div>
      ))}
    </div>
  </CBOSlideLayout>
);
