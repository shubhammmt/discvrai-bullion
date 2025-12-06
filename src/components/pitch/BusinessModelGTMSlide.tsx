import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Target, Zap } from 'lucide-react';

interface BusinessModelGTMSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
  };
}

export const BusinessModelGTMSlide: React.FC<BusinessModelGTMSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
        <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
      </div>

      {/* Business Model Section */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="w-5 h-5 text-primary" />
            Business Model - How We Make Money
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="font-semibold mb-1">LAMF</div>
              <div className="text-2xl font-bold text-primary">0.6%</div>
              <div className="text-sm text-muted-foreground">commission on loan disbursals</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="font-semibold mb-1">Digital Gold</div>
              <div className="text-2xl font-bold text-primary">2%</div>
              <div className="text-sm text-muted-foreground">commission on purchases</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="font-semibold mb-1">Digital Silver</div>
              <div className="text-2xl font-bold text-primary">2%</div>
              <div className="text-sm text-muted-foreground">commission on purchases</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="font-semibold mb-1">Personal Loans</div>
              <div className="text-2xl font-bold text-primary">1.5%</div>
              <div className="text-sm text-muted-foreground">commission on disbursals</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mt-4">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-semibold">Content-to-commerce:</span> Daily explainers, calculators, and AI tools embedded with CTAs
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-semibold">Engagement hooks:</span> Polls, quizzes, virtual portfolios keep users engaged
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-semibold">Low CAC engine:</span> Content & community = reusable growth nodes
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="text-sm">
                <span className="font-semibold">Unit economics:</span> 95%+ gross margin, path to profitability
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GTM Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              GTM - How We Reach Customers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="font-semibold text-sm mb-2">Organic Distribution:</div>
              <div className="flex flex-wrap gap-1.5">
                {['SEO', 'AI search', 'Instagram', 'YouTube', 'LinkedIn', 'Newsletters', 'WhatsApp', 'Telegram'].map((channel) => (
                  <span key={channel} className="px-2 py-1 bg-primary/10 rounded text-xs">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm mb-1">Low-cost reach:</div>
              <div className="text-sm text-muted-foreground">Display swaps, partner embeds, influencer pods</div>
            </div>
            <div>
              <div className="font-semibold text-sm mb-1">Personalisation loop:</div>
              <div className="text-sm text-muted-foreground">AI signals personalise feeds, notifications & CTAs</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-primary" />
              Channels & Verticals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {[
                { name: 'LAMF', target: 'SIP-heavy investors', channel: 'Calculators, LinkedIn, WhatsApp' },
                { name: 'Digital Gold', target: 'UPI savers', channel: 'Reels, gifting kits, influencers' },
                { name: 'Digital Silver', target: 'Value seekers', channel: 'Vernacular, Tier-2 creators' },
                { name: 'Personal Loans', target: 'Sub-₹25K seekers', channel: 'Community, quick access tools' }
              ].map((vertical) => (
                <div key={vertical.name} className="pb-2 border-b border-border/50 last:border-0">
                  <div className="font-semibold text-sm">{vertical.name}</div>
                  <div className="text-xs text-muted-foreground">{vertical.target} · {vertical.channel}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traction & Momentum */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-primary" />
              Traction Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">11K → 25K</span>
              <span className="text-sm text-muted-foreground">sessions (Sep to Nov)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">&gt;3 min</span>
              <span className="text-sm text-muted-foreground">avg session, ~10% organic reach</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">180/day</span>
              <span className="text-sm text-muted-foreground">articles, AI research pages live</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardHeader>
            <CardTitle className="text-lg">Building Momentum</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div className="text-sm">Scale to <span className="font-semibold">500 articles/day</span> + <span className="font-semibold">50+ reels/month</span></div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div className="text-sm">Expand AI screeners & personalised article → CTA modules</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div className="text-sm">Deepen WhatsApp/Telegram communities, regional influencers</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div className="text-sm">Formalise broker/NBFC partnerships with proven content funnels</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
