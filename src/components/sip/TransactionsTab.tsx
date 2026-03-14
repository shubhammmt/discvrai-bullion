import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, ArrowDownLeft, Repeat, ArrowLeftRight, Filter, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  date: string;
  fundName: string;
  type: 'Buy' | 'SIP' | 'Sell' | 'Switch';
  amount: number;
  units: number;
  nav: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TX001', date: '2026-03-14', fundName: 'HDFC Large Cap Fund - Growth', type: 'SIP', amount: 5000, units: 5.936, nav: 842.35, status: 'Completed' },
  { id: 'TX002', date: '2026-03-12', fundName: 'Parag Parikh Flexi Cap Fund - Growth', type: 'Buy', amount: 25000, units: 344.59, nav: 72.56, status: 'Completed' },
  { id: 'TX003', date: '2026-03-10', fundName: 'SBI Small Cap Fund - Growth', type: 'SIP', amount: 3000, units: 20.17, nav: 148.72, status: 'Completed' },
  { id: 'TX004', date: '2026-03-08', fundName: 'Axis Bluechip Fund - Growth', type: 'Sell', amount: 15000, units: 287.65, nav: 52.18, status: 'Completed' },
  { id: 'TX005', date: '2026-03-05', fundName: 'HDFC Balanced Advantage Fund', type: 'Switch', amount: 50000, units: 121.14, nav: 412.56, status: 'Completed' },
  { id: 'TX006', date: '2026-03-01', fundName: 'HDFC Large Cap Fund - Growth', type: 'SIP', amount: 5000, units: 5.94, nav: 841.75, status: 'Completed' },
  { id: 'TX007', date: '2026-02-28', fundName: 'Kotak Emerging Equity Fund', type: 'Buy', amount: 10000, units: 103.93, nav: 96.22, status: 'Pending' },
  { id: 'TX008', date: '2026-02-15', fundName: 'SBI Small Cap Fund - Growth', type: 'SIP', amount: 3000, units: 20.24, nav: 148.22, status: 'Completed' },
  { id: 'TX009', date: '2026-02-14', fundName: 'HDFC Large Cap Fund - Growth', type: 'SIP', amount: 5000, units: 5.96, nav: 839.15, status: 'Failed' },
  { id: 'TX010', date: '2026-02-10', fundName: 'Nippon India Multi Cap Fund', type: 'Sell', amount: 8000, units: 34.16, nav: 234.18, status: 'Completed' },
];

const typeIcons: Record<string, typeof ArrowUpRight> = {
  Buy: ArrowUpRight,
  SIP: Repeat,
  Sell: ArrowDownLeft,
  Switch: ArrowLeftRight,
};

const typeColors: Record<string, string> = {
  Buy: 'text-green-600 bg-green-100 dark:bg-green-900/30',
  SIP: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
  Sell: 'text-red-500 bg-red-100 dark:bg-red-900/30',
  Switch: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
};

const statusColors: Record<string, string> = {
  Completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export function TransactionsTab() {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = MOCK_TRANSACTIONS.filter(tx => {
    if (filterType !== 'all' && tx.type !== filterType) return false;
    if (filterStatus !== 'all' && tx.status !== filterStatus) return false;
    return true;
  });

  const totalBuy = MOCK_TRANSACTIONS.filter(t => t.type === 'Buy' || t.type === 'SIP').reduce((s, t) => s + t.amount, 0);
  const totalSell = MOCK_TRANSACTIONS.filter(t => t.type === 'Sell').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Total Invested</p>
            <p className="text-lg font-bold text-foreground mt-1">₹{totalBuy.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Total Redeemed</p>
            <p className="text-lg font-bold text-foreground mt-1">₹{totalSell.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Transactions</p>
            <p className="text-lg font-bold text-foreground mt-1">{MOCK_TRANSACTIONS.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
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

          <div className="space-y-2">
            {filtered.map(tx => {
              const Icon = typeIcons[tx.type] || ArrowUpRight;
              return (
                <div key={tx.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0', typeColors[tx.type])}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate">{tx.fundName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{tx.date}</span>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <span className="text-[10px] text-muted-foreground">{tx.units.toFixed(3)} units @ ₹{tx.nav}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn('text-sm font-bold', tx.type === 'Sell' ? 'text-red-500' : 'text-foreground')}>
                      {tx.type === 'Sell' ? '-' : '+'}₹{tx.amount.toLocaleString()}
                    </p>
                    <Badge className={cn('text-[9px] mt-0.5', statusColors[tx.status])} variant="secondary">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No transactions found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
