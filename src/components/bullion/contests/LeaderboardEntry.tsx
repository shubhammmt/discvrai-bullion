 import { Card } from "@/components/ui/card";
 import { Avatar, AvatarFallback } from "@/components/ui/avatar";
 import { Badge } from "@/components/ui/badge";
 import { Trophy, Medal, Flame, ThumbsUp } from "lucide-react";
 
 interface LeaderboardEntryProps {
   rank: number;
   name: string;
   avatar: string;
   badges?: string[];
   followers: number;
   upvotes: number;
   streak?: number;
 }
 
 export function LeaderboardEntry({
   rank,
   name,
   avatar,
   badges = [],
   followers,
   upvotes,
   streak
 }: LeaderboardEntryProps) {
   const getRankDisplay = () => {
     if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
     if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
     if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
     return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
   };
 
   const getRankBg = () => {
     if (rank === 1) return "bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30";
     if (rank === 2) return "bg-gradient-to-r from-gray-400/10 to-transparent border-gray-400/30";
     if (rank === 3) return "bg-gradient-to-r from-amber-600/10 to-transparent border-amber-600/30";
     return "bg-card/50";
   };
 
   return (
     <Card className={`p-4 ${getRankBg()} hover:bg-accent/50 transition-colors`}>
       <div className="flex items-center gap-4">
         <div className="w-8 flex justify-center">{getRankDisplay()}</div>
         <Avatar className="w-10 h-10">
           <AvatarFallback className="bg-primary/20 text-primary font-semibold">
             {avatar}
           </AvatarFallback>
         </Avatar>
         <div className="flex-1 min-w-0">
           <div className="flex items-center gap-2 flex-wrap">
             <span className="font-medium truncate">{name}</span>
             {badges.slice(0, 2).map((badge, i) => (
               <Badge key={i} variant="secondary" className="text-xs">
                 {badge}
               </Badge>
             ))}
           </div>
           {streak && (
             <div className="flex items-center gap-1 text-xs text-orange-500 mt-1">
               <Flame className="w-3 h-3" />
               <span>{streak} day streak</span>
             </div>
           )}
         </div>
         <div className="flex items-center gap-4 text-sm">
           <div className="text-center">
             <p className="font-bold">{followers}</p>
             <p className="text-xs text-muted-foreground">Followers</p>
           </div>
           <div className="text-center">
             <div className="flex items-center gap-1 justify-center">
               <ThumbsUp className="w-3 h-3" />
               <span className="font-bold">{upvotes}</span>
             </div>
             <p className="text-xs text-muted-foreground">Upvotes</p>
           </div>
         </div>
       </div>
     </Card>
   );
 }