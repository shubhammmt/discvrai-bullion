import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { bankStatement, erpLedger, cashPhysical, matchGroups, auditTrailInitial, MatchGroup } from '@/data/reconciliation';
import CountUp from './CountUp';

const ReconciliationScreen: React.FC = () => {
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [exceptionResolved, setExceptionResolved] = useState(false);
  const [auditTrail, setAuditTrail] = useState<{ time: string; actor: 'Agent' | 'User'; action: string }[]>(auditTrailInitial);
  const [showAudit, setShowAudit] = useState(false);

  const runAgent = useCallback(() => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 2800);
  }, []);

  const approveException = useCallback(() => {
    setExceptionResolved(true);
    setAuditTrail(prev => [
      { time: "09:42:03", actor: "User" as const, action: "Exception MG-004 approved — variance coded as CIT timing lag. Provision held. Field ticket raised." },
      ...prev,
    ]);
    toast.success("Exception resolved · Audit logged");
  }, []);

  const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex h-[calc(100vh-7.5rem)]"
    >
      {/* Left Panel — Problem Slide */}
      <div className="w-[38%] flex-shrink-0 border-r overflow-y-auto p-8 flex flex-col" style={{ background: 'linear-gradient(to bottom, #111827, #0A0F1E)', borderColor: '#1F2937' }}>
        <span className="text-gray-500 text-xs">Demo 1 of 3</span>
        <span className="inline-flex items-center gap-1 mt-2 bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 rounded-full px-2.5 py-1 text-xs font-medium w-fit">
          ⚡ Margin Leakage Recovery + Decision Intelligence
        </span>
        <h2 className="text-3xl font-bold text-white leading-snug mt-4">
          Manual reconciliation is costing X Company tens of crores — every year
        </h2>
        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
          X Company moves enormous volumes of cash and value daily across three data streams: bank statements, ERP/ledger (invoices, service fees, collections), and physical cash (vault and ATM records). These streams rarely align perfectly. Payment references get truncated. One bank credit covers multiple invoices. Amounts differ by rounding or timing. Today, a manual finance team matches line-by-line using rigid rules. Anything that doesn't match exactly becomes an exception — and exceptions pile up.
        </p>

        <div className="border-t my-6" style={{ borderColor: '#1F2937' }} />

        <p className="text-white font-semibold text-sm uppercase tracking-wider">What this costs today</p>
        <div className="space-y-3 mt-3">
          {[
            { icon: '📉', label: 'Annual bad-debt provisions', value: '₹80–90 Cr' },
            { icon: '🕐', label: 'Days to close each cycle', value: '6 days' },
            { icon: '👤', label: 'Manual touch points per close', value: '380+' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-lg">{s.icon}</span>
              <div>
                <p className="text-gray-500 text-xs">{s.label}</p>
                <p className="text-white text-xl font-bold">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t my-6" style={{ borderColor: '#1F2937' }} />

        <p className="text-white font-semibold text-sm uppercase tracking-wider">What the agent changes</p>
        <div className="rounded-xl p-4 mt-3" style={{ background: '#0A0F1E' }}>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-gray-500 text-xs pb-2">Metric</th>
                <th className="text-left text-amber-400 text-xs pb-2">Today</th>
                <th className="text-left text-emerald-400 text-xs pb-2">With Agent</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {[
                ['Match rate', '62%', '94%'],
                ['Exceptions', '127', '8'],
                ['Time to close', '6 days', '4 hours'],
                ['Manual touches', '380', '12'],
              ].map(([m, t, a]) => (
                <tr key={m}>
                  <td className="py-1 text-gray-400">{m}</td>
                  <td className="py-1 text-amber-400">{t}</td>
                  <td className="py-1 text-emerald-400">{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-600 text-xs mt-auto pt-6">The demo on the right shows the agent running live on a representative data set.</p>
      </div>

      {/* Right Panel — Workspace */}
      <div className="flex-1 overflow-y-auto p-8" style={{ background: '#0A0F1E' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white text-xl font-semibold">Reconciliation Workspace</h3>
            <p className="text-gray-500 text-sm">Bank statement · ERP ledger · Physical cash — agent-matched in real time</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${hasRun ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
            {hasRun ? '✓ Run complete · 4 match groups' : 'Awaiting run'}
          </span>
        </div>

        {/* Data Sources */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: '🏦', name: 'Bank Statement', detail: `${bankStatement.length} entries imported`, ready: true },
            { icon: '📒', name: 'ERP Ledger', detail: `${erpLedger.length} entries · invoices + fees`, ready: true },
            { icon: '💵', name: 'Cash / Vault', detail: `${cashPhysical.length} entries · site records`, ready: true },
          ].map(s => (
            <div key={s.name} className="rounded-xl p-4 flex items-center gap-3 border" style={{ background: '#111827', borderColor: '#1F2937' }}>
              <span className="text-2xl">{s.icon}</span>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">{s.name}</p>
                <p className="text-gray-500 text-xs">{s.detail}</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
          ))}
        </div>

        {/* Run Trigger */}
        <div className="rounded-2xl p-6 border mb-6 relative overflow-hidden" style={{ background: '#1E293B', borderColor: isRunning ? '#6366F180' : '#6366F14D' }}>
          {isRunning && (
            <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-pulse rounded-full" />
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl text-indigo-400">⚡</span>
              <div>
                <p className="text-white text-lg font-semibold">Run Reconciliation Agent</p>
                <p className="text-gray-500 text-sm">Agent will match across all three sources, flag exceptions, and suggest resolutions.</p>
              </div>
            </div>
            <button
              onClick={runAgent}
              disabled={isRunning}
              className="px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: hasRun ? 'transparent' : '#6366F1', border: hasRun ? '1px solid #1F2937' : 'none' }}
            >
              {isRunning ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Agent is working…
                </span>
              ) : hasRun ? '↺ Re-run Agent' : '▶ Run Agent'}
            </button>
          </div>
        </div>

        {/* Empty state */}
        {!hasRun && !isRunning && (
          <div className="rounded-xl border-2 border-dashed p-12 text-center" style={{ borderColor: '#1F2937' }}>
            <p className="text-gray-600 text-sm">Run the agent to see results</p>
          </div>
        )}

        {/* Match Results */}
        <AnimatePresence>
          {hasRun && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-4">
                <p className="text-white font-semibold">Match Groups</p>
                <span className="inline-flex items-center gap-1 bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 rounded-full px-2.5 py-0.5 text-xs font-medium">⚡ Agent</span>
                <span className="text-gray-500 text-xs ml-auto">4 groups · 3 matched · 1 exception</span>
              </div>

              {/* Match group cards */}
              <div className="space-y-3 mb-6">
                {matchGroups.map(mg => (
                  <MatchGroupCard
                    key={mg.id}
                    mg={mg}
                    isResolved={mg.id === 'MG-004' && exceptionResolved}
                    onApprove={mg.id === 'MG-004' ? approveException : undefined}
                  />
                ))}
              </div>

              {/* Audit Trail */}
              <div className="rounded-xl border p-4 mb-6" style={{ background: '#111827', borderColor: '#1F2937' }}>
                <button onClick={() => setShowAudit(!showAudit)} className="w-full text-left flex items-center justify-between text-white text-sm font-semibold">
                  <span>View Audit Trail ({auditTrail.length} entries)</span>
                  <span className="text-gray-500">{showAudit ? '▲' : '▼'}</span>
                </button>
                <AnimatePresence>
                  {showAudit && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mt-4 space-y-2">
                        {auditTrail.map((entry, i) => (
                          <motion.div
                            key={`${entry.time}-${i}`}
                            initial={i === 0 && auditTrail.length > auditTrailInitial.length ? { backgroundColor: 'rgba(16, 185, 129, 0.15)' } : {}}
                            animate={{ backgroundColor: 'transparent' }}
                            transition={{ duration: 1 }}
                            className="flex items-start gap-3 text-xs py-1.5"
                          >
                            <span className="text-gray-600 font-mono whitespace-nowrap">{entry.time}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${entry.actor === 'Agent' ? 'bg-indigo-500/15 text-indigo-300' : 'bg-emerald-500/15 text-emerald-300'}`}>{entry.actor}</span>
                            <span className="text-gray-400">{entry.action}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Match Rate', value: 94, suffix: '%', color: 'text-emerald-400', sub: '' },
                  { label: 'Exceptions Surfaced', value: 8, suffix: '', color: 'text-amber-400', sub: '↓ from 127 manual' },
                  { label: 'Est. Time to Close', value: 4, suffix: ' hrs', color: 'text-emerald-400', sub: '↓ from 6 days' },
                  { label: 'Provisions Impact', value: 40, suffix: '–45 Cr', color: 'text-indigo-400', sub: 'recoverable/yr · illustrative', prefix: '~₹' },
                ].map(m => (
                  <div key={m.label} className="rounded-xl p-4 border text-center" style={{ background: '#111827', borderColor: '#1F2937' }}>
                    <p className={`text-2xl font-bold ${m.color}`}>
                      {m.prefix || ''}<CountUp end={m.value} duration={1200} />{m.suffix}
                    </p>
                    <p className="text-white text-xs font-semibold mt-1">{m.label}</p>
                    {m.sub && <p className="text-gray-600 text-[10px] mt-0.5">{m.sub}</p>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Match Group Card subcomponent
const MatchGroupCard: React.FC<{ mg: MatchGroup; isResolved: boolean; onApprove?: () => void }> = ({ mg, isResolved, onApprove }) => {
  const isException = mg.status === 'exception';
  const resolved = isException && isResolved;
  const borderColor = resolved ? '#10B98140' : isException ? '#EF444440' : '#1F2937';

  return (
    <motion.div
      className="rounded-xl border p-5 transition-colors duration-300"
      style={{ background: '#111827', borderColor }}
      animate={resolved ? { borderColor: ['#10B981', '#10B98140'] } : {}}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${resolved ? 'bg-emerald-500/20 text-emerald-400' : isException ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {resolved ? '✓ Resolved' : isException ? '⚠ Exception' : '✓ Matched'}
          </span>
          <span className="text-gray-600 text-xs">{mg.id}</span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${mg.confidence === 'High' ? 'bg-emerald-500/10 text-emerald-400' : mg.confidence === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
            {mg.confidence}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 rounded-full px-2 py-0.5 text-[10px] font-medium">⚡ Agent</span>
      </div>

      {/* Items */}
      <div className="space-y-1 mb-2">
        {mg.items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-xs">
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${item.source === 'Bank' ? 'bg-blue-500/15 text-blue-300' : item.source === 'ERP' ? 'bg-violet-500/15 text-violet-300' : 'bg-amber-500/15 text-amber-300'}`}>{item.source}</span>
            <span className="text-gray-400 font-mono">{item.ref}</span>
            <span className="text-white font-semibold ml-auto">{item.amount}</span>
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-xs">{mg.reason}</p>
      {mg.agentNote && <p className="text-indigo-300/70 text-xs mt-1 italic">{mg.agentNote}</p>}

      {/* Exception block */}
      {isException && !resolved && mg.agentSuggestion && (
        <div className="mt-3 rounded-xl p-3 border" style={{ background: '#6366F108', borderColor: '#6366F130' }}>
          <p className="text-indigo-300 text-xs font-medium mb-1">⚡ Agent suggests:</p>
          <p className="text-gray-400 text-xs leading-relaxed">{mg.agentSuggestion}</p>
          <div className="flex gap-2 mt-3">
            <button onClick={onApprove} className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white transition-all hover:scale-[1.02]" style={{ background: '#10B981' }}>
              ✓ Approve Resolution
            </button>
            <button className="px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:bg-red-500/10" style={{ color: '#EF4444', borderColor: '#EF444440' }}>
              ✗ Reject
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ReconciliationScreen;
