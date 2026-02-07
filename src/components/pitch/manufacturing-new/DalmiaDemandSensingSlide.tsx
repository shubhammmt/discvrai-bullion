import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { FileSpreadsheet, ArrowRight, Brain, Calendar, Cloud, BarChart3 } from 'lucide-react';

interface DalmiaDemandSensingSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaDemandSensingSlide: React.FC<DalmiaDemandSensingSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const capabilities = [
    { icon: Calendar, label: 'Weekly rolling forecasts' },
    { icon: Cloud, label: 'Weather + infra data' },
    { icon: BarChart3, label: 'Scenario simulation' }
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
            Demand Planning
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
        >
          {slide.headline}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-lg text-slate-600 mb-8"
        >
          {slide.subtitle}
        </motion.p>

        {/* Transformation Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          {/* Before */}
          <div className="flex flex-col items-center p-5 bg-slate-100 rounded-xl border border-slate-200">
            <FileSpreadsheet className="w-10 h-10 text-slate-500 mb-2" />
            <span className="text-base font-semibold text-slate-700">Monthly Excel</span>
            <span className="text-sm text-slate-500">Planning</span>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <div className="w-12 h-1 bg-gradient-to-r from-slate-300 to-teal-500" />
            <ArrowRight className="w-6 h-6 text-teal-500 -ml-1" />
          </div>

          {/* After */}
          <div className="flex flex-col items-center p-5 bg-teal-50 rounded-xl border border-teal-200">
            <Brain className="w-10 h-10 text-teal-600 mb-2" />
            <span className="text-base font-semibold text-teal-800">AI-Driven</span>
            <span className="text-sm text-teal-600">Forecasting</span>
          </div>
        </motion.div>

        {/* Capabilities */}
        <div className="flex justify-center gap-4 mb-8">
          {capabilities.map((cap, index) => {
            const IconComponent = cap.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 px-5 py-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <IconComponent className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">{cap.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex justify-center gap-6"
        >
          <div className="flex flex-col items-center p-5 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-slate-600">65%</span>
              <ArrowRight className="w-5 h-5 text-emerald-500" />
              <span className="text-2xl font-bold text-emerald-700">85%</span>
            </div>
            <span className="text-sm text-slate-600">Forecast Accuracy</span>
          </div>
          <div className="flex flex-col items-center p-5 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-2xl font-bold text-emerald-700">₹100–200 Cr</span>
            <span className="text-sm text-slate-600 mt-1">Working Capital Improvement</span>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
