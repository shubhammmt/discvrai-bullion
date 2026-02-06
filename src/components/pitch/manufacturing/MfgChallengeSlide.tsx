import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Server } from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

interface MfgChallengeSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    systemLandscape: {
      title: string;
      systems: Array<{ category: string; examples: string }>;
      totalSystems: string;
    };
    challenges: Array<{ function: string; challenge: string; impact: string }>;
    coreIssue: string;
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgChallengeSlide: React.FC<MfgChallengeSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <MfgSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex-shrink-0"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold text-gray-900">{slide.headline}</h2>
          </div>
          <p className="text-lg text-gray-600">{slide.subheadline}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left: System Landscape */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-6 h-6 text-slate-600" />
              <h3 className="text-base font-bold text-gray-800">{slide.systemLandscape.title}</h3>
            </div>
            <div className="flex-1 space-y-3">
              {slide.systemLandscape.systems.map((system, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-slate-100">
                  <p className="text-base font-semibold text-gray-800">{system.category}</p>
                  <p className="text-sm text-gray-600 mt-1">{system.examples}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-red-50 rounded-lg p-4 border border-red-100">
              <p className="text-base font-bold text-red-600">{slide.systemLandscape.totalSystems}</p>
            </div>
          </motion.div>

          {/* Right: Challenges Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-8 flex flex-col"
          >
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex-1 flex flex-col">
              <div className="grid grid-cols-3 bg-slate-800 text-white text-base font-bold">
                <div className="p-4">Function</div>
                <div className="p-4">Challenge</div>
                <div className="p-4">Business Impact</div>
              </div>
              <div className="divide-y divide-slate-100 flex-1 flex flex-col">
                {slide.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="grid grid-cols-3 text-base hover:bg-slate-50 transition-colors flex-1"
                  >
                    <div className="p-4 font-semibold text-gray-800 flex items-center">{challenge.function}</div>
                    <div className="p-4 text-gray-600 flex items-center">{challenge.challenge}</div>
                    <div className="p-4 text-red-600 font-medium flex items-center">{challenge.impact}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Issue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 flex-shrink-0"
        >
          <p className="text-base text-gray-800 leading-relaxed">
            <span className="font-bold text-red-600">The Core Issue: </span>
            {slide.coreIssue}
          </p>
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
