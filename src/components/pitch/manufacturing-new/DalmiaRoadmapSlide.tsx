import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Wrench, Rocket, Target } from 'lucide-react';

interface DalmiaRoadmapSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaRoadmapSlide: React.FC<DalmiaRoadmapSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const phaseIcons = [Wrench, Rocket, Target];
  const phaseColors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', badge: 'bg-blue-500' },
    { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', badge: 'bg-purple-500' },
    { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', badge: 'bg-emerald-500' }
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
            Implementation
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

        {/* Timeline */}
        <div className="flex-1 flex items-center">
          <div className="w-full">
            {/* Timeline Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-full mb-8 origin-left"
            />

            {/* Phase Cards */}
            <div className="grid grid-cols-3 gap-6">
              {slide.phases?.map((phase, index) => {
                const IconComponent = phaseIcons[index];
                const colors = phaseColors[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                    className={`p-6 rounded-xl ${colors.bg} ${colors.border} border relative`}
                  >
                    {/* Phase Badge */}
                    <div className={`absolute -top-3 left-6 px-3 py-1 ${colors.badge} text-white text-xs font-bold rounded-full`}>
                      {phase.name}
                    </div>

                    {/* Content */}
                    <div className="mt-4">
                      <div className="flex items-center gap-3 mb-4">
                        <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                        <span className="text-sm font-semibold text-slate-600">{phase.timeline}</span>
                      </div>
                      
                      <ul className="space-y-2">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 ${colors.badge} rounded-full mt-2 flex-shrink-0`} />
                            <span className="text-sm text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline Labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6 flex justify-between text-sm text-slate-500"
        >
          <span>Month 0</span>
          <span>Month 6</span>
          <span>Month 15</span>
          <span>Month 24</span>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
