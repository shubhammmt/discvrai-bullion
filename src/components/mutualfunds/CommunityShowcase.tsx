import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp, Users, Star, Award, ArrowRight } from 'lucide-react';

interface CommunityShowcaseProps {
  onJoinCommunity: () => void;
}

const CommunityShowcase = ({ onJoinCommunity }: CommunityShowcaseProps) => {
  const topContributors = [
    {
      name: "Rajesh Kumar",
      title: "Fund Analyzer",
      points: 2850,
      streak: 15,
      badge: "Top Researcher",
      avatar: "RK",
      recentWin: "Best SIP Strategy Contest"
    },
    {
      name: "Priya Sharma",
      title: "Market Predictor",
      points: 2650,
      streak: 12,
      badge: "AI Expert",
      avatar: "PS",
      recentWin: "Sector Rotation Challenge"
    },
    {
      name: "Arjun Patel",
      title: "Risk Specialist",
      points: 2400,
      streak: 8,
      badge: "Community Star",
      avatar: "AP",
      recentWin: "ESG Fund Discovery"
    }
  ];

  const communityStats = [
    { label: "Total Researches", value: "12,456", icon: TrendingUp },
    { label: "Active Influencers", value: "2,847", icon: Users },
    { label: "Active Participants", value: "18,234", icon: Users },
    { label: "Contest Winners", value: "389", icon: Trophy },
    { label: "Trending Mutual Funds", value: "156", icon: TrendingUp }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Join Our <span className="text-primary">Research Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with top fund researchers, participate in contests, and share insights 
            that shape the future of mutual fund investing
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Community Stats */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Community Impact
                </h3>
                <div className="space-y-4">
                  {communityStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Icon className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{stat.label}</span>
                        </div>
                        <span className="font-semibold text-primary">{stat.value}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Contributors */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-primary" />
                    Top Contributors This Month
                  </h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Live Leaderboard
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                            {contributor.avatar}
                          </div>
                          {index === 0 && (
                            <div className="absolute -top-1 -right-1">
                              <Award className="w-5 h-5 text-yellow-500" />
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold">{contributor.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {contributor.badge}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{contributor.title}</p>
                          <p className="text-xs text-primary font-medium">
                            Latest win: {contributor.recentWin}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-primary">{contributor.points} pts</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {contributor.streak} day streak
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Join the Competition?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Share your research, climb the leaderboard, and win exciting rewards while 
                helping others make better investment decisions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={onJoinCommunity}
                  className="bg-primary hover:bg-primary/90"
                >
                  Join Community
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={onJoinCommunity}
                >
                  View Contests
                  <Trophy className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunityShowcase;