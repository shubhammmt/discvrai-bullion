import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface TitleSlideProps {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  
  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col justify-center items-center text-center">
        {/* Decorative orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-enterprise-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-enterprise-gold/10 rounded-full blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-4xl"
        >
          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl font-light text-white tracking-tight mb-4"
          >
            {slide.title}
          </motion.h1>
          
          {/* Subtitle with gold accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-enterprise-gold" />
            <span className="text-xl text-enterprise-gold font-medium">{slide.subtitle}</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-enterprise-gold" />
          </motion.div>
          
          {/* Key message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-white/80 font-light mb-4"
          >
            {content?.headline}
          </motion.p>
          
          {/* Transformation arrow animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center justify-center gap-4 text-lg text-enterprise-text-secondary mb-8"
          >
            <span className="text-white/60">Systems of Record</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6 text-enterprise-gold" />
            </motion.div>
            <span className="text-enterprise-gold font-medium">Systems of Action</span>
          </motion.div>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg text-enterprise-text-muted italic"
          >
            "{content?.subTagline}"
          </motion.p>
          
          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-12 pt-8 border-t border-enterprise-border"
          >
            <p className="text-base text-enterprise-text-secondary">
              {content?.bottomNote}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
