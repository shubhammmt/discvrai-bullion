import React from 'react';
import { DeepDiveSlideLayout } from '../DeepDiveSlideLayout';
import { BarChart3, TrendingUp, Shield, ExternalLink } from 'lucide-react';

interface BenchmarksEvidenceSlideProps {
  slide: any;
  slideNumber: number;
  totalSlides: number;
}

export const BenchmarksEvidenceSlide: React.FC<BenchmarksEvidenceSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const benchmarks = slide.content.benchmarks;

  const colors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', accent: 'bg-blue-600', text: 'text-blue-700' },
    { bg: 'bg-purple-50', border: 'border-purple-200', accent: 'bg-purple-600', text: 'text-purple-700' },
    { bg: 'bg-teal-50', border: 'border-teal-200', accent: 'bg-teal-600', text: 'text-teal-700' },
  ];

  const icons = [
    <BarChart3 className="w-4 h-4" />,
    <TrendingUp className="w-4 h-4" />,
    <Shield className="w-4 h-4" />,
  ];

  return (
    <DeepDiveSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} sectionLabel="Business Context" sectionColor="bg-amber-600">
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-slate-800">{slide.title}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{slide.subtitle}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
          {benchmarks.map((b: any, i: number) => (
            <div key={i} className={`${colors[i].bg} ${colors[i].border} border rounded-lg p-3.5 flex flex-col`}>
              <div className="flex items-center gap-2 mb-2.5">
                <div className={`${colors[i].accent} text-white p-1.5 rounded-md`}>
                  {icons[i]}
                </div>
                <h3 className={`text-xs font-bold ${colors[i].text}`}>{b.title}</h3>
              </div>

              <div className="space-y-2.5 flex-1">
                {b.evidence.map((ev: any, j: number) => (
                  <div key={j}>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{ev.label}</p>
                    <p className="text-[11px] text-slate-700 leading-snug">{ev.detail}</p>
                  </div>
                ))}
              </div>

              {b.keyMetric && (
                <div className={`mt-2.5 ${colors[i].accent} rounded-md px-3 py-2`}>
                  <p className="text-[10px] text-white/80 font-medium">{b.keyMetric.label}</p>
                  <p className="text-base font-bold text-white">{b.keyMetric.value}</p>
                </div>
              )}

              {b.references && b.references.length > 0 && (
                <div className="mt-2 pt-1.5 border-t border-slate-200/60">
                  <p className="text-[9px] text-slate-400 font-medium mb-0.5">References</p>
                  {b.references.map((ref: string, k: number) => (
                    <div key={k} className="flex items-center gap-1">
                      <ExternalLink className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                      <p className="text-[9px] text-slate-400 truncate">{ref}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-700 leading-relaxed">
            <span className="font-bold text-amber-700">Implementation Pattern: </span>
            {slide.content.implementationNote}
          </p>
        </div>
      </div>
    </DeepDiveSlideLayout>
  );
};
