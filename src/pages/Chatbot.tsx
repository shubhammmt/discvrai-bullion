import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, TrendingUp, PieChart, Brain, FileText, Mic, Image } from 'lucide-react';
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
      icon: <TrendingUp className="h-5 w-5" />,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'portfolio-review',
      title: 'Portfolio Review',
      description: 'Analyze your investment portfolio and get recommendations',
      icon: <PieChart className="h-5 w-5" />,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'stock-research',
      title: 'Stock Research',
      description: 'Deep dive into specific stocks and their fundamentals',
      icon: <FileText className="h-5 w-5" />,
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Section */}
        {showWelcome && (
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-6 shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
              How can I help you today?
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              I'm your AI-powered financial assistant. Ask me anything about markets, investments, portfolio analysis, or get personalized recommendations.
            </p>
            
            {/* Quick Prompts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {quickPrompts.map((prompt) => (
                <Card 
                  key={prompt.id}
                  className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-primary/20"
                  onClick={() => handleQuickPrompt(prompt)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${prompt.gradient} rounded-lg mb-3 text-white`}>
                      {prompt.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{prompt.title}</h3>
                    <p className="text-sm text-muted-foreground">{prompt.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Chat Area */}
        <Card className={`${showWelcome ? '' : 'h-[calc(100vh-12rem)]'} shadow-xl border-2`}>
          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages Area */}
            {messages.length > 0 && (
              <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 animate-fade-in-up ${
                        message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-primary to-accent'
                          : 'bg-gradient-to-br from-muted to-muted/50 border-2 border-primary/10'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Brain className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      
                      {/* Message Content */}
                      <div className={`max-w-[75%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <div
                          className={`rounded-2xl p-4 shadow-sm ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-primary to-accent text-white'
                              : 'bg-muted/50 border border-border'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-2 block">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex gap-4 animate-fade-in-up">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/50 border-2 border-primary/10 flex items-center justify-center flex-shrink-0">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div className="bg-muted/50 border border-border rounded-2xl p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
            
            {/* Input Area */}
            <div className="border-t bg-muted/20 p-6">
              <div className="flex items-center gap-3 bg-background rounded-xl border-2 border-border focus-within:border-primary/50 transition-colors p-2">
                <div className="flex items-center gap-2 px-2">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-muted-foreground hover:text-primary">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-muted-foreground hover:text-primary">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about investments, markets, or your portfolio..."
                  disabled={isLoading}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base placeholder:text-muted-foreground/70"
                />
                
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-lg px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Footer text */}
              <p className="text-xs text-muted-foreground text-center mt-3">
                AI can make mistakes. Consider checking important information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;