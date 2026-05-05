import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Bell, CalendarClock, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackedStore } from '@/lib/trackedStore';
import { toast } from '@/hooks/use-toast';
import { trackConversionEvent } from './events';

type AssetType = 'stock' | 'mf';

interface AddInstrumentDialogProps {
  trigger?: React.ReactNode;
}

export function AddInstrumentDialog({ trigger }: AddInstrumentDialogProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<AssetType>('mf');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [refValue, setRefValue] = useState('');
  const [actions, setActions] = useState({ priceAlert: true, sipReminder: false, watchlist: true });

  const reset = () => { setName(''); setSymbol(''); setRefValue(''); };

  const handleAdd = () => {
    if (!name.trim()) { toast({ title: 'Name required', description: 'Enter the instrument name.' }); return; }
    const sym = (symbol || name).toUpperCase().trim();
    const ref = refValue ? Number(refValue) : undefined;

    if (actions.watchlist) {
      trackedStore.addWatch({ assetType: type, symbol: sym, name: name.trim(), refValue: ref });
    }
    if (actions.priceAlert && ref) {
      trackedStore.addAlert({
        assetType: type, symbol: sym, name: name.trim(),
        kind: 'drawdown', condition: 'falls_below', targetValue: 5, baseline: ref, source: 'add-instrument',
      } as any);
      trackConversionEvent('alert_created', { kind: 'drawdown', symbol: sym });
    }
    trackConversionEvent('instrument_added', { type, symbol: sym, actions });
    toast({ title: 'Added', description: `${name.trim()} now tracked${actions.priceAlert ? ' with a 5% drawdown alert' : ''}.` });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" className="h-8 text-xs gap-1 bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90">
            <Plus className="w-3.5 h-3.5" /> Add Instrument
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Track a new instrument</DialogTitle>
          <DialogDescription>Add a stock or mutual fund and pick the actions you want around it.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {(['mf', 'stock'] as AssetType[]).map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={cn('rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                  type === t ? 'border-sip-brand bg-sip-brand/5 text-sip-brand' : 'border-sip-border text-sip-text-secondary hover:border-sip-brand/40')}
              >
                {t === 'mf' ? 'Mutual Fund' : 'Stock'}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={type === 'mf' ? 'e.g. Parag Parikh Flexi Cap' : 'e.g. HDFC Bank'} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label className="text-xs">{type === 'mf' ? 'Scheme code (optional)' : 'Symbol'}</Label>
              <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder={type === 'mf' ? '120586' : 'HDFCBANK'} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">{type === 'mf' ? 'Latest NAV (₹)' : 'Reference price (₹)'}</Label>
              <Input type="number" value={refValue} onChange={(e) => setRefValue(e.target.value)} placeholder="0.00" />
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <p className="text-[11px] uppercase tracking-wider text-sip-text-muted font-semibold">Quick actions</p>
            <ToggleRow icon={<Bell className="w-3.5 h-3.5" />} label="Set price alert (−5% drawdown)"
              checked={actions.priceAlert} onChange={(v) => setActions(a => ({ ...a, priceAlert: v }))} />
            {type === 'mf' && (
              <ToggleRow icon={<CalendarClock className="w-3.5 h-3.5" />} label="Set SIP reminder"
                checked={actions.sipReminder} onChange={(v) => setActions(a => ({ ...a, sipReminder: v }))} />
            )}
            <ToggleRow icon={<Heart className="w-3.5 h-3.5" />} label="Add to watchlist"
              checked={actions.watchlist} onChange={(v) => setActions(a => ({ ...a, watchlist: v }))} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={handleAdd}>
              Add & track
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ToggleRow({ icon, label, checked, onChange }: { icon: React.ReactNode; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn('w-full flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs transition-colors',
        checked ? 'border-sip-brand bg-sip-brand/5 text-sip-text-primary' : 'border-sip-border text-sip-text-secondary hover:border-sip-brand/40')}
    >
      <span className="flex items-center gap-2">{icon}{label}</span>
      <span className={cn('w-3.5 h-3.5 rounded-full border', checked ? 'bg-sip-brand border-sip-brand' : 'border-sip-border')} />
    </button>
  );
}
