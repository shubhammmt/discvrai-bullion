import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Target } from 'lucide-react';

import growwLogo from '@/assets/competitors/groww-logo.png';
import jarLogo from '@/assets/competitors/jar-logo.png';
import hdfcLogo from '@/assets/competitors/hdfc-logo.png';
import phonepeLogo from '@/assets/competitors/phonepe-logo.png';
import blinkitLogo from '@/assets/competitors/blinkit-logo.png';
import zeptoLogo from '@/assets/competitors/zepto-logo.jpeg';

export const CompetitionSlideV2: React.FC = () => {
  const competitors = [
    {
      name: 'Groww, Jar, PhonePe, HDFC',
      logos: [growwLogo, jarLogo, phonepeLogo, hdfcLogo],
      type: 'Financial Platforms',
      approach: 'Product-first with high CAC',
      weakness: 'Paid acquisition funnels, one-size-fits-all approach'
    }
  ];

  const differentiators = [
    {
      icon: Zap,
      title: 'Zero-CAC Flywheel',
      description: '180→500+ daily explainers create organic discovery and trust'
    },
    {
      icon: Target,
      title: 'Personalized from Day Zero',
      description: 'Quizzes, AI watchlist agents, and behavioral signals tailor experience instantly'
    },
    {
      icon: Shield,
      title: 'Content-Led Lifecycle',
      description: 'Entire financial journey is fun, habit-forming, and engagement-driven'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold">Competition</h2>
        <p className="text-xl text-muted-foreground">
          Who are they & How we're different
        </p>
      </div>

      {/* Competitors Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center">Traditional Fintech</h3>
        
        {competitors.map((comp, index) => (
          <Card key={index} className="border-2">
            <CardContent className="p-8 space-y-6">
              {/* Logos */}
              <div className="flex flex-wrap justify-center items-center gap-8">
                {comp.logos.map((logo, i) => (
                  <div key={i} className="h-16 flex items-center justify-center">
                    <img 
                      src={logo} 
                      alt={`Competitor ${i + 1}`} 
                      className="max-h-full max-w-[140px] object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <Badge variant="outline" className="mb-2">{comp.type}</Badge>
                  <p className="text-sm text-muted-foreground">
                    <strong>Approach:</strong> {comp.approach}
                  </p>
                </div>
                <div className="bg-destructive/5 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong className="text-destructive">Their Limitation:</strong>
                    <span className="text-muted-foreground ml-2">{comp.weakness}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Our Advantage */}
      <div className="space-y-6 pt-4">
        <h3 className="text-3xl font-bold text-center text-primary">How Discvr.ai is Different</h3>
        
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="space-y-6">
            <p className="text-lg text-center leading-relaxed">
              <strong>Discvr.ai is a zero-CAC, content-led flywheel</strong> that makes the entire financial lifecycle 
              fun and habit-forming—<strong>180→500+ daily explainers, quizzes, and AI watchlist agents</strong> earn trust, 
              personalise the experience from day zero, and turn engagement into distribution-led conversions—
              <strong className="text-primary"> something competitors simply can't match</strong> with their 
              paid-acquisition, one-size-fits-all funnels.
            </p>

            <div className="grid md:grid-cols-3 gap-6 pt-6">
              {differentiators.map((diff, index) => {
                const Icon = diff.icon;
                return (
                  <div key={index} className="bg-background p-5 rounded-lg space-y-3">
                    <Icon className="w-8 h-8 text-primary" />
                    <h4 className="font-bold">{diff.title}</h4>
                    <p className="text-sm text-muted-foreground">{diff.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inspiration note */}
      <div className="pt-4">
        <Card className="p-4 bg-secondary/50">
          <div className="flex items-center justify-center gap-6">
            <span className="text-sm text-muted-foreground">Inspiration:</span>
            <div className="flex items-center gap-4">
              <img src={blinkitLogo} alt="Blinkit" className="h-8 object-contain" />
              <img src={zeptoLogo} alt="Zepto" className="h-8 object-contain" />
            </div>
            <span className="text-sm text-muted-foreground">
              → Quick commerce for financial products
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};
