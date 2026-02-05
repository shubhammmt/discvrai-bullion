 import { useState } from "react";
 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { motion } from "framer-motion";
 import { Trophy, Check, Flame, Gift } from "lucide-react";
 import { useNavigate } from "react-router-dom";
 import { toast } from "sonner";
 import confetti from "canvas-confetti";
 
 interface DayProgress {
   day: number;
   completed: boolean;
   current: boolean;
 }
 
 const initialDays: DayProgress[] = [
   { day: 1, completed: true, current: false },
   { day: 2, completed: true, current: false },
   { day: 3, completed: false, current: true },
   { day: 4, completed: false, current: false },
   { day: 5, completed: false, current: false },
   { day: 6, completed: false, current: false },
   { day: 7, completed: false, current: false },
 ];
 
 export function SavingsStreakContest() {
   const navigate = useNavigate();
   const [days] = useState<DayProgress[]>(initialDays);
   const completedDays = days.filter(d => d.completed).length;
 
   const handleContinueStreak = () => {
     // Trigger confetti
     confetti({
       particleCount: 100,
       spread: 70,
       origin: { y: 0.6 },
       colors: ['#F59E0B', '#FCD34D', '#FBBF24']
     });
     
     toast.success("Let's continue your streak! 🔥", {
       description: "Invest ₹10 to complete Day 3"
     });
     
     // Navigate to bullion page
     setTimeout(() => {
       navigate("/bullion");
     }, 1000);
   };
 
   return (
     <Card className="overflow-hidden">
        {/* Softer Gradient Header */}
        <div className="bg-gradient-to-r from-amber-300/80 via-amber-400/75 to-yellow-400/80 p-5">
          <div className="flex items-center justify-between mb-2">
           <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-800" />
              <h3 className="font-bold text-xl text-amber-900">The 7-Day Gold Sprint</h3>
           </div>
            <Badge className="bg-amber-800/15 text-amber-800 border-0 hover:bg-amber-800/25">
              <Flame className="w-3 h-3 mr-1" />
             {completedDays} day streak
           </Badge>
         </div>
          <p className="text-amber-800/90 text-sm">
           Invest just ₹10 for 7 days in a row and win a digital silver bonus!
         </p>
       </div>
 
       {/* Progress Tracker */}
       <div className="p-5 bg-card">
         <div className="flex items-center justify-between mb-4">
           {days.map((day, index) => (
             <motion.div
               key={day.day}
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: index * 0.1 }}
               className="flex flex-col items-center gap-1"
             >
               <div
                 className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                   day.completed
                     ? "bg-green-500 border-green-500 text-white"
                     : day.current
                     ? "bg-amber-500/20 border-amber-500 text-amber-500 animate-pulse"
                     : "bg-muted border-border text-muted-foreground"
                 }`}
               >
                 {day.completed ? (
                   <Check className="w-5 h-5" />
                 ) : (
                   <span className="text-sm font-bold">{day.day}</span>
                 )}
               </div>
               <span className={`text-xs ${day.current ? "text-amber-500 font-semibold" : "text-muted-foreground"}`}>
                 Day {day.day}
               </span>
             </motion.div>
           ))}
         </div>
 
         {/* Reward Preview */}
         <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-4">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
             <Gift className="w-5 h-5 text-white" />
           </div>
           <div className="flex-1">
             <p className="font-semibold text-sm">Complete all 7 days to win</p>
             <p className="text-xs text-muted-foreground">5g Digital Silver Bonus (worth ₹384)</p>
           </div>
         </div>
 
         {/* CTA */}
         <Button 
            className="w-full h-12 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-bold text-base"
           onClick={handleContinueStreak}
         >
           <Flame className="w-5 h-5 mr-2" />
           Continue My Streak
         </Button>
 
         <p className="text-xs text-muted-foreground text-center mt-3">
           {7 - completedDays} days remaining • 892 participants
         </p>
       </div>
     </Card>
   );
 }