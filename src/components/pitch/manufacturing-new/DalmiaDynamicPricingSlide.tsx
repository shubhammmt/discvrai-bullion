import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { AlertCircle, Zap, TrendingUp } from 'lucide-react';

interface DalmiaDynamicPricingSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaDynamicPricingSlide: React.FC<DalmiaDynamicPricingSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Capability Deep Dive
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
        >
          {slide.headline}
        </motion.h2>

        {/* Three Column Layout */}
        <div className="flex-1 grid grid-cols-3 gap-6">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="p-6 bg-red-50 rounded-xl border border-red-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-bold text-red-800">Problem</h3>
            </div>
            <p className="text-base text-slate-700">{slide.problem}</p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="p-6 bg-blue-50 rounded-xl border border-blue-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-blue-800">Solution</h3>
            </div>
            <ul className="space-y-2">
              {slide.solution?.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Impact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="p-6 bg-emerald-50 rounded-xl border border-emerald-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              <h3 className="text-lg font-bold text-emerald-800">Impact</h3>
            </div>
            <div className="text-center mt-6">
              <p className="text-3xl font-bold text-emerald-700">₹140–280 Cr</p>
              <p className="text-sm text-slate-600 mt-2">annually</p>
              <div className="mt-4 px-3 py-2 bg-emerald-100 rounded-lg">
                <p className="text-sm font-medium text-emerald-800">1–2% realization uplift</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
