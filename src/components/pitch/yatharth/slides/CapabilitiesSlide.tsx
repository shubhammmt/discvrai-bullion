import React from 'react';
import { motion } from 'framer-motion';
import { Database, Building2, Banknote, Network, Brain } from 'lucide-react';
import { YatharthSlide } from '@/data/yatharthHealthcareSlides';
import { YatharthSlideLayout } from '../YatharthSlideLayout';

interface CapabilitiesSlideProps {
  slide: YatharthSlide;
  slideNumber: number;
  totalSlides: number;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  database: Database,
  hospital: Building2,
  banknote: Banknote,
  network: Network,
  brain: Brain
};

export const CapabilitiesSlide: React.FC<CapabilitiesSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;
  
  return (
    <YatharthSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
          <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-base text-emerald-600">{slide.subtitle}</p>
        </motion.div>
        
        {/* Principle */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-4"
        >
          <p className="text-sm text-amber-800 font-medium">{content?.principle}</p>
        </motion.div>
        
        {/* Capabilities Grid */}
        <div className="flex-1 grid grid-cols-3 gap-3">
          {content?.capabilities?.map((cap: any, idx: number) => {
            const IconComponent = iconMap[cap.icon] || Database;
            const isAI = cap.scale === 'After Day-0';
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.05 }}
                className={`rounded-lg p-3 border ${
                  isAI 
                    ? 'bg-purple-50 border-purple-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isAI ? 'bg-purple-100' : 'bg-emerald-100'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${isAI ? 'text-purple-600' : 'text-emerald-600'}`} />
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    isAI 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {isAI ? 'AI' : 'Day-0'}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{cap.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{cap.description}</p>
                <p className="text-xs text-emerald-600 font-medium">{cap.scale}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </YatharthSlideLayout>
  );
};
