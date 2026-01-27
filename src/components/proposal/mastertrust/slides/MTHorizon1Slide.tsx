import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Target, Zap, CheckCircle, TrendingUp, MessageSquare } from 'lucide-react';

interface MTHorizon1SlideProps {
  slide: MasterTrustSlide;
}

export const MTHorizon1Slide: React.FC<MTHorizon1SlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
            LEVER 1
          </div>
          <span className="text-slate-500 text-sm">{slide.subtitle?.split('|')[0]}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Brokerage Velocity</h1>
        <p className="text-sm text-slate-500">{slide.subtitle?.split('|')[1]}</p>
      </div>

      {/* Objective */}
      <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-4 mb-4 shadow-sm">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-600 mt-0.5" />
          <p className="text-sm text-blue-900 font-medium">{content?.objective}</p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Left: Enablers */}
        <div className="bg-white rounded-xl p-5 border-2 border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Key Enablers
          </h3>
          <div className="space-y-3">
            {content?.enablers?.map((enabler: any, index: number) => (
              <div key={index} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <p className="text-sm font-semibold text-slate-800">{enabler.name}</p>
                <p className="text-xs text-slate-500 mt-1">{enabler.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Outcomes */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl p-5 border-2 border-emerald-200 shadow-sm flex-1">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Expected Outcomes
            </h3>
            <div className="space-y-2">
              {content?.outcomes?.map((outcome: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Impact */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-blue-200" />
              <h4 className="text-sm font-bold text-white">Business Impact</h4>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed">{content?.impact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
