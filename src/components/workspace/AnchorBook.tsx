import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, Check, FileSpreadsheet } from 'lucide-react';
import { anchorInvestors, transformRules } from '@/data/workspaceDemo';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

const AnchorBook: React.FC = () => {
  const [view, setView] = useState<'before' | 'after'>('before');
  const [uploaded, setUploaded] = useState(false);

  const diiTotal = anchorInvestors.filter(i => i.category === 'DII').reduce((s, i) => s + i.amount, 0);
  const fiiTotal = anchorInvestors.filter(i => i.category === 'FII').reduce((s, i) => s + i.amount, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-light text-ws-text-primary mb-2">
          IB: <span className="text-ws-gold font-medium">Anchor Book</span>
        </h1>
        <p className="text-ws-text-secondary mb-6">
          Exchange notice → portal layout → internal Dam format. Automated.
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
          <h2 className="text-lg font-semibold text-ws-text-primary mb-6">Manual 3-Step Process</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: 'Step 1: Notice PDF', desc: 'Download exchange notice, read 20+ pages manually' },
              { title: 'Step 2: Sheet1 Export', desc: 'Export raw CSV from portal — inconsistent headers' },
              { title: 'Step 3: Manual Sheet2', desc: 'Re-format into internal template, classify investors' },
            ].map((step, i) => (
              <div key={i} className="bg-ws-surface rounded-lg p-5 text-center">
                <p className="text-sm font-semibold text-ws-text-primary mb-2">{step.title}</p>
                <p className="text-xs text-ws-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div key="after" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {!uploaded ? (
            <div onClick={() => setUploaded(true)}
              className="bg-white border-2 border-dashed border-ws-border rounded-xl p-8 text-center cursor-pointer hover:border-ws-gold/50 transition-colors">
              <Upload className="w-8 h-8 text-ws-text-muted mx-auto mb-3" />
              <p className="text-sm text-ws-text-secondary">Upload Exchange Notice + Sheet1 CSV (demo)</p>
            </div>
          ) : (
            <>
              {/* Transform rules */}
              <div className="bg-white border border-ws-border rounded-xl p-4">
                <p className="text-sm font-medium text-ws-text-primary mb-3">Transform Rules Applied:</p>
                <div className="flex flex-wrap gap-2">
                  {transformRules.map((rule, i) => (
                    <span key={i} className="text-xs bg-ws-gold/10 text-ws-gold-dark border border-ws-gold/20 px-3 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> {rule}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sheet2 table */}
              <div className="bg-white border border-ws-border rounded-xl overflow-hidden">
                <div className="p-4 border-b border-ws-border">
                  <h3 className="font-semibold text-ws-text-primary flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-ws-gold" /> Sheet2 — Internal Format
                  </h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-ws-surface">
                      <TableHead className="text-ws-text-muted">Investor</TableHead>
                      <TableHead className="text-ws-text-muted">Category</TableHead>
                      <TableHead className="text-ws-text-muted">Amount (₹ Cr)</TableHead>
                      <TableHead className="text-ws-text-muted">Bucket</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {anchorInvestors.map((inv, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-ws-text-primary text-sm">{inv.investor}</TableCell>
                        <TableCell>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            inv.category === 'DII' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                          }`}>{inv.category}</span>
                        </TableCell>
                        <TableCell className="text-sm text-ws-text-secondary">{inv.amount}</TableCell>
                        <TableCell className="text-sm text-ws-text-secondary">{inv.bucket}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* DII/FII Summary */}
              <div className="bg-white border border-ws-border rounded-xl p-5">
                <h3 className="font-semibold text-ws-text-primary mb-4">DII / FII Summary</h3>
                <div className="flex gap-6 items-end">
                  <div className="flex-1">
                    <div className="flex items-end gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-20 bg-blue-500 rounded-t-md" style={{ height: `${(diiTotal / (diiTotal + fiiTotal)) * 160}px` }} />
                        <span className="text-xs font-medium text-ws-text-primary mt-2">DII</span>
                        <span className="text-sm font-semibold text-blue-600">₹{diiTotal} Cr</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-20 bg-purple-500 rounded-t-md" style={{ height: `${(fiiTotal / (diiTotal + fiiTotal)) * 160}px` }} />
                        <span className="text-xs font-medium text-ws-text-primary mt-2">FII</span>
                        <span className="text-sm font-semibold text-purple-600">₹{fiiTotal} Cr</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-ws-text-primary">₹{diiTotal + fiiTotal} Cr</p>
                    <p className="text-xs text-ws-text-muted">Total Allocation</p>
                  </div>
                </div>
                <p className="text-[10px] text-ws-text-muted mt-4 italic">Illustrative data only — not actual allocations</p>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AnchorBook;
