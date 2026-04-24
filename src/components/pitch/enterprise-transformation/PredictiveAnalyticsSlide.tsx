import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, Wrench, Gauge, ArrowRight, Database, Brain, Workflow } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface Props {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const PredictiveAnalyticsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <h2 className="text-4xl font-light text-white mb-1">{slide.title}</h2>
          <p className="text-xl text-enterprise-gold">{slide.subtitle}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left: capabilities + outcomes */}
          <div className="col-span-7 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-5 h-5 text-enterprise-gold" />
                  <h3 className="text-white font-medium text-sm">What's Possible</h3>
                </div>
                <div className="space-y-1.5">
                  {content?.capabilities?.map((c: string, i: number) => (
                    <p key={i} className="text-xs text-enterprise-text-secondary">• {c}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="w-5 h-5 text-enterprise-gold" />
                  <h3 className="text-white font-medium text-sm">Reliability Outcomes</h3>
                </div>
                <div className="space-y-1.5">
                  {content?.outcomes?.map((o: string, i: number) => (
                    <p key={i} className="text-xs text-enterprise-text-secondary">• {o}</p>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Operating model flow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Workflow className="w-5 h-5 text-enterprise-gold" />
                <h3 className="text-white font-medium text-sm">Operating Model — Closed Loop</h3>
              </div>
              <div className="flex items-center justify-between gap-1 text-[11px]">
                {['Alert', 'Diagnose', 'Work Order', 'Parts', 'Crew', 'Feedback'].map((s, i) => (
                  <React.Fragment key={s}>
                    <span className="bg-enterprise-blue/10 border border-enterprise-blue/30 rounded px-2 py-1 text-enterprise-blue-light">{s}</span>
                    {i < 5 && <ArrowRight className="w-3 h-3 text-enterprise-gold flex-shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-[11px] text-enterprise-text-muted mt-2">
                Governance for false positives · model drift monitoring · human-in-the-loop sign-off
              </p>
            </motion.div>

            {/* Vedanta framing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-enterprise-surface-elevated border border-enterprise-gold/30 rounded-xl p-4"
            >
              <div className="text-xs text-enterprise-gold mb-1.5">"Vedanta overall" — federated rollout</div>
              <p className="text-xs text-enterprise-text-secondary">
                Common data platform · standard asset hierarchy · shared KPI library across sites · site-level autonomy with group-level visibility.
              </p>
            </motion.div>
          </div>

          {/* Right: architecture diagram */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5 bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-enterprise-gold" />
              <span className="text-sm text-white font-medium">Reference Architecture</span>
            </div>

            <div className="flex-1 flex flex-col justify-around gap-2">
              {[
                { label: 'Sensors · SCADA · MES · EAM', icon: Activity, color: 'enterprise-blue' },
                { label: 'Feature Store (unified, versioned)', icon: Database, color: 'enterprise-blue' },
                { label: 'Models — PdM · RUL · Anomaly', icon: Cpu, color: 'enterprise-gold' },
                { label: 'Recommendations + Explanations', icon: Brain, color: 'enterprise-gold' },
                { label: 'Workflows in Command Center', icon: Wrench, color: 'enterprise-gold' },
              ].map((layer, i) => (
                <React.Fragment key={i}>
                  <div className={`flex items-center gap-2 bg-enterprise-navy-dark/60 border border-${layer.color}/30 rounded-lg px-3 py-2`}>
                    <layer.icon className={`w-4 h-4 text-${layer.color === 'enterprise-blue' ? 'enterprise-blue-light' : 'enterprise-gold'}`} />
                    <span className="text-xs text-white">{layer.label}</span>
                  </div>
                  {i < 4 && (
                    <div className="flex justify-center">
                      <ArrowRight className="w-3 h-3 text-enterprise-gold rotate-90" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};
