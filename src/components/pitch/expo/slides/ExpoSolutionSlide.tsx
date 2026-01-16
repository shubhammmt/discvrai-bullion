import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';

interface ExpoSolutionSlideProps {
  slide: ExpoSlide;
}

export const ExpoSolutionSlide: React.FC<ExpoSolutionSlideProps> = ({ slide }) => {
  const { content, icon } = slide;

  return (
    <ExpoSlideLayout title={slide.title} icon={icon} section="core">
      <div className="h-full flex flex-col">
        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-slate-600 mb-4 font-light"
        >
          {content?.headline}
        </motion.p>
        
        {/* Key Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8"
        >
          <p className="text-lg text-blue-800 italic">"{content?.keyMessage}"</p>
        </motion.div>
        
        {/* Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-4 gap-5 flex-1"
        >
          {content?.pillars?.map((pillar: any, index: number) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{pillar.label}</h3>
                <p className="text-sm text-slate-500">{pillar.desc}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </ExpoSlideLayout>
  );
};
