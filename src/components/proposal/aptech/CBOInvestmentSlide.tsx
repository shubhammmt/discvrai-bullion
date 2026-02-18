import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

export const CBOInvestmentSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Investment & ROI</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-5">{slide.headline}</h2>

    <div className="grid grid-cols-3 gap-6">
      {/* Investment table (2/3 width) */}
      <div className="col-span-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Investment Breakdown</p>
        <div className="grid grid-cols-4 gap-2 mb-2 px-2">
          {['Phase', 'Timeline', 'Investment', 'Deliverables'].map((h, i) => (
            <div key={i} className="text-xs font-semibold uppercase tracking-wider text-slate-400">{h}</div>
          ))}
        </div>
        <div className="space-y-1.5">
          {slide.investmentRows?.map((row: any, i: number) => (
            <div key={i} className={`grid grid-cols-4 gap-2 rounded-lg px-2 py-2.5 items-center border ${
              row.phase === 'Total' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className={`font-bold text-sm ${row.phase === 'Total' ? 'text-white' : 'text-blue-700'}`}>{row.phase}</div>
              <div className={`text-xs ${row.phase === 'Total' ? 'text-slate-400' : 'text-slate-500'}`}>{row.timeline}</div>
              <div className={`font-bold text-sm ${row.phase === 'Total' ? 'text-blue-300' : 'text-slate-800'}`}>{row.investment}</div>
              <div className={`text-xs ${row.phase === 'Total' ? 'text-slate-300' : 'text-slate-600'}`}>{row.deliverables}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI callouts (1/3 width) */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">ROI Summary</p>
        <div className="space-y-3">
          {slide.roi?.map((r: any, i: number) => (
            <div key={i} className={`rounded-xl p-4 border ${i === slide.roi.length - 1 ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'}`}>
              <p className="text-xs text-slate-500 mb-1">{r.label}</p>
              <p className={`text-xl font-bold ${i === slide.roi.length - 1 ? 'text-emerald-600' : 'text-slate-900'}`}>{r.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </CBOSlideLayout>
);
