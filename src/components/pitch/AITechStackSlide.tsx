
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Network, Shield } from 'lucide-react';

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
      icon: React.ComponentType<any>;
      color: string;
    }>;
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

      {/* AI Layers Stack */}
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

      {/* Key Metrics */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-2xl font-bold mb-6">AI Performance Targets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-3xl font-bold">{"<2s"}</div>
            <div className="text-sm opacity-90">Response Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold">15%+</div>
            <div className="text-sm opacity-90">Conversion Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold">95%+</div>
            <div className="text-sm opacity-90">Prediction Accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold">500K+</div>
            <div className="text-sm opacity-90">Learning Dataset</div>
          </div>
        </div>
      </div>
    </div>
  );
};
