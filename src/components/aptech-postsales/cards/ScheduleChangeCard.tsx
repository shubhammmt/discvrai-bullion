import React from 'react';
import { CalendarClock, UserRound, PartyPopper, AlertCircle } from 'lucide-react';

export type ScheduleChangeType = 'timing-change' | 'holiday' | 'faculty-change';

interface ScheduleChangeCardProps {
  changeType: ScheduleChangeType;
  title: string;
  details: string[];
  effectiveDate: string;
  note?: string;
}

const iconMap: Record<ScheduleChangeType, { icon: React.ElementType; gradient: string }> = {
  'timing-change': { icon: CalendarClock, gradient: 'from-blue-500 to-indigo-600' },
  'holiday': { icon: PartyPopper, gradient: 'from-green-500 to-emerald-600' },
  'faculty-change': { icon: UserRound, gradient: 'from-purple-500 to-violet-600' },
};

const ScheduleChangeCard: React.FC<ScheduleChangeCardProps> = ({ changeType, title, details, effectiveDate, note }) => {
  const { icon: Icon, gradient } = iconMap[changeType];

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm animate-fade-in bg-card">
      <div className={`bg-gradient-to-r ${gradient} px-4 py-2.5 flex items-center gap-2`}>
        <Icon className="h-4 w-4 text-white" />
        <span className="text-white font-semibold text-sm">{title}</span>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>Effective: {effectiveDate}</span>
        </div>
        <ul className="space-y-1.5">
          {details.map((d, i) => (
            <li key={i} className="text-sm text-foreground flex gap-2">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
        {note && (
          <div className="bg-muted/50 rounded-lg p-2.5 text-xs text-muted-foreground mt-2 border border-border">
            💡 {note}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleChangeCard;
