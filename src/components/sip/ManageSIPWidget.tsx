import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pause, Play, Trash2, AlertTriangle, TrendingUp, IndianRupee, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { SIPRecord, SIPStatus, MOCK_SIPS } from '@/data/sipMockData';

interface ManageSIPWidgetProps {
  preSelectedSipId?: string;
  preSelectedAction?: 'pause' | 'activate' | 'delete';
  onActionComplete?: (sipId: string, action: string) => void;
}

export function ManageSIPWidget({ preSelectedSipId, preSelectedAction, onActionComplete }: ManageSIPWidgetProps) {
  const [sips, setSips] = useState<SIPRecord[]>(MOCK_SIPS);
  const [expandedSip, setExpandedSip] = useState<string | null>(preSelectedSipId || null);
  const [confirmDialog, setConfirmDialog] = useState<{ sipId: string; action: 'pause' | 'activate' | 'delete' } | null>(
    preSelectedSipId && preSelectedAction ? { sipId: preSelectedSipId, action: preSelectedAction } : null
  );

  const handleAction = (sipId: string, action: 'pause' | 'activate' | 'delete') => {
    setConfirmDialog({ sipId, action });
  };

  const confirmAction = () => {
    if (!confirmDialog) return;
    const { sipId, action } = confirmDialog;

    setSips(prev => prev.map(sip => {
      if (sip.id !== sipId) return sip;
      if (action === 'pause') return { ...sip, status: 'paused' as SIPStatus, nextDate: '' };
      if (action === 'activate') return { ...sip, status: 'active' as SIPStatus, nextDate: '2026-04-15' };
      return sip;
    }).filter(sip => action === 'delete' ? sip.id !== sipId : true));

    const actionLabels = { pause: 'paused', activate: 'activated', delete: 'cancelled' };
    toast.success(`SIP ${actionLabels[action]} successfully`);
    onActionComplete?.(sipId, action);
    setConfirmDialog(null);
  };

  const sipInDialog = confirmDialog ? sips.find(s => s.id === confirmDialog.sipId) : null;

  const statusConfig: Record<SIPStatus, { label: string; color: string }> = {
    active: { label: 'Active', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    paused: { label: 'Paused', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  };

  const returnPct = (sip: SIPRecord) => (((sip.currentValue - sip.totalInvested) / sip.totalInvested) * 100).toFixed(1);

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Your SIPs
            </span>
            <Badge variant="secondary" className="text-xs">{sips.filter(s => s.status === 'active').length} Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {sips.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No SIPs found</p>
          ) : (
            sips.map(sip => {
              const isExpanded = expandedSip === sip.id;
              const ret = returnPct(sip);
              const isPositive = parseFloat(ret) >= 0;

              return (
                <div key={sip.id} className={cn(
                  'rounded-lg border transition-all',
                  sip.status === 'paused' ? 'border-amber-200 dark:border-amber-800' : 'border-border',
                  isExpanded && 'shadow-sm'
                )}>
                  {/* Summary row */}
                  <button
                    onClick={() => setExpandedSip(isExpanded ? null : sip.id)}
                    className="w-full text-left p-3 flex items-center gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground truncate">{sip.fundName}</p>
                        <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium', statusConfig[sip.status].color)}>
                          {statusConfig[sip.status].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5"><IndianRupee className="w-3 h-3" />{sip.amount.toLocaleString()}/{sip.frequency === 'monthly' ? 'mo' : sip.frequency === 'quarterly' ? 'qtr' : 'yr'}</span>
                        <span className={cn('font-medium', isPositive ? 'text-green-600' : 'text-red-500')}>
                          {isPositive ? '+' : ''}{ret}%
                        </span>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-3 pb-3 border-t border-border/50 pt-3 space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">Invested</p>
                          <p className="font-semibold text-foreground">₹{sip.totalInvested.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Current Value</p>
                          <p className={cn('font-semibold', isPositive ? 'text-green-600' : 'text-red-500')}>₹{sip.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Installments</p>
                          <p className="font-semibold text-foreground">{sip.installmentsDone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Step-Up</p>
                          <p className="font-semibold text-foreground">{sip.stepUpPercent > 0 ? `${sip.stepUpPercent}%/yr` : 'None'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Bank</p>
                          <p className="font-semibold text-foreground text-[11px]">{sip.bankMandate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Goal</p>
                          <Badge variant="outline" className="text-[10px] mt-0.5">{sip.goalTag}</Badge>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-1">
                        {sip.status === 'active' && (
                          <Button variant="outline" size="sm" className="flex-1 text-xs text-amber-600 border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip.id, 'pause'); }}>
                            <Pause className="w-3.5 h-3.5 mr-1" /> Pause
                          </Button>
                        )}
                        {sip.status === 'paused' && (
                          <Button variant="outline" size="sm" className="flex-1 text-xs text-green-600 border-green-200 hover:bg-green-50 dark:hover:bg-green-950/30"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip.id, 'activate'); }}>
                            <Play className="w-3.5 h-3.5 mr-1" /> Activate
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="flex-1 text-xs text-destructive border-destructive/20 hover:bg-destructive/5"
                          onClick={(e) => { e.stopPropagation(); handleAction(sip.id, 'delete'); }}>
                          <Trash2 className="w-3.5 h-3.5 mr-1" /> Cancel SIP
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={!!confirmDialog} onOpenChange={open => !open && setConfirmDialog(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {confirmDialog?.action === 'delete' && <AlertTriangle className="w-5 h-5 text-destructive" />}
              {confirmDialog?.action === 'pause' && <Pause className="w-5 h-5 text-amber-500" />}
              {confirmDialog?.action === 'activate' && <Play className="w-5 h-5 text-green-500" />}
              {confirmDialog?.action === 'pause' ? 'Pause SIP' : confirmDialog?.action === 'activate' ? 'Activate SIP' : 'Cancel SIP'}
            </DialogTitle>
            <DialogDescription>
              {confirmDialog?.action === 'delete'
                ? 'This will permanently cancel your SIP. No future installments will be debited.'
                : confirmDialog?.action === 'pause'
                  ? 'Your SIP will be paused. No installments will be debited until you reactivate.'
                  : 'Your SIP will be reactivated and installments will resume from the next due date.'}
            </DialogDescription>
          </DialogHeader>

          {sipInDialog && (
            <div className="rounded-lg bg-muted/50 p-3 space-y-1.5">
              <p className="text-sm font-medium text-foreground">{sipInDialog.fundName}</p>
              <p className="text-xs text-muted-foreground">
                ₹{sipInDialog.amount.toLocaleString()} • {sipInDialog.frequency} • {sipInDialog.installmentsDone} installments done
              </p>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmDialog(null)}>Go Back</Button>
            <Button
              variant={confirmDialog?.action === 'delete' ? 'destructive' : 'default'}
              className={cn(confirmDialog?.action === 'activate' && 'bg-green-600 hover:bg-green-700 text-white')}
              onClick={confirmAction}
            >
              {confirmDialog?.action === 'pause' ? 'Pause SIP' : confirmDialog?.action === 'activate' ? 'Activate SIP' : 'Cancel SIP'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
