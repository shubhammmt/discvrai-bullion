import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Brain, ArrowRight, CheckCircle } from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

interface MfgUseCaseSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    aiEnabled: boolean;
    problem: {
      title: string;
      points: string[];
    };
    solution: {
      title: string;
      categories: Array<{
        name: string;
        points: string[];
      }>;
    };
    impact: Array<{
      metric: string;
      before: string;
      after: string;
    }>;
    scale: string[];
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgUseCaseSlide: React.FC<MfgUseCaseSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <MfgSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3"
        >
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-slate-800">{slide.headline}</h2>
            {slide.aiEnabled && (
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Brain className="w-3 h-3" />
                AI-Enabled
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600">{slide.subheadline}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left: Problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-3 bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col"
          >
            <h3 className="text-base font-bold text-red-700 mb-3">{slide.problem.title}</h3>
            <div className="flex-1 space-y-3">
              {slide.problem.points.map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Middle: Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col"
          >
            <h3 className="text-base font-bold text-emerald-700 mb-3">{slide.solution.title}</h3>
            <div className="flex-1 space-y-4">
              {slide.solution.categories.slice(0, 3).map((category, index) => (
                <div key={index}>
                  <h4 className="text-sm font-semibold text-emerald-800 mb-2">{category.name}</h4>
                  <div className="grid grid-cols-1 gap-1.5">
                    {category.points.slice(0, 2).map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-emerald-700">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Impact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-3 flex flex-col"
          >
            <div className="bg-slate-800 text-white rounded-xl p-4 flex-1 flex flex-col">
              <h3 className="text-base font-bold mb-3">Impact</h3>
              <div className="flex-1 space-y-3">
                {slide.impact.slice(0, 4).map((item, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3 flex-1">
                    <p className="text-sm text-white/70 mb-1">{item.metric}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-red-300 line-through">{item.before}</span>
                      <ArrowRight className="w-4 h-4 text-white/50" />
                      <span className="text-emerald-300 font-semibold">{item.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex items-center gap-3 flex-wrap"
        >
          {slide.scale.map((item, index) => (
            <span key={index} className="bg-amber-100 text-amber-700 text-sm px-3 py-2 rounded-full">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
