import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { User, Smartphone, Brain, MapPin, Calendar, Target, AlertCircle, Wrench, TrendingUp, ArrowRight } from 'lucide-react';

interface DalmiaCaseFieldForceSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseFieldForceSlide: React.FC<DalmiaCaseFieldForceSlideProps> = ({
  slideNumber,
  totalSlides
}) => {
  const problems = [
    'Sales reps plan visits manually',
    'No visibility on territory performance',
    'Missed high-value opportunities',
    'Reactive rather than proactive selling'
  ];

  const built = [
    'AI-powered daily visit prioritization',
    'Real-time territory heatmaps',
    'Next-best-action recommendations',
    'GPS-enabled visit tracking'
  ];

  const impacts = [
    { metric: 'Sales Productivity', value: '+18%' },
    { metric: 'Visit Efficiency', value: '+35%' },
    { metric: 'Lead Conversion', value: '+22%' },
    { metric: 'Territory Coverage', value: '+25%' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col h-full">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <span className="text-xs text-slate-500">
            <span className="text-amber-600 font-medium">Theme 2: Sales Excellence</span> → Case Study
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          Field Force Enablement
        </motion.h1>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-sm font-bold uppercase tracking-wide text-red-700">Problem</h3>
            </div>
            <ul className="space-y-2">
              {problems.map((item, i) => (
                <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* What We Built */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-teal-50 border border-teal-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-bold uppercase tracking-wide text-teal-700">What We Built</h3>
            </div>
            <ul className="space-y-2">
              {built.map((item, i) => (
                <li key={i} className="text-sm text-teal-800 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Impact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-bold uppercase tracking-wide text-amber-700">Impact</h3>
            </div>
            <div className="space-y-2">
              {impacts.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-amber-800">{item.metric}</span>
                  <span className="text-sm font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4"
        >
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 text-center">
            System Architecture
          </h4>
          
          <div className="flex items-center justify-center h-full gap-4">
            {/* Sales Rep */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                <User className="w-8 h-8 text-slate-600" />
              </div>
              <span className="text-xs text-slate-600 mt-2 font-medium">Sales Rep</span>
            </div>

            <ArrowRight className="w-5 h-5 text-slate-400" />

            {/* Mobile App */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-20 rounded-xl bg-white border-2 border-blue-300 flex flex-col items-center justify-center shadow-sm p-2">
                <Smartphone className="w-6 h-6 text-blue-600 mb-1" />
                <div className="flex gap-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <Target className="w-3 h-3 text-slate-400" />
                </div>
              </div>
              <span className="text-xs text-slate-600 mt-2 font-medium">Sales App</span>
            </div>

            <ArrowRight className="w-5 h-5 text-slate-400" />

            {/* AI Engine */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-20 rounded-xl bg-gradient-to-b from-purple-500 to-purple-600 flex flex-col items-center justify-center shadow-md">
                <Brain className="w-8 h-8 text-white mb-1" />
                <span className="text-xs font-bold text-white text-center">AI Copilot</span>
              </div>
              <span className="text-xs text-slate-500 mt-2">Recommendations</span>
            </div>

            <ArrowRight className="w-5 h-5 text-slate-400" />

            {/* Output Features */}
            <div className="flex flex-col gap-2">
              <div className="px-3 py-2 rounded-lg bg-amber-100 border border-amber-300">
                <span className="text-xs font-medium text-amber-800">Daily Visit Plan</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-amber-100 border border-amber-300">
                <span className="text-xs font-medium text-amber-800">Territory Heatmap</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-amber-100 border border-amber-300">
                <span className="text-xs font-medium text-amber-800">Next Best Action</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
