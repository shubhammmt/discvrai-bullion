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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-12 flex items-center justify-center">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <IconComponent className="w-32 h-32 mx-auto text-white opacity-90" />
        
        <div className="space-y-6">
          <h1 className="text-6xl font-bold text-white leading-tight">
            {slide.title}
          </h1>
          <p className="text-3xl text-blue-100 font-medium">
            {slide.subtitle}
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-2 border-white/20">
          <CardContent className="p-10">
            <p className="text-2xl text-white leading-relaxed font-medium">
              {slide.keyMessage}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
