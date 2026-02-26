import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSTimelineInvestmentSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Timeline & Investment</p>
    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-6">{slide.headline}</h2>

    <div className="grid grid-cols-2 gap-6">
      {/* Timeline */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Timeline (from Kick-off)</p>
        <div className="space-y-2">
          {slide.milestones?.map((m: any, i: number) => {
            const colors = [
              'bg-blue-50 border-blue-200 text-blue-700',
              'bg-emerald-50 border-emerald-200 text-emerald-700',
              'bg-indigo-50 border-indigo-200 text-indigo-700',
              'bg-violet-50 border-violet-200 text-violet-700',
              'bg-slate-100 border-slate-300 text-slate-600',
            ];
            const c = colors[i] || colors[4];
            return (
              <div key={i} className={`flex items-center gap-3 ${c.split(' ')[0]} border ${c.split(' ')[1]} rounded-lg px-4 py-3`}>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border ${c.split(' ')[1]} ${c.split(' ')[2]} flex-shrink-0`}>
                  {m.timeline}
                </span>
                <p className="text-sm font-semibold text-slate-800">{m.milestone}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Investment */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Investment</p>
        
        <div className="bg-slate-900 rounded-xl p-5 mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">One-Time</p>
          <p className="text-3xl font-bold text-white">₹65L</p>
          <p className="text-sm text-slate-400 mt-1">Post-Sales Platform — end to end</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Recurring</p>
          <p className="text-2xl font-bold text-slate-900">₹2L/month</p>
          <p className="text-sm text-slate-500 mt-1">+ cloud infrastructure charges</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-sm text-slate-500 italic">{slide.note}</p>
        </div>
      </div>
    </div>
  </PSSlideLayout>
);
