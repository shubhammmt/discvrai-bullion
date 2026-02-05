 import { useState } from "react";
 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { motion } from "framer-motion";
 import { Trophy, Check, Flame, Gift, Target, Calendar, Coins } from "lucide-react";
 import { useNavigate } from "react-router-dom";
 import { toast } from "sonner";
 import confetti from "canvas-confetti";
 
 interface DayProgress {
   day: number;
   completed: boolean;
   current: boolean;
   amount?: number;
 }
 
 const initialDays: DayProgress[] = [
   { day: 1, completed: true, current: false, amount: 50 },
   { day: 2, completed: true, current: false, amount: 25 },
   { day: 3, completed: false, current: true },
   { day: 4, completed: false, current: false },
   { day: 5, completed: false, current: false },
   { day: 6, completed: false, current: false },
   { day: 7, completed: false, current: false },
 ];
 
 export function BullionSprint() {
   const navigate = useNavigate();
   const [days] = useState<DayProgress[]>(initialDays);
   const completedDays = days.filter(d => d.completed).length;
   const currentDay = days.find(d => d.current)?.day || 1;
 
   const handleSaveForDay = () => {
     confetti({
       particleCount: 80,
       spread: 60,
       origin: { y: 0.7 },
       colors: ['#F59E0B', '#FCD34D', '#FBBF24']
     });
     
     toast.success(`Let's complete Day ${currentDay}! 🔥`, {
       description: "Invest ₹10+ to maintain your streak"
     });
     
     setTimeout(() => navigate("/bullion?metal=gold"), 800);
   };
 
   return (
     <div className="space-y-6">
       {/* Main Sprint Card */}
       <Card className="overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
         {/* Premium Header */}
         <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-6 text-black">
           <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center">
                 <Trophy className="w-7 h-7" />
               </div>
               <div>
                 <h2 className="font-bold text-2xl">The 7-Day Bullion Sprint</h2>
                 <p className="text-black/70">Daily savings challenge</p>
               </div>
             </div>
             <Badge className="bg-black/20 text-black border-0 text-base px-3 py-1">
               <Flame className="w-4 h-4 mr-1" />
               {completedDays}/7 Days
             </Badge>
           </div>
           <p className="text-black/80 text-lg">
             Maintain a 7-day streak of ₹10+ daily savings to enter the <span className="font-bold">0.5gm Gold Lucky Draw!</span>
           </p>
         </div>
 
         {/* Streak Tracker */}
         <div className="p-6">
           <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
             <Calendar className="w-5 h-5 text-amber-500" />
             Your Streak Progress
           </h3>
           
           <div className="flex items-center justify-between mb-6">
             {days.map((day, index) => (
               <motion.div
                 key={day.day}
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: index * 0.1 }}
                 className="flex flex-col items-center gap-2"
               >
                 <div
                   className={`w-12 h-12 rounded-full flex items-center justify-center border-3 transition-all shadow-lg ${
                     day.completed
                       ? "bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300 text-white"
                       : day.current
                       ? "bg-amber-500/20 border-amber-500 text-amber-500 animate-pulse ring-4 ring-amber-500/30"
                       : "bg-muted/50 border-border text-muted-foreground"
                   }`}
                 >
                   {day.completed ? (
                     <Check className="w-6 h-6" />
                   ) : (
                     <span className="text-lg font-bold">{day.day}</span>
                   )}
                 </div>
                 <div className="text-center">
                   <span className={`text-xs font-medium ${day.current ? "text-amber-500" : "text-muted-foreground"}`}>
                     Day {day.day}
                   </span>
                   {day.completed && day.amount && (
                     <p className="text-xs text-green-500">₹{day.amount}</p>
                   )}
                 </div>
               </motion.div>
             ))}
           </div>
 
           {/* Lucky Draw Prize */}
           <Card className="p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-500/20 mb-6">
             <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                 <Gift className="w-8 h-8 text-white" />
               </div>
               <div className="flex-1">
                 <h4 className="font-bold text-lg">Lucky Draw Prize</h4>
                 <p className="text-amber-600 font-semibold text-xl">0.5gm 24K Gold</p>
                 <p className="text-sm text-muted-foreground">Complete all 7 days to enter the draw</p>
               </div>
               <div className="text-right">
                 <p className="text-2xl font-bold text-amber-500">₹3,500+</p>
                 <p className="text-xs text-muted-foreground">Prize Value</p>
               </div>
             </div>
           </Card>
 
           {/* Rules */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
             <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
               <Coins className="w-5 h-5 text-amber-500 mt-0.5" />
               <div>
                 <p className="font-medium text-sm">Minimum ₹10/day</p>
                 <p className="text-xs text-muted-foreground">Any amount above qualifies</p>
               </div>
             </div>
             <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
               <Target className="w-5 h-5 text-amber-500 mt-0.5" />
               <div>
                 <p className="font-medium text-sm">Gold or Silver</p>
                 <p className="text-xs text-muted-foreground">Both metals count</p>
               </div>
             </div>
             <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
               <Calendar className="w-5 h-5 text-amber-500 mt-0.5" />
               <div>
                 <p className="font-medium text-sm">No breaks allowed</p>
                 <p className="text-xs text-muted-foreground">Miss a day = restart</p>
               </div>
             </div>
           </div>
 
           {/* CTA */}
           <Button 
             className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold text-lg shadow-lg"
             onClick={handleSaveForDay}
           >
             <Flame className="w-6 h-6 mr-2" />
             Save for Day {currentDay}
           </Button>
 
           <p className="text-center text-sm text-muted-foreground mt-4">
             {7 - completedDays} days remaining • 1,247 participants in this sprint
           </p>
         </div>
       </Card>
 
       {/* Stats Card */}
       <Card className="p-6">
         <h3 className="font-semibold mb-4">Your Sprint Stats</h3>
         <div className="grid grid-cols-3 gap-4">
           <div className="text-center p-4 rounded-lg bg-muted/30">
             <p className="text-3xl font-bold text-amber-500">{completedDays}</p>
             <p className="text-sm text-muted-foreground">Days Completed</p>
           </div>
           <div className="text-center p-4 rounded-lg bg-muted/30">
             <p className="text-3xl font-bold text-green-500">₹75</p>
             <p className="text-sm text-muted-foreground">Total Invested</p>
           </div>
           <div className="text-center p-4 rounded-lg bg-muted/30">
             <p className="text-3xl font-bold text-primary">3</p>
             <p className="text-sm text-muted-foreground">Sprints Joined</p>
           </div>
         </div>
       </Card>
     </div>
   );
 }