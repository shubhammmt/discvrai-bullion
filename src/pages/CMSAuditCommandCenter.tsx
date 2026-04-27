import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle, Shield, Mail, MessageSquare, Cpu, Clock, Activity,
  Lock, Power, UserX, Radio, Fingerprint, Users, Timer, Crosshair,
  CheckCircle2, Circle, Loader2, Gauge, Flame, MapPin, X
} from 'lucide-react';

/* ---------------- Types ---------------- */
type RiskTier = 'theft' | 'overage' | 'cashout' | 'safe';
type AlertSource = 'mail' | 'wa' | 'sensor';
type AlertStatus = 'unresolved' | 'in-progress' | 'resolved';
type AlertOrigin = 'audit' | 'system';

interface ATM {
  id: string;
  city: string;
  x: number; // % within map
  y: number; // % within map
  risk: RiskTier;
  reason: string;
}

interface AlertRow {
  id: string;
  atmId: string;
  riskTerm: RiskTier;
  source: AlertSource;
  origin: AlertOrigin;
  createdAt: number; // epoch ms
  status: AlertStatus;
  summary: string;
}

interface Breach {
  id: string;
  type: 'day91' | 'hoto' | 'dual-custody' | 'manual-mode' | 'hrc';
  atmId: string;
  label: string;
  detail: string;
  expiresAt?: number; // for countdowns
}

/* ---------------- Mock Data ---------------- */
const ATMS: ATM[] = [
  { id: 'ATM-DLH-014', city: 'Delhi · CP',        x: 38, y: 28, risk: 'theft',   reason: 'Day 91 Route Breach' },
  { id: 'ATM-MUM-221', city: 'Mumbai · Andheri',  x: 22, y: 62, risk: 'overage', reason: '3 customer claims · jam' },
  { id: 'ATM-BLR-088', city: 'Bengaluru · MG Rd', x: 48, y: 78, risk: 'cashout', reason: 'Velocity surge +312%' },
  { id: 'ATM-HYD-103', city: 'Hyderabad',         x: 52, y: 65, risk: 'theft',   reason: 'HRC login attempt' },
  { id: 'ATM-CHN-045', city: 'Chennai',           x: 58, y: 82, risk: 'overage', reason: 'Physical jam reported' },
  { id: 'ATM-KOL-077', city: 'Kolkata',           x: 78, y: 42, risk: 'cashout', reason: 'Cash-out in 2h projected' },
  { id: 'ATM-PUN-019', city: 'Pune',              x: 30, y: 60, risk: 'safe',    reason: 'Normal operation' },
  { id: 'ATM-AHM-052', city: 'Ahmedabad',         x: 18, y: 40, risk: 'safe',    reason: 'Normal operation' },
  { id: 'ATM-JAI-006', city: 'Jaipur',            x: 28, y: 35, risk: 'safe',    reason: 'Normal operation' },
  { id: 'ATM-LKO-031', city: 'Lucknow',           x: 55, y: 30, risk: 'safe',    reason: 'Normal operation' },
  { id: 'ATM-BHO-024', city: 'Bhopal',            x: 42, y: 48, risk: 'safe',    reason: 'Normal operation' },
  { id: 'ATM-GHY-011', city: 'Guwahati',          x: 86, y: 30, risk: 'safe',    reason: 'Normal operation' },
];

const NOW = Date.now();
const ALERTS_SEED: AlertRow[] = [
  { id: 'ALT-9241', atmId: 'ATM-DLH-014', riskTerm: 'theft',   source: 'sensor', origin: 'system', createdAt: NOW - 1000*60*60*31, status: 'unresolved',  summary: 'Route stagnant 91 days · theft window open' },
  { id: 'ALT-9242', atmId: 'ATM-HYD-103', riskTerm: 'theft',   source: 'mail',   origin: 'audit',  createdAt: NOW - 1000*60*60*49, status: 'unresolved',  summary: 'HRC custodian logged in at 02:14 IST' },
  { id: 'ALT-9243', atmId: 'ATM-MUM-221', riskTerm: 'overage', source: 'wa',     origin: 'system', createdAt: NOW - 1000*60*60*5,  status: 'in-progress', summary: '3rd customer claim · short dispense ₹2,000' },
  { id: 'ALT-9244', atmId: 'ATM-BLR-088', riskTerm: 'cashout', source: 'sensor', origin: 'system', createdAt: NOW - 1000*60*42,    status: 'unresolved',  summary: 'Tx velocity +312% · projected dry in 2h' },
  { id: 'ALT-9245', atmId: 'ATM-CHN-045', riskTerm: 'overage', source: 'wa',     origin: 'audit',  createdAt: NOW - 1000*60*60*12, status: 'in-progress', summary: 'Cassette jam · manual mode active' },
  { id: 'ALT-9246', atmId: 'ATM-KOL-077', riskTerm: 'cashout', source: 'mail',   origin: 'system', createdAt: NOW - 1000*60*18,    status: 'unresolved',  summary: 'Withdrawal pattern anomaly detected' },
  { id: 'ALT-9247', atmId: 'ATM-DLH-014', riskTerm: 'theft',   source: 'mail',   origin: 'audit',  createdAt: NOW - 1000*60*60*56, status: 'unresolved',  summary: 'Audit flag: route reshuffle SLA missed' },
];

