import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Trophy, Code, TrendingUp, Users, Heart } from 'lucide-react';

interface EngineerProfileProps {
  engineer: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    company: string;
    reputation: number;
    totalContributions: number;
    algorithmsCreated: number;
    contestsWon: number;
    totalVotes: number;
    totalLikes: number;
    specialties: string[];
    recentWork: {
      title: string;
      type: 'algorithm' | 'analysis' | 'theme';
      votes: number;
      likes: number;
      performance?: string;
    }[];
    achievements: {
      title: string;
      description: string;
      icon: string;
      rarity: 'common' | 'rare' | 'legendary';
    }[];
  };
}

const EngineerProfile: React.FC<EngineerProfileProps> = ({ engineer }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'rare': return 'bg-gradient-to-r from-purple-400 to-pink-500';
      default: return 'bg-gradient-to-r from-blue-400 to-green-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={engineer.avatar} alt={engineer.name} />
              <AvatarFallback className="text-2xl">{engineer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{engineer.name}</h1>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {engineer.reputation}
                </Badge>
              </div>
              
              <p className="text-lg text-muted-foreground mb-3">{engineer.title} at {engineer.company}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {engineer.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline">{specialty}</Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{engineer.totalContributions}</div>
                  <div className="text-sm text-muted-foreground">Contributions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{engineer.algorithmsCreated}</div>
                  <div className="text-sm text-muted-foreground">Algorithms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{engineer.contestsWon}</div>
                  <div className="text-sm text-muted-foreground">Contests Won</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{engineer.totalVotes + engineer.totalLikes}</div>
                  <div className="text-sm text-muted-foreground">Community Love</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Work */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Recent Contributions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {engineer.recentWork.map((work, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div>
                  <h4 className="font-semibold">{work.title}</h4>
                  <p className="text-sm text-muted-foreground capitalize">{work.type}</p>
                  {work.performance && (
                    <p className="text-sm text-green-600 font-medium">{work.performance}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {work.votes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {work.likes}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {engineer.achievements.map((achievement, index) => (
              <div key={index} className={`p-3 rounded-lg ${getRarityColor(achievement.rarity)} text-white`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm opacity-90">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex justify-center gap-4">
            <Button variant="default" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Follow Engineer
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              View Algorithms
            </Button>
            <Button variant="outline">
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngineerProfile;