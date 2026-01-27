import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { CheckCircle, Clock, Layers } from 'lucide-react';

interface MTOpportunitySlideProps {
  slide: MasterTrustSlide;
}

export const MTOpportunitySlide: React.FC<MTOpportunitySlideProps> = ({ slide }) => {
  const { content } = slide;

  const colorMap: Record<string, { bg: string; border: string; badge: string; text: string; icon: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-300', badge: 'bg-blue-500', text: 'text-blue-700', icon: 'text-blue-500' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-300', badge: 'bg-emerald-500', text: 'text-emerald-700', icon: 'text-emerald-500' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-300', badge: 'bg-amber-500', text: 'text-amber-700', icon: 'text-amber-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-300', badge: 'bg-purple-500', text: 'text-purple-700', icon: 'text-purple-500' }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-white to-slate-50 p-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{slide.title}</h1>
            <p className="text-sm text-slate-500">{slide.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Four Levers */}
      <div className="flex-1 grid grid-cols-4 gap-4">
        {content?.levers?.map((lever: any, index: number) => {
          const colors = colorMap[lever.color] || colorMap.blue;
          return (
            <div key={index} className={`${colors.bg} ${colors.border} border-2 rounded-xl p-4 flex flex-col shadow-sm`}>
              {/* Priority Badge */}
              <div className={`${colors.badge} text-white text-xs font-bold px-3 py-1 rounded-full inline-block w-fit mb-3`}>
                {lever.priority}
              </div>

              {/* Title & Description */}
              <h3 className={`font-bold text-base ${colors.text} mb-1`}>{lever.name}</h3>
              <p className="text-slate-600 text-xs mb-4">{lever.description}</p>

              {/* Points */}
              <div className="space-y-2 flex-1">
                {lever.points.map((point: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className={`w-4 h-4 ${colors.icon} mt-0.5 flex-shrink-0`} />
                    <span className="text-slate-700 text-xs leading-tight">{point}</span>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">{lever.timeline}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
