import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Package, QrCode, ScanLine, Shield, AlertTriangle, CheckCircle, AlertCircle, Wrench, TrendingUp, ArrowRight, ArrowDown } from 'lucide-react';

interface DalmiaCaseQRAuthSlideProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseQRAuthSlide: React.FC<DalmiaCaseQRAuthSlideProps> = ({
  slideNumber,
  totalSlides
}) => {
  const problems = [
    'Counterfeit products damaging brand',
    'No visibility into product journey',
    'Grey market channel leakage',
    'Manual compliance audits'
  ];

  const built = [
    'Unique QR code per bag/batch',
    'Real-time scan tracking system',
    'Blockchain-backed authenticity',
    'Geo-intelligence for anomaly detection'
  ];

  const impacts = [
    { metric: 'Product Traceability', value: '100%' },
    { metric: 'Grey Market', value: '-40%' },
    { metric: 'Brand Trust Score', value: '+25%' },
    { metric: 'Compliance Automation', value: '90%' }
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
            <span className="text-amber-600 font-medium">Theme 4: Channel Governance</span> → Case Study
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          QR Product Authentication
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
            {/* Product Flow */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                  <Package className="w-6 h-6 text-slate-600" />
                </div>
                <span className="text-xs text-slate-600 mt-1 font-medium">Product</span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400" />

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-white border-2 border-blue-300 flex items-center justify-center shadow-sm">
                  <QrCode className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-slate-600 mt-1 font-medium">Unique QR</span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400" />

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-white border-2 border-green-300 flex items-center justify-center shadow-sm">
                  <ScanLine className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-slate-600 mt-1 font-medium">Scan Event</span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400" />

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-slate-700 to-slate-800 flex items-center justify-center shadow-md">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-slate-600 mt-1 font-medium">Blockchain</span>
              </div>
            </div>

            {/* Connector */}
            <ArrowDown className="w-5 h-5 text-slate-400" />

            {/* Outputs */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-14 rounded-xl bg-green-100 border border-green-300 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-slate-600 mt-1 font-medium">Verified</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-14 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-xs text-slate-600 mt-1 font-medium">Counterfeit</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-14 rounded-xl bg-yellow-100 border border-yellow-300 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-xs text-slate-600 mt-1 font-medium">Grey Market</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
