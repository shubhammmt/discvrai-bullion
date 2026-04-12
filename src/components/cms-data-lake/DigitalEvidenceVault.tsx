import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { digitalEvidence } from '@/data/cmsDataLake';
import { FileText, Image, FileCode, File } from 'lucide-react';

const typeIcon: Record<string, React.ReactNode> = {
  'EJ File': <FileCode className="h-4 w-4 text-blue-500" />,
  'MSP Log': <FileText className="h-4 w-4 text-purple-500" />,
  'Counter JPEG': <Image className="h-4 w-4 text-emerald-500" />,
  'EOD Report': <File className="h-4 w-4 text-amber-500" />,
};

interface Props {
  terminalId: string;
}

const DigitalEvidenceVault: React.FC<Props> = ({ terminalId }) => {
  const docs = digitalEvidence.filter(d => d.terminalId === terminalId);

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-slate-800">Digital Evidence Vault</CardTitle>
        <p className="text-[10px] text-slate-500">Linked documents & logs</p>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        {docs.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">No documents linked.</p>
        ) : docs.map(d => (
          <div key={d.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
            {typeIcon[d.type] || <File className="h-4 w-4 text-slate-400" />}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-900 truncate">{d.filename}</p>
              <p className="text-[10px] text-slate-400">{d.type} · {d.size}</p>
            </div>
            <span className="text-[10px] text-slate-400 whitespace-nowrap">{d.uploadedAt.split(' ')[1]}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DigitalEvidenceVault;
