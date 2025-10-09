import { useState } from 'react';
import { Send, TrendingUp, Globe, Share2, Download, Copy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import StockScreenerResults from '@/components/screener/StockScreenerResults';
import QuickQueryChips from '@/components/screener/QuickQueryChips';
import ChatMessageList from '@/components/screener/ChatMessageList';

export type Market = 'india' | 'us';

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  market?: Market;
  results?: any[];
  metadata?: {
    queryType?: 'fundamental' | 'technical' | 'screening';
    responseTime?: number;
  };
}

const AIStockScreener = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI stock research assistant. Ask me anything about stocks in India 🇮🇳 or the US 🇺🇸. Try questions like 'Top dividend stocks' or 'Compare Apple vs Microsoft'",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [market, setMarket] = useState<Market>('india');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      market,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // TODO: Replace with actual API call to your backend
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Analyzing your query for ${market === 'india' ? 'Indian' : 'US'} market: "${input}"`,
        timestamp: new Date(),
        market,
        metadata: {
          queryType: 'screening',
          responseTime: 3.2,
        },
        // Mock results - replace with actual API response
        results: market === 'india' ? [
          { symbol: 'TCS', name: 'Tata Consultancy Services', pe: 28.5, marketCap: '₹12.5L Cr', change: 2.3 },
          { symbol: 'INFY', name: 'Infosys', pe: 24.2, marketCap: '₹6.8L Cr', change: 1.8 },
          { symbol: 'HDFCBANK', name: 'HDFC Bank', pe: 19.4, marketCap: '₹11.2L Cr', change: -0.5 },
        ] : [
          { symbol: 'AAPL', name: 'Apple Inc.', pe: 31.2, marketCap: '$3.2T', change: 1.5 },
          { symbol: 'MSFT', name: 'Microsoft Corp.', pe: 35.8, marketCap: '$2.8T', change: 0.9 },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', pe: 27.3, marketCap: '$1.9T', change: 2.1 },
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleQuickQuery = (query: string) => {
    setInput(query);
  };

  const handleShare = async () => {
    // Generate shareable URL
    const shareUrl = `${window.location.origin}/ai/chat?id=${messages[messages.length - 1]?.id}`;
    
    if (navigator.share) {
      await navigator.share({
        title: 'AI Stock Screening Results',
        text: 'Check out these stock insights from Discvr AI',
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share this link with others",
      });
    }
  };

  const handleCopy = () => {
    const lastAiMessage = messages.filter(m => m.type === 'ai').pop();
    if (lastAiMessage) {
      navigator.clipboard.writeText(lastAiMessage.content);
      toast({
        title: "Copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-bold">AI Stock Screener</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Market Switcher */}
          <Tabs value={market} onValueChange={(v) => setMarket(v as Market)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="india" className="flex items-center gap-2">
                <span className="text-lg">🇮🇳</span>
                <span>India</span>
              </TabsTrigger>
              <TabsTrigger value="us" className="flex items-center gap-2">
                <span className="text-lg">🇺🇸</span>
                <span>US</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Quick Query Chips */}
      <div className="container mx-auto px-4 py-4">
        <QuickQueryChips market={market} onSelectQuery={handleQuickQuery} />
      </div>

      {/* Chat Messages */}
      <div className="container mx-auto px-4 pb-4">
        <ChatMessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask about ${market === 'india' ? 'Indian' : 'US'} stocks...`}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isLoading}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Powered by AI • {market === 'india' ? 'NSE/BSE' : 'NYSE/NASDAQ'} data
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIStockScreener;
