import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, Sparkles, TrendingUp, Shield, Gift, Clock, 
  Zap, Target, PiggyBank, Wallet, Star, ArrowRight,
  ShieldCheck, Building, Coins, RefreshCw, Bell
} from "lucide-react";
import { motion } from "framer-motion";
import digitalGoldCoin from "@/assets/digital-gold-coin.png";
import digitalSilverCoin from "@/assets/digital-silver-coin.png";

// Smart Investment Card - Gold Focus
export const SmartGoldCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="ad-card"
  >
    <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 min-h-[320px]">
      <Badge className="absolute top-3 right-3 bg-amber-500 text-white font-bold px-3 py-1">
        <Rocket className="w-3.5 h-3.5 mr-1" />
        LAUNCHING SOON
      </Badge>
      
      <div className="flex items-center gap-3 mb-4 mt-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
          <span className="text-3xl">🪙</span>
        </div>
        <div>
          <h3 className="font-bold text-xl text-amber-700">Smart Gold Investment</h3>
          <p className="text-sm text-amber-600">24K Pure Digital Gold</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent font-bold text-3xl mb-3">
        Invest from ₹10
      </div>

      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-sm text-amber-800">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>100% Insured Storage</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-amber-800">
          <Building className="w-4 h-4 text-amber-600" />
          <span>Free Vault Storage</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-amber-800">
          <Zap className="w-4 h-4 text-amber-600" />
          <span>Instant Buy & Sell</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-amber-100 border border-amber-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-medium text-amber-700">Powered by Augmont</span>
        </div>
        <span className="text-xs font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">DiscvrAI</span>
      </div>
    </Card>
  </motion.div>
);

// Smart Investment Card - Silver Focus
export const SmartSilverCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="ad-card"
  >
    <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-slate-50 to-zinc-100 border-2 border-slate-300 min-h-[320px]">
      <Badge className="absolute top-3 right-3 bg-slate-600 text-white font-bold px-3 py-1">
        <Rocket className="w-3.5 h-3.5 mr-1" />
        LAUNCHING SOON
      </Badge>
      
      <div className="flex items-center gap-3 mb-4 mt-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-400 to-zinc-500 flex items-center justify-center">
          <span className="text-3xl">🥈</span>
        </div>
        <div>
          <h3 className="font-bold text-xl text-slate-700">Smart Silver Investment</h3>
          <p className="text-sm text-slate-500">999 Pure Digital Silver</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-500 via-gray-400 to-zinc-500 bg-clip-text text-transparent font-bold text-3xl mb-3">
        Invest from ₹10
      </div>

      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <ShieldCheck className="w-4 h-4 text-slate-500" />
          <span>100% Insured Storage</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Building className="w-4 h-4 text-slate-500" />
          <span>Free Vault Storage</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Zap className="w-4 h-4 text-slate-500" />
          <span>Instant Buy & Sell</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-100 border border-slate-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-slate-500" />
          <span className="text-sm font-medium text-slate-600">Powered by Augmont</span>
        </div>
        <span className="text-xs font-bold bg-gradient-to-r from-slate-600 to-zinc-500 bg-clip-text text-transparent">DiscvrAI</span>
      </div>
    </Card>
  </motion.div>
);

// Launch Offer Card - Welcome Bonus
export const WelcomeBonusCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="ad-card"
  >
    <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-300 min-h-[280px]">
      <Badge className="absolute top-3 right-3 bg-emerald-500 text-white font-bold px-3 py-1">
        <Gift className="w-3.5 h-3.5 mr-1" />
        LAUNCH OFFER
      </Badge>
      
      <div className="flex items-center gap-3 mb-4 mt-6">
        <div className="w-12 h-12 rounded-xl bg-emerald-200 flex items-center justify-center">
          <Gift className="w-6 h-6 text-emerald-600" />
        </div>
        <span className="text-sm font-medium text-emerald-700 uppercase tracking-wide">Welcome Bonus</span>
      </div>

      <div className="text-4xl font-bold text-emerald-700 mb-2">
        ₹50 Free Gold
      </div>
      <p className="text-emerald-600 mb-6">On your first purchase</p>

      <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold mb-3">
        Claim Now <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      <p className="text-center text-xs font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">Exclusive on DiscvrAI</p>
    </Card>
  </motion.div>
);

