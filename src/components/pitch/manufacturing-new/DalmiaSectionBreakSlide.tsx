import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';

interface DalmiaSectionBreakSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaSectionBreakSlide: React.FC<DalmiaSectionBreakSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-8"
        />
        
        {/* Section Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-4"
        >
          {slide.headline}
        </motion.h1>
        
        {/* Subtitle if exists */}
        {slide.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-lg text-slate-500 text-center max-w-xl"
          >
            {slide.subtitle}
          </motion.p>
        )}
        
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-8"
        />
      </div>
    </MfgNewSlideLayout>
  );
};