const BREACHES_SEED: Breach[] = [
  { id: 'BR-01', type: 'day91',        atmId: 'ATM-DLH-014', label: 'Day 91 Route Breach',  detail: 'Route reshuffle overdue', expiresAt: NOW + 1000*60*60*4 },
  { id: 'BR-02', type: 'hoto',         atmId: 'ATM-MUM-221', label: 'HOTO Failure',         detail: 'Biometric skip at handover' },
  { id: 'BR-03', type: 'dual-custody', atmId: 'ATM-BLR-088', label: 'Dual-Custody Anomaly', detail: 'SBMF sync failure · 1 of 2 keys' },
  { id: 'BR-04', type: 'manual-mode',  atmId: 'ATM-CHN-045', label: 'Manual Mode Timer',    detail: '24h enforcement window', expiresAt: NOW + 1000*60*60*9 + 1000*60*42 },
  { id: 'BR-05', type: 'hrc',          atmId: 'ATM-HYD-103', label: 'HRC Login Attempt',    detail: 'High-Risk Custodian flagged' },
];

/* ---------------- Drill-down data ---------------- */
interface CustodianRow {
  custodianId: string;
  name: string;
  atmId: string;
  city: string;
  violation: string;
  lastAction: string;
  severity: 'High' | 'Medium' | 'Critical';
}

