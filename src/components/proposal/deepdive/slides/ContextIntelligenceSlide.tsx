import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { Database, Brain, MessageSquare, Target } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const ContextIntelligenceSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const steps = slide.content.steps;
  const stepIcons = [Database, Brain, MessageSquare, Target];
  const stepColors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', badge: 'bg-blue-600' },
    { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', badge: 'bg-purple-600' },
    { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', badge: 'bg-amber-600' },
    { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', badge: 'bg-emerald-600' },
  ];

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="AI Nudges" sectionColor="bg-blue-600">
      <div className="mb-3">
        <div className="w-10 h-0.5 bg-slate-800 mb-2" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle} — <span className="font-semibold text-slate-700">{slide.content.example}</span></p>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {steps.map((step: any, i: number) => {
          const Icon = stepIcons[i];
          const colors = stepColors[i];
          return (
            <div key={i} className={`${colors.bg} border ${colors.border} rounded-lg p-3`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`${colors.badge} text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center`}>{step.step}</span>
                <Icon className={`w-4 h-4 ${colors.icon}`} />
                <span className="text-xs font-bold text-slate-800">{step.title}</span>
              </div>
              {step.details && (
                <div className="space-y-0.5">
                  {step.details.map((d: string, j: number) => (
                    <p key={j} className="text-[9px] text-slate-600 leading-tight">• {d}</p>
                  ))}
                </div>
              )}
              {step.message && (
                <div className="bg-white rounded p-2 mt-1 border border-amber-200">
                  <p className="text-[9px] text-slate-700 italic leading-tight">{step.message}</p>
                  <div className="flex gap-2 mt-1.5">
                    <span className="text-[8px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">{step.channel}</span>
                    <span className="text-[8px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">{step.timing}</span>
                  </div>
                  <div className="flex gap-1.5 mt-1">
                    {step.cta.map((c: string, k: number) => (
                      <span key={k} className="text-[8px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              {step.metrics && (
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  {step.metrics.map((m: any, j: number) => (
                    <div key={j} className="bg-white rounded px-2 py-1 border border-emerald-200">
                      <p className="text-[8px] text-slate-500">{m.label}</p>
                      <p className="text-[10px] font-bold text-emerald-700">{m.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DeepDiveSlideLayout>
  );
};
