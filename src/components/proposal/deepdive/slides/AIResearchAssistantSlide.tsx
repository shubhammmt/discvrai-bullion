import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { Search, Clock, ArrowRight, Star } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const AIResearchAssistantSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { traditional, aiEnabled, timeSaved, totalProcess } = slide.content;

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Distributor" sectionColor="bg-teal-600">
      <div className="mb-2">
        <div className="w-10 h-0.5 bg-slate-800 mb-2" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Traditional */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-2">❌ Traditional ({traditional.time})</p>
          <p className="text-[9px] text-slate-500 mb-1.5">Quality: {traditional.quality}</p>
          {traditional.steps.map((s: string, i: number) => (
            <p key={i} className="text-[8px] text-slate-600 leading-tight">{i + 1}. {s}</p>
          ))}
        </div>

        {/* AI-Enabled */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-2">✅ AI-Enabled ({aiEnabled.time})</p>
          <div className="bg-white border border-emerald-200 rounded p-2 mb-2">
            <p className="text-[9px] text-slate-600 italic">{aiEnabled.query}</p>
          </div>
          <p className="text-[9px] text-slate-500 mb-1">Scoring: {aiEnabled.scoring.join(' | ')}</p>
          <p className="text-[9px] text-slate-500">Quality: <span className="font-bold text-emerald-700">{aiEnabled.quality}</span></p>
        </div>
      </div>

      {/* Top Results */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mb-3">
        <div className="bg-slate-800 px-3 py-1.5">
          <p className="text-[10px] font-bold text-white uppercase tracking-wider">Top 3 Recommendations</p>
        </div>
        <div className="grid grid-cols-3 gap-0 divide-x divide-slate-200">
          {aiEnabled.topResults.map((fund: any) => (
            <div key={fund.rank} className="p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold text-amber-600">#{fund.rank}</span>
                <p className="text-[10px] font-bold text-slate-800">{fund.name}</p>
              </div>
              <div className="space-y-0.5 text-[8px] text-slate-600">
                <p>Score: <span className="font-bold text-emerald-600">{fund.score}/100</span></p>
                <p>5Y CAGR: <span className="font-bold">{fund.cagr}</span></p>
                <p>Volatility: {fund.volatility}</p>
                <p>Sharpe: {fund.sharpe}</p>
                <p>Rating: <span className="text-amber-500">{fund.rating}</span></p>
                <p>Expense: {fund.expense}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time saved */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-300" />
          <span className="text-sm font-bold text-white">Time Saved: {timeSaved}</span>
        </div>
        <span className="text-[10px] text-teal-200">Total Process: {totalProcess}</span>
      </div>
    </DeepDiveSlideLayout>
  );
};
