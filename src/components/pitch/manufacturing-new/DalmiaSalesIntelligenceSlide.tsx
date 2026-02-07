import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Smartphone, Bot, Calendar, Package, AlertTriangle, MapPin } from 'lucide-react';

interface DalmiaSalesIntelligenceSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaSalesIntelligenceSlide: React.FC<DalmiaSalesIntelligenceSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const capabilities = [
    { icon: Calendar, label: 'Daily visit prioritization', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { icon: Package, label: 'Next best product', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { icon: AlertTriangle, label: 'Churn alerts', color: 'text-red-600 bg-red-50 border-red-200' },
    { icon: MapPin, label: 'Territory optimization', color: 'text-teal-600 bg-teal-50 border-teal-200' }
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
            Sales Intelligence
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

        {/* Main Content */}
        <div className="flex-1 flex items-center gap-12">
          {/* Copilot Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200"
          >
            <div className="relative">
              <Smartphone className="w-20 h-20 text-slate-400" />
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mt-4">SM@RT-D</h3>
            <p className="text-sm text-teal-600 font-medium">→ AI Sales Copilot</p>
          </motion.div>

          {/* Capabilities Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {capabilities.map((cap, index) => {
              const IconComponent = cap.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className={`flex items-center gap-4 p-5 rounded-xl border ${cap.color}`}
                >
                  <IconComponent className="w-8 h-8 flex-shrink-0" />
                  <span className="text-base font-medium text-slate-800">{cap.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Impact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <span className="text-sm font-medium text-slate-600">Impact:</span>
            <span className="text-2xl font-bold text-emerald-700">8–15%</span>
            <span className="text-base text-slate-700">sales productivity uplift</span>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
