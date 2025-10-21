import { useState } from 'react';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import GlobalFooter from '@/components/GlobalFooter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp, Zap, Calendar, Target } from 'lucide-react';
import { newsCategories } from '@/data/newsCategories';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbStructuredData } from '@/components/seo/BreadcrumbStructuredData';
import { LeaderboardEntry } from '@/types/engagement';

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  { userId: '1', username: 'MarketMaverick', avatar: '', points: 2850, level: 'Market Guru', accuracy: 89, rank: 1, badge: 'Top Predictor' },
  { userId: '2', username: 'InvestorPro', avatar: '', points: 2640, level: 'Expert', accuracy: 92, rank: 2, badge: 'Quiz Master' },
  { userId: '3', username: 'StockSensei', avatar: '', points: 2420, level: 'Expert', accuracy: 85, rank: 3, badge: 'Streak King' },
  { userId: '4', username: 'CryptoWhale', avatar: '', points: 2180, level: 'Expert', accuracy: 87, rank: 4 },
  { userId: '5', username: 'IPO_Hunter', avatar: '', points: 1950, level: 'Analyst', accuracy: 81, rank: 5 },
  { userId: '6', username: 'FundGuru', avatar: '', points: 1820, level: 'Analyst', accuracy: 83, rank: 6 },
  { userId: '7', username: 'DayTrader_99', avatar: '', points: 1650, level: 'Analyst', accuracy: 78, rank: 7 },
  { userId: '8', username: 'ValueInvestor', avatar: '', points: 1520, level: 'Analyst', accuracy: 91, rank: 8 },
  { userId: '9', username: 'BullMarket', avatar: '', points: 1380, level: 'Analyst', accuracy: 76, rank: 9 },
  { userId: '10', username: 'BearWatcher', avatar: '', points: 1250, level: 'Beginner', accuracy: 88, rank: 10 },
];

export const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Market Guru': return 'bg-purple-500 text-white';
      case 'Expert': return 'bg-blue-500 text-white';
      case 'Analyst': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Leaderboard - Top Financial Predictors & Quiz Champions | DISCVR"
        description="See the top performers in financial polls and quizzes. Compete for rankings, earn badges, and showcase your market prediction skills on DISCVR."
        keywords={['leaderboard', 'financial rankings', 'market predictions', 'quiz champions', 'investment competition']}
      />

      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: '/' },
          { name: 'Leaderboard' }
        ]}
      />

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Leaderboard
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Top financial predictors and quiz champions
            </p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            {/* 2nd Place */}
            {mockLeaderboard[1] && (
              <div className="md:order-1">
                <Card className="p-6 text-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-400">
                  <Medal className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-gray-400">
                    <AvatarImage src={mockLeaderboard[1].avatar} />
                    <AvatarFallback className="text-2xl">{mockLeaderboard[1].username[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">{mockLeaderboard[1].username}</h3>
                  <p className="text-3xl font-bold text-gray-400 mb-2">{mockLeaderboard[1].points}</p>
                  <Badge className={`${getLevelColor(mockLeaderboard[1].level)} mb-2`}>
                    {mockLeaderboard[1].level}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{mockLeaderboard[1].accuracy}% accuracy</p>
                </Card>
              </div>
            )}

            {/* 1st Place */}
            {mockLeaderboard[0] && (
              <div className="md:order-2 md:-mt-8">
                <Card className="p-6 text-center bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 border-2 border-yellow-500">
                  <Trophy className="w-16 h-16 mx-auto mb-3 text-yellow-500" />
                  <Avatar className="w-24 h-24 mx-auto mb-3 border-4 border-yellow-500">
                    <AvatarImage src={mockLeaderboard[0].avatar} />
                    <AvatarFallback className="text-3xl">{mockLeaderboard[0].username[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-xl mb-1">{mockLeaderboard[0].username}</h3>
                  <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">{mockLeaderboard[0].points}</p>
                  <Badge className={`${getLevelColor(mockLeaderboard[0].level)} mb-2`}>
                    {mockLeaderboard[0].level}
                  </Badge>
                  {mockLeaderboard[0].badge && (
                    <Badge variant="outline" className="mb-2 border-yellow-500">
                      🏆 {mockLeaderboard[0].badge}
                    </Badge>
                  )}
                  <p className="text-sm text-muted-foreground">{mockLeaderboard[0].accuracy}% accuracy</p>
                </Card>
              </div>
            )}

            {/* 3rd Place */}
            {mockLeaderboard[2] && (
              <div className="md:order-3">
                <Card className="p-6 text-center bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 border-2 border-amber-600">
                  <Medal className="w-12 h-12 mx-auto mb-3 text-amber-600" />
                  <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-amber-600">
                    <AvatarImage src={mockLeaderboard[2].avatar} />
                    <AvatarFallback className="text-2xl">{mockLeaderboard[2].username[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">{mockLeaderboard[2].username}</h3>
                  <p className="text-3xl font-bold text-amber-600 mb-2">{mockLeaderboard[2].points}</p>
                  <Badge className={`${getLevelColor(mockLeaderboard[2].level)} mb-2`}>
                    {mockLeaderboard[2].level}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{mockLeaderboard[2].accuracy}% accuracy</p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="weekly" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Monthly
              </TabsTrigger>
              <TabsTrigger value="all-time" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                All-Time
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-4">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('all')}
              size="sm"
            >
              All Categories
            </Button>
            {newsCategories.map((category) => (
              <Button
                key={category.slug}
                variant={activeCategory === category.slug ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.slug)}
                size="sm"
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard List */}
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="space-y-3">
          {mockLeaderboard.slice(3).map((entry) => (
            <Card key={entry.userId} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-12 flex items-center justify-center">
                  {getRankIcon(entry.rank)}
                </div>

                {/* Avatar */}
                <Avatar className="w-12 h-12">
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback>{entry.username[0]}</AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{entry.username}</h3>
                    {entry.badge && (
                      <Badge variant="outline" className="text-xs">
                        {entry.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge className={`${getLevelColor(entry.level)} text-xs`}>
                      {entry.level}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {entry.accuracy}% accuracy
                    </span>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-bold">{entry.points}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* User's Position (if not in top 10) */}
        <Card className="mt-8 p-4 border-2 border-primary bg-primary/5">
          <div className="flex items-center gap-4">
            <div className="w-12 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">#42</span>
            </div>
            <Avatar className="w-12 h-12 border-2 border-primary">
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">Your Position</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge className="bg-green-500 text-white text-xs">Analyst</Badge>
                <span>Keep participating to climb up!</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">850</span>
              </div>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          </div>
        </Card>
      </main>

      <GlobalFooter />
      <MobileBottomNav />
    </div>
  );
};
