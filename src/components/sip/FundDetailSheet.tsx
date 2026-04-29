import { useState, useEffect } from 'react';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  TrendingUp, Shield, Info, Repeat, Zap,
  BarChart3, AlertTriangle, PieChart, Briefcase, FileText,
  Loader2, Bell, Heart, Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MutualFund } from '@/data/sipMockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { trackedStore, useTracked } from '@/lib/trackedStore';
import { toast } from '@/hooks/use-toast';

interface FundDetailSheetProps {
  fund: MutualFund | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvest?: (fund: MutualFund, mode: 'sip' | 'onetime') => void;
}

const riskColors: Record<string, string> = {
  'Low': 'text-sip-action-success-foreground bg-sip-action-success-light',
  'Moderate': 'text-sip-action-warning-foreground bg-sip-action-warning-light',
  'High': 'text-sip-action-danger-foreground bg-sip-action-danger-light',
  'Very High': 'text-sip-action-danger-foreground bg-sip-action-danger-light',
};

interface ApiFundData {
  success: boolean;
  fund_data: {
    basic_info: {
      fund_identifiers: { mf_schcode: number; scheme_name: string };
      investment_objective?: string;
      amc_details: { amc_name: string };
      fund_classification: { main_category: string; risk_level: string };
      plan_details: { plan_type: string };
    };
    performance: {
      current_nav: { price: number };
      returns: { ret_1year: number; ret_3year: number; ret_5year: number };
      benchmark: { benchmark_name: string };
    };
    fund_structure: {
      expenses: { total_expense_ratio: number; exit_load: string };
      investment_details: { sip_minimum: number; lumpsum_minimum: number | null };
      aum_information: { current_aum: number };
    };
    portfolio: {
      top_holdings: {
        equity_holdings: Array<{ company_name: string; percentage_holding: number; sector: string }>;
        total_holdings_count: number;
      };
      sector_allocation: {
        sectors: Record<string, number>;
      };
    };
  } | null;
}

