 import { useState } from "react";
 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { motion, AnimatePresence } from "framer-motion";
 import { CheckCircle2, TrendingUp, Lock } from "lucide-react";
 import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
 import { Label } from "@/components/ui/label";
 
 interface PriceRange {
   id: string;
   label: string;
   range: string;
   percentage: number;
 }
 
 const priceRanges: PriceRange[] = [
   { id: "below", label: "Below ₹7,200", range: "< ₹7,200/g", percentage: 12 },
   { id: "mid-low", label: "₹7,200 - ₹7,400", range: "₹7,200-7,400", percentage: 45 },
   { id: "mid-high", label: "₹7,400 - ₹7,600", range: "₹7,400-7,600", percentage: 31 },
   { id: "above", label: "Above ₹7,600", range: "> ₹7,600/g", percentage: 12 },
 ];
 
 export function GoldPricePrediction() {
   const [selectedRange, setSelectedRange] = useState<string | null>(null);
   const [hasSubmitted, setHasSubmitted] = useState(false);
   const [showResults, setShowResults] = useState(false);
 
   const handleSelect = (rangeId: string) => {
     if (!hasSubmitted) {
       setSelectedRange(rangeId);
       setShowResults(true);
     }
   };
 
   const handleSubmit = () => {
     if (selectedRange) {
       setHasSubmitted(true);
     }
   };
 
   return (
     <Card className="p-5 bg-gradient-to-br from-amber-50 to-yellow-100/50 dark:from-amber-950/30 dark:to-yellow-900/20 border-amber-200/50 dark:border-amber-800/30 overflow-hidden">
       <div className="flex items-center gap-2 mb-4">
         <span className="text-2xl">🔮</span>
         <h3 className="font-bold text-lg text-foreground">Weekly Gold Guess</h3>
       </div>
 
       <p className="font-semibold text-foreground mb-4">
         Where will the Gold price be by next Friday?
       </p>
 
       <AnimatePresence mode="wait">
         {!hasSubmitted ? (
           <motion.div
             key="voting"
             initial={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="space-y-4"
           >
             <RadioGroup value={selectedRange || ""} onValueChange={handleSelect}>
               <div className="grid grid-cols-2 gap-2">
                 {priceRanges.map((range) => (
                   <div
                     key={range.id}
                     className={`relative flex items-center space-x-2 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                       selectedRange === range.id
                         ? "border-amber-500 bg-amber-100/50 dark:bg-amber-900/30"
                         : "border-border/50 hover:border-amber-300 bg-background/50"
                     }`}
                     onClick={() => handleSelect(range.id)}
                   >
                     <RadioGroupItem value={range.id} id={range.id} className="sr-only" />
                     <Label
                       htmlFor={range.id}
                       className="text-sm font-medium cursor-pointer w-full text-center"
                     >
                       {range.label}
                     </Label>
                   </div>
                 ))}
               </div>
             </RadioGroup>
 
             {showResults && selectedRange && (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="p-3 rounded-lg bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200/50"
               >
                 <div className="flex items-center gap-2 mb-2">
                   <TrendingUp className="w-4 h-4 text-amber-600" />
                   <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                     Community Sentiment
                   </span>
                 </div>
                 <p className="text-sm text-muted-foreground">
                   <span className="font-bold text-amber-600 dark:text-amber-400">
                     {priceRanges.find((r) => r.id === selectedRange)?.percentage}%
                   </span>{" "}
                   of users voted for{" "}
                   <span className="font-medium">
                     {priceRanges.find((r) => r.id === selectedRange)?.label}
                   </span>
                 </p>
               </motion.div>
             )}
 
             <Button
               onClick={handleSubmit}
               disabled={!selectedRange}
               className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold"
             >
               Submit Prediction
             </Button>
           </motion.div>
         ) : (
           <motion.div
             key="success"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-center py-4"
           >
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
               <Lock className="w-8 h-8 text-green-600 dark:text-green-400" />
             </div>
             <h4 className="font-bold text-lg text-foreground mb-2">
               Prediction Locked! 🎯
             </h4>
             <p className="text-sm text-muted-foreground mb-3">
               You predicted:{" "}
               <span className="font-semibold text-amber-600 dark:text-amber-400">
                 {priceRanges.find((r) => r.id === selectedRange)?.label}
               </span>
             </p>
             <div className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400">
               <CheckCircle2 className="w-4 h-4" />
               <span>Check back Friday for results!</span>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
 
       <p className="text-xs text-muted-foreground mt-3 text-center">
         {hasSubmitted ? "2,847 predictions submitted" : "Join 2,847 predictors"}
       </p>
     </Card>
   );
 }