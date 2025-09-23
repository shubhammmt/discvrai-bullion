import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, TrendingUp, PieChart, Brain, FileText, Mic, Image, Star, Zap, Target, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

import Header from '@/components/Header';

interface ChatMessage {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickPrompt {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [messageOpacities, setMessageOpacities] = useState<{[key: number]: number}>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const quickPrompts: QuickPrompt[] = [
    {
      id: 'market-analysis',
      title: 'Market Analysis',
      description: 'Get insights on current market trends and opportunities',
      icon: <TrendingUp className="h-6 w-6" />,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'portfolio-review',
      title: 'Portfolio Review',
      description: 'Analyze your investment portfolio and get recommendations',
      icon: <PieChart className="h-6 w-6" />,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'stock-research',
      title: 'Stock Research',
      description: 'Deep dive into specific stocks and their fundamentals',
      icon: <FileText className="h-6 w-6" />,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  // Handle scroll-based message fading (messages stay hidden once below certain point)
  useEffect(() => {
    const handleScroll = () => {
      const inputFieldTop = window.innerHeight - 140; // Input field area (140px from bottom)
      const startFadeOffset = 24; // Start fading a bit below the input field
      const fadeDistance = 80; // Distance to fully fade after crossing start offset
      
      const newOpacities: {[key: number]: number} = {};
      
      messages.forEach((message) => {
        const messageElement = document.querySelector(`[data-message-id="${message.id}"]`);
        if (messageElement) {
          const rect = messageElement.getBoundingClientRect();
          const messageBottom = rect.bottom;
          
          // If a message was already fully hidden, keep it hidden
          if (messageOpacities[message.id] === 0) {
            newOpacities[message.id] = 0;
            return;
          }
          
          if (messageBottom > inputFieldTop + startFadeOffset) {
            // Start fading only after the message goes below the input field + offset
            const distanceBelow = messageBottom - (inputFieldTop + startFadeOffset);
            const opacity = Math.max(0, 1 - (distanceBelow / fadeDistance));
            newOpacities[message.id] = opacity;
          } else {
            newOpacities[message.id] = 1;
          }
        }
      });
      
      setMessageOpacities(newOpacities);
    };

    const el = scrollContainerRef.current ?? window;
    el.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set correct opacities
    
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowWelcome(false);

    // Simulate AI response with more sophisticated content
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Based on your query about market analysis, I can provide insights on current trends, sector performance, and potential opportunities. Would you like me to focus on any specific market segment?",
        "Great question! For portfolio analysis, I can help you evaluate your asset allocation, risk exposure, and suggest optimizations based on your investment goals. Do you have a specific timeframe or risk tolerance in mind?",
        "Excellent choice for stock research! I can analyze fundamentals, technical indicators, and provide comprehensive insights. Which stock or sector would you like me to focus on?",
        `That's an interesting point about "${messageToSend}". Let me analyze this from multiple angles and provide you with actionable insights. Based on current market conditions and historical data, here's what I found...`
      ];
      
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: QuickPrompt) => {
    const promptMessages = {
      'market-analysis': 'Can you provide an analysis of current market trends and identify potential investment opportunities?',
      'portfolio-review': 'I would like a comprehensive review of my investment portfolio with recommendations for optimization.',
      'stock-research': 'Help me research and analyze stocks for potential investment opportunities.'
    };
    
    handleSendMessage(promptMessages[prompt.id as keyof typeof promptMessages]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputMessage('');
    setShowWelcome(true);
    setIsLoading(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="ai-surface min-h-dvh flex flex-col relative">
      <Header />
      
      {/* New Chat Button */}
      {!showWelcome && (
        <div className="absolute top-[4.5rem] left-4 lg:left-6 z-10">
          <Button
            onClick={handleNewChat}
            variant="ghost"
            size="sm"
            className="ai-surface-elevated ai-border-glow border text-white hover:ai-glow transition-all duration-300 rounded-xl p-2 lg:p-3"
          >
            <RotateCcw className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline">New Chat</span>
          </Button>
        </div>
      )}
      
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col relative">
        {/* Scrollable Content Area */}
        <div 
          ref={scrollContainerRef} 
          className={`flex-1 ${messages.length > 0 ? 'overflow-y-auto' : 'overflow-y-hidden'} pb-[8rem] lg:pb-[10rem]`}
        >
          {/* Welcome Section */}
          {showWelcome && (
            <div className="flex-1 flex items-center justify-center px-4 lg:px-8 lg:pt-2 pb-2 md:pb-3 lg:pb-4 min-h-[calc(100vh-12rem)]">
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-4xl text-center animate-fade-in-up">
                {/* AI Avatar with Glow */}
                <div className="relative mb-2 md:mb-3 lg:mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 ai-gradient rounded-xl mb-1 md:mb-2 ai-glow-intense relative">
                    <Brain className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                    <div className="absolute inset-0 ai-gradient rounded-xl opacity-20 animate-pulse"></div>
                  </div>
                </div>

                {/* Greeting */}
                <div className="mb-3 md:mb-4 lg:mb-5">
                  <h1 className="text-xl lg:text-2xl font-bold mb-1 md:mb-2">
                    <span className="ai-text-gradient">Hi, Welcome!</span>
                  </h1>
                  <h2 className="text-base lg:text-lg font-semibold text-white mb-1 md:mb-2">
                    Can I help you with anything?
                  </h2>
                  <p className="text-xs lg:text-sm text-gray-300 max-w-xs sm:max-w-md lg:max-w-xl mx-auto leading-relaxed">
                    Ready to assist you with anything you need, from answering questions to providing recommendations. Let's get started!
                  </p>
                </div>
                
                {/* Quick Prompts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-2 lg:gap-3 mb-2 md:mb-3 lg:mb-4 place-items-center sm:[&>*:nth-child(3)]:col-span-2 sm:[&>*:nth-child(3)]:justify-self-center">
                  {quickPrompts.map((prompt) => (
                    <Card 
                      key={prompt.id}
                      className="ai-surface-elevated ai-border-glow cursor-pointer transition-all duration-300 hover:scale-105 hover:ai-glow border-0 group"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      <CardContent className="p-2 lg:p-3 text-center h-full flex flex-col items-center">
                        <div className={`flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r ${prompt.gradient} rounded-lg mb-1 text-white group-hover:scale-110 transition-transform duration-300`}>
                          {React.cloneElement(prompt.icon as React.ReactElement, { className: "h-3 w-3 lg:h-4 lg:w-4" })}
                        </div>
                        <h3 className="font-medium text-xs lg:text-sm mb-1 text-white">{prompt.title}</h3>
                        <p className="text-xs lg:text-xs text-gray-400 leading-tight flex-1">{prompt.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat Area */}
          {messages.length > 0 && (
            <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
              <div className="space-y-6 lg:space-y-8">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      data-message-id={message.id}
                      className={`flex gap-3 lg:gap-6 animate-fade-in-up transition-opacity duration-300 ease-out ${
                        message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                      style={{ opacity: messageOpacities[message.id] ?? 1 }}
                    >
                      {/* Avatar */}
                      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'ai-gradient ai-glow'
                          : 'ai-surface-elevated ai-border-glow border'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                        ) : (
                          <Brain className="h-5 w-5 lg:h-6 lg:w-6 text-blue-400" />
                        )}
                      </div>
                      
                      {/* Message Content */}
                      <div className={`flex-1 max-w-[85%] lg:max-w-[75%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <div
                          className={`rounded-2xl p-3 lg:p-4 shadow-lg transition-all duration-300 ${
                            message.type === 'user'
                              ? 'bg-purple-600/70 border border-purple-500/50 text-white ml-auto'
                              : 'ai-surface-elevated border ai-border-glow text-white'
                          }`}
                        >
                          <p className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <span className="text-xs text-gray-500 mt-2 block">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex gap-3 lg:gap-6 animate-fade-in-up">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl ai-surface-elevated ai-border-glow border flex items-center justify-center flex-shrink-0">
                        <Brain className="h-5 w-5 lg:h-6 lg:w-6 text-blue-400" />
                      </div>
                      <div className="ai-surface-elevated border ai-border-glow rounded-2xl p-4 lg:p-6">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
        
        {/* Fixed Input Field */}
        <div className="absolute bottom-0 left-0 right-0 lg:pt-1 px-3 lg:px-4 pb-2 lg:pb-2 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none">
          <div className="w-full max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto pointer-events-auto">
            <div className={`flex items-center gap-2 lg:gap-3 ai-surface-elevated rounded-full border transition-all duration-300 px-3 lg:px-4 py-2 lg:py-3 ${
              isFocused && inputMessage.trim() ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'ai-border-glow'
            }`}>
              <div className="flex items-center gap-2 lg:gap-3">
                <Button variant="ghost" size="sm" className="w-8 h-8 lg:w-10 lg:h-10 p-0 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl">
                  <Image className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 lg:w-10 lg:h-10 p-0 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl">
                  <Mic className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </div>
              
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask discvr.ai anything..."
                disabled={isLoading}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-sm lg:text-base placeholder:text-gray-500 text-white outline-none"
              />
              
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className="ai-gradient hover:opacity-90 text-white rounded-xl px-3 lg:px-6 py-2 h-8 lg:h-10 ai-glow transition-all duration-300"
              >
                <Send className="h-3 w-3 lg:h-4 lg:w-4" />
              </Button>
            </div>
            
            {/* Footer text */}
            <p className="text-xs text-gray-500 text-center mt-2 lg:mt-3">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;