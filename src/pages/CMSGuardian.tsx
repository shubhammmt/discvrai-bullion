import React, { useState, useMemo } from 'react';
import {
  Shield, AlertTriangle, TrendingUp, Settings, Plus, Trash2, Archive, Phone,
  CheckCircle, Activity, Eye, MapPin, X, Clock, Zap, Target, ChevronRight,
  Radio, Server, Lock, BarChart3, Layers, ArrowLeft, Search, UserX, RefreshCw,
  Wrench, FileText, Calendar, AlertCircle, ChevronDown, ExternalLink,
  LayoutDashboard, Users, Banknote, Timer, ShieldAlert, Cpu, ToggleLeft,
  ToggleRight, CircleDot, ArrowUpRight, Download
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

// ─── Types ───
interface Problem {
  id: string; name: string; description: string; weightage: number;
  currentCount: number; criticality: 'critical' | 'high' | 'moderate' | 'low';
  triggerLogic: string; createdAt: string; archived: boolean;
}

interface RiskFactor {
  id: string; name: string; description: string; threshold: string; active: boolean;
}

interface AuditRoute {
  id: string; name: string; region: string; lastAudit: string;
  daysOverdue: number; riskScore: number;
  selectionBasis: '30-day aging' | '60-day aging' | 'high-risk' | 'predictive'; atmCount: number;
}

// ─── Detail Row Types ───
interface HOTORow {
  routeId: string; outgoingEmpId: string; shiftTimestamp: string;
  hotoStatus: 'Failed' | 'Pending'; missingSigOut: boolean; missingSigIn: boolean; manualOverride: boolean;
}
interface RouteRow {
  custodianName: string; empId: string; routeId: string; tenureDays: number;
  threshold: number; hardLock: boolean; status: 'Overdue' | 'Warning';
  branchManager: string;
}
interface CashVarianceRow {
  atmId: string; routeId: string; varianceAmt: number; timestamp: string;
  source: string; status: string; dispensePhysical: number; dispenseDigital: number;
  deadline: string; daysLeft: number;
}
interface DelayedEODRow {
  routeId: string; branchManager: string; delayHours: number;
  slaBreached: boolean; status: string;
}
interface RiskATMRow {
  atmId: string; location: string; riskScore: number;
  factors: string[]; status: string; custodian: string;
}

// ─── Mock Data ───
const hotoRows: HOTORow[] = [
  { routeId: 'R-104', outgoingEmpId: 'EMP-2891', shiftTimestamp: '16 Apr 2026, 06:00', hotoStatus: 'Failed', missingSigOut: true, missingSigIn: true, manualOverride: true },
  { routeId: 'R-315', outgoingEmpId: 'EMP-4412', shiftTimestamp: '16 Apr 2026, 06:00', hotoStatus: 'Failed', missingSigOut: true, missingSigIn: false, manualOverride: false },
  { routeId: 'R-207', outgoingEmpId: 'EMP-1034', shiftTimestamp: '16 Apr 2026, 14:00', hotoStatus: 'Pending', missingSigOut: false, missingSigIn: true, manualOverride: false },
  { routeId: 'R-422', outgoingEmpId: 'EMP-5567', shiftTimestamp: '15 Apr 2026, 22:00', hotoStatus: 'Failed', missingSigOut: true, missingSigIn: true, manualOverride: true },
  { routeId: 'R-118', outgoingEmpId: 'EMP-3201', shiftTimestamp: '16 Apr 2026, 06:00', hotoStatus: 'Failed', missingSigOut: true, missingSigIn: false, manualOverride: false },
  { routeId: 'R-611', outgoingEmpId: 'EMP-7789', shiftTimestamp: '16 Apr 2026, 14:00', hotoStatus: 'Pending', missingSigOut: false, missingSigIn: false, manualOverride: false },
];

const routeRows: RouteRow[] = [
  { custodianName: 'Rajesh Kumar', empId: 'EMP-2891', routeId: 'R-104', tenureDays: 112, threshold: 90, hardLock: false, status: 'Overdue', branchManager: 'Sanjay Mehta' },
  { custodianName: 'Suresh Patel', empId: 'EMP-1034', routeId: 'R-207', tenureDays: 98, threshold: 90, hardLock: false, status: 'Overdue', branchManager: 'Prashant Joshi' },
  { custodianName: 'Ankit Sharma', empId: 'EMP-4412', routeId: 'R-315', tenureDays: 95, threshold: 90, hardLock: false, status: 'Overdue', branchManager: 'Kavita Rao' },
  { custodianName: 'Vikram Singh', empId: 'EMP-6634', routeId: 'R-509', tenureDays: 103, threshold: 90, hardLock: true, status: 'Overdue', branchManager: 'Nitin Gupta' },
  { custodianName: 'Meera Joshi', empId: 'EMP-3201', routeId: 'R-203', tenureDays: 91, threshold: 90, hardLock: false, status: 'Overdue', branchManager: 'Sanjay Mehta' },
  { custodianName: 'Priya Menon', empId: 'EMP-8841', routeId: 'R-118', tenureDays: 87, threshold: 90, hardLock: false, status: 'Warning', branchManager: 'Kavita Rao' },
  { custodianName: 'Deepak Verma', empId: 'EMP-5567', routeId: 'R-422', tenureDays: 84, threshold: 90, hardLock: false, status: 'Warning', branchManager: 'Prashant Joshi' },
  { custodianName: 'Arun Nair', empId: 'EMP-7789', routeId: 'R-611', tenureDays: 78, threshold: 90, hardLock: false, status: 'Warning', branchManager: 'Nitin Gupta' },
];

const cashVarianceRows: CashVarianceRow[] = [
  { atmId: 'ATM-MH-4821', routeId: 'R-104', varianceAmt: 18500, timestamp: '16 Apr, 08:14', source: 'Bank Switch Log', status: 'Unresolved', dispensePhysical: 245000, dispenseDigital: 263500, deadline: 'T+5', daysLeft: 3 },
  { atmId: 'ATM-DL-1093', routeId: 'R-207', varianceAmt: 7200, timestamp: '15 Apr, 22:45', source: 'EJ Mismatch', status: 'Under Review', dispensePhysical: 180000, dispenseDigital: 187200, deadline: 'T+5', daysLeft: 4 },
  { atmId: 'ATM-KA-7752', routeId: 'R-315', varianceAmt: 32000, timestamp: '14 Apr, 16:30', source: 'Bank Switch Log', status: 'Escalated', dispensePhysical: 310000, dispenseDigital: 342000, deadline: 'T+5', daysLeft: 1 },
  { atmId: 'ATM-GJ-3384', routeId: 'R-422', varianceAmt: 5100, timestamp: '16 Apr, 04:20', source: 'Recon Diff', status: 'Unresolved', dispensePhysical: 125000, dispenseDigital: 130100, deadline: 'T+5', daysLeft: 5 },
  { atmId: 'ATM-TN-6619', routeId: 'R-509', varianceAmt: 11400, timestamp: '15 Apr, 11:55', source: 'EJ Mismatch', status: 'Under Review', dispensePhysical: 200000, dispenseDigital: 211400, deadline: 'T+5', daysLeft: 2 },
  { atmId: 'ATM-MH-2205', routeId: 'R-611', varianceAmt: 45800, timestamp: '13 Apr, 19:10', source: 'Bank Switch Log', status: 'Penalty Active', dispensePhysical: 400000, dispenseDigital: 445800, deadline: 'T+5', daysLeft: 0 },
];

const delayedEODRows: DelayedEODRow[] = [
  { routeId: 'R-104', branchManager: 'Sanjay Mehta', delayHours: 8.5, slaBreached: true, status: 'Overdue' },
  { routeId: 'R-207', branchManager: 'Prashant Joshi', delayHours: 6.2, slaBreached: true, status: 'Overdue' },
  { routeId: 'R-315', branchManager: 'Kavita Rao', delayHours: 5.0, slaBreached: true, status: 'SLA Breached' },
  { routeId: 'R-422', branchManager: 'Prashant Joshi', delayHours: 4.5, slaBreached: true, status: 'SLA Breached' },
  { routeId: 'R-509', branchManager: 'Nitin Gupta', delayHours: 3.8, slaBreached: false, status: 'Delayed' },
  { routeId: 'R-611', branchManager: 'Nitin Gupta', delayHours: 2.1, slaBreached: false, status: 'Delayed' },
  { routeId: 'R-118', branchManager: 'Kavita Rao', delayHours: 1.5, slaBreached: false, status: 'Delayed' },
];

const riskATMRows: RiskATMRow[] = [
  { atmId: 'ATM-MH-4821', location: 'Andheri West, Mumbai', riskScore: 91, factors: ['Bottom Edge Call', 'Repeat Variance', 'High Cash Balance'], status: 'Critical', custodian: 'Rajesh Kumar' },
  { atmId: 'ATM-KA-7752', location: 'Koramangala, Bangalore', riskScore: 87, factors: ['High Cash Balance', 'Custodian Overstay'], status: 'Critical', custodian: 'Ankit Sharma' },
  { atmId: 'ATM-GJ-3384', location: 'CG Road, Ahmedabad', riskScore: 78, factors: ['Repeat Variance', 'Network Blind Spot'], status: 'High', custodian: 'Deepak Verma' },
  { atmId: 'ATM-TN-6619', location: 'T. Nagar, Chennai', riskScore: 72, factors: ['Bottom Edge Call', 'SLA Breach History'], status: 'High', custodian: 'Vikram Singh' },
  { atmId: 'ATM-MH-2205', location: 'Vashi, Navi Mumbai', riskScore: 65, factors: ['High Cash Balance'], status: 'Elevated', custodian: 'Arun Nair' },
];

const initialProblems: Problem[] = [
  { id: 'p1', name: 'Route Reshuffling', description: 'Custodian routes overdue for rotation (>90 days)', weightage: 18, currentCount: 23, criticality: 'critical', triggerLogic: 'Tenure > 90 days', createdAt: '2026-03-12', archived: false },
  { id: 'p2', name: 'HOTO Failure', description: 'Hand-Over Take-Over protocol failures during shift change', weightage: 22, currentCount: 17, criticality: 'critical', triggerLogic: 'Any HOTO skip triggers alert', createdAt: '2026-02-28', archived: false },
  { id: 'p3', name: 'Cash Variance > ₹5K', description: 'Physical vs digital cash mismatch exceeding ₹5,000', weightage: 25, currentCount: 9, criticality: 'high', triggerLogic: 'Variance > ₹5,000 per ATM', createdAt: '2026-03-01', archived: false },
  { id: 'p4', name: 'EJ Log Tampering', description: 'Electronic journal logs with manipulation or gaps', weightage: 15, currentCount: 4, criticality: 'high', triggerLogic: 'Missing EJ segments > 2 in 24h', createdAt: '2026-03-15', archived: false },
  { id: 'p5', name: 'Delayed EOD Upload', description: 'End-of-day reports not uploaded within SLA', weightage: 10, currentCount: 31, criticality: 'moderate', triggerLogic: 'Upload delay > 4 hours', createdAt: '2026-03-20', archived: false },
  { id: 'p6', name: 'Manual Override Without Auth', description: 'ATM manual operations without supervisor auth', weightage: 10, currentCount: 6, criticality: 'critical', triggerLogic: 'Any unauth manual op', createdAt: '2026-04-01', archived: false },
];

const initialRiskFactors: RiskFactor[] = [
  { id: 'rf1', name: 'Bottom Edge Call', description: 'ATM approaching zero cash', threshold: '< ₹50K remaining', active: true },
  { id: 'rf2', name: 'High Cash Balance', description: 'Unusually high retained cash', threshold: '> ₹25L balance', active: true },
  { id: 'rf3', name: 'Repeat Variance ATM', description: '3+ variances in 30 days', threshold: '≥ 3 incidents/month', active: true },
  { id: 'rf4', name: 'Custodian Overstay', description: 'Same custodian > 60 days', threshold: '> 60 days tenure', active: true },
  { id: 'rf5', name: 'Network Blind Spot', description: 'ATM offline > 6 hours', threshold: '> 6h downtime/week', active: true },
  { id: 'rf6', name: 'SLA Breach History', description: '2+ SLA breaches in quarter', threshold: '≥ 2 breaches/Q', active: false },
];

const auditRoutes: AuditRoute[] = [
  { id: 'ar1', name: 'Route MH-West-07', region: 'Mumbai Western', lastAudit: '2026-02-14', daysOverdue: 61, riskScore: 87, selectionBasis: '60-day aging', atmCount: 14 },
  { id: 'ar2', name: 'Route DL-South-12', region: 'Delhi South', lastAudit: '2026-03-02', daysOverdue: 45, riskScore: 72, selectionBasis: '30-day aging', atmCount: 11 },
  { id: 'ar3', name: 'Route KA-Central-03', region: 'Bangalore Central', lastAudit: '2026-03-10', daysOverdue: 37, riskScore: 65, selectionBasis: '30-day aging', atmCount: 9 },
  { id: 'ar4', name: 'Route GJ-North-19', region: 'Ahmedabad North', lastAudit: '2026-03-25', daysOverdue: 22, riskScore: 91, selectionBasis: 'high-risk', atmCount: 16 },
];

// ─── Helpers ───
const critBadge = (c: string) => {
  switch (c) {
    case 'critical': return 'bg-red-100 text-red-700 border-red-200';
    case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'moderate': return 'bg-amber-100 text-amber-700 border-amber-200';
    default: return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

// ─── Sidebar Icons ───
const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ShieldAlert, label: 'Audit Inbox', active: false },
  { icon: Banknote, label: 'Reconciliation', active: false },
  { icon: Users, label: 'Custodians', active: false },
  { icon: MapPin, label: 'Routes', active: false },
  { icon: BarChart3, label: 'Reports', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

// ─── Component ───
const CMSGuardian: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>(initialProblems);
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>(initialRiskFactors);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addProblemOpen, setAddProblemOpen] = useState(false);
  const [addFactorOpen, setAddFactorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedRowType, setSelectedRowType] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [newProblem, setNewProblem] = useState({ name: '', description: '', triggerLogic: '', weightage: 10, criticality: 'high' as Problem['criticality'] });
  const [newFactor, setNewFactor] = useState({ name: '', description: '', threshold: '' });

  const activeProblems = useMemo(() => problems.filter(p => !p.archived), [problems]);

  // Tab counts
  const tabCounts = useMemo(() => ({
    all: hotoRows.length + routeRows.length + cashVarianceRows.length + delayedEODRows.length + riskATMRows.length,
    hoto: hotoRows.length,
    route: routeRows.filter(r => r.tenureDays > r.threshold).length,
    cash: cashVarianceRows.length,
    eod: delayedEODRows.length,
    risk: riskATMRows.length,
  }), []);

  const archiveProblem = (id: string) => setProblems(prev => prev.map(p => p.id === id ? { ...p, archived: true } : p));
  const deleteProblem = (id: string) => setProblems(prev => prev.filter(p => p.id !== id));
  const toggleFactor = (id: string) => setRiskFactors(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
  const removeFactor = (id: string) => setRiskFactors(prev => prev.filter(f => f.id !== id));

  const addProblemFn = () => {
    if (!newProblem.name.trim()) return;
    setProblems(prev => [...prev, {
      id: `p-${Date.now()}`, name: newProblem.name, description: newProblem.description,
      weightage: newProblem.weightage, currentCount: 0, criticality: newProblem.criticality,
      triggerLogic: newProblem.triggerLogic, createdAt: new Date().toISOString().slice(0, 10), archived: false,
    }]);
    setNewProblem({ name: '', description: '', triggerLogic: '', weightage: 10, criticality: 'high' });
    setAddProblemOpen(false);
  };

  const addFactor = () => {
    if (!newFactor.name.trim()) return;
    setRiskFactors(prev => [...prev, { id: `rf-${Date.now()}`, name: newFactor.name, description: newFactor.description, threshold: newFactor.threshold, active: true }]);
    setNewFactor({ name: '', description: '', threshold: '' });
    setAddFactorOpen(false);
  };

  const selectDetailRow = (row: any, type: string) => {
    setSelectedRow(row);
    setSelectedRowType(type);
  };

  // Filter helpers
  const sq = searchQuery.toLowerCase();
  const filterHoto = hotoRows.filter(r => r.routeId.toLowerCase().includes(sq) || r.outgoingEmpId.toLowerCase().includes(sq));
  const filterRoute = routeRows.filter(r => r.custodianName.toLowerCase().includes(sq) || r.routeId.toLowerCase().includes(sq) || r.empId.toLowerCase().includes(sq));
  const filterCash = cashVarianceRows.filter(r => r.atmId.toLowerCase().includes(sq) || r.routeId.toLowerCase().includes(sq));
  const filterEOD = delayedEODRows.filter(r => r.routeId.toLowerCase().includes(sq) || r.branchManager.toLowerCase().includes(sq));
  const filterRisk = riskATMRows.filter(r => r.atmId.toLowerCase().includes(sq) || r.location.toLowerCase().includes(sq) || r.custodian.toLowerCase().includes(sq));

  // ─── Render ───
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ─── Dark Sidebar ─── */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-56'} bg-slate-900 text-white flex-shrink-0 flex flex-col transition-all duration-300 sticky top-0 h-screen`}>
        <div className="p-4 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">CMS Guardian</p>
              <p className="text-[10px] text-slate-400 truncate">Audit Command Center</p>
            </div>
          )}
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {sidebarItems.map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${item.active ? 'bg-cyan-600/20 text-cyan-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="w-full flex items-center justify-center py-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors">
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Audit Command Center</h1>
            <p className="text-xs text-slate-500">Real-Time Discrepancy & Penalty Management • 16 April 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-700 font-medium">Live</span>
            </div>
            <Button size="sm" variant="outline" className="text-xs h-8 border-slate-200" onClick={() => setSettingsOpen(true)}>
              <Settings className="w-3.5 h-3.5 mr-1" /> Admin
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="max-w-[1600px] mx-auto px-6 py-5 space-y-5">

            {/* ─── 6 KPI Cards ─── */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Card 1: Total Loss */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Total Loss</span>
                  <TrendingUp className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-2xl font-bold text-red-600">₹10.71 Cr</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <ArrowUpRight className="w-3 h-3 text-red-500" />
                  <span className="text-[10px] text-red-500 font-medium">+₹0.34 Cr this week</span>
                </div>
                <div className="mt-2 h-6 flex items-end gap-px">
                  {[35, 42, 38, 51, 47, 55, 60, 58, 65, 62, 70, 68].map((v, i) => (
                    <div key={i} className="flex-1 bg-red-100 rounded-t" style={{ height: `${v}%` }}>
                      <div className="w-full h-full bg-red-400/60 rounded-t" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Recovery Potential */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Recovery</span>
                  <Banknote className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold text-emerald-600">₹5.2 Cr</p>
                <p className="text-[10px] text-slate-500 mt-1">From overrides & variance</p>
                <Progress value={48} className="h-1.5 mt-2 bg-slate-100 [&>div]:bg-emerald-500" />
              </div>

              {/* Card 3: Audit Backlog */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Audit Backlog</span>
                  <Calendar className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-blue-600">6%</p>
                <p className="text-[10px] text-slate-500 mt-1">Non-audited routes</p>
                <Progress value={94} className="h-1.5 mt-2 bg-slate-100 [&>div]:bg-blue-500" />
              </div>

              {/* Card 4: Unauth Overrides */}
              <div className="bg-white rounded-xl border border-red-200 p-4 shadow-sm hover:shadow-md transition-shadow bg-red-50/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-red-600 uppercase tracking-wide">Unauth Overrides</span>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-2xl font-bold text-red-600">20</p>
                <p className="text-[10px] text-red-500 mt-1 font-medium flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Active right now
                </p>
              </div>

              {/* Card 5: Delayed EOD */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">EOD Backlog</span>
                  <Timer className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-2xl font-bold text-amber-600">100</p>
                <p className="text-[10px] text-slate-500 mt-1">Pending uploads</p>
              </div>

              {/* Card 6: High Risk Custodians */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Risk Custodians</span>
                  <Users className="w-4 h-4 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-purple-600">5</p>
                <p className="text-[10px] text-slate-500 mt-1">Flagged for review</p>
              </div>
            </div>

            {/* ─── Main Layout: Table + Sidebar ─── */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
              {/* ─── Audit Workflow Inbox (3/4) ─── */}
              <div className="xl:col-span-3 space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  {/* Inbox Header */}
                  <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-slate-700" />
                      <h2 className="text-sm font-bold text-slate-800">Audit Workflow Inbox</h2>
                    </div>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <Input
                        value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search by ID, name, location..."
                        className="pl-9 h-8 text-xs border-slate-200 bg-slate-50"
                      />
                    </div>
                  </div>

                  {/* Tabs */}
                  <Tabs value={activeTab} onValueChange={v => { setActiveTab(v); setSelectedRow(null); }}>
                    <div className="px-5 pt-2 border-b border-slate-100 overflow-x-auto">
                      <TabsList className="bg-transparent h-auto p-0 gap-0 rounded-none">
                        {[
                          { value: 'all', label: 'Show All', count: tabCounts.all },
                          { value: 'hoto', label: 'HOTO Failures', count: tabCounts.hoto },
                          { value: 'route', label: 'Route Reshuffling', count: tabCounts.route },
                          { value: 'cash', label: 'Cash Variance >5k', count: tabCounts.cash },
                          { value: 'eod', label: 'Delayed EOD', count: tabCounts.eod },
                          { value: 'risk', label: 'Risk ATMs', count: tabCounts.risk },
                        ].map(tab => (
                          <TabsTrigger
                            key={tab.value} value={tab.value}
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-700 data-[state=active]:shadow-none text-xs px-4 py-2.5 text-slate-500 font-medium"
                          >
                            {tab.label}
                            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.value ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                              {tab.count}
                            </span>
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>

                    {/* ─── Tab Content: HOTO ─── */}
                    <TabsContent value="hoto" className="m-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50/80">
                              <TableHead className="text-[11px] font-semibold text-slate-600">Route ID</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Outgoing Emp ID</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Shift Change</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">HOTO Status</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Sig: Outgoing</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Sig: Incoming</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterHoto.map((r, i) => (
                              <TableRow key={i} className={`cursor-pointer hover:bg-blue-50/50 transition-colors ${selectedRow === r ? 'bg-blue-50' : ''}`} onClick={() => selectDetailRow(r, 'hoto')}>
                                <TableCell className="text-xs font-mono text-slate-800 flex items-center gap-2">
                                  {r.manualOverride && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" title="Manual Override" />}
                                  {r.routeId}
                                </TableCell>
                                <TableCell className="text-xs text-slate-700">{r.outgoingEmpId}</TableCell>
                                <TableCell className="text-xs text-slate-600">{r.shiftTimestamp}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`text-[10px] ${r.hotoStatus === 'Failed' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                                    {r.hotoStatus}
                                  </Badge>
                                </TableCell>
                                <TableCell>{r.missingSigOut ? <X className="w-4 h-4 text-red-500" /> : <CheckCircle className="w-4 h-4 text-emerald-500" />}</TableCell>
                                <TableCell>{r.missingSigIn ? <X className="w-4 h-4 text-red-500" /> : <CheckCircle className="w-4 h-4 text-emerald-500" />}</TableCell>
                                <TableCell>
                                  <Button size="sm" variant="outline" className="h-7 text-[11px] border-blue-200 text-blue-700 hover:bg-blue-50" onClick={e => { e.stopPropagation(); toast.success(`Verification initiated for ${r.routeId}`); }}>
                                    <CheckCircle className="w-3 h-3 mr-1" /> Verify Sign-off
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* ─── Tab Content: Route Reshuffling ─── */}
                    <TabsContent value="route" className="m-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50/80">
                              <TableHead className="text-[11px] font-semibold text-slate-600">Custodian</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Emp ID</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Route</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Tenure</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Threshold</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Hard Lock</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Status</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Branch Mgr</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterRoute.map((r, i) => (
                              <TableRow key={i} className={`cursor-pointer hover:bg-blue-50/50 transition-colors ${r.tenureDays > r.threshold ? 'bg-red-50/40' : ''} ${selectedRow === r ? 'bg-blue-50' : ''}`} onClick={() => selectDetailRow(r, 'route')}>
                                <TableCell className="text-xs font-medium text-slate-800">{r.custodianName}</TableCell>
                                <TableCell className="text-xs font-mono text-slate-600">{r.empId}</TableCell>
                                <TableCell className="text-xs font-mono text-slate-700">{r.routeId}</TableCell>
                                <TableCell className={`text-xs font-bold ${r.tenureDays > r.threshold ? 'text-red-600' : 'text-amber-600'}`}>{r.tenureDays}d</TableCell>
                                <TableCell className="text-xs text-slate-500">{r.threshold}d</TableCell>
                                <TableCell>
                                  {r.hardLock ? <Badge variant="outline" className="text-[10px] bg-red-100 text-red-700 border-red-200">Locked</Badge>
                                    : <Badge variant="outline" className="text-[10px] bg-slate-100 text-slate-500 border-slate-200">Open</Badge>}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`text-[10px] ${r.status === 'Overdue' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                                    {r.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-slate-600">{r.branchManager}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                    <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 border-blue-200 text-blue-700 hover:bg-blue-50" onClick={() => toast.success(`Contacting ${r.branchManager}`)}>
                                      <Phone className="w-3 h-3" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 border-slate-200 text-slate-600 hover:bg-slate-50" onClick={() => toast.success(`Calling ${r.custodianName}`)}>
                                      <Phone className="w-3 h-3" />
                                    </Button>
                                    {!r.hardLock && (
                                      <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 border-red-200 text-red-600 hover:bg-red-50" onClick={() => toast.success(`Hard-Lock activated for ${r.routeId}`)}>
                                        <Lock className="w-3 h-3" />
                                      </Button>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* ─── Tab Content: Cash Variance ─── */}
                    <TabsContent value="cash" className="m-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50/80">
                              <TableHead className="text-[11px] font-semibold text-slate-600">ATM ID</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Route</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Variance</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Timestamp</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Source</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Physical</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Digital</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Deadline</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Status</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterCash.map((r, i) => (
                              <TableRow key={i} className={`cursor-pointer hover:bg-blue-50/50 transition-colors ${r.daysLeft <= 1 ? 'bg-red-50/40' : ''} ${selectedRow === r ? 'bg-blue-50' : ''}`} onClick={() => selectDetailRow(r, 'cash')}>
                                <TableCell className="text-xs font-mono text-slate-800">{r.atmId}</TableCell>
                                <TableCell className="text-xs font-mono text-slate-600">{r.routeId}</TableCell>
                                <TableCell className="text-xs font-bold text-red-600">₹{r.varianceAmt.toLocaleString()}</TableCell>
                                <TableCell className="text-xs text-slate-600">{r.timestamp}</TableCell>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-slate-100 text-slate-600 border-slate-200">{r.source}</Badge></TableCell>
                                <TableCell className="text-xs text-slate-700">₹{r.dispensePhysical.toLocaleString()}</TableCell>
                                <TableCell className="text-xs text-slate-700">₹{r.dispenseDigital.toLocaleString()}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-bold ${r.daysLeft <= 1 ? 'text-red-600' : r.daysLeft <= 3 ? 'text-amber-600' : 'text-slate-600'}`}>
                                      {r.daysLeft === 0 ? 'OVERDUE' : `${r.daysLeft}d left`}
                                    </span>
                                    <Progress value={((5 - r.daysLeft) / 5) * 100} className={`h-1 w-12 bg-slate-100 [&>div]:${r.daysLeft <= 1 ? 'bg-red-500' : r.daysLeft <= 3 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`text-[10px] ${r.status === 'Penalty Active' ? 'bg-red-100 text-red-700 border-red-200' : r.status === 'Escalated' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                                    {r.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Button size="sm" variant="outline" className="h-7 text-[11px] border-blue-200 text-blue-700 hover:bg-blue-50" onClick={e => { e.stopPropagation(); toast.info(`Opening EJ Log for ${r.atmId}`); }}>
                                    <Eye className="w-3 h-3 mr-1" /> View EJ
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* ─── Tab Content: Delayed EOD ─── */}
                    <TabsContent value="eod" className="m-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50/80">
                              <TableHead className="text-[11px] font-semibold text-slate-600">Route ID</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Branch Manager</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Delay (hours)</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">SLA Breached</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Status</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterEOD.map((r, i) => (
                              <TableRow key={i} className={`hover:bg-blue-50/50 transition-colors ${r.slaBreached ? 'bg-red-50/30' : ''}`}>
                                <TableCell className="text-xs font-mono text-slate-800">{r.routeId}</TableCell>
                                <TableCell className="text-xs text-slate-700">{r.branchManager}</TableCell>
                                <TableCell className={`text-xs font-bold ${r.delayHours > 6 ? 'text-red-600' : r.delayHours > 4 ? 'text-amber-600' : 'text-slate-700'}`}>{r.delayHours}h</TableCell>
                                <TableCell>
                                  {r.slaBreached ? <Badge variant="outline" className="text-[10px] bg-red-100 text-red-700 border-red-200">Yes</Badge>
                                    : <Badge variant="outline" className="text-[10px] bg-slate-100 text-slate-500 border-slate-200">No</Badge>}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`text-[10px] ${r.status === 'Overdue' ? 'bg-red-100 text-red-700 border-red-200' : r.status === 'SLA Breached' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                                    {r.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Button size="sm" variant="outline" className="h-7 text-[11px] border-blue-200 text-blue-700 hover:bg-blue-50" onClick={() => toast.success(`Contacting ${r.branchManager}`)}>
                                    <Phone className="w-3 h-3 mr-1" /> Contact
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* ─── Tab Content: Risk ATMs ─── */}
                    <TabsContent value="risk" className="m-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50/80">
                              <TableHead className="text-[11px] font-semibold text-slate-600">ATM ID</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Location</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Risk Score</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Active Risk Factors</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Status</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Custodian</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterRisk.map((r, i) => (
                              <TableRow key={i} className={`cursor-pointer hover:bg-blue-50/50 transition-colors ${selectedRow === r ? 'bg-blue-50' : ''}`} onClick={() => selectDetailRow(r, 'risk')}>
                                <TableCell className="text-xs font-mono text-slate-800">{r.atmId}</TableCell>
                                <TableCell className="text-xs text-slate-700">{r.location}</TableCell>
                                <TableCell>
                                  <span className={`text-xs font-bold ${r.riskScore > 85 ? 'text-red-600' : r.riskScore > 70 ? 'text-orange-600' : 'text-amber-600'}`}>{r.riskScore}</span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-wrap gap-1">
                                    {r.factors.map((f, fi) => (
                                      <Badge key={fi} variant="outline" className={`text-[9px] ${f.includes('Bottom Edge') || f.includes('Repeat') ? 'bg-red-50 text-red-600 border-red-200' : f.includes('High Cash') ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                        {f}
                                      </Badge>
                                    ))}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`text-[10px] ${r.status === 'Critical' ? 'bg-red-100 text-red-700 border-red-200' : r.status === 'High' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                                    {r.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-slate-700">{r.custodian}</TableCell>
                                <TableCell>
                                  <Button size="sm" variant="outline" className="h-7 text-[11px] border-purple-200 text-purple-700 hover:bg-purple-50" onClick={e => { e.stopPropagation(); toast.success(`Audit scheduled for ${r.atmId}`); }}>
                                    <Calendar className="w-3 h-3 mr-1" /> Schedule Audit
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* ─── Tab Content: Show All ─── */}
                    <TabsContent value="all" className="m-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50/80">
                              <TableHead className="text-[11px] font-semibold text-slate-600">Type</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">ID / Route</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Description</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Priority</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Status</TableHead>
                              <TableHead className="text-[11px] font-semibold text-slate-600">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {/* HOTO rows */}
                            {filterHoto.slice(0, 3).map((r, i) => (
                              <TableRow key={`h-${i}`} className="hover:bg-blue-50/50 cursor-pointer" onClick={() => { setActiveTab('hoto'); selectDetailRow(r, 'hoto'); }}>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-red-100 text-red-700 border-red-200">HOTO</Badge></TableCell>
                                <TableCell className="text-xs font-mono text-slate-700">{r.routeId}</TableCell>
                                <TableCell className="text-xs text-slate-600">HOTO {r.hotoStatus} — {r.outgoingEmpId}{r.manualOverride ? ' ⚠️' : ''}</TableCell>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-red-100 text-red-700 border-red-200">Critical</Badge></TableCell>
                                <TableCell><Badge variant="outline" className={`text-[10px] ${r.hotoStatus === 'Failed' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>{r.hotoStatus}</Badge></TableCell>
                                <TableCell><Button size="sm" variant="ghost" className="h-6 text-[10px] text-blue-600"><Eye className="w-3 h-3 mr-1" />View</Button></TableCell>
                              </TableRow>
                            ))}
                            {/* Route rows */}
                            {filterRoute.filter(r => r.tenureDays > r.threshold).slice(0, 3).map((r, i) => (
                              <TableRow key={`r-${i}`} className="hover:bg-blue-50/50 cursor-pointer bg-red-50/20" onClick={() => { setActiveTab('route'); selectDetailRow(r, 'route'); }}>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-red-100 text-red-700 border-red-200">Route</Badge></TableCell>
                                <TableCell className="text-xs font-mono text-slate-700">{r.routeId}</TableCell>
                                <TableCell className="text-xs text-slate-600">{r.custodianName} — {r.tenureDays}d tenure (threshold {r.threshold}d)</TableCell>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-red-100 text-red-700 border-red-200">Critical</Badge></TableCell>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-red-100 text-red-700 border-red-200">Overdue</Badge></TableCell>
                                <TableCell><Button size="sm" variant="ghost" className="h-6 text-[10px] text-blue-600"><Eye className="w-3 h-3 mr-1" />View</Button></TableCell>
                              </TableRow>
                            ))}
                            {/* Cash rows */}
                            {filterCash.slice(0, 3).map((r, i) => (
                              <TableRow key={`c-${i}`} className="hover:bg-blue-50/50 cursor-pointer" onClick={() => { setActiveTab('cash'); selectDetailRow(r, 'cash'); }}>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-orange-100 text-orange-700 border-orange-200">Cash</Badge></TableCell>
                                <TableCell className="text-xs font-mono text-slate-700">{r.atmId}</TableCell>
                                <TableCell className="text-xs text-slate-600">₹{r.varianceAmt.toLocaleString()} variance — {r.source}</TableCell>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-orange-100 text-orange-700 border-orange-200">High</Badge></TableCell>
                                <TableCell><Badge variant="outline" className={`text-[10px] ${r.daysLeft <= 1 ? 'bg-red-100 text-red-700 border-red-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>{r.daysLeft === 0 ? 'OVERDUE' : `${r.daysLeft}d left`}</Badge></TableCell>
                                <TableCell><Button size="sm" variant="ghost" className="h-6 text-[10px] text-blue-600"><Eye className="w-3 h-3 mr-1" />View</Button></TableCell>
                              </TableRow>
                            ))}
                            {/* EOD rows */}
                            {filterEOD.slice(0, 2).map((r, i) => (
                              <TableRow key={`e-${i}`} className="hover:bg-blue-50/50 cursor-pointer" onClick={() => setActiveTab('eod')}>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">EOD</Badge></TableCell>
                                <TableCell className="text-xs font-mono text-slate-700">{r.routeId}</TableCell>
                                <TableCell className="text-xs text-slate-600">{r.delayHours}h delay — {r.branchManager}</TableCell>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">Moderate</Badge></TableCell>
                                <TableCell><Badge variant="outline" className={`text-[10px] ${r.slaBreached ? 'bg-red-100 text-red-700 border-red-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>{r.status}</Badge></TableCell>
                                <TableCell><Button size="sm" variant="ghost" className="h-6 text-[10px] text-blue-600"><Eye className="w-3 h-3 mr-1" />View</Button></TableCell>
                              </TableRow>
                            ))}
                            {/* Risk rows */}
                            {filterRisk.slice(0, 2).map((r, i) => (
                              <TableRow key={`rk-${i}`} className="hover:bg-blue-50/50 cursor-pointer" onClick={() => { setActiveTab('risk'); selectDetailRow(r, 'risk'); }}>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-purple-100 text-purple-700 border-purple-200">Risk</Badge></TableCell>
                                <TableCell className="text-xs font-mono text-slate-700">{r.atmId}</TableCell>
                                <TableCell className="text-xs text-slate-600">Score {r.riskScore} — {r.factors.slice(0, 2).join(', ')}</TableCell>
                                <TableCell><Badge variant="outline" className={`text-[10px] ${r.riskScore > 80 ? 'bg-red-100 text-red-700 border-red-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>{r.status}</Badge></TableCell>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-purple-100 text-purple-700 border-purple-200">Flagged</Badge></TableCell>
                                <TableCell><Button size="sm" variant="ghost" className="h-6 text-[10px] text-blue-600"><Eye className="w-3 h-3 mr-1" />View</Button></TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* ─── Detail Panel (Bottom Deep Dive) ─── */}
                {selectedRow && (
                  <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
                    <div className="px-5 py-3 border-b border-blue-100 bg-blue-50/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <h3 className="text-sm font-bold text-slate-800">Deep Dive — {selectedRowType === 'cash' ? (selectedRow as CashVarianceRow).atmId : selectedRowType === 'hoto' ? (selectedRow as HOTORow).routeId : selectedRowType === 'route' ? (selectedRow as RouteRow).routeId : (selectedRow as RiskATMRow).atmId}</h3>
                      </div>
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-slate-500" onClick={() => setSelectedRow(null)}>
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="p-5">
                      {selectedRowType === 'cash' && (() => {
                        const r = selectedRow as CashVarianceRow;
                        return (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Left: Log comparison */}
                            <div>
                              <h4 className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">Log Comparison</h4>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                  <p className="text-[10px] text-slate-500 mb-1 font-medium">Bank Switch Log</p>
                                  <p className="text-sm font-bold text-slate-800">₹{r.dispenseDigital.toLocaleString()}</p>
                                  <p className="text-[10px] text-slate-400 mt-1">Digital dispense record</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                  <p className="text-[10px] text-slate-500 mb-1 font-medium">EJ Physical Log</p>
                                  <p className="text-sm font-bold text-slate-800">₹{r.dispensePhysical.toLocaleString()}</p>
                                  <p className="text-[10px] text-slate-400 mt-1">Physical count record</p>
                                </div>
                              </div>
                              <div className="mt-3 bg-red-50 rounded-lg p-3 border border-red-200">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-red-700 font-medium">Net Variance</span>
                                  <span className="text-sm font-bold text-red-700">₹{r.varianceAmt.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            {/* Right: Verdict & Deadline */}
                            <div>
                              <h4 className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">System Verdict</h4>
                              <div className={`rounded-lg p-4 border ${r.daysLeft <= 1 ? 'bg-red-50 border-red-200' : r.daysLeft <= 3 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
                                <div className="flex items-center gap-2 mb-2">
                                  {r.daysLeft <= 1 ? <AlertCircle className="w-4 h-4 text-red-600" /> : <Clock className="w-4 h-4 text-amber-600" />}
                                  <span className={`text-xs font-bold ${r.daysLeft <= 1 ? 'text-red-700' : 'text-amber-700'}`}>
                                    {r.daysLeft === 0 ? 'PENALTY ACTIVE — OVERDUE' : `${r.daysLeft} days remaining to resolve`}
                                  </span>
                                </div>
                                <div className="mb-2">
                                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                    <span>T+0</span><span>T+5 Deadline</span>
                                  </div>
                                  <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all ${r.daysLeft <= 1 ? 'bg-red-500' : r.daysLeft <= 3 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, ((5 - r.daysLeft) / 5) * 100)}%` }} />
                                  </div>
                                </div>
                                <p className="text-[11px] text-slate-600">Source: {r.source} | Detected: {r.timestamp}</p>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
                                  <Eye className="w-3 h-3 mr-1" /> Full EJ Log
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs border-slate-200 text-slate-600 hover:bg-slate-50">
                                  <MapPin className="w-3 h-3 mr-1" /> ATM Location
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {selectedRowType === 'hoto' && (() => {
                        const r = selectedRow as HOTORow;
                        return (
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <p className="text-[10px] text-slate-500 mb-1 font-medium uppercase">Route</p>
                              <p className="text-lg font-bold text-slate-800">{r.routeId}</p>
                              <p className="text-xs text-slate-500 mt-1">Shift: {r.shiftTimestamp}</p>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <p className="text-[10px] text-slate-500 mb-1 font-medium uppercase">Signatures</p>
                              <div className="space-y-1 mt-1">
                                <div className="flex items-center gap-2">
                                  {r.missingSigOut ? <X className="w-3.5 h-3.5 text-red-500" /> : <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                                  <span className="text-xs text-slate-700">Outgoing</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {r.missingSigIn ? <X className="w-3.5 h-3.5 text-red-500" /> : <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                                  <span className="text-xs text-slate-700">Incoming</span>
                                </div>
                              </div>
                            </div>
                            <div className={`rounded-lg p-4 border ${r.hotoStatus === 'Failed' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                              <p className="text-[10px] text-slate-500 mb-1 font-medium uppercase">Verdict</p>
                              <p className={`text-sm font-bold ${r.hotoStatus === 'Failed' ? 'text-red-700' : 'text-amber-700'}`}>{r.hotoStatus}</p>
                              {r.manualOverride && <Badge variant="outline" className="text-[10px] bg-red-100 text-red-700 border-red-200 mt-2">Manual Override Detected</Badge>}
                            </div>
                          </div>
                        );
                      })()}

                      {selectedRowType === 'route' && (() => {
                        const r = selectedRow as RouteRow;
                        return (
                          <div className="grid grid-cols-4 gap-4">
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <p className="text-[10px] text-slate-500 mb-1 font-medium uppercase">Custodian</p>
                              <p className="text-sm font-bold text-slate-800">{r.custodianName}</p>
                              <p className="text-xs text-slate-500">{r.empId}</p>
                            </div>
                            <div className={`rounded-lg p-4 border ${r.tenureDays > r.threshold ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                              <p className="text-[10px] text-slate-500 mb-1 font-medium uppercase">Tenure</p>
                              <p className={`text-lg font-bold ${r.tenureDays > r.threshold ? 'text-red-700' : 'text-amber-700'}`}>{r.tenureDays} days</p>
                              <p className="text-[10px] text-slate-500">Threshold: {r.threshold}d</p>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <p className="text-[10px] text-slate-500 mb-1 font-medium uppercase">Branch Manager</p>
                              <p className="text-sm font-bold text-slate-800">{r.branchManager}</p>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <p className="text-[10px] text-slate-500 mb-1 font-medium uppercase">Hard Lock</p>
                              <p className={`text-sm font-bold ${r.hardLock ? 'text-red-700' : 'text-emerald-700'}`}>{r.hardLock ? 'Active' : 'Not Applied'}</p>
                            </div>
                          </div>
                        );
                      })()}

                      {selectedRowType === 'risk' && (() => {
                        const r = selectedRow as RiskATMRow;
                        return (
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <p className="text-[10px] text-slate-500 mb-1 font-medium uppercase">ATM Details</p>
                              <p className="text-sm font-bold text-slate-800">{r.atmId}</p>
                              <p className="text-xs text-slate-500 mt-1">{r.location}</p>
                              <p className="text-xs text-slate-500">Custodian: {r.custodian}</p>
                            </div>
                            <div className={`rounded-lg p-4 border ${r.riskScore > 85 ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'}`}>
                              <p className="text-[10px] text-slate-500 mb-1 font-medium uppercase">Risk Score</p>
                              <p className={`text-2xl font-bold ${r.riskScore > 85 ? 'text-red-700' : 'text-orange-700'}`}>{r.riskScore}/100</p>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <p className="text-[10px] text-slate-500 mb-2 font-medium uppercase">Active Risk Factors</p>
                              <div className="flex flex-wrap gap-1">
                                {r.factors.map((f, i) => (
                                  <Badge key={i} variant="outline" className={`text-[9px] ${f.includes('Bottom') || f.includes('Repeat') ? 'bg-red-50 text-red-600 border-red-200' : f.includes('High Cash') ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                    {f}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Right Sidebar Panels ─── */}
              <div className="xl:col-span-1 space-y-4">
                {/* Audit Suggested Plan */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Audit Plan (3+1)</h3>
                  </div>
                  <div className="p-3 space-y-2">
                    {auditRoutes.map((route, idx) => (
                      <div key={route.id} className={`rounded-lg border p-3 transition-all hover:shadow-sm ${idx === 3 ? 'border-amber-200 bg-amber-50/50' : 'border-slate-200 bg-slate-50/50'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${idx < 3 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                            {idx < 3 ? `A${idx + 1}` : 'HR'}
                          </div>
                          <span className="text-xs font-semibold text-slate-800 truncate">{route.name}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          {idx < 3 ? <Clock className="w-3 h-3 text-blue-500" /> : <Zap className="w-3 h-3 text-amber-500" />}
                          <span className="text-[10px] text-slate-500">{route.selectionBasis}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-500">{route.region} • {route.atmCount} ATMs</span>
                          <span className={`font-bold ${route.daysOverdue > 45 ? 'text-red-600' : 'text-amber-600'}`}>{route.daysOverdue}d</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Predictive Risk Parameters */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-600" />
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Risk Parameters</h3>
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 text-[10px] text-purple-600 hover:bg-purple-50 px-2" onClick={() => setAddFactorOpen(true)}>
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="p-3 space-y-1.5">
                    {riskFactors.map(factor => (
                      <div key={factor.id} className={`rounded-lg border p-2.5 transition-all ${factor.active ? 'border-purple-200 bg-purple-50/30' : 'border-slate-200 bg-slate-50 opacity-60'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <button onClick={() => toggleFactor(factor.id)} className="flex-shrink-0">
                              {factor.active ? <ToggleRight className="w-4 h-4 text-purple-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                            </button>
                            <div className="min-w-0">
                              <p className="text-[11px] font-medium text-slate-800 truncate">{factor.name}</p>
                              <p className="text-[10px] text-slate-500 truncate">{factor.threshold}</p>
                            </div>
                          </div>
                          <button onClick={() => removeFactor(factor.id)} className="text-slate-400 hover:text-red-500 transition-colors ml-1 flex-shrink-0">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem Distribution */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-slate-600" />
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Distribution</h3>
                  </div>
                  <div className="p-3 space-y-2">
                    {['critical', 'high', 'moderate'].map(crit => {
                      const count = activeProblems.filter(p => p.criticality === crit).length;
                      if (count === 0) return null;
                      return (
                        <div key={crit} className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-[9px] w-16 justify-center border ${critBadge(crit)}`}>{crit.toUpperCase()}</Badge>
                          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div className={`h-full rounded-full ${crit === 'critical' ? 'bg-red-500' : crit === 'high' ? 'bg-orange-500' : 'bg-amber-500'}`} style={{ width: `${(count / Math.max(activeProblems.length, 1)) * 100}%` }} />
                          </div>
                          <span className="text-[11px] font-mono text-slate-600 w-4 text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Settings Modal ─── */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="bg-white border-slate-200 text-slate-900 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-slate-900 flex items-center gap-2"><Settings className="w-5 h-5" /> Problem Registry Admin</DialogTitle>
            <DialogDescription className="text-slate-500">Manage active problems. Archive resolved issues or permanently delete them.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {problems.map(p => (
              <div key={p.id} className={`flex items-center justify-between p-3 rounded-lg border ${p.archived ? 'border-slate-100 bg-slate-50 opacity-60' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Badge variant="outline" className={`text-[9px] border ${critBadge(p.criticality)} flex-shrink-0`}>{p.criticality.toUpperCase()}</Badge>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${p.archived ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{p.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{p.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 ml-3 flex-shrink-0">
                  {!p.archived && (
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-emerald-600 hover:bg-emerald-50" onClick={() => archiveProblem(p.id)}>
                      <Archive className="w-3 h-3 mr-1" /> Archive
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-red-500 hover:bg-red-50" onClick={() => deleteProblem(p.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <Button size="sm" variant="outline" className="text-xs" onClick={() => { setSettingsOpen(false); setAddProblemOpen(true); }}>
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Problem
            </Button>
            <Button variant="ghost" className="text-slate-500" onClick={() => setSettingsOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── Add Problem Modal ─── */}
      <Dialog open={addProblemOpen} onOpenChange={setAddProblemOpen}>
        <DialogContent className="bg-white border-slate-200 text-slate-900">
          <DialogHeader>
            <DialogTitle>Add New Problem</DialogTitle>
            <DialogDescription className="text-slate-500">Register a new operational gap in the problem registry.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-slate-700 text-xs">Problem Name</Label>
              <Input value={newProblem.name} onChange={e => setNewProblem(p => ({ ...p, name: e.target.value }))} placeholder="e.g., Key Duplication" className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-700 text-xs">Description</Label>
              <Textarea value={newProblem.description} onChange={e => setNewProblem(p => ({ ...p, description: e.target.value }))} placeholder="Describe..." className="mt-1" rows={2} />
            </div>
            <div>
              <Label className="text-slate-700 text-xs">Alert Trigger Logic</Label>
              <Input value={newProblem.triggerLogic} onChange={e => setNewProblem(p => ({ ...p, triggerLogic: e.target.value }))} placeholder="e.g., Count > 5 per week" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-slate-700 text-xs">Weightage (%)</Label>
                <Input type="number" value={newProblem.weightage} onChange={e => setNewProblem(p => ({ ...p, weightage: Number(e.target.value) }))} className="mt-1" />
              </div>
              <div>
                <Label className="text-slate-700 text-xs">Criticality</Label>
                <select value={newProblem.criticality} onChange={e => setNewProblem(p => ({ ...p, criticality: e.target.value as Problem['criticality'] }))} className="w-full mt-1 h-10 rounded-md border border-slate-200 bg-white text-slate-800 px-3 text-sm">
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="moderate">Moderate</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="ghost" className="text-slate-500" onClick={() => setAddProblemOpen(false)}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white" onClick={addProblemFn}>Add Problem</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Add Risk Factor Modal ─── */}
      <Dialog open={addFactorOpen} onOpenChange={setAddFactorOpen}>
        <DialogContent className="bg-white border-slate-200 text-slate-900">
          <DialogHeader>
            <DialogTitle>Add Risk Parameter</DialogTitle>
            <DialogDescription className="text-slate-500">Define a new parameter for high-risk ATM identification.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-slate-700 text-xs">Parameter Name</Label>
              <Input value={newFactor.name} onChange={e => setNewFactor(f => ({ ...f, name: e.target.value }))} placeholder="e.g., Frequent Downtime" className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-700 text-xs">Description</Label>
              <Textarea value={newFactor.description} onChange={e => setNewFactor(f => ({ ...f, description: e.target.value }))} placeholder="When does this apply?" className="mt-1" rows={2} />
            </div>
            <div>
              <Label className="text-slate-700 text-xs">Threshold</Label>
              <Input value={newFactor.threshold} onChange={e => setNewFactor(f => ({ ...f, threshold: e.target.value }))} placeholder="e.g., > 4h downtime/day" className="mt-1" />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="ghost" className="text-slate-500" onClick={() => setAddFactorOpen(false)}>Cancel</Button>
            <Button className="bg-purple-600 hover:bg-purple-500 text-white" onClick={addFactor}>Add Parameter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSGuardian;
