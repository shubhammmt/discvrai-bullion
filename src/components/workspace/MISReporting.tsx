import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, ArrowRight, CheckCircle, Clock, FileText, Users, BarChart3, Download, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Role = 'research' | 'sales' | 'ecm';

const sourceCatalog = [
  { domain: 'Research — MF Holdings', source: 'Monthly holdings file', cadence: 'Monthly', owner: 'Research Ops', connector: 'Upload' },
  { domain: 'Sales — Activity & CRM', source: 'CRM export + meeting logs', cadence: 'Weekly', owner: 'Sales Ops', connector: 'Scheduled File' },
  { domain: 'Events — Registrations', source: 'Event app export', cadence: 'Per event', owner: 'Events Team', connector: 'Upload' },
  { domain: 'ECM — Master MIS', source: 'Weekly/monthly master file', cadence: 'Weekly', owner: 'ECM Desk', connector: 'Upload' },
  { domain: 'Trading — Activity', source: 'Broking system extract', cadence: 'Daily', owner: 'Trading Ops', connector: 'Future API' },
];

const sampleMetrics = [
  'MoM share change (%)',
  'Top adds / removes by value',
  'New positions entered',
  'Full exits',
  'Concentration (top-10 holdings %)',
];

const processingSteps = [
  { label: 'Ingest', icon: Database, desc: 'Files uploaded or received' },
  { label: 'Validate', icon: Shield, desc: 'Rules check & reconcile' },
  { label: 'Canonical Tables', icon: FileText, desc: 'Holdings, Activity, Events, ECM_Master' },
  { label: 'Metric Library', icon: BarChart3, desc: 'Shared definitions power all views' },
  { label: 'Publish', icon: Download, desc: 'Dashboards + Excel packs' },
];

const connectorChip = (type: string) => {
  const colors: Record<string, string> = {
    'Upload': 'bg-blue-500/20 text-blue-300',
    'Scheduled File': 'bg-amber-500/20 text-amber-300',
    'Future API': 'bg-purple-500/20 text-purple-300',
    'Per event': 'bg-teal-500/20 text-teal-300',
  };
  return colors[type] || 'bg-slate-500/20 text-slate-300';
};

// Mini dashboard data
const researchData = {
  funds: ['Alpha Growth Fund', 'Bluechip Value', 'Midcap Opp.', 'Flexi Cap'],
  movers: [
    { name: 'Sample Motors Ltd', change: '+2.4%', direction: 'up' },
    { name: 'Demo Finance Ltd', change: '+1.8%', direction: 'up' },
    { name: 'Tech Solutions Inc', change: '-1.2%', direction: 'down' },
    { name: 'Green Energy Corp', change: '-0.9%', direction: 'down' },
  ],
};

const ecmViews = [
  { name: 'Weekly Banker Cut', status: 'Ready' },
  { name: 'Monthly Client Summary', status: 'Pending Approval' },
  { name: 'Board Pack Extract', status: 'Draft' },
  { name: 'Sector-wise Allocation', status: 'Ready' },
];

