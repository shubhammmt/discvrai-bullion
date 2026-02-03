import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Brain, Workflow, Clock } from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

const componentIcons: Record<string, React.FC<{ className?: string }>> = {
  'Integration Layer': Cpu,
  'Data Platform': Database,
  'Intelligence Layer': Brain,
  'Workflow Engine': Workflow
};

interface MfgTechnicalSlideProps {
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

export const MfgTechnicalSlide: React.FC<MfgTechnicalSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const colors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-500' },
    { bg: 'bg-emerald-50', border: 'border-emerald-200', iconBg: 'bg-emerald-500' },
    { bg: 'bg-purple-50', border: 'border-purple-200', iconBg: 'bg-purple-500' },
    { bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-500' }
  ];

  return (
    <MfgSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-1">{slide.headline}</h2>
          <p className="text-lg text-slate-600">{slide.subheadline}</p>
        </motion.div>

        {/* Platform Components */}
        <div className="flex-1 grid grid-cols-4 gap-3 mb-4">
          {slide.components.map((component, index) => {
            const Icon = componentIcons[component.name] || Cpu;
            const color = colors[index % colors.length];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`${color.bg} ${color.border} border rounded-xl p-3 flex flex-col`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 ${color.iconBg} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-800">{component.name}</h3>
                </div>
                <div className="flex-1 space-y-1 overflow-auto">
                  {component.items.slice(0, 5).map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-1.5">
                      <div className={`w-1.5 h-1.5 ${color.iconBg} rounded-full mt-1.5 flex-shrink-0`} />
                      <p className="text-xs text-slate-600 leading-tight">{item}</p>
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
          className="bg-slate-800 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Deployment Flexibility</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {slide.deploymentTimelines.map((timeline, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-3">
                <p className="text-xs text-white/60 mb-1">{timeline.complexity}</p>
                <p className="text-lg font-bold text-amber-400 mb-1">{timeline.timeline}</p>
                <p className="text-xs text-white/70">{timeline.example}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
