import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';

interface ExpoPlatformSlideProps {
  slide: ExpoSlide;
}

export const ExpoPlatformSlide: React.FC<ExpoPlatformSlideProps> = ({ slide }) => {
  const { content, icon, subtitle } = slide;

  return (
    <ExpoSlideLayout title={slide.title} subtitle={subtitle} icon={icon} section="core">
      <div className="h-full flex flex-col">
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-6 mb-8"
        >
          {content?.metrics?.map((metric: any, index: number) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-center text-white shadow-lg shadow-blue-500/20"
            >
              <div className="text-4xl font-bold mb-1">{metric.value}</div>
              <div className="text-blue-100 text-sm">{metric.label}</div>
              {metric.comparison && (
                <div className="text-blue-200/70 text-xs mt-1">({metric.comparison})</div>
              )}
            </div>
          ))}
        </motion.div>
        
        {/* Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-4 gap-4"
        >
          {content?.components?.map((component: any, index: number) => {
            const Icon = component.icon;
            return (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center text-center shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">{component.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </ExpoSlideLayout>
  );
};
