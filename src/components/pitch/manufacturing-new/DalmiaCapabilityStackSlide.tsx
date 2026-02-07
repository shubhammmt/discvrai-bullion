import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Database, Brain, Workflow, Monitor } from 'lucide-react';

interface DalmiaCapabilityStackSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCapabilityStackSlide: React.FC<DalmiaCapabilityStackSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const layers = [
    {
      number: 4,
      title: 'SUVIDHA 2.0 Ecosystem',
      description: 'Customer-facing digital platform',
      icon: Monitor,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      number: 3,
      title: 'Agentic Workflows',
      description: 'Sales copilot • Marketing automation • Order-to-cash automation',
      icon: Workflow,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      number: 2,
      title: 'AI Models',
      description: 'Pricing optimization • Demand prediction • Churn prediction • Credit intelligence',
      icon: Brain,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      number: 1,
      title: 'Dealer 360 Data Foundation',
      description: 'Unified data layer across all channels and touchpoints',
      icon: Database,
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200'
    }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Capability Stack
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
        >
          {slide.headline}
        </motion.h2>

        {/* Layered Architecture */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl space-y-3">
            {layers.map((layer, index) => {
              const IconComponent = layer.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                  className={`relative flex items-center gap-4 p-5 rounded-xl ${layer.bgColor} border ${layer.borderColor}`}
                  style={{ marginLeft: `${(3 - index) * 20}px`, marginRight: `${(3 - index) * 20}px` }}
                >
                  {/* Layer Number Badge */}
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-lg">{layer.number}</span>
                  </div>
                  
                  {/* Icon */}
                  <IconComponent className="w-6 h-6 text-slate-600 flex-shrink-0" />
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800">{layer.title}</h3>
                    <p className="text-sm text-slate-600 mt-0.5">{layer.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Build Direction Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center mt-4"
        >
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Foundation</span>
            <div className="w-16 h-0.5 bg-gradient-to-r from-slate-300 to-amber-400" />
            <span>Customer Experience</span>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
