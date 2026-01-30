import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, CheckCircle } from 'lucide-react';
import { YatharthSlide } from '@/data/yatharthHealthcareSlides';
import { YatharthSlideLayout } from '../YatharthSlideLayout';

interface ComparisonSlideProps {
  slide: YatharthSlide;
  slideNumber: number;
  totalSlides: number;
}

export const ComparisonSlide: React.FC<ComparisonSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  
  return (
    <YatharthSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-emerald-600">{slide.subtitle}</p>
        </motion.div>
        
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Day-0 Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-emerald-50 rounded-xl p-5 border border-emerald-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Layers className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{content?.day0?.title}</h3>
                <p className="text-xs text-emerald-600">{content?.day0?.subtitle}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {content?.day0?.items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-white rounded-lg p-3 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium text-gray-900 text-sm">{item.capability}</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">{item.scale}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* AI Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-purple-50 rounded-xl p-5 border border-purple-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{content?.ai?.title}</h3>
                <p className="text-xs text-purple-600">{content?.ai?.subtitle}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {content?.ai?.items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-white rounded-lg p-3 border border-purple-100">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-gray-900 text-sm">{item.capability}</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">{item.requires}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Key Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-gray-600 bg-gray-50 inline-block px-6 py-2 rounded-full border border-gray-200">
            {content?.keyMessage}
          </p>
        </motion.div>
      </div>
    </YatharthSlideLayout>
  );
};
