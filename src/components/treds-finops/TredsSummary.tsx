import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onRestart: () => void;
}

const TredsSummary: React.FC<Props> = ({ onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: '#0A0F1E' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
          <span className="text-emerald-400 text-3xl">✓</span>
        </div>

        <h1 className="text-3xl font-bold text-white">Three agents. One architecture. TReDS-ready.</h1>
        <p className="text-gray-400 mt-2">Here's what you just saw — and what it means for M1xchange.</p>

        <div className="grid grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: '🚨',
              title: 'Early Warning Agent',
              body: 'Detects subtle supplier risk signals 15 days before standard dashboards. Invoice frequency drops, payment pattern shifts — flagged automatically.',
              metric: 'Gini improvement: +10–15%',
            },
            {
              icon: '📋',
              title: 'Compliance Guard',
              body: 'Scans 35,000+ MSMEs for Section 43B (h) compliance. Auto-triggers reminders to corporates. Tax benefit protection as a value-added service.',
              metric: '1,600+ corporates · Zero manual checks',
            },
            {
              icon: '🌐',
              title: 'Cross-Border Agent (M1 NXT)',
              body: 'Multi-lingual document parsing, FX risk assessment, and sanctions screening in 8 seconds. Supports Singapore FinTech Festival and global expansion.',
              metric: '8 seconds vs. 2–3 hours manual',
            },
          ].map(c => (
            <div key={c.title} className="rounded-2xl border p-6 text-left" style={{ background: '#111827', borderColor: '#1F2937' }}>
              <span className="text-2xl">{c.icon}</span>
              <p className="text-white font-semibold mt-3">{c.title}</p>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">{c.body}</p>
              <p className="text-emerald-400 text-sm mt-3 font-medium">{c.metric}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border p-6 mt-10 text-center" style={{ background: '#111827', borderColor: 'rgba(99, 102, 241, 0.13)' }}>
          <p className="text-indigo-300 text-sm leading-relaxed">
            ⚡ Same agentic architecture — integrates with your existing TReDS platform. No rip-and-replace. Human-in-the-loop on every critical decision. Full audit trail. Governance-first.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10">
          <div className="rounded-2xl border p-6 text-left" style={{ background: '#111827', borderColor: '#1F2937' }}>
            <p className="text-white font-semibold mb-2">Proposed next step</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discovery session to pick one use case. 4–6 week pilot. Clear KPIs agreed upfront so the business case is visible before broader rollout.
            </p>
            <p className="text-white text-sm font-bold mt-3">Which would you prioritise — Risk, Throughput, or Compliance?</p>
          </div>
          <div className="rounded-2xl border p-6 text-left" style={{ background: '#111827', borderColor: '#1F2937' }}>
            <p className="text-white font-semibold mb-2">What a pilot looks like</p>
            <ul className="text-gray-400 text-sm space-y-1.5">
              <li>• Defined scope + success metrics</li>
              <li>• 4–6 week delivery</li>
              <li>• Output: working agent on your data + ROI measurement</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="mt-8 px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-300 border transition-all hover:border-indigo-500/50 hover:text-white"
          style={{ borderColor: '#1F2937' }}
        >
          ← Restart Demo
        </button>
      </div>
    </motion.div>
  );
};

export default TredsSummary;
