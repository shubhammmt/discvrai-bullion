import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface MarketGrowthSlideProps {
  slide: any;
}

export const MarketGrowthSlide: React.FC<MarketGrowthSlideProps> = ({ slide }) => {
  const { title, subtitle, icon: Icon, growthData, segmentGrowth, ourTarget, growthDrivers } = slide;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Icon className="w-12 h-12 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-foreground">{title}</h1>
            <p className="text-xl text-muted-foreground mt-2">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Current vs Projected */}
        <Card>
          <CardHeader>
            <CardTitle>Market Evolution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">{growthData.currentState.year} (Current)</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-blue-600">Total Users</p>
                    <p className="font-bold text-blue-800">{growthData.currentState.totalUsers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600">Multi-Account</p>
                    <p className="font-bold text-blue-800">{growthData.currentState.multiAccountUsers}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-blue-600">Total Assets</p>
                  <p className="font-bold text-blue-800">{growthData.currentState.totalAssets}</p>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">{growthData.projectedState.year} (Projected)</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-green-600">Total Users</p>
                    <p className="font-bold text-green-800">{growthData.projectedState.totalUsers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600">Multi-Account</p>
                    <p className="font-bold text-green-800">{growthData.projectedState.multiAccountUsers}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-green-600">Total Assets</p>
                  <p className="font-bold text-green-800">{growthData.projectedState.totalAssets}</p>
                </div>
              </div>

              <div className="text-center">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {growthData.cagr} CAGR
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Target */}
        <Card>
          <CardHeader>
            <CardTitle>DISCVR.AI Target</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {Object.entries(ourTarget).map(([key, value]) => (
                <div key={key} className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="font-bold text-primary text-lg">{String(value)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segment Growth */}
      <Card>
        <CardHeader>
          <CardTitle>Segment Growth Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {segmentGrowth.map((segment: any, index: number) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{segment.segment}</h4>
                  <Badge variant="outline">{segment.cagr} CAGR</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Current: {segment.current}</span>
                  <span>Projected: {segment.projected}</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-sm text-muted-foreground">{segment.driver}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Drivers */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {growthDrivers.map((driver: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm">{driver}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};