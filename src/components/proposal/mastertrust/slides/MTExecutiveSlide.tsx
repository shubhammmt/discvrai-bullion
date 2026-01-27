import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Target, ArrowRight, Zap, TrendingUp } from 'lucide-react';

interface MTExecutiveSlideProps {
  slide: MasterTrustSlide;
}

export const MTExecutiveSlide: React.FC<MTExecutiveSlideProps> = ({ slide }) => {
  const { content } = slide;

  const priorityColors: Record<string, { bg: string; light: string }> = {
    '1': { bg: 'bg-blue-500', light: 'bg-blue-50 border-blue-200' },
    '2': { bg: 'bg-emerald-500', light: 'bg-emerald-50 border-emerald-200' },
    '3': { bg: 'bg-amber-500', light: 'bg-amber-50 border-amber-200' },
    '4': { bg: 'bg-purple-500', light: 'bg-purple-50 border-purple-200' }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{slide.title}</h1>
            <p className="text-sm text-slate-500">{slide.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Recommendation */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-5 mb-5 shadow-lg">
        <p className="text-white text-sm leading-relaxed font-medium">{content?.recommendation}</p>
      </div>

      {/* Two Strategic Imperatives */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {content?.imperatives?.map((imperative: any, index: number) => (
          <div key={index} className={`bg-white border-2 ${index === 0 ? 'border-blue-300' : 'border-emerald-300'} rounded-xl p-4 shadow-sm`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-lg ${index === 0 ? 'bg-blue-500' : 'bg-emerald-500'} flex items-center justify-center`}>
                <span className="text-white text-sm font-bold">{index + 1}</span>
              </div>
              <h3 className="font-bold text-slate-800">{imperative.title}</h3>
            </div>
            <p className="text-slate-600 text-sm">{imperative.description}</p>
          </div>
        ))}
      </div>

      {/* Four Revenue Levers */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-800">Four Revenue Levers (Prioritized by ROI)</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {content?.levers?.map((lever: any, index: number) => {
            const colors = priorityColors[lever.priority];
            return (
              <div key={index} className={`${colors.light} border-2 rounded-xl p-4 flex flex-col`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`${colors.bg} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                    #{lever.priority}
                  </div>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{lever.name}</h4>
                <p className="text-blue-600 text-xs font-semibold mb-2">{lever.impact}</p>
                <p className="text-slate-500 text-[11px] mt-auto">{lever.rationale}</p>
                <p className="text-slate-400 text-[10px] mt-1">{lever.timeline}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Arrow */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm border border-slate-200">
          <span className="text-slate-500 text-sm">Transaction-Led Broker</span>
          <ArrowRight className="w-5 h-5 text-emerald-500" />
          <span className="font-bold text-emerald-600 text-sm">AI-First Vertically Integrated AMC</span>
        </div>
      </div>
    </div>
  );
};
