import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface DifferentiatorsSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DifferentiatorsSlide: React.FC<DifferentiatorsSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  
  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h2 className="text-3xl font-light text-white mb-1">{slide.title}</h2>
          <p className="text-lg text-enterprise-gold">{slide.subtitle}</p>
        </motion.div>
        
        <div className="flex-1 grid grid-cols-2 gap-5">
          {/* Comparisons */}
          <div className="flex flex-col justify-center space-y-3">
            {content?.vs?.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4 hover:border-enterprise-gold/30 transition-colors"
              >
                <div className="text-xs text-enterprise-gold mb-1">{item.category}</div>
                <p className="text-sm text-enterprise-text-secondary">{item.edge}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Advantages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-enterprise-gold/10 to-transparent border border-enterprise-gold/20 rounded-xl p-5 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-enterprise-gold" />
              <h3 className="text-base font-medium text-white">The DiscvrAI Advantage</h3>
            </div>
            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {content?.advantages?.map((adv: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-enterprise-gold/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-enterprise-gold" />
                  </div>
                  <div>
                    <div className="text-sm text-white font-medium">{adv.title}</div>
                    <div className="text-xs text-enterprise-text-muted">{adv.point}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-center bg-enterprise-gold/10 border border-enterprise-gold/20 rounded-xl py-2"
        >
          <p className="text-sm text-enterprise-gold font-medium">We're not selling technology. We're delivering transformation.</p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
