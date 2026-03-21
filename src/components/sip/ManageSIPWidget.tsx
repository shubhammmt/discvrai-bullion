import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pause, Play, Trash2, AlertTriangle, IndianRupee, Calendar, ChevronDown, ChevronUp, Plus, Loader2, RefreshCw, ShieldCheck, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SIPStatusBadge, bannerStyles } from './SIPStatusBadge';

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
  statusFilter?: string;
  compact?: boolean;
}

type SIPAction = 'pause' | 'activate' | 'delete' | 'verify';

function getHeaders() {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (API_TOKEN) h['Authorization'] = `Bearer ${API_TOKEN}`;
  return h;
}

function getMinActivateDate(): string {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset + now.getTimezoneOffset() * 60 * 1000);
  const istHour = istNow.getHours();
  const daysToAdd = istHour >= 21 ? 2 : 1;
  const min = new Date(istNow);
  min.setDate(min.getDate() + daysToAdd);
  return min.toISOString().split('T')[0];
}

export function ManageSIPWidget({ preSelectedSipId, preSelectedAction, onActionComplete, onCreateSIP, userId, statusFilter, compact }: ManageSIPWidgetProps) {
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

  const MOCK_SIPS_DATA: SIPRecord[] = [
    { sip_id: 'sip_001', subscription_id: 'SUB_001_HDFC', scheme_code: 'HDFC_LC_001', scheme_name: 'HDFC Large Cap Fund - Growth', amount: 5000, frequency: 'Monthly', status: 'ACTIVE', start_date: '2023-01-15', next_due_date: '2026-04-15', created_at: '2023-01-10' },
    { sip_id: 'sip_002', subscription_id: 'SUB_002_SBI', scheme_code: 'SBI_SC_001', scheme_name: 'SBI Small Cap Fund - Growth', amount: 3000, frequency: 'Monthly', status: 'ACTIVE', start_date: '2023-06-01', next_due_date: '2026-04-01', created_at: '2023-05-25' },
    { sip_id: 'sip_003', subscription_id: 'SUB_003_AXIS', scheme_code: 'AXIS_BC_001', scheme_name: 'Axis Bluechip Fund - Growth', amount: 10000, frequency: 'Monthly', status: 'PAUSED', start_date: '2022-09-10', next_due_date: '', created_at: '2022-09-05' },
    { sip_id: 'sip_004', subscription_id: 'SUB_004_PPFAS', scheme_code: 'PPFAS_FC_001', scheme_name: 'Parag Parikh Flexi Cap Fund - Growth', amount: 2000, frequency: 'Quarterly', status: 'ACTIVE', start_date: '2024-01-01', next_due_date: '2026-04-01', created_at: '2023-12-20' },
    { sip_id: 'sip_005', subscription_id: 'SUB_005_MIRAE', scheme_code: 'MIRAE_EL_001', scheme_name: 'Mirae Asset Emerging Bluechip Fund - Growth', amount: 7500, frequency: 'Monthly', status: 'CREATED', start_date: '2026-04-01', next_due_date: '2026-04-01', created_at: '2026-03-18' },
  ];

  const fetchSips = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      if (!API_BASE_URL) {
        setSips(MOCK_SIPS_DATA);
        setPagination({ current_page: 1, total_pages: 1, has_next_page: false, has_previous_page: false });
        return;
      }
      const uid = userId || 'default';
      const res = await fetch(`${API_BASE_URL}/webhook/api/v1/sips?user_id=${uid}&page=${p}&limit=10`, { headers: getHeaders() });
      if (!res.ok) throw new Error(`Failed to fetch SIPs (${res.status})`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'API returned error');
      setSips(json.data || []);
      setPagination(json.pagination || { current_page: p, total_pages: 1, has_next_page: false, has_previous_page: false });
    } catch (e: any) {
      setSips(MOCK_SIPS_DATA);
      setPagination({ current_page: 1, total_pages: 1, has_next_page: false, has_previous_page: false });
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchSips(page); }, [page, fetchSips]);

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
  const filteredSips = statusFilter ? sips.filter(s => s.status?.toUpperCase() === statusFilter.toUpperCase()) : sips;
  const activeCount = sips.filter(s => s.status?.toUpperCase() === 'ACTIVE').length;

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sip-brand" />
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
            <div className={cn('flex items-center justify-between rounded-lg border px-3 py-2 text-xs', bannerStyles[banner.type])}>
              <span>{banner.message}</span>
              <button onClick={() => setBanner(null)} className="ml-2 shrink-0"><X className="w-3.5 h-3.5" /></button>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-6 space-y-2">
              <p className="text-sm text-destructive">{error}</p>
              <Button variant="outline" size="sm" onClick={() => fetchSips(page)}>
                <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retry
              </Button>
            </div>
          )}

          {!loading && !error && filteredSips.length === 0 && (
            <div className="text-center py-8 space-y-3">
              <p className="text-sm text-muted-foreground">
                {statusFilter ? `No ${statusFilter.toLowerCase()} SIPs found` : 'No SIPs found'}
              </p>
              {onCreateSIP && !statusFilter && (
                <Button size="sm" onClick={onCreateSIP}>
                  <Plus className="w-3.5 h-3.5 mr-1" /> Create Your First SIP
                </Button>
              )}
            </div>
          )}

          {!loading && !error && filteredSips.map(sip => {
            const isExpanded = expandedSip === sip.sip_id;
            const status = sip.status?.toUpperCase();

            return (
              <div key={sip.sip_id} className={cn(
                'rounded-lg border transition-all',
                status === 'PAUSED' ? 'border-sip-action-warning-border' : 'border-border',
                isExpanded && 'shadow-sm'
              )}>
                <button
                  onClick={() => setExpandedSip(isExpanded ? null : sip.sip_id)}
                  className="w-full text-left p-3 flex items-center gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{sip.scheme_name}</p>
                      <SIPStatusBadge status={status} />
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5"><IndianRupee className="w-3 h-3" />{sip.amount.toLocaleString()}/{sip.frequency?.toLowerCase() === 'monthly' ? 'mo' : sip.frequency?.toLowerCase() === 'quarterly' ? 'qtr' : sip.frequency?.toLowerCase()}</span>
                      {sip.next_due_date && <span>Next: {sip.next_due_date}</span>}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-border/50 pt-3 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Scheme Name</p>
                        <p className="font-semibold text-foreground truncate">{sip.scheme_name}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-semibold text-foreground">₹{sip.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Frequency</p>
                        <p className="font-semibold text-foreground capitalize">{sip.frequency?.toLowerCase()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className="font-semibold text-foreground capitalize">{sip.status?.toLowerCase()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Created At</p>
                        <p className="font-semibold text-foreground">{sip.created_at || '—'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Start Date</p>
                        <p className="font-semibold text-foreground">{sip.start_date || '—'}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      {status === 'ACTIVE' && (
                        <>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-sip-action-warning-border bg-sip-action-warning-light text-sip-action-warning-foreground hover:bg-sip-action-warning-light/80"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip, 'pause'); }}>
                            <Pause className="w-3.5 h-3.5 mr-1" /> Pause
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-sip-action-danger-border bg-sip-action-danger-light text-sip-action-danger-foreground hover:bg-sip-action-danger-light/80"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip, 'delete'); }}>
                            <Trash2 className="w-3.5 h-3.5 mr-1" /> Cancel
                          </Button>
                        </>
                      )}
                      {status === 'PAUSED' && (
                        <>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-sip-action-success-border bg-sip-action-success-light text-sip-action-success-foreground hover:bg-sip-action-success-light/80"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip, 'activate'); }}>
                            <Play className="w-3.5 h-3.5 mr-1" /> Activate
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-sip-action-danger-border bg-sip-action-danger-light text-sip-action-danger-foreground hover:bg-sip-action-danger-light/80"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip, 'delete'); }}>
                            <Trash2 className="w-3.5 h-3.5 mr-1" /> Cancel
                          </Button>
                        </>
                      )}
                      {(status === 'CREATED' || status === 'PENDING') && (
                        <>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-sip-action-info-border bg-sip-action-info-light text-sip-action-info-foreground hover:bg-sip-action-info-light/80"
                            disabled={verifyingId === sip.sip_id}
                            onClick={(e) => { e.stopPropagation(); handleVerify(sip); }}>
                            {verifyingId === sip.sip_id ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5 mr-1" />} Verify
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-sip-action-danger-border bg-sip-action-danger-light text-sip-action-danger-foreground hover:bg-sip-action-danger-light/80"
                            onClick={(e) => { e.stopPropagation(); handleAction(sip, 'delete'); }}>
                            <Trash2 className="w-3.5 h-3.5 mr-1" /> Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

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
              {confirmDialog?.action === 'pause' && <Pause className="w-5 h-5 text-sip-action-warning" />}
              {confirmDialog?.action === 'activate' && <Play className="w-5 h-5 text-sip-action-success" />}
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

          {dialogError && (
            <div className={cn('rounded-lg border px-3 py-2 text-xs', bannerStyles.error)}>
              {dialogError}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmDialog(null)} disabled={actionLoading}>Go Back</Button>
            <Button
              variant={confirmDialog?.action === 'delete' ? 'destructive' : 'default'}
              className={cn(confirmDialog?.action === 'activate' && 'bg-sip-action-confirm text-sip-action-confirm-foreground hover:bg-sip-action-confirm/90')}
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
