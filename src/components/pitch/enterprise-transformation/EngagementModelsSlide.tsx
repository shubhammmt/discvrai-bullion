import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Target, Users, Check } from 'lucide-react';
import { EnterpriseTransformationSlide } from '@/data/enterpriseTransformationSlides';
import { SlideLayout } from './SlideLayout';

interface Props {
  slide: EnterpriseTransformationSlide;
  slideNumber: number;
  totalSlides: number;
}

const modelIcons = [Layers, Target, Users];

export const EngagementModelsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const { content } = slide;

  return (
    <SlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="h-full flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
          <h2 className="text-3xl font-light text-white mb-1">{slide.title}</h2>
          <p className="text-sm text-enterprise-gold">{slide.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
          {content?.models?.map((m: any, i: number) => {
            const Icon = modelIcons[i] || Layers;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                className="bg-enterprise-surface-elevated border border-enterprise-border rounded-xl p-3.5 flex flex-col hover:border-enterprise-gold/40 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start gap-2 mb-2 pb-2 border-b border-enterprise-border">
                  <div className="w-8 h-8 rounded-lg bg-enterprise-gold/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-enterprise-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-enterprise-gold/80 font-medium">Model {i + 1}</div>
                    <div className="text-sm text-white font-medium leading-tight">{m.name}</div>
                  </div>
                </div>

                {/* Definition */}
                <p className="text-xs text-enterprise-text-secondary leading-snug mb-2">{m.definition}</p>

                {/* Best when */}
                <div className="mb-2">
                  <div className="text-[10px] uppercase tracking-wider text-enterprise-gold/70 mb-0.5">Best when</div>
                  <p className="text-xs text-enterprise-text-secondary leading-snug">{m.bestWhen}</p>
                </div>

                {/* Differentiators */}
                <div className="mb-2">
                  <div className="text-[10px] uppercase tracking-wider text-enterprise-gold/70 mb-1">Differentiators</div>
                  <ul className="space-y-1">
                    {m.differentiators?.map((d: string, j: number) => (
                      <li key={j} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-enterprise-gold mt-0.5 flex-shrink-0" />
                        <span className="text-[11px] text-enterprise-text-secondary leading-snug">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contrast */}
                <div className="mb-2 bg-white/[0.03] border border-white/10 rounded-md p-2">
                  <div className="text-[10px] uppercase tracking-wider text-enterprise-text-muted mb-0.5">Contrast</div>
                  <p className="text-[11px] text-enterprise-text-muted leading-snug italic">{m.contrast}</p>
                </div>

                {/* Micro stats */}
                <div className="mt-auto grid grid-cols-3 gap-1 pt-2 border-t border-enterprise-border">
                  <div>
                    <div className="text-[9px] uppercase text-enterprise-text-muted">Time to value</div>
                    <div className="text-[11px] text-white font-medium">{m.ttv}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase text-enterprise-text-muted">Ownership</div>
                    <div className="text-[11px] text-white font-medium leading-tight">{m.ownership}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase text-enterprise-text-muted">Shape</div>
                    <div className="text-[11px] text-enterprise-gold font-medium">{m.shape}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* How to choose strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 text-center bg-enterprise-gold/10 border border-enterprise-gold/20 rounded-xl py-2 px-4"
        >
          <p className="text-xs text-enterprise-gold font-medium">
            <span className="text-enterprise-text-muted mr-2">How to choose →</span>
            {content?.howToChoose}
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
