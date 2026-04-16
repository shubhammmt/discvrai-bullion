import React, { useState, useMemo } from 'react';
import { Shield, AlertTriangle, TrendingUp, Settings, Plus, Trash2, Archive, Phone, CheckCircle, Activity, Eye, MapPin, X, Clock, Zap, Target, ChevronRight, Radio, Server, Lock, BarChart3, Layers } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// ─── Types ───
interface Problem {
  id: string;
  name: string;
  description: string;
  weightage: number;
  currentCount: number;
  criticality: 'critical' | 'high' | 'moderate' | 'low';
  triggerLogic: string;
  createdAt: string;
  archived: boolean;
}

interface RiskFactor {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

interface AuditRoute {
  id: string;
  name: string;
  region: string;
  lastAudit: string;
  daysOverdue: number;
  riskScore: number;
  selectionBasis: '30-day aging' | '60-day aging' | 'high-risk' | 'predictive';
  atmCount: number;
}

// ─── Seed Data ───
const initialProblems: Problem[] = [
  { id: 'p1', name: 'Route Reshuffling', description: 'Custodian routes swapped without approval causing accountability gaps', weightage: 18, currentCount: 23, criticality: 'critical', triggerLogic: 'Count > 15 in rolling 7 days', createdAt: '2026-03-12', archived: false },
  { id: 'p2', name: 'HOTO Failure', description: 'Hand-Over / Take-Over protocol not followed during shift change', weightage: 22, currentCount: 17, criticality: 'critical', triggerLogic: 'Any HOTO skip triggers alert', createdAt: '2026-02-28', archived: false },
  { id: 'p3', name: 'Cash Variance > ₹5K', description: 'Physical vs digital cash mismatch exceeding threshold', weightage: 25, currentCount: 9, criticality: 'high', triggerLogic: 'Variance > ₹5,000 per ATM per day', createdAt: '2026-03-01', archived: false },
  { id: 'p4', name: 'EJ Log Tampering', description: 'Electronic journal logs showing signs of manipulation or gaps', weightage: 15, currentCount: 4, criticality: 'high', triggerLogic: 'Missing EJ segments > 2 in 24h', createdAt: '2026-03-15', archived: false },
  { id: 'p5', name: 'Delayed EOD Upload', description: 'End-of-day reports not uploaded within SLA window', weightage: 10, currentCount: 31, criticality: 'moderate', triggerLogic: 'Upload delay > 4 hours post-shift', createdAt: '2026-03-20', archived: false },
  { id: 'p6', name: 'Manual Override Without Auth', description: 'ATM manual operations performed without supervisor authorization', weightage: 10, currentCount: 6, criticality: 'critical', triggerLogic: 'Any unauth manual op', createdAt: '2026-04-01', archived: false },
];

const initialRiskFactors: RiskFactor[] = [
  { id: 'rf1', name: 'Bottom Edge Call', description: 'ATM approaching zero cash threshold', active: true },
  { id: 'rf2', name: 'High Cash Balance', description: 'Unusually high retained cash > ₹25L', active: true },
  { id: 'rf3', name: 'Repeat Variance ATM', description: '3+ variances in 30 days at same ATM', active: true },
  { id: 'rf4', name: 'Custodian Overstay', description: 'Same custodian > 60 days on route', active: true },
  { id: 'rf5', name: 'Network Blind Spot', description: 'ATM offline > 6 hours in last week', active: true },
  { id: 'rf6', name: 'SLA Breach History', description: '2+ SLA breaches in current quarter', active: false },
];

const auditRoutes: AuditRoute[] = [
  { id: 'ar1', name: 'Route MH-West-07', region: 'Mumbai Western', lastAudit: '2026-02-14', daysOverdue: 61, riskScore: 87, selectionBasis: '60-day aging', atmCount: 14 },
  { id: 'ar2', name: 'Route DL-South-12', region: 'Delhi South', lastAudit: '2026-03-02', daysOverdue: 45, riskScore: 72, selectionBasis: '30-day aging', atmCount: 11 },
  { id: 'ar3', name: 'Route KA-Central-03', region: 'Bangalore Central', lastAudit: '2026-03-10', daysOverdue: 37, riskScore: 65, selectionBasis: '30-day aging', atmCount: 9 },
  { id: 'ar4', name: 'Route GJ-North-19', region: 'Ahmedabad North', lastAudit: '2026-03-25', daysOverdue: 22, riskScore: 91, selectionBasis: 'high-risk', atmCount: 16 },
];

// ─── Helpers ───
const critColor = (c: string) => {
  switch (c) {
    case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'moderate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const basisIcon = (b: string) => {
  switch (b) {
    case '60-day aging': return <Clock className="w-3.5 h-3.5 text-red-400" />;
    case '30-day aging': return <Clock className="w-3.5 h-3.5 text-orange-400" />;
    case 'high-risk': return <Zap className="w-3.5 h-3.5 text-amber-400" />;
    default: return <Target className="w-3.5 h-3.5 text-blue-400" />;
  }
};

// ─── Component ───
const CMSGuardian: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>(initialProblems);
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>(initialRiskFactors);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addProblemOpen, setAddProblemOpen] = useState(false);
  const [addFactorOpen, setAddFactorOpen] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  // New problem form
  const [newProblem, setNewProblem] = useState({ name: '', description: '', triggerLogic: '', weightage: 10, criticality: 'high' as Problem['criticality'] });
  const [newFactor, setNewFactor] = useState({ name: '', description: '' });

