import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { Combine } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const MultiSignalFusionSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { signals, fusedScore, threshold, decision, generatedMessage, outcome, example } = slide.content;

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="AI Nudges" sectionColor="bg-blue-600">
      <div className="mb-2">
        <div className="w-10 h-0.5 bg-slate-800 mb-1" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-base text-slate-500">{slide.subtitle} — <span className="font-semibold">{example}</span></p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-3">
        {signals.map((signal: any, i: number) => {
          const colors = ['border-blue-200 bg-blue-50', 'border-purple-200 bg-purple-50', 'border-amber-200 bg-amber-50', 'border-teal-200 bg-teal-50'];
          const textColors = ['text-blue-700', 'text-purple-700', 'text-amber-700', 'text-teal-700'];
          return (
            <div key={i} className={`border rounded-lg p-3 ${colors[i]}`}>
              <div className="flex justify-between items-center mb-1.5">
                <p className={`text-xs font-bold ${textColors[i]}`}>{signal.name}</p>
                <span className="text-[11px] bg-white rounded px-2 py-0.5 font-mono font-bold text-slate-700">{signal.score}/100</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-1">Weight: {signal.weight}</p>
              {signal.details.map((d: string, j: number) => (
                <p key={j} className="text-[11px] text-slate-600 leading-snug">• {d}</p>
              ))}
            </div>
          );
        })}
      </div>

      {/* Fused score */}
      <div className="bg-slate-800 rounded-lg p-3 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Combine className="w-5 h-5 text-amber-400" />
            <span className="text-base font-bold text-white">Fused Score: {fusedScore}/100</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Threshold: {threshold}</span>
            <span className="text-xs bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-bold">{decision}</span>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-3 rounded-full" style={{ width: `${fusedScore}%` }} />
        </div>
      </div>

      {/* Message + Outcome */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs font-bold text-amber-700 mb-1">Generated Message</p>
          <p className="text-[11px] text-slate-700 italic leading-snug">{generatedMessage}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <p className="text-xs font-bold text-emerald-700 mb-1">Outcome</p>
          <div className="space-y-1">
            <p className="text-[11px] text-slate-600">Open rate: <span className="font-bold text-emerald-700">{outcome.openRate}</span></p>
            <p className="text-[11px] text-slate-600">Conversion: <span className="font-bold text-emerald-700">{outcome.conversion}</span></p>
            <p className="text-[11px] text-slate-600">Revenue: <span className="font-bold text-emerald-700">{outcome.revenue}</span></p>
          </div>
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
