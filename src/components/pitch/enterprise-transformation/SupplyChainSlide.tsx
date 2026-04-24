import React from 'react';
import { motion } from 'framer-motion';
import { Warehouse, Network, GitBranch, Activity, Truck, Package, Users, AlertTriangle } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface Props {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

export const SupplyChainSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <h2 className="text-4xl font-light text-white mb-1">{slide.title}</h2>
          <p className="text-xl text-enterprise-gold">{slide.subtitle}</p>
        </motion.div>

        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left: approach + capability cards */}
          <div className="col-span-7 flex flex-col gap-3">
            {/* Approach */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-enterprise-surface-elevated border border-enterprise-gold/30 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <GitBranch className="w-5 h-5 text-enterprise-gold" />
                <h3 className="text-white font-medium">Our Approach</h3>
              </div>
              <p className="text-sm text-enterprise-text-secondary">
                Execution &amp; decision layer <span className="text-enterprise-gold">on top of</span> ERP / WMS / TMS / Planning — not rip-and-replace.
              </p>
            </motion.div>

            {/* Two capability cards */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              {content?.capabilities?.map((cap: any, idx: number) => {
                const Icon = idx === 0 ? Warehouse : Network;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4 hover:border-enterprise-gold/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-5 h-5 text-enterprise-gold" />
                      <h3 className="text-white font-medium text-sm">{cap.name}</h3>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      {cap.items?.map((it: string, i: number) => (
                        <p key={i} className="text-xs text-enterprise-text-secondary">• {it}</p>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs text-enterprise-text-muted mb-1.5">KPIs</div>
                      <div className="flex flex-wrap gap-1">
                        {cap.kpis?.map((k: string, i: number) => (
                          <span
                            key={i}
                            className="bg-enterprise-blue/10 border border-enterprise-blue/30 rounded px-2 py-0.5 text-[11px] text-enterprise-blue-light"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Command center narrative chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-3"
            >
              <div className="text-xs text-enterprise-text-muted mb-2">End-to-end Command Center (Bajaj Electricals–style)</div>
              <div className="flex items-center justify-between gap-1 text-[11px] text-enterprise-text-secondary">
                {['Supplier', 'Inbound', 'DC', 'Outbound', 'Customer'].map((s, i) => (
                  <React.Fragment key={s}>
                    <span className="bg-enterprise-blue/10 border border-enterprise-blue/30 rounded px-2 py-1 text-enterprise-blue-light">{s}</span>
                    {i < 4 && <span className="text-enterprise-gold">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: illustrative mock UI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-5 bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-enterprise-gold" />
                <span className="text-sm text-white font-medium">Supply Chain Command</span>
              </div>
              <span className="text-[10px] text-enterprise-text-muted border border-enterprise-border rounded px-1.5 py-0.5">
                Illustrative / anonymized
              </span>
            </div>

            {/* Mock KPI strip */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: 'OTIF', val: '94.2%', icon: Truck },
                { label: 'Inv Acc.', val: '98.6%', icon: Package },
                { label: 'Cost/Serve', val: '↓ 7%', icon: Activity },
              ].map((k, i) => (
                <div key={i} className="bg-enterprise-navy-dark/60 border border-enterprise-border rounded-lg p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <k.icon className="w-3 h-3 text-enterprise-gold" />
                    <span className="text-[10px] text-enterprise-text-muted">{k.label}</span>
                  </div>
                  <div className="text-base font-semibold text-white">{k.val}</div>
                </div>
              ))}
            </div>

            {/* Mock alerts */}
            <div className="text-[10px] text-enterprise-text-muted mb-1.5">Exception alerts • owners • SLA</div>
            <div className="space-y-1.5 flex-1">
              {[
                { sev: 'High', msg: 'Lane MUM→DEL: ETA risk +6h', owner: 'Logistics', sla: '2h' },
                { sev: 'Med', msg: 'DC-3 dock congestion 11:00–13:00', owner: 'Ops', sla: '1h' },
                { sev: 'Med', msg: 'SKU 4471 stockout risk @ N-Region', owner: 'Planning', sla: '4h' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2 bg-enterprise-navy-dark/60 border border-enterprise-border rounded-lg px-2 py-1.5">
                  <AlertTriangle className={`w-3.5 h-3.5 ${a.sev === 'High' ? 'text-red-400' : 'text-enterprise-gold'}`} />
                  <span className="text-[11px] text-white flex-1 truncate">{a.msg}</span>
                  <span className="text-[10px] text-enterprise-text-muted flex items-center gap-1">
                    <Users className="w-3 h-3" />{a.owner}
                  </span>
                  <span className="text-[10px] text-enterprise-blue-light">{a.sla}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 text-[10px] text-enterprise-text-muted">
              Working capital · cost-to-serve · what-if on shipments &amp; lanes
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
};
