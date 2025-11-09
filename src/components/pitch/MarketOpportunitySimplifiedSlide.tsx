import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Zap } from 'lucide-react';

export const MarketOpportunitySimplifiedSlide = () => {
  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="text-lg px-6 py-2">Market Opportunity</Badge>
        <h2 className="text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
          ₹1,63,399 Crore Market
        </h2>
        <p className="text-2xl text-muted-foreground">
          Even limited execution builds mass-scale digital business
        </p>
      </div>

      {/* Content-to-Commerce Hook */}
      <Card className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/30">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">Content-to-Commerce Blueprint</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Daily stocks & MF research (14K+ AI-assisted pages) → Behavioral signals → Right CTA at right moment
            <br />
            <span className="text-sm italic">
              (Stock deep-dive → broker widget • MF review → SIP quick-start • LAMF story → calculator → loan)
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Three User Segments */}
      <div>
        <h3 className="text-3xl font-bold mb-6 text-center">Three Focused Categories</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* HNI Segment */}
          <Card className="border-2 border-primary/40 hover:shadow-xl transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">HNI</h4>
                  <p className="text-sm text-muted-foreground">SIP-heavy investors</p>
                </div>
              </div>
              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Product:</span>
                  <span className="font-semibold">LAMF Loans</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Year 10 TAM:</span>
                  <span className="font-bold text-primary">₹75,000 cr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Growth:</span>
                  <span className="font-semibold">12% CAGR</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital Savers */}
          <Card className="border-2 border-yellow-500/40 hover:shadow-xl transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Digital Savers</h4>
                  <p className="text-sm text-muted-foreground">UPI-native millennials</p>
                </div>
              </div>
              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Product:</span>
                  <span className="font-semibold">Digital Gold</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Year 10 TAM:</span>
                  <span className="font-bold text-yellow-600">₹30,000 cr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Growth:</span>
                  <span className="font-semibold">15% CAGR</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Value Seekers */}
          <Card className="border-2 border-purple-500/40 hover:shadow-xl transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Value Seekers</h4>
                  <p className="text-sm text-muted-foreground">Tier-2 early adopters</p>
                </div>
              </div>
              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Product:</span>
                  <span className="font-semibold">Digital Silver</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Year 10 TAM:</span>
                  <span className="font-bold text-purple-600">₹2,400 cr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Growth:</span>
                  <span className="font-semibold">18% CAGR</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Research Channels (added as baseline) */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="border-2 border-blue-500/40">
            <CardContent className="p-6 space-y-3">
              <h4 className="text-lg font-bold">Stocks Research</h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Year 10 TAM:</span>
                <span className="font-bold text-blue-600">₹25,999 cr</span>
              </div>
              <p className="text-xs text-muted-foreground">Partner brokerage flows via deep-dive articles</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-500/40">
            <CardContent className="p-6 space-y-3">
              <h4 className="text-lg font-bold">MF Research</h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Year 10 TAM:</span>
                <span className="font-bold text-green-600">₹30,000 cr</span>
              </div>
              <p className="text-xs text-muted-foreground">AMC partnerships, SIP nudges via fund reviews</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Conservative Capture */}
      <Card className="bg-gradient-to-br from-green-500/10 via-primary/10 to-purple-500/10 border-2 border-green-500/30">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold">Our Conservative Capture</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-5xl font-bold text-green-600 mb-2">1%</p>
                <p className="text-sm text-muted-foreground">
                  Even 1% penetration = <span className="font-bold text-foreground">₹1,634 cr</span> business by Year 10
                </p>
              </div>
              <p className="text-sm text-muted-foreground italic">
                We're not trying to capture the whole market. Systematic content-to-commerce in 3-5 focused categories.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-bold mb-3">Phased Growth Plan</h4>
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Year 1-2</p>
                  <p className="text-xs text-muted-foreground">0.02% penetration</p>
                </div>
                <p className="text-xl font-bold text-primary">₹12.59 cr</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Year 3-5</p>
                  <p className="text-xs text-muted-foreground">0.13% penetration</p>
                </div>
                <p className="text-xl font-bold text-purple-600">₹176.4 cr</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Year 10</p>
                  <p className="text-xs text-muted-foreground">0.42% penetration</p>
                </div>
                <p className="text-xl font-bold text-green-600">₹683.57 cr</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Punch Line */}
      <div className="text-center p-8 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-xl border border-primary/20">
        <p className="text-2xl font-bold text-foreground">
          TAM is <span className="text-primary">3x bigger by Year 10</span>. 
          <br />
          Even conservative execution = mass-scale digital business.
        </p>
      </div>
    </div>
  );
};
