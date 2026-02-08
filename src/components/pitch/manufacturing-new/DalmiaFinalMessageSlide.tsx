import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Brain, CheckCircle } from 'lucide-react';

interface DalmiaFinalMessageSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaFinalMessageSlide: React.FC<DalmiaFinalMessageSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full">
        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-6"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          
          <p className="text-slate-500 mb-2">Dalmia evolves into</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            AI-Driven Commercial
            <br />
            Intelligence Company
          </h1>
        </motion.div>

        {/* Decision Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-2xl w-full"
        >
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Board Decision</h3>
          </div>
          
          <p className="text-lg text-white mb-6">
            Approve AI Commercial Transformation Program
          </p>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">Investment</p>
              <p className="text-white text-xl font-bold">₹106–202 Cr</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">Value</p>
              <p className="text-amber-400 text-xl font-bold">₹870–1,720 Cr</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">ROI</p>
              <p className="text-emerald-400 text-xl font-bold">8–10×</p>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
