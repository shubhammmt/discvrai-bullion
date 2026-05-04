import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Brain, BarChart3, Database, Link2, Zap } from 'lucide-react';

const ACCENT = '#0F766E';
const TOTAL = 1;

const slides = [
  {
    id: 1,
    type: 'capabilities-lite',
    eyebrow: 'Deep-tech capability stack',
    title: 'Hard ML, agentic AI and data engineering — engineered into the systems you already run',
    subhead: 'Three pillars that turn a mature enterprise stack into a measurable, agentic operating model.',
    blocks: [
      {
        icon: Brain,
        title: 'Generative & agentic AI',
        desc: 'Multi-LLM routing, RAG with citations and RBAC, fine-tuning (LoRA/QLoRA), eval harnesses, guardrails, on-prem inference, agent orchestration (LangGraph) with deterministic fallbacks — grounded in enterprise knowledge.',
        chips: ['Multi-LLM routing', 'RAG + RBAC', 'LoRA / QLoRA', 'LangGraph agents', 'On-prem inference', 'Guardrails & evals'],
      },
      {
        icon: BarChart3,
        title: 'Decision intelligence & command centres',
        desc: 'Operator-grade dashboards, exception-first workflows, NL-to-SQL on governed data, predictive alerts wired to action — signal → decision → measurable outcome.',
        chips: ['Exception-first workflows', 'NL-to-SQL', 'Predictive alerts', 'Operator dashboards', 'Signal → decision'],
      },
      {
        icon: Database,
        secondaryIcon: Link2,
        title: 'Data, MLOps & integration platform',
        desc: 'Lakehouse + feature store (Feast), vector DBs, training/serving on AWS / Azure / GCP, MLflow / Kubeflow / SageMaker / Vertex, drift, bias and explainability (SHAP/LIME). Battle-tested connectors for SAP, Oracle, Salesforce, core banking, MES, SCADA, historian, Shopify and payment rails — CDC pipelines, semantic layer, golden records — meet data where it lives.',
        chips: ['Lakehouse + Feast', 'Vector DBs', 'MLflow / Kubeflow', 'SAP · Oracle · Salesforce', 'MES · SCADA · historian', 'CDC + semantic layer'],
      },
    ],
    closing: 'A real ML engineering bench (PhD/Masters depth) + GenAI engineers + data and platform engineers — delivered as one pod, on your stack, with full code and model ownership.',
  },
];

const SlideWrapper: React.FC<{ children: React.ReactNode; num: number }> = ({ children, num }) => (
  <div className="w-full h-screen flex flex-col relative overflow-hidden bg-white">
    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}88, ${ACCENT})` }} />
    <div className="absolute top-5 left-8 z-20 flex items-center gap-2">
      <Zap className="w-5 h-5" style={{ color: ACCENT }} />
      <span className="text-base font-bold tracking-tight text-slate-800">DiscvrAI</span>
      <span className="ml-2 text-[10px] uppercase tracking-widest text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">Lite</span>
    </div>
    <div className="flex-1 relative z-10 px-12 pt-16 pb-16 flex flex-col overflow-hidden" style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
      {children}
    </div>
    <div className="absolute bottom-0 left-0 right-0 px-12 pb-3 flex justify-between items-center text-xs text-slate-400">
      <span>Confidential | DiscvrAI | April 2026</span>
      <span className="font-mono">{String(num).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}40, transparent)` }} />
  </div>
);

const CapabilitiesLiteSlide: React.FC = () => {
  const s = slides[0] as any;
  return (
    <SlideWrapper num={1}>
      <div className="mb-6">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: ACCENT }}>{s.eyebrow}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">{s.title}</h2>
        <p className="text-slate-600 text-base md:text-lg max-w-4xl">{s.subhead}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
        {s.blocks.map((b: any, i: number) => {
          const Icon = b.icon;
          const Secondary = b.secondaryIcon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="border border-slate-200 rounded-2xl p-6 bg-white flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: ACCENT }} />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}15` }}>
                  <Icon className="w-5 h-5" style={{ color: ACCENT }} />
                </div>
                {Secondary && (
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}10` }}>
                    <Secondary className="w-5 h-5" style={{ color: ACCENT }} />
                  </div>
                )}
                <span className="ml-auto text-[11px] font-semibold tracking-wider text-slate-400">0{i + 1}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug">{b.title}</h3>
              <p className="text-slate-600 text-[13px] leading-relaxed mb-4">{b.desc}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {b.chips.map((chip: string, ci: number) => (
                  <span
                    key={ci}
                    className="text-[11px] font-medium px-2 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-slate-500 text-sm italic border-t border-slate-100 pt-4 mt-5">{s.closing}</p>
    </SlideWrapper>
  );
};

const slideRenderers = [CapabilitiesLiteSlide];

const EnterpriseDeckLite: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => { setEntered(true); }, []);

  const go = useCallback((dir: number) => {
    setCurrent(c => Math.max(0, Math.min(TOTAL - 1, c + dir)));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  const Slide = slideRenderers[current];

  return (
    <div className="w-full h-screen overflow-hidden relative bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 flex">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="flex-1 h-1 transition-colors duration-300"
            style={{ background: i <= current ? ACCENT : '#e2e8f0' }}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={entered ? { opacity: 0, x: 30 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <Slide />
        </motion.div>
      </AnimatePresence>
      <div className="fixed bottom-6 right-8 z-50 flex gap-2">
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          disabled={current === TOTAL - 1}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/90 backdrop-blur flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default EnterpriseDeckLite;
