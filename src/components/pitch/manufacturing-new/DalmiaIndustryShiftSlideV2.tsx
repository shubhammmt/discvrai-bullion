import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { 
  Database, 
  BarChart3, 
  FileText, 
  Boxes, 
  Zap,
  Brain,
  Target,
  TrendingUp,
  Bot,
  LineChart,
  ArrowRight
} from 'lucide-react';

interface DalmiaIndustryShiftSlideV2Props {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaIndustryShiftSlideV2: React.FC<DalmiaIndustryShiftSlideV2Props> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const oldWorldItems = [
    { icon: Database, label: 'ERP Implementation Focus', desc: 'SAP-led transformations' },
    { icon: Zap, label: 'Process Automation', desc: 'Workflow digitization' },
    { icon: BarChart3, label: 'Reporting Dashboards', desc: 'Static business intelligence' },
    { icon: Boxes, label: 'Siloed Operational Tools', desc: 'Disconnected systems' },
    { icon: FileText, label: 'Efficiency-Driven Investments', desc: 'Cost reduction focus' }
  ];

  const newWorldItems = [
    { icon: Brain, label: 'AI Commercial Intelligence', desc: 'Operational → Commercial AI' },
    { icon: Target, label: 'Outcome-Based Pricing', desc: 'BCG: 40% B2B by 2027' },
    { icon: Bot, label: 'AI Agents & Copilots', desc: 'McKinsey: 60% automation' },
    { icon: LineChart, label: 'Predictive Decision-Making', desc: 'Reactive → Proactive → Autonomous' },
    { icon: TrendingUp, label: 'Data as Competitive Moat', desc: 'Intelligence infrastructure' }
  ];

  const evolutionSteps = [
    'Operational Digitization',
    'Data Platforms',
    'AI Intelligence',
    'Autonomous Enterprise'
  ];

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 px-8 py-3">
        {/* Header */}
        <div className="mb-3">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
            Industry Shift
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Heavy Industry Digital Transformation
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            The Industry is Moving from Digitization to Intelligence
          </p>
        </div>

        {/* Main Content - Three Columns */}
        <div className="flex-1 flex gap-4 min-h-0">
          {/* Left Column - Old World */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col"
          >
            <div className="text-center mb-3 pb-2 border-b border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Old World
              </span>
              <h3 className="text-sm font-bold text-slate-700 mt-0.5">
                Operational Digitization Era
              </h3>
            </div>
            
            <div className="space-y-2 flex-1">
              {oldWorldItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                    className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-slate-100"
                  >
                    <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-slate-700 leading-tight">{item.label}</div>
                      <div className="text-[10px] text-slate-400 leading-tight">{item.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Center - Evolution Timeline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="w-40 flex flex-col items-center justify-center"
          >
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Evolution
            </div>
            <div className="flex flex-col items-center gap-1.5">
              {evolutionSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    className={`px-3 py-1.5 rounded-lg text-center w-full ${
                      index === evolutionSteps.length - 1
                        ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold'
                        : index === evolutionSteps.length - 2
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span className="text-[10px] leading-tight">{step}</span>
                  </motion.div>
                  {index < evolutionSteps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 rotate-90" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Right Column - New World */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex-1 bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-xl p-4 flex flex-col"
          >
            <div className="text-center mb-3 pb-2 border-b border-blue-200">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                New World
              </span>
              <h3 className="text-sm font-bold text-slate-800 mt-0.5">
                AI Commercial Intelligence Era
              </h3>
            </div>
            
            <div className="space-y-2 flex-1">
              {newWorldItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                    className="flex items-center gap-2.5 p-2 bg-white/80 rounded-lg border border-blue-100"
                  >
                    <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-slate-800 leading-tight">{item.label}</div>
                      <div className="text-[10px] text-blue-600/70 leading-tight">{item.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Strategic Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">
                Key Strategic Insight
              </div>
              <p className="text-xs text-white/90 leading-snug">
                Companies that treat AI as commercial decision infrastructure outperform those using AI only for productivity.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
