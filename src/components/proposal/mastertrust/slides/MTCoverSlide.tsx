import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Bot, TrendingUp, Sparkles } from 'lucide-react';

interface MTCoverSlideProps {
  slide: MasterTrustSlide;
}

export const MTCoverSlide: React.FC<MTCoverSlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full blur-3xl" />
      
      {/* Header with logos */}
      <div className="px-10 pt-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Master Trust</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Discvr AI</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-12 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 rounded-full" />
          </div>
          
          <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">
            {slide.title}
          </h1>
          
          <p className="text-xl text-blue-200 font-medium max-w-3xl">
            {slide.subtitle}
          </p>
          
          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/20">
            {content?.metrics?.map((metric: any, index: number) => {
              const colors = [
                'from-blue-500 to-blue-600',
                'from-emerald-500 to-emerald-600',
                'from-purple-500 to-purple-600',
                'from-amber-500 to-amber-600'
              ];
              return (
                <div 
                  key={index} 
                  className={`bg-gradient-to-br ${colors[index]} rounded-xl p-4 shadow-lg`}
                >
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="text-sm text-white/80">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-12 pb-8 flex justify-between items-end text-sm relative z-10">
        <div className="text-blue-300">
          <p>{content?.date}</p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-blue-300">Prepared for: <span className="text-white font-semibold">{content?.preparedFor}</span></p>
          <p className="text-blue-300">Prepared by: <span className="text-emerald-400 font-semibold">{content?.preparedBy}</span></p>
        </div>
      </div>
    </div>
  );
};
