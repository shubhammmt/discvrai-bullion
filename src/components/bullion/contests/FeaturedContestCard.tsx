 import { Card } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 import { Trophy, Calendar, Users, Share2 } from "lucide-react";
 
 interface FeaturedContestCardProps {
   title: string;
   description: string;
   prize: string;
   participants: number;
   dateRange: string;
   status: "active" | "completed" | "upcoming";
   featured?: boolean;
   onViewContest: () => void;
 }
 
 export function FeaturedContestCard({
   title,
   description,
   prize,
   participants,
   dateRange,
   status,
   featured,
   onViewContest
 }: FeaturedContestCardProps) {
   const statusColors = {
     active: "bg-emerald-500/20 text-emerald-400",
     completed: "bg-muted text-muted-foreground",
     upcoming: "bg-blue-500/20 text-blue-400"
   };
 
   return (
     <Card className="p-5 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
       <div className="flex flex-col gap-4">
         <div className="flex items-start justify-between">
           <div className="flex items-center gap-2">
             <Trophy className="w-5 h-5 text-amber-500" />
             <h3 className="font-semibold text-lg">{title}</h3>
           </div>
           <div className="flex items-center gap-2">
             <Badge className={statusColors[status]} variant="secondary">
               {status.charAt(0).toUpperCase() + status.slice(1)}
             </Badge>
             {featured && (
               <Badge className="bg-amber-500/20 text-amber-400">Featured</Badge>
             )}
           </div>
         </div>
         
         <p className="text-muted-foreground">{description}</p>
         
         <div className="flex items-center gap-4 text-sm text-muted-foreground">
           <div className="flex items-center gap-1">
             <Trophy className="w-4 h-4 text-amber-500" />
             <span className="font-semibold text-foreground">{prize}</span>
           </div>
           <div className="flex items-center gap-1">
             <Users className="w-4 h-4" />
             <span>{participants} participants</span>
           </div>
         </div>
         
         <div className="flex items-center justify-between pt-2 border-t border-border/50">
           <div className="flex items-center gap-1 text-sm text-muted-foreground">
             <Calendar className="w-4 h-4" />
             <span>{dateRange}</span>
           </div>
           <div className="flex items-center gap-2">
             <Button variant="ghost" size="sm">
               <Share2 className="w-4 h-4" />
             </Button>
             <Button size="sm" onClick={onViewContest}>
               View Contest
             </Button>
           </div>
         </div>
       </div>
     </Card>
   );
 }