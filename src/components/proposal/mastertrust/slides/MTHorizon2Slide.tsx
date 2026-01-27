import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Target, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';

interface MTHorizon2SlideProps {
  slide: MasterTrustSlide;
}

export const MTHorizon2Slide: React.FC<MTHorizon2SlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
            LEVER 2
          </div>
          <span className="text-slate-500 text-sm">{slide.subtitle?.split('|')[0]}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">MF Lead Distribution</h1>
        <p className="text-sm text-slate-500">{slide.subtitle?.split('|')[1]}</p>
      </div>

      {/* Objective */}
      <div className="bg-emerald-100 border-2 border-emerald-300 rounded-xl p-4 mb-4 shadow-sm">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-emerald-600 mt-0.5" />
          <p className="text-sm text-emerald-900 font-medium">{content?.objective}</p>
        </div>
      </div>

      {/* Dual Strategy */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {content?.strategies?.map((strategy: any, index: number) => (
          <div key={index} className={`rounded-xl p-5 border-2 shadow-sm ${index === 0 ? 'bg-blue-50 border-blue-300' : 'bg-emerald-50 border-emerald-300'}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${index === 0 ? 'bg-blue-500' : 'bg-emerald-500'}`}>
                {strategy.type}
              </span>
            </div>
            <h4 className={`font-bold text-base mb-3 ${index === 0 ? 'text-blue-800' : 'text-emerald-800'}`}>
              {strategy.name}
            </h4>
            <div className="space-y-2">
              {strategy.points.map((point: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${index === 0 ? 'text-blue-500' : 'text-emerald-500'}`} />
                  <span className="text-xs text-slate-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Outcomes */}
      <div className="bg-white rounded-xl p-5 border-2 border-slate-200 shadow-sm mb-4">
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Expected Outcomes
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {content?.outcomes?.map((outcome: string, index: number) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-700 font-medium">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Margin Explanation */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-center gap-4 text-white">
          <div className="text-center">
            <p className="text-slate-400 text-xs">Distribution Commission</p>
            <p className="text-lg font-bold text-slate-300">0.5-0.75%</p>
          </div>
          <ArrowRight className="w-6 h-6 text-emerald-400" />
          <div className="text-center">
            <p className="text-emerald-300 text-xs">AMC Management Fees</p>
            <p className="text-lg font-bold text-emerald-400">1-1.5%</p>
          </div>
          <div className="px-4 py-2 bg-emerald-500 rounded-lg ml-4">
            <p className="font-bold text-white">= 2x Margin Expansion</p>
          </div>
        </div>
      </div>
    </div>
  );
};
