import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Zap, CheckCircle, ArrowRight, Layers } from 'lucide-react';

interface MTParallelExecutionSlideProps {
  slide: MasterTrustSlide;
}

export const MTParallelExecutionSlide: React.FC<MTParallelExecutionSlideProps> = ({ slide }) => {
  const { content } = slide;

  const phaseColors = [
    { bg: 'bg-blue-500', light: 'bg-blue-50', border: 'border-blue-300' },
    { bg: 'bg-emerald-500', light: 'bg-emerald-50', border: 'border-emerald-300' },
    { bg: 'bg-amber-500', light: 'bg-amber-50', border: 'border-amber-300' },
    { bg: 'bg-purple-500', light: 'bg-purple-50', border: 'border-purple-300' }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{slide.title}</h1>
            <p className="text-sm text-slate-500">{slide.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Principle Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-4 mb-5 shadow-lg">
        <p className="text-white text-sm font-medium leading-relaxed">{content?.principle}</p>
      </div>

      {/* Timeline Grid */}
      <div className="flex-1 grid grid-cols-4 gap-3 mb-4">
        {content?.timeline?.map((phase: any, index: number) => (
          <div 
            key={index} 
            className={`${phaseColors[index].light} ${phaseColors[index].border} border-2 rounded-xl p-4 flex flex-col`}
          >
            <div className={`${phaseColors[index].bg} text-white text-xs font-bold px-3 py-1 rounded-full inline-block w-fit mb-2`}>
              {phase.phase}
            </div>
            <h3 className="font-bold text-sm text-slate-800 mb-3">{phase.title}</h3>
            <div className="space-y-2 flex-1">
              {phase.items.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700 leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Row */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-semibold text-slate-800">Benefits of Parallel Execution</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {content?.benefits?.map((benefit: string, index: number) => (
            <div key={index} className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-slate-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
