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
      <div className="flex flex-col">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
          <h2 className="text-xl font-bold text-gray-900">{slide.title}</h2>
          <p className="text-sm text-emerald-700 font-medium">{slide.subtitle}</p>
        </motion.div>
        
        {/* Principle */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="bg-amber-50 border border-amber-300 rounded-lg px-3 py-2 mb-3"
        >
          <p className="text-xs text-amber-900 font-medium">{content?.principle}</p>
        </motion.div>
        
        {/* Capabilities Grid */}
        <div className="grid grid-cols-3 gap-2">
          {content?.capabilities?.map((cap: any, idx: number) => {
            const IconComponent = iconMap[cap.icon] || Database;
            const isAI = cap.scale === 'After Day-0';
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.05 }}
                className={`rounded-lg p-2.5 border ${
                  isAI 
                    ? 'bg-purple-50 border-purple-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${
                    isAI ? 'bg-purple-100' : 'bg-emerald-100'
                  }`}>
                    <IconComponent className={`w-3.5 h-3.5 ${isAI ? 'text-purple-700' : 'text-emerald-700'}`} />
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    isAI 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {isAI ? 'AI' : 'Day-0'}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-xs mb-0.5">{cap.title}</h3>
                <p className="text-xs text-gray-700 mb-1 leading-tight">{cap.description}</p>
                <p className="text-xs text-emerald-700 font-medium">{cap.scale}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </YatharthSlideLayout>
  );
};