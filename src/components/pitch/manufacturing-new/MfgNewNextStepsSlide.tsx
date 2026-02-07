import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Target, Rocket } from 'lucide-react';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';

interface MfgNewNextStepsSlideProps {
  slide: {
    headline: string;
    subheadline: string;
    steps: Array<{
      title: string;
      details: string[];
    }>;
    pocCriteria: string[];
    postPocPath: string[];
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgNewNextStepsSlide: React.FC<MfgNewNextStepsSlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex-shrink-0"
        >
          <div className="flex items-center gap-3">
            <Rocket className="w-8 h-8 text-amber-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{slide.headline}</h2>
              <p className="text-lg text-gray-600">{slide.subheadline}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-5">
          {/* Left: Steps */}
          <div className="col-span-7 flex flex-col gap-4">
            {slide.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-amber-300 transition-colors flex-1"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                </div>
                <div className="ml-14 space-y-2">
                  {step.details.map((detail, detIndex) => (
                    <div key={detIndex} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-base text-gray-700">{detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: PoC Criteria & Post-PoC */}
          <div className="col-span-5 flex flex-col gap-4">
            {/* PoC Criteria */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-emerald-600" />
                <h3 className="font-bold text-emerald-700 text-lg">PoC Success Criteria</h3>
              </div>
              <div className="space-y-3">
                {slide.pocCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-emerald-700">{criteria}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Post-PoC Path */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-800 rounded-xl p-5 flex-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-6 h-6 text-amber-400" />
                <h3 className="font-bold text-white text-lg">Post-PoC Path</h3>
              </div>
              <div className="space-y-3">
                {slide.postPocPath.map((path, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm text-amber-400 font-bold">{index + 1}</span>
                    </div>
                    <p className="text-base text-white/90">{path}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MfgNewSlideLayout>
  );
};
