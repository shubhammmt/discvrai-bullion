import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Star, Shield, Percent, Sparkles, ArrowRight, Flame } from 'lucide-react';
import { MOCK_FUNDS, MutualFund } from '@/data/sipMockData';
import { cn } from '@/lib/utils';

interface DiscoverySectionProps {
  onSelectFund?: (fund: MutualFund) => void;
  onViewAll?: (category: string) => void;
}

interface FundCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof TrendingUp;
  color: string;
  badge?: string;
  funds: MutualFund[];
}

export function DiscoverySection({ onSelectFund, onViewAll }: DiscoverySectionProps) {
  const topPerformers = [...MOCK_FUNDS]
    .filter(f => f.assetClass === 'Equity')
    .sort((a, b) => b.returns3Y - a.returns3Y)
    .slice(0, 4);

  const lowExpense = [...MOCK_FUNDS]
    .sort((a, b) => a.expenseRatio - b.expenseRatio)
    .slice(0, 4);

  const taxSaving = MOCK_FUNDS.filter(f => f.category === 'ELSS' || f.category === 'Retirement').slice(0, 4);
  // Use high-rated funds with consistent returns as "compounders"
  const compounders = [...MOCK_FUNDS]
    .filter(f => f.rating >= 4 && f.returns5Y > 15)
    .sort((a, b) => b.returns5Y - a.returns5Y)
    .slice(0, 4);

  // NFO mock
  const nfoFunds: MutualFund[] = [
    { code: 'NFO-MIRA-EV', name: 'Mirae Asset EV & Future Mobility Fund', category: 'Thematic', assetClass: 'Equity', marketCap: 'Multi Cap', sector: 'Auto & Ancillaries', nav: 10.00, rating: 0, expenseRatio: 0.50, returns1Y: 0, returns3Y: 0, returns5Y: 0, aum: 0, amc: 'Mirae Asset', planType: 'Direct', riskLevel: 'Very High', minSIPAmount: 500, minLumpsumAmount: 5000, exitLoad: 'Nil for 15 days', benchmark: 'NIFTY EV TRI' },
    { code: 'NFO-HDFC-MAN', name: 'HDFC Manufacturing Fund', category: 'Sectoral', assetClass: 'Equity', marketCap: 'Multi Cap', sector: 'Manufacturing', nav: 10.00, rating: 0, expenseRatio: 0.45, returns1Y: 0, returns3Y: 0, returns5Y: 0, aum: 0, amc: 'HDFC Mutual Fund', planType: 'Direct', riskLevel: 'Very High', minSIPAmount: 500, minLumpsumAmount: 5000, exitLoad: '1% within 1 year', benchmark: 'NIFTY India Manufacturing TRI' },
  ];

  const categories: FundCategory[] = [
    {
      id: 'top-performers',
      title: 'Top Performing Funds',
      subtitle: 'Highest 3Y returns',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
      badge: 'Popular',
      funds: topPerformers,
    },
    {
      id: 'low-expense',
      title: 'Lowest Expense Ratio',
      subtitle: 'More of your money works for you',
      icon: Percent,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
      funds: lowExpense,
    },
    {
      id: 'tax-saving',
      title: 'Tax Saving Funds',
      subtitle: 'Save tax under Section 80C',
      icon: Shield,
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
      badge: '80C',
      funds: taxSaving.length > 0 ? taxSaving : topPerformers.slice(0, 2),
    },
    {
      id: 'compounders',
      title: 'Consistent Compounders',
      subtitle: 'Steady 5Y+ track record, high rated',
      icon: Star,
      color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
      funds: compounders,
    },
    {
      id: 'nfo',
      title: 'New Fund Offers (NFO)',
      subtitle: 'Subscribe at ₹10 NAV',
      icon: Flame,
      color: 'text-red-500 bg-red-100 dark:bg-red-900/30',
      badge: 'New',
      funds: nfoFunds,
    },
  ];

  return (
    <div className="space-y-4">
      {categories.map(cat => {
        const Icon = cat.icon;
        if (cat.funds.length === 0) return null;
        return (
          <Card key={cat.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', cat.color)}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="flex items-center gap-1.5">
                      {cat.title}
                      {cat.badge && (
                        <Badge variant="secondary" className="text-[9px] h-4">{cat.badge}</Badge>
                      )}
                    </span>
                    <p className="text-[10px] text-muted-foreground font-normal mt-0.5">{cat.subtitle}</p>
                  </div>
                </span>
                {onViewAll && (
                  <Button variant="ghost" size="sm" className="text-xs text-primary h-7" onClick={() => onViewAll(cat.id)}>
                    View All <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {cat.funds.map(fund => (
                  <button
                    key={fund.code}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-colors text-left"
                    onClick={() => onSelectFund?.(fund)}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground truncate">{fund.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">{fund.category}</span>
                        {fund.rating > 0 && (
                          <span className="text-[10px] text-amber-500">{'★'.repeat(fund.rating)}</span>
                        )}
                        <span className="text-[10px] text-muted-foreground">ER: {fund.expenseRatio}%</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      {cat.id === 'nfo' ? (
                        <Badge className="text-[9px] bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" variant="secondary">
                          NFO ₹10
                        </Badge>
                      ) : (
                        <>
                          <p className={cn('text-xs font-bold', fund.returns3Y >= 0 ? 'text-green-600' : 'text-red-500')}>
                            {fund.returns3Y > 0 ? '+' : ''}{fund.returns3Y}%
                          </p>
                          <p className="text-[10px] text-muted-foreground">3Y returns</p>
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
