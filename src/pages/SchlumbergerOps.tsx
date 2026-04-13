import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, AlertTriangle, ArrowRight, BarChart3, Bot, Check, CheckCircle2,
  ChevronRight, Clock, Cpu, Drill, Eye, EyeOff, Factory, Gauge, Globe2,
  Layers, LayoutDashboard, MapPin, Package, Play, Radio, RefreshCw,
  Shield, Target, TrendingDown, TrendingUp, Truck, Users, Workflow,
  X, Zap, CircleDot, ArrowUpRight, Timer, Boxes, ChevronDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  globalMetrics, regions, operationalAlerts, useCases, exceptions,
  materialShortages, decisionLog, executiveKPIs,
  type OperationalAlert, type UseCase
} from '@/data/schlumbergerOps';

// ── Severity colors ──
const severityColor = (s: string) => {
  if (s === 'critical') return 'bg-red-500/20 text-red-400 border-red-500/30';
  if (s === 'high') return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
};
const severityDot = (s: string) => {
  if (s === 'critical') return 'bg-red-500';
  if (s === 'high') return 'bg-amber-500';
  return 'bg-blue-500';
};
const statusColor = (s: string) => {
  if (s === 'optimal') return 'text-emerald-400';
  if (s === 'warning') return 'text-amber-400';
  return 'text-red-400';
};

// ── Metric Icon Map ──
const metricIcons: Record<string, React.ReactNode> = {
  Drill: <Drill className="w-5 h-5" />,
  Factory: <Factory className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
};

