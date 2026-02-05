 import { useState } from "react";
 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { motion } from "framer-motion";
 import { Trophy, Crown, Medal, Copy, Share2, Users, Gift, TrendingUp, MessageCircle } from "lucide-react";
 import { toast } from "sonner";
 import confetti from "canvas-confetti";
 
 interface LeaderboardUser {
   rank: number;
   name: string;
   avatar: string;
   referrals: number;
   isYou?: boolean;
 }
 
 const leaderboardData: LeaderboardUser[] = [
   { rank: 1, name: "Vikram S.", avatar: "V", referrals: 47 },
   { rank: 2, name: "Priya M.", avatar: "P", referrals: 38 },
   { rank: 3, name: "Rahul K.", avatar: "R", referrals: 31 },
   { rank: 14, name: "You", avatar: "Y", referrals: 8, isYou: true },
 ];
 
 export function ReferralHub() {
   const [referralCode] = useState(() => "GOLD" + Math.random().toString(36).substring(2, 8).toUpperCase());
   const referralLink = `https://discvrai-bullion.lovable.app/bullion?ref=${referralCode}`;
   
   const copyLink = () => {
     navigator.clipboard.writeText(referralLink);
     confetti({
       particleCount: 50,
       spread: 45,
       origin: { y: 0.8 },
       colors: ['#F59E0B', '#FCD34D']
     });
     toast.success("Referral link copied! 🎉");
   };
 
   const shareToWhatsApp = () => {
     const message = encodeURIComponent(`🏆 Join me on Discvr Bullion and start investing in Digital Gold & Silver! Use my referral code: ${referralCode}\n\n${referralLink}`);
     window.open(`https://wa.me/?text=${message}`, '_blank');
   };
 
   const getRankIcon = (rank: number) => {
     switch (rank) {
       case 1: return <Crown className="w-6 h-6 text-amber-500" />;
       case 2: return <Medal className="w-6 h-6 text-slate-400" />;
       case 3: return <Medal className="w-6 h-6 text-amber-700" />;
       default: return <span className="text-lg font-bold">#{rank}</span>;
     }
   };
 
   const getRankBg = (rank: number) => {
     switch (rank) {
       case 1: return "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30";
       case 2: return "bg-gradient-to-r from-slate-400/20 to-slate-300/20 border-slate-400/30";
       case 3: return "bg-gradient-to-r from-amber-700/20 to-amber-600/20 border-amber-700/30";
       default: return "bg-card border-border";
     }
   };
 
   return (
     <div className="space-y-6">
       {/* Main Referral Card - VIP Dark Theme */}
       <Card className="overflow-hidden bg-[#1A1A1A] border-amber-500/30 text-white">
         {/* Header */}
         <div className="p-6 border-b border-amber-500/20">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
               <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                 <Users className="w-7 h-7 text-black" />
               </div>
               <div>
                 <h2 className="font-bold text-2xl text-white">Refer & Strike Gold</h2>
                 <p className="text-amber-500/80">Build your golden network</p>
               </div>
             </div>
             <Badge className="bg-amber-500 text-black font-bold px-3 py-1">
               VIP Contest
             </Badge>
           </div>
           <p className="text-lg text-slate-300">
             Top 3 referrers this month win a <span className="text-amber-400 font-bold">Physical 24K Gold Coin!</span>
           </p>
         </div>
 
         {/* Your Stats */}
         <div className="p-6 border-b border-amber-500/20">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-slate-400 text-sm">Your Current Rank</p>
               <p className="text-4xl font-bold text-amber-400">#14</p>
             </div>
             <div className="text-right">
               <p className="text-slate-400 text-sm">Your Referrals</p>
               <p className="text-4xl font-bold text-white">8</p>
             </div>
             <div className="text-right">
               <p className="text-slate-400 text-sm">To Top 3</p>
               <p className="text-4xl font-bold text-red-400">23 more</p>
             </div>
           </div>
         </div>
 
         {/* Referral Actions */}
         <div className="p-6">
           <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-amber-500/20">
               <div className="flex-1">
                 <p className="text-xs text-slate-400 mb-1">Your Referral Code</p>
                 <p className="font-mono font-bold text-xl text-amber-400">{referralCode}</p>
               </div>
               <Button 
                 variant="outline" 
                 size="icon"
                 className="border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
                 onClick={copyLink}
               >
                 <Copy className="w-5 h-5" />
               </Button>
             </div>
             
             <div className="grid grid-cols-2 gap-3">
               <Button 
                 className="h-12 bg-amber-500 hover:bg-amber-600 text-black font-bold"
                 onClick={copyLink}
               >
                 <Copy className="w-5 h-5 mr-2" />
                 Copy Link
               </Button>
               <Button 
                 className="h-12 bg-green-600 hover:bg-green-700 text-white font-bold"
                 onClick={shareToWhatsApp}
               >
                 <MessageCircle className="w-5 h-5 mr-2" />
                 WhatsApp
               </Button>
             </div>
           </div>
         </div>
       </Card>
 
       {/* Leaderboard */}
       <Card className="overflow-hidden">
         <div className="p-6 border-b border-border">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
               <Trophy className="w-6 h-6 text-amber-500" />
               <h3 className="font-bold text-xl">Referral Leaderboard</h3>
             </div>
             <Badge variant="secondary">This Month</Badge>
           </div>
         </div>
         
         <div className="p-4 space-y-3">
           {leaderboardData.map((user, index) => (
             <motion.div
               key={user.rank}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: index * 0.1 }}
               className={`flex items-center gap-4 p-4 rounded-xl border ${getRankBg(user.rank)} ${user.isYou ? "ring-2 ring-primary" : ""}`}
             >
               <div className="w-10 h-10 flex items-center justify-center">
                 {getRankIcon(user.rank)}
               </div>
               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-lg">
                 {user.avatar}
               </div>
               <div className="flex-1">
                 <p className={`font-semibold ${user.isYou ? "text-primary" : ""}`}>
                   {user.name} {user.isYou && <Badge variant="secondary" className="ml-2">You</Badge>}
                 </p>
                 <p className="text-sm text-muted-foreground">{user.referrals} referrals</p>
               </div>
               {user.rank <= 3 && (
                 <div className="text-right">
                   <Gift className="w-6 h-6 text-amber-500" />
                 </div>
               )}
             </motion.div>
           ))}
         </div>
       </Card>
 
       {/* Prize Pool */}
       <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-500/20">
         <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
           <Gift className="w-5 h-5 text-amber-500" />
           Prize Pool
         </h3>
         <div className="grid grid-cols-3 gap-4">
           <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-500/30">
             <Crown className="w-8 h-8 text-amber-500 mx-auto mb-2" />
             <p className="font-bold text-amber-500">1st Place</p>
             <p className="text-lg font-bold">5gm Gold Coin</p>
             <p className="text-sm text-muted-foreground">Worth ₹35,000</p>
           </div>
           <div className="text-center p-4 rounded-xl bg-gradient-to-br from-slate-400/20 to-slate-300/20 border border-slate-400/30">
             <Medal className="w-8 h-8 text-slate-400 mx-auto mb-2" />
             <p className="font-bold text-slate-400">2nd Place</p>
             <p className="text-lg font-bold">2gm Gold Coin</p>
             <p className="text-sm text-muted-foreground">Worth ₹14,000</p>
           </div>
           <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-700/20 to-amber-600/20 border border-amber-700/30">
             <Medal className="w-8 h-8 text-amber-700 mx-auto mb-2" />
             <p className="font-bold text-amber-700">3rd Place</p>
             <p className="text-lg font-bold">1gm Gold Coin</p>
             <p className="text-sm text-muted-foreground">Worth ₹7,000</p>
           </div>
         </div>
       </Card>
     </div>
   );
 }