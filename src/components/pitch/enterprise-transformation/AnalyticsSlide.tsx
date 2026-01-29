import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Zap } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface AnalyticsSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const AnalyticsSlide: React.FC<AnalyticsSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
          {/* Before/After comparison */}
          <div className="space-y-4">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-enterprise-danger/10 border border-enterprise-danger/30 rounded-xl p-5"
            >
              <h3 className="text-lg font-medium text-enterprise-danger mb-3">{content?.before?.title}</h3>
              <div className="space-y-2">
                {content?.before?.points?.map((point: string, idx: number) => (
                  <p key={idx} className="text-sm text-enterprise-text-secondary">• {point}</p>
                ))}
              </div>
            </motion.div>
            
            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="w-8 h-8 rounded-full bg-enterprise-gold/20 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-enterprise-gold rotate-90" />
              </div>
            </motion.div>
            
            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-enterprise-success/10 border border-enterprise-success/30 rounded-xl p-5"
            >
              <h3 className="text-lg font-medium text-enterprise-success mb-3">{content?.after?.title}</h3>
              <div className="space-y-2">
                {content?.after?.points?.map((point: string, idx: number) => (
                  <p key={idx} className="text-sm text-enterprise-text-secondary">• {point}</p>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right side: Examples & Metrics */}
          <div className="space-y-4">
            {/* Query examples */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-enterprise-gold" />
                <h3 className="text-lg font-medium text-white">Ask Anything</h3>
              </div>
              <div className="space-y-2">
                {content?.examples?.map((example: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="bg-enterprise-navy/50 rounded-lg px-4 py-2 text-sm text-enterprise-text-secondary italic"
                  >
                    {example}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-3"
            >
              {content?.metrics?.map((metric: any, idx: number) => (
                <div 
                  key={idx}
                  className="bg-enterprise-gold/10 border border-enterprise-gold/20 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-light text-enterprise-gold mb-1">{metric.value}</div>
                  <div className="text-xs text-enterprise-text-muted">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 flex items-center justify-center gap-2 text-enterprise-gold"
        >
          <Zap className="w-5 h-5" />
          <span className="text-lg font-medium">Transform static data into conversational intelligence</span>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
