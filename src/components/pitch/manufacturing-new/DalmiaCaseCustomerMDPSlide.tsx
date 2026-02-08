import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Users, Database, Fingerprint, UserCheck, AlertCircle, Wrench, TrendingUp, ArrowRight, ArrowDown } from 'lucide-react';

interface DalmiaCaseCustomerMDPSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseCustomerMDPSlide: React.FC<DalmiaCaseCustomerMDPSlideProps> = ({
  slideNumber,
  totalSlides
}) => {
  const problems = [
    'Same dealer exists in 4 different systems',
    'No single view of customer relationships',
    'Duplicate marketing campaigns',
    'Inaccurate loyalty tracking'
  ];

  const built = [
    'Golden customer record across all systems',
    'AI-powered identity resolution',
    'Real-time sync to downstream apps',
    'Customer 360 dashboard'
  ];

  const impacts = [
    { metric: 'Duplicate Records', value: '-85%' },
    { metric: 'Data Quality', value: '98%' },
    { metric: 'Campaign Efficiency', value: '+40%' },
    { metric: 'Loyalty Accuracy', value: '99%' }
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
          Customer Master Data Platform
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
            <div className="flex items-center gap-6">
              {/* Source Systems */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-slate-500 mb-1">Source Systems</span>
                <div className="flex flex-col gap-2">
                  {['SAP', 'CRM', 'Orders', 'Loyalty'].map((sys, i) => (
                    <div key={i} className="w-20 h-8 rounded bg-white border border-slate-300 flex items-center justify-center">
                      <span className="text-xs text-slate-600">{sys}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-slate-400" />

              {/* Identity Resolution */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-20 rounded-xl bg-gradient-to-b from-purple-500 to-purple-600 flex flex-col items-center justify-center shadow-md">
                  <Fingerprint className="w-6 h-6 text-white mb-1" />
                  <span className="text-xs font-bold text-white text-center">AI Identity<br/>Resolution</span>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-slate-400" />

              {/* Golden Record */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-20 rounded-xl bg-gradient-to-b from-amber-500 to-amber-600 flex flex-col items-center justify-center shadow-md">
                  <UserCheck className="w-6 h-6 text-white mb-1" />
                  <span className="text-xs font-bold text-white text-center">Golden<br/>Customer Record</span>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-slate-400" />

              {/* Downstream Apps */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-slate-500 mb-1">Downstream</span>
                <div className="flex flex-col gap-2">
                  {['Sales App', 'Marketing', 'Loyalty', 'Analytics'].map((app, i) => (
                    <div key={i} className="w-20 h-8 rounded bg-teal-50 border border-teal-300 flex items-center justify-center">
                      <span className="text-xs text-teal-700">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
