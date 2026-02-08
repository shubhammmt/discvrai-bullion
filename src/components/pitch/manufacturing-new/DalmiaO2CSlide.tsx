import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { ShoppingCart, CreditCard, FileText, Wallet, ArrowRight } from 'lucide-react';

interface DalmiaO2CSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaO2CSlide: React.FC<DalmiaO2CSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const steps = [
    { icon: ShoppingCart, label: 'Smart Ordering', description: 'AI recommendations' },
    { icon: CreditCard, label: 'Dynamic Credit', description: 'Real-time scoring' },
    { icon: FileText, label: 'Auto Invoicing', description: 'Zero-touch billing' },
    { icon: Wallet, label: 'AI Collections', description: 'Intelligent dunning' }
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
          className="text-slate-500 mb-12 text-center"
        >
          End-to-end touchless cycle
        </motion.p>

        {/* Flow Diagram */}
        <div className="flex items-center justify-center gap-4 max-w-5xl w-full mb-10">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15 }}
                className="flex-1 bg-white rounded-xl shadow-md border border-slate-100 p-5 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 flex items-center justify-center mx-auto mb-3">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{step.label}</h3>
                <p className="text-xs text-slate-500">{step.description}</p>
              </motion.div>
              
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                >
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-rose-500 to-red-500 rounded-xl px-8 py-4 text-center"
        >
          <p className="text-white/80 text-sm">DSO Reduction frees</p>
          <p className="text-white text-xl font-bold">₹150–300 Cr working capital</p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
