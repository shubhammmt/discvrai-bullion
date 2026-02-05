 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { LucideIcon } from "lucide-react";
 
 interface ActionCardProps {
   icon: LucideIcon;
   title: string;
   description: string;
   buttonText: string;
   onClick: () => void;
   variant?: "default" | "highlight";
 }
 
 export function ActionCard({
   icon: Icon,
   title,
   description,
   buttonText,
   onClick,
   variant = "default"
 }: ActionCardProps) {
   return (
     <Card className={`p-4 ${variant === "highlight" ? "bg-primary/5 border-primary/20" : "bg-card/50"}`}>
       <div className="flex items-center justify-between gap-4">
         <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
             <Icon className="w-5 h-5 text-primary" />
           </div>
           <div>
             <h3 className="font-semibold">{title}</h3>
             <p className="text-sm text-muted-foreground">{description}</p>
           </div>
         </div>
         <Button variant={variant === "highlight" ? "default" : "outline"} size="sm" onClick={onClick}>
           {buttonText}
         </Button>
       </div>
     </Card>
   );
 }