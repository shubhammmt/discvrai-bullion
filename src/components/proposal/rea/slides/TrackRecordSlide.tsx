import React from 'react';
import { motion } from 'framer-motion';
import { Database, Settings, Truck } from 'lucide-react';
import { REASlide } from '@/data/reaProposalSlides';
import { REASlideLayout } from '../REASlideLayout';

interface TrackRecordSlideProps {
  slide: REASlide;
  slideNumber: number;
  totalSlides: number;
}

const pillarIcons = [Database, Settings, Truck];
const pillarColors = [
  { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-800', metric: 'text-blue-700' },
  { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-800', metric: 'text-emerald-700' },
  { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-800', metric: 'text-amber-700' },
];

export const TrackRecordSlide: React.FC<TrackRecordSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <REASlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-1 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-blue-600 font-medium">{slide.subtitle}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-gray-500 mb-4 flex-shrink-0"
        >
          {content.scope}
        </motion.p>

        {/* 3 Pillars */}
        <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
          {content.pillars.map((pillar: any, pIdx: number) => {
            const Icon = pillarIcons[pIdx];
            const c = pillarColors[pIdx];

            return (
              <motion.div
                key={pIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + pIdx * 0.1 }}
                className={`${c.bg} ${c.border} border rounded-xl p-4 flex flex-col`}
              >
                <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                  <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${c.icon}`} />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded ${c.badge}`}>
                    {pillar.label}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {pillar.items.map((item: any, iIdx: number) => (
                    <div key={iIdx} className="bg-white rounded-lg p-3 border border-gray-100">
                      <p className={`text-lg font-bold ${c.metric}`}>{item.metric}</p>
                      <p className="text-xs text-gray-600 leading-tight">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </REASlideLayout>
  );
};
