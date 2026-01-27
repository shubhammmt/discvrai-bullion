import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { TrendingUp, Target, ArrowRight, Star, DollarSign } from 'lucide-react';

interface MTAUMTrajectorySlideProps {
  slide: MasterTrustSlide;
}

export const MTAUMTrajectorySlide: React.FC<MTAUMTrajectorySlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-emerald-50 to-blue-50 p-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{slide.title}</h1>
            <p className="text-sm text-slate-500">{slide.subtitle}</p>
          </div>
        </div>
      </div>

      {/* AUM Trajectory Timeline */}
      <div className="flex-1 grid grid-cols-3 gap-4 mb-5">
        {content?.trajectory?.map((item: any, index: number) => (
          <div 
            key={index} 
            className={`rounded-xl p-5 flex flex-col ${
              item.highlight 
                ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg' 
                : 'bg-white border-2 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                item.highlight ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {item.period}
              </span>
              {item.highlight && <Star className="w-4 h-4 text-yellow-300" />}
            </div>
            <div className={`text-3xl font-bold mb-2 ${item.highlight ? 'text-white' : 'text-emerald-600'}`}>
              {item.aum}
            </div>
            <p className={`text-sm font-medium mb-2 ${item.highlight ? 'text-emerald-100' : 'text-slate-700'}`}>
              {item.description}
            </p>
            <p className={`text-xs mt-auto ${item.highlight ? 'text-emerald-200' : 'text-slate-500'}`}>
              {item.calculation}
            </p>
          </div>
        ))}
      </div>

      {/* Comparison & Revenue */}
      <div className="grid grid-cols-2 gap-4">
        {/* Benchmark */}
        <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-slate-800">Industry Benchmark</span>
          </div>
          <p className="text-sm text-blue-700 font-semibold mb-2">{content?.comparison?.benchmark}</p>
          <div className="flex items-center gap-2 text-emerald-600">
            <ArrowRight className="w-4 h-4" />
            <span className="text-xs font-medium">{content?.comparison?.advantage}</span>
          </div>
        </div>

        {/* Revenue Projection */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold text-white">ARR Projection</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {content?.revenue?.map((item: any, index: number) => (
              <div key={index} className="bg-white/10 rounded-lg p-3">
                <p className="text-emerald-300 text-xs font-medium">{item.label}</p>
                <p className="text-white text-xl font-bold">{item.value}</p>
                <p className="text-slate-400 text-[10px]">{item.calculation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
