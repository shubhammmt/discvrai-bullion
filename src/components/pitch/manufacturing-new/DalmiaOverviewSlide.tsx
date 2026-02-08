import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Target, TrendingUp, Layers, Zap } from 'lucide-react';

interface DalmiaOverviewSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaOverviewSlide: React.FC<DalmiaOverviewSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const sections = [
    { icon: Target, label: 'Context', description: 'Industry shift & current state' },
    { icon: Layers, label: 'Architecture', description: 'AI-powered platform vision' },
    { icon: TrendingUp, label: 'Value Streams', description: '7 transformation pillars' },
    { icon: Zap, label: 'Roadmap', description: 'Phased implementation' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center"
        >
          {slide.headline}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 text-lg mb-12 text-center"
        >
          A roadmap to AI-powered commercial excellence
        </motion.p>

        {/* Sections Grid */}
        <div className="grid grid-cols-4 gap-6 max-w-4xl">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-4">
                <section.icon className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{section.label}</h3>
              <p className="text-sm text-slate-500">{section.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl px-8 py-5 flex items-center gap-6"
        >
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-1">Total Opportunity</p>
            <p className="text-white font-bold text-2xl">₹870–1,720 Cr</p>
          </div>
          <div className="w-px h-12 bg-slate-600" />
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-1">Investment</p>
            <p className="text-white font-bold text-2xl">₹106–202 Cr</p>
          </div>
          <div className="w-px h-12 bg-slate-600" />
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-1">ROI</p>
            <p className="text-amber-400 font-bold text-2xl">8–10×</p>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
