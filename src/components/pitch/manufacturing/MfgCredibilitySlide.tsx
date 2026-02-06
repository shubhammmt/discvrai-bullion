import React from 'react';
import { motion } from 'framer-motion';
import { Award, User, CheckCircle, Settings } from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

interface MfgCredibilitySlideProps {
  slide: {
    headline: string;
    subheadline: string;
    founderProfile: {
      name: string;
      title: string;
      experience: string[];
    };
    trackRecord: Array<{
      client: string;
      detail: string;
    }>;
    scaleMetrics: string[];
    platformCapabilities: string[];
    cxoPromise: string;
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgCredibilitySlide: React.FC<MfgCredibilitySlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <MfgSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex-shrink-0"
        >
          <h2 className="text-3xl font-bold text-gray-900">{slide.headline}</h2>
          <p className="text-lg text-gray-600">{slide.subheadline}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left: Founder Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 text-white flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4 flex-shrink-0">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl">{slide.founderProfile.name}</h3>
                <p className="text-amber-400 text-base">{slide.founderProfile.title}</p>
              </div>
            </div>
            <div className="space-y-3 mb-5 flex-1">
              {slide.founderProfile.experience.map((exp, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-base text-white/90">{exp}</p>
                </div>
              ))}
            </div>

            {/* Track Record */}
            <div className="pt-4 border-t border-white/20 flex-shrink-0">
              <h4 className="text-sm font-bold text-white/60 uppercase mb-3">Proven Track Record</h4>
              <div className="space-y-3">
                {slide.trackRecord.map((record, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3">
                    <p className="text-base font-bold text-amber-400">{record.client}</p>
                    <p className="text-sm text-white/80">{record.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Capabilities & Scale */}
          <div className="col-span-7 flex flex-col gap-4">
            {/* Scale Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-emerald-50 border border-emerald-200 rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-emerald-600" />
                <h4 className="text-base font-bold text-emerald-700">Scale Achieved</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {slide.scaleMetrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-lg px-4 py-3 border border-emerald-100">
                    <p className="text-base text-emerald-700 font-medium">{metric}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Platform Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
                <h4 className="text-base font-bold text-blue-700">Platform Capabilities</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {slide.platformCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-blue-700">{capability}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* CXO Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex-shrink-0"
        >
          <p className="text-base text-amber-800 italic leading-relaxed">
            "{slide.cxoPromise}"
          </p>
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
