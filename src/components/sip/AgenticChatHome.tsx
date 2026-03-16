import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Send, Sparkles, TrendingUp, Calculator, Target, Search,
  ShoppingCart, ArrowDownLeft, Bot, User, BarChart3, FileText,
  MessageSquarePlus, Wallet, CheckSquare, Compass
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { AuthUser } from '@/components/sip/OTPLoginDialog';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  agentsUsed?: string[];
}

interface AgenticChatHomeProps {
  userState: 'anonymous' | 'logged_in_no_holdings' | 'investor';
  onNavigateTab: (tab: string) => void;
  userName?: string;
  authUser?: AuthUser | null;
}

const CHAT_API_URL = 'https://agentapi.discvr.ai/webhook/bd9626e9-20de-49dd-a4da-0d9c6c5555d6';

const ACTION_CHIPS: { label: string; emoji: string; tab?: string; prompt?: string }[][] = [
  [
    { label: 'Ask me anything', emoji: '✨', prompt: 'What can you help me with?' },
    { label: 'Plan for Goals', emoji: '🎯', tab: 'goals' },
    { label: 'Advise on my Portfolio', emoji: '📊', prompt: 'Advise on my portfolio' },
  ],
  [
    { label: 'Explore Funds', emoji: '🔍', tab: 'screener' },
    { label: 'Fund Screener', emoji: '⚙️', tab: 'screener' },
    { label: 'Calculate my Returns', emoji: '🧮', tab: 'calculator' },
  ],
  [
    { label: 'Statements', emoji: '📄', tab: 'statements' },
    { label: 'I want to Invest', emoji: '💰', prompt: 'I want to invest' },
    { label: 'KYC Complete', emoji: '✅', prompt: 'Is my KYC complete?' },
  ],
];

const WELCOME_MESSAGES: Record<string, string> = {
  anonymous: "Hi there! 👋 I am your Wealth Copilot. I can help you in following:",
  logged_in_no_holdings: "Welcome! 👋 I am your Wealth Copilot. I can help you in following:",
  investor: "Hi Shubham! 👋 I am your Wealth Copilot. I can help you in following:",
};

function getOrCreateStored(key: string, prefix: string): string {
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const val = `${prefix}${crypto.randomUUID()}`;
  localStorage.setItem(key, val);
  return val;
}

export function AgenticChatHome({ userState, onNavigateTab, userName, authUser }: AgenticChatHomeProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', content: WELCOME_MESSAGES[userState], timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [threadId, setThreadId] = useState(() => getOrCreateStored('discvr_thread_id', ''));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Ensure thread_id is a proper UUID (no prefix)
  useEffect(() => {
    const stored = localStorage.getItem('discvr_thread_id');
    if (!stored || stored.length < 32) {
      const newId = crypto.randomUUID();
      localStorage.setItem('discvr_thread_id', newId);
      setThreadId(newId);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const welcome = authUser?.name
      ? `Hi ${authUser.name.split(' ')[0]}! 👋 I am your Wealth Copilot. I can help you in following:`
      : WELCOME_MESSAGES[userState];
    setMessages([{ id: 'welcome', role: 'assistant', content: welcome, timestamp: new Date() }]);
    setShowChips(true);
    // New thread on user change
    const newThread = crypto.randomUUID();
    localStorage.setItem('discvr_thread_id', newThread);
    setThreadId(newThread);
  }, [userState, authUser?.id]);

  const getSessionContext = useCallback(() => {
    if (authUser?.id) {
      // Logged-in user — use real IDs
      try {
        const session = localStorage.getItem('discvr_session');
        const parsed = session ? JSON.parse(session) : null;
        return {
          user_id: authUser.id,
          session_id: parsed?.session_id || `sess_${crypto.randomUUID()}`,
          thread_id: threadId,
        };
      } catch {
        return { user_id: authUser.id, session_id: `sess_${crypto.randomUUID()}`, thread_id: threadId };
      }
    }
    // Guest user — persistent guest IDs
    const guestUserId = getOrCreateStored('discvr_guest_user_id', 'guest_');
    const guestSessionId = getOrCreateStored('discvr_guest_session_id', 'sess_');
    return {
      user_id: guestUserId,
      session_id: guestSessionId,
      thread_id: threadId,
    };
  }, [authUser, threadId]);

  const sendToAPI = useCallback(async (message: string): Promise<ChatMessage> => {
    const context = getSessionContext();
    try {
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, thread_id: threadId, context }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      return {
        id: `r-${Date.now()}`,
        role: 'assistant',
        content: data.message || 'Sorry, I could not process that. Please try again.',
        timestamp: new Date(),
        agentsUsed: data.agents_used,
      };
    } catch (err) {
      console.error('Chat API error:', err);
      return {
        id: `r-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.',
        timestamp: new Date(),
      };
    }
  }, [getSessionContext, threadId]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    setShowChips(false);
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: msg, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await sendToAPI(msg);
    setMessages(prev => [...prev, response]);
    setIsTyping(false);
  };

  const handleChipClick = (chip: typeof ACTION_CHIPS[0][0]) => {
    if (chip.tab) {
      onNavigateTab(chip.tab);
    } else if (chip.prompt) {
      handleSend(chip.prompt);
    }
  };

  const handleNewChat = () => {
    const welcome = authUser?.name
      ? `Hi ${authUser.name.split(' ')[0]}! 👋 I am your Wealth Copilot. I can help you in following:`
      : WELCOME_MESSAGES[userState];
    setMessages([{ id: 'welcome', role: 'assistant', content: welcome, timestamp: new Date() }]);
    setShowChips(true);
    const newThread = crypto.randomUUID();
    localStorage.setItem('discvr_thread_id', newThread);
    setThreadId(newThread);
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
          <span className="text-[9px] text-muted-foreground font-mono">
            {threadId.slice(0, 8).toUpperCase()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-[10px] gap-1 text-primary"
            onClick={handleNewChat}
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
                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-1.5 [&>p:last-child]:mb-0 [&>ul]:mt-1 [&>ol]:mt-1">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>
              {msg.agentsUsed && msg.agentsUsed.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {msg.agentsUsed.map(a => (
                    <span key={a} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
                      {a}
                    </span>
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

      {/* Action Chips */}
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
            disabled={!input.trim() || isTyping}
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
