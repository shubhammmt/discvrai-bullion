import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Puzzle, CheckCircle } from 'lucide-react';
import { REASlide } from '@/data/reaProposalSlides';
import { REASlideLayout } from '../REASlideLayout';

interface Props {
  slide: REASlide;
  slideNumber: number;
  totalSlides: number;
}

const principleIcons: Record<string, React.ComponentType<any>> = {
  'trending-up': TrendingUp,
  'zap': Zap,
  'puzzle': Puzzle,
};

const principleColors = [
  { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600' },
  { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600' },
  { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600' },
];

export const ApproachSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <REASlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-blue-600 font-medium">{slide.subtitle}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left: Principles */}
          <div className="col-span-7 space-y-3">
            {content.principles.map((p: any, idx: number) => {
              const Icon = principleIcons[p.icon] || TrendingUp;
              const c = principleColors[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  className={`${c.bg} ${c.border} border rounded-xl p-5 flex items-start gap-4`}
                >
                  <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${c.icon}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{p.title}</h3>
                    <p className="text-sm text-gray-600">{p.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Proven */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5 bg-gray-900 rounded-xl p-5 text-white flex flex-col"
          >
            <h3 className="font-bold text-base mb-4 text-blue-300">What We've Proven</h3>
            <div className="space-y-3 flex-1">
              {content.proven.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-400 italic">
                "We embed intelligence into workflows that move business metrics."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </REASlideLayout>
  );
};
