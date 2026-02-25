import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSInvestmentSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Investment</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6">{slide.headline}</h2>

    <div className="grid grid-cols-3 gap-6">
      {/* Investment table */}
      <div className="col-span-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">One-Time Investment (Indicative)</p>
        <div className="grid grid-cols-2 gap-2 mb-2 px-3">
          {['Stage', 'One-Time'].map((h) => (
            <p key={h} className="text-xs font-bold uppercase tracking-wider text-slate-400">{h}</p>
          ))}
        </div>
        <div className="space-y-1.5">
          {slide.investmentRows?.map((row: any, i: number) => (
            <div key={i} className={`grid grid-cols-2 gap-2 rounded-lg px-3 py-3 items-center border ${
              row.isTotal ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <p className={`font-bold text-sm ${row.isTotal ? 'text-white' : 'text-slate-800'}`}>{row.stage}</p>
              <p className={`font-bold text-lg ${row.isTotal ? 'text-blue-300' : 'text-slate-900'}`}>{row.oneTime}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recurring + note */}
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">Recurring (Annual)</p>
          <p className="text-sm text-slate-700 leading-relaxed">{slide.recurring}</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Note</p>
          <p className="text-sm text-slate-600 leading-relaxed">{slide.note}</p>
        </div>
      </div>
    </div>
  </PSSlideLayout>
);
