import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap } from "lucide-react";

export const MarketOpportunityFocusedSlide = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Market Opportunity
        </h1>
        <p className="text-2xl text-muted-foreground">
          3-Category Focus • ₹53,750 Cr → ₹1,63,399 Cr (10 Years)
        </p>
      </div>

      {/* TAM Overview */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="h-6 w-6 text-primary" />
            TAM Growth Story
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">₹53,750 Cr</div>
              <div className="text-sm text-muted-foreground mt-2">Year 1 TAM</div>
            </div>
            <div className="flex items-center justify-center">
              <TrendingUp className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">₹1,63,399 Cr</div>
              <div className="text-sm text-muted-foreground mt-2">Year 10 TAM</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              3x Growth in 10 Years
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Market Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">LAMF</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Year 1</span>
              <span className="font-semibold">₹37,350 Cr</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Year 10</span>
              <span className="font-semibold">₹1,03,460 Cr</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t">
              <span className="text-muted-foreground">Market Share</span>
              <span className="font-bold text-primary">0.25%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Digital Gold</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Year 1</span>
              <span className="font-semibold">₹14,000 Cr</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Year 10</span>
              <span className="font-semibold">₹49,280 Cr</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t">
              <span className="text-muted-foreground">Market Share</span>
              <span className="font-bold text-amber-500">0.61%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-slate-400">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Digital Silver</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Year 1</span>
              <span className="font-semibold">₹2,400 Cr</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Year 10</span>
              <span className="font-semibold">₹10,659 Cr</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t">
              <span className="text-muted-foreground">Market Share</span>
              <span className="font-bold text-slate-500">0.21%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trajectory */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Conservative Revenue Trajectory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">₹1.14 Cr</div>
              <div className="text-xs text-muted-foreground mt-1">Year 1</div>
            </div>
            <div>
              <div className="text-2xl font-bold">₹5.04 Cr</div>
              <div className="text-xs text-muted-foreground mt-1">Year 2</div>
            </div>
            <div>
              <div className="text-2xl font-bold">₹69.94 Cr</div>
              <div className="text-xs text-muted-foreground mt-1">Year 5</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">₹683.57 Cr</div>
              <div className="text-xs text-muted-foreground mt-1">Year 10</div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            0.42% avg market share across 3 categories = ₹683.57 Cr business
          </div>
        </CardContent>
      </Card>

      {/* Key Strategy */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Content-to-Commerce Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="font-semibold text-sm">Years 1-3: Prove PMF</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Fixed cohorts (1.2M LAMF, 3M Gold, 1M Silver)</li>
                <li>• Content-led education + calculators</li>
                <li>• Zero-CAC, organic growth</li>
                <li>• ₹1.14 Cr → ₹17.47 Cr revenue</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-sm">Years 4+: Scale with Market</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Expand cohorts with market CAGR</li>
                <li>• 14K+ AI-assisted research pages</li>
                <li>• Behavioral CTAs (scroll, dwell, tools)</li>
                <li>• ₹69.94 Cr → ₹683.57 Cr by Year 10</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Line */}
      <div className="bg-gradient-to-r from-primary to-primary/60 text-primary-foreground rounded-lg p-6 text-center">
        <div className="text-2xl font-bold mb-2">
          Limited Execution + Massive TAM = Mass-Scale Digital Business
        </div>
        <div className="text-lg opacity-90">
          Just 0.42% market share across 3 focused categories = ₹683.57 Cr by Year 10
        </div>
      </div>
    </div>
  );
};