const SchlumbergerOps = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'usecase' | 'exceptions' | 'materials' | 'executive'>('dashboard');
  const [selectedAlert, setSelectedAlert] = useState<OperationalAlert | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [approvedSteps, setApprovedSteps] = useState<Record<number, boolean>>({});
  const [showUseCaseModal, setShowUseCaseModal] = useState(false);

  const handleAlertClick = (alert: OperationalAlert) => {
    setSelectedAlert(alert);
    if (alert.useCaseId) {
      const uc = useCases.find(u => u.id === alert.useCaseId);
      if (uc) {
        setSelectedUseCase(uc);
        setShowUseCaseModal(true);
        setApprovedSteps({});
      }
    }
  };

  const handleApprove = (ucId: number) => {
    setApprovedSteps(prev => ({ ...prev, [ucId]: true }));
  };

  const navItems = [
    { id: 'dashboard' as const, label: 'Control Tower', icon: LayoutDashboard },
    { id: 'exceptions' as const, label: 'Exceptions', icon: AlertTriangle },
    { id: 'materials' as const, label: 'Materials', icon: Boxes },
    { id: 'executive' as const, label: 'Executive', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex">
      {/* ── Sidebar ── */}
      <div className="w-16 lg:w-56 bg-[#0d1220] border-r border-slate-800/50 flex flex-col shrink-0">
        <div className="p-3 lg:p-4 border-b border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <div className="hidden lg:block">
              <div className="text-xs font-bold text-teal-400 tracking-wider">DISCVR.AI</div>
              <div className="text-[10px] text-slate-500">Control Tower</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeView === item.id
                  ? 'bg-teal-500/15 text-teal-400 border border-teal-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden lg:inline text-[10px] text-slate-500">Systems Online</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-12 bg-[#0d1220] border-b border-slate-800/50 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-slate-200">Schlumberger — Operational Control Tower</h1>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">LIVE</Badge>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-500">
            <span>Last sync: 2 min ago</span>
            <RefreshCw className="w-3 h-3" />
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="p-4 lg:p-6 space-y-6">
            <AnimatePresence mode="wait">
              {activeView === 'dashboard' && <DashboardView onAlertClick={handleAlertClick} />}
              {activeView === 'exceptions' && <ExceptionsView />}
              {activeView === 'materials' && <MaterialsView />}
              {activeView === 'executive' && <ExecutiveView />}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      {/* ── Use Case Modal ── */}
      <Dialog open={showUseCaseModal} onOpenChange={setShowUseCaseModal}>
        <DialogContent className="max-w-5xl bg-[#0d1220] border-slate-700 text-slate-100 max-h-[90vh] overflow-y-auto">
          {selectedUseCase && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl text-teal-400 flex items-center gap-2">
                  <Workflow className="w-5 h-5" />
                  Use Case: {selectedUseCase.title}
                </DialogTitle>
                <p className="text-xs text-slate-400">{selectedUseCase.subtitle}</p>
              </DialogHeader>
              <UseCaseDetail useCase={selectedUseCase} approved={!!approvedSteps[selectedUseCase.id]} onApprove={() => handleApprove(selectedUseCase.id)} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ═══════════════════════════════════════
// DASHBOARD VIEW
// ═══════════════════════════════════════
const DashboardView = ({ onAlertClick }: { onAlertClick: (a: OperationalAlert) => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
    {/* Metrics */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {globalMetrics.map((m, i) => (
        <Card key={i} className={`bg-[#111827] border-slate-800/50 ${m.status === 'critical' ? 'border-red-500/30' : m.status === 'warning' ? 'border-amber-500/30' : 'border-slate-800/50'}`}>
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className={`${m.status === 'critical' ? 'text-red-400' : m.status === 'warning' ? 'text-amber-400' : 'text-teal-400'}`}>
                {metricIcons[m.icon]}
              </span>
              {m.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
              {m.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
            </div>
            <div className="text-2xl font-bold text-white">{m.value}</div>
            <div className="text-[10px] text-slate-500 mt-1">{m.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid lg:grid-cols-3 gap-4">
      {/* Region Map */}
      <div className="lg:col-span-2">
        <Card className="bg-[#111827] border-slate-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-teal-400" /> Global Operations Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {regions.map(r => (
                <div key={r.id} className="bg-[#0a0e17] rounded-lg p-4 border border-slate-800/50 hover:border-teal-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${statusColor(r.status)}`} />
                      <span className="text-sm font-semibold text-slate-200">{r.name}</span>
                    </div>
                    <Badge className={`text-[10px] ${r.status === 'optimal' ? 'bg-emerald-500/20 text-emerald-400' : r.status === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                      {r.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div><span className="text-slate-500">Rigs:</span> <span className="text-slate-200 font-medium">{r.rigs}</span></div>
                    <div><span className="text-slate-500">Wells:</span> <span className="text-slate-200 font-medium">{r.wells}</span></div>
                    <div><span className="text-slate-500">Prod vs Plan:</span> <span className={`font-medium ${r.productionVsPlan >= 95 ? 'text-emerald-400' : r.productionVsPlan >= 90 ? 'text-amber-400' : 'text-red-400'}`}>{r.productionVsPlan}%</span></div>
                    <div><span className="text-slate-500">Alerts:</span> <span className={`font-medium ${r.alerts > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{r.alerts}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Panel */}
      <Card className="bg-[#111827] border-slate-800/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
            <Bot className="w-4 h-4 text-teal-400" /> AI Decision Assistant
            <Badge className="bg-red-500/20 text-red-400 text-[10px] ml-auto">{operationalAlerts.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[360px]">
            <div className="space-y-1 p-3">
              {operationalAlerts.map(alert => (
                <button
                  key={alert.id}
                  onClick={() => onAlertClick(alert)}
                  className="w-full text-left p-3 rounded-lg bg-[#0a0e17] border border-slate-800/50 hover:border-teal-500/30 transition-all group"
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${severityDot(alert.severity)} ${alert.severity === 'critical' ? 'animate-pulse' : ''}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`text-[9px] ${severityColor(alert.severity)}`}>{alert.severity}</Badge>
                        <span className="text-[10px] text-slate-500">{alert.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium mb-1">{alert.title}</p>
                      <p className="text-[10px] text-slate-500 line-clamp-2">{alert.aiRecommendation}</p>
                      {alert.useCaseId && (
                        <div className="flex items-center gap-1 mt-2 text-teal-400 text-[10px] font-medium">
                          <Play className="w-3 h-3" /> View Full Workflow
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>

    {/* Decision Log */}
    <Card className="bg-[#111827] border-slate-800/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
          <Shield className="w-4 h-4 text-teal-400" /> Decision Audit Trail — Today
          <span className="text-[10px] text-slate-500 ml-2">{decisionLog.length} decisions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {decisionLog.slice(0, 6).map(d => (
            <div key={d.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0a0e17] border border-slate-800/30 text-xs">
              <span className="text-[10px] text-slate-500 w-16 shrink-0">{d.timestamp}</span>
              <Badge className={`text-[9px] shrink-0 ${d.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : d.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {d.status}
              </Badge>
              <span className="text-slate-300 flex-1 truncate">{d.decision}</span>
              <span className="text-[10px] text-slate-500 shrink-0">{d.madeBy}</span>
              {d.savingsUSD && <span className="text-emerald-400 text-[10px] font-mono shrink-0">${(d.savingsUSD / 1000).toFixed(0)}K</span>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// ═══════════════════════════════════════
// USE CASE DETAIL
// ═══════════════════════════════════════
const UseCaseDetail = ({ useCase, approved, onApprove }: { useCase: UseCase; approved: boolean; onApprove: () => void }) => (
  <div className="space-y-5 mt-2">
    {/* Scenario */}
    <div className="bg-[#0a0e17] rounded-lg p-4 border border-slate-800/50">
      <h3 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-2"><Radio className="w-3 h-3 text-red-400" /> SCENARIO</h3>
      <p className="text-sm text-slate-200">{useCase.scenario}</p>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      {/* System Checks */}
      <div className="bg-[#0a0e17] rounded-lg p-4 border border-slate-800/50">
        <h3 className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-2"><Cpu className="w-3 h-3 text-teal-400" /> SYSTEM CHECKS</h3>
        <div className="space-y-2">
          {useCase.systemChecks.map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-3 h-3 text-teal-400 mt-0.5 shrink-0" />
              <span className="text-slate-300">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis */}
      <div className="bg-[#0a0e17] rounded-lg p-4 border border-teal-500/20">
        <h3 className="text-xs font-semibold text-teal-400 mb-3 flex items-center gap-2"><Bot className="w-3 h-3" /> AI ANALYSIS</h3>
        <div className="space-y-2">
          {useCase.aiAnalysis.map((a, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <Zap className="w-3 h-3 text-teal-400 mt-0.5 shrink-0" />
              <span className="text-slate-300">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* AI Recommendations */}
    <div className="bg-[#0a0e17] rounded-lg p-4 border border-teal-500/20">
      <h3 className="text-xs font-semibold text-teal-400 mb-3 flex items-center gap-2"><Target className="w-3 h-3" /> AI RECOMMENDATIONS</h3>
      <div className="space-y-2">
        {useCase.aiRecommendations.map((r, i) => (
          <div key={i} className="flex items-center gap-2 text-xs bg-teal-500/5 rounded-md p-2 border border-teal-500/10">
            <ArrowRight className="w-3 h-3 text-teal-400 shrink-0" />
            <span className="text-slate-200">{r}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Decision Panel */}
    {!approved ? (
      <div className="bg-[#0a0e17] rounded-lg p-4 border border-amber-500/20">
        <h3 className="text-xs font-semibold text-amber-400 mb-3 flex items-center gap-2"><Shield className="w-3 h-3" /> DECISION REQUIRED</h3>
        <div className="flex flex-wrap gap-2">
          {useCase.decisionOptions.map((opt, i) => (
            <Button
              key={i}
              onClick={i === 0 ? onApprove : undefined}
              variant={i === 0 ? 'default' : 'outline'}
              size="sm"
              className={i === 0 ? 'bg-teal-600 hover:bg-teal-500 text-white text-xs' : 'border-slate-700 text-slate-300 text-xs hover:bg-slate-800'}
            >
              {i === 0 && <Check className="w-3 h-3 mr-1" />}
              {opt}
            </Button>
          ))}
        </div>
      </div>
    ) : (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        {/* Workflow Timeline */}
        <div className="bg-[#0a0e17] rounded-lg p-4 border border-emerald-500/20">
          <h3 className="text-xs font-semibold text-emerald-400 mb-3 flex items-center gap-2"><Workflow className="w-3 h-3" /> WORKFLOW EXECUTION</h3>
          <div className="space-y-3">
            {useCase.workflowSteps.map((step, i) => (
              <div key={step.id} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                    step.status === 'active' ? 'bg-teal-500/20 text-teal-400 animate-pulse' :
                    'bg-slate-800 text-slate-500'
                  }`}>
                    {step.status === 'completed' ? <Check className="w-3 h-3" /> : <CircleDot className="w-3 h-3" />}
                  </div>
                  {i < useCase.workflowSteps.length - 1 && <div className="w-px h-6 bg-slate-800 mt-1" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${step.status === 'completed' ? 'text-emerald-400' : step.status === 'active' ? 'text-teal-400' : 'text-slate-500'}`}>
                      {step.label}
                    </span>
                    {step.timestamp && <span className="text-[10px] text-slate-600">{step.timestamp}</span>}
                  </div>
                  {step.detail && <p className="text-[10px] text-slate-500 mt-0.5">{step.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI */}
        <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-lg p-4 border border-teal-500/20">
          <h3 className="text-xs font-semibold text-teal-400 mb-3 flex items-center gap-2"><TrendingUp className="w-3 h-3" /> ROI IMPACT</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {useCase.roiMetrics.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-lg font-bold text-white">{m.value}</div>
                <div className="text-[10px] text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-emerald-500/10 rounded-md border border-emerald-500/20">
            <p className="text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3" /> <strong>Outcome:</strong> {useCase.outcome}
            </p>
          </div>
        </div>
      </motion.div>
    )}
  </div>
);

// ═══════════════════════════════════════
// EXCEPTIONS VIEW
// ═══════════════════════════════════════
const ExceptionsView = () => {
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" /> Exception-Driven Control Tower
          </h2>
          <p className="text-xs text-slate-500">Only showing operational exceptions. Normal operations hidden.</p>
        </div>
        <Badge className="bg-red-500/20 text-red-400 text-xs">{exceptions.length - resolvedIds.size} active</Badge>
      </div>

      <div className="space-y-2">
        {exceptions.map(ex => (
          <Card key={ex.id} className={`bg-[#111827] border-slate-800/50 ${resolvedIds.has(ex.id) ? 'opacity-40' : ''} ${ex.severity === 'critical' ? 'border-l-2 border-l-red-500' : ex.severity === 'high' ? 'border-l-2 border-l-amber-500' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`text-[9px] ${severityColor(ex.severity)}`}>{ex.severity}</Badge>
                    <Badge className="bg-slate-800 text-slate-400 text-[9px]">{ex.type}</Badge>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1"><Timer className="w-3 h-3" /> SLA: {ex.timeToSLA}</span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-200 mb-1">{ex.title}</h3>
                  <div className="grid md:grid-cols-3 gap-3 mt-3 text-[11px]">
                    <div><span className="text-slate-500">Root Cause:</span><p className="text-slate-300 mt-0.5">{ex.rootCause}</p></div>
                    <div><span className="text-slate-500">Impact:</span><p className="text-red-400 mt-0.5">{ex.impact}</p></div>
                    <div><span className="text-slate-500">Recommended Action:</span><p className="text-teal-400 mt-0.5">{ex.recommendedAction}</p></div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => setResolvedIds(prev => new Set([...prev, ex.id]))}
                  disabled={resolvedIds.has(ex.id)}
                  className="bg-teal-600 hover:bg-teal-500 text-white text-xs shrink-0"
                >
                  {resolvedIds.has(ex.id) ? <><Check className="w-3 h-3 mr-1" /> Approved</> : 'Approve Action'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════
// MATERIALS VIEW
// ═══════════════════════════════════════
const MaterialsView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
    <div>
      <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
        <Boxes className="w-5 h-5 text-teal-400" /> Field Materials Intelligence
      </h2>
      <p className="text-xs text-slate-500">Cross-region inventory visibility and AI-driven rebalancing</p>
    </div>

    <div className="space-y-2">
      {materialShortages.map(m => (
        <Card key={m.id} className={`bg-[#111827] border-slate-800/50 ${m.status === 'critical' ? 'border-l-2 border-l-red-500' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-slate-200">{m.material}</h3>
                <span className="text-[10px] text-slate-500">{m.region}</span>
              </div>
              <Badge className={`text-[9px] ${m.status === 'critical' ? 'bg-red-500/20 text-red-400' : m.status === 'transit' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {m.status === 'critical' ? 'Critical' : m.status === 'transit' ? 'In Transit' : 'Low Stock'}
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-4 text-xs mb-3">
              <div><span className="text-slate-500">Required</span><p className="text-slate-200 font-bold">{m.required}</p></div>
              <div><span className="text-slate-500">Available</span><p className="text-amber-400 font-bold">{m.available}</p></div>
              <div><span className="text-slate-500">Deficit</span><p className="text-red-400 font-bold">-{m.deficit}</p></div>
              <div>
                {m.surplusRegion ? (
                  <><span className="text-slate-500">Surplus ({m.surplusRegion})</span><p className="text-emerald-400 font-bold">+{m.surplusQty}</p></>
                ) : (
                  <><span className="text-slate-500">Surplus</span><p className="text-slate-600">None found</p></>
                )}
              </div>
            </div>
            <Progress value={(m.available / m.required) * 100} className="h-1.5 bg-slate-800" />
            {m.surplusRegion && (
              <div className="mt-3 p-2 bg-teal-500/5 rounded-md border border-teal-500/10 flex items-center justify-between">
                <p className="text-[10px] text-teal-400 flex items-center gap-1">
                  <Bot className="w-3 h-3" /> AI: Transfer {m.surplusQty} units from {m.surplusRegion} — avoids emergency procurement
                </p>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-500 text-white text-[10px] h-6 px-2">
                  <Truck className="w-3 h-3 mr-1" /> Initiate Transfer
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Architecture */}
    <Card className="bg-[#111827] border-slate-800/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
          <Layers className="w-4 h-4 text-teal-400" /> Discvr.ai sits between platforms and decisions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 bg-[#0a0e17] rounded-lg p-4 border border-slate-800/50 text-center">
            <h4 className="text-[10px] text-slate-500 mb-2">DATA SOURCES</h4>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {['Delfi', 'Petrel', 'SCADA', 'SAP', 'Field Tools'].map(s => (
                <Badge key={s} className="bg-slate-800 text-slate-300 text-[10px]">{s}</Badge>
              ))}
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-teal-400 shrink-0 rotate-90 md:rotate-0" />
          <div className="flex-1 bg-teal-500/10 rounded-lg p-4 border border-teal-500/20 text-center">
            <h4 className="text-[10px] text-teal-400 mb-2">DISCVR.AI ORCHESTRATION</h4>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {['Decision Routing', 'Exception Detection', 'Knowledge AI', 'Workflow Engine'].map(s => (
                <Badge key={s} className="bg-teal-500/20 text-teal-300 text-[10px]">{s}</Badge>
              ))}
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-teal-400 shrink-0 rotate-90 md:rotate-0" />
          <div className="flex-1 bg-[#0a0e17] rounded-lg p-4 border border-slate-800/50 text-center">
            <h4 className="text-[10px] text-slate-500 mb-2">OUTPUTS</h4>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {['Approvals', 'Field Actions', 'Escalations', 'Decisions'].map(s => (
                <Badge key={s} className="bg-slate-800 text-slate-300 text-[10px]">{s}</Badge>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-500 mt-3 italic">We orchestrate decisions — not replace platforms</p>
      </CardContent>
    </Card>
  </motion.div>
);

// ═══════════════════════════════════════
// EXECUTIVE VIEW
// ═══════════════════════════════════════
const ExecutiveView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
    <div>
      <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-teal-400" /> Executive View
      </h2>
      <p className="text-xs text-slate-500">CEO-level operational intelligence summary</p>
    </div>

    {/* Hero KPIs */}
    <div className="grid grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-teal-900/40 to-teal-800/20 border-teal-500/20">
        <CardContent className="p-5 text-center">
          <div className="text-3xl font-bold text-white">{executiveKPIs.decisionsToday}</div>
          <div className="text-xs text-teal-300 mt-1">Decisions Made Today</div>
          <div className="text-[10px] text-slate-400 mt-2">{executiveKPIs.autoResolved} auto-resolved · {executiveKPIs.humanApproved} human-approved</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border-emerald-500/20">
        <CardContent className="p-5 text-center">
          <div className="text-3xl font-bold text-white">{executiveKPIs.downtimeAvoided}</div>
          <div className="text-xs text-emerald-300 mt-1">Downtime Avoided</div>
          <div className="text-[10px] text-slate-400 mt-2">Across all active rigs today</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border-cyan-500/20">
        <CardContent className="p-5 text-center">
          <div className="text-3xl font-bold text-white">{executiveKPIs.costSavings}</div>
          <div className="text-xs text-cyan-300 mt-1">Cost Savings Today</div>
          <div className="text-[10px] text-slate-400 mt-2">From orchestrated decisions</div>
        </CardContent>
      </Card>
    </div>

    {/* Operational Metrics */}
    <div className="grid md:grid-cols-2 gap-4">
      {[
        { label: 'Operational Efficiency', value: executiveKPIs.operationalEfficiency, suffix: '%', color: 'teal' },
        { label: 'Rig Utilization', value: executiveKPIs.rigUtilization, suffix: '%', color: 'emerald' },
      ].map((m, i) => (
        <Card key={i} className="bg-[#111827] border-slate-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">{m.label}</span>
              <span className="text-lg font-bold text-white">{m.value}{m.suffix}</span>
            </div>
            <Progress value={m.value as number} className="h-2 bg-slate-800" />
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Before / After */}
    <Card className="bg-[#111827] border-slate-800/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-300">Decision Orchestration Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-500/5 rounded-lg p-4 border border-red-500/10">
            <h4 className="text-xs font-semibold text-red-400 mb-3">BEFORE — Manual Operations</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>• Manual coordination across departments</p>
              <p>• Email-based decisions — hours to days</p>
              <p>• Delayed operations & reactive response</p>
              <p>• Siloed data across platforms</p>
              <p>• Unquantified downtime costs</p>
            </div>
          </div>
          <div className="bg-teal-500/5 rounded-lg p-4 border border-teal-500/10">
            <h4 className="text-xs font-semibold text-teal-400 mb-3">AFTER — Discvr.ai Orchestration</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p>• AI-driven decision routing — minutes</p>
              <p>• Real-time exception detection</p>
              <p>• Cross-platform workflow execution</p>
              <p>• Unified operational visibility</p>
              <p>• Measurable ROI per decision</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* CTA */}
    <Card className="bg-gradient-to-r from-teal-900/30 via-[#111827] to-cyan-900/30 border-teal-500/20">
      <CardContent className="p-6 text-center">
        <h3 className="text-lg font-bold text-white mb-1">Discvr.ai Decision Orchestration</h3>
        <p className="text-xs text-slate-400 mb-4">Orchestrating decisions across drilling, production, and field operations</p>
        <div className="flex flex-wrap justify-center gap-3 text-[11px]">
          {['Identify decision gap', 'Deploy orchestration layer', 'Run 8–10 week pilot', 'Measure impact', 'Scale across domains'].map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 text-teal-300">
              <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
              {s}
              {i < 4 && <ChevronRight className="w-3 h-3 text-slate-600" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default SchlumbergerOps;
