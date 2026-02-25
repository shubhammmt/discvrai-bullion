import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';
import { MessageSquare, Bot } from 'lucide-react';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSOneInterfaceSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Single Interface</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-4 max-w-3xl">{slide.headline}</h2>
    <p className="text-base text-slate-600 mb-6 max-w-3xl leading-relaxed">{slide.keyMessage}</p>

    {/* Two-column: User vs Behind */}
    <div className="grid grid-cols-2 gap-5 mb-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">What User Sees</p>
        </div>
        {slide.userSees?.map((row: any, i: number) => (
          <div key={i} className="mb-3 last:mb-0">
            <p className="text-sm font-semibold text-slate-800">{row.user}</p>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-5 h-5 text-blue-600" />
          <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Behind the Scenes</p>
        </div>
        {slide.userSees?.map((row: any, i: number) => (
          <div key={i} className="mb-3 last:mb-0">
            <p className="text-sm text-slate-700">{row.behind}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Platforms */}
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Where This Interface Can Sit</p>
      <div className="flex items-center gap-4">
        {slide.platforms?.map((p: string, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-slate-700">{p}</span>
          </div>
        ))}
      </div>
    </div>
  </PSSlideLayout>
);
