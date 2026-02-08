import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Cloud, Building, Calendar, Brain, BarChart3, AlertCircle, Wrench, TrendingUp, ArrowRight, ArrowDown } from 'lucide-react';

interface DalmiaCaseDynamicCapacitySlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseDynamicCapacitySlide: React.FC<DalmiaCaseDynamicCapacitySlideProps> = ({
  slideNumber,
  totalSlides
}) => {
  const problems = [
    'Monthly batch demand planning',
    'Forecast accuracy ~65%',
    'No external signal integration',
    'Reactive capacity adjustments'
  ];

  const built = [
    'Weekly rolling AI forecasts',
    'Weather + infrastructure data integration',
    'Demand sensing algorithms',
    'Scenario simulation engine'
  ];

  const impacts = [
    { metric: 'Forecast Accuracy', value: '65% → 85%' },
    { metric: 'Planning Cycle', value: 'Monthly → Weekly' },
    { metric: 'Working Capital', value: '₹100 Cr freed' },
    { metric: 'Stockout Events', value: '-45%' }
  ];

  const signals = [
    { label: 'Weather Data', icon: Cloud },
    { label: 'Infra Projects', icon: Building },
    { label: 'Historical Sales', icon: Calendar }
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
            <span className="text-amber-600 font-medium">Theme 3: Supply Chain</span> → Case Study
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          Dynamic Capacity & Demand Sensing
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
          
          <div className="flex flex-col items-center justify-center h-full gap-3">
            {/* External Signals */}
            <div className="flex items-center gap-4">
              {signals.map((signal, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-white border-2 border-blue-300 flex items-center justify-center shadow-sm">
                    <signal.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs text-slate-600 mt-1 font-medium">{signal.label}</span>
                </div>
              ))}
            </div>

            {/* Connector */}
            <ArrowDown className="w-5 h-5 text-slate-400" />

            {/* AI Demand Sensing */}
            <div className="w-48 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
              <Brain className="w-5 h-5 text-white mr-2" />
              <span className="text-sm font-bold text-white">AI Demand Sensing</span>
            </div>

            {/* Connector */}
            <ArrowDown className="w-5 h-5 text-slate-400" />

            {/* Outputs */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="px-4 py-3 rounded-lg bg-amber-100 border border-amber-300">
                  <span className="text-xs font-medium text-amber-800">Weekly Forecasts</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="px-4 py-3 rounded-lg bg-amber-100 border border-amber-300">
                  <span className="text-xs font-medium text-amber-800">Scenario Simulation</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="px-4 py-3 rounded-lg bg-amber-100 border border-amber-300">
                  <span className="text-xs font-medium text-amber-800">Capacity Alerts</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
