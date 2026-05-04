import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ChevronRight, Info, Plus, Check } from 'lucide-react';
import { ConversionContext, ShortlistFund } from './types';
import { buildSmartShortlist } from './shortlistEngine';
import { cn } from '@/lib/utils';

interface SmartShortlistProps {
  context: ConversionContext;
  onInvest?: (fund: ShortlistFund) => void;
  onCompare?: (funds: ShortlistFund[]) => void;
  compact?: boolean;
}

export function SmartShortlist({ context, onInvest, onCompare, compact }: SmartShortlistProps) {
  const [shortlist] = useState(() => buildSmartShortlist(context));
  const [expanded, setExpanded] = useState<string | null>(null);
  const [compare, setCompare] = useState<string[]>([]);

  const toggleCompare = (code: string) =>
    setCompare(p => p.includes(code) ? p.filter(c => c !== code) : p.length < 3 ? [...p, code] : p);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sip-brand" />
          <h3 className="text-sm font-semibold text-foreground">Smart Shortlist</h3>
          <Badge variant="secondary" className="text-[10px]">{shortlist.length} of 14</Badge>
        </div>
        {context.goal && <span className="text-[10px] text-muted-foreground">For: <b className="text-foreground">{context.goal}</b> · {context.risk || 'Moderate'} risk · {context.horizon || 'long-term'}</span>}
      </div>

      <div className={cn('grid gap-2', compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2')}>
        {shortlist.map(f => (
          <Card key={f.code} className="border-sip-border hover:border-sip-brand/40 transition-colors">
            <CardContent className="p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground line-clamp-2">{f.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{f.amc} · {f.category}</p>
                </div>
                <button
                  onClick={() => toggleCompare(f.code)}
                  title="Add to compare"
                  className={cn('shrink-0 w-6 h-6 rounded border flex items-center justify-center transition-colors',
                    compare.includes(f.code) ? 'bg-sip-brand text-sip-brand-foreground border-sip-brand' : 'border-border text-muted-foreground hover:border-sip-brand/40')}
                >
                  {compare.includes(f.code) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1 text-center">
                <div><p className="text-[9px] text-muted-foreground uppercase">3Y</p><p className="text-xs font-bold text-sip-success">{f.returns3Y}%</p></div>
                <div><p className="text-[9px] text-muted-foreground uppercase">Expense</p><p className="text-xs font-bold text-foreground">{f.expenseRatio}%</p></div>
                <div><p className="text-[9px] text-muted-foreground uppercase">Risk</p><p className="text-xs font-bold text-foreground">{f.riskLevel}</p></div>
              </div>

              <button onClick={() => setExpanded(expanded === f.code ? null : f.code)}
                className="w-full flex items-center justify-between gap-1 px-2 py-1 rounded bg-sip-brand/5 border border-sip-brand/20 text-[10px] text-sip-brand hover:bg-sip-brand/10">
                <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Why this fund</span>
                <ChevronRight className={cn('w-3 h-3 transition-transform', expanded === f.code && 'rotate-90')} />
              </button>

              {expanded === f.code && (
                <div className="text-[11px] text-foreground bg-muted/40 p-2 rounded border border-border">
                  <div className="flex flex-wrap gap-1 mb-1">
                    {f.reasonTags.map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 bg-sip-brand/10 text-sip-brand rounded">{t}</span>)}
                  </div>
                  {f.reason}
                </div>
              )}

              <Button size="sm" className="w-full h-7 text-xs bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={() => onInvest?.(f)}>
                Start SIP
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {compare.length >= 2 && (
        <div className="sticky bottom-2 flex justify-center">
          <Button size="sm" onClick={() => onCompare?.(shortlist.filter(f => compare.includes(f.code)))}
            className="bg-foreground text-background hover:bg-foreground/90 shadow-lg">
            Compare {compare.length} funds →
          </Button>
        </div>
      )}
    </div>
  );
}
