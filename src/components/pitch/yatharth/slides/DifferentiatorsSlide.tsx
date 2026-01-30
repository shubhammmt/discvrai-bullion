import React from 'react';
import { motion } from 'framer-motion';
import { Check, User, Search, ShieldCheck, Target } from 'lucide-react';
import { YatharthSlide } from '@/data/yatharthHealthcareSlides';
import { YatharthSlideLayout } from '../YatharthSlideLayout';

interface DifferentiatorsSlideProps {
  slide: YatharthSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DifferentiatorsSlide: React.FC<DifferentiatorsSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  const cxoIcons = [User, Search, ShieldCheck, Target];
  
  return (
    <YatharthSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
          <h2 className="text-xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-sm text-emerald-700 font-medium">{slide.subtitle}</p>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Left: Comparisons */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            {content?.comparisons?.map((comp: any, idx: number) => (
              <div key={idx} className="bg-white rounded-lg p-2.5 border border-gray-200">
                <h4 className="font-semibold text-gray-900 text-xs mb-1.5">vs. {comp.vs}</h4>
                <div className="space-y-1">
                  {comp.advantages?.map((adv: string, aidx: number) => (
                    <div key={aidx} className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-800 leading-tight">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Right: CXO Advantage */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200"
          >
            <h3 className="font-bold text-gray-900 text-sm mb-2">The CXO Advantage</h3>
            <div className="space-y-2">
              {content?.cxoAdvantage?.map((item: any, idx: number) => {
                const IconComponent = cxoIcons[idx] || User;
                return (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-3 h-3 text-emerald-700" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-xs">{item.title}</p>
                      <p className="text-xs text-gray-700 leading-tight">{item.point}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </YatharthSlideLayout>
  );
};