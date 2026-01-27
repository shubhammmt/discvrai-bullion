import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Target, TrendingUp, CreditCard, Users, Shield, Crown } from 'lucide-react';

interface MTHorizon4SlideProps {
  slide: MasterTrustSlide;
}

export const MTHorizon4Slide: React.FC<MTHorizon4SlideProps> = ({ slide }) => {
  const { content } = slide;

  const productIcons = [CreditCard, Users, Shield, Crown];
  const productColors = [
    { bg: 'bg-purple-100', icon: 'text-purple-600', border: 'border-purple-200' },
    { bg: 'bg-blue-100', icon: 'text-blue-600', border: 'border-blue-200' },
    { bg: 'bg-emerald-100', icon: 'text-emerald-600', border: 'border-emerald-200' },
    { bg: 'bg-amber-100', icon: 'text-amber-600', border: 'border-amber-200' }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-purple-50 to-slate-50 p-8">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
            LEVER 4
          </div>
          <span className="text-slate-500 text-sm">{slide.subtitle?.split('|')[0]}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Ecosystem Expansion</h1>
        <p className="text-sm text-slate-500">{slide.subtitle?.split('|')[1]}</p>
      </div>

      {/* Objective */}
      <div className="bg-purple-100 border-2 border-purple-300 rounded-xl p-4 mb-5">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-purple-600 mt-0.5" />
          <p className="text-sm text-purple-900 font-medium">{content?.objective}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 grid grid-cols-4 gap-4 mb-4">
        {content?.products?.map((product: any, index: number) => {
          const IconComponent = productIcons[index];
          const colors = productColors[index];
          return (
            <div key={index} className={`bg-white rounded-xl p-4 border-2 ${colors.border} flex flex-col shadow-sm`}>
              <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center mb-3`}>
                <IconComponent className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <h4 className="font-bold text-sm text-slate-800 mb-2">{product.name}</h4>
              <p className="text-xs text-slate-500 mb-3 flex-1">{product.description}</p>
              <div className="pt-3 border-t border-slate-100 space-y-1">
                <p className="text-xs text-purple-600 font-semibold">{product.impact}</p>
                <p className="text-[11px] text-slate-400">{product.model}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Impact */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-xl p-5 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-purple-200 text-xs font-medium mb-1">Total ARPU Expansion</p>
            <p className="text-white font-bold text-lg">{content?.totalImpact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
