import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { REASlide } from '@/data/reaProposalSlides';
import { REASlideLayout } from '../REASlideLayout';

interface Props {
  slide: REASlide;
  slideNumber: number;
  totalSlides: number;
}

const colorMap: Record<string, { bg: string; border: string; accent: string; badge: string }> = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', accent: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', accent: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', accent: 'text-violet-700', badge: 'bg-violet-100 text-violet-700' },
  slate: { bg: 'bg-slate-50', border: 'border-slate-200', accent: 'text-slate-700', badge: 'bg-slate-100 text-slate-700' },
};

export const REAUseCasesSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <REASlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-3 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-blue-600 font-medium">{slide.subtitle}</p>
        </motion.div>

        <div className="flex-1 space-y-2.5 min-h-0">
          {content.useCases.map((uc: any, idx: number) => {
            const c = colorMap[uc.color] || colorMap.blue;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + idx * 0.06 }}
                className={`${c.bg} ${c.border} border rounded-xl px-4 py-3 flex items-center gap-4`}
              >
                <div className="flex-shrink-0 w-48">
                  <h3 className={`font-bold text-sm ${c.accent}`}>{uc.title}</h3>
                  <span className={`text-xs ${c.badge} px-2 py-0.5 rounded mt-0.5 inline-block`}>{uc.platform}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">{uc.forREA}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                <div className="flex-shrink-0 flex gap-2">
                  {uc.impact.map((imp: string, iIdx: number) => (
                    <span key={iIdx} className="text-xs font-semibold bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-gray-800">
                      {imp}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-xs text-gray-500 italic text-center flex-shrink-0"
        >
          "These aren't theoretical use cases. These are proven platforms we've deployed."
        </motion.p>
      </div>
    </REASlideLayout>
  );
};
