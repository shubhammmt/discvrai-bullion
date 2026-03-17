import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pause, Play, Trash2, AlertTriangle, IndianRupee, Calendar, ChevronDown, ChevronUp, Plus, Loader2, RefreshCw, ShieldCheck, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const API_BASE_URL = import.meta.env.VITE_DISCVR_API_BASE_URL || '';
const API_TOKEN = import.meta.env.VITE_DISCVR_API_TOKEN || '';

interface SIPRecord {
  sip_id: string;
  subscription_id: string;
  scheme_code: string;
  scheme_name: string;
  amount: number;
  frequency: string;
  status: string;
  start_date: string;
  next_due_date: string;
  created_at: string;
}

interface PaginationInfo {
  current_page: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
}

interface FeedbackBanner {
  type: 'success' | 'info' | 'error';
  message: string;
}

interface ManageSIPWidgetProps {
  preSelectedSipId?: string;
  preSelectedAction?: 'pause' | 'activate' | 'delete';
  onActionComplete?: (sipId: string, action: string) => void;
  onCreateSIP?: () => void;
  userId?: string;
}

type SIPAction = 'pause' | 'activate' | 'delete' | 'verify';

const statusConfig: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: 'Active', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  PAUSED: { label: 'Paused', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  CREATED: { label: 'Pending Setup', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  PENDING: { label: 'Pending', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
};

function getHeaders() {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (API_TOKEN) h['Authorization'] = `Bearer ${API_TOKEN}`;
  return h;
}

function getMinActivateDate(): string {
  const now = new Date();
  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset + now.getTimezoneOffset() * 60 * 1000);
  const istHour = istNow.getHours();
  const daysToAdd = istHour >= 21 ? 2 : 1;
  const min = new Date(istNow);
  min.setDate(min.getDate() + daysToAdd);
  return min.toISOString().split('T')[0];
}

export function ManageSIPWidget({ preSelectedSipId, preSelectedAction, onActionComplete, onCreateSIP, userId }: ManageSIPWidgetProps) {
  const [sips, setSips] = useState<SIPRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo>({ current_page: 1, total_pages: 1, has_next_page: false, has_previous_page: false });
  const [expandedSip, setExpandedSip] = useState<string | null>(preSelectedSipId || null);
  const [confirmDialog, setConfirmDialog] = useState<{ sipId: string; subscriptionId: string; action: 'pause' | 'activate' | 'delete' } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);
  const [activateDate, setActivateDate] = useState('');
  const [activateDateError, setActivateDateError] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [banner, setBanner] = useState<FeedbackBanner | null>(null);

  const fetchSips = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const uid = userId || 'default';
      const res = await fetch(`${API_BASE_URL}/webhook/api/v1/sips?user_id=${uid}&page=${p}&limit=10`, { headers: getHeaders() });
      if (!res.ok) throw new Error(`Failed to fetch SIPs (${res.status})`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'API returned error');
      setSips(json.data || []);
      setPagination(json.pagination || { current_page: p, total_pages: 1, has_next_page: false, has_previous_page: false });
    } catch (e: any) {
      setError(e.message || 'Failed to load SIPs');
      setSips([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchSips(page); }, [page, fetchSips]);

  // Pre-select action from props
  useEffect(() => {
    if (preSelectedSipId && preSelectedAction && sips.length > 0) {
      const sip = sips.find(s => s.sip_id === preSelectedSipId);
      if (sip) setConfirmDialog({ sipId: sip.sip_id, subscriptionId: sip.subscription_id, action: preSelectedAction });
    }
  }, [preSelectedSipId, preSelectedAction, sips]);

  const handleAction = (sip: SIPRecord, action: 'pause' | 'activate' | 'delete') => {
    setDialogError(null);
    setActivateDate('');
    setActivateDateError(null);
    setConfirmDialog({ sipId: sip.sip_id, subscriptionId: sip.subscription_id, action });
  };

  const confirmAction = async () => {
    if (!confirmDialog) return;
    const { subscriptionId, action } = confirmDialog;

    if (action === 'activate') {
      const minDate = getMinActivateDate();
      if (!activateDate || activateDate < minDate) {
        setActivateDateError(`Date must be on or after ${minDate}`);
        return;
      }
    }

    setActionLoading(true);
    setDialogError(null);
    try {
      const actionMap: Record<string, string> = { pause: 'PAUSE', activate: 'ACTIVATE', delete: 'CANCEL' };
      const body: any = {
        user_id: userId || 'default',
        subscription_id: subscriptionId,
        action: actionMap[action],
      };
      if (action === 'activate') {
        body.next_scheduled_time = `${activateDate}T10:00:00+05:30`;
      }
      const res = await fetch(`${API_BASE_URL}/webhook/api/v1/sips/manage`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Action failed');

      const labels: Record<string, string> = { pause: 'paused', activate: 'activated', delete: 'cancelled' };
      setBanner({ type: 'success', message: `SIP ${labels[action]} successfully` });
      onActionComplete?.(confirmDialog.sipId, action);
      setConfirmDialog(null);
      fetchSips(page);
    } catch (e: any) {
      setDialogError(e.message || 'Something went wrong');
    } finally {
      setActionLoading(false);
    }
  };

  const handleVerify = async (sip: SIPRecord) => {
    setVerifyingId(sip.sip_id);
    try {
      const res = await fetch(`${API_BASE_URL}/webhook/api/v1/sips/status?subscription_id=${sip.subscription_id}`, { headers: getHeaders() });
      if (!res.ok) throw new Error(`Verify failed (${res.status})`);
      const json = await res.json();
      if (json.status?.toUpperCase() === 'ACTIVE') {
        setBanner({ type: 'success', message: `SIP ${sip.scheme_name} is now Active` });
      } else {
        setBanner({ type: 'info', message: `SIP status: ${json.status || 'Unknown'}` });
      }
      fetchSips(page);
    } catch (e: any) {
      setBanner({ type: 'error', message: e.message || 'Verification failed' });
    } finally {
      setVerifyingId(null);
    }
  };

  const sipInDialog = confirmDialog ? sips.find(s => s.sip_id === confirmDialog.sipId) : null;
  const activeCount = sips.filter(s => s.status?.toUpperCase() === 'ACTIVE').length;

  const bannerColors: Record<string, string> = {
    success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
    error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Your SIPs
            </span>
            <span className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">{activeCount} Active</Badge>
              {onCreateSIP && (
                <Button variant="outline" size="sm" className="text-xs h-7 px-2" onClick={onCreateSIP}>
                  <Plus className="w-3.5 h-3.5 mr-1" /> New SIP
                </Button>
              )}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {/* Feedback banner */}
          {banner && (
            <div className={cn('flex items-center justify-between rounded-lg border px-3 py-2 text-xs', bannerColors[banner.type])}>
              <span>{banner.message}</span>
              <button onClick={() => setBanner(null)} className="ml-2 shrink-0"><X className="w-3.5 h-3.5" /></button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="text-center py-6 space-y-2">
              <p className="text-sm text-destructive">{error}</p>
              <Button variant="outline" size="sm" onClick={() => fetchSips(page)}>
                <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retry
              </Button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && sips.length === 0 && (
            <div className="text-center py-8 space-y-3">
              <p className="text-sm text-muted-foreground">No SIPs found</p>
              {onCreateSIP && (
                <Button size="sm" onClick={onCreateSIP}>
                  <Plus className="w-3.5 h-3.5 mr-1" /> Create Your First SIP
                </Button>
              )}
            </div>
          )}

          {/* SIP List */}
          {!loading && !error && sips.map(sip => {
            const isExpanded = expandedSip === sip.sip_id;
            const status = sip.status?.toUpperCase();
            const cfg = statusConfig[status] || statusConfig.ACTIVE;

            return (
              <div key={sip.sip_id} className={cn(
                'rounded-lg border transition-all',
                status === 'PAUSED' ? 'border-amber-200 dark:border-amber-800' : 'border-border',
                isExpanded && 'shadow-sm'
              )}>
                {/* Summary row */}
                <button
                  onClick={() => setExpandedSip(isExpanded ? null : sip.sip_id)}
                  className="w-full text-left p-3 flex items-center gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{sip.scheme_name}</p>
                      <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap', cfg.color)}>
                        {cfg.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5"><IndianRupee className="w-3 h-3" />{sip.amount.toLocaleString()}/{sip.frequency?.toLowerCase() === 'monthly' ? 'mo' : sip.frequency?.toLowerCase() === 'quarterly' ? 'qtr' : sip.frequency?.toLowerCase()}</span>
                      {sip.next_due_date && <span>Next: {sip.next_due_date}</span>}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-border/50 pt-3 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-semibold text-foreground">₹{sip.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Frequency</p>
                        <p className="font-semibold text-foreground capitalize">{sip.frequency?.toLowerCase()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Start Date</p>
                        <p className="font-semibold text-foreground">{sip.start_date}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Next Due Date</p>
                        <p className="font-semibold text-foreground">{sip.next_due_date || '—'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Subscription ID</p>
                        <p className="font-semibold text-foreground font-mono text-[11px] truncate">{sip.subscription_id}</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-1">
                      {status === 'ACTIVE' && (
                        <>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:bg-amber-950/30 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-950/50 dark:hover:text-amber-300"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip, 'pause'); }}>
                            <Pause className="w-3.5 h-3.5 mr-1" /> Pause
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-red-300 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 dark:bg-red-950/30 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/50 dark:hover:text-red-300"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip, 'delete'); }}>
                            <Trash2 className="w-3.5 h-3.5 mr-1" /> Cancel
                          </Button>
                        </>
                      )}
                      {status === 'PAUSED' && (
                        <>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-green-300 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 dark:bg-green-950/30 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-950/50 dark:hover:text-green-300"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip, 'activate'); }}>
                            <Play className="w-3.5 h-3.5 mr-1" /> Activate
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-red-300 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 dark:bg-red-950/30 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/50 dark:hover:text-red-300"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip, 'delete'); }}>
                            <Trash2 className="w-3.5 h-3.5 mr-1" /> Cancel
                          </Button>
                        </>
                      )}
                      {(status === 'CREATED' || status === 'PENDING') && (
                        <>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-950/30 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
                            disabled={verifyingId === sip.sip_id}
                            onClick={(e) => { e.stopPropagation(); handleVerify(sip); }}>
                            {verifyingId === sip.sip_id ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5 mr-1" />} Verify
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-red-300 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 dark:bg-red-950/30 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/50 dark:hover:text-red-300"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip, 'delete'); }}>
                            <Trash2 className="w-3.5 h-3.5 mr-1" /> Cancel
                          </Button>
                        </>
                      )}
                      {/* CANCELLED: no actions */}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Pagination */}
          {!loading && !error && pagination.total_pages > 1 && (
            <div className="flex items-center justify-between pt-3">
              <Button variant="outline" size="sm" className="text-xs" disabled={!pagination.has_previous_page} onClick={() => setPage(p => p - 1)}>
                Previous
              </Button>
              <span className="text-xs text-muted-foreground">Page {pagination.current_page} of {pagination.total_pages}</span>
              <Button variant="outline" size="sm" className="text-xs" disabled={!pagination.has_next_page} onClick={() => setPage(p => p + 1)}>
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={!!confirmDialog} onOpenChange={open => { if (!open && !actionLoading) setConfirmDialog(null); }}>
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
                  : 'Your SIP will be reactivated and installments will resume from the selected date.'}
            </DialogDescription>
          </DialogHeader>

          {sipInDialog && (
            <div className="rounded-lg bg-muted/50 p-3 space-y-1.5">
              <p className="text-sm font-medium text-foreground">{sipInDialog.scheme_name}</p>
              <p className="text-xs text-muted-foreground">
                ₹{sipInDialog.amount.toLocaleString()} · {sipInDialog.frequency}
              </p>
            </div>
          )}

          {/* Date picker for Activate */}
          {confirmDialog?.action === 'activate' && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Next Scheduled Date</label>
              <Input
                type="date"
                min={getMinActivateDate()}
                value={activateDate}
                onChange={e => { setActivateDate(e.target.value); setActivateDateError(null); }}
                className="text-sm"
              />
              {activateDateError && <p className="text-xs text-destructive">{activateDateError}</p>}
              <p className="text-[11px] text-muted-foreground">Earliest date follows IST cutoff: before 9 PM = T+1, after 9 PM = T+2</p>
            </div>
          )}

          {/* Dialog error */}
          {dialogError && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 text-xs text-red-700 dark:text-red-400">
              {dialogError}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmDialog(null)} disabled={actionLoading}>Go Back</Button>
            <Button
              variant={confirmDialog?.action === 'delete' ? 'destructive' : 'default'}
              className={cn(confirmDialog?.action === 'activate' && 'bg-green-600 hover:bg-green-700 text-white')}
              onClick={confirmAction}
              disabled={actionLoading}
            >
              {actionLoading && <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />}
              {confirmDialog?.action === 'pause' ? 'Pause SIP' : confirmDialog?.action === 'activate' ? 'Activate SIP' : 'Cancel SIP'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
