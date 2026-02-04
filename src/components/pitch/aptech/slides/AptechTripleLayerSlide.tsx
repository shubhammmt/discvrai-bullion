import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Search, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { AptechSlideLayout } from '../AptechSlideLayout';

const layerIcons = [Search, MessageCircle, Sparkles];
const layerColors = [
  { bg: 'from-blue-500 to-blue-600', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600' },
  { bg: 'from-purple-500 to-purple-600', light: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600' },
  { bg: 'from-orange-500 to-amber-500', light: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600' }
];

interface AptechTripleLayerSlideProps {
  slide: {
    title: string;
    subtitle: string;
    tagline: string;
    layers: Array<{
      acronym: string;
      name: string;
      description: string;
      details: string[];
      result: string;
    }>;
  };
  slideNumber: number;
  totalSlides: number;
}

export const AptechTripleLayerSlide: React.FC<AptechTripleLayerSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <AptechSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Layers className="w-8 h-8 text-orange-500" />
            <h2 className="text-4xl font-bold text-slate-800">{slide.title}</h2>
          </div>
          <p className="text-lg text-slate-500">{slide.subtitle}</p>
        </motion.div>

        {/* Layers Grid */}
        <div className="flex-1 grid grid-cols-3 gap-6">
          {slide.layers.map((layer, index) => {
            const IconComponent = layerIcons[index];
            const colors = layerColors[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15 }}
                className={`${colors.light} border ${colors.border} rounded-xl p-6 flex flex-col`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-md`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className={`text-2xl font-bold ${colors.text}`}>{layer.acronym}</span>
                    <p className="text-xs text-slate-500">{layer.name}</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">{layer.description}</p>
                
                {/* Details */}
                <ul className="space-y-2 mb-4 flex-1">
                  {layer.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <ArrowRight className={`w-3 h-3 ${colors.text}`} />
                      {detail}
                    </li>
                  ))}
                </ul>
                
                {/* Result */}
                <div className={`${colors.bg} bg-gradient-to-r text-white rounded-lg px-4 py-2 text-center text-sm font-medium`}>
                  {layer.result}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-4"
        >
          <p className="text-slate-500 italic">"{slide.tagline}"</p>
        </motion.div>
      </div>
    </AptechSlideLayout>
  );
};
