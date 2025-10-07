import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Twitter, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CryptoPageFooter = () => {
  const navigate = useNavigate();

  const topCryptos = [
    "Bitcoin (BTC)", "Ethereum (ETH)", "Binance Coin (BNB)", "Solana (SOL)",
    "XRP", "Cardano (ADA)", "Dogecoin (DOGE)", "Polkadot (DOT)",
    "Polygon (MATIC)", "Chainlink (LINK)", "Litecoin (LTC)", "Avalanche (AVAX)",
  ];

  const newsCategories = [
    { label: "Bitcoin News", path: "/crypto/news?symbol=BTC" },
    { label: "Ethereum News", path: "/crypto/news?symbol=ETH" },
    { label: "Altcoin News", path: "/crypto/news?symbol=ALL" },
    { label: "DeFi News", path: "/crypto/news?category=defi" },
    { label: "News Archives", path: "/crypto/news/archive" },
  ];

  const marketTools = [
    { label: "Top Gainers", path: "/crypto?filter=gainers" },
    { label: "Top Losers", path: "/crypto?filter=losers" },
    { label: "Most Active", path: "/crypto?filter=active" },
    { label: "Historical Data", path: "/crypto/historical" },
    { label: "Price Alerts", path: "/crypto/alerts" },
    { label: "My Watchlist", path: "/crypto/watchlist" },
  ];

  return (
    <footer role="contentinfo" className="bg-card border-t border-border/50 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Quick Search */}
        <Card className="p-6 mb-12 bg-accent/20">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">Quick Cryptocurrency Search</h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search any cryptocurrency..."
                className="pl-12 h-12"
              />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Top Cryptocurrencies */}
          <section aria-labelledby="top-cryptos-heading">
            <h2 id="top-cryptos-heading" className="text-lg font-bold mb-4">Top Cryptocurrencies</h2>
            <nav aria-label="Top cryptocurrency pages">
              <ul className="space-y-2">
                {topCryptos.map((crypto) => (
                  <li key={crypto}>
                    <button
                      onClick={() => navigate(`/crypto/${crypto.split('(')[1]?.replace(')', '').toLowerCase() || 'btc'}`)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {crypto}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => navigate('/crypto/directory')}
                    className="text-sm text-primary hover:underline font-semibold"
                  >
                    View All Cryptocurrencies →
                  </button>
                </li>
              </ul>
            </nav>
          </section>

          {/* Crypto News */}
          <section aria-labelledby="crypto-news-heading">
            <h2 id="crypto-news-heading" className="text-lg font-bold mb-4">Crypto News</h2>
            <nav aria-label="Cryptocurrency news">
              <ul className="space-y-2">
                {newsCategories.map((category) => (
                  <li key={category.label}>
                    <button
                      onClick={() => navigate(category.path)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {category.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          {/* Market Tools */}
          <section aria-labelledby="market-tools-heading">
            <h2 id="market-tools-heading" className="text-lg font-bold mb-4">Market Tools & Resources</h2>
            <nav aria-label="Market tools">
              <ul className="space-y-2">
                {marketTools.map((tool) => (
                  <li key={tool.label}>
                    <button
                      onClick={() => navigate(tool.path)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {tool.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          {/* Archive & Directory */}
          <section aria-labelledby="archive-heading">
            <h2 id="archive-heading" className="text-lg font-bold mb-4">Historical Archive</h2>
            <nav aria-label="Historical archives">
              <ul className="space-y-2">
                <li>
                  <button onClick={() => navigate('/crypto/historical/2024')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    2024 Data
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/crypto/historical/2023')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    2023 Data
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/crypto/directory')} className="text-sm text-primary hover:underline font-semibold">
                    View Complete Archive →
                  </button>
                </li>
              </ul>
            </nav>

            <h3 className="text-lg font-bold mt-6 mb-4">Cryptocurrency Directory</h3>
            <nav aria-label="Cryptocurrency directory">
              <ul className="space-y-2">
                <li>
                  <button onClick={() => navigate('/crypto/directory/a')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    A - C
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/crypto/directory/d')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    D - M
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/crypto/directory/n')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    N - Z
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/crypto/directory')} className="text-sm text-primary hover:underline font-semibold">
                    View Full Directory →
                  </button>
                </li>
              </ul>
            </nav>
          </section>
        </div>

        {/* Company & Legal */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <nav aria-label="Legal and company information">
              <ul className="flex flex-wrap gap-4 justify-center">
                <li><button onClick={() => navigate('/about')} className="text-sm text-muted-foreground hover:text-primary">About Us</button></li>
                <li><button onClick={() => navigate('/contact')} className="text-sm text-muted-foreground hover:text-primary">Contact</button></li>
                <li><button onClick={() => navigate('/privacy-policy')} className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</button></li>
                <li><button onClick={() => navigate('/terms-and-conditions')} className="text-sm text-muted-foreground hover:text-primary">Terms of Service</button></li>
                <li><button onClick={() => navigate('/api')} className="text-sm text-muted-foreground hover:text-primary">API Docs</button></li>
              </ul>
            </nav>
            
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>© 2025 DISCVR. All rights reserved. Cryptocurrency prices and data are for informational purposes only.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
