import { useState } from "react";
import { Bell, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BullionPriceCard } from "@/components/bullion/BullionPriceCard";
import { UnifiedBuyModal } from "@/components/bullion/UnifiedBuyModal";
import { SellModal } from "@/components/bullion/SellModal";
import { PortfolioVault } from "@/components/bullion/PortfolioVault";
import { AIAgentChat } from "@/components/bullion/AIAgentChat";
import { 
  QuickTradePanel, 
  PortfolioSummaryWidget, 
  EducationalCards,
  BullionPromoGrid, 
  BuyGoldCard, 
  BuySilverCard, 
  GoldSIPCard, 
  SilverSIPCard,
  BullionHero,
  WhyDigitalCards,
  PhysicalVsDigital,
  HowItWorks,
  TrustSignals,
  BullionFAQ,
  EmptyHoldingsPrompt,
} from "@/components/bullion";

export default function BullionInvestment() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<"buy" | "sell" | null>(null);
  const [selectedMetal, setSelectedMetal] = useState<"gold" | "silver">("gold");
  const [view, setView] = useState<"market" | "vault" | "cards">("market");

  // Mock data
  const goldPrice = 6250.50;
  const silverPrice = 76.80;
  const goldChange = 45.20;
  const silverChange = -1.25;

  const goldSparkline = [6180, 6200, 6190, 6220, 6240, 6210, 6250];
  const silverSparkline = [78, 77.5, 78.2, 77, 76.5, 77.2, 76.8];

  const holdings = {
    gold: { total: 2.5, sellable: 2.0, locked: 0.5 },
    silver: { total: 15.0, sellable: 15.0, locked: 0 },
  };

  const transactions = [
    { id: "1", type: "buy" as const, metal: "gold" as const, grams: 0.5, amount: 3125, date: "Dec 24, 2025", status: "success" as const },
    { id: "2", type: "buy" as const, metal: "silver" as const, grams: 10, amount: 768, date: "Dec 20, 2025", status: "success" as const },
  ];

  const openBuy = (metal: "gold" | "silver") => {
    setSelectedMetal(metal);
    setActiveModal("buy");
  };

  const openSell = (metal: "gold" | "silver") => {
    setSelectedMetal(metal);
    setActiveModal("sell");
  };

  // Check if user has any holdings
  const hasGoldHoldings = holdings.gold.total > 0;
  const hasSilverHoldings = holdings.silver.total > 0;
  const hasAnyHoldings = hasGoldHoldings || hasSilverHoldings;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg">Discvr Bullion</h1>
              <p className="text-xs text-muted-foreground">Digital Gold & Silver</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* View Toggle - Only visible on mobile/tablet */}
      <div className="lg:hidden max-w-lg mx-auto px-4 py-3">
        <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
          <button
            onClick={() => setView("market")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${view === "market" ? "bg-background shadow-sm" : ""}`}
          >
            Market
          </button>
          <button
            onClick={() => setView("vault")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${view === "vault" ? "bg-background shadow-sm" : ""}`}
          >
            My Vault
          </button>
          <button
            onClick={() => setView("cards")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${view === "cards" ? "bg-background shadow-sm" : ""}`}
          >
            Explore
          </button>
        </div>
      </div>

      {/* DESKTOP: 3-Column Layout */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Quick Trade Panel */}
          <aside className="col-span-3">
            <div className="sticky top-24">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Quick Trade</h2>
              <QuickTradePanel
                goldPrice={goldPrice}
                silverPrice={silverPrice}
                onBuyGold={() => openBuy("gold")}
                onBuySilver={() => openBuy("silver")}
                onSellGold={() => openSell("gold")}
                onSellSilver={() => openSell("silver")}
                onStartSIP={() => openBuy("gold")}
                hasGoldHoldings={hasGoldHoldings}
                hasSilverHoldings={hasSilverHoldings}
              />
            </div>
          </aside>

          {/* Center Column - Price Cards + Education */}
          <main className="col-span-6 space-y-6">
            {/* Live Prices Section */}
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Live Prices</h2>
              <div className="space-y-4">
                <BullionPriceCard
                  metal="gold"
                  price={goldPrice}
                  change={goldChange}
                  changePercent={(goldChange / goldPrice) * 100}
                  sparklineData={goldSparkline}
                  showActions
                  onBuy={() => openBuy("gold")}
                  onSell={() => openSell("gold")}
                  hasHoldings={hasGoldHoldings}
                />
                <BullionPriceCard
                  metal="silver"
                  price={silverPrice}
                  change={silverChange}
                  changePercent={(silverChange / silverPrice) * 100}
                  sparklineData={silverSparkline}
                  showActions
                  onBuy={() => openBuy("silver")}
                  onSell={() => openSell("silver")}
                  hasHoldings={hasSilverHoldings}
                />
              </div>
            </section>

            {/* Learn Section */}
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Learn & Grow</h2>
              <EducationalCards 
                onBuyGold={() => openBuy("gold")} 
                onStartSIP={() => openBuy("gold")} 
              />
            </section>
          </main>

          {/* Right Column - Portfolio Summary */}
          <aside className="col-span-3">
            <div className="sticky top-24">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Your Portfolio</h2>
              <PortfolioSummaryWidget
                goldHoldings={holdings.gold.total}
                silverHoldings={holdings.silver.total}
                goldPrice={goldPrice}
                silverPrice={silverPrice}
                transactions={transactions}
                onViewVault={() => setView("vault")}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* MOBILE/TABLET: Single Column Layout */}
      <main className="lg:hidden max-w-lg mx-auto px-4 pb-32">
        {view === "market" ? (
          <div className="space-y-4">
            {/* Price Cards with inline actions */}
            <BullionPriceCard
              metal="gold"
              price={goldPrice}
              change={goldChange}
              changePercent={(goldChange / goldPrice) * 100}
              sparklineData={goldSparkline}
              showActions
              onBuy={() => openBuy("gold")}
              onSell={() => openSell("gold")}
              hasHoldings={hasGoldHoldings}
            />
            <BullionPriceCard
              metal="silver"
              price={silverPrice}
              change={silverChange}
              changePercent={(silverChange / silverPrice) * 100}
              sparklineData={silverSparkline}
              showActions
              onBuy={() => openBuy("silver")}
              onSell={() => openSell("silver")}
              hasHoldings={hasSilverHoldings}
            />

            {/* Quick Portfolio Summary */}
            <PortfolioSummaryWidget
              goldHoldings={holdings.gold.total}
              silverHoldings={holdings.silver.total}
              goldPrice={goldPrice}
              silverPrice={silverPrice}
              transactions={transactions}
              onViewVault={() => setView("vault")}
            />

            {/* Educational Content */}
            <EducationalCards 
              onBuyGold={() => openBuy("gold")} 
              onStartSIP={() => openBuy("gold")} 
            />
          </div>
        ) : view === "vault" ? (
          <PortfolioVault
            goldHoldings={holdings.gold.total}
            silverHoldings={holdings.silver.total}
            goldPrice={goldPrice}
            silverPrice={silverPrice}
            transactions={transactions}
          />
        ) : (
          <div className="space-y-8">
            {/* Full Grid */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Explore Investment Options</h2>
              <BullionPromoGrid />
            </section>

            {/* Banner Variants */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Featured</h2>
              <div className="space-y-3">
                <BuyGoldCard variant="banner" />
                <GoldSIPCard variant="banner" />
              </div>
            </section>

            {/* Compact Cards */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <BuyGoldCard variant="compact" />
                <BuySilverCard variant="compact" />
                <GoldSIPCard variant="compact" />
                <SilverSIPCard variant="compact" />
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Bottom Action Bar - MOBILE ONLY */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-background/80 backdrop-blur-xl border-t border-border/50 p-4 z-40">
        <div className="max-w-lg mx-auto flex gap-3">
          <Button 
            onClick={() => openBuy("gold")} 
            className="flex-1 h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold text-base shadow-lg shadow-amber-500/25"
          >
            🪙 Buy Gold
          </Button>
          <Button 
            onClick={() => openBuy("silver")} 
            variant="secondary"
            className="flex-1 h-14 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-base"
          >
            🥈 Buy Silver
          </Button>
        </div>
        {hasAnyHoldings && (
          <div className="max-w-lg mx-auto flex gap-3 mt-2">
            <Button 
              onClick={() => openSell("gold")} 
              variant="outline" 
              className="flex-1 h-10"
              disabled={!hasGoldHoldings}
            >
              Sell Gold
            </Button>
            <Button 
              onClick={() => openSell("silver")} 
              variant="outline" 
              className="flex-1 h-10"
              disabled={!hasSilverHoldings}
            >
              Sell Silver
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <UnifiedBuyModal 
        open={activeModal === "buy"} 
        onOpenChange={(o) => !o && setActiveModal(null)} 
        metal={selectedMetal} 
        currentPrice={selectedMetal === "gold" ? goldPrice : silverPrice} 
      />
      <SellModal 
        open={activeModal === "sell"} 
        onOpenChange={(o) => !o && setActiveModal(null)} 
        metal={selectedMetal} 
        currentPrice={selectedMetal === "gold" ? goldPrice : silverPrice} 
        holdings={holdings[selectedMetal]} 
      />

      {/* AI Agent */}
      <AIAgentChat goldPrice={goldPrice} silverPrice={silverPrice} />
    </div>
  );
}
