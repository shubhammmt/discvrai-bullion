import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Calendar, IndianRupee, BarChart3, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface StatementOption {
  id: string;
  title: string;
  description: string;
  icon: typeof FileText;
  color: string;
  formats: string[];
}

const STATEMENT_OPTIONS: StatementOption[] = [
  {
    id: 'account',
    title: 'Account Statement',
    description: 'Complete portfolio statement with all holdings, NAV, and units',
    icon: FileText,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    formats: ['PDF', 'Excel'],
  },
  {
    id: 'capital-gains',
    title: 'Capital Gains Report',
    description: 'STCG & LTCG details for tax filing (ITR)',
    icon: IndianRupee,
    color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    formats: ['PDF', 'Excel'],
  },
  {
    id: 'transaction',
    title: 'Transaction Summary',
    description: 'All buy, sell, SIP, and switch transactions',
    icon: BarChart3,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
    formats: ['PDF', 'Excel', 'CSV'],
  },
  {
    id: 'tax-saving',
    title: 'Tax Saving Certificate',
    description: '80C investment proof for ELSS funds',
    icon: Shield,
    color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
    formats: ['PDF'],
  },
];

const PAST_STATEMENTS = [
  { id: 'ps1', type: 'Account Statement', period: 'FY 2025-26', date: '2026-03-01', size: '245 KB' },
  { id: 'ps2', type: 'Capital Gains Report', period: 'FY 2025-26', date: '2026-03-01', size: '128 KB' },
  { id: 'ps3', type: 'Account Statement', period: 'FY 2024-25', date: '2025-04-15', size: '312 KB' },
  { id: 'ps4', type: 'Transaction Summary', period: 'Jan-Mar 2026', date: '2026-03-10', size: '89 KB' },
  { id: 'ps5', type: 'Tax Saving Certificate', period: 'FY 2024-25', date: '2025-04-01', size: '56 KB' },
];

export function StatementsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState('fy2025-26');

  const handleDownload = (title: string, fmt: string) => {
    toast.success(`Downloading ${title}`, {
      description: `${fmt} file will be ready shortly`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Period Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Statement Period</span>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fy2025-26">FY 2025-26</SelectItem>
                <SelectItem value="fy2024-25">FY 2024-25</SelectItem>
                <SelectItem value="fy2023-24">FY 2023-24</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Generate Statements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Generate Statement
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {STATEMENT_OPTIONS.map(opt => {
            const Icon = opt.icon;
            return (
              <div key={opt.id} className="rounded-lg border border-border p-3 space-y-2">
                <div className="flex items-start gap-3">
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', opt.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{opt.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{opt.description}</p>
                    <div className="flex gap-1.5 mt-2">
                      {opt.formats.map(fmt => (
                        <Button key={fmt} variant="outline" size="sm" className="h-6 text-[10px] px-2 gap-1"
                          onClick={() => handleDownload(opt.title, fmt)}>
                          <Download className="w-2.5 h-2.5" /> {fmt}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Past Downloads */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Recent Downloads</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {PAST_STATEMENTS.map(stmt => (
            <div key={stmt.id} className="flex items-center justify-between p-2.5 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium text-foreground">{stmt.type}</p>
                  <p className="text-[10px] text-muted-foreground">{stmt.period} • {stmt.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">{stmt.size}</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleDownload(stmt.type, 'PDF')}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
