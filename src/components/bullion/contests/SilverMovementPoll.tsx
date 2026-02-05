 import { useState } from "react";
 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { motion, AnimatePresence } from "framer-motion";
 import { CheckCircle2, Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
 
 interface MovementOption {
   id: string;
   label: string;
   percentage: number;
   icon: React.ReactNode;
   color: string;
 }
 
 const movementOptions: MovementOption[] = [
   { 
     id: "strong-bull", 
     label: "Strong Bullish +5%", 
     percentage: 18,
     icon: <TrendingUp className="w-4 h-4" />,
     color: "bg-green-500"
   },
   { 
     id: "slight-bull", 
     label: "Slight Bullish +2%", 
     percentage: 35,
     icon: <TrendingUp className="w-4 h-4" />,
     color: "bg-emerald-400"
   },
   { 
     id: "neutral", 
     label: "Neutral 0%", 
     percentage: 27,
     icon: <Minus className="w-4 h-4" />,
     color: "bg-slate-400"
   },
   { 
     id: "slight-bear", 
     label: "Slight Bearish -2%", 
     percentage: 20,
     icon: <TrendingDown className="w-4 h-4" />,
     color: "bg-red-400"
   },
 ];
 
 export function SilverMovementPoll() {
   const [selectedOption, setSelectedOption] = useState<string | null>(null);
   const [hasVoted, setHasVoted] = useState(false);
 
   const handleVote = (optionId: string) => {
     if (!hasVoted) {
       setSelectedOption(optionId);
       setHasVoted(true);
     }
   };
 
   const maxPercentage = Math.max(...movementOptions.map(o => o.percentage));
 
   return (
     <Card className="p-5 bg-gradient-to-br from-slate-100/80 to-zinc-200/50 dark:from-slate-800/50 dark:to-zinc-900/30 border border-white/20 dark:border-white/10 backdrop-blur-sm overflow-hidden">
       <div className="flex items-center gap-2 mb-4">
         <span className="text-2xl">📊</span>
         <h3 className="font-bold text-lg text-foreground">Silver Movement Alert</h3>
       </div>
 
       <p className="font-semibold text-foreground mb-4">
         What will be the % shift in Silver price over the next 7 days?
       </p>
 
       <AnimatePresence mode="wait">
         {!hasVoted ? (
           <motion.div
             key="options"
             initial={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="space-y-2"
           >
             {movementOptions.map((option) => (
               <Button
                 key={option.id}
                 variant="outline"
                 className="w-full justify-start gap-3 h-12 bg-background/80 hover:bg-primary/10 hover:border-primary transition-all"
                 onClick={() => handleVote(option.id)}
               >
                 <span className={`p-1 rounded ${option.color} text-white`}>
                   {option.icon}
                 </span>
                 <span className="font-medium">{option.label}</span>
               </Button>
             ))}
           </motion.div>
         ) : (
           <motion.div
             key="results"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-3"
           >
             <div className="flex items-end justify-between gap-2 h-32 px-2">
               {movementOptions.map((option, index) => (
                 <div key={option.id} className="flex-1 flex flex-col items-center gap-1">
                   <motion.div
                     initial={{ height: 0 }}
                     animate={{ height: `${(option.percentage / maxPercentage) * 100}%` }}
                     transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                     className={`w-full rounded-t-md ${option.color} ${
                       selectedOption === option.id ? "ring-2 ring-primary ring-offset-2" : ""
                     }`}
                   />
                 </div>
               ))}
             </div>
 
             <div className="flex justify-between gap-2 px-2">
               {movementOptions.map((option) => (
                 <div key={option.id} className="flex-1 text-center">
                   <p className="text-xs font-bold">{option.percentage}%</p>
                   <p className="text-[10px] text-muted-foreground leading-tight">
                     {option.label.split(" ").slice(-1)[0]}
                   </p>
                   {selectedOption === option.id && (
                     <CheckCircle2 className="w-3 h-3 text-green-500 mx-auto mt-1" />
                   )}
                 </div>
               ))}
             </div>
 
             <div className="pt-3 border-t border-border/50">
               <p className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4" />
                 Vote recorded! Results updated live.
               </p>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
 
       <div className="flex items-center gap-2 mt-4 p-2 rounded-lg bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200/50">
         <Trophy className="w-4 h-4 text-amber-600" />
         <p className="text-xs text-amber-800 dark:text-amber-200">
           Correct predictions earn <span className="font-bold">50 Bullion Points!</span> 🏆
         </p>
       </div>
 
       <p className="text-xs text-muted-foreground mt-3 text-center">
         {hasVoted ? "1,923 votes cast this week" : "Join 1,923 voters"}
       </p>
     </Card>
   );
 }