import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { Building2, AlertTriangle, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

interface CaseStudyData {
  title: string;
  customerProfile: {
    industry: string;
    scale: string;
    complexity: string[];
    systems: string[];
  };
  problem: string[];
  transformation: string[];
  impact: string[];
  wireframe: {
    nodes: string[];
  };
}

interface DalmiaCaseStudySlideProps {
  slide: ManufacturingNewSlide & { caseStudy?: CaseStudyData };
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaCaseStudySlide: React.FC<DalmiaCaseStudySlideProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const caseStudy = slide.caseStudy;
  
  if (!caseStudy) {
    return (
      <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
        <div className="flex items-center justify-center h-full">
          <p className="text-slate-500">Case study data not found</p>
        </div>
      </MfgNewSlideLayout>
    );
  }

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col h-full">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-slate-900 mb-4"
        >
          {caseStudy.title}
        </motion.h1>

        {/* Customer Profile Card - TOP */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 grid grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Industry</p>
                <p className="text-xs font-medium text-slate-800">{caseStudy.customerProfile.industry}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Scale</p>
                <p className="text-xs font-medium text-slate-800">{caseStudy.customerProfile.scale}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Complexity</p>
                <div className="flex flex-wrap gap-1">
                  {caseStudy.customerProfile.complexity.map((item, i) => (
                    <span key={i} className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Systems</p>
                <div className="flex flex-wrap gap-1">
                  {caseStudy.customerProfile.systems.map((sys, i) => (
                    <span key={i} className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{sys}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three Column Layout - Problem | Transformation | Impact */}
        <div className="grid grid-cols-3 gap-4 mb-4 flex-1 min-h-0">
          {/* LEFT: Problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide">Problem</h3>
            </div>
            <ul className="space-y-2 flex-1">
              {caseStudy.problem.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-red-900">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CENTER: Transformation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wide">Transformation</h3>
            </div>
            <ul className="space-y-2 flex-1">
              {caseStudy.transformation.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-amber-900">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT: Impact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wide">Impact</h3>
            </div>
            <ul className="space-y-2 flex-1">
              {caseStudy.impact.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <span className="text-xs text-emerald-900">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* BOTTOM: Architecture Wireframe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900 rounded-lg p-4"
        >
          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-3">Architecture Flow</p>
          <div className="flex items-center justify-center gap-2">
            {caseStudy.wireframe.nodes.map((node, i) => (
              <React.Fragment key={i}>
                <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-center">
                  <span className="text-xs font-medium text-white">{node}</span>
                </div>
                {i < caseStudy.wireframe.nodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-amber-500 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
