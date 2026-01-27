import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { CheckCircle, X, Zap, ArrowRight, Bot } from 'lucide-react';

interface MTCompetitiveSlideProps {
  slide: MasterTrustSlide;
}

export const MTCompetitiveSlide: React.FC<MTCompetitiveSlideProps> = ({ slide }) => {
  const { content } = slide;

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{slide.title}</h1>
            <p className="text-sm text-slate-500">{slide.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="flex-1 grid grid-cols-2 gap-5 mb-5">
        {/* Generic Platforms */}
        <div className="bg-white rounded-xl border-2 border-red-200 p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <X className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{content?.generic?.title}</h3>
              <p className="text-xs text-slate-500">Generic Marketing Platforms</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-600 mb-2">What they can do:</p>
            {content?.generic?.capabilities?.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-600">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold text-red-600 mb-2">What they cannot do:</p>
            {content?.generic?.limitations?.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <X className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Our Platform */}
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl border-2 border-emerald-300 p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{content?.ourPlatform?.title}</h3>
              <p className="text-xs text-emerald-600">AI-Agentic Financial Platform</p>
            </div>
          </div>
          
          <div className="flex-1">
            <p className="text-xs font-semibold text-emerald-700 mb-2">Complete capabilities:</p>
            {content?.ourPlatform?.capabilities?.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <ArrowRight className="w-5 h-5 text-white" />
          <p className="text-white text-sm font-medium">{content?.recommendation}</p>
        </div>
      </div>
    </div>
  );
};
