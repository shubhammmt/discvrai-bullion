import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface SalesSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const SalesSlide: React.FC<SalesSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
          {/* Before/After comparison */}
          <div className="flex flex-col justify-between h-full">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-enterprise-danger/10 border border-enterprise-danger/30 rounded-xl p-4 flex-1"
            >
              <h3 className="text-base font-medium text-enterprise-danger mb-3">Before</h3>
              <div className="space-y-2">
                {content?.before?.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-enterprise-text-secondary">{item.label}</span>
                    <span className="text-lg font-medium text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center py-2"
            >
              <div className="w-6 h-6 rounded-full bg-enterprise-gold/20 flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-enterprise-gold rotate-90" />
              </div>
            </motion.div>
            
            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-enterprise-success/10 border border-enterprise-success/30 rounded-xl p-4 flex-1"
            >
              <h3 className="text-base font-medium text-enterprise-success mb-3">After</h3>
              <div className="space-y-2">
                {content?.after?.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-enterprise-text-secondary">{item.label}</span>
                    <span className="text-lg font-medium text-enterprise-gold">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
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
