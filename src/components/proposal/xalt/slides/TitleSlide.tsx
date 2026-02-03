import React from 'react';
import { motion } from 'framer-motion';

interface TitleSlideProps {
  slideNumber: number;
  totalSlides: number;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ slideNumber, totalSlides }) => {
  return (
    <div className="h-screen w-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-12 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-400">XALT × DiscvrAI</span>
          <span className="text-sm text-slate-400">{slideNumber}/{totalSlides}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-12 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            AI-First Transformation of Xalt's<br />
            <span className="text-amber-600">Deal & Investor Engine</span>
          </h1>
          
          <p className="text-2xl text-slate-600 mb-12">
            Enabling 10–20x Growth Without Headcount Increase
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <p className="text-lg text-slate-500 mb-2">DiscvrAI × Xalt Partnership Proposal</p>
          <p className="text-slate-400">February 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-sm text-slate-400"
        >
          <p><strong>To:</strong> Niraj Shah, Co-Founder – Xalt</p>
          <p><strong>From:</strong> DiscvrAI Team</p>
        </motion.div>
      </div>
    </div>
  );
};
