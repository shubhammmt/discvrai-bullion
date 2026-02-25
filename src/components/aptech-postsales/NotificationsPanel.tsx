import React from 'react';
import { X, Bell, CreditCard, ClipboardList, AlertTriangle, BookOpen, Sparkles } from 'lucide-react';
import { mockNotifications, type Notification } from '@/data/aptechPostSalesDemoData';

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
}

const iconMap: Record<Notification['type'], React.ElementType> = {
  fee: CreditCard,
  survey: ClipboardList,
  attendance: AlertTriangle,
  course: BookOpen,
  recommendation: Sparkles,
};

const colorMap: Record<Notification['type'], string> = {
  fee: 'text-amber-500 bg-amber-50',
  survey: 'text-blue-500 bg-blue-50',
  attendance: 'text-red-500 bg-red-50',
  course: 'text-green-500 bg-green-50',
  recommendation: 'text-purple-500 bg-purple-50',
};

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ open, onClose }) => {
  const unread = mockNotifications.filter(n => !n.read).length;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />}

      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l shadow-2xl z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-white" />
            <h2 className="text-white font-semibold text-base">Notifications</h2>
            {unread > 0 && (
              <span className="bg-white text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unread}</span>
            )}
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white"><X className="h-5 w-5" /></button>
        </div>

        {/* List */}
        <div className="overflow-y-auto h-[calc(100vh-64px)] divide-y">
          {mockNotifications.map(n => {
            const Icon = iconMap[n.type];
            const colors = colorMap[n.type];
            return (
              <div key={n.id} className={`px-4 py-3.5 flex gap-3 hover:bg-muted/50 cursor-pointer transition-colors ${!n.read ? 'bg-orange-50/50' : ''}`}>
                <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${colors}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm leading-tight ${!n.read ? 'font-semibold' : 'font-medium'} text-foreground`}>{n.title}</p>
                    {!n.read && <span className="shrink-0 w-2 h-2 rounded-full bg-orange-500 mt-1" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NotificationsPanel;
