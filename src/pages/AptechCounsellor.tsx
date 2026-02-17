import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, GraduationCap, Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import AptechChatMessage from '@/components/aptech/AptechChatMessage';
import AptechLeadForm from '@/components/aptech/AptechLeadForm';
import AptechCourseCard from '@/components/aptech/AptechCourseCard';
import AptechIntentScore from '@/components/aptech/AptechIntentScore';
import AptechOptionChips from '@/components/aptech/AptechOptionChips';
import AptechPaymentFlow from '@/components/aptech/AptechPaymentFlow';
import type { PaymentData } from '@/components/aptech/AptechPaymentFlow';
import AptechEnrollmentConfirmation from '@/components/aptech/AptechEnrollmentConfirmation';
import AptechCenterVisitScheduler from '@/components/aptech/AptechCenterVisitScheduler';
import AptechOfferBanner from '@/components/aptech/AptechOfferBanner';
import { detectOffers, type OfferInfo } from '@/components/aptech/AptechOfferBanner';
import AptechDemoControls, { demoScript } from '@/components/aptech/AptechDemoControls';
import { quickPrompts, coursePrograms } from '@/data/aptechCourseData';
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
  showPayment?: boolean;
  showOffer?: boolean;
  showScheduler?: boolean;
  showEnrollment?: boolean;
  options?: string[];
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

  // Payment & enrollment state
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [enrollmentId, setEnrollmentId] = useState('');
  const [activeOffer, setActiveOffer] = useState<OfferInfo | null>(null);

  // Demo mode state
  const [demoMode, setDemoMode] = useState(false);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const demoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Demo mode auto-play
  const playNextDemoStep = useCallback(() => {
    if (demoStep >= demoScript.length) {
      setDemoPlaying(false);
      return;
    }

    const step = demoScript[demoStep];

    if (step.type === 'user') {
      // Disable previous options
      setMessages(prev =>
        prev.map(msg => (msg.type === 'bot' && msg.options ? { ...msg, options: undefined } : msg))
      );
    }

    setIsTyping(true);
    demoTimerRef.current = setTimeout(() => {
      const msg: Message = {
        id: Date.now() + demoStep,
        type: step.type,
        content: step.text,
        showCourseCards: step.showCourseCards,
        showLeadForm: step.showLeadForm,
        showPayment: step.showPayment,
        showOffer: step.showOffer,
        showScheduler: step.showScheduler,
        showEnrollment: step.showEnrollment,
        showIntentScore: step.showIntentScore,
        showSummary: step.showSummary,
        options: step.options,
      };

      // Update state for demo
      if (step.showCourseCards) {
        setState(prev => ({
          ...prev,
          matchedCourses: coursePrograms.filter(c => c.category === 'Animation & VFX'),
          courseCardShown: true,
          detectedInterests: ['Animation & VFX'],
        }));
      }
      if (step.showOffer) {
        setActiveOffer({
          id: 'early_bird',
          label: 'Early Bird Discount',
          description: 'Enroll this month and save!',
          discountPercent: 15,
          expiresInMinutes: 30,
          type: 'early_bird',
        });
      }
      if (step.autoFillLead) {
        const lead = step.autoFillLead;
        setState(prev => ({
          ...prev,
          leadData: {
            ...prev.leadData,
            ...lead,
            leadId: 'APT-2026-02-17-DEMO',
          },
          formCompleted: true,
          leadData_city: lead.city,
        } as any));
      }
      if (step.showPayment) {
        setState(prev => ({
          ...prev,
          leadData: {
            ...prev.leadData,
            name: 'Ram Ji',
            mobile: '+91 98765 43210',
            email: 'ramji@email.com',
            city: 'Mumbai',
            preferredCenter: 'Andheri West',
            budgetRange: 'Flexible / EMI',
            startDate: 'This month',
            currentStatus: 'Graduate',
            educationalBackground: 'Graduate',
            courseInterest: 'Animation & VFX',
            leadId: 'APT-2026-02-17-DEMO',
          },
          formCompleted: true,
        }));
      }
      if (step.showEnrollment) {
        setPaymentData({
          courseName: 'Animation & VFX Pro',
          courseId: 'arena-anim-vfx',
          amountPaid: 10625,
          originalAmount: 200000,
          emiPlan: '12 Month EMI',
          transactionId: 'TXN-DEMO-2026',
          discountApplied: 'Early Bird Discount',
        });
        setEnrollmentId('ENR-2026-02-17-DEMO');
      }
      if (step.showIntentScore) {
        setState(prev => ({
          ...prev,
          intentScore: { total: 92, budgetMatch: 25, urgency: 25, engagement: 22, courseFit: 20 },
        }));
      }

      setMessages(prev => [...prev, msg]);
      setIsTyping(false);
      setDemoStep(prev => prev + 1);
    }, step.delay);
  }, [demoStep]);

  useEffect(() => {
    if (demoMode && demoPlaying && demoStep < demoScript.length) {
      playNextDemoStep();
    }
    return () => {
      if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
    };
  }, [demoMode, demoPlaying, demoStep, playNextDemoStep]);

  const startDemo = () => {
    setMessages([{ id: 0, type: 'bot', content: WELCOME_MESSAGE }]);
    setState(createInitialState());
    setShowWelcome(false);
    setDemoMode(true);
    setDemoPlaying(true);
    setDemoStep(0);
    setPaymentData(null);
    setActiveOffer(null);
    setEnrollmentId('');
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || demoMode) return;
    setShowWelcome(false);

    setMessages(prev =>
      prev.map(msg => (msg.type === 'bot' && msg.options ? { ...msg, options: undefined } : msg))
    );

    const userMsg: Message = { id: Date.now(), type: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processUserMessage(text, state);
      setState(response.updatedState);

      // Detect offers after qualification data is collected
      const updatedState = response.updatedState;
      if (updatedState.leadData.startDate && !activeOffer) {
        const offers = detectOffers({
          educationalBackground: updatedState.leadData.educationalBackground,
          currentStatus: updatedState.leadData.currentStatus,
          startDate: updatedState.leadData.startDate,
        });
        if (offers.length > 0) {
          setActiveOffer(offers[0]);
        }
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.text,
        showCourseCards: response.showCourseCards,
        showLeadForm: response.showLeadForm,
        showIntentScore: response.showIntentScore,
        showSummary: response.showSummary,
        options: response.options,
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

    // Show payment flow after lead capture
    const hasOffer = activeOffer !== null;
    const selectedCourse = state.matchedCourses[0] || coursePrograms[0];

    const botMsg: Message = {
      id: Date.now(),
      type: 'bot',
      content: `Thank you, ${data.name}! 🎉 Your details have been saved.\n\nYour Lead ID: **${leadId}**\n\n${hasOffer ? `Great news — your ${activeOffer!.label} (${activeOffer!.discountPercent}% off) has been applied!` : ''}\n\nLet's complete your enrollment! Here's the payment setup:`,
      showPayment: true,
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const handlePaymentComplete = (payment: PaymentData) => {
    setPaymentData(payment);
    const eid = `ENR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setEnrollmentId(eid);

    const botMsg: Message = {
      id: Date.now(),
      type: 'bot',
      content: `🎓 **Congratulations ${state.leadData.name}!** Your enrollment is confirmed!\n\nWelcome to the Aptech family. Here's your enrollment receipt and next steps:`,
      showEnrollment: true,
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const handleScheduleVisit = () => {
    const botMsg: Message = {
      id: Date.now(),
      type: 'bot',
      content: `Let's schedule your center orientation visit! Pick a date and time that works for you:`,
      showScheduler: true,
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const handleVisitScheduled = () => {
    const botMsg: Message = {
      id: Date.now(),
      type: 'bot',
      content: `Everything is set! 🎉 Here's a final summary of your journey with us today.\n\nOur academic advisor will call you within 24 hours. Welcome aboard, ${state.leadData.name}! 🚀`,
      showIntentScore: true,
      showSummary: true,
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const handleApplyOffer = (offer: OfferInfo) => {
    setActiveOffer(offer);
    const botMsg: Message = {
      id: Date.now(),
      type: 'bot',
      content: `🎉 **${offer.label} applied!** You'll get ${offer.discountPercent}% off on your enrollment.\n\nThis offer is locked for you. Ready to proceed?`,
      options: ['Continue to enrollment', 'Tell me more about the course'],
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const selectedCourse = state.matchedCourses[0] || coursePrograms[0];

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
            <p className="text-white/70 text-xs">AI-powered guidance • Discovery → Enrollment</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {!demoMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={startDemo}
                className="text-white hover:bg-white/20 text-xs h-7"
              >
                <Play className="h-3 w-3 mr-1" /> Auto Demo
              </Button>
            )}
            <Badge className="bg-white/20 text-white border-0 text-[10px]">
              <Sparkles className="h-3 w-3 mr-1" /> AI Powered
            </Badge>
          </div>
        </div>
      </header>

      {/* Demo Controls */}
      {demoMode && (
        <div className="relative">
          <AptechDemoControls
            isPlaying={demoPlaying}
            currentStep={demoStep}
            totalSteps={demoScript.length}
            onPlay={() => setDemoPlaying(true)}
            onPause={() => {
              setDemoPlaying(false);
              if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
            }}
            onSkip={() => {
              if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
              setDemoStep(prev => Math.min(prev + 1, demoScript.length));
              setDemoPlaying(true);
            }}
            onReset={() => {
              if (demoTimerRef.current) clearTimeout(demoTimerRef.current);
              setDemoMode(false);
              setDemoPlaying(false);
              setDemoStep(0);
              setMessages([{ id: 0, type: 'bot', content: WELCOME_MESSAGE }]);
              setState(createInitialState());
              setShowWelcome(true);
              setPaymentData(null);
              setActiveOffer(null);
              setEnrollmentId('');
            }}
          />
        </div>
      )}

      {/* Chat Area */}
      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Quick Prompts */}
          {showWelcome && !demoMode && (
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
              {/* Offer Banner */}
              {msg.showOffer && activeOffer && (
                <AptechOfferBanner offer={activeOffer} onApply={handleApplyOffer} />
              )}
              {/* Lead Form */}
              {msg.showLeadForm && !state.formCompleted && (
                <AptechLeadForm onSubmit={handleLeadSubmit} />
              )}
              {/* Payment Flow */}
              {msg.showPayment && !paymentData && (
                <AptechPaymentFlow
                  course={selectedCourse}
                  leadName={state.leadData.name || 'Student'}
                  onPaymentComplete={handlePaymentComplete}
                  offer={activeOffer ? { label: activeOffer.label, discountPercent: activeOffer.discountPercent } : undefined}
                />
              )}
              {/* Enrollment Confirmation */}
              {msg.showEnrollment && paymentData && (
                <AptechEnrollmentConfirmation
                  payment={paymentData}
                  leadId={state.leadData.leadId || 'APT-PENDING'}
                  enrollmentId={enrollmentId}
                  leadName={state.leadData.name || ''}
                  leadEmail={state.leadData.email || ''}
                  leadMobile={state.leadData.mobile || ''}
                  onScheduleVisit={handleScheduleVisit}
                />
              )}
              {/* Center Visit Scheduler */}
              {msg.showScheduler && (
                <AptechCenterVisitScheduler
                  centerName={state.leadData.preferredCenter || 'Andheri West'}
                  city={state.leadData.city || 'Mumbai'}
                  courseName={selectedCourse.name}
                  onScheduled={handleVisitScheduled}
                />
              )}
              {/* Option Chips */}
              {msg.options && msg.options.length > 0 && (
                <AptechOptionChips
                  options={msg.options}
                  onSelect={sendMessage}
                  disabled={isTyping || demoMode}
                />
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
                    {state.leadData.preferredCenter && <p><span className="text-muted-foreground">Center:</span> {state.leadData.preferredCenter}</p>}
                    {state.leadData.courseInterest && <p><span className="text-muted-foreground">Interest:</span> {state.leadData.courseInterest}</p>}
                    {state.leadData.budgetRange && <p><span className="text-muted-foreground">Budget:</span> {state.leadData.budgetRange}</p>}
                    {state.leadData.startDate && <p><span className="text-muted-foreground">Timeline:</span> {state.leadData.startDate}</p>}
                    {state.leadData.currentStatus && <p><span className="text-muted-foreground">Status:</span> {state.leadData.currentStatus}</p>}
                    {state.leadData.educationalBackground && <p><span className="text-muted-foreground">Education:</span> {state.leadData.educationalBackground}</p>}
                    {state.leadData.leadId && (
                      <p><span className="text-muted-foreground">Lead ID:</span> <code className="text-xs bg-green-100 px-1 rounded">{state.leadData.leadId}</code></p>
                    )}
                    {enrollmentId && (
                      <p><span className="text-muted-foreground">Enrollment ID:</span> <code className="text-xs bg-blue-100 px-1 rounded">{enrollmentId}</code></p>
                    )}
                    {paymentData && (
                      <p><span className="text-muted-foreground">Payment:</span> ₹{paymentData.amountPaid.toLocaleString()} ({paymentData.emiPlan})</p>
                    )}
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
            placeholder={demoMode ? 'Demo mode active — watch the conversation unfold' : 'Type your message...'}
            className="flex-1 rounded-full bg-muted border-0 px-4"
            disabled={isTyping || demoMode}
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping || demoMode}
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
