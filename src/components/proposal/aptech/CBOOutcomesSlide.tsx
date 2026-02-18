import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

export const CBOOutcomesSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Business Outcomes</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-5">{slide.headline}</h2>

    {/* Progression table */}
    <div className="mb-5">
      {/* Header */}
      <div className="grid grid-cols-5 gap-3 mb-2 px-3">
        {['Phase', 'Timeline', 'Conversion', 'Enrollments/Month', 'Revenue Impact'].map((h, i) => (
          <div key={i} className="text-xs font-semibold uppercase tracking-wider text-slate-500">{h}</div>
        ))}
      </div>
      <div className="space-y-2">
        {slide.progressionRows?.map((row: any, i: number) => (
          <div key={i} className={`grid grid-cols-5 gap-3 rounded-xl px-3 py-3 items-center border ${
            row.highlight 
              ? 'bg-blue-600 border-blue-700 text-white' 
              : i === 0 
                ? 'bg-slate-100 border-slate-200'
                : 'bg-slate-50 border-slate-100'
          }`}>
            <div className={`font-bold text-sm ${row.highlight ? 'text-white' : 'text-slate-800'}`}>{row.phase}</div>
            <div className={`text-xs ${row.highlight ? 'text-blue-200' : 'text-slate-500'}`}>{row.timeline}</div>
            <div className={`font-bold text-base ${row.highlight ? 'text-white' : 'text-blue-600'}`}>{row.conversion}</div>
            <div className={`text-sm font-medium ${row.highlight ? 'text-blue-100' : 'text-slate-700'}`}>{row.enrollments}</div>
            <div className={`text-sm font-semibold ${row.highlight ? 'text-green-300' : i === 0 ? 'text-slate-500' : 'text-emerald-600'}`}>{row.revenue}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Cumulative impact */}
    <div className="grid grid-cols-3 gap-4">
      {slide.cumulative?.map((c: any, i: number) => (
        <div key={i} className="bg-slate-900 rounded-xl p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">{c.label}</p>
          <p className="text-xl font-bold text-blue-400">{c.value}</p>
        </div>
      ))}
    </div>
  </CBOSlideLayout>
);
