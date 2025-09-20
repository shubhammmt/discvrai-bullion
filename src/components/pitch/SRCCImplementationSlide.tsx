import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

interface SRCCImplementationSlideProps {
  slide: any;
}

export const SRCCImplementationSlide: React.FC<SRCCImplementationSlideProps> = ({ slide }) => {
  const { timeline, engagement, success } = slide;

  return (
    <div className="w-full h-full flex flex-col justify-center space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <slide.icon className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-primary">{slide.title}</h1>
            <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(timeline).map(([week, data]: [string, any], index) => (
          <Card key={week} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={index === 0 ? "default" : "secondary"}>
                  Week {index + 1}
                </Badge>
                <span className="text-sm font-medium">{data.title}</span>
              </div>
              
              <div className="space-y-2 mb-4">
                {data.actions.slice(0, 3).map((action: string, actionIndex: number) => (
                  <div key={actionIndex} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{action}</span>
                  </div>
                ))}
                {data.actions.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{data.actions.length - 3} more actions
                  </div>
                )}
              </div>
              
              <div className="text-xs font-medium text-primary">
                Goal: {data.goal}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Engagement Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-bold text-lg mb-3 text-green-600">Daily Engagement</h4>
            <div className="space-y-2">
              {engagement.daily.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-bold text-lg mb-3 text-blue-600">Weekly Programs</h4>
            <div className="space-y-2">
              {engagement.weekly.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-bold text-lg mb-3 text-purple-600">Ongoing Support</h4>
            <div className="space-y-2">
              {engagement.ongoing.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Guarantee */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <h4 className="font-bold text-lg mb-2 text-green-700 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Success Guarantee
          </h4>
          <p className="text-green-700 mb-2">{success.guarantee}</p>
          <div className="flex flex-wrap gap-2">
            {success.metrics.map((metric: string, index: number) => (
              <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                {metric}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};