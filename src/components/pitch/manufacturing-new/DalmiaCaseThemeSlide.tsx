import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { 
  Building2, 
  Users, 
  Database, 
  ArrowRight,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

interface CustomerProfile {
  industry: string;
  revenue: string;
  scale: string[];
  systems: string[];
}

interface CaseThemeData {
  caseStudyTitle: string;
  sectionLabel: string;
  customerProfile: CustomerProfile;
  problem: string[];
  transformation: string[];
  impact: string[];
  wireframe: {
    nodes: string[];
    flow: string;
  };
}

interface DalmiaCaseThemeSlideProps {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
  themeData: CaseThemeData;
  themeIcon: LucideIcon;
  themeColor: 'blue' | 'teal' | 'purple' | 'amber' | 'emerald';
}

const colorMap = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', accent: 'bg-blue-500' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', accent: 'bg-teal-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', accent: 'bg-purple-500' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: 'bg-amber-500' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', accent: 'bg-emerald-500' }
};

export const DalmiaCaseThemeSlide: React.FC<DalmiaCaseThemeSlideProps> = ({
  slide,
  slideNumber,
  totalSlides,
  themeData,
  themeIcon: ThemeIcon,
  themeColor
}) => {
  const colors = colorMap[themeColor];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 px-6 py-3">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${colors.text}`}>
              {themeData.sectionLabel}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {slide.headline}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{themeData.caseStudyTitle}</p>
          </div>
          
          {/* Customer Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 max-w-xs"
          >
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-slate-600" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Customer Profile</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
              <div>
                <span className="text-slate-500">Industry:</span>
                <span className="ml-1 font-medium text-slate-700">{themeData.customerProfile.industry}</span>
              </div>
              <div>
                <span className="text-slate-500">Revenue:</span>
                <span className="ml-1 font-medium text-slate-700">{themeData.customerProfile.revenue}</span>
              </div>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {themeData.customerProfile.scale.slice(0, 2).map((item, i) => (
                <span key={i} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3-Column Layout: Problem | Transformation | Impact */}
        <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
          {/* Problem Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 text-xs font-bold">!</span>
              </div>
              <h3 className="text-sm font-bold text-red-700 uppercase tracking-wide">Problem</h3>
            </div>
            <ul className="space-y-2 flex-1">
              {themeData.problem.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-red-800">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Transformation Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className={`${colors.bg} border ${colors.border} rounded-xl p-4 flex flex-col`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-6 h-6 rounded-full ${colors.accent} flex items-center justify-center`}>
                <ThemeIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className={`text-sm font-bold ${colors.text} uppercase tracking-wide`}>Transformation</h3>
            </div>
            <ul className="space-y-2 flex-1">
              {themeData.transformation.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${colors.text} mt-0.5 flex-shrink-0`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Impact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wide">Impact</h3>
            </div>
            <ul className="space-y-2 flex-1">
              {themeData.impact.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-emerald-800 font-medium">
                  <span className="text-emerald-400 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Architecture Wireframe */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3"
        >
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wide mb-2">
            Architecture
          </div>
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {themeData.wireframe.nodes.map((node, index) => (
              <React.Fragment key={index}>
                <div className="flex-shrink-0 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 shadow-sm">
                  {node}
                </div>
                {index < themeData.wireframe.nodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
