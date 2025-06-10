
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DetailedGTMSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    aggressivePlan: {
      title: string;
      timeline: string;
      phases: Array<{
        phase: string;
        duration: string;
        target: string;
        tactics: string[];
        signups: string;
      }>;
    };
    viralMechanics: {
      title: string;
      mechanics: Array<{
        feature: string;
        description: string;
        virality: string;
      }>;
    };
    communityTargets: {
      title: string;
      platforms: Array<{
        platform: string;
        audience: string;
        approach: string;
        reach: string;
      }>;
    };
    kpis: {
      title: string;
      metrics: Array<{
        metric: string;
        target: string;
        timeline: string;
      }>;
    };
  };
}

export const DetailedGTMSlide: React.FC<DetailedGTMSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  console.log('DetailedGTMSlide received slide data:', slide);

  // Provide default data if properties are missing
  const slideData = {
    aggressivePlan: slide.aggressivePlan || {
      title: "Aggressive 10K User Plan",
      timeline: "4-8 Weeks to 10K Users",
      phases: [
        {
          phase: "Foundation & Infiltration",
          duration: "Week 1-2",
          target: "1K Engaged Community Members",
          tactics: ["Deploy in 10 communities", "Share valuable content", "Build reputation"],
          signups: "500 signups"
        },
        {
          phase: "Content Virality",
          duration: "Week 2-4", 
          target: "Viral Content Distribution",
          tactics: ["AI vs Traditional comparisons", "Live market demos", "Cross-border content"],
          signups: "2K signups"
        },
        {
          phase: "Influencer Blitz",
          duration: "Week 3-6",
          target: "50+ Micro-Influencer Partners",
          tactics: ["Finance YouTubers", "Instagram accounts", "Revenue sharing deals"],
          signups: "4K signups"
        },
        {
          phase: "Viral Mechanics",
          duration: "Week 4-8",
          target: "Gamified Growth Engine",
          tactics: ["Discovery challenges", "Portfolio battles", "Referral systems"],
          signups: "3K signups"
        }
      ]
    },
    viralMechanics: slide.viralMechanics || {
      title: "Built-in Virality Features",
      mechanics: [
        {
          feature: "Discovery Challenge",
          description: "Find 3 friends, unlock US market access",
          virality: "15% referral rate"
        },
        {
          feature: "AI vs Community",
          description: "Users challenge AI recommendations",
          virality: "Social sharing spike"
        },
        {
          feature: "Portfolio Battles",
          description: "Community competitions with prizes",
          virality: "Monthly engagement"
        }
      ]
    },
    communityTargets: slide.communityTargets || {
      title: "Target Communities",
      platforms: [
        {
          platform: "Reddit",
          audience: "r/IndiaInvestments (400K)",
          approach: "Value-first content sharing",
          reach: "50K monthly"
        },
        {
          platform: "Twitter/X",
          audience: "#FinTwit India community",
          approach: "Daily market insights",
          reach: "100K impressions"
        },
        {
          platform: "Telegram",
          audience: "Stock market groups",
          approach: "Real-time discoveries",
          reach: "25K members"
        },
        {
          platform: "YouTube",
          audience: "Finance creators",
          approach: "Collaboration content",
          reach: "500K views"
        }
      ]
    },
    kpis: slide.kpis || {
      title: "Success Metrics",
      metrics: [
        {
          metric: "Daily Signups",
          target: "300-400/day",
          timeline: "By Week 4"
        },
        {
          metric: "Referral Rate",
          target: "15%+",
          timeline: "Ongoing"
        },
        {
          metric: "Community Engagement",
          target: "5% interaction rate",
          timeline: "Weekly"
        },
        {
          metric: "Viral Coefficient",
          target: "1.2x organic growth",
          timeline: "Monthly"
        }
      ]
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-4">{slide.subtitle}</p>
        <p className="text-lg font-semibold text-green-600">{slideData.aggressivePlan.timeline}</p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-4">{slideData.aggressivePlan.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slideData.aggressivePlan.phases.map((phase, index) => (
              <Card key={index} className="p-4 border-l-4 border-green-500">
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-green-700">{phase.phase}</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{phase.duration}</span>
                  </div>
                  <p className="text-sm font-semibold text-blue-600">{phase.target}</p>
                  <ul className="text-xs space-y-1">
                    {phase.tactics.map((tactic, tacticIndex) => (
                      <li key={tacticIndex} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                        {tactic}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-bold text-green-600">{phase.signups}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">{slideData.viralMechanics.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slideData.viralMechanics.mechanics.map((mechanic, index) => (
              <Card key={index} className="p-4">
                <CardContent className="space-y-2">
                  <h4 className="font-semibold text-purple-600">{mechanic.feature}</h4>
                  <p className="text-sm text-gray-600">{mechanic.description}</p>
                  <p className="text-xs font-semibold text-purple-500">{mechanic.virality}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{slideData.communityTargets.title}</h3>
            <div className="space-y-3">
              {slideData.communityTargets.platforms.map((platform, index) => (
                <Card key={index} className="p-3">
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-blue-600">{platform.platform}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{platform.reach}</span>
                    </div>
                    <p className="text-xs text-gray-600">{platform.audience}</p>
                    <p className="text-xs text-blue-500">{platform.approach}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{slideData.kpis.title}</h3>
            <div className="space-y-3">
              {slideData.kpis.metrics.map((kpi, index) => (
                <Card key={index} className="p-3 border-l-4 border-orange-500">
                  <CardContent className="space-y-2">
                    <h4 className="font-semibold text-orange-700">{kpi.metric}</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-600 font-bold">{kpi.target}</span>
                      <span className="text-gray-500">{kpi.timeline}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
