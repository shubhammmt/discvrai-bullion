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
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex-shrink-0"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{slide.headline}</h2>
              <p className="text-lg text-gray-600">{slide.subheadline}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left: Operational Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col"
          >
            <div className="bg-slate-800 text-white p-3 flex-shrink-0">
              <h3 className="text-base font-bold">Operational Efficiency</h3>
            </div>
            <div className="divide-y divide-slate-100 flex-1 flex flex-col">
              {slide.operationalMetrics.map((metric, index) => (
                <div key={index} className="grid grid-cols-4 text-base p-3 hover:bg-slate-50 flex-1 items-center">
                  <div className="font-semibold text-gray-800">{metric.metric}</div>
                  <div className="text-red-500">{metric.current}</div>
                  <div className="text-emerald-600 font-medium">{metric.target}</div>
                  <div className="text-amber-600 font-bold">{metric.impact}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Business Value */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5 flex flex-col gap-3"
          >
            {/* Revenue */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-emerald-700">Revenue Impact</h4>
              </div>
              <div className="space-y-2">
                {slide.businessValue.revenue.slice(0, 2).map((item, index) => (
                  <p key={index} className="text-base text-emerald-700">✓ {item}</p>
                ))}
              </div>
            </div>

            {/* Cost */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-bold text-blue-700">Cost Impact</h4>
              </div>
              <div className="space-y-2">
                {slide.businessValue.cost.slice(0, 2).map((item, index) => (
                  <p key={index} className="text-base text-blue-700">✓ {item}</p>
                ))}
              </div>
            </div>

            {/* Risk */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <h4 className="text-sm font-bold text-purple-700">Risk Mitigation</h4>
              </div>
              <div className="space-y-2">
                {slide.businessValue.risk.slice(0, 2).map((item, index) => (
                  <p key={index} className="text-base text-purple-700">✓ {item}</p>
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
          className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex-shrink-0"
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-amber-700">ROI Timeline</h3>
          </div>
          <div className="flex items-center justify-between">
            {slide.roiTimeline.map((item, index) => (
              <React.Fragment key={index}>
                <div className="text-center">
                  <p className="text-base font-bold text-amber-700">{item.period}</p>
                  <p className="text-sm text-amber-600">{item.milestone}</p>
                </div>
                {index < slide.roiTimeline.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-amber-400" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
