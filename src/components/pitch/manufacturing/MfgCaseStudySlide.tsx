import React from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle, TrendingUp, Award } from 'lucide-react';
import { MfgSlideLayout } from './MfgSlideLayout';

interface MfgCaseStudySlideProps {
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

export const MfgCaseStudySlide: React.FC<MfgCaseStudySlideProps> = ({ slide, slideNumber, totalSlides }) => {
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
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{slide.headline}</h2>
              <p className="text-sm text-slate-600">{slide.subheadline}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden">
          {/* Left: Profile & Challenges */}
          <div className="col-span-4 flex flex-col gap-3">
            {/* Client Profile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-slate-600" />
                <h3 className="text-sm font-semibold text-slate-700">Client Profile</h3>
              </div>
              <div className="space-y-1 text-xs">
                <p><span className="font-medium text-slate-700">Industry:</span> <span className="text-slate-600">{slide.clientProfile.industry}</span></p>
                {slide.clientProfile.revenue && (
                  <p><span className="font-medium text-slate-700">Revenue:</span> <span className="text-amber-600 font-semibold">{slide.clientProfile.revenue}</span></p>
                )}
                <p><span className="font-medium text-slate-700">Scale:</span> <span className="text-slate-600">{slide.clientProfile.scale}</span></p>
                <p><span className="font-medium text-slate-700">Systems:</span> <span className="text-slate-600">{slide.clientProfile.systems}</span></p>
              </div>
            </motion.div>

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 border border-red-200 rounded-xl p-3 flex-1 overflow-auto"
            >
              <h3 className="text-sm font-semibold text-red-700 mb-2">Challenges</h3>
              <div className="space-y-1.5">
                {slide.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-1.5">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-red-700">{challenge}</p>
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
            className="col-span-8 bg-emerald-50 border border-emerald-200 rounded-xl p-3 overflow-auto"
          >
            <h3 className="text-sm font-semibold text-emerald-700 mb-2">What We Delivered</h3>
            <div className="grid grid-cols-2 gap-2">
              {slide.deliverables.map((deliverable, index) => (
                <div key={index} className="bg-white border border-emerald-100 rounded-lg p-2">
                  <h4 className="text-xs font-bold text-slate-800 mb-1">{deliverable.name}</h4>
                  <p className="text-xs text-slate-600 mb-1">{deliverable.description}</p>
                  <p className="text-xs text-emerald-600 font-medium">→ {deliverable.impact}</p>
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
          className="mt-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Impact Delivered</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {slide.overallImpact.map((impact, index) => (
              <span key={index} className="bg-white/10 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                {impact}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </MfgSlideLayout>
  );
};
