import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { auditTrail } from '@/data/workspaceDemo';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const LineageAudit: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const eventColors: Record<string, string> = {
    Ingest: 'bg-blue-50 text-blue-600',
    Extract: 'bg-purple-50 text-purple-600',
    Draft: 'bg-amber-50 text-amber-600',
    Review: 'bg-cyan-50 text-cyan-600',
    Approve: 'bg-emerald-50 text-emerald-600',
    Export: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-light text-ws-text-primary mb-2">
          Lineage & <span className="text-ws-gold font-medium">Audit Trail</span>
        </h1>
        <p className="text-ws-text-secondary mb-6">
          Every action logged — who did what, when, and on which document. Click any row for details.
        </p>
      </motion.div>

      <div className="bg-white border border-ws-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-ws-surface">
              <TableHead className="w-8 text-ws-text-muted" />
              <TableHead className="text-ws-text-muted">Time</TableHead>
              <TableHead className="text-ws-text-muted">Event</TableHead>
              <TableHead className="text-ws-text-muted">Module</TableHead>
              <TableHead className="text-ws-text-muted">User</TableHead>
              <TableHead className="text-ws-text-muted">Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditTrail.map((entry) => (
              <React.Fragment key={entry.id}>
                <TableRow
                  className="cursor-pointer hover:bg-ws-surface/50"
                  onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                >
                  <TableCell className="w-8">
                    {expandedId === entry.id
                      ? <ChevronDown className="w-4 h-4 text-ws-text-muted" />
                      : <ChevronRight className="w-4 h-4 text-ws-text-muted" />}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-ws-text-muted">{entry.timestamp}</TableCell>
                  <TableCell>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${eventColors[entry.event] || 'bg-slate-100 text-slate-600'}`}>
                      {entry.event}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      entry.module === 'Research' ? 'bg-blue-50 text-blue-600' : 
                      entry.module === 'MIS' ? 'bg-purple-50 text-purple-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>{entry.module}</span>
                  </TableCell>
                  <TableCell className="text-sm text-ws-text-primary">{entry.user}</TableCell>
                  <TableCell className="text-sm text-ws-text-secondary max-w-xs truncate">{entry.detail}</TableCell>
                </TableRow>
                <AnimatePresence>
                  {expandedId === entry.id && (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-ws-surface/50 p-0">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pl-12">
                            <div className="bg-white border border-ws-border rounded-lg p-4 font-mono text-xs space-y-1">
                              <p><span className="text-ws-text-muted">event:</span> <span className="text-ws-text-primary">"{entry.event}"</span></p>
                              <p><span className="text-ws-text-muted">timestamp:</span> <span className="text-ws-text-primary">"2025-03-14T{entry.timestamp}.000Z"</span></p>
                              <p><span className="text-ws-text-muted">user:</span> <span className="text-ws-text-primary">"{entry.user}"</span></p>
                              <p><span className="text-ws-text-muted">module:</span> <span className="text-ws-text-primary">"{entry.module}"</span></p>
                              <p><span className="text-ws-text-muted">detail:</span> <span className="text-ws-text-primary">"{entry.detail}"</span></p>
                              <p><span className="text-ws-text-muted">model_version:</span> <span className="text-ws-text-primary">{entry.user.includes('AI') || entry.user === 'System' ? '"v2.1.0"' : '"n/a"'}</span></p>
                              <p><span className="text-ws-text-muted">ip_address:</span> <span className="text-ws-text-primary">"10.0.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}"</span></p>
                            </div>
                          </div>
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LineageAudit;
