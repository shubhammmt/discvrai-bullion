import React from 'react';
import { motion } from 'framer-motion';
import { Target, Plug, BarChart3, Gauge, Calendar } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface Props {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

const ICONS = [Target, Plug, BarChart3, Gauge, Calendar];

export const CompanyPilotSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const c = slide.content || {};
  const accent = c.accent || '#10b981';
  const company = c.company || '';
  const blocks: Array<{ label: string; value: string }> = c.blocks || [];

  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides} variant="light">
      <div className="h-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
          <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: accent }}>
            {company} · 2–3 Week Pilot
          </div>
          <h2 className="text-3xl font-light text-slate-900 mb-1">{slide.title}</h2>
          {slide.subtitle && <p className="text-base text-slate-500">{slide.subtitle}</p>}
        </motion.div>

        <div className="flex-1 grid grid-cols-5 gap-3 min-h-0">
          {blocks.map((b, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${accent}15` }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: accent }} />
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">{b.label}</div>
                <div className="text-sm text-slate-800 leading-snug flex-1">{b.value}</div>
              </motion.div>
            );
          })}
        </div>

        {c.cta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 px-5 py-3.5 rounded-lg text-white text-sm font-medium text-center"
            style={{ background: accent }}
          >
            {c.cta}
          </motion.div>
        )}
      </div>
    </SlideLayout>
  );
};
