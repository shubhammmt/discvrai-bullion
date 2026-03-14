import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquarePlus, Clock, Search, ChevronRight, Bot, Trash2, Pin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  messageCount: number;
  pinned?: boolean;
  tags?: string[];
}

interface ChatHistoryPanelProps {
  onNewChat: () => void;
  onSelectConversation?: (id: string) => void;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1', title: 'Best ELSS funds for tax saving',
    preview: 'I recommended Quant Tax Plan and Mirae Asset Tax Saver based on 3Y returns...',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), messageCount: 8, pinned: true,
    tags: ['Tax Saving', 'ELSS'],
  },
  {
    id: 'c2', title: 'SIP increase strategy',
    preview: 'Based on your 15% annual step-up plan, your corpus could reach ₹1.2 Cr by 2040...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), messageCount: 12,
    tags: ['SIP', 'Planning'],
  },
  {
    id: 'c3', title: 'Portfolio rebalancing review',
    preview: 'Your equity allocation is 78% which is higher than recommended. Consider moving 8% to debt...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), messageCount: 15, pinned: true,
    tags: ['Portfolio', 'Rebalance'],
  },
  {
    id: 'c4', title: 'Small cap vs mid cap comparison',
    preview: 'Small caps have outperformed mid caps in last 3Y but with higher volatility...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), messageCount: 6,
    tags: ['Research'],
  },
  {
    id: 'c5', title: 'Retirement planning at 30',
    preview: 'For a ₹5 Cr retirement corpus by 55, you need ₹18,500/month SIP assuming 12% returns...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), messageCount: 20,
    tags: ['Goals', 'Retirement'],
  },
  {
    id: 'c6', title: 'NFO analysis - Mirae EV Fund',
    preview: 'The EV theme is growing but the fund has no track record. Consider waiting for...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), messageCount: 4,
    tags: ['NFO', 'Research'],
  },
  {
    id: 'c7', title: 'Emergency fund allocation',
    preview: 'For 6 months of expenses (₹3L), I suggest splitting between liquid fund and overnight fund...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), messageCount: 9,
    tags: ['Emergency', 'Debt'],
  },
];

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function ChatHistoryPanel({ onNewChat, onSelectConversation }: ChatHistoryPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = MOCK_CONVERSATIONS.filter(c =>
    !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pinned = filtered.filter(c => c.pinned);
  const recent = filtered.filter(c => !c.pinned);

  const handleSelect = (id: string) => {
    setActiveId(id);
    onSelectConversation?.(id);
  };

  return (
    <div className="space-y-4">
      {/* New Chat Button */}
      <Button
        onClick={onNewChat}
        className="w-full gap-2 h-11 text-sm font-semibold"
        size="lg"
      >
        <MessageSquarePlus className="w-4 h-4" />
        New Conversation
      </Button>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search conversations..."
          className="w-full bg-muted/50 border border-border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Pinned Conversations */}
      {pinned.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
            <Pin className="w-3 h-3" /> Pinned
          </p>
          <div className="space-y-1.5">
            {pinned.map(conv => (
              <ConversationItem key={conv.id} conv={conv} active={activeId === conv.id} onSelect={handleSelect} />
            ))}
          </div>
        </div>
      )}

      {/* Recent */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Recent
        </p>
        <div className="space-y-1.5">
          {recent.map(conv => (
            <ConversationItem key={conv.id} conv={conv} active={activeId === conv.id} onSelect={handleSelect} />
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8">
          <Bot className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No conversations found</p>
        </div>
      )}
    </div>
  );
}

function ConversationItem({ conv, active, onSelect }: { conv: Conversation; active: boolean; onSelect: (id: string) => void }) {
  return (
    <button
      onClick={() => onSelect(conv.id)}
      className={cn(
        'w-full text-left p-3 rounded-xl border transition-all group',
        active
          ? 'border-primary/40 bg-primary/5'
          : 'border-border hover:border-primary/20 hover:bg-muted/30'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-foreground truncate">{conv.title}</p>
          <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">{conv.preview}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[9px] text-muted-foreground">{timeAgo(conv.timestamp)}</p>
          <p className="text-[9px] text-muted-foreground mt-0.5">{conv.messageCount} msgs</p>
        </div>
      </div>
      {conv.tags && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {conv.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-[8px] h-4 px-1.5">{tag}</Badge>
          ))}
        </div>
      )}
    </button>
  );
}