export function FundDetailSheet({ fund, open, onOpenChange, onInvest }: FundDetailSheetProps) {
  const [apiData, setApiData] = useState<ApiFundData | null>(null);
  const [loading, setLoading] = useState(false);
  const [alertPct, setAlertPct] = useState('5');
  useTracked(); // re-render on store changes

  useEffect(() => {
    if (!open || !fund) {
      setApiData(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const fundId = '10';
        const res = await fetch(`https://agentapi.discvr.ai/webhook/fund-details?fund_id=${fundId}`);
        if (res.ok) {
          const data = await res.json();
          setApiData(data);
        }
      } catch (e) {
        console.error('Failed to fetch fund details:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [open, fund]);

  if (!fund) return null;

  const fd = apiData?.fund_data;

  // Use API data when available, fallback to local fund prop
  const schemeName = fd?.basic_info.fund_identifiers.scheme_name ?? fund.name;
  const amcName = fd?.basic_info.amc_details.amc_name ?? fund.amc;
  const mainCategory = fd?.basic_info.fund_classification.main_category ?? fund.category;
  const riskLevel = fd?.basic_info.fund_classification.risk_level ?? fund.riskLevel;
  const planType = fd?.basic_info.plan_details.plan_type ?? fund.planType;
  const nav = fd?.performance.current_nav.price ?? fund.nav;
  const aum = fd?.fund_structure.aum_information.current_aum ?? fund.aum;
  const ret1Y = fd?.performance.returns.ret_1year ?? fund.returns1Y;
  const ret3Y = fd?.performance.returns.ret_3year ?? fund.returns3Y;
  const ret5Y = fd?.performance.returns.ret_5year ?? fund.returns5Y;
  const benchmark = fd?.performance.benchmark.benchmark_name ?? fund.benchmark;
  const expenseRatio = fd?.fund_structure.expenses.total_expense_ratio ?? fund.expenseRatio;
  const exitLoad = fd?.fund_structure.expenses.exit_load ?? fund.exitLoad;
  const minSIP = fd?.fund_structure.investment_details.sip_minimum ?? fund.minSIPAmount;
  const minLumpsum = fd?.fund_structure.investment_details.lumpsum_minimum ?? fund.minLumpsumAmount;
  const description = fd?.basic_info.investment_objective;
  const holdings = fd?.portfolio.top_holdings.equity_holdings ?? [];
  const sectors = fd?.portfolio.sector_allocation.sectors ?? {};
  const topSectors = Object.entries(sectors).slice(0, 6);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto pb-4">
          {/* Header */}
          <div className="p-6 pb-4 bg-gradient-to-br from-primary/5 to-accent/5">
            <SheetHeader className="text-left">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-base leading-snug">{schemeName}</SheetTitle>
                  <SheetDescription className="mt-1 text-xs">
                    {amcName} • {planType} Plan
                  </SheetDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <Badge variant="secondary" className="text-[10px]">{mainCategory}</Badge>
                <Badge className={cn('text-[10px]', riskColors[riskLevel] || riskColors['High'])}>
                  <Shield className="w-2.5 h-2.5 mr-0.5" />{riskLevel} Risk
                </Badge>
              </div>
            </SheetHeader>
          </div>

          {loading ? (
            <div className="p-6 space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : (
            <div className="p-6 space-y-5">
              {/* NAV & AUM */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Current NAV</p>
                  <p className="text-lg font-bold text-foreground">₹{nav.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">AUM</p>
                  <p className="text-lg font-bold text-foreground">₹{aum.toLocaleString()} Cr</p>
                </div>
              </div>

              {/* Investment Objective / Description */}
              {description && (
                <>
                  <Separator />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-primary" />
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Description</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </>
              )}

              <Separator />

              {/* Returns */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Returns</h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: '1 Year', value: ret1Y },
                    { label: '3 Years', value: ret3Y },
                    { label: '5 Years', value: ret5Y },
                  ].map(r => (
                    <div key={r.label} className="p-3 rounded-lg bg-muted/50 border border-border text-center">
                      <p className="text-[10px] text-muted-foreground">{r.label}</p>
                      <p className={cn(
                        'text-sm font-bold mt-0.5',
                        r.value >= 0 ? 'text-sip-success' : 'text-sip-error'
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
                    <p className="font-medium text-foreground">{expenseRatio}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Benchmark</p>
                    <p className="font-medium text-foreground text-xs">{benchmark}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Min SIP</p>
                    <p className="font-medium text-foreground">₹{minSIP}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Min Lumpsum</p>
                    <p className="font-medium text-foreground">{minLumpsum != null ? `₹${minLumpsum.toLocaleString()}` : '—'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <AlertTriangle className="w-2.5 h-2.5" /> Exit Load
                    </p>
                    <p className="font-medium text-foreground text-xs">{exitLoad}</p>
                  </div>
                </div>
              </div>

              {/* Top Holdings */}
              {holdings.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Top Holdings</h4>
                    </div>
                    <div className="space-y-1.5">
                      {holdings.slice(0, 5).map((h, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/40 border border-border">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-foreground truncate">{h.company_name}</p>
                            <p className="text-[10px] text-muted-foreground">{h.sector}</p>
                          </div>
                          <span className="text-xs font-bold text-foreground shrink-0 ml-2">{h.percentage_holding.toFixed(2)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Sector Allocation */}
              {topSectors.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <PieChart className="w-4 h-4 text-primary" />
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Sector Allocation</h4>
                    </div>
                    <div className="space-y-2">
                      {topSectors.map(([sector, pct]) => (
                        <div key={sector} className="space-y-0.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground truncate mr-2">{sector}</span>
                            <span className="font-medium text-foreground shrink-0">{pct.toFixed(1)}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary/70"
                              style={{ width: `${Math.min(pct * 2.5, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Sticky Invest CTAs — always visible at bottom */}
        {onInvest && (
          <div className="border-t border-border bg-background p-4 space-y-2 shrink-0">
            <button
              onClick={() => onInvest(fund, 'sip')}
              className="w-full p-3 rounded-xl border-2 border-primary bg-primary/5 transition-all hover:bg-primary/10 text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Repeat className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-foreground">Start SIP</span>
                  <p className="text-[10px] text-muted-foreground">From ₹{minSIP}/mo • Build wealth systematically</p>
                </div>
              </div>
              <Badge className="text-[8px] bg-primary text-primary-foreground shrink-0">RECOMMENDED</Badge>
            </button>

            <button
              onClick={() => onInvest(fund, 'onetime')}
              className="w-full p-3 rounded-xl border border-border transition-all hover:border-primary/40 hover:bg-primary/5 text-left flex items-center gap-2"
            >
              <Zap className="w-5 h-5 text-muted-foreground shrink-0" />
              <div>
                <span className="text-sm font-semibold text-foreground">One-Time</span>
                <p className="text-[10px] text-muted-foreground">{minLumpsum != null ? `Min ₹${minLumpsum.toLocaleString()}` : 'Invest now'}</p>
              </div>
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
