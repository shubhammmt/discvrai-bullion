import React from 'react';
import { JindalSlide } from '@/data/jindalProposalSlides';
import { Zap, Settings, Shield, TrendingUp, LucideIcon } from 'lucide-react';

interface SolutionSlideProps {
  slide: JindalSlide;
}

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Settings,
  Shield,
  TrendingUp
};

export const SolutionSlide: React.FC<SolutionSlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-white p-12">
      {/* Header */}
      <div className="mb-8">
        <div className="w-12 h-1 bg-slate-800 mb-4" />
        <h1 className="text-4xl font-light text-slate-800">{slide.title}</h1>
        <p className="text-lg text-slate-500 mt-2">{slide.subtitle}</p>
      </div>

      {/* Content */}
      <div className="flex-1 grid grid-cols-2 gap-12">
        {/* What We're Building */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-6">What We're Building</h3>
          <div className="space-y-4">
            {content?.building?.map((item: any, index: number) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-slate-600">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-slate-800">{item.label}</p>
                  <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why This Approach */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Why This Approach</h3>
          <div className="space-y-4">
            {content?.whyThis?.map((item: any, index: number) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <div key={index} className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
                  <Icon className="w-5 h-5 text-slate-700 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
