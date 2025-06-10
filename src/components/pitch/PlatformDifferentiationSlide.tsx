
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlatformDifferentiationSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    detailedComparison: {
      title: string;
      categories: Array<{
        category: string;
        discvr: string;
        competitors: string;
        advantage: string;
      }>;
    };
    problemWithComparison: {
      title: string;
      issues: string[];
    };
    realComparables: {
      title: string;
      comparisons: Array<{
        company: string;
        similarity: string;
        difference: string;
      }>;
    };
  };
}

export const PlatformDifferentiationSlide: React.FC<PlatformDifferentiationSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-4">{slide.detailedComparison.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left">Category</th>
                  <th className="border border-gray-300 p-3 text-left bg-blue-50">DISCVR.AI</th>
                  <th className="border border-gray-300 p-3 text-left bg-red-50">Liquide/Univest</th>
                  <th className="border border-gray-300 p-3 text-left bg-green-50">Our Advantage</th>
                </tr>
              </thead>
              <tbody>
                {slide.detailedComparison.categories.map((category, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-3 font-semibold">{category.category}</td>
                    <td className="border border-gray-300 p-3 bg-blue-50 text-sm">{category.discvr}</td>
                    <td className="border border-gray-300 p-3 bg-red-50 text-sm">{category.competitors}</td>
                    <td className="border border-gray-300 p-3 bg-green-50 text-sm font-semibold">{category.advantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">{slide.problemWithComparison.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {slide.problemWithComparison.issues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">⚠️</span>
                  <span className="text-sm text-yellow-800">{issue}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-xl font-bold mb-4">{slide.realComparables.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slide.realComparables.comparisons.map((comparison, index) => (
              <Card key={index} className="p-4">
                <CardContent className="space-y-3">
                  <h4 className="font-bold text-blue-600">{comparison.company}</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-600">Similar:</p>
                      <p className="text-sm">{comparison.similarity}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-600">Different:</p>
                      <p className="text-sm text-purple-600">{comparison.difference}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
