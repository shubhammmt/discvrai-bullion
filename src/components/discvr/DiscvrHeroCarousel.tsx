 import { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import { motion, AnimatePresence } from "framer-motion";
 import { Sparkles, ArrowRight, Clock, Percent, Shield } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 export function DiscvrHeroCarousel() {
   const navigate = useNavigate();
   const [activeSlide, setActiveSlide] = useState(0);
 
   // Auto-rotate carousel
   useEffect(() => {
     const interval = setInterval(() => {
       setActiveSlide((prev) => (prev + 1) % 3);
     }, 5000);
     return () => clearInterval(interval);
   }, []);
 
   const trustSignals = [
     { text: "100% Insured", icon: "🛡️" },
     { text: "Free Vault Storage", icon: "🏦" },
     { text: "Sell Anytime", icon: "💸" },
     { text: "Powered by Augmont", icon: "⚡" },
   ];
 
   const lamfFeatures = [
     { icon: Clock, label: "MONEY CREDITED", sublabel: "IN 2 HOURS" },
     { icon: Percent, label: "LOW INTEREST", sublabel: "RATE" },
     { icon: Shield, label: "NO CIBIL", sublabel: "IMPACT" },
   ];
 
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
               
               <div className="flex flex-wrap gap-3 mb-6">
                 {trustSignals.map((signal, idx) => (
                   <span key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                     <span>{signal.icon}</span> {signal.text}
                   </span>
                 ))}
               </div>
 
               <Button 
                 onClick={() => navigate("/bullion?metal=gold")}
                 size="lg"
                 className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold shadow-lg shadow-amber-500/25"
               >
                 🪙 Buy Gold
                 <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
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
               
               <div className="flex flex-wrap gap-3 mb-6">
                 {trustSignals.map((signal, idx) => (
                   <span key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                     <span>{signal.icon}</span> {signal.text}
                   </span>
                 ))}
               </div>
 
               <Button 
                 onClick={() => navigate("/bullion?metal=silver")}
                 size="lg"
                 className="bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600 text-black font-semibold shadow-lg shadow-slate-500/25"
               >
                 🥈 Buy Silver
                 <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
             </div>
           </motion.div>
         ) : (
           <motion.div
             key="lamf-banner"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.5 }}
             className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent border border-cyan-500/20 p-6 lg:p-8"
           >
             <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
             
             <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
               {/* Left: Content */}
               <div>
                 <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                   Loan Against Mutual Funds
                 </h1>
                 
                 <p className="text-muted-foreground mb-4">
                   Access funds quickly while staying invested. Lower rates (10.20-15% p.a.), same-day disbursal, and no foreclosure charges.
                 </p>
                 
                 <ul className="space-y-2 mb-6">
                   {["Lower rates (10.20-15% p.a.)", "Same-day disbursal", "No foreclosure charges", "Ownership retained"].map((benefit, i) => (
                     <li key={i} className="flex items-center gap-2 text-sm">
                       <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                         <span className="text-cyan-400 text-xs">✓</span>
                       </div>
                       {benefit}
                     </li>
                   ))}
                 </ul>
 
                 <Button 
                   onClick={() => navigate("/bullion/loans")}
                   size="lg"
                   className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-cyan-500/25"
                 >
                   Explore LAMF
                   <ArrowRight className="w-4 h-4 ml-2" />
                 </Button>
               </div>
               
               {/* Right: Feature Card */}
               <div className="hidden md:block">
                 <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                   <div className="text-center mb-4">
                     <p className="text-cyan-400 font-semibold text-lg">Discvr.AI | LOAN</p>
                     <p className="text-white font-bold text-xl">AGAINST MUTUAL FUNDS</p>
                   </div>
                   <div className="grid grid-cols-3 gap-3">
                     {lamfFeatures.map(({ icon: Icon, label, sublabel }, i) => (
                       <div 
                         key={i}
                         className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-center"
                       >
                         <Icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                         <p className="text-xs font-semibold text-white">{label}</p>
                         <p className="text-[10px] text-slate-400">{sublabel}</p>
                       </div>
                     ))}
                   </div>
                 </div>
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
             activeSlide === 2 ? "w-6 bg-cyan-500" : "bg-muted-foreground/30"
           }`}
         />
       </div>
     </div>
   );
 }