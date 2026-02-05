 import { useState } from "react";
 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { motion, AnimatePresence } from "framer-motion";
 import { Gift, Sparkles, Star, Coins, ArrowRight, PartyPopper } from "lucide-react";
 import { useNavigate } from "react-router-dom";
 import { toast } from "sonner";
 import confetti from "canvas-confetti";
 
 type JackpotState = "eligible" | "scratching" | "revealed";
 
 export function FirstTimerJackpot() {
   const navigate = useNavigate();
   const [state, setState] = useState<JackpotState>("eligible");
   const [reward, setReward] = useState<number>(0);
   const [scratchProgress, setScratchProgress] = useState(0);
 
   // Mock: Check if user has invested (would be from actual user data)
   const hasInvested = false;
 
   const handleStartInvesting = () => {
     toast.success("Let's unlock your jackpot! 🎰", {
       description: "Invest ₹500+ to reveal your reward"
     });
     navigate("/bullion?metal=gold&amount=500");
   };
 
   const handleScratch = () => {
     setState("scratching");
     
     // Simulate scratching animation
     let progress = 0;
     const interval = setInterval(() => {
       progress += 10;
       setScratchProgress(progress);
       
       if (progress >= 100) {
         clearInterval(interval);
         // Random reward between 5 and 100
         const randomReward = Math.floor(Math.random() * 96) + 5;
         setReward(randomReward);
         setState("revealed");
         
         // Celebration!
         confetti({
           particleCount: 150,
           spread: 100,
           origin: { y: 0.5 },
           colors: ['#10B981', '#34D399', '#6EE7B7', '#F59E0B', '#FCD34D']
         });
         
         toast.success(`🎉 You won ₹${randomReward} cashback!`, {
           description: "Credited to your wallet"
         });
       }
     }, 100);
   };
 
   return (
     <div className="space-y-6">
       {/* Main Jackpot Card */}
       <motion.div
         animate={{ scale: [1, 1.02, 1] }}
         transition={{ duration: 2, repeat: Infinity }}
       >
         <Card className="overflow-hidden bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] border-cyan-300">
           <div className="p-6">
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                 <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                   <Gift className="w-8 h-8 text-cyan-600" />
                 </div>
                 <div>
                   <h2 className="font-bold text-2xl text-gray-800">First-Timer's Jackpot</h2>
                   <p className="text-cyan-700">Welcome bonus for new investors</p>
                 </div>
               </div>
               <Badge className="bg-cyan-600 text-white animate-pulse">
                 <Sparkles className="w-3 h-3 mr-1" />
                 Limited Time
               </Badge>
             </div>
 
             <div className="bg-white/60 rounded-2xl p-6 mb-6">
               <p className="text-lg text-gray-700 mb-2">
                 Invest <span className="font-bold text-cyan-700">₹500 or more</span> for the first time
               </p>
               <p className="text-2xl font-bold text-gray-800">
                 Unlock a guaranteed cashback jackpot up to <span className="text-green-600">₹100!</span>
               </p>
             </div>
 
             <AnimatePresence mode="wait">
               {state === "eligible" && !hasInvested && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                 >
                   <Button 
                     className="w-full h-14 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-lg"
                     onClick={handleStartInvesting}
                   >
                     <Coins className="w-6 h-6 mr-2" />
                     Start Investing to Unlock
                     <ArrowRight className="w-5 h-5 ml-2" />
                   </Button>
                 </motion.div>
               )}
 
               {state === "eligible" && hasInvested && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                 >
                   <Button 
                     className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg"
                     onClick={handleScratch}
                   >
                     <Sparkles className="w-6 h-6 mr-2" />
                     Scratch to Reveal Your Reward!
                   </Button>
                 </motion.div>
               )}
 
               {state === "scratching" && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="space-y-4"
                 >
                   <div className="relative h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl overflow-hidden">
                     <motion.div
                       className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400"
                       initial={{ width: "0%" }}
                       animate={{ width: `${scratchProgress}%` }}
                     />
                     <div className="absolute inset-0 flex items-center justify-center">
                       <p className="text-2xl font-bold text-white drop-shadow-lg">
                         Scratching... {scratchProgress}%
                       </p>
                     </div>
                   </div>
                 </motion.div>
               )}
 
               {state === "revealed" && (
                 <motion.div
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="text-center"
                 >
                   <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-8 text-white">
                     <PartyPopper className="w-12 h-12 mx-auto mb-4" />
                     <p className="text-xl mb-2">Congratulations! You won</p>
                     <p className="text-5xl font-bold mb-2">₹{reward}</p>
                     <p className="text-green-100">Cashback credited to your wallet</p>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
         </Card>
       </motion.div>
 
       {/* How It Works */}
       <Card className="p-6">
         <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
           <Star className="w-5 h-5 text-amber-500" />
           How It Works
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-500/10">
             <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">1</div>
             <div>
               <p className="font-medium">Make Your First Investment</p>
               <p className="text-sm text-muted-foreground">Invest ₹500 or more in Gold/Silver</p>
             </div>
           </div>
           <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-500/10">
             <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">2</div>
             <div>
               <p className="font-medium">Unlock Your Scratch Card</p>
               <p className="text-sm text-muted-foreground">Get instant access to your reward</p>
             </div>
           </div>
           <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10">
             <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">3</div>
             <div>
               <p className="font-medium">Win Up to ₹100</p>
               <p className="text-sm text-muted-foreground">Guaranteed cashback, no minimum</p>
             </div>
           </div>
         </div>
       </Card>
 
       {/* Demo: Simulate having invested */}
       {!hasInvested && state === "eligible" && (
         <Card className="p-4 border-dashed border-2">
           <p className="text-sm text-muted-foreground mb-3">
             <strong>Demo Mode:</strong> Click below to simulate having made your first investment
           </p>
           <Button variant="outline" onClick={handleScratch}>
             <Sparkles className="w-4 h-4 mr-2" />
             Simulate: Scratch Card Unlocked
           </Button>
         </Card>
       )}
     </div>
   );
 }