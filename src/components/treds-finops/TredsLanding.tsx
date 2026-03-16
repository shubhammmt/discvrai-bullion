import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

const TredsLanding: React.FC<Props> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: '#0A0F1E' }}
    >
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <span className="inline-flex items-center gap-1.5 bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 rounded-full px-3 py-1 text-sm font-medium">
          Agentic FinOps · TReDS
        </span>

        <h1 className="text-5xl font-bold text-white leading-tight">
          Three agents. One platform.<br />Risk, throughput, compliance.
        </h1>

        <p className="text-lg text-gray-400 max-w-lg mx-auto">
          Early Warning · Compliance Guard · Cross-Border (M1 NXT)
        </p>

        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { icon: '🚨', title: 'Early Warning Agent', sub: 'Supplier risk signals' },
            { icon: '📋', title: 'Compliance Guard', sub: 'Section 43B (h)' },
            { icon: '🌐', title: 'Cross-Border Agent', sub: 'M1 NXT · Docs + FX + Sanctions' },
          ].map((c) => (
            <div key={c.title} className="rounded-xl p-4 border" style={{ background: '#111827', borderColor: '#1F2937' }}>
              <span className="text-2xl">{c.icon}</span>
              <p className="text-white text-sm font-semibold mt-2">{c.title}</p>
              <p className="text-gray-500 text-xs mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 text-lg font-semibold text-white rounded-xl transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] mt-6"
          style={{ background: '#6366F1' }}
        >
          ▶ Start Demo
        </button>

        <p className="text-gray-600 text-xs">
          All scenarios are illustrative. Agent outputs are pre-computed for this demonstration.
        </p>
      </div>
    </motion.div>
  );
};

export default TredsLanding;
