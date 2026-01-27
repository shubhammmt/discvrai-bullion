import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface MTHorizonsOverviewSlideProps {
  slide: MasterTrustSlide;
}

export const MTHorizonsOverviewSlide: React.FC<MTHorizonsOverviewSlideProps> = ({ slide }) => {
  const { content } = slide;

  const colorMap: Record<string, { bg: string; border: string; badge: string; text: string; arrow: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-300', badge: 'bg-blue-500', text: 'text-blue-700', arrow: 'text-blue-400' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-300', badge: 'bg-emerald-500', text: 'text-emerald-700', arrow: 'text-emerald-400' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-300', badge: 'bg-purple-500', text: 'text-purple-700', arrow: 'text-purple-400' }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white p-10">
      {/* Header */}
      <div className="mb-6">
        <div className="w-12 h-1 bg-slate-800 mb-3" />
        <h1 className="text-3xl font-bold text-slate-800">{slide.title}</h1>
        <p className="text-base text-slate-500">{slide.subtitle}</p>
      </div>

      {/* Horizons Timeline */}
      <div className="flex items-stretch gap-2 mb-6">
        {content?.horizons?.map((horizon: any, index: number) => {
          const colors = colorMap[horizon.color] || colorMap.blue;
          return (
            <React.Fragment key={index}>
              <div className={`flex-1 ${colors.bg} ${colors.border} border-2 rounded-xl p-4`}>
                <div className={`${colors.badge} text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-2`}>
                  {horizon.name}
                </div>
                <h3 className={`font-bold text-sm ${colors.text} mb-1`}>{horizon.title}</h3>
                <p className="text-slate-500 text-xs mb-2">{horizon.timeline}</p>
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-[10px] text-slate-500">Focus: <span className="font-medium text-slate-700">{horizon.focus}</span></p>
                  <p className={`text-xs font-semibold ${colors.text} mt-1`}>{horizon.outcome}</p>
                </div>
              </div>
              {index < content.horizons.length - 1 && (
                <div className="flex items-center">
                  <ArrowRight className={`w-5 h-5 ${colors.arrow}`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Unit Economics Table */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          Unit Economics Evolution
        </h3>
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-600">Metric</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-600">Current State</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-600">Target State</th>
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-600">Strategic Driver</th>
              </tr>
            </thead>
            <tbody>
              {content?.unitEconomics?.map((row: any, index: number) => (
                <tr key={index} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-2 text-xs font-medium text-slate-800">{row.metric}</td>
                  <td className="px-4 py-2 text-xs text-slate-600">{row.current}</td>
                  <td className="px-4 py-2 text-xs font-semibold text-emerald-600">{row.target}</td>
                  <td className="px-4 py-2 text-[11px] text-slate-500">{row.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