const MISReporting: React.FC = () => {
  const [activeRole, setActiveRole] = useState<Role>('research');

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-light text-ws-text-primary mb-2">
          MIS — <span className="text-ws-gold font-medium">Unified Reporting</span>
        </h1>
        <p className="text-ws-text-secondary mb-6">
          Post-transformation reporting structure: sources → validation → canonical data → shared metrics → role-based dashboards.
        </p>
      </motion.div>

      {/* Before / After Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <div className="bg-white border border-red-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
              <span className="text-red-500 text-xs font-bold">✕</span>
            </div>
            <h3 className="font-semibold text-ws-text-primary">Before</h3>
          </div>
          <p className="text-sm text-ws-text-secondary">
            Many Excels, mail attachments, portal exports; ECM master manually forked per stakeholder. 
            MoM positioning and narratives are manual spreadsheet work. Post-event insight is thin.
          </p>
        </div>
        <div className="bg-white border-2 border-ws-gold/30 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5 text-ws-gold-dark" />
            </div>
            <h3 className="font-semibold text-ws-text-primary">After</h3>
          </div>
          <p className="text-sm text-ws-text-secondary">
            One governed data path: refresh rules, dashboards + exports, role-aware views. 
            Fewer manual regenerations; automated views with approval where needed.
          </p>
        </div>
      </motion.div>

      {/* Zone 1: Source Catalogue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-ws-border rounded-xl p-6 mb-6"
      >
        <h2 className="text-lg font-semibold text-ws-text-primary mb-4">Domains & Sources (Catalogue)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ws-border">
                <th className="text-left py-2 px-3 text-ws-text-muted font-medium">Domain</th>
                <th className="text-left py-2 px-3 text-ws-text-muted font-medium">Golden Source</th>
                <th className="text-left py-2 px-3 text-ws-text-muted font-medium">Cadence</th>
                <th className="text-left py-2 px-3 text-ws-text-muted font-medium">Owner</th>
                <th className="text-left py-2 px-3 text-ws-text-muted font-medium">Connector</th>
              </tr>
            </thead>
            <tbody>
              {sourceCatalog.map((row, i) => (
                <tr key={i} className="border-b border-ws-border/50 hover:bg-ws-surface/50">
                  <td className="py-2.5 px-3 font-medium text-ws-text-primary">{row.domain}</td>
                  <td className="py-2.5 px-3 text-ws-text-secondary">{row.source}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{row.cadence}</span>
                  </td>
                  <td className="py-2.5 px-3 text-ws-text-secondary">{row.owner}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${connectorChip(row.connector)}`}>{row.connector}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Zone 2: Processing Spine */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-ws-border rounded-xl p-6 mb-6"
      >
        <h2 className="text-lg font-semibold text-ws-text-primary mb-4">Canonical Layer & Metrics (Processing Spine)</h2>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {processingSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center bg-ws-surface rounded-xl p-4 min-w-[120px]">
                  <div className="w-10 h-10 rounded-lg bg-ws-gold/10 flex items-center justify-center mb-2">
                    <Icon className="w-5 h-5 text-ws-gold-dark" />
                  </div>
                  <span className="text-sm font-semibold text-ws-text-primary">{step.label}</span>
                  <span className="text-xs text-ws-text-muted text-center mt-1">{step.desc}</span>
                </div>
                {i < processingSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-ws-text-muted shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="bg-ws-surface rounded-lg p-4">
          <p className="text-xs font-semibold text-ws-text-muted uppercase tracking-wider mb-2">Sample Metric Library</p>
          <div className="flex flex-wrap gap-2">
            {sampleMetrics.map((m) => (
              <span key={m} className="text-xs px-3 py-1.5 rounded-full bg-ws-gold/10 text-ws-gold-dark font-medium">{m}</span>
            ))}
          </div>
          <p className="text-xs text-ws-text-muted mt-3">
            Same metric library powers dashboard + Excel exports so teams do not redefine cuts.
          </p>
        </div>
      </motion.div>

      {/* Zone 3: Experience Layer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white border border-ws-border rounded-xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-ws-text-primary">Experience Layer (What Users See)</h2>
          <div className="flex gap-2">
            {(['research', 'sales', 'ecm'] as Role[]).map((r) => (
              <Button
                key={r}
                variant={activeRole === r ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveRole(r)}
                className={activeRole === r
                  ? 'bg-ws-navy text-white hover:bg-ws-navy/90'
                  : 'border-ws-border text-ws-text-secondary hover:bg-ws-surface'}
              >
                {r === 'research' ? 'Research' : r === 'sales' ? 'Sales' : 'ECM'}
              </Button>
            ))}
          </div>
        </div>

        {activeRole === 'research' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs text-ws-text-muted">Filters:</span>
              {['Fund', 'Fund Manager', 'Scheme'].map((f) => (
                <span key={f} className="text-xs px-2.5 py-1 rounded-full border border-ws-border text-ws-text-secondary">{f} ▾</span>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-ws-surface rounded-lg p-4">
                <p className="text-xs font-semibold text-ws-text-muted uppercase mb-3">MoM Movement — Top Movers</p>
                {researchData.movers.map((m) => (
                  <div key={m.name} className="flex items-center justify-between py-1.5 border-b border-ws-border/50 last:border-0">
                    <span className="text-sm text-ws-text-primary">{m.name}</span>
                    <span className={`text-sm font-medium ${m.direction === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>{m.change}</span>
                  </div>
                ))}
              </div>
              <div className="bg-ws-surface rounded-lg p-4">
                <p className="text-xs font-semibold text-ws-text-muted uppercase mb-3">New Positions / Full Exits</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-ws-text-primary">3 new positions entered this month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-sm text-ws-text-primary">1 full exit (Demo Pharma Ltd)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeRole === 'sales' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-ws-surface rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-ws-text-primary">142</p>
                <p className="text-xs text-ws-text-muted">Meetings This Month</p>
              </div>
              <div className="bg-ws-surface rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-ws-text-primary">38</p>
                <p className="text-xs text-ws-text-muted">Unique Corporates Met</p>
              </div>
              <div className="bg-ws-surface rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-ws-text-primary">4</p>
                <p className="text-xs text-ws-text-muted">Events Conducted</p>
              </div>
            </div>
            <div className="bg-ws-surface rounded-lg p-4">
              <p className="text-xs font-semibold text-ws-text-muted uppercase mb-3">Event Analytics (Placeholder)</p>
              <div className="flex items-center gap-4 text-sm text-ws-text-secondary">
                <span>Attendance: 320</span>
                <span>Corporates: 18</span>
                <span>Feedback Score: 4.2/5</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeRole === 'ecm' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                Master Version: v14.2 — Updated 01 Apr 2025
              </span>
            </div>
            <div className="bg-ws-surface rounded-lg p-4">
              <p className="text-xs font-semibold text-ws-text-muted uppercase mb-3">Generated Views</p>
              <div className="space-y-2">
                {ecmViews.map((v) => (
                  <div key={v.name} className="flex items-center justify-between py-2 border-b border-ws-border/50 last:border-0">
                    <span className="text-sm text-ws-text-primary">{v.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      v.status === 'Ready' ? 'bg-emerald-50 text-emerald-600' :
                      v.status === 'Pending Approval' ? 'bg-amber-50 text-amber-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>{v.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                size="sm"
                className="bg-ws-navy text-white hover:bg-ws-navy/90"
                onClick={() => toast.success('Export pack generated (demo)')}
              >
                <Download className="w-4 h-4 mr-1" /> Export Pack (Demo)
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-ws-border text-ws-text-secondary"
                onClick={() => toast.info('Approval request sent (demo)')}
              >
                Request Approval
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Footer callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800"
      >
        <strong>Change management:</strong> New screens replace old habits; adoption and tweaks continue after first release. 
        Budget training, hypercare, and iteration after go-live.
      </motion.div>
    </div>
  );
};

export default MISReporting;
