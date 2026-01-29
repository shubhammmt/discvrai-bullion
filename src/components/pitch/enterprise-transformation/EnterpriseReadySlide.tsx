import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Cloud, CheckCircle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface EnterpriseReadySlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const EnterpriseReadySlide: React.FC<EnterpriseReadySlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  
  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col justify-between">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h2 className="text-3xl font-light text-white mb-1">{slide.title}</h2>
          <p className="text-lg text-enterprise-gold">{slide.subtitle}</p>
        </motion.div>
        
        <div className="flex-1 grid grid-cols-3 gap-4">
          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-enterprise-gold" />
              <h3 className="text-base font-medium text-white">Security</h3>
            </div>
            <div className="space-y-2 flex-1">
              {content?.security?.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-enterprise-gold flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-enterprise-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Infrastructure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-4 h-4 text-enterprise-blue-light" />
              <h3 className="text-base font-medium text-white">Infrastructure</h3>
            </div>
            <div className="space-y-2 flex-1">
              {content?.infrastructure?.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-enterprise-blue-light flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-enterprise-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Integrations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <Cloud className="w-4 h-4 text-enterprise-success" />
              <h3 className="text-base font-medium text-white">Integrations</h3>
            </div>
            <div className="flex flex-wrap gap-1.5 flex-1 content-start">
              {content?.integrations?.map((item: string, idx: number) => (
                <span 
                  key={idx}
                  className="bg-enterprise-success/10 border border-enterprise-success/30 rounded-full px-2 py-0.5 text-xs text-enterprise-success"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Compliance badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex items-center justify-center gap-3"
        >
          <span className="text-sm text-enterprise-text-muted">Compliance:</span>
          {content?.compliance?.map((item: string, idx: number) => (
            <span 
              key={idx}
              className="bg-enterprise-gold/20 border border-enterprise-gold/30 rounded-full px-3 py-1 text-xs text-enterprise-gold"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  );
};
