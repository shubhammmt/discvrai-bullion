import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Globe, Cpu, Layers, ArrowRight } from 'lucide-react';

interface DalmiaCaseStudiesSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseStudiesSlide: React.FC<DalmiaCaseStudiesSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const caseStudies = [
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
      intervention: 'AI Dynamic Pricing',
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
      <div className="flex flex-col items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
        >
          {slide.headline}
        </motion.h1>

        <div className="grid grid-cols-3 gap-6 max-w-5xl w-full">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${study.color} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <study.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{study.company}</h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5 space-y-4">
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-xs text-red-600 font-medium mb-1">Problem</p>
                  <p className="text-sm text-slate-700">{study.problem}</p>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
                
                <div className="bg-emerald-50 rounded-lg p-3">
                  <p className="text-xs text-emerald-600 font-medium mb-1">Intervention</p>
                  <p className="text-sm text-slate-700">{study.intervention}</p>
                </div>
                
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <p className="text-xs text-amber-600 font-medium mb-1">Result</p>
                  <p className="text-lg font-bold text-amber-700">{study.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
