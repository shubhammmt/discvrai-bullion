import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { ArrowDown, ArrowRight, Sparkles, RefreshCcw } from 'lucide-react';

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const SynergyArchitectureSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { flow, compoundEffect, revenueImpact } = slide.content;

  const systemColors = [
    { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', header: 'bg-blue-600' },
    { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700', header: 'bg-purple-600' },
    { bg: 'bg-teal-50', border: 'border-teal-300', text: 'text-teal-700', header: 'bg-teal-600' },
  ];

  const stages = [
    { label: 'Baseline', value: compoundEffect.baseline.conversion, color: 'bg-slate-400' },
    { label: 'With Nudges', value: compoundEffect.withNudges.conversion, color: 'bg-blue-500', improvement: compoundEffect.withNudges.improvement },
    { label: 'With Personalization', value: compoundEffect.withPersonalization.conversion, color: 'bg-purple-500', improvement: compoundEffect.withPersonalization.improvement },
    { label: 'With Distributor', value: compoundEffect.withDistributor.conversion, color: 'bg-teal-500', improvement: compoundEffect.withDistributor.improvement },
    { label: 'Compound Effects', value: compoundEffect.withCompound.conversion, color: 'bg-amber-500', improvement: compoundEffect.withCompound.improvement },
  ];

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Summary" sectionColor="bg-slate-700">
      <div className="mb-3">
        <div className="w-10 h-0.5 bg-slate-800 mb-2" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle}</p>
      </div>

      {/* Flow */}
      <div className="flex items-stretch gap-2 mb-4">
        {flow.map((f: any, i: number) => (
          <React.Fragment key={i}>
            <div className={`flex-1 ${systemColors[i].bg} border ${systemColors[i].border} rounded-lg p-3`}>
              <p className={`text-[10px] font-bold ${systemColors[i].text} mb-1`}>{f.system}</p>
              <p className="text-[8px] text-slate-600 leading-tight">{f.data}</p>
            </div>
            {i < flow.length - 1 && (
              <div className="flex items-center">
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </React.Fragment>
        ))}
        <div className="flex items-center">
          <RefreshCcw className="w-4 h-4 text-amber-500" />
        </div>
      </div>

      {/* Compound effect bars */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-3">
        <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 inline mr-1" />Compound Conversion Effect
        </p>
        <div className="space-y-2">
          {stages.map((stage, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[9px] font-semibold text-slate-600 w-36 shrink-0">{stage.label}</span>
              <div className="flex-1 bg-slate-200 rounded-full h-5 relative overflow-hidden">
                <div className={`${stage.color} h-5 rounded-full flex items-center justify-end pr-2 transition-all`} style={{ width: `${Math.min(parseFloat(stage.value) * 5, 100)}%` }}>
                  <span className="text-[9px] font-bold text-white">{stage.value}</span>
                </div>
              </div>
              {stage.improvement && (
                <span className="text-[9px] font-bold text-emerald-600 w-16 shrink-0">{stage.improvement}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Impact */}
      <div className="bg-slate-800 rounded-lg p-3">
        <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2">Revenue Impact</p>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-[9px] text-slate-400">Baseline</p>
            <p className="text-lg font-bold text-white">{revenueImpact.baseline}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-400" />
          <div className="text-center">
            <p className="text-[9px] text-amber-400">With All Systems</p>
            <p className="text-xl font-bold text-amber-300">{revenueImpact.withAllSystems}</p>
          </div>
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
