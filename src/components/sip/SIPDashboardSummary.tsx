import { Card, CardContent } from '@/components/ui/card';
import { IndianRupee, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

interface SIPSummaryData {
  activeCount: number;
  pausedCount: number;
  totalMonthly: number;
  totalWeekly: number;
  totalQuarterly: number;
}

interface SIPDashboardSummaryProps {
  sips: Array<{
    status: string;
    amount: number;
    frequency: string;
  }>;
}

export function SIPDashboardSummary({ sips }: SIPDashboardSummaryProps) {
  const summary: SIPSummaryData = sips.reduce(
    (acc, sip) => {
      const status = sip.status?.toUpperCase();
      if (status === 'ACTIVE') {
        acc.activeCount++;
        const freq = sip.frequency?.toLowerCase();
        if (freq === 'monthly') acc.totalMonthly += sip.amount;
        else if (freq === 'weekly') acc.totalWeekly += sip.amount;
        else if (freq === 'quarterly') acc.totalQuarterly += sip.amount;
      } else if (status === 'PAUSED') {
        acc.pausedCount++;
      }
      return acc;
    },
    { activeCount: 0, pausedCount: 0, totalMonthly: 0, totalWeekly: 0, totalQuarterly: 0 } as SIPSummaryData
  );

  const totalMonthlyEquivalent =
    summary.totalMonthly + summary.totalWeekly * 4.33 + summary.totalQuarterly / 3;

  const metrics = [
    {
      label: 'Active SIPs',
      value: summary.activeCount.toString(),
      icon: TrendingUp,
      sub: summary.pausedCount > 0 ? `${summary.pausedCount} paused` : undefined,
    },
    {
      label: 'Monthly Outflow',
      value: `₹${Math.round(summary.totalMonthly).toLocaleString()}`,
      icon: IndianRupee,
      sub: summary.totalMonthly > 0 ? `${summary.activeCount} SIPs` : undefined,
    },
    {
      label: 'Monthly Equivalent',
      value: `₹${Math.round(totalMonthlyEquivalent).toLocaleString()}`,
      icon: Calendar,
      sub: 'All frequencies combined',
    },
    {
      label: 'Yearly Commitment',
      value: `₹${Math.round(totalMonthlyEquivalent * 12).toLocaleString()}`,
      icon: BarChart3,
      sub: 'Projected annual',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {metrics.map((m) => (
        <Card key={m.label} className="border-sip-border">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-lg bg-sip-brand/10 flex items-center justify-center">
                <m.icon className="w-3.5 h-3.5 text-sip-brand" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                {m.label}
              </span>
            </div>
            <p className="text-lg font-bold text-foreground">{m.value}</p>
            {m.sub && <p className="text-[10px] text-muted-foreground mt-0.5">{m.sub}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
