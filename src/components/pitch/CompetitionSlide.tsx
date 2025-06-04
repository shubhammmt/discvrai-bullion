
import React from 'react';

interface CompetitionSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    competitors: Array<{
      platform: string;
      range: string;
      ux: string;
      monetization: string;
      advantage: string;
    }>;
  };
}

export const CompetitionSlide: React.FC<CompetitionSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left">Platform</th>
              <th className="border border-gray-300 p-3 text-left">Product Range</th>
              <th className="border border-gray-300 p-3 text-left">User Experience</th>
              <th className="border border-gray-300 p-3 text-left">Monetization</th>
              <th className="border border-gray-300 p-3 text-left">Our Advantage</th>
            </tr>
          </thead>
          <tbody>
            {slide.competitors.map((comp, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-3 font-semibold">{comp.platform}</td>
                <td className="border border-gray-300 p-3">{comp.range}</td>
                <td className="border border-gray-300 p-3">{comp.ux}</td>
                <td className="border border-gray-300 p-3">{comp.monetization}</td>
                <td className="border border-gray-300 p-3 text-purple-600 font-semibold">{comp.advantage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
