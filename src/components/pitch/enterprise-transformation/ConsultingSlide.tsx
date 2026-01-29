import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, FileText } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface ConsultingSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const ConsultingSlide: React.FC<ConsultingSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  
  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-light text-white mb-2">{slide.title}</h2>
          <p className="text-xl text-enterprise-gold">{slide.subtitle}</p>
        </motion.div>
        
        <div className="flex-1 grid grid-cols-5 gap-4">
          {/* Timeline phases */}
          <div className="col-span-3 flex flex-col justify-center">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-enterprise-gold via-enterprise-blue to-enterprise-gold" />
              
              {content?.phases?.map((phase: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.15 }}
                  className="relative flex items-start gap-6 mb-6 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div className="w-12 h-12 rounded-full bg-enterprise-surface-elevated border-2 border-enterprise-gold flex items-center justify-center flex-shrink-0 z-10">
                    <Calendar className="w-5 h-5 text-enterprise-gold" />
                  </div>
                  
                  <div className="flex-1 bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4 hover:border-enterprise-gold/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-enterprise-gold font-medium">Week {phase.week}</span>
                      <span className="text-white font-medium">— {phase.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-enterprise-text-muted">
                      <FileText className="w-4 h-4" />
                      <span>{phase.deliverable}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-2 bg-gradient-to-br from-enterprise-gold/10 to-transparent border border-enterprise-gold/20 rounded-xl p-6"
          >
            <h3 className="text-lg font-medium text-white mb-6">What You Get</h3>
            <div className="space-y-4">
              {content?.benefits?.map((benefit: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-enterprise-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-enterprise-text-secondary">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-enterprise-text-muted italic">
            "We invest in understanding your business before we ask you to invest in ours."
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
