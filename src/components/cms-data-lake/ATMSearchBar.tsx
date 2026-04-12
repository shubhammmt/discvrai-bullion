import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { atmProfiles, getStatusColor } from '@/data/cmsDataLake';
import { Badge } from '@/components/ui/badge';

interface ATMSearchBarProps {
  onSelect: (terminalId: string) => void;
  selectedId?: string;
}

const ATMSearchBar: React.FC<ATMSearchBarProps> = ({ onSelect, selectedId }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return atmProfiles.filter(
      a => a.terminalId.toLowerCase().includes(q) ||
           a.bank.toLowerCase().includes(q) ||
           a.hub.toLowerCase().includes(q) ||
           a.state.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search ATM by ID, bank, hub, state..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          className="pl-9 pr-8 h-10 text-sm border-slate-200 bg-white"
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false); }} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {results.map(a => (
            <button
              key={a.terminalId}
              onClick={() => { onSelect(a.terminalId); setQuery(a.terminalId); setOpen(false); }}
              className={`w-full text-left px-3 py-2.5 hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-0 ${selectedId === a.terminalId ? 'bg-blue-50' : ''}`}
            >
              <div>
                <p className="text-xs font-bold text-slate-900 font-mono">{a.terminalId}</p>
                <p className="text-[10px] text-slate-500">{a.bank} · {a.hub}, {a.state}</p>
              </div>
              <Badge className={`text-[10px] ${getStatusColor(a.status)}`}>{a.status}</Badge>
            </button>
          ))}
        </div>
      )}
      {open && query.trim() && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-center text-xs text-slate-500">
          No ATMs found for "{query}"
        </div>
      )}
    </div>
  );
};

export default ATMSearchBar;
