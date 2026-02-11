import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { Clock, ArrowRight, Zap } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const AutomatedCommunicationSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { traditional, aiEnabled, timeSavings, totalSavings } = slide.content;

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Distributor" sectionColor="bg-teal-600">
      <div className="mb-2">
        <div className="w-10 h-0.5 bg-slate-800 mb-1" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-base text-slate-500">{slide.subtitle}</p>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">❌ Traditional</p>
          <p className="text-base font-bold text-red-700 mb-1">{traditional.time}</p>
          <p className="text-[11px] text-slate-600">{traditional.task}</p>
          <p className="text-[11px] text-slate-500 mt-1">Quality: {traditional.quality}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">✅ AI-Enabled</p>
          <p className="text-base font-bold text-emerald-700 mb-1">{aiEnabled.time}</p>
          {aiEnabled.steps.map((s: string, i: number) => (
            <p key={i} className="text-[11px] text-slate-600 leading-snug">✓ {s}</p>
          ))}
        </div>
      </div>

      {/* Time savings table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mb-3">
        <div className="grid grid-cols-4 bg-slate-800 text-white text-xs font-bold px-4 py-2">
          <span>Task</span>
          <span className="text-center">Traditional</span>
          <span className="text-center">AI-Enabled</span>
          <span className="text-center">Savings</span>
        </div>
        {timeSavings.map((ts: any, i: number) => (
          <div key={i} className={`grid grid-cols-4 text-xs px-4 py-2 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
            <span className="font-semibold text-slate-700">{ts.task}</span>
            <span className="text-center text-red-600">{ts.traditional}</span>
            <span className="text-center text-emerald-600 font-semibold">{ts.ai}</span>
            <span className="text-center font-bold text-emerald-700">{ts.savings}</span>
          </div>
        ))}
      </div>

      {/* Total savings */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-4">
        <div className="grid grid-cols-5 gap-4 text-center">
          {Object.entries(totalSavings).map(([key, value], i) => (
            <div key={i}>
              <p className="text-[11px] text-teal-200">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-base font-bold text-white">{value as string}</p>
            </div>
          ))}
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
