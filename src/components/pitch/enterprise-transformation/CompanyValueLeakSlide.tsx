import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface Props {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const CompanyValueLeakSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const c = slide.content || {};
  const accent = c.accent || '#10b981';
  const company = c.company || '';

  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides} variant="light">
      <div className="h-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
          <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: accent }}>
            {company} · Value Leakage
          </div>
          <h2 className="text-3xl font-light text-slate-900 mb-1">{slide.title}</h2>
          {slide.subtitle && <p className="text-base text-slate-500">{slide.subtitle}</p>}
        </motion.div>

        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-0">
          <div className="grid grid-cols-12 px-5 py-3 border-b border-slate-200 bg-slate-50">
            <div className="col-span-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Function</div>
            <div className="col-span-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">What Breaks Today</div>
            <div className="col-span-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Business Impact</div>
          </div>
          <div className="flex-1 divide-y divide-slate-100">
            {(c.rows || []).map((r: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="grid grid-cols-12 px-5 py-3.5 items-center hover:bg-slate-50 transition-colors"
              >
                <div className="col-span-3 flex items-center gap-2">
                  <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
                  <span className="text-sm font-semibold text-slate-800">{r.fn}</span>
                </div>
                <div className="col-span-5 text-sm text-slate-600">{r.breaks}</div>
                <div className="col-span-4 flex items-center gap-2">
                  <TrendingDown className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700 font-medium">{r.impact}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
