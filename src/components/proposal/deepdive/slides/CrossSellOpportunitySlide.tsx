import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { Target, TrendingUp } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const CrossSellOpportunitySlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { opportunities, totalOpportunity, results, distributor } = slide.content;

  const urgencyColors: Record<string, string> = {
    Critical: 'bg-red-600',
    High: 'bg-amber-600',
    Medium: 'bg-blue-600',
  };

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Distributor" sectionColor="bg-teal-600">
      <div className="mb-3">
        <div className="w-10 h-0.5 bg-slate-800 mb-2" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle} — <span className="font-semibold">{distributor}</span></p>
      </div>

      {/* Opportunities */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {opportunities.map((opp: any, i: number) => (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">{opp.name}</span>
              <span className={`text-[8px] font-bold text-white px-2 py-0.5 rounded-full ${urgencyColors[opp.urgency]}`}>
                {opp.urgency}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-500">Score</span>
                <span className="font-bold text-slate-700">{opp.score}/100</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-400 h-2 rounded-full" style={{ width: `${opp.score}%` }} />
              </div>
              <p className="text-[9px] text-slate-600">Clients: <span className="font-bold">{opp.clients}</span></p>
              <p className="text-[9px] text-slate-600">Potential: <span className="font-bold text-emerald-700">{opp.potential}</span></p>
              <p className="text-[9px] text-slate-600">Expected conversion: <span className="font-bold">{opp.conversion}</span></p>
              {opp.deadline && <p className="text-[9px] text-red-600 font-semibold">⏰ Deadline: {opp.deadline}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center bg-teal-50 border border-teal-200 rounded-lg py-1.5 mb-3">
        <p className="text-sm font-bold text-teal-700">
          <Target className="w-4 h-4 inline mr-1" />
          Total Opportunity: {totalOpportunity}
        </p>
      </div>

      {/* Results */}
      <div className="bg-slate-800 rounded-lg p-3">
        <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">
          <TrendingUp className="w-3 h-3 inline mr-1" />Results After 30 Days
        </p>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-[9px] text-slate-400">ELSS</p>
            <p className="text-xs font-bold text-white">{results.elss.converted} clients → {results.elss.aum}</p>
          </div>
          <div>
            <p className="text-[9px] text-slate-400">Retirement</p>
            <p className="text-xs font-bold text-white">{results.retirement.converted} clients → {results.retirement.aum}</p>
          </div>
          <div>
            <p className="text-[9px] text-slate-400">Debt</p>
            <p className="text-xs font-bold text-white">{results.debt.converted} clients → {results.debt.aum}</p>
          </div>
          <div>
            <p className="text-[9px] text-amber-400">Total</p>
            <p className="text-xs font-bold text-amber-300">{results.total}</p>
          </div>
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
