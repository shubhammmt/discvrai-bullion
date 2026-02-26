import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { initialAuditTrail, type AuditEntry } from '@/data/cmsDemo';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClipboardList, Bot, User } from 'lucide-react';

interface CMSAuditTrailProps {
  entries?: AuditEntry[];
}

const CMSAuditTrail = ({ entries }: CMSAuditTrailProps) => {
  const trail = entries || initialAuditTrail;

  return (
    <Card className="border border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-slate-600" /> Audit Trail
        </CardTitle>
        <p className="text-xs text-slate-500">Every action logged — RBI and audit-ready</p>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {trail.map(entry => (
              <div key={entry.id} className="flex gap-3 items-start p-2 rounded-md hover:bg-slate-50">
                <div className={`p-1 rounded-full shrink-0 mt-0.5 ${entry.actor === 'Agent' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                  {entry.actor === 'Agent' ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-slate-400">{entry.timestamp}</span>
                    <Badge variant="outline" className={`text-[10px] ${entry.actor === 'Agent' ? 'text-blue-600 border-blue-200' : 'text-purple-600 border-purple-200'}`}>
                      {entry.actor}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">{entry.action}</Badge>
                  </div>
                  <p className="text-xs text-slate-600">{entry.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CMSAuditTrail;
