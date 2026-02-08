import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Factory, Warehouse, Truck, Store, Eye, MapPin, AlertCircle, Wrench, TrendingUp, ArrowRight } from 'lucide-react';

interface DalmiaCaseSupplyVisibilitySlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseSupplyVisibilitySlide: React.FC<DalmiaCaseSupplyVisibilitySlideProps> = ({
  slideNumber,
  totalSlides
}) => {
  const problems = [
    'No real-time view of inventory across network',
    'Manual stock reconciliation (weekly)',
    'Delayed response to stockouts',
    'No visibility into transport status'
  ];

  const built = [
    'Real-time inventory tracking dashboard',
    'GPS-enabled fleet tracking',
    'Automated stockout alerts',
    'Multi-tier visibility (plant to dealer)'
  ];

  const impacts = [
    { metric: 'Inventory Visibility', value: '100%' },
    { metric: 'Stockout Response', value: '-60%' },
    { metric: 'Reconciliation Time', value: '-80%' },
    { metric: 'Working Capital', value: '₹50 Cr freed' }
  ];

  const supplyNodes = [
    { label: 'Plant', icon: Factory },
    { label: 'Depot', icon: Warehouse },
    { label: 'Transit', icon: Truck },
    { label: 'Dealer', icon: Store }
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
          Supply Chain Visibility
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
          
          <div className="flex flex-col items-center justify-center h-full gap-4">
            {/* Supply Chain Flow */}
            <div className="flex items-center gap-4">
              {supplyNodes.map((node, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                        <node.icon className="w-7 h-7 text-slate-600" />
                      </div>
                      {/* GPS indicator */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <span className="text-xs text-slate-600 mt-2 font-medium">{node.label}</span>
                  </div>
                  {i < supplyNodes.length - 1 && (
                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-5 h-5 text-blue-500" />
                      <span className="text-xs text-blue-500">Live</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Visibility Layer */}
            <div className="w-full max-w-lg h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

            {/* Central Dashboard */}
            <div className="flex items-center gap-4">
              <div className="w-48 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <Eye className="w-5 h-5 text-white mr-2" />
                <span className="text-sm font-bold text-white">Real-Time Visibility Dashboard</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
