import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResumeSetupCardProps {
  fundName?: string;
  step?: number;
  totalSteps?: number;
  onResume?: () => void;
}

export function ResumeSetupCard({ fundName, step = 2, totalSteps = 4, onResume }: ResumeSetupCardProps) {
  const navigate = useNavigate();
  const handle = () => onResume ? onResume() : navigate('/sip-management');
  if (!fundName) return null;
  return (
    <Card className="border-amber-300 bg-amber-50/50 dark:bg-amber-950/20">
      <CardContent className="p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground">Resume SIP setup</p>
            <p className="text-[10px] text-muted-foreground truncate">
              {fundName} · Step {step} of {totalSteps}
            </p>
          </div>
        </div>
        <Button size="sm" className="h-7 text-xs gap-1 bg-amber-600 hover:bg-amber-700 text-white" onClick={handle}>
          Resume <ArrowRight className="w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  );
}

export function getCutoffStatus(): { sameDay: boolean; activationLabel: string; banner: string } {
  // IST cutoff: 9 PM IST → before 9 PM = T+1 NAV, after 9 PM = T+2
  const now = new Date();
  // Convert to IST hour
  const istOffset = 5.5 * 60; // minutes
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const istMinutes = (utcMinutes + istOffset) % (24 * 60);
  const istHour = istMinutes / 60;
  const before9pm = istHour < 21;
  return {
    sameDay: before9pm,
    activationLabel: before9pm ? 'T+1 NAV (next business day)' : 'T+2 NAV (skips today)',
    banner: before9pm
      ? 'Order placed before 9 PM IST — units allotted at next business day NAV (T+1).'
      : 'Order after 9 PM IST cutoff — units allotted at T+2 NAV.',
  };
}

export function CutoffBanner() {
  const c = getCutoffStatus();
  return (
    <div className={`rounded-lg border px-3 py-2 flex items-center gap-2 text-xs ${c.sameDay ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>
      <Clock className="w-3.5 h-3.5 shrink-0" />
      <span>{c.banner}</span>
    </div>
  );
}
