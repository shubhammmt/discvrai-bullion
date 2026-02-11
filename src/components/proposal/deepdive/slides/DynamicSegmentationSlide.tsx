import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { ArrowRight } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DynamicSegmentationSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { scoring, compositeSegment, personalization, outcome, example } = slide.content;

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Personalization" sectionColor="bg-purple-600">
      <div className="mb-2">
        <div className="w-10 h-0.5 bg-slate-800 mb-1" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-base text-slate-500">{slide.subtitle} — <span className="font-semibold">{example}</span></p>
      </div>

      {/* Scoring dimensions */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {scoring.map((s: any, i: number) => {
          const colors = ['border-blue-200 bg-blue-50', 'border-amber-200 bg-amber-50', 'border-emerald-200 bg-emerald-50'];
          const textColors = ['text-blue-700', 'text-amber-700', 'text-emerald-700'];
          return (
            <div key={i} className={`border rounded-lg p-3 ${colors[i]}`}>
              <div className="flex justify-between items-center mb-1.5">
                <p className={`text-xs font-bold ${textColors[i]}`}>{s.dimension}</p>
                <span className="text-xs font-mono font-bold bg-white rounded px-2 py-0.5 text-slate-700">{s.score}/100</span>
              </div>
              <span className={`text-[11px] font-bold ${textColors[i]} bg-white px-2 py-0.5 rounded-full`}>{s.classification}</span>
              <div className="mt-2 space-y-0.5">
                {s.factors.map((f: string, j: number) => (
                  <p key={j} className="text-[11px] text-slate-600 leading-snug">• {f}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Composite segment */}
      <div className="bg-purple-100 border border-purple-300 rounded-lg px-4 py-2 mb-3 text-center">
        <p className="text-sm font-bold text-purple-800">Composite Segment: "{compositeSegment}"</p>
      </div>

      {/* Personalization + Outcome */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <p className="text-xs font-bold text-slate-700 mb-1">Personalization Applied</p>
          <p className="text-[11px] text-slate-600">🏠 {personalization.homepage}</p>
          <p className="text-[11px] text-slate-600 mt-0.5">📦 Products: {personalization.products.join(', ')}</p>
          <p className="text-[11px] text-slate-600 mt-0.5 italic">💬 {personalization.nudge}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <p className="text-xs font-bold text-emerald-700 mb-1">Impact</p>
          <div className="space-y-0.5">
            {Object.entries(outcome).map(([key, value], i) => (
              <p key={i} className="text-[11px] text-slate-600">
                {key.replace(/([A-Z])/g, ' $1').trim()}: <span className="font-bold text-emerald-700">{value as string}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
