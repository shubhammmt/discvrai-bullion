import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Pin, ArrowRight } from 'lucide-react';
import { drhpSections, generatedInvite, redlineChanges } from '@/data/workspaceDemo';
import { Button } from '@/components/ui/button';

const DRHPInvite: React.FC = () => {
  const [view, setView] = useState<'before' | 'after'>('before');
  const [showRedline, setShowRedline] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-light text-ws-text-primary mb-2">
          IB: <span className="text-ws-gold font-medium">DRHP → Investor Invite</span>
        </h1>
        <p className="text-ws-text-secondary mb-6">
          500-page regulatory document summarised into a 1-page investor invite — with citations.
        </p>
      </motion.div>

      <div className="flex items-center gap-2 mb-6">
        {(['before', 'after'] as const).map((v) => (
          <Button key={v} variant={view === v ? 'default' : 'outline'} size="sm"
            onClick={() => setView(v)}
            className={view === v ? 'bg-ws-navy text-white hover:bg-ws-navy/90' : 'border-ws-border text-ws-text-secondary'}>
            {v === 'before' ? '❌ Before' : '✅ After'}
          </Button>
        ))}
      </div>

      {view === 'before' ? (
        <motion.div key="before" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-white border border-ws-border rounded-xl p-6">
          <div className="flex items-center gap-4 justify-center py-8">
            <div className="bg-ws-surface rounded-lg p-6 text-center w-48">
              <FileText className="w-8 h-8 text-ws-text-muted mx-auto mb-2" />
              <p className="text-sm font-medium text-ws-text-primary">500-page DRHP</p>
            </div>
            <ArrowRight className="w-5 h-5 text-ws-text-muted" />
            <div className="bg-ws-surface rounded-lg p-6 text-center w-48">
              <p className="text-3xl mb-2">✍️</p>
              <p className="text-sm font-medium text-ws-text-primary">Manual writing</p>
              <p className="text-xs text-ws-text-muted">4–6 hours per invite</p>
            </div>
            <ArrowRight className="w-5 h-5 text-ws-text-muted" />
            <div className="bg-ws-surface rounded-lg p-6 text-center w-48">
              <p className="text-sm font-medium text-ws-text-primary">1–1.5 page invite</p>
              <p className="text-xs text-red-500">No source links</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div key="after" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Left: DRHP Outline */}
            <div className="lg:col-span-2 bg-white border border-ws-border rounded-xl p-5">
              <h3 className="font-semibold text-ws-text-primary mb-4">DRHP Sections</h3>
              <div className="space-y-3">
                {drhpSections.map((sec) => (
                  <div key={sec.id} className="p-3 bg-ws-surface rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-ws-text-primary">{sec.title}</p>
                      <span className="text-[10px] font-mono text-ws-text-muted">pp. {sec.pages}</span>
                    </div>
                    <p className="text-xs text-ws-text-secondary">{sec.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Generated Invite */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white border-2 border-ws-gold/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-ws-text-primary mb-4">{generatedInvite.headline}</h3>
                
                <div className="mb-4">
                  <p className="text-xs font-medium text-ws-text-muted uppercase tracking-wider mb-2">Key Strengths</p>
                  <ul className="space-y-2">
                    {generatedInvite.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-ws-gold/10 flex items-center justify-center text-xs font-semibold text-ws-gold-dark shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-sm text-ws-text-secondary">{s}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-ws-text-muted uppercase tracking-wider mb-2">Financial Highlights</p>
                  <div className="grid grid-cols-2 gap-2">
                    {generatedInvite.financials.map((f, i) => (
                      <div key={i} className="bg-ws-surface rounded-lg p-3">
                        <p className="text-xs text-ws-text-muted">{f.label}</p>
                        <p className="text-sm font-semibold text-ws-text-primary">{f.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-ws-text-muted border-t border-ws-border pt-3">
                  <Pin className="w-3 h-3" />
                  <span>{generatedInvite.citation}</span>
                </div>
              </div>

              {/* Redline toggle */}
              <Button variant="outline" size="sm" onClick={() => setShowRedline(!showRedline)}
                className="border-ws-border text-ws-text-secondary text-xs">
                {showRedline ? 'Hide' : 'Show'} Redline View
              </Button>

              {showRedline && (
                <div className="bg-white border border-ws-border rounded-xl p-5 space-y-4">
                  <h3 className="font-semibold text-ws-text-primary">Redline — Version Comparison</h3>
                  {redlineChanges.map((change, i) => (
                    <div key={i} className="space-y-2">
                      <p className="text-xs text-ws-text-muted">{change.changeType}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                          <p className="text-xs text-ws-text-muted mb-1">Previous</p>
                          <p className="text-sm text-red-700 line-through">{change.original}</p>
                        </div>
                        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                          <p className="text-xs text-ws-text-muted mb-1">Revised</p>
                          <p className="text-sm text-emerald-700">{change.revised}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DRHPInvite;
