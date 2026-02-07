import React from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle, TrendingUp, Award } from 'lucide-react';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';

interface MfgNewCaseStudySlideProps {
  slide: {
    headline: string;
    subheadline: string;
    clientProfile: {
      industry: string;
      revenue?: string;
      scale: string;
      systems: string;
    };
    challenges: string[];
    deliverables: Array<{
      name: string;
      description: string;
      impact: string;
    }>;
    overallImpact: string[];
  };
  slideNumber: number;
  totalSlides: number;
}

export const MfgNewCaseStudySlide: React.FC<MfgNewCaseStudySlideProps> = ({ slide, slideNumber, totalSlides }) => {
  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex-shrink-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{slide.headline}</h2>
              <p className="text-sm text-gray-600">{slide.subheadline}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left: Profile & Challenges */}
          <div className="col-span-4 flex flex-col gap-4">
            {/* Client Profile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6 text-slate-600" />
                <h3 className="text-lg font-bold text-gray-800">Client Profile</h3>
              </div>
              <div className="space-y-3">
                <p className="text-base"><span className="font-semibold text-gray-800">Industry:</span> <span className="text-gray-600">{slide.clientProfile.industry}</span></p>
                {slide.clientProfile.revenue && (
                  <p className="text-base"><span className="font-semibold text-gray-800">Revenue:</span> <span className="text-amber-600 font-bold">{slide.clientProfile.revenue}</span></p>
                )}
                <p className="text-base"><span className="font-semibold text-gray-800">Scale:</span> <span className="text-gray-600">{slide.clientProfile.scale}</span></p>
                <p className="text-base"><span className="font-semibold text-gray-800">Systems:</span> <span className="text-gray-600">{slide.clientProfile.systems}</span></p>
              </div>
            </motion.div>

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 border border-red-200 rounded-xl p-5 flex-1"
            >
              <h3 className="text-lg font-bold text-red-700 mb-4">Challenges</h3>
              <div className="space-y-3">
                {slide.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-base text-red-700">{challenge}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Deliverables */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-8 bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col"
          >
            <h3 className="text-lg font-bold text-emerald-700 mb-4">What We Delivered</h3>
            <div className="grid grid-cols-2 gap-4 flex-1">
              {slide.deliverables.map((deliverable, index) => (
                <div key={index} className="bg-white border border-emerald-100 rounded-lg p-4 flex flex-col">
                  <h4 className="text-base font-bold text-gray-900 mb-2">{deliverable.name}</h4>
                  <p className="text-sm text-gray-600 mb-3 flex-1">{deliverable.description}</p>
                  <p className="text-base text-emerald-600 font-semibold">→ {deliverable.impact}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Overall Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-4 flex-shrink-0"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Impact Delivered</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {slide.overallImpact.map((impact, index) => (
              <span key={index} className="bg-white/10 text-white text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                {impact}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
