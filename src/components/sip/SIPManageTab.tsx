import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Filter } from 'lucide-react';
import { ManageSIPWidget } from './ManageSIPWidget';
import { SIPDashboardSummary } from './SIPDashboardSummary';

const API_BASE_URL = import.meta.env.VITE_DISCVR_API_BASE_URL || '';
const API_TOKEN = import.meta.env.VITE_DISCVR_API_TOKEN || '';

const MOCK_SIPS = [
  { sip_id: '1', status: 'ACTIVE', amount: 5000, frequency: 'Monthly', scheme_name: 'HDFC Large Cap' },
  { sip_id: '2', status: 'ACTIVE', amount: 3000, frequency: 'Monthly', scheme_name: 'SBI Small Cap' },
  { sip_id: '3', status: 'PAUSED', amount: 10000, frequency: 'Monthly', scheme_name: 'Axis Bluechip' },
  { sip_id: '4', status: 'ACTIVE', amount: 2000, frequency: 'Quarterly', scheme_name: 'PPFAS Flexi Cap' },
  { sip_id: '5', status: 'CREATED', amount: 7500, frequency: 'Monthly', scheme_name: 'Mirae Emerging' },
];

type StatusFilter = 'ACTIVE' | 'PAUSED' | 'CREATED' | 'CANCELLED' | 'ALL';

interface SIPManageTabProps {
  onCreateSIP: () => void;
}

export function SIPManageTab({ onCreateSIP }: SIPManageTabProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ACTIVE');
  const [allSips, setAllSips] = useState(MOCK_SIPS);

  // Fetch SIPs for summary (reuses mock or API data from ManageSIPWidget)
  useEffect(() => {
    const fetchForSummary = async () => {
      if (!API_BASE_URL) return;
      try {
        const h: Record<string, string> = { 'Content-Type': 'application/json' };
        if (API_TOKEN) h['Authorization'] = `Bearer ${API_TOKEN}`;
        const res = await fetch(`${API_BASE_URL}/webhook/api/v1/sips?user_id=a7ca0dcf-3c88-45c6-b4ac-e40fde319956&page=1&limit=50`, { headers: h });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.length) setAllSips(json.data);
        }
      } catch { /* use mock */ }
    };
    fetchForSummary();
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Your SIPs</h2>
        <Button size="sm" onClick={onCreateSIP}>
          <ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Create New SIP
        </Button>
      </div>

      {/* Summary Dashboard */}
      <SIPDashboardSummary sips={allSips} />

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-muted-foreground" />
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
          <SelectTrigger className="w-40 h-8 text-xs">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="PAUSED">Paused</SelectItem>
            <SelectItem value="CREATED">Pending</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
            <SelectItem value="ALL">All SIPs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* SIP List — ManageSIPWidget handles its own data fetching */}
      <ManageSIPWidget statusFilter={statusFilter === 'ALL' ? undefined : statusFilter} />
    </div>
  );
}
