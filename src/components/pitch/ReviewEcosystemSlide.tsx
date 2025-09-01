import React from 'react';
import { Eye, Star, Shield, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ReviewEcosystemSlideProps {
  slide: {
    title: string;
    subtitle: string;
    reviewEcosystem: {
      vision: string;
      marketGap: string;
      reviewCategories: Array<{
        category: string;
        aspects: string[];
      }>;
      verificationSystem: string[];
      aiPoweredInsights: string[];
      trustMechanism: string;
    };
  };
}

export const ReviewEcosystemSlide: React.FC<ReviewEcosystemSlideProps> = ({ slide }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Eye className="w-12 h-12 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">{slide.title}</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">{slide.subtitle}</p>
      </div>

      {/* Vision & Market Gap */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Our Vision</h3>
            </div>
            <p className="text-lg font-medium text-primary">"{slide.reviewEcosystem.vision}"</p>
          </CardContent>
        </Card>

        <Card className="border-orange-500 bg-orange-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-semibold text-foreground">Market Opportunity</h3>
            </div>
            <p className="text-base text-foreground font-medium">{slide.reviewEcosystem.marketGap}</p>
          </CardContent>
        </Card>
      </div>

      {/* Review Categories */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-center text-foreground">Comprehensive Product Reviews</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          {slide.reviewEcosystem.reviewCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge variant="secondary" className="text-base px-3 py-1">
                    {category.category}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {category.aspects.map((aspect, aspectIndex) => (
                    <div key={aspectIndex} className="text-sm text-foreground bg-background/50 p-2 rounded border flex items-center">
                      <CheckCircle className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                      {aspect}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Verification & AI Systems */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-500 bg-green-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <h4 className="text-lg font-semibold text-foreground">Verification System</h4>
            </div>
            <ul className="space-y-3">
              {slide.reviewEcosystem.verificationSystem.map((item, index) => (
                <li key={index} className="text-sm text-foreground flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-blue-500 bg-blue-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
              <h4 className="text-lg font-semibold text-foreground">AI-Powered Insights</h4>
            </div>
            <ul className="space-y-3">
              {slide.reviewEcosystem.aiPoweredInsights.map((insight, index) => (
                <li key={index} className="text-sm text-foreground flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  {insight}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Trust Mechanism */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="w-10 h-10 text-purple-600" />
              <h4 className="text-xl font-semibold text-foreground">Trust Mechanism</h4>
            </div>
            <p className="text-lg font-medium text-purple-600">"{slide.reviewEcosystem.trustMechanism}"</p>
            <div className="flex justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-muted-foreground">Verified Users</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-muted-foreground">Community Validation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-muted-foreground">AI Enhancement</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};