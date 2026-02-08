import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { Brain, TrendingUp, Users, Zap } from 'lucide-react';

interface DalmiaIndustryShiftSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaIndustryShiftSlide: React.FC<DalmiaIndustryShiftSlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const shifts = [
    {
      icon: Brain,
      from: 'Operational Digitization',
      to: 'AI-Driven Commercial Intelligence',
      insight: 'Industry leaders moving from ERP optimization to predictive commercial platforms'
    },
    {
      icon: TrendingUp,
      from: 'License-Based Software',
      to: 'Outcome-Based Pricing',
      insight: 'BCG: 40% of B2B software shifting to usage/outcome models by 2027'
    },
    {
      icon: Users,
      from: 'Manual Sales Processes',
      to: 'AI Agents & Copilots',
      insight: 'McKinsey: AI agents can automate 60% of sales planning activities'
    },
    {
      icon: Zap,
      from: 'Reactive Planning',
      to: 'Predictive Demand Sensing',
      insight: 'Real-time signals replacing monthly forecasting cycles'
    }
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 px-8 py-4">
        {/* Header */}
        <div className="mb-6">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
            Industry Shift
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {slide.headline}
          </h2>
        </div>

        {/* Shift Cards */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {shifts.map((shift, index) => {
            const IconComponent = shift.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">From</div>
                    <div className="text-sm font-medium text-slate-600">{shift.from}</div>
                  </div>
                  <div className="text-blue-500 font-bold">→</div>
                  <div className="flex-1">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">To</div>
                    <div className="text-sm font-semibold text-slate-900">{shift.to}</div>
                  </div>
                </div>
                
                <div className="mt-auto pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500 italic">{shift.insight}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-blue-600">The window is now.</span> Early movers will define industry benchmarks.
          </p>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
