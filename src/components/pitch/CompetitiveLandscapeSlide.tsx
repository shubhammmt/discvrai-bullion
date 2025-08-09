import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CompetitiveLandscapeSlideProps {
  slide: any;
}

export const CompetitiveLandscapeSlide: React.FC<CompetitiveLandscapeSlideProps> = ({ slide }) => {
  const { title, subtitle, icon: Icon, competitorAnalysis, ourMoats, competitiveAdvantages } = slide;

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

      {/* Direct Competitors */}
      <Card>
        <CardHeader>
          <CardTitle>Direct Competitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {competitorAnalysis.directCompetitors.map((competitor: any, index: number) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{competitor.name}</h3>
                  <Badge variant="outline">{competitor.arpu}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-green-600">Strengths</p>
                    <ul className="text-xs space-y-1">
                      {competitor.strengths.map((strength: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-500">+</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-red-600">Weaknesses</p>
                    <ul className="text-xs space-y-1">
                      {competitor.weaknesses.map((weakness: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500">-</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {competitor.marketShare}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Big Tech Threats */}
      <Card>
        <CardHeader>
          <CardTitle>Big Tech Threats & Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {competitorAnalysis.bigTechThreats.map((threat: any, index: number) => (
              <div key={index} className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{threat.name}</h4>
                  <Badge variant="destructive">{threat.timeline}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{threat.threat}</p>
                <p className="text-sm"><strong>Mitigation:</strong> {threat.mitigation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Our Moats */}
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(ourMoats).map(([timeframe, moats]) => (
          <Card key={timeframe}>
            <CardHeader>
              <CardTitle className="capitalize">{timeframe.replace(/([A-Z])/g, ' $1')} Moats</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {(moats as string[]).map((moat: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{moat}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Competitive Advantages */}
      <Card>
        <CardHeader>
          <CardTitle>Key Competitive Advantages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {competitiveAdvantages.map((advantage: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm font-medium">{advantage}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};