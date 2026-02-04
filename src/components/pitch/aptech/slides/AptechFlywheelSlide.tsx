import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, MessageSquare, Bot, FileText, Globe, Users } from 'lucide-react';
import { AptechSlideLayout } from '../AptechSlideLayout';

const stepIcons = [MessageSquare, Bot, FileText, Globe, Users];

interface AptechFlywheelSlideProps {
  slide: {
    title: string;
    subtitle: string;
    tagline: string;
    steps: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    outcome: string;
  };
  slideNumber: number;
  totalSlides: number;
}

export const AptechFlywheelSlide: React.FC<AptechFlywheelSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <AptechSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <RefreshCw className="w-8 h-8 text-orange-500" />
            <h2 className="text-4xl font-bold text-slate-800">{slide.title}</h2>
          </div>
          <p className="text-lg text-slate-500">{slide.subtitle}</p>
        </motion.div>

        {/* Flywheel Steps */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-5xl">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 -translate-y-1/2 mx-16" />
            
            {/* Steps */}
            <div className="relative grid grid-cols-5 gap-4">
              {slide.steps.map((step, index) => {
                const IconComponent = stepIcons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.15 }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Step Circle */}
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full bg-white border-4 border-orange-400 flex items-center justify-center shadow-lg">
                        <IconComponent className="w-8 h-8 text-orange-500" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center">
                        {step.step}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 mb-1">{step.title}</h3>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Outcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full px-8 py-4">
            <RefreshCw className="w-5 h-5" />
            <span className="font-semibold">{slide.outcome}</span>
          </div>
          <p className="text-sm text-slate-400 mt-3 italic">"{slide.tagline}"</p>
        </motion.div>
      </div>
    </AptechSlideLayout>
  );
};
