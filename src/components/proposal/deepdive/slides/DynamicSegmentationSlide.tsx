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
        <div className="w-10 h-0.5 bg-slate-800 mb-2" />
        <h1 className="text-xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle} — <span className="font-semibold">{example}</span></p>
      </div>

      {/* Scoring dimensions */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {scoring.map((s: any, i: number) => {
          const colors = ['border-blue-200 bg-blue-50', 'border-amber-200 bg-amber-50', 'border-emerald-200 bg-emerald-50'];
          const textColors = ['text-blue-700', 'text-amber-700', 'text-emerald-700'];
          return (
            <div key={i} className={`border rounded-lg p-2 ${colors[i]}`}>
              <div className="flex justify-between items-center mb-1">
                <p className={`text-[10px] font-bold ${textColors[i]}`}>{s.dimension}</p>
                <span className="text-[10px] font-mono font-bold bg-white rounded px-1.5 py-0.5 text-slate-700">{s.score}/100</span>
              </div>
              <span className={`text-[8px] font-bold ${textColors[i]} bg-white px-1.5 py-0.5 rounded-full`}>{s.classification}</span>
              <div className="mt-1.5 space-y-0.5">
                {s.factors.map((f: string, j: number) => (
                  <p key={j} className="text-[8px] text-slate-600 leading-tight">• {f}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Composite segment */}
      <div className="bg-purple-100 border border-purple-300 rounded-lg px-3 py-1.5 mb-2 text-center">
        <p className="text-[10px] font-bold text-purple-800">Composite Segment: "{compositeSegment}"</p>
      </div>

      {/* Personalization + Outcome */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2">
          <p className="text-[10px] font-bold text-slate-700 mb-1">Personalization Applied</p>
          <p className="text-[8px] text-slate-600">🏠 {personalization.homepage}</p>
          <p className="text-[8px] text-slate-600 mt-0.5">📦 Products: {personalization.products.join(', ')}</p>
          <p className="text-[8px] text-slate-600 mt-0.5 italic">💬 {personalization.nudge}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2">
          <p className="text-[10px] font-bold text-emerald-700 mb-1">Impact</p>
          <div className="space-y-0.5">
            {Object.entries(outcome).map(([key, value], i) => (
              <p key={i} className="text-[9px] text-slate-600">
                {key.replace(/([A-Z])/g, ' $1').trim()}: <span className="font-bold text-emerald-700">{value as string}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
