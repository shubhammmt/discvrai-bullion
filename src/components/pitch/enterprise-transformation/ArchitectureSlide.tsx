import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Cloud, Shield } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface ArchitectureSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

const icons = [Layers, Database, Cloud, Shield];

export const ArchitectureSlide: React.FC<ArchitectureSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
        
        {/* Architecture layers */}
        <div className="flex-1 grid grid-cols-4 gap-4">
          {content?.layers?.map((layer: any, idx: number) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-5 hover:border-enterprise-gold/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-5 h-5 text-enterprise-gold" />
                  <h3 className="text-white font-medium">{layer.name}</h3>
                </div>
                
                {/* Tech */}
                <div className="mb-4">
                  <div className="text-xs text-enterprise-text-muted mb-2">Technology</div>
                  <div className="flex flex-wrap gap-1">
                    {layer.tech?.map((tech: string, i: number) => (
                      <span 
                        key={i}
                        className="bg-enterprise-blue/10 border border-enterprise-blue/30 rounded px-2 py-0.5 text-xs text-enterprise-blue-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Features */}
                <div>
                  <div className="text-xs text-enterprise-text-muted mb-2">Features</div>
                  <div className="space-y-1">
                    {layer.features?.map((feature: string, i: number) => (
                      <p key={i} className="text-xs text-enterprise-text-secondary">• {feature}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center text-enterprise-text-muted"
        >
          Built for enterprise. Scales with your business.
        </motion.div>
      </div>
    </SlideLayout>
  );
};
