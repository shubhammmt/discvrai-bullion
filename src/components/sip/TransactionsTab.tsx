import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, ArrowDownLeft, Repeat, ArrowLeftRight, Filter, Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SIPStatusBadge, txTypeColors } from './SIPStatusBadge';
import { API_CONFIG, getApiToken } from '@/config/api';

interface APITransaction {
  order_id: string;
  subscription_id: string | null;
  scheme_code: string;
  scheme_name: string | null;
  txn_type: 'LUMPSUM' | 'SELL' | 'SIP' | string;
  amount: string;
  units: string | null;
  status: 'SUCCESS' | 'PENDING' | 'FAILED' | string;
  failure_reason: string | null;
  created_at: string;
}

interface Transaction {
  id: string;
  date: string;
  fundName: string;
  type: 'Buy' | 'SIP' | 'Sell' | 'Switch';
  amount: number;
  units: number | null;
  status: 'Completed' | 'Pending' | 'Failed';
}

function mapTxnType(txnType: string): 'Buy' | 'SIP' | 'Sell' | 'Switch' {
  switch (txnType.toUpperCase()) {
    case 'LUMPSUM': return 'Buy';
    case 'SIP': return 'SIP';
    case 'SELL': return 'Sell';
    case 'SWITCH': return 'Switch';
    default: return 'Buy';
  }
}

function mapStatus(status: string): 'Completed' | 'Pending' | 'Failed' {
  switch (status.toUpperCase()) {
    case 'SUCCESS': return 'Completed';
    case 'PENDING': return 'Pending';
    case 'FAILED': return 'Failed';
    default: return 'Pending';
  }
}

function mapAPITransaction(api: APITransaction): Transaction {
  return {
    id: api.order_id,
    date: new Date(api.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
    fundName: api.scheme_name || `Scheme ${api.scheme_code}`,
    type: mapTxnType(api.txn_type),
    amount: parseFloat(api.amount),
    units: api.units ? parseFloat(api.units) : null,
    status: mapStatus(api.status),
  };
}

const typeIcons: Record<string, typeof ArrowUpRight> = {
  Buy: ArrowUpRight,
  SIP: Repeat,
  Sell: ArrowDownLeft,
  Switch: ArrowLeftRight,
};

export function TransactionsTab() {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = localStorage.getItem('discvr_user_id') || 'a7ca0dcf-3c88-45c6-b4ac-e40fde319956';
        const token = getApiToken();
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(
          `https://agentapi.discvr.ai/webhook/transaction-history?user_id=${userId}`,
          { headers }
        );
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.transactions)) {
          setTransactions(data.transactions.map(mapAPITransaction));
        } else {
          throw new Error('Invalid response');
        }
      } catch (e: any) {
        setError(e.message || 'Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filtered = transactions.filter(tx => {
    if (filterType !== 'all' && tx.type !== filterType) return false;
    if (filterStatus !== 'all' && tx.status !== filterStatus) return false;
    return true;
  });

  const totalBuy = transactions.filter(t => t.type === 'Buy' || t.type === 'SIP').reduce((s, t) => s + t.amount, 0);
  const totalSell = transactions.filter(t => t.type === 'Sell').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Total Invested</p>
            <p className="text-lg font-bold text-foreground mt-1">₹{totalBuy.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Total Redeemed</p>
            <p className="text-lg font-bold text-foreground mt-1">₹{totalSell.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Transactions</p>
            <p className="text-lg font-bold text-foreground mt-1">{transactions.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-sip-brand" />
              Transaction History
            </span>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
              <Download className="w-3 h-3" /> Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="text-xs h-8 w-auto">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Buy">Buy</SelectItem>
                <SelectItem value="SIP">SIP</SelectItem>
                <SelectItem value="Sell">Sell</SelectItem>
                <SelectItem value="Switch">Switch</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="text-xs h-8 w-auto">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-sip-brand" />
              <span className="ml-2 text-sm text-muted-foreground">Loading transactions…</span>
            </div>
          ) : error ? (
            <p className="text-sm text-sip-error text-center py-8">{error}</p>
          ) : (
            <div className="space-y-2">
              {filtered.map(tx => {
                const Icon = typeIcons[tx.type] || ArrowUpRight;
                return (
                  <div key={tx.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0', txTypeColors[tx.type])}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground truncate">{tx.fundName}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">{tx.date}</span>
                        {tx.units != null && (
                          <>
                            <span className="text-[10px] text-muted-foreground">•</span>
                            <span className="text-[10px] text-muted-foreground">{tx.units.toFixed(4)} units</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={cn('text-sm font-bold', tx.type === 'Sell' ? 'text-sip-error' : 'text-foreground')}>
                        {tx.type === 'Sell' ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </p>
                      <Badge className={cn('text-[9px] mt-0.5')} variant="secondary">
                        <SIPStatusBadge status={tx.status} className="px-0 py-0 bg-transparent" />
                      </Badge>
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No transactions found</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
