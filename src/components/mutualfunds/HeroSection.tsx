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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              AI Research + Squad Insights +<br />
              Achievement Unlocked
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              AI bots do the heavy lifting while you vibe with the smartest squad. Level up through challenges, 
              flex your gains, drop knowledge. Investing made actually fun.
            </p>

            {/* Demo Preview */}
            <div className="flex justify-center mb-12">
              <a 
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer max-w-md">
                  <CardContent className="p-0">
                    <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold mb-2">Watch Demo</h3>
                      <p className="text-sm text-muted-foreground">See how it actually works</p>
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">AI Research</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Bots analyze market trends, news sentiment, and macro indicators so you don't have to
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  🤖 Auto Analysis
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border border-accent/20 bg-gradient-to-br from-background to-accent/5">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Squad Powered</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Learn from the smartest investors and flex your own research with the squad
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-sm">
                  👥 Squad Insights
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border border-orange-500/20 bg-gradient-to-br from-background to-orange-500/5">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Achievement System</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Level up through challenges, unlock rewards, and climb leaderboards
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 font-semibold text-sm">
                  🏆 Level Up
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
              </CardContent>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 hover:scale-105 transition-all duration-200 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              onClick={onStartInvesting}
            >
              Start Creating ✨
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 hover:scale-105 transition-all duration-200 border-2 hover:bg-accent/10 hover:border-accent"
              onClick={onTakeAssessment}
            >
              Join The Squad 🚀
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">Squad Members</div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-accent mb-2">150+</div>
              <div className="text-muted-foreground">Daily Challenges</div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-orange-500 mb-2">2,500+</div>
              <div className="text-muted-foreground">Funds Tracked</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;