import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, IndianRupee, BarChart3, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MOCK_SIPS, MOCK_FUNDS } from '@/data/sipMockData';
import { cn } from '@/lib/utils';

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

  // Benchmark mock data
  const benchmarks = [
    { name: 'Your Returns', value: returnPct, desc: 'Portfolio performance', color: returnPct >= 0 ? 'text-green-600' : 'text-red-500' },
    { name: 'Benchmark', value: -1.38, desc: 'Weighted benchmark return', color: 'text-red-500' },
    { name: 'NIFTY 50', value: 12.0, desc: 'Market index performance', color: 'text-green-600' },
  ];

  // Holdings breakdown from SIPs
  const holdings = MOCK_SIPS.map(sip => {
    const fund = MOCK_FUNDS.find(f => f.code === sip.fundCode);
    const ret = ((sip.currentValue - sip.totalInvested) / sip.totalInvested) * 100;
    return {
      ...sip,
      fund,
      returnPct: ret,
    };
  });

  // Asset allocation
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

  const allocationColors: Record<string, string> = {
    Equity: 'bg-blue-500',
    Debt: 'bg-emerald-500',
    Hybrid: 'bg-amber-500',
    Other: 'bg-purple-500',
    'Solution Oriented': 'bg-rose-500',
  };

  return (
    <div className="space-y-4">
      {/* Hero Summary */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg font-bold text-foreground">Your Portfolio</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Live Updates</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground uppercase">Net Worth</p>
          <p className="text-lg font-bold text-primary">{formatINR(totalValue)}</p>
        </div>
      </div>

      {/* Value Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Invested Value</p>
            <p className="text-xl font-bold text-foreground mt-1">{formatINR(totalInvested)}</p>
          </CardContent>
        </Card>
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 opacity-80" />
            </div>
            <p className="text-[10px] uppercase tracking-wider opacity-80">Current Value</p>
            <p className="text-xl font-bold mt-1">{formatINR(totalValue)}</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Returns</p>
            <p className="text-xl font-bold text-foreground mt-1">
              {formatINR(Math.abs(totalReturns))}
            </p>
            <p className={cn('text-xs font-semibold', isPositive ? 'text-green-600' : 'text-red-500')}>
              {isPositive ? '+' : ''}{returnPct.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Performance Analytics
            </span>
            <div className="flex items-center gap-2">
              <Badge variant={view === 'card' ? 'default' : 'outline'} className="text-[10px] cursor-pointer" onClick={() => setView('card')}>
                Card View
              </Badge>
              <Badge variant="outline" className="text-[10px] text-orange-600 border-orange-300">
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
                    <TrendingUp className={cn('w-3.5 h-3.5', b.color)} />
                  ) : (
                    <TrendingDown className={cn('w-3.5 h-3.5', b.color)} />
                  )}
                  <span className={cn('text-lg font-bold', b.color)}>
                    {b.value >= 0 ? '+' : ''}{b.value.toFixed(2)}%
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Performance Summary */}
          <div className="rounded-lg border border-border p-3 space-y-2">
            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
              📊 Performance Summary
            </p>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm text-foreground">vs Weighted Benchmark</span>
              </div>
              <span className="text-sm font-bold text-green-600">↑ {(returnPct + 1.38).toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-sm text-foreground">vs Nifty 50</span>
              </div>
              <span className={cn('text-sm font-bold', returnPct - 12 >= 0 ? 'text-green-600' : 'text-red-500')}>
                {returnPct - 12 >= 0 ? '↑' : '↓'} {Math.abs(returnPct - 12).toFixed(2)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Holdings */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <PieChart className="w-4 h-4 text-primary" />
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
                <p className={cn('text-[10px] font-medium', h.returnPct >= 0 ? 'text-green-600' : 'text-red-500')}>
                  {h.returnPct >= 0 ? '+' : ''}{h.returnPct.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Asset Allocation */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex rounded-full h-3 overflow-hidden mb-3">
            {allocations.map(a => (
              <div key={a.name} className={cn('h-full', allocationColors[a.name] || 'bg-muted')}
                style={{ width: `${a.pct}%` }} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {allocations.map(a => (
              <div key={a.name} className="flex items-center gap-2 text-sm">
                <span className={cn('w-3 h-3 rounded-sm', allocationColors[a.name] || 'bg-muted')} />
                <span className="text-muted-foreground">{a.name}</span>
                <span className="font-semibold text-foreground ml-auto">{a.pct}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      {onInvest && (
        <Button className="w-full" onClick={onInvest}>
          + Add Investment
        </Button>
      )}
    </div>
  );
}
