import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Bot } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface ContactSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const ContactSlide: React.FC<ContactSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  
  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col justify-center items-center text-center">
        {/* Decorative orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-enterprise-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-enterprise-blue/10 rounded-full blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-2xl"
        >
          {/* Thank you */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-light text-white mb-4"
          >
            {slide.title}
          </motion.h2>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-enterprise-text-secondary mb-12"
          >
            {slide.subtitle}
          </motion.p>
          
          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-enterprise-surface-elevated border border-enterprise-gold/30 rounded-2xl p-8 inline-block"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-enterprise-gold/20 flex items-center justify-center">
                <Bot className="w-8 h-8 text-enterprise-gold" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-medium text-white">{content?.contact?.name}</p>
                <p className="text-enterprise-gold">{content?.contact?.title}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-enterprise-text-secondary">
                <Mail className="w-5 h-5 text-enterprise-gold" />
                <span className="text-lg">{content?.contact?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-enterprise-text-secondary">
                <Phone className="w-5 h-5 text-enterprise-gold" />
                <span className="text-lg">{content?.contact?.phone}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Final tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-enterprise-gold text-lg italic"
          >
            "{content?.tagline}"
          </motion.p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
