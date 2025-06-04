
import React from 'react';
import { Zap } from 'lucide-react';

interface TitleSlideProps {
  slide: {
    title: string;
    subtitle: string;
    author: string;
    icon: React.ComponentType<any>;
  };
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="text-center space-y-8">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl">
            <IconComponent className="w-20 h-20 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
        {slide.title}
      </h1>
      <p className="text-2xl text-gray-600">{slide.subtitle}</p>
      <p className="text-lg text-gray-500">{slide.author}</p>
    </div>
  );
};
