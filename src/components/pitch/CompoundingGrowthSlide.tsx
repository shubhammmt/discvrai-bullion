import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Zap, Users, DollarSign } from 'lucide-react';

interface CompoundingGrowthSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    flywheel: {
      title: string;
      stages: Array<{
        stage: string;
        focus: string;
        description: string;
      }>;
    };
    compoundingFactors: Array<{
      factor: string;
      description: string;
      impact: string;
    }>;
    metrics: {
      month3: { users: string; revenue: string; status: string };
      month6: { users: string; revenue: string; status: string };
      month9: { users: string; revenue: string; status: string };
      month12: { users: string; revenue: string; status: string };
    };
  };
}

export const CompoundingGrowthSlide: React.FC<CompoundingGrowthSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
      </div>

      {/* Flywheel Timeline */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            {slide.flywheel.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {slide.flywheel.stages.map((stage, index) => (
              <div key={index} className="relative">
                <div className="bg-background border-2 border-primary/20 rounded-lg p-4 h-full">
                  <div className="text-xs font-bold text-primary uppercase mb-1">{stage.stage}</div>
                  <h4 className="font-semibold text-lg mb-2">{stage.focus}</h4>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>
                {index < slide.flywheel.stages.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compounding Factors */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Why Growth Compounds</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slide.compoundingFactors.map((factor, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h4 className="font-semibold text-lg mb-2 text-primary">{factor.factor}</h4>
                <p className="text-sm text-muted-foreground mb-3">{factor.description}</p>
                <div className="bg-primary/10 rounded p-2">
                  <p className="text-xs font-medium">{factor.impact}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Growth Metrics */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 text-center">12-Month Growth Trajectory</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(slide.metrics).map(([key, value], index) => (
              <div key={key} className="text-center">
                <div className="bg-background rounded-lg p-4 border-2 border-primary/20">
                  <div className="text-xs font-bold text-primary uppercase mb-2">
                    {key.replace('month', 'Month ')}
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Users className="w-4 h-4 inline mr-1 text-muted-foreground" />
                      <div className="text-2xl font-bold">{value.users}</div>
                      <div className="text-xs text-muted-foreground">Users</div>
                    </div>
                    <div>
                      <DollarSign className="w-4 h-4 inline mr-1 text-muted-foreground" />
                      <div className="text-xl font-semibold text-primary">{value.revenue}</div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                    </div>
                    <div className="text-xs font-medium text-primary bg-primary/10 rounded px-2 py-1">
                      {value.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
