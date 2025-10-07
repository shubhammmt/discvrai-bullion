import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MoverCrypto {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: number;
}

export const CryptoMarketMovers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("gainers");

  // Mock data - will be replaced with actual API
  const gainers: MoverCrypto[] = [
    { symbol: "SOL", name: "Solana", price: 145.23, changePercent: 12.5, volume: 2.3e9 },
    { symbol: "AVAX", name: "Avalanche", price: 34.56, changePercent: 8.9, volume: 1.1e9 },
    { symbol: "MATIC", name: "Polygon", price: 0.87, changePercent: 7.2, volume: 890e6 },
    { symbol: "DOT", name: "Polkadot", price: 7.45, changePercent: 6.8, volume: 450e6 },
    { symbol: "LINK", name: "Chainlink", price: 14.32, changePercent: 5.4, volume: 780e6 },
  ];

  const losers: MoverCrypto[] = [
    { symbol: "DOGE", name: "Dogecoin", price: 0.08, changePercent: -5.3, volume: 1.2e9 },
    { symbol: "SHIB", name: "Shiba Inu", price: 0.000012, changePercent: -4.8, volume: 670e6 },
    { symbol: "ADA", name: "Cardano", price: 0.45, changePercent: -3.9, volume: 890e6 },
    { symbol: "XLM", name: "Stellar", price: 0.12, changePercent: -3.2, volume: 340e6 },
    { symbol: "TRX", name: "Tron", price: 0.09, changePercent: -2.7, volume: 560e6 },
  ];

  const mostActive: MoverCrypto[] = [
    { symbol: "BTC", name: "Bitcoin", price: 67234.45, changePercent: 3.2, volume: 28.5e9 },
    { symbol: "ETH", name: "Ethereum", price: 3421.56, changePercent: 2.8, volume: 15.2e9 },
    { symbol: "USDT", name: "Tether", price: 1.0, changePercent: 0.01, volume: 45.8e9 },
    { symbol: "BNB", name: "Binance Coin", price: 567.89, changePercent: -1.2, volume: 1.8e9 },
    { symbol: "XRP", name: "Ripple", price: 0.54, changePercent: 1.9, volume: 2.1e9 },
  ];

  const data = {
    gainers,
    losers,
    mostActive,
  };

  const renderMoversList = (movers: MoverCrypto[]) => (
    <div className="space-y-2">
      {movers.map((crypto, index) => (
        <div
          key={crypto.symbol}
          onClick={() => navigate(`/crypto/${crypto.symbol.toLowerCase()}`)}
          className="flex items-center justify-between p-4 hover:bg-accent rounded-lg cursor-pointer transition-colors group"
        >
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground font-semibold w-6">{index + 1}</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-sm">
              {crypto.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="font-semibold group-hover:text-primary transition-colors">
                {crypto.name}
              </div>
              <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold mb-1">
              ${crypto.price < 1 ? crypto.price.toFixed(6) : crypto.price.toLocaleString()}
            </div>
            <div className={`text-sm font-semibold flex items-center gap-1 justify-end ${
              crypto.changePercent >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {crypto.changePercent >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          Crypto Market Movers
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 rounded-none border-b border-border/50">
          <TabsTrigger value="gainers" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-success">
            <TrendingUp className="w-4 h-4 mr-2" />
            Top Gainers
          </TabsTrigger>
          <TabsTrigger value="losers" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-destructive">
            <TrendingDown className="w-4 h-4 mr-2" />
            Top Losers
          </TabsTrigger>
          <TabsTrigger value="mostActive" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Activity className="w-4 h-4 mr-2" />
            Most Active
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gainers" className="p-4 mt-0">
          {renderMoversList(data.gainers)}
        </TabsContent>

        <TabsContent value="losers" className="p-4 mt-0">
          {renderMoversList(data.losers)}
        </TabsContent>

        <TabsContent value="mostActive" className="p-4 mt-0">
          {renderMoversList(data.mostActive)}
        </TabsContent>
      </Tabs>
    </Card>
  );
};
