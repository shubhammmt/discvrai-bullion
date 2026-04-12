import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { timelineEvents, ejLogs, cashOperations, digitalEvidence, getSeverityColor } from '@/data/cmsDataLake';
import { PackagePlus, Banknote, FileText, RefreshCw, ClipboardCheck, AlertTriangle, Archive, Eye, X } from 'lucide-react';

interface Props {
  terminalId: string;
}

interface QuickViewData {
  title: string;
  type: 'ej' | 'cash' | 'evidence' | 'general';
  content: React.ReactNode;
}

const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  indent_created: { icon: <PackagePlus className="h-4 w-4" />, color: 'text-blue-600 bg-blue-100' },
  cash_loaded: { icon: <Banknote className="h-4 w-4" />, color: 'text-emerald-600 bg-emerald-100' },
  ej_log: { icon: <FileText className="h-4 w-4" />, color: 'text-slate-600 bg-slate-100' },
  auto_recovery: { icon: <RefreshCw className="h-4 w-4" />, color: 'text-amber-600 bg-amber-100' },
  physical_eod: { icon: <ClipboardCheck className="h-4 w-4" />, color: 'text-purple-600 bg-purple-100' },
  overage_flag: { icon: <AlertTriangle className="h-4 w-4" />, color: 'text-red-600 bg-red-100' },
  reject_bin: { icon: <Archive className="h-4 w-4" />, color: 'text-slate-600 bg-slate-200' },
};

const typeLabels: Record<string, string> = {
  indent_created: 'Cash Indent',
  cash_loaded: 'Cash Load',
  ej_log: 'EJ Log',
  auto_recovery: 'Auto-Recovery',
  physical_eod: 'Physical EOD',
  overage_flag: 'Overage Flag',
  reject_bin: 'Reject Bin',
};

const MasterTimeline: React.FC<Props> = ({ terminalId }) => {
  const [quickView, setQuickView] = useState<QuickViewData | null>(null);

  // Merge all events into one timeline sorted by timestamp
  const events = timelineEvents.filter(e => e.terminalId === terminalId);
  const termEj = ejLogs.filter(e => e.terminalId === terminalId);
  const termCash = cashOperations.filter(c => c.terminalId === terminalId);
  const termEvidence = digitalEvidence.filter(d => d.terminalId === terminalId);

  const handleEventClick = (ev: typeof events[0]) => {
    // Find linked EJ log
    const linkedEj = ev.linkedEntities?.length
      ? termEj.find(e => ev.linkedEntities!.includes(e.id))
      : null;

    // Find related evidence
    const relatedEvidence = termEvidence.filter(d => {
      const evDate = ev.timestamp.split(' ')[0].replace(/-/g, '');
      return d.filename.includes(evDate);
    });

    setQuickView({
      title: ev.title,
      type: linkedEj ? 'ej' : 'general',
      content: (
        <div className="space-y-4">
          {/* Event Detail */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-xs font-bold text-slate-900 mb-1">{ev.title}</p>
            <p className="text-xs text-slate-600">{ev.detail}</p>
            <p className="text-[10px] text-slate-400 mt-2">{ev.timestamp}</p>
          </div>

          {/* Linked EJ Record */}
          {linkedEj && (
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1.5">Linked EJ Record</p>
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-[11px] text-green-400 space-y-0.5 overflow-x-auto">
                <p>TICKET_ID: {linkedEj.ticketId}</p>
                <p>TIMESTAMP: {linkedEj.timestamp}</p>
                <p>TYPE: {linkedEj.type}</p>
                {linkedEj.errorCode && <p>ERROR_CODE: {linkedEj.errorCode}</p>}
                {linkedEj.errorDesc && <p>ERROR_DESC: {linkedEj.errorDesc}</p>}
                {linkedEj.amount && <p>AMOUNT: ₹{linkedEj.amount.toLocaleString('en-IN')}</p>}
                <p>STATUS: {linkedEj.status}</p>
              </div>
            </div>
          )}

          {/* Related Evidence */}
          {relatedEvidence.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1.5">Related Evidence</p>
              <div className="space-y-1.5">
                {relatedEvidence.map(d => (
                  <div key={d.id} className="flex items-center gap-2 p-2 rounded border border-slate-200 bg-white">
                    {d.type === 'Counter JPEG' ? (
                      <div className="h-10 w-14 bg-slate-200 rounded flex items-center justify-center text-[9px] text-slate-500">📷 JPEG</div>
                    ) : (
                      <div className="h-10 w-14 bg-slate-100 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-slate-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-slate-800 truncate">{d.filename}</p>
                      <p className="text-[10px] text-slate-400">{d.type} · {d.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    });
  };

  if (events.length === 0) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-6 text-center text-sm text-slate-500">
          No timeline events for this ATM.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-slate-800">Master Timeline — {terminalId}</CardTitle>
          <p className="text-[10px] text-slate-500">
            Unified: EJ Logs + Cash Ops + EOD + Recovery · Click any event for details
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="relative pl-8 space-y-0">
            <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-100" />

            {events.map((ev) => {
              const iconInfo = iconMap[ev.type] || { icon: <FileText className="h-4 w-4" />, color: 'text-slate-600 bg-slate-100' };

              return (
                <div
                  key={ev.id}
                  className="relative pb-3 last:pb-0 group cursor-pointer"
                  onClick={() => handleEventClick(ev)}
                >
                  {/* Icon dot */}
                  <div className={`absolute -left-8 top-1.5 h-6 w-6 rounded-full flex items-center justify-center ${iconInfo.color} border-2 border-white shadow-sm`}>
                    {iconInfo.icon}
                  </div>

                  <div className={`ml-2 rounded-lg border p-3 transition-all group-hover:shadow-md group-hover:border-blue-300 ${getSeverityColor(ev.severity)}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${
                        ev.type === 'overage_flag' || ev.type === 'auto_recovery' ? 'border-red-300 text-red-600' :
                        ev.type === 'cash_loaded' ? 'border-emerald-300 text-emerald-600' :
                        'border-slate-300 text-slate-500'
                      }`}>
                        {typeLabels[ev.type] || ev.type}
                      </Badge>
                      <span className="text-xs font-bold text-slate-900 flex-1">{ev.title}</span>
                      <Eye className="h-3 w-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[10px] text-slate-400">{ev.timestamp.split(' ')[1]}</span>
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
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick View Dialog */}
      <Dialog open={!!quickView} onOpenChange={() => setQuickView(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">{quickView?.title}</DialogTitle>
          </DialogHeader>
          {quickView?.content}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MasterTimeline;
