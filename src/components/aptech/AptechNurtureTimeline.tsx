import React from 'react';
import { Clock, Calendar, Gift, TrendingUp, MessageCircle, PhoneCall, AlertTriangle } from 'lucide-react';

interface NudgeEvent {
  day: string;
  time: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'active' | 'upcoming';
  channel: 'whatsapp' | 'sms' | 'call';
}

const nudges: NudgeEvent[] = [
  { day: 'Day 0', time: '2 min after form', label: 'Instant Welcome', description: 'Personalized intro with correct name, course details, pricing & alumni stories — all proactive.', icon: <MessageCircle className="h-4 w-4" />, status: 'completed', channel: 'whatsapp' },
  { day: 'Day 0', time: '+ 15 min', label: 'EMI & Offer Shared', description: 'Zero-cost EMI breakdown, scholarship eligibility check, and 15% Early Bird offer locked.', icon: <Gift className="h-4 w-4" />, status: 'completed', channel: 'whatsapp' },
  { day: 'Day 1', time: '10:00 AM', label: 'Batch Reminder', description: '"Hi Rahul! Just 12 seats left for the March VFX batch at Andheri West. Your Early Bird offer expires in 48hrs!"', icon: <AlertTriangle className="h-4 w-4" />, status: 'completed', channel: 'whatsapp' },
  { day: 'Day 3', time: '11:00 AM', label: 'Alumni Success Story', description: '"Meet Sneha — VFX batch \'24, now at DNEG earning ₹7.2 LPA. She started just like you!" + video link', icon: <TrendingUp className="h-4 w-4" />, status: 'active', channel: 'whatsapp' },
  { day: 'Day 3', time: '3:00 PM', label: 'Counselor Call', description: 'AI schedules a live counselor call only when lead is warm (intent score > 60). Counselor gets full context.', icon: <PhoneCall className="h-4 w-4" />, status: 'upcoming', channel: 'call' },
  { day: 'Day 5', time: '10:00 AM', label: 'Free Workshop Invite', description: '"Rahul, we\'re hosting a free VFX Masterclass this Saturday at Andheri West. Want me to reserve your spot?"', icon: <Calendar className="h-4 w-4" />, status: 'upcoming', channel: 'whatsapp' },
  { day: 'Day 7', time: '10:00 AM', label: 'Final Offer + Urgency', description: '"Last chance! Your 15% discount expires tonight. March batch starts Monday. Ready to enroll? Tap below 👇"', icon: <Clock className="h-4 w-4" />, status: 'upcoming', channel: 'whatsapp' },
];

const channelColors = {
  whatsapp: 'bg-[#25d366]/10 text-[#25d366] border-[#25d366]/30',
  sms: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  call: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
};

const statusColors = {
  completed: 'bg-[#25d366] border-[#25d366]',
  active: 'bg-orange-500 border-orange-500 animate-pulse',
  upcoming: 'bg-gray-300 dark:bg-gray-600 border-gray-300 dark:border-gray-600',
};

const AptechNurtureTimeline = () => {
  return (
    <div className="bg-white dark:bg-[#111b21] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-[#25d366] to-[#128c7e] px-4 py-3">
        <h3 className="text-white font-semibold text-sm">📋 7-Day Nurture Sequence</h3>
        <p className="text-white/70 text-[11px] mt-0.5">Automated re-engagement for Lead: Rahul Verma</p>
      </div>
      <div className="p-4 space-y-0">
        {nudges.map((nudge, i) => (
          <div key={i} className="flex gap-3 relative">
            {/* Timeline line */}
            {i < nudges.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700" />
            )}
            {/* Dot */}
            <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 ${statusColors[nudge.status]}`}>
              {nudge.status === 'completed' && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              )}
            </div>
            {/* Content */}
            <div className="pb-5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono font-bold text-[#111b21] dark:text-[#e9edef]">{nudge.day}</span>
                <span className="text-[10px] text-[#667781]">{nudge.time}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-medium uppercase ${channelColors[nudge.channel]}`}>
                  {nudge.channel}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[#25d366]">{nudge.icon}</span>
                <span className="text-[13px] font-semibold text-[#111b21] dark:text-[#e9edef]">{nudge.label}</span>
              </div>
              <p className="text-[12px] text-[#667781] mt-0.5 leading-relaxed">{nudge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AptechNurtureTimeline;
