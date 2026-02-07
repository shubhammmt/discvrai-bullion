import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Brain, Clock, CheckCircle } from 'lucide-react';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';

interface MfgNewPlatformSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    corePrinciple: string;
    tier1: {
      name: string;
      label: string;
      timeline: string;
      features: string[];
      value: string[];
    };
    tier2: {
      name: string;
      label: string;
      timeline: string;
      features: string[];
      value: string[];
    };
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgNewPlatformSlide: React.FC<MfgNewPlatformSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex-shrink-0"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{slide.headline}</h2>
          <p className="text-lg text-gray-600">{slide.subheadline}</p>
        </motion.div>

        {/* Core Principle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 text-white rounded-lg px-5 py-3 mb-5 flex-shrink-0"
        >
          <p className="text-base font-medium">{slide.corePrinciple}</p>
        </motion.div>

        {/* Two Tiers */}
        <div className="flex-1 grid grid-cols-2 gap-5 min-h-0">
          {/* Tier 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-5 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{slide.tier1.name}</h3>
                  <p className="text-sm text-gray-500">{slide.tier1.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-200 rounded-full px-3 py-1.5">
                <Clock className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-semibold text-slate-600">{slide.tier1.timeline}</span>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              {slide.tier1.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 flex-shrink-0">
              <p className="text-sm font-bold text-gray-800 mb-3">Value Delivered:</p>
              <div className="space-y-2">
                {slide.tier1.value.slice(0, 3).map((value, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-base text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tier 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{slide.tier2.name}</h3>
                  <p className="text-sm text-amber-600">{slide.tier2.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-amber-200 rounded-full px-3 py-1.5">
                <Clock className="w-4 h-4 text-amber-700" />
                <span className="text-sm font-semibold text-amber-700">{slide.tier2.timeline}</span>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              {slide.tier2.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-amber-200 flex-shrink-0">
              <p className="text-sm font-bold text-gray-800 mb-3">Value Delivered:</p>
              <div className="space-y-2">
                {slide.tier2.value.slice(0, 3).map((value, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-base text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
