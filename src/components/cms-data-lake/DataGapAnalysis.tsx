import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ejLogs, cashOperations, digitalEvidence } from '@/data/cmsDataLake';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface Props {
  terminalId: string;
}

const DataGapAnalysis: React.FC<Props> = ({ terminalId }) => {
  const ej = ejLogs.filter(e => e.terminalId === terminalId);
  const cash = cashOperations.filter(c => c.terminalId === terminalId);
  const evidence = digitalEvidence.filter(d => d.terminalId === terminalId);

  const hasEj = ej.length > 0;
  const hasCash = cash.length > 0;
  const hasEjFile = evidence.some(d => d.type === 'EJ File');
  const hasMspLog = evidence.some(d => d.type === 'MSP Log');
  const hasCounterJpeg = evidence.some(d => d.type === 'Counter JPEG');
  const hasEodReport = evidence.some(d => d.type === 'EOD Report');
  const hasCllUploaded = cash.some(c => c.cllUpload === 'Uploaded');

  const checks = [
    { label: 'EJ Logs (Today)', ok: hasEj, critical: true, missing: 'Missing EJ Logs for April 12th — Investigative Window Blinded' },
    { label: 'Cash Indent Record', ok: hasCash, critical: false, missing: 'No cash operations recorded today' },
    { label: 'EJ File (.txt)', ok: hasEjFile, critical: true, missing: 'EJ text file not uploaded — cannot verify transaction trail' },
    { label: 'MSP Log', ok: hasMspLog, critical: false, missing: 'MSP log unavailable — machine state unverified' },
    { label: 'Counter JPEG', ok: hasCounterJpeg, critical: false, missing: 'Counter photo missing — physical verification gap' },
    { label: 'EOD Report', ok: hasEodReport, critical: true, missing: 'EOD report not filed — reconciliation incomplete' },
    { label: 'CLL Upload Verified', ok: hasCllUploaded, critical: false, missing: 'CLL not uploaded — custodian loading slip pending' },
  ];

  const gapCount = checks.filter(c => !c.ok).length;

  return (
    <Card className={`border-slate-200 ${gapCount > 2 ? 'border-red-200' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-slate-500" /> Data Gap Analysis
          </CardTitle>
          <Badge className={`text-[10px] ${gapCount === 0 ? 'bg-emerald-100 text-emerald-700' : gapCount <= 2 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
            {gapCount === 0 ? 'Complete' : `${gapCount} gaps`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-1.5">
        {checks.map((c, i) => (
          <div key={i} className={`flex items-start gap-2 p-2 rounded ${!c.ok ? (c.critical ? 'bg-red-50' : 'bg-amber-50') : 'bg-emerald-50/50'}`}>
            {c.ok ? (
              <Eye className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
            ) : (
              <EyeOff className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${c.critical ? 'text-red-500' : 'text-amber-500'}`} />
            )}
            <div className="min-w-0">
              <p className={`text-[11px] font-medium ${c.ok ? 'text-emerald-700' : c.critical ? 'text-red-700' : 'text-amber-700'}`}>
                {c.label}
              </p>
              {!c.ok && (
                <p className={`text-[10px] ${c.critical ? 'text-red-600' : 'text-amber-600'}`}>{c.missing}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DataGapAnalysis;
