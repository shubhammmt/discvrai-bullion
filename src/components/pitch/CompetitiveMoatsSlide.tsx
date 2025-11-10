import { Card } from "@/components/ui/card";
import { Shield, Lock, Users, Zap, Brain, TrendingUp, Target, CheckCircle } from "lucide-react";

export const CompetitiveMoatsSlide = () => {
  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-5xl font-bold">Competitive Moats & Defensibility</h2>
        <p className="text-xl text-muted-foreground">
          Why Discvr.ai is Built to Last
        </p>
      </div>

      {/* Three Main Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Barriers to Entry */}
        <Card className="p-6 space-y-6 bg-card/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Barriers to Entry</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Unique Funnel</p>
                  <p className="text-sm text-muted-foreground">
                    Only platform with byte-sized global finance updates plus deeper tools (virtual portfolio, calculators) flowing into commerce
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Habit Stack</p>
                  <p className="text-sm text-muted-foreground">
                    Quizzes, polls, watchlists, alerts, WhatsApp/Telegram updates, and AI assistants create daily stickiness
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Focused Beachheads</p>
                  <p className="text-sm text-muted-foreground">
                    Targeting under-penetrated categories (LAMF, digital gold/silver) for 1-3 year defensible niche
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* IP & Defensibility */}
        <Card className="p-6 space-y-6 bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">IP & Defensibility</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Brain className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">AI-Personalised Research Engine</p>
                  <p className="text-sm text-muted-foreground">
                    14K+ equity/MF pages summarised, screened, and linked to commerce CTAs at moment of intent
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Behavioural Data Layer</p>
                  <p className="text-sm text-muted-foreground">
                    First-party signals (watchlists, dwell time, tool usage) tailor content and commerce, improving with every session
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Content-to-Commerce Graph</p>
                  <p className="text-sm text-muted-foreground">
                    In-house interlinked article → tool → partner flows drive zero-CAC conversions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Team Edge */}
        <Card className="p-6 space-y-6 bg-card/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Team Edge</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Founder</p>
                  <p className="text-sm text-muted-foreground">
                    Shubham Srivastava (ex-CTO, HT Digital) scaled content platforms to 100M+ MAUs and built high-velocity SEO machines
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Execution Pods</p>
                  <p className="text-sm text-muted-foreground">
                    Content ops lead (500 articles/day), growth/SEO lead (zero-CAC), product funnels lead (lending/wealth-tech)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Advisory Bench</p>
                  <p className="text-sm text-muted-foreground">
                    Senior execs from PMSs, ex-MakeMyTrip, ex-HT, ex-Reliance—fast-tracking partnerships, compliance, monetisation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Tagline */}
      <div className="text-center pt-4">
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
          <p className="text-2xl font-bold text-primary">
            Zero-CAC Content + Habit-Forming Engagement + AI-Personalised Commerce
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            Making it very hard for paid-acquisition or pure-content rivals to close the gap
          </p>
        </Card>
      </div>
    </div>
  );
};