  const activeProblems = useMemo(() => problems.filter(p => !p.archived), [problems]);

  const totalLoss = 10.71;
  const auditCompliance = useMemo(() => {
    const maxIssues = activeProblems.reduce((s, p) => s + p.weightage, 0) || 1;
    const currentLoad = activeProblems.reduce((s, p) => s + Math.min(p.currentCount, 50) * (p.weightage / 100), 0);
    return Math.max(0, Math.round(100 - (currentLoad / maxIssues) * 40));
  }, [activeProblems]);

  const riskIndex = useMemo(() => {
    const criticals = activeProblems.filter(p => p.criticality === 'critical').length;
    const highs = activeProblems.filter(p => p.criticality === 'high').length;
    return Math.min(100, criticals * 22 + highs * 12 + activeProblems.length * 3);
  }, [activeProblems]);

  const riskLevel = riskIndex > 75 ? 'SEVERE' : riskIndex > 50 ? 'ELEVATED' : riskIndex > 25 ? 'GUARDED' : 'LOW';
  const riskColor = riskIndex > 75 ? 'text-red-400' : riskIndex > 50 ? 'text-orange-400' : riskIndex > 25 ? 'text-yellow-400' : 'text-green-400';

  const archiveProblem = (id: string) => setProblems(prev => prev.map(p => p.id === id ? { ...p, archived: true } : p));
  const deleteProblem = (id: string) => setProblems(prev => prev.filter(p => p.id !== id));

  const addProblem = () => {
    if (!newProblem.name.trim()) return;
    const p: Problem = {
      id: `p-${Date.now()}`,
      name: newProblem.name,
      description: newProblem.description,
      weightage: newProblem.weightage,
      currentCount: 0,
      criticality: newProblem.criticality,
      triggerLogic: newProblem.triggerLogic,
      createdAt: new Date().toISOString().slice(0, 10),
      archived: false,
    };
    setProblems(prev => [...prev, p]);
    setNewProblem({ name: '', description: '', triggerLogic: '', weightage: 10, criticality: 'high' });
    setAddProblemOpen(false);
  };

