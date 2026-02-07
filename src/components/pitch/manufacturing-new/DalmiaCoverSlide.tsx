import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';

interface DalmiaCoverSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCoverSlide: React.FC<DalmiaCoverSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {/* Company Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full mb-8"
          >
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            <span className="text-sm font-semibold text-amber-700 tracking-wide uppercase">
              Strategic Transformation Blueprint
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
          >
            {slide.headline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            {slide.subtitle}
          </motion.p>

          {/* Visual Separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-12 rounded-full"
          />

          {/* Audience Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500"
          >
            <span>CEO + Board + CXO</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Commercial Transformation</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>AI-Powered Intelligence</span>
          </motion.div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
