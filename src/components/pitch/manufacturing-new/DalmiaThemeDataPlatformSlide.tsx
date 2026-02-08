import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Database, Server, Brain, LayoutDashboard, AlertCircle, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

interface DalmiaThemeDataPlatformSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaThemeDataPlatformSlide: React.FC<DalmiaThemeDataPlatformSlideProps> = ({
  slideNumber,
  totalSlides
}) => {
  const problems = [
    'Fragmented commercial data across ERP, CRM, apps',
    'No single customer identity',
    'Manual reporting, slow insights'
  ];

  const transformations = [
    'Enterprise data lake',
    'Customer master data platform',
    'Single identity layer'
  ];

  const impacts = [
    'Single source of truth',
    'AI-ready foundation',
    '70% faster reporting'
  ];

  const sources = [
    { label: 'SAP', icon: Server },
    { label: 'Salesforce', icon: Database },
    { label: 'SUVIDHA', icon: Database },
    { label: 'Loyalty', icon: Database }
  ];

  const outputs = [
    { label: 'Finance Dashboard', icon: LayoutDashboard },
    { label: 'Sales Dashboard', icon: LayoutDashboard },
    { label: 'Marketing Dashboard', icon: LayoutDashboard }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col h-full">
        {/* Theme Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 rounded-full border border-amber-200">
            Theme 1 — Data Foundation
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          Unified Commercial Intelligence Platform
        </motion.h1>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-3 gap-4 mb-6">
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

          {/* Transformation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-teal-50 border border-teal-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-bold uppercase tracking-wide text-teal-700">Transformation</h3>
            </div>
            <ul className="space-y-2">
              {transformations.map((item, i) => (
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
            <ul className="space-y-2">
              {impacts.map((item, i) => (
                <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Architecture Wireframe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4"
        >
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 text-center">
            Architecture Wireframe
          </h4>
          
          <div className="flex flex-col items-center justify-center h-full gap-3">
            {/* Source Systems */}
            <div className="flex items-center gap-3">
              {sources.map((src, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-lg bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                    <src.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <span className="text-xs text-slate-600 mt-1 font-medium">{src.label}</span>
                </div>
              ))}
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-slate-300" />
              <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
            </div>

            {/* Data Lake */}
            <div className="flex flex-col items-center">
              <div className="w-40 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <Database className="w-5 h-5 text-white mr-2" />
                <span className="text-sm font-bold text-white">DATA LAKE</span>
              </div>
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-slate-300" />
              <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
            </div>

            {/* AI Layer */}
            <div className="flex flex-col items-center">
              <div className="w-40 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                <Brain className="w-5 h-5 text-white mr-2" />
                <span className="text-sm font-bold text-white">AI LAYER</span>
              </div>
            </div>

            {/* Connector */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-slate-300" />
              <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
            </div>

            {/* Output Dashboards */}
            <div className="flex items-center gap-3">
              {outputs.map((out, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-lg bg-white border-2 border-amber-300 flex items-center justify-center shadow-sm">
                    <out.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-xs text-slate-600 mt-1 font-medium text-center">{out.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Case Studies Reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center"
        >
          <span className="text-xs text-slate-500">
            Case Studies: <span className="font-semibold text-slate-700">Enterprise Data Lake</span> • <span className="font-semibold text-slate-700">Customer Master Data Platform</span>
          </span>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
