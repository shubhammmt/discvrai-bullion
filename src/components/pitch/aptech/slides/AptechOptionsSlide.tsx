import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star } from 'lucide-react';
import { AptechSlideLayout } from '../AptechSlideLayout';

interface AptechOptionsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    tagline: string;
    options: Array<{
      label: string;
      title: string;
      description: string;
      features: string[];
      recommended?: boolean;
    }>;
  };
  slideNumber: number;
  totalSlides: number;
}

export const AptechOptionsSlide: React.FC<AptechOptionsSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <AptechSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <p className="text-sm uppercase tracking-wider text-orange-500 font-semibold mb-2">{slide.subtitle}</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-3">{slide.title}</h2>
          <p className="text-slate-500">{slide.tagline}</p>
        </motion.div>

        {/* Options Grid */}
        <div className="flex-1 grid grid-cols-4 gap-4">
          {slide.options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative rounded-xl p-5 border-2 transition-all ${
                option.recommended 
                  ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-300 shadow-lg' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {option.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Recommended
                </div>
              )}
              
              {/* Option Label */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold mb-4 ${
                option.recommended 
                  ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {option.label}
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 mb-2">{option.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{option.description}</p>
              
              <ul className="space-y-2">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      option.recommended ? 'text-orange-500' : 'text-slate-400'
                    }`} />
                    <span className="text-xs text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </AptechSlideLayout>
  );
};
