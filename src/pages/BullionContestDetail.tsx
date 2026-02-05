 import { useParams, useNavigate } from "react-router-dom";
 import { ArrowLeft, Bell, User } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";
 import { DiscvrHeroCarousel } from "@/components/discvr/DiscvrHeroCarousel";
 import { BullionSprint } from "@/components/bullion/contests/BullionSprint";
 import { ReferralHub } from "@/components/bullion/contests/ReferralHub";
 import { FirstTimerJackpot } from "@/components/bullion/contests/FirstTimerJackpot";
 
 const contestComponents: Record<string, React.ComponentType> = {
   "1": BullionSprint,
   "2": ReferralHub,
   "3": FirstTimerJackpot,
 };
 
 const contestTitles: Record<string, string> = {
   "1": "The 7-Day Bullion Sprint",
   "2": "Refer & Strike Gold",
   "3": "First-Timer's Jackpot",
 };
 
 export default function BullionContestDetail() {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   
   const ContestComponent = id ? contestComponents[id] : null;
   const title = id ? contestTitles[id] : "Contest";
 
   return (
     <div className="min-h-screen bg-background">
       {/* Header */}
       <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
         <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <BullionMobileMenu />
             <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/contests")} className="lg:flex hidden">
               <ArrowLeft className="w-5 h-5" />
             </Button>
             <div>
               <h1 className="font-bold text-lg">{title}</h1>
               <p className="text-xs text-muted-foreground">Rewards & Contests</p>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/profile")}>
               <User className="w-5 h-5" />
             </Button>
             <Button variant="ghost" size="icon">
               <Bell className="w-5 h-5" />
             </Button>
           </div>
         </div>
       </header>
 
       {/* Desktop Navigation */}
       <BullionNavTabs />
 
       {/* Hero Banner */}
       <DiscvrHeroCarousel />
 
       {/* Contest Content */}
       <main className="max-w-4xl mx-auto px-4 py-6">
         {ContestComponent ? (
           <ContestComponent />
         ) : (
           <div className="text-center py-12">
             <p className="text-muted-foreground">Contest not found</p>
             <Button className="mt-4" onClick={() => navigate("/bullion/contests")}>
               Back to Contests
             </Button>
           </div>
         )}
       </main>
     </div>
   );
 }