import { useState, useEffect } from "react";
import { Bell, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BullionPriceCard } from "@/components/bullion/BullionPriceCard";
import { BuyModal } from "@/components/bullion/BuyModal";
import { SellModal } from "@/components/bullion/SellModal";
import { SIPModal } from "@/components/bullion/SIPModal";
import { PortfolioVault } from "@/components/bullion/PortfolioVault";
import { AIAgentChat } from "@/components/bullion/AIAgentChat";
import { BullionPromoGrid, BuyGoldCard, BuySilverCard, GoldSIPCard, SilverSIPCard, BullionInlineWidget } from "@/components/bullion";

export default function BullionInvestment() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<"buy" | "sell" | "sip" | null>(null);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
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

      {/* View Toggle */}
      <div className="max-w-lg mx-auto px-4 py-3">
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
            Promo Cards
          </button>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 pb-32">
        {view === "market" ? (
          <div className="space-y-4">
            {/* Price Cards */}
            <BullionPriceCard
              metal="gold"
              price={goldPrice}
              change={goldChange}
              changePercent={(goldChange / goldPrice) * 100}
              sparklineData={goldSparkline}
              onClick={() => openBuy("gold")}
            />
            <BullionPriceCard
              metal="silver"
              price={silverPrice}
              change={silverChange}
              changePercent={(silverChange / silverPrice) * 100}
              sparklineData={silverSparkline}
              onClick={() => openBuy("silver")}
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
              <h2 className="text-lg font-semibold mb-3">Full Promo Grid</h2>
              <BullionPromoGrid />
            </section>

            {/* Banner Variants */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Banner Variants</h2>
              <div className="space-y-3">
                <BuyGoldCard variant="banner" />
                <GoldSIPCard variant="banner" />
              </div>
            </section>

            {/* Compact (for sidebars/articles) */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Compact (Inline)</h2>
              <div className="grid grid-cols-2 gap-3">
                <BuyGoldCard variant="compact" />
                <BuySilverCard variant="compact" />
                <GoldSIPCard variant="compact" />
                <SilverSIPCard variant="compact" />
              </div>
            </section>

            {/* Article Widget */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Article Inline Widget</h2>
              <p className="text-sm text-muted-foreground mb-3">This widget can be embedded within article content:</p>
              <BullionInlineWidget metal="gold" />
              <BullionInlineWidget metal="silver" />
            </section>
          </div>
        )}
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border/50 p-4 z-40">
        <div className="max-w-lg mx-auto flex gap-3">
          <Button onClick={() => { setSelectedMetal("gold"); setActiveModal("buy"); }} className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700">Buy</Button>
          <Button onClick={() => { setSelectedMetal("gold"); setActiveModal("sell"); }} variant="outline" className="flex-1 h-12">Sell</Button>
          <Button onClick={() => { setSelectedMetal("gold"); setActiveModal("sip"); }} variant="outline" className="flex-1 h-12">SIP</Button>
        </div>
      </div>

      {/* Modals */}
      <BuyModal open={activeModal === "buy"} onOpenChange={(o) => !o && setActiveModal(null)} metal={selectedMetal} currentPrice={selectedMetal === "gold" ? goldPrice : silverPrice} />
      <SellModal open={activeModal === "sell"} onOpenChange={(o) => !o && setActiveModal(null)} metal={selectedMetal} currentPrice={selectedMetal === "gold" ? goldPrice : silverPrice} holdings={holdings[selectedMetal]} />
      <SIPModal open={activeModal === "sip"} onOpenChange={(o) => !o && setActiveModal(null)} metal={selectedMetal} currentPrice={selectedMetal === "gold" ? goldPrice : silverPrice} />

      {/* AI Agent */}
      <AIAgentChat goldPrice={goldPrice} silverPrice={silverPrice} />
    </div>
  );
}
