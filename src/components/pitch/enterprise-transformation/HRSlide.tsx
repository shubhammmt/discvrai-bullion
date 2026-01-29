import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight, CheckCircle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface HRSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const HRSlide: React.FC<HRSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
        
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Metrics comparison */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {content?.metrics?.map((metric: any, idx: number) => (
              <div 
                key={idx}
                className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5"
              >
                <div className="text-sm text-enterprise-text-muted mb-3">{metric.label}</div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-xs text-enterprise-danger mb-1">Before</div>
                    <div className="text-2xl font-light text-white">{metric.before}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-enterprise-gold" />
                  <div className="flex-1">
                    <div className="text-xs text-enterprise-success mb-1">After</div>
                    <div className="text-2xl font-light text-enterprise-gold">{metric.after}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Scale */}
            <div className="bg-enterprise-gold/10 border border-enterprise-gold/20 rounded-xl p-4 text-center">
              <span className="text-enterprise-gold">{content?.scale}</span>
            </div>
          </motion.div>
          
          {/* Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-enterprise-gold" />
              <h3 className="text-lg font-medium text-white">Capabilities</h3>
            </div>
            <div className="space-y-4">
              {content?.capabilities?.map((cap: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-enterprise-gold flex-shrink-0 mt-0.5" />
                  <span className="text-enterprise-text-secondary">{cap}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};
