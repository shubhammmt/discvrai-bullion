import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Newspaper } from "lucide-react";
import { NewsCard } from "./news/NewsCard";
import { useCryptoNews } from "@/hooks/useCryptoNews";
import { useNavigate } from "react-router-dom";

export const CryptoNewsSection = () => {
  const navigate = useNavigate();
  const [activeSymbol, setActiveSymbol] = useState("ALL");
  const { news, isLoading } = useCryptoNews(activeSymbol === "ALL" ? undefined : activeSymbol);

  const currencies = [
    { symbol: "ALL", name: "All News" },
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "BNB", name: "Binance" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "XRP", name: "Ripple" },
    { symbol: "ADA", name: "Cardano" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Cryptocurrency News</h2>
      </div>

      <Tabs value={activeSymbol} onValueChange={setActiveSymbol} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex w-auto min-w-full">
            {currencies.map((currency) => (
              <TabsTrigger
                key={currency.symbol}
                value={currency.symbol}
                className="whitespace-nowrap"
              >
                {currency.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {currencies.map((currency) => (
          <TabsContent key={currency.symbol} value={currency.symbol} className="mt-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="p-6 animate-pulse">
                    <div className="h-24 bg-muted rounded"></div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {news.slice(0, 8).map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onClick={() => navigate(`/crypto/news/${article.slug}`)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
