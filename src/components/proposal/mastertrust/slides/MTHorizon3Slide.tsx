import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Target, Globe, Video, FileText, Users, Newspaper } from 'lucide-react';

interface MTHorizon3SlideProps {
  slide: MasterTrustSlide;
}

export const MTHorizon3Slide: React.FC<MTHorizon3SlideProps> = ({ slide }) => {
  const { content } = slide;

  const channelIcons = [Globe, Newspaper, Video, FileText];
  const channelColors = [
    { bg: 'bg-blue-100', icon: 'text-blue-600', border: 'border-blue-300' },
    { bg: 'bg-amber-100', icon: 'text-amber-600', border: 'border-amber-300' },
    { bg: 'bg-red-100', icon: 'text-red-600', border: 'border-red-300' },
    { bg: 'bg-emerald-100', icon: 'text-emerald-600', border: 'border-emerald-300' }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
            LEVER 3
          </div>
          <span className="text-slate-500 text-sm">{slide.subtitle?.split('|')[0]}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Organic Traffic Engine</h1>
        <p className="text-sm text-slate-500">{slide.subtitle?.split('|')[1]}</p>
      </div>

      {/* Objective */}
      <div className="bg-amber-100 border-2 border-amber-300 rounded-xl p-4 mb-4 shadow-sm">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-amber-600 mt-0.5" />
          <p className="text-sm text-amber-900 font-medium">{content?.objective}</p>
        </div>
      </div>

      {/* Channels Grid */}
      <div className="flex-1 grid grid-cols-4 gap-4 mb-4">
        {content?.channels?.map((channel: any, index: number) => {
          const IconComponent = channelIcons[index];
          const colors = channelColors[index];
          return (
            <div key={index} className={`bg-white rounded-xl p-4 border-2 ${colors.border} flex flex-col shadow-sm`}>
              <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center mb-3`}>
                <IconComponent className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <h4 className="font-bold text-sm text-slate-800 mb-1">{channel.name}</h4>
              <p className="text-xs text-slate-500 mb-3 flex-1">{channel.description}</p>
              <div className="pt-3 border-t border-slate-100 space-y-1">
                <p className="text-xs text-slate-600"><span className="font-semibold">Volume:</span> {channel.volume}</p>
                <p className="text-xs text-emerald-600 font-semibold">{channel.impact}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* New User Targets */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-xl p-5 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <Users className="w-5 h-5 text-white" />
          <span className="font-bold text-white">New User Acquisition Targets</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-amber-100 text-xs">Year 1</p>
            <p className="text-white font-bold text-lg">{content?.newUserTargets?.year1}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-amber-100 text-xs">Year 2-3</p>
            <p className="text-white font-bold text-lg">{content?.newUserTargets?.year23}</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-amber-100 text-xs">Year 4-5</p>
            <p className="text-white font-bold text-lg">{content?.newUserTargets?.year45}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
