import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, CheckCircle } from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

interface MfgGapSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    positioning: string;
    comparisons: Array<{ function: string; current: string; solution: string }>;
    capabilities: string[];
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgGapSlide: React.FC<MfgGapSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <MfgSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-6 h-6 text-amber-600" />
            <h2 className="text-3xl font-bold text-slate-800">{slide.headline}</h2>
          </div>
          <p className="text-lg text-slate-600">{slide.subheadline}</p>
        </motion.div>

        {/* Positioning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-4"
        >
          <p className="text-amber-800 font-medium text-sm">"{slide.positioning}"</p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden"
        >
          <div className="grid grid-cols-3 bg-slate-800 text-white text-sm font-semibold">
            <div className="p-3">Function</div>
            <div className="p-3 bg-red-900/30">Current Reality</div>
            <div className="p-3 bg-emerald-900/30">How We Help</div>
          </div>
          <div className="divide-y divide-slate-100 overflow-auto max-h-[280px]">
            {slide.comparisons.map((comparison, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="grid grid-cols-3 text-sm hover:bg-slate-50 transition-colors"
              >
                <div className="p-3 font-medium text-slate-700">{comparison.function}</div>
                <div className="p-3 text-red-600 bg-red-50/50">{comparison.current}</div>
                <div className="p-3 text-emerald-600 bg-emerald-50/50">{comparison.solution}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 grid grid-cols-2 gap-3"
        >
          {slide.capabilities.map((capability, index) => (
            <div key={index} className="flex items-start gap-2 bg-slate-50 rounded-lg p-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700">{capability}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
