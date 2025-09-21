import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, TrendingUp, PieChart, Brain, FileText, Mic, Image, Star, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen ai-surface">
      <Header />
      
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Welcome Section */}
        {showWelcome && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-4xl w-full text-center animate-fade-in-up">
              {/* AI Avatar with Glow */}
              <div className="relative mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 ai-gradient rounded-2xl mb-6 ai-glow-intense relative">
                  <Brain className="h-10 w-10 text-white" />
                  <div className="absolute inset-0 ai-gradient rounded-2xl opacity-20 animate-pulse"></div>
                </div>
              </div>

              {/* Greeting */}
              <div className="mb-8">
                <h1 className="text-5xl font-bold mb-4">
                  <span className="ai-text-gradient">Hi, Welcome!</span>
                </h1>
                <h2 className="text-3xl font-semibold text-white mb-4">
                  Can I help you with anything?
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Ready to assist you with anything you need, from answering questions to providing recommendations. Let's get started!
                </p>
              </div>
              
              {/* Quick Prompts - Inspired by SayHalo cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {quickPrompts.map((prompt) => (
                  <Card 
                    key={prompt.id}
                    className="ai-surface-elevated ai-border-glow cursor-pointer transition-all duration-300 hover:scale-105 hover:ai-glow border-0 group"
                    onClick={() => handleQuickPrompt(prompt)}
                  >
                    <CardContent className="p-8 text-center h-full flex flex-col">
                      <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${prompt.gradient} rounded-xl mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                        {prompt.icon}
                      </div>
                      <h3 className="font-semibold text-xl mb-3 text-white">{prompt.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed flex-1">{prompt.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chat Area */}
        {messages.length > 0 && (
          <div className="flex-1 max-w-4xl mx-auto w-full px-8 py-6">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              <div className="space-y-8">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-6 animate-fade-in-up ${
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'ai-gradient ai-glow'
                        : 'ai-surface-elevated ai-border-glow border'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-6 w-6 text-white" />
                      ) : (
                        <Brain className="h-6 w-6 text-blue-400" />
                      )}
                    </div>
                    
                    {/* Message Content */}
                    <div className={`max-w-[75%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                      <div
                        className={`rounded-2xl p-6 shadow-lg transition-all duration-300 ${
                          message.type === 'user'
                            ? 'ai-gradient text-white ml-auto'
                            : 'ai-surface-elevated border ai-border-glow text-white'
                        }`}
                      >
                        <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-2 block">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-6 animate-fade-in-up">
                    <div className="w-12 h-12 rounded-xl ai-surface-elevated ai-border-glow border flex items-center justify-center flex-shrink-0">
                      <Brain className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="ai-surface-elevated border ai-border-glow rounded-2xl p-6">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
        
        {/* Input Area - Fixed at bottom */}
        <div className="ai-surface-elevated border-t border-gray-800 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 ai-surface-elevated rounded-2xl border ai-border-glow focus-within:ai-glow transition-all duration-300 p-4">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl">
                  <Image className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl">
                  <Mic className="h-5 w-5" />
                </Button>
              </div>
              
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask SayHalo anything..."
                disabled={isLoading}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base placeholder:text-gray-500 text-white"
              />
              
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className="ai-gradient hover:opacity-90 text-white rounded-xl px-6 py-2 h-10 ai-glow transition-all duration-300"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Footer text */}
            <p className="text-xs text-gray-500 text-center mt-4">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;