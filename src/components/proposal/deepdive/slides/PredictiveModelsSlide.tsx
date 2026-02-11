import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { AlertTriangle, Shield } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const PredictiveModelsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { features, churnScore, churnProbability, interventions, expectedOutcome, userProfile } = slide.content;

  const riskColors: Record<string, string> = { High: 'text-red-600 bg-red-50', Medium: 'text-amber-600 bg-amber-50', Low: 'text-emerald-600 bg-emerald-50' };

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Personalization" sectionColor="bg-purple-600">
      <div className="mb-2">
        <div className="w-10 h-0.5 bg-slate-800 mb-1" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-base text-slate-500">{slide.subtitle}</p>
      </div>

      {/* User profile bar */}
      <div className="bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 mb-2 flex gap-4 text-[11px] text-slate-600">
        {Object.entries(userProfile).map(([k, v], i) => (
          <span key={i}><span className="font-bold text-slate-700">{k}:</span> {v as string}</span>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-5 gap-2 mb-2">
        {features.map((f: any, i: number) => (
          <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <div className="flex justify-between items-start mb-1">
              <p className="text-[11px] font-bold text-slate-700 leading-tight">{f.name}</p>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${riskColors[f.riskLevel]}`}>{f.riskLevel}</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-1">Wt: {f.weight} | Score: {f.score}</p>
            {f.details.map((d: string, j: number) => (
              <p key={j} className="text-[10px] text-slate-500 leading-snug">• {d}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Churn Result */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-base font-bold text-red-700">Churn Probability: {churnProbability}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Score: {churnScore}/100</span>
            <div className="w-28 bg-slate-200 rounded-full h-2.5">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${100 - churnScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Interventions + Outcome */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-bold text-blue-700 mb-1"><Shield className="w-4 h-4 inline mr-1" />Proactive Interventions</p>
          {interventions.map((int: string, i: number) => (
            <p key={i} className="text-[11px] text-slate-600 leading-snug">• {int}</p>
          ))}
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <p className="text-xs font-bold text-emerald-700 mb-1">Expected Outcome</p>
          {Object.entries(expectedOutcome).map(([k, v], i) => (
            <p key={i} className="text-[11px] text-slate-600">
              {k.replace(/([A-Z])/g, ' $1').trim()}: <span className="font-bold text-emerald-700">{v as string}</span>
            </p>
          ))}
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
