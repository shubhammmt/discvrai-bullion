
import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, X, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

type Message = {
  id: number;
  type: 'bot' | 'user';
  content: string;
};

interface FinanceCopilotProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

const FinanceCopilot = ({ isOpen: externalIsOpen, onToggle }: FinanceCopilotProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm DiscvrAI, your intelligent finance assistant. Ask me anything about AAPL's fundamentals, growth prospects, or investment rationale!"
    }
  ]);

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

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: message
    };
    
    const botResponse: Message = {
      id: Date.now() + 1,
      type: 'bot',
      content: getBotResponse(message)
    };
    
    setMessages(prev => [...prev, newUserMessage, botResponse]);
    setMessage('');
  };

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes('fundamental') || msg.includes('quality')) {
      return "AAPL shows strong fundamentals with a Quality Score of 8.5/10. Key strengths: $162B cash, 25% net margin, and consistent FCF generation.";
    } else if (msg.includes('growth')) {
      return "Growth Score: 7/10. Services growing at 16.9% YoY, iPhone cycle stable. AI integration could drive next growth phase.";
    } else if (msg.includes('risk')) {
      return "Risk Score: 6/10 (Lower is better). Main risks: China dependency (19% revenue), market saturation, regulatory concerns.";
    } else if (msg.includes('technical')) {
      return "Technical Score: 7.5/10. Trading above 50-day MA, RSI at 58 (neutral), support at $155, resistance at $185.";
    }
    return "Based on AAPL's current metrics, I'd suggest considering your investment timeline and risk tolerance. What specific aspect interests you most?";
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
            Ask DiscvrAI anything
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-96 z-40 flex flex-col shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain size={20} />
                <div>
                  <span className="font-semibold">DiscvrAI</span>
                  <p className="text-xs opacity-90">Your AI investment assistant</p>
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
              <div
                key={msg.id}
                className={`${
                  msg.type === 'user' 
                    ? 'ml-8 bg-blue-100 text-blue-900' 
                    : 'mr-8 bg-gray-100 text-gray-900'
                } p-3 rounded-lg text-sm`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about AAPL..."
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
