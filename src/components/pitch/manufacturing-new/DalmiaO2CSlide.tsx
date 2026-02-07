import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { ShoppingCart, Package, CreditCard, FileText, Banknote, ArrowRight } from 'lucide-react';

interface DalmiaO2CSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaO2CSlide: React.FC<DalmiaO2CSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const flowSteps = [
    { icon: ShoppingCart, label: 'Smart Order', description: 'Recommendations' },
    { icon: Package, label: 'Real-time ATP', description: 'Availability' },
    { icon: CreditCard, label: 'AI Credit', description: 'Scoring' },
    { icon: FileText, label: 'Auto', description: 'Invoicing' },
    { icon: Banknote, label: 'AI Cash', description: 'Application' }
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
            Order to Cash
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

        {/* O2C Flow Diagram */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            {flowSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.12, duration: 0.4 }}
                    className="flex flex-col items-center p-5 bg-blue-50 rounded-xl border border-blue-200 min-w-[120px]"
                  >
                    <IconComponent className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-sm font-bold text-slate-800 text-center">{step.label}</span>
                    <span className="text-xs text-slate-500 text-center">{step.description}</span>
                  </motion.div>
                  
                  {index < flowSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.12, duration: 0.3 }}
                    >
                      <ArrowRight className="w-5 h-5 text-slate-300" />
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Impact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-5 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="text-center">
              <span className="text-sm font-medium text-slate-600 block">Impact</span>
              <span className="text-3xl font-bold text-emerald-700">₹150–300 Cr</span>
            </div>
            <div className="w-px h-12 bg-emerald-200" />
            <div className="text-center">
              <span className="text-base text-slate-700">DSO reduction frees</span>
              <span className="text-sm text-slate-500 block">working capital</span>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
