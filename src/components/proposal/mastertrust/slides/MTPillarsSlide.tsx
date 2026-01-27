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
    { bg: 'bg-blue-50', border: 'border-blue-300', icon: 'bg-blue-500 text-white', badge: 'bg-blue-600', header: 'text-blue-700' },
    { bg: 'bg-emerald-50', border: 'border-emerald-300', icon: 'bg-emerald-500 text-white', badge: 'bg-emerald-600', header: 'text-emerald-700' },
    { bg: 'bg-purple-50', border: 'border-purple-300', icon: 'bg-purple-500 text-white', badge: 'bg-purple-600', header: 'text-purple-700' }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 to-indigo-50 p-8">
      {/* Header */}
      <div className="mb-5">
        <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 rounded-full mb-3" />
        <h1 className="text-2xl font-bold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle}</p>
      </div>

      {/* Three Pillars */}
      <div className="flex-1 grid grid-cols-3 gap-5">
        {content?.pillars?.map((pillar: any, index: number) => {
          const IconComponent = pillarIcons[index];
          const colors = pillarColors[index];
          return (
            <div key={index} className={`${colors.bg} ${colors.border} border-2 rounded-xl p-5 flex flex-col shadow-sm`}>
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-10 h-10 ${colors.icon} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-base ${colors.header}`}>{pillar.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{pillar.objective}</p>
                </div>
              </div>

              {/* Enablers */}
              <div className="flex-1 space-y-2 mb-4">
                {pillar.enablers.slice(0, 5).map((enabler: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-slate-700">{enabler}</span>
                  </div>
                ))}
                {pillar.enablers.length > 5 && (
                  <p className="text-xs text-slate-400 pl-6">+{pillar.enablers.length - 5} more</p>
                )}
              </div>

              {/* Value */}
              <div className={`${colors.badge} rounded-xl px-4 py-3 shadow-md`}>
                <p className="text-sm text-white font-medium">{pillar.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
