import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileCheck, Receipt, BarChart3 } from 'lucide-react';
import { YatharthSlide } from '@/data/yatharthHealthcareSlides';
import { YatharthSlideLayout } from '../YatharthSlideLayout';

interface RCMSlideProps {
  slide: YatharthSlide;
  slideNumber: number;
  totalSlides: number;
}

export const RCMSlide: React.FC<RCMSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  const icons = [Shield, FileCheck, Receipt, BarChart3];
  
  return (
    <YatharthSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-emerald-600">{slide.subtitle}</p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="flex-1 grid grid-cols-2 gap-3 mb-4">
          {content?.features?.map((feature: any, idx: number) => {
            const IconComponent = icons[idx] || Shield;
            const isAI = feature.tag === 'AI-Enabled';
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className={`rounded-lg p-3 border ${
                  isAI ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isAI ? 'bg-purple-100' : 'bg-emerald-100'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${isAI ? 'text-purple-600' : 'text-emerald-600'}`} />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">{feature.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ml-auto ${
                    isAI ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {feature.tag}
                  </span>
                </div>
                <ul className="space-y-1">
                  {feature.items?.map((item: string, iidx: number) => (
                    <li key={iidx} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className={`w-1 h-1 rounded-full mt-1.5 ${isAI ? 'bg-purple-400' : 'bg-emerald-400'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        
        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6"
        >
          {content?.impact?.map((metric: any, idx: number) => (
            <div key={idx} className="text-center px-6 py-3 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-600">{metric.value}</div>
              <div className="text-xs text-gray-600">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </YatharthSlideLayout>
  );
};
