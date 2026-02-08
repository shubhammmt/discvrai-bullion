import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Globe, Cpu, Layers } from 'lucide-react';

interface DalmiaGlobalExamplesSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaGlobalExamplesSlide: React.FC<DalmiaGlobalExamplesSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const examples = [
    {
      company: 'CEMEX',
      icon: Globe,
      initiative: 'CEMEX GO Platform',
      result: '93% digital orders',
      color: 'from-blue-500 to-blue-600'
    },
    {
      company: 'Heidelberg',
      icon: Cpu,
      initiative: 'AI Dynamic Pricing Engine',
      result: '3% margin improvement',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      company: 'Holcim',
      icon: Layers,
      initiative: 'Commercial AI Transformation',
      result: '40% cost reduction',
      color: 'from-purple-500 to-purple-600'
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

        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${example.color} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <example.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{example.company}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-slate-600 text-sm mb-4">{example.initiative}</p>
                <div className="bg-slate-50 rounded-lg px-4 py-3">
                  <p className="text-amber-600 font-bold text-lg">{example.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-slate-500 text-center italic"
        >
          "Shift from product companies to intelligence platforms."
        </motion.p>
      </div>
    </MfgNewSlideLayout>
  );
};
