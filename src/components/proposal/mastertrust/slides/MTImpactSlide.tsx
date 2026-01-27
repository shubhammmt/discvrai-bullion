import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { ArrowRight, TrendingUp, CheckCircle, X } from 'lucide-react';

interface MTImpactSlideProps {
  slide: MasterTrustSlide;
}

export const MTImpactSlide: React.FC<MTImpactSlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-white p-8">
      {/* Header */}
      <div className="mb-4">
        <div className="w-12 h-1 bg-slate-800 mb-2" />
        <h1 className="text-2xl font-bold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle}</p>
      </div>

      {/* Revenue Bridge */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-slate-800 mb-2 flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          Revenue Evolution Path
        </h3>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {content?.bridge?.map((stage: any, index: number) => (
            <React.Fragment key={index}>
              <div className={`flex-shrink-0 rounded-lg p-2 text-center min-w-[100px] ${
                index === 0 ? 'bg-slate-100 border border-slate-200' : 
                index === content.bridge.length - 1 ? 'bg-emerald-500 text-white' : 
                'bg-slate-50 border border-slate-200'
              }`}>
                <p className={`text-[9px] font-semibold ${index === content.bridge.length - 1 ? 'text-white' : 'text-slate-800'}`}>
                  {stage.stage}
                </p>
                <p className={`text-[8px] ${index === content.bridge.length - 1 ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {stage.description}
                </p>
                {stage.impact && (
                  <p className={`text-[8px] font-medium mt-0.5 ${index === content.bridge.length - 1 ? 'text-white' : 'text-emerald-600'}`}>
                    {stage.impact}
                  </p>
                )}
              </div>
              {index < content.bridge.length - 1 && (
                <ArrowRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Unit Economics Table */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-slate-800 mb-2">Unit Economics Evolution</h3>
        <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="text-left px-3 py-1.5 font-semibold text-slate-600">Metric</th>
                <th className="text-left px-3 py-1.5 font-semibold text-slate-600">Current</th>
                <th className="text-left px-3 py-1.5 font-semibold text-slate-600">Target</th>
                <th className="text-left px-3 py-1.5 font-semibold text-slate-600">Driver</th>
              </tr>
            </thead>
            <tbody>
              {content?.unitEconomics?.map((row: any, index: number) => (
                <tr key={index} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-1.5 font-medium text-slate-800">{row.metric}</td>
                  <td className="px-3 py-1.5 text-slate-600">{row.current}</td>
                  <td className="px-3 py-1.5 font-semibold text-emerald-600">{row.target}</td>
                  <td className="px-3 py-1.5 text-slate-500">{row.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Competitive Positioning */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <h4 className="text-xs font-semibold text-red-800 mb-2">Generic Marketing Platforms</h4>
          <div className="space-y-1">
            {content?.competitive?.generic?.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-1.5">
                <X className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-[10px] text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <h4 className="text-xs font-semibold text-emerald-800 mb-2">Our AI-Agentic Platform</h4>
          <div className="space-y-1">
            {content?.competitive?.ourPlatform?.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-[10px] text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
