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
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
              <Factory className="w-16 h-16 text-amber-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 max-w-4xl"
        >
          {slide.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl text-amber-600 font-semibold mb-6"
        >
          {slide.subheadline}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-gray-600 max-w-3xl mb-10 leading-relaxed"
        >
          {slide.tagline}
        </motion.p>

        {/* Key Message Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full px-8 py-4 mb-8"
        >
          <p className="text-amber-700 font-bold text-lg flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            {slide.keyMessage}
          </p>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-base text-gray-500 italic"
        >
          {slide.note}
        </motion.p>

        {/* Target Industries */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {['Cement & Heavy Manufacturing', 'Consumer Durables', 'Chemicals & Process', 'FMCG', 'Electronics'].map((industry, index) => (
            <span
              key={index}
              className="px-5 py-2.5 bg-slate-100 text-gray-700 rounded-full text-base font-medium"
            >
              {industry}
            </span>
          ))}
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
