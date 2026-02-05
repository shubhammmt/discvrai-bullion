 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Send, Copy } from "lucide-react";
 import { toast } from "sonner";
 
 export function InviteFriendsCard() {
   const referralCode = "BULL" + Math.random().toString(36).substring(2, 8).toUpperCase();
   
   const copyCode = () => {
     navigator.clipboard.writeText(referralCode);
     toast.success("Referral code copied!");
   };
 
   return (
     <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-start gap-3">
           <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
             <Send className="w-5 h-5 text-primary" />
           </div>
           <div>
             <h3 className="font-semibold">Invite friends. Earn points.</h3>
             <p className="text-sm text-muted-foreground">
               Share your referral code. When they join, you both earn 100 points.
             </p>
           </div>
         </div>
         <div className="flex items-center gap-3">
           <div className="text-right">
             <p className="text-xs text-muted-foreground">Your referral code</p>
             <p className="font-mono font-bold text-primary">{referralCode}</p>
           </div>
           <Button variant="outline" size="icon" onClick={copyCode}>
             <Copy className="w-4 h-4" />
           </Button>
         </div>
       </div>
     </Card>
   );
 }