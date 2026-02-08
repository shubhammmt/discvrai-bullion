import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { TrendingUp, Smartphone, Bot, Brain, Database, ChevronDown } from 'lucide-react';

interface DalmiaFutureVisionSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaFutureVisionSlide: React.FC<DalmiaFutureVisionSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const layers = [
    {
      label: 'Revenue Growth',
      icon: TrendingUp,
      items: ['Revenue ↑', 'Cost ↓', 'Speed ↑', 'Retention ↑'],
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-white'
    },
    {
      label: 'Digital Platform',
      icon: Smartphone,
      items: ['Dealer App', 'Mobile App', 'WhatsApp', 'Portal'],
      color: 'from-slate-700 to-slate-800',
      textColor: 'text-white'
    },
    {
      label: 'Agentic Workflows',
      icon: Bot,
      items: ['Pricing', 'Sales', 'Marketing', 'O2C'],
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-white'
    },
    {
      label: 'AI Intelligence',
      icon: Brain,
      items: ['Demand', 'Churn', 'Credit', 'Sentiment'],
      color: 'from-blue-500 to-indigo-500',
      textColor: 'text-white'
    },
    {
      label: 'Data Foundation',
      icon: Database,
      items: ['SAP', 'Order Data', 'Loyalty', 'External'],
      color: 'from-slate-200 to-slate-300',
      textColor: 'text-slate-700'
    }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center"
        >
          {slide.headline}
        </motion.h1>

        {/* Execution Stack */}
        <div className="w-full max-w-4xl space-y-3">
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="relative"
            >
              <div className={`bg-gradient-to-r ${layer.color} rounded-xl p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <layer.icon className={`w-5 h-5 ${layer.textColor}`} />
                    <span className={`font-bold text-sm uppercase tracking-wide ${layer.textColor}`}>
                      {layer.label}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {layer.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          layer.textColor === 'text-white' 
                            ? 'bg-white/20 text-white' 
                            : 'bg-white text-slate-700'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Connector */}
              {index < layers.length - 1 && (
                <div className="flex justify-center py-1">
                  <ChevronDown className="w-5 h-5 text-slate-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
