import React, { useState, useMemo } from 'react';
import {
  Shield, AlertTriangle, Search, Clock, MapPin, Camera, Video, CheckCircle2, XCircle,
  Users, FileWarning, UserX, Lock, ShieldAlert, Bell, X, ChevronRight, TrendingUp,
  TrendingDown, Eye, Send, FileText, BookOpen, CheckCheck, Activity, Radio,
} from 'lucide-react';
import {
  auditPulse, riskTargets, liveAuditFeed, AuditTarget, LiveAuditEntry,
} from '@/data/cmsAuditCommand';

// ───────────────────────── helpers ─────────────────────────
const formatINR = (v: number) => {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)} Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)} L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(1)}K`;
  return `₹${v.toLocaleString('en-IN')}`;
};

// Simple, readable risk-level mapping (no jargon, no numeric "scores")
type RiskLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'INFO';
const toRiskLevel = (t: AuditTarget): RiskLevel => {
  if (t.riskScore >= 85 || t.overdue) return 'CRITICAL';
  if (t.riskScore >= 65) return 'HIGH';
  if (t.riskScore >= 40) return 'MODERATE';
  return 'INFO';
};

const riskBadgeClass = (lvl: RiskLevel) => ({
  CRITICAL: 'bg-red-600 text-white',
  HIGH: 'bg-orange-500 text-white',
  MODERATE: 'bg-blue-500 text-white',
  INFO: 'bg-slate-400 text-white',
}[lvl]);

const generateSpark = (end: number, n: number, vol = 0.08): number[] => {
  const data: number[] = [];
  let cur = end * (1 - vol * 2);
  for (let i = 0; i < n; i++) {
    cur = Math.max(cur + (Math.random() - 0.4) * vol * end, end * 0.5);
    data.push(Math.round(cur * 100) / 100);
  }
  data[data.length - 1] = end;
  return data;
};

const Sparkline: React.FC<{ data: number[]; color: string; w?: number; h?: number }> = ({ data, color, w = 100, h = 32 }) => {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(' ');
  return (
    <svg width={w} height={h} className="block">
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ───────────────────────── plain-english risk reasons ─────────────────────────
type RiskReason = { label: string; count: string; severity: 'critical' | 'high' | 'moderate' };
const buildRiskReasons = (t: AuditTarget): RiskReason[] => {
  const out: RiskReason[] = [];
  if (t.balanceDriftCount > 0) out.push({ label: 'Missing Cash Reports', count: `${t.balanceDriftCount} found`, severity: 'high' });
  if (t.totalShortage > 0) out.push({ label: 'Unresolved Cash Mismatch', count: formatINR(t.totalShortage), severity: 'critical' });
  if (t.overdue) out.push({ label: `Beyond ${t.auditCycleTarget}-Day Audit Cycle`, count: `${t.daysSinceAudit - t.auditCycleTarget} days overdue`, severity: 'critical' });
  // Synthesised plain-english factors
  const tenure = 60 + Math.floor((t.riskScore / 100) * 90);
  if (tenure > 60) out.push({ label: 'Staff on Same Route Too Long', count: `${tenure - 60} days beyond limit`, severity: tenure > 120 ? 'high' : 'moderate' });
  if (t.sitePersona.toLowerCase().includes('high')) out.push({ label: 'Located in High-Footfall Area', count: t.sitePersona, severity: 'moderate' });
  if (out.length === 0) out.push({ label: 'No active risk signals', count: 'Routine cycle audit', severity: 'moderate' });
  return out;
};

// ───────────────────────── SOP control violations (plain english) ─────────────────────────
type ControlHub = 'rotation' | 'handover' | 'two-person' | 'security';
interface SOPViolation {
  id: string; hub: ControlHub; title: string; subject: string; route: string;
  detail: string; severity: 'CRITICAL' | 'HIGH' | 'MODERATE'; status: 'Open' | 'Escalated' | 'Notice Issued';
}
const sopViolations: SOPViolation[] = [
  // Hub A — Staff Rotation
  { id: 'SOP-101', hub: 'rotation', title: 'Staff on same route 245 days', subject: 'Manoj Kumar (CUS-1042)', route: 'DEL-S-03', detail: '185 days beyond the 60-day rotation limit. Route has 3 cash mismatch incidents in the last 90 days.', severity: 'CRITICAL', status: 'Open' },
  { id: 'SOP-102', hub: 'rotation', title: 'Staff on same route 198 days', subject: 'Suresh Patil (CUS-2018)', route: 'MUM-W-07', detail: '138 days beyond limit. No incidents yet — review window has been breached.', severity: 'HIGH', status: 'Open' },
  { id: 'SOP-103', hub: 'rotation', title: 'Staff on same route 312 days', subject: 'Ravi Shankar (CUS-3005)', route: 'BLR-E-02', detail: 'Longest active tenure violation. 4 manipulation flags in last 90 days.', severity: 'CRITICAL', status: 'Escalated' },
  // Hub B — Handover (HOTO)
  { id: 'SOP-201', hub: 'handover', title: 'Paper-based handover detected', subject: 'Anil Mehta → Vinod Rao', route: 'JAI-C-01', detail: '₹4.2L cassette transfer signed on paper instead of digital app. 18 hours of unverified custody.', severity: 'CRITICAL', status: 'Open' },
  { id: 'SOP-202', hub: 'handover', title: 'Missing biometric confirmation', subject: 'Deepak Joshi → Karan Singh', route: 'HYD-N-04', detail: 'Incoming custodian acknowledged via SMS only — no fingerprint or face match captured.', severity: 'HIGH', status: 'Open' },
  // Hub C — Two-Person Rule
  { id: 'SOP-301', hub: 'two-person', title: 'Single-user vault access', subject: 'Vinay Gupta (CUS-2044)', route: 'PUN-E-01', detail: 'One custodian requested codes for both locks at the same vault. Two-person rule was bypassed.', severity: 'CRITICAL', status: 'Open' },
  { id: 'SOP-302', hub: 'two-person', title: 'Second custodian out of range', subject: 'Rohit Kapoor (CUS-3012)', route: 'BLR-W-02', detail: 'Second custodian was 2.4 km away when door codes were issued. Required: within 50 metres.', severity: 'HIGH', status: 'Open' },
  // Hub D — Security Mode
  { id: 'SOP-401', hub: 'security', title: 'ATM in Manual Mode for 4 hours', subject: 'ATM-MUM-0001 · Engineer: Prakash Iyer', route: 'MUM-W-01', detail: 'Manual mode active 2 hours past the safe limit. Window of fraud exposure exceeded.', severity: 'CRITICAL', status: 'Open' },
  { id: 'SOP-402', hub: 'security', title: 'ATM in Manual Mode for 3 hours', subject: 'ATM-DEL-0102 · Engineer: Sandeep Yadav', route: 'DEL-S-03', detail: '1 hour past the 2-hour safe threshold. No supervisor sign-off on file.', severity: 'HIGH', status: 'Open' },
];

const HUB_META: Record<ControlHub, { label: string; sub: string; icon: React.ReactNode }> = {
  rotation: { label: 'Staff Rotation', sub: 'Staff on same route > 60 days', icon: <Users className="w-4 h-4" /> },
  handover: { label: 'Handover (HOTO) Gaps', sub: 'Paper-based or unverified custody transfers', icon: <FileWarning className="w-4 h-4" /> },
  'two-person': { label: 'Two-Person Rule', sub: 'Single-user access or proximity breaches', icon: <UserX className="w-4 h-4" /> },
  security: { label: 'Security Mode', sub: 'ATMs in Manual Mode > 2 hours', icon: <Lock className="w-4 h-4" /> },
};

// ───────────────────────── Learning Loop entries ─────────────────────────
type ClosureKind = 'task-completed' | 'rule-codified';
const learningEntries: { id: string; finding: string; site: string; date: string; kind: ClosureKind; outcome: string }[] = [
  { id: 'LL-001', finding: 'Repeat shortage in Cassette 3', site: 'ATM-MUM-0001', date: '12-Apr-26', kind: 'task-completed', outcome: 'Cassette replaced, seal re-verified by FLM' },
  { id: 'LL-002', finding: 'Manual override without photo evidence', site: 'ATM-CHN-0142', date: '10-Apr-26', kind: 'rule-codified', outcome: 'New rule: block manual override unless camera verifies counter' },
  { id: 'LL-003', finding: 'Custodian on route 245 days', site: 'Route DEL-S-03', date: '08-Apr-26', kind: 'rule-codified', outcome: 'Auto-trigger rotation alert at 60-day mark for all routes' },
  { id: 'LL-004', finding: 'Cash found outside cassette', site: 'ATM-HYD-0044', date: '06-Apr-26', kind: 'task-completed', outcome: 'Cash recovered, custodian under HR investigation' },
  { id: 'LL-005', finding: 'Counter sync drift > ₹10K', site: 'ATM-BLR-0088', date: '03-Apr-26', kind: 'rule-codified', outcome: 'Same-day reconciliation now mandatory above ₹10K drift' },
];

// ───────────────────────── KPI sparkline data (30 days) ─────────────────────────
const KPI_SPARK = {
  hitRate: generateSpark(auditPulse.auditHitRate, 30, 0.08),
  shortage: generateSpark(auditPulse.totalShortageDiscovered, 30, 0.12),
  coverage: generateSpark(auditPulse.riskCoverage, 30, 0.06),
  compliance: generateSpark(auditPulse.auditorComplianceScore, 30, 0.04),
};

// ───────────────────────── Main component ─────────────────────────
type View = 'planner' | 'live' | 'sop' | 'learning';

const CMSAuditCommand: React.FC = () => {
  const [view, setView] = useState<View>('planner');
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | RiskLevel>('all');
  const [detailTarget, setDetailTarget] = useState<AuditTarget | null>(null);
  const [selectedAudit, setSelectedAudit] = useState<LiveAuditEntry | null>(null);
  const [activeHub, setActiveHub] = useState<ControlHub>('rotation');
  const [alertsOpen, setAlertsOpen] = useState(false);

  const filteredTargets = useMemo(() => {
    return riskTargets.filter(t => {
      const lvl = toRiskLevel(t);
      if (riskFilter !== 'all' && lvl !== riskFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!t.name.toLowerCase().includes(q) && !t.location.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search, riskFilter]);

  const liveCount = liveAuditFeed.filter(a => a.status === 'flagged' || a.status === 'in-progress').length;
  const sopCounts = useMemo(() => {
    const c: Record<ControlHub, number> = { rotation: 0, handover: 0, 'two-person': 0, security: 0 };
    sopViolations.forEach(v => c[v.hub]++);
    return c;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* ── Dark Sidebar ── */}
      <aside className="w-56 bg-slate-900 text-slate-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <div>
              <div className="font-bold text-sm">Audit Command</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">CMS Guardian</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {[
            { k: 'planner', label: 'Audit Planner', icon: <ShieldAlert className="w-4 h-4" />, badge: filteredTargets.filter(t => toRiskLevel(t) === 'CRITICAL').length },
            { k: 'live', label: 'Live Forensic Feed', icon: <Radio className="w-4 h-4" />, badge: liveCount },
            { k: 'sop', label: 'SOP Enforcement', icon: <Lock className="w-4 h-4" />, badge: sopViolations.length },
            { k: 'learning', label: 'Learning Loop', icon: <BookOpen className="w-4 h-4" />, badge: 0 },
          ].map(item => (
            <button
              key={item.k}
              onClick={() => setView(item.k as View)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                view === item.k ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  view === item.k ? 'bg-amber-400 text-slate-900' : 'bg-slate-700 text-slate-300'
                }`}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-emerald-400" /> System healthy · 70,000 ATMs monitored</div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-slate-900">Audit Command Center</h1>
            <p className="text-xs text-slate-500">Real-time forensic hub · 70,000 ATMs · 3,000 routes</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-600 hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />Last 30 days
            </div>
            <button
              onClick={() => setAlertsOpen(!alertsOpen)}
              className="relative p-2 rounded-md border border-slate-200 hover:bg-slate-50"
            >
              <Bell className="w-4 h-4 text-slate-700" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
          </div>
        </header>

        {/* Executive Pulse */}
        <section className="px-6 pt-5 pb-4 bg-white border-b border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiTile
            label="Audit Hit Rate"
            value={`${auditPulse.auditHitRate}%`}
            sub="Audits that found a discrepancy"
            trend={auditPulse.auditHitRateTrend}
            spark={KPI_SPARK.hitRate}
            sparkColor="hsl(217,91%,60%)"
          />
          <KpiTile
            label="Shortage Found"
            value={formatINR(auditPulse.totalShortageDiscovered)}
            sub="Total cash leakage caught"
            trend={auditPulse.shortageTrend}
            spark={KPI_SPARK.shortage}
            sparkColor="hsl(0,84%,60%)"
            invertTrend
          />
          <KpiTile
            label="High-Risk Coverage"
            value={`${auditPulse.riskCoverage}%`}
            sub="Critical sites audited in 30 days"
            trend={auditPulse.riskCoverageTrend}
            spark={KPI_SPARK.coverage}
            sparkColor="hsl(38,92%,50%)"
          />
          <KpiTile
            label="Field Compliance"
            value={`${auditPulse.auditorComplianceScore}%`}
            sub="Geo-tag · Photo · Video quality"
            trend={auditPulse.complianceTrend}
            spark={KPI_SPARK.compliance}
            sparkColor="hsl(160,84%,39%)"
          />
        </section>

        {/* View body */}
        <div className="flex-1 overflow-auto">
          {view === 'planner' && (
            <PlannerView
              targets={filteredTargets}
              search={search}
              setSearch={setSearch}
              riskFilter={riskFilter}
              setRiskFilter={setRiskFilter}
              onRowDoubleClick={setDetailTarget}
            />
          )}
          {view === 'live' && (
            <LiveFeedView feed={liveAuditFeed} onSelect={setSelectedAudit} selected={selectedAudit} />
          )}
          {view === 'sop' && (
            <SOPView activeHub={activeHub} setActiveHub={setActiveHub} counts={sopCounts} />
          )}
          {view === 'learning' && <LearningView />}
        </div>
      </main>

      {/* Modals */}
      {detailTarget && <RiskDetailModal target={detailTarget} onClose={() => setDetailTarget(null)} />}
      {selectedAudit && <LiveAuditModal audit={selectedAudit} onClose={() => setSelectedAudit(null)} />}
      {alertsOpen && <AlertsDrawer onClose={() => setAlertsOpen(false)} />}
    </div>
  );
};

