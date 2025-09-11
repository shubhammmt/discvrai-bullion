import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Users, TrendingUp, Award, Eye, Zap } from 'lucide-react';

interface CoreFeaturesProps {
  onFeatureClick: (feature: string) => void;
}

const CoreFeatures = ({ onFeatureClick }: CoreFeaturesProps) => {
  const features = [
    {
      id: 'ai-research',
      title: 'AI-Powered Research',
      description: 'Discover funds through AI agents analyzing news, events, and market macros',
      icon: Bot,
      items: ['News-driven fund discovery', 'AI screening & filtering', 'Macro/micro impact analysis', 'Watchlist & alerts'],
      color: 'bg-primary/10 border-primary/20 hover:bg-primary/20',
      iconColor: 'text-primary'
    },
    {
      id: 'community',
      title: 'Gamified Community',
      description: 'Join contests, climb leaderboards, and share research with fellow investors',
      icon: Users,
      items: ['Community fund insights', 'Investment contests', 'Research leaderboards', 'Streak rewards'],
      color: 'bg-accent/10 border-accent/20 hover:bg-accent/20',
      iconColor: 'text-accent'
    },
    {
      id: 'discovery',
      title: 'Smart Discovery',
      description: 'Find trending funds, categories, and portfolio analysis tools',
      icon: TrendingUp,
      items: ['Trending funds tracker', 'Category discovery', 'Portfolio analysis', 'Performance insights'],
      color: 'bg-secondary/10 border-secondary/20 hover:bg-secondary/20',
      iconColor: 'text-secondary'
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Three Pillars of Smart Investing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combine AI intelligence, community wisdom, and gamified discovery for better investment decisions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id}
                className={`${feature.color} hover:shadow-lg transition-all duration-500 cursor-pointer group animate-fade-in hover-scale border-2`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => onFeatureClick(feature.id)}
              >
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 rounded-full bg-background/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-300 group-hover:rotate-6`}>
                      <IconComponent className={`w-8 h-8 ${feature.iconColor} group-hover:scale-110 transition-transform`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>

                  <div className="space-y-3">
                    {feature.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${feature.iconColor.replace('text-', 'bg-')}`} />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/50">
                    <Badge variant="secondary" className="text-xs">
                      Click to explore
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-16">
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6 text-center">
              <Eye className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold text-foreground mb-2">News & Research</h4>
              <p className="text-sm text-muted-foreground">
                Latest news in byte format + AI-enabled deep research articles
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Be an Influencer</h4>
              <p className="text-sm text-muted-foreground">
                Enable your tribe - help people follow your investment insights and build a community
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;