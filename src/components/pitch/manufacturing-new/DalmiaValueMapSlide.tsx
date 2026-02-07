import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';

interface DalmiaValueMapSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaValueMapSlide: React.FC<DalmiaValueMapSlideProps> = ({
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
            Value Creation
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

        {/* Value Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex-1"
        >
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-2 bg-slate-100 border-b border-slate-200">
              <div className="px-6 py-4 font-bold text-slate-800">Initiative</div>
              <div className="px-6 py-4 font-bold text-slate-800 text-right">Annual Value (₹ Cr)</div>
            </div>
            
            {/* Rows */}
            {slide.valueTable?.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.08, duration: 0.3 }}
                className={`grid grid-cols-2 border-b border-slate-100 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
              >
                <div className="px-6 py-3 text-slate-700">{row.initiative}</div>
                <div className="px-6 py-3 text-right font-semibold text-slate-800">{row.value}</div>
              </motion.div>
            ))}
            
            {/* Total Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="grid grid-cols-2 bg-emerald-50 border-t-2 border-emerald-200"
            >
              <div className="px-6 py-4 font-bold text-emerald-800">Total Value</div>
              <div className="px-6 py-4 text-right font-bold text-2xl text-emerald-700">{slide.totalValue}</div>
            </motion.div>
          </div>
        </motion.div>

        {/* ROI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-6 flex justify-center gap-6"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-slate-100 rounded-lg border border-slate-200">
            <span className="text-sm text-slate-600">Investment:</span>
            <span className="text-lg font-bold text-slate-800">{slide.investment}</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-amber-100 rounded-lg border border-amber-200">
            <span className="text-sm text-amber-700">ROI:</span>
            <span className="text-2xl font-bold text-amber-700">{slide.roi}</span>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
