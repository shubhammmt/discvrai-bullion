import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, ArrowRight } from 'lucide-react';

interface SolutionSlide2Props {
  slideNumber: number;
  totalSlides: number;
}

export const SolutionSlide2: React.FC<SolutionSlide2Props> = ({ slideNumber, totalSlides }) => {
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
            Scale Further: RM + Compliance Assistants
          </h1>
          <p className="text-lg text-slate-500">Add these when you're ready to expand operations</p>
        </motion.div>

        {/* Two Agent Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* RM Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-slate-200">
                <Users className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">RM Assistant</h2>
                <span className="text-xs text-slate-500">For Dubai Team (30 RMs)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">The Problem</p>
                <p className="text-sm text-slate-700">RMs spend 60% time on admin (briefs, emails, data entry)</p>
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <ArrowRight className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">AI Solution</span>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">What It Does</p>
                <p className="text-sm text-slate-700">Prepares call briefs, drafts outreach, prioritizes investors, summarizes meetings</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="text-xs font-semibold text-slate-600 uppercase mb-1">New Way</p>
                <p className="text-sm font-medium text-slate-900">RMs review AI outputs, focus on relationships and closing</p>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <p className="text-sm font-bold text-slate-900">Impact: 60% admin → 20%, 15-20% conversion uplift</p>
              </div>
            </div>
          </motion.div>

          {/* Compliance Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-slate-200">
                <Shield className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Compliance Assistant</h2>
                <span className="text-xs text-slate-500">Optional (DFSA Regulated)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">The Problem</p>
                <p className="text-sm text-slate-700">Manual eligibility checks, risk of errors, no audit trails</p>
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <ArrowRight className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">AI Solution</span>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">What It Does</p>
                <p className="text-sm text-slate-700">Checks eligibility before showing deals, reviews content, creates audit trails</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="text-xs font-semibold text-slate-600 uppercase mb-1">New Way</p>
                <p className="text-sm font-medium text-slate-900">Compliance happens automatically, one-click audit reports</p>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <p className="text-sm font-bold text-slate-900">Impact: Zero violations, audit-ready, scales automatically</p>
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
          Add these agents when you're ready—no lock-in, expand anytime.
        </motion.p>
      </div>
    </div>
  );
};
