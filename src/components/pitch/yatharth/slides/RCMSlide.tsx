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
      <div className="flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
          <h2 className="text-xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-sm text-emerald-700 font-medium">{slide.subtitle}</p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {content?.features?.map((feature: any, idx: number) => {
            const IconComponent = icons[idx] || Shield;
            const isAI = feature.tag === 'AI-Enabled';
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className={`rounded-lg p-2.5 border ${
                  isAI ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    isAI ? 'bg-purple-100' : 'bg-emerald-100'
                  }`}>
                    <IconComponent className={`w-3.5 h-3.5 ${isAI ? 'text-purple-700' : 'text-emerald-700'}`} />
                  </div>
                  <span className="font-semibold text-gray-900 text-xs">{feature.title}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ml-auto font-medium ${
                    isAI ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {feature.tag}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {feature.items?.map((item: string, iidx: number) => (
                    <li key={iidx} className="text-xs text-gray-800 flex items-start gap-1.5">
                      <span className={`w-1 h-1 rounded-full mt-1.5 ${isAI ? 'bg-purple-500' : 'bg-emerald-500'}`} />
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
          className="flex justify-center gap-4"
        >
          {content?.impact?.map((metric: any, idx: number) => (
            <div key={idx} className="text-center px-5 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-xl font-bold text-emerald-700">{metric.value}</div>
              <div className="text-xs text-gray-700">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </YatharthSlideLayout>
  );
};