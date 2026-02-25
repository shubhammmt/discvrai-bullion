import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';
import { MessageSquare } from 'lucide-react';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSDemoSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Live Demo</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-4 max-w-3xl">{slide.headline}</h2>
    <p className="text-base text-slate-600 mb-8 max-w-3xl leading-relaxed">{slide.message}</p>

    {/* Chat mockup with capabilities */}
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-base font-bold text-slate-800">One Thread, Full Journey</p>
            <p className="text-xs text-slate-500">Single conversational interface</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {slide.capabilities?.map((cap: string, i: number) => (
            <div key={i} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">{i + 1}</span>
              <span className="text-sm font-medium text-slate-700">{cap}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PSSlideLayout>
);
