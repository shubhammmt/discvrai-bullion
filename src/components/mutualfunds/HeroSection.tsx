import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Users, 
  Trophy, 
  TrendingUp,
  Play,
  Star,
  Shield,
  Zap
} from 'lucide-react';

interface HeroSectionProps {
  onStartInvesting: () => void;
  onTakeAssessment: () => void;
}

const HeroSection = ({ onStartInvesting, onTakeAssessment }: HeroSectionProps) => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div className="w-1 h-1 bg-primary/20 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Social Proof Badges */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                4.8/5 Rating
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Bank-Grade Security
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Real-time AI Analysis
              </Badge>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              AI Research + Community +<br />
              Gamified Discovery
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              AI agents analyze news & macros to find winning funds. Join contests, climb leaderboards, 
              share research. Simplified, gamified mutual fund investing.
            </p>

            {/* Demo Preview */}
            <div className="flex justify-center mb-12">
              <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer max-w-md">
                <CardContent className="p-0">
                  <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 p-8 text-center">
                    <Play className="w-16 h-16 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-2">See AI in Action</h3>
                    <p className="text-sm text-muted-foreground">2-minute platform demo</p>
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI Research</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced algorithms analyze market trends, news sentiment, and macro indicators
                </p>
                <div className="text-sm text-primary font-semibold">
                  News & Macro Analysis
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-secondary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Community Driven</h3>
                <p className="text-muted-foreground mb-4">
                  Learn from experienced investors and share your own research insights
                </p>
                <div className="text-sm text-secondary font-semibold">
                  Shared Research
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-accent/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Trophy className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Gamified</h3>
                <p className="text-muted-foreground mb-4">
                  Compete in contests, earn rewards, and climb leaderboards
                </p>
                <div className="text-sm text-accent font-semibold">
                  Contests & Rewards
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 hover:scale-105 transition-all duration-200"
              onClick={onStartInvesting}
            >
              Start AI Research
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 hover:scale-105 transition-all duration-200"
              onClick={onTakeAssessment}
            >
              Join Contests
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">Community Members</div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-secondary mb-2">150+</div>
              <div className="text-muted-foreground">Daily Contests</div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-accent mb-2">2,500+</div>
              <div className="text-muted-foreground">Funds Tracked</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;