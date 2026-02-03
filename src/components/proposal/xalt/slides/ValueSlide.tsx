import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Rocket, Clock, ShieldCheck } from 'lucide-react';

interface ValueSlideProps {
  slideNumber: number;
  totalSlides: number;
}

export const ValueSlide: React.FC<ValueSlideProps> = ({ slideNumber, totalSlides }) => {
  return (
    <div className="h-screen w-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-12 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-400">XALT × DiscvrAI</span>
          <span className="text-sm text-slate-400">{slideNumber}/{totalSlides}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-12 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Revenue Growth, Not Just Cost Savings
          </h1>
          <p className="text-lg text-slate-500 mb-8">Value-at-Stake — The Strategic Prize</p>
        </motion.div>

        {/* Value Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Primary Value */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-200 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-700" />
              </div>
              <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Primary Value</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Revenue Uplift</h3>
            <div className="space-y-2 text-slate-700">
              <p><strong className="text-amber-700">15–20% conversion uplift</strong> → drives AUM growth</p>
              <p className="text-sm">10% → 12% conversion × ₹100 cr AUM × 1% fee = <strong>₹2L/year</strong></p>
            </div>
          </motion.div>

          {/* Scale Enablement */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-900 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500 rounded-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-amber-400 uppercase tracking-wide">Strategic Value</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Scale Enablement</h3>
            <div className="space-y-2 text-slate-300">
              <p>Enable <strong className="text-white">10–20x growth</strong> without headcount increase</p>
              <p className="text-sm">At 10x scale: 100 deals/year = <strong className="text-amber-400">₹B/year</strong> (new revenue)</p>
            </div>
          </motion.div>

          {/* Cost Savings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-50 rounded-xl p-5 border border-slate-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Secondary</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Cost Savings</h3>
            <p className="text-slate-600">Free up ~<strong>70 hours/month</strong> (≈ 2 FTE) = <strong className="text-slate-900">₹24L/year</strong></p>
          </motion.div>

          {/* Risk Reduction */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-slate-50 rounded-xl p-5 border border-slate-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Risk</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Risk Reduction</h3>
            <p className="text-slate-600">Automated guardrails and audit trails reduce operational and compliance risk</p>
          </motion.div>
        </div>

        {/* Year 1 Summary */}
        <motion.div 
          className="bg-amber-100 rounded-xl p-5 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div>
            <span className="text-slate-700 font-medium">Year 1 Value Creation:</span>
            <span className="text-slate-600 ml-2">Revenue uplift (₹2L) + Cost savings (₹24L) =</span>
            <span className="text-amber-700 font-bold ml-2">₹26L/year</span>
          </div>
          <div className="text-right">
            <span className="text-slate-600">Strategic Value:</span>
            <span className="text-amber-700 font-bold ml-2">₹B-C in future revenue</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