  const toggleFactor = (id: string) => setRiskFactors(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
  const removeFactor = (id: string) => setRiskFactors(prev => prev.filter(f => f.id !== id));
  const addFactor = () => {
    if (!newFactor.name.trim()) return;
    setRiskFactors(prev => [...prev, { id: `rf-${Date.now()}`, name: newFactor.name, description: newFactor.description, active: true }]);
    setNewFactor({ name: '', description: '' });
    setAddFactorOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-[1920px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">CMS Guardian</h1>
              <p className="text-[11px] text-slate-500 tracking-wide uppercase">Fintech Command Center • Real-Time Discrepancy & Penalty Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/40">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-slate-400">Live</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)} className="text-slate-400 hover:text-white hover:bg-slate-800/60">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto px-6 py-6 space-y-6">
        {/* ─── Global KPIs ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Loss */}
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/50 backdrop-blur-sm p-5 relative overflow-hidden group hover:border-red-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-y-8 translate-x-8" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Total Loss Detected</span>
              <TrendingUp className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400">₹{totalLoss} Cr</p>
            <p className="text-xs text-slate-500 mt-1">Across {activeProblems.reduce((s, p) => s + p.currentCount, 0)} active incidents</p>
          </div>

          {/* Audit Compliance */}
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/50 backdrop-blur-sm p-5 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-8 translate-x-8" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Audit Compliance</span>
              <CheckCircle className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-cyan-400">{auditCompliance}%</p>
            <Progress value={auditCompliance} className="h-1.5 mt-2 bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-cyan-500 [&>div]:to-blue-500" />
          </div>

          {/* Risk Index */}
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/50 backdrop-blur-sm p-5 relative overflow-hidden group hover:border-orange-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -translate-y-8 translate-x-8" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Risk Index</span>
              <Activity className="w-4 h-4 text-orange-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className={`text-3xl font-bold ${riskColor}`}>{riskIndex}</p>
              <span className={`text-xs font-bold tracking-wider ${riskColor}`}>{riskLevel}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{activeProblems.length} active problem types • {riskFactors.filter(f => f.active).length} risk parameters</p>
          </div>
        </div>

        {/* ─── Main Grid: Ops Gaps (70%) + Sidebar (30%) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Operational Gaps — 70% */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Operational Gaps</h2>
                <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-500">{activeProblems.length} Active</Badge>
              </div>
              <Button size="sm" variant="ghost" className="text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10" onClick={() => setAddProblemOpen(true)}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Problem
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeProblems.map(problem => (
                <div key={problem.id} className="rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm p-4 hover:border-slate-700/60 transition-all group relative overflow-hidden">
                  {problem.criticality === 'critical' && problem.name === 'Manual Override Without Auth' && (
                    <div className="absolute top-3 right-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50" />
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-slate-200 truncate">{problem.name}</h3>
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 border ${critColor(problem.criticality)}`}>
                          {problem.criticality.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{problem.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3 mb-3">
                    <div>
                      <p className="text-xl font-bold text-white">{problem.currentCount}</p>
                      <p className="text-[10px] text-slate-500 uppercase">Incidents</p>
                    </div>
                    <div className="h-8 w-px bg-slate-800" />
                    <div>
                      <p className="text-xl font-bold text-slate-300">{problem.weightage}%</p>
                      <p className="text-[10px] text-slate-500 uppercase">Weight</p>
                    </div>
                    <div className="h-8 w-px bg-slate-800" />
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-500 uppercase mb-1">Trigger</p>
                      <p className="text-[11px] text-slate-400 truncate">{problem.triggerLogic}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" className="flex-1 h-7 text-[11px] bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30" onClick={() => archiveProblem(problem.id)}>
                      <Archive className="w-3 h-3 mr-1" /> Resolve
                    </Button>
                    <Button size="sm" className="h-7 text-[11px] bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30">
                      <Phone className="w-3 h-3 mr-1" /> Call Manager
                    </Button>
                  </div>
                </div>
              ))}

              {activeProblems.length === 0 && (
                <div className="col-span-2 rounded-xl border border-dashed border-slate-800 bg-slate-900/20 p-12 text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">All problems resolved</p>
                  <p className="text-xs text-slate-600 mt-1">Add new problems from the admin panel</p>
                </div>
              )}
            </div>

            {/* ─── Smart Audit Planner ─── */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Smart Audit Planner</h2>
                <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400">3+1 Logic</Badge>
              </div>
              <p className="text-xs text-slate-500 mb-3">Daily selection: 3 routes by audit aging (30/60 day overdue) + 1 route by predictive high-risk score</p>

              <div className="space-y-2">
                {auditRoutes.map((route, idx) => (
                  <div
                    key={route.id}
                    className={`rounded-lg border bg-slate-900/40 backdrop-blur-sm p-4 transition-all cursor-pointer ${hoveredRoute === route.id ? 'border-cyan-500/40 bg-slate-800/40 shadow-lg shadow-cyan-500/5' : 'border-slate-800/60 hover:border-slate-700/60'}`}
                    onMouseEnter={() => setHoveredRoute(route.id)}
                    onMouseLeave={() => setHoveredRoute(null)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${idx < 3 ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {idx < 3 ? `A${idx + 1}` : 'HR'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-slate-200">{route.name}</h3>
                            <div className="flex items-center gap-1">
                              {basisIcon(route.selectionBasis)}
                              <span className="text-[10px] text-slate-500">{route.selectionBasis}</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500">{route.region} • {route.atmCount} ATMs</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`text-sm font-bold ${route.daysOverdue > 45 ? 'text-red-400' : route.daysOverdue > 30 ? 'text-orange-400' : 'text-yellow-400'}`}>
                            {route.daysOverdue}d overdue
                          </p>
                          <p className="text-[10px] text-slate-500">Last: {route.lastAudit}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${route.riskScore > 80 ? 'text-red-400' : route.riskScore > 60 ? 'text-orange-400' : 'text-slate-300'}`}>
                            {route.riskScore}
                          </p>
                          <p className="text-[10px] text-slate-500">Risk</p>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${hoveredRoute === route.id ? 'translate-x-1 text-cyan-400' : 'text-slate-600'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Predictive Risk Factors Sidebar — 30% ─── */}
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Risk Parameters</h2>
                </div>
                <Button size="sm" variant="ghost" className="text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 h-7" onClick={() => setAddFactorOpen(true)}>
                  <Plus className="w-3 h-3 mr-1" /> Add
                </Button>
              </div>
              <p className="text-xs text-slate-500 mb-4">Parameters defining 'High Risk ATM' for the +1 audit slot</p>

              <div className="space-y-2">
                {riskFactors.map(factor => (
                  <div key={factor.id} className={`rounded-lg border p-3 transition-all ${factor.active ? 'border-purple-500/30 bg-purple-500/5' : 'border-slate-800/40 bg-slate-900/20 opacity-60'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <button onClick={() => toggleFactor(factor.id)} className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${factor.active ? 'bg-purple-500 border-purple-500' : 'border-slate-600 bg-transparent'}`}>
                          {factor.active && <CheckCircle className="w-3 h-3 text-white" />}
                        </button>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-300 truncate">{factor.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{factor.description}</p>
                        </div>
                      </div>
                      <button onClick={() => removeFactor(factor.id)} className="text-slate-600 hover:text-red-400 transition-colors ml-2 flex-shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Problem Distribution</h2>
              </div>
              <div className="space-y-3">
                {['critical', 'high', 'moderate', 'low'].map(crit => {
                  const count = activeProblems.filter(p => p.criticality === crit).length;
                  if (count === 0) return null;
                  return (
                    <div key={crit} className="flex items-center gap-3">
                      <Badge variant="outline" className={`text-[9px] w-16 justify-center border ${critColor(crit)}`}>{crit.toUpperCase()}</Badge>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${crit === 'critical' ? 'bg-red-500' : crit === 'high' ? 'bg-orange-500' : crit === 'moderate' ? 'bg-yellow-500' : 'bg-slate-500'}`} style={{ width: `${(count / Math.max(activeProblems.length, 1)) * 100}%` }} />
                      </div>
                      <span className="text-xs font-mono text-slate-400 w-6 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Archived */}
            {problems.filter(p => p.archived).length > 0 && (
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Resolved</h2>
                </div>
                <div className="space-y-1.5">
                  {problems.filter(p => p.archived).map(p => (
                    <div key={p.id} className="flex items-center justify-between py-1.5 px-2 rounded-md bg-slate-900/30">
                      <span className="text-xs text-slate-500 line-through">{p.name}</span>
                      <span className="text-[10px] text-emerald-500">Resolved</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Settings Modal ─── */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2"><Settings className="w-5 h-5" /> Problem Registry Admin</DialogTitle>
            <DialogDescription className="text-slate-400">Manage active problems. Archive resolved issues or permanently delete them.</DialogDescription>
          </DialogHeader>

          <div className="space-y-2 mt-4">
            {problems.map(p => (
              <div key={p.id} className={`flex items-center justify-between p-3 rounded-lg border ${p.archived ? 'border-slate-800/40 bg-slate-900/20 opacity-60' : 'border-slate-700/50 bg-slate-800/30'}`}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Badge variant="outline" className={`text-[9px] border ${critColor(p.criticality)} flex-shrink-0`}>{p.criticality.toUpperCase()}</Badge>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${p.archived ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{p.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{p.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 ml-3 flex-shrink-0">
                  {!p.archived && (
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10" onClick={() => archiveProblem(p.id)}>
                      <Archive className="w-3 h-3 mr-1" /> Archive
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => deleteProblem(p.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="mt-4">
            <Button variant="ghost" className="text-slate-400" onClick={() => setSettingsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Add Problem Modal ─── */}
      <Dialog open={addProblemOpen} onOpenChange={setAddProblemOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Problem</DialogTitle>
            <DialogDescription className="text-slate-400">Register a new operational gap in the problem registry.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-slate-300 text-xs">Problem Name</Label>
              <Input value={newProblem.name} onChange={e => setNewProblem(p => ({ ...p, name: e.target.value }))} placeholder="e.g., Key Duplication" className="bg-slate-800 border-slate-700 text-slate-100 mt-1" />
            </div>
            <div>
              <Label className="text-slate-300 text-xs">Description</Label>
              <Textarea value={newProblem.description} onChange={e => setNewProblem(p => ({ ...p, description: e.target.value }))} placeholder="Describe the problem..." className="bg-slate-800 border-slate-700 text-slate-100 mt-1" rows={2} />
            </div>
            <div>
              <Label className="text-slate-300 text-xs">Alert Trigger Logic</Label>
              <Input value={newProblem.triggerLogic} onChange={e => setNewProblem(p => ({ ...p, triggerLogic: e.target.value }))} placeholder="e.g., Count > 5 per week" className="bg-slate-800 border-slate-700 text-slate-100 mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-slate-300 text-xs">Weightage (%)</Label>
                <Input type="number" value={newProblem.weightage} onChange={e => setNewProblem(p => ({ ...p, weightage: Number(e.target.value) }))} className="bg-slate-800 border-slate-700 text-slate-100 mt-1" />
              </div>
              <div>
                <Label className="text-slate-300 text-xs">Criticality</Label>
                <select value={newProblem.criticality} onChange={e => setNewProblem(p => ({ ...p, criticality: e.target.value as Problem['criticality'] }))} className="w-full mt-1 h-10 rounded-md bg-slate-800 border border-slate-700 text-slate-100 px-3 text-sm">
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="moderate">Moderate</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="ghost" className="text-slate-400" onClick={() => setAddProblemOpen(false)}>Cancel</Button>
            <Button className="bg-cyan-600 hover:bg-cyan-500 text-white" onClick={addProblem}>Add Problem</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Add Risk Factor Modal ─── */}
      <Dialog open={addFactorOpen} onOpenChange={setAddFactorOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-white">Add Risk Parameter</DialogTitle>
            <DialogDescription className="text-slate-400">Define a new parameter for high-risk ATM identification.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-slate-300 text-xs">Parameter Name</Label>
              <Input value={newFactor.name} onChange={e => setNewFactor(f => ({ ...f, name: e.target.value }))} placeholder="e.g., Frequent Downtime" className="bg-slate-800 border-slate-700 text-slate-100 mt-1" />
            </div>
            <div>
              <Label className="text-slate-300 text-xs">Description</Label>
              <Textarea value={newFactor.description} onChange={e => setNewFactor(f => ({ ...f, description: e.target.value }))} placeholder="When does this apply?" className="bg-slate-800 border-slate-700 text-slate-100 mt-1" rows={2} />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="ghost" className="text-slate-400" onClick={() => setAddFactorOpen(false)}>Cancel</Button>
            <Button className="bg-purple-600 hover:bg-purple-500 text-white" onClick={addFactor}>Add Parameter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSGuardian;
