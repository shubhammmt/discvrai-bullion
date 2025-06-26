import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Send, Sparkles, User, Loader2 } from 'lucide-react';
import { queryStocks } from '@/utils/stockQueryApi';

interface AIFeedChatProps {
  onQuerySubmit: (query: string, context: any) => void;
  onStockResults: (results: any[]) => void;
  userProfile: any;
}

const AIFeedChat = ({ onQuerySubmit, onStockResults, userProfile }: AIFeedChatProps) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('stock');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{id: number, type: 'user' | 'ai', content: string, results?: any[]}>>([
    {
      id: 1,
      type: 'ai',
      content: `Hi! I'm **DiscvrAI**. Ask me anything about investments - stocks, mutual funds, bonds, loans, or insurance. I can search for specific stocks based on your criteria!`
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: query
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (searchType === 'stock') {
        // Call the stock query API
        const stockResults = await queryStocks(query, 1, 10, false);
        
        if (stockResults.success && stockResults.data.results.length > 0) {
          const aiMessage = {
            id: Date.now() + 1,
            type: 'ai' as const,
            content: `Found ${stockResults.data.results.length} stocks matching your query: "${query}"`,
            results: stockResults.data.results
          };

          setChatHistory(prev => [...prev, aiMessage]);
          onStockResults(stockResults.data.results);
          onQuerySubmit(query, { type: 'stock_search', results: stockResults.data.results });
        } else {
          // Fallback to existing AI response
          const aiResponse = generateAIResponse(query, userProfile);
          const aiMessage = {
            id: Date.now() + 1,
            type: 'ai' as const,
            content: aiResponse.content,
            results: aiResponse.results
          };
          setChatHistory(prev => [...prev, aiMessage]);
          onQuerySubmit(query, { userProfile, previousQueries: chatHistory });
        }
      } else if (searchType === 'ipo') {
        // Placeholder for IPO API integration
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai' as const,
          content: `IPO search functionality will be available soon. For now, showing general IPO information for: "${query}"`
        };
        setChatHistory(prev => [...prev, aiMessage]);
        onQuerySubmit(query, { type: 'ipo_search', userProfile, previousQueries: chatHistory });
      } else if (searchType === 'mutual-fund') {
        // Placeholder for Mutual Fund API integration
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai' as const,
          content: `Mutual Fund search functionality will be available soon. For now, showing general mutual fund information for: "${query}"`
        };
        setChatHistory(prev => [...prev, aiMessage]);
        onQuerySubmit(query, { type: 'mutual_fund_search', userProfile, previousQueries: chatHistory });
      } else {
        // Use existing AI response for other queries
        const aiResponse = generateAIResponse(query, userProfile);
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai' as const,
          content: aiResponse.content,
          results: aiResponse.results
        };
        setChatHistory(prev => [...prev, aiMessage]);
        onQuerySubmit(query, { userProfile, previousQueries: chatHistory });
      }
    } catch (error) {
      console.error('Error processing query:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai' as const,
        content: `Sorry, I encountered an error while processing your ${searchType} query. Let me try with my built-in knowledge instead.`
      };
      setChatHistory(prev => [...prev, errorMessage]);
      
      // Fallback to existing AI response
      const aiResponse = generateAIResponse(query, userProfile);
      const aiMessage = {
        id: Date.now() + 2,
        type: 'ai' as const,
        content: aiResponse.content,
        results: aiResponse.results
      };
      setChatHistory(prev => [...prev, aiMessage]);
      onQuerySubmit(query, { userProfile, previousQueries: chatHistory });
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  const generateAIResponse = (userQuery: string, profile: any) => {
    const query = userQuery.toLowerCase();
    
    if (query.includes('safe') || query.includes('dividend') || query.includes('conservative')) {
      return {
        content: `Based on your ${profile.riskTolerance?.toLowerCase()} risk preference, here are safe, dividend-paying and debt options with strong fundamentals:`,
        results: ['AAPL', 'HDFC100', 'GOI-2034', 'HDFC-FD']
      };
    } else if (query.includes('growth') || query.includes('tech')) {
      return {
        content: `For growth opportunities aligned with your profile, consider these high-potential investments:`,
        results: ['AAPL', 'TECH', 'ELEC-MOB']
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
        results: ['HDFC-PL', 'HDFC-REG']
      };
    } else if (query.includes('bond') || query.includes('fixed') || query.includes('fd')) {
      return {
        content: `For stable, fixed-income investments, here are debt instruments suited to your profile:`,
        results: ['GOI-2034', 'HDFC-FD', 'bonds-portfolio']
      };
    } else {
      return {
        content: `I found several diversified opportunities based on "${userQuery}". Let me show you personalized options across asset classes:`,
        results: ['mixed-results']
      };
    }
  };

  const quickPrompts = [
    "Show me tech companies with market cap > 1B",
    "Find dividend paying stocks", 
    "Growth stocks in healthcare",
    "Best mutual funds",
    "Safe investments"
  ];

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-4">
        {/* Simplified AI Branding */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DiscvrAI
            </h3>
            <p className="text-sm text-gray-600">Ask me anything about investments</p>
          </div>
        </div>

        {/* Simplified Chat History */}
        <div className="max-h-32 overflow-y-auto space-y-2 mb-4 bg-white/50 rounded-lg p-3">
          {chatHistory.slice(-2).map((message) => (
            <div
              key={message.id}
              className={`${
                message.type === 'user'
                  ? 'ml-6 bg-blue-100 text-blue-900'
                  : 'mr-6 bg-white text-gray-900'
              } p-2 rounded-lg text-sm`}
            >
              <div dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          ))}
        </div>

        {/* Input Form with Dropdown */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stock">Stock</SelectItem>
              <SelectItem value="ipo">IPO</SelectItem>
              <SelectItem value="mutual-fund">Mutual Fund</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${searchType === 'stock' ? 'stocks' : searchType === 'ipo' ? 'IPOs' : 'mutual funds'}...`}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600" disabled={isLoading}>
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </Button>
        </form>

        {/* Quick Prompts */}
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setQuery(prompt)}
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-colors"
              disabled={isLoading}
            >
              {prompt}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIFeedChat;
