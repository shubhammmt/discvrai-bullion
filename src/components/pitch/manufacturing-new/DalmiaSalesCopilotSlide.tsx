import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Target, Package, AlertCircle, Map } from 'lucide-react';

interface DalmiaSalesCopilotSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaSalesCopilotSlide: React.FC<DalmiaSalesCopilotSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const recommendations = [
    { icon: Target, title: 'Dealer Prioritization', description: 'AI ranks daily visits by revenue potential' },
    { icon: Package, title: 'Next Best Product', description: 'Personalized cross-sell recommendations' },
    { icon: AlertCircle, title: 'Churn Alerts', description: 'Early warning for at-risk dealers' },
    { icon: Map, title: 'Territory Optimization', description: 'Route and coverage intelligence' }
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
          AI-powered daily recommendations for field sales
        </motion.p>

        <div className="grid grid-cols-2 gap-6 max-w-4xl w-full mb-10">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl shadow-md border border-slate-100 p-5 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                <rec.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{rec.title}</h3>
                <p className="text-sm text-slate-500">{rec.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl px-8 py-4 text-center"
        >
          <p className="text-white/80 text-sm">Impact</p>
          <p className="text-white text-xl font-bold">8–15% sales productivity uplift</p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
