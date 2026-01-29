import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface HealthcareSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const HealthcareSlide: React.FC<HealthcareSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
        
        {/* Use cases grid */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {content?.useCases?.map((useCase: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5 hover:border-enterprise-success/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-enterprise-success" />
                <h3 className="text-lg font-medium text-white">{useCase.title}</h3>
              </div>
              <div className="bg-enterprise-success/10 border border-enterprise-success/20 rounded-lg px-3 py-2">
                <p className="text-sm text-enterprise-success">{useCase.metrics}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};
