import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';
import { Mail, Phone } from 'lucide-react';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

export const CBOAskSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">The Ask</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-5">{slide.headline}</h2>

    <div className="grid grid-cols-3 gap-6">
      {/* Investment ask */}
      <div className="bg-slate-900 rounded-xl p-6 flex flex-col">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Immediate Approval Required</p>
        <div className="space-y-3 flex-1">
          <div className="text-center py-4 border border-blue-700 rounded-lg bg-blue-900/30">
            <p className="text-3xl font-bold text-blue-400">{slide.ask?.investment}</p>
            <p className="text-xs text-blue-300 mt-1">Phase 1A Investment</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">{slide.ask?.timeline}</p>
            <p className="text-xs text-slate-400">Deployment timeline</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">{slide.ask?.scope}</p>
            <p className="text-xs text-slate-400">Pilot scope</p>
          </div>
        </div>
      </div>

      {/* Deliverables */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">What You Get</p>
        <ul className="space-y-2">
          {slide.deliverables?.map((d: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-blue-500 font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
              <span className="text-xs text-slate-700">{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Success criteria + contact */}
      <div className="flex flex-col gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Success Criteria</p>
          <div className="space-y-2">
            {slide.successCriteria?.map((s: any, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-bold text-sm text-emerald-700 min-w-[90px]">{s.metric}</span>
                <span className="text-xs text-slate-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Contact</p>
          <p className="font-bold text-slate-800 text-sm">{slide.contact?.name}</p>
          <p className="text-xs text-slate-500 mb-2">{slide.contact?.role}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Mail className="w-3 h-3 text-blue-500" />
              {slide.contact?.email}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Phone className="w-3 h-3 text-blue-500" />
              {slide.contact?.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  </CBOSlideLayout>
);
