import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';
import { ArrowRight } from 'lucide-react';

interface ExpoEngagementModelsSlideProps {
  slide: ExpoSlide;
}

export const ExpoEngagementModelsSlide: React.FC<ExpoEngagementModelsSlideProps> = ({ slide }) => {
  const { content, icon } = slide;

  return (
    <ExpoSlideLayout title={slide.title} icon={icon} section="core">
      <div className="h-full flex items-center">
        <div className="grid grid-cols-3 gap-6 w-full">
          {content?.models?.map((model: any, index: number) => {
            const Icon = model.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all relative overflow-hidden group"
              >
                {/* Timeline badge */}
                <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {model.timeline}
                </div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{model.title}</h3>
                <p className="text-slate-500 text-sm">{model.desc}</p>
                
                {index < 2 && (
                  <ArrowRight className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-300 hidden lg:block" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </ExpoSlideLayout>
  );
};
