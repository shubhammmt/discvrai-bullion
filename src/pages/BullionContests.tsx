import { ArrowLeft, Bell, User, Trophy, Medal, Flame, Calendar, Users, Gift, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";

// Mock contest data
const activeContests = [
  {
    id: "1",
    title: "Gold Rush Challenge",
    description: "Predict gold price movement for the next 7 days",
    prize: "₹10,000 + 1g Gold",
    participants: 1234,
    endsIn: "2 days",
    type: "prediction",
    difficulty: "Medium",
  },
  {
    id: "2",
    title: "Silver Streak",
    description: "Build the longest winning streak in silver trades",
    prize: "₹5,000 + 50g Silver",
    participants: 856,
    endsIn: "5 days",
    type: "trading",
    difficulty: "Hard",
  },
  {
    id: "3",
    title: "Bullion Quiz Master",
    description: "Test your knowledge about precious metals",
    prize: "₹2,500",
    participants: 2341,
    endsIn: "1 day",
    type: "quiz",
    difficulty: "Easy",
  },
];

// Mock leaderboard data
const leaderboard = [
  { rank: 1, name: "GoldMaster", points: 2850, avatar: "G", streak: 12 },
  { rank: 2, name: "SilverSurfer", points: 2640, avatar: "S", streak: 8 },
  { rank: 3, name: "BullionKing", points: 2420, avatar: "B", streak: 15 },
  { rank: 4, name: "MetalMaven", points: 2180, avatar: "M", streak: 6 },
  { rank: 5, name: "PreciousTrader", points: 1950, avatar: "P", streak: 4 },
];

export default function BullionContests() {
  const navigate = useNavigate();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "Medium": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Hard": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "";
    }
  };

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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Contests & Leaderboard</h1>
            <p className="text-muted-foreground">Gamified trading challenges and top performer rankings</p>
          </div>
        </div>

        {/* User Stats */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">You</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Your Ranking</p>
                <p className="text-2xl font-bold text-primary">#42</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="flex items-center gap-1 text-amber-500">
                  <Zap className="w-4 h-4" />
                  <span className="text-xl font-bold">850</span>
                </div>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-orange-500">
                  <Flame className="w-4 h-4" />
                  <span className="text-xl font-bold">5</span>
                </div>
                <p className="text-xs text-muted-foreground">Streak</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-emerald-500">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xl font-bold">3</span>
                </div>
                <p className="text-xs text-muted-foreground">Wins</p>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="contests" className="space-y-6">
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

          <TabsContent value="contests" className="space-y-4">
            {activeContests.map((contest) => (
              <Card key={contest.id} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{contest.title}</h3>
                      <Badge className={getDifficultyColor(contest.difficulty)}>
                        {contest.difficulty}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{contest.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {contest.participants.toLocaleString()} participants
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Ends in {contest.endsIn}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Prize Pool</p>
                      <p className="font-bold text-lg text-primary">{contest.prize}</p>
                    </div>
                    <Button>Join Contest</Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-3">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {leaderboard.slice(0, 3).map((user, index) => (
                <Card 
                  key={user.rank}
                  className={`p-4 text-center ${index === 1 ? "md:-mt-4" : ""} ${
                    index === 0 ? "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-gray-400" :
                    index === 1 ? "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/50 dark:to-yellow-800/50 border-yellow-500" :
                    "bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50 border-amber-600"
                  }`}
                >
                  {getRankIcon(index === 0 ? 2 : index === 1 ? 1 : 3)}
                  <Avatar className="w-12 h-12 mx-auto my-2">
                    <AvatarFallback>{leaderboard[index === 0 ? 1 : index === 1 ? 0 : 2].avatar}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-sm">{leaderboard[index === 0 ? 1 : index === 1 ? 0 : 2].name}</p>
                  <p className="text-lg font-bold">{leaderboard[index === 0 ? 1 : index === 1 ? 0 : 2].points}</p>
                </Card>
              ))}
            </div>

            {/* Full Leaderboard */}
            {leaderboard.slice(3).map((user) => (
              <Card key={user.rank} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 text-center">{getRankIcon(user.rank)}</div>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <div className="flex items-center gap-1 text-xs text-orange-500">
                      <Flame className="w-3 h-3" />
                      {user.streak} day streak
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{user.points}</p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
