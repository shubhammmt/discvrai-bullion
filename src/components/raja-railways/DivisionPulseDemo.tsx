import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle, Cloud, User, Package, Shield, TrendingUp, Cpu } from 'lucide-react';
import { toast } from 'sonner';
import { inputEvents, agentLog, decisionBrief } from '@/data/rajaRailwaysData';

const iconMap: Record<string, React.ReactNode> = {
  delay: <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />,
  weather: <Cloud className="w-4 h-4 text-blue-400" />,
  staff: <User className="w-4 h-4 text-purple-400" />,
  freight: <Package className="w-4 h-4 text-green-400" />,
};

const agentColors: Record<string, string> = {
  Ops: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Safety: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Revenue: 'bg-green-500/20 text-green-300 border-green-500/30',
};

const agentIcons: Record<string, React.ReactNode> = {
  Ops: <Cpu className="w-3.5 h-3.5" />,
  Safety: <Shield className="w-3.5 h-3.5" />,
  Revenue: <TrendingUp className="w-3.5 h-3.5" />,
};

export const DivisionPulseDemo: React.FC = () => {
  const [visibleEvents, setVisibleEvents] = useState<number>(0);
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [showBrief, setShowBrief] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    // Stagger input events
    const eventTimers = inputEvents.map((_, i) =>
      setTimeout(() => setVisibleEvents(i + 1), 800 * (i + 1))
    );

    // After all events, start agent logs
    const logDelay = 800 * inputEvents.length + 600;
    const logTimers = agentLog.map((_, i) =>
      setTimeout(() => setVisibleLogs(i + 1), logDelay + 1200 * (i + 1))
    );

    // Show brief after all logs
    const briefTimer = setTimeout(
      () => setShowBrief(true),
      logDelay + 1200 * agentLog.length + 800
    );

    return () => {
      eventTimers.forEach(clearTimeout);
      logTimers.forEach(clearTimeout);
      clearTimeout(briefTimer);
    };
  }, []);

  const handleApprove = () => {
    setApproved(true);
    toast.success('Decision Brief approved · Actions logged', {
      description: 'All 3 actions have been dispatched to respective departments.',
    });
  };

  return (
    <div className="h-screen bg-[#0c1a3a] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="h-1 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]" />
      <div className="px-6 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
            <Cpu className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <span className="text-white font-semibold text-sm">24-Hour Division Pulse</span>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">LIVE</Badge>
        </div>
        <span className="text-gray-500 text-xs">Secunderabad Division · Simulation</span>
      </div>

      {/* Three columns */}
      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        {/* Left: Input Feed */}
        <div className="col-span-3 border-r border-white/10 p-4 overflow-y-auto">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Live Input Feed</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {inputEvents.slice(0, visibleEvents).map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">{iconMap[ev.type]}</div>
                        <div>
                          <span className="text-[10px] text-gray-500 font-mono">{ev.time}</span>
                          <p className="text-xs text-gray-300 mt-0.5">{ev.text}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            {visibleEvents === 0 && (
              <div className="text-center py-8">
                <div className="w-6 h-6 border-2 border-[#F59E0B]/40 border-t-[#F59E0B] rounded-full animate-spin mx-auto" />
                <p className="text-xs text-gray-500 mt-2">Awaiting input...</p>
              </div>
            )}
          </div>
        </div>

        {/* Center: Agent Process Log */}
        <div className="col-span-5 border-r border-white/10 p-4 overflow-y-auto">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Agent Process Log</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {agentLog.slice(0, visibleLogs).map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${agentColors[log.agent]}`}>
                      {agentIcons[log.agent]}
                    </div>
                    <div className="flex-1">
                      <Badge className={`${agentColors[log.agent]} text-[10px] mb-1.5 border`}>
                        {log.agent} Agent
                      </Badge>
                      <p className="text-xs text-gray-300 leading-relaxed">{log.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {visibleLogs === 0 && visibleEvents > 0 && (
              <div className="text-center py-8">
                <div className="w-6 h-6 border-2 border-blue-400/40 border-t-blue-400 rounded-full animate-spin mx-auto" />
                <p className="text-xs text-gray-500 mt-2">Agents processing...</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Decision Brief */}
        <div className="col-span-4 p-4 overflow-y-auto">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Decision Brief</h3>
          <AnimatePresence>
            {showBrief ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`border-2 transition-colors duration-500 ${
                  approved ? 'bg-green-500/10 border-green-500/40' : 'bg-white/5 border-[#F59E0B]/30'
                }`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-white flex items-center gap-2">
                      {approved && <Check className="w-4 h-4 text-green-400" />}
                      {approved ? 'Brief Approved' : 'Awaiting Approval'}
                    </CardTitle>
                    <p className="text-xs text-gray-400">{decisionBrief.summary}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {decisionBrief.actions.map((action, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.3 }}
                        className="flex items-start gap-2"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          approved ? 'bg-green-500/20' : 'bg-[#F59E0B]/20'
                        }`}>
                          <Check className={`w-3 h-3 ${approved ? 'text-green-400' : 'text-[#F59E0B]'}`} />
                        </div>
                        <p className="text-xs text-gray-300">{action}</p>
                      </motion.div>
                    ))}

                    {!approved && (
                      <Button
                        onClick={handleApprove}
                        className="w-full mt-4 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold"
                      >
                        Approve All
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-xs text-gray-500">Awaiting agent consensus...</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
