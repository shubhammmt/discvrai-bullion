import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AMCCoverSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    keyMessage: string;
  };
}

export const AMCCoverSlide: React.FC<AMCCoverSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-8 flex items-center justify-center overflow-auto">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <IconComponent className="w-24 h-24 mx-auto text-white opacity-90" />
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white leading-tight">
            {slide.title}
          </h1>
          <p className="text-2xl text-blue-100 font-medium">
            {slide.subtitle}
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-2 border-white/20">
          <CardContent className="p-8">
            <p className="text-xl text-white leading-relaxed font-medium">
              {slide.keyMessage}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
