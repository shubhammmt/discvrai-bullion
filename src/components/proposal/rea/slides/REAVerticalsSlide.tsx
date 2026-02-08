import React from 'react';
import { motion } from 'framer-motion';
import { Target, Headset, Users, BarChart3, Settings, CheckCircle } from 'lucide-react';
import { REASlide } from '@/data/reaProposalSlides';
import { REASlideLayout } from '../REASlideLayout';

interface Props {
  slide: REASlide;
  slideNumber: number;
  totalSlides: number;
}

const verticalIcons = [Target, Headset, Users, BarChart3, Settings];
const verticalColors = [
  { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', impact: 'text-blue-700' },
  { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', impact: 'text-emerald-700' },
  { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', impact: 'text-amber-700' },
  { bg: 'bg-violet-50', border: 'border-violet-200', icon: 'text-violet-600', impact: 'text-violet-700' },
  { bg: 'bg-slate-50', border: 'border-slate-200', icon: 'text-slate-600', impact: 'text-slate-700' },
];

export const REAVerticalsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <REASlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex-shrink-0">
          <h2 className="text-3xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-lg text-blue-600 font-medium mt-1">{slide.subtitle}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-5 gap-4 min-h-0">
          {content.verticals.map((v: any, idx: number) => {
            const Icon = verticalIcons[idx];
            const c = verticalColors[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.06 }}
                className={`${c.bg} ${c.border} border rounded-xl p-4 flex flex-col`}
              >
                <div className={`w-9 h-9 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${c.icon}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-3 leading-snug">{v.title}</h3>
                <div className="space-y-2.5 flex-1">
                  {v.items.map((item: string, iIdx: number) => (
                    <div key={iIdx} className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 ${c.icon} flex-shrink-0 mt-0.5`} />
                      <span className="text-sm text-gray-700 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
                <div className={`mt-3 pt-3 border-t ${c.border}`}>
                  <p className={`text-sm font-bold ${c.impact} leading-snug`}>{v.impact}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-center flex-shrink-0"
        >
          <p className="text-base text-gray-700 font-medium">{content.focus}</p>
        </motion.div>
      </div>
    </REASlideLayout>
  );
};
