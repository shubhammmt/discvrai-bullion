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
      <div className="h-full flex flex-col justify-center items-center text-center">
        {/* Main headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-2"
        >
          {slide.title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-emerald-600 font-medium mb-6"
        >
          {slide.subtitle}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 mb-8"
        >
          {content?.tagline}
        </motion.p>
        
        {/* Scale metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-8 mb-8"
        >
          {content?.scale?.map((item: any, idx: number) => (
            <div key={idx} className="text-center px-6 py-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-center gap-2 mb-1">
                {idx === 0 && <Building2 className="w-5 h-5 text-emerald-600" />}
                {idx === 1 && <Bed className="w-5 h-5 text-emerald-600" />}
                {idx === 2 && <MapPin className="w-5 h-5 text-emerald-600" />}
                <span className="text-3xl font-bold text-emerald-600">{item.value}</span>
              </div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
          ))}
        </motion.div>
        
        {/* Specialties */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-6 max-w-3xl"
        >
          {content?.specialties?.map((specialty: string, idx: number) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {specialty}
            </span>
          ))}
        </motion.div>
        
        {/* Key message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base text-gray-500 italic"
        >
          "{content?.keyMessage}"
        </motion.p>
      </div>
    </YatharthSlideLayout>
  );
};
