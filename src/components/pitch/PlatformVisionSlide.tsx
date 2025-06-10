
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Brain, ArrowRight, Target, Zap } from 'lucide-react';

export const PlatformVisionSlide: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Brain className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Platform Vision</h2>
        <p className="text-xl text-gray-600">Consumer AI Success Unlocks B2B Platform Opportunity</p>
      </div>

      {/* Current Focus */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-blue-800">Current Focus: B2C Excellence</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Consumer Discovery</h4>
              <p className="text-sm text-gray-600">AI-powered financial product matching for 50M+ Indian investors</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Behavioral Intelligence</h4>
              <p className="text-sm text-gray-600">Learning from user interactions to build the smartest recommendation engine</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Market Validation</h4>
              <p className="text-sm text-gray-600">Proving product-market fit before expanding to B2B opportunities</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Arrow indicating progression */}
      <div className="flex justify-center">
        <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-full">
          <span className="text-sm font-medium text-gray-700">Consumer Success Enables</span>
          <ArrowRight className="w-6 h-6 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">B2B Platform</span>
        </div>
      </div>

      {/* Future B2B Opportunities */}
      <Card className="p-6 border-2 border-dashed border-gray-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-700">
            <Building2 className="w-6 h-6" />
            Future B2B Platform Opportunity (Post-Series A)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">White-Label Solutions</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bank AI Discovery Platforms</span>
                  <span className="text-sm font-medium">₹840 Cr TAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fintech Product APIs</span>
                  <span className="text-sm font-medium">₹1,260 Cr TAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Compliance & Risk AI</span>
                  <span className="text-sm font-medium">₹1,680 Cr TAM</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Why We're Building for This</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <Zap size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>API-first architecture from day 1</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Consumer data creates B2B differentiation</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Modular, white-labelable components</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Enterprise-grade security & compliance</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategy Box */}
      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <CardContent>
          <div className="flex items-start gap-4">
            <Users className="w-8 h-8 text-yellow-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Strategic Approach: Focus Without Losing Opportunity</h4>
              <p className="text-sm text-yellow-700 mb-3">
                We're 100% focused on B2C execution for the next 18 months while building infrastructure 
                that enables B2B platform launch post-Series A.
              </p>
              <div className="flex items-center gap-4 text-xs text-yellow-600">
                <span>Total B2B TAM: ₹4,200 Cr</span>
                <span>•</span>
                <span>Dedicated B2B team needed</span>
                <span>•</span>
                <span>Consumer success validates B2B market</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
