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
        
        <div className="flex-1 grid grid-cols-3 gap-4">
          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-enterprise-gold" />
              <h3 className="text-lg font-medium text-white">Security</h3>
            </div>
            <div className="space-y-2">
              {content?.security?.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-enterprise-gold flex-shrink-0 mt-0.5" />
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
            className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-enterprise-blue-light" />
              <h3 className="text-lg font-medium text-white">Infrastructure</h3>
            </div>
            <div className="space-y-2">
              {content?.infrastructure?.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-enterprise-blue-light flex-shrink-0 mt-0.5" />
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
            className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Cloud className="w-5 h-5 text-enterprise-success" />
              <h3 className="text-lg font-medium text-white">Integrations</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {content?.integrations?.map((item: string, idx: number) => (
                <span 
                  key={idx}
                  className="bg-enterprise-success/10 border border-enterprise-success/30 rounded-full px-3 py-1 text-xs text-enterprise-success"
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
          className="mt-6 flex items-center justify-center gap-4"
        >
          <span className="text-enterprise-text-muted">Compliance:</span>
          {content?.compliance?.map((item: string, idx: number) => (
            <span 
              key={idx}
              className="bg-enterprise-gold/20 border border-enterprise-gold/30 rounded-full px-4 py-1 text-sm text-enterprise-gold"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </SlideLayout>
  );
};
