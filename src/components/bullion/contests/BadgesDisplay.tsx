 import { Award, Flame, Trophy } from "lucide-react";
 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 
 interface BadgesDisplayProps {
   streak: number;
   wins: number;
 }
 
 export function BadgesDisplay({ streak, wins }: BadgesDisplayProps) {
   return (
     <div className="flex items-center gap-3">
       <Button variant="outline" size="sm" className="gap-2">
         <Award className="w-4 h-4" />
         Badges
       </Button>
       <Card className="px-4 py-2 bg-card/80 backdrop-blur-sm flex items-center gap-4">
         <div className="flex items-center gap-2">
           <Flame className="w-5 h-5 text-orange-500" />
           <div>
             <span className="text-xl font-bold">{streak}</span>
             <span className="text-xs text-muted-foreground ml-1">day streak</span>
           </div>
         </div>
         <div className="flex items-center gap-2">
           <Trophy className="w-5 h-5 text-amber-500" />
           <span className="text-sm">Winning {wins}</span>
         </div>
       </Card>
     </div>
   );
 }