const BREACH_DRILLDOWN: Record<Breach['type'], { title: string; subtitle: string; columns: string[]; rows: CustodianRow[] }> = {
  'day91': {
    title: 'Day 91 Route Breach — SOP Violators',
    subtitle: 'Custodians whose route reshuffle is overdue beyond the 90-day SOP window',
    columns: ['Custodian', 'ATM', 'City', 'Days on Route', 'Last Reshuffle', 'Severity'],
    rows: [
      { custodianId: 'CUS-4471', name: 'R. Mehta',     atmId: 'ATM-DLH-014', city: 'Delhi · CP',       violation: '93 days', lastAction: '2024-01-25', severity: 'Critical' },
      { custodianId: 'CUS-4488', name: 'S. Khanna',    atmId: 'ATM-DLH-014', city: 'Delhi · CP',       violation: '93 days', lastAction: '2024-01-25', severity: 'Critical' },
      { custodianId: 'CUS-5012', name: 'A. Bhatia',    atmId: 'ATM-LKO-031', city: 'Lucknow',          violation: '91 days', lastAction: '2024-01-27', severity: 'High' },
      { custodianId: 'CUS-5103', name: 'V. Iyer',      atmId: 'ATM-JAI-006', city: 'Jaipur',           violation: '92 days', lastAction: '2024-01-26', severity: 'High' },
    ],
  },
  'hoto': {
    title: 'HOTO Failure — Handover/Takeover SOP Skips',
    subtitle: 'Custodians who skipped biometric or QR verification at handover',
    columns: ['Custodian', 'ATM', 'City', 'Skip Type', 'Timestamp', 'Severity'],
    rows: [
      { custodianId: 'CUS-3321', name: 'P. Naidu',     atmId: 'ATM-MUM-221', city: 'Mumbai · Andheri', violation: 'Biometric skipped', lastAction: 'Today 09:14', severity: 'Critical' },
      { custodianId: 'CUS-3322', name: 'D. Shah',      atmId: 'ATM-MUM-221', city: 'Mumbai · Andheri', violation: 'QR not scanned',    lastAction: 'Today 09:15', severity: 'High' },
      { custodianId: 'CUS-3340', name: 'T. Reddy',     atmId: 'ATM-CHN-045', city: 'Chennai',          violation: 'Biometric skipped', lastAction: 'Today 11:02', severity: 'High' },
    ],
  },
  'dual-custody': {
    title: 'Dual-Custody Anomaly — Single-Person Sync Events',
    subtitle: 'ATMs where only one of two keys / OTC was entered during sync',
    columns: ['Custodian', 'ATM', 'City', 'Anomaly', 'Detected', 'Severity'],
    rows: [
      { custodianId: 'CUS-2210', name: 'M. Pillai',    atmId: 'ATM-BLR-088', city: 'Bengaluru · MG Rd', violation: 'Only Key-A entered · Key-B missing', lastAction: 'Today 07:48', severity: 'Critical' },
      { custodianId: 'CUS-2233', name: 'L. Goswami',   atmId: 'ATM-BLR-088', city: 'Bengaluru · MG Rd', violation: 'OTC password absent',                lastAction: 'Today 07:48', severity: 'Critical' },
      { custodianId: 'CUS-2298', name: 'N. Chatterjee',atmId: 'ATM-KOL-077', city: 'Kolkata',           violation: 'Single custodian sync',              lastAction: 'Today 06:22', severity: 'High' },
    ],
  },
  'manual-mode': {
    title: 'Manual Mode — Active 24h Enforcement Windows',
    subtitle: 'ATMs operating in manual override beyond approved limits',
    columns: ['Custodian', 'ATM', 'City', 'Override Reason', 'Started', 'Severity'],
    rows: [
      { custodianId: 'CUS-6601', name: 'K. Sharma',    atmId: 'ATM-CHN-045', city: 'Chennai',          violation: 'Cassette jam · manual dispense', lastAction: 'Yesterday 18:05', severity: 'High' },
      { custodianId: 'CUS-6644', name: 'J. Verma',     atmId: 'ATM-MUM-221', city: 'Mumbai · Andheri', violation: 'Sensor bypass',                  lastAction: 'Today 04:30',     severity: 'Medium' },
    ],
  },
  'hrc': {
    title: 'HRC Login — High-Risk Custodian Access Attempts',
    subtitle: 'Flagged custodians attempting access outside approved windows',
    columns: ['Custodian', 'ATM', 'City', 'Flag Reason', 'Attempted At', 'Severity'],
    rows: [
      { custodianId: 'CUS-9911', name: 'B. Pawar',     atmId: 'ATM-HYD-103', city: 'Hyderabad',        violation: 'Off-hours · prior incident on file', lastAction: 'Today 02:14', severity: 'Critical' },
      { custodianId: 'CUS-9920', name: 'G. Rao',       atmId: 'ATM-HYD-103', city: 'Hyderabad',        violation: 'On HRC watchlist',                   lastAction: 'Today 02:18', severity: 'Critical' },
    ],
  },
};

interface ATMForensics {
  machineCounter: { dispensed: number; presented: number; retracted: number };
  systemBalance: { expected: number; actual: number; variance: number };
  overages: { count: number; totalAmount: number; openClaims: number };
  signals: string[];
}

const ATM_FORENSICS: Record<string, ATMForensics> = {
  'ATM-DLH-014': {
    machineCounter: { dispensed: 14820000, presented: 14820000, retracted: 12000 },
    systemBalance:  { expected: 5180000, actual: 5168000, variance: -12000 },
    overages:       { count: 0, totalAmount: 0, openClaims: 0 },
    signals: ['Day 91 route stagnation', 'Same custodian pair last 3 visits', 'Audit SLA missed', 'Off-hours sensor pings ×4 in 7 days'],
  },
  'ATM-HYD-103': {
    machineCounter: { dispensed: 9240000, presented: 9240000, retracted: 0 },
    systemBalance:  { expected: 3760000, actual: 3760000, variance: 0 },
    overages:       { count: 1, totalAmount: 5000, openClaims: 0 },
    signals: ['HRC custodian login at 02:14 IST', 'Off-window access', 'Prior incident on file'],
  },
  'ATM-MUM-221': {
    machineCounter: { dispensed: 6810000, presented: 6788000, retracted: 22000 },
    systemBalance:  { expected: 2190000, actual: 2188000, variance: -2000 },
    overages:       { count: 3, totalAmount: 6500, openClaims: 2 },
    signals: ['3 customer claims in 24h', 'Cassette jam reported', 'Manual mode invoked'],
  },
  'ATM-BLR-088': {
    machineCounter: { dispensed: 8910000, presented: 8910000, retracted: 0 },
    systemBalance:  { expected: 1840000, actual: 1840000, variance: 0 },
    overages:       { count: 0, totalAmount: 0, openClaims: 0 },
    signals: ['Tx velocity +312% vs 7d baseline', 'Projected dry in ~2h', 'Single custodian sync event'],
  },
  'ATM-CHN-045': {
    machineCounter: { dispensed: 5420000, presented: 5398000, retracted: 22000 },
    systemBalance:  { expected: 1620000, actual: 1618500, variance: -1500 },
    overages:       { count: 2, totalAmount: 4000, openClaims: 1 },
    signals: ['Manual mode active', 'Cassette jam', 'Sensor bypass attempt'],
  },
  'ATM-KOL-077': {
    machineCounter: { dispensed: 7230000, presented: 7230000, retracted: 0 },
    systemBalance:  { expected: 2010000, actual: 2010000, variance: 0 },
    overages:       { count: 0, totalAmount: 0, openClaims: 0 },
    signals: ['Withdrawal pattern anomaly', 'Single custodian sync flag'],
  },
};

