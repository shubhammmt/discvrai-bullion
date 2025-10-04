import { useState, useEffect } from "react";

export interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  changeAmount: number;
  marketCap: number;
  volume: number;
  rank: number;
  sparkline?: number[];
}

export interface MarketStats {
  totalMarketCap: string;
  volume24h: string;
  btcDominance: number;
  sentiment: "Bullish" | "Bearish" | "Neutral";
}

export const useCryptoData = () => {
  const [cryptos, setCryptos] = useState<CryptoAsset[]>([]);
  const [marketStats, setMarketStats] = useState<MarketStats>({
    totalMarketCap: "2.1T",
    volume24h: "85B",
    btcDominance: 52.3,
    sentiment: "Bullish",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual FMP API call
    const fetchCryptos = async () => {
      setIsLoading(true);
      
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCryptos: CryptoAsset[] = [
        {
          symbol: "BTC",
          name: "Bitcoin",
          price: 45230.50,
          changePercent: 2.5,
          changeAmount: 1102.30,
          marketCap: 880200000000,
          volume: 28500000000,
          rank: 1,
          sparkline: [43000, 43500, 44200, 43800, 44500, 45230]
        },
        {
          symbol: "ETH",
          name: "Ethereum",
          price: 2850.25,
          changePercent: 1.8,
          changeAmount: 50.35,
          marketCap: 342000000000,
          volume: 15200000000,
          rank: 2,
          sparkline: [2780, 2800, 2820, 2790, 2830, 2850]
        },
        {
          symbol: "BNB",
          name: "BNB",
          price: 320.50,
          changePercent: -0.5,
          changeAmount: -1.60,
          marketCap: 49300000000,
          volume: 1800000000,
          rank: 3,
          sparkline: [325, 323, 322, 321, 319, 320.5]
        },
        {
          symbol: "SOL",
          name: "Solana",
          price: 98.75,
          changePercent: 5.2,
          changeAmount: 4.88,
          marketCap: 42100000000,
          volume: 3200000000,
          rank: 4,
          sparkline: [92, 94, 96, 95, 97, 98.75]
        },
        {
          symbol: "XRP",
          name: "XRP",
          price: 0.52,
          changePercent: -1.2,
          changeAmount: -0.006,
          marketCap: 28700000000,
          volume: 1100000000,
          rank: 5,
          sparkline: [0.53, 0.525, 0.522, 0.521, 0.519, 0.52]
        },
        {
          symbol: "ADA",
          name: "Cardano",
          price: 0.48,
          changePercent: 3.1,
          changeAmount: 0.014,
          marketCap: 16800000000,
          volume: 580000000,
          rank: 6,
          sparkline: [0.46, 0.465, 0.47, 0.475, 0.478, 0.48]
        },
        {
          symbol: "DOGE",
          name: "Dogecoin",
          price: 0.082,
          changePercent: 8.5,
          changeAmount: 0.006,
          marketCap: 11900000000,
          volume: 890000000,
          rank: 7,
          sparkline: [0.074, 0.076, 0.078, 0.079, 0.081, 0.082]
        },
        {
          symbol: "AVAX",
          name: "Avalanche",
          price: 28.50,
          changePercent: 2.3,
          changeAmount: 0.64,
          marketCap: 10500000000,
          volume: 420000000,
          rank: 8,
          sparkline: [27.5, 27.8, 28.1, 27.9, 28.3, 28.5]
        }
      ];

      setCryptos(mockCryptos);
      setIsLoading(false);
    };

    fetchCryptos();
  }, []);

  return { cryptos, marketStats, isLoading };
};
