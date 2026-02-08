import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { ArrowRight } from 'lucide-react';

interface DalmiaTransformationSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaTransformationSlide: React.FC<DalmiaTransformationSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const oldModel = [
    'Manual pricing',
    'Relationship-driven sales',
    'Mass marketing',
    'Reactive demand planning'
  ];

  const newModel = [
    'Dynamic pricing',
    'Predictive sales intelligence',
    'AI marketing',
    'Digital ecosystems'
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

        <div className="flex items-center justify-center gap-8 max-w-5xl">
          {/* Old Model */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 bg-slate-100 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-slate-500 mb-6 text-center uppercase tracking-wide">
              Old Model
            </h3>
            <div className="space-y-4">
              {oldModel.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-lg px-5 py-3 text-slate-600 text-sm font-medium text-center shadow-sm"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* New Model */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200"
          >
            <h3 className="text-lg font-bold text-amber-600 mb-6 text-center uppercase tracking-wide">
              New Model
            </h3>
            <div className="space-y-4">
              {newModel.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-lg px-5 py-3 text-slate-800 text-sm font-semibold text-center shadow-sm border border-amber-100"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
