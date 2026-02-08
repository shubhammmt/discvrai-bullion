import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Users, TrendingDown, RefreshCw, AlertTriangle, Heart, AlertCircle, Wrench, TrendingUp, ArrowRight } from 'lucide-react';

interface DalmiaCaseCustomerLifecycleSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseCustomerLifecycleSlide: React.FC<DalmiaCaseCustomerLifecycleSlideProps> = ({
  slideNumber,
  totalSlides
}) => {
  const problems = [
    'High dealer churn with no early warning',
    'No visibility into dealer health',
    'Reactive retention efforts',
    'Lost revenue from preventable churn'
  ];

  const built = [
    'AI churn prediction (30-day lead time)',
    'Dealer health scoring dashboard',
    'Automated at-risk alerts to sales team',
    'Personalized retention playbooks'
  ];

  const impacts = [
    { metric: 'Churn Prediction', value: '85% accuracy' },
    { metric: 'Dealer Retention', value: '+12%' },
    { metric: 'At-Risk Response', value: '3x faster' },
    { metric: 'Revenue Saved', value: '₹25 Cr/yr' }
  ];

  const lifecycleStages = [
    { label: 'Onboard', icon: Users, color: 'bg-blue-100 border-blue-300 text-blue-700' },
    { label: 'Grow', icon: TrendingUp, color: 'bg-green-100 border-green-300 text-green-700' },
    { label: 'At Risk', icon: AlertTriangle, color: 'bg-yellow-100 border-yellow-300 text-yellow-700' },
    { label: 'Churning', icon: TrendingDown, color: 'bg-red-100 border-red-300 text-red-700' },
    { label: 'Win Back', icon: RefreshCw, color: 'bg-purple-100 border-purple-300 text-purple-700' },
    { label: 'Loyal', icon: Heart, color: 'bg-pink-100 border-pink-300 text-pink-700' }
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
          Customer Lifecycle Intelligence
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
            Dealer Lifecycle Stages
          </h4>
          
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-2">
              {lifecycleStages.map((stage, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center ${stage.color}`}>
                      <stage.icon className="w-6 h-6 mb-1" />
                      <span className="text-xs font-medium">{stage.label}</span>
                    </div>
                  </div>
                  {i < lifecycleStages.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* AI Layer Below */}
          <div className="flex justify-center mt-4">
            <div className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-md">
              <span className="text-sm font-bold text-white">AI Churn Prediction Engine → Automated Alerts → Retention Playbooks</span>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
