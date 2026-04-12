import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { overageEvents, rejectBinStatuses, getRiskColor, ejLogs } from '@/data/cmsDataLake';
import { AlertTriangle, ShieldAlert, Archive, Link2 } from 'lucide-react';

interface Props {
  terminalId: string;
}

const IntelligencePanel: React.FC<Props> = ({ terminalId }) => {
  const overages = overageEvents.filter(o => o.terminalId === terminalId);
  const rejectBin = rejectBinStatuses.find(r => r.terminalId === terminalId);
  const disputed = ejLogs.filter(e => e.terminalId === terminalId && e.status === 'Disputed');
  const autoRecoveries = ejLogs.filter(e => e.terminalId === terminalId && e.type === 'AutoRecovery');

  return (
    <div className="space-y-4">
      {/* Entity Stitching */}
      {disputed.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5" /> Entity Stitches — Claims Linked
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {disputed.map(d => (
              <div key={d.id} className="text-xs text-amber-700 p-2 bg-white rounded border border-amber-200">
                <span className="font-mono font-bold">{d.ticketId}</span> — {d.errorDesc} — ₹{d.amount?.toLocaleString('en-IN')}
                <p className="text-[10px] text-amber-600 mt-0.5">Auto-linked: Customer Claim → EJ Log → Pending EOD verification</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Overage & Penalty */}
      <Card className="border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-red-500" /> Overage & Penalty Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {overages.length === 0 ? (
            <p className="text-xs text-slate-500 py-2">No overage events.</p>
          ) : (
            <div className="space-y-2">
              {overages.map(o => (
                <div key={o.id} className={`p-2.5 rounded-lg border text-xs ${o.penaltyApplicable ? 'border-red-200 bg-red-50' : 'border-emerald-200 bg-emerald-50'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">₹{o.amount.toLocaleString('en-IN')}</span>
                    <Badge className={`text-[10px] ${o.status === 'Unreported' ? 'bg-red-100 text-red-700' : o.status === 'Under Review' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {o.status}
                    </Badge>
                  </div>
                  <p className="text-[10px] mt-1 text-slate-600">
                    Detected: {o.detectedAt} {o.declaredAt ? `· Declared: ${o.declaredAt}` : '· Not declared'}
                  </p>
                  {o.penaltyApplicable && (
                    <p className="text-[10px] font-semibold text-red-600 mt-1">⚠ Harmonizing Penalty applicable — not reported within EOD</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Auto-Recovery Monitor */}
      {autoRecoveries.length > 0 && (
        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" /> Auto-Recovery Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {autoRecoveries.map(ar => (
              <div key={ar.id} className="p-2 rounded border border-amber-200 bg-amber-50 text-xs">
                <p className="font-bold text-amber-800">{ar.ticketId} — Suspected Overage Event</p>
                <p className="text-[10px] text-amber-600 mt-0.5">{ar.errorDesc}</p>
                <p className="text-[10px] text-amber-600">FLM auto-close detected. Logged for reconciliation.</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Reject Bin */}
      {rejectBin && (
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Archive className="h-3.5 w-3.5" /> Reject Bin Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100">
              <div className="text-xs">
                <p className="font-bold text-slate-900">{rejectBin.binType === 'Sealed' ? '🔒 Sealed (Cassette Swap)' : '🔓 Open (Add Cash)'}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Last checked: {rejectBin.lastChecked}</p>
                {rejectBin.cassetteSeal && <p className="text-[10px] text-slate-500">Seal: {rejectBin.cassetteSeal}</p>}
              </div>
              <Badge className={`text-[10px] ${getRiskColor(rejectBin.riskLevel)}`}>
                {rejectBin.riskLevel} Risk
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IntelligencePanel;
