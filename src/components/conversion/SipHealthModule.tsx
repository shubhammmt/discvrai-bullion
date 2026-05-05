import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackConversionEvent } from './events';

export interface SipHealth {
  active: number;
  failed: number;
  upcoming: number;
  topupCandidates: number;
}

interface SipHealthModuleProps {
  health?: SipHealth;
  onResume?: () => void;
  onTopup?: () => void;
  onChangeDate?: () => void;
  onSwitchFund?: () => void;
}

const SAMPLE: SipHealth = { active: 4, failed: 1, upcoming: 2, topupCandidates: 3 };

export function SipHealthModule({
  health = SAMPLE,
  onResume, onTopup, onChangeDate, onSwitchFund,
}: SipHealthModuleProps) {
  return (
    <Card className="border-sip-border">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-sip-text-primary">SIP Health</h3>
            <p className="text-[11px] text-sip-text-muted mt-0.5">Continuity, top-up opportunities, and at-risk SIPs.</p>
          </div>
          <Badge variant="outline" className="text-[10px] border-sip-border text-sip-text-secondary">
            {health.active} active
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Tile tone="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />} label="Active" value={health.active} />
          <Tile tone="danger"  icon={<AlertTriangle className="w-3.5 h-3.5" />} label="Failed" value={health.failed} />
          <Tile tone="brand"   icon={<Calendar className="w-3.5 h-3.5" />} label="Upcoming" value={health.upcoming} />
          <Tile tone="warn"    icon={<TrendingUp className="w-3.5 h-3.5" />} label="Top-up due" value={health.topupCandidates} />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <Action label="Resume SIP" onClick={() => { trackConversionEvent('sip_resumed', { source: 'sip_health' }); onResume?.(); }} primary />
          <Action label="Increase SIP by 10%" onClick={() => { trackConversionEvent('sip_topup_accepted', { pct: 10 }); onTopup?.(); }} />
          <Action label="Change SIP date" onClick={() => { trackConversionEvent('sip_date_changed'); onChangeDate?.(); }} />
          <Action label="Switch to better-fit fund" onClick={() => onSwitchFund?.()} />
        </div>
      </CardContent>
    </Card>
  );
}

function Tile({ tone, icon, label, value }: {
  tone: 'success' | 'danger' | 'brand' | 'warn';
  icon: React.ReactNode; label: string; value: number;
}) {
  const cls = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    danger:  'border-red-200 bg-red-50 text-red-700',
    brand:   'border-sip-brand/30 bg-sip-brand/5 text-sip-brand',
    warn:    'border-amber-200 bg-amber-50 text-amber-700',
  }[tone];
  return (
    <div className={cn('rounded-lg border p-2.5', cls)}>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold opacity-90">
        {icon}{label}
      </div>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Action({ label, onClick, primary }: { label: string; onClick?: () => void; primary?: boolean }) {
  return (
    <Button
      size="sm"
      variant={primary ? 'default' : 'outline'}
      className={cn('h-7 text-[11px] gap-1', primary && 'bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90')}
      onClick={onClick}
    >
      {label} <ArrowRight className="w-3 h-3" />
    </Button>
  );
}
