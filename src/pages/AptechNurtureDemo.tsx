import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, ArrowLeft, Phone, Video, MoreVertical, Paperclip, Mic, Camera, Smile, Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AptechWhatsAppMessage from '@/components/aptech/AptechWhatsAppMessage';
import AptechNurtureTimeline from '@/components/aptech/AptechNurtureTimeline';
import AptechCourseCard from '@/components/aptech/AptechCourseCard';
import AptechOfferBanner from '@/components/aptech/AptechOfferBanner';
import AptechPaymentFlow from '@/components/aptech/AptechPaymentFlow';
import AptechEnrollmentConfirmation from '@/components/aptech/AptechEnrollmentConfirmation';
import AptechCenterVisitScheduler from '@/components/aptech/AptechCenterVisitScheduler';
import AptechOptionChips from '@/components/aptech/AptechOptionChips';
import AptechIntentScore from '@/components/aptech/AptechIntentScore';
import type { PaymentData } from '@/components/aptech/AptechPaymentFlow';
import type { OfferInfo } from '@/components/aptech/AptechOfferBanner';
import { coursePrograms } from '@/data/aptechCourseData';

interface NurtureMessage {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  dayLabel?: string; // e.g. "Day 0 — Instant Follow-up"
  showCourseCards?: boolean;
  showOffer?: boolean;
  showPayment?: boolean;
  showEnrollment?: boolean;
  showScheduler?: boolean;
  showIntentScore?: boolean;
  showTimeline?: boolean;
  options?: string[];
}

interface NurtureStep {
  type: 'user' | 'bot';
  text: string;
  timestamp: string;
  delay: number;
  dayLabel?: string;
  options?: string[];
  showCourseCards?: boolean;
  showOffer?: boolean;
  showPayment?: boolean;
  showEnrollment?: boolean;
  showScheduler?: boolean;
  showIntentScore?: boolean;
  showTimeline?: boolean;
}

