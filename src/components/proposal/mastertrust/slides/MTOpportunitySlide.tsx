import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Clock, Layers } from 'lucide-react';

interface MTOpportunitySlideProps {
  slide: MasterTrustSlide;
}

export const MTOpportunitySlide: React.FC<MTOpportunitySlideProps> = ({ slide }) => {
  const { content } = slide;

  const colorMap: Record<string, { bg: string; border: string; badge: string; text: string; cardBg: string; cardBorder: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-300', badge: 'bg-blue-500', text: 'text-blue-700', cardBg: 'bg-white', cardBorder: 'border-blue-200' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-300', badge: 'bg-emerald-500', text: 'text-emerald-700', cardBg: 'bg-white', cardBorder: 'border-emerald-200' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-300', badge: 'bg-amber-500', text: 'text-amber-700', cardBg: 'bg-white', cardBorder: 'border-amber-200' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-300', badge: 'bg-purple-500', text: 'text-purple-700', cardBg: 'bg-white', cardBorder: 'border-purple-200' }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-white to-slate-50 p-6">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{slide.title}</h1>
            <p className="text-xs text-slate-500">{slide.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Four Levers */}
      <div className="flex-1 grid grid-cols-4 gap-3 min-h-0">
        {content?.levers?.map((lever: any, index: number) => {
          const colors = colorMap[lever.color] || colorMap.blue;
          return (
            <div key={index} className={`${colors.bg} ${colors.border} border-2 rounded-xl p-3 flex flex-col shadow-sm overflow-hidden`}>
              {/* Priority Badge */}
              <div className={`${colors.badge} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block w-fit mb-2`}>
                {lever.priority}
              </div>

              {/* Title & Description */}
              <h3 className={`font-bold text-sm ${colors.text} mb-0.5 leading-tight`}>{lever.name}</h3>
              <p className="text-slate-500 text-[10px] mb-2 leading-snug">{lever.description}</p>

              {/* Sub-item boxes */}
              <div className="space-y-1.5 flex-1 overflow-y-auto">
                {lever.subItems?.map((item: any, i: number) => (
                  <div key={i} className={`${colors.cardBg} ${colors.cardBorder} border rounded-lg px-2.5 py-1.5`}>
                    <p className={`text-[11px] font-semibold ${colors.text} leading-tight`}>{item.title}</p>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{item.detail}</p>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">{lever.timeline}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
