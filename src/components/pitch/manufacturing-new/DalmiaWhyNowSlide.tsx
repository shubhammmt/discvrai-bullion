import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { AlertTriangle, Zap, Network, TrendingUp } from 'lucide-react';

interface DalmiaWhyNowSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaWhyNowSlide: React.FC<DalmiaWhyNowSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const bullets = [
    { icon: TrendingUp, text: 'Cement industry moving from capacity-led to intelligence-led growth.' },
    { icon: Zap, text: 'AI agents transforming B2B selling.' },
    { icon: Network, text: 'Digital ecosystems replacing manual dealer relationships.' },
    { icon: AlertTriangle, text: 'Competitive pressure increasing from digitally mature players.' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4"
        >
          Industry Shift
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12"
        >
          {slide.headline}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {bullets.map((bullet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-4 bg-slate-50 rounded-xl p-5 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <bullet.icon className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{bullet.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl"
        >
          <p className="text-sm font-medium">
            The window for first-mover advantage is closing.
          </p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
