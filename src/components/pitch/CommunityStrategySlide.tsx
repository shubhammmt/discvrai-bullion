import React from 'react';
import { Users, Star, TrendingUp, Network, Award, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CommunityStrategySlideProps {
  slide: {
    title: string;
    subtitle: string;
    communityData: {
      startingPoint: string;
      currentTraction: string;
      communityEvolution: Array<{
        tier: string;
        description: string;
        requirements: string[];
      }>;
      qualityMechanics: string[];
      valueExchange: {
        contributors: string[];
        users: string[];
      };
      networkEffects: string;
      targetCommunities: string[];
    };
  };
}

export const CommunityStrategySlide: React.FC<CommunityStrategySlideProps> = ({ slide }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Users className="w-12 h-12 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">{slide.title}</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">{slide.subtitle}</p>
      </div>

      {/* Starting Point & Traction */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <UserCheck className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Our Starting Point</h3>
            </div>
            <p className="text-base text-foreground">{slide.communityData.startingPoint}</p>
          </CardContent>
        </Card>

        <Card className="border-green-500 bg-green-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold text-foreground">Current Traction</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">{slide.communityData.currentTraction}</p>
          </CardContent>
        </Card>
      </div>

      {/* Community Evolution Tiers */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-center text-foreground">Community Evolution Framework</h3>
        <div className="space-y-4">
          {slide.communityData.communityEvolution.map((tier, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant={index === 0 ? 'secondary' : index === 1 ? 'default' : 'outline'} className="text-base px-3 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      {tier.tier}
                    </Badge>
                  </div>
                  <Progress value={(index + 1) * 33} className="w-24" />
                </div>
                <p className="text-base text-muted-foreground mb-4">{tier.description}</p>
                <div className="grid md:grid-cols-3 gap-2">
                  {tier.requirements.map((requirement, reqIndex) => (
                    <div key={reqIndex} className="text-sm text-foreground bg-background/50 p-2 rounded border">
                      {requirement}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Value Exchange */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-blue-500 bg-blue-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <h4 className="text-lg font-semibold text-foreground">For Contributors</h4>
            </div>
            <ul className="space-y-2">
              {slide.communityData.valueExchange.contributors.map((value, index) => (
                <li key={index} className="text-sm text-foreground flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  {value}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-500 bg-purple-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="w-8 h-8 text-purple-600" />
              <h4 className="text-lg font-semibold text-foreground">For Users</h4>
            </div>
            <ul className="space-y-2">
              {slide.communityData.valueExchange.users.map((value, index) => (
                <li key={index} className="text-sm text-foreground flex items-start">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  {value}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Network Effects & Target Communities */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Network className="w-8 h-8 text-orange-600" />
              <h4 className="text-lg font-semibold text-foreground">Network Effects</h4>
            </div>
            <p className="text-base text-foreground font-medium">{slide.communityData.networkEffects}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <h4 className="text-lg font-semibold text-foreground">Target Communities</h4>
            </div>
            <ul className="space-y-2">
              {slide.communityData.targetCommunities.map((community, index) => (
                <li key={index} className="text-sm text-foreground flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                  {community}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quality Mechanics */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6">
          <h4 className="text-xl font-semibold text-foreground mb-4 text-center">Quality Assurance Mechanisms</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {slide.communityData.qualityMechanics.map((mechanic, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">{index + 1}</span>
                </div>
                <p className="text-base text-foreground">{mechanic}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};