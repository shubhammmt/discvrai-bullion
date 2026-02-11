import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { Clock, TrendingUp, ArrowRight } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const TimingPredictionSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { dataSources, comparison, example } = slide.content;

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="AI Nudges" sectionColor="bg-blue-600">
      <div className="mb-2">
        <div className="w-10 h-0.5 bg-slate-800 mb-2" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        {dataSources.map((ds: any, i: number) => (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">{ds.category}</p>
            {ds.items.map((item: string, j: number) => (
              <p key={j} className="text-[9px] text-slate-600 leading-tight">• {item}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-1.5">❌ Traditional Approach</p>
          <p className="text-[9px] text-slate-600">Send: {comparison.traditional.sendTime}</p>
          <p className="text-[9px] text-slate-600">Open rate: {comparison.traditional.openRate}</p>
          <p className="text-[9px] text-slate-600">Trading action: {comparison.traditional.tradingAction}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1.5">✅ AI-Enabled Approach</p>
          <p className="text-[9px] text-slate-600">Send: {comparison.aiEnabled.sendTime}</p>
          <p className="text-[9px] text-slate-600">Open rate: <span className="font-bold text-emerald-700">{comparison.aiEnabled.openRate}</span></p>
          <p className="text-[9px] text-slate-600">Trading action: <span className="font-bold text-emerald-700">{comparison.aiEnabled.tradingAction}</span></p>
        </div>
      </div>

      {/* Impact metrics */}
      <div className="bg-slate-800 rounded-lg p-3">
        <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">
          <Clock className="w-3 h-3 inline mr-1" />
          {example.title} — {example.result.totalTime} send-to-trade
        </p>
        <div className="grid grid-cols-3 gap-3">
          {example.impact.map((imp: any, i: number) => (
            <div key={i} className="text-center">
              <p className="text-[9px] text-slate-400">{imp.label}</p>
              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-red-400 line-through">{imp.before}</span>
                <ArrowRight className="w-2.5 h-2.5 text-slate-500" />
                <span className="text-sm font-bold text-emerald-400">{imp.after}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
