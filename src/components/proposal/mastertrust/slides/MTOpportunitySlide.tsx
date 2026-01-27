import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { CheckCircle, Clock } from 'lucide-react';

interface MTOpportunitySlideProps {
  slide: MasterTrustSlide;
}

export const MTOpportunitySlide: React.FC<MTOpportunitySlideProps> = ({ slide }) => {
  const { content } = slide;

  const colorMap: Record<string, { bg: string; border: string; badge: string; text: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-500', text: 'text-blue-700' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-500', text: 'text-emerald-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-500', text: 'text-purple-700' }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white p-10">
      {/* Header */}
      <div className="mb-6">
        <div className="w-12 h-1 bg-slate-800 mb-3" />
        <h1 className="text-3xl font-bold text-slate-800">{slide.title}</h1>
        <p className="text-base text-slate-500">{slide.subtitle}</p>
      </div>

      {/* Three Levers */}
      <div className="flex-1 grid grid-cols-3 gap-4">
        {content?.levers?.map((lever: any, index: number) => {
          const colors = colorMap[lever.color] || colorMap.blue;
          return (
            <div key={index} className={`${colors.bg} ${colors.border} border rounded-xl p-4 flex flex-col`}>
              {/* Priority Badge */}
              <div className={`${colors.badge} text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-block w-fit mb-2`}>
                {lever.priority}
              </div>

              {/* Title & Description */}
              <h3 className={`font-bold text-base ${colors.text} mb-1`}>{lever.name}</h3>
              <p className="text-slate-600 text-xs mb-3">{lever.description}</p>

              {/* Points */}
              <div className="space-y-2 flex-1">
                {lever.points.map((point: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 ${colors.text} mt-0.5 flex-shrink-0`} />
                    <span className="text-slate-700 text-[11px] leading-tight">{point}</span>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-medium text-slate-600">{lever.timeline}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
