import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { CheckCircle, Clock, Shield, Rocket, Mail, Phone } from 'lucide-react';

interface MTNextStepsSlideProps {
  slide: MasterTrustSlide;
}

export const MTNextStepsSlide: React.FC<MTNextStepsSlideProps> = ({ slide }) => {
  const { content } = slide;

  const phaseColors = [
    { bg: 'bg-blue-500', light: 'bg-blue-50', border: 'border-blue-300' },
    { bg: 'bg-emerald-500', light: 'bg-emerald-50', border: 'border-emerald-300' },
    { bg: 'bg-purple-500', light: 'bg-purple-50', border: 'border-purple-300' }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      {/* Header */}
      <div className="mb-4">
        <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 rounded-full mb-3" />
        <h1 className="text-2xl font-bold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle}</p>
      </div>

      {/* Phases */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {content?.phases?.map((phase: any, index: number) => (
          <div key={index} className={`${phaseColors[index].light} ${phaseColors[index].border} border-2 rounded-xl p-4 shadow-sm`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`${phaseColors[index].bg} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                {phase.timeline}
              </div>
            </div>
            <h4 className="font-bold text-sm text-slate-800 mb-3">{phase.name}</h4>
            <div className="space-y-2">
              {phase.items.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline + Guardrails */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Horizon Timeline */}
        <div className="bg-white rounded-xl p-4 border-2 border-slate-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            Implementation Timeline
          </h4>
          <div className="space-y-2">
            {content?.horizonTimeline?.map((item: any, index: number) => (
              <div key={index} className={`${index === 0 ? 'bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500' : 'bg-purple-500'} rounded-lg p-3 text-white`}>
                <p className="text-sm font-bold">{item.horizon}</p>
                <p className="text-xs opacity-90">{item.outcome}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guardrails */}
        <div className="bg-slate-800 rounded-xl p-4 shadow-lg">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            Compliance & Trust Guardrails
          </h4>
          <div className="space-y-2">
            {content?.guardrails?.map((guard: string, index: number) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-300">{guard}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-white" />
            <p className="text-white font-bold">{content?.cta}</p>
          </div>
          {content?.contact && (
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <span className="font-semibold text-white">{content.contact.name}</span>
              <span>|</span>
              <span>{content.contact.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
