import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Send, Sparkles, TrendingUp, Calculator, Target, Search,
  ShoppingCart, ArrowDownLeft, Bot, User, Mic
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
}

const SUGGESTED_PROMPTS: Record<string, { text: string; icon: typeof TrendingUp }[]> = {
  anonymous: [
    { text: 'What are mutual funds and how do they work?', icon: Sparkles },
    { text: 'Show me top performing funds this year', icon: TrendingUp },
    { text: 'How much should I invest monthly to save ₹1 crore?', icon: Calculator },
    { text: 'Which funds save tax under 80C?', icon: Target },
  ],
  logged_in_no_holdings: [
    { text: 'Recommend me funds based on my risk profile', icon: Sparkles },
    { text: 'Help me start my first SIP with ₹1,000', icon: ShoppingCart },
    { text: 'Plan for my retirement in 25 years', icon: Target },
    { text: 'Compare top 3 large cap funds', icon: Search },
  ],
  investor: [
    { text: 'How is my portfolio performing this quarter?', icon: TrendingUp },
    { text: 'Are any of my SIPs underperforming?', icon: Sparkles },
    { text: 'Should I increase my SIP in small caps?', icon: Calculator },
    { text: 'Redeem my worst performing fund', icon: ArrowDownLeft },
  ],
};

const WELCOME_MESSAGES: Record<string, string> = {
  anonymous: "Hi there! 👋 I'm your AI investment assistant. I can help you discover mutual funds, plan your financial goals, and make smarter investment decisions. What would you like to explore?",
  logged_in_no_holdings: "Welcome back! 🎉 I see you haven't started investing yet. Let me help you pick the right funds and set up your first SIP. What's on your mind?",
  investor: "Good to see you! 📊 Your portfolio is looking healthy. I can help you optimize your investments, track goals, or manage your SIPs. What would you like to do?",
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
  'first sip': {
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
};

function getAIResponse(input: string): ChatMessage {
  const lower = input.toLowerCase();
  if (lower.includes('top') || lower.includes('performing') || lower.includes('best')) {
    return { ...MOCK_RESPONSES['top performing'], id: `r-${Date.now()}`, timestamp: new Date() };
  }
  if (lower.includes('sip') || lower.includes('start') || lower.includes('first') || lower.includes('invest')) {
    return { ...MOCK_RESPONSES['first sip'], id: `r-${Date.now()}`, timestamp: new Date() };
  }
  if (lower.includes('portfolio') || lower.includes('holding') || lower.includes('performing')) {
    return { ...MOCK_RESPONSES['portfolio'], id: `r-${Date.now()}`, timestamp: new Date() };
  }
  return {
    id: `r-${Date.now()}`, role: 'assistant', timestamp: new Date(),
    content: `Great question! Let me look into that for you.\n\nBased on current market conditions and your profile, I'd recommend exploring our **fund screener** for personalized results, or I can help you with **goal planning** to find the right investment strategy.`,
    actions: [
      { label: 'Explore Funds', tab: 'screener', icon: Search },
      { label: 'Plan Goals', tab: 'goals', icon: Target },
    ],
  };
}

export function AgenticChatHome({ userState, onNavigateTab }: AgenticChatHomeProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', content: WELCOME_MESSAGES[userState], timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prompts = SUGGESTED_PROMPTS[userState];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: msg, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(msg);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[400px] max-h-[600px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-3 px-1">
        {messages.map(msg => (
          <div key={msg.id} className={cn('flex gap-2.5', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
            <div className={cn(
              'shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
              msg.role === 'assistant'
                ? 'bg-gradient-to-br from-primary to-primary/70 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            )}>
              {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className={cn('max-w-[85%] space-y-2', msg.role === 'user' ? 'items-end' : 'items-start')}>
              <div className={cn(
                'rounded-2xl px-4 py-3 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-card border border-border text-foreground rounded-tl-sm'
              )}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                    {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )}
                  </p>
                ))}
              </div>
              {msg.actions && msg.actions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts — only show when few messages */}
      {messages.length <= 2 && (
        <div className="grid grid-cols-1 gap-1.5 py-2">
          {prompts.map(prompt => (
            <button
              key={prompt.text}
              onClick={() => handleSend(prompt.text)}
              className="flex items-center gap-2 text-left p-2.5 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-xs text-foreground group"
            >
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <prompt.icon className="w-3 h-3 text-primary" />
              </div>
              <span className="line-clamp-1">{prompt.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="pt-2 border-t border-border">
        <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2 border border-border focus-within:border-primary/50 transition-colors">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={userState === 'anonymous' ? 'Ask anything about investing...' : 'Ask me to invest, compare, or plan...'}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 text-primary hover:bg-primary/10"
            onClick={() => handleSend()}
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[9px] text-muted-foreground/60 text-center mt-1.5">
          AI-powered • Your data is secure • Not financial advice
        </p>
      </div>
    </div>
  );
}
