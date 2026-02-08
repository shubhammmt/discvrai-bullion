import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';

interface DalmiaValueOpportunitySlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaValueOpportunitySlide: React.FC<DalmiaValueOpportunitySlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const valueItems = [
    { category: 'Digital Adoption Gap', value: '₹200–500 Cr', percentage: 100 },
    { category: 'AI Pricing Intelligence', value: '₹140–280 Cr', percentage: 70 },
    { category: 'O2C Automation', value: '₹150–300 Cr', percentage: 75 },
    { category: 'Marketing Efficiency', value: '₹80–150 Cr', percentage: 40 }
  ];

  const totalValue = '₹570–1,230 Cr';

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

        {/* Value Waterfall */}
        <div className="w-full max-w-3xl space-y-4 mb-10">
          {valueItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-44 text-right">
                <span className="text-sm font-medium text-slate-600">{item.category}</span>
              </div>
              <div className="flex-1 relative h-10">
                <div className="absolute inset-0 bg-slate-100 rounded-lg" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg"
                />
              </div>
              <div className="w-32">
                <span className="text-lg font-bold text-slate-900">{item.value}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl px-10 py-6 text-center"
        >
          <p className="text-white/80 text-sm font-medium mb-1">Total Addressable Value</p>
          <p className="text-white text-3xl font-bold">{totalValue}</p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
