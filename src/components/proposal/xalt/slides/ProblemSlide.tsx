import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, ArrowRight } from 'lucide-react';

interface ProblemSlideProps {
  slideNumber: number;
  totalSlides: number;
}

export const ProblemSlide: React.FC<ProblemSlideProps> = ({ slideNumber, totalSlides }) => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your bottleneck isn't demand—<br />
            <span className="text-amber-600">it's bandwidth</span>
          </h1>
        </motion.div>

        {/* Before/After Visual */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mt-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Today */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-slate-600" />
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Today</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">10 Deals</div>
            <p className="text-slate-600">Lean team, every new deal adds friction</p>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <ArrowRight className="w-12 h-12 text-amber-500" />
          </div>

          {/* Goal */}
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-amber-600" />
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wide">Goal</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">100+ Deals</div>
            <p className="text-slate-600">Same lean team, zero friction</p>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div 
          className="mt-12 bg-slate-900 rounded-2xl p-8 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-white italic">
            "The only way I can not have major attrition headaches is if the team is lean. 
            Hence, automation is a good idea."
          </p>
          <p className="text-amber-400 mt-3 font-medium">— Niraj, Founder</p>
        </motion.div>
      </div>
    </div>
  );
};
