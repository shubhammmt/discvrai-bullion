import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { AptechSlideLayout } from '../AptechSlideLayout';

interface AptechImpactSlideProps {
  slide: {
    title: string;
    subtitle: string;
    comparison: Array<{
      area: string;
      current: string;
      transformed: string;
    }>;
  };
  slideNumber: number;
  totalSlides: number;
}

export const AptechImpactSlide: React.FC<AptechImpactSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <AptechSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <h2 className="text-4xl font-bold text-slate-800">{slide.title}</h2>
          </div>
          <p className="text-lg text-slate-500">{slide.subtitle}</p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1"
        >
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200">
              <div className="p-4 font-semibold text-slate-600">Area</div>
              <div className="p-4 font-semibold text-red-600 text-center">Current State</div>
              <div className="p-4 font-semibold text-emerald-600 text-center">With DiscvrAI</div>
            </div>
            
            {/* Table Rows */}
            {slide.comparison.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`grid grid-cols-3 border-b border-slate-100 last:border-b-0 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                <div className="p-4 font-medium text-slate-800">{row.area}</div>
                <div className="p-4 text-center text-slate-500 flex items-center justify-center gap-2">
                  <span className="text-sm">{row.current}</span>
                </div>
                <div className="p-4 text-center flex items-center justify-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-emerald-700 font-medium">{row.transformed}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AptechSlideLayout>
  );
};
