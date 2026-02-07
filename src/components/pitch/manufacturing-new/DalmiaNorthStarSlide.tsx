import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Database, Brain, Workflow, Monitor, TrendingUp, ArrowRight } from 'lucide-react';

interface DalmiaNorthStarSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaNorthStarSlide: React.FC<DalmiaNorthStarSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const flowSteps = [
    { icon: Database, label: 'Data', color: 'bg-slate-100 text-slate-600 border-slate-200' },
    { icon: Brain, label: 'AI Intelligence', color: 'bg-blue-100 text-blue-600 border-blue-200' },
    { icon: Workflow, label: 'Agentic Workflows', color: 'bg-purple-100 text-purple-600 border-purple-200' },
    { icon: Monitor, label: 'Digital Platform', color: 'bg-teal-100 text-teal-600 border-teal-200' },
    { icon: TrendingUp, label: 'Revenue Growth', color: 'bg-amber-100 text-amber-600 border-amber-200' }
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
            North Star Vision
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12"
        >
          {slide.headline}
        </motion.h2>

        {/* Flow Diagram */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            {flowSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
                    className={`flex flex-col items-center p-6 rounded-xl border-2 ${step.color} min-w-[140px]`}
                  >
                    <IconComponent className="w-10 h-10 mb-3" />
                    <span className="text-sm font-semibold text-center">{step.label}</span>
                  </motion.div>
                  
                  {index < flowSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.4 + index * 0.15, duration: 0.3 }}
                      className="flex items-center"
                    >
                      <div className="w-8 h-0.5 bg-slate-300" />
                      <ArrowRight className="w-5 h-5 text-slate-400 -ml-1" />
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-lg text-slate-600 italic">
            "Dalmia evolves from <span className="font-semibold text-slate-800">manufacturer</span> to{' '}
            <span className="font-semibold text-teal-600">commercial platform</span>"
          </p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
