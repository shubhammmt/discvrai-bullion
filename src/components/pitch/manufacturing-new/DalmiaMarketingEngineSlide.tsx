import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { MapPin, Users, Languages, MessageSquare } from 'lucide-react';

interface DalmiaMarketingEngineSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaMarketingEngineSlide: React.FC<DalmiaMarketingEngineSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const capabilities = [
    { 
      icon: MapPin, 
      title: 'Hyperlocal Hotspot Detection',
      description: 'AI identifies construction activity at micro-geography level',
      color: 'bg-blue-50 border-blue-200 text-blue-600'
    },
    { 
      icon: Users, 
      title: 'Contractor Intelligence',
      description: 'Track influencer contractors and their network impact',
      color: 'bg-purple-50 border-purple-200 text-purple-600'
    },
    { 
      icon: Languages, 
      title: 'Regional Content Automation',
      description: 'Auto-generate marketing content in local languages',
      color: 'bg-teal-50 border-teal-200 text-teal-600'
    },
    { 
      icon: MessageSquare, 
      title: 'WhatsApp Campaigns',
      description: 'Automated campaign delivery via WhatsApp Business',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-600'
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
            Marketing
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

        {/* Capabilities Grid */}
        <div className="flex-1 grid grid-cols-2 gap-5">
          {capabilities.map((cap, index) => {
            const IconComponent = cap.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className={`p-6 rounded-xl border ${cap.color}`}
              >
                <IconComponent className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-600">{cap.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Outcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <span className="text-sm font-medium text-slate-600">Outcome:</span>
            <span className="text-2xl font-bold text-emerald-700">20–30%</span>
            <span className="text-base text-slate-700">marketing ROI improvement</span>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
