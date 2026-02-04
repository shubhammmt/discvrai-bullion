import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Calendar, Target } from 'lucide-react';
import { AptechSlideLayout } from '../AptechSlideLayout';

interface AptechCoverSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    presenter: string;
    role: string;
    date: string;
    objective: string;
  };
  slideNumber: number;
  totalSlides: number;
}

export const AptechCoverSlide: React.FC<AptechCoverSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <AptechSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col justify-center items-center text-center">
        {/* Logo Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Bot className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold text-slate-800 mb-4 max-w-4xl"
        >
          {slide.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-500 mb-10 max-w-2xl"
        >
          {slide.subheadline}
        </motion.p>

        {/* Objective Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-5 py-2.5 mb-12"
        >
          <Target className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium text-orange-700">{slide.objective}</span>
        </motion.div>

        {/* Presenter Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-lg font-semibold text-slate-700">{slide.presenter}</p>
          <p className="text-sm text-slate-500">{slide.role}</p>
          <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{slide.date}</span>
          </div>
        </motion.div>
      </div>
    </AptechSlideLayout>
  );
};
