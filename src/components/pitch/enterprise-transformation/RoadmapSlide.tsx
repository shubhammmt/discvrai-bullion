import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface RoadmapSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const RoadmapSlide: React.FC<RoadmapSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
        
        <div className="flex-1 flex flex-col">
          {/* Timeline */}
          <div className="flex-1 relative">
            {/* Timeline line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-enterprise-blue via-enterprise-gold to-enterprise-success" />
            
            <div className="grid grid-cols-3 gap-3 pt-10">
              {content?.phases?.map((phase: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.15 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-enterprise-gold border-2 border-enterprise-navy" />
                  
                  <div className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-3 h-full">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Calendar className="w-3 h-3 text-enterprise-gold" />
                      <span className="text-xs text-enterprise-gold">Weeks {phase.weeks}</span>
                    </div>
                    <h3 className="text-sm text-white font-medium mb-1">{phase.name}</h3>
                    <div className="space-y-0.5 mb-2">
                      {phase.activities?.slice(0, 2).map((activity: string, i: number) => (
                        <p key={i} className="text-xs text-enterprise-text-muted">• {activity}</p>
                      ))}
                    </div>
                    <div className="bg-enterprise-gold/10 rounded-lg px-2 py-1">
                      <p className="text-xs text-enterprise-gold">{phase.deliverable}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 grid grid-cols-3 gap-3"
          >
            {content?.outcomes?.map((outcome: any, idx: number) => (
              <div 
                key={idx}
                className="bg-gradient-to-r from-enterprise-gold/10 to-transparent border border-enterprise-gold/20 rounded-xl p-3 text-center"
              >
                <div className="text-2xl font-light text-enterprise-gold mb-0.5">{outcome.value}</div>
                <div className="text-xs text-enterprise-text-muted">{outcome.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};
