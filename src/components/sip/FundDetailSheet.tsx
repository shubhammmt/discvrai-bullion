import { useState } from 'react';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  TrendingUp, Star, Shield, Info, Repeat, Zap,
  BarChart3, Building2, Calendar, AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MutualFund } from '@/data/sipMockData';

interface FundDetailSheetProps {
  fund: MutualFund | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvest?: (fund: MutualFund, mode: 'sip' | 'onetime') => void;
}

const riskColors: Record<string, string> = {
  'Low': 'text-green-600 bg-green-100 dark:bg-green-900/30',
  'Moderate': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
  'High': 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
  'Very High': 'text-red-600 bg-red-100 dark:bg-red-900/30',
};

export function FundDetailSheet({ fund, open, onOpenChange, onInvest }: FundDetailSheetProps) {
  if (!fund) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0">
        <div className="p-6 pb-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <SheetHeader className="text-left">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <SheetTitle className="text-base leading-snug">{fund.name}</SheetTitle>
                <SheetDescription className="mt-1 text-xs">
                  {fund.amc} • {fund.planType} Plan
                </SheetDescription>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-3.5 h-3.5',
                      i < fund.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge variant="secondary" className="text-[10px]">{fund.assetClass}</Badge>
              <Badge variant="outline" className="text-[10px]">{fund.category}</Badge>
              {fund.sector && fund.sector !== 'Diversified' && (
                <Badge variant="outline" className="text-[10px]">{fund.sector}</Badge>
              )}
              <Badge className={cn('text-[10px]', riskColors[fund.riskLevel])}>
                <Shield className="w-2.5 h-2.5 mr-0.5" />{fund.riskLevel} Risk
              </Badge>
            </div>
          </SheetHeader>
        </div>

        <div className="p-6 space-y-5">
          {/* NAV & AUM */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Current NAV</p>
              <p className="text-lg font-bold text-foreground">₹{fund.nav.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">AUM</p>
              <p className="text-lg font-bold text-foreground">₹{fund.aum.toLocaleString()} Cr</p>
            </div>
          </div>

          <Separator />

          {/* Returns */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Returns</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '1 Year', value: fund.returns1Y },
                { label: '3 Years', value: fund.returns3Y },
                { label: '5 Years', value: fund.returns5Y },
              ].map(r => (
                <div key={r.label} className="p-3 rounded-lg bg-muted/50 border border-border text-center">
                  <p className="text-[10px] text-muted-foreground">{r.label}</p>
                  <p className={cn(
                    'text-sm font-bold mt-0.5',
                    r.value >= 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {r.value > 0 ? '+' : ''}{r.value}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Key Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Key Details</h4>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <div>
                <p className="text-[10px] text-muted-foreground">Expense Ratio</p>
                <p className="font-medium text-foreground">{fund.expenseRatio}%</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Benchmark</p>
                <p className="font-medium text-foreground text-xs">{fund.benchmark}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Min SIP</p>
                <p className="font-medium text-foreground">₹{fund.minSIPAmount}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Min Lumpsum</p>
                <p className="font-medium text-foreground">₹{fund.minLumpsumAmount.toLocaleString()}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <AlertTriangle className="w-2.5 h-2.5" /> Exit Load
                </p>
                <p className="font-medium text-foreground text-xs">{fund.exitLoad}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Invest CTAs */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Invest Now</h4>
            </div>

            {/* SIP promoted */}
            <button
              onClick={() => onInvest?.(fund, 'sip')}
              className="w-full p-4 rounded-xl border-2 border-primary bg-primary/5 transition-all hover:bg-primary/10 text-left space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Repeat className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Start SIP</span>
                </div>
                <Badge className="text-[9px] bg-primary text-primary-foreground">RECOMMENDED</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                Build wealth with disciplined monthly investing — start from ₹{fund.minSIPAmount}/month
              </p>
            </button>

            <button
              onClick={() => onInvest?.(fund, 'onetime')}
              className="w-full p-4 rounded-xl border border-border transition-all hover:border-primary/40 hover:bg-primary/5 text-left space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">One-Time Investment</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                Invest a lump sum — minimum ₹{fund.minLumpsumAmount.toLocaleString()}
              </p>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
