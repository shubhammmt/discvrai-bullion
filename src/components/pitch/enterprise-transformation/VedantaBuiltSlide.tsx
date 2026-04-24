import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, LayoutDashboard, Bell, Workflow, Users, Database, Activity, ExternalLink } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface Props {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const VedantaBuiltSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  const moduleIcons = [LayoutDashboard, Bell, Workflow, Users, Database];

  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-end justify-between"
        >
          <div>
            <h2 className="text-4xl font-light text-white mb-1">{slide.title}</h2>
            <p className="text-xl text-enterprise-gold">{slide.subtitle}</p>
          </div>
          <a
            href="/vedanta-decision-hub"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-enterprise-blue-light border border-enterprise-blue/30 bg-enterprise-blue/10 rounded px-2 py-1 hover:bg-enterprise-blue/20"
          >
            Open live demo <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left: modules + meta */}
          <div className="col-span-7 flex flex-col gap-3">
            {/* Modules built */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-enterprise-gold" />
                <h3 className="text-white font-medium text-sm">Modules Built</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {content?.modules?.map((m: any, i: number) => {
                  const Icon = moduleIcons[i % moduleIcons.length];
                  return (
                    <div key={i} className="flex items-start gap-2 bg-enterprise-navy-dark/60 border border-enterprise-border rounded-lg p-2">
                      <Icon className="w-4 h-4 text-enterprise-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-white font-medium">{m.name}</div>
                        <div className="text-[11px] text-enterprise-text-muted">{m.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              {content?.meta?.map((m: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-3"
                >
                  <div className="text-[10px] text-enterprise-text-muted uppercase tracking-wider mb-1">{m.label}</div>
                  <div className="text-sm text-white leading-snug">{m.value}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-[11px] text-enterprise-text-muted italic"
            >
              Status framing: "designed for / pilot scope / in progress" — outcomes claimed only when validated.
            </motion.div>
          </div>

          {/* Right: UI mockup of Decision Hub */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5 bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-enterprise-gold" />
                <span className="text-sm text-white font-medium">Vedanta Aluminium · Decision Hub</span>
              </div>
              <span className="text-[10px] text-enterprise-text-muted border border-enterprise-border rounded px-1.5 py-0.5">
                Faithful UI mock
              </span>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: 'Prod vs Plan', val: '98.4%' },
                { label: 'kWh / kg', val: '13.6' },
                { label: 'Anode Eff/day', val: '0.21' },
              ].map((k, i) => (
                <div key={i} className="bg-enterprise-navy-dark/60 border border-enterprise-border rounded-lg p-2">
                  <div className="text-[10px] text-enterprise-text-muted">{k.label}</div>
                  <div className="text-base font-semibold text-white">{k.val}</div>
                </div>
              ))}
            </div>

            {/* Alerts panel */}
            <div className="text-[10px] text-enterprise-text-muted mb-1.5">Top alerts requiring action</div>
            <div className="space-y-1.5 mb-3">
              {[
                { sev: 'High', msg: 'Alumina supply delay — 14h risk', owner: 'Procurement' },
                { sev: 'High', msg: 'Potline-2 energy spike +4.2%', owner: 'Plant Head' },
                { sev: 'Med', msg: 'High-margin order · logistics constraint', owner: 'Commercial' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2 bg-enterprise-navy-dark/60 border border-enterprise-border rounded-lg px-2 py-1.5">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${a.sev === 'High' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-enterprise-gold/20 text-enterprise-gold border border-enterprise-gold/30'}`}>
                    {a.sev}
                  </span>
                  <span className="text-[11px] text-white flex-1 truncate">{a.msg}</span>
                  <span className="text-[10px] text-enterprise-text-muted">{a.owner}</span>
                </div>
              ))}
            </div>

            {/* Decisions panel */}
            <div className="text-[10px] text-enterprise-text-muted mb-1.5">Today's decisions · owner · impact</div>
            <div className="space-y-1.5 flex-1">
              {[
                { d: 'Approve alt alumina lot', owner: 'CPO', impact: '₹ 2.1 Cr' },
                { d: 'Re-balance Potline-2 load', owner: 'Plant', impact: '₹ 0.8 Cr' },
                { d: 'Lock LME-linked quote', owner: 'Commercial', impact: '₹ 1.4 Cr' },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-2 bg-enterprise-navy-dark/60 border border-enterprise-border rounded-lg px-2 py-1.5">
                  <span className="text-[11px] text-white flex-1 truncate">{d.d}</span>
                  <span className="text-[10px] text-enterprise-text-muted">{d.owner}</span>
                  <span className="text-[10px] text-enterprise-gold font-medium">{d.impact}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};
