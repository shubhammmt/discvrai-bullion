import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Building2, TrendingUp, Clock, Users, CheckCircle } from 'lucide-react';

interface DalmiaOperatingModelSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaOperatingModelSlide: React.FC<DalmiaOperatingModelSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const kpiIcons = [TrendingUp, TrendingUp, Clock, Users];

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
            Governance & Ask
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

        <div className="flex-1 flex items-center gap-8">
          {/* Operating Model Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex-1"
          >
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <Building2 className="w-10 h-10 text-slate-600" />
                <h3 className="text-xl font-bold text-slate-800">Commercial Digital Hub</h3>
              </div>
              
              {/* KPIs Grid */}
              <div className="grid grid-cols-2 gap-4">
                {slide.kpis?.map((kpi, index) => {
                  const IconComponent = kpiIcons[index] || TrendingUp;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200"
                    >
                      <IconComponent className="w-5 h-5 text-teal-600" />
                      <span className="text-sm font-medium text-slate-700">{kpi}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Decision Ask */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="w-96"
          >
            <div className="p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border-2 border-amber-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-amber-800">Board Decision</h3>
              </div>
              
              <p className="text-xl font-semibold text-slate-800 leading-relaxed">
                {slide.decision}
              </p>
              
              <div className="mt-6 pt-6 border-t border-amber-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-700">Investment</span>
                  <span className="font-bold text-slate-800">₹106–202 Cr</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-amber-700">Value Creation</span>
                  <span className="font-bold text-emerald-700">₹870–1,720 Cr</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-amber-700">ROI</span>
                  <span className="font-bold text-amber-700">8–10×</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
