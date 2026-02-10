import React, { useState, useRef, useEffect } from 'react';
import { Send, GraduationCap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import AptechChatMessage from '@/components/aptech/AptechChatMessage';
import AptechLeadForm from '@/components/aptech/AptechLeadForm';
import AptechCourseCard from '@/components/aptech/AptechCourseCard';
import AptechIntentScore from '@/components/aptech/AptechIntentScore';
import { quickPrompts } from '@/data/aptechCourseData';
import {
  createInitialState,
  processUserMessage,
  generateLeadId,
  type ConversationState,
  type LeadData,
} from '@/utils/aptechCounsellorEngine';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  showCourseCards?: boolean;
  showLeadForm?: boolean;
  showIntentScore?: boolean;
  showSummary?: boolean;
}

const WELCOME_MESSAGE = `Hi! 👋 Welcome to Aptech. I'm your AI career counsellor, and I'm here to help you find the perfect program for your career goals.

What brings you here today? Are you looking to start a new career in animation/VFX/gaming, upgrade your skills, explore creative fields like design or filmmaking, or something else?`;

const AptechCounsellor = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, type: 'bot', content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [state, setState] = useState<ConversationState>(createInitialState());
  const [showWelcome, setShowWelcome] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setShowWelcome(false);

    const userMsg: Message = { id: Date.now(), type: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processUserMessage(text, state);
      setState(response.updatedState);

      const botMsg: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.text,
        showCourseCards: response.showCourseCards,
        showLeadForm: response.showLeadForm,
        showIntentScore: response.showIntentScore,
        showSummary: response.showSummary,
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleLeadSubmit = (data: LeadData) => {
    const leadId = generateLeadId();
    const updatedLead = { ...state.leadData, ...data, leadId };
    const updatedState = { ...state, leadData: updatedLead, formCompleted: true };
    setState(updatedState);

    // Process close
    const response = processUserMessage('submitted details', updatedState);
    setState(response.updatedState);

    const botMsg: Message = {
      id: Date.now(),
      type: 'bot',
      content: `Thank you, ${data.name}! 🎉 Your details have been saved.\n\nYour Lead ID: **${leadId}**\n\nOur admissions team will contact you within 2 hours at ${data.mobile}. We'll send a detailed course brochure to ${data.email}.\n\nAll the best for your learning journey! 🚀`,
      showIntentScore: true,
      showSummary: true,
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-orange-50 via-background to-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 via-orange-600 to-blue-600 px-4 py-3 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Aptech Career Counsellor</h1>
            <p className="text-white/70 text-xs">AI-powered guidance for your learning journey</p>
          </div>
          <Badge className="ml-auto bg-white/20 text-white border-0 text-[10px]">
            <Sparkles className="h-3 w-3 mr-1" /> AI Powered
          </Badge>
        </div>
      </header>

      {/* Chat Area */}
      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Quick Prompts */}
          {showWelcome && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {quickPrompts.map(p => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-left p-3 rounded-xl border border-orange-200 bg-white hover:bg-orange-50 hover:border-orange-400 transition-all text-sm text-foreground shadow-sm"
                >
                  <span className="text-orange-500 font-medium">✨ </span>{p}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {messages.map(msg => (
            <AptechChatMessage key={msg.id} type={msg.type} content={msg.content}>
              {/* Course Cards */}
              {msg.showCourseCards && state.matchedCourses.length > 0 && (
                <div className="space-y-2">
                  {state.matchedCourses.map(c => (
                    <AptechCourseCard key={c.id} course={c} />
                  ))}
                </div>
              )}
              {/* Lead Form */}
              {msg.showLeadForm && !state.formCompleted && (
                <AptechLeadForm onSubmit={handleLeadSubmit} />
              )}
              {/* Intent Score */}
              {msg.showIntentScore && state.intentScore.total > 0 && (
                <AptechIntentScore score={state.intentScore} />
              )}
              {/* Summary Card */}
              {msg.showSummary && state.leadData.name && (
                <Card className="border-green-200 bg-green-50 shadow-md">
                  <CardContent className="p-4 space-y-1 text-sm">
                    <h4 className="font-semibold text-green-800">✅ Lead Summary</h4>
                    <p><span className="text-muted-foreground">Name:</span> {state.leadData.name}</p>
                    <p><span className="text-muted-foreground">Contact:</span> {state.leadData.mobile} | {state.leadData.email}</p>
                    {state.leadData.city && <p><span className="text-muted-foreground">City:</span> {state.leadData.city}</p>}
                    {state.leadData.courseInterest && <p><span className="text-muted-foreground">Interest:</span> {state.leadData.courseInterest}</p>}
                    {state.leadData.budgetRange && <p><span className="text-muted-foreground">Budget:</span> {state.leadData.budgetRange}</p>}
                    <p><span className="text-muted-foreground">Lead ID:</span> <code className="text-xs bg-green-100 px-1 rounded">{state.leadData.leadId}</code></p>
                  </CardContent>
                </Card>
              )}
            </AptechChatMessage>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center shadow-md">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Bar */}
      <div className="border-t border-border bg-background px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 rounded-full bg-muted border-0 px-4"
            disabled={isTyping}
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="rounded-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AptechCounsellor;
