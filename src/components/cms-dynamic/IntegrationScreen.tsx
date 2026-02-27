import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { integrationJobs, IntegrationJob } from '@/data/orderBook';

const IntegrationScreen: React.FC = () => {
  const [jobs, setJobs] = useState<IntegrationJob[]>(integrationJobs);
  const [runningJobId, setRunningJobId] = useState<string | null>(null);
  const [testCounter, setTestCounter] = useState(0);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const runTests = useCallback((jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    setRunningJobId(jobId);
    setTestCounter(0);

    // Animate counter
    const total = job.totalTests;
    const interval = 3000 / total;
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setTestCounter(count);
      if (count >= total) {
        clearInterval(timer);
        setTimeout(() => {
          setRunningJobId(null);
          setJobs(prev => prev.map(j =>
            j.id === jobId
              ? { ...j, status: 'failures' as const, failures: 2, lastActivity: `Agent ran ${total} tests — 2 failures detected. Surfaced for review.`, failureDetails: [
                  { testId: "TC-041", description: "API endpoint /txn/reconcile returned HTTP 503 under high-volume payload (>500 transactions/batch).", agentSuggestion: "Increase request timeout on the client adapter from 15s to 30s in config/adapters.json." },
                  { testId: "TC-089", description: "Card scheme code 'PREPAID_VARIANT' not found in mapping table.", agentSuggestion: "Add mapping entry for PREPAID_VARIANT → STANDARD_PREPAID in config/schemes.json at line 44." },
                ] }
              : j
          ));
          toast.success(`Tests complete · 2 failures surfaced`);
        }, 400);
      }
    }, interval);
  }, [jobs]);

  const getStatusBadge = (job: IntegrationJob, isRunning: boolean) => {
    if (isRunning) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">🔬 Testing…</span>;
    switch (job.status) {
      case 'completed': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">✓ Completed</span>;
      case 'failures': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/20 text-red-400 border border-red-500/30">⚠ {job.failures} Failures</span>;
      case 'pending': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-500/20 text-gray-400 border border-gray-500/30">⏳ Pending</span>;
      case 'failed': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/20 text-red-400 border border-red-500/30">✗ Failed</span>;
    }
  };

  const completedCount = jobs.filter(j => j.status === 'completed').length;
  const testingCount = jobs.filter(j => j.status === 'failures').length;
  const pendingCount = jobs.filter(j => j.status === 'pending').length;
  const failedCount = jobs.filter(j => j.status === 'failed').length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex h-[calc(100vh-7.5rem)]"
    >
      {/* Left Panel */}
      <div className="w-[38%] flex-shrink-0 border-r overflow-y-auto p-8 flex flex-col" style={{ background: 'linear-gradient(to bottom, #111827, #0A0F1E)', borderColor: '#1F2937' }}>
        <span className="text-gray-500 text-xs">Demo 2 of 3</span>
        <span className="inline-flex items-center gap-1 mt-2 bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 rounded-full px-2.5 py-1 text-xs font-medium w-fit">
          ⚡ Revenue Unblock — Integration & Testing Agent
        </span>
        <h2 className="text-3xl font-bold text-white leading-snug mt-4">
          Revenue is won — but sitting unrecognised. Manual integration is the bottleneck.
        </h2>
        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
          X Company has won a significant volume of new contracts with institutional clients. But to go live, X Company's software must integrate with each client's core systems — often legacy stacks with rigid APIs and complex data formats. Today, this integration is done manually: developers map data structures by hand, QA engineers run hundreds of test scripts one-by-one. Each client onboarding takes 16–20 weeks. Until integration is signed off, revenue cannot be recognised.
        </p>

        <div className="border-t my-6" style={{ borderColor: '#1F2937' }} />
        <p className="text-white font-semibold text-sm uppercase tracking-wider">What this costs today</p>
        <div className="space-y-3 mt-3">
          {[
            { icon: '📦', label: 'Order book won, not yet executed', value: '~85%' },
            { icon: '⏳', label: 'Onboarding time per client (manual)', value: '16–20 weeks' },
            { icon: '🧪', label: 'QA test scripts run by hand per client', value: '400–600' },
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
            <thead><tr><th className="text-left text-gray-500 text-xs pb-2">Metric</th><th className="text-left text-amber-400 text-xs pb-2">Today</th><th className="text-left text-emerald-400 text-xs pb-2">With Agent</th></tr></thead>
            <tbody className="text-white">
              {[['Onboarding time', '16–20 weeks', '6–9 weeks'], ['Human-run tests', '400–600', '0'], ['Failures surfaced', 'Weeks later', 'Minutes']].map(([m, t, a]) => (
                <tr key={m}><td className="py-1 text-gray-400">{m}</td><td className="py-1 text-amber-400">{t}</td><td className="py-1 text-emerald-400">{a}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-xs mt-auto pt-6">The demo shows the agent running integration tests autonomously — you only touch what fails.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 overflow-y-auto p-8" style={{ background: '#0A0F1E' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white text-xl font-semibold">Integration & Testing Pipeline</h3>
            <p className="text-gray-500 text-sm">Agent runs integration tests across pending client onboardings — you review failures only</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-gray-500/20 text-gray-400 border-gray-500/30">
            {jobs.length} clients in pipeline · Agent ready
          </span>
        </div>

        {/* Pipeline summary */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Completed', count: completedCount, color: 'emerald', icon: '✓' },
            { label: 'In Testing', count: testingCount, color: 'amber', icon: '🔬' },
            { label: 'Pending', count: pendingCount, color: 'gray', icon: '⏳' },
            { label: 'Failed', count: failedCount, color: 'red', icon: '✗' },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 border text-center" style={{ background: '#111827', borderColor: '#1F2937' }}>
              <p className={`text-xl font-bold text-${s.color}-400`}>{s.count}</p>
              <p className="text-gray-500 text-xs">{s.icon} {s.label}</p>
            </div>
          ))}
        </div>

        {/* Jobs table */}
        <div className="rounded-xl border overflow-hidden" style={{ background: '#111827', borderColor: '#1F2937' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#0A0F1E' }}>
                <th className="text-left text-gray-500 text-xs font-semibold p-3">Client / Project</th>
                <th className="text-left text-gray-500 text-xs font-semibold p-3">Environment</th>
                <th className="text-left text-gray-500 text-xs font-semibold p-3">Status</th>
                <th className="text-left text-gray-500 text-xs font-semibold p-3">Last Agent Activity</th>
                <th className="text-left text-gray-500 text-xs font-semibold p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => {
                const isRunning = runningJobId === job.id;
                return (
                  <React.Fragment key={job.id}>
                    <tr className="border-t" style={{ borderColor: '#1F2937' }}>
                      <td className="p-3">
                        <p className="text-white text-sm font-semibold">{job.client}</p>
                        <p className="text-gray-500 text-xs">{job.project}</p>
                      </td>
                      <td className="p-3"><span className="text-gray-400 text-xs px-2 py-0.5 rounded" style={{ background: '#0A0F1E' }}>{job.environment}</span></td>
                      <td className="p-3">{getStatusBadge(job, isRunning)}</td>
                      <td className="p-3 max-w-[280px]">
                        <p className="text-gray-400 text-xs">
                          {isRunning ? `Running… (${testCounter}/${job.totalTests} tests)` : job.lastActivity}
                        </p>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1.5">
                          {job.status === 'pending' && !isRunning && (
                            <button onClick={() => runTests(job.id)} className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all hover:scale-[1.02]" style={{ background: '#6366F1' }}>▶ Run Tests</button>
                          )}
                          {job.status === 'failures' && job.failureDetails && (
                            <button onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)} className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:bg-red-500/10" style={{ color: '#EF4444', borderColor: '#EF444440' }}>View Failures</button>
                          )}
                          {(job.status === 'completed' || job.status === 'failures' || job.status === 'failed') && (
                            <button className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 border transition-all hover:border-indigo-500/50 hover:text-white" style={{ borderColor: '#1F2937' }}>View Report</button>
                          )}
                          {job.status === 'failed' && (
                            <button className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 border transition-all hover:border-indigo-500/50" style={{ borderColor: '#1F2937' }}>Retry</button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {/* Expanded failure details */}
                    <AnimatePresence>
                      {expandedJobId === job.id && job.failureDetails && (
                        <tr>
                          <td colSpan={5} className="p-0">
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="p-6 space-y-3" style={{ background: '#0A0F1E' }}>
                                <p className="text-white text-sm font-semibold">Test Failures — {job.client}</p>
                                {job.failureDetails.map(f => (
                                  <div key={f.testId} className="rounded-xl p-4 border" style={{ background: 'rgba(239, 68, 68, 0.03)', borderColor: 'rgba(239, 68, 68, 0.13)' }}>
                                    <p className="text-red-400 text-xs font-semibold mb-1">✗ {f.testId}</p>
                                    <p className="text-gray-400 text-xs mb-3">{f.description}</p>
                                    <div className="rounded-xl p-3 border" style={{ background: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                                      <p className="text-indigo-300 text-xs font-medium">⚡ Agent suggests:</p>
                                      <p className="text-gray-400 text-xs mt-1">{f.agentSuggestion}</p>
                                    </div>
                                  </div>
                                ))}
                                <div className="rounded-xl p-3 border" style={{ background: '#111827', borderColor: '#1F2937' }}>
                                  <p className="text-emerald-400 text-xs">✓ {(job.totalTests || 0) - (job.failures || 0)} other tests passed — no action required</p>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Revenue Impact */}
        <div className="rounded-2xl p-5 mt-6 border" style={{ background: 'rgba(99, 102, 241, 0.03)', borderColor: 'rgba(99, 102, 241, 0.13)' }}>
          <p className="text-indigo-300 text-sm leading-relaxed">
            <span className="font-semibold">⚡ Agent insight:</span> Completing the {pendingCount} pending clients could unlock recognition of deferred revenue from the order backlog. Reducing onboarding from 20 weeks to 8 weeks per client = earlier revenue recognition and improved working capital position. <span className="text-gray-600">(Illustrative — based on pipeline data above.)</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default IntegrationScreen;
