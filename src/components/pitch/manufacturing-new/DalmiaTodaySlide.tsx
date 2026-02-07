import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Users, Smartphone, Gift, Truck, ShoppingCart, AlertTriangle } from 'lucide-react';

interface DalmiaTodaySlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaTodaySlide: React.FC<DalmiaTodaySlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const systemIcons = [Users, ShoppingCart, Smartphone, Gift, Truck];
  const systemLabels = ['Channel Partners', 'SUVIDHA', 'SM@RT-D', 'Dalmia Delight', 'DriverSathi'];

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
            Dalmia Today
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

        {/* Fragmented Systems Diagram */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Systems Grid */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            {slide.bullets?.map((bullet, index) => {
              const IconComponent = systemIcons[index] || Users;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-200 border-dashed min-w-[140px]"
                >
                  <IconComponent className="w-8 h-8 text-slate-500 mb-2" />
                  <span className="text-xs font-medium text-slate-600 text-center mb-1">
                    {systemLabels[index]}
                  </span>
                  <span className="text-xs text-slate-500 text-center">{bullet}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Dotted Connection Lines (Visual Fragmentation) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="relative w-full max-w-3xl h-8 mb-6"
          >
            <svg className="w-full h-full" viewBox="0 0 600 30">
              <line x1="60" y1="15" x2="540" y2="15" 
                stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 8" />
              {[60, 180, 300, 420, 540].map((x, i) => (
                <circle key={i} cx={x} cy="15" r="4" fill="#94a3b8" />
              ))}
            </svg>
          </motion.div>

          {/* Gap Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex items-center gap-4 p-5 bg-amber-50 border border-amber-200 rounded-xl max-w-2xl"
          >
            <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0" />
            <div>
              <span className="text-sm font-semibold text-amber-800 uppercase tracking-wide">Gap</span>
              <p className="text-base text-slate-700 mt-1">{slide.gap}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
