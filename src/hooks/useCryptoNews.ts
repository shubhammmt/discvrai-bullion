import { useState, useEffect } from "react";

export interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  content: string;
  publishedAt: string;
  source: string;
  category: "Breaking" | "Market Analysis" | "Regulatory" | "Technology" | "Adoption";
  sentiment: "Bullish" | "Bearish" | "Neutral";
  symbols: string[];
  readTime: number;
  slug: string;
  imageUrl?: string;
}

export const useCryptoNews = (symbol?: string) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual FMP API call
    const fetchNews = async () => {
      setIsLoading(true);
      
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockNews: NewsArticle[] = [
        {
          id: "1",
          headline: "Bitcoin Surges Past $50K as Institutional Investors Return",
          summary: "Bitcoin price breaks key resistance level amid renewed institutional interest and positive ETF inflows.",
          content: "Bitcoin has surged past the $50,000 mark for the first time in months...",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          source: "CryptoNews Daily",
          category: "Breaking",
          sentiment: "Bullish",
          symbols: ["BTC"],
          readTime: 30,
          slug: "bitcoin-surges-past-50k-institutional-investors"
        },
        {
          id: "2",
          headline: "Ethereum Layer 2 Activity Hits Record High as Gas Fees Drop",
          summary: "Layer 2 solutions processing over 10M transactions daily while Ethereum mainnet fees remain low.",
          content: "Ethereum's layer 2 ecosystem has reached new heights...",
          publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          source: "DeFi Insider",
          category: "Market Analysis",
          sentiment: "Bullish",
          symbols: ["ETH", "ARB", "OP"],
          readTime: 60,
          slug: "ethereum-layer-2-activity-record-high"
        },
        {
          id: "3",
          headline: "SEC Delays Decision on Spot Solana ETF Applications",
          summary: "Regulatory uncertainty continues as SEC pushes decision timeline for multiple Solana ETF proposals.",
          content: "The Securities and Exchange Commission has once again delayed...",
          publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          source: "Regulatory Watch",
          category: "Regulatory",
          sentiment: "Neutral",
          symbols: ["SOL"],
          readTime: 45,
          slug: "sec-delays-solana-etf-decision"
        },
        {
          id: "4",
          headline: "Major Banking Institution Launches Crypto Custody Service",
          summary: "Traditional finance giant enters crypto space with institutional-grade custody solutions.",
          content: "In a significant move bridging traditional and digital finance...",
          publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          source: "Finance Today",
          category: "Adoption",
          sentiment: "Bullish",
          symbols: ["BTC", "ETH"],
          readTime: 90,
          slug: "banking-institution-crypto-custody-service"
        },
        {
          id: "5",
          headline: "DeFi Protocol Suffers $20M Exploit, Team Working on Recovery",
          summary: "Smart contract vulnerability leads to significant losses; protocol pauses operations.",
          content: "A popular DeFi protocol has temporarily halted operations following...",
          publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          source: "Security Alert",
          category: "Breaking",
          sentiment: "Bearish",
          symbols: ["ETH"],
          readTime: 60,
          slug: "defi-protocol-exploit-20m-recovery"
        }
      ];

      // Filter by symbol if provided
      const filteredNews = symbol 
        ? mockNews.filter(article => article.symbols.includes(symbol))
        : mockNews;

      setNews(filteredNews);
      setIsLoading(false);
    };

    fetchNews();
  }, [symbol]);

  return { news, isLoading };
};
