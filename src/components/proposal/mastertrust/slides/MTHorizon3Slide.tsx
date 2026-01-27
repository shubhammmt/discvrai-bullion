import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { Target, TrendingUp, CreditCard, Users, Shield, Crown } from 'lucide-react';

interface MTHorizon3SlideProps {
  slide: MasterTrustSlide;
}

export const MTHorizon3Slide: React.FC<MTHorizon3SlideProps> = ({ slide }) => {
  const { content } = slide;

  const productIcons = [CreditCard, Users, Shield, Crown];

  return (
    <div className="w-full h-full flex flex-col bg-white p-10">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            HORIZON 3
          </div>
          <span className="text-slate-400 text-sm">{slide.subtitle?.split('|')[0]}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Ecosystem Expansion</h1>
        <p className="text-sm text-slate-500">{slide.subtitle?.split('|')[1]}</p>
      </div>

      {/* Objective */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Target className="w-4 h-4 text-purple-500 mt-0.5" />
          <p className="text-sm text-purple-800">{content?.objective}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 grid grid-cols-4 gap-3 mb-4">
        {content?.products?.map((product: any, index: number) => {
          const IconComponent = productIcons[index];
          return (
            <div key={index} className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <h4 className="font-semibold text-sm text-slate-800 mb-1">{product.name}</h4>
              <p className="text-[10px] text-slate-500 mb-2 flex-1">{product.description}</p>
              <div className="pt-2 border-t border-slate-200 space-y-1">
                <p className="text-[10px] text-purple-600 font-medium">{product.impact}</p>
                <p className="text-[9px] text-slate-400">{product.model}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Impact */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-white" />
          <div>
            <p className="text-xs text-purple-200">Total ARPU Expansion</p>
            <p className="text-white font-semibold text-sm">{content?.totalImpact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
