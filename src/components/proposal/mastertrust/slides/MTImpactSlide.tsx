import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { ArrowRight, TrendingUp, BarChart3 } from 'lucide-react';

interface MTImpactSlideProps {
  slide: MasterTrustSlide;
}

export const MTImpactSlide: React.FC<MTImpactSlideProps> = ({ slide }) => {
  const { content } = slide;

  const bridgeColors = [
    'bg-slate-100 border-slate-300',
    'bg-blue-100 border-blue-300',
    'bg-emerald-100 border-emerald-300',
    'bg-amber-100 border-amber-300',
    'bg-purple-100 border-purple-300',
    'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-600'
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 to-emerald-50 p-8">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{slide.title}</h1>
            <p className="text-sm text-slate-500">{slide.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Revenue Bridge */}
      <div className="mb-5">
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-500" />
          Revenue Evolution Path
        </h3>
        <div className="flex items-stretch gap-2">
          {content?.bridge?.map((stage: any, index: number) => (
            <React.Fragment key={index}>
              <div className={`flex-1 rounded-xl p-3 border-2 ${bridgeColors[index]} ${index === content.bridge.length - 1 ? 'text-white' : ''}`}>
                <p className={`text-xs font-bold ${index === content.bridge.length - 1 ? 'text-white' : 'text-slate-800'}`}>
                  {stage.stage}
                </p>
                <p className={`text-[11px] mt-1 ${index === content.bridge.length - 1 ? 'text-emerald-100' : 'text-slate-600'}`}>
                  {stage.description}
                </p>
                {stage.impact && (
                  <p className={`text-[11px] font-semibold mt-1 ${index === content.bridge.length - 1 ? 'text-white' : 'text-emerald-600'}`}>
                    {stage.impact}
                  </p>
                )}
              </div>
              {index < content.bridge.length - 1 && (
                <div className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Unit Economics Table */}
      <div className="flex-1">
        <h3 className="text-sm font-bold text-slate-800 mb-3">Unit Economics Evolution</h3>
        <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                <th className="text-left px-4 py-3 text-sm font-bold text-slate-700">Metric</th>
                <th className="text-left px-4 py-3 text-sm font-bold text-slate-700">Current</th>
                <th className="text-left px-4 py-3 text-sm font-bold text-slate-700">Target</th>
                <th className="text-left px-4 py-3 text-sm font-bold text-slate-700">Strategic Driver</th>
              </tr>
            </thead>
            <tbody>
              {content?.unitEconomics?.map((row: any, index: number) => (
                <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-semibold text-slate-800">{row.metric}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{row.current}</td>
                  <td className="px-4 py-3 text-sm font-bold text-emerald-600">{row.target}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{row.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
