import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { fleetRuns, agentActionQueue, FleetRun, AgentAction } from '@/data/routeDispatch';
import CountUp from './CountUp';

const RouteDispatchScreen: React.FC = () => {
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [fleet, setFleet] = useState<FleetRun[]>(fleetRuns);
  const [actions, setActions] = useState<AgentAction[]>(agentActionQueue);
  const [approvedActions, setApprovedActions] = useState<Set<string>>(new Set());
  const [executingActions, setExecutingActions] = useState<Set<string>>(new Set());
  const [showMaintModal, setShowMaintModal] = useState(false);

  const runScan = useCallback(() => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 3000);
  }, []);

  const approveAction = useCallback((actionId: string) => {
    setExecutingActions(prev => new Set(prev).add(actionId));

    setTimeout(() => {
      setExecutingActions(prev => { const s = new Set(prev); s.delete(actionId); return s; });
      setApprovedActions(prev => new Set(prev).add(actionId));

      // Update fleet
      if (actionId === 'AQ-001') {
        setFleet(prev => prev.map(f => f.id === 'R-101' ? { ...f, status: 'optimized' as const, lastActivity: 'Re-route approved — agent executing. ETA updated by -14 min. SLA protected.' } : f));
        toast.success("Re-route approved · SLA protected");
      } else if (actionId === 'AQ-002') {
        setShowMaintModal(true);
      } else if (actionId === 'AQ-003') {
        setFleet(prev => prev.map(f => f.id === 'R-105' ? { ...f, status: 'optimized' as const, lastActivity: 'Priority replenishment approved. Van 55 diverted to SITE-NE-019. ETA: 13:45.' } : f));
        toast.success("Cash depletion alert resolved");
      }
    }, 1200);
  }, []);

  const confirmMaintenance = useCallback(() => {
    setShowMaintModal(false);
    setFleet(prev => prev.map(f => f.id === 'R-102' ? { ...f, status: 'optimized' as const, lastActivity: 'Maintenance scheduled: Service Bay 2, tomorrow 06:00–10:00. Dispatcher notified. Routes updated.' } : f));
    toast.success("Maintenance scheduled · Routes updated");
  }, []);

  const approvedCount = approvedActions.size;
  const slaBreachesPrevented = [...approvedActions].filter(id => id === 'AQ-001' || id === 'AQ-003').length;

  const getFleetStatusBadge = (status: string) => {
    switch (status) {
      case 'sla-risk': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">⚠ SLA Risk</span>;
      case 'maintenance-due': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">🔧 Maintenance Due</span>;
      case 'optimized': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">✓ Optimized</span>;
      case 'on-route': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">On Route</span>;
      default: return null;
    }
  };

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
        <span className="text-gray-500 text-xs">Demo 3 of 3</span>
        <span className="inline-flex items-center gap-1 mt-2 bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 rounded-full px-2.5 py-1 text-xs font-medium w-fit">
          ⚡ Agentic Route & Dispatch Logic
        </span>
        <h2 className="text-3xl font-bold text-white leading-snug mt-4">
          Static routes and reactive dispatch are limiting fleet productivity — and exposing SLA risk
        </h2>
        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
          X Company operates a large distributed fleet serving tens of thousands of service points daily. Routes are planned in advance and rarely updated. When a vehicle breaks down, traffic disrupts a corridor, or a site needs urgent servicing, a dispatcher manually intervenes — often after the SLA window has already closed. Maintenance is calendar-based, not condition-based.
        </p>

        <div className="border-t my-6" style={{ borderColor: '#1F2937' }} />
        <p className="text-white font-semibold text-sm uppercase tracking-wider">Scale of operations</p>
        <div className="space-y-3 mt-3">
          {[
            { icon: '🚛', label: 'Service points in the network', value: '153,000+' },
            { icon: '📍', label: 'Trips per day (peak)', value: '8,000+' },
            { icon: '💸', label: 'Potential fuel + ops savings (AI routing)', value: '10–15%' },
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
              {[['Route updates', 'Manual dispatcher', 'Agent auto-suggests <60s'], ['Maintenance', 'Calendar-based', 'Predictive (telemetry)'], ['SLA breach', 'Detected after', 'Flagged before']].map(([m, t, a]) => (
                <tr key={m}><td className="py-1 text-gray-400">{m}</td><td className="py-1 text-amber-400">{t}</td><td className="py-1 text-emerald-400">{a}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-xs mt-auto pt-6">The demo shows the agent monitoring a live fleet and surfacing prioritised actions for your approval.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 overflow-y-auto p-8" style={{ background: '#0A0F1E' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white text-xl font-semibold">Fleet Intelligence & Dispatch</h3>
            <p className="text-gray-500 text-sm">Agent monitors fleet telemetry, live traffic, and service demand — surfaces actions for approval</p>
          </div>
          {hasRun && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-amber-500/20 text-amber-400 border-amber-500/30">
              ⚡ {Math.max(0, 3 - approvedCount)} agent actions pending approval
            </span>
          )}
        </div>

        {/* Run trigger */}
        <div className="rounded-2xl p-6 border mb-6 relative overflow-hidden" style={{ background: '#1E293B', borderColor: isRunning ? '#6366F180' : '#6366F14D' }}>
          {isRunning && <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-pulse rounded-full" />}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl text-indigo-400">⚡</span>
              <div>
                <p className="text-white text-lg font-semibold">Scan Fleet & Surface Actions</p>
                <p className="text-gray-500 text-sm">Agent will analyse telemetry, traffic feeds, and SLA windows across all active runs.</p>
              </div>
            </div>
            <button onClick={runScan} disabled={isRunning} className="px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50" style={{ background: hasRun ? 'transparent' : '#6366F1', border: hasRun ? '1px solid #1F2937' : 'none' }}>
              {isRunning ? <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Scanning…</span> : hasRun ? '↺ Re-scan' : '▶ Run Agent Scan'}
            </button>
          </div>
        </div>

        {!hasRun && !isRunning && (
          <div className="rounded-xl border-2 border-dashed p-12 text-center" style={{ borderColor: '#1F2937' }}>
            <p className="text-gray-600 text-sm">Run the agent to see results</p>
          </div>
        )}

        <AnimatePresence>
          {hasRun && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              {/* Fleet table */}
              <div className="rounded-xl border overflow-hidden mb-6" style={{ background: '#111827', borderColor: '#1F2937' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#0A0F1E' }}>
                      <th className="text-left text-gray-500 text-xs font-semibold p-3">Run / Vehicle</th>
                      <th className="text-left text-gray-500 text-xs font-semibold p-3">Cluster / Route</th>
                      <th className="text-left text-gray-500 text-xs font-semibold p-3">Status</th>
                      <th className="text-left text-gray-500 text-xs font-semibold p-3">Last Agent Activity</th>
                      <th className="text-left text-gray-500 text-xs font-semibold p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fleet.map(run => (
                      <tr key={run.id} className="border-t" style={{ borderColor: '#1F2937' }}>
                        <td className="p-3">
                          <p className="text-white text-sm font-semibold">{run.id}</p>
                          <p className="text-gray-500 text-xs">{run.vehicle}</p>
                        </td>
                        <td className="p-3 text-gray-400 text-xs">{run.cluster}</td>
                        <td className="p-3">{getFleetStatusBadge(run.status)}</td>
                        <td className="p-3 max-w-[280px]"><p className="text-gray-400 text-xs">{run.lastActivity}</p></td>
                        <td className="p-3">
                          {run.status === 'sla-risk' && run.agentActionId && !approvedActions.has(run.agentActionId) && (
                            <button onClick={() => approveAction(run.agentActionId!)} className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white" style={{ background: '#6366F1' }}>Approve Re-route</button>
                          )}
                          {run.status === 'maintenance-due' && run.agentActionId && !approvedActions.has(run.agentActionId) && (
                            <button onClick={() => approveAction(run.agentActionId!)} className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white" style={{ background: '#F59E0B' }}>Schedule Now</button>
                          )}
                          {(run.status === 'on-route' || run.status === 'optimized') && (
                            <button className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 border hover:border-indigo-500/50" style={{ borderColor: '#1F2937' }}>Track</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Agent Action Queue */}
              <p className="text-white font-semibold mb-1">Agent Action Queue</p>
              <p className="text-gray-500 text-sm mb-4">({Math.max(0, 3 - approvedCount)} actions — approve to execute)</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {actions.map(a => {
                  const isApproved = approvedActions.has(a.id);
                  const isExecuting = executingActions.has(a.id);
                  const urgencyColor = a.urgency === 'high' ? 'bg-red-500/15 text-red-400 border-red-500/25' : 'bg-amber-500/15 text-amber-400 border-amber-500/25';

                  return (
                    <motion.div
                      key={a.id}
                      className="rounded-2xl border p-5 flex flex-col transition-colors duration-300 hover:border-indigo-500/30 hover:ring-1 hover:ring-indigo-500/25"
                      style={{ background: '#111827', borderColor: isApproved ? '#10B98140' : '#1F2937' }}
                      animate={isApproved ? { borderColor: ['#10B981', '#10B98140'] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border w-fit mb-2 ${isApproved ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' : urgencyColor}`}>
                        {isApproved ? '✓ Approved' : a.type}
                      </span>
                      <p className="text-white text-sm font-semibold">{a.vehicle}</p>
                      <p className="text-gray-500 text-xs mb-2">{a.route}</p>
                      <p className="text-gray-400 text-xs">{a.summary}</p>
                      <div className="rounded-xl p-3 mt-3 text-xs text-gray-500" style={{ background: '#0A0F1E' }}>
                        <span className="text-gray-600">Agent reasoning:</span> {a.reasoning}
                      </div>
                      <p className="text-red-400 text-xs mt-2">Risk: {a.riskIfIgnored}</p>
                      {!isApproved && !isExecuting && (
                        <div className="mt-auto pt-3 space-y-2">
                          <button onClick={() => approveAction(a.id)} className="w-full px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:scale-[1.02]" style={{ background: '#6366F1' }}>✓ Approve</button>
                          <button className="w-full px-4 py-1.5 rounded-xl text-xs font-semibold text-gray-400 border hover:text-white" style={{ borderColor: '#1F2937' }}>Dismiss</button>
                        </div>
                      )}
                      {isExecuting && <p className="text-indigo-300 text-xs mt-auto pt-3 animate-pulse">Executing…</p>}
                      {isApproved && <p className="text-emerald-400 text-xs mt-auto pt-3">⚡ Done</p>}
                    </motion.div>
                  );
                })}
              </div>

              {/* Outcome strip */}
              {approvedCount > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-5 flex items-center gap-8" style={{ background: '#111827', borderColor: '#1F2937' }}>
                  <div className="text-center">
                    <p className="text-emerald-400 text-2xl font-bold"><CountUp end={approvedCount} duration={600} /></p>
                    <p className="text-gray-500 text-xs">Actions approved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-emerald-400 text-2xl font-bold"><CountUp end={slaBreachesPrevented} duration={600} /></p>
                    <p className="text-gray-500 text-xs">SLA breaches prevented</p>
                  </div>
                  {approvedActions.has('AQ-001') && (
                    <div className="text-center">
                      <p className="text-indigo-400 text-2xl font-bold">12%</p>
                      <p className="text-gray-500 text-xs">Est. fuel saving (this run)</p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Maintenance Modal */}
        <AnimatePresence>
          {showMaintModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="rounded-2xl p-6 max-w-md border" style={{ background: '#111827', borderColor: '#1F2937' }}>
                <p className="text-white font-semibold mb-3">Schedule Maintenance — Van 34</p>
                <p className="text-gray-400 text-sm mb-4">Vehicle scheduled for maintenance: Service Bay 2, tomorrow 06:00–10:00 (off-peak window). Dispatcher notified. Tomorrow's routes updated automatically.</p>
                <button onClick={confirmMaintenance} className="w-full px-5 py-2.5 rounded-xl font-semibold text-white transition-all hover:scale-[1.02]" style={{ background: '#6366F1' }}>Confirm</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RouteDispatchScreen;
