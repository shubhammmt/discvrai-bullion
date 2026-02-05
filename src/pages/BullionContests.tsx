 import { ArrowLeft, Bell, User, Trophy, Users, Gift, Crown, Zap, BookOpen, Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";
 import { DiscvrHeroCarousel } from "@/components/discvr/DiscvrHeroCarousel";
 import {
   ContestStatsCard,
   InviteFriendsCard,
   BadgesDisplay,
   FeaturedContestCard,
   LeaderboardEntry,
   ActionCard,
   MarketSentimentPoll,
  SavingsStreakContest,
  GoldPricePrediction,
  SilverMovementPoll
 } from "@/components/bullion/contests";

 // Mock data
 const featuredContests = [
  {
    id: "1",
     title: "The 7-Day Bullion Sprint",
     description: "Maintain a 7-day streak of ₹10+ daily savings to enter the 0.5gm Gold Lucky Draw. Build your savings habit!",
     prize: "0.5gm Gold",
     participants: 156,
     dateRange: "Ongoing",
     status: "active" as const,
     featured: true,
  },
  {
    id: "2",
     title: "Refer & Strike Gold",
     description: "Top 3 referrers this month win a Physical 24K Gold Coin! Build your golden network and climb the leaderboard.",
     prize: "5gm Gold Coin",
     participants: 234,
     dateRange: "This Month",
     status: "active" as const,
     featured: false,
  },
  {
    id: "3",
     title: "First-Timer's Jackpot",
     description: "Invest ₹500+ for the first time and unlock a guaranteed cashback jackpot up to ₹100! Scratch to reveal your reward.",
     prize: "Up to ₹100",
     participants: 98,
     dateRange: "For New Users",
     status: "active" as const,
     featured: false,
  },
];

 const leaderboardData = [
   { rank: 1, name: "Vaibhav Gupta", avatar: "V", badges: ["Founding Analyst", "Streak Starter"], followers: 24, upvotes: 156, streak: 12 },
   { rank: 2, name: "Prince", avatar: "P", badges: ["Early Adopter"], followers: 18, upvotes: 142, streak: 8 },
   { rank: 3, name: "Aadarsh K", avatar: "A", badges: ["Top Predictor"], followers: 15, upvotes: 128, streak: 5 },
   { rank: 4, name: "MetalMaven", avatar: "M", badges: [], followers: 12, upvotes: 98, streak: 3 },
   { rank: 5, name: "GoldHunter", avatar: "G", badges: [], followers: 10, upvotes: 87 },
   { rank: 6, name: "SilverStar", avatar: "S", badges: [], followers: 8, upvotes: 76 },
   { rank: 7, name: "BullionPro", avatar: "B", badges: [], followers: 6, upvotes: 65 },
];

export default function BullionContests() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BullionMobileMenu />
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="lg:flex hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg">Discvr Bullion</h1>
              <p className="text-xs text-muted-foreground">Digital Gold & Silver</p>
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

      {/* Desktop Navigation Tabs */}
      <BullionNavTabs />

       {/* Hero Banner */}
       <div className="max-w-7xl mx-auto px-4 py-6">
         <DiscvrHeroCarousel />
       </div>
 
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="contests" className="space-y-6">
           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
             <TabsList className="grid w-full max-w-md grid-cols-2">
               <TabsTrigger value="contests" className="flex items-center gap-2">
                 <Gift className="w-4 h-4" />
                 Active Contests
               </TabsTrigger>
               <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                 <Crown className="w-4 h-4" />
                 Leaderboard
               </TabsTrigger>
             </TabsList>
             <BadgesDisplay streak={5} wins={3} />
           </div>

           {/* Contests Tab */}
          <TabsContent value="contests" className="space-y-4">
             {/* Page Header */}
             <div className="flex items-center justify-between">
               <div>
                 <h1 className="text-3xl font-bold">Join the Contests</h1>
                 <p className="text-muted-foreground mt-1">Compete with other investors to get the most upvotes</p>
               </div>
             </div>
 
             {/* How It Works */}
             <ActionCard
               icon={BookOpen}
               title="How contests work"
               description="Learn the flow before you play"
               buttonText="Guide"
               onClick={() => {}}
             />
 
            {/* Engagement Section: Poll & Streak Contest */}
            {/* Mixed Engagement Section: Polls & Contests interleaved */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <MarketSentimentPoll />
              <GoldPricePrediction />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SavingsStreakContest />
              <SilverMovementPoll />
            </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <ContestStatsCard icon={Trophy} value={featuredContests.filter(c => c.status === "active").length} label="Active Contests" />
               <ContestStatsCard icon={Users} value="179" label="Participations" />
               <ContestStatsCard icon={Gift} value="TBD" label="Rewards" subtext="T&C apply" />
             </div>
 
             {/* Invite Friends */}
             <InviteFriendsCard />
 
             {/* View Leaderboard Card */}
             <Card className="p-4 bg-card/50">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                     <Trophy className="w-5 h-5 text-amber-500" />
                   </div>
                   <div>
                     <h3 className="font-semibold">See who's leading this week</h3>
                     <p className="text-sm text-muted-foreground">Browse top entries and vote your favorites</p>
                   </div>
                 </div>
                 <Button variant="outline" onClick={() => {}}>View Leaderboard</Button>
               </div>
             </Card>
 
             {/* Featured Challenges Section */}
             <div className="space-y-4 pt-4">
               <div className="flex items-center justify-between">
                 <h2 className="text-xl font-bold">Featured Challenges</h2>
                 <Badge variant="secondary">{featuredContests.filter(c => c.status === "active").length} active</Badge>
               </div>
               
               <div className="grid gap-4">
                 {featuredContests.map((contest) => (
                   <FeaturedContestCard
                     key={contest.id}
                     title={contest.title}
                     description={contest.description}
                     prize={contest.prize}
                     participants={contest.participants}
                     dateRange={contest.dateRange}
                     status={contest.status}
                     featured={contest.featured}
                     onViewContest={() => navigate(`/bullion/contests/${contest.id}`)}
                   />
                 ))}
               </div>
             </div>
          </TabsContent>

           {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-3">
             {/* Leaderboard Header */}
             <div className="flex items-center justify-between">
               <div>
                 <h1 className="text-3xl font-bold">Leaderboard</h1>
                 <p className="text-muted-foreground mt-1">Get the most upvotes and climb to the top!</p>
               </div>
            </div>

             {/* Action Cards Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <ActionCard
                 icon={BookOpen}
                 title="How contests work"
                 description="Learn the flow before you play"
                 buttonText="Guide"
                 onClick={() => {}}
               />
               <ActionCard
                 icon={Target}
                 title="Play weekly contest"
                 description="Submit your best fund pick"
                 buttonText="View Contests"
                 onClick={() => navigate("/bullion/contests")}
                 variant="highlight"
               />
               <ActionCard
                 icon={Zap}
                 title="Play daily challenge"
                 description="Build streaks with daily picks"
                 buttonText="View Contests"
                 onClick={() => navigate("/bullion/contests")}
                 variant="highlight"
               />
             </div>
 
             {/* Invite Friends */}
             <InviteFriendsCard />
 
             {/* Leaderboard Tabs */}
             <Tabs defaultValue="general" className="mt-6">
               <TabsList>
                 <TabsTrigger value="general">General</TabsTrigger>
                 <TabsTrigger value="contests">Contests</TabsTrigger>
                 <TabsTrigger value="hive">Hive</TabsTrigger>
               </TabsList>
 
               <TabsContent value="general" className="space-y-3 mt-4">
                 {/* Contest Info Card */}
                 <Card className="p-4 bg-card/50">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <Trophy className="w-5 h-5 text-amber-500" />
                       <div>
                         <div className="flex items-center gap-2">
                           <h3 className="font-semibold">Build your Tribe</h3>
                           <Badge variant="secondary">Completed</Badge>
                           <Badge className="bg-amber-500/20 text-amber-500">Featured</Badge>
                           <span className="text-sm font-semibold text-primary">₹1,000</span>
                         </div>
                         <p className="text-sm text-muted-foreground">12 Sept 2025 – 19 Sept 2025</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-2">
                       <Button variant="ghost" size="sm">Share</Button>
                       <Button size="sm">View Contest</Button>
                     </div>
                   </div>
                 </Card>
 
                 {/* Leaderboard Entries */}
                 <div className="space-y-2">
                   {leaderboardData.map((entry) => (
                     <LeaderboardEntry
                       key={entry.rank}
                       rank={entry.rank}
                       name={entry.name}
                       avatar={entry.avatar}
                       badges={entry.badges}
                       followers={entry.followers}
                       upvotes={entry.upvotes}
                       streak={entry.streak}
                     />
                   ))}
                 </div>
               </TabsContent>
 
               <TabsContent value="contests" className="space-y-3 mt-4">
                 <p className="text-muted-foreground text-center py-8">Contest leaderboards coming soon...</p>
               </TabsContent>
 
               <TabsContent value="hive" className="space-y-3 mt-4">
                 <p className="text-muted-foreground text-center py-8">Hive rankings coming soon...</p>
               </TabsContent>
             </Tabs>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
