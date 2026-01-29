import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle, Mail, Phone } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface FounderSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const FounderSlide: React.FC<FounderSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
        
        <div className="flex-1 grid grid-cols-2 gap-12">
          {/* Left: Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="flex gap-8 mb-8">
              {content?.credentials?.map((cred: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-light text-enterprise-gold mb-1">{cred.value}</div>
                  <div className="text-sm text-enterprise-text-secondary uppercase tracking-wider">{cred.label}</div>
                </motion.div>
              ))}
            </div>
            
            {/* Experience */}
            <div className="space-y-3">
              {content?.experience?.map((exp: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-enterprise-gold mt-0.5 flex-shrink-0" />
                  <span className="text-enterprise-text-secondary">{exp}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right: Promise & Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-between"
          >
            {/* Promise box */}
            <div className="bg-gradient-to-br from-enterprise-gold/10 to-enterprise-gold/5 border border-enterprise-gold/20 rounded-xl p-6">
              <p className="text-lg text-white font-medium mb-4">The CXO-to-CXO Promise</p>
              <p className="text-enterprise-text-secondary italic leading-relaxed">
                "I understand your board's priorities because I've lived them. I know the headcount trap. 
                I've managed the tension between innovation and operational stability. 
                DiscvrAI bridges that gap."
              </p>
            </div>
            
            {/* Founder card */}
            <div className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-6 mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-enterprise-gold/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-enterprise-gold" />
                </div>
                <div>
                  <p className="text-xl font-medium text-white">{content?.founder?.name}</p>
                  <p className="text-enterprise-text-muted">{content?.founder?.title}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-enterprise-text-secondary">
                  <Mail className="w-4 h-4 text-enterprise-gold" />
                  <span>{content?.founder?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-enterprise-text-secondary">
                  <Phone className="w-4 h-4 text-enterprise-gold" />
                  <span>{content?.founder?.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Key message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-enterprise-gold font-medium">{content?.promise}</p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
