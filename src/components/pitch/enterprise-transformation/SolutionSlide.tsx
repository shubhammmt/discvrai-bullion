import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Layers, Brain, CheckCircle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface SolutionSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const SolutionSlide: React.FC<SolutionSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
          <h2 className="text-4xl font-light text-white mb-2">{slide.title}</h2>
          <p className="text-xl text-enterprise-gold">{slide.subtitle}</p>
        </motion.div>
        
        {/* Principle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-enterprise-danger/10 border border-enterprise-danger/30 rounded-lg px-4 py-2 mb-6 inline-block"
        >
          <p className="text-enterprise-danger font-medium">{content?.principle}</p>
        </motion.div>
        
        {/* Two-tier architecture */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Tier 1: Digital Bedrock */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-enterprise-blue/20 to-enterprise-blue/5 border border-enterprise-blue/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-enterprise-blue/20 flex items-center justify-center">
                <Layers className="w-5 h-5 text-enterprise-blue-light" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{content?.tier1?.title}</h3>
                <p className="text-sm text-enterprise-blue-light">{content?.tier1?.subtitle}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {content?.tier1?.capabilities?.map((cap: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-enterprise-surface/50 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium text-sm">{cap.name}</span>
                    <span className="text-xs text-enterprise-blue-light">{cap.scale}</span>
                  </div>
                  <p className="text-xs text-enterprise-text-muted">{cap.impact}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Tier 2: Intelligence Layer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-enterprise-gold/20 to-enterprise-gold/5 border border-enterprise-gold/30 rounded-xl p-6 relative"
          >
            {/* Arrow connecting tiers */}
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-6 h-6 text-enterprise-gold rotate-[-90deg]" />
              </motion.div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-enterprise-gold/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-enterprise-gold" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{content?.tier2?.title}</h3>
                <p className="text-sm text-enterprise-gold">{content?.tier2?.subtitle}</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              {content?.tier2?.pods?.map((pod: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex items-center gap-2 bg-enterprise-surface/50 rounded-lg px-4 py-3"
                >
                  <CheckCircle className="w-4 h-4 text-enterprise-gold" />
                  <span className="text-white">{pod}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="text-xs text-enterprise-gold/70 text-center italic">
              Only after Day-0 digitalization is complete
            </div>
          </motion.div>
        </div>
        
        {/* Flow indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 flex items-center justify-center gap-4 text-sm text-enterprise-text-muted"
        >
          <span>Legacy Systems</span>
          <ArrowDown className="w-4 h-4 rotate-[-90deg] text-enterprise-gold" />
          <span className="text-enterprise-blue-light">Day-0 Digitalization</span>
          <ArrowDown className="w-4 h-4 rotate-[-90deg] text-enterprise-gold" />
          <span className="text-enterprise-gold">AI Enablement</span>
          <ArrowDown className="w-4 h-4 rotate-[-90deg] text-enterprise-gold" />
          <span className="text-white">Business Outcomes</span>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
