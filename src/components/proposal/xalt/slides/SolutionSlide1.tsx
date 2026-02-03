import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageCircle, ArrowRight } from 'lucide-react';

interface SolutionSlide1Props {
  slideNumber: number;
  totalSlides: number;
}

export const SolutionSlide1: React.FC<SolutionSlide1Props> = ({ slideNumber, totalSlides }) => {
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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            The Foundation: Deal + Investor Assistants
          </h1>
          <p className="text-lg text-slate-500">These two agents form the core of your AI operations</p>
        </motion.div>

        {/* Two Agent Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Deal Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-200">
                <FileText className="w-6 h-6 text-amber-700" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Deal Assistant</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">The Problem</p>
                <p className="text-sm text-slate-700">4-6 hours manual work per deal (PDFs → spreadsheets → website)</p>
              </div>

              <div className="flex items-center gap-2 text-amber-600">
                <ArrowRight className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">AI Solution</span>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">What It Does</p>
                <p className="text-sm text-slate-700">Reads deal documents, extracts key info, creates standardized deal object, highlights gaps</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-amber-200">
                <p className="text-xs font-semibold text-amber-700 uppercase mb-1">New Way</p>
                <p className="text-sm font-medium text-slate-900">You review and approve in 15 minutes (vs. 4-6 hours)</p>
              </div>

              <div className="pt-2 border-t border-amber-200">
                <p className="text-sm font-bold text-slate-900">Impact: Process 10-20x more deals with same team</p>
              </div>
            </div>
          </motion.div>

          {/* Investor Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-200">
                <MessageCircle className="w-6 h-6 text-amber-700" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Investor Assistant</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">The Problem</p>
                <p className="text-sm text-slate-700">RMs repeatedly answer same FAQs, high-value time wasted</p>
              </div>

              <div className="flex items-center gap-2 text-amber-600">
                <ArrowRight className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">AI Solution</span>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">What It Does</p>
                <p className="text-sm text-slate-700">Answers investor questions 24/7 via website/chat using only approved content</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-amber-200">
                <p className="text-xs font-semibold text-amber-700 uppercase mb-1">New Way</p>
                <p className="text-sm font-medium text-slate-900">Investor asks → AI answers instantly (with disclaimers)</p>
              </div>

              <div className="pt-2 border-t border-amber-200">
                <p className="text-sm font-bold text-slate-900">Impact: 60-70% fewer FAQs to RMs, faster decisions</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p 
          className="text-sm text-slate-400 mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          These two agents are recommended as your foundation—start here.
        </motion.p>
      </div>
    </div>
  );
};
