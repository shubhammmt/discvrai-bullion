import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Brain, Users, TrendingUp, Database, Zap } from 'lucide-react';

interface NetworkEffectsDataMoatsSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    dataMoats: {
      userBehaviorLoop: string;
      selfImprovingAI: string;
      humanAIHybrid: string;
      emotionalExperienceData: string;
      defensibleMoats: string;
    };
    networkLoop: {
      phase: string;
      description: string;
      outcome: string;
    }[];
  };
}

export const NetworkEffectsDataMoatsSlide: React.FC<NetworkEffectsDataMoatsSlideProps> = ({ slide }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          {slide.icon}
        </div>
        <h1 className="text-4xl font-bold text-foreground">{slide.title}</h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">{slide.subtitle}</p>
      </div>

      {/* Data Moats */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Self-Reinforcing Data Advantages</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="h-6 w-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-blue-500">User Behavior Learning</h3>
              </div>
              <p className="text-base">{slide.dataMoats.userBehaviorLoop}</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-6 w-6 text-purple-500" />
                <h3 className="text-lg font-semibold text-purple-500">Self-Improving AI</h3>
              </div>
              <p className="text-base">{slide.dataMoats.selfImprovingAI}</p>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-green-500" />
                <h3 className="text-lg font-semibold text-green-500">Human + AI Hybrid</h3>
              </div>
              <p className="text-base">{slide.dataMoats.humanAIHybrid}</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-orange-500" />
                <h3 className="text-lg font-semibold text-orange-500">Emotional Intelligence</h3>
              </div>
              <p className="text-base">{slide.dataMoats.emotionalExperienceData}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Network Effects Flywheel */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">The Growth Flywheel</h2>
        
        <div className="relative">
          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-32 h-32 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center">
              <RefreshCw className="h-12 w-12 text-primary-foreground animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>

          {/* Network Loop Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
            {slide.networkLoop.map((loop, index) => (
              <Card key={index} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold">{loop.phase}</h3>
                  </div>
                  <p className="text-base mb-3">{loop.description}</p>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <p className="text-sm font-medium">{loop.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Defensible Moats */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-bold text-primary">Defensible Competitive Moats</h3>
          </div>
          <p className="text-xl font-semibold text-center">{slide.dataMoats.defensibleMoats}</p>
        </CardContent>
      </Card>
    </div>
  );
};

