import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Database, FileText, ShoppingCart, Gift, ClipboardList, Globe, Users, CreditCard, TrendingUp, ArrowRight } from 'lucide-react';

interface DalmiaDealer360SlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaDealer360Slide: React.FC<DalmiaDealer360SlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const dataSources = [
    { icon: FileText, label: 'SAP transactions' },
    { icon: ShoppingCart, label: 'SUVIDHA behaviour' },
    { icon: Gift, label: 'Loyalty engagement' },
    { icon: ClipboardList, label: 'Field notes' },
    { icon: Globe, label: 'External market data' }
  ];

  const outputs = [
    { icon: Users, label: 'Dealer segmentation' },
    { icon: CreditCard, label: 'Dynamic credit scoring' },
    { icon: TrendingUp, label: 'Growth potential scoring' }
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
            Data Platform
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

        {/* Hub Diagram */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-8">
            {/* Data Sources */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Data Sources</h3>
              {dataSources.map((source, index) => {
                const IconComponent = source.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.08, duration: 0.3 }}
                    className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <IconComponent className="w-5 h-5 text-slate-500" />
                    <span className="text-sm text-slate-700">{source.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Arrows to Hub */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <ArrowRight key={i} className="w-5 h-5 text-slate-300" />
              ))}
            </motion.div>

            {/* Central Hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-40 h-40 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex flex-col items-center justify-center shadow-lg"
            >
              <Database className="w-10 h-10 text-white mb-2" />
              <span className="text-white font-bold text-center text-sm">Dealer 360</span>
              <span className="text-teal-100 text-xs">Data Hub</span>
            </motion.div>

            {/* Arrows from Hub */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              {[0, 1, 2].map((i) => (
                <ArrowRight key={i} className="w-5 h-5 text-slate-300" />
              ))}
            </motion.div>

            {/* Outputs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Outputs</h3>
              {outputs.map((output, index) => {
                const IconComponent = output.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                    className="flex items-center gap-3 px-4 py-3 bg-teal-50 rounded-lg border border-teal-200"
                  >
                    <IconComponent className="w-5 h-5 text-teal-600" />
                    <span className="text-sm font-medium text-teal-800">{output.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
