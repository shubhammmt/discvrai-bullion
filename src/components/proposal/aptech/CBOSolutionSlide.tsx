import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

const layerColors: Record<string, { border: string; bg: string; num: string; dot: string }> = {
  blue:   { border: 'border-blue-200',   bg: 'bg-blue-50',   num: 'bg-blue-600 text-white', dot: 'bg-blue-500' },
  indigo: { border: 'border-indigo-200', bg: 'bg-indigo-50', num: 'bg-indigo-600 text-white', dot: 'bg-indigo-500' },
  violet: { border: 'border-violet-200', bg: 'bg-violet-50', num: 'bg-violet-600 text-white', dot: 'bg-violet-500' },
};

export const CBOSolutionSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">The Solution</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-2">{slide.headline}</h2>

    {/* Quote */}
    <div className="bg-slate-900 rounded-xl px-6 py-3 mb-6">
      <p className="text-slate-200 italic text-sm">"{slide.quote}"</p>
    </div>

    {/* Three layers */}
    <div className="grid grid-cols-3 gap-5">
      {slide.layers?.map((layer: any, i: number) => {
        const c = layerColors[layer.color] || layerColors.blue;
        return (
          <div key={i} className={`rounded-xl border-2 ${c.border} ${c.bg} p-5`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${c.num}`}>{layer.number}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{layer.label}</span>
            </div>
            <p className="font-bold text-slate-800 mb-3">{layer.title}</p>
            <ul className="space-y-2">
              {layer.items.map((item: string, ii: number) => (
                <li key={ii} className="flex items-start gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                  <span className="text-xs text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>

    {/* Flow arrow */}
    <div className="mt-5 flex items-center justify-center gap-2">
      {['Qualify', '→', 'Convert', '→', 'Retain'].map((s, i) => (
        <span key={i} className={`text-sm font-semibold ${s === '→' ? 'text-slate-400' : 'text-blue-700'}`}>{s}</span>
      ))}
    </div>
  </CBOSlideLayout>
);
