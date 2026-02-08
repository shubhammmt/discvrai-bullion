import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Wrench, Brain, Rocket } from 'lucide-react';

interface DalmiaImplementationSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaImplementationSlide: React.FC<DalmiaImplementationSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const phases = [
    {
      name: 'Phase 1',
      timeline: '0–6 months',
      title: 'Foundation',
      icon: Wrench,
      items: ['Fix SUVIDHA UX', 'Build data lake', 'Pilot pricing AI'],
      color: 'from-slate-600 to-slate-700'
    },
    {
      name: 'Phase 2',
      timeline: '6–15 months',
      title: 'AI Rollout',
      icon: Brain,
      items: ['Scale pricing', 'Demand sensing', 'Dealer 360'],
      color: 'from-amber-500 to-orange-500'
    },
    {
      name: 'Phase 3',
      timeline: '15–24 months',
      title: 'Platform Scale',
      icon: Rocket,
      items: ['80% digital adoption', 'Full AI integration', 'Continuous optimization'],
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
        >
          {slide.headline}
        </motion.h1>

        {/* Timeline */}
        <div className="relative max-w-5xl w-full">
          {/* Timeline line */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-slate-200 rounded-full" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-12 left-0 h-1 bg-gradient-to-r from-slate-600 via-amber-500 to-emerald-500 rounded-full"
          />
          
          {/* Phase Cards */}
          <div className="grid grid-cols-3 gap-8">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.2 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="flex justify-center mb-4">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center z-10`}>
                    <phase.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                {/* Card */}
                <div className="bg-white rounded-xl shadow-md border border-slate-100 p-5 mt-4">
                  <div className="text-center mb-4">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">{phase.name}</span>
                    <h3 className="font-bold text-slate-900 mt-1">{phase.title}</h3>
                    <p className="text-sm text-slate-500">{phase.timeline}</p>
                  </div>
                  
                  <ul className="space-y-2">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
