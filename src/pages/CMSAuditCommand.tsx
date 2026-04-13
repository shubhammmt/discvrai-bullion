import React, { useState } from 'react';
import { 
  Target, Shield, AlertTriangle, Users, MapPin, Eye, Camera, CheckCircle2, XCircle, 
  ChevronRight, Bell, Zap, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Building2, Route, Shuffle, Search, Filter, Clock, FileWarning, UserX, Wrench,
  Package, BarChart3, Layers
} from 'lucide-react';
import { 
  auditPulse, riskTargets, liveAuditFeed, discrepancies, vaults, routes, auditAlerts,
  LiveAuditEntry, DiscrepancyEntry, VaultEntry, RouteEntry, AuditAlert
} from '@/data/cmsAuditCommand';

const formatCurrency = (v: number) => {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)} Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)} L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(1)}K`;
  return `₹${v.toLocaleString('en-IN')}`;
};

type SidebarTab = 'site-audits' | 'vault-audits';
type MainView = 'planner' | 'live-feed' | 'discrepancy' | 'vault-route';

const CMSAuditCommand: React.FC = () => {
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('site-audits');
  const [mainView, setMainView] = useState<MainView>('planner');
  const [selectedAudit, setSelectedAudit] = useState<LiveAuditEntry | null>(null);
  const [selectedDiscrepancy, setSelectedDiscrepancy] = useState<DiscrepancyEntry | null>(null);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vaultRouteView, setVaultRouteView] = useState<'vaults' | 'routes'>('vaults');

  const criticalAlerts = auditAlerts.filter(a => a.severity === 'critical' || a.requiresSignoff);

  const filteredTargets = riskTargets.filter(t => {
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase()) && !t.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <div className="w-56 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm tracking-tight">Audit Command</span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">CMS Infosystems</p>
        </div>

        {/* Sidebar Tabs */}
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
            { key: 'live-feed' as MainView, icon: Eye, label: 'Live Feed' },
            { key: 'discrepancy' as MainView, icon: AlertTriangle, label: 'Discrepancies' },
            { key: 'vault-route' as MainView, icon: Route, label: 'Vaults & Routes' },
          ].map(item => (
            <button key={item.key} onClick={() => setMainView(item.key)} className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${mainView === item.key ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </div>

        {/* Alert Count */}
        <div className="mt-auto p-3 border-t border-slate-800">
          <button onClick={() => setAlertsOpen(!alertsOpen)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">
            <Bell className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400 font-medium">{criticalAlerts.length} Alerts</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Audit Pulse */}
        <div className="border-b border-slate-800 bg-slate-900/50 px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              Audit Command Center
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>70,000 ATMs</span><span>·</span><span>129 Vaults</span><span>·</span><span>3,000 Routes</span>
              <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-medium">LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {/* Hit Rate */}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Audit Hit Rate</span>
                <Target className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white">{auditPulse.auditHitRate}%</div>
              <div className="flex items-center gap-1 mt-1">
                {auditPulse.auditHitRateTrend > 0 ? <ArrowUpRight className="w-3 h-3 text-emerald-400" /> : <ArrowDownRight className="w-3 h-3 text-red-400" />}
                <span className={`text-xs ${auditPulse.auditHitRateTrend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {Math.abs(auditPulse.auditHitRateTrend)}% vs last month
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Targeting accuracy of field audits</p>
            </div>

            {/* Total Shortage */}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-red-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Shortage Discovered</span>
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-2xl font-bold text-red-400">{formatCurrency(auditPulse.totalShortageDiscovered)}</div>
              <div className="flex items-center gap-1 mt-1">
                {auditPulse.shortageTrend < 0 ? <TrendingDown className="w-3 h-3 text-emerald-400" /> : <TrendingUp className="w-3 h-3 text-red-400" />}
                <span className={`text-xs ${auditPulse.shortageTrend < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {Math.abs(auditPulse.shortageTrend)}% vs last month
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Physical cash leaks caught this month</p>
            </div>

            {/* Risk Coverage */}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Risk Coverage</span>
                <Shield className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{auditPulse.riskCoverage}%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-emerald-400">{auditPulse.riskCoverageTrend}% vs last month</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Red ATMs audited in last 30 days</p>
            </div>

            {/* Compliance Score */}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Auditor Compliance</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white">{auditPulse.auditorComplianceScore}%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-emerald-400">{auditPulse.complianceTrend}% vs last month</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Geo-Tag + OTC + Photo quality avg</p>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 overflow-auto p-6">
          {/* Risk-Based Planner */}
          {mainView === 'planner' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  Risk-Based Audit Planner
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
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/15 text-amber-400 rounded-lg text-xs font-medium hover:bg-amber-500/25 transition-colors border border-amber-500/20">
                    <Shuffle className="w-3.5 h-3.5" /> Surprise Audit
                  </button>
                </div>
              </div>

              {/* Priority Legend */}
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
                      <th className="text-center px-4 py-2.5 font-medium">Risk Score</th>
                      <th className="text-center px-4 py-2.5 font-medium">Balance Drift</th>
                      <th className="text-right px-4 py-2.5 font-medium">Total Shortage</th>
                      <th className="text-center px-4 py-2.5 font-medium">Days Since</th>
                      <th className="text-center px-4 py-2.5 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTargets.map((t, i) => (
                      <tr key={t.id} className={`border-t border-slate-800/50 hover:bg-slate-800/30 transition-colors ${t.overdue ? 'bg-red-500/5' : ''}`}>
                        <td className="px-4 py-2.5 font-mono font-medium text-white">{t.name}</td>
                        <td className="px-4 py-2.5 text-slate-400">{t.location}</td>
                        <td className="px-4 py-2.5"><span className="text-slate-300">{t.sitePersona}</span></td>
                        <td className="px-4 py-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getPriorityColor(t.priority)}`}>
                            {t.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className={`font-bold ${t.riskScore >= 80 ? 'text-red-400' : t.riskScore >= 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {t.riskScore}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {t.balanceDriftCount > 0 ? (
                            <span className="text-red-400 font-medium">{t.balanceDriftCount}x</span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          {t.totalShortage > 0 ? (
                            <span className="text-red-400 font-medium">{formatCurrency(t.totalShortage)}</span>
                          ) : (
                            <span className="text-emerald-400">Clean</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className={`font-mono ${t.daysSinceAudit > t.auditCycleTarget ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                            {t.daysSinceAudit}d
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {t.overdue ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-600 text-white animate-pulse">OVERDUE</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-700 text-slate-300">On Track</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Live Audit Feed */}
          {mainView === 'live-feed' && (
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
                            audit.status === 'completed' ? 'bg-emerald-600 text-white' :
                            'bg-blue-600 text-white'
                          }`}>{audit.status.toUpperCase()}</span>
                          <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${selectedAudit?.id === audit.id ? 'rotate-90' : ''}`} />
                        </div>
                      </div>

                      {/* Counter Triangulation */}
                      <div className="grid grid-cols-4 gap-3 mb-2">
                        <div className="text-center">
                          <p className="text-[10px] text-slate-500 uppercase">Switch</p>
                          <p className="text-sm font-mono text-white">{audit.switchCounter.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-slate-500 uppercase">Machine</p>
                          <p className="text-sm font-mono text-white">{audit.machineCounter.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-slate-500 uppercase">Physical</p>
                          <p className="text-sm font-mono text-white">{audit.physicalCount.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-slate-500 uppercase">Diff. AMT</p>
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

              {/* Audit Detail Panel */}
              {selectedAudit && (
                <div className="w-96 bg-slate-900 rounded-xl border border-slate-800 p-4 overflow-auto max-h-[calc(100vh-240px)]">
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-amber-400" />
                    Audit Detail — {selectedAudit.atmId}
                  </h3>

                  {/* Photo Evidence */}
                  <div className="mb-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Photo Evidence Gallery</p>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedAudit.photoEvidence.map((photo, i) => (
                        <div key={i} className={`rounded-lg border p-2 text-center ${photo.verified ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                          <div className="w-full aspect-square bg-slate-800 rounded-md mb-1.5 flex items-center justify-center">
                            <Camera className="w-6 h-6 text-slate-600" />
                          </div>
                          <p className="text-[9px] text-slate-400">{photo.type}</p>
                          <span className={`text-[9px] font-medium ${photo.verified ? 'text-emerald-400' : 'text-red-400'}`}>
                            {photo.verified ? '✓ Verified' : '✗ Unverified'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SOP Compliance */}
                  <div className="mb-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">SOP Compliance Checklist</p>
                    <div className="space-y-1.5">
                      {selectedAudit.sopCompliance.map((sop, i) => (
                        <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${sop.status ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'}`}>
                          {sop.status ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                          {sop.item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Geo & OTC Status */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`rounded-lg p-3 border ${selectedAudit.geoTagged ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                      <MapPin className={`w-4 h-4 mb-1 ${selectedAudit.geoTagged ? 'text-emerald-400' : 'text-red-400'}`} />
                      <p className="text-[10px] text-slate-400">Geo-Tag</p>
                      <p className={`text-xs font-medium ${selectedAudit.geoTagged ? 'text-emerald-300' : 'text-red-300'}`}>
                        {selectedAudit.geoDistance}m {selectedAudit.geoTagged ? '✓' : '✗ FAIL'}
                      </p>
                    </div>
                    <div className={`rounded-lg p-3 border ${selectedAudit.otcStatus === 'active' ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                      <Zap className={`w-4 h-4 mb-1 ${selectedAudit.otcStatus === 'active' ? 'text-emerald-400' : 'text-red-400'}`} />
                      <p className="text-[10px] text-slate-400">OTC Status</p>
                      <p className={`text-xs font-medium ${selectedAudit.otcStatus === 'active' ? 'text-emerald-300' : 'text-red-300'}`}>
                        {selectedAudit.otcStatus.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Discrepancy Root Cause */}
          {mainView === 'discrepancy' && (
            <div className="flex gap-6">
              <div className="flex-1">
                <h2 className="text-base font-bold flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Discrepancy Root Cause Workspace
                </h2>

                {/* Category Summary */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { cat: 'Technical', icon: <Wrench className="w-4 h-4" />, count: discrepancies.filter(d => d.category === 'technical').length, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                    { cat: 'Physical', icon: <Package className="w-4 h-4" />, count: discrepancies.filter(d => d.category === 'physical').length, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                    { cat: 'Human Error/Fraud', icon: <UserX className="w-4 h-4" />, count: discrepancies.filter(d => d.category === 'human').length, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
                  ].map(c => (
                    <div key={c.cat} className={`rounded-xl p-3 border ${c.color}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {c.icon}
                        <span className="text-sm font-medium">{c.cat}</span>
                      </div>
                      <span className="text-2xl font-bold">{c.count}</span>
                      <span className="text-xs ml-1 opacity-60">findings</span>
                    </div>
                  ))}
                </div>

                {/* Discrepancy Table */}
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

              {/* Deep Dive Panel */}
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
                      <p className="text-[10px] text-slate-500 uppercase mb-1">Status</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        selectedDiscrepancy.status === 'escalated' ? 'bg-red-600 text-white' :
                        selectedDiscrepancy.status === 'investigating' ? 'bg-amber-600 text-white' :
                        selectedDiscrepancy.status === 'resolved' ? 'bg-emerald-600 text-white' :
                        'bg-blue-600 text-white'
                      }`}>{selectedDiscrepancy.status.toUpperCase()}</span>
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
                      <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors">Escalate to Audit</button>
                      <button className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg text-xs font-medium hover:bg-slate-600 transition-colors">Mark Resolved</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Vault & Route Explorer */}
          {mainView === 'vault-route' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  Vault & Route Explorer
                </h2>
                <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                  <button onClick={() => setVaultRouteView('vaults')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${vaultRouteView === 'vaults' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                    129 Vaults
                  </button>
                  <button onClick={() => setVaultRouteView('routes')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${vaultRouteView === 'routes' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                    3,000 Routes
                  </button>
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
                        <th className="text-center px-4 py-2.5 font-medium">Trend (4M)</th>
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
                              <span className={`font-medium ${v.complianceScore >= 90 ? 'text-emerald-400' : v.complianceScore >= 80 ? 'text-amber-400' : 'text-red-400'}`}>
                                {v.complianceScore}%
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getPriorityColor(v.riskLevel)}`}>
                                {v.riskLevel.toUpperCase()}
                              </span>
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
                              <span className={`font-bold ${r.theftRiskScore >= 80 ? 'text-red-400' : r.theftRiskScore >= 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                {r.theftRiskScore}
                              </span>
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
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </span>
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
