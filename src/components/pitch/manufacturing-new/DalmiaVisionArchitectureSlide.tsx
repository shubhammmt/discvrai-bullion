import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Database, Brain, Workflow, Monitor, TrendingUp, ArrowRight } from 'lucide-react';

interface DalmiaVisionArchitectureSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaVisionArchitectureSlide: React.FC<DalmiaVisionArchitectureSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const flowSteps = [
    { icon: Database, label: 'Data', color: 'bg-slate-100 text-slate-600 border-slate-200' },
    { icon: Brain, label: 'AI Intelligence', color: 'bg-blue-100 text-blue-600 border-blue-200' },
    { icon: Workflow, label: 'Agentic Workflows', color: 'bg-purple-100 text-purple-600 border-purple-200' },
    { icon: Monitor, label: 'Digital Platform', color: 'bg-teal-100 text-teal-600 border-teal-200' },
    { icon: TrendingUp, label: 'Revenue Growth', color: 'bg-amber-100 text-amber-600 border-amber-200' }
  ];

  const layers = [
    {
      number: 4,
      title: 'SUVIDHA 2.0 Ecosystem',
      description: 'Customer-facing digital platform',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      number: 3,
      title: 'Agentic Workflows',
      description: 'Sales • Marketing • O2C',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      number: 2,
      title: 'AI Models',
      description: 'Pricing • Demand • Churn • Credit',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      number: 1,
      title: 'Dealer 360 Data Foundation',
      description: 'Unified data layer',
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200'
    }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-3"
        >
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Vision & Architecture
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          {slide.headline}
        </motion.h2>

        {/* Flow Diagram - Top */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-1 mb-6"
        >
          {flowSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                  className={`flex flex-col items-center p-3 rounded-lg border ${step.color} min-w-[90px]`}
                >
                  <IconComponent className="w-6 h-6 mb-1" />
                  <span className="text-xs font-semibold text-center">{step.label}</span>
                </motion.div>
                
                {index < flowSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.35 + index * 0.1, duration: 0.2 }}
                    className="flex items-center"
                  >
                    <div className="w-4 h-0.5 bg-slate-300" />
                    <ArrowRight className="w-4 h-4 text-slate-400 -ml-0.5" />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </motion.div>

        {/* Capability Stack - Below */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="w-full max-w-3xl space-y-2">
            {layers.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.12, duration: 0.4 }}
                className={`relative flex items-center gap-3 p-3 rounded-lg ${layer.bgColor} border ${layer.borderColor}`}
                style={{ marginLeft: `${(3 - index) * 16}px`, marginRight: `${(3 - index) * 16}px` }}
              >
                {/* Layer Number Badge */}
                <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${layer.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{layer.number}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">{layer.title}</h3>
                  <p className="text-xs text-slate-500">{layer.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-slate-600 italic">
            "Dalmia evolves from <span className="font-semibold text-slate-800">manufacturer</span> to{' '}
            <span className="font-semibold text-teal-600">commercial platform</span>"
          </p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
