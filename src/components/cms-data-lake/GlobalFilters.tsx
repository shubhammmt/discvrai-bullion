import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, AlertTriangle, Database, Shield } from 'lucide-react';
import { atmProfiles, overageEvents, ejLogs } from '@/data/cmsDataLake';

interface Filters {
  bank: string;
  region: string;
  problemType: string;
  replenishmentPath: string;
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const banks = ['All', ...Array.from(new Set(atmProfiles.map(a => a.bank)))];
const regions = ['All', ...Array.from(new Set(atmProfiles.map(a => a.region)))];
const problemTypes = ['All', 'Harmonizing Penalty Risk', 'Jams', 'Connectivity', 'Cassette Sensor'];
const repPaths = ['All', 'Cassette Swap', 'Add Cash'];

const GlobalFilters: React.FC<Props> = ({ filters, onChange }) => {
  const set = (key: keyof Filters, val: string) => onChange({ ...filters, [key]: val });

  // Compute insight summary
  const filtered = atmProfiles.filter(a => {
    if (filters.bank !== 'All' && a.bank !== filters.bank) return false;
    if (filters.region !== 'All' && a.region !== filters.region) return false;
    return true;
  });
  const avgComp = filtered.length ? Math.round(filtered.reduce((s, a) => s + a.dataCompleteness, 0) / filtered.length) : 0;
  const penaltyRisk = overageEvents.filter(o => o.penaltyApplicable && o.status !== 'Reported').length;
  const errors = ejLogs.filter(e => e.type === 'Error').length;

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3">
      <div className="max-w-[1400px] mx-auto">
        {/* Filter Row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Filter className="h-3.5 w-3.5" /> Filters
          </div>
          <Select value={filters.bank} onValueChange={v => set('bank', v)}>
            <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>{banks.map(b => <SelectItem key={b} value={b} className="text-xs">{b === 'All' ? 'All Banks' : b}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filters.region} onValueChange={v => set('region', v)}>
            <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>{regions.map(r => <SelectItem key={r} value={r} className="text-xs">{r === 'All' ? 'All Regions' : r}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filters.problemType} onValueChange={v => set('problemType', v)}>
            <SelectTrigger className="h-8 w-[170px] text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>{problemTypes.map(p => <SelectItem key={p} value={p} className="text-xs">{p === 'All' ? 'All Problems' : p}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filters.replenishmentPath} onValueChange={v => set('replenishmentPath', v)}>
            <SelectTrigger className="h-8 w-[150px] text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>{repPaths.map(r => <SelectItem key={r} value={r} className="text-xs">{r === 'All' ? 'All Paths' : r}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        {/* Insight Header */}
        <div className="mt-2.5 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-xs text-slate-700">
              Showing <span className="font-bold text-slate-900">{filtered.length.toLocaleString()}</span> ATMs
              {filters.region !== 'All' && <> in <span className="font-bold">{filters.region}</span></>}
              {filters.bank !== 'All' && <> ({filters.bank})</>}
              {' '}with <span className={`font-bold ${avgComp >= 90 ? 'text-emerald-600' : avgComp >= 80 ? 'text-amber-600' : 'text-red-600'}`}>{avgComp}%</span> Data Completeness
            </span>
          </div>
          {penaltyRisk > 0 && (
            <Badge className="bg-red-100 text-red-700 text-[10px] gap-1">
              <AlertTriangle className="h-3 w-3" /> {penaltyRisk} ATMs at Harmonizing Penalty risk today
            </Badge>
          )}
          {errors > 0 && (
            <Badge className="bg-amber-100 text-amber-700 text-[10px] gap-1">
              <Shield className="h-3 w-3" /> {errors} active errors
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalFilters;
