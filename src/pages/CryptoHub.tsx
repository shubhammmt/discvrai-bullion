import Header from "@/components/Header";
import { CryptoSearchBar } from "@/components/crypto/CryptoSearchBar";
import { CryptoCurrencyCard } from "@/components/crypto/CryptoCurrencyCard";
import { CryptoMarketMovers } from "@/components/crypto/CryptoMarketMovers";
import { CryptoNewsSection } from "@/components/crypto/CryptoNewsSection";
import { CryptoPageFooter } from "@/components/crypto/CryptoPageFooter";
import { useCryptoData } from "@/hooks/useCryptoData";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CryptoHub = () => {
  const { cryptos, isLoading, marketStats } = useCryptoData();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Cryptocurrency Market
          </h1>
          <p className="text-lg text-muted-foreground">
            Track, analyze, and stay updated with real-time crypto prices and market insights
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <CryptoSearchBar />
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-sm text-muted-foreground mb-1">Market Cap</div>
            <div className="text-xl md:text-2xl font-bold">${marketStats.totalMarketCap}</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5">
            <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
            <div className="text-xl md:text-2xl font-bold">${marketStats.volume24h}</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5">
            <div className="text-sm text-muted-foreground mb-1">BTC Dominance</div>
            <div className="text-xl md:text-2xl font-bold">{marketStats.btcDominance}%</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-success/10 to-success/5">
            <div className="text-sm text-muted-foreground mb-1">Sentiment</div>
            <div className="text-xl md:text-2xl font-bold text-success">{marketStats.sentiment}</div>
          </Card>
        </div>

        {/* Top 10 Cryptocurrencies */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Top 10 Cryptocurrencies</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(10)].map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-48 w-full" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cryptos.slice(0, 10).map((crypto) => (
                <CryptoCurrencyCard key={crypto.symbol} crypto={crypto} />
              ))}
            </div>
          )}
        </section>

        {/* Market Movers */}
        <section className="mb-16">
          <CryptoMarketMovers />
        </section>

        {/* News Section */}
        <section className="mb-16">
          <CryptoNewsSection />
        </section>
      </main>

      {/* Footer */}
      <CryptoPageFooter />
    </div>
  );
};

export default CryptoHub;
