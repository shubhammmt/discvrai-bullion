import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

interface LineageNode {
  label: string;
  entity: string;
  status: 'verified' | 'pending' | 'alert';
  timestamp: string;
  detail: string;
}

interface Props {
  terminalId: string;
  custodianName: string;
  vaultPacked: boolean;
}

const LineageMap: React.FC<Props> = ({ terminalId, custodianName, vaultPacked }) => {
  const nodes: LineageNode[] = [
    { label: 'Vault', entity: 'CMS Vault — Mumbai Central', status: 'verified', timestamp: '06:00', detail: 'Cash packed & sealed. Camera verification ✓' },
    { label: 'Sub-Vault', entity: 'Sub-Vault W-12', status: 'verified', timestamp: '06:15', detail: 'Cassettes dispatched to CIT vehicle' },
    { label: 'Custodian', entity: custodianName, status: vaultPacked ? 'verified' : 'alert', timestamp: '06:30', detail: vaultPacked ? 'CIT handover complete. Seal intact.' : '⚠ Seal verification pending' },
    { label: 'ATM Load', entity: terminalId, status: 'verified', timestamp: '07:15', detail: 'Cash loaded. CLL uploaded. 4 cassettes swapped.' },
    { label: 'Recon', entity: 'EOD Reconciliation', status: 'pending', timestamp: '18:00', detail: 'Physical EOD completed. Balance drift under review.' },
    { label: 'Complaint', entity: 'Dispute CMS-02435512', status: 'alert', timestamp: '11:30', detail: '₹5,000 customer complaint. T+3 of 5.' },
    { label: 'Audit', entity: 'Audit Cycle Q1-2026', status: 'pending', timestamp: 'Scheduled', detail: 'Next audit window: April 18–20' },
  ];

  const statusIcon = (s: LineageNode['status']) => {
    switch (s) {
      case 'verified': return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />;
      case 'pending': return <Clock className="h-3.5 w-3.5 text-amber-500" />;
      case 'alert': return <AlertTriangle className="h-3.5 w-3.5 text-red-500" />;
    }
  };

  const statusColor = (s: LineageNode['status']) => {
    switch (s) {
      case 'verified': return 'border-emerald-300 bg-emerald-50';
      case 'pending': return 'border-amber-300 bg-amber-50';
      case 'alert': return 'border-red-300 bg-red-50';
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <p className="text-[9px] font-bold text-slate-500 uppercase mb-3">Chain of Custody — Current Cash Cycle</p>
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[52px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-emerald-300 via-amber-300 to-red-300" />
        <div className="space-y-2">
          {nodes.map((node, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-[40px] text-right">
                <span className="text-[8px] font-bold text-slate-400 uppercase">{node.label}</span>
              </div>
              <div className={`relative z-10 h-5 w-5 rounded-full flex items-center justify-center bg-white border-2 ${
                node.status === 'verified' ? 'border-emerald-400' : node.status === 'pending' ? 'border-amber-400' : 'border-red-400'
              } shrink-0`}>
                {statusIcon(node.status)}
              </div>
              <div className={`flex-1 rounded border p-2 ${statusColor(node.status)}`}>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-900">{node.entity}</span>
                  <span className="text-[8px] text-slate-400 ml-auto">{node.timestamp}</span>
                </div>
                <p className="text-[9px] text-slate-600 mt-0.5">{node.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-3 text-[8px] text-slate-500">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Verified</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> Pending</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" /> Alert</span>
      </div>
    </div>
  );
};

export default LineageMap;
