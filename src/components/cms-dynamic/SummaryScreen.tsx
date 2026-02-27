import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onRestart: () => void;
}

const SummaryScreen: React.FC<Props> = ({ onRestart }) => {
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
        {/* Checkmark */}
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
          <span className="text-emerald-400 text-3xl">✓</span>
        </div>

        <h1 className="text-3xl font-bold text-white">Three agents. One architecture. Real outcomes.</h1>
        <p className="text-gray-400 mt-2">Here's what you just saw — and what it means operationally.</p>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: '📊',
              title: 'Margin Leakage Recovery',
              body: 'Agent matched 3 of 4 groups without human touch. One exception surfaced and resolved with audit trail. Provisions recoverable: ~₹40–45 Cr/yr (illustrative).',
              metric: '94% match rate · 4 hrs to close',
            },
            {
              icon: '⚙️',
              title: 'Revenue Unblock',
              body: 'Agent ran 47 integration tests in under a minute. Surfaced 2 failures with specific fix suggestions. Human effort: fix 2 issues, not 47 tests.',
              metric: '16–20 weeks → 6–9 weeks onboarding',
            },
            {
              icon: '🚛',
              title: 'Agentic Route & Dispatch',
              body: 'Agent scanned fleet telemetry and traffic data. 3 actions surfaced — re-route, maintenance flag, depletion alert — each with reasoning and one-click approval.',
              metric: '10–15% fuel savings · SLA breaches prevented',
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

        {/* Architecture note */}
        <div className="rounded-2xl border p-6 mt-10 text-center" style={{ background: '#111827', borderColor: 'rgba(99, 102, 241, 0.13)' }}>
          <p className="text-indigo-300 text-sm leading-relaxed">
            ⚡ Same agentic architecture — integrates with your existing systems (ERP, field management software, surveillance platforms). No rip-and-replace. Human-in-the-loop on every critical decision. Full audit trail. Governance-first.
          </p>
        </div>

        {/* Next steps */}
        <div className="grid grid-cols-2 gap-6 mt-10">
          <div className="rounded-2xl border p-6 text-left" style={{ background: '#111827', borderColor: '#1F2937' }}>
            <p className="text-white font-semibold mb-2">Proposed next step</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Run a scoped pilot on one use case — reconciliation or route & dispatch — with clear KPIs agreed upfront so the business case is visible before any broader rollout.
            </p>
            <p className="text-white text-sm font-bold mt-3">Which would you prioritise in the next quarter?</p>
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

        {/* Restart */}
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

export default SummaryScreen;
