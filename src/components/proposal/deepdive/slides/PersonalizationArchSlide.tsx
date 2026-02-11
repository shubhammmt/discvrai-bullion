import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { ArrowDown } from 'lucide-react';

const layerColorMap: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
};

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

export const PersonalizationArchSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const layers = slide.content.layers;

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Personalization" sectionColor="bg-purple-600">
      <div className="mb-2">
        <div className="w-10 h-0.5 bg-slate-800 mb-1" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-base text-slate-500">{slide.subtitle}</p>
      </div>

      <div className="flex flex-col gap-1 flex-1">
        {layers.map((layer: any, i: number) => {
          const colors = layerColorMap[layer.color] || layerColorMap.blue;
          const isArrayItems = typeof layer.items[0] === 'string';
          return (
            <React.Fragment key={i}>
              <div className={`${colors.bg} border ${colors.border} rounded-lg p-3 flex-1`}>
                <p className={`text-xs font-bold ${colors.text} uppercase tracking-wider mb-1`}>{layer.name}</p>
                {isArrayItems ? (
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item: string, j: number) => (
                      <span key={j} className="text-[11px] bg-white border border-slate-200 rounded px-2.5 py-1 text-slate-700">{item}</span>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-3">
                    {layer.items.map((group: any, j: number) => (
                      <div key={j} className="bg-white border border-slate-200 rounded px-3 py-2 flex-1">
                        <p className="text-[11px] font-bold text-slate-700 mb-0.5">{group.label}</p>
                        {group.items.map((item: string, k: number) => (
                          <p key={k} className="text-[11px] text-slate-500 leading-snug">• {item}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {i < layers.length - 1 && (
                <div className="flex justify-center -my-0.5">
                  <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </DeepDiveSlideLayout>
  );
};
