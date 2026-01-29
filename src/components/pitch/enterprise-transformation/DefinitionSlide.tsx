import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface DefinitionSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DefinitionSlide: React.FC<DefinitionSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
          className="flex gap-8 mb-8"
        >
          {content?.scale?.map((item: any, idx: number) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-light text-enterprise-gold">{item.value}</div>
              <div className="text-sm text-enterprise-text-muted uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </motion.div>
        
        {/* Transformations grid */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {content?.transformations?.map((transform: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5 hover:border-enterprise-gold/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-enterprise-gold" />
                <h3 className="text-lg font-medium text-white">{transform.title}</h3>
              </div>
              <p className="text-sm text-enterprise-text-secondary mb-3">{transform.description}</p>
              <div className="flex items-center gap-2 text-xs text-enterprise-gold">
                <ArrowRight className="w-3 h-3" />
                <span>{transform.impact}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Key message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-gradient-to-r from-enterprise-gold/10 to-transparent border-l-2 border-enterprise-gold pl-4 py-2"
        >
          <p className="text-lg text-white font-medium">{content?.keyMessage}</p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
