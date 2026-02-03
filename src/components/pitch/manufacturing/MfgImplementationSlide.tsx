import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

interface MfgImplementationSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    phases: Array<{
      name: string;
      timeline: string;
      label: string;
      deliverables: string[];
      metrics: string[];
    }>;
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgImplementationSlide: React.FC<MfgImplementationSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  const phaseColors = [
    { bg: 'bg-blue-50', border: 'border-blue-200', accent: 'bg-blue-500', text: 'text-blue-600' },
    { bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'bg-emerald-500', text: 'text-emerald-600' },
    { bg: 'bg-purple-50', border: 'border-purple-200', accent: 'bg-purple-500', text: 'text-purple-600' },
    { bg: 'bg-amber-50', border: 'border-amber-200', accent: 'bg-amber-500', text: 'text-amber-600' }
  ];

  return (
    <MfgSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-amber-600" />
            <div>
              <h2 className="text-3xl font-bold text-slate-800">{slide.headline}</h2>
              <p className="text-lg text-slate-600">{slide.subheadline}</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2 }}
          className="h-2 bg-slate-100 rounded-full mb-4 flex overflow-hidden"
        >
          {slide.phases.map((phase, index) => (
            <div
              key={index}
              className={`flex-1 ${phaseColors[index].accent} ${index > 0 ? 'ml-1' : ''}`}
            />
          ))}
        </motion.div>

        {/* Phases */}
        <div className="flex-1 grid grid-cols-4 gap-3 overflow-hidden">
          {slide.phases.map((phase, index) => {
            const color = phaseColors[index];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`${color.bg} ${color.border} border rounded-xl p-3 flex flex-col`}
              >
                <div className="mb-2">
                  <div className={`inline-block ${color.accent} text-white text-xs font-bold px-2 py-0.5 rounded-full mb-1`}>
                    {phase.timeline}
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">{phase.name}</h3>
                  <p className={`text-xs ${color.text}`}>{phase.label}</p>
                </div>

                <div className="flex-1 space-y-1.5 mb-2 overflow-auto">
                  {phase.deliverables.slice(0, 4).map((deliverable, delIndex) => (
                    <div key={delIndex} className="flex items-start gap-1.5">
                      <ArrowRight className={`w-3 h-3 ${color.text} flex-shrink-0 mt-0.5`} />
                      <p className="text-xs text-slate-600">{deliverable}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-700 mb-1">Success Metrics:</p>
                  <div className="space-y-1">
                    {phase.metrics.slice(0, 2).map((metric, metIndex) => (
                      <div key={metIndex} className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        <p className="text-xs text-slate-600">{metric}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </MfgSlideLayout>
  );
};
