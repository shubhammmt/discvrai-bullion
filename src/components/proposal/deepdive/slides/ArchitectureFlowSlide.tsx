import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { ArrowDown } from 'lucide-react';

const layerColors: Record<string, { bg: string; border: string; text: string; header: string }> = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', header: 'bg-blue-600 text-white' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', header: 'bg-purple-600 text-white' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', header: 'bg-amber-600 text-white' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', header: 'bg-emerald-600 text-white' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', header: 'bg-teal-600 text-white' },
};

interface Props {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
  sectionLabel: string;
  sectionColor: string;
}

export const ArchitectureFlowSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides, sectionLabel, sectionColor }) => {
  const layers = slide.content.layers;

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel={sectionLabel} sectionColor={sectionColor}>
      <div className="mb-3">
        <div className="w-10 h-0.5 bg-slate-800 mb-2" />
        <h1 className="text-2xl font-semibold text-slate-800">{slide.title}</h1>
        <p className="text-sm text-slate-500">{slide.subtitle}</p>
      </div>

      <div className="flex flex-col gap-1.5">
        {layers.map((layer: any, i: number) => {
          const colors = layerColors[layer.color] || layerColors.blue;
          return (
            <React.Fragment key={i}>
              <div className={`rounded-lg border ${colors.border} overflow-hidden`}>
                <div className={`${colors.header} px-3 py-1 text-[11px] font-bold uppercase tracking-wider`}>
                  {layer.name}
                </div>
                <div className={`${colors.bg} px-3 py-2 grid gap-2`} style={{ gridTemplateColumns: `repeat(${layer.columns.length}, 1fr)` }}>
                  {layer.columns.map((col: any, j: number) => (
                    <div key={j}>
                      <p className={`text-[10px] font-bold ${colors.text} mb-0.5`}>{col.label}</p>
                      {col.items.map((item: string, k: number) => (
                        <p key={k} className="text-[9px] text-slate-600 leading-tight">{item}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {i < layers.length - 1 && (
                <div className="flex justify-center">
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
