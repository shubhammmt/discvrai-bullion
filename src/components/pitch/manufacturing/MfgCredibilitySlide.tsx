import React from 'react';
import { motion } from 'framer-motion';
import { Award, User, Building2, CheckCircle, Shield, Zap, Settings, Network } from 'lucide-react';
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
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3"
        >
          <h2 className="text-3xl font-bold text-slate-800">{slide.headline}</h2>
          <p className="text-lg text-slate-600">{slide.subheadline}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden">
          {/* Left: Founder Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 text-white"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{slide.founderProfile.name}</h3>
                <p className="text-amber-400 text-sm">{slide.founderProfile.title}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {slide.founderProfile.experience.map((exp, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-white/80">{exp}</p>
                </div>
              ))}
            </div>

            {/* Track Record */}
            <div className="pt-3 border-t border-white/20">
              <h4 className="text-xs font-semibold text-white/60 uppercase mb-2">Proven Track Record</h4>
              <div className="space-y-2">
                {slide.trackRecord.map((record, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-2">
                    <p className="text-xs font-semibold text-amber-400">{record.client}</p>
                    <p className="text-xs text-white/70">{record.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Capabilities & Scale */}
          <div className="col-span-7 flex flex-col gap-3">
            {/* Scale Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-emerald-50 border border-emerald-200 rounded-xl p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-semibold text-emerald-700">Scale Achieved</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {slide.scaleMetrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-lg px-2 py-1 border border-emerald-100">
                    <p className="text-xs text-emerald-700 font-medium">{metric}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Platform Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex-1"
            >
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-semibold text-blue-700">Platform Capabilities</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {slide.platformCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700">{capability}</p>
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
          className="mt-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3"
        >
          <p className="text-sm text-amber-800 italic leading-relaxed">
            "{slide.cxoPromise}"
          </p>
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
