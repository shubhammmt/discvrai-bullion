import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { ArrowRight, Factory, Brain } from 'lucide-react';

interface DalmiaCEOImperativeSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCEOImperativeSlide: React.FC<DalmiaCEOImperativeSlideProps> = ({
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
            The CEO Imperative
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 max-w-4xl leading-tight"
        >
          {slide.headline}
        </motion.h2>

        {/* Transformation Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-center gap-6 mb-10"
        >
          {/* Old Model */}
          <div className="flex flex-col items-center p-6 bg-slate-100 rounded-xl border border-slate-200 min-w-[200px]">
            <Factory className="w-10 h-10 text-slate-500 mb-3" />
            <span className="text-lg font-semibold text-slate-700">Old Model</span>
            <span className="text-sm text-slate-500 mt-1">Production-Led</span>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-24 h-1 bg-gradient-to-r from-slate-300 to-teal-500 origin-left"
            />
            <ArrowRight className="w-8 h-8 text-teal-500 -ml-1" />
          </div>

          {/* New Model */}
          <div className="flex flex-col items-center p-6 bg-teal-50 rounded-xl border border-teal-200 min-w-[200px]">
            <Brain className="w-10 h-10 text-teal-600 mb-3" />
            <span className="text-lg font-semibold text-teal-800">New Model</span>
            <span className="text-sm text-teal-600 mt-1">Intelligence-Led</span>
          </div>
        </motion.div>

        {/* Bullet Points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-2 gap-4 max-w-4xl"
        >
          {slide.bullets?.map((bullet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
              className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100"
            >
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-base text-slate-700">{bullet}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
