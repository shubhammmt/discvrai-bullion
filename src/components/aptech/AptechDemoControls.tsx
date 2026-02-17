import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

export interface DemoStep {
  type: 'user' | 'bot';
  text: string;
  delay: number; // ms before this step
  options?: string[];
  showCourseCards?: boolean;
  showLeadForm?: boolean;
  showPayment?: boolean;
  showOffer?: boolean;
  showScheduler?: boolean;
  showEnrollment?: boolean;
  showIntentScore?: boolean;
  showSummary?: boolean;
  autoFillLead?: {
    name: string;
    mobile: string;
    email: string;
    city: string;
    courseInterest: string;
    budgetRange: string;
  };
}

export const demoScript: DemoStep[] = [
  // Phase 1: Discovery
  { type: 'user', text: 'Hi, I want to explore animation careers', delay: 1500 },
  { type: 'bot', text: "That's awesome! Animation is one of the most exciting and fast-growing industries right now. 🎬\n\nTell me a bit about yourself — are you a student, working professional, or looking to switch careers?", delay: 1200, options: ['Student', 'Working Professional', 'Career Switcher'] },
  { type: 'user', text: 'I just completed my graduation, looking for a career in VFX', delay: 2000 },
  { type: 'bot', text: "Great choice! Animation & VFX is a fantastic field with amazing career opportunities. 🎯\n\nVFX artists are in huge demand — from Bollywood films to international studios, the industry is booming. Let me show you our best programs for VFX.", delay: 1500, showCourseCards: true, options: ['Tell me about placements', 'Show EMI options', 'Check next batch dates', 'Which city centers?'] },

  // Phase 2: Objection Handling - Placements
  { type: 'user', text: 'What about placements? Will I actually get a job?', delay: 2500 },
  { type: 'bot', text: "Placement is our strongest suit! Here are the numbers 📊:\n\n• 80-85%+ placement assistance rate\n• Partner studios: Red Chillies, Prime Focus, Technicolor, DNEG\n• Average starting package: ₹3-5 LPA\n• Top performers earn: ₹8-12 LPA within 2 years\n\n🌟 **Alumni Spotlight:** Rohit Sharma (VFX batch 2021) started with zero experience → Now VFX Artist at Prime Focus, earning ₹6.5 LPA!", delay: 1500, options: ['Show EMI options', 'See more alumni stories', 'Continue to enrollment'] },

  // Phase 3: EMI/Cost Objection
  { type: 'user', text: 'The course fee seems high. What are the EMI options?', delay: 2000 },
  { type: 'bot', text: "I completely understand! Let me break down the value:\n\n💰 **ROI Breakdown:**\n• Course investment: ₹1.5-2.5L\n• Average salary after course: ₹3-5 LPA\n• Payback period: Just 6-12 months!\n\n💳 **EMI Options:**\n• Zero-cost EMI: ₹8,500/month for 24 months\n• No-cost EMI on HDFC, ICICI, SBI cards\n• Education loan available (no collateral under ₹4L)\n\nPlus, I have a special offer for you! 👇", delay: 1500, showOffer: true, options: ['Apply the offer!', 'Check scholarships', 'Continue to enrollment'] },

  // Phase 4: Qualification
  { type: 'user', text: "That's a great offer! I'm based in Mumbai", delay: 2000 },
  { type: 'bot', text: "Great, we have premium centers in Mumbai! Which area would be most convenient for you?", delay: 1200, options: ['Andheri West', 'Thane', 'Borivali', 'Dadar'] },
  { type: 'user', text: 'Andheri West', delay: 1500 },
  { type: 'bot', text: "Excellent choice! Andheri West is one of our flagship centers with state-of-the-art labs. 🏢\n\nWhen are you looking to start? New batches are coming up soon!", delay: 1200, options: ['Immediately', 'This month', 'Next month'] },
  { type: 'user', text: 'This month', delay: 1500 },

  // Phase 5: Data Collection → Payment → Enrollment
  { type: 'bot', text: "Perfect! Here's what I have:\n• 📍 City: Mumbai (Andheri West)\n• 🎓 Background: Graduate\n• 🎯 Interest: Animation & VFX Pro\n• 💰 Budget: Flexible / EMI\n• 📅 Timeline: This month\n\nLet me get your contact details to proceed with enrollment! 🚀", delay: 1500, showLeadForm: true,
    autoFillLead: {
      name: 'Ram Ji',
      mobile: '+91 98765 43210',
      email: 'ramji@email.com',
      city: 'Mumbai',
      courseInterest: 'Animation & VFX',
      budgetRange: '₹1L - ₹2L',
    }
  },

  // After form submission → Payment
  { type: 'bot', text: "Thank you, Ram Ji! 🎉 Your details have been saved.\n\nYour Lead ID: **APT-2026-02-17-DEMO**\n\nNow, let's complete your enrollment! Here's the payment setup with your 15% Early Bird Discount applied:", delay: 2000, showPayment: true },

  // After payment → Enrollment Confirmation
  { type: 'bot', text: "🎓 **Congratulations Ram Ji!** Your enrollment is confirmed!\n\nYou're officially part of the Aptech family. Here's your enrollment receipt and next steps:", delay: 2500, showEnrollment: true },

  // Center visit scheduling
  { type: 'bot', text: "Would you like to schedule your orientation visit to the Andheri West center? Our counselor Priya Sharma will personally guide you through the facilities!", delay: 1500, showScheduler: true },

  // Final summary
  { type: 'bot', text: "Ram Ji, here's a complete summary of your journey with us today. Thank you for choosing Aptech! 🚀\n\nOur academic advisor will call you within 24 hours. Welcome aboard!", delay: 2000, showIntentScore: true, showSummary: true },
];

interface AptechDemoControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onSkip: () => void;
  onReset: () => void;
}

const AptechDemoControls = ({ isPlaying, currentStep, totalSteps, onPlay, onPause, onSkip, onReset }: AptechDemoControlsProps) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded">
          DEMO MODE
        </span>
        <span className="text-xs text-gray-400">
          Step {currentStep}/{totalSteps}
        </span>
      </div>
      <div className="flex items-center gap-1">
        {isPlaying ? (
          <Button variant="ghost" size="sm" onClick={onPause} className="h-7 px-2 text-white hover:text-orange-400 hover:bg-white/10">
            <Pause className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button variant="ghost" size="sm" onClick={onPlay} className="h-7 px-2 text-white hover:text-orange-400 hover:bg-white/10">
            <Play className="h-3.5 w-3.5" />
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onSkip} className="h-7 px-2 text-white hover:text-orange-400 hover:bg-white/10">
          <SkipForward className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onReset} className="h-7 px-2 text-white hover:text-orange-400 hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-blue-500 transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default AptechDemoControls;
