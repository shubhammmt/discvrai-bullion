import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Shield, Rocket } from 'lucide-react';

interface ROISlideProps {
  slideNumber: number;
  totalSlides: number;
}

export const ROISlide: React.FC<ROISlideProps> = ({ slideNumber, totalSlides }) => {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Each path pays for itself, then unlocks <span className="text-amber-600">10-20x growth</span>
          </h1>
        </motion.div>

        {/* ROI Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {/* Path 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-amber-50 rounded-2xl p-8 border-2 border-amber-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-200 rounded-xl">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Foundation Only</h3>
                <span className="text-sm text-amber-600">Path 1 - Recommended</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Investment</span>
                <span className="text-2xl font-bold text-slate-900">₹28L Year 1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Time Saved</span>
                <span className="text-lg font-semibold text-slate-900">₹16.5L/year</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-amber-200">
                <span className="text-slate-700 font-medium">Payback Period</span>
                <span className="text-2xl font-bold text-amber-600">1.9 years</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-xl">
              <p className="text-sm text-slate-600">
                <span className="font-semibold">Strategic Value:</span> Process 10x more deals, 24/7 investor support
              </p>
            </div>
          </motion.div>

          {/* Path 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-200 rounded-xl">
                <Shield className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Foundation + Compliance</h3>
                <span className="text-sm text-slate-500">Path 2 - For DFSA</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Investment</span>
                <span className="text-2xl font-bold text-slate-900">₹40L Year 1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Time Saved + Compliance</span>
                <span className="text-lg font-semibold text-slate-900">₹16.5L+ /year</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <span className="text-slate-700 font-medium">Payback Period</span>
                <span className="text-2xl font-bold text-slate-600">&gt; 2 years</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-xl">
              <p className="text-sm text-slate-600">
                <span className="font-semibold">Strategic Value:</span> Scale safely with DFSA compliance built-in
              </p>
            </div>
          </motion.div>
        </div>

        {/* The Real Prize */}
        <motion.div 
          className="mt-8 bg-slate-900 rounded-2xl p-6 flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Rocket className="w-10 h-10 text-amber-400 flex-shrink-0" />
          <div>
            <h4 className="text-white font-bold text-lg mb-1">The Real Prize</h4>
            <p className="text-slate-300">
              Scale from 10 deals to 100+ deals, from dozens to hundreds of investors—all with the same lean team
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
