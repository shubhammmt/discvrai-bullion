import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Send, Sparkles, TrendingUp, Calculator, Target, Search,
  ShoppingCart, ArrowDownLeft, Bot, User, BarChart3, FileText,
  MessageSquarePlus, Wallet, CheckSquare, Compass
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: { label: string; tab?: string; icon?: typeof TrendingUp }[];
}

interface AgenticChatHomeProps {
  userState: 'anonymous' | 'logged_in_no_holdings' | 'investor';
  onNavigateTab: (tab: string) => void;
  userName?: string;
}

// Action chips matching the reference screenshot layout
const ACTION_CHIPS: { label: string; emoji: string; tab?: string; prompt?: string }[][] = [
  [
    { label: 'Ask me anything', emoji: '✨', prompt: 'What can you help me with?' },
    { label: 'Plan for Goals', emoji: '🎯', tab: 'goals' },
    { label: 'Advise on my Portfolio', emoji: '📊', tab: 'portfolio' },
  ],
  [
    { label: 'Explore Funds', emoji: '🔍', tab: 'screener' },
    { label: 'Fund Screener', emoji: '⚙️', tab: 'screener' },
    { label: 'Calculate my Returns', emoji: '🧮', tab: 'calculator' },
  ],
  [
    { label: 'Statements', emoji: '📄', tab: 'statements' },
    { label: 'I want to Invest', emoji: '💰', tab: 'buy' },
    { label: 'KYC Complete', emoji: '✅' },
  ],
];

const WELCOME_MESSAGES: Record<string, string> = {
  anonymous: "Hi there! 👋 I am your Wealth Copilot. I can help you in following:",
  logged_in_no_holdings: "Welcome! 👋 I am your Wealth Copilot. I can help you in following:",
  investor: "Hi Shubham! 👋 I am your Wealth Copilot. I can help you in following:",
};

const MOCK_RESPONSES: Record<string, ChatMessage> = {
  'top performing': {
    id: 'r1', role: 'assistant', timestamp: new Date(),
    content: "Here are the **top performing equity funds** this year:\n\n1. 🏆 **Quant Small Cap Fund** — +42.3% (1Y)\n2. **Nippon India Small Cap** — +38.1% (1Y)\n3. **HDFC Mid-Cap Opportunities** — +31.5% (1Y)\n\nWould you like me to compare any of these, or start a SIP?",
    actions: [
      { label: 'Start SIP', tab: 'buy', icon: ShoppingCart },
      { label: 'Compare Funds', tab: 'screener', icon: Search },
    ],
  },
  'invest': {
    id: 'r2', role: 'assistant', timestamp: new Date(),
    content: "Great choice! 🚀 Starting a SIP is the best way to begin.\n\nBased on a ₹1,000/month budget, I'd recommend:\n\n• **Nifty 50 Index Fund** — Low cost, diversified (ER: 0.1%)\n• **Parag Parikh Flexi Cap** — Top-rated multi-cap (★★★★★)\n\nShall I set one up for you?",
    actions: [
      { label: 'Invest Now', tab: 'buy', icon: ShoppingCart },
      { label: 'Use Calculator', tab: 'calculator', icon: Calculator },
    ],
  },
  'portfolio': {
    id: 'r3', role: 'assistant', timestamp: new Date(),
    content: "📊 **Portfolio Summary**\n\n• Total Value: **₹4,85,200** (+12.4% overall)\n• Monthly SIPs: **₹15,000** across 4 funds\n• Best performer: **Quant Small Cap** (+28.3%)\n• Needs attention: **Aditya Birla Tax Relief** (underperforming benchmark)\n\nI can help you rebalance or switch underperformers.",
    actions: [
      { label: 'View Portfolio', tab: 'portfolio', icon: TrendingUp },
      { label: 'Manage SIPs', tab: 'manage' },
    ],
  },
  'default': {
    id: 'rd', role: 'assistant', timestamp: new Date(),
    content: "Great question! Let me look into that.\n\nBased on current market conditions, I'd recommend exploring our **fund screener** for personalized results, or I can help with **goal planning** to find the right strategy.",
    actions: [
      { label: 'Explore Funds', tab: 'screener', icon: Search },
      { label: 'Plan Goals', tab: 'goals', icon: Target },
    ],
  },
};

