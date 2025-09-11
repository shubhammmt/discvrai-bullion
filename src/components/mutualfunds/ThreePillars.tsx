import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Users, 
  Trophy,
  TrendingUp,
  MessageCircle,
  Zap,
  ChevronRight,
  Quote
} from 'lucide-react';

interface Pillar {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  dataPoint: {
    value: string;
    label: string;
  };
  testimonial: {
    text: string;
    author: string;
    role: string;
  };
  color: string;
}

const ThreePillars = () => {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const pillars: Pillar[] = [
    {
      id: 'ai',
      icon: Brain,
      title: 'AI Intelligence',
      subtitle: 'Advanced Analytics',
      description: 'Our AI processes thousands of data points daily, analyzing news sentiment, macro indicators, and market trends to identify winning opportunities.',
      features: [
        'Real-time news sentiment analysis',
        'Macro economic indicator tracking',
        'Pattern recognition algorithms',
        'Risk assessment models'
      ],
      dataPoint: {
        value: '10K+',
        label: 'News articles processed daily'
      },
      testimonial: {
        text: "The AI insights helped me identify a healthcare fund that's up 23% this year. The analysis was spot-on!",
        author: "Priya Sharma",
        role: "Portfolio Manager"
      },
      color: 'border-purple-500/20 bg-purple-500/5'
    },
    {
      id: 'community',
      icon: Users,
      title: 'Community Wisdom',
      subtitle: 'Collective Intelligence',
      description: 'Learn from experienced investors, share research, and benefit from the collective wisdom of thousands of active fund researchers.',
      features: [
        'Peer-reviewed research reports',
        'Community fund ratings',
        'Discussion forums',
        'Expert mentorship programs'
      ],
      dataPoint: {
        value: '5,000+',
        label: 'Active research contributors'
      },
      testimonial: {
        text: "The community discussions opened my eyes to ESG funds I never considered. Best investment decision I made this year.",
        author: "Rahul Mehta",
        role: "Individual Investor"
      },
      color: 'border-blue-500/20 bg-blue-500/5'
    },
    {
      id: 'gamified',
      icon: Trophy,
      title: 'Gamified Discovery',
      subtitle: 'Learn While Earning',
      description: 'Make investing fun and rewarding through contests, challenges, and leaderboards that help you discover the best funds.',
      features: [
        'Weekly fund-picking contests',
        'Research challenges',
        'Achievement badges',
        'Leaderboard competitions'
      ],
      dataPoint: {
        value: '150+',
        label: 'Daily active contests'
      },
      testimonial: {
        text: "Started as a game, but the research skills I developed here transformed my entire investment approach.",
        author: "Anita Das",
        role: "Software Engineer"
      },
      color: 'border-green-500/20 bg-green-500/5'
    }
  ];

  const toggleExpanded = (id: string) => {
    setExpandedPillar(expandedPillar === id ? null : id);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Three Pillars of Smart Investing</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combine AI intelligence, community wisdom, and gamified discovery for better investment decisions. 
            Our unique approach leverages technology, expertise, and engagement to help you find winning funds.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            const isExpanded = expandedPillar === pillar.id;
            
            return (
              <Card 
                key={pillar.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group ${pillar.color} ${isExpanded ? 'scale-105' : ''}`}
                onClick={() => toggleExpanded(pillar.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-background rounded-lg shadow-sm">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{pillar.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{pillar.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>

                  {/* Data Point Badge */}
                  <Badge variant="secondary" className="w-fit">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {pillar.dataPoint.value} {pillar.dataPoint.label}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="space-y-4 animate-fade-in">
                      {/* Features List */}
                      <div>
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {pillar.features.map((feature, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <Zap className="w-3 h-3 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Testimonial */}
                      <div className="bg-background/50 rounded-lg p-4 border">
                        <Quote className="w-4 h-4 text-primary mb-2" />
                        <p className="text-sm italic mb-2">"{pillar.testimonial.text}"</p>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-semibold">{pillar.testimonial.author}</span>
                          <span className="mx-1">•</span>
                          <span>{pillar.testimonial.role}</span>
                        </div>
                      </div>

                      <Button size="sm" variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  )}

                  {/* Hover Indicator */}
                  {!isExpanded && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-muted-foreground">Click to learn more</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience All Three Pillars?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of investors who are making smarter decisions with our integrated approach.
            </p>
            <Button size="lg" className="mr-4">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;