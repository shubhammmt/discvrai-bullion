import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { CheckCircle, MessageSquare, Building, Wallet } from 'lucide-react';

interface MTPillarsSlideProps {
  slide: MasterTrustSlide;
}

export const MTPillarsSlide: React.FC<MTPillarsSlideProps> = ({ slide }) => {
  const { content } = slide;

  const pillarIcons = [MessageSquare, Building, Wallet];
  const pillarColors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600', badge: 'bg-blue-500' },
    { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'bg-emerald-100 text-emerald-600', badge: 'bg-emerald-500' },
    { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-600', badge: 'bg-purple-500' }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white p-10">
      {/* Header */}
      <div className="mb-5">
        <div className="w-12 h-1 bg-slate-800 mb-3" />
        <h1 className="text-3xl font-bold text-slate-800">{slide.title}</h1>
        <p className="text-base text-slate-500">{slide.subtitle}</p>
      </div>

      {/* Three Pillars */}
      <div className="flex-1 grid grid-cols-3 gap-4">
        {content?.pillars?.map((pillar: any, index: number) => {
          const IconComponent = pillarIcons[index];
          const colors = pillarColors[index];
          return (
            <div key={index} className={`${colors.bg} ${colors.border} border rounded-xl p-4 flex flex-col`}>
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-8 h-8 ${colors.icon} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800">{pillar.name}</h3>
                  <p className="text-[10px] text-slate-500">{pillar.objective}</p>
                </div>
              </div>

              {/* Enablers */}
              <div className="flex-1 space-y-1.5 mb-3">
                {pillar.enablers.slice(0, 5).map((enabler: string, i: number) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="text-[10px] text-slate-600">{enabler}</span>
                  </div>
                ))}
                {pillar.enablers.length > 5 && (
                  <p className="text-[9px] text-slate-400">+{pillar.enablers.length - 5} more</p>
                )}
              </div>

              {/* Value */}
              <div className={`${colors.badge} rounded-lg px-3 py-2`}>
                <p className="text-[10px] text-white font-medium">{pillar.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
