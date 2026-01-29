import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface FinanceSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const FinanceSlide: React.FC<FinanceSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  
  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-4xl font-light text-white mb-2">{slide.title}</h2>
          <p className="text-xl text-enterprise-gold">{slide.subtitle}</p>
        </motion.div>
        
        {/* Scale metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-8 mb-6"
        >
          {content?.scale?.map((item: any, idx: number) => (
            <div key={idx} className="text-center">
              <div className="text-3xl font-light text-enterprise-gold">{item.value}</div>
              <div className="text-sm text-enterprise-text-muted">{item.label}</div>
            </div>
          ))}
        </motion.div>
        
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Capabilities */}
          <div className="space-y-4">
            {content?.capabilities?.map((cap: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5 hover:border-enterprise-blue/30 transition-colors"
              >
                <h3 className="text-lg font-medium text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-enterprise-text-secondary">{cap.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Impact metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-lg font-medium text-white mb-6">Impact</h3>
            <div className="space-y-4">
              {content?.impact?.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="bg-gradient-to-r from-enterprise-gold/20 to-transparent border border-enterprise-gold/30 rounded-xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-light text-enterprise-gold">{item.metric}</div>
                    <div className="text-enterprise-text-secondary">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};
