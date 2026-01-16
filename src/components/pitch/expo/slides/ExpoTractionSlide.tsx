import React from 'react';
import { motion } from 'framer-motion';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoSlideLayout } from '../ExpoSlideLayout';
import { CheckCircle2 } from 'lucide-react';

interface ExpoTractionSlideProps {
  slide: ExpoSlide;
}

export const ExpoTractionSlide: React.FC<ExpoTractionSlideProps> = ({ slide }) => {
  const { content, icon } = slide;

  return (
    <ExpoSlideLayout title={slide.title} icon={icon} section="core">
      <div className="h-full flex flex-col">
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Deployments */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-5">Live Deployments</h3>
            <ul className="space-y-4">
              {content?.deployments?.map((deployment: any, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-800">{deployment.name}</span>
                    <span className="text-slate-500 ml-2">— {deployment.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 gap-4"
          >
            {content?.metrics?.map((metric: any, index: number) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 flex items-center justify-between"
              >
                <span className="text-slate-700">{metric.label}</span>
                <span className="text-2xl font-bold text-blue-600">{metric.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Key Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-green-50 border border-green-200 rounded-xl p-5 text-center"
        >
          <p className="text-lg text-green-800 font-medium">{content?.keyMessage}</p>
        </motion.div>
      </div>
    </ExpoSlideLayout>
  );
};
