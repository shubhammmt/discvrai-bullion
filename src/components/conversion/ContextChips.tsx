import { Badge } from '@/components/ui/badge';
import { Target, Activity, Clock, X } from 'lucide-react';
import { ConversionContext } from './types';

interface ContextChipsProps {
  context: ConversionContext;
  onClear?: (key: keyof ConversionContext) => void;
}

export function ContextChips({ context, onClear }: ContextChipsProps) {
  const chips: { key: keyof ConversionContext; label: string; icon: any; value?: any }[] = [
    { key: 'goal', label: 'Goal', icon: Target, value: context.goal },
    { key: 'risk', label: 'Risk', icon: Activity, value: context.risk },
    { key: 'horizon', label: 'Horizon', icon: Clock, value: context.horizon },
  ].filter(c => c.value);

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] uppercase text-muted-foreground tracking-wider">Context</span>
      {chips.map(({ key, label, icon: Icon, value }) => (
        <Badge key={key} variant="outline" className="gap-1 pl-2 pr-1 py-0.5 border-sip-brand/30 bg-sip-brand/5 text-foreground">
          <Icon className="w-3 h-3 text-sip-brand" />
          <span className="text-[10px]">{label}: <b>{value}</b></span>
          {onClear && (
            <button onClick={() => onClear(key)} className="ml-1 hover:text-destructive">
              <X className="w-2.5 h-2.5" />
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
}
