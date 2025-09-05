import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  Sparkles,
  Target
} from 'lucide-react';

interface HeroSectionProps {
  onStartInvesting: () => void;
  onTakeAssessment: () => void;
}

const HeroSection = ({ onStartInvesting, onTakeAssessment }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/10 rounded-full blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered Financial Intelligence
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">AI Research</span> + <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Community</span> + <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent block mt-2">Gamified Discovery</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                AI agents analyze news & macros to find winning funds. Join contests, climb leaderboards, share research. Simplified, gamified mutual fund investing.
              </p>
            </div>

            {/* Key Value Props */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border/50">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">AI Research</p>
                  <p className="text-xs text-muted-foreground">News & Macro Analysis</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border/50">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Community Driven</p>
                  <p className="text-xs text-muted-foreground">Shared Research</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border/50">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Gamified</p>
                  <p className="text-xs text-muted-foreground">Contests & Rewards</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={onStartInvesting}
              >
                <Brain className="w-5 h-5 mr-2" />
                Discover Funds with AI
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-border hover:bg-accent/50 transition-all duration-300"
                onClick={onTakeAssessment}
              >
                <Target className="w-5 h-5 mr-2" />
                Join Community
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 border-t border-border/50">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">5,000+</p>
                <p className="text-xs text-muted-foreground">Community Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">150+</p>
                <p className="text-xs text-muted-foreground">Daily Contests</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">2,500+</p>
                <p className="text-xs text-muted-foreground">Funds Tracked</p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border p-8 shadow-2xl">
              {/* Mock Dashboard Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">AI Portfolio Analysis</h3>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    +18.5% Returns
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Growth Fund</p>
                        <p className="text-xs text-muted-foreground">Large Cap</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+24.5%</p>
                      <p className="text-xs text-muted-foreground">1Y Return</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Balanced Fund</p>
                        <p className="text-xs text-muted-foreground">Hybrid</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+16.8%</p>
                      <p className="text-xs text-muted-foreground">1Y Return</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Brain className="w-4 h-4 text-primary" />
                    AI Recommendation: Increase SIP by ₹5,000
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;