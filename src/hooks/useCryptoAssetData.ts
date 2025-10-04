import { useState, useEffect } from "react";
import { useCryptoNews, NewsArticle } from "./useCryptoNews";

export interface CryptoMetrics {
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  allTimeHigh: number;
  allTimeLow: number;
}

export interface CryptoAssetDetail {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  changeAmount: number;
  rank: number;
  description: string;
  metrics: CryptoMetrics;
  links: {
    website?: string;
    whitepaper?: string;
    twitter?: string;
  };
}

export interface AIInsights {
  sentiment: "Bullish" | "Bearish" | "Neutral";
  sentimentScore: number;
  summary: string;
}

export const useCryptoAssetData = (symbol: string) => {
  const [crypto, setCrypto] = useState<CryptoAssetDetail | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsights>({
    sentiment: "Bullish",
    sentimentScore: 75,
    summary: "Market sentiment for this asset remains positive based on recent price action and news analysis."
  });
  const [isLoading, setIsLoading] = useState(true);
  
  const { news, isLoading: newsLoading } = useCryptoNews(symbol);

  useEffect(() => {
    // Mock data - replace with actual FMP API call
    const fetchCryptoDetail = async () => {
      setIsLoading(true);
      
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data based on symbol
      const mockCryptoData: Record<string, CryptoAssetDetail> = {
        BTC: {
          symbol: "BTC",
          name: "Bitcoin",
          price: 45230.50,
          changePercent: 2.5,
          changeAmount: 1102.30,
          rank: 1,
          description: "Bitcoin is the first decentralized cryptocurrency. Operating on a peer-to-peer network, it allows users to send and receive payments without the need for a central authority. Created by the pseudonymous Satoshi Nakamoto in 2009, Bitcoin uses blockchain technology to maintain a secure and transparent ledger of all transactions.",
          metrics: {
            marketCap: 880200000000,
            volume24h: 28500000000,
            circulatingSupply: 19500000,
            totalSupply: 21000000,
            allTimeHigh: 69000,
            allTimeLow: 67.81
          },
          links: {
            website: "https://bitcoin.org",
            whitepaper: "https://bitcoin.org/bitcoin.pdf",
            twitter: "https://twitter.com/bitcoin"
          }
        },
        ETH: {
          symbol: "ETH",
          name: "Ethereum",
          price: 2850.25,
          changePercent: 1.8,
          changeAmount: 50.35,
          rank: 2,
          description: "Ethereum is a decentralized platform that runs smart contracts and decentralized applications (dApps). Launched in 2015 by Vitalik Buterin and others, Ethereum introduced programmable blockchain technology, enabling developers to build complex applications on its network. The native cryptocurrency, Ether (ETH), is used to pay for transactions and computational services.",
          metrics: {
            marketCap: 342000000000,
            volume24h: 15200000000,
            circulatingSupply: 120000000,
            totalSupply: 120000000,
            allTimeHigh: 4878,
            allTimeLow: 0.42
          },
          links: {
            website: "https://ethereum.org",
            whitepaper: "https://ethereum.org/en/whitepaper",
            twitter: "https://twitter.com/ethereum"
          }
        },
        SOL: {
          symbol: "SOL",
          name: "Solana",
          price: 98.75,
          changePercent: 5.2,
          changeAmount: 4.88,
          rank: 4,
          description: "Solana is a high-performance blockchain platform designed for decentralized applications and crypto-currencies. Known for its fast transaction speeds and low costs, Solana uses a unique Proof of History (PoH) consensus mechanism combined with Proof of Stake (PoS). The platform has become popular for DeFi projects, NFTs, and Web3 applications.",
          metrics: {
            marketCap: 42100000000,
            volume24h: 3200000000,
            circulatingSupply: 426000000,
            totalSupply: 555000000,
            allTimeHigh: 260,
            allTimeLow: 0.50
          },
          links: {
            website: "https://solana.com",
            whitepaper: "https://solana.com/solana-whitepaper.pdf",
            twitter: "https://twitter.com/solana"
          }
        }
      };

      const cryptoData = mockCryptoData[symbol] || {
        symbol: symbol,
        name: symbol,
        price: 100,
        changePercent: 0,
        changeAmount: 0,
        rank: 10,
        description: `${symbol} is a cryptocurrency asset available on the DISCVR platform.`,
        metrics: {
          marketCap: 1000000000,
          volume24h: 50000000,
          circulatingSupply: 10000000,
          totalSupply: 20000000,
          allTimeHigh: 200,
          allTimeLow: 10
        },
        links: {}
      };

      setCrypto(cryptoData);
      setIsLoading(false);
    };

    if (symbol) {
      fetchCryptoDetail();
    }
  }, [symbol]);

  return { 
    crypto, 
    news, 
    aiInsights, 
    isLoading: isLoading || newsLoading 
  };
};
