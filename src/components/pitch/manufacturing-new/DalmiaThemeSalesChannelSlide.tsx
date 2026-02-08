import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { User, Smartphone, Brain, Server, LayoutDashboard, AlertCircle, Sparkles, TrendingUp, ArrowRight, FileText } from 'lucide-react';

interface DalmiaThemeSalesChannelSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaThemeSalesChannelSlide: React.FC<DalmiaThemeSalesChannelSlideProps> = ({
  slideNumber,
  totalSlides
}) => {
  const problems = [
    'Manual visit planning',
    'No real-time performance visibility',
    'Reactive dealer management'
  ];

  const transformations = [
    'AI sales copilot',
    'Real-time performance tracking',
    'Dealer lifecycle intelligence'
  ];

  const impacts = [
    '15-20% sales productivity',
    '25% better territory coverage',
    '30% faster decision-making'
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
            Theme 2 — Sales Excellence
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          AI Sales & Channel Execution
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
              <div className="w-16 h-16 rounded-xl bg-white border-2 border-blue-300 flex items-center justify-center shadow-sm">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-xs text-slate-600 mt-2 font-medium">Mobile App</span>
            </div>

            <ArrowRight className="w-5 h-5 text-slate-400" />

            {/* AI Engine */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs text-slate-600 mt-2 font-medium text-center">AI Recommendation<br/>Engine</span>
            </div>

            <ArrowRight className="w-5 h-5 text-slate-400" />

            {/* CRM/SAP + Field Data */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-12 rounded-lg bg-white border-2 border-green-300 flex items-center justify-center shadow-sm">
                <Server className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-slate-600 font-medium">CRM/SAP</span>
              <div className="w-16 h-12 rounded-lg bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                <FileText className="w-6 h-6 text-slate-600" />
              </div>
              <span className="text-xs text-slate-600 font-medium">Field Data</span>
            </div>

            <ArrowRight className="w-5 h-5 text-slate-400" />

            {/* Insights Dashboard */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-16 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                <LayoutDashboard className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs text-slate-600 mt-2 font-medium text-center">Insights<br/>Dashboard</span>
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
            Case Studies: <span className="font-semibold text-slate-700">Field Force Enablement</span> • <span className="font-semibold text-slate-700">Customer Lifecycle Intelligence</span>
          </span>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
