import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { BarChart3, Cloud, Building, RefreshCw } from 'lucide-react';

interface DalmiaDemandSensingSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaDemandSensingSlide: React.FC<DalmiaDemandSensingSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const features = [
    { icon: RefreshCw, label: 'Weekly Rolling Forecasts' },
    { icon: Cloud, label: 'Weather Integration' },
    { icon: Building, label: 'Infrastructure Signals' }
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 mb-10 text-center"
        >
          Move from monthly Excel to AI-driven forecasting
        </motion.p>

        <div className="flex items-center justify-center gap-8 max-w-4xl w-full mb-10">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 space-y-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-cyan-600" />
                </div>
                <span className="font-medium text-slate-700">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Accuracy Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-1 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-cyan-600" />
              <h3 className="font-bold text-slate-900">Forecast Accuracy</h3>
            </div>
            
            {/* Before/After */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Current</span>
                  <span className="font-bold text-slate-600">65%</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-slate-400 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">With AI</span>
                  <span className="font-bold text-cyan-600">85%</span>
                </div>
                <div className="h-3 bg-cyan-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '65%' }}
                    animate={{ width: '85%' }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl px-8 py-4 text-center"
        >
          <p className="text-white/80 text-sm">Working Capital Improvement</p>
          <p className="text-white text-xl font-bold">₹100–200 Cr</p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
