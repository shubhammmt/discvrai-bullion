import React from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle } from 'lucide-react';

interface AMCBusinessModelSlideProps {
  slide: {
    title: string;
    subtitle: string;
    content: {
      layers: Array<{
        name: string;
        description: string;
        pricing: string;
        color: string;
      }>;
      principles: string[];
      tagline: string;
    };
  };
}

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  navy: { 
    bg: 'bg-slate-50', 
    border: 'border-slate-200', 
    text: 'text-slate-900',
    badge: 'bg-slate-900 text-white'
  },
  orange: { 
    bg: 'bg-orange-50', 
    border: 'border-orange-200', 
    text: 'text-orange-900',
    badge: 'bg-orange-500 text-white'
  },
  gold: { 
    bg: 'bg-amber-50', 
    border: 'border-amber-200', 
    text: 'text-amber-900',
    badge: 'bg-amber-500 text-white'
  }
};

export const AMCBusinessModelSlide: React.FC<AMCBusinessModelSlideProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col p-12">
      {/* Header */}
      <div className="mb-8">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-4xl font-bold text-gray-900 mb-2"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600"
        >
          {slide.subtitle}
        </motion.p>
      </div>

      {/* Layers */}
      <div className="grid grid-cols-3 gap-6 flex-1 mb-8">
        {slide.content.layers.map((layer, index) => {
          const colors = colorClasses[layer.color] || colorClasses.navy;
          return (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className={`${colors.bg} ${colors.border} border rounded-xl p-6 flex flex-col`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${colors.badge} rounded-lg flex items-center justify-center`}>
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              
              <h3 className={`font-semibold ${colors.text} mb-3`}>
                {layer.name}
              </h3>
              
              <p className="text-gray-600 text-sm flex-1 mb-4">
                {layer.description}
              </p>
              
              <div className={`${colors.badge} rounded-lg px-3 py-2 text-center text-sm font-medium`}>
                {layer.pricing}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Principles */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-8 mb-6"
      >
        {slide.content.principles.map((principle, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 font-medium">{principle}</span>
          </div>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-gray-900 text-white p-4 rounded-xl text-center"
      >
        <p className="font-medium">"{slide.content.tagline}"</p>
      </motion.div>
    </div>
  );
};
