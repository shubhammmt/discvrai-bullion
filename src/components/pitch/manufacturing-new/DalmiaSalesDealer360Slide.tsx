import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Smartphone, Bot, Calendar, Package, AlertTriangle, MapPin, Database, FileText, ShoppingCart, Gift, ClipboardList, Globe, Users, CreditCard, TrendingUp, ArrowRight } from 'lucide-react';

interface DalmiaSalesDealer360SlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaSalesDealer360Slide: React.FC<DalmiaSalesDealer360SlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const salesCapabilities = [
    { icon: Calendar, label: 'Visit prioritization', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { icon: Package, label: 'Next best product', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { icon: AlertTriangle, label: 'Churn alerts', color: 'text-red-600 bg-red-50 border-red-200' },
    { icon: MapPin, label: 'Territory optimization', color: 'text-teal-600 bg-teal-50 border-teal-200' }
  ];

  const dataSources = [
    { icon: FileText, label: 'SAP' },
    { icon: ShoppingCart, label: 'Orders' },
    { icon: Gift, label: 'Loyalty' },
    { icon: ClipboardList, label: 'Field notes' },
    { icon: Globe, label: 'Market data' }
  ];

  const outputs = [
    { icon: Users, label: 'Segmentation' },
    { icon: CreditCard, label: 'Credit scoring' },
    { icon: TrendingUp, label: 'Growth scoring' }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-3"
        >
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Sales & Data Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-slate-900 mb-6"
        >
          {slide.headline}
        </motion.h2>

        {/* Two-Column Layout */}
        <div className="flex-1 flex gap-8 min-h-0">
          {/* Left: Sales Copilot */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">SM@RT-D → AI Sales Copilot</h3>
            
            {/* Copilot Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-center justify-center mb-4"
            >
              <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                <div className="relative">
                  <Smartphone className="w-12 h-12 text-slate-400" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-base font-bold text-slate-800">AI Copilot</span>
                  <p className="text-xs text-teal-600 font-medium">Intelligent sales assistant</p>
                </div>
              </div>
            </motion.div>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {salesCapabilities.map((cap, index) => {
                const IconComponent = cap.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.08, duration: 0.3 }}
                    className={`flex items-center gap-2 p-3 rounded-lg border ${cap.color}`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    <span className="text-xs font-medium text-slate-800">{cap.label}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Sales Impact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center"
            >
              <span className="text-lg font-bold text-emerald-700">8–15%</span>
              <span className="text-xs text-slate-600 ml-2">productivity uplift</span>
            </motion.div>
          </div>

          {/* Right: Dealer 360 */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Dealer 360 Platform</h3>
            
            {/* Hub Diagram - Compact */}
            <div className="flex items-center justify-center gap-3 flex-1">
              {/* Data Sources */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="space-y-1"
              >
                {dataSources.map((source, index) => {
                  const IconComponent = source.icon;
                  return (
                    <div key={index} className="flex items-center gap-1 px-2 py-1 bg-slate-50 rounded text-xs border border-slate-200">
                      <IconComponent className="w-3 h-3 text-slate-500" />
                      <span className="text-slate-600">{source.label}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Arrows */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="flex flex-col gap-1"
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <ArrowRight key={i} className="w-3 h-3 text-slate-300" />
                ))}
              </motion.div>

              {/* Central Hub */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex flex-col items-center justify-center shadow-md"
              >
                <Database className="w-6 h-6 text-white mb-1" />
                <span className="text-white font-bold text-[10px] text-center">Dealer 360</span>
              </motion.div>

              {/* Arrows */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="flex flex-col gap-3"
              >
                {[0, 1, 2].map((i) => (
                  <ArrowRight key={i} className="w-3 h-3 text-slate-300" />
                ))}
              </motion.div>

              {/* Outputs */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75, duration: 0.4 }}
                className="space-y-1"
              >
                {outputs.map((output, index) => {
                  const IconComponent = output.icon;
                  return (
                    <div key={index} className="flex items-center gap-1 px-2 py-1 bg-teal-50 rounded text-xs border border-teal-200">
                      <IconComponent className="w-3 h-3 text-teal-600" />
                      <span className="text-teal-700 font-medium">{output.label}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Combined Impact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="mt-4 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="text-xs font-medium text-slate-600">Combined Value:</span>
            <span className="text-base font-bold text-emerald-700">{slide.dealerImpact}</span>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
