import React from 'react';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { Brain, Lightbulb, Users, ArrowRight, RefreshCw } from 'lucide-react';

interface StrategicThesisSlideProps {
  slide: any;
  slideNumber: number;
  totalSlides: number;
}

export const StrategicThesisSlide: React.FC<StrategicThesisSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const levers = slide.content.levers;

  const leverIcons = [
    <Brain className="w-5 h-5" />,
    <Lightbulb className="w-5 h-5" />,
    <Users className="w-5 h-5" />,
  ];

  const leverColors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', accent: 'bg-blue-600', text: 'text-blue-700', light: 'text-blue-600' },
    { bg: 'bg-purple-50', border: 'border-purple-200', accent: 'bg-purple-600', text: 'text-purple-700', light: 'text-purple-600' },
    { bg: 'bg-teal-50', border: 'border-teal-200', accent: 'bg-teal-600', text: 'text-teal-700', light: 'text-teal-600' },
  ];

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Business Context" sectionColor="bg-amber-600">
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-slate-800">{slide.title}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{slide.subtitle}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 mb-2">
          <p className="text-xs leading-relaxed text-slate-700">{slide.content.assertion}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
          {levers.map((lever: any, i: number) => (
            <div key={i} className={`${leverColors[i].bg} ${leverColors[i].border} border rounded-lg p-4 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`${leverColors[i].accent} text-white p-2 rounded-md`}>
                    {leverIcons[i]}
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${leverColors[i].text}`}>{lever.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">{lever.outcome}</p>
                  </div>
                </div>

                <p className="text-[13px] text-slate-600 leading-relaxed">{lever.businessLogic}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-200/60 mt-3">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Key Points</p>
                {lever.keyPoints.map((point: string, j: number) => (
                  <div key={j} className="flex items-start gap-2">
                    <ArrowRight className={`w-3.5 h-3.5 mt-0.5 ${leverColors[i].light} shrink-0`} />
                    <p className="text-[12px] text-slate-600 leading-snug">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg px-4 py-2.5 flex items-center gap-3">
          <RefreshCw className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-[11px] text-slate-200 leading-relaxed">
            <span className="font-bold text-white">The Compound Effect: </span>
            {slide.content.compoundEffect}
          </p>
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
