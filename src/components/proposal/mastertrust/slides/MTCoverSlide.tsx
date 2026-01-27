import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Bot, TrendingUp } from 'lucide-react';

interface MTCoverSlideProps {
  slide: MasterTrustSlide;
}

export const MTCoverSlide: React.FC<MTCoverSlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with logo */}
      <div className="px-12 pt-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-blue-400" />
          <span className="text-xl font-semibold text-white">Master Trust</span>
        </div>
        <div className="flex items-center gap-2">
          <Bot className="w-7 h-7 text-emerald-400" />
          <span className="text-lg font-bold text-white">Discvr AI</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-16">
        <div className="space-y-6">
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
          
          <h1 className="text-5xl font-bold text-white tracking-tight">
            {slide.subtitle}
          </h1>
          
          <p className="text-2xl text-blue-300 font-medium max-w-3xl">
            {content?.tagline}
          </p>
          
          <div className="flex gap-4 mt-8 pt-8 border-t border-slate-700">
            <div className="px-6 py-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm font-medium">₹950+ Cr</p>
              <p className="text-white text-xs">Captive AUM Opportunity</p>
            </div>
            <div className="px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
              <p className="text-emerald-300 text-sm font-medium">₹7+ Cr</p>
              <p className="text-white text-xs">New Annual ARR</p>
            </div>
            <div className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded-lg">
              <p className="text-purple-300 text-sm font-medium">30-40%</p>
              <p className="text-white text-xs">ARPU Expansion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-16 pb-10 flex justify-between items-end text-sm">
        <div className="space-y-1 text-slate-400">
          <p>{content?.date}</p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-slate-400">Prepared for: <span className="text-white font-medium">{content?.preparedFor}</span></p>
          <p className="text-slate-400">Prepared by: <span className="text-emerald-400 font-medium">{content?.preparedBy}</span></p>
        </div>
      </div>
    </div>
  );
};
