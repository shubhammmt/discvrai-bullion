import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { REASlide } from '@/data/reaProposalSlides';
import { REASlideLayout } from '../REASlideLayout';

interface CoverSlideProps {
  slide: REASlide;
  slideNumber: number;
  totalSlides: number;
}

export const CoverSlide: React.FC<CoverSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  const icons = [Sparkles, TrendingUp, Zap];

  return (
    <REASlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
            Prepared for {content.recipient} · {content.recipientTitle}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 mb-3 max-w-3xl leading-tight"
        >
          {slide.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base text-gray-500 mb-8 max-w-xl"
        >
          {content.objective}
        </motion.p>

        {/* Key Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          {content.points.map((point: string, idx: number) => {
            const Icon = icons[idx];
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3"
              >
                <Icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-800 font-medium">{point}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Speaker note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-2xl"
        >
          <p className="text-sm text-gray-500 italic leading-relaxed">
            "{content.speakerNote}"
          </p>
        </motion.div>
      </div>
    </REASlideLayout>
  );
};
