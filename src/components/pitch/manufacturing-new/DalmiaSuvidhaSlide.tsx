import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Smartphone, ArrowRight, Rocket, Target } from 'lucide-react';

interface DalmiaSuvidhaSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaSuvidhaSlide: React.FC<DalmiaSuvidhaSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
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

        {/* Transformation Visual */}
        <div className="flex items-center justify-center gap-8 max-w-4xl w-full mb-12">
          {/* Current */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 bg-slate-100 rounded-2xl p-6 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="font-bold text-slate-600 mb-2">Dealer App Today</h3>
            <p className="text-3xl font-bold text-slate-700">~35%</p>
            <p className="text-sm text-slate-500">digital orders</p>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-shrink-0"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
              <ArrowRight className="w-7 h-7 text-white" />
            </div>
          </motion.div>

          {/* Future */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-center border-2 border-amber-200"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-amber-700 mb-2">Dealer App 2.0</h3>
            <p className="text-3xl font-bold text-amber-600">80%+</p>
            <p className="text-sm text-amber-600">digital adoption</p>
          </motion.div>
        </div>

        {/* Benchmark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-xl px-8 py-5 flex items-center gap-6"
        >
          <Target className="w-8 h-8 text-amber-400" />
          <div>
            <p className="text-slate-400 text-sm">Industry Benchmark</p>
            <p className="text-white font-bold">
              CEMEX GO: <span className="text-amber-400">93% digital orders</span>
            </p>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
