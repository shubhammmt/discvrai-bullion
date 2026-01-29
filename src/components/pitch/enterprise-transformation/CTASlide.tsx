import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, CheckCircle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface CTASlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const CTASlide: React.FC<CTASlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
          {/* Steps */}
          <div className="flex flex-col justify-center space-y-3">
            {content?.steps?.map((step: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-enterprise-gold/20 border border-enterprise-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-enterprise-gold font-medium">{step.step}</span>
                </div>
                <div className="flex-1 bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-3">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm text-white font-medium">{step.title}</span>
                    <span className="text-xs text-enterprise-gold">{step.timeline}</span>
                  </div>
                  <p className="text-xs text-enterprise-text-muted">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Outcomes & Contact */}
          <div className="flex flex-col justify-center space-y-3">
            {/* Outcomes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4"
            >
              <h3 className="text-base font-medium text-white mb-3">What Success Looks Like</h3>
              <div className="space-y-2">
                {content?.outcomes?.map((outcome: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-enterprise-gold" />
                    <span className="text-xs text-enterprise-text-secondary">{outcome}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-enterprise-gold/20 to-enterprise-gold/5 border border-enterprise-gold/30 rounded-xl p-4"
            >
              <h3 className="text-base font-medium text-white mb-2">Contact</h3>
              <div className="space-y-1">
                <p className="text-lg text-white">{content?.contact?.name}</p>
                <p className="text-sm text-enterprise-gold">{content?.contact?.title}</p>
                <div className="flex items-center gap-2 text-enterprise-text-secondary mt-2">
                  <Mail className="w-3 h-3 text-enterprise-gold" />
                  <span className="text-xs">{content?.contact?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-enterprise-text-secondary">
                  <Phone className="w-3 h-3 text-enterprise-gold" />
                  <span className="text-xs">{content?.contact?.phone}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