// SIP Bonus Card
export const SIPBonusCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="ad-card"
  >
    <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-sky-50 to-blue-100 border-2 border-sky-300 min-h-[280px]">
      <Badge className="absolute top-3 right-3 bg-sky-500 text-white font-bold px-3 py-1">
        <Star className="w-3.5 h-3.5 mr-1" />
        SIP BONUS
      </Badge>
      
      <div className="flex items-center gap-3 mb-4 mt-6">
        <div className="w-12 h-12 rounded-xl bg-sky-200 flex items-center justify-center">
          <RefreshCw className="w-6 h-6 text-sky-600" />
        </div>
        <span className="text-sm font-medium text-sky-700 uppercase tracking-wide">Start SIP</span>
      </div>

      <div className="text-4xl font-bold text-sky-700 mb-2">
        ₹25 Extra Gold
      </div>
      <p className="text-sky-600 mb-6">On your first SIP</p>

      <Button className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold mb-3">
        Start SIP <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      <p className="text-center text-xs font-bold bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent">Exclusive on DiscvrAI</p>
    </Card>
  </motion.div>
);

// Don't Miss Offer Card
export const DontMissCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="ad-card"
  >
    <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 text-white min-h-[320px]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <Badge className="bg-white/20 text-white font-bold px-3 py-1 mb-4">
          <Clock className="w-3.5 h-3.5 mr-1" />
          LIMITED TIME
        </Badge>

        <h3 className="text-3xl font-bold mb-2">Don't Miss!</h3>
        <p className="text-lg font-medium text-white/90 mb-4">Launch Offers Ending Soon</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/15">
            <span className="text-2xl">🪙</span>
            <div>
              <p className="font-semibold">₹50 Free Gold</p>
              <p className="text-sm text-white/70">First purchase bonus</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/15">
            <span className="text-2xl">🥈</span>
            <div>
              <p className="font-semibold">₹25 Free Silver</p>
              <p className="text-sm text-white/70">First purchase bonus</p>
            </div>
          </div>
        </div>

        <Button className="w-full bg-white text-purple-600 font-bold hover:bg-white/90 mb-3">
          Grab Now <Sparkles className="w-4 h-4 ml-2" />
        </Button>
        <p className="text-center text-xs font-semibold text-white/80">Only on <span className="font-bold text-white">DiscvrAI</span></p>
      </div>
    </Card>
  </motion.div>
);

// Why Digital Card
export const WhyDigitalCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="ad-card"
  >
    <Card className="relative overflow-hidden p-6 bg-white border-2 border-slate-200 min-h-[400px]">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Why Go Digital?</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
            <Shield className="w-5 h-5 text-amber-600" />
          </div>
          <h4 className="font-semibold text-slate-800 mb-1">24K Pure Gold</h4>
          <p className="text-xs text-slate-500">Guaranteed 99.9% pure</p>
        </div>
        
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-3">
            <Shield className="w-5 h-5 text-slate-500" />
          </div>
          <h4 className="font-semibold text-slate-800 mb-1">999 Pure Silver</h4>
          <p className="text-xs text-slate-500">Guaranteed 99.9% pure</p>
        </div>
        
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
            <Building className="w-5 h-5 text-emerald-600" />
          </div>
          <h4 className="font-semibold text-slate-800 mb-1">0% Storage Fee</h4>
          <p className="text-xs text-slate-500">Free insured vaults</p>
        </div>
        
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
            <Coins className="w-5 h-5 text-blue-600" />
          </div>
          <h4 className="font-semibold text-slate-800 mb-1">Buy from ₹10</h4>
          <p className="text-xs text-slate-500">No minimum grams</p>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-100 to-slate-100 border border-amber-200">
        <p className="text-center text-sm font-medium text-slate-700">
          <Sparkles className="w-4 h-4 inline mr-1 text-amber-500" />
          Smart Investment with <span className="font-bold bg-gradient-to-r from-amber-600 to-slate-600 bg-clip-text text-transparent">DiscvrAI</span>
        </p>
      </div>
    </Card>
  </motion.div>
);

