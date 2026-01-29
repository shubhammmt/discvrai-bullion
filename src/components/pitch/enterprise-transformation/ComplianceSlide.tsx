import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface ComplianceSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const ComplianceSlide: React.FC<ComplianceSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Before */}
            <div className="bg-enterprise-danger/10 border border-enterprise-danger/30 rounded-xl p-5">
              <h3 className="text-lg font-medium text-enterprise-danger mb-4">Before</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-enterprise-text-muted">Audit Prep</span>
                  <span className="text-white">{content?.before?.auditPrep}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-enterprise-text-muted">Violations</span>
                  <span className="text-white">{content?.before?.violations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-enterprise-text-muted">Eligibility Checks</span>
                  <span className="text-white">{content?.before?.eligibility}</span>
                </div>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-enterprise-gold/20 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-enterprise-gold rotate-90" />
              </div>
            </div>
            
            {/* After */}
            <div className="bg-enterprise-success/10 border border-enterprise-success/30 rounded-xl p-5">
              <h3 className="text-lg font-medium text-enterprise-success mb-4">After</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-enterprise-text-muted">Audit Prep</span>
                  <span className="text-enterprise-gold font-medium">{content?.after?.auditPrep}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-enterprise-text-muted">Violations</span>
                  <span className="text-enterprise-gold font-medium">{content?.after?.violations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-enterprise-text-muted">Eligibility Checks</span>
                  <span className="text-enterprise-gold font-medium">{content?.after?.eligibility}</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Capabilities & Frameworks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {/* Capabilities */}
            <div className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-enterprise-gold" />
                <h3 className="text-lg font-medium text-white">Capabilities</h3>
              </div>
              <div className="space-y-3">
                {content?.capabilities?.map((cap: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-enterprise-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-enterprise-text-secondary">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Frameworks */}
            <div className="bg-enterprise-gold/10 border border-enterprise-gold/20 rounded-xl p-5">
              <h3 className="text-sm font-medium text-enterprise-gold mb-3">Regulatory Frameworks</h3>
              <div className="flex gap-2 flex-wrap">
                {content?.frameworks?.map((framework: string, idx: number) => (
                  <span 
                    key={idx}
                    className="bg-enterprise-navy/50 border border-enterprise-gold/30 rounded-full px-4 py-1 text-sm text-white"
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};
