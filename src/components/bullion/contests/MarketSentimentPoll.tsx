 import { useState } from "react";
 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { motion, AnimatePresence } from "framer-motion";
 import { CheckCircle2, TrendingUp } from "lucide-react";
 import { useNavigate } from "react-router-dom";
 
 interface PollOption {
   id: string;
   label: string;
   emoji: string;
   percentage: number;
 }
 
 const pollOptions: PollOption[] = [
   { id: "gold", label: "Buy more Gold", emoji: "📈", percentage: 65 },
   { id: "hold", label: "Hold & Wait", emoji: "⏳", percentage: 22 },
   { id: "silver", label: "Switch to Silver", emoji: "🥈", percentage: 13 },
 ];
 
 export function MarketSentimentPoll() {
   const navigate = useNavigate();
   const [selectedOption, setSelectedOption] = useState<string | null>(null);
   const [hasVoted, setHasVoted] = useState(false);
 
   const handleVote = (optionId: string) => {
     setSelectedOption(optionId);
     setHasVoted(true);
   };
 
   return (
     <Card className="p-5 bg-[#E0F7FA]/30 dark:bg-cyan-950/20 border-cyan-200/50 dark:border-cyan-800/30">
       <div className="flex items-center gap-2 mb-4">
         <TrendingUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
         <h3 className="font-bold text-lg text-foreground">Market Sentiment Poll</h3>
       </div>
       
       <p className="font-semibold text-foreground mb-4">
         What is your investment strategy for this week?
       </p>
 
       <AnimatePresence mode="wait">
         {!hasVoted ? (
           <motion.div
             key="options"
             initial={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="space-y-2"
           >
             {pollOptions.map((option) => (
               <Button
                 key={option.id}
                 variant="outline"
                 className="w-full justify-start gap-3 h-12 bg-background/80 hover:bg-primary/10 hover:border-primary transition-all"
                 onClick={() => handleVote(option.id)}
               >
                 <span className="text-lg">{option.emoji}</span>
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
             {pollOptions.map((option) => (
               <div key={option.id} className="space-y-1">
                 <div className="flex items-center justify-between text-sm">
                   <span className="flex items-center gap-2">
                     <span>{option.emoji}</span>
                     <span className="font-medium">{option.label}</span>
                     {selectedOption === option.id && (
                       <CheckCircle2 className="w-4 h-4 text-green-500" />
                     )}
                   </span>
                   <span className="font-bold">{option.percentage}%</span>
                 </div>
                 <div className="h-2 bg-muted rounded-full overflow-hidden">
                   <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: `${option.percentage}%` }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     className={`h-full rounded-full ${
                       option.id === "gold" 
                         ? "bg-amber-500" 
                         : option.id === "silver" 
                         ? "bg-slate-400" 
                         : "bg-blue-500"
                     }`}
                   />
                 </div>
               </div>
             ))}
 
             <div className="pt-3 border-t border-border/50 mt-4">
               <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-3 flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4" />
                 Thank you for voting!
               </p>
               <Button 
                 className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                 onClick={() => navigate("/bullion")}
               >
                 Start Buying
               </Button>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
 
       <p className="text-xs text-muted-foreground mt-3">
         {hasVoted ? "1,247 users have voted" : "Join 1,247 users in this poll"}
       </p>
     </Card>
   );
 }