// ───────────────────────── KPI tile ─────────────────────────
const KpiTile: React.FC<{
  label: string; value: string; sub: string; trend: number;
  spark: number[]; sparkColor: string; invertTrend?: boolean;
}> = ({ label, value, sub, trend, spark, sparkColor, invertTrend }) => {
  const positive = invertTrend ? trend < 0 : trend > 0;
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">{label}</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{sub}</div>
        </div>
        <div className={`flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded ${
          positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
        }`}>
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div className="mt-2"><Sparkline data={spark} color={sparkColor} w={220} h={32} /></div>
    </div>
  );
};

// ───────────────────────── Planner view ─────────────────────────
const PlannerView: React.FC<{
  targets: AuditTarget[]; search: string; setSearch: (s: string) => void;
  riskFilter: 'all' | RiskLevel; setRiskFilter: (r: 'all' | RiskLevel) => void;
  onRowDoubleClick: (t: AuditTarget) => void;
}> = ({ targets, search, setSearch, riskFilter, setRiskFilter, onRowDoubleClick }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Audit Planner</h2>
          <p className="text-xs text-slate-500 mt-0.5">Sites prioritised by risk · Double-click any row for full risk breakdown</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search ATM ID or location"
              className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
          <div className="flex items-center bg-slate-100 rounded-md p-0.5">
            {(['all', 'CRITICAL', 'HIGH', 'MODERATE', 'INFO'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRiskFilter(r)}
                className={`text-[11px] px-2.5 py-1 rounded font-medium ${
                  riskFilter === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >{r === 'all' ? 'All' : r}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-600 border-b border-slate-200">
            <tr>
              <th className="text-left font-semibold px-4 py-2.5">Terminal ID</th>
              <th className="text-left font-semibold px-4 py-2.5">Location Type</th>
              <th className="text-left font-semibold px-4 py-2.5">Risk Level</th>
              <th className="text-right font-semibold px-4 py-2.5">Days Since Last Audit</th>
              <th className="text-right font-semibold px-4 py-2.5">Days Left in Cycle</th>
              <th className="text-right font-semibold px-4 py-2.5">Total Shortage History</th>
              <th className="text-left font-semibold px-4 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {targets.map(t => {
              const lvl = toRiskLevel(t);
              const daysLeft = t.auditCycleTarget - t.daysSinceAudit;
              const overdue = daysLeft <= 0;
              return (
                <tr
                  key={t.id}
                  onDoubleClick={() => onRowDoubleClick(t)}
                  className="border-b border-slate-100 hover:bg-blue-50/40 cursor-pointer transition-colors"
                  title="Double-click for risk breakdown"
                >
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold text-slate-900">{t.name}</td>
                  <td className="px-4 py-2.5 text-slate-700">{t.sitePersona}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${riskBadgeClass(lvl)}`}>{lvl}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-slate-700">{t.daysSinceAudit}</td>
                  <td className={`px-4 py-2.5 text-right tabular-nums font-semibold ${
                    overdue ? 'text-red-600 animate-pulse' : daysLeft <= 5 ? 'text-orange-600' : 'text-slate-700'
                  }`}>
                    {overdue ? `${Math.abs(daysLeft)}d OVERDUE` : `${daysLeft} days`}
                    <div className="text-[10px] font-normal text-slate-400">{t.auditCycleTarget}-Day Cycle</div>
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {t.totalShortage > 0 ? <span className="text-red-700 font-semibold">{formatINR(t.totalShortage)}</span> : <span className="text-slate-400">—</span>}
                  </td>
                  <td className="px-4 py-2.5">
                    {overdue ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-red-700 font-medium"><AlertTriangle className="w-3 h-3" />Action Required</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-600"><Clock className="w-3 h-3" />Scheduled</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {targets.length === 0 && (
              <tr><td colSpan={7} className="text-center py-8 text-sm text-slate-400">No sites match the current filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1.5">
        <Eye className="w-3 h-3" />Tip: Double-click any row to see exactly why this ATM is flagged.
      </p>
    </div>
  );
};

// ───────────────────────── Risk Detail Modal (double-click) ─────────────────────────
const RiskDetailModal: React.FC<{ target: AuditTarget; onClose: () => void }> = ({ target, onClose }) => {
  const lvl = toRiskLevel(target);
  const reasons = buildRiskReasons(target);
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${riskBadgeClass(lvl)}`}>{lvl}</span>
              <h3 className="text-base font-bold text-slate-900">Risk Factor Analysis</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{target.name} · {target.location}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100"><X className="w-4 h-4 text-slate-500" /></button>
        </div>

        <div className="p-5">
          <p className="text-sm text-slate-700 mb-3">
            This ATM is <span className="font-semibold">{lvl}</span> because of the following active issues:
          </p>
          <ul className="space-y-2">
            {reasons.map((r, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded border border-slate-200 bg-slate-50">
                <div className={`mt-0.5 w-1.5 h-1.5 rounded-full ${
                  r.severity === 'critical' ? 'bg-red-600' : r.severity === 'high' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">{r.label}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{r.count}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded border border-slate-200">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Audit Cycle</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{target.auditCycleTarget}-Day</div>
            </div>
            <div className="p-3 rounded border border-slate-200">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Days Since Audit</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{target.daysSinceAudit}</div>
            </div>
            <div className="p-3 rounded border border-slate-200">
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Site Type</div>
              <div className="text-xs font-semibold text-slate-900 mt-0.5">{target.sitePersona}</div>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex justify-end gap-2 rounded-b-lg">
          <button onClick={onClose} className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-100">Close</button>
          <button className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-500 rounded hover:bg-amber-600 inline-flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5" />Schedule Audit Now
          </button>
        </div>
      </div>
    </div>
  );
};

// ───────────────────────── Live Feed view ─────────────────────────
const LiveFeedView: React.FC<{
  feed: LiveAuditEntry[]; onSelect: (a: LiveAuditEntry) => void; selected: LiveAuditEntry | null;
}> = ({ feed, onSelect }) => {
  return (
    <div className="p-6 space-y-3">
      <div>
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Radio className="w-4 h-4 text-red-500 animate-pulse" />Live Forensic Feed
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Field audits streaming in real time. Click any audit to verify the physical count against bank and machine records.</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-600 border-b border-slate-200">
            <tr>
              <th className="text-left font-semibold px-4 py-2.5">Status</th>
              <th className="text-left font-semibold px-4 py-2.5">Auditor</th>
              <th className="text-left font-semibold px-4 py-2.5">ATM</th>
              <th className="text-right font-semibold px-4 py-2.5">Mismatch</th>
              <th className="text-left font-semibold px-4 py-2.5">Field Compliance</th>
              <th className="text-left font-semibold px-4 py-2.5">Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {feed.map(a => {
              const live = a.status === 'in-progress' || a.status === 'flagged';
              return (
                <tr key={a.id} className="border-b border-slate-100 hover:bg-blue-50/40 cursor-pointer" onClick={() => onSelect(a)}>
                  <td className="px-4 py-2.5">
                    {live ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />LIVE
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">CLOSED</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-slate-800">{a.auditorName}</td>
                  <td className="px-4 py-2.5">
                    <div className="font-mono text-xs font-semibold text-slate-900">{a.atmId}</div>
                    <div className="text-[11px] text-slate-500">{a.location}</div>
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {a.diffAmount > 0 ? <span className="text-red-700 font-bold">{formatINR(a.diffAmount)}</span> : <span className="text-emerald-600">Matched</span>}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <ComplianceDot ok={a.geoTagged} label="Geo" />
                      <ComplianceDot ok={a.photoEvidence.every(p => p.verified)} label="Photo" />
                      <ComplianceDot ok={a.otcStatus === 'active'} label="Video" />
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-600">{new Date(a.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-4 py-2.5"><ChevronRight className="w-4 h-4 text-slate-400" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ComplianceDot: React.FC<{ ok: boolean; label: string }> = ({ ok, label }) => (
  <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded ${
    ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
  }`}>
    {ok ? <CheckCircle2 className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
    {label}
  </span>
);

// ───────────────────────── Live Audit Modal (3-way + video) ─────────────────────────
const LiveAuditModal: React.FC<{ audit: LiveAuditEntry; onClose: () => void }> = ({ audit, onClose }) => {
  const bank = audit.switchCounter;
  const machine = audit.machineCounter;
  const physical = audit.physicalCount;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />LIVE
              </span>
              <h3 className="text-base font-bold text-slate-900">Field Audit · {audit.atmId}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">Auditor: {audit.auditorName} · {audit.location}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100"><X className="w-4 h-4 text-slate-500" /></button>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Three-way triangulation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Three-Way Triangulation</h4>
            <div className="space-y-2">
              <CounterRow label="Bank Record" value={bank} tone="neutral" />
              <CounterRow label="Machine Record" value={machine} tone="neutral" />
              <CounterRow label="Auditor's Physical Count" value={physical} tone={physical === bank ? 'good' : 'bad'} />
            </div>
            {audit.diffAmount > 0 && (
              <div className="mt-3 p-3 rounded border border-red-200 bg-red-50">
                <div className="text-[11px] uppercase tracking-wider font-bold text-red-700">Cash Mismatch</div>
                <div className="text-2xl font-bold text-red-700">{formatINR(audit.diffAmount)}</div>
                <div className="text-xs text-red-600 mt-0.5">Physical count is short of bank record</div>
              </div>
            )}
          </div>

          {/* Video evidence */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Video Evidence</h4>
            <div className="aspect-video rounded border border-slate-200 bg-slate-900 flex items-center justify-center relative">
              <Video className="w-10 h-10 text-slate-500" />
              <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white">
                <span className="w-1 h-1 bg-white rounded-full animate-pulse" />REC
              </span>
              <span className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">{new Date(audit.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {audit.photoEvidence.map((p, i) => (
                <div key={i} className="aspect-square rounded border border-slate-200 bg-slate-100 flex flex-col items-center justify-center text-center p-1">
                  <Camera className="w-4 h-4 text-slate-500" />
                  <div className="text-[9px] text-slate-600 mt-1 leading-tight">{p.type}</div>
                  {p.verified ? <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5" /> : <XCircle className="w-3 h-3 text-red-500 mt-0.5" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex justify-between items-center rounded-b-lg">
          <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            {audit.geoTagged ? `Geo-tagged · ${audit.geoDistance}m from ATM` : 'Geo-tag failed'}
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-100">Close</button>
            <button className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-700 inline-flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" />Escalate to Supervisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CounterRow: React.FC<{ label: string; value: number; tone: 'good' | 'bad' | 'neutral' }> = ({ label, value, tone }) => (
  <div className={`flex items-center justify-between p-3 rounded border ${
    tone === 'good' ? 'border-emerald-200 bg-emerald-50' :
    tone === 'bad' ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white'
  }`}>
    <span className="text-xs font-medium text-slate-700">{label}</span>
    <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">{value.toLocaleString('en-IN')}</span>
  </div>
);

// ───────────────────────── SOP Enforcement view ─────────────────────────
const SOPView: React.FC<{ activeHub: ControlHub; setActiveHub: (h: ControlHub) => void; counts: Record<ControlHub, number> }> = ({ activeHub, setActiveHub, counts }) => {
  const hubViolations = sopViolations.filter(v => v.hub === activeHub);
  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-900">SOP Enforcement</h2>
        <p className="text-xs text-slate-500 mt-0.5">Monitor non-negotiable rules. Every violation can be escalated or issued an SOP breach notice.</p>
      </div>

      {/* Hub tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {(['rotation', 'handover', 'two-person', 'security'] as ControlHub[]).map(hub => {
          const meta = HUB_META[hub];
          const active = activeHub === hub;
          return (
            <button
              key={hub}
              onClick={() => setActiveHub(hub)}
              className={`text-left p-4 rounded-lg border transition-colors ${
                active ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-1.5 rounded ${active ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                  {meta.icon}
                </div>
                <span className="text-2xl font-bold text-slate-900">{counts[hub]}</span>
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-900">{meta.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{meta.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Violations list */}
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {HUB_META[activeHub].icon}
            <span className="text-sm font-bold text-slate-900">{HUB_META[activeHub].label}</span>
            <span className="text-xs text-slate-500">· {hubViolations.length} active</span>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {hubViolations.map(v => (
            <div key={v.id} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  v.severity === 'CRITICAL' ? 'bg-red-600 text-white' :
                  v.severity === 'HIGH' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                }`}>{v.severity}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-900">{v.title}</div>
                  <div className="text-xs text-slate-700 mt-0.5">{v.subject} · Route {v.route}</div>
                  <div className="text-xs text-slate-600 mt-1">{v.detail}</div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <button className="px-2.5 py-1 text-[11px] font-semibold text-white bg-red-600 rounded hover:bg-red-700 inline-flex items-center gap-1">
                  <Send className="w-3 h-3" />Escalate to Supervisor
                </button>
                <button className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-100 inline-flex items-center gap-1">
                  <FileText className="w-3 h-3" />Issue SOP Breach Notice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ───────────────────────── Learning Loop view ─────────────────────────
const LearningView: React.FC = () => {
  const completed = learningEntries.filter(e => e.kind === 'task-completed');
  const codified = learningEntries.filter(e => e.kind === 'rule-codified');
  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />Learning Loop
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Track every finding through to closure: was the issue fixed in the field, or was the root cause turned into a permanent system rule?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ClosureSection
          title="Task Completed"
          subtitle="Fixed in the field"
          icon={<CheckCheck className="w-4 h-4 text-emerald-600" />}
          tone="emerald"
          entries={completed}
        />
        <ClosureSection
          title="Rule Codified"
          subtitle="Root cause turned into an automated system alert"
          icon={<BookOpen className="w-4 h-4 text-blue-600" />}
          tone="blue"
          entries={codified}
        />
      </div>
    </div>
  );
};

const ClosureSection: React.FC<{
  title: string; subtitle: string; icon: React.ReactNode; tone: 'emerald' | 'blue';
  entries: typeof learningEntries;
}> = ({ title, subtitle, icon, tone, entries }) => (
  <div className="rounded-lg border border-slate-200 bg-white">
    <div className={`px-4 py-3 border-b border-slate-200 ${tone === 'emerald' ? 'bg-emerald-50' : 'bg-blue-50'}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-bold text-slate-900">{title}</span>
        <span className="text-xs text-slate-500">· {entries.length}</span>
      </div>
      <div className="text-[11px] text-slate-600 mt-0.5">{subtitle}</div>
    </div>
    <div className="divide-y divide-slate-100">
      {entries.map(e => (
        <div key={e.id} className="p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">{e.finding}</div>
            <span className="text-[10px] text-slate-500">{e.date}</span>
          </div>
          <div className="text-xs text-slate-600 mt-0.5">{e.site}</div>
          <div className="text-xs text-slate-700 mt-1.5 italic">→ {e.outcome}</div>
        </div>
      ))}
    </div>
  </div>
);

// ───────────────────────── Alerts drawer ─────────────────────────
const AlertsDrawer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const items = [
    { sev: 'CRITICAL' as const, msg: '₹25,000 shortage at ATM-BLR-0055 — needs supervisor sign-off', time: '2 min ago' },
    { sev: 'HIGH' as const, msg: 'Geo-tag failed at ATM-BLR-0055 (auditor 350m away)', time: '5 min ago' },
    { sev: 'CRITICAL' as const, msg: 'Cash found outside cassette at ATM-HYD-0044', time: '1 hour ago' },
  ];
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-end" onClick={onClose}>
      <div className="w-96 bg-white h-full overflow-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Recent Alerts</h3>
          <button onClick={onClose}><X className="w-4 h-4 text-slate-500" /></button>
        </div>
        <div className="divide-y divide-slate-100">
          {items.map((it, i) => (
            <div key={i} className="p-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${it.sev === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'}`}>{it.sev}</span>
                <span className="text-[10px] text-slate-500">{it.time}</span>
              </div>
              <div className="text-sm text-slate-800 mt-1">{it.msg}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CMSAuditCommand;
