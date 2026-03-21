import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Send, Sparkles, TrendingUp, Calculator, Target, Search,
  ShoppingCart, ArrowDownLeft, User, BarChart3, FileText,
  MessageSquarePlus, Wallet, CheckSquare, Compass
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { AuthUser } from '@/components/sip/OTPLoginDialog';
import { FundPurchaseWidget, FundPurchasePrefill } from '@/components/sip/FundPurchaseWidget';
import { SIPChatAvatar } from './SIPBrandLogo';
import { SIP_BRAND } from '@/config/sipBrandConfig';

interface ActionPayload {
  action: string;
  transaction_type?: string;
  search_keyword?: string | null;
  widget_params?: {
    workflow_action?: string;
    original_query?: string;
    message?: string;
    llm_reasoning?: string;
  } | null;
  message?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  agentsUsed?: string[];
  actionPayload?: ActionPayload;
}

interface AgenticChatHomeProps {
  userState: 'anonymous' | 'logged_in_no_holdings' | 'investor';
  onNavigateTab: (tab: string) => void;
  userName?: string;
  authUser?: AuthUser | null;
  fullscreen?: boolean;
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

function getWelcomeMessage(userState: string, authUser?: AuthUser | null): string {
  if (authUser?.name) {
    return SIP_BRAND.welcomeMessages.investor(authUser.name.split(' ')[0]);
  }
  if (userState === 'logged_in_no_holdings') return SIP_BRAND.welcomeMessages.logged_in_no_holdings;
  return SIP_BRAND.welcomeMessages.anonymous;
}

function getOrCreateStored(key: string, prefix: string): string {
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const val = `${prefix}${crypto.randomUUID()}`;
  localStorage.setItem(key, val);
  return val;
}

function buildPrefillFromAction(payload: ActionPayload): FundPurchasePrefill | undefined {
  const wp = payload.widget_params;
  if (wp?.workflow_action === 'fallback_query') {
    return { initialSearchMode: 'ai', initialAIQuery: wp.original_query || '' };
  }
  if (!wp && payload.search_keyword) {
    return { initialSearchMode: 'conventional', initialSearchKeyword: payload.search_keyword, screenerFilters: { query: payload.search_keyword } as any };
  }
  return undefined;
}

export function AgenticChatHome({ userState, onNavigateTab, userName, authUser, fullscreen }: AgenticChatHomeProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', content: getWelcomeMessage(userState, authUser), timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [threadId, setThreadId] = useState(() => getOrCreateStored('discvr_thread_id', ''));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('discvr_thread_id');
    if (!stored || stored.length < 32) {
      const newId = crypto.randomUUID();
      localStorage.setItem('discvr_thread_id', newId);
      setThreadId(newId);
    }
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    const welcome = getWelcomeMessage(userState, authUser);
    setMessages([{ id: 'welcome', role: 'assistant', content: welcome, timestamp: new Date() }]);
    setShowChips(true);
    const newThread = crypto.randomUUID();
    localStorage.setItem('discvr_thread_id', newThread);
    setThreadId(newThread);
  }, [userState, authUser?.id]);

  const getSessionContext = useCallback(() => ({
    user_id: 'a7ca0dcf-3c88-45c6-b4ac-e40fde319956',
    session_id: '382a222a-e064-4fce-9f3c-2195c58655ee',
    thread_id: threadId,
  }), [threadId]);

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

      if (data.type === 'action' && data.payload?.action === 'trigger_transaction_flow') {
        const payload = data.payload as ActionPayload;
        return { id: `r-${Date.now()}`, role: 'assistant', content: payload.message || 'Let me help you with that.', timestamp: new Date(), agentsUsed: data.agents_used, actionPayload: payload };
      }

      return { id: `r-${Date.now()}`, role: 'assistant', content: data.message || 'Sorry, I could not process that. Please try again.', timestamp: new Date(), agentsUsed: data.agents_used };
    } catch (err) {
      console.error('Chat API error:', err);
      return { id: `r-${Date.now()}`, role: 'assistant', content: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.', timestamp: new Date() };
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
    if (chip.tab) onNavigateTab(chip.tab);
    else if (chip.prompt) handleSend(chip.prompt);
  };

  const handleNewChat = () => {
    const welcome = getWelcomeMessage(userState, authUser);
    setMessages([{ id: 'welcome', role: 'assistant', content: welcome, timestamp: new Date() }]);
    setShowChips(true);
    const newThread = crypto.randomUUID();
    localStorage.setItem('discvr_thread_id', newThread);
    setThreadId(newThread);
  };

  return (
    <div className={cn('flex flex-col', fullscreen ? 'h-full' : '')} style={!fullscreen ? { minHeight: showChips ? '420px' : '350px' } : undefined}>
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
        <div className="flex items-center gap-2.5">
          <SIPChatAvatar size="lg" />
          <div>
            <h3 className="text-sm font-bold text-foreground">{SIP_BRAND.name}</h3>
            <p className="text-[10px] text-muted-foreground">{SIP_BRAND.copilotSubtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground font-mono">
            {threadId.slice(0, 8).toUpperCase()}
          </span>
          <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1 text-sip-brand" onClick={handleNewChat}>
            <MessageSquarePlus className="w-3 h-3" /> NEW CHAT
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-2 px-0.5">
        {messages.map(msg => (
          <div key={msg.id} className={cn('flex gap-2.5', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
            {msg.role === 'assistant' && <SIPChatAvatar size="sm" className="mt-0.5" />}
            <div className={cn(msg.role === 'user' ? 'max-w-[85%] items-end' : 'max-w-[95%] items-start')}>
              <div className={cn(
                'rounded-2xl px-4 py-3 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-sip-brand text-sip-brand-foreground rounded-tr-sm'
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

              {msg.actionPayload?.action === 'trigger_transaction_flow' && (
                <div className="mt-2 rounded-xl border border-border bg-background shadow-sm overflow-hidden">
                  <FundPurchaseWidget compact prefill={buildPrefillFromAction(msg.actionPayload)} />
                </div>
              )}

              {msg.agentsUsed && msg.agentsUsed.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {msg.agentsUsed.map(a => (
                    <span key={a} className="text-[9px] px-1.5 py-0.5 rounded-full bg-sip-brand/10 text-sip-brand font-mono">
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
            <SIPChatAvatar size="sm" />
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-background hover:border-sip-brand/40 hover:bg-sip-brand/5 transition-all text-sm text-foreground group shadow-sm"
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
        <div className="flex items-center gap-2 bg-muted/40 rounded-2xl px-4 py-2.5 border border-border focus-within:border-sip-brand/50 focus-within:ring-1 focus-within:ring-sip-brand/20 transition-all">
          <Sparkles className="w-4 h-4 text-sip-brand/60 shrink-0" />
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
                ? 'bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90'
                : 'text-muted-foreground hover:bg-muted'
            )}
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[9px] text-muted-foreground/50 text-center mt-1.5">
          {SIP_BRAND.disclaimer}
        </p>
      </div>
    </div>
  );
}
