import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';

interface ExpoTechnologySlideProps {
  slide: ExpoSlide;
}

export const ExpoTechnologySlide: React.FC<ExpoTechnologySlideProps> = ({ slide }) => {
  const { content, icon } = slide;

  const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-orange-500'];

  return (
    <ExpoSlideLayout title={slide.title} icon={icon} section="core">
      <div className="h-full flex flex-col">
        {/* Stacks Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-5 mb-8 flex-1"
        >
          {content?.stacks?.map((stack: any, index: number) => (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <div className={`h-1 w-12 ${colors[index]} rounded-full mb-4`} />
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{stack.title}</h3>
              <ul className="space-y-2">
                {stack.items?.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className={`w-1.5 h-1.5 ${colors[index]} rounded-full`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
        
        {/* Key Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800 rounded-xl p-5 text-center"
        >
          <p className="text-lg text-white font-medium">{content?.keyMessage}</p>
        </motion.div>
      </div>
    </ExpoSlideLayout>
  );
};
