import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, User, Bell, Menu, Play, Pause, SkipForward, RotateCcw, Bot, GraduationCap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import AptechChatMessage from '@/components/aptech/AptechChatMessage';
import StudentProfilePanel from './StudentProfilePanel';
import NotificationsPanel from './NotificationsPanel';
import { mockConversationThread, mockNotifications, type DemoMessage } from '@/data/aptechPostSalesDemoData';
import { useIsMobile } from '@/hooks/use-mobile';

const PostSalesChatView: React.FC = () => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showStartCard, setShowStartCard] = useState(true);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const unread = mockNotifications.filter(n => !n.read).length;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const playNextStep = useCallback(() => {
    if (currentStep >= mockConversationThread.length) {
      setIsPlaying(false);
      return;
    }

    const step = mockConversationThread[currentStep];
    setIsTyping(true);

    const delay = step.type === 'user' ? 1200 : 1800;
    timerRef.current = setTimeout(() => {
      setMessages(prev => [...prev, step]);
      setIsTyping(false);
      setCurrentStep(prev => prev + 1);
    }, delay);
  }, [currentStep]);

  useEffect(() => {
    if (isPlaying && currentStep < mockConversationThread.length) {
      playNextStep();
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, currentStep, playNextStep]);

  const startDemo = () => {
    setMessages([]);
    setCurrentStep(0);
    setIsPlaying(true);
    setShowStartCard(false);
  };

  const resetDemo = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessages([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setIsTyping(false);
    setShowStartCard(true);
  };

  // Handle free-text input for demo (pattern-match known queries)
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: DemoMessage = { id: Date.now(), type: 'user', content: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), messageType: 'user-query' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simple pattern matching for demo
    setTimeout(() => {
      let reply = "I'm here to help! Could you tell me more about what you need?";
      const lower = input.toLowerCase();
      if (lower.includes('certificate')) {
        reply = "📜 Certificates are available under **Profile → Certificates** in ProConnect after course completion. If you don't see it after your course ends, reply **SUPPORT** and we'll escalate.";
      } else if (lower.includes('next session') || lower.includes('next class')) {
        reply = "Your next session is **March 28 (Monday) — Digital Sculpting (ZBrush)** at 10:00 AM. See you there! 🎬";
      } else if (lower.includes('fee') || lower.includes('payment')) {
        reply = "Your next installment of **₹14,167** is due on **April 3, 2026**. Pay here: [Payment Link](https://pay.aptech.edu/s/rahul-verma)";
      } else if (lower.includes('attendance') || lower.includes('absent')) {
        reply = "You've attended **6 out of 8 sessions** so far. You missed Session 7 & 8. Your next session is March 28.";
      }
      const botMsg: DemoMessage = { id: Date.now() + 1, type: 'bot', content: reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), messageType: 'bot-reply' };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-orange-50/50 via-background to-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 via-orange-600 to-blue-600 px-4 py-3 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {/* Profile button (left) */}
          <button onClick={() => setProfileOpen(true)} className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors" title="Student Profile">
            {isMobile ? <Menu className="h-5 w-5 text-white" /> : <User className="h-5 w-5 text-white" />}
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-bold text-lg leading-tight">Aptech Post-Sales Agent</h1>
            <p className="text-white/70 text-xs">One agent • Enrollment → Completion</p>
          </div>
          {/* Notifications (right) */}
          <button onClick={() => setNotificationsOpen(true)} className="relative w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors" title="Notifications">
            <Bell className="h-5 w-5 text-white" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">{unread}</span>
            )}
          </button>
          <Badge className="bg-white/20 text-white border-0 text-[10px] hidden sm:flex">
            <Sparkles className="h-3 w-3 mr-1" /> Agentic
          </Badge>
        </div>
      </header>

      {/* Demo Controls */}
      <div className="bg-gray-900 px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded">POST-SALES DEMO</span>
          <span className="text-[11px] text-gray-400">Step {currentStep}/{mockConversationThread.length}</span>
        </div>
        <div className="flex items-center gap-1">
          {isPlaying ? (
            <Button variant="ghost" size="sm" onClick={() => { setIsPlaying(false); if (timerRef.current) clearTimeout(timerRef.current); }} className="h-7 px-2 text-white hover:text-orange-400 hover:bg-white/10">
              <Pause className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => currentStep === 0 ? startDemo() : setIsPlaying(true)} className="h-7 px-2 text-white hover:text-orange-400 hover:bg-white/10">
              <Play className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); setCurrentStep(prev => Math.min(prev + 1, mockConversationThread.length)); setIsPlaying(true); }} className="h-7 px-2 text-white hover:text-orange-400 hover:bg-white/10">
            <SkipForward className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={resetDemo} className="h-7 px-2 text-white hover:text-orange-400 hover:bg-white/10">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-700" style={{ position: 'relative' }}>
          <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500" style={{ width: `${(currentStep / mockConversationThread.length) * 100}%` }} />
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Start Card */}
          {showStartCard && (
            <div className="bg-card rounded-2xl shadow-lg p-6 border text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-1">Post-Sales Demo</h3>
              <p className="text-sm text-muted-foreground mb-4">Watch the full student journey: Day 1 welcome → surveys → triggers → fees → query → recommendation — in one thread.</p>
              <div className="flex gap-2 justify-center mb-4">
                <button onClick={() => setProfileOpen(true)} className="text-xs px-3 py-1.5 rounded-lg border hover:bg-muted transition-colors">👤 View Profile</button>
                <button onClick={() => setNotificationsOpen(true)} className="text-xs px-3 py-1.5 rounded-lg border hover:bg-muted transition-colors">🔔 Notifications</button>
              </div>
              <Button onClick={startDemo} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                <Play className="h-4 w-4 mr-2" /> Start Demo
              </Button>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <React.Fragment key={msg.id}>
              {msg.dayLabel && (
                <div className="flex justify-center py-2">
                  <span className="bg-orange-100 text-orange-700 text-[11px] px-3 py-1 rounded-full font-medium shadow-sm">
                    {msg.dayLabel}
                  </span>
                </div>
              )}
              <AptechChatMessage type={msg.type} content={msg.content} />
            </React.Fragment>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center shadow-md">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-card border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t bg-background p-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything... (e.g. Where's my certificate?)"
            className="flex-1 h-10 rounded-full border px-4 text-sm bg-muted/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <Button size="icon" onClick={handleSend} className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      {/* Side Panels */}
      <StudentProfilePanel open={profileOpen} onClose={() => setProfileOpen(false)} />
      <NotificationsPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </div>
  );
};

export default PostSalesChatView;
