import React from 'react';
import { JindalSlide } from '@/data/jindalProposalSlides';
import { Key, Building2, Handshake } from 'lucide-react';

interface IPCommercialSlideProps {
  slide: JindalSlide;
}

export const IPCommercialSlide: React.FC<IPCommercialSlideProps> = ({ slide }) => {
  const { content } = slide;

  const icons = [Key, Building2, Handshake];

  return (
    <div className="w-full h-full flex flex-col bg-white p-12">
      {/* Header */}
      <div className="mb-6">
        <div className="w-12 h-1 bg-slate-800 mb-4" />
        <h1 className="text-4xl font-light text-slate-800">{slide.title}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 grid grid-cols-2 gap-8">
        {/* IP Ownership */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">IP Ownership</h3>
          <div className="space-y-3">
            {content?.ownership?.map((item: any, index: number) => {
              const Icon = icons[index] || Key;
              return (
                <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <Icon className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">{item.owner}</p>
                    <p className="text-sm text-slate-600 mt-1">{item.items}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commercial Structure */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Commercial Structure</h3>
          <div className="space-y-4">
            {/* Phase 1 */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-slate-800">{content?.commercial?.phase1?.title}</p>
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {content?.commercial?.phase1?.type}
                </span>
              </div>
              <ul className="space-y-1">
                {content?.commercial?.phase1?.items?.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-slate-800">{content?.commercial?.phase2?.title}</p>
                <span className="text-xs font-medium px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                  {content?.commercial?.phase2?.type}
                </span>
              </div>
              <ul className="space-y-1">
                {content?.commercial?.phase2?.items?.map((item: string, i: number) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-4 p-3 bg-slate-100 rounded-lg">
            <p className="text-sm text-slate-700">
              <span className="font-medium">Benefits:</span> {content?.benefits}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