const nurtureScript: NurtureStep[] = [
  // Day 0: Instant follow-up (2 min after form)
  { type: 'bot', text: "Hi Rahul! 👋 I'm from Aptech.\n\nI noticed you just submitted your interest in **VFX & Animation** on our website. Great choice — VFX is booming right now!\n\nI'm your dedicated AI career advisor. Let me share everything you need to know, right here — no need to wait for a call.", timestamp: '10:02 AM', delay: 1500, dayLabel: 'Day 0 — Instant Follow-up (2 min after form)' },
  { type: 'bot', text: "Based on your profile (Graduate, Mumbai), here's the program that's the best fit for you:", timestamp: '10:02 AM', delay: 1200, showCourseCards: true },
  { type: 'bot', text: "💰 **Pricing & EMI Options:**\n\n• Full fee: ₹2,00,000\n• Zero-cost EMI: ₹8,333/month × 24 months\n• No-cost EMI on HDFC, ICICI, SBI cards\n• Education loan available (no collateral)\n\n📊 **ROI:** Average salary post-course is ₹3-5 LPA. Payback period: just 6-12 months!\n\nWould you like to know more?", timestamp: '10:03 AM', delay: 1800, options: ['What about placements?', 'Any offers/discounts?', 'Show me the syllabus', "I need to think about it"] },

  // User engages
  { type: 'user', text: 'What about placements? Do students actually get jobs?', timestamp: '10:05 AM', delay: 2500 },
  { type: 'bot', text: "Placement is our strongest suit! Here are real numbers:\n\n✅ **80-85%** placement assistance rate\n✅ Partner studios: Red Chillies, Prime Focus, Technicolor, DNEG\n✅ Average starting: **₹3-5 LPA**\n✅ Top performers: **₹8-12 LPA** within 2 years\n\n🌟 **Alumni Spotlight:**\nSneha Patil (VFX Batch '24)\n→ Started with zero experience\n→ Now VFX Artist at DNEG\n→ Earning ₹7.2 LPA!\n\nWant to see more success stories or check offers?", timestamp: '10:05 AM', delay: 1500, options: ['Show me offers!', 'More alumni stories', 'I want to enroll'] },

  // Offer
  { type: 'user', text: 'Show me offers!', timestamp: '10:07 AM', delay: 2000 },
  { type: 'bot', text: "🎉 Great timing, Rahul! I have a special offer for you based on your profile:", timestamp: '10:07 AM', delay: 1200, showOffer: true },

  // User goes cold
  { type: 'user', text: "This looks good but let me think about it. I'll get back to you", timestamp: '10:15 AM', delay: 3000 },
  { type: 'bot', text: "Of course, Rahul! Take your time. 🙂\n\nI've locked your **15% Early Bird Discount** for 72 hours so you don't miss out.\n\nIn the meantime, here's a quick VFX showreel from our students: 🎬\nhttps://aptech.edu/student-showreel\n\nI'll check in with you in a day or two. Feel free to message me anytime!", timestamp: '10:15 AM', delay: 1500 },

  // === Day 1 Re-engagement ===
  { type: 'bot', text: "Hi Rahul! 👋 Quick update for you:\n\n🔥 **Only 12 seats left** for the March VFX batch at Andheri West!\n\nYour 15% Early Bird discount is still active (expires in 48 hrs). Students who enrolled last month are already working on their first project! 🎬\n\nWant me to reserve your spot?", timestamp: '10:00 AM', delay: 2500, dayLabel: 'Day 1 — Smart Re-engagement' , options: ['Yes, let me enroll!', 'Tell me more about the batch', 'Not right now'] },
  { type: 'user', text: 'Tell me more about the batch', timestamp: '10:32 AM', delay: 2000 },
  { type: 'bot', text: "Sure! Here's the March batch details:\n\n📅 **Start Date:** March 3, 2026\n⏰ **Schedule:** Mon-Fri, 10 AM - 1 PM\n📍 **Center:** Andheri West (Premium Lab)\n👨‍🏫 **Faculty:** Rajesh Menon (12 yrs industry exp, ex-Prime Focus)\n👥 **Batch Size:** 25 students (12 seats remaining)\n\n**Month 1 Curriculum Preview:**\n• 3D Modeling Fundamentals (Maya)\n• Digital Sculpting (ZBrush)\n• Anatomy for Artists\n• Industry project: Character modeling\n\nShall I book your seat?", timestamp: '10:33 AM', delay: 1500, options: ['Yes, enroll me!', 'What if I miss this batch?'] },

  // === Day 3 Re-engagement ===
  { type: 'bot', text: "Hey Rahul! 🎬 Thought you'd love this:\n\n**\"How I went from zero to VFX Artist at DNEG in 18 months\"** — Sneha's story\n\n_\"I was a BCom graduate with no design background. Aptech's VFX program gave me the foundation + placement support. Now I work on international films!\"_\n\n📊 Fun fact: 73% of our VFX graduates got placed within 3 months of completing the course.\n\nYour Early Bird offer expires tonight! ⏰ Want to lock it in?", timestamp: '11:00 AM', delay: 3000, dayLabel: 'Day 3 — Alumni Story + Urgency', options: ["Let's do it! Enroll me", 'Can I visit the center first?'] },
  { type: 'user', text: "Let's do it! Enroll me", timestamp: '11:12 AM', delay: 2000 },

  // Enrollment flow
  { type: 'bot', text: "Awesome, Rahul! 🎉 Let's get you enrolled right away.\n\nHere's your enrollment summary:\n\n• 📍 Center: Andheri West, Mumbai\n• 🎓 Course: Animation & VFX Pro\n• 💰 Fee: ₹2,00,000 → **₹1,70,000** (15% off!)\n• 📅 Batch: March 3, 2026\n\nHere's the payment setup with your discount applied:", timestamp: '11:12 AM', delay: 1500, showPayment: true },

  // Post-payment
  { type: 'bot', text: "🎓 **Congratulations Rahul!** Your enrollment is confirmed!\n\nYou're officially part of the Aptech family!", timestamp: '11:15 AM', delay: 2500, showEnrollment: true },

  // Schedule visit
  { type: 'bot', text: "Let's schedule your orientation visit to the Andheri West center! Pick a time that works:", timestamp: '11:16 AM', delay: 1500, showScheduler: true },

  // Final summary with timeline
  { type: 'bot', text: "Rahul, here's the complete nurture journey — from web form to enrollment, all handled by AI in just 3 days! 🚀\n\nHere's how the automated follow-up sequence works:", timestamp: '11:18 AM', delay: 2000, showIntentScore: true, showTimeline: true },
];

