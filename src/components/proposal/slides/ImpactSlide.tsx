import React from 'react';
import { JindalSlide } from '@/data/jindalProposalSlides';
import { TrendingUp } from 'lucide-react';

interface ImpactSlideProps {
  slide: JindalSlide;
}

export const ImpactSlide: React.FC<ImpactSlideProps> = ({ slide }) => {
  const { content } = slide;

  const getColor = (index: number) => {
    const colors = [
      'bg-blue-50 border-blue-200',
      'bg-emerald-50 border-emerald-200',
      'bg-purple-50 border-purple-200',
      'bg-orange-50 border-orange-200',
      'bg-cyan-50 border-cyan-200'
    ];
    return colors[index % colors.length];
  };

  const getTextColor = (index: number) => {
    const colors = ['text-blue-700', 'text-emerald-700', 'text-purple-700', 'text-orange-700', 'text-cyan-700'];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full h-full flex flex-col bg-white p-12">
      {/* Header */}
      <div className="mb-8">
        <div className="w-12 h-1 bg-slate-800 mb-4" />
        <h1 className="text-4xl font-light text-slate-800">{slide.title}</h1>
      </div>

      {/* Impact Cards */}
      <div className="flex-1 grid grid-cols-5 gap-4">
        {content?.impacts?.map((item: any, index: number) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${getColor(index)} flex flex-col`}
          >
            <div className={`text-lg font-semibold mb-3 ${getTextColor(index)}`}>
              {item.useCase}
            </div>
            <p className="text-sm text-slate-700 flex-1">{item.impact}</p>
            <div className="mt-4 pt-3 border-t border-slate-200">
              <span className="text-xs text-slate-500">{item.timeline}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 flex items-center gap-3 p-4 bg-slate-800 rounded-lg">
        <TrendingUp className="w-5 h-5 text-white flex-shrink-0" />
        <p className="text-white font-medium">
          Cumulative Value: <span className="text-slate-300">{content?.summary}</span>
        </p>
      </div>
    </div>
  );
};
