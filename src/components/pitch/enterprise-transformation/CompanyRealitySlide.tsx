import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface Props {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const CompanyRealitySlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const c = slide.content || {};
  const accent = c.accent || '#10b981';
  const company = c.company || '';

  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides} variant="light">
      <div className="h-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
          <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: accent }}>
            {company} · Reality Check
          </div>
          <h2 className="text-3xl font-light text-slate-900 mb-1">{slide.title}</h2>
          {slide.subtitle && <p className="text-base text-slate-500">{slide.subtitle}</p>}
        </motion.div>

        <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5" style={{ color: accent }} />
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">What Exists</h3>
            </div>
            <ul className="space-y-2.5 flex-1">
              {(c.exists || []).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: accent }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">What Still Breaks</h3>
            </div>
            <ul className="space-y-2.5 flex-1">
              {(c.breaks || []).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 bg-amber-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {c.footer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 px-5 py-3 rounded-lg border-l-4 bg-slate-50 text-sm text-slate-700 italic"
            style={{ borderColor: accent }}
          >
            {c.footer}
          </motion.div>
        )}
      </div>
    </SlideLayout>
  );
};
