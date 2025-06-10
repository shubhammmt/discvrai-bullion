
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Network, Shield, ArrowRight, MessageCircle, Target, Brain, Zap } from 'lucide-react';

interface AITechStackSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    aiLayers: Array<{
      layer: string;
      title: string;
      description: string;
      capabilities: string[];
      userValue: string;
      icon: React.ComponentType<any>;
      color: string;
    }>;
    userJourneyMapping: {
      title: string;
      steps: Array<{
        userAction: string;
        aiResponse: string;
        layers: string[];
        example: string;
      }>;
    };
    networkEffects: {
      title: string;
      effects: Array<{
        label: string;
        value: string;
      }>;
    };
    competitiveMoats: Array<{
      type: string;
      description: string;
      strength: string;
      icon: React.ComponentType<any>;
    }>;
  };
}

export const AITechStackSlide: React.FC<AITechStackSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      {/* User Journey to AI Stack Mapping */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center mb-6">From User Intent to AI Intelligence</h3>
        <div className="space-y-4">
          {slide.userJourneyMapping.steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{step.userAction}</div>
                <div className="text-sm text-gray-600">{step.example}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <div className="font-semibold text-blue-800">{step.aiResponse}</div>
                <div className="text-xs text-blue-600">
                  Powered by: {step.layers.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Intelligence Stack - Redesigned */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center mb-6">Four-Layer AI Intelligence Stack</h3>
        <div className="space-y-3">
          {slide.aiLayers.map((layer, index) => {
            const LayerIcon = layer.icon;
            return (
              <Card key={index} className={`p-4 bg-gradient-to-r ${layer.color} text-white`}>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <LayerIcon className="w-8 h-8" />
                    <div>
                      <div className="text-sm font-semibold opacity-90">{layer.layer}</div>
                      <h4 className="text-lg font-bold">{layer.title}</h4>
                      <p className="text-sm opacity-90">{layer.description}</p>
                      <p className="text-xs opacity-80 mt-1 font-medium">User Value: {layer.userValue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      {layer.capabilities.map((capability, i) => (
                        <div key={i} className="bg-white/20 px-2 py-1 rounded text-center">
                          {capability}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Network Effects Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-bold text-green-800">{slide.networkEffects.title}</h3>
            </div>
            <div className="space-y-3">
              {slide.networkEffects.effects.map((effect, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="font-semibold text-green-700">{effect.label}</span>
                  <span className="text-green-600 text-sm">{effect.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-800">Competitive Moats</h3>
            </div>
            <div className="space-y-4">
              {slide.competitiveMoats.map((moat, index) => {
                const MoatIcon = moat.icon;
                return (
                  <div key={index} className="p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <MoatIcon className="w-6 h-6 text-purple-600" />
                      <h4 className="font-bold text-purple-800">{moat.type}</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{moat.description}</p>
                    <p className="text-xs text-purple-600 font-semibold">{moat.strength}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real Implementation Examples */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-2xl font-bold mb-6 text-center">Live Implementation Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-3" />
            <h4 className="font-bold mb-2">Conversational Discovery</h4>
            <p className="text-sm opacity-90">
              "Best mutual funds for retirement" → Personalized SIP recommendations with reasoning
            </p>
          </div>
          <div className="text-center">
            <Target className="w-8 h-8 mx-auto mb-3" />
            <h4 className="font-bold mb-2">Risk-Aligned Matching</h4>
            <p className="text-sm opacity-90">
              88% match score based on income, goals, and spending patterns
            </p>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 mx-auto mb-3" />
            <h4 className="font-bold mb-2">Context Persistence</h4>
            <p className="text-sm opacity-90">
              AI remembers your profile across all product research pages
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics - Updated */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-2xl font-bold mb-6">AI Performance & Business Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-3xl font-bold">{"<2s"}</div>
            <div className="text-sm opacity-90">Response Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold">15%+</div>
            <div className="text-sm opacity-90">Discovery→Execution</div>
          </div>
          <div>
            <div className="text-3xl font-bold">88%</div>
            <div className="text-sm opacity-90">Match Accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold">500K+</div>
            <div className="text-sm opacity-90">Behavioral Patterns</div>
          </div>
        </div>
      </div>
    </div>
  );
};
