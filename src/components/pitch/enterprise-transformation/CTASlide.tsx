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
          className="mb-6"
        >
          <h2 className="text-4xl font-light text-white mb-2">{slide.title}</h2>
          <p className="text-xl text-enterprise-gold">{slide.subtitle}</p>
        </motion.div>
        
        <div className="flex-1 grid grid-cols-2 gap-8">
          {/* Steps */}
          <div className="space-y-4">
            {content?.steps?.map((step: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-enterprise-gold/20 border border-enterprise-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-enterprise-gold font-medium">{step.step}</span>
                </div>
                <div className="flex-1 bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">{step.title}</span>
                    <span className="text-xs text-enterprise-gold">{step.timeline}</span>
                  </div>
                  <p className="text-sm text-enterprise-text-muted">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Outcomes & Contact */}
          <div className="space-y-4">
            {/* Outcomes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5"
            >
              <h3 className="text-lg font-medium text-white mb-4">What Success Looks Like</h3>
              <div className="space-y-3">
                {content?.outcomes?.map((outcome: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-enterprise-gold" />
                    <span className="text-enterprise-text-secondary">{outcome}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-enterprise-gold/20 to-enterprise-gold/5 border border-enterprise-gold/30 rounded-xl p-6"
            >
              <h3 className="text-lg font-medium text-white mb-4">Contact</h3>
              <div className="space-y-2">
                <p className="text-xl text-white">{content?.contact?.name}</p>
                <p className="text-enterprise-gold">{content?.contact?.title}</p>
                <div className="flex items-center gap-2 text-enterprise-text-secondary mt-4">
                  <Mail className="w-4 h-4 text-enterprise-gold" />
                  <span>{content?.contact?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-enterprise-text-secondary">
                  <Phone className="w-4 h-4 text-enterprise-gold" />
                  <span>{content?.contact?.phone}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
