import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Trophy, Users, TrendingUp, Repeat, Share2 } from 'lucide-react';

interface CommunityGTMSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    contentStrategy: {
      channels: Array<{
        platform: string;
        contentType: string;
        frequency: string;
        audience: string;
        cac: string;
      }>;
    };
    communityContests: Array<{
      contest: string;
      description: string;
      engagement: string;
      dataValue: string;
      growthLoop: string;
    }>;
    growthLoop: {
      phases: Array<{
        phase: string;
        description: string;
        outcome: string;
      }>;
    };
    metrics: {
      contentMetrics: Array<{
        metric: string;
        target: string;
      }>;
      communityMetrics: Array<{
        metric: string;
        target: string;
      }>;
    };
  };
}

export const CommunityGTMSlide: React.FC<CommunityGTMSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold text-foreground mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground mb-6">{slide.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Strategy */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" />
              Content-Driven Acquisition
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {slide.contentStrategy.channels.map((channel, index) => (
              <div key={index} className="border rounded-lg p-4 bg-muted/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground">{channel.platform}</h4>
                  <Badge variant="secondary">{channel.cac}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{channel.contentType}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{channel.frequency}</span>
                  <span>{channel.audience}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Community Contests */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Community Contests & Data Loop
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {slide.communityContests.map((contest, index) => (
              <div key={index} className="border rounded-lg p-4 bg-muted/30">
                <h4 className="font-semibold text-foreground mb-2">{contest.contest}</h4>
                <p className="text-sm text-muted-foreground mb-3">{contest.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium text-primary">Engagement:</span>
                    <p className="text-muted-foreground">{contest.engagement}</p>
                  </div>
                  <div>
                    <span className="font-medium text-primary">Data Value:</span>
                    <p className="text-muted-foreground">{contest.dataValue}</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t">
                  <span className="font-medium text-primary text-xs">Growth Loop:</span>
                  <p className="text-xs text-muted-foreground">{contest.growthLoop}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Growth Loop Visualization */}
      <Card className="p-6">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Repeat className="w-5 h-5 text-primary" />
            Product-Powered Growth Loop
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {slide.growthLoop.phases.map((phase, index) => (
              <React.Fragment key={index}>
                <div className="text-center max-w-xs">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mb-2 mx-auto">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">{phase.phase}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{phase.description}</p>
                  <Badge variant="outline" className="text-xs">{phase.outcome}</Badge>
                </div>
                {index < slide.growthLoop.phases.length - 1 && (
                  <TrendingUp className="w-6 h-6 text-primary hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-primary" />
              Content Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {slide.metrics.contentMetrics.map((metric, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{metric.metric}</span>
                  <span className="text-sm font-semibold text-foreground">{metric.target}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Community Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {slide.metrics.communityMetrics.map((metric, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{metric.metric}</span>
                  <span className="text-sm font-semibold text-foreground">{metric.target}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};