// SIP Education Card
export const SIPEducationCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="ad-card"
  >
    <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-teal-50 to-cyan-100 border-2 border-teal-300 min-h-[320px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-teal-200 flex items-center justify-center">
          <RefreshCw className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h3 className="font-bold text-xl text-teal-700">SIP = Lazy Investing</h3>
          <p className="text-sm text-teal-600">Set it and forget it!</p>
        </div>
      </div>

      <p className="text-teal-700 mb-4">
        Auto-invest every month and benefit from rupee cost averaging. No timing to go to market, no stress.
      </p>

      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-500" />
          <span className="text-sm font-medium text-teal-700">₹100/mo min</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-teal-500" />
          <span className="text-sm font-medium text-teal-700">Avg. 8-10% annual</span>
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold mb-3">
        Start Gold SIP <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      <p className="text-center text-xs font-bold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">Powered by DiscvrAI</p>
    </Card>
  </motion.div>
);

// Hero Banner Card - Matching Launch Announcement style
export const HeroBannerCard = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="ad-card"
  >
    <Card className="relative overflow-hidden p-6 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-slate-400/10 border-2 border-primary/20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.1),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(148,163,184,0.1),transparent_50%)]" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Rocket className="w-5 h-5 text-primary animate-bounce" />
          <Badge className="bg-primary text-primary-foreground font-bold px-4 py-1.5 text-sm">
            🚀 LAUNCHING SOON
          </Badge>
          <Rocket className="w-5 h-5 text-primary animate-bounce" />
        </div>

        {/* Main Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-amber-500 via-primary to-slate-400 bg-clip-text text-transparent">
          Start Your Investment Journey
        </h2>
        <p className="text-center text-muted-foreground mb-6 max-w-xl mx-auto">
          Invest in Digital Gold & Silver from just ₹10. 100% Insured, Free Vault Storage, Sell Anytime!
        </p>

        {/* Products Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-400/30">
            <img src={digitalGoldCoin} alt="Digital Gold" className="w-16 h-16 object-contain rounded-lg" />
            <div>
              <p className="font-bold text-amber-600 text-lg">Digital Gold</p>
              <p className="text-sm text-muted-foreground">24K Pure • 99.9% Certified</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-400/10 border border-slate-400/30">
            <img src={digitalSilverCoin} alt="Digital Silver" className="w-16 h-16 object-contain rounded-lg" />
            <div>
              <p className="font-bold text-slate-500 text-lg">Digital Silver</p>
              <p className="text-sm text-muted-foreground">999 Pure • 99.9% Certified</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-500" /> 100% Insured
          </span>
          <span className="flex items-center gap-1.5">
            <Building className="w-4 h-4 text-blue-500" /> Free Vault
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" /> Instant Buy/Sell
          </span>
        </div>

        {/* DiscvrAI Branding */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Exclusive on</span>
          <span className="font-bold text-lg bg-gradient-to-r from-amber-500 via-primary to-slate-400 bg-clip-text text-transparent">DiscvrAI</span>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold hover:opacity-90">
            <Bell className="w-4 h-4 mr-2" />
            Get Early Access
          </Button>
          <Button size="lg" variant="outline" className="font-semibold">
            Learn More
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  </motion.div>
);

// Comparison Card (Physical vs Digital)
export const ComparisonCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="ad-card"
  >
    <Card className="relative overflow-hidden p-6 bg-white border-2 border-slate-200 min-h-[420px]">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Physical vs Digital Gold</h3>
      
      <div className="space-y-4">
        {[
          { aspect: "Making Charges", physical: "18-25% extra", digital: "0%", icon: Wallet },
          { aspect: "Storage", physical: "Risk of theft", digital: "Free insured vault", icon: Building },
          { aspect: "Minimum", physical: "₹5,000+", digital: "₹10", icon: Coins },
          { aspect: "Purity", physical: "Trust jeweler", digital: "24K certified", icon: Shield },
          { aspect: "Selling", physical: "Visit jeweler", digital: "Instant, online", icon: Zap },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-3 gap-3 items-center p-3 rounded-lg bg-slate-50">
            <div className="flex items-center gap-2">
              <row.icon className="w-4 h-4 text-slate-500" />
              <span className="font-medium text-slate-700 text-sm">{row.aspect}</span>
            </div>
            <div className="text-center">
              <span className="text-red-500 text-sm">✗ {row.physical}</span>
            </div>
            <div className="text-center">
              <span className="text-emerald-600 text-sm font-medium">✓ {row.digital}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-100 to-emerald-100">
        <p className="text-center text-sm font-semibold text-slate-700">
          <span className="font-bold bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">DiscvrAI</span> = Smart Investment 💡
        </p>
      </div>
    </Card>
  </motion.div>
);
