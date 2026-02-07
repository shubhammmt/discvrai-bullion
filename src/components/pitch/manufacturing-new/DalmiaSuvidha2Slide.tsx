import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { ShoppingCart, Truck, CreditCard, Gift, BarChart3 } from 'lucide-react';

interface DalmiaSuvidha2SlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaSuvidha2Slide: React.FC<DalmiaSuvidha2SlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const features = [
    { icon: ShoppingCart, label: 'Smart ordering', color: 'bg-blue-50 border-blue-200 text-blue-600' },
    { icon: Truck, label: 'Live delivery tracking', color: 'bg-purple-50 border-purple-200 text-purple-600' },
    { icon: CreditCard, label: 'Digital payments', color: 'bg-emerald-50 border-emerald-200 text-emerald-600' },
    { icon: Gift, label: 'Loyalty integration', color: 'bg-amber-50 border-amber-200 text-amber-600' },
    { icon: BarChart3, label: 'Market intelligence dashboard', color: 'bg-teal-50 border-teal-200 text-teal-600' }
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
            Digital Platform
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

        {/* Features Grid */}
        <div className="flex-1 flex items-center">
          <div className="grid grid-cols-5 gap-4 w-full">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  className={`flex flex-col items-center p-6 rounded-xl border ${feature.color} text-center`}
                >
                  <IconComponent className="w-10 h-10 mb-3" />
                  <span className="text-sm font-medium text-slate-800">{feature.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Target Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-5 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl">
            <div className="text-center">
              <span className="text-sm font-medium text-slate-600 block uppercase tracking-wide">Target</span>
              <span className="text-4xl font-bold text-teal-700">80%+</span>
            </div>
            <div className="w-px h-12 bg-teal-200" />
            <div className="text-left">
              <span className="text-lg font-semibold text-slate-800">Digital Sales</span>
              <span className="text-sm text-slate-600 block">in 24 months</span>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
