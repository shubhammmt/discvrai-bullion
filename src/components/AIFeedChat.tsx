
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Brain, Send, Sparkles, User } from 'lucide-react';

interface AIFeedChatProps {
  onQuerySubmit: (query: string, context: any) => void;
  userProfile: any;
}

const AIFeedChat = ({ onQuerySubmit, userProfile }: AIFeedChatProps) => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{id: number, type: 'user' | 'ai', content: string, results?: any[]}>>([
    {
      id: 1,
      type: 'ai',
      content: `Hi! I'm **Vega**, your AI investment assistant. Based on your ${userProfile.riskTolerance?.toLowerCase()} risk profile and interest in ${userProfile.preferredInstruments?.join(', ')}, I can help you discover personalized opportunities. What are you looking for today?`
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: query
    };

    // Generate AI response based on query
    const aiResponse = generateAIResponse(query, userProfile);
    const aiMessage = {
      id: Date.now() + 1,
      type: 'ai' as const,
      content: aiResponse.content,
      results: aiResponse.results
    };

    setChatHistory(prev => [...prev, userMessage, aiMessage]);
    onQuerySubmit(query, { userProfile, previousQueries: chatHistory });
    setQuery('');
  };

  const generateAIResponse = (userQuery: string, profile: any) => {
    const query = userQuery.toLowerCase();
    
    if (query.includes('safe') || query.includes('dividend')) {
      return {
        content: `Based on your ${profile.riskTolerance?.toLowerCase()} risk preference, here are safe dividend-paying options with strong fundamentals:`,
        results: ['AAPL', 'HDFC100', 'dividend-stocks']
      };
    } else if (query.includes('growth') || query.includes('tech')) {
      return {
        content: `For growth opportunities aligned with your profile, consider these high-potential investments:`,
        results: ['AAPL', 'TECH', 'tech-funds']
      };
    } else if (query.includes('mutual fund') || query.includes('sip')) {
      return {
        content: `Here are mutual fund options that match your investment preferences and goals:`,
        results: ['HDFC100', 'mutual-funds', 'sip-options']
      };
    } else if (query.includes('insurance') || query.includes('protection')) {
      return {
        content: `Based on your profile, here are insurance options that provide optimal protection:`,
        results: ['MAX-TERM', 'insurance-plans']
      };
    } else if (query.includes('loan') || query.includes('credit')) {
      return {
        content: `Here are credit options that align with your financial profile and needs:`,
        results: ['HDFC-PL', 'credit-options']
      };
    } else {
      return {
        content: `I found several diversified opportunities based on "${userQuery}". Let me show you personalized options across asset classes:`,
        results: ['mixed-results']
      };
    }
  };

  const quickPrompts = [
    "Show me safe dividend stocks",
    "Find growth opportunities under ₹200",
    "Best mutual funds for SIP",
    "High-rated insurance plans",
    "Low interest personal loans",
    "Credit cards with rewards"
  ];

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-6">
        {/* AI Branding */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Vega AI
              </h3>
              <p className="text-sm text-gray-600">Your Personal Investment Assistant</p>
            </div>
            <Sparkles className="w-5 h-5 text-purple-600 ml-auto" />
          </div>

          {/* Chat History */}
          <div className="max-h-64 overflow-y-auto space-y-3 mb-4 bg-white/50 rounded-lg p-4">
            {chatHistory.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.type === 'user'
                    ? 'ml-8 bg-blue-100 text-blue-900'
                    : 'mr-8 bg-white text-gray-900 border'
                } p-3 rounded-lg text-sm`}
              >
                <div className="flex items-start gap-2">
                  {message.type === 'ai' && <Brain size={14} className="text-blue-600 mt-0.5" />}
                  {message.type === 'user' && <User size={14} className="text-blue-600 mt-0.5" />}
                  <div dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
                {message.results && (
                  <div className="mt-2 text-xs text-gray-600 flex items-center gap-1">
                    <Sparkles size={12} />
                    Showing personalized results
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Vega anything... 'Show me safe stocks' or 'Best SIP options'"
              className="flex-1"
            />
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Send size={16} />
            </Button>
          </form>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-600">Try asking:</span>
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setQuery(prompt)}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-full transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIFeedChat;
