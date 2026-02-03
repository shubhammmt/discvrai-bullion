import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Shield, ArrowRight, Clock } from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

interface MfgImpactSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    operationalMetrics: Array<{
      metric: string;
      current: string;
      target: string;
      impact: string;
    }>;
    businessValue: {
      revenue: string[];
      cost: string[];
      risk: string[];
    };
    roiTimeline: Array<{
      period: string;
      milestone: string;
    }>;
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgImpactSlide: React.FC<MfgImpactSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <MfgSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <div>
              <h2 className="text-3xl font-bold text-slate-800">{slide.headline}</h2>
              <p className="text-lg text-slate-600">{slide.subheadline}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden">
          {/* Left: Operational Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <div className="bg-slate-800 text-white p-2">
              <h3 className="text-sm font-semibold">Operational Efficiency</h3>
            </div>
            <div className="divide-y divide-slate-100 overflow-auto max-h-[200px]">
              {slide.operationalMetrics.map((metric, index) => (
                <div key={index} className="grid grid-cols-4 text-xs p-2 hover:bg-slate-50">
                  <div className="font-medium text-slate-700">{metric.metric}</div>
                  <div className="text-red-500">{metric.current}</div>
                  <div className="text-emerald-600">{metric.target}</div>
                  <div className="text-amber-600 font-semibold">{metric.impact}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Business Value */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5 space-y-2"
          >
            {/* Revenue */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-semibold text-emerald-700">Revenue Impact</h4>
              </div>
              <div className="space-y-1">
                {slide.businessValue.revenue.slice(0, 2).map((item, index) => (
                  <p key={index} className="text-xs text-emerald-700">✓ {item}</p>
                ))}
              </div>
            </div>

            {/* Cost */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-2">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-semibold text-blue-700">Cost Impact</h4>
              </div>
              <div className="space-y-1">
                {slide.businessValue.cost.slice(0, 2).map((item, index) => (
                  <p key={index} className="text-xs text-blue-700">✓ {item}</p>
                ))}
              </div>
            </div>

            {/* Risk */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-2">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-purple-600" />
                <h4 className="text-xs font-semibold text-purple-700">Risk Mitigation</h4>
              </div>
              <div className="space-y-1">
                {slide.businessValue.risk.slice(0, 2).map((item, index) => (
                  <p key={index} className="text-xs text-purple-700">✓ {item}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ROI Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-semibold text-amber-700">ROI Timeline</h3>
          </div>
          <div className="flex items-center justify-between">
            {slide.roiTimeline.map((item, index) => (
              <React.Fragment key={index}>
                <div className="text-center">
                  <p className="text-xs font-bold text-amber-700">{item.period}</p>
                  <p className="text-xs text-amber-600">{item.milestone}</p>
                </div>
                {index < slide.roiTimeline.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
