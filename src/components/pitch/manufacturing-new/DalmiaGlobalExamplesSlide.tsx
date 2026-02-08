import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Globe, Cpu, Layers, ArrowRight } from 'lucide-react';

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
      problem: 'Low digital adoption',
      intervention: 'CEMEX GO Platform',
      result: '93% digital orders',
      color: 'from-blue-500 to-blue-600'
    },
    {
      company: 'Heidelberg',
      icon: Cpu,
      problem: 'Manual pricing inconsistency',
      intervention: 'AI Dynamic Pricing Engine',
      result: '3% margin improvement',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      company: 'Holcim',
      icon: Layers,
      problem: 'Fragmented commercial ops',
      intervention: 'Commercial AI Transformation',
      result: '40% cost reduction',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col h-full">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 rounded-full border border-amber-200">
            Global Benchmarks
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          {slide.headline}
        </motion.h1>

        <div className="grid grid-cols-3 gap-5 flex-1">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${example.color} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <example.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{example.company}</h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 space-y-3 flex-1 flex flex-col">
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-xs text-red-600 font-medium mb-1">Problem</p>
                  <p className="text-sm text-slate-700">{example.problem}</p>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-slate-300 rotate-90" />
                </div>
                
                <div className="bg-teal-50 rounded-lg p-3">
                  <p className="text-xs text-teal-600 font-medium mb-1">Intervention</p>
                  <p className="text-sm text-slate-700">{example.intervention}</p>
                </div>
                
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 mt-auto">
                  <p className="text-xs text-amber-600 font-medium mb-1">Result</p>
                  <p className="text-lg font-bold text-amber-700">{example.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 bg-slate-800 rounded-xl px-6 py-3 text-center"
        >
          <p className="text-white text-sm font-medium">
            "The leaders have already shifted from product companies to intelligence platforms."
          </p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
