
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AIInfrastructureSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    infrastructureVsExecution: {
      title: string;
      aiInfrastructure: {
        title: string;
        components: Array<{
          layer: string;
          description: string;
          technology: string;
        }>;
      };
      simpleExecution: {
        title: string;
        limitations: string[];
      };
    };
    infrastructureValue: {
      title: string;
      benefits: Array<{
        benefit: string;
        description: string;
        example: string;
      }>;
    };
    businessImplications: {
      title: string;
      infrastructure: string[];
      execution: string[];
    };
  };
}

export const AIInfrastructureSlide: React.FC<AIInfrastructureSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-center">{slide.infrastructureVsExecution.title}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">{slide.infrastructureVsExecution.aiInfrastructure.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {slide.infrastructureVsExecution.aiInfrastructure.components.map((component, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold text-blue-700">{component.layer}</h4>
                  <p className="text-sm">{component.description}</p>
                  <p className="text-xs text-blue-600 italic">{component.technology}</p>
                  {index < slide.infrastructureVsExecution.aiInfrastructure.components.length - 1 && (
                    <div className="border-b border-blue-200 pb-2"></div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">{slide.infrastructureVsExecution.simpleExecution.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {slide.infrastructureVsExecution.simpleExecution.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span className="text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6">{slide.infrastructureValue.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slide.infrastructureValue.benefits.map((benefit, index) => (
              <Card key={index} className="p-4">
                <CardContent className="space-y-3">
                  <h4 className="font-semibold text-purple-600">{benefit.benefit}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                  <div className="bg-purple-50 p-2 rounded">
                    <p className="text-xs text-purple-700"><strong>Example:</strong> {benefit.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">{slide.businessImplications.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Infrastructure Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {slide.businessImplications.infrastructure.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">Execution-Only Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {slide.businessImplications.execution.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
