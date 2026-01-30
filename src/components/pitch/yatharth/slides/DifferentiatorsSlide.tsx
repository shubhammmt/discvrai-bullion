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
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-emerald-600">{slide.subtitle}</p>
        </motion.div>
        
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Left: Comparisons */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            {content?.comparisons?.map((comp: any, idx: number) => (
              <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">vs. {comp.vs}</h4>
                <div className="space-y-1">
                  {comp.advantages?.map((adv: string, aidx: number) => (
                    <div key={aidx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{adv}</span>
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
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200"
          >
            <h3 className="font-bold text-gray-900 mb-4">The CXO Advantage</h3>
            <div className="space-y-3">
              {content?.cxoAdvantage?.map((item: any, idx: number) => {
                const IconComponent = cxoIcons[idx] || User;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-600">{item.point}</p>
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
