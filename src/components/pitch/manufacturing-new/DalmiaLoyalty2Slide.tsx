import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Gift, ArrowRight, Sparkles, Trophy, Gamepad2, Users } from 'lucide-react';

interface DalmiaLoyalty2SlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaLoyalty2Slide: React.FC<DalmiaLoyalty2SlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const features = [
    { icon: Sparkles, label: 'AI tier upgrades', description: 'Smart promotion based on behavior' },
    { icon: Gift, label: 'Personalized rewards', description: 'Tailored incentives per dealer' },
    { icon: Gamepad2, label: 'Gamification', description: 'Engaging mechanics drive activity' },
    { icon: Users, label: 'Contractor tracking', description: 'Measure influencer impact' }
  ];

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
            Loyalty
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

        {/* Evolution Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center gap-6 mb-10"
        >
          {/* Before */}
          <div className="flex flex-col items-center p-6 bg-slate-100 rounded-xl border border-slate-200 min-w-[180px]">
            <Trophy className="w-10 h-10 text-slate-500 mb-3" />
            <span className="text-lg font-semibold text-slate-700">Points Program</span>
            <span className="text-sm text-slate-500 mt-1">Transactional</span>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-16 h-1 bg-gradient-to-r from-slate-300 to-amber-500 origin-left"
            />
            <ArrowRight className="w-8 h-8 text-amber-500 -ml-1" />
          </div>

          {/* After */}
          <div className="flex flex-col items-center p-6 bg-amber-50 rounded-xl border border-amber-200 min-w-[180px]">
            <Sparkles className="w-10 h-10 text-amber-600 mb-3" />
            <span className="text-lg font-semibold text-amber-800">Engagement Ecosystem</span>
            <span className="text-sm text-amber-600 mt-1">Relationship-Driven</span>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                className="flex flex-col items-center p-5 bg-slate-50 rounded-xl border border-slate-200 text-center"
              >
                <IconComponent className="w-8 h-8 text-amber-600 mb-3" />
                <h3 className="text-sm font-bold text-slate-800 mb-1">{feature.label}</h3>
                <p className="text-xs text-slate-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
