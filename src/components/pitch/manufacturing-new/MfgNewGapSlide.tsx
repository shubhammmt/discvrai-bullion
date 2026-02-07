import React from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle } from 'lucide-react';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';

interface MfgNewGapSlideProps {
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

export const MfgNewGapSlide: React.FC<MfgNewGapSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 flex-shrink-0"
        >
          <div className="flex items-center gap-3 mb-1">
            <Layers className="w-7 h-7 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900">{slide.headline}</h2>
          </div>
          <p className="text-base text-gray-600">{slide.subheadline}</p>
        </motion.div>

        {/* Positioning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-3 flex-shrink-0"
        >
          <p className="text-amber-800 font-semibold text-sm">"{slide.positioning}"</p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col min-h-0"
        >
          <div className="grid grid-cols-3 bg-slate-800 text-white text-sm font-bold flex-shrink-0">
            <div className="p-3">Function</div>
            <div className="p-3 bg-red-900/30">Current Reality</div>
            <div className="p-3 bg-emerald-900/30">How We Help</div>
          </div>
          <div className="divide-y divide-slate-100 flex-1 flex flex-col min-h-0 overflow-hidden">
            {slide.comparisons.slice(0, 7).map((comparison, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="grid grid-cols-3 text-sm hover:bg-slate-50 transition-colors flex-1"
              >
                <div className="p-2.5 font-semibold text-gray-800 flex items-center">{comparison.function}</div>
                <div className="p-2.5 text-red-600 bg-red-50/50 flex items-center">{comparison.current}</div>
                <div className="p-2.5 text-emerald-600 bg-emerald-50/50 flex items-center font-medium">{comparison.solution}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-3 grid grid-cols-2 gap-2 flex-shrink-0"
        >
          {slide.capabilities.slice(0, 4).map((capability, index) => (
            <div key={index} className="flex items-start gap-2 bg-slate-50 rounded-lg p-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{capability}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
