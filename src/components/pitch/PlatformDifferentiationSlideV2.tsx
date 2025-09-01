import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Brain, Target, CheckCircle, XCircle, Zap } from 'lucide-react';

interface PlatformDifferentiationSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    differentiation: {
      challenge: string;
      redditXIssues: string[];
      perplexityIssues: string[];
      discvrMoats: string[];
      keyInsight: string;
      indiaStrategy: {
        title: string;
        reasons: string[];
        usProductNote: string;
      };
    };
  };
}

export const PlatformDifferentiationSlideV2: React.FC<PlatformDifferentiationSlideProps> = ({ slide }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          {slide.icon}
        </div>
        <h1 className="text-4xl font-bold text-foreground">{slide.title}</h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">{slide.subtitle}</p>
      </div>

      {/* Investor Challenge */}
      <Card className="bg-yellow-500/10 border-yellow-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-8 w-8 text-yellow-500" />
            <h3 className="text-2xl font-bold text-yellow-500">The Investor Challenge</h3>
          </div>
          <p className="text-xl font-semibold text-center italic">"{slide.differentiation.challenge}"</p>
        </CardContent>
      </Card>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reddit/X Issues */}
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-6 w-6 text-red-500" />
              <h3 className="text-lg font-semibold text-red-500">Reddit/X Limitations</h3>
            </div>
            <div className="space-y-3">
              {slide.differentiation.redditXIssues.map((issue, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm">{issue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Perplexity Issues */}
        <Card className="bg-orange-500/10 border-orange-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6 text-orange-500" />
              <h3 className="text-lg font-semibold text-orange-500">Perplexity Spaces Gaps</h3>
            </div>
            <div className="space-y-3">
              {slide.differentiation.perplexityIssues.map((issue, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm">{issue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DISCVR Unique Moats */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-green-500" />
            <h3 className="text-2xl font-bold text-green-500">DISCVR's Unique Competitive Moats</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slide.differentiation.discvrMoats.map((moat, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-sm font-medium">{moat}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insight */}
      <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-bold text-primary">Strategic Positioning</h3>
          </div>
          <p className="text-xl font-semibold text-center">{slide.differentiation.keyInsight}</p>
        </CardContent>
      </Card>

      {/* India-First Strategy */}
      <Card className="bg-gradient-to-r from-blue-600/10 to-orange-500/10 border-blue-600/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-8 w-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-blue-600">{slide.differentiation.indiaStrategy.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-4">Why Stay India-Focused Initially:</h4>
              <div className="space-y-3">
                {slide.differentiation.indiaStrategy.reasons.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h4 className="text-lg font-semibold mb-2 text-amber-800">US Product ≠ US Market Strategy</h4>
              <p className="text-sm text-amber-700">{slide.differentiation.indiaStrategy.usProductNote}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};