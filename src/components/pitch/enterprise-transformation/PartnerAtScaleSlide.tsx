import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Users, ArrowRight, Compass, Workflow, LogOut } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface Props {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

const capIcons = [Compass, Layers, Workflow, ShieldCheck];
const pillarIcons = [Users, ShieldCheck, LogOut];

export const PartnerAtScaleSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h2 className="text-3xl font-light text-white mb-1">{slide.title}</h2>
          <p className="text-lg text-enterprise-gold">{slide.subtitle}</p>
        </motion.div>

        {/* Capabilities row */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {content?.capabilities?.map((c: any, i: number) => {
            const Icon = capIcons[i] || Layers;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-3 hover:border-enterprise-gold/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-enterprise-gold/15 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-enterprise-gold" />
                  </div>
                  <div className="text-sm text-white font-medium leading-tight">{c.title}</div>
                </div>
                <p className="text-xs text-enterprise-text-secondary leading-snug">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Modus operandi pillars */}
        <div className="grid grid-cols-3 gap-3 mb-4 flex-1">
          {content?.pillars?.map((p: any, i: number) => {
            const Icon = pillarIcons[i] || Users;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="bg-gradient-to-br from-enterprise-gold/10 to-transparent border border-enterprise-gold/20 rounded-xl p-4 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-enterprise-gold" />
                  <div className="text-sm text-white font-medium">{p.title}</div>
                </div>
                <p className="text-xs text-enterprise-text-secondary leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Co-build flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl py-3 px-5 flex items-center justify-center gap-4"
        >
          {content?.flow?.map((step: string, i: number) => (
            <React.Fragment key={i}>
              <div className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                i === 1 ? 'bg-enterprise-gold/20 text-enterprise-gold border border-enterprise-gold/40' : 'bg-white/5 text-white border border-white/10'
              }`}>
                {step}
              </div>
              {i < content.flow.length - 1 && (
                <ArrowRight className="w-4 h-4 text-enterprise-gold/60" />
              )}
            </React.Fragment>
          ))}
          <span className="text-xs text-enterprise-text-muted ml-3 italic">{content?.footer}</span>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
