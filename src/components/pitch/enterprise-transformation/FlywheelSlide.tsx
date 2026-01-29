import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface FlywheelSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const FlywheelSlide: React.FC<FlywheelSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
        
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Phases */}
          <div className="flex flex-col justify-center space-y-2">
            {content?.phases?.map((phase: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-3 hover:border-enterprise-gold/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-enterprise-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-enterprise-gold font-medium text-xs">{phase.phase}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm text-white font-medium truncate">{phase.title}</span>
                      <span className="text-xs text-enterprise-text-muted ml-2">{phase.timeline}</span>
                    </div>
                    <p className="text-xs text-enterprise-gold truncate">{phase.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Flywheel visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            {/* Rotating flywheel circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-44 h-44 rounded-full border-2 border-dashed border-enterprise-gold/30"
            />
            
            {/* Inner content box */}
            <div className="relative z-10 bg-enterprise-surface-elevated border border-enterprise-gold/30 rounded-xl p-5 max-w-[200px]">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className="w-4 h-4 text-enterprise-gold" />
                <h3 className="text-sm font-medium text-white">The Flywheel</h3>
              </div>
              <div className="space-y-2">
                {content?.flywheel?.map((item: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 text-enterprise-gold flex-shrink-0" />
                    <span className="text-xs text-enterprise-text-secondary">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};
