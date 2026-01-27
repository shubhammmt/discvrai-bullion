import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Target, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';

interface MTHorizon2SlideProps {
  slide: MasterTrustSlide;
}

export const MTHorizon2Slide: React.FC<MTHorizon2SlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-white p-10">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            HORIZON 2
          </div>
          <span className="text-slate-400 text-sm">{slide.subtitle?.split('|')[0]}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">MF Lead Distribution</h1>
        <p className="text-sm text-slate-500">{slide.subtitle?.split('|')[1]}</p>
      </div>

      {/* Objective */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Target className="w-4 h-4 text-emerald-500 mt-0.5" />
          <p className="text-sm text-emerald-800">{content?.objective}</p>
        </div>
      </div>

      {/* Dual Strategy */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {content?.strategies?.map((strategy: any, index: number) => (
          <div key={index} className={`rounded-xl p-4 border-2 ${index === 0 ? 'bg-blue-50 border-blue-200' : 'bg-emerald-50 border-emerald-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${index === 0 ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'}`}>
                {strategy.type}
              </span>
            </div>
            <h4 className={`font-semibold text-sm mb-2 ${index === 0 ? 'text-blue-800' : 'text-emerald-800'}`}>
              {strategy.name}
            </h4>
            <div className="space-y-1.5">
              {strategy.points.map((point: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className={`w-3 h-3 mt-0.5 flex-shrink-0 ${index === 0 ? 'text-blue-500' : 'text-emerald-500'}`} />
                  <span className="text-[10px] text-slate-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Outcomes */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-3">
        <h3 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          Expected Outcomes
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {content?.outcomes?.map((outcome: string, index: number) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-[11px] text-slate-700">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Margin Explanation */}
      <div className="bg-slate-800 rounded-lg p-3 flex items-center gap-3">
        <div className="flex items-center gap-2 text-white text-xs">
          <span className="text-slate-400">Distribution Commission</span>
          <span className="bg-slate-600 px-2 py-0.5 rounded text-xs">0.5-0.75%</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-400">AMC Management Fees</span>
          <span className="bg-emerald-500 px-2 py-0.5 rounded text-xs font-semibold">1-1.5%</span>
          <span className="text-emerald-400 font-bold ml-2">= 2x Margin Expansion</span>
        </div>
      </div>
    </div>
  );
};
