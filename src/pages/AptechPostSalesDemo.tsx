import React, { useState } from 'react';
import { MessageSquare, Smartphone, LayoutDashboard } from 'lucide-react';
import PostSalesChatView from '@/components/aptech-postsales/PostSalesChatView';
import PostSalesWhatsAppView from '@/components/aptech-postsales/PostSalesWhatsAppView';
import PostSalesDashboard from '@/components/aptech-postsales/PostSalesDashboard';

type TabId = 'chat' | 'whatsapp' | 'dashboard';

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'chat', label: 'Web Chat', icon: MessageSquare },
  { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const AptechPostSalesDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('chat');

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Tab Bar */}
      <div className="bg-slate-900 flex items-center justify-center gap-1 px-3 py-1.5 border-b border-slate-700 shrink-0">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && <PostSalesChatView />}
        {activeTab === 'whatsapp' && <PostSalesWhatsAppView />}
        {activeTab === 'dashboard' && <PostSalesDashboard />}
      </div>
    </div>
  );
};

export default AptechPostSalesDemo;
