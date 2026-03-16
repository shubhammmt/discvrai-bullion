import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { complianceData } from '@/data/tredsFinopsData';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { toast } from 'sonner';

const ComplianceGuardScreen: React.FC = () => {
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 1600);
  };

  const sendReminder = () => {
    setReminderSent(true);
    toast.success('Reminder sent · Compliance logged');
  };

  const flaggedInvoice = complianceData.find(i => i.overdue);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen px-6 py-20"
      style={{ background: '#0A0F1E' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-indigo-400 text-sm font-medium">Demo 2</span>
          <span className="text-gray-600 text-sm">·</span>
          <span className="text-gray-400 text-sm">Compliance Guard</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-8">Section 43B (h) Compliance</h2>

        <div className="grid grid-cols-5 gap-8">
          {/* Left — Problem */}
          <div className="col-span-2 space-y-4">
            <div className="rounded-2xl border p-6" style={{ background: '#111827', borderColor: '#1F2937' }}>
              <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">Problem</p>
              <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <li>• <span className="text-white font-medium">35,000+ MSMEs</span>. Section 43B (h) compliance. Manual = errors.</li>
                <li>• Agent scans invoices, checks MSME status, auto-triggers reminders to Corporates</li>
                <li>• Tax benefit protection as a <span className="text-indigo-300">value-added service</span> for 1,600+ corporates</li>
              </ul>
            </div>
          </div>

          {/* Right — Workspace */}
          <div className="col-span-3 space-y-4">
            <div className="rounded-2xl border p-6" style={{ background: '#111827', borderColor: '#1F2937' }}>
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">Invoice Register</p>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: '#1F2937' }}>
                      <TableHead className="text-gray-400 text-xs">Corporate</TableHead>
                      <TableHead className="text-gray-400 text-xs">MSME</TableHead>
                      <TableHead className="text-gray-400 text-xs">Amount</TableHead>
                      <TableHead className="text-gray-400 text-xs">Due Date</TableHead>
                      <TableHead className="text-gray-400 text-xs">43B Eligible</TableHead>
                      <TableHead className="text-gray-400 text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complianceData.map(inv => {
                      const isFlagged = scanned && inv.overdue;
                      return (
                        <TableRow key={inv.corp + inv.msme} style={{ borderColor: '#1F2937' }} className={isFlagged ? 'bg-red-500/10' : ''}>
                          <TableCell className="text-white text-sm font-medium">{inv.corp}</TableCell>
                          <TableCell className="text-gray-300 text-sm">{inv.msme}</TableCell>
                          <TableCell className="text-gray-300 text-sm">{inv.amount}</TableCell>
                          <TableCell className="text-gray-300 text-sm">{inv.dueDate}</TableCell>
                          <TableCell className="text-sm">{inv.eligible ? <span className="text-emerald-400">Yes</span> : <span className="text-gray-500">No</span>}</TableCell>
                          <TableCell className="text-sm">
                            {isFlagged ? <span className="text-red-400 font-medium">⚠️ Overdue</span> : <span className="text-emerald-400">On track</span>}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <button
                onClick={runScan}
                disabled={scanned || scanning}
                className="mt-5 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                style={{ background: '#6366F1' }}
              >
                {scanning ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Agent scanning…
                  </span>
                ) : scanned ? '✓ Scan Complete' : '📋 Run Compliance Scan'}
              </button>
            </div>

            {/* Output */}
            {scanned && flaggedInvoice && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border p-6"
                style={{ background: '#111827', borderColor: 'rgba(239, 68, 68, 0.25)' }}
              >
                <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">⚠️ Compliance Alert</p>
                <p className="text-white text-sm leading-relaxed">
                  <span className="font-bold">{flaggedInvoice.corp}</span> — Payment to <span className="font-bold">{flaggedInvoice.msme}</span> overdue.
                  43B (h) tax benefit <span className="text-red-400">at risk</span>. Agent suggests: <span className="text-yellow-300">Send reminder</span>. Template ready.
                </p>
                <button
                  onClick={sendReminder}
                  disabled={reminderSent}
                  className="mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  style={{ background: reminderSent ? '#10B981' : '#6366F1' }}
                >
                  {reminderSent ? '✓ Reminder Sent' : '📧 Send Reminder'}
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComplianceGuardScreen;
