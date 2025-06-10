
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Brain, Send, Sparkles } from 'lucide-react';

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
      content: `Hi! I'm your AI investment assistant. Based on your ${userProfile.riskTolerance?.toLowerCase()} risk profile and interest in ${userProfile.preferredInstruments?.join(', ')}, I can help you discover personalized opportunities. What are you looking for today?`
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
        content: `Based on your ${profile.riskTolerance?.toLowerCase()} risk preference, here are safe dividend-paying options:`,
        results: ['AAPL', 'HDFC100', 'dividend-stocks']
      };
    } else if (query.includes('growth') || query.includes('tech')) {
      return {
        content: `For growth opportunities aligned with your profile, consider these tech investments:`,
        results: ['AAPL', 'TECH', 'tech-funds']
      };
    } else if (query.includes('mutual fund') || query.includes('sip')) {
      return {
        content: `Here are mutual fund options that match your investment preferences:`,
        results: ['HDFC100', 'mutual-funds', 'sip-options']
      };
    } else {
      return {
        content: `I found several opportunities based on "${userQuery}". Let me show you personalized options:`,
        results: ['mixed-results']
      };
    }
  };

  const quickPrompts = [
    "Show me safe dividend stocks",
    "Find growth opportunities under ₹200",
    "Best mutual funds for SIP",
    "High-rated insurance plans"
  ];

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-6">
        {/* Chat Interface */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-lg">AI Investment Assistant</h3>
            <Sparkles className="w-4 h-4 text-purple-600" />
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
                {message.content}
                {message.results && (
                  <div className="mt-2 text-xs text-gray-600">
                    Showing results for: {message.results.join(', ')}
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
              placeholder="Ask me anything... 'Show me safe stocks' or 'Best SIP options'"
              className="flex-1"
            />
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Send size={16} />
            </Button>
          </form>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-600">Try:</span>
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
