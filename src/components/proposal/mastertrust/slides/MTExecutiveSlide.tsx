import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Target, ArrowRight, Zap } from 'lucide-react';

interface MTExecutiveSlideProps {
  slide: MasterTrustSlide;
}

export const MTExecutiveSlide: React.FC<MTExecutiveSlideProps> = ({ slide }) => {
  const { content } = slide;

  const priorityColors: Record<string, string> = {
    '1': 'bg-blue-500',
    '2': 'bg-emerald-500',
    '3': 'bg-purple-500'
  };

  return (
    <div className="w-full h-full flex flex-col bg-white p-10">
      {/* Header */}
      <div className="mb-6">
        <div className="w-12 h-1 bg-slate-800 mb-3" />
        <h1 className="text-3xl font-bold text-slate-800">{slide.title}</h1>
        <p className="text-lg text-slate-500 mt-1">{slide.subtitle}</p>
      </div>

      {/* Main Recommendation */}
      <div className="bg-slate-800 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-white text-sm leading-relaxed">{content?.recommendation}</p>
        </div>
      </div>

      {/* Two Strategic Imperatives */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {content?.imperatives?.map((imperative: any, index: number) => (
          <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-6 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-emerald-500'} flex items-center justify-center`}>
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">{imperative.title}</h3>
            </div>
            <p className="text-slate-600 text-xs">{imperative.description}</p>
          </div>
        ))}
      </div>

      {/* Three Revenue Levers */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          Three Revenue Levers (Prioritized by ROI & Speed-to-Value)
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {content?.levers?.map((lever: any, index: number) => (
            <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className={`${priorityColors[lever.priority]} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                  #{lever.priority}
                </div>
                <span className="text-xs text-slate-500">Priority</span>
              </div>
              <h4 className="font-semibold text-slate-800 text-sm mb-1">{lever.name}</h4>
              <p className="text-blue-600 text-xs font-medium mb-2">{lever.impact}</p>
              <p className="text-slate-500 text-[10px] mt-auto">{lever.rationale}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Arrow */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <span>Transaction-Led Broker</span>
          <ArrowRight className="w-4 h-4" />
          <span className="font-semibold text-slate-800">AI-First Vertically Integrated AMC</span>
        </div>
      </div>
    </div>
  );
};
