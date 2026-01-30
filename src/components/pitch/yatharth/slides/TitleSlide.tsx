import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Bed, MapPin } from 'lucide-react';
import { YatharthSlide } from '@/data/yatharthHealthcareSlides';
import { YatharthSlideLayout } from '../YatharthSlideLayout';

interface TitleSlideProps {
  slide: YatharthSlide;
  slideNumber: number;
  totalSlides: number;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  
  return (
    <YatharthSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col items-center text-center">
        {/* Main headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          {slide.title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-emerald-700 font-medium mb-4"
        >
          {slide.subtitle}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base text-gray-700 mb-6"
        >
          {content?.tagline}
        </motion.p>
        
        {/* Scale metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-6 mb-6"
        >
          {content?.scale?.map((item: any, idx: number) => (
            <div key={idx} className="text-center px-5 py-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-center gap-2 mb-1">
                {idx === 0 && <Building2 className="w-4 h-4 text-emerald-700" />}
                {idx === 1 && <Bed className="w-4 h-4 text-emerald-700" />}
                {idx === 2 && <MapPin className="w-4 h-4 text-emerald-700" />}
                <span className="text-2xl font-bold text-emerald-700">{item.value}</span>
              </div>
              <span className="text-xs text-gray-700">{item.label}</span>
            </div>
          ))}
        </motion.div>
        
        {/* Specialties */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-4 max-w-3xl"
        >
          {content?.specialties?.map((specialty: string, idx: number) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
              {specialty}
            </span>
          ))}
        </motion.div>
        
        {/* Key message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-600 italic"
        >
          "{content?.keyMessage}"
        </motion.p>
      </div>
    </YatharthSlideLayout>
  );
};