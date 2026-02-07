import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';

interface DalmiaValuePoolsSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaValuePoolsSlide: React.FC<DalmiaValuePoolsSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const poolIcons = [TrendingUp, TrendingDown, Users];
  const poolColors = [
    { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: 'text-emerald-600' },
    { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-600' },
    { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'text-purple-600' }
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
            Where Value Exists
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-10"
        >
          {slide.headline}
        </motion.h2>

        {/* Triangle Diagram */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-4xl">
            {/* Triangle SVG Background */}
            <svg
              viewBox="0 0 400 350"
              className="absolute inset-0 w-full h-full opacity-10"
              preserveAspectRatio="xMidYMid meet"
            >
              <polygon
                points="200,20 380,320 20,320"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-amber-500"
              />
            </svg>

            {/* Value Pool Cards */}
            <div className="grid grid-cols-3 gap-6">
              {slide.valuePools?.map((pool, index) => {
                const IconComponent = poolIcons[index];
                const colors = poolColors[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                    className={`p-6 rounded-xl ${colors.bg} ${colors.border} border`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                      <h3 className={`text-lg font-bold ${colors.text}`}>{pool.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {pool.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <div className={`w-1.5 h-1.5 ${colors.icon.replace('text-', 'bg-')} rounded-full mt-2 flex-shrink-0`} />
                          <span className="text-sm text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* Center Triangle Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-6"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center border-2 border-amber-300">
                <span className="text-2xl font-bold text-amber-600">₹</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