const LEAD_INFO = {
  name: 'Rahul Verma',
  source: 'Aptech Website Form',
  courseInterest: 'VFX & Animation',
  city: 'Mumbai',
  education: 'B.Com Graduate',
  submittedAt: '10:00 AM today',
};

const AptechNurtureDemo = () => {
  const [messages, setMessages] = useState<NurtureMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadCard, setShowLeadCard] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Payment state
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [enrollmentId, setEnrollmentId] = useState('');
  const [activeOffer, setActiveOffer] = useState<OfferInfo | null>(null);

  const vfxCourses = coursePrograms.filter(c => c.category === 'Animation & VFX');
  const selectedCourse = vfxCourses[0] || coursePrograms[0];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const playNextStep = useCallback(() => {
    if (currentStep >= nurtureScript.length) {
      setIsPlaying(false);
      return;
    }

    const step = nurtureScript[currentStep];
    setIsTyping(true);

    timerRef.current = setTimeout(() => {
      const msg: NurtureMessage = {
        id: Date.now() + currentStep,
        type: step.type,
        content: step.text,
        timestamp: step.timestamp,
        dayLabel: step.dayLabel,
        showCourseCards: step.showCourseCards,
        showOffer: step.showOffer,
        showPayment: step.showPayment,
        showEnrollment: step.showEnrollment,
        showScheduler: step.showScheduler,
        showIntentScore: step.showIntentScore,
        showTimeline: step.showTimeline,
        options: step.options,
      };

      if (step.showOffer) {
        setActiveOffer({
          id: 'early_bird',
          label: 'Early Bird Discount',
          description: 'Enroll this week and save!',
          discountPercent: 15,
          expiresInMinutes: 30,
          type: 'early_bird',
        });
      }
      if (step.showEnrollment) {
        setPaymentData({
          courseName: 'Animation & VFX Pro',
          courseId: 'arena-anim-vfx',
          amountPaid: 14167,
          originalAmount: 170000,
          emiPlan: '12 Month EMI',
          transactionId: 'TXN-NUR-2026',
          discountApplied: 'Early Bird 15%',
        });
        setEnrollmentId('ENR-2026-03-NUR-DEMO');
      }

      // Disable previous options
      setMessages(prev => {
        const updated = prev.map(m => m.options ? { ...m, options: undefined } : m);
        return [...updated, msg];
      });
      setIsTyping(false);
      setShowLeadCard(false);
      setCurrentStep(prev => prev + 1);
    }, step.delay);
  }, [currentStep]);

  useEffect(() => {
    if (isPlaying && currentStep < nurtureScript.length) {
      playNextStep();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStep, playNextStep]);

  const startDemo = () => {
    setMessages([]);
    setCurrentStep(0);
    setIsPlaying(true);
    setShowLeadCard(false);
    setPaymentData(null);
    setActiveOffer(null);
    setEnrollmentId('');
  };

  const resetDemo = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessages([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setIsTyping(false);
    setShowLeadCard(true);
    setPaymentData(null);
    setActiveOffer(null);
    setEnrollmentId('');
  };

  const handlePaymentComplete = (payment: PaymentData) => {
    setPaymentData(payment);
    setEnrollmentId(`ENR-2026-03-NUR-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: '#efeae2' }}>
      {/* WhatsApp-style header */}
      <header className="bg-[#008069] dark:bg-[#1f2c34] px-3 py-2 flex items-center gap-3 shadow-sm z-10">
        <ArrowLeft className="h-5 w-5 text-white cursor-pointer" onClick={resetDemo} />
        <div className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-white font-medium text-[16px] leading-tight">Aptech Career Advisor</h1>
          <p className="text-[#82b9a5] text-[12px]">online</p>
        </div>
        <div className="flex items-center gap-4">
          <Video className="h-5 w-5 text-white/80" />
          <Phone className="h-5 w-5 text-white/80" />
          <MoreVertical className="h-5 w-5 text-white/80" />
        </div>
      </header>

      {/* Demo controls bar */}
      <div className="bg-[#111b21] px-3 py-1.5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#25d366] bg-[#25d366]/10 px-2 py-0.5 rounded">
            NURTURE DEMO
          </span>
          <span className="text-[11px] text-gray-400">
            Step {currentStep}/{nurtureScript.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {isPlaying ? (
            <Button variant="ghost" size="sm" onClick={() => { setIsPlaying(false); if (timerRef.current) clearTimeout(timerRef.current); }} className="h-7 px-2 text-white hover:text-[#25d366] hover:bg-white/10">
              <Pause className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => currentStep === 0 ? startDemo() : setIsPlaying(true)} className="h-7 px-2 text-white hover:text-[#25d366] hover:bg-white/10">
              <Play className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); setCurrentStep(prev => Math.min(prev + 1, nurtureScript.length)); setIsPlaying(true); }} className="h-7 px-2 text-white hover:text-[#25d366] hover:bg-white/10">
            <SkipForward className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={resetDemo} className="h-7 px-2 text-white hover:text-[#25d366] hover:bg-white/10">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-700">
          <div className="h-full bg-gradient-to-r from-[#25d366] to-[#128c7e] transition-all duration-500" style={{ width: `${(currentStep / nurtureScript.length) * 100}%` }} />
        </div>
      </div>

      {/* Chat area with WhatsApp wallpaper */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'400\' height=\'400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'50\' height=\'50\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\' fill=\'%23d4ccb9\' opacity=\'0.3\'/%3E%3Ccircle cx=\'35\' cy=\'35\' r=\'1\' fill=\'%23d4ccb9\' opacity=\'0.3\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'400\' height=\'400\' fill=\'%23efeae2\'/%3E%3Crect width=\'400\' height=\'400\' fill=\'url(%23p)\'/%3E%3C/svg%3E")' }}>
        <div className="max-w-2xl mx-auto px-3 py-3 space-y-1">

          {/* Lead info card (shown before demo starts) */}
          {showLeadCard && (
            <div className="bg-white dark:bg-[#202c33] rounded-xl shadow-md p-4 mb-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#25d366]/10 flex items-center justify-center">
                  <span className="text-[#25d366] text-sm">📋</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111b21] dark:text-[#e9edef]">Inbound Lead Received</h3>
                  <p className="text-[10px] text-[#667781]">From: aptech.edu website form</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div><span className="text-[#667781]">Name:</span> <span className="font-medium text-[#111b21] dark:text-[#e9edef]">{LEAD_INFO.name}</span></div>
                <div><span className="text-[#667781]">City:</span> <span className="font-medium text-[#111b21] dark:text-[#e9edef]">{LEAD_INFO.city}</span></div>
                <div><span className="text-[#667781]">Interest:</span> <span className="font-medium text-[#111b21] dark:text-[#e9edef]">{LEAD_INFO.courseInterest}</span></div>
                <div><span className="text-[#667781]">Education:</span> <span className="font-medium text-[#111b21] dark:text-[#e9edef]">{LEAD_INFO.education}</span></div>
                <div className="col-span-2"><span className="text-[#667781]">Submitted:</span> <span className="font-medium text-[#111b21] dark:text-[#e9edef]">{LEAD_INFO.submittedAt}</span></div>
              </div>
              <Button onClick={startDemo} className="w-full mt-3 bg-[#25d366] hover:bg-[#1ebe5d] text-white text-sm h-9">
                <Play className="h-3.5 w-3.5 mr-2" /> Start Nurture Demo
              </Button>
            </div>
          )}

          {/* Day labels */}
          {messages.map((msg, idx) => (
            <React.Fragment key={msg.id}>
              {/* Day separator */}
              {msg.dayLabel && (
                <div className="flex justify-center py-3">
                  <span className="bg-[#e2dfd7] dark:bg-[#182229] text-[#54656f] dark:text-[#8696a0] text-[11px] px-3 py-1 rounded-md shadow-sm font-medium">
                    {msg.dayLabel}
                  </span>
                </div>
              )}

              <AptechWhatsAppMessage
                type={msg.type}
                content={msg.content}
                timestamp={msg.timestamp}
                senderName={msg.type === 'bot' ? 'Aptech AI Advisor' : undefined}
              >
                {/* Course Cards */}
                {msg.showCourseCards && (
                  <div className="space-y-2">
                    {vfxCourses.slice(0, 2).map(c => (
                      <AptechCourseCard key={c.id} course={c} />
                    ))}
                  </div>
                )}
                {/* Offer */}
                {msg.showOffer && activeOffer && (
                  <AptechOfferBanner offer={activeOffer} onApply={() => {}} />
                )}
                {/* Payment */}
                {msg.showPayment && !paymentData && (
                  <AptechPaymentFlow
                    course={selectedCourse}
                    leadName="Rahul Verma"
                    onPaymentComplete={handlePaymentComplete}
                    offer={{ label: 'Early Bird 15%', discountPercent: 15 }}
                  />
                )}
                {/* Enrollment */}
                {msg.showEnrollment && paymentData && (
                  <AptechEnrollmentConfirmation
                    payment={paymentData}
                    leadId="APT-2026-03-NUR-DEMO"
                    enrollmentId={enrollmentId}
                    leadName="Rahul Verma"
                    leadEmail="rahul.verma@email.com"
                    leadMobile="+91 98765 43210"
                    onScheduleVisit={() => {}}
                  />
                )}
                {/* Scheduler */}
                {msg.showScheduler && (
                  <AptechCenterVisitScheduler
                    centerName="Andheri West"
                    city="Mumbai"
                    courseName="Animation & VFX Pro"
                    onScheduled={() => {}}
                  />
                )}
                {/* Options */}
                {msg.options && msg.options.length > 0 && (
                  <AptechOptionChips options={msg.options} onSelect={() => {}} disabled={true} />
                )}
                {/* Intent Score */}
                {msg.showIntentScore && (
                  <AptechIntentScore score={{ total: 88, budgetMatch: 22, urgency: 25, engagement: 21, courseFit: 20 }} />
                )}
                {/* Nurture Timeline */}
                {msg.showTimeline && (
                  <div className="mt-2">
                    <AptechNurtureTimeline />
                  </div>
                )}
              </AptechWhatsAppMessage>
            </React.Fragment>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-[#202c33] rounded-lg rounded-tl-none px-4 py-2.5 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#667781] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#667781] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#667781] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* WhatsApp-style input bar */}
      <div className="bg-[#f0f2f5] dark:bg-[#202c33] px-2 py-1.5 flex items-center gap-1.5">
        <Smile className="h-6 w-6 text-[#54656f] shrink-0" />
        <Paperclip className="h-6 w-6 text-[#54656f] shrink-0 rotate-45" />
        <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-full px-4 py-2 text-[14px] text-[#667781]">
          Demo mode — watch the nurture sequence play out
        </div>
        <Camera className="h-6 w-6 text-[#54656f] shrink-0" />
        <div className="w-10 h-10 rounded-full bg-[#008069] flex items-center justify-center shrink-0">
          <Mic className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default AptechNurtureDemo;
