import React, { useState, useMemo } from 'react';
import { 
  Target, Shield, AlertTriangle, Users, MapPin, Eye, Camera, CheckCircle2, XCircle, 
  ChevronRight, Bell, Zap, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Building2, Route, Shuffle, Search, Filter, Clock, FileWarning, UserX, Wrench,
  Package, BarChart3, Layers, CalendarDays, ChevronDown, Lightbulb, Archive,
  BookOpen, ToggleLeft, ToggleRight, ShieldCheck, UserCog, Timer, History,
  Brain, Lock, AlertCircle, Info
} from 'lucide-react';
import { 
  auditPulse, riskTargets, liveAuditFeed, discrepancies, vaults, routes, auditAlerts,
  LiveAuditEntry, DiscrepancyEntry, VaultEntry, RouteEntry, AuditAlert
} from '@/data/cmsAuditCommand';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const formatCurrency = (v: number) => {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)} Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)} L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(1)}K`;
  return `₹${v.toLocaleString('en-IN')}`;
};

type SidebarTab = 'site-audits' | 'vault-audits';
type MainView = 'planner' | 'live-feed' | 'discrepancy' | 'vault-route' | 'learnings' | 'compliance';
type TimeframeKey = 'live' | '24h' | '7d' | '30d' | 'custom';

interface TimeframeOption {
  key: TimeframeKey;
  label: string;
  shortLabel: string;
}

const TIMEFRAME_OPTIONS: TimeframeOption[] = [
  { key: 'live', label: 'Live (Real-Time)', shortLabel: 'Live' },
  { key: '24h', label: 'Last 24 Hours', shortLabel: '24H' },
  { key: '7d', label: 'Last 7 Days', shortLabel: '7D' },
  { key: '30d', label: 'Last 30 Days', shortLabel: '30D' },
  { key: 'custom', label: 'Custom Range', shortLabel: 'Custom' },
];

// Generate sparkline data for KPIs
const generateSparkline = (endValue: number, points: number, volatility: number = 0.08): number[] => {
  const data: number[] = [];
  let current = endValue * (1 - volatility * 2);
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.4) * volatility * endValue;
    current = Math.max(current + change, endValue * 0.5);
    data.push(Math.round(current * 100) / 100);
  }
  data[data.length - 1] = endValue;
  return data;
};

// Historical KPI data per timeframe
const HISTORICAL_KPI: Record<Exclude<TimeframeKey, 'live'>, { hitRate: number[]; shortage: number[]; coverage: number[]; compliance: number[] }> = {
  '24h': { hitRate: generateSparkline(34.2, 24, 0.05), shortage: generateSparkline(1847500, 24, 0.06), coverage: generateSparkline(78.5, 24, 0.03), compliance: generateSparkline(87.3, 24, 0.02) },
  '7d': { hitRate: generateSparkline(34.2, 7, 0.08), shortage: generateSparkline(1847500, 7, 0.1), coverage: generateSparkline(78.5, 7, 0.06), compliance: generateSparkline(87.3, 7, 0.04) },
  '30d': { hitRate: generateSparkline(34.2, 30, 0.1), shortage: generateSparkline(1847500, 30, 0.15), coverage: generateSparkline(78.5, 30, 0.08), compliance: generateSparkline(87.3, 30, 0.05) },
  'custom': { hitRate: generateSparkline(34.2, 14, 0.09), shortage: generateSparkline(1847500, 14, 0.12), coverage: generateSparkline(78.5, 14, 0.07), compliance: generateSparkline(87.3, 14, 0.04) },
};

// Historical audit archive entries
const generateArchiveEntries = () => {
  const statuses: ('completed' | 'flagged')[] = ['completed', 'completed', 'completed', 'flagged', 'completed', 'flagged', 'completed', 'completed'];
  const locations = ['Andheri, Mumbai', 'CP, Delhi', 'MG Road, Bangalore', 'T. Nagar, Chennai', 'Hitec City, Hyderabad', 'Park St, Kolkata', 'MI Road, Jaipur', 'FC Road, Pune'];
  const auditors = ['Rajesh Sharma', 'Priya Mehta', 'Amit Patel', 'Kavita Joshi', 'Vikram Singh', 'Neha Gupta', 'Ravi Kumar', 'Sanjay Verma'];
  const entries = [];
  for (let i = 0; i < 40; i++) {
    const status = statuses[i % statuses.length];
    const hasMismatch = status === 'flagged' && Math.random() > 0.5;
    entries.push({
      id: `ARC-${String(i + 1).padStart(4, '0')}`,
      atmId: `ATM-${['MUM', 'DEL', 'BLR', 'CHN', 'HYD', 'KOL', 'JAI', 'PUN'][i % 8]}-${String(Math.floor(Math.random() * 200) + 1).padStart(4, '0')}`,
      location: locations[i % locations.length],
      auditorName: auditors[i % auditors.length],
      date: new Date(2026, 3, 13 - Math.floor(i / 3)).toISOString(),
      status,
      shortage: status === 'flagged' ? Math.floor(Math.random() * 50000 + 2000) : 0,
      manipulation: hasMismatch,
      result: status === 'flagged' ? (hasMismatch ? 'Manual Input Manipulation' : 'Shortage Found') : 'Clean',
    });
  }
  return entries;
};

const archiveEntries = generateArchiveEntries();

// Pattern insights
const PATTERN_INSIGHTS: Record<Exclude<TimeframeKey, 'live'>, string[]> = {
  '24h': [
    'Insight: 3 of 4 flagged audits in the last 24 hours originated from the South Region.',
    'Alert: Auditor AUD-1015 has been flagged twice — potential compliance review needed.',
  ],
  '7d': [
    'Insight: Vault Shortages in the North Region have spiked by 12% every Tuesday over the last week.',
    'Pattern: High-Traffic Salary Sites show 2.3x more discrepancies on month-end (29th–2nd).',
    'Trend: Manual Input Manipulations increased 40% week-over-week, concentrated in BLR-E routes.',
  ],
  '30d': [
    'Insight: Vault Shortages in the North Region have spiked by 12% every Tuesday over the last month.',
    'Pattern: 68% of all Human Error/Fraud cases originate from just 3 routes (BLR-E-02, DEL-S-03, JAI-C-01).',
    'Trend: Audit Hit Rate improved from 28% to 34% after introducing surprise audits in Week 2.',
    'Alert: Jaipur Regional Vault (VLT-JAI-01) shows a consistent upward shortage trend for 4 consecutive months.',
  ],
  'custom': [
    'Insight: Selected period shows 15% higher shortage discovery rate compared to the previous equivalent period.',
    'Pattern: Technical discrepancies peak during 6 AM–9 AM window (counter sync delays post-replenishment).',
  ],
};

// ── Codified Learnings Data ──
const codifiedLearnings = [
  { id: 'CL-001', observation: 'Manual Input Manipulation', source: 'ARC-0004 · ATM-CHN-0142', date: '12-Apr-26', rule: 'Enforce Photo-to-Value Validation for this Route', enabled: true, impact: 'Blocks manual override without camera verification', category: 'fraud-prevention', affectedRoutes: 3, savings: 185000 },
  { id: 'CL-002', observation: 'Repeated Cassette Seal Breach', source: 'ARC-0009 · VLT-MUM-03', date: '08-Apr-26', rule: 'Auto-escalate if seal status = Broken for 2+ consecutive loads', enabled: true, impact: 'Triggers immediate custodian review', category: 'physical-control', affectedRoutes: 5, savings: 320000 },
  { id: 'CL-003', observation: 'Counter Sync Drift > ₹10K', source: 'ARC-0012 · ATM-BLR-0088', date: '05-Apr-26', rule: 'Flag for same-day reconciliation if drift exceeds ₹10,000', enabled: false, impact: 'Prevents EOD drift accumulation', category: 'technical', affectedRoutes: 12, savings: 0 },
  { id: 'CL-004', observation: 'Custodian Route Tenure > 180 Days', source: 'Route DEL-S-03', date: '01-Apr-26', rule: 'Auto-trigger rotation recommendation after 180 days on same route', enabled: true, impact: 'Reduces pilferage risk from route familiarity', category: 'compliance', affectedRoutes: 8, savings: 450000 },
  { id: 'CL-005', observation: 'Silent FLM Close Without EJ Update', source: 'ARC-0017 · ATM-HYD-0201', date: '28-Mar-26', rule: 'Block FLM close action unless EJ log updated within 15 min', enabled: false, impact: 'Prevents unverified closures from masking shortages', category: 'fraud-prevention', affectedRoutes: 6, savings: 0 },
  { id: 'CL-006', observation: 'Overage Reporting Delay > 2 EODs', source: 'ARC-0021 · ATM-MUM-0034', date: '22-Mar-26', rule: 'Auto-apply harmonizing penalty flag if overage undeclared by EOD+1', enabled: true, impact: 'Enforces declaration discipline, prevents penalty leakage', category: 'compliance', affectedRoutes: 15, savings: 280000 },
];

// ── Compliance Monitor Data ──
const complianceViolations = [
  { id: 'CV-001', type: 'Custodian Rotation', custodian: 'Manoj Kumar (CUS-1042)', route: 'DEL-S-03', tenure: 245, allowed: 180, severity: 'critical', status: 'Escalated', escalatedTo: 'Regional Ops Manager', detail: 'Custodian has been on this high-risk route 65 days beyond rotation window. Route has 3 shortage incidents in this period.' },
  { id: 'CV-002', type: 'Custodian Rotation', custodian: 'Suresh Patil (CUS-2018)', route: 'MUM-W-07', tenure: 198, allowed: 180, severity: 'high', status: 'Pending Review', escalatedTo: '', detail: 'Exceeded 180-day limit by 18 days. No incidents reported but compliance breach flagged.' },
  { id: 'CV-003', type: 'Route Tenure', custodian: 'Ravi Shankar (CUS-3005)', route: 'BLR-E-02', tenure: 312, allowed: 180, severity: 'critical', status: 'Breach Confirmed', escalatedTo: 'Zonal Head + Audit Committee', detail: 'Longest active tenure violation. Route has highest theft risk score (92). 4 manipulation flags in last 90 days.' },
  { id: 'CV-004', type: 'Custodian Rotation', custodian: 'Anil Mehta (CUS-1089)', route: 'JAI-C-01', tenure: 165, allowed: 180, severity: 'medium', status: 'Pre-Alert', escalatedTo: '', detail: '15 days until rotation deadline. Auto-rotation recommendation sent to ops.' },
  { id: 'CV-005', type: 'Route Continuity', custodian: 'Deepak Joshi (CUS-4022)', route: 'HYD-N-04', tenure: 220, allowed: 180, severity: 'high', status: 'Pending Review', escalatedTo: '', detail: '40 days over limit. Route serves transit corridor with high footfall. 2 overage delays reported.' },
  { id: 'CV-006', type: 'SOP Violation', custodian: 'Vinay Gupta (CUS-2044)', route: 'PUN-E-01', tenure: 90, allowed: 180, severity: 'high', status: 'Under Investigation', escalatedTo: 'Internal Audit', detail: 'Custodian skipped 3 mandatory photo captures in last 7 days. SOP breach flagged for non-compliance.' },
];

// ── Risk Score Breakdown Data ──
const riskScoreBreakdown: Record<string, { factor: string; weight: number; score: number; detail: string }[]> = {};
riskTargets.forEach(t => {
  riskScoreBreakdown[t.name] = [
    { factor: 'Overage Reporting Delay', weight: 25, score: Math.min(100, Math.round(t.riskScore * 0.3 + Math.random() * 20)), detail: `${Math.floor(Math.random() * 3 + 1)} late declarations in last 30 days` },
    { factor: 'Custodian Tenure', weight: 20, score: Math.min(100, Math.round(t.riskScore * 0.25 + Math.random() * 15)), detail: `${Math.floor(Math.random() * 200 + 60)} days on current route` },
    { factor: 'Site Persona Risk', weight: 20, score: Math.min(100, Math.round(t.riskScore * 0.2 + Math.random() * 25)), detail: `${t.sitePersona} — ${t.sitePersona.includes('Transit') || t.sitePersona.includes('Salary') ? 'High footfall corridor' : 'Standard risk profile'}` },
    { factor: 'Historical Shortage', weight: 20, score: t.totalShortage > 0 ? Math.min(100, Math.round(t.totalShortage / 1000)) : 0, detail: t.totalShortage > 0 ? `₹${formatCurrency(t.totalShortage)} cumulative` : 'No prior shortage' },
    { factor: 'Balance Drift Frequency', weight: 15, score: Math.min(100, t.balanceDriftCount * 25), detail: `${t.balanceDriftCount} drift events detected` },
  ];
});

// ── Historical Context for planned audits ──
const historicalIncidents: Record<string, { date: string; type: string; amount: number; resolution: string; severity: string }[]> = {};
riskTargets.forEach(t => {
  const incidents = [];
  if (t.totalShortage > 0) {
    incidents.push({ date: '15-Mar-26', type: 'Shortage', amount: Math.round(t.totalShortage * 0.6), resolution: 'Vendor Debited', severity: 'high' });
    incidents.push({ date: '02-Feb-26', type: 'Counter Mismatch', amount: Math.round(t.totalShortage * 0.4), resolution: 'Technical Error — Auto-corrected', severity: 'medium' });
  }
  if (t.balanceDriftCount > 0) {
    incidents.push({ date: '20-Jan-26', type: 'Balance Drift', amount: 8500, resolution: 'FLM Verification — Cleared', severity: 'low' });
  }
  if (t.riskScore >= 70) {
    incidents.push({ date: '10-Dec-25', type: 'Manual Input Manipulation', amount: 25000, resolution: 'Custodian Suspended', severity: 'critical' });
  }
  historicalIncidents[t.name] = incidents.length > 0 ? incidents : [
    { date: '01-Mar-26', type: 'Routine Audit', amount: 0, resolution: 'Clean — No Issues', severity: 'info' }
  ];
});

// Mini sparkline SVG component
const MiniSparkline: React.FC<{ data: number[]; color: string; height?: number; width?: number }> = ({ data, color, height = 28, width = 80 }) => {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  const firstPoint = `0,${height}`;
  const lastPoint = `${width},${height}`;
  const fillPoints = `${firstPoint} ${points} ${lastPoint}`;
  return (
    <svg width={width} height={height} className="mt-1">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const CMSAuditCommand: React.FC = () => {
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('site-audits');
  const [mainView, setMainView] = useState<MainView>('planner');
  const [selectedAudit, setSelectedAudit] = useState<LiveAuditEntry | null>(null);
  const [selectedDiscrepancy, setSelectedDiscrepancy] = useState<DiscrepancyEntry | null>(null);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vaultRouteView, setVaultRouteView] = useState<'vaults' | 'routes'>('vaults');
  const [timeframe, setTimeframe] = useState<TimeframeKey>('live');
  const [timeframeDropdownOpen, setTimeframeDropdownOpen] = useState(false);
  const [customDateFrom, setCustomDateFrom] = useState<Date | undefined>();
  const [customDateTo, setCustomDateTo] = useState<Date | undefined>();
  const [archiveSearch, setArchiveSearch] = useState('');
  const [archiveFilter, setArchiveFilter] = useState<'all' | 'flagged' | 'manipulation'>('all');
  const [archivePage, setArchivePage] = useState(1);
  const archivePageSize = 8;
  const [expandedRiskTarget, setExpandedRiskTarget] = useState<string | null>(null);
  const [learningToggles, setLearningToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(codifiedLearnings.map(l => [l.id, l.enabled]))
  );

  const isHistorical = timeframe !== 'live';
  const criticalAlerts = auditAlerts.filter(a => a.severity === 'critical' || a.requiresSignoff);

  const filteredTargets = riskTargets.filter(t => {
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase()) && !t.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredArchive = useMemo(() => {
    return archiveEntries.filter(e => {
      if (archiveFilter === 'flagged' && e.status !== 'flagged') return false;
      if (archiveFilter === 'manipulation' && !e.manipulation) return false;
      if (archiveSearch) {
        const q = archiveSearch.toLowerCase();
        return e.atmId.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.auditorName.toLowerCase().includes(q) || e.result.toLowerCase().includes(q);
      }
      return true;
    });
  }, [archiveFilter, archiveSearch]);

  const paginatedArchive = filteredArchive.slice((archivePage - 1) * archivePageSize, archivePage * archivePageSize);
  const totalArchivePages = Math.ceil(filteredArchive.length / archivePageSize);

  const historicalDiscrepancyAggregate = useMemo(() => {
    const multiplier = timeframe === '30d' ? 5 : timeframe === '7d' ? 2.5 : timeframe === '24h' ? 1 : 3;
    return {
      technical: Math.round(discrepancies.filter(d => d.category === 'technical').length * multiplier),
      physical: Math.round(discrepancies.filter(d => d.category === 'physical').length * multiplier),
      human: Math.round(discrepancies.filter(d => d.category === 'human').length * multiplier),
    };
  }, [timeframe]);

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getSeverityColor = (s: string) => {
    switch (s) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-emerald-100 text-emerald-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getCategoryIcon = (c: string) => {
    switch (c) {
      case 'technical': return <Wrench className="w-4 h-4" />;
      case 'physical': return <Package className="w-4 h-4" />;
      case 'human': return <UserX className="w-4 h-4" />;
      default: return <FileWarning className="w-4 h-4" />;
    }
  };

  const historicalKey = timeframe !== 'live' ? timeframe : '24h';
  const currentHistKpi = isHistorical ? HISTORICAL_KPI[historicalKey] : null;
  const currentInsights = isHistorical ? PATTERN_INSIGHTS[historicalKey] : null;
  const timeframeLabel = TIMEFRAME_OPTIONS.find(o => o.key === timeframe)?.label || 'Live';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <div className="w-56 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm tracking-tight">Audit Command</span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Continuous Control Hub</p>
        </div>

        <div className="p-2 space-y-1">
          <button onClick={() => setSidebarTab('site-audits')} className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${sidebarTab === 'site-audits' ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:bg-slate-800'}`}>
            <MapPin className="w-4 h-4" /> Site Audits
          </button>
          <button onClick={() => setSidebarTab('vault-audits')} className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${sidebarTab === 'vault-audits' ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Building2 className="w-4 h-4" /> Vault Audits
          </button>
        </div>

        <div className="border-t border-slate-800 mt-2 p-2 space-y-1">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest px-3 py-1">Workspace</p>
          {[
            { key: 'planner' as MainView, icon: Target, label: 'Risk Planner' },
            { key: 'live-feed' as MainView, icon: isHistorical ? Archive : Eye, label: isHistorical ? 'Audit Archive' : 'Live Feed' },
            { key: 'discrepancy' as MainView, icon: AlertTriangle, label: 'Discrepancies' },
            { key: 'vault-route' as MainView, icon: Route, label: 'Vaults & Routes' },
          ].map(item => (
            <button key={item.key} onClick={() => setMainView(item.key)} className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${mainView === item.key ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </div>

        {/* Workstream 4 & 5 Section */}
        <div className="border-t border-slate-800 mt-2 p-2 space-y-1">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest px-3 py-1">Continuous Control</p>
          <button onClick={() => setMainView('learnings')} className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${mainView === 'learnings' ? 'bg-indigo-500/15 text-indigo-400' : 'text-slate-400 hover:bg-slate-800/50'}`}>
            <Brain className="w-4 h-4" /> Codified Learnings
          </button>
          <button onClick={() => setMainView('compliance')} className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${mainView === 'compliance' ? 'bg-rose-500/15 text-rose-400' : 'text-slate-400 hover:bg-slate-800/50'}`}>
            <ShieldCheck className="w-4 h-4" /> Compliance Monitor
            {complianceViolations.filter(v => v.severity === 'critical').length > 0 && (
              <span className="ml-auto px-1.5 py-0.5 rounded-full text-[9px] bg-red-600 text-white font-bold animate-pulse">
                {complianceViolations.filter(v => v.severity === 'critical').length}
              </span>
            )}
          </button>
        </div>

        <div className="mt-auto p-3 border-t border-slate-800">
          <button onClick={() => setAlertsOpen(!alertsOpen)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">
            <Bell className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400 font-medium">{criticalAlerts.length} Alerts</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Timeframe Filter */}
        <div className="border-b border-slate-800 bg-slate-900/50 px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              Audit Command Center
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>70,000 ATMs</span><span>·</span><span>129 Vaults</span><span>·</span><span>3,000 Routes</span>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                {TIMEFRAME_OPTIONS.filter(o => o.key !== 'custom').map(opt => (
                  <button key={opt.key} onClick={() => { setTimeframe(opt.key); setTimeframeDropdownOpen(false); }}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider transition-colors flex items-center gap-1 ${
                      timeframe === opt.key
                        ? opt.key === 'live' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}>
                    {opt.key === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                    {opt.shortLabel}
                  </button>
                ))}
                <Popover open={timeframeDropdownOpen} onOpenChange={setTimeframeDropdownOpen}>
                  <PopoverTrigger asChild>
                    <button className={`px-2.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider transition-colors flex items-center gap-1 ${
                      timeframe === 'custom' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                    }`}>
                      <CalendarDays className="w-3 h-3" /> Custom
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3 bg-slate-900 border-slate-700" align="end">
                    <div className="space-y-3">
                      <p className="text-xs font-medium text-slate-300">Select Date Range</p>
                      <div className="flex gap-3">
                        <div>
                          <p className="text-[10px] text-slate-500 mb-1">From</p>
                          <Calendar mode="single" selected={customDateFrom} onSelect={setCustomDateFrom} className="p-2 pointer-events-auto bg-slate-800 rounded-lg border border-slate-700" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 mb-1">To</p>
                          <Calendar mode="single" selected={customDateTo} onSelect={setCustomDateTo} className="p-2 pointer-events-auto bg-slate-800 rounded-lg border border-slate-700" />
                        </div>
                      </div>
                      <button onClick={() => { setTimeframe('custom'); setTimeframeDropdownOpen(false); }}
                        className="w-full px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-lg text-xs font-medium hover:bg-amber-500/30 transition-colors border border-amber-500/20">
                        Apply Range
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {!isHistorical && <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-medium">LIVE</span>}
              {isHistorical && <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[10px] font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> HISTORICAL</span>}
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50" title="Targeting accuracy: % of audits that successfully identify a discrepancy">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Audit Hit Rate</span>
                <Target className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{auditPulse.auditHitRate}%</div>
                  <div className="flex items-center gap-1 mt-1">
                    {auditPulse.auditHitRateTrend > 0 ? <ArrowUpRight className="w-3 h-3 text-emerald-400" /> : <ArrowDownRight className="w-3 h-3 text-red-400" />}
                    <span className={`text-xs ${auditPulse.auditHitRateTrend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{Math.abs(auditPulse.auditHitRateTrend)}% vs prev</span>
                  </div>
                </div>
                {isHistorical && currentHistKpi && <MiniSparkline data={currentHistKpi.hitRate} color="#f59e0b" />}
              </div>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-4 border border-red-500/20" title="Total physical cash leakage caught by auditors this month">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Shortage Discovered</span>
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-400">{formatCurrency(auditPulse.totalShortageDiscovered)}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {auditPulse.shortageTrend < 0 ? <TrendingDown className="w-3 h-3 text-emerald-400" /> : <TrendingUp className="w-3 h-3 text-red-400" />}
                    <span className={`text-xs ${auditPulse.shortageTrend < 0 ? 'text-emerald-400' : 'text-red-400'}`}>{Math.abs(auditPulse.shortageTrend)}% vs prev</span>
                  </div>
                </div>
                {isHistorical && currentHistKpi && <MiniSparkline data={currentHistKpi.shortage} color="#ef4444" />}
              </div>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50" title="% of Red (High-Risk) ATMs audited within their 30-day window">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Risk Coverage</span>
                <Shield className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{auditPulse.riskCoverage}%</div>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400">{auditPulse.riskCoverageTrend}% vs prev</span>
                  </div>
                </div>
                {isHistorical && currentHistKpi && <MiniSparkline data={currentHistKpi.coverage} color="#3b82f6" />}
              </div>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-4 border border-emerald-500/20" title="Average score for field rigor: Geo-tagging + OTC Status + Auditually Video quality">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Auditor Compliance</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{auditPulse.auditorComplianceScore}%</div>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400">{auditPulse.complianceTrend}% vs prev</span>
                  </div>
                </div>
                {isHistorical && currentHistKpi && <MiniSparkline data={currentHistKpi.compliance} color="#10b981" />}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[9px] text-slate-500">
                <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5 text-emerald-400" />Geo 92%</span>
                <span className="flex items-center gap-0.5"><Lock className="w-2.5 h-2.5 text-emerald-400" />OTC 88%</span>
                <span className="flex items-center gap-0.5"><Camera className="w-2.5 h-2.5 text-amber-400" />Video 82%</span>
              </div>
            </div>
          </div>

          {/* Pattern Insights Banner (historical only) */}
          {isHistorical && currentInsights && (
            <div className="mt-4 bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pattern Recognition — {timeframeLabel}</span>
              </div>
              <div className="space-y-1.5">
                {currentInsights.map((insight, i) => (
                  <p key={i} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">▸</span>{insight}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Workspace */}
        <div className="flex-1 overflow-auto p-6">

          {/* ═══ RISK PLANNER (Enhanced with Score Breakdown + Historical Context) ═══ */}
          {mainView === 'planner' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  Risk-Based Audit Planner
                  <span className="text-[10px] text-slate-500 font-normal ml-2">Scoring ingested from Data Lake ML models</span>
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search ATM / Location..." className="bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder:text-slate-600 w-56 focus:outline-none focus:border-amber-500/50" />
                  </div>
                  <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                    {['all', 'high', 'medium', 'low'].map(p => (
                      <button key={p} onClick={() => setPriorityFilter(p)} className={`px-2.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider transition-colors ${priorityFilter === p ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                  <button disabled={isHistorical}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      isHistorical ? 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed' : 'bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border-amber-500/20'
                    }`} title={isHistorical ? 'Surprise Audits are live events only' : 'Trigger Surprise Audit'}>
                    <Shuffle className="w-3.5 h-3.5" /> Surprise Audit
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mb-4 text-[10px]">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> High Priority — 30 Day Cycle</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Medium — 60 Day Cycle</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low — 90 Day Cycle</span>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-800">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-800/80 text-slate-400 uppercase tracking-wider">
                      <th className="text-left px-4 py-2.5 font-medium">Terminal ID</th>
                      <th className="text-left px-4 py-2.5 font-medium">Location</th>
                      <th className="text-left px-4 py-2.5 font-medium">Site Persona</th>
                      <th className="text-center px-4 py-2.5 font-medium">Priority</th>
                      <th className="text-center px-4 py-2.5 font-medium" title="Live score from Data Lake — click row for the 'Why'">Preemption Score</th>
                      <th className="text-center px-4 py-2.5 font-medium" title="Adaptive cycle — auto-shortened on leakage trends">Adaptive Cycle</th>
                      <th className="text-center px-4 py-2.5 font-medium">Balance Drift</th>
                      <th className="text-right px-4 py-2.5 font-medium">Total Shortage</th>
                      <th className="text-center px-4 py-2.5 font-medium">Days Since</th>
                      <th className="text-center px-4 py-2.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTargets.map((t) => (
                      <React.Fragment key={t.id}>
                        <tr className={`border-t border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer ${t.overdue ? 'bg-red-500/5' : ''}`}
                          onClick={() => setExpandedRiskTarget(expandedRiskTarget === t.name ? null : t.name)}>
                          <td className="px-4 py-2.5 font-mono font-medium text-white flex items-center gap-1">
                            <ChevronRight className={`w-3 h-3 text-slate-500 transition-transform ${expandedRiskTarget === t.name ? 'rotate-90' : ''}`} />
                            {t.name}
                          </td>
                          <td className="px-4 py-2.5 text-slate-400">{t.location}</td>
                          <td className="px-4 py-2.5"><span className="text-slate-300">{t.sitePersona}</span></td>
                          <td className="px-4 py-2.5 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getPriorityColor(t.priority)}`}>{t.priority.toUpperCase()}</span>
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            <span className={`font-bold ${t.riskScore >= 80 ? 'text-red-400' : t.riskScore >= 50 ? 'text-amber-400' : 'text-emerald-400'}`}>{t.riskScore}</span>
                            <span className="text-[9px] text-slate-600 ml-1">/100</span>
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            {(() => {
                              const preempted = t.riskScore >= 80 && t.auditCycleTarget > 7;
                              const effectiveCycle = preempted ? 7 : t.auditCycleTarget;
                              return (
                                <div className="flex flex-col items-center gap-0.5">
                                  <span className={`text-xs font-mono font-bold ${preempted ? 'text-red-400' : 'text-slate-300'}`}>{effectiveCycle}d</span>
                                  {preempted ? (
                                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-red-500/20 text-red-400 uppercase tracking-wider flex items-center gap-0.5">
                                      <Zap className="w-2 h-2" /> Preempted
                                    </span>
                                  ) : (
                                    <span className="text-[9px] text-slate-600">{t.auditCycleTarget}d cycle</span>
                                  )}
                                </div>
                              );
                            })()}
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            {t.balanceDriftCount > 0 ? <span className="text-red-400 font-medium">{t.balanceDriftCount}x</span> : <span className="text-slate-600">—</span>}
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            {t.totalShortage > 0 ? <span className="text-red-400 font-medium">{formatCurrency(t.totalShortage)}</span> : <span className="text-emerald-400">Clean</span>}
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            <span className={`font-mono ${t.daysSinceAudit > t.auditCycleTarget ? 'text-red-400 font-bold' : 'text-slate-400'}`}>{t.daysSinceAudit}d</span>
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            {t.overdue ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-600 text-white animate-pulse">OVERDUE</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-700 text-slate-300">On Track</span>
                            )}
                          </td>
                        </tr>
                        {/* ── Expanded: Risk Score Breakdown + Historical Context ── */}
                        {expandedRiskTarget === t.name && (
                          <tr>
                            <td colSpan={10} className="px-4 py-3 bg-slate-800/40 border-t border-slate-700/30">
                              <div className="grid grid-cols-2 gap-4">
                                {/* Risk Score Breakdown */}
                                <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                                    <span className="text-[10px] font-bold text-indigo-400 uppercase">Risk Score Breakdown — {t.riskScore}/100</span>
                                  </div>
                                  <p className="text-[9px] text-slate-500 mb-2">
                                    High Risk due to: {riskScoreBreakdown[t.name]?.filter(f => f.score >= 60).map(f => f.factor).join(' + ') || 'Multiple factors'}
                                  </p>
                                  <div className="space-y-1.5">
                                    {riskScoreBreakdown[t.name]?.map((f, i) => (
                                      <div key={i}>
                                        <div className="flex items-center justify-between text-[10px] mb-0.5">
                                          <span className="text-slate-300">{f.factor} <span className="text-slate-600">({f.weight}%)</span></span>
                                          <span className={`font-bold ${f.score >= 70 ? 'text-red-400' : f.score >= 40 ? 'text-amber-400' : 'text-emerald-400'}`}>{f.score}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${f.score >= 70 ? 'bg-red-500' : f.score >= 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                              style={{ width: `${f.score}%` }} />
                                          </div>
                                          <span className="text-[9px] text-slate-500 min-w-[140px]">{f.detail}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Historical Context Card */}
                                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <History className="w-3.5 h-3.5 text-amber-400" />
                                    <span className="text-[10px] font-bold text-amber-400 uppercase">Historical Context — Past Incidents</span>
                                  </div>
                                  <p className="text-[9px] text-slate-500 mb-2">Major events at this site — helps auditor know what to look for.</p>
                                  <div className="space-y-1.5">
                                    {historicalIncidents[t.name]?.map((inc, i) => (
                                      <div key={i} className={`flex items-center gap-2 p-1.5 rounded border ${
                                        inc.severity === 'critical' ? 'border-red-500/30 bg-red-500/5' :
                                        inc.severity === 'high' ? 'border-amber-500/20 bg-amber-500/5' :
                                        inc.severity === 'medium' ? 'border-slate-600 bg-slate-800/30' :
                                        'border-slate-700 bg-slate-800/20'
                                      }`}>
                                        <span className="text-[9px] text-slate-500 font-mono min-w-[70px]">{inc.date}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${
                                          inc.severity === 'critical' ? 'bg-red-600 text-white' :
                                          inc.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                                          inc.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                                          'bg-slate-700 text-slate-400'
                                        }`}>{inc.type}</span>
                                        {inc.amount > 0 && <span className="text-[9px] text-red-400 font-mono">{formatCurrency(inc.amount)}</span>}
                                        <span className="text-[9px] text-slate-400 ml-auto">{inc.resolution}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══ LIVE FEED / AUDIT ARCHIVE ═══ */}
          {mainView === 'live-feed' && (
            <>
              {!isHistorical ? (
                <div className="flex gap-6">
                  <div className="flex-1">
                    <h2 className="text-base font-bold flex items-center gap-2 mb-4">
                      <Eye className="w-4 h-4 text-emerald-400" />
                      Live Audit Feed
                      <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-medium">LIVE</span>
                    </h2>
                    <div className="space-y-3">
                      {liveAuditFeed.map(audit => (
                        <div key={audit.id} onClick={() => setSelectedAudit(selectedAudit?.id === audit.id ? null : audit)}
                          className={`rounded-xl border p-4 cursor-pointer transition-all ${
                            audit.status === 'flagged' ? 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10' :
                            audit.status === 'completed' ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10' :
                            'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
                          } ${selectedAudit?.id === audit.id ? 'ring-1 ring-amber-400/50' : ''}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-white text-sm">{audit.atmId}</span>
                              <span className="text-xs text-slate-500">{audit.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                audit.status === 'flagged' ? 'bg-red-600 text-white' :
                                audit.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                              }`}>{audit.status.toUpperCase()}</span>
                              <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${selectedAudit?.id === audit.id ? 'rotate-90' : ''}`} />
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-3 mb-2">
                            <div className="text-center"><p className="text-[10px] text-slate-500 uppercase">Switch</p><p className="text-sm font-mono text-white">{audit.switchCounter.toLocaleString()}</p></div>
                            <div className="text-center"><p className="text-[10px] text-slate-500 uppercase">Machine</p><p className="text-sm font-mono text-white">{audit.machineCounter.toLocaleString()}</p></div>
                            <div className="text-center"><p className="text-[10px] text-slate-500 uppercase">Physical</p><p className="text-sm font-mono text-white">{audit.physicalCount.toLocaleString()}</p></div>
                            <div className="text-center"><p className="text-[10px] text-slate-500 uppercase">Diff. AMT</p>
                              <p className={`text-sm font-mono font-bold ${audit.diffAmount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                                {audit.diffAmount > 0 ? `-₹${audit.diffAmount.toLocaleString()}` : '₹0'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-[10px]">
                            <span className="text-slate-500">Auditor: <span className="text-slate-300">{audit.auditorName}</span></span>
                            <span className="text-slate-500">ID: <span className="text-slate-300">{audit.auditorId}</span></span>
                            <span className="text-slate-500">{new Date(audit.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedAudit && (
                    <div className="w-96 bg-slate-900 rounded-xl border border-slate-800 p-4 overflow-auto max-h-[calc(100vh-240px)]">
                      <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-amber-400" />
                        Audit Detail — {selectedAudit.atmId}
                      </h3>
                      <div className="mb-4">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Photo Evidence Gallery</p>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedAudit.photoEvidence.map((photo, i) => (
                            <div key={i} className={`rounded-lg border p-2 text-center ${photo.verified ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                              <div className="w-full aspect-square bg-slate-800 rounded-md mb-1.5 flex items-center justify-center">
                                <Camera className={`w-6 h-6 ${photo.verified ? 'text-emerald-600' : 'text-red-600'}`} />
                              </div>
                              <p className="text-[10px] text-slate-300">{photo.type}</p>
                              <p className={`text-[9px] ${photo.verified ? 'text-emerald-400' : 'text-red-400'}`}>
                                {photo.verified ? '✓ Verified' : '✗ Mismatch'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                          <p className="text-[10px] text-slate-500 uppercase mb-1">SOP Compliance</p>
                          <div className="space-y-1">
                            {selectedAudit.sopCompliance.map((s, i) => (
                              <div key={i} className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">{s.item}</span>
                                <span className={s.status ? 'text-emerald-400' : 'text-red-400'}>{s.status ? '✓' : '✗'}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                          <p className="text-[10px] text-slate-500 uppercase mb-1">Auditor</p>
                          <p className="text-xs text-white">{selectedAudit.auditorName}</p>
                          <p className="text-[10px] text-slate-400">{selectedAudit.auditorId}</p>
                        </div>
                        {selectedAudit.status === 'flagged' && (
                          <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors">Escalate</button>
                            <button className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg text-xs font-medium hover:bg-slate-600 transition-colors">FIR Attach</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* HISTORICAL MODE — Archive */
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold flex items-center gap-2">
                      <Archive className="w-4 h-4 text-amber-400" />
                      Audit Archive & Logs
                      <span className="ml-2 px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[10px] font-medium">{timeframeLabel}</span>
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input value={archiveSearch} onChange={e => { setArchiveSearch(e.target.value); setArchivePage(1); }}
                          placeholder="Search ATM, location, auditor..." className="bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder:text-slate-600 w-64 focus:outline-none focus:border-amber-500/50" />
                      </div>
                      <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                        {([
                          { key: 'all' as const, label: 'All' },
                          { key: 'flagged' as const, label: 'Flagged Only' },
                          { key: 'manipulation' as const, label: 'Manipulations' },
                        ]).map(f => (
                          <button key={f.key} onClick={() => { setArchiveFilter(f.key); setArchivePage(1); }}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors ${archiveFilter === f.key ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mb-4">
                    <div className="bg-slate-800/60 rounded-lg px-4 py-2 border border-slate-700/50 text-center">
                      <p className="text-[10px] text-slate-500 uppercase">Total Audits</p>
                      <p className="text-lg font-bold text-white">{filteredArchive.length}</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg px-4 py-2 border border-red-500/20 text-center">
                      <p className="text-[10px] text-slate-500 uppercase">Flagged</p>
                      <p className="text-lg font-bold text-red-400">{filteredArchive.filter(e => e.status === 'flagged').length}</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg px-4 py-2 border border-amber-500/20 text-center">
                      <p className="text-[10px] text-slate-500 uppercase">Manipulations</p>
                      <p className="text-lg font-bold text-amber-400">{filteredArchive.filter(e => e.manipulation).length}</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg px-4 py-2 border border-slate-700/50 text-center">
                      <p className="text-[10px] text-slate-500 uppercase">Total Shortage</p>
                      <p className="text-lg font-bold text-red-400">{formatCurrency(filteredArchive.reduce((s, e) => s + e.shortage, 0))}</p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-slate-800">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-slate-800/80 text-slate-400 uppercase tracking-wider">
                          <th className="text-left px-4 py-2.5 font-medium">Audit ID</th>
                          <th className="text-left px-4 py-2.5 font-medium">ATM</th>
                          <th className="text-left px-4 py-2.5 font-medium">Location</th>
                          <th className="text-left px-4 py-2.5 font-medium">Auditor</th>
                          <th className="text-center px-4 py-2.5 font-medium">Date</th>
                          <th className="text-center px-4 py-2.5 font-medium">Status</th>
                          <th className="text-right px-4 py-2.5 font-medium">Shortage</th>
                          <th className="text-center px-4 py-2.5 font-medium">Closure Quality</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedArchive.map(e => (
                          <tr key={e.id} className={`border-t border-slate-800/50 hover:bg-slate-800/30 transition-colors ${e.manipulation ? 'bg-red-500/5' : ''}`}>
                            <td className="px-4 py-2.5 font-mono text-slate-400">{e.id}</td>
                            <td className="px-4 py-2.5 font-mono font-medium text-white">{e.atmId}</td>
                            <td className="px-4 py-2.5 text-slate-400">{e.location}</td>
                            <td className="px-4 py-2.5 text-slate-300">{e.auditorName}</td>
                            <td className="px-4 py-2.5 text-center text-slate-400">{new Date(e.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</td>
                            <td className="px-4 py-2.5 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${e.status === 'flagged' ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'}`}>
                                {e.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-right">
                              {e.shortage > 0 ? <span className="text-red-400 font-medium">{formatCurrency(e.shortage)}</span> : <span className="text-emerald-400">₹0</span>}
                            </td>
                            {/* Closure Quality: Report Closed vs System Fixed */}
                            <td className="px-4 py-2.5 text-center">
                              {e.status === 'flagged' ? (
                                e.manipulation ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/20 text-indigo-400 flex items-center gap-1 justify-center">
                                    <Lock className="w-3 h-3" /> System Fixed
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-700 text-slate-300 flex items-center gap-1 justify-center">
                                    <CheckCircle2 className="w-3 h-3" /> Report Closed
                                  </span>
                                )
                              ) : (
                                <span className="text-emerald-400 text-[10px]">Clean</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {totalArchivePages > 1 && (
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[10px] text-slate-500">Showing {(archivePage - 1) * archivePageSize + 1}–{Math.min(archivePage * archivePageSize, filteredArchive.length)} of {filteredArchive.length}</span>
                      <div className="flex gap-1">
                        {Array.from({ length: totalArchivePages }, (_, i) => (
                          <button key={i} onClick={() => setArchivePage(i + 1)}
                            className={`w-7 h-7 rounded text-[10px] font-medium transition-colors ${archivePage === i + 1 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500 hover:text-slate-300'}`}>
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ═══ DISCREPANCY ROOT CAUSE ═══ */}
          {mainView === 'discrepancy' && (
            <div className="flex gap-6">
              <div className="flex-1">
                <h2 className="text-base font-bold flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Discrepancy Root Cause Workspace
                  {isHistorical && <span className="ml-2 px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[10px] font-medium">Aggregate — {timeframeLabel}</span>}
                </h2>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { cat: 'Technical', icon: <Wrench className="w-4 h-4" />, count: isHistorical ? historicalDiscrepancyAggregate.technical : discrepancies.filter(d => d.category === 'technical').length, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                    { cat: 'Physical', icon: <Package className="w-4 h-4" />, count: isHistorical ? historicalDiscrepancyAggregate.physical : discrepancies.filter(d => d.category === 'physical').length, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                    { cat: 'Human Error/Fraud', icon: <UserX className="w-4 h-4" />, count: isHistorical ? historicalDiscrepancyAggregate.human : discrepancies.filter(d => d.category === 'human').length, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
                  ].map(c => (
                    <div key={c.cat} className={`rounded-xl p-3 border ${c.color}`}>
                      <div className="flex items-center gap-2 mb-1">{c.icon}<span className="text-sm font-medium">{c.cat}</span></div>
                      <span className="text-2xl font-bold">{c.count}</span><span className="text-xs ml-1 opacity-60">findings</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {discrepancies.map(d => (
                    <div key={d.id} onClick={() => setSelectedDiscrepancy(selectedDiscrepancy?.id === d.id ? null : d)}
                      className={`rounded-xl border p-4 cursor-pointer transition-all hover:bg-slate-800/30 ${
                        d.severity === 'critical' ? 'border-red-500/30 bg-red-500/5' :
                        d.severity === 'high' ? 'border-amber-500/30 bg-amber-500/5' :
                        'border-slate-700 bg-slate-800/30'
                      } ${selectedDiscrepancy?.id === d.id ? 'ring-1 ring-amber-400/50' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`p-1.5 rounded-lg ${d.category === 'human' ? 'bg-red-500/15 text-red-400' : d.category === 'physical' ? 'bg-amber-500/15 text-amber-400' : 'bg-blue-500/15 text-blue-400'}`}>
                            {getCategoryIcon(d.category)}
                          </span>
                          <div>
                            <span className="font-mono font-medium text-white text-sm">{d.atmId}</span>
                            <span className="mx-2 text-slate-600">·</span>
                            <span className="text-xs text-slate-400">{d.subCategory}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400 font-bold text-sm">{formatCurrency(d.amount)}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getSeverityColor(d.severity)}`}>{d.severity.toUpperCase()}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{d.description}</p>
                      {d.photoMismatch && (
                        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-red-400 bg-red-500/10 rounded-lg px-2.5 py-1 w-fit">
                          <Camera className="w-3 h-3" /> Manual Input Manipulation Detected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedDiscrepancy && (
                <div className="w-96 bg-slate-900 rounded-xl border border-slate-800 p-4 overflow-auto max-h-[calc(100vh-240px)]">
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <FileWarning className="w-4 h-4 text-red-400" />
                    Deep Dive — {selectedDiscrepancy.atmId}
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <p className="text-[10px] text-slate-500 uppercase mb-1">Category</p>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(selectedDiscrepancy.category)}
                        <span className="text-sm font-medium text-white capitalize">{selectedDiscrepancy.category}</span>
                        <span className="text-xs text-slate-400">— {selectedDiscrepancy.subCategory}</span>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <p className="text-[10px] text-slate-500 uppercase mb-1">Root Cause</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{selectedDiscrepancy.rootCause}</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <p className="text-[10px] text-slate-500 uppercase mb-1">Shortage Amount</p>
                      <p className="text-xl font-bold text-red-400">{formatCurrency(selectedDiscrepancy.amount)}</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <p className="text-[10px] text-slate-500 uppercase mb-1">Closure Quality</p>
                      {selectedDiscrepancy.photoMismatch ? (
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/20 text-indigo-400 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> System Fixed
                          </span>
                          <span className="text-[10px] text-slate-500">Root cause codified into photo validation rule</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            selectedDiscrepancy.status === 'resolved' ? 'bg-emerald-600 text-white' :
                            selectedDiscrepancy.status === 'escalated' ? 'bg-red-600 text-white' :
                            'bg-amber-600 text-white'
                          }`}>{selectedDiscrepancy.status === 'resolved' ? 'Report Closed' : selectedDiscrepancy.status.toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    {selectedDiscrepancy.photoMismatch && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <p className="text-xs text-red-300 font-medium flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5" /> Photo Mismatch Alert
                        </p>
                        <p className="text-[10px] text-red-400/80 mt-1">Photo evidence does not match manually typed digits. Flagged for potential fraud investigation.</p>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors">Escalate</button>
                      <button className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg text-xs font-medium hover:bg-slate-600 transition-colors">Mark Resolved</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══ VAULT & ROUTE EXPLORER ═══ */}
          {mainView === 'vault-route' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  Vault & Route Explorer
                  {isHistorical && <span className="ml-2 px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[10px] font-medium">{timeframeLabel}</span>}
                </h2>
                <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                  <button onClick={() => setVaultRouteView('vaults')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${vaultRouteView === 'vaults' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>129 Vaults</button>
                  <button onClick={() => setVaultRouteView('routes')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${vaultRouteView === 'routes' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>3,000 Routes</button>
                </div>
              </div>

              {vaultRouteView === 'vaults' && (
                <div className="overflow-hidden rounded-xl border border-slate-800">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-800/80 text-slate-400 uppercase tracking-wider">
                        <th className="text-left px-4 py-2.5 font-medium">Vault</th>
                        <th className="text-left px-4 py-2.5 font-medium">Location</th>
                        <th className="text-center px-4 py-2.5 font-medium">ATMs</th>
                        <th className="text-center px-4 py-2.5 font-medium">Last Audit</th>
                        <th className="text-right px-4 py-2.5 font-medium">Total Shortage</th>
                        <th className="text-center px-4 py-2.5 font-medium">Trend ({isHistorical ? timeframeLabel : '4M'})</th>
                        <th className="text-center px-4 py-2.5 font-medium">Compliance</th>
                        <th className="text-center px-4 py-2.5 font-medium">Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vaults.map(v => {
                        const trendUp = v.shortageTrend[3] > v.shortageTrend[2];
                        return (
                          <tr key={v.id} className="border-t border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                            <td className="px-4 py-2.5 font-mono font-medium text-white">{v.id}</td>
                            <td className="px-4 py-2.5 text-slate-400">{v.name}, {v.location}</td>
                            <td className="px-4 py-2.5 text-center text-slate-300">{v.totalATMs}</td>
                            <td className="px-4 py-2.5 text-center text-slate-400">{new Date(v.lastAuditDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</td>
                            <td className="px-4 py-2.5 text-right text-red-400 font-medium">{formatCurrency(v.totalShortage)}</td>
                            <td className="px-4 py-2.5 text-center">
                              <div className="flex items-center justify-center gap-1">
                                {trendUp ? <TrendingUp className="w-3 h-3 text-red-400" /> : <TrendingDown className="w-3 h-3 text-emerald-400" />}
                                <div className="flex gap-px">
                                  {v.shortageTrend.map((val, i) => (
                                    <div key={i} className="w-3" style={{ height: `${Math.max(4, (val / Math.max(...v.shortageTrend)) * 16)}px` }}>
                                      <div className={`w-full h-full rounded-sm ${i === 3 ? (trendUp ? 'bg-red-400' : 'bg-emerald-400') : 'bg-slate-600'}`} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2.5 text-center">
                              <span className={`font-medium ${v.complianceScore >= 90 ? 'text-emerald-400' : v.complianceScore >= 80 ? 'text-amber-400' : 'text-red-400'}`}>{v.complianceScore}%</span>
                            </td>
                            <td className="px-4 py-2.5 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getPriorityColor(v.riskLevel)}`}>{v.riskLevel.toUpperCase()}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {vaultRouteView === 'routes' && (
                <div className="overflow-hidden rounded-xl border border-slate-800">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-800/80 text-slate-400 uppercase tracking-wider">
                        <th className="text-left px-4 py-2.5 font-medium">Route Code</th>
                        <th className="text-left px-4 py-2.5 font-medium">Region</th>
                        <th className="text-left px-4 py-2.5 font-medium">Custodian</th>
                        <th className="text-center px-4 py-2.5 font-medium">ATMs</th>
                        <th className="text-center px-4 py-2.5 font-medium">Theft Risk</th>
                        <th className="text-center px-4 py-2.5 font-medium">Discrepancies</th>
                        <th className="text-right px-4 py-2.5 font-medium">Avg Shortage</th>
                        <th className="text-center px-4 py-2.5 font-medium">Surprise Audits</th>
                        <th className="text-center px-4 py-2.5 font-medium">Last Audit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routes.sort((a, b) => b.theftRiskScore - a.theftRiskScore).map(r => (
                        <tr key={r.id} className="border-t border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                          <td className="px-4 py-2.5 font-mono font-medium text-white">{r.routeCode}</td>
                          <td className="px-4 py-2.5 text-slate-400">{r.region}</td>
                          <td className="px-4 py-2.5">
                            <span className="text-slate-300">{r.custodianName}</span>
                            <span className="text-slate-600 ml-1 text-[10px]">{r.custodianId}</span>
                          </td>
                          <td className="px-4 py-2.5 text-center text-slate-300">{r.atmCount}</td>
                          <td className="px-4 py-2.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${r.theftRiskScore >= 80 ? 'bg-red-500' : r.theftRiskScore >= 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                  style={{ width: `${r.theftRiskScore}%` }} />
                              </div>
                              <span className={`font-bold ${r.theftRiskScore >= 80 ? 'text-red-400' : r.theftRiskScore >= 50 ? 'text-amber-400' : 'text-emerald-400'}`}>{r.theftRiskScore}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2.5 text-center text-slate-300">{r.totalDiscrepancies}</td>
                          <td className="px-4 py-2.5 text-right text-red-400 font-medium">{formatCurrency(r.averageShortage)}</td>
                          <td className="px-4 py-2.5 text-center text-slate-400">{r.surpriseAuditCount}</td>
                          <td className="px-4 py-2.5 text-center text-slate-400">{new Date(r.lastAuditDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ═══ CODIFIED LEARNINGS (Learning Loop) ═══ */}
          {mainView === 'learnings' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-400" />
                  Codified Learnings — The Learning Loop
                </h2>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> {codifiedLearnings.filter(l => learningToggles[l.id]).length} Active Rules
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <XCircle className="w-3 h-3" /> {codifiedLearnings.filter(l => !learningToggles[l.id]).length} Inactive
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    Est. Savings: {formatCurrency(codifiedLearnings.filter(l => learningToggles[l.id]).reduce((s, l) => s + l.savings, 0))}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 mb-4">
                Historical audit observations are converted into active system rules. Toggle a rule to enforce it across all affected routes automatically.
              </p>

              <div className="space-y-3">
                {codifiedLearnings.map(learning => {
                  const isActive = learningToggles[learning.id];
                  return (
                    <div key={learning.id} className={`rounded-xl border p-4 transition-all ${
                      isActive ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-slate-700 bg-slate-800/30'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`p-1.5 rounded-lg ${
                            learning.category === 'fraud-prevention' ? 'bg-red-500/15 text-red-400' :
                            learning.category === 'compliance' ? 'bg-amber-500/15 text-amber-400' :
                            learning.category === 'physical-control' ? 'bg-blue-500/15 text-blue-400' :
                            'bg-slate-700 text-slate-400'
                          }`}>
                            {learning.category === 'fraud-prevention' ? <AlertTriangle className="w-4 h-4" /> :
                             learning.category === 'compliance' ? <ShieldCheck className="w-4 h-4" /> :
                             learning.category === 'physical-control' ? <Lock className="w-4 h-4" /> :
                             <Wrench className="w-4 h-4" />}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-white">{learning.observation}</p>
                            <p className="text-[10px] text-slate-500">Source: {learning.source} · {learning.date}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setLearningToggles(prev => ({ ...prev, [learning.id]: !prev[learning.id] }))}
                          className="flex items-center gap-2 transition-colors"
                        >
                          {isActive ? (
                            <ToggleRight className="w-8 h-8 text-indigo-400" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-slate-600" />
                          )}
                        </button>
                      </div>

                      <div className={`rounded-lg p-3 mb-2 border ${isActive ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-slate-800/50 border-slate-700'}`}>
                        <p className="text-[10px] text-indigo-400 font-bold uppercase mb-1">System Rule</p>
                        <p className="text-xs text-slate-200">{learning.rule}</p>
                      </div>

                      <div className="flex items-center gap-4 text-[10px]">
                        <span className="text-slate-500">Impact: <span className="text-slate-300">{learning.impact}</span></span>
                        <span className="text-slate-500">Routes: <span className="text-white font-bold">{learning.affectedRoutes}</span></span>
                        {learning.savings > 0 && (
                          <span className="text-emerald-400 font-medium">Savings: {formatCurrency(learning.savings)}</span>
                        )}
                        <span className={`ml-auto px-2 py-0.5 rounded text-[9px] font-medium ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
                          {isActive ? '● ENFORCED' : '○ DISABLED'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ COMPLIANCE MONITOR (SOP Enforcement) ═══ */}
          {mainView === 'compliance' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  Compliance Monitor — Digital SOP Enforcement
                </h2>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-red-400 font-medium">
                    <AlertCircle className="w-3 h-3 animate-pulse" />
                    {complianceViolations.filter(v => v.severity === 'critical').length} Critical Violations
                  </span>
                  <span className="text-slate-500">
                    {complianceViolations.length} total findings
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 mb-4">
                Near-real-time SOP violation tracking: Custodian Rotation, Route Tenure, and Procedural Compliance.
              </p>

              {/* Critical Breach Banner */}
              {complianceViolations.some(v => v.severity === 'critical') && (
                <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <p className="text-xs font-bold text-red-400 mb-1">⚠ CRITICAL ROTATION BREACHES DETECTED</p>
                    <p className="text-[10px] text-red-300/80">
                      {complianceViolations.filter(v => v.severity === 'critical').length} custodian(s) have exceeded maximum rotation window on high-risk routes. Immediate action required.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {complianceViolations.map(violation => (
                  <div key={violation.id} className={`rounded-xl border p-4 transition-all ${
                    violation.severity === 'critical' ? 'border-red-500/40 bg-red-500/5' :
                    violation.severity === 'high' ? 'border-amber-500/30 bg-amber-500/5' :
                    'border-slate-700 bg-slate-800/30'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`p-1.5 rounded-lg ${
                          violation.type === 'Custodian Rotation' ? 'bg-rose-500/15 text-rose-400' :
                          violation.type === 'Route Tenure' ? 'bg-amber-500/15 text-amber-400' :
                          'bg-red-500/15 text-red-400'
                        }`}>
                          {violation.type === 'SOP Violation' ? <Camera className="w-4 h-4" /> : <UserCog className="w-4 h-4" />}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-white">{violation.custodian}</p>
                          <p className="text-[10px] text-slate-500">Route: <span className="text-slate-300 font-mono">{violation.route}</span> · {violation.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          violation.severity === 'critical' ? 'bg-red-600 text-white animate-pulse' :
                          violation.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>{violation.severity.toUpperCase()}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          violation.status === 'Escalated' ? 'bg-red-500/20 text-red-400' :
                          violation.status === 'Breach Confirmed' ? 'bg-red-600 text-white' :
                          violation.status === 'Under Investigation' ? 'bg-amber-500/20 text-amber-400' :
                          violation.status === 'Pre-Alert' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-slate-700 text-slate-300'
                        }`}>{violation.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-2">
                      <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/50">
                        <p className="text-[9px] text-slate-500 uppercase mb-0.5">Current Tenure</p>
                        <p className={`text-lg font-bold font-mono ${violation.tenure > violation.allowed ? 'text-red-400' : 'text-white'}`}>{violation.tenure}d</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-2 border border-slate-700/50">
                        <p className="text-[9px] text-slate-500 uppercase mb-0.5">Allowed Max</p>
                        <p className="text-lg font-bold font-mono text-slate-400">{violation.allowed}d</p>
                      </div>
                      <div className={`rounded-lg p-2 border ${violation.tenure > violation.allowed ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                        <p className="text-[9px] text-slate-500 uppercase mb-0.5">Overshoot</p>
                        <p className={`text-lg font-bold font-mono ${violation.tenure > violation.allowed ? 'text-red-400' : 'text-emerald-400'}`}>
                          {violation.tenure > violation.allowed ? `+${violation.tenure - violation.allowed}d` : 'On Track'}
                        </p>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 mb-2">{violation.detail}</p>

                    {violation.escalatedTo && (
                      <div className="flex items-center gap-2 text-[10px] text-amber-400">
                        <ArrowUpRight className="w-3 h-3" />
                        Escalated to: <span className="font-medium text-white">{violation.escalatedTo}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Alert Sidebar */}
      {alertsOpen && (
        <div className="w-80 bg-slate-900 border-l border-slate-800 overflow-auto shrink-0">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Bell className="w-4 h-4 text-red-400" />
              Real-Time Alerts
            </h3>
            <button onClick={() => setAlertsOpen(false)} className="text-slate-500 hover:text-white text-xs">✕</button>
          </div>
          <div className="p-3 space-y-2">
            {auditAlerts.map(alert => (
              <div key={alert.id} className={`rounded-lg p-3 border ${
                alert.severity === 'critical' ? 'border-red-500/30 bg-red-500/10' :
                alert.severity === 'high' ? 'border-amber-500/30 bg-amber-500/10' :
                alert.severity === 'info' ? 'border-blue-500/30 bg-blue-500/10' :
                'border-slate-700 bg-slate-800/50'
              }`}>
                <div className="flex items-start gap-2 mb-1">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${getSeverityColor(alert.severity)}`}>{alert.severity.toUpperCase()}</span>
                  <span className="text-[10px] text-slate-500">{new Date(alert.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>
                {alert.requiresSignoff && (
                  <button className="mt-2 w-full px-2 py-1.5 bg-amber-500/15 text-amber-400 rounded-lg text-[10px] font-medium hover:bg-amber-500/25 transition-colors border border-amber-500/20">
                    Requires Sign-off →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSAuditCommand;