function getAIResponse(input: string): ChatMessage {
  const lower = input.toLowerCase();
  if (lower.includes('top') || lower.includes('performing') || lower.includes('best'))
    return { ...MOCK_RESPONSES['top performing'], id: `r-${Date.now()}`, timestamp: new Date() };
  if (lower.includes('sip') || lower.includes('start') || lower.includes('invest'))
    return { ...MOCK_RESPONSES['invest'], id: `r-${Date.now()}`, timestamp: new Date() };
  if (lower.includes('portfolio') || lower.includes('holding') || lower.includes('advise'))
    return { ...MOCK_RESPONSES['portfolio'], id: `r-${Date.now()}`, timestamp: new Date() };
  return { ...MOCK_RESPONSES['default'], id: `r-${Date.now()}`, timestamp: new Date() };
}

export function AgenticChatHome({ userState, onNavigateTab, userName }: AgenticChatHomeProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', content: WELCOME_MESSAGES[userState], timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset when user state changes
  useEffect(() => {
    setMessages([{ id: 'welcome', role: 'assistant', content: WELCOME_MESSAGES[userState], timestamp: new Date() }]);
    setShowChips(true);
  }, [userState]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    setShowChips(false);
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: msg, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, getAIResponse(msg)]);
      setIsTyping(false);
    }, 600 + Math.random() * 600);
  };

  const handleChipClick = (chip: typeof ACTION_CHIPS[0][0]) => {
    if (chip.tab) {
      onNavigateTab(chip.tab);
    } else if (chip.prompt) {
      handleSend(chip.prompt);
    }
  };

  return (
    <div className="flex flex-col" style={{ minHeight: showChips ? '420px' : '350px' }}>
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">DiscvrAI</h3>
            <p className="text-[10px] text-muted-foreground">Your Wealth Copilot</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground font-mono">THREAD: {Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-[10px] gap-1 text-primary"
            onClick={() => {
              setMessages([{ id: 'welcome', role: 'assistant', content: WELCOME_MESSAGES[userState], timestamp: new Date() }]);
              setShowChips(true);
            }}
          >
            <MessageSquarePlus className="w-3 h-3" /> NEW CHAT
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-2 px-0.5">
        {messages.map(msg => (
          <div key={msg.id} className={cn('flex gap-2.5', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
            {msg.role === 'assistant' && (
              <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mt-0.5">
                <Bot className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            )}
            <div className={cn('max-w-[85%]', msg.role === 'user' ? 'items-end' : 'items-start')}>
              <div className={cn(
                'rounded-2xl px-4 py-3 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-muted/60 border border-border text-foreground rounded-tl-sm'
              )}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                    {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )}
                  </p>
                ))}
              </div>
              {msg.actions && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {msg.actions.map(action => (
                    <Button
                      key={action.label}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10"
                      onClick={() => action.tab && onNavigateTab(action.tab)}
                    >
                      {action.icon && <action.icon className="w-3 h-3" />}
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div className="bg-muted/60 border border-border rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Action Chips — Grid layout like the reference */}
      {showChips && (
        <div className="space-y-2 py-3">
          {ACTION_CHIPS.map((row, ri) => (
            <div key={ri} className="flex flex-wrap justify-center gap-2">
              {row.map(chip => (
                <button
                  key={chip.label}
                  onClick={() => handleChipClick(chip)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-background hover:border-primary/40 hover:bg-primary/5 transition-all text-sm text-foreground group shadow-sm"
                >
                  <span>{chip.emoji}</span>
                  <span className="font-medium">{chip.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="pt-3 border-t border-border">
        <div className="flex items-center gap-2 bg-muted/40 rounded-2xl px-4 py-2.5 border border-border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
          <Sparkles className="w-4 h-4 text-primary/60 shrink-0" />
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about funds, SIPs, goals, or anything..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
          />
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              'h-8 w-8 p-0 rounded-full transition-all',
              input.trim()
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'text-muted-foreground hover:bg-muted'
            )}
            onClick={() => handleSend()}
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[9px] text-muted-foreground/50 text-center mt-1.5">
          AI-powered • Your data is secure • Not financial advice
        </p>
      </div>
    </div>
  );
}
