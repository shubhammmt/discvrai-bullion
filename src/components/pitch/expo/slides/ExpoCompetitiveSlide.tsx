import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';
import { Check } from 'lucide-react';

interface ExpoCompetitiveSlideProps {
  slide: ExpoSlide;
}

export const ExpoCompetitiveSlide: React.FC<ExpoCompetitiveSlideProps> = ({ slide }) => {
  const { content, icon } = slide;

  return (
    <ExpoSlideLayout title={slide.title} icon={icon} section="core">
      <div className="h-full flex flex-col">
        {/* Comparisons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-5 mb-8 flex-1"
        >
          {content?.comparisons?.map((comparison: any, index: number) => (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-sm font-medium text-slate-500 mb-4">vs {comparison.vs}</h3>
              <ul className="space-y-3">
                {comparison.advantages?.map((adv: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
        
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-center"
        >
          <p className="text-lg text-white font-medium">{content?.tagline}</p>
        </motion.div>
      </div>
    </ExpoSlideLayout>
  );
};
