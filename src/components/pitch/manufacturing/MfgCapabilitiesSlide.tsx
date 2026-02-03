import React from 'react';
import { motion } from 'framer-motion';
import { Truck, DollarSign, Target, Users, UserCheck, Brain, LucideIcon } from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

const iconMap: Record<string, LucideIcon> = {
  Truck,
  DollarSign,
  Target,
  Users,
  UserCheck,
  Brain
};

interface MfgCapabilitiesSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    categories: Array<{
      name: string;
      icon: string;
      capabilities: string[];
    }>;
    keyMessage: string;
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgCapabilitiesSlide: React.FC<MfgCapabilitiesSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const colors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-500', text: 'text-blue-600' },
    { bg: 'bg-emerald-50', border: 'border-emerald-200', iconBg: 'bg-emerald-500', text: 'text-emerald-600' },
    { bg: 'bg-purple-50', border: 'border-purple-200', iconBg: 'bg-purple-500', text: 'text-purple-600' },
    { bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-500', text: 'text-amber-600' },
    { bg: 'bg-rose-50', border: 'border-rose-200', iconBg: 'bg-rose-500', text: 'text-rose-600' },
    { bg: 'bg-cyan-50', border: 'border-cyan-200', iconBg: 'bg-cyan-500', text: 'text-cyan-600' }
  ];

  return (
    <MfgSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 flex-shrink-0"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{slide.headline}</h2>
          <p className="text-base text-slate-600">{slide.subheadline}</p>
        </motion.div>

        {/* Capabilities Grid - 2 rows of 3 */}
        <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-3 min-h-0">
          {slide.categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Brain;
            const color = colors[index % colors.length];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`${color.bg} ${color.border} border rounded-xl p-3 flex flex-col min-h-0`}
              >
                <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                  <div className={`w-7 h-7 ${color.iconBg} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className={`font-semibold text-sm ${color.text}`}>{category.name}</h3>
                </div>
                <div className="flex-1 space-y-1.5 overflow-hidden">
                  {category.capabilities.slice(0, 4).map((capability, capIndex) => (
                    <div key={capIndex} className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 ${color.iconBg} rounded-full mt-1.5 flex-shrink-0`} />
                      <p className="text-xs text-slate-600 leading-snug">{capability}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Key Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-3 py-2 text-center flex-shrink-0"
        >
          <p className="text-amber-700 font-semibold text-sm">{slide.keyMessage}</p>
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
