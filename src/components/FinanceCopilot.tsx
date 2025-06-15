
import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, X, Brain, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

type Message = {
  id: number;
  type: 'bot' | 'user';
  content: string;
  actions?: Array<{ label: string; action: () => void }>;
};

interface FinanceCopilotProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

const FinanceCopilot = ({ isOpen: externalIsOpen, onToggle }: FinanceCopilotProps) => {
  const navigate = useNavigate();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm DiscvrAI, your financial health assistant. I can help you set financial goals, build portfolios, or assess your current financial health. What would you like to work on today?",
      actions: [
        { label: "Set Financial Goals", action: () => handleQuickAction("I want to set financial goals") },
        { label: "Build Portfolio", action: () => handleQuickAction("Help me build a portfolio") },
        { label: "Check Financial Health", action: () => handleQuickAction("Check my financial health") }
      ]
    }
  ]);
  const [conversationContext, setConversationContext] = useState<{
    type?: 'goal-setting' | 'portfolio-building' | 'health-check';
    data?: any;
  }>({});

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  useEffect(() => {
    if (externalIsOpen !== undefined && externalIsOpen) {
      setInternalIsOpen(true);
    }
  }, [externalIsOpen]);

  const handleToggle = () => {
    const newState = !isOpen;
    setInternalIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const handleQuickAction = (actionMessage: string) => {
    const newUserMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: actionMessage
    };
    
    const botResponse = getBotResponse(actionMessage);
    
    setMessages(prev => [...prev, newUserMessage, botResponse]);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: message
    };
    
    const botResponse = getBotResponse(message);
    
    setMessages(prev => [...prev, newUserMessage, botResponse]);
    setMessage('');
  };

  const handleGoalSetup = () => {
    navigate('/onboarding');
    setInternalIsOpen(false);
  };

  const handlePortfolioView = () => {
    navigate('/portfolio');
    setInternalIsOpen(false);
  };

  const getBotResponse = (userMessage: string): Message => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('goal') || msg.includes('save') || msg.includes('retirement') || msg.includes('home')) {
      setConversationContext({ type: 'goal-setting' });
      return {
        id: Date.now() + 1,
        type: 'bot',
        content: "Great! I can help you set up your financial goals. Goals help me create personalized investment strategies and track your progress. What are you saving for?",
        actions: [
          { label: "Complete Goal Setup", action: handleGoalSetup },
          { label: "Home Purchase", action: () => handleQuickAction("I want to save for a home purchase") },
          { label: "Retirement", action: () => handleQuickAction("I want to plan for retirement") },
          { label: "Emergency Fund", action: () => handleQuickAction("I need an emergency fund") }
        ]
      };
    } 
    
    if (msg.includes('portfolio') || msg.includes('invest') || msg.includes('stock') || msg.includes('mutual fund')) {
      setConversationContext({ type: 'portfolio-building' });
      return {
        id: Date.now() + 1,
        type: 'bot',
        content: "Perfect! I can help you build a smart portfolio. First, I'll need to understand your goals and risk comfort to recommend the right investments for you.",
        actions: [
          { label: "Start Portfolio Building", action: handleGoalSetup },
          { label: "View Current Portfolio", action: handlePortfolioView }
        ]
      };
    }
    
    if (msg.includes('health') || msg.includes('assess') || msg.includes('score')) {
      setConversationContext({ type: 'health-check' });
      return {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'll assess your complete financial health across 4 key areas: Wealth Building, Protection Planning, Debt Optimization, and Goal Achievement. This takes just 30 seconds!",
        actions: [
          { label: "Start Health Check", action: handleGoalSetup }
        ]
      };
    }

    // Context-aware responses
    if (conversationContext.type === 'goal-setting') {
      if (msg.includes('home')) {
        return {
          id: Date.now() + 1,
          type: 'bot',
          content: "Excellent choice! Home purchase typically needs a mix of liquid savings for down payment and stable investments. I recommend starting with our goal-setting flow to calculate your exact target and timeline.",
          actions: [
            { label: "Set Up Home Goal", action: handleGoalSetup }
          ]
        };
      }
      if (msg.includes('retirement')) {
        return {
          id: Date.now() + 1,
          type: 'bot',
          content: "Smart thinking! Retirement planning benefits from long-term compounding. The earlier you start, the more your money can grow. Let's set up your retirement goal properly.",
          actions: [
            { label: "Plan My Retirement", action: handleGoalSetup }
          ]
        };
      }
    }

    return {
      id: Date.now() + 1,
      type: 'bot',
      content: "I can help you with financial goals, portfolio building, or health assessment. What specific aspect of your finances would you like to work on?",
      actions: [
        { label: "Set Goals", action: () => handleQuickAction("I want to set financial goals") },
        { label: "Build Portfolio", action: () => handleQuickAction("Help me build a portfolio") }
      ]
    };
  };

  return (
    <>
      {/* Floating Copilot Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleToggle}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg animate-pulse"
          >
            <Brain size={24} />
          </Button>
          <div className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-75">
            Set goals & build portfolio
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] z-40 flex flex-col shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain size={20} />
                <div>
                  <span className="font-semibold">DiscvrAI</span>
                  <p className="text-xs opacity-90">Your financial health assistant</p>
                </div>
              </div>
              <Button
                onClick={handleToggle}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div
                  className={`${
                    msg.type === 'user' 
                      ? 'ml-8 bg-blue-100 text-blue-900' 
                      : 'mr-8 bg-gray-100 text-gray-900'
                  } p-3 rounded-lg text-sm`}
                >
                  {msg.content}
                </div>
                {msg.actions && msg.type === 'bot' && (
                  <div className="mr-8 space-y-2">
                    {msg.actions.map((action, index) => (
                      <Button
                        key={index}
                        onClick={action.action}
                        size="sm"
                        variant="outline"
                        className="w-full text-xs h-8"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about goals, portfolio..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send size={16} />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default FinanceCopilot;
