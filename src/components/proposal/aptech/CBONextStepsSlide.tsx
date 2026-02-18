import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

const periodColors: Record<string, string> = {
  'This Week': 'bg-blue-600',
  'Next 2 Weeks': 'bg-indigo-600',
  'Next 30 Days': 'bg-violet-600',
  '60–90 Days': 'bg-purple-600',
};

export const CBONextStepsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Next Steps</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-5">{slide.headline}</h2>

    <div className="grid grid-cols-4 gap-3 mb-5">
      {slide.timeline?.map((period: any, i: number) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${periodColors[period.period] || 'bg-slate-600'}`}>
            {period.period}
          </span>
          <ul className="mt-3 space-y-2">
            {period.items.map((item: string, ii: number) => (
              <li key={ii} className="flex items-start gap-1.5">
                <span className="text-blue-500 text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                <span className="text-xs text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Decision options */}
    <div className="grid grid-cols-2 gap-4">
      {slide.options?.map((opt: any, i: number) => (
        <div key={i} className={`rounded-xl border-2 p-4 ${i === 0 ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white ${i === 0 ? 'bg-blue-600' : 'bg-slate-500'}`}>
              {opt.label}
            </span>
            <p className="font-bold text-slate-800 text-sm">{opt.title}</p>
            {opt.note && <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{opt.note}</span>}
          </div>
          <p className="text-xs text-slate-600 pl-9">{opt.desc}</p>
        </div>
      ))}
    </div>
  </CBOSlideLayout>
);
