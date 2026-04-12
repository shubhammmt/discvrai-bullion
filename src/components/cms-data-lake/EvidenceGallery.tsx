import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { digitalEvidence } from '@/data/cmsDataLake';
import { FileText, Image, FileCode, File, Maximize2 } from 'lucide-react';

interface Props {
  terminalId: string;
}

const mockEjContent = `=== ELECTRONIC JOURNAL ===
Terminal: ATM-MUM-0001
Date: 2026-04-12

09:12:34 | TXN_START | Card: XXXX-XXXX-XXXX-4521
09:12:36 | PIN_VERIFIED | Status: OK
09:12:38 | AMOUNT_SELECTED | ₹2,000
09:12:39 | DISPENSE_START | Cassette: C2
09:12:40 | BNA_ERROR | Code: BNA-TJ01
09:12:40 | ERROR_DESC | TRANSPORT JAM DETECTED
09:12:41 | DISPENSE_FAILED | Notes stuck: 1x₹2000
09:12:41 | TXN_REVERSED | Status: FAILED
---
09:14:01 | AUTO_RECOVERY | Jam auto-cleared
09:14:01 | FLM_AUTOCLOSE | Ticket: CMS-02435508
---
09:22:15 | TXN_START | Card: XXXX-XXXX-XXXX-8832
09:22:17 | PIN_VERIFIED | Status: OK
09:22:18 | AMOUNT_SELECTED | ₹10,000
09:22:20 | DISPENSE_OK | 5x₹2000
09:22:21 | TXN_SUCCESS | Ref: CMS-02435510`;

const mockMspLog = `[MSP Monitor Log — ATM-MUM-0001]
[2026-04-12 06:30:00] SYSTEM_BOOT: OK
[2026-04-12 06:30:05] CASSETTE_CHECK: C1=OK C2=OK C3=OK C4=OK
[2026-04-12 06:30:10] NETWORK: Connected (4G LTE, Signal: -62dBm)
[2026-04-12 07:15:00] CASH_LOAD: CIT Rajesh Sharma, 4 cassettes
[2026-04-12 07:15:30] CLL_UPLOAD: SUCCESS
[2026-04-12 09:12:40] ALERT: BNA TRANSPORT JAM
[2026-04-12 09:14:01] AUTO_RECOVERY: Jam cleared
[2026-04-12 09:14:02] FLM_TICKET: Auto-created CMS-02435508
[2026-04-12 18:00:00] EOD_VISIT: Agent Ramesh K.`;

const EvidenceGallery: React.FC<Props> = ({ terminalId }) => {
  const docs = digitalEvidence.filter(d => d.terminalId === terminalId);
  const [preview, setPreview] = useState<typeof docs[0] | null>(null);

  const getPreviewContent = (doc: typeof docs[0]) => {
    if (doc.type === 'EJ File') {
      return (
        <div className="bg-slate-900 rounded-lg p-4 font-mono text-[11px] text-green-400 max-h-[400px] overflow-auto whitespace-pre leading-relaxed">
          {mockEjContent}
        </div>
      );
    }
    if (doc.type === 'MSP Log') {
      return (
        <div className="bg-slate-800 rounded-lg p-4 font-mono text-[11px] text-cyan-300 max-h-[400px] overflow-auto whitespace-pre leading-relaxed">
          {mockMspLog}
        </div>
      );
    }
    if (doc.type === 'Counter JPEG') {
      return (
        <div className="bg-slate-100 rounded-lg p-8 flex flex-col items-center justify-center gap-3">
          <div className="w-full max-w-[300px] h-[200px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
            <div className="text-center">
              <Image className="h-12 w-12 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500">Counter Photo</p>
              <p className="text-[10px] text-slate-400">ATM-MUM-0001 · 2026-04-12</p>
              <p className="text-[10px] text-slate-400 mt-1">Cassette readings verified</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-slate-50 rounded-lg p-8 text-center">
        <File className="h-12 w-12 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">{doc.filename}</p>
        <p className="text-xs text-slate-400 mt-1">{doc.size} · {doc.type}</p>
      </div>
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'EJ File': return <FileCode className="h-5 w-5 text-blue-500" />;
      case 'MSP Log': return <FileText className="h-5 w-5 text-purple-500" />;
      case 'Counter JPEG': return <Image className="h-5 w-5 text-emerald-500" />;
      default: return <File className="h-5 w-5 text-amber-500" />;
    }
  };

  const getThumbnail = (type: string) => {
    if (type === 'Counter JPEG') {
      return (
        <div className="h-16 w-full bg-slate-200 rounded flex items-center justify-center">
          <Image className="h-6 w-6 text-slate-400" />
        </div>
      );
    }
    if (type === 'EJ File') {
      return (
        <div className="h-16 w-full bg-slate-900 rounded p-1.5 overflow-hidden">
          <p className="text-[7px] font-mono text-green-400 leading-tight">
            09:12:34 TXN_START<br />09:12:40 BNA_ERROR<br />09:14:01 AUTO_RECOVERY<br />09:22:15 TXN_START
          </p>
        </div>
      );
    }
    if (type === 'MSP Log') {
      return (
        <div className="h-16 w-full bg-slate-800 rounded p-1.5 overflow-hidden">
          <p className="text-[7px] font-mono text-cyan-300 leading-tight">
            SYSTEM_BOOT: OK<br />CASSETTE_CHECK: OK<br />ALERT: BNA JAM<br />AUTO_RECOVERY
          </p>
        </div>
      );
    }
    return (
      <div className="h-16 w-full bg-slate-100 rounded flex items-center justify-center">
        <File className="h-6 w-6 text-slate-400" />
      </div>
    );
  };

  return (
    <>
      <Card className="border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-slate-800">Digital Evidence Vault</CardTitle>
          <p className="text-[10px] text-slate-500">Click to preview · {docs.length} documents</p>
        </CardHeader>
        <CardContent className="pt-0">
          {docs.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">No documents linked.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {docs.map(d => (
                <div
                  key={d.id}
                  onClick={() => setPreview(d)}
                  className="group cursor-pointer rounded-lg border border-slate-200 p-2 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  {getThumbnail(d.type)}
                  <div className="mt-1.5 flex items-start gap-1.5">
                    {getIcon(d.type)}
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium text-slate-800 truncate">{d.filename}</p>
                      <p className="text-[9px] text-slate-400">{d.size}</p>
                    </div>
                    <Maximize2 className="h-3 w-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold flex items-center gap-2">
              {preview && getIcon(preview.type)}
              {preview?.filename}
            </DialogTitle>
          </DialogHeader>
          {preview && getPreviewContent(preview)}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EvidenceGallery;
