import React from 'react';
import { motion } from 'framer-motion';
import { Activity, FileText, Stethoscope } from 'lucide-react';
import { YatharthSlide } from '@/data/yatharthHealthcareSlides';
import { YatharthSlideLayout } from '../YatharthSlideLayout';

interface OperationsSlideProps {
  slide: YatharthSlide;
  slideNumber: number;
  totalSlides: number;
}

export const OperationsSlide: React.FC<OperationsSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  const icons = [Activity, FileText, Stethoscope];
  
  return (
    <YatharthSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
          <h2 className="text-xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-sm text-emerald-700 font-medium">{slide.subtitle}</p>
        </motion.div>
        
        {/* Features */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {content?.features?.map((feature: any, idx: number) => {
            const IconComponent = icons[idx] || Activity;
            const isAI = feature.tag === 'AI-Enabled';
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
                className={`rounded-lg p-3 border ${
                  isAI ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded flex items-center justify-center ${
                    isAI ? 'bg-purple-100' : 'bg-emerald-100'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${isAI ? 'text-purple-700' : 'text-emerald-700'}`} />
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    isAI ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1.5">{feature.title}</h3>
                <ul className="space-y-1">
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