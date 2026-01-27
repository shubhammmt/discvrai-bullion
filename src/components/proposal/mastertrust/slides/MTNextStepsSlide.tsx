import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { CheckCircle, Clock, Shield, Rocket } from 'lucide-react';

interface MTNextStepsSlideProps {
  slide: MasterTrustSlide;
}

export const MTNextStepsSlide: React.FC<MTNextStepsSlideProps> = ({ slide }) => {
  const { content } = slide;

  const phaseColors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500'];

  return (
    <div className="w-full h-full flex flex-col bg-white p-8">
      {/* Header */}
      <div className="mb-4">
        <div className="w-12 h-1 bg-slate-800 mb-2" />
        <h1 className="text-2xl font-bold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle}</p>
      </div>

      {/* Phases */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {content?.phases?.map((phase: any, index: number) => (
          <div key={index} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <div className={`${phaseColors[index]} text-white text-[9px] font-bold px-2 py-0.5 rounded-full`}>
                {phase.timeline}
              </div>
            </div>
            <h4 className="font-semibold text-sm text-slate-800 mb-2">{phase.name}</h4>
            <div className="space-y-1">
              {phase.items.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[10px] text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Horizon Timeline */}
      <div className="bg-slate-100 rounded-lg p-3 mb-3">
        <h4 className="text-xs font-semibold text-slate-800 mb-2 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          Implementation Timeline
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {content?.horizonTimeline?.map((item: any, index: number) => (
            <div key={index} className={`${['bg-blue-500', 'bg-emerald-500', 'bg-purple-500'][index]} rounded-lg p-2 text-white`}>
              <p className="text-[10px] font-semibold">{item.horizon}</p>
              <p className="text-[9px] opacity-90">{item.outcome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guardrails */}
      <div className="bg-slate-800 rounded-lg p-3 mb-3">
        <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          Compliance & Trust Guardrails
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {content?.guardrails?.map((guard: string, index: number) => (
            <div key={index} className="flex items-start gap-1.5">
              <CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-[10px] text-slate-300">{guard}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Rocket className="w-4 h-4 text-white" />
          <p className="text-white font-semibold text-sm">{content?.cta}</p>
        </div>
      </div>
    </div>
  );
};
