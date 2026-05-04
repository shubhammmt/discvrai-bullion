import { useState } from 'react';
import { ContextChips, SmartShortlist, CompareDrawer, ShortlistFund, ConversionContext } from '@/components/conversion';
import { Card, CardContent } from '@/components/ui/card';

export function ConversionContextHeader({ context }: { context?: ConversionContext }) {
  const ctx: ConversionContext = context || { goal: 'Wealth Creation', risk: 'High', horizon: '5+ years' };
  return (
    <Card className="border-sip-brand/20">
      <CardContent className="p-3">
        <ContextChips context={ctx} />
        <p className="text-[10px] text-muted-foreground mt-1.5">All shortlist & search results below are filtered for this context.</p>
      </CardContent>
    </Card>
  );
}

export function SmartShortlistSection({ onInvest, context }: { onInvest?: () => void; context?: ConversionContext }) {
  const ctx: ConversionContext = context || { goal: 'Wealth Creation', risk: 'High', horizon: '5+ years' };
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareList, setCompareList] = useState<ShortlistFund[]>([]);
  return (
    <Card>
      <CardContent className="p-4">
        <SmartShortlist
          context={ctx}
          onInvest={() => onInvest?.()}
          onCompare={(funds) => { setCompareList(funds); setCompareOpen(true); }}
        />
        <CompareDrawer
          open={compareOpen}
          funds={compareList}
          onClose={() => setCompareOpen(false)}
          onPick={() => onInvest?.()}
        />
      </CardContent>
    </Card>
  );
}
