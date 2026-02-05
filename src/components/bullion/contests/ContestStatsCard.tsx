 import { Card } from "@/components/ui/card";
 import { LucideIcon } from "lucide-react";
 
 interface ContestStatsCardProps {
   icon: LucideIcon;
   value: string | number;
   label: string;
   subtext?: string;
 }
 
 export function ContestStatsCard({ icon: Icon, value, label, subtext }: ContestStatsCardProps) {
   return (
     <Card className="p-4 bg-card/50 backdrop-blur-sm">
       <div className="flex items-center gap-3">
         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
           <Icon className="w-5 h-5 text-primary" />
         </div>
         <div>
           <div className="flex items-center gap-2">
             <span className="text-2xl font-bold">{value}</span>
             {subtext && <span className="text-xs text-muted-foreground">{subtext}</span>}
           </div>
           <p className="text-sm text-muted-foreground">{label}</p>
         </div>
       </div>
     </Card>
   );
 }