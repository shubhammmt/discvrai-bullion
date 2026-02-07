import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Brain, Workflow, Clock } from 'lucide-react';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';

const componentIcons: Record<string, React.FC<{ className?: string }>> = {
  'Integration Layer': Cpu,
  'Data Platform': Database,
  'Intelligence Layer': Brain,
  'Workflow Engine': Workflow
};

interface MfgNewTechnicalSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    components: Array<{
      name: string;
      items: string[];
    }>;
    deploymentTimelines: Array<{
      complexity: string;
      timeline: string;
      example: string;
    }>;
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgNewTechnicalSlide: React.FC<MfgNewTechnicalSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const colors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-500', bullet: 'bg-blue-500' },
    { bg: 'bg-emerald-50', border: 'border-emerald-200', iconBg: 'bg-emerald-500', bullet: 'bg-emerald-500' },
    { bg: 'bg-purple-50', border: 'border-purple-200', iconBg: 'bg-purple-500', bullet: 'bg-purple-500' },
    { bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-500', bullet: 'bg-amber-500' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex-shrink-0"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{slide.headline}</h2>
          <p className="text-lg text-gray-600">{slide.subheadline}</p>
        </motion.div>

        {/* Platform Components */}
        <div className="flex-1 grid grid-cols-4 gap-4 mb-5">
          {slide.components.map((component, index) => {
            const Icon = componentIcons[component.name] || Cpu;
            const color = colors[index % colors.length];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`${color.bg} ${color.border} border rounded-xl p-4 flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                  <div className={`w-10 h-10 ${color.iconBg} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900">{component.name}</h3>
                </div>
                <div className="flex-1 space-y-2">
                  {component.items.slice(0, 5).map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-2">
                      <div className={`w-2 h-2 ${color.bullet} rounded-full mt-2 flex-shrink-0`} />
                      <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deployment Timelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-xl p-5 flex-shrink-0"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Deployment Flexibility</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {slide.deploymentTimelines.map((timeline, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <p className="text-sm text-white/60 mb-2">{timeline.complexity}</p>
                <p className="text-2xl font-bold text-amber-400 mb-2">{timeline.timeline}</p>
                <p className="text-sm text-white/80">{timeline.example}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
