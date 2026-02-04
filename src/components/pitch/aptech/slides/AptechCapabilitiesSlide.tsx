import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Layers, TrendingUp, CheckCircle2 } from 'lucide-react';
import { AptechSlideLayout } from '../AptechSlideLayout';

const iconMap: Record<string, React.ComponentType<any>> = {
  bot: Bot,
  layers: Layers,
  trending: TrendingUp
};

interface AptechCapabilitiesSlideProps {
  slide: {
    title: string;
    subtitle: string;
    tagline: string;
    capabilities: Array<{
      title: string;
      icon: string;
      features: string[];
    }>;
  };
  slideNumber: number;
  totalSlides: number;
}

export const AptechCapabilitiesSlide: React.FC<AptechCapabilitiesSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const gradients = [
    'from-orange-500 to-amber-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500'
  ];

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

        {/* Capabilities Grid */}
        <div className="flex-1 grid grid-cols-3 gap-6">
          {slide.capabilities.map((capability, index) => {
            const IconComponent = iconMap[capability.icon] || Bot;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center mb-5 shadow-lg`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{capability.title}</h3>
                <ul className="space-y-2.5">
                  {capability.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AptechSlideLayout>
  );
};
