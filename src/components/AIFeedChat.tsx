import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { queryStocks } from '@/utils/stockQueryApi';
import ChatHistory from '@/components/ChatHistory';
import SearchForm from '@/components/SearchForm';
import QuickPrompts from '@/components/QuickPrompts';
import StockResultsTable from '@/components/StockResultsTable';

interface AIFeedChatProps {
  onQuerySubmit: (query: string, context: any) => void;
  onStockResults: (results: any[]) => void;
  userProfile: any;
}

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  content: string;
  results?: any[];
}

const AIFeedChat = ({ onQuerySubmit, onStockResults, userProfile }: AIFeedChatProps) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('stock');
  const [isLoading, setIsLoading] = useState(false);
  const [stockQueryResults, setStockQueryResults] = useState<any[]>([]);
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      content: `Hi! I'm **DiscvrAI**. Ask me anything about investments - stocks, mutual funds, bonds, loans, or insurance. I can search for specific stocks based on your criteria!`
    }
  ]);

  const quickPrompts = [
    "Show me tech companies with market cap > 1B",
    "Find dividend paying stocks", 
    "Growth stocks in healthcare",
    "Best mutual funds",
    "Safe investments"
  ];

  const handleDismissResults = () => {
    setStockQueryResults([]);
    setCurrentSearchQuery('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      content: query
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (searchType === 'stock') {
        // Call the stock query API
        const stockResults = await queryStocks(query, 1, 10, false);
        
        if (stockResults.success && stockResults.data.length > 0) {
          const aiMessage: ChatMessage = {
            id: Date.now() + 1,
            type: 'ai',
            content: `${stockResults.intent_analysis.communication_message}\n\nFound ${stockResults.data.length} stocks matching your query: "${query}"\n\n**Analysis Summary:**\n- Intent: ${stockResults.intent_analysis.intent}\n- Confidence: ${(stockResults.intent_analysis.confidence * 100).toFixed(0)}%\n- ${stockResults.intent_analysis.confidence_reasoning}`,
            results: stockResults.data
          };

          setChatHistory(prev => [...prev, aiMessage]);
          setStockQueryResults(stockResults.data);
          setCurrentSearchQuery(query);
          onStockResults(stockResults.data);
          onQuerySubmit(query, { 
            type: 'stock_search', 
            results: stockResults.data,
            intent_analysis: stockResults.intent_analysis,
            total_records: stockResults.total_records
          });
        } else {
          // Fallback to existing AI response
          const aiResponse = generateAIResponse(query, userProfile);
          const aiMessage: ChatMessage = {
            id: Date.now() + 1,
            type: 'ai',
            content: aiResponse.content,
            results: aiResponse.results
          };
          setChatHistory(prev => [...prev, aiMessage]);
          onQuerySubmit(query, { userProfile, previousQueries: chatHistory });
        }
      } else if (searchType === 'ipo') {
        // Placeholder for IPO API integration
        const aiMessage: ChatMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: `IPO search functionality will be available soon. For now, showing general IPO information for: "${query}"`
        };
        setChatHistory(prev => [...prev, aiMessage]);
        onQuerySubmit(query, { type: 'ipo_search', userProfile, previousQueries: chatHistory });
      } else if (searchType === 'mutual-fund') {
        // Placeholder for Mutual Fund API integration
        const aiMessage: ChatMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: `Mutual Fund search functionality will be available soon. For now, showing general mutual fund information for: "${query}"`
        };
        setChatHistory(prev => [...prev, aiMessage]);
        onQuerySubmit(query, { type: 'mutual_fund_search', userProfile, previousQueries: chatHistory });
      } else {
        // Use existing AI response for other queries
        const aiResponse = generateAIResponse(query, userProfile);
        const aiMessage: ChatMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: aiResponse.content,
          results: aiResponse.results
        };
        setChatHistory(prev => [...prev, aiMessage]);
        onQuerySubmit(query, { userProfile, previousQueries: chatHistory });
      }
    } catch (error) {
      console.error('Error processing query:', error);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: `Sorry, I encountered an error while processing your ${searchType} query. Let me try with my built-in knowledge instead.`
      };
      setChatHistory(prev => [...prev, errorMessage]);
      
      // Fallback to existing AI response
      const aiResponse = generateAIResponse(query, userProfile);
      const aiMessage: ChatMessage = {
        id: Date.now() + 2,
        type: 'ai',
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

  return (
    <>
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          {/* AI Branding */}
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

          {/* Chat History */}
          <ChatHistory messages={chatHistory} />

          {/* Search Form */}
          <SearchForm
            query={query}
            setQuery={setQuery}
            searchType={searchType}
            setSearchType={setSearchType}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {/* Quick Prompts */}
          <QuickPrompts
            prompts={quickPrompts}
            onPromptClick={setQuery}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Stock Results Table */}
      <StockResultsTable
        results={stockQueryResults}
        query={currentSearchQuery}
        onDismiss={handleDismissResults}
      />
    </>
  );
};

export default AIFeedChat;
