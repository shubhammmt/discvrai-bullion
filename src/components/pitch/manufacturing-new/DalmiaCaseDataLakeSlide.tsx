import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Database, Server, Cloud, LayoutDashboard, AlertCircle, Wrench, TrendingUp, ArrowRight, ArrowDown } from 'lucide-react';

interface DalmiaCaseDataLakeSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseDataLakeSlide: React.FC<DalmiaCaseDataLakeSlideProps> = ({
  slideNumber,
  totalSlides
}) => {
  const problems = [
    'Data scattered across SAP, CRM, spreadsheets',
    'No unified view of customers or transactions',
    'Reports take days to generate',
    'IT bottleneck for every data request'
  ];

  const built = [
    'Centralized cloud data lake',
    'Automated ETL pipelines from all sources',
    'Real-time data refresh (hourly)',
    'Self-service analytics layer'
  ];

  const impacts = [
    { metric: 'Report Generation', value: '70% faster' },
    { metric: 'Data Accuracy', value: '95%+' },
    { metric: 'IT Dependency', value: '-60%' },
    { metric: 'Decision Speed', value: '3x faster' }
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
            <span className="text-amber-600 font-medium">Theme 1: Data Platform</span> → Case Study
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          Enterprise Data Lake
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
          
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              {/* Source Systems Row */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                    <Server className="w-5 h-5 text-slate-600" />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">SAP</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                    <Database className="w-5 h-5 text-slate-600" />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">CRM</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                    <Database className="w-5 h-5 text-slate-600" />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Apps</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                    <Database className="w-5 h-5 text-slate-600" />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Excel</span>
                </div>
              </div>

              {/* Arrow Down */}
              <ArrowDown className="w-5 h-5 text-slate-400" />

              {/* ETL Layer */}
              <div className="px-6 py-2 bg-blue-100 border border-blue-300 rounded-lg">
                <span className="text-sm font-medium text-blue-700">ETL Pipelines (Automated)</span>
              </div>

              {/* Arrow Down */}
              <ArrowDown className="w-5 h-5 text-slate-400" />

              {/* Data Lake */}
              <div className="w-48 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <Cloud className="w-5 h-5 text-white mr-2" />
                <span className="text-sm font-bold text-white">Cloud Data Lake</span>
              </div>

              {/* Arrow Down */}
              <ArrowDown className="w-5 h-5 text-slate-400" />

              {/* Analytics Layer */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Finance</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Sales</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">Marketing</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
