import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Target, Zap, CheckCircle, TrendingUp } from 'lucide-react';

interface MTHorizon1SlideProps {
  slide: MasterTrustSlide;
}

export const MTHorizon1Slide: React.FC<MTHorizon1SlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-white p-10">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            HORIZON 1
          </div>
          <span className="text-slate-400 text-sm">{slide.subtitle?.split('|')[0]}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Brokerage Velocity</h1>
        <p className="text-sm text-slate-500">{slide.subtitle?.split('|')[1]}</p>
      </div>

      {/* Objective */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Target className="w-4 h-4 text-blue-500 mt-0.5" />
          <p className="text-sm text-blue-800">{content?.objective}</p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Left: Enablers */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Key Enablers
          </h3>
          <div className="space-y-2">
            {content?.enablers?.map((enabler: any, index: number) => (
              <div key={index} className="bg-white rounded-lg p-2.5 border border-slate-100">
                <p className="text-xs font-medium text-slate-800">{enabler.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{enabler.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Outcomes */}
        <div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-3">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Expected Outcomes
            </h3>
            <div className="space-y-2">
              {content?.outcomes?.map((outcome: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Impact */}
          <div className="bg-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-white mb-2">Business Impact</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">{content?.impact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
