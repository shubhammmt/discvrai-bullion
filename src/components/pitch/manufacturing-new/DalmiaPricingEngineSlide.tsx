import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface DalmiaPricingEngineSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaPricingEngineSlide: React.FC<DalmiaPricingEngineSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const solutions = [
    'Real-time price corridor recommendations',
    'Competitive price monitoring',
    'Automated quote generation',
    'Margin leakage alerts'
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
        >
          {slide.headline}
        </motion.h1>

        <div className="grid grid-cols-3 gap-8 max-w-5xl w-full">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-red-50 rounded-2xl p-6 border border-red-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-bold text-red-700">Problem</h3>
            </div>
            <p className="text-slate-700">
              Pricing decisions are <span className="font-semibold">manual and inconsistent</span> across regions. 
              No real-time competitive intelligence.
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-emerald-700">Solution</h3>
            </div>
            <ul className="space-y-2">
              {solutions.map((item, index) => (
                <li key={index} className="text-slate-700 text-sm flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Impact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-amber-700">Impact</h3>
            </div>
            <div className="text-center mt-6">
              <p className="text-3xl font-bold text-amber-600">1–2%</p>
              <p className="text-slate-600 text-sm mt-1">Margin uplift</p>
              <div className="mt-4 pt-4 border-t border-amber-200">
                <p className="text-xl font-bold text-slate-900">₹140–280 Cr</p>
                <p className="text-xs text-slate-500">annually</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
