import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { Award } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const MultiFactorScoringSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { factors, totalScore, rank, product, message, conversionRate } = slide.content;

  const barColors = ['bg-blue-500', 'bg-purple-500', 'bg-amber-500', 'bg-teal-500', 'bg-emerald-500'];

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Personalization" sectionColor="bg-purple-600">
      <div className="mb-2">
        <div className="w-10 h-0.5 bg-slate-800 mb-2" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle} — <span className="font-semibold">{product}</span></p>
      </div>

      {/* Factors */}
      <div className="space-y-1.5 mb-3">
        {factors.map((factor: any, i: number) => (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center gap-3">
            <div className="w-28 shrink-0">
              <p className="text-[10px] font-bold text-slate-700">{factor.name}</p>
              <p className="text-[8px] text-slate-500">Weight: {factor.weight}</p>
            </div>
            <div className="flex-1">
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className={`${barColors[i]} h-2.5 rounded-full`} style={{ width: `${factor.score}%` }} />
              </div>
            </div>
            <div className="w-14 text-right shrink-0">
              <span className="text-[11px] font-mono font-bold text-slate-700">{factor.score}</span>
              <span className="text-[9px] text-slate-500">/100</span>
            </div>
            <div className="w-14 text-right shrink-0">
              <span className="text-[10px] font-bold text-emerald-600">{factor.weighted.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Total Score */}
      <div className="bg-slate-800 rounded-lg p-3 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-lg font-bold text-white">Total Score: {totalScore}/100</span>
          </div>
          <span className="text-sm font-bold text-amber-400">{rank}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
          <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-3 rounded-full" style={{ width: `${totalScore}%` }} />
        </div>
      </div>

      {/* Message + Conversion */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 bg-amber-50 border border-amber-200 rounded-lg p-2">
          <p className="text-[9px] text-slate-700 italic leading-tight">{message}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[9px] text-slate-500">Conversion Rate</p>
            <p className="text-lg font-bold text-emerald-700">{conversionRate}</p>
          </div>
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
