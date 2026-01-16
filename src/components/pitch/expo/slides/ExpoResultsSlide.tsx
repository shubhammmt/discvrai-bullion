import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';

interface ExpoResultsSlideProps {
  slide: ExpoSlide;
}

export const ExpoResultsSlide: React.FC<ExpoResultsSlideProps> = ({ slide }) => {
  const { content, icon, subtitle } = slide;

  return (
    <ExpoSlideLayout title={slide.title} subtitle={subtitle} icon={icon} section="core">
      <div className="h-full flex items-center">
        <div className="grid grid-cols-2 gap-8 w-full">
          {content?.columns?.map((column: any, colIndex: number) => {
            const ColumnIcon = column.icon;
            return (
              <motion.div 
                key={colIndex}
                initial={{ opacity: 0, x: colIndex === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + colIndex * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colIndex === 0 ? 'bg-emerald-100' : 'bg-orange-100'}`}>
                    <ColumnIcon className={`w-6 h-6 ${colIndex === 0 ? 'text-emerald-600' : 'text-orange-600'}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">{column.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {column.metrics?.map((metric: any, index: number) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <span className="text-slate-600">{metric.label}</span>
                      <span className={`text-2xl font-bold ${colIndex === 0 ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ExpoSlideLayout>
  );
};