const DEFAULT_FORENSICS: ATMForensics = {
  machineCounter: { dispensed: 0, presented: 0, retracted: 0 },
  systemBalance:  { expected: 0, actual: 0, variance: 0 },
  overages:       { count: 0, totalAmount: 0, openClaims: 0 },
  signals: ['No anomalies detected · normal operation'],
};

type DrillState =
  | { kind: 'breach'; breach: Breach }
  | { kind: 'atm'; atmId: string }
  | null;

/* ---------------- Helpers ---------------- */
const RISK_META: Record<RiskTier, { label: string; dot: string; ring: string; text: string; chip: string }> = {
  theft:   { label: 'Theft',    dot: 'bg-rose-500',    ring: 'ring-rose-500/40',    text: 'text-rose-300',    chip: 'bg-rose-500/15 text-rose-300 border-rose-500/30' },
  overage: { label: 'Overage',  dot: 'bg-amber-500',   ring: 'ring-amber-500/40',   text: 'text-amber-300',   chip: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  cashout: { label: 'Cash-out', dot: 'bg-violet-500',  ring: 'ring-violet-500/40',  text: 'text-violet-300',  chip: 'bg-violet-500/15 text-violet-300 border-violet-500/30' },
  safe:    { label: 'Safe',     dot: 'bg-sky-500',     ring: 'ring-sky-500/30',     text: 'text-sky-300',     chip: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
};

const SOURCE_META: Record<AlertSource, { icon: any; label: string }> = {
  mail:   { icon: Mail,         label: 'Mail' },
  wa:     { icon: MessageSquare,label: 'WhatsApp' },
  sensor: { icon: Cpu,          label: 'Sensor' },
};

const fmtAge = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h >= 24) return `${Math.floor(h/24)}d ${h%24}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
};

const fmtCountdown = (ms: number) => {
  if (ms <= 0) return 'EXPIRED';
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
};

/* ---------------- Component ---------------- */
const CMSAuditCommandCenter: React.FC = () => {
  const [now, setNow] = useState(Date.now());
  const [alerts, setAlerts] = useState<AlertRow[]>(ALERTS_SEED);
  const [selectedAtm, setSelectedAtm] = useState<string | null>(null);
  const [hoverAtm, setHoverAtm] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [drill, setDrill] = useState<DrillState>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const stats = useMemo(() => {
    const total = alerts.length;
    const resolved = alerts.filter(a => a.status === 'resolved').length;
    const stagnant = alerts.filter(a => a.status !== 'resolved' && now - a.createdAt > 1000*60*60*48).length;
    const overdue  = alerts.filter(a => a.status !== 'resolved' && now - a.createdAt > 1000*60*60*24).length;
    return {
      resolutionRate: total ? Math.round((resolved / total) * 100) : 0,
      stagnant,
      overdue,
      open: alerts.filter(a => a.status === 'unresolved').length,
    };
  }, [alerts, now]);

  const updateStatus = (id: string, status: AlertStatus) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    setToast(`Alert ${id} → ${status.toUpperCase()}`);
  };

  const fireAction = (label: string) => setToast(`${label} dispatched`);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0f1c]/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-rose-500 to-violet-600 grid place-items-center shadow-lg shadow-rose-500/20">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">ATM Command Center</h1>
              <p className="text-[10px] text-slate-400">5-Gap Protocol · Single Pane of Glass · Mitigates ₹40 Cr Risk Domain</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400"><Activity className="h-3 w-3 animate-pulse" /> LIVE</span>
            <span className="text-slate-500">{new Date(now).toLocaleTimeString()}</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-4 grid grid-cols-12 gap-4">
        {/* TOP-LEFT: Map */}
        <section className="col-span-12 lg:col-span-8 bg-[#0c1322] border border-white/5 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crosshair className="h-4 w-4 text-rose-400" />
              <h2 className="text-sm font-semibold">Tactical Geospatial Map</h2>
              <span className="text-[10px] text-slate-500">· {ATMS.length} ATMs monitored</span>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              {(['theft','overage','cashout','safe'] as RiskTier[]).map(r => (
                <div key={r} className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${RISK_META[r].dot}`} />
                  <span className="text-slate-400">{RISK_META[r].label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[460px] bg-[radial-gradient(circle_at_50%_50%,#0f1a30_0%,#070b14_70%)]">
            {/* grid */}
            <div className="absolute inset-0 opacity-30"
                 style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.08) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
            {/* faint india outline shape */}
            <div className="absolute inset-8 rounded-[40%_30%_45%_35%] border border-white/5" />

            {ATMS.map(atm => {
              const meta = RISK_META[atm.risk];
              const active = selectedAtm === atm.id;
              const isAlertRisk = atm.risk !== 'safe';
              return (
                <button
                  key={atm.id}
                  onMouseEnter={() => setHoverAtm(atm.id)}
                  onMouseLeave={() => setHoverAtm(null)}
                  onClick={() => setSelectedAtm(active ? null : atm.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${atm.x}%`, top: `${atm.y}%` }}
                >
                  <span className={`absolute inset-0 rounded-full ${meta.dot} opacity-40 ${isAlertRisk ? 'animate-ping' : ''}`} style={{ width: 14, height: 14, marginLeft: -7, marginTop: -7 }} />
                  <span className={`relative block rounded-full ${meta.dot} ring-2 ${meta.ring} ${active ? 'h-5 w-5' : 'h-3 w-3'} transition-all`} />
                  {(hoverAtm === atm.id || active) && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 z-20 bg-[#0a0f1c] border border-white/10 rounded-lg p-3 shadow-2xl text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold">{atm.id}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded border ${meta.chip}`}>{meta.label}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mb-1.5 flex items-center gap-1"><MapPin className="h-2.5 w-2.5" />{atm.city}</p>
                      <p className="text-[11px] text-slate-200">
                        <span className="text-slate-500">Risk: </span><span className={meta.text}>{meta.label}</span>
                        <span className="text-slate-500"> · Reason: </span>{atm.reason}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend bar */}
          <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
            <span>Hover a pin for risk term · Click to link with alerts</span>
            {selectedAtm && (
              <span className="text-rose-300">Linked to {selectedAtm} — alerts highlighted</span>
            )}
          </div>
        </section>

        {/* TOP-RIGHT: Breach Ticker */}
        <section className="col-span-12 lg:col-span-4 bg-[#0c1322] border border-white/5 rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <Flame className="h-4 w-4 text-rose-400 animate-pulse" />
            <h2 className="text-sm font-semibold">5-Gap Breach Ticker</h2>
            <span className="ml-auto text-[9px] text-amber-300/80 mr-2 hidden sm:inline">double-click for SOP violators</span>
            <span className="text-[10px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/30">{BREACHES_SEED.length} LIVE</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {BREACHES_SEED.map(b => {
              const Icon = b.type === 'day91' ? Timer
                : b.type === 'hoto' ? Fingerprint
                : b.type === 'dual-custody' ? Users
                : b.type === 'manual-mode' ? Clock
                : Radio;
              return (
                <div key={b.id} className="px-4 py-3 hover:bg-white/[0.02] transition cursor-pointer select-none"
                     onClick={() => setSelectedAtm(b.atmId)}
                     onDoubleClick={() => setDrill({ kind: 'breach', breach: b })}
                     title="Double-click to see SOP violators">
                  <div className="flex items-start gap-2.5">
                    <Icon className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[12px] font-semibold">{b.label}</span>
                        {b.expiresAt && (
                          <span className="text-[10px] font-mono bg-rose-500/15 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">
                            {fmtCountdown(b.expiresAt - now)}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{b.detail}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">→ {b.atmId}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM-LEFT: Action Center */}
        <section className="col-span-12 lg:col-span-4 bg-[#0c1322] border border-white/5 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <Power className="h-4 w-4 text-violet-400" />
            <h2 className="text-sm font-semibold">Tactical Action Center</h2>
          </div>
          <div className="p-4 space-y-3">
            <ActionButton
              icon={<Lock className="h-4 w-4" />}
              title="Digital Kill-Switch"
              subtitle="Force 403 for custodians"
              tone="rose"
              onClick={() => fireAction('Digital Kill-Switch')}
            />
            <ActionButton
              icon={<Power className="h-4 w-4" />}
              title="Remote Lockout"
              subtitle="Disable OTC for selected ATMs"
              tone="amber"
              onClick={() => fireAction('Remote Lockout')}
            />
            <ActionButton
              icon={<UserX className="h-4 w-4" />}
              title="Escalate to Manager"
              subtitle="Bridge for Manual Mode breach"
              tone="violet"
              onClick={() => fireAction('Escalation')}
            />

            {/* Mini gauges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Gauge2 label="Resolution Rate" value={stats.resolutionRate} suffix="%" tone="emerald" icon={<Gauge className="h-3 w-3" />} />
              <Gauge2 label="Stagnant >48h" value={stats.stagnant} tone="rose" icon={<AlertTriangle className="h-3 w-3" />} />
            </div>
          </div>
        </section>

        {/* BOTTOM-RIGHT: Alert Hub */}
        <section className="col-span-12 lg:col-span-8 bg-[#0c1322] border border-white/5 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <h2 className="text-sm font-semibold">Unified Alert Intelligence Hub</h2>
            <div className="ml-auto flex items-center gap-3 text-[10px]">
              <span className="text-slate-400">Open: <span className="text-rose-300 font-semibold">{stats.open}</span></span>
              <span className="text-slate-400">Overdue 24h: <span className="text-amber-300 font-semibold">{stats.overdue}</span></span>
              <span className="text-slate-400">Resolved: <span className="text-emerald-300 font-semibold">{stats.resolutionRate}%</span></span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead className="bg-white/[0.02] text-[10px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Alert ID</th>
                  <th className="text-left px-3 py-2 font-medium">Risk</th>
                  <th className="text-left px-3 py-2 font-medium">ATM</th>
                  <th className="text-left px-3 py-2 font-medium">Source</th>
                  <th className="text-left px-3 py-2 font-medium">Origin</th>
                  <th className="text-left px-3 py-2 font-medium">Aging</th>
                  <th className="text-left px-3 py-2 font-medium">Status</th>
                  <th className="text-right px-4 py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {alerts.map(a => {
                  const ageMs = now - a.createdAt;
                  const overdue = a.status !== 'resolved' && ageMs > 1000*60*60*24;
                  const linked = selectedAtm === a.atmId;
                  const SrcIcon = SOURCE_META[a.source].icon;
                  const meta = RISK_META[a.riskTerm];
                  return (
                    <tr
                      key={a.id}
                      onClick={() => setSelectedAtm(linked ? null : a.atmId)}
                      onDoubleClick={() => setDrill({ kind: 'atm', atmId: a.atmId })}
                      title="Double-click for ATM forensics"
                      className={`cursor-pointer transition select-none ${linked ? 'bg-rose-500/5' : 'hover:bg-white/[0.02]'}`}
                    >
                      <td className="px-4 py-2.5 font-mono text-slate-300">{a.id}</td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] ${meta.chip}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />{meta.label}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-slate-300">{a.atmId}</td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex items-center gap-1 text-slate-300">
                          <SrcIcon className="h-3 w-3 text-slate-400" />{SOURCE_META[a.source].label}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${a.origin === 'audit'
                          ? 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30'
                          : 'bg-slate-500/10 text-slate-300 border-slate-500/30'}`}>
                          {a.origin === 'audit' ? 'Audit-Triggered' : 'System-Generated'}
                        </span>
                      </td>
                      <td className={`px-3 py-2.5 font-mono ${overdue ? 'text-rose-300 font-semibold' : 'text-slate-400'}`}>
                        {fmtAge(ageMs)}
                        {overdue && <span className="ml-1 text-[9px] bg-rose-500/15 px-1 py-0.5 rounded border border-rose-500/30">SLA</span>}
                      </td>
                      <td className="px-3 py-2.5">
                        <StatusPill status={a.status} />
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <div className="inline-flex gap-1">
                          {a.status !== 'in-progress' && a.status !== 'resolved' && (
                            <button onClick={(e) => { e.stopPropagation(); updateStatus(a.id, 'in-progress'); }}
                              className="text-[10px] px-2 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25">
                              Take
                            </button>
                          )}
                          {a.status !== 'resolved' && (
                            <button onClick={(e) => { e.stopPropagation(); updateStatus(a.id, 'resolved'); }}
                              className="text-[10px] px-2 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25">
                              Resolve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-white/5 text-[10px] text-slate-500 flex items-center justify-between">
            <span>Click a row to link the ATM on the map · <span className="text-amber-300">Double-click for ATM forensics</span></span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" /> Audit-Triggered
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 ml-2" /> System-Generated
            </span>
          </div>
        </section>
      </main>

      {/* Toast */}
      {/* Drill-down modal */}
      {drill && <DrillModal drill={drill} onClose={() => setDrill(null)} />}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0a0f1c] border border-white/10 rounded-lg px-4 py-3 shadow-2xl flex items-center gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

/* ---------------- Sub components ---------------- */
const ActionButton: React.FC<{
  icon: React.ReactNode; title: string; subtitle: string;
  tone: 'rose' | 'amber' | 'violet'; onClick: () => void;
}> = ({ icon, title, subtitle, tone, onClick }) => {
  const tones = {
    rose:   'from-rose-500/20 to-rose-500/5 border-rose-500/30 hover:border-rose-500/60 text-rose-300',
    amber:  'from-amber-500/20 to-amber-500/5 border-amber-500/30 hover:border-amber-500/60 text-amber-300',
    violet: 'from-violet-500/20 to-violet-500/5 border-violet-500/30 hover:border-violet-500/60 text-violet-300',
  }[tone];
  return (
    <button onClick={onClick} className={`w-full text-left bg-gradient-to-br ${tones} border rounded-lg p-3 transition group`}>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-white/5 grid place-items-center">{icon}</div>
        <div className="flex-1">
          <p className="text-[12px] font-semibold text-slate-100">{title}</p>
          <p className="text-[10px] text-slate-400">{subtitle}</p>
        </div>
      </div>
    </button>
  );
};

const StatusPill: React.FC<{ status: AlertStatus }> = ({ status }) => {
  if (status === 'resolved') return <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border bg-emerald-500/10 text-emerald-300 border-emerald-500/30"><CheckCircle2 className="h-3 w-3" />Resolved</span>;
  if (status === 'in-progress') return <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border bg-amber-500/10 text-amber-300 border-amber-500/30"><Loader2 className="h-3 w-3 animate-spin" />In-Progress</span>;
  return <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border bg-rose-500/10 text-rose-300 border-rose-500/30"><Circle className="h-3 w-3" />Unresolved</span>;
};

const Gauge2: React.FC<{ label: string; value: number; suffix?: string; tone: 'emerald' | 'rose'; icon: React.ReactNode }> = ({ label, value, suffix = '', tone, icon }) => {
  const color = tone === 'emerald' ? 'text-emerald-300' : 'text-rose-300';
  const bar   = tone === 'emerald' ? 'bg-emerald-400' : 'bg-rose-400';
  const pct = Math.min(100, value);
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
      <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1">{icon}{label}</div>
      <div className={`text-xl font-bold ${color}`}>{value}{suffix}</div>
      <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${bar}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

/* ---------------- Drill-down Modal ---------------- */
const SEVERITY_CHIP: Record<CustodianRow['severity'], string> = {
  Critical: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  High:     'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Medium:   'bg-sky-500/15 text-sky-300 border-sky-500/30',
};

const DrillModal: React.FC<{ drill: NonNullable<DrillState>; onClose: () => void }> = ({ drill, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4" onClick={onClose}>
      <div
        className="bg-[#0c1322] border border-white/10 rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {drill.kind === 'breach' ? <BreachDrill breach={drill.breach} /> : <ATMDrill atmId={drill.atmId} />}
        <div className="px-5 py-3 border-t border-white/5 flex justify-end">
          <button onClick={onClose} className="text-[11px] px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 inline-flex items-center gap-1.5">
            <X className="h-3 w-3" /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

const BreachDrill: React.FC<{ breach: Breach }> = ({ breach }) => {
  const data = BREACH_DRILLDOWN[breach.type];
  return (
    <>
      <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-r from-rose-500/10 to-transparent">
        <div className="flex items-center gap-2 text-[10px] text-rose-300 uppercase tracking-wider">
          <Flame className="h-3 w-3" /> SOP Breach Drill-Down
        </div>
        <h3 className="text-base font-bold text-slate-100 mt-1">{data.title}</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">{data.subtitle}</p>
      </div>
      <div className="p-5 overflow-y-auto">
        <div className="rounded-lg border border-white/5 overflow-hidden">
          <table className="w-full text-[11px]">
            <thead className="bg-white/[0.03] text-[10px] uppercase tracking-wider text-slate-500">
              <tr>{data.columns.map(c => <th key={c} className="text-left px-3 py-2 font-medium">{c}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.rows.map(r => (
                <tr key={r.custodianId} className="hover:bg-white/[0.02]">
                  <td className="px-3 py-2.5">
                    <div className="font-semibold text-slate-100">{r.name}</div>
                    <div className="font-mono text-[10px] text-slate-500">{r.custodianId}</div>
                  </td>
                  <td className="px-3 py-2.5 font-mono text-slate-300">{r.atmId}</td>
                  <td className="px-3 py-2.5 text-slate-300">{r.city}</td>
                  <td className="px-3 py-2.5 text-slate-200">{r.violation}</td>
                  <td className="px-3 py-2.5 text-slate-400">{r.lastAction}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${SEVERITY_CHIP[r.severity]}`}>{r.severity}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
            <div className="text-[10px] text-slate-500 uppercase">Violators</div>
            <div className="text-xl font-bold text-rose-300">{data.rows.length}</div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
            <div className="text-[10px] text-slate-500 uppercase">ATMs Impacted</div>
            <div className="text-xl font-bold text-amber-300">{new Set(data.rows.map(r => r.atmId)).size}</div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
            <div className="text-[10px] text-slate-500 uppercase">Critical</div>
            <div className="text-xl font-bold text-rose-300">{data.rows.filter(r => r.severity === 'Critical').length}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const ATMDrill: React.FC<{ atmId: string }> = ({ atmId }) => {
  const atm = ATMS.find(a => a.id === atmId);
  const f = ATM_FORENSICS[atmId] ?? DEFAULT_FORENSICS;
  const meta = atm ? RISK_META[atm.risk] : RISK_META.safe;
  const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
  return (
    <>
      <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-r from-violet-500/10 to-transparent">
        <div className="flex items-center gap-2 text-[10px] text-violet-300 uppercase tracking-wider">
          <Crosshair className="h-3 w-3" /> ATM Forensics
        </div>
        <div className="flex items-center justify-between mt-1">
          <div>
            <h3 className="text-base font-bold text-slate-100 font-mono">{atmId}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1"><MapPin className="h-3 w-3" />{atm?.city ?? 'Unknown'}</p>
          </div>
          <span className={`text-[10px] px-2 py-1 rounded border ${meta.chip}`}>Risk: {meta.label}</span>
        </div>
        {atm && <p className="text-[11px] text-slate-300 mt-2"><span className="text-slate-500">Why flagged: </span>{atm.reason}</p>}
      </div>
      <div className="p-5 overflow-y-auto space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
            <div className="text-[10px] text-slate-500 uppercase mb-2">Machine Counter</div>
            <div className="space-y-1 text-[11px]">
              <Row label="Dispensed"  value={inr(f.machineCounter.dispensed)} />
              <Row label="Presented"  value={inr(f.machineCounter.presented)} />
              <Row label="Retracted"  value={inr(f.machineCounter.retracted)} tone={f.machineCounter.retracted > 0 ? 'amber' : undefined} />
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
            <div className="text-[10px] text-slate-500 uppercase mb-2">System Balance</div>
            <div className="space-y-1 text-[11px]">
              <Row label="Expected" value={inr(f.systemBalance.expected)} />
              <Row label="Actual"   value={inr(f.systemBalance.actual)} />
              <Row label="Variance" value={inr(f.systemBalance.variance)} tone={f.systemBalance.variance < 0 ? 'rose' : f.systemBalance.variance > 0 ? 'amber' : 'emerald'} />
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
            <div className="text-[10px] text-slate-500 uppercase mb-2">Overages & Claims</div>
            <div className="space-y-1 text-[11px]">
              <Row label="Events"      value={String(f.overages.count)} />
              <Row label="Total Value" value={inr(f.overages.totalAmount)} />
              <Row label="Open Claims" value={String(f.overages.openClaims)} tone={f.overages.openClaims > 0 ? 'rose' : undefined} />
            </div>
          </div>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
          <div className="text-[10px] text-slate-500 uppercase mb-2 flex items-center gap-1.5"><AlertTriangle className="h-3 w-3 text-rose-400" />Risk Signals</div>
          <ul className="space-y-1.5">
            {f.signals.map((s, i) => (
              <li key={i} className="text-[11px] text-slate-200 flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />{s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const Row: React.FC<{ label: string; value: string; tone?: 'rose' | 'amber' | 'emerald' }> = ({ label, value, tone }) => {
  const c = tone === 'rose' ? 'text-rose-300' : tone === 'amber' ? 'text-amber-300' : tone === 'emerald' ? 'text-emerald-300' : 'text-slate-200';
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={`font-mono font-semibold ${c}`}>{value}</span>
    </div>
  );
};

export default CMSAuditCommandCenter;
