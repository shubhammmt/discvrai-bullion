import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users2, TrendingUp, Zap } from 'lucide-react';

interface TeamGTMSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    team: {
      current: Array<{ role: string; count: string }>;
      total: string;
      hiring: string[];
    };
    gtm: {
      contentEngine: {
        title: string;
        stats: string[];
        result: string;
      };
      gamification: {
        title: string;
        stats: string[];
        result: string;
      };
      partnerships: {
        title: string;
        stats: string[];
        result: string;
      };
      cac: {
        india: string;
        us: string;
        blended: string;
      };
    };
  };
}

export const TeamGTMSlide: React.FC<TeamGTMSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
        <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <Users2 className="w-6 h-6" />
            Team Structure
          </h3>
          
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Current Team ({slide.team.total})</h4>
              <div className="space-y-2">
                {slide.team.current.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-background/50 rounded-lg p-2">
                    <span className="text-sm font-medium">{member.role}</span>
                    <span className="text-sm text-muted-foreground">{member.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Hiring Plan</h4>
              <ul className="space-y-2">
                {slide.team.hiring.map((hire, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-purple-600 dark:text-purple-400">→</span>
                    <span>{hire}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* GTM Strategy */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Go-to-Market Strategy
          </h3>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📝</span>
                <h4 className="font-semibold">{slide.gtm.contentEngine.title}</h4>
              </div>
              <ul className="space-y-1 mb-3">
                {slide.gtm.contentEngine.stats.map((stat, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span>•</span>
                    <span>{stat}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-2">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                  ✓ {slide.gtm.contentEngine.result}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎮</span>
                <h4 className="font-semibold">{slide.gtm.gamification.title}</h4>
              </div>
              <ul className="space-y-1 mb-3">
                {slide.gtm.gamification.stats.map((stat, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span>•</span>
                    <span>{stat}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-2">
                <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                  ✓ {slide.gtm.gamification.result}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🤝</span>
                <h4 className="font-semibold">{slide.gtm.partnerships.title}</h4>
              </div>
              <ul className="space-y-1 mb-3">
                {slide.gtm.partnerships.stats.map((stat, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span>•</span>
                    <span>{stat}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-2">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  ✓ {slide.gtm.partnerships.result}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold">Cost Per Acquisition</h4>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">India</p>
                  <p className="font-bold text-lg">{slide.gtm.cac.india}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">US</p>
                  <p className="font-bold text-lg text-green-600 dark:text-green-400">{slide.gtm.cac.us}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Blended</p>
                  <p className="font-bold text-lg text-blue-600 dark:text-blue-400">{slide.gtm.cac.blended}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
