import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CryptoSearchResult {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

export const CryptoSearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<CryptoSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search results - will be replaced with actual API
  const mockResults: CryptoSearchResult[] = [
    { symbol: "BTC", name: "Bitcoin", price: 67234.45, changePercent: 3.2 },
    { symbol: "ETH", name: "Ethereum", price: 3421.56, changePercent: 2.8 },
    { symbol: "BNB", name: "Binance Coin", price: 567.89, changePercent: -1.2 },
    { symbol: "SOL", name: "Solana", price: 145.23, changePercent: 5.4 },
    { symbol: "XRP", name: "Ripple", price: 0.54, changePercent: 1.9 },
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockResults.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (symbol: string) => {
    navigate(`/crypto/${symbol.toLowerCase()}`);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search cryptocurrency by name or symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-base bg-card border-border/50"
        />
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg overflow-hidden">
          {results.map((crypto) => (
            <div
              key={crypto.symbol}
              onClick={() => handleSelect(crypto.symbol)}
              className="flex items-center justify-between p-4 hover:bg-accent cursor-pointer transition-colors border-b border-border/50 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-sm">
                  {crypto.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold">{crypto.symbol}</div>
                  <div className="text-xs text-muted-foreground">{crypto.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${crypto.price.toLocaleString()}</div>
                <div className={`text-sm flex items-center gap-1 ${crypto.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
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
        </Card>
      )}
    </div>
  );
};
