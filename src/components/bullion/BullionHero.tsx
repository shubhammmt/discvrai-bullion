import { useState, useEffect } from "react";
import { Shield, TrendingUp, TrendingDown, Sparkles, ArrowRight, Check, Gift, Heart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface BullionHeroProps {
  goldPrice: number;
  silverPrice: number;
  goldChange: number;
  silverChange: number;
  userState: "new" | "logged_in_no_holdings" | "investor";
  userName?: string;
  totalValue?: number;
  totalGain?: number;
  gainPercent?: number;
  goldHoldings?: number;
  silverHoldings?: number;
  onBuyGold: () => void;
  onBuySilver: () => void;
  onSellGold?: () => void;
  onSellSilver?: () => void;
  onGiftGold?: () => void;
  onCompleteProfile?: () => void;
  useIconButtons?: boolean;
}

export function BullionHero({
  goldPrice,
  silverPrice,
  goldChange,
  silverChange,
  userState,
  userName,
  totalValue = 0,
  totalGain = 0,
  gainPercent = 0,
  goldHoldings = 0,
  silverHoldings = 0,
  onBuyGold,
  onBuySilver,
  onSellGold,
  onSellSilver,
  onGiftGold,
  onCompleteProfile,
  useIconButtons = false,
}: BullionHeroProps) {
  const [activeSlide, setActiveSlide] = useState(0); // 0 = gold, 1 = silver, 2 = gift
  const goldChangePercent = (goldChange / goldPrice) * 100;
  const silverChangePercent = (silverChange / silverPrice) * 100;

  // Auto-rotate carousel for new and logged_in_no_holdings users
  useEffect(() => {
    if (userState === "investor") return;
    
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, [userState]);

  // Trust signals
  const trustSignals = [
    { text: "100% Insured", icon: "🛡️" },
    { text: "Free Vault Storage", icon: "🏦" },
    { text: "Sell Anytime", icon: "💸" },
    { text: "Powered by Augmont", icon: "⚡" },
  ];

  // New User Hero with Carousel
  if (userState === "new") {
    return (
      <div className="relative">
        <AnimatePresence mode="wait">
          {activeSlide === 0 ? (
            <motion.div
              key="gold-banner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-6 lg:p-8"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium text-amber-500">Start Your Gold Journey</span>
                </div>
                
                <h1 className="text-2xl lg:text-4xl font-bold mb-2">
                  Invest in <span className="text-amber-500">24K Pure Gold</span> from ₹10
                </h1>
                
                {/* Trust Signals */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {trustSignals.map((signal, idx) => (
                    <span key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                      <span>{signal.icon}</span> {signal.text}
                    </span>
                  ))}
                </div>

                {/* Live Price */}
                <div className="mb-6">
                  <PricePill 
                    metal="Gold" 
                    price={goldPrice} 
                    change={goldChange} 
                    changePercent={goldChangePercent} 
                    active
                  />
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={onBuyGold}
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold shadow-lg shadow-amber-500/25"
                  >
                    🪙 Buy Gold
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    onClick={onSellGold}
                    size="lg"
                    variant="outline"
                    className="border-amber-600/50 hover:bg-amber-500/10"
                  >
                    🪙 Sell Gold
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : activeSlide === 1 ? (
            <motion.div
              key="silver-banner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-400/10 via-slate-400/5 to-transparent border border-slate-400/20 p-6 lg:p-8"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-slate-400/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-500/10 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-slate-300" />
                  <span className="text-sm font-medium text-slate-300">Start Your Silver Journey</span>
                </div>
                
                <h1 className="text-2xl lg:text-4xl font-bold mb-2">
                  Invest in <span className="text-slate-300">999 Pure Silver</span> from ₹10
                </h1>
                
                {/* Trust Signals */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {trustSignals.map((signal, idx) => (
                    <span key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                      <span>{signal.icon}</span> {signal.text}
                    </span>
                  ))}
                </div>

                {/* Live Price */}
                <div className="mb-6">
                  <PricePill 
                    metal="Silver" 
                    price={silverPrice} 
                    change={silverChange} 
                    changePercent={silverChangePercent} 
                    active
                  />
                </div>

                {/* CTAs - Silver is primary */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={onBuySilver}
                    size="lg"
                    className="bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 text-black font-semibold shadow-lg shadow-slate-500/25"
                  >
                    🥈 Buy Silver
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    onClick={onSellSilver}
                    size="lg"
                    variant="outline"
                    className="border-slate-600 hover:bg-slate-800"
                  >
                    🥈 Sell Silver
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gift-banner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-purple-500/10 border border-rose-400/20 p-6 lg:p-8"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-5 h-5 text-rose-400" />
                  <span className="text-sm font-medium text-rose-400">Perfect Gift</span>
                </div>
                
                <h1 className="text-2xl lg:text-4xl font-bold mb-2">
                  Gift <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Digital Gold</span> to Your Loved Ones
                </h1>
                
                <p className="text-muted-foreground mb-4 max-w-lg">
                  Share the timeless gift of 24K pure gold. Perfect for birthdays, anniversaries, festivals, or just because. ✨
                </p>

                {/* Gift Benefits */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Heart className="w-4 h-4 text-rose-400" /> Instant Delivery
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>🎁</span> Beautiful Gift Card
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>💰</span> From just ₹51
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>🔒</span> 100% Secure
                  </span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={onGiftGold}
                    size="lg"
                    className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold shadow-lg shadow-rose-500/25"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Send Gold as Gift
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    onClick={onBuyGold}
                    size="lg"
                    variant="outline"
                    className="border-amber-600/50 hover:bg-amber-500/10"
                  >
                    🪙 Buy for Yourself
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setActiveSlide(0)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === 0 ? "w-6 bg-amber-500" : "bg-muted-foreground/30"
            }`}
          />
          <button
            onClick={() => setActiveSlide(1)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === 1 ? "w-6 bg-slate-400" : "bg-muted-foreground/30"
            }`}
          />
          <button
            onClick={() => setActiveSlide(2)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === 2 ? "w-6 bg-rose-400" : "bg-muted-foreground/30"
            }`}
          />
        </div>
      </div>
    );
  }

  // Logged in but no holdings - Same carousel
  if (userState === "logged_in_no_holdings") {
    return (
      <div className="relative">
        <AnimatePresence mode="wait">
          {activeSlide === 0 ? (
            <motion.div
              key="gold-banner-loggedin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-amber-500/5 to-transparent border border-emerald-500/20 p-6 lg:p-8"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                  Hey {userName || "there"}, ready to start? ✨
                </h1>
                
                <p className="text-muted-foreground mb-4">
                  Complete your profile and make your first gold purchase today
                </p>

                {/* Progress Steps */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <ProgressStep step={1} label="Account Created" completed />
                  <ProgressStep step={2} label="Complete KYC" />
                  <ProgressStep step={3} label="First Purchase" />
                </div>

                {/* Live Price */}
                <div className="mb-6">
                  <PricePill 
                    metal="Gold" 
                    price={goldPrice} 
                    change={goldChange} 
                    changePercent={goldChangePercent} 
                    active
                  />
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={onBuyGold}
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                  >
                    Buy Your First Gold
                  </Button>
                  {onCompleteProfile && (
                    <Button 
                      onClick={onCompleteProfile}
                      size="lg"
                      variant="outline"
                    >
                      Complete Profile
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : activeSlide === 1 ? (
            <motion.div
              key="silver-banner-loggedin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-400/10 via-slate-400/5 to-transparent border border-slate-400/20 p-6 lg:p-8"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-slate-400/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                  Start with Silver, {userName || "investor"}! 🥈
                </h1>
                
                <p className="text-muted-foreground mb-4">
                  999 Pure Silver - Perfect for beginners. Start from just ₹10.
                </p>

                {/* Trust Signals */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {trustSignals.slice(0, 3).map((signal, idx) => (
                    <span key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                      <span>{signal.icon}</span> {signal.text}
                    </span>
                  ))}
                </div>

                {/* Live Price */}
                <div className="mb-6">
                  <PricePill 
                    metal="Silver" 
                    price={silverPrice} 
                    change={silverChange} 
                    changePercent={silverChangePercent} 
                    active
                  />
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={onBuySilver}
                    size="lg"
                    className="bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 text-black font-semibold"
                  >
                    Buy Your First Silver
                  </Button>
                  <Button 
                    onClick={onBuyGold}
                    size="lg"
                    variant="outline"
                    className="border-amber-600/50"
                  >
                    🪙 Try Gold Instead
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gift-banner-loggedin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-purple-500/10 border border-rose-400/20 p-6 lg:p-8"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-5 h-5 text-rose-400" />
                  <span className="text-sm font-medium text-rose-400">Perfect Gift</span>
                </div>
                
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                  Gift <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Digital Gold</span> to Your Loved Ones
                </h1>
                
                <p className="text-muted-foreground mb-4 max-w-lg">
                  Share the timeless gift of 24K pure gold. Perfect for birthdays, anniversaries, festivals, or just because. ✨
                </p>

                {/* Gift Benefits */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Heart className="w-4 h-4 text-rose-400" /> Instant Delivery
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>🎁</span> Beautiful Gift Card
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>💰</span> From just ₹51
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>🔒</span> 100% Secure
                  </span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={onGiftGold}
                    size="lg"
                    className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold shadow-lg shadow-rose-500/25"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Send Gold as Gift
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    onClick={onBuyGold}
                    size="lg"
                    variant="outline"
                    className="border-amber-600/50 hover:bg-amber-500/10"
                  >
                    🪙 Buy for Yourself
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setActiveSlide(0)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === 0 ? "w-6 bg-amber-500" : "bg-muted-foreground/30"
            }`}
          />
          <button
            onClick={() => setActiveSlide(1)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === 1 ? "w-6 bg-slate-400" : "bg-muted-foreground/30"
            }`}
          />
          <button
            onClick={() => setActiveSlide(2)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === 2 ? "w-6 bg-rose-400" : "bg-muted-foreground/30"
            }`}
          />
        </div>
      </div>
    );
  }

  // Existing Investor - No carousel, show portfolio summary
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 border border-slate-700/50 p-6 lg:p-8"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-amber-500" />
          <span className="text-sm text-slate-400">Your Portfolio</span>
        </div>
        
        <div className="flex flex-wrap items-end gap-4 mb-6">
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-white">
              ₹{totalValue.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
            </p>
            <p className={`text-sm font-medium ${totalGain >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {totalGain >= 0 ? "+" : ""}₹{Math.abs(totalGain).toLocaleString("en-IN")} 
              ({totalGain >= 0 ? "+" : ""}{gainPercent.toFixed(1)}%)
            </p>
          </div>
        </div>

        {/* Holdings Summary with Inline Actions - Side by Side Layout */}
        <div className="grid grid-cols-2 gap-3">
          {/* Gold Card */}
          <Card className="p-4 bg-amber-500/10 border-amber-500/30">
            <div className="flex items-start justify-between gap-2">
              {/* Left: Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🪙</span>
                  <span className="text-amber-400 text-sm font-medium">Gold</span>
                </div>
                <p className="text-xl font-bold text-white">{goldHoldings.toFixed(2)}g</p>
                <p className="text-xs text-slate-400">₹{(goldHoldings * goldPrice).toLocaleString("en-IN")}</p>
              </div>
              
              {/* Right: Actions */}
              <div className="flex flex-col gap-1.5">
                {useIconButtons ? (
                  <>
                    <Button 
                      onClick={onBuyGold}
                      size="icon"
                      className="h-8 w-8 bg-amber-500 hover:bg-amber-600 text-black"
                      title="Buy Gold"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    {goldHoldings > 0 ? (
                      <Button 
                        onClick={onSellGold}
                        size="icon"
                        className="h-8 w-8 bg-amber-700 hover:bg-amber-800 text-white"
                        title="Sell Gold"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={onBuyGold}
                        size="icon"
                        className="h-8 w-8 bg-amber-700/60 hover:bg-amber-700 text-amber-200"
                        title="Start Investing"
                      >
                        <Sparkles className="w-4 h-4" />
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={onBuyGold}
                      size="sm"
                      className="h-7 px-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs"
                    >
                      Buy
                    </Button>
                    {goldHoldings > 0 ? (
                      <Button 
                        onClick={onSellGold}
                        size="sm"
                        className="h-7 px-3 bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs"
                      >
                        Sell
                      </Button>
                    ) : (
                      <Button 
                        onClick={onBuyGold}
                        size="sm"
                        className="h-7 px-2 bg-amber-700/60 hover:bg-amber-700 text-amber-200 font-medium text-[10px]"
                      >
                        Invest
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </Card>
          
          {/* Silver Card */}
          <Card className="p-4 bg-slate-400/10 border-slate-500/30">
            <div className="flex items-start justify-between gap-2">
              {/* Left: Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🥈</span>
                  <span className="text-slate-300 text-sm font-medium">Silver</span>
                </div>
                <p className="text-xl font-bold text-white">{silverHoldings.toFixed(0)}g</p>
                <p className="text-xs text-slate-400">₹{(silverHoldings * silverPrice).toLocaleString("en-IN")}</p>
              </div>
              
              {/* Right: Actions */}
              <div className="flex flex-col gap-1.5">
                {useIconButtons ? (
                  <>
                    <Button 
                      onClick={onBuySilver}
                      size="icon"
                      className="h-8 w-8 bg-slate-400 hover:bg-slate-500 text-black"
                      title="Buy Silver"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    {silverHoldings > 0 ? (
                      <Button 
                        onClick={onSellSilver}
                        size="icon"
                        className="h-8 w-8 bg-slate-600 hover:bg-slate-700 text-white"
                        title="Sell Silver"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={onBuySilver}
                        size="icon"
                        className="h-8 w-8 bg-slate-600/60 hover:bg-slate-600 text-slate-200"
                        title="Start Investing"
                      >
                        <Sparkles className="w-4 h-4" />
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={onBuySilver}
                      size="sm"
                      className="h-7 px-3 bg-slate-400 hover:bg-slate-500 text-black font-semibold text-xs"
                    >
                      Buy
                    </Button>
                    {silverHoldings > 0 ? (
                      <Button 
                        onClick={onSellSilver}
                        size="sm"
                        className="h-7 px-3 bg-slate-600 hover:bg-slate-700 text-white font-medium text-xs"
                      >
                        Sell
                      </Button>
                    ) : (
                      <Button 
                        onClick={onBuySilver}
                        size="sm"
                        className="h-7 px-2 bg-slate-600/60 hover:bg-slate-600 text-slate-200 font-medium text-[10px]"
                      >
                        Invest
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

// Helper Components
function PricePill({ 
  metal, 
  price, 
  change, 
  changePercent,
  active = false
}: { 
  metal: string; 
  price: number; 
  change: number; 
  changePercent: number;
  active?: boolean;
}) {
  const isPositive = change >= 0;
  
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
      active 
        ? "bg-background/80 border-primary/30" 
        : "bg-background/50 border-border/50"
    }`}>
      <span className="font-medium">{metal}</span>
      <span className="font-bold">₹{price.toLocaleString("en-IN")}/g</span>
      <span className={`flex items-center text-sm ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
        {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
        {isPositive ? "+" : ""}{changePercent.toFixed(1)}%
      </span>
    </div>
  );
}

function ProgressStep({ 
  step, 
  label, 
  completed = false 
}: { 
  step: number; 
  label: string; 
  completed?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
        completed 
          ? "bg-emerald-500 text-white" 
          : "bg-muted text-muted-foreground"
      }`}>
        {completed ? <Check className="w-4 h-4" /> : step}
      </div>
      <span className={`text-sm ${completed ? "text-emerald-400" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );
}
