import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { crossBorderDoc } from '@/data/tredsFinopsData';

const CrossBorderScreen: React.FC = () => {
  const [processed, setProcessed] = useState(false);
  const [processing, setProcessing] = useState(false);

  const runAgent = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setProcessed(true);
    }, 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen px-6 py-20"
      style={{ background: '#0A0F1E' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-indigo-400 text-sm font-medium">Demo 3</span>
          <span className="text-gray-600 text-sm">·</span>
          <span className="text-gray-400 text-sm">Cross-Border Agent (M1 NXT)</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-8">Document + FX + Sanctions Check</h2>

        <div className="grid grid-cols-5 gap-8">
          {/* Left — Problem */}
          <div className="col-span-2 space-y-4">
            <div className="rounded-2xl border p-6" style={{ background: '#111827', borderColor: '#1F2937' }}>
              <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">Problem</p>
              <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <li>• International expansion. Multi-lingual docs. FX risk. Sanctions.</li>
                <li>• Agent parses docs, calculates FX risk, checks sanctions in <span className="text-white font-medium">seconds</span></li>
                <li>• Manual process: <span className="text-red-400">2–3 hours</span> per document</li>
              </ul>
            </div>
          </div>

          {/* Right — Workspace */}
          <div className="col-span-3 space-y-4">
            <div className="rounded-2xl border p-6" style={{ background: '#111827', borderColor: '#1F2937' }}>
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">Trade Document</p>
              
              {/* Mock document */}
              <div className="rounded-xl border border-dashed p-6 flex items-center gap-4" style={{ borderColor: '#374151', background: '#0A0F1E' }}>
                <div className="w-12 h-14 rounded-lg flex items-center justify-center" style={{ background: '#1F2937' }}>
                  <span className="text-2xl">📄</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{crossBorderDoc.fileName}</p>
                  <p className="text-gray-500 text-xs">{crossBorderDoc.languages}</p>
                </div>
              </div>

              <button
                onClick={runAgent}
                disabled={processed || processing}
                className="mt-5 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                style={{ background: '#6366F1' }}
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Agent processing…
                  </span>
                ) : processed ? '✓ Processing Complete' : '🌐 Run Cross-Border Agent'}
              </button>
            </div>

            {/* Output */}
            {processed && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Document Parsed */}
                <div className="rounded-2xl border p-5" style={{ background: '#111827', borderColor: 'rgba(99, 102, 241, 0.25)' }}>
                  <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">📄 Document Parsed</p>
                  <p className="text-gray-300 text-sm">
                    Parties: <span className="text-white">{crossBorderDoc.parties.exporter}</span> → <span className="text-white">{crossBorderDoc.parties.importer}</span>.
                    Amount: <span className="text-white">{crossBorderDoc.amount}</span>. Tenor: <span className="text-white">{crossBorderDoc.tenor}</span>.
                  </p>
                </div>

                {/* FX Risk */}
                <div className="rounded-2xl border p-5" style={{ background: '#111827', borderColor: 'rgba(234, 179, 8, 0.25)' }}>
                  <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">💱 FX Risk Assessment</p>
                  <p className="text-gray-300 text-sm">
                    INR/USD 90d volatility: <span className="text-yellow-300 font-medium">{crossBorderDoc.fxVolatility}</span>.
                    Suggested hedge: <span className="text-white font-medium">{crossBorderDoc.hedgeSuggestion}</span>.
                  </p>
                </div>

                {/* Sanctions */}
                <div className="rounded-2xl border p-5" style={{ background: '#111827', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">🛡️ Sanctions Check</p>
                  <p className="text-emerald-300 text-sm font-medium">{crossBorderDoc.sanctionsResult}</p>
                </div>

                {/* Processing Time */}
                <div className="rounded-xl p-3 flex items-center justify-between" style={{ background: '#111827', borderColor: '#1F2937' }}>
                  <span className="text-gray-400 text-xs">Processing time</span>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold text-sm">{crossBorderDoc.processingTime}</span>
                    <span className="text-gray-600 text-xs">vs. {crossBorderDoc.manualTime} manual</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CrossBorderScreen;
