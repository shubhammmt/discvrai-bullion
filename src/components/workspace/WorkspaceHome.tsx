import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkspaceHomeProps {
  onNavigate: (page: string) => void;
}

const asIsItems = [
  'Re-keying data across 5+ sources every morning',
  'Formatting drag — 70 min to produce a morning mail',
  'Analyst manually re-types PDF tables into Excel',
  'DRHP summaries written from scratch each time',
  'Anchor book built by copy-pasting from exchange notices',
  'No audit trail — "who changed what" is unknowable',
  'Files scattered across email, shared drives, WhatsApp',
];

const targetItems = [
  'AI-generated first drafts with source citations',
  'House templates enforced automatically',
  'Human approver always in the loop — nothing auto-sends',
  'Every data point traceable to its source document',
  'Complete audit lineage — every action logged',
  'One platform for Research AND Investment Banking',
  'From 70 minutes to 15 minutes for morning mail',
];

const demoBeats = [
  { id: 'morning-mail', label: 'Morning Mail', module: 'Research', desc: 'Daily market brief — from 70 min to review-only' },
  { id: 'results-night', label: 'Results Night', module: 'Research', desc: 'PDF extraction → structured grid with confidence scores' },
  { id: 'anchor-book', label: 'Anchor Book', module: 'IB', desc: 'Exchange notice → internal format, automatically' },
  { id: 'drhp-invite', label: 'DRHP → Invite', module: 'IB', desc: '500-page doc → 1-page investor invite with citations' },
  { id: 'platform-layers', label: 'Platform Layers', module: 'Shared', desc: '8 building blocks powering both businesses' },
  { id: 'lineage-audit', label: 'Lineage & Audit', module: 'Cross-cutting', desc: 'Every action logged, every source traced' },
];

const WorkspaceHome: React.FC<WorkspaceHomeProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-light text-ws-text-primary mb-3">
          One platform. Two businesses. <span className="text-ws-gold font-medium">Same governance.</span>
        </h1>
        <p className="text-lg text-ws-text-secondary max-w-2xl mx-auto">
          See how Research and Investment Banking teams move from fragmented manual work 
          to a unified, auditable, AI-assisted workspace.
        </p>
      </motion.div>

      {/* As-Is vs Target */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
      >
        {/* As-Is */}
        <div className="bg-white border border-ws-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <X className="w-4 h-4 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-ws-text-primary">Today (As-Is)</h2>
          </div>
          <div className="space-y-3">
            {asIsItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <p className="text-sm text-ws-text-secondary">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Target */}
        <div className="bg-white border-2 border-ws-gold/30 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
              <Check className="w-4 h-4 text-ws-gold-dark" />
            </div>
            <h2 className="text-lg font-semibold text-ws-text-primary">Target State</h2>
          </div>
          <div className="space-y-3">
            {targetItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ws-gold mt-2 shrink-0" />
                <p className="text-sm text-ws-text-secondary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Demo Beats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-ws-text-primary mb-4">Explore the Demo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoBeats.map((beat) => (
            <button
              key={beat.id}
              onClick={() => onNavigate(beat.id)}
              className="group bg-white border border-ws-border rounded-xl p-5 text-left hover:border-ws-gold/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-ws-navy/5 text-ws-navy">
                  {beat.module}
                </span>
                <ArrowRight className="w-4 h-4 text-ws-text-muted group-hover:text-ws-gold transition-colors" />
              </div>
              <h3 className="font-semibold text-ws-text-primary mb-1">{beat.label}</h3>
              <p className="text-sm text-ws-text-secondary">{beat.desc}</p>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WorkspaceHome;
