import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, ArrowRight, Send } from 'lucide-react';
import { resultsExtractedData } from '@/data/workspaceDemo';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

const ResultsNight: React.FC = () => {
  const [view, setView] = useState<'before' | 'after'>('before');
  const [showDiff, setShowDiff] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-light text-ws-text-primary mb-2">
          Research: <span className="text-ws-gold font-medium">Results Night</span>
        </h1>
        <p className="text-ws-text-secondary mb-6">
          Quarterly results processing — extract financials from PDF, compare with prior quarter.
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
          <h2 className="text-lg font-semibold text-ws-text-primary mb-6">Manual Process</h2>
          <div className="flex items-center gap-4">
            {['Upload PDF', 'Analyst opens PDF', 'Re-types into Excel', 'Cross-checks numbers', 'Sends to reviewer'].map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex-1 bg-ws-surface rounded-lg p-4 text-center">
                  <p className="text-sm text-ws-text-secondary">{step}</p>
                </div>
                {i < 4 && <ArrowRight className="w-4 h-4 text-ws-text-muted shrink-0" />}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-sm text-red-700">Error-prone manual re-entry. Average 2–3 hours per company per quarter.</p>
          </div>
        </motion.div>
      ) : (
        <motion.div key="after" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Upload zone */}
          {!uploaded ? (
            <div
              onClick={() => setUploaded(true)}
              className="bg-white border-2 border-dashed border-ws-border rounded-xl p-8 text-center cursor-pointer hover:border-ws-gold/50 transition-colors"
            >
              <Upload className="w-8 h-8 text-ws-text-muted mx-auto mb-3" />
              <p className="text-sm text-ws-text-secondary">Click to upload results PDF (demo — any file accepted)</p>
            </div>
          ) : (
            <>
              <div className="bg-white border border-ws-border rounded-xl p-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-ws-gold" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-ws-text-primary">HDFC_Bank_Q3FY25_Results.pdf</p>
                  <p className="text-xs text-ws-text-muted">Extracted 12 metrics • High confidence on 9/12</p>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">Processed</span>
              </div>

              {/* Extracted grid */}
              <div className="bg-white border border-ws-border rounded-xl overflow-hidden">
                <div className="p-4 border-b border-ws-border flex items-center justify-between">
                  <h3 className="font-semibold text-ws-text-primary">Extracted Financial Grid</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowDiff(!showDiff)}
                    className="border-ws-border text-ws-text-secondary text-xs">
                    {showDiff ? 'Hide' : 'Open'} Diff View
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-ws-surface">
                      <TableHead className="text-ws-text-muted">Metric</TableHead>
                      <TableHead className="text-ws-text-muted">Q3 FY25</TableHead>
                      {showDiff && <TableHead className="text-ws-text-muted">Q3 FY24</TableHead>}
                      <TableHead className="text-ws-text-muted">Change</TableHead>
                      <TableHead className="text-ws-text-muted">Confidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultsExtractedData.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-ws-text-primary text-sm">{row.metric}</TableCell>
                        <TableCell className="text-sm text-ws-text-secondary">{row.current}</TableCell>
                        {showDiff && <TableCell className="text-sm text-ws-text-muted">{row.prior}</TableCell>}
                        <TableCell className="text-sm">
                          <span className={row.change.startsWith('+') || row.change.startsWith('-') && row.metric.includes('NPA')
                            ? 'text-emerald-600' : row.change.startsWith('-') ? 'text-red-500' : 'text-emerald-600'}>
                            {row.change}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            row.confidence === 'high' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>{row.confidence}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button onClick={() => toast.success('Sent to reviewer (demo)')}
                className="bg-ws-gold text-ws-navy hover:bg-ws-gold-dark">
                <Send className="w-4 h-4 mr-1" /> Send to Reviewer
              </Button>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ResultsNight;
