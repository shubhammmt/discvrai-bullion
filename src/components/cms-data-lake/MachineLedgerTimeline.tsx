import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTimelineEvents, getSeverityColor } from '@/data/cmsDataLake';
import { PackagePlus, Banknote, FileText, RefreshCw, ClipboardCheck, AlertTriangle, Archive } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  indent_created: <PackagePlus className="h-4 w-4 text-blue-600" />,
  cash_loaded: <Banknote className="h-4 w-4 text-emerald-600" />,
  ej_log: <FileText className="h-4 w-4 text-slate-600" />,
  auto_recovery: <RefreshCw className="h-4 w-4 text-amber-600" />,
  physical_eod: <ClipboardCheck className="h-4 w-4 text-purple-600" />,
  overage_flag: <AlertTriangle className="h-4 w-4 text-red-600" />,
  reject_bin: <Archive className="h-4 w-4 text-slate-600" />,
};

interface Props {
  terminalId: string;
}

const MachineLedgerTimeline: React.FC<Props> = ({ terminalId }) => {
  const events = generateTimelineEvents(terminalId);

  if (events.length === 0) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-6 text-center text-sm text-slate-500">
          No timeline events for this ATM. Select a different machine.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-slate-800">Machine Ledger — {terminalId}</CardTitle>
        <p className="text-[10px] text-slate-500">360° chronological event timeline</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative pl-6 space-y-0">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200" />
          
          {events.map((ev, i) => (
            <div key={ev.id} className="relative pb-4 last:pb-0">
              {/* Dot */}
              <div className={`absolute -left-6 top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center bg-white ${ev.severity === 'critical' ? 'border-red-400' : ev.severity === 'warning' ? 'border-amber-400' : 'border-slate-300'}`}>
                <div className={`h-2 w-2 rounded-full ${ev.severity === 'critical' ? 'bg-red-500' : ev.severity === 'warning' ? 'bg-amber-500' : 'bg-slate-400'}`} />
              </div>
              
              <div className={`ml-2 rounded-lg border p-3 ${getSeverityColor(ev.severity)}`}>
                <div className="flex items-center gap-2 mb-1">
                  {iconMap[ev.type]}
                  <span className="text-xs font-bold text-slate-900">{ev.title}</span>
                  <span className="text-[10px] text-slate-400 ml-auto">{ev.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ev.detail}</p>
                {ev.linkedEntities && (
                  <div className="mt-1.5 flex gap-1">
                    {ev.linkedEntities.map(le => (
                      <span key={le} className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">↗ {le}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MachineLedgerTimeline;
