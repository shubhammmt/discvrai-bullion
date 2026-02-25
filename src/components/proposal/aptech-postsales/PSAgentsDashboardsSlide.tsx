import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

export const PSAgentsDashboardsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Agents & Dashboards</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6">{slide.headline}</h2>

    <div className="grid grid-cols-2 gap-6">
      {/* Agents */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">Student-Facing Agents (One Interface)</p>
        <div className="space-y-2.5">
          {slide.agents?.map((a: any, i: number) => (
            <div key={i} className="bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">{a.code}</span>
                <span className="text-sm font-bold text-slate-800">{a.name}</span>
              </div>
              <p className="text-sm text-slate-600">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboards */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">Internal Dashboards</p>
        <div className="space-y-2.5">
          {slide.dashboards?.map((d: any, i: number) => (
            <div key={i} className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded">{d.code}</span>
                <span className="text-sm font-bold text-slate-800">{d.name}</span>
              </div>
              <p className="text-sm text-slate-600">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PSSlideLayout>
);
