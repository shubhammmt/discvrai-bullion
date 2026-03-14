import { useState, useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchableSelectProps {
  options: string[];
  value?: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  allLabel?: string;
  className?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  allLabel = 'All',
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return options;
    const q = search.toLowerCase();
    return options.filter(o => o.toLowerCase().includes(q));
  }, [options, search]);

  const displayValue = value || allLabel;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between text-xs h-8 font-normal',
            !value && 'text-muted-foreground',
            className
          )}
        >
          <span className="truncate">{displayValue}</span>
          <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <div className="p-2 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input
              placeholder={`Search ${placeholder.toLowerCase()}...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-7 text-xs pl-7 pr-7"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
        <div className="max-h-[200px] overflow-y-auto p-1">
          <button
            onClick={() => { onChange(undefined); setOpen(false); setSearch(''); }}
            className={cn(
              'w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm hover:bg-accent transition-colors',
              !value && 'bg-accent'
            )}
          >
            <Check className={cn('w-3 h-3', value ? 'opacity-0' : 'opacity-100')} />
            {allLabel}
          </button>
          {filtered.map(option => (
            <button
              key={option}
              onClick={() => { onChange(option); setOpen(false); setSearch(''); }}
              className={cn(
                'w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm hover:bg-accent transition-colors text-left',
                value === option && 'bg-accent'
              )}
            >
              <Check className={cn('w-3 h-3 shrink-0', value === option ? 'opacity-100' : 'opacity-0')} />
              <span className="truncate">{option}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-[10px] text-muted-foreground text-center py-3">No results found</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
