import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Zap, ArrowRight } from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

interface MfgTitleSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    tagline: string;
    keyMessage: string;
    note: string;
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgTitleSlide: React.FC<MfgTitleSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <MfgSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col items-center justify-center text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
              <Factory className="w-14 h-14 text-amber-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold text-slate-800 mb-4 max-w-4xl"
        >
          {slide.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl text-amber-600 font-medium mb-6"
        >
          {slide.subheadline}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-slate-600 max-w-3xl mb-8 leading-relaxed"
        >
          {slide.tagline}
        </motion.p>

        {/* Key Message Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full px-6 py-3 mb-6"
        >
          <p className="text-amber-700 font-semibold flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            {slide.keyMessage}
          </p>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-sm text-slate-500 italic"
        >
          {slide.note}
        </motion.p>

        {/* Target Industries */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {['Cement & Heavy Manufacturing', 'Consumer Durables', 'Chemicals & Process', 'FMCG', 'Electronics'].map((industry, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm"
            >
              {industry}
            </span>
          ))}
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
