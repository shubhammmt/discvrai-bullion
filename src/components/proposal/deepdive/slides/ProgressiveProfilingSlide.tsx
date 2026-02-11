import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { User, Target } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const ProgressiveProfilingSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { timeline, completeProfile, example } = slide.content;

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Personalization" sectionColor="bg-purple-600">
      <div className="mb-2">
        <div className="w-10 h-0.5 bg-slate-800 mb-2" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle} — <span className="font-semibold">{example}</span></p>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        {timeline.map((t: any, i: number) => (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-2">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[9px] font-bold text-slate-700">{t.period}</p>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-200 rounded-full h-1.5 mb-1.5">
              <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-1.5 rounded-full transition-all" style={{ width: `${t.completeness}%` }} />
            </div>
            <p className="text-[8px] font-mono text-purple-600 mb-1">{t.completeness}% complete</p>
            {t.data.map((d: string, j: number) => (
              <p key={j} className="text-[8px] text-slate-600 leading-tight">• {d}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Complete Profile Summary */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-amber-400" />
          <span className="text-[11px] font-bold text-white uppercase tracking-wider">Complete Profile → Next Best Action</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <p className="text-[9px] text-purple-200">Conversion Probability</p>
            <p className="text-sm font-bold text-white">{completeProfile.conversionProb}</p>
          </div>
          <div>
            <p className="text-[9px] text-purple-200">Churn Risk</p>
            <p className="text-sm font-bold text-emerald-300">{completeProfile.churnRisk}</p>
          </div>
          <div>
            <p className="text-[9px] text-purple-200">Lifetime Value</p>
            <p className="text-sm font-bold text-amber-300">{completeProfile.ltv}</p>
          </div>
          <div>
            <p className="text-[9px] text-purple-200">Next Action</p>
            <p className="text-[10px] font-semibold text-white leading-tight">{completeProfile.nextAction}</p>
          </div>
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
