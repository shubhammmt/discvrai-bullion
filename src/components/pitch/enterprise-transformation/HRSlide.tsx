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
          className="mb-4"
        >
          <h2 className="text-3xl font-light text-white mb-1">{slide.title}</h2>
          <p className="text-lg text-enterprise-gold">{slide.subtitle}</p>
        </motion.div>
        
        <div className="flex-1 grid grid-cols-2 gap-5">
          {/* Metrics comparison */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-between h-full"
          >
            <div className="space-y-3 flex-1">
              {content?.metrics?.map((metric: any, idx: number) => (
                <div 
                  key={idx}
                  className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4"
                >
                  <div className="text-xs text-enterprise-text-muted mb-2">{metric.label}</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="text-xs text-enterprise-danger mb-0.5">Before</div>
                      <div className="text-xl font-light text-white">{metric.before}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-enterprise-gold" />
                    <div className="flex-1">
                      <div className="text-xs text-enterprise-success mb-0.5">After</div>
                      <div className="text-xl font-light text-enterprise-gold">{metric.after}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scale */}
            <div className="bg-enterprise-gold/10 border border-enterprise-gold/20 rounded-xl p-3 text-center mt-3">
              <span className="text-sm text-enterprise-gold">{content?.scale}</span>
            </div>
          </motion.div>
          
          {/* Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5 h-full flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-enterprise-gold" />
              <h3 className="text-base font-medium text-white">Capabilities</h3>
            </div>
            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {content?.capabilities?.map((cap: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-enterprise-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-enterprise-text-secondary">{cap}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};
