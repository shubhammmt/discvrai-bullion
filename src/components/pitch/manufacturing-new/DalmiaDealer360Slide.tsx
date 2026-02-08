import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Database, ShoppingCart, Gift, ClipboardList, Globe, Users } from 'lucide-react';

interface DalmiaDealer360SlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaDealer360Slide: React.FC<DalmiaDealer360SlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const dataSources = [
    { icon: ShoppingCart, label: 'Transactions' },
    { icon: Gift, label: 'Loyalty' },
    { icon: ClipboardList, label: 'Field Data' },
    { icon: Globe, label: 'External Signals' }
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
          Unified dealer intelligence hub
        </motion.p>

        {/* Hub Diagram */}
        <div className="relative max-w-3xl w-full mb-10">
          {/* Data Sources */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {dataSources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200"
              >
                <source.icon className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                <span className="text-xs font-medium text-slate-600">{source.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Connectors */}
          <div className="flex justify-center mb-4">
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: 24 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="w-0.5 bg-emerald-300"
                />
              ))}
            </div>
          </div>

          {/* Central Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Database className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Dealer 360 Intelligence</h3>
            </div>
            <div className="flex justify-center gap-4">
              <span className="bg-white/20 px-4 py-2 rounded-lg text-white text-sm">Segmentation</span>
              <span className="bg-white/20 px-4 py-2 rounded-lg text-white text-sm">Credit Scoring</span>
              <span className="bg-white/20 px-4 py-2 rounded-lg text-white text-sm">Growth Potential</span>
            </div>
          </motion.div>
        </div>

      </div>
    </MfgNewSlideLayout>
  );
};
