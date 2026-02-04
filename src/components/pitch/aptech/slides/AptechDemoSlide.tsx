import React from 'react';
import { motion } from 'framer-motion';
import { Presentation, Bot, FileText, BarChart3, LayoutDashboard } from 'lucide-react';
import { AptechSlideLayout } from '../AptechSlideLayout';

const demoIcons: Record<string, React.ComponentType<any>> = {
  bot: Bot,
  file: FileText,
  chart: BarChart3,
  dashboard: LayoutDashboard
};

interface AptechDemoSlideProps {
  slide: {
    title: string;
    subtitle: string;
    tagline: string;
    demos: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    outcomes: Array<{
      metric: string;
      label: string;
      description: string;
    }>;
  };
  slideNumber: number;
  totalSlides: number;
}

export const AptechDemoSlide: React.FC<AptechDemoSlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
            <Presentation className="w-8 h-8 text-orange-500" />
            <h2 className="text-4xl font-bold text-slate-800">{slide.title}</h2>
          </div>
          <p className="text-lg text-slate-500">{slide.subtitle}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-2 gap-8">
          {/* What We'll Show */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 border border-slate-200 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-5">What We'll Show</h3>
            <div className="grid grid-cols-2 gap-4">
              {slide.demos.map((demo, index) => {
                const IconComponent = demoIcons[demo.icon] || Bot;
                return (
                  <div key={index} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-3">
                      <IconComponent className="w-5 h-5 text-orange-500" />
                    </div>
                    <h4 className="font-semibold text-slate-800 text-sm mb-1">{demo.title}</h4>
                    <p className="text-xs text-slate-500">{demo.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Potential Outcomes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-5">Potential Outcomes</h3>
            <div className="grid grid-cols-2 gap-4">
              {slide.outcomes.map((outcome, index) => (
                <div key={index} className="bg-white border border-orange-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-orange-500 mb-1">{outcome.metric}</div>
                  <h4 className="font-semibold text-slate-800 text-sm">{outcome.label}</h4>
                  <p className="text-xs text-slate-500">{outcome.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4"
        >
          <p className="text-slate-500 italic">"{slide.tagline}"</p>
        </motion.div>
      </div>
    </AptechSlideLayout>
  );
};
