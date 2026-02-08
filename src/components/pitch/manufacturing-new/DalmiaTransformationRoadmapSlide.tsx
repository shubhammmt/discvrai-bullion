import React from 'react';
import { motion } from 'framer-motion';
import { MfgNewSlideLayout } from './MfgNewSlideLayout';
import { DalmiaCementSlide } from '@/data/dalmiaCementSlides';
import { 
  Database, 
  Brain, 
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface Props {
  slide: DalmiaCementSlide;
  slideNumber: number;
  totalSlides: number;
}

export const DalmiaTransformationRoadmapSlide: React.FC<Props> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const phases = [
    {
      name: 'Phase 1',
      title: 'Foundation',
      timeline: '0–6 months',
      icon: Database,
      color: 'blue',
      items: [
        'Enterprise Data Lake deployment',
        'Customer MDM implementation',
        'Data quality & governance setup',
        'Integration pipelines (SAP, CRM, Apps)'
      ]
    },
    {
      name: 'Phase 2',
      title: 'AI Intelligence Layer',
      timeline: '6–15 months',
      icon: Brain,
      color: 'purple',
      items: [
        'AI Pricing Engine rollout',
        'Demand Sensing deployment',
        'Sales Copilot for field force',
        'Dealer 360 platform'
      ]
    },
    {
      name: 'Phase 3',
      title: 'Autonomous Enterprise',
      timeline: '15–24 months',
      icon: Zap,
      color: 'teal',
      items: [
        '80% digital adoption target',
        'Autonomous workflows',
        'Predictive supply chain',
        'Full margin intelligence'
      ]
    }
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', iconBg: 'bg-blue-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700', iconBg: 'bg-purple-500' },
    teal: { bg: 'bg-teal-50', border: 'border-teal-300', text: 'text-teal-700', iconBg: 'bg-teal-500' }
  };

  return (
    <MfgNewSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex-1 flex flex-col min-h-0 px-8 py-4">
        {/* Header */}
        <div className="mb-4">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
            Implementation
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            {slide.headline}
          </h2>
        </div>

        {/* Phases */}
        <div className="flex-1 grid grid-cols-3 gap-6">
          {phases.map((phase, index) => {
            const IconComponent = phase.icon;
            const colors = colorMap[phase.color];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.4 }}
                className={`${colors.bg} border-2 ${colors.border} rounded-xl p-5 flex flex-col relative`}
              >
                {/* Phase Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${colors.text} uppercase tracking-wide`}>
                      {phase.name}
                    </div>
                    <div className="text-base font-bold text-slate-800">{phase.title}</div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-4">
                  <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded-full border border-slate-200">
                    {phase.timeline}
                  </span>
                </div>

                {/* Items */}
                <ul className="space-y-2 flex-1">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${colors.text} mt-0.5 flex-shrink-0`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Arrow to next phase */}
                {index < phases.length - 1 && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-slate-400" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-slate-500">Total Timeline</div>
                <div className="text-lg font-bold text-slate-800">24 Months</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <div className="text-xs text-slate-500">Value Unlock</div>
                <div className="text-lg font-bold text-amber-600">₹870–1,720 Cr</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-800">
                Foundation → Intelligence → Autonomy
              </div>
              <div className="text-xs text-slate-500">Progressive value realization at each phase</div>
            </div>
          </div>
        </motion.div>
      </div>
    </MfgNewSlideLayout>
  );
};
