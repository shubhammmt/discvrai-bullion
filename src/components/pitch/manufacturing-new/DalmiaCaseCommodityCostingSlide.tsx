import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { TrendingUp as TrendingUpIcon, Fuel, Zap, DollarSign, Brain, LayoutDashboard, AlertCircle, Wrench, ArrowRight, ArrowDown } from 'lucide-react';

interface DalmiaCaseCommodityCostingSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseCommodityCostingSlide: React.FC<DalmiaCaseCommodityCostingSlideProps> = ({
  slideNumber,
  totalSlides
}) => {
  const problems = [
    'Manual commodity price tracking',
    'Delayed margin impact visibility',
    'No scenario modeling capability',
    'Reactive pricing decisions'
  ];

  const built = [
    'Real-time commodity price feeds',
    'AI margin impact simulation',
    'What-if scenario engine',
    'Automated pricing recommendations'
  ];

  const impacts = [
    { metric: 'Margin Visibility', value: 'Real-time' },
    { metric: 'Pricing Response', value: '5x faster' },
    { metric: 'Margin Protection', value: '+2-3%' },
    { metric: 'Decision Accuracy', value: '+40%' }
  ];

  const commodities = [
    { label: 'Coal', icon: Fuel },
    { label: 'Power', icon: Zap },
    { label: 'Petcoke', icon: Fuel },
    { label: 'Gypsum', icon: DollarSign }
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
            <span className="text-amber-600 font-medium">Theme 5: Financial Intelligence</span> → Case Study
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          Commodity Costing AI
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
              <TrendingUpIcon className="w-5 h-5 text-amber-600" />
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
            {/* Commodity Feeds */}
            <div className="flex items-center gap-3">
              {commodities.map((commodity, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-white border-2 border-blue-300 flex items-center justify-center shadow-sm">
                    <commodity.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-slate-600 mt-1 font-medium">{commodity.label}</span>
                </div>
              ))}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-lg bg-white border-2 border-green-300 flex items-center justify-center shadow-sm">
                  <TrendingUpIcon className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs text-slate-600 mt-1 font-medium">Market API</span>
              </div>
            </div>

            {/* Connector */}
            <ArrowDown className="w-5 h-5 text-slate-400" />

            {/* AI Engine */}
            <div className="w-52 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
              <Brain className="w-5 h-5 text-white mr-2" />
              <div className="text-center">
                <span className="text-sm font-bold text-white block">AI Margin Simulation</span>
                <span className="text-xs text-purple-200">What-If Scenarios</span>
              </div>
            </div>

            {/* Connector */}
            <ArrowDown className="w-5 h-5 text-slate-400" />

            {/* Output Dashboard */}
            <div className="w-48 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
              <LayoutDashboard className="w-5 h-5 text-white mr-2" />
              <span className="text-sm font-bold text-white">Margin Impact Dashboard</span>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
