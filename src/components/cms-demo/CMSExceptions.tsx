import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { initialExceptions, initialAuditTrail, formatINR, type ExceptionItem, type AuditEntry } from '@/data/cmsDemo';
import { AlertTriangle, Check, X, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface CMSExceptionsProps {
  onAuditUpdate?: (entries: AuditEntry[]) => void;
}

const CMSExceptions = ({ onAuditUpdate }: CMSExceptionsProps) => {
  const [exceptions, setExceptions] = useState<ExceptionItem[]>(initialExceptions);
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>(initialAuditTrail);

  const handleAction = (exId: string, action: 'resolved' | 'rejected') => {
    const ex = exceptions.find(e => e.id === exId);
    if (!ex) return;

    const now = new Date();
    const ts = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })} ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;

    const newAudit: AuditEntry = {
      id: `a-${Date.now()}`,
      timestamp: ts,
      actor: 'User',
      action: action === 'resolved' ? 'Approved' : 'Rejected',
      detail: `Exception "${ex.type}" – ${action === 'resolved' ? 'Approved agent suggestion' : 'Rejected'}. ${ex.agentSuggestion}`,
    };

    const updatedExceptions = exceptions.map(e => e.id === exId ? { ...e, status: action } : e) as ExceptionItem[];
    const updatedAudit = [newAudit, ...auditTrail];

    setExceptions(updatedExceptions);
    setAuditTrail(updatedAudit);
    onAuditUpdate?.(updatedAudit);

    toast.success(action === 'resolved' ? 'Exception approved & logged to audit trail' : 'Exception rejected & logged to audit trail');
  };

  const openExceptions = exceptions.filter(e => e.status === 'open');
  const resolvedExceptions = exceptions.filter(e => e.status !== 'open');

  return (
    <Card className="border border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Exceptions — Agent Suggestions
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">Only items requiring human decision</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-xs">{openExceptions.length} open</Badge>
            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">{resolvedExceptions.length} resolved</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {openExceptions.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <Check className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
            <p className="text-sm font-medium">All exceptions resolved</p>
          </div>
        )}
        {openExceptions.map(ex => (
          <div key={ex.id} className="border border-amber-200 bg-amber-50/50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Badge variant="outline" className="text-[10px] text-amber-700 border-amber-300 mb-1">{ex.type}</Badge>
                <p className="text-sm text-slate-700">{ex.description}</p>
              </div>
              {ex.amount > 0 && <span className="text-sm font-bold text-slate-800">{formatINR(ex.amount)}</span>}
            </div>
            <div className="flex items-start gap-2 bg-white border border-slate-200 rounded-md p-3 mb-3">
              <Sparkles className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-600"><span className="font-semibold text-blue-600">Agent suggests:</span> {ex.agentSuggestion}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => handleAction(ex.id, 'resolved')}>
                <Check className="h-3 w-3 mr-1" /> Approve
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleAction(ex.id, 'rejected')}>
                <X className="h-3 w-3 mr-1" /> Reject
              </Button>
            </div>
          </div>
        ))}

        {resolvedExceptions.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resolved</p>
            {resolvedExceptions.map(ex => (
              <div key={ex.id} className="border border-slate-100 bg-slate-50 rounded-lg p-3 opacity-70">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-[10px] ${ex.status === 'resolved' ? 'text-emerald-600 border-emerald-300' : 'text-red-600 border-red-300'}`}>
                    {ex.status === 'resolved' ? '✓ Approved' : '✗ Rejected'}
                  </Badge>
                  <span className="text-xs text-slate-500">{ex.type} — {ex.description}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CMSExceptions;
