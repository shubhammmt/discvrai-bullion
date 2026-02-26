import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Play, Pause, SkipForward, RotateCcw, Send, Mic, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AptechWhatsAppMessage from '@/components/aptech/AptechWhatsAppMessage';
import SurveyCard from './cards/SurveyCard';
import PaymentCard from './cards/PaymentCard';
import ScheduleChangeCard from './cards/ScheduleChangeCard';
import CatchUpMaterialCard from './cards/CatchUpMaterialCard';
import CertificateCard from './cards/CertificateCard';
import { mockConversationThread, type DemoMessage } from '@/data/aptechPostSalesDemoData';

const PostSalesWhatsAppView: React.FC = () => {
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showStartCard, setShowStartCard] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const delay = step.type === 'user' ? 1000 : 1500;
    timerRef.current = setTimeout(() => {
      setMessages(prev => [...prev, step]);
      setIsTyping(false);
      setCurrentStep(prev => prev + 1);
    }, delay);
  }, [currentStep]);

  useEffect(() => {
    if (isPlaying && currentStep < mockConversationThread.length) playNextStep();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, currentStep, playNextStep]);

  const startDemo = () => { setMessages([]); setCurrentStep(0); setIsPlaying(true); setShowStartCard(false); };
  const resetDemo = () => { if (timerRef.current) clearTimeout(timerRef.current); setMessages([]); setCurrentStep(0); setIsPlaying(false); setIsTyping(false); setShowStartCard(true); };

  const renderWhatsAppWidget = (msg: DemoMessage) => {
    if (!msg.widget || !msg.widgetData) return null;
    switch (msg.widget) {
      case 'survey':
        return <SurveyCard question={msg.widgetData.question} questions={msg.widgetData.questions} />;
      case 'payment':
        return <PaymentCard amount={msg.widgetData.amount} dueDate={msg.widgetData.dueDate} installmentNumber={msg.widgetData.installmentNumber} />;
      case 'schedule-change':
        return <ScheduleChangeCard changeType={msg.widgetData.changeType} title={msg.widgetData.title} details={msg.widgetData.details} effectiveDate={msg.widgetData.effectiveDate} note={msg.widgetData.note} />;
      case 'catchup-material':
        return <CatchUpMaterialCard sessionTitle={msg.widgetData.sessionTitle} sessionNumber={msg.widgetData.sessionNumber} materials={msg.widgetData.materials} />;
      case 'certificate':
        return <CertificateCard studentName={msg.widgetData.studentName} courseName={msg.widgetData.courseName} completionDate={msg.widgetData.completionDate} certificateId={msg.widgetData.certificateId} brand={msg.widgetData.brand} isPreview={msg.widgetData.isPreview} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#efeae2' }}>
      {/* WhatsApp Header */}
      <header className="bg-[#008069] px-3 py-2 flex items-center gap-3 shadow-sm z-10">
        <ArrowLeft className="h-5 w-5 text-white cursor-pointer" onClick={resetDemo} />
        <div className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center text-white font-bold text-sm">A</div>
        <div className="flex-1 min-w-0">
          <h1 className="text-white font-medium text-[16px] leading-tight">Aptech Post-Sales Agent</h1>
          <p className="text-[#82b9a5] text-[12px]">online</p>
        </div>
        <div className="flex items-center gap-4">
          <Video className="h-5 w-5 text-white/80" />
          <Phone className="h-5 w-5 text-white/80" />
          <MoreVertical className="h-5 w-5 text-white/80" />
        </div>
      </header>

      {/* Demo Controls */}
      <div className="bg-[#111b21] px-3 py-1.5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#25d366] bg-[#25d366]/10 px-2 py-0.5 rounded">WHATSAPP DEMO</span>
          <span className="text-[11px] text-gray-400">Step {currentStep}/{mockConversationThread.length}</span>
        </div>
        <div className="flex items-center gap-1">
          {isPlaying ? (
            <Button variant="ghost" size="sm" onClick={() => { setIsPlaying(false); if (timerRef.current) clearTimeout(timerRef.current); }} className="h-7 px-2 text-white hover:text-[#25d366] hover:bg-white/10"><Pause className="h-3.5 w-3.5" /></Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => currentStep === 0 ? startDemo() : setIsPlaying(true)} className="h-7 px-2 text-white hover:text-[#25d366] hover:bg-white/10"><Play className="h-3.5 w-3.5" /></Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); setCurrentStep(prev => Math.min(prev + 1, mockConversationThread.length)); setIsPlaying(true); }} className="h-7 px-2 text-white hover:text-[#25d366] hover:bg-white/10"><SkipForward className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="sm" onClick={resetDemo} className="h-7 px-2 text-white hover:text-[#25d366] hover:bg-white/10"><RotateCcw className="h-3.5 w-3.5" /></Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-700">
          <div className="h-full bg-gradient-to-r from-[#25d366] to-[#128c7e] transition-all duration-500" style={{ width: `${(currentStep / mockConversationThread.length) * 100}%` }} />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'400\' height=\'400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'50\' height=\'50\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\' fill=\'%23d4ccb9\' opacity=\'0.3\'/%3E%3Ccircle cx=\'35\' cy=\'35\' r=\'1\' fill=\'%23d4ccb9\' opacity=\'0.3\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'400\' height=\'400\' fill=\'%23efeae2\'/%3E%3Crect width=\'400\' height=\'400\' fill=\'url(%23p)\'/%3E%3C/svg%3E")' }}>
        <div className="max-w-2xl mx-auto px-3 py-3 space-y-1">
          {/* Start Card */}
          {showStartCard && (
            <div className="bg-white rounded-xl shadow-md p-5 mb-4 border border-gray-200 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#25d366] flex items-center justify-center text-white font-bold text-xl mb-3">A</div>
              <h3 className="text-sm font-semibold text-[#111b21] mb-1">Aptech Post-Sales Agent</h3>
              <p className="text-[12px] text-[#667781] mb-4">Same student journey on WhatsApp: welcome → surveys → triggers → fees → query → recommendation</p>
              <Button onClick={startDemo} className="w-full bg-[#25d366] hover:bg-[#1ebe5d] text-white text-sm h-9">
                <Play className="h-3.5 w-3.5 mr-2" /> Start WhatsApp Demo
              </Button>
            </div>
          )}

          {messages.map(msg => {
            const widgetEl = msg.widget && msg.widgetData ? renderWhatsAppWidget(msg) : null;
            return (
              <React.Fragment key={msg.id}>
                {msg.dayLabel && (
                  <div className="flex justify-center py-3">
                    <span className="bg-[#e2dfd7] text-[#54656f] text-[11px] px-3 py-1 rounded-md shadow-sm font-medium">{msg.dayLabel}</span>
                  </div>
                )}
                <AptechWhatsAppMessage
                  type={msg.type}
                  content={msg.content}
                  timestamp={msg.timestamp}
                  senderName={msg.type === 'bot' ? 'Aptech Post-Sales Agent' : undefined}
                />
                {widgetEl && <div className="ml-0 mr-auto max-w-[85%] mt-1">{widgetEl}</div>}
              </React.Fragment>
            );
          })}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input bar (WhatsApp style) */}
      <div className="bg-[#f0f2f5] px-2 py-2 flex items-center gap-2">
        <Paperclip className="h-5 w-5 text-[#54656f] shrink-0" />
        <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-[#667781]">
          Type a message
        </div>
        <Mic className="h-5 w-5 text-[#54656f] shrink-0" />
      </div>
    </div>
  );
};

export default PostSalesWhatsAppView;
