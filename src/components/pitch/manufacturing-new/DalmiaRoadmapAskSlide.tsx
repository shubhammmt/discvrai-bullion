import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Wrench, Rocket, Target, CheckCircle, TrendingUp, Clock, Users } from 'lucide-react';

interface DalmiaRoadmapAskSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaRoadmapAskSlide: React.FC<DalmiaRoadmapAskSlideProps> = ({
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

  const kpiIcons = [TrendingUp, TrendingUp, Clock, Users];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-3"
        >
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Implementation & Decision
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-5"
        >
          {slide.headline}
        </motion.h2>

        {/* Timeline Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-full mb-4 origin-left"
        />

        {/* Phase Cards */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          {slide.phases?.map((phase, index) => {
            const IconComponent = phaseIcons[index];
            const colors = phaseColors[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                className={`p-4 rounded-xl ${colors.bg} ${colors.border} border relative`}
              >
                {/* Phase Badge */}
                <div className={`absolute -top-2 left-4 px-2 py-0.5 ${colors.badge} text-white text-[10px] font-bold rounded-full`}>
                  {phase.name}
                </div>

                {/* Content */}
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-3">
                    <IconComponent className={`w-5 h-5 ${colors.icon}`} />
                    <span className="text-xs font-semibold text-slate-600">{phase.timeline}</span>
                  </div>
                  
                  <ul className="space-y-1">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-1.5">
                        <div className={`w-1 h-1 ${colors.badge} rounded-full mt-1.5 flex-shrink-0`} />
                        <span className="text-xs text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="flex justify-between text-[10px] text-slate-500 mb-5"
        >
          <span>Month 0</span>
          <span>Month 6</span>
          <span>Month 15</span>
          <span>Month 24</span>
        </motion.div>

        {/* Bottom Section: KPIs + Board Decision */}
        <div className="flex gap-6">
          {/* KPIs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="flex-1"
          >
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Success KPIs</h3>
            <div className="grid grid-cols-2 gap-2">
              {slide.kpis?.map((kpi, index) => {
                const IconComponent = kpiIcons[index] || TrendingUp;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <IconComponent className="w-4 h-4 text-teal-600" />
                    <span className="text-xs text-slate-700">{kpi}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Board Decision */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="w-80"
          >
            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-amber-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-amber-800">Board Decision</h3>
              </div>
              
              <p className="text-sm font-semibold text-slate-800 mb-3">
                {slide.decision}
              </p>
              
              <div className="pt-3 border-t border-amber-200 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-700">Investment</span>
                  <span className="font-bold text-slate-800">{slide.investment}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-700">Value Creation</span>
                  <span className="font-bold text-emerald-700">{slide.totalValue}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-700">ROI</span>
                  <span className="font-bold text-amber-700">{slide.roi}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
