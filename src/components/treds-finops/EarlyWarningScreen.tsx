import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { msmeCreditData } from '@/data/tredsFinopsData';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const EarlyWarningScreen: React.FC = () => {
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 1800);
  };

  const flagged = msmeCreditData.find(s => s.name === 'Supplier X');

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
          <span className="text-indigo-400 text-sm font-medium">Demo 1</span>
          <span className="text-gray-600 text-sm">·</span>
          <span className="text-gray-400 text-sm">Early Warning Agent</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-8">Supplier Risk Detection</h2>

        <div className="grid grid-cols-5 gap-8">
          {/* Left — Problem */}
          <div className="col-span-2 space-y-4">
            <div className="rounded-2xl border p-6" style={{ background: '#111827', borderColor: '#1F2937' }}>
              <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">Problem</p>
              <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <li>• Static credit models miss early-warning signals</li>
                <li>• <span className="text-white font-medium">Supplier X</span>: Invoice frequency dropped 23% in 14 days — standard dashboard: <span className="text-red-400">no alert</span></li>
                <li>• Agent detects subtle shifts in payment patterns across TReDS ecosystem</li>
              </ul>
            </div>
          </div>

          {/* Right — Workspace */}
          <div className="col-span-3 space-y-4">
            <div className="rounded-2xl border p-6" style={{ background: '#111827', borderColor: '#1F2937' }}>
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">MSME Portfolio</p>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: '#1F2937' }}>
                      <TableHead className="text-gray-400 text-xs">Name</TableHead>
                      <TableHead className="text-gray-400 text-xs">Inv (30d)</TableHead>
                      <TableHead className="text-gray-400 text-xs">Inv (14d)</TableHead>
                      <TableHead className="text-gray-400 text-xs">Delta %</TableHead>
                      <TableHead className="text-gray-400 text-xs">Risk Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {msmeCreditData.map(s => {
                      const isFlagged = scanned && s.name === 'Supplier X';
                      return (
                        <TableRow key={s.name} style={{ borderColor: '#1F2937' }} className={isFlagged ? 'bg-red-500/10' : ''}>
                          <TableCell className="text-white text-sm font-medium">{s.name} {isFlagged && <span className="text-red-400 ml-1">⚠️</span>}</TableCell>
                          <TableCell className="text-gray-300 text-sm">{s.inv30d}</TableCell>
                          <TableCell className="text-gray-300 text-sm">{s.inv14d}</TableCell>
                          <TableCell className={`text-sm font-medium ${s.delta < -10 ? 'text-red-400' : s.delta < 0 ? 'text-yellow-400' : 'text-emerald-400'}`}>{s.delta > 0 ? '+' : ''}{s.delta}%</TableCell>
                          <TableCell className="text-gray-300 text-sm">{s.riskScore}</TableCell>
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
                ) : scanned ? '✓ Scan Complete' : '🔍 Run Early Warning Scan'}
              </button>
            </div>

            {/* Output */}
            {scanned && flagged && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border p-6"
                style={{ background: '#111827', borderColor: 'rgba(239, 68, 68, 0.25)' }}
              >
                <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">🚨 Agent Alert</p>
                <p className="text-white text-sm leading-relaxed">
                  <span className="font-bold">Supplier X</span> — Invoice frequency <span className="text-red-400 font-semibold">-23%</span> in 14 days.
                  Agent suggests: <span className="text-yellow-300">Flag for review</span>. Est. default probability <span className="text-red-400">+12%</span>.
                </p>
                <div className="mt-4 rounded-xl p-3 flex items-center justify-between" style={{ background: '#0A0F1E' }}>
                  <span className="text-gray-400 text-xs">Gini improvement (illustrative)</span>
                  <span className="text-emerald-400 font-bold text-sm">+10–15%</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EarlyWarningScreen;
