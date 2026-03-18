import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, IndianRupee, BarChart3, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MOCK_SIPS, MOCK_FUNDS } from '@/data/sipMockData';
import { cn } from '@/lib/utils';
import { SIPBrandLogo } from './SIPBrandLogo';
import { SIP_ALLOCATION_COLORS } from '@/config/sipBrandConfig';

function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return `₹${value.toLocaleString('en-IN')}`;
}

export function PortfolioTab({ onInvest }: { onInvest?: () => void }) {
  const [view, setView] = useState<'card' | 'table'>('card');

  const totalInvested = MOCK_SIPS.reduce((s, sip) => s + sip.totalInvested, 0);
  const totalValue = MOCK_SIPS.reduce((s, sip) => s + sip.currentValue, 0);
  const totalReturns = totalValue - totalInvested;
  const returnPct = totalInvested > 0 ? ((totalReturns / totalInvested) * 100) : 0;
  const isPositive = totalReturns >= 0;

  const benchmarks = [
    { name: 'Your Returns', value: returnPct, desc: 'Portfolio performance', isPositive: returnPct >= 0 },
    { name: 'Benchmark', value: -1.38, desc: 'Weighted benchmark return', isPositive: false },
    { name: 'NIFTY 50', value: 12.0, desc: 'Market index performance', isPositive: true },
  ];

  const holdings = MOCK_SIPS.map(sip => {
    const fund = MOCK_FUNDS.find(f => f.code === sip.fundCode);
    const ret = ((sip.currentValue - sip.totalInvested) / sip.totalInvested) * 100;
    return { ...sip, fund, returnPct: ret };
  });

  const allocationMap: Record<string, number> = {};
  holdings.forEach(h => {
    const cls = h.fund?.assetClass || 'Other';
    allocationMap[cls] = (allocationMap[cls] || 0) + h.currentValue;
  });
  const allocations = Object.entries(allocationMap).map(([cls, val]) => ({
    name: cls,
    value: val,
    pct: ((val / totalValue) * 100).toFixed(1),
  }));

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <SIPBrandLogo size="md" />
            <div>
              <p className="text-sm font-bold text-sip-text-primary">Your Portfolio</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sip-success animate-pulse" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Live Updates</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-0 divide-x divide-border">
            <div className="pr-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Invested Value</p>
              <p className="text-xl font-bold text-foreground mt-1">{formatINR(totalInvested)}</p>
            </div>
            <div className="px-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Current Value</p>
              <p className="text-xl font-bold text-sip-brand mt-1">{formatINR(totalValue)}</p>
            </div>
            <div className="pl-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Returns</p>
              <p className={cn('text-xl font-bold mt-1', isPositive ? 'text-sip-success' : 'text-sip-error')}>
                {formatINR(Math.abs(totalReturns))}
              </p>
              <p className={cn('text-xs font-semibold', isPositive ? 'text-sip-success' : 'text-sip-error')}>
                {isPositive ? '+' : ''}{returnPct.toFixed(2)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sip-brand" />
              Performance Analytics
            </span>
            <div className="flex items-center gap-2">
              <Badge variant={view === 'card' ? 'default' : 'outline'} className="text-[10px] cursor-pointer" onClick={() => setView('card')}>
                Card View
              </Badge>
              <Badge variant="outline" className="text-[10px] text-sip-action-warning-foreground border-sip-action-warning-border">
                Trailing NIFTY 50
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {benchmarks.map(b => (
              <div key={b.name} className="rounded-lg border border-border p-3 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{b.name}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {b.value >= 0 ? (
                    <TrendingUp className={cn('w-3.5 h-3.5', b.isPositive ? 'text-sip-success' : 'text-sip-error')} />
                  ) : (
                    <TrendingDown className={cn('w-3.5 h-3.5', b.isPositive ? 'text-sip-success' : 'text-sip-error')} />
                  )}
                  <span className={cn('text-lg font-bold', b.isPositive ? 'text-sip-success' : 'text-sip-error')}>
                    {b.value >= 0 ? '+' : ''}{b.value.toFixed(2)}%
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border p-3 space-y-2">
            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
              📊 Performance Summary
            </p>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sip-alloc-equity" />
                <span className="text-sm text-foreground">vs Weighted Benchmark</span>
              </div>
              <span className="text-sm font-bold text-sip-success">↑ {(returnPct + 1.38).toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sip-alloc-other" />
                <span className="text-sm text-foreground">vs Nifty 50</span>
              </div>
              <span className={cn('text-sm font-bold', returnPct - 12 >= 0 ? 'text-sip-success' : 'text-sip-error')}>
                {returnPct - 12 >= 0 ? '↑' : '↓'} {Math.abs(returnPct - 12).toFixed(2)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <PieChart className="w-4 h-4 text-sip-brand" />
            Holdings ({holdings.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {holdings.map(h => (
            <div key={h.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{h.fundName}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="outline" className="text-[9px]">{h.fund?.assetClass}</Badge>
                  <span className="text-[10px] text-muted-foreground">{h.units.toFixed(2)} units</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{formatINR(h.currentValue)}</p>
                <p className={cn('text-[10px] font-medium', h.returnPct >= 0 ? 'text-sip-success' : 'text-sip-error')}>
                  {h.returnPct >= 0 ? '+' : ''}{h.returnPct.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex rounded-full h-3 overflow-hidden mb-3">
            {allocations.map(a => {
              const token = SIP_ALLOCATION_COLORS[a.name] || 'sip-alloc-other';
              return (
                <div key={a.name} className="h-full"
                  style={{ width: `${a.pct}%`, backgroundColor: `hsl(var(--${token.replace('sip-', 'sip-')}))` }} />
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {allocations.map(a => {
              const token = SIP_ALLOCATION_COLORS[a.name] || 'sip-alloc-other';
              return (
                <div key={a.name} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: `hsl(var(--${token.replace('sip-', 'sip-')}))` }} />
                  <span className="text-muted-foreground">{a.name}</span>
                  <span className="font-semibold text-foreground ml-auto">{a.pct}%</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {onInvest && (
        <Button className="w-full" onClick={onInvest}>
          + Add Investment
        </Button>
      )}
    </div>
  );
}
