import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';

interface ExpoUseCasesSlideProps {
  slide: ExpoSlide;
}

export const ExpoUseCasesSlide: React.FC<ExpoUseCasesSlideProps> = ({ slide }) => {
  const { content, icon } = slide;

  const colors = [
    { bg: 'bg-blue-50', border: 'border-blue-100', icon: 'bg-blue-100', iconColor: 'text-blue-600', outcome: 'text-blue-700' },
    { bg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'bg-emerald-100', iconColor: 'text-emerald-600', outcome: 'text-emerald-700' },
    { bg: 'bg-purple-50', border: 'border-purple-100', icon: 'bg-purple-100', iconColor: 'text-purple-600', outcome: 'text-purple-700' },
    { bg: 'bg-orange-50', border: 'border-orange-100', icon: 'bg-orange-100', iconColor: 'text-orange-600', outcome: 'text-orange-700' }
  ];

  return (
    <ExpoSlideLayout title={slide.title} icon={icon} section="core">
      <div className="h-full flex items-center">
        <div className="grid grid-cols-2 gap-6 w-full">
          {content?.quadrants?.map((quadrant: any, index: number) => {
            const Icon = quadrant.icon;
            const color = colors[index];
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`${color.bg} border ${color.border} rounded-2xl p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${color.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${color.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{quadrant.title}</h3>
                    <p className={`text-xl font-bold ${color.outcome} mb-2`}>{quadrant.outcome}</p>
                    <div className="flex flex-wrap gap-2">
                      {quadrant.examples?.map((example: string, i: number) => (
                        <span key={i} className="bg-white/60 px-2 py-1 rounded text-xs text-slate-600">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ExpoSlideLayout>
  );
};
