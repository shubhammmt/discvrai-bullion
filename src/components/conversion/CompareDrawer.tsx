import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShortlistFund } from './types';
import { Button } from '@/components/ui/button';

interface CompareDrawerProps {
  open: boolean;
  funds: ShortlistFund[];
  onClose: () => void;
  onPick?: (f: ShortlistFund) => void;
}

const ROWS: { key: keyof ShortlistFund | 'reasonTags'; label: string; fmt?: (v: any) => string }[] = [
  { key: 'amc', label: 'AMC' },
  { key: 'category', label: 'Category' },
  { key: 'returns3Y', label: '3Y Returns', fmt: (v) => `${v}%` },
  { key: 'expenseRatio', label: 'Expense Ratio', fmt: (v) => `${v}%` },
  { key: 'riskLevel', label: 'Risk' },
  { key: 'reasonTags', label: 'Why', fmt: (v: string[]) => v.join(' · ') },
];

export function CompareDrawer({ open, funds, onClose, onPick }: CompareDrawerProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader><DialogTitle>Compare Funds ({funds.length})</DialogTitle></DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-muted-foreground">Metric</th>
                {funds.map(f => (
                  <th key={f.code} className="text-left py-2 font-semibold text-foreground min-w-[140px]">{f.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(r => (
                <tr key={r.label} className="border-b border-border/40">
                  <td className="py-2 text-muted-foreground">{r.label}</td>
                  {funds.map(f => {
                    const v = (f as any)[r.key];
                    return <td key={f.code} className="py-2 text-foreground">{r.fmt ? r.fmt(v) : v}</td>;
                  })}
                </tr>
              ))}
              <tr>
                <td></td>
                {funds.map(f => (
                  <td key={f.code} className="pt-3">
                    <Button size="sm" className="h-7 text-xs bg-sip-brand text-sip-brand-foreground" onClick={() => { onPick?.(f); onClose(); }}>
                      Pick this fund
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
