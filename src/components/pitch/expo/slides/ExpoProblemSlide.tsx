import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';

interface ExpoProblemSlideProps {
  slide: ExpoSlide;
}

export const ExpoProblemSlide: React.FC<ExpoProblemSlideProps> = ({ slide }) => {
  const { content, icon } = slide;

  return (
    <ExpoSlideLayout title={slide.title} icon={icon} section="core">
      <div className="h-full flex flex-col">
        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-slate-600 mb-8 font-light"
        >
          {content?.headline}
        </motion.p>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-6 mb-10"
        >
          {content?.stats?.map((stat: any, index: number) => (
            <div 
              key={index} 
              className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center"
            >
              <div className="text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
              <div className="text-sm text-red-800/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
        
        {/* Pain Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-4 gap-4"
        >
          {content?.painPoints?.map((point: any, index: number) => {
            const Icon = point.icon;
            return (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center text-center shadow-sm"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-slate-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">{point.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </ExpoSlideLayout>
  );
};
