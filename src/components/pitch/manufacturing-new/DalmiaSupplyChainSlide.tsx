import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { FileSpreadsheet, Brain, Calendar, Cloud, BarChart3, ShoppingCart, Package, CreditCard, FileText, Banknote, ArrowRight } from 'lucide-react';

interface DalmiaSupplyChainSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaSupplyChainSlide: React.FC<DalmiaSupplyChainSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const demandCapabilities = [
    { icon: Calendar, label: 'Weekly rolling forecasts' },
    { icon: Cloud, label: 'Weather + infra data' },
    { icon: BarChart3, label: 'Scenario simulation' }
  ];

  const o2cFlowSteps = [
    { icon: ShoppingCart, label: 'Smart Order' },
    { icon: Package, label: 'ATP' },
    { icon: CreditCard, label: 'Credit' },
    { icon: FileText, label: 'Invoice' },
    { icon: Banknote, label: 'Cash' }
  ];

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
            Supply Chain
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
        >
          {slide.headline}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-sm text-slate-600 mb-5"
        >
          {slide.subtitle}
        </motion.p>

        {/* Two-Column Layout */}
        <div className="flex-1 flex gap-8 min-h-0">
          {/* Left: Demand Sensing */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Demand Sensing & S&OP</h3>
            
            {/* Transformation Visual */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="flex flex-col items-center p-3 bg-slate-100 rounded-lg border border-slate-200">
                <FileSpreadsheet className="w-8 h-8 text-slate-500 mb-1" />
                <span className="text-xs font-semibold text-slate-700">Monthly Excel</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-gradient-to-r from-slate-300 to-teal-500" />
                <ArrowRight className="w-5 h-5 text-teal-500 -ml-1" />
              </div>
              <div className="flex flex-col items-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                <Brain className="w-8 h-8 text-teal-600 mb-1" />
                <span className="text-xs font-semibold text-teal-800">AI Forecasting</span>
              </div>
            </motion.div>

            {/* Capabilities */}
            <div className="space-y-2 mb-4">
              {demandCapabilities.map((cap, index) => {
                const IconComponent = cap.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.08, duration: 0.3 }}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <IconComponent className="w-4 h-4 text-slate-600" />
                    <span className="text-xs font-medium text-slate-700">{cap.label}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Demand Impact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.4 }}
              className="p-3 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-lg font-bold text-slate-600">65%</span>
                <ArrowRight className="w-4 h-4 text-emerald-500" />
                <span className="text-lg font-bold text-emerald-700">85%</span>
              </div>
              <p className="text-[10px] text-slate-600 text-center">Forecast accuracy | WC: ₹100–200 Cr</p>
            </motion.div>
          </div>

          {/* Right: Order to Cash */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Order to Cash AI</h3>
            
            {/* O2C Flow Diagram */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-1 mb-4"
            >
              {o2cFlowSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <React.Fragment key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.55 + index * 0.08, duration: 0.3 }}
                      className="flex flex-col items-center p-2 bg-blue-50 rounded-lg border border-blue-200 min-w-[60px]"
                    >
                      <IconComponent className="w-5 h-5 text-blue-600 mb-1" />
                      <span className="text-[10px] font-semibold text-slate-800 text-center">{step.label}</span>
                    </motion.div>
                    
                    {index < o2cFlowSteps.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-slate-300" />
                    )}
                  </React.Fragment>
                );
              })}
            </motion.div>

            {/* O2C Components List */}
            <div className="space-y-1 flex-1 overflow-hidden">
              {slide.o2cComponents?.slice(0, 4).map((component, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.06, duration: 0.25 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded border border-blue-100"
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                  <span className="text-xs text-slate-700">{component}</span>
                </motion.div>
              ))}
            </div>

            {/* O2C Impact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center"
            >
              <span className="text-lg font-bold text-emerald-700">₹150–300 Cr</span>
              <p className="text-[10px] text-slate-600">DSO reduction frees working capital</p>
            </motion.div>
          </div>
        </div>

        {/* Combined Impact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-4 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="text-xs font-medium text-slate-600">Total Supply Chain Value:</span>
            <span className="text-base font-bold text-emerald-700">₹250–500 Cr</span